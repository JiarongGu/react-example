import * as Loadable from 'react-loadable';

import { LazyLoading } from '@components/LazyLoading';

export const Setting = Loadable({
  loader: () => import('./Setting'),
  loading: LazyLoading,
});