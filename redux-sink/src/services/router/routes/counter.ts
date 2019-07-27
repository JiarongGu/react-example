import { Counter } from '@pages/Counter';
import { RouteModel } from '../RouteModel';

export default {
  name: 'Counter',
  key: 'counter',
  link: '/counter',
  props: {
    exact: true, 
    component: Counter 
  },
  icon: 'plus-square'
} as RouteModel