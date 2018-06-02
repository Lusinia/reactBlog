import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import ImageLoad from 'react-native-image-placeholder';
import Likes from './Likes';
import Date from './Date';
import Comments from './Comments';
import { TITLE_MIXIN } from '../constants';


const PhotoPost = (props) => {
  return (
    <View>
      <Text style={styles.title}>{props.userName}</Text>
      <View style={styles.imageWrapper}>
        <ImageLoad
          style={styles.image}
          loadingStyle={{ size: 'small', color: 'white' }}
          source={{ uri:  props.image }}
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
    width: '100%'
  },
  title: {
    ...TITLE_MIXIN
  },
  image: {
    width: 200,
    height: 200,
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

