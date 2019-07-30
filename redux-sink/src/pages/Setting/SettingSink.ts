import { sink, SinkContainer, SinkFactory } from 'redux-sink';

import { DynamicRouter } from '@services/dynamic/DynamicRouter';
import { RouteModel } from '@services/navigation/models/RouteModel';
import { NavigationSink } from '@services/navigation/NavigationSink';
import { SettingCommon } from './SettingCommon';
import { SettingForm } from './SettingForm';

@sink('setting', SinkFactory)
export class SettingSink extends DynamicRouter {
  protected routes: Array<RouteModel> = [
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

  constructor(container: SinkContainer) {
    super('setting', container.getSink(NavigationSink));
  }
}