import { ActiveRoute } from '@services/navigation/models/ActiveRoute';
import { RouteModel } from '@services/navigation/models/RouteModel';
import { NavigationSink } from '@services/navigation/NavigationSink';
import { state, trigger } from 'redux-sink';

export class DynamicRouter {
  @state public key: string;
  @state public loaded = false;

  protected routes: Array<RouteModel> = [];

  constructor(
    key: string,
    protected navigation: NavigationSink
  ) {
    this.key = key;
  }

  @trigger('navigation/activeRoute')
  public loadRoute(activeRoute: ActiveRoute) {
    if(!this.loaded && activeRoute.keys.some(key => key === this.key)) {
      this.loaded = true;
      this.navigation.pushRoute(this.key, this.routes);
    }
  }
}