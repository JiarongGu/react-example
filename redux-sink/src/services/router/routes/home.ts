import { Home } from '@components/Home';
import { RouteModel } from '../RouteModel';

export default {
  name: 'Home',
  props: { 
    path: '/', 
    exact: true, 
    component: Home 
  }, 
  link: '/',
  icon: 'home'
} as RouteModel