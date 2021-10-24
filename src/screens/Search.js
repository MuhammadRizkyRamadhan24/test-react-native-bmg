import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Navigation from '../components/Navigation';
import noImage from '../../assets/images/noImage.png';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: '',
      items: [],
      spinnerLoading: false,
      isLoading: true,
      refresh: false,
      content: false,
      search: '',
    };
  }

  handleChange = val => {
    this.setState({
      search: val,
    });
  };

  searchFromHome = async () => {
    if (this.props.route.params.search !== '') {
      this.setState(
        {
          search: this.props.route.params.search,
        },
        () => {
          this.props.navigation.setParams({search: ''});
        },
      );
    }
    await this.setState({content: true, page: 1, isLoading: true});
    const {search, page} = this.state;
    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=9b0358ed41781efd00ea52b17a2bb957&language=en-US&query=${search}&page=${page}`,
      )
      .then(response => {
        if (response.data.results.length > 0) {
          this.setState({
            items: response.data.results,
            isLoading: false,
            spinnerLoading: false,
          });
        } else {
          showMessage({
            message: `Item not found!`,
            type: 'danger',
            backgroundColor: '#d63031',
            color: '#fff',
          });
          this.setState({isLoading: false, spinnerLoading: false, items: []});
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  search = async () => {
    if (this.state.search !== '') {
      await this.setState({content: true, page: 1, isLoading: true});
      const {search, page} = this.state;
      await axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=9b0358ed41781efd00ea52b17a2bb957&language=en-US&query=${search}&page=${page}`,
        )
        .then(response => {
          if (response.data.results.length > 0) {
            this.setState({
              items: response.data.results,
              isLoading: false,
              spinnerLoading: false,
            });
          } else {
            showMessage({
              message: `Item not found!`,
              type: 'danger',
              backgroundColor: '#d63031',
              color: '#fff',
            });
            this.setState({isLoading: false, spinnerLoading: false, items: []});
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      showMessage({
        message: `Column cannot be empty!`,
        type: 'danger',
        backgroundColor: '#d63031',
        color: '#fff',
      });
    }
  };

  infiniteSearch = async () => {
    this.setState({content: true});
    const {search, page} = this.state;
    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=9b0358ed41781efd00ea52b17a2bb957&language=en-US&query=${search}&page=${page}`,
      )
      .then(response => {
        if (response.data.results.length > 0) {
          this.setState({
            items: this.state.items.concat(response.data.results),
            isLoading: false,
            spinnerLoading: false,
          });
        } else {
          showMessage({
            message: 'Maximal page',
            type: 'danger',
            backgroundColor: '#d63031',
            color: '#fff',
          });
          this.setState({isLoading: false, spinnerLoading: false, page: this.state.page - 1});
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
        spinnerLoading: true,
      },
      () => {
        this.infiniteSearch();
      },
    );
  };

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        if (this.props.route.params.search) {
          this.searchFromHome();
        }
      },
    );
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Navigation func={() => this.props.navigation.openDrawer()} />
        <View style={styles.wrapperContent}>
          <View style={styles.textInput}>
            <MaterialIcons color={'#A3A3A3'} name="search" size={32} />
            <TextInput
              value={this.state.search}
              placeholder="Find film"
              onChangeText={this.handleChange}
              onSubmitEditing={() => this.search()}
              style={styles.input}
            />
          </View>

          {this.state.content === true ? (
            <>
              {this.state.isLoading === false ? (
                <FlatList
                  style={styles.flatList}
                  data={this.state.items}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('MovieDetail', {
                          id: item.id,
                        })
                      }>
                      <View style={styles.wrapperCard}>
                        {item.poster_path !== null ? (
                          <Image
                            style={styles.cardImage}
                            source={{
                              uri: `https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`,
                            }}
                          />
                        ) : (
                          <Image style={styles.cardImage} source={noImage} />
                        )}
                        <View style={styles.wrapperTextCard}>
                          <Text
                            style={[
                              styles.fontNormal,
                              styles.fontBold,
                              styles.colorLightBlack,
                              styles.titleCard,
                            ]}>
                            {item.title}
                          </Text>
                          <Text
                            style={[
                              styles.fontSmall,
                              styles.fontLight,
                              styles.colorLightBlack,
                            ]}>
                            {item.release_date}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  ListFooterComponent={() => (
                    <View>
                      {this.state.spinnerLoading ? (
                        <ActivityIndicator size="large" color="#FFBA33" />
                      ) : (
                        <></>
                      )}
                    </View>
                  )}
                  onEndReached={this.handleLoadMore}
                  onEndReachedThreshold={0}
                />
              ) : (
                <View style={styles.wrapperLoading}>
                  <ActivityIndicator size="large" color="#FF7314" />
                </View>
              )}
            </>
          ) : (
            <View style={styles.wrapperNoCard}>
              <Text
                style={[
                  styles.fontBold,
                  styles.fontNormal,
                  styles.colorLightBlack,
                ]}>
                What are you looking for?
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const win = Dimensions.get('window');

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
  wrapperNoCard: {
    padding: '5%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperLoading: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
  wrapperContent: {
    padding: '5%',
  },
  textInput: {
    height: 50,
    backgroundColor: '#dbdbdb',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '2%',
    borderRadius: 999,
    marginBottom: '5%',
  },
  input: {
    width: '90%',
    fontFamily: 'OpenSans-Bold',
  },
  flatList: {
    width: '100%',
    height: '80%',
  },

  wrapperCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    elevation: 5,
    marginBottom: '5%',
    marginHorizontal: '1%',
  },
  cardImage: {
    width: win.width / 3,
    height: win.width / 2,
    resizeMode: 'contain',
    borderRadius: 5,
  },
  wrapperTextCard: {
    padding: '5%',
    width: '62%',
    height: 150,
    justifyContent: 'center',
  },
  titleCard: {
    paddingBottom: '2%',
  },
});
