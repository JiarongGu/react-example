import { sink, SinkFactory, state, trigger } from 'redux-sink';

import { ActiveRoute } from '@services/navigation/NavigationSink';
import { RouteModel } from '@services/router/RouteModel';
import { RouterSink } from '@services/router/RouterSink';
import { SettingCommon } from './SettingCommon';
import { SettingForm } from './SettingForm';

const routes: Array<RouteModel> = [
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

@sink('setting')
export class SettingSink {
  @state public routeKey = 'setting';
  @state public loaded = false;

  private router: RouterSink;

  constructor() {
    this.router = SinkFactory.sink(RouterSink);
  }

  @trigger('navigation/activeRoute')
  public locationTrigger(activeRoute: ActiveRoute) {
    if(!this.loaded && activeRoute.keys.some(key => key === this.routeKey)) {
      this.loaded = true;
      this.router.pushRoute(this.routeKey, routes);
    }
  }
}