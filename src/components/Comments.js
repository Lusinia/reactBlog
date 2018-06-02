import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { CENTER_STYLE, COMMENTS, TEXT_SIZE_SM } from '../constants';
import { COLORS } from '../constants/colors';

const Comments = (props) => {
  return (
    <View style={styles.main}>
      <Image
        style={styles.image}
        source={COMMENTS}
      />
      <Text style={styles.text}>{props.count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    ...CENTER_STYLE,
    width: '33%',
  },
  image: {
    width: 25,
    height: 20,
    resizeMode: 'contain'
  },
  text: {
    fontSize: TEXT_SIZE_SM,
    color: COLORS.FIORD,
    marginLeft: 7
  }
});


Comments.propTypes = {
  count: PropTypes.number,
};

export default Comments;

