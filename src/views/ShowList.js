import React, { Component } from 'react';
import SegmentControl from 'react-native-segment-controller';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setData } from '../actions/fetchData';
import PhotoPost from '../components/PhotoPost';
import MessagePost from '../components/MessagePost';
import { COLORS, defaultImageCacheManager, MARGIN_MIXIN, PADDING_MIXIN, PHOTO_POST, TABS } from '../constants';
import { selectTab } from '../actions/root';
import { randomDate, toggleDrawer } from '../helpers';
import { ImageCacheProvider } from 'react-native-cached-image';
import { setCacheData } from '../actions/cache';

class ShowList extends Component {

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Settings',
        id: 'edit',
        buttonColor: COLORS.CURIOUS_BLUE,
        buttonFontSize: 14,
        buttonFontWeight: '600',
      }
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      postsCount: [0, 0, 0],
      posts: [],
      refreshing: false,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.getPosts = this.getPosts.bind(this);
    this.getImages = this.getImages.bind(this);
  }

  async componentDidMount() {
    await this.fetchData();
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'edit') {
        toggleDrawer(this.props.navigator);
      }
    }
  }

  async fetchData() {
    await this.props.setData();
    const result = this.props.fetchedData;
    const messageCount = this.getMessagePosts(result).length;
    const photoCount = this.getPhotoPosts(result).length;
    const sum = messageCount + photoCount;
    this.setState({ postsCount: [sum, messageCount, photoCount] });
  }

  getPhotoPosts(data) {
    return data ? data.filter(item => item.type === PHOTO_POST) : [];
  }

  getMessagePosts(data) {
    return data ? data.filter(item => item.type !== PHOTO_POST) : [];
  }

  getAllPosts(data) {
    if (data) {
      return data.map((item, index) => {
        let post = null;
        if (item.type === PHOTO_POST) {
          post = <PhotoPost
            userName={item.userName}
            image={item.imageURL}
            likes={item.likesCount}
            comments={item.commentsCount}
            date={`${randomDate()}`}
          />;
        } else {
          post = <MessagePost
            image={item.imageURL}
            userName={item.userName}
            message={item.message}
            comments={item.commentsCount}
          />;
        }
        return <View style={styles.postWrapper} key={index}>{post}</View>;
      });
    }
  }

  getPosts(data) {
    if (data && data.length) {
      let posts = null;
      switch (this.props.selectedTab) {
        case 1:
          posts = this.getMessagePosts(data);
          break;
        case 2:
          posts = this.getPhotoPosts(data);
          break;
        default:
          posts = data;
          break;
      }
      return posts;
    } else {
      return [];
    }
  }

  async selectTab(index) {
    await this.props.selectTab(index);
  }

  getImages(data) {
    return data.map(item => item.imageURL);
  }

  async deleteCacheURL() {
    const images = this.getImages(this.props.fetchedData);
    await Promise.all(images.map(async image => {
      await defaultImageCacheManager.deleteUrl(image);
    }))
      .then((res) => {
        defaultImageCacheManager.getCacheInfo()
          .then(({ size, files }) => {
            this.props.setCacheData({ size, files });
            this.setState({ refreshing: false });
            images.forEach(image => {
              defaultImageCacheManager.downloadAndCacheUrl(image);
            });
          });
      });
  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.segmentWrapper}>
          <SegmentControl
            values={TABS}
            badges={this.state.postsCount}
            selectedIndex={this.props.selectedTab || 0}
            height={30}
            onTabPress={async (index) => {
              this.selectTab(index);
            }}
            borderRadius={5}
          />
        </View>
        <View>
          <ImageCacheProvider
            urlsToPreload={this.getImages(this.getPosts(this.props.fetchedData))}
            numberOfConcurrentPreloads={3}
          >
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.deleteCacheURL.bind(this)}
                />
              }
            >
              {this.getAllPosts(this.getPosts(this.props.fetchedData))}
            </ScrollView>
          </ImageCacheProvider>
        </View>
      </View>
    );
  }
}

ShowList.propTypes = {
  navigator: PropTypes.object,
  setData: PropTypes.func,
  fetchedData: PropTypes.array,
  selectedTab: PropTypes.number,
  selectTab: PropTypes.func,
  setCacheData: PropTypes.func,
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.WHITE
  },
  postWrapper: {
    ...PADDING_MIXIN,
    borderBottomColor: COLORS.CHALICE,
    borderBottomWidth: 1,
  },
  segmentWrapper: {
    ...MARGIN_MIXIN
  },
  text: {
    color: 'black'
  }
});

const mapStateToProps = (state) => ({
  fetchedData: state.fetchedData.data,
  selectedTab: state.root.selectedTab
});

export default connect(mapStateToProps, { setData, selectTab, setCacheData })(ShowList);

