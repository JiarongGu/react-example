import { RouteProps } from 'react-router';

export interface RouteModel {
  name: string;
  props: RouteProps;
  link?: string;
  icon?: string;
  routes?: Array<RouteModel>;
}