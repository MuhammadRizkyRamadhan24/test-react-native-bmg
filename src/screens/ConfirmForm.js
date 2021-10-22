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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

import logo from '../../assets/images/logo.png';

export default class ConfirmForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstForm: {
        firstName: '',
        lastName: '',
        jobdesc: [],
        gender: '',
        email: '',
        inputJobdesc: '',
      },
      secondForm: {
        haveLaptop: 'Yes',
        address: '',
        phoneNumber: '',
      },
    };
  }

  async componentDidMount() {
    if (
      AsyncStorage.getItem('firstForm') &&
      AsyncStorage.getItem('secondForm')
    ) {
      try {
        const jsonValue = await AsyncStorage.getItem('firstForm');
        const jsonValue2 = await AsyncStorage.getItem('secondForm');
        const val = JSON.parse(jsonValue);
        const val2 = JSON.parse(jsonValue2);
        this.setState({
          firstForm: val,
          secondForm: val2,
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  submit = async () => {
    try {
      await AsyncStorage.clear();
      showMessage({
        message: 'Submit success!',
        type: 'success',
        backgroundColor: '#6A4029',
        color: '#fff',
      });
      this.props.navigation.navigate('SecondForm')
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperTitle}>
          <Image style={styles.image} source={logo} />
          <Text style={styles.title}>Confrim Data Register</Text>
        </View>
        <View style={styles.wrapperScroll}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperForm}>
              <Text style={styles.subtitle}>Fullname :</Text>
              <View style={styles.wrapperAnswer}>
                <Text style={styles.subtitle}>
                  {this.state.firstForm.firstName}{' '}
                  {this.state.firstForm.lastName}
                </Text>
              </View>
            </View>
            <View style={styles.wrapperForm}>
              <Text style={styles.subtitle}>Jobdesc :</Text>
              <View style={styles.wrapperAnswer}>
                <Text style={styles.subtitle}>
                  {this.state.firstForm.jobdesc.join(', ')}
                </Text>
              </View>
            </View>
            <View style={styles.wrapperForm}>
              <Text style={styles.subtitle}>Gender :</Text>
              <View style={styles.wrapperAnswer}>
                <Text style={styles.subtitle}>
                  {this.state.firstForm.gender}
                </Text>
              </View>
            </View>
            <View style={styles.wrapperForm}>
              <Text style={styles.subtitle}>Have a Laptop/PC :</Text>
              <View style={styles.wrapperAnswer}>
                <Text style={styles.subtitle}>
                  {this.state.secondForm.haveLaptop}
                </Text>
              </View>
            </View>
            <View style={styles.wrapperForm}>
              <Text style={styles.subtitle}>Mobile number :</Text>
              <View style={styles.wrapperAnswer}>
                <Text style={styles.subtitle}>
                  {this.state.secondForm.phoneNumber}
                </Text>
              </View>
            </View>
            <View style={styles.wrapperForm}>
              <Text style={styles.subtitle}>Address :</Text>
              <View style={styles.wrapperAnswer}>
                <Text style={styles.subtitle}>
                  {' '}
                  {this.state.secondForm.address}
                </Text>
              </View>
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
                <TouchableOpacity onPress={this.submit} style={styles.button}>
                  <Text style={styles.subtitle}>Submit</Text>
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
  wrapperAnswer: {
    borderWidth: 1,
    borderColor: '#393534',
    borderRadius: 10,
    margin: '1%',
    paddingLeft: 10,
    paddingVertical: '4%',
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
    backgroundColor: '#F4F4F4',
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
  wrapperAllButton: {
    marginTop: '10%',
  },
});
