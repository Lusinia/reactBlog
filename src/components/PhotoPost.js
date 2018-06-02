import React, { Component } from 'react';
import { View, Text } from 'react-native';


class PhotoPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <View style={styles.main}>
        <Text style={styles.text}>PhotoPost</Text>
      </View>
    );
  }
}


export default PhotoPost;

