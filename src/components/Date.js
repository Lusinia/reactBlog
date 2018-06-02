import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TEXT_SIZE_SM, COLORS } from '../constants';

const Date = (props) => (
  <View style={styles.main}>
    <Text style={styles.text}>{moment(props.date).format('MMM DD, HH:hh')}</Text>
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

