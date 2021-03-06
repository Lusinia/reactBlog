import { Dimensions } from 'react-native';
import { ImageCacheManager } from 'react-native-cached-image';

export const NO_CLICKED_IMG = require('../../assets/icons/simple_heart.png');
export const CLICKED_IMG = require('../../assets/icons/heart_gloss_outlined_T.png');

export const COMMENTS = require('../../assets/icons/comment.png');
export const PLACEHOLDER = require('../../assets/icons/placeholder.png');
export const LOADING = require('../../assets/icons/photo-placeholder.png');

export const PHOTO_POST = 'photoPost';

export const TEXT_SIZE = 16;
export const TEXT_SIZE_SM = 13;
export const TITLE_SIZE = 25;
export const AVARAT_SIZE = 70;

export const APP_TITLE = 'News Feed';


export const CENTER_STYLE = {
  alignItems: 'center',
  justifyContent: 'center',
};

export const TABS = ['All', 'Messages', 'Photo'];

export const PADDING_MIXIN = {
  paddingBottom: 15,
  paddingLeft: 5,
  paddingTop: 15,
  paddingRight: 5,
};
export const MARGIN_MIXIN = {
  marginBottom: 15,
  marginTop: 15,
  marginLeft: 15,
  marginRight: 15,
};

export const TITLE_MIXIN = {
  fontSize: TITLE_SIZE,
  textAlign: 'center',
  color: '#39424C',
  paddingBottom: 6
};

export const WINDOW_WIDTH = Dimensions.get('window').width;

export const defaultImageCacheManager = ImageCacheManager();

export const BASE_URL = 'http://192.168.1.91:3000/v1/data';

export const FB_ACCESS = 'http://192.168.1.91:3000/v1/facebook_auth';
export const FB_PROFILE = 'http://192.168.1.91:3000/v1/protected';
export const APP_ID = 380032302442076;

export const FACEBOOK_BASE = `https://www.facebook.com/v3.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=fb380032302442076://authorize&state="{st=state123abc,ds=123456789}"&response_type=token`;
