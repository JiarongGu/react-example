import { createBrowserHistory, History, Location } from 'history';
import { matchPath } from 'react-router';
import { sink, SinkFactory, state, trigger } from 'redux-sink';

import { RouterSink } from '@services/router';
import { RouteModel } from '@services/router/RouteModel';
interface Breadcrumb {
  path?: string;
  breadcrumbName: string;
}
interface BasicActiveRoute {
  params: { [key: string]: any };
  keys: Array<string>;
  path: string;
  breadcrumbs: Array<Breadcrumb>;
  name: string;
}

export interface ActiveRoute extends BasicActiveRoute {
  queryParams: { [key: string]: string | null };
}

@sink('navigation', RouterSink)
export class NavigationSink {
  @state public history: History;
  @state public location: Location;
  @state public activeRoute: ActiveRoute;

  constructor(private router: RouterSink) { }

  @trigger('navigation/location')
  public locationTrigger(location: Location) {
    const activeRoute = this.getActiveRoute(this.router.routes, location);
    if (activeRoute) {
      const searchParams = new URLSearchParams(location.search);
      const queryParams: { [key: string]: string | null } = {};
      for(const key of searchParams.keys()) {
        queryParams[key] = searchParams.get(key);
      }
      let breadcrumbs = activeRoute.breadcrumbs;
      if (this.router.root && breadcrumbs[0].path !== '/') {
        breadcrumbs = [ 
          { path: this.router.root.link, breadcrumbName: this.router.root.name }, 
          ...breadcrumbs
        ];
      }
      this.activeRoute = { ...activeRoute, breadcrumbs, queryParams };
    } else if (location.pathname !== (this.location && this.location.pathname)) {
      this.history.replace('/');
    }
  }

  private getActiveRoute(routeModels: Array<RouteModel>, location: Location): BasicActiveRoute | undefined {
    for (const route of routeModels) {
      const props = Object.assign({ }, route.props, { path: route.link });
      const matches = matchPath(location.pathname, props);
      if (matches) {
        const keys = [route.key];
        const breadcrumbs: Array<Breadcrumb> = [{ 
          path: route.link, 
          breadcrumbName: route.name 
        }];

        let params = matches.params;
        let path = matches.url;
        let name = route.name;

        if (route.routes) {
          const subActiveRoute = this.getActiveRoute(route.routes, location);
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
  const navigation = SinkFactory.sink(NavigationSink);

  history.listen((location) => navigation.location = location);
  navigation.history = history;
  navigation.location = history.location;

  return history;
}