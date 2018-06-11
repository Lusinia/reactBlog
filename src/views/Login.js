import React, { Component } from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View, Platform, ActivityIndicator } from 'react-native';
import { APP_TITLE, CENTER_STYLE, FACEBOOK_BASE, PADDING_MIXIN, TEXT_SIZE, WINDOW_WIDTH } from '../constants';
import { connect } from 'react-redux';
import { COLORS } from '../constants/colors';
import { sendLoginRequest } from '../actions/facebookLogin';
import PropTypes from 'prop-types';
import { setError } from '../actions/root';
import { ROUTES } from '../constants/routes';

class Login extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    drawUnderStatusBar: Platform.OS !== 'ios',
    statusBarColor: COLORS.BLACK,
    disabledBackGesture: true
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this.startApp = this.startApp.bind(this);
    this.invokeDialogWindow = this.invokeDialogWindow.bind(this);
    this.handleOpenURL = this.handleOpenURL.bind(this);
  }

  startApp() {
    this.props.navigator.resetTo({
      screen: ROUTES.SHOW_LIST,
      title: APP_TITLE,
      anamated: true,
      animationType: 'slide-horizontal'
    });
  }

  invokeDialogWindow() {
    Linking.openURL(FACEBOOK_BASE);
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  async handleOpenURL(event) {
    if (event.url) {
      const token = event.url.split('access_token=')[1].split('&expires')[0];
      this.setState({ isLoading: true });
      await this.props.sendLoginRequest(token);
      if (this.props.userInfo) {
        this.setState({ isLoading: false });
        this.startApp();
      } else {
        this.props.setError('Cannot recieve user info');
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.button}>
          <TouchableOpacity onPress={this.invokeDialogWindow}>
            <Text style={styles.text}>
              FACEBOOK LOGIN
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.button, styles.guest]}>
          <TouchableOpacity onPress={this.startApp}>
            <Text style={styles.text}>
              OPEN AS GUEST
            </Text>
          </TouchableOpacity>
        </View>

        {this.state.isLoading &&
        <View style={styles.bottomBlock}>
          <ActivityIndicator size="large" color={COLORS.RAVEN}/>
        </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  button: {
    margin: 10,
    ...PADDING_MIXIN,
    backgroundColor: COLORS.CURIOUS_BLUE,
    borderRadius: 5,
    minWidth: WINDOW_WIDTH * 0.7
  },
  guest: {
    backgroundColor: COLORS.FIORD
  },
  text: {
    textAlign: 'center',
    fontSize: TEXT_SIZE,
    color: COLORS.WHITE
  },
  bottomBlock: {
    ...CENTER_STYLE,
    flexDirection: 'row',
    height: '0%',
    width: WINDOW_WIDTH
  }
});
Login.propTypes = {
  navigator: PropTypes.object,
  sendLoginRequest: PropTypes.func,
  setError: PropTypes.func,
  userInfo: PropTypes.object,
};

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo
});
export default connect(mapStateToProps, { sendLoginRequest, setError })(Login);
