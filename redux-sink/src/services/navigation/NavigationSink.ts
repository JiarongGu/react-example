import { createBrowserHistory, History, Location } from 'history';
import { matchPath } from 'react-router';
import { sink, SinkFactory, state, trigger } from 'redux-sink';

import { RouterSink } from '@services/router';
import { RouteModel } from '@services/router/RouteModel';

interface ActiveRoute {
  params: { [key: string]: any };
  keys: Array<string>;
  url: string;
  breadcrumb: Array<string>;
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
      this.activeRoute = activeRoute;
    } else if (location.pathname !== (this.location && this.location.pathname)) {
      this.history.replace('/');
    }
  }

  private getActiveRoute(routeModels: Array<RouteModel>, location: Location): ActiveRoute | undefined {
    for (const route of routeModels) {
      const props = Object.assign({ }, route.props, { path: route.link });
      const matches = matchPath(location.pathname, props);
      if (matches) {
        const keys = [route.key];
        const breadcrumb = [route.name];

        let params = matches.params;
        let url = matches.url;

        if (route.routes) {
          const subActiveRoute = this.getActiveRoute(route.routes, location);
          if (subActiveRoute) {
            keys.push(...subActiveRoute.keys);
            breadcrumb.push(...subActiveRoute.breadcrumb);
            params = Object.assign(params, subActiveRoute.params);
            url = subActiveRoute.url;
          }
        }
        return { keys, url, params, breadcrumb };
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