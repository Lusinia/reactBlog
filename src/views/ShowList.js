import React, { Component } from 'react';
import SegmentControl from 'react-native-segment-controller';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setData } from '../actions/fetchData';

class ShowList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: 0
    };
  }

  async componentDidMount() {
    await this.props.setData();
  }

  render() {

    return (
      <View style={styles.main}>
        <SegmentControl
          values={['One', 'Two', 'Three', 'Four']}
          badges={[0, 5, 0, 2]}
          selectedIndex={this.state.clicked}
          height={30}
          onTabPress={(index) => {
            this.setState({clicked: index})
          }}
          borderRadius={5}
        />
      </View>
    );
  }
}

ShowList.propTypes = {
  navigator: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%'
  },
  text: {
    color: 'black'
  }
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { setData })(ShowList);

