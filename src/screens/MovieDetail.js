import React, {Component, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

import noImage from '../../assets/images/noImage.png';

export default class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: '',
      videos: '',
      isLoading: true,
      modalVisible: false,
      playing: false,
    };
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  getDetail = async () => {
    const {id} = this.props.route.params;
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=9b0358ed41781efd00ea52b17a2bb957&language=en-US`,
      )
      .then(response => {
        this.setState({
          movieDetails: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });

    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=9b0358ed41781efd00ea52b17a2bb957&language=en-US`,
      )
      .then(response => {
        this.setState({
          videos: response.data.results[0],
          isLoading: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getDetail();
  }

  render() {
    const url = 'https://www.themoviedb.org/t/p/w220_and_h330_face';
    const countries = [];
    const genres = [];
    if (this.state.isLoading === false) {
      this.state.movieDetails.production_countries.map((d, i) => {
        countries.push(d.iso_3166_1);
      });
      this.state.movieDetails.genres.map((d, i) => {
        genres.push(d.name);
      });
    }
    return (
      <>
        {this.state.isLoading === false ? (
          <View style={styles.wrapper}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.wrapperClose}>
                  <TouchableOpacity
                    onPress={() => this.setModalVisible(false)}
                    style={styles.buttonClose}>
                    <MaterialCommunityIcons
                      color={'#F4F4F4'}
                      name="close"
                      size={32}
                    />
                  </TouchableOpacity>
                </View>
                {this.state.videos !== undefined && (
                  <YoutubePlayer
                    allowWebViewZoom={true}
                    height={220}
                    width={'100%'}
                    videoId={`${this.state.videos.key}`}
                  />
                )}

                <ScrollView>
                  <View style={styles.wrapperContentBottom}>
                    <Text
                      style={[
                        styles.fontBold,
                        styles.fontNormal,
                        styles.colorWhite,
                        styles.detail,
                      ]}>
                      {this.state.movieDetails.title} (
                      {this.state.movieDetails.release_date.split('-')[0]})
                    </Text>
                    <Text
                      style={[
                        styles.fontLightItalic,
                        styles.fontSmall,
                        styles.colorWhite,
                        styles.detail,
                      ]}>
                      {this.state.movieDetails.tagline}
                    </Text>
                    <Text
                      style={[
                        styles.fontNormal,
                        styles.fontBold,
                        styles.colorWhite,
                      ]}>
                      Overview
                    </Text>
                    <Text
                      style={[
                        styles.fontSmall,
                        styles.fontRegular,
                        styles.colorWhite,
                        styles.overview,
                      ]}>
                      {this.state.movieDetails.overview}
                    </Text>
                  </View>
                </ScrollView>
              </View>
            </Modal>

            <ScrollView>
              <ImageBackground
                source={{
                  uri: `${url}${this.state.movieDetails.backdrop_path}`,
                }}
                resizeMode="cover">
                <View style={styles.wrapperContent}>
                  {this.state.movieDetails.poster_path !== null ? (
                    <Image
                      style={styles.image}
                      source={{
                        uri: `${url}${this.state.movieDetails.poster_path}`,
                      }}
                    />
                  ) : (
                    <Image style={styles.image} source={noImage} />
                  )}
                  <View style={styles.contentDetail}>
                    <Text
                      style={[
                        styles.fontBold,
                        styles.fontNormal,
                        styles.colorWhite,
                        styles.detail,
                      ]}>
                      {this.state.movieDetails.title} (
                      {this.state.movieDetails.release_date.split('-')[0]})
                    </Text>
                    <Text
                      style={[
                        styles.fontLightItalic,
                        styles.fontSmall,
                        styles.colorWhite,
                        styles.detail,
                      ]}>
                      {this.state.movieDetails.tagline}
                    </Text>
                    <Text
                      style={[
                        styles.fontBold,
                        styles.fontSmall,
                        styles.colorWhite,
                        styles.detail,
                      ]}>
                      {this.state.movieDetails.release_date} (
                      {countries.join(', ')}) | {genres.join(', ')}
                    </Text>

                    <Text
                      style={[
                        styles.fontBold,
                        styles.fontNormal,
                        styles.colorWhite,
                        styles.detail,
                      ]}>
                      {Math.ceil(this.state.movieDetails.popularity / 100)} %
                    </Text>
                  </View>
                </View>
              </ImageBackground>
              <View style={styles.wrapperContentBottom}>
                <Text
                  style={[
                    styles.fontNormal,
                    styles.fontBold,
                    styles.colorLightBlack,
                  ]}>
                  Overview
                </Text>
                <Text
                  style={[
                    styles.fontSmall,
                    styles.fontRegular,
                    styles.colorLightBlack,
                    styles.overview,
                  ]}>
                  {this.state.movieDetails.overview}
                </Text>
                {this.state.videos !== undefined && (
                  <View style={styles.wrapperButton}>
                    <TouchableOpacity
                      onPress={() => this.setModalVisible(true)}
                      style={styles.button}>
                      <Text
                        style={[
                          styles.fontNormal,
                          styles.fontBold,
                          styles.colorWhite,
                          styles.overview,
                        ]}>
                        Watch Trailer
                      </Text>
                      <MaterialCommunityIcons
                        color={'#F4F4F4'}
                        name="youtube"
                        size={32}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </ScrollView>
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

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  fontBold: {
    fontFamily: 'OpenSans-Bold',
  },
  fontSemiBold: {
    fontFamily: 'OpenSans-SemiBold',
  },
  fontRegular: {
    fontFamily: 'OpenSans-Regular',
  },
  fontLight: {
    fontFamily: 'OpenSans-Light',
  },
  fontLightItalic: {
    fontFamily: 'OpenSans-LightItalic',
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
    padding: '8%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperContentBottom: {
    padding: '8%',
  },
  image: {
    width: win.width / 2,
    height: win.width / 1,
    resizeMode: 'contain',
    marginBottom: '5%',
    borderRadius: 10,
  },
  contentDetail: {
    justifyContent: 'center',
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detail: {
    paddingVertical: '2%',
    textAlign: 'center',
  },
  overview: {
    paddingVertical: '3%',
    marginRight: '2%',
  },
  button: {
    padding: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7314',
    borderRadius: 20,
    marginTop: '5%',
    flexDirection: 'row',
  },
  buttonClose: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: '5%',
    flexDirection: 'row',
  },

  centeredView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
  },
  wrapperClose: {
    padding: '2%',
    width: '100%',
    alignItems: 'flex-end',
  },
});
