import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import {Radio} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

import logo from '../../assets/images/logo.png';

export default class SecondForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haveLaptop: 'Yes',
      address: '',
      phoneNumber: '',
    };
  }

  nextScreen = async () => {
    if (this.state.address === '') {
      showMessage({
        message: 'Address cannot be empty',
        type: 'danger',
        backgroundColor: '#d63031',
        color: '#fff',
      });
    } else if (this.state.phoneNumber === '') {
      showMessage({
        message: 'Mobile number cannot be empty',
        type: 'danger',
        backgroundColor: '#d63031',
        color: '#fff',
      });
    } else {
      try {
        const jsonValue = JSON.stringify(this.state);
        await AsyncStorage.setItem('secondForm', jsonValue);
        this.props.navigation.navigate('ConfirmForm');
      } catch (e) {
        console.log(e);
      }
    }
  };

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('focus', async () => {
      if (AsyncStorage.getItem('secondForm')) {
        try {
          const jsonValue = await AsyncStorage.getItem('secondForm');
          const val = JSON.parse(jsonValue);
          if (val !== null) {
            this.setState({
              ...val,
            });
          } else {
            this.setState({
              haveLaptop: 'Yes',
              address: '',
              phoneNumber: '',
            })
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperTitle}>
          <Image style={styles.image} source={logo} />
          <Text style={styles.title}>Register</Text>
        </View>
        <View style={styles.wrapperScroll}>
          <ScrollView>
            <View style={styles.wrapperForm}>
              <Text style={styles.subtitle}>Have a Laptop / PC?</Text>
              <Radio.Group
                marginTop={'4%'}
                name="radio-button"
                flexDirection="row"
                value={this.state.haveLaptop}
                onChange={nextValue => {
                  this.setState({haveLaptop: nextValue});
                }}>
                <Radio
                  marginRight={5}
                  marginLeft={'2%'}
                  accessibilityLabel="test"
                  colorScheme="gray"
                  value="Yes">
                  <Text style={styles.radio}>Yes</Text>
                </Radio>
                <Radio accessibilityLabel="test" colorScheme="gray" value="No">
                  <Text style={styles.radio}>No</Text>
                </Radio>
              </Radio.Group>
            </View>

            <View style={styles.wrapperForm}>
              <Text style={styles.subtitle}>Address</Text>
              <TextInput
                multiline={true}
                numberOfLines={1}
                keyboardType="default"
                value={this.state.address}
                onChangeText={val => {
                  this.setState({address: val});
                }}
                style={styles.textInput}
                placeholder="Your address"
              />
            </View>
            <View style={styles.wrapperForm}>
              <Text style={styles.subtitle}>Mobile Number</Text>
              <TextInput
                keyboardType="numeric"
                value={this.state.phoneNumber}
                onChangeText={val => {
                  this.setState({phoneNumber: val});
                }}
                style={styles.textInput}
                placeholder="Your mobile number"
              />
            </View>
            <View style={styles.wrapperAllButton}>
              <View style={styles.wrapperButton}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                  style={styles.buttonBack}>
                  <Text style={styles.subtitleBack}>Back</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.wrapperButton}>
                <TouchableOpacity
                  onPress={this.nextScreen}
                  style={styles.button}>
                  <Text style={styles.subtitle}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  subtitle: {
    fontFamily: 'OpenSans-SemiBold',
    color: '#393534',
    marginBottom: '2%',
  },
  subtitleBack: {
    fontFamily: 'OpenSans-SemiBold',
    color: '#F4F4F4',
    marginBottom: '2%',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    color: '#FF7314',
    marginTop: '5%',
    fontSize: 22,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#393534',
    borderRadius: 10,
    marginHorizontal: '2%',
    paddingLeft: 10,
    fontFamily: 'OpenSans-Regular',
  },
  image: {
    width: win.width / 2,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  wrapper: {
    flex: 1,
    padding: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperScroll: {
    justifyContent: 'center',
    width: '100%',
    paddingTop: '20%',
    height: '80%',
  },
  wrapperTitle: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '5%',
  },
  wrapperForm: {
    width: '100%',
    paddingVertical: '2%',
  },
  textInputJobdesc: {
    width: '80%',
  },
  wrapperButton: {
    width: '100%',
  },
  button: {
    padding: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7314',
    borderRadius: 20,
    margin: '2%',
  },
  buttonBack: {
    padding: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#393534',
    borderRadius: 20,
    margin: '2%',
  },
  radio: {
    marginLeft: 15,
    fontFamily: 'OpenSans-SemiBold',
    color: '#393534',
  },
  wrapperAllButton: {
    marginTop: '10%',
  },
});
