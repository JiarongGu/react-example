
import { SinkFactory, state, trigger } from 'redux-sink';

import { ActiveRoute } from '@services/navigation/models/ActiveRoute';
import { RouteModel } from '@services/navigation/models/RouteModel';
import { NavigationSink } from '@services/navigation/NavigationSink';

export class DynamicRouter {
  @state public key: string;
  @state public loaded = false;

  protected routes: Array<RouteModel> = [];
  protected navigation: NavigationSink;

  constructor(
    key: string,
    routes: Array<RouteModel>,
  ) {
    this.key = key;
    this.routes = routes;
    this.navigation = SinkFactory.getSink(NavigationSink);
  }

  @trigger('navigation/activeRoute')
  public loadRoute(activeRoute: ActiveRoute) {
    if(!this.loaded && activeRoute.keys.some(key => key === this.key)) {
      this.loaded = true;
      this.navigation.pushRoute(this.key, this.routes);
    }
  }
}