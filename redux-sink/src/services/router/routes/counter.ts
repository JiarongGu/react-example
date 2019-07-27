import { Counter } from '@components/Counter';
import { RouteModel } from '../RouteModel';

export default {
  name: 'Counter',
  props: { 
    path: '/counter', 
    exact: true, 
    component: Counter 
  }, 
  link: '/counter',
  icon: 'plus-square'
} as RouteModel