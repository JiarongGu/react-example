import { Home } from '@pages/Home';
import { RouteModel } from '../models/RouteModel';

export default {
  name: 'Home',
  key: 'home',
  icon: 'home',
  link: '/',
  props: {
    exact: true, 
    component: Home 
  }
} as RouteModel