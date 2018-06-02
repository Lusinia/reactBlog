import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { CLICKED_IMG, NO_CLICKED_IMG, TEXT_SIZE_SM } from '../constants';
import { COLORS } from '../constants/colors';

class Likes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      likesCount: props.likesCount
    };
    this.onPressLike = this.onPressLike.bind(this);
  }

  async onPressLike() {
    await this.setState(prevState => ({
      clicked: !prevState.clicked,
      likesCount: !prevState.clicked ? ++prevState.likesCount : --prevState.likesCount
    }));
  }

  render() {
    return (
      <View style={styles.main}>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={this.onPressLike}
          underlayColor='transparent'
          activeOpacity={0}
        >
          <Image
            style={styles.image}
            source={this.state.clicked ? CLICKED_IMG : NO_CLICKED_IMG}
          />
        </TouchableHighlight>
        <Text style={styles.text}>{this.state.likesCount}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '33%',
  },
  image: {
    width: '98%',
    height: '98%',
    resizeMode: 'center'
  },
  text: {
    fontSize: TEXT_SIZE_SM,
    color: COLORS.FIORD,
    marginLeft: 7
  },
  wrapper: {
    width: 35,
    height: 35,
  }
});


Likes.propTypes = {
  likesCount: PropTypes.number.isRequired,
};

export default Likes;

