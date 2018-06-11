import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS, TEXT_SIZE_SM } from '../constants';

const Date = (props) => (
  <View style={styles.main}>
    <Text style={styles.text}>{props.date}</Text>
  </View>
);

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '35%',
  },
  text: {
    fontSize: TEXT_SIZE_SM,
    color: COLORS.FIORD,
  }
});


Date.propTypes = {
  date: PropTypes.string.isRequired,
};

export default Date;

