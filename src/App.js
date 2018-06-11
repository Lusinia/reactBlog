import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import registerScreens from '.';
import logger from 'redux-logger';

import reducers from './reducers';
import { ROUTES } from './constants';

console.disableYellowBox = true;

export const store = createStore(reducers, applyMiddleware(thunk, logger));

registerScreens(store, Provider);

export default class App extends Component {

  constructor(props) {
    super(props);
    Navigation.startSingleScreenApp({
      screen: {
        screen: ROUTES.LOGIN,
      },
      drawer: {
        left: {
          screen: ROUTES.ASIDE,
          passProps: {},
          disableOpenGesture: true,
          fixedWidth: '50%'
        },
        right: {
          screen: ROUTES.SETTINGS,
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
