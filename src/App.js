import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import registerScreens from '.';

import reducers from './reducers';

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
        appStyle: {
          orientation: 'portrait',
        },
        animationType: 'slide-down'
    });
  }
}
