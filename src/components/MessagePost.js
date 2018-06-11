import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { AVARAT_SIZE, CENTER_STYLE, COLORS, PADDING_MIXIN, PLACEHOLDER, TEXT_SIZE, TITLE_MIXIN } from '../constants';
import Comments from './Comments';
import { CachedImage } from 'react-native-cached-image';


const MessagePost = (props) => {
  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <View style={styles.avatar}>
          <View style={styles.avatarWrapper}>
            <CachedImage
              source={{ uri: props.image }}
              defaultSource={PLACEHOLDER}
              fallbackSource={PLACEHOLDER}
              style={{
                width: 70,
                height: 70
              }}
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
};

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

