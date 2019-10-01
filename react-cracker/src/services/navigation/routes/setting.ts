import { Setting } from '@pages/Setting';
import { RouteModel } from '../models/RouteModel';

export default {
  key: 'setting',
  link: '/setting',
  name: 'Setting',
  icon: 'setting',
  props: {
    strict: true,
    component: Setting
  }
} as RouteModel