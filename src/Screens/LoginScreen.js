import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Images } from '../Utils/Images';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from '../components/actions/LoginAction';
import { useFocusEffect } from '@react-navigation/native';

const ResponsiveHeight = Dimensions.get('window').height;
const ResponsiveWidth = Dimensions.get('window').width;

export const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const LoginSuccessRes = useSelector(state => state.login.LOGINSUCCESSRES);
  console.log('LoginSuccessRes', LoginSuccessRes);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [isLoading1, setIsLoading1] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setEmail('');
      setPassword('');
      setIsLoading1(true);
    setTimeout(() => {
      setIsLoading1(false);
    }, 1000);

    }, []),
  );

  //----- This useeffect call when the user get successfully Register -----//
  useEffect(() => {
    if (LoginSuccessRes) {
      if (LoginSuccessRes?.status === true) {
        setIsLoading(false);
        navigation.navigate('CatListScreen');
        dispatch({ type: 'LoginSuccess', payload: '' });
      } else if (LoginSuccessRes?.status === false) {
        setIsLoading(false);
      }
    }
  }, [LoginSuccessRes]);

  const signUpApiCall = () => {
    if (email === '') {
      Alert.alert('Please enter email');
    } else if (password === '') {
      Alert.alert('Please enter password');
    } else {
      setIsLoading(true);
      const sendData = {
        email: email,
        password: password,
      };
      console.log('sendData', sendData);
      dispatch(LoginAction(sendData));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputMainView}>
        <Text style={styles.inputTitleStyle}>Email</Text>
        <TextInput
          placeholder=" Enter your email"
          placeholderTextColor={'grey'}
          style={styles.textInputStyle}
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>

      <View style={styles.inputMainView}>
        <Text style={styles.inputTitleStyle}>Password</Text>
        <TextInput
          placeholder=" Enter password"
          placeholderTextColor={'grey'}
          style={styles.textInputStyle}
          secureTextEntry={show}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        {!show ? (
          <TouchableOpacity onPress={() => { setShow(true) }} style={{ position: 'absolute', marginTop: 39, marginLeft: '84%' }}>
            <Image
              source={Images.hidePass}
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        ) : (
        <TouchableOpacity onPress={() => { setShow(false) }} style={{ position: 'absolute', marginTop: 39, marginLeft: '84%' }}>
          <Image
            source={Images.viewPass}
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        )}

      </View>
      {isLoading ? (
        <View style={styles.signUpBtnStyle}>
          <ActivityIndicator color="white" />
        </View>
      ) : (
        <View>
          <TouchableOpacity
            onPress={() => signUpApiCall()}
            style={styles.signUpBtnStyle}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={{flexDirection:'row'}}>
      <Text style={{ color: '#000', marginTop: 6 }}>
        Don't have an account?
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUpScreen')}
        style={{ marginTop: 6, marginLeft:5 }}>
        <Text style={{ color: '#40E0D0', fontWeight: 'bold' }}>
          Sign up
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputMainView: {
    alignSelf: 'center',
    marginTop: 10,
  },
  inputTitleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textInputStyle: {
    height: ResponsiveHeight / 15,
    width: ResponsiveWidth - 20,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    fontSize: 16,
    borderColor: '#40E0D0',
    color: '#000',
  },
  uploadProfileMainView: {
    marginTop: 10,
    paddingHorizontal: 12,
  },
  dummyImageStyle: {
    height: ResponsiveHeight / 4,
    width: ResponsiveWidth / 4,
    resizeMode: 'contain',
    borderRadius: ResponsiveHeight / 2,
  },
  signUpBtnStyle: {
    height: 50,
    width: ResponsiveWidth - 50,
    backgroundColor: '#40E0D0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 40,
  },
});
