import { Icon, Layout, Menu } from 'antd';
import * as classNames from 'classnames';
import * as React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { useSink } from 'redux-sink';

import { RouterSink } from './services/router';

import logo from '@asserts/logo.svg';
import * as styles from './App.module.less';
import './styles/global.less';

export const App: React.FunctionComponent = () => {
  const router = useSink(RouterSink);
  const [collapsed, setCollapsed] = React.useState(false);
  const selectedKeys = router.routes[0];

  return (
    <Layout className={styles.layout}>
      <Layout.Sider trigger={null} collapsible={true} collapsed={collapsed}>
        <div className={styles.logo}>
          <img
            className={classNames(styles.logoImg, { [styles.logoImgCollapsed]: collapsed })}
            src={logo}
          />
          {!collapsed && <h1 className={styles.logoText}>Redux Sink</h1>}
        </div>
        <Menu theme={'dark'} mode={'inline'} defaultSelectedKeys={selectedKeys && [selectedKeys.name]}>
          {router.routes.map((route) => (
            <Menu.Item key={route.name}>
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
          <Icon
            className={'trigger'}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Layout.Header>
        <Layout.Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280
          }}
        >
          {router.routes.map((route, index) => (
            <Route key={index} {...route.props} />
          ))}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
