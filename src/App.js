import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import registerScreens from '.';

import reducers from './reducers';

console.disableYellowBox = true;

export const store = createStore(reducers, applyMiddleware(thunk));

registerScreens(store, Provider);

export default class App extends Component {

  constructor(props) {
    super(props);
      Navigation.startSingleScreenApp({
      screen: {
        screen: 'blog.ShowList',
        title: 'News Feed',
        navigatorStyle: {},
        navigatorButtons: {}
      },
        drawer: {
          left: {
            screen: 'blog.SideMenu',
            passProps: {},
            disableOpenGesture: true,
            fixedWidth: '50%'
          },
          right: {
            screen: 'blog.Settings',
            passProps: {},
            disableOpenGesture: true,
            fixedWidth: '50%'
          },
          style: {
            drawerShadow: true,
            contentOverlayColor: 'rgba(0,0,0,0.25)',
            leftDrawerWidth: 50,
            rightDrawerWidth: 50
          },
          type: 'MMDrawer',
          animationType: 'door',
        },
        appStyle: {
          orientation: 'portrait',
        },
        animationType: 'slide-down'
    });
  }
}
