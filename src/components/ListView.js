import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';
import { CENTER_STYLE, PADDING_MIXIN, TEXT_SIZE } from '../constants';
import { COLORS } from '../constants/colors';

const ListItemSettings = (props) => {
  return (
    <View style={styles.main}>
      <Text style={[styles.text, { fontWeight: 'bold' }]}>{props.title}</Text>
      {props.onPressButton ?
        <TouchableHighlight
          style={styles.button}
          onPress={props.onPressButton}
          underlayColor={COLORS.DARK_TRANSPARENT}
          activeOpacity={90}
        >
          <Text style={styles.buttonText}>Ok</Text>
        </TouchableHighlight> :
        <Text style={styles.text}>{props.value}</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    ...PADDING_MIXIN,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    borderBottomColor: COLORS.CHALICE,
    borderBottomWidth: 1
  },
  button: {
    height: 40,
    width: '20%',
    ...CENTER_STYLE,
    backgroundColor: COLORS.CURIOUS_BLUE,
  },
  text: {
    fontSize: TEXT_SIZE,
    color: COLORS.FIORD,
    marginLeft: 7
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: TEXT_SIZE,
    fontWeight: 'bold'
  }
});


ListItemSettings.propTypes = {
  onPressButton: PropTypes.func,
  title: PropTypes.string,
  value: PropTypes.string,
};

export default ListItemSettings;

