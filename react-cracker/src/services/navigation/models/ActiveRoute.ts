import { BreadcrumbModel } from './BreadcrumbModel';

export interface BasicActiveRoute {
  params: { [key: string]: any };
  keys: Array<string>;
  path: string;
  breadcrumbs: Array<BreadcrumbModel>;
  name: string;
}

export interface ActiveRoute extends BasicActiveRoute {
  queryParams: { [key: string]: string | null };
}