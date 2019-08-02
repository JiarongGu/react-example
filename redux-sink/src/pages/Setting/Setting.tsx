import * as React from 'react';
import { sink, useSink } from 'redux-sink';

import { RouteContent } from '@components/RouteContent';
import { DynamicRouter } from '@services/dynamic/DynamicRouter';
import { settingRoutes } from './SettingRoutes';


@sink('setting-router')
export class SettingRouterSink extends DynamicRouter {
  constructor() {
    super('setting', settingRoutes);
  }
}

export default () => {
  const router = useSink(SettingRouterSink);
  return (
    <RouteContent routeKey={router.key} />
  )
}