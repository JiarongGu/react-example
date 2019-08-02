import { SettingCommon } from './Common/SettingCommon';
import { SettingForm } from './Form/SettingForm';

export const settingRoutes = [
  {
    name: 'Common',
    key: 'setting.common',
    link: '/setting',
    props: {
      exact: true,
      component: SettingCommon,
      path: ['/setting', '/setting/common']
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
];