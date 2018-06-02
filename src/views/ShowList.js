import React, { Component } from 'react';
import SegmentControl from 'react-native-segment-controller';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setData } from '../actions/fetchData';
import PhotoPost from '../components/PhotoPost';
import data from '../../public/Data.json';
import MessagePost from '../components/MessagePost';
import { MARGIN_MIXIN, PADDING_MIXIN, PHOTO_POST } from '../constants';

class ShowList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: 0,
      postsCount: [0,0,0],
      list: [],
      offset: 0,
      limit: 3
    };
  }

  async componentDidMount() {
    await this.fetchData();
  }

  async fetchData() {
    await this.props.setData(data);
    const result = this.props.fetchedData;
    const messageCount = this.getMessagePosts(result).length;
    const photoCount = this.getPhotoPosts(result).length;
    const sum = messageCount + photoCount;
    this.setState({ postsCount: [sum, messageCount, photoCount] });
  }

  getPhotoPosts(data) {
    return data.filter(item => item.type === PHOTO_POST);
  }

  getMessagePosts(data) {
    return data.filter(item => item.type !== PHOTO_POST);
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
            date={`${new Date()}`}
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
    if (data) {
      let posts = null;
      switch (this.state.clicked) {
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
    }
  }

  render() {
    return (
      <View style={styles.main}>
      <View style={styles.segmentWrapper}>
        <SegmentControl
          values={['All', 'Messages', 'Photo']}
          badges={this.state.postsCount}
          selectedIndex={this.state.clicked}
          height={30}
          onTabPress={(index) => {
            this.setState({ clicked: index });
          }}
          borderRadius={5}
        />
      </View>
        <ScrollView>
          {this.getAllPosts(this.getPosts(this.props.fetchedData))}
        </ScrollView>
      </View>
    );
  }
}

ShowList.propTypes = {
  navigator: PropTypes.object.isRequired,
  setData: PropTypes.func,
  fetchedData: PropTypes.array,
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%'
  },
  postWrapper: {
    ...PADDING_MIXIN
  },
  segmentWrapper: {
    ...MARGIN_MIXIN
  },
  text: {
    color: 'black'
  }
});

const mapStateToProps = (state) => ({
  fetchedData: state.fetchedData.data
});

export default connect(mapStateToProps, { setData })(ShowList);

