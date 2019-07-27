import { sink, state, trigger } from 'redux-sink';

import { RouteModel } from './RouteModel';
import { routes } from './routes';

@sink('router')
export class RouterSink {
  @state public routes: Array<RouteModel> = routes;
  @state public routeMap: { [key: string]: RouteModel } = this.getRouteMap(routes);

  @trigger('router/routes')
  public routesTrigger(models: Array<RouteModel>) {
    this.routeMap = this.getRouteMap(models);
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