import { Home } from '@components/Home';
import { RouteProps } from 'react-router';
import { sink, state } from 'redux-sink';

@sink('router')
export class RouterSink {
  @state public routes: Array<RouteProps> = [
    { path: '/', exact: true, component: Home }
  ];
}