import { RouteModel } from '../RouteModel';
import calculator from './calculator';
import counter from './counter';
import home from './home';
import setting from './setting';

export const routes: Array<RouteModel> = [
  home,
  counter,
  calculator,
  setting
];