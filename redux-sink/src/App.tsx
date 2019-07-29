import { Breadcrumb, Icon, Layout, Menu, PageHeader } from 'antd';
import * as classNames from 'classnames';
import * as React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { useSink } from 'redux-sink';

import { RouteContent } from '@components/RouteContent';
import { NavigationSink } from '@services/navigation';
import { RouterSink } from '@services/router';

import logo from '@asserts/logo.svg';
import * as styles from './App.module.less';
import './styles/global.less';
import { BreadcrumbProps } from 'antd/lib/breadcrumb';

export const App: React.FunctionComponent = () => {
  const router = useSink(RouterSink);
  const navigation = useSink(NavigationSink);
  const routeKeys = navigation.activeRoute.keys;
  const rootRouteKey = routeKeys[0];
  const subRoute = rootRouteKey && router.routeMap[rootRouteKey];

  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Layout className={styles.layout}>
      <Layout.Sider
        collapsible={true}
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <div className={classNames(styles.logo, styles.header)}>
          <img
            className={classNames(styles.logoImg, { [styles.logoImgCollapsed]: collapsed })}
            src={logo}
          />
          {!collapsed && <h1 className={styles.logoText}>Redux Sink</h1>}
        </div>
        <Menu theme={'dark'} mode={'inline'} selectedKeys={routeKeys}>
          {router.routes.map((route) => (
            <Menu.Item key={route.key} title={route.name}>
              {route.link && (
                <Link to={route.link}>
                  {route.icon && <Icon type={route.icon} />}
                  {!collapsed && route.name}
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu>
      </Layout.Sider>

      <Layout>
        <Layout.Header style={{ background: '#fff', padding: 0 }}>
          <Menu
            theme={'dark'}
            mode={'horizontal'}
            selectedKeys={routeKeys}
            className={styles.header}
          >
            {subRoute &&
              subRoute.routes &&
              subRoute.routes.map((route) => (
                <Menu.Item className={styles.headerMenu} key={route.key}>
                  {route.link && <Link to={route.link}>{route.name}</Link>}
                </Menu.Item>
              ))}
          </Menu>
        </Layout.Header>
        <Layout.Content>
          <PageHeader 
            title={navigation.activeRoute.name} 
            breadcrumb={{ 
              routes: navigation.activeRoute.breadcrumbs,
            itemRender: (route) => {
              if (route.path === navigation.activeRoute.path) 
                return route.breadcrumbName
              return <Link to={route.path}>{ route.breadcrumbName}</Link>
            }} as BreadcrumbProps} 
          />
          <div className={styles.content}>
            <RouteContent />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
