import { sink, state } from 'redux-sink';

import { RouteModel } from './RouteModel';
import { routes } from './routes';

@sink('router')
export class RouterSink {
  @state public routes: Array<RouteModel> = routes;
}