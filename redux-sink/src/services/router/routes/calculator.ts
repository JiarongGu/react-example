import { Calculator } from '@pages/Calculator';
import { RouteModel } from '../RouteModel';

export default {
  name: 'Calculator',
  key: 'calculator',
  link: '/calculator',
  props: {
    exact: true, 
    component: Calculator
  },
  icon: 'calculator'
} as RouteModel