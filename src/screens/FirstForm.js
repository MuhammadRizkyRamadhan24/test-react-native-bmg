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
import {Picker} from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

import logo from '../../assets/images/logo.png';

export default class firstForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      jobdesc: [],
      gender: 'Male',
      email: '',

      inputJobdesc: '',
    };
  }

  handleChange = val => {
    this.setState({
      inputJobdesc: val,
    });
  };

  addJobDesc = () => {
    const {inputJobdesc, jobdesc} = this.state;
    if (inputJobdesc !== '') {
      this.state.jobdesc.push(inputJobdesc);
    }
    this.setState({
      inputJobdesc: '',
    });
  };

  nextScreen = async () => {
    if (this.state.jobdesc.length === 0) {
      showMessage({
        message: 'Jobdesc cannot be empty',
        type: 'danger',
        backgroundColor: '#d63031',
        color: '#fff',
      });
    } else if (this.state.firstName === '') {
      showMessage({
        message: 'First name cannot be empty',
        type: 'danger',
        backgroundColor: '#d63031',
        color: '#fff',
      });
    } else if (this.state.lastName === '') {
      showMessage({
        message: 'Last name cannot be empty',
        type: 'danger',
        backgroundColor: '#d63031',
        color: '#fff',
      });
    } else if (this.state.email === '') {
      showMessage({
        message: 'Email cannot be empty',
        type: 'danger',
        backgroundColor: '#d63031',
        color: '#fff',
      });
    } else {
      try {
        const jsonValue = JSON.stringify(this.state);
        await AsyncStorage.setItem('firstForm', jsonValue);
        this.props.navigation.navigate('SecondForm');
      } catch (e) {
        console.log(e);
      }
    }
  };

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('focus', async () => {
      if (AsyncStorage.getItem('firstForm')) {
        try {
          const jsonValue = await AsyncStorage.getItem('firstForm');
          const val = JSON.parse(jsonValue);
          if (val !== null) {
            this.setState({
              ...val,
            });
          } else {
            this.setState({
              firstName: '',
              lastName: '',
              jobdesc: [],
              gender: 'Male',
              email: '',
              inputJobdesc: '',
            });
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
            <View style={styles.wrapperName}>
              <View style={styles.containerName}>
                <Text style={styles.subtitle}>First Name</Text>
                <TextInput
                  value={this.state.firstName}
                  onChangeText={val => {
                    this.setState({firstName: val});
                  }}
                  style={styles.textInput}
                  placeholder="Your first name"
                />
              </View>
              <View style={styles.containerName}>
                <Text style={styles.subtitle}>Last Name</Text>
                <TextInput
                  value={this.state.lastName}
                  onChangeText={val => {
                    this.setState({lastName: val});
                  }}
                  style={styles.textInput}
                  placeholder="Your last name"
                />
              </View>
            </View>
            <View style={styles.wrapperForm}>
              <Text style={styles.subtitle}>Jobdesc</Text>
              <View style={styles.containerJobdesc}>
                <View style={styles.textInputJobdesc}>
                  <TextInput
                    value={this.state.inputJobdesc}
                    style={styles.textInput}
                    placeholder="Your jobdesc"
                    onChangeText={this.handleChange}
                    onSubmitEditing={this.addJobDesc}
                  />
                </View>
                <TouchableOpacity
                  style={styles.buttonPlus}
                  onPress={this.addJobDesc}>
                  <MaterialCommunityIcons
                    color={'#393534'}
                    name="plus"
                    size={32}
                  />
                </TouchableOpacity>
              </View>
              {this.state.jobdesc.length > 0 && (
                <>
                  {this.state.jobdesc.map((d, i) => {
                    return (
                      <View style={styles.containerAnyjob} key={i}>
                        <Text style={styles.subtitle}>{d}</Text>
                      </View>
                    );
                  })}
                </>
              )}
            </View>
            <View style={styles.wrapperForm}>
              <Text style={styles.subtitle}>Gender</Text>
              <TouchableOpacity disabled={true} style={styles.containerPicker}>
                <Picker
                  selectedValue={this.state.gender}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({gender: itemValue})
                  }>
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                </Picker>
              </TouchableOpacity>
            </View>
            <View style={styles.wrapperForm}>
              <Text style={styles.subtitle}>Email</Text>
              <TextInput
                keyboardType="email-address"
                value={this.state.email}
                onChangeText={val => {
                  this.setState({email: val});
                }}
                style={styles.textInput}
                placeholder="Your email"
              />
            </View>
            <View style={styles.wrapperButton}>
              <TouchableOpacity onPress={this.nextScreen} style={styles.button}>
                <Text style={styles.subtitle}>Next</Text>
              </TouchableOpacity>
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
  wrapperName: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: '2%',
  },
  containerName: {
    width: '50%',
  },
  wrapperForm: {
    width: '100%',
    paddingVertical: '2%',
  },
  containerJobdesc: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: '2%',
  },
  textInputJobdesc: {
    width: '80%',
  },
  buttonPlus: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerAnyjob: {
    borderWidth: 1,
    borderColor: '#393534',
    borderRadius: 10,
    margin: '1%',
    paddingLeft: 10,
    paddingVertical: '4%',
  },
  containerPicker: {
    borderWidth: 1,
    borderColor: '#393534',
    borderRadius: 10,
    margin: '1%',
    fontFamily: 'OpenSans-SemiBold',
    color: '#393534',
  },
  wrapperButton: {
    marginTop: '10%',
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
});
