import React, { Component } from 'react';
import SegmentControl from 'react-native-segment-controller';
import { SectionList, StyleSheet, Text, View } from 'react-native';
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
      startLoadingPost: 0,
      limitCacheSize: 10,
      limitPosts: 3,
      chunk: 7
    };
    this.isLoaded = false;
    this.onEndReached = false;
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.getPosts = this.getPosts.bind(this);
    this.getImages = this.getImages.bind(this);
    this.onEndReachedTrigger = this.onEndReachedTrigger.bind(this);
    this.onPreloadCompleteTrigger = this.onPreloadCompleteTrigger.bind(this);
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

  getOnePost({ item }) {
    if (item) {
      let post = null;
      if (item.type === PHOTO_POST) {
        post = <PhotoPost
          userName={item.userName}
          image={item.imageURL}
          likes={item.likesCount}
          comments={item.commentsCount}
          date={randomDate()}
        />;
      } else {
        post = <MessagePost
          image={item.imageURL}
          userName={item.userName}
          message={item.message}
          comments={item.commentsCount}
        />;
      }
      return <View style={styles.postWrapper}>{post}</View>;
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
    this.isLoaded = false;
    return this.getPosts(data).map(item => item.imageURL);
  }

  async onEndReachedTrigger() {
    this.onEndReached = true;
    const condition = this.isLoaded && this.props.fetchedData.length;
    if (condition) {
      const restPosts = this.props.fetchedData.length - this.state.limitPosts;
      const postsToLoad = restPosts >= this.state.chunk ? this.state.chunk : restPosts;
      await this.setState(prevState => ({
          limitPosts: prevState.limitPosts + postsToLoad,
          startLoadingPost: prevState.limitPosts
        })
      );
      this.onEndReached = false;
      this.isLoaded = false;
    }
  }

  async onPreloadCompleteTrigger() {
    if (this.onEndReached) {
      this.isLoaded = false;
      await Promise.all(this.props.fetchedData.slice(this.state.startLoadingPost, this.state.limitPosts)
        .map(async (item) => {
          await defaultImageCacheManager.downloadAndCacheUrl(item.imageURL);
        })
      );
      this.isLoaded = true;

    } else {
      this.isLoaded = true;
    }
  }

  getSections(data) {
     return this.getPosts(data).slice(0, this.state.limitPosts).map(item => ({ data: [{ item }] }));
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
          urlsToPreload={this.getImages(this.props.fetchedData.slice(0, 3))}
          numberOfConcurrentPreloads={this.state.chunk}
          onPreloadComplete={this.onPreloadCompleteTrigger}
          >
          <SectionList
            renderItem={({ item }) => this.getOnePost(item)}
            sections={this.getSections(this.props.fetchedData)}
            keyExtractor={({ item }) => item._id}
            extraData={this.state}
            onEndReached={this.onEndReachedTrigger}
            onEndReachedThreshold={0.1}
            ListFooterComponent={() => {
              return this.isLoaded && this.props.fetchedData.length ?
                <Text style={styles.text}> Wait a moment...</Text> :
                null;
            }
            }
          />
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
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.WHITE,
    marginBottom: 30
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
    color: 'black',
    marginBottom: 30
  }
});

const mapStateToProps = (state) => ({
  fetchedData: state.fetchedData.data,
  selectedTab: state.root.selectedTab
});

export default connect(mapStateToProps, { setData, selectTab, setCacheData })(ShowList);

