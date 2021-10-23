import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  ImageBackground,
  FlatList,
} from 'react-native';

export default function CardHome(props) {
  const url = 'https://www.themoviedb.org/t/p/w220_and_h330_face';
  const item = props.item
  return (
    <View>
      <TouchableOpacity onPress={props.func} style={styles.wrapperCard}>
        <Image
          style={styles.cardImage}
          source={{
            uri: `${url}${item.poster_path}`,
          }}
        />
        <Text
          style={[
            styles.fontBold,
            styles.fontSmall,
            styles.colorLightBlack,
            styles.titleCard,
          ]}>
          {item.title}
        </Text>
        <Text
          style={[
            styles.fontLight,
            styles.fontSmall,
            styles.colorLightBlack,
            styles.textDate,
          ]}>
          {item.release_date}
        </Text>
      </TouchableOpacity>
    </View>
  );
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
  colorOrange: {
    color: '#FF7314',
  },

  wrapperCard: {
    width: 140,
    paddingHorizontal: '2%',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 190,
    resizeMode: 'contain',
    marginBottom: '5%',
    borderRadius: 10,
  },
  titleCard: {
    width: '95%',
    height: 40,
    marginBottom: '2%',
  },
  textDate: {
    width: '95%',
  },
});
