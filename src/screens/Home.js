import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TextInput,
  ImageBackground,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

import Navigation from '../components/Navigation';
import CardHome from '../components/CardHome';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      nowPlaying: '',
      topRated: '',
      upComing: '',
      isLoading: true,
    };
  }

  getMovies = async () => {
    await axios
      .get(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=9b0358ed41781efd00ea52b17a2bb957&language=en-US&page=1',
      )
      .then(response => {
        this.setState({
          nowPlaying: response.data.results,
        });
      })
      .catch(error => {
        console.log(error);
      });

    await axios
      .get(
        'https://api.themoviedb.org/3/movie/upcoming?api_key=9b0358ed41781efd00ea52b17a2bb957&language=en-US&page=1',
      )
      .then(response => {
        this.setState({
          upComing: response.data.results,
        });
      })
      .catch(error => {
        console.log(error);
      });

    await axios
      .get(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=9b0358ed41781efd00ea52b17a2bb957&language=en-US&page=1',
      )
      .then(response => {
        this.setState({
          topRated: response.data.results,
          isLoading: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = val => {
    this.setState({
      search: val,
    });
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    return (
      <>
        {this.state.isLoading === false ? (
          <View style={styles.wrapper}>
            <Navigation func={() => this.props.navigation.openDrawer()} />
            <View style={styles.wrapperContent}>
              <ScrollView>
                <ImageBackground
                  source={{
                    uri: `https://searchengineland.com/figz/wp-content/seloads/2015/08/movie-film-video-production-ss-1920-800x450.jpg`,
                  }}
                  resizeMode="cover">
                  <View style={styles.wrapperSearch}>
                    <Text
                      style={[
                        styles.fontBold,
                        styles.fontLarge,
                        styles.colorWhite,
                      ]}>
                      Welcome.
                    </Text>
                    <Text
                      style={[
                        styles.fontBold,
                        styles.fontMedium,
                        styles.colorWhite,
                      ]}>
                      Millions of movies, TV shows and people to discover.
                      Explore now.
                    </Text>
                    <View style={styles.textInput}>
                      <MaterialIcons
                        color={'#A3A3A3'}
                        name="search"
                        size={32}
                      />
                      <TextInput
                        placeholder="Find film"
                        onChangeText={this.handleChange}
                        onSubmitEditing={() =>
                          this.props.navigation.navigate('Search', {
                            search: this.state.search,
                          })
                        }
                      />
                    </View>
                  </View>
                </ImageBackground>

                <View style={styles.wrapperMovies}>
                  <Text
                    style={[
                      styles.fontNormal,
                      styles.fontBold,
                      styles.colorLightBlack,
                    ]}>
                    Now Playing
                  </Text>

                  <FlatList
                    style={styles.flatListCard}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={this.state.nowPlaying}
                    renderItem={({item}) => (
                      <CardHome
                        item={item}
                        func={() =>
                          this.props.navigation.navigate('MovieDetail', {
                            id: item.id,
                          })
                        }
                      />
                    )}
                  />
                </View>

                <View style={styles.wrapperMovies}>
                  <Text
                    style={[
                      styles.fontNormal,
                      styles.fontBold,
                      styles.colorLightBlack,
                    ]}>
                    Top Rated
                  </Text>

                  <FlatList
                    style={styles.flatListCard}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={this.state.topRated}
                    renderItem={({item}) => (
                      <CardHome
                        item={item}
                        func={() =>
                          this.props.navigation.navigate('MovieDetail', {
                            id: item.id,
                          })
                        }
                      />
                    )}
                  />
                </View>

                <View style={styles.wrapperMovies}>
                  <Text
                    style={[
                      styles.fontNormal,
                      styles.fontBold,
                      styles.colorLightBlack,
                    ]}>
                    Upcoming
                  </Text>

                  <FlatList
                    style={styles.flatListCard}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={this.state.upComing}
                    renderItem={({item}) => (
                      <CardHome
                        item={item}
                        func={() =>
                          this.props.navigation.navigate('MovieDetail', {
                            id: item.id,
                          })
                        }
                      />
                    )}
                  />
                </View>

                <View style={styles.bottom} />
              </ScrollView>
            </View>
          </View>
        ) : (
          <View style={styles.wrapperLoading}>
            <ActivityIndicator size="large" color="#FF7314" />
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  fontBold: {
    fontFamily: 'OpenSans-Bold',
  },
  fontSemiBold: {
    fontFamily: 'OpenSans-SemiBold',
  },
  fontLight: {
    fontFamily: 'OpenSans-Light',
  },
  fontLarge: {
    fontSize: 38,
  },
  fontMedium: {
    fontSize: 24,
  },
  fontNormal: {
    fontSize: 20,
  },
  fontSmall: {
    fontSize: 14,
  },
  colorWhite: {
    color: '#F4F4F4',
  },
  colorLightBlack: {
    color: '#393534',
  },

  wrapper: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  wrapperLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
  wrapperContent: {
    flex: 1,
  },
  wrapperSearch: {
    padding: '5%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  textInput: {
    height: 50,
    backgroundColor: '#dbdbdb',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '2%',
    borderRadius: 999,
    marginVertical: '5%',
  },
  wrapperMovies: {
    padding: '5%',
  },
  flatListCard: {
    width: '100%',
    paddingTop: '5%',
  },
  bottom: {
    height: 20,
    width: '100%',
  },
});
