import Loadable from 'react-loadable';

import { LazyLoading } from '@components/LazyLoading';

export const Calculator = Loadable({
  loader: () => import('./Calculator'),
  loading: LazyLoading,
});