import React from 'react';
import {View, TouchableOpacity, Image, Dimensions, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import logo from '../../assets/images/logo.png';

export default function Navigation(props) {
  return (
    <View style={styles.wrapperNav}>
      <TouchableOpacity onPress={props.func} style={styles.wrapperMenu}>
        <MaterialIcons name="menu" color="#393534" size={38} />
      </TouchableOpacity>
      <View style={styles.wrapperImage}>
        <Image style={styles.image} source={logo} />
      </View>
      <View style={styles.wrapperMenu} />
    </View>
  );
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapperNav: {
    backgroundColor: '#FF7314',
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 20,
  },
  wrapperMenu: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperImage: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: win.width / 3,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});