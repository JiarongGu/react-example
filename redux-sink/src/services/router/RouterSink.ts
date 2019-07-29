import { effect, sink, state, trigger } from 'redux-sink';

import { RouteModel } from './RouteModel';
import { routes } from './routes';

@sink('router')
export class RouterSink {
  @state public routes: Array<RouteModel> = routes;
  @state public routeMap: { [key: string]: RouteModel } = this.getRouteMap(routes);
  @state public root?: RouteModel = this.getRoot(routes);

  @effect
  public pushRoute(key: string, subRoutes: Array<RouteModel>) {
    this.routeMap[key].routes = subRoutes;
    this.routes = [...this.routes];
  }

  @trigger('router/routes')
  public routesTrigger(models: Array<RouteModel>) {
    this.routeMap = this.getRouteMap(models);
    this.root = this.getRoot(models);
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
}