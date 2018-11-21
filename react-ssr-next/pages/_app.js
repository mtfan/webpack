import App, { Container } from 'next/app';
import React from 'react';
import { withRouter } from 'next/router';

import Home from 'pages/home';
import Found from 'pages/found';
import MinePage from 'pages/mine';
import TabBarLink from 'components/TabBarLink';

import './../static/sass/common/_base.scss';

@withRouter
export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, router } = this.props;
    let isTabBar = /home|found|mine/.test(router.pathname);
    const navList = [
      {
        path: '/home',
        text: '首页',
        icon: 'home',
        title: '首页',
        component: Home
      },
      {
        path: '/found',
        text: '发现',
        icon: 'found',
        title: '发现',
        component: Found
      },
      {
        path: '/mine',
        text: '我的',
        icon: 'mine',
        title: '我的',
        component: MinePage
      }
    ];
    return (
      <Container>
        <Component {...pageProps} />
        {isTabBar ? <TabBarLink navList={navList} /> : ''}
      </Container>
    );
  }
}
