import Loadable from 'react-loadable';

import { LazyLoading } from '@components/LazyLoading';

export const Counter = Loadable({
  loader: () => import('./Counter'),
  loading: LazyLoading,
});