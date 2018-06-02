import React from 'react';
import ImageLoad from 'react-native-image-placeholder';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
  AVARAT_SIZE,
  CENTER_STYLE,
  PLACEHOLDER,
  TEXT_SIZE,
  TITLE_SIZE,
  COLORS,
  TITLE_MIXIN,
  PADDING_MIXIN
} from '../constants';
import Comments from './Comments';


const MessagePost = (props) => (
  <View style={styles.main}>
    <View style={styles.content}>
      <View style={styles.avatar}>
        <View style={styles.avatarWrapper}>
          <ImageLoad
            style={styles.image}
            loadingStyle={{ size: 'small', color: 'white' }}
            source={{ uri: props.image }}
            placeholderSource={PLACEHOLDER}
            placeholderStyle={styles.image}
          />
          <View style={styles.fixCircleClipping}/>
        </View>
      </View>
      <View style={styles.message}>
        <Text style={styles.title}>{props.userName}</Text>
        <Text style={styles.text}>{props.message}</Text>

      </View>
    </View>
    <View style={styles.bottomWrapper}>
      <Comments count={props.comments}/>
    </View>
  </View>
);

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  content: {
    flexDirection: 'row',
  },
  avatarWrapper: {
    ...CENTER_STYLE,
    borderRadius: 50,
    width: AVARAT_SIZE,
    height: AVARAT_SIZE,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  avatar: {
    marginLeft: 10,
    marginRight: 15,
  },
  post: {
    width: '100%',
    height: 300
  },
  message: {
    ...CENTER_STYLE,
    width: '65%',
  },
  text: {
    fontSize: TEXT_SIZE,
    color: COLORS.FIORD,
  },
  title: {
    ...TITLE_MIXIN
  },
  fixCircleClipping: {
    position: 'absolute',
    top: -1,
    bottom: -1,
    right: -1,
    left: -1,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.RAVEN
  },
  bottomWrapper: {
    ...CENTER_STYLE,
    ...PADDING_MIXIN
  }
});

MessagePost.propTypes = {
  image: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
};

export default MessagePost;

