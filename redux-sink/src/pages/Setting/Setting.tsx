import * as React from 'react';
import { useSink } from 'redux-sink';

import { RouteContent } from '@components/RouteContent';
import { SettingSink } from './SettingSink';

export default () => {
  const setting = useSink(SettingSink);

  return (
    <div>
      <RouteContent routeKey={setting.routeKey} />
    </div>
  )
}