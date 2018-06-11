import React, { Component } from 'react';
import { Alert, SectionList, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS } from '../constants/colors';
import { defaultImageCacheManager, PADDING_MIXIN, TEXT_SIZE } from '../constants';
import { connect } from 'react-redux';
import ListItemSettings from '../components/ListView';
import { setCacheData } from '../actions/cache';
import { formatBytes } from '../helpers';
import { setError } from '../actions/root';


class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cacheSize: 0,
      cachedFiles: 0
    };
    this.cleanCache = this.cleanCache.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

  }

  onNavigatorEvent(event) {
    if (event.id === 'willAppear') {
      this.getCacheInfo();
    }
  }

  cleanCache() {
    defaultImageCacheManager.getCacheInfo()
      .then(() => {
        defaultImageCacheManager.clearCache()
          .then(() => {
            this.getCacheInfo();
          }).catch(() => {
          this.props.setError('You cannot clean the cache.');
          Alert.alert(
            'You cannot clean the cache.',
            'Wait for the images to finish loading.'
          );
        });
      });
  }


  getCacheInfo() {
    defaultImageCacheManager.getCacheInfo().then(({ size, files }) => {
      this.props.setCacheData({ size, files });
    }).catch(() => {
      this.props.setError('You cannot get the size of the cache');
      Alert.alert(
        'You cannot get the size of the cache.',
        'Wait for the images to finish loading.'
      );
    });
  }


  render() {
    return (
      <View style={styles.main}>
        <SectionList
          renderItem={({ item }) => <ListItemSettings
            title={item.title} value={`${item.value}`}
            onPressButton={item.onPressButton}/>}
          sections={[
            { data: [{ title: 'Cached size', value: formatBytes(this.props.cacheData.size) }] },
            { data: [{ title: 'Cached files', value: `${this.props.cacheData.files.length || 0}` }] },
            { data: [{ title: 'Clean cache', onPressButton: this.cleanCache }] }
          ]}
        />
      </View>
    );
  }
}

Settings.propTypes = {
  navigator: PropTypes.object,
  setCacheData: PropTypes.func,
  setError: PropTypes.func,
  cacheData: PropTypes.object,
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
  }
});

const mapStateToProps = (state) => ({
  cacheData: state.cacheData.data
});

export default connect(mapStateToProps, { setCacheData, setError })(Settings);

