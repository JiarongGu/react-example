import { RouteModel } from '../RouteModel';
import counter from './counter';
import home from './home';
import setting from './setting';

export const routes: Array<RouteModel> = [
  home,
  counter,
  setting
];