import { Counter } from '@components/Counter';
import { Home } from '@components/Home';
import { sink, state } from 'redux-sink';
import { RouteModel } from './RouteModel';

@sink('router')
export class RouterSink {
  @state public routes: Array<RouteModel> = [
    new RouteModel('Home', { path: '/', exact: true, component: Home }, '/'),
    new RouteModel('Counter', { path: '/counter', exact: true, component: Counter }, '/counter')
  ];
}