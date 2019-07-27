import { RouteProps } from 'react-router';

export class RouteModel {
  constructor(
    public name: string,
    public props: RouteProps,
    public link?: string
  ){}
}