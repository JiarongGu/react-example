
import { createBrowserHistory, History, Location } from 'history';
import { matchPath } from 'react-router';
import { effect, sink, SinkFactory, state, trigger } from 'redux-sink';

import { RouteModel } from '@services/navigation/models/RouteModel';
import { routes } from '@services/navigation/routes';
import { ActiveRoute, BasicActiveRoute } from './models/ActiveRoute';
import { BreadcrumbModel } from './models/BreadcrumbModel';

@sink('navigation')
export class NavigationSink {
  @state public history: History;
  @state public location: Location;
  @state public activeRoute: ActiveRoute;
  @state public routes: Array<RouteModel> = routes;
  @state public routeMap: { [key: string]: RouteModel } = this.getRouteMap(routes);
  @state public root?: RouteModel = this.getRoot(routes);

  @effect
  public pushRoute(key: string, subRoutes: Array<RouteModel>) {
    this.routeMap[key].routes = subRoutes;
    this.routes = [...this.routes];
  }

  @trigger('navigation/location')
  public locationTrigger(location: Location) {
    const activeRoute = this.getActiveRoute(this.routes, location);

    if (activeRoute) {
      this.activeRoute = activeRoute;
    } else if (location.pathname !== (this.location && this.location.pathname)) {
      this.history.replace('/');
    }
  }

  @trigger('navigation/routes')
  public routesTrigger(models: Array<RouteModel>) {
    this.routeMap = this.getRouteMap(models);
    this.root = this.getRoot(models);

    const activeRoute = this.getActiveRoute(models, this.location);
    if (activeRoute) {
      this.activeRoute = activeRoute;
    }
  }

  private getRoot(models: Array<RouteModel>) {
    return models.find(x => x.link || x.props.path === '/');
  }

  private getRouteMap(models: Array<RouteModel>) {
    return models.reduce((map, model) => {
      map[model.key] = model;
      if (model.routes) {
        map = Object.assign(map, this.getRouteMap(model.routes));
      }
      return map;
    }, {});
  }

  private getActiveRoute(routeModels: Array<RouteModel>, location: Location) {
    if (!location) 
      return undefined;

    const activeRoute = this.getBasicActiveRoute(routeModels, location);
    if (activeRoute) {
      const searchParams = new URLSearchParams(location.search);
      const queryParams: { [key: string]: string | null } = {};
      for (const key of searchParams.keys()) {
        queryParams[key] = searchParams.get(key);
      }
      let breadcrumbs = activeRoute.breadcrumbs;
      if (this.root && breadcrumbs[0].path !== '/') {
        breadcrumbs = [
          { 
            path: this.root.link, 
            breadcrumbName: this.root.name 
          },
          ...breadcrumbs
        ];
      }
      return { ...activeRoute, breadcrumbs, queryParams };
    }
    return undefined;
  }

  private getBasicActiveRoute(routeModels: Array<RouteModel>, location: Location): BasicActiveRoute | undefined {
    for (const route of routeModels) {
      const props = Object.assign({}, route.props, { path: route.link });
      const matches = matchPath(location.pathname, props);
      if (matches) {
        const keys = [route.key];
        const breadcrumbs: Array<BreadcrumbModel> = [{
          path: route.link,
          breadcrumbName: route.name
        }];

        let params = matches.params;
        let path = matches.url;
        let name = route.name;

        if (route.routes) {
          const subActiveRoute = this.getBasicActiveRoute(route.routes, location);
          if (subActiveRoute) {
            keys.push(...subActiveRoute.keys);
            breadcrumbs.push(...subActiveRoute.breadcrumbs);
            params = Object.assign(params, subActiveRoute.params);
            path = subActiveRoute.path;
            name = subActiveRoute.name;
          }
        }
        return { keys, path, params, breadcrumbs, name };
      }
    }
    return undefined;
  }
}

export const createNavigationHistory = () => {
  const history = createBrowserHistory();
  const navigation = SinkFactory.getSink(NavigationSink);

  history.listen((location) => navigation.location = location);
  navigation.history = history;
  navigation.location = history.location;

  return history;
}