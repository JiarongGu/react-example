import { Breadcrumb, Icon, Layout, Menu } from 'antd';
import * as classNames from 'classnames';
import * as React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { useSink } from 'redux-sink';

import { NavigationSink } from '@services/navigation';
import { RouterSink } from '@services/router';

import logo from '@asserts/logo.svg';
import * as styles from './App.module.less';
import './styles/global.less';

export const App: React.FunctionComponent = () => {
  const router = useSink(RouterSink);
  const navigation = useSink(NavigationSink);
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Layout className={styles.layout}>
      <Layout.Sider
        collapsible={true}
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <div className={styles.logo}>
          <img
            className={classNames(styles.logoImg, { [styles.logoImgCollapsed]: collapsed })}
            src={logo}
          />
          {!collapsed && <h1 className={styles.logoText}>Redux Sink</h1>}
        </div>
        <Menu theme={'dark'} mode={'inline'} defaultSelectedKeys={navigation.activeRoute.keys}>
          {router.routes.map((route) => (
            <Menu.Item key={route.key}>
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
        <Layout.Header style={{ background: '#fff', padding: 0 }} />
        <Layout.Content className={styles.content}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {navigation.activeRoute.breadcrumb.map((name, index) => (
              <Breadcrumb.Item key={index}>{name}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          {router.routes.map((route, index) => (
            <Route key={index} {...route.props} />
          ))}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
