import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import Likes from './Likes';
import Date from './Date';
import Comments from './Comments';
import { LOADING, TITLE_MIXIN, WINDOW_WIDTH } from '../constants';
import { CachedImage } from 'react-native-cached-image';

const PhotoPost = (props) => {
  return (
    <View>
      <Text style={styles.title}>{props.userName}</Text>
      <View style={styles.imageWrapper}>
        <CachedImage
          source={{ uri: props.image }}
          defaultSource={LOADING}
          fallbackSource={LOADING}
          style={{
            width: WINDOW_WIDTH * .98,
            height: WINDOW_WIDTH * .98
          }}
        />
      </View>
      <View style={styles.bottomWrapper}>
        <Likes likesCount={props.likes}/>
        <Comments count={props.comments}/>
        <Date date={props.date}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WINDOW_WIDTH * .98,
    height: WINDOW_WIDTH * .98
  },
  title: {
    ...TITLE_MIXIN
  },
  image: {
    width: '100%',
    height: '100%'
  },
  post: {
    width: '100%',
    height: 300
  },
  bottomWrapper: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

PhotoPost.propTypes = {
  image: PropTypes.string,
  userName: PropTypes.string,
  date: PropTypes.string,
  likes: PropTypes.number,
  comments: PropTypes.number,
};

export default PhotoPost;

