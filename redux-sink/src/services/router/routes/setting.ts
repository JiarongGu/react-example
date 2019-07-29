import { Setting, SettingCommon, SettingForm } from '@pages/Setting';
import { RouteModel } from '../RouteModel';

export default {
  name: 'Setting',
  key: 'setting',
  link: '/setting',
  icon: 'setting',
  props: {
    strict: true,
    component: Setting
  },
  routes: [
    { 
      name: 'Common',
      key: 'setting.common',
      link: '/setting',
      props: {
        exact: true,
        component: SettingCommon,
      } 
    },
    { 
      name: 'Form',
      key: 'setting.form',
      link: '/setting/form',
      props: {
        exact: true,
        component: SettingForm,
      } 
    }
  ]
} as RouteModel