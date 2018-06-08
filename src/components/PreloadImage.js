import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { LOADING } from '../constants';
import { CachedImage } from 'react-native-cached-image';


class PreloadImage extends Component {
  render() {
    return (
      <View>
        <CachedImage
          source={{ uri: this.props.image }}
          defaultSource={LOADING}
          fallbackSource={LOADING}
          style={styles.image}
        />
      </View>
    );
  }
}

PreloadImage.propTypes = {
  image: PropTypes.string,
  styles: PropTypes.object,
};

const styles = StyleSheet.create({
  image: {
    maxWidth: 1000,
    maxHeight: 1000,
    resizeMode: 'cover'
  }
});
export default PreloadImage;