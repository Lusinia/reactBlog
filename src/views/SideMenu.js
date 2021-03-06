import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';
import { PADDING_MIXIN, TABS, TEXT_SIZE } from '../constants';
import { COLORS } from '../constants/colors';
import { connect } from 'react-redux';
import { selectTab } from '../actions/root';
import { toggleDrawer } from '../helpers';


const SideMenu = (props) => {
  const onSelectTab = (tab) => {
    props.selectTab(tab);
    toggleDrawer(props.navigator, 'left', 'closed');
  };

  return (
    <View style={styles.main}>
      {props.userInfo &&
      <View style={styles.bordered}>
        <Text style={[styles.text, styles.name]}>{props.userInfo.name}</Text>
      </View>}
      {TABS.map((item, index) => (
        <View key={item}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => onSelectTab(index)}
            underlayColor={COLORS.DARK_TRANSPARENT}
            activeOpacity={90}
          >
            <Text style={[styles.text, props.selectedTab === index ? styles.active : null]}>{item}</Text>
          </TouchableHighlight>
        </View>
      ))
      }
    </View>
  );
};

SideMenu.propTypes = {
  selectTab: PropTypes.func,
  navigator: PropTypes.object,
  userInfo: PropTypes.object,
  fetchedData: PropTypes.array,
  selectedTab: PropTypes.number,
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.WHITE
  },
  text: {
    color: COLORS.FIORD,
    fontSize: TEXT_SIZE,
    textAlign: 'center'
  },
  button: {
    marginTop: 15,
    ...PADDING_MIXIN
  },
  active: {
    color: COLORS.CURIOUS_BLUE
  },
  name: {
    color: COLORS.GOLDEN,
    fontWeight: 'bold'
  },
  bordered: {
    ...PADDING_MIXIN,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.RAVEN
  }
});

const mapStateToProps = (state) => ({
  selectedTab: state.root.selectedTab,
  userInfo: state.user.userInfo
});

export default connect(mapStateToProps, { selectTab })(SideMenu);

