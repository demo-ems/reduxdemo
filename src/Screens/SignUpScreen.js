import React, {useEffect, useState} from 'react';
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
import {ScrollView} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import {Images} from '../Utils/Images';
import {ImageUploadApi} from '../components/actions/ImageUploadAction';
import {useDispatch, useSelector} from 'react-redux';
import {SignupAction} from '../components/actions/SignUpAction';
import ModalDropdown from 'react-native-modal-dropdown';

const ResponsiveHeight = Dimensions.get('window').height;
const ResponsiveWidth = Dimensions.get('window').width;

let expertArray = [
  {
    id: 1,
    level: 'Beginner',
  },
  {
    id: 2,
    level: 'Intermediate',
  },
  {
    id: 3,
    level: 'Advanced',
  },
  {
    id: 4,
    level: 'Professional',
  },
];

export const SignUpScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const GetUploadResponse = useSelector(
    state => state.UploadImageReducer.IMAGEUPLOADRES,
  );
  const SignUpSuccessRes = useSelector(state => state.SignUpReducer.SIGNUPRES);
  console.log('SignUpSuccessRes', SignUpSuccessRes);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnfpassword, setCnfPassword] = useState('');
  const [profileImage, setImageProfile] = useState('');
  const [levelOfExpertise, setLevelOfExpertise] = useState('');
  const [age, setAge] = useState('');
  const [errormessage, setErrormessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(true);

  useEffect(() => {
    setIsLoading1(true);
    setTimeout(() => {
      setIsLoading1(false);
    }, 1000);

    if (GetUploadResponse && GetUploadResponse.status === true) {
      console.log('setImageProfile...', GetUploadResponse);
      setImageProfile(GetUploadResponse.file_name);
      dispatch({type: 'UPLOADIMAGE', payload: ''});
    }
  }, [GetUploadResponse]);

  //----- This useeffect call when the user get successfully Register -----//
  useEffect(() => {
    if (SignUpSuccessRes && SignUpSuccessRes.status === true) {
      dispatch({type: 'Register', payload: ''});
      navigation.navigate('CatListScreen');
    }
  }, [SignUpSuccessRes]);

  // ------ Image Upload from Gallery Function ------ //
  const openLibraryFunc = () => {
    ImagePicker.openPicker({
      cropping: false,
      width: 500,
      height: 500,
      cropperCircleOverlay: true,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      freeStyleCropEnabled: true,
      includeBase64: true,
    })
      .then(response => {
        const fileName = response.path.split('/');
        const sendData = {
          path: response.path,
          name: fileName ? fileName[fileName.length - 1] : '',
          type: response.mime,
        };
        dispatch(ImageUploadApi(sendData));
      })
      .catch(err => {
        console.log('openLibraryFunc err', err);
      });
  };
  const signUpApiCall = () => {
    if (firstName === '') {
      Alert.alert('Please enter firstName');
    } else if (lastName === '') {
      Alert.alert('Please enter lastName');
    } else if (phoneNumber === '') {
      Alert.alert('Please enter phoneNumber');
    } else if (phoneNumber != '' && phoneNumber.length < 8) {
      Alert.alert('Please enter valid mobile no');
    } else if (email === '') {
      Alert.alert('Please enter email');
    } else if (levelOfExpertise === '') {
      Alert.alert('Please enter Level');
    } else if (password === '') {
      Alert.alert('Please enter password');
    } else if (cnfpassword === '') {
      Alert.alert('Please enter Confirm password');
    } else if (password != cnfpassword) {
      Alert.alert('password does not match');
    } else if (age === '') {
      Alert.alert('Please enter age');
    } else {
      setIsLoading(true);
      const sendData = {
        name: firstName + ' ' + lastName,
        phone_number: phoneNumber,
        profile_picture: profileImage,
        level_of_expertise: levelOfExpertise,
        age: age,
        email: email,
        password: password,
      };
      console.log('sendData', sendData);
      dispatch(SignupAction(sendData));
    }
  };
  const validate = text => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setErrormessage('Email is Not Correct');
      setEmail(text);
      return false;
    } else {
      setEmail(text);
      setErrormessage('Email is Correct');
    }
  };
  const selectedExpertiseFunc = value => {
    setLevelOfExpertise(value.level);
  };

  return (
    <View style={styles.container}>
      {isLoading1 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 70,
          }}>
          <ActivityIndicator size="large" color="#40E0D0" />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.uploadProfileMainView}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.inputTitleStyle}>Upload Profile</Text>
            </View>
            <TouchableOpacity
              onPress={() => openLibraryFunc()}
              style={{
                alignSelf: 'center',
                marginTop: 12,
              }}>
              {profileImage != '' ? (
                <Image
                  source={{uri: profileImage}}
                  style={styles.dummyImageStyle}
                />
              ) : (
                <Image
                  source={Images.dummyImage}
                  style={styles.dummyImageStyle}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.inputMainView}>
            <Text style={styles.inputTitleStyle}>First Name</Text>
            <TextInput
              placeholder=" Enter your first name"
              placeholderTextColor={'grey'}
              style={styles.textInputStyle}
              onChangeText={text => setFirstName(text)}
            />
          </View>

          <View style={styles.inputMainView}>
            <Text style={styles.inputTitleStyle}>Last Name</Text>
            <TextInput
              placeholder=" Enter your last name"
              placeholderTextColor={'grey'}
              style={styles.textInputStyle}
              onChangeText={text => setLastName(text)}
            />
          </View>
          <View style={styles.inputMainView}>
            <Text style={styles.inputTitleStyle}>Phone Number</Text>
            <TextInput
              placeholder=" Enter your phone number"
              placeholderTextColor={'grey'}
              style={styles.textInputStyle}
              keyboardType="numeric"
              maxLength={8}
              onChangeText={text => setPhoneNumber(text)}
            />
          </View>
          <View style={styles.inputMainView}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.inputTitleStyle}>Email</Text>
              <Text
                style={{
                  color:
                    errormessage === 'Email is Not Correct' ? 'red' : 'green',
                  marginLeft: 10,
                }}>
                {errormessage}
              </Text>
            </View>
            <TextInput
              placeholder=" Enter your email"
              placeholderTextColor={'grey'}
              style={styles.textInputStyle}
              onChangeText={text => validate(text)}
            />
          </View>
          <View style={styles.inputMainView}>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 5}}>
              Level Of Expertise
            </Text>
            <View>
              <ModalDropdown
                style={{
                  height: 50,
                  width: ResponsiveWidth - 20,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#40E0D0',
                }}
                dropdownStyle={{
                  backgroundColor: '#f2f2f2',
                  height: 100,
                  width: ResponsiveWidth - 20,
                }}
                dropdownTextStyle={{fontSize: 14, margin: 10}}
                options={expertArray}
                renderRow={option => (
                  <View style={{backgroundColor: '#f2f2f2'}}>
                    <Text style={{padding: 10}}>{option.level}</Text>
                  </View>
                )}
                onSelect={(idx, value) => selectedExpertiseFunc(value)}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: ResponsiveWidth - 20,
                    justifyContent: 'space-between',
                    height: 50,
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 16,
                      color: levelOfExpertise === '' ? 'grey' : 'black',
                    }}>
                    {levelOfExpertise === ''
                      ? 'Select Level'
                      : levelOfExpertise}
                  </Text>
                  <Image
                    style={{
                      height: 15,
                      width: 15,
                      alignSelf: 'center',
                      tintColor: 'grey',
                    }}
                    source={require('../../assets/images/downArrow.png')}
                    resizeMode="contain"
                  />
                </View>
              </ModalDropdown>
            </View>
            <View style={styles.inputMainView}>
              <Text style={styles.inputTitleStyle}>Age</Text>
              <TextInput
                placeholder=" Enter your Age"
                placeholderTextColor={'grey'}
                keyboardType="numeric"
                maxLength={3}
                style={styles.textInputStyle}
                onChangeText={text => setAge(text)}
              />
            </View>
          </View>
          <View style={styles.inputMainView}>
            <Text style={styles.inputTitleStyle}>Password</Text>
            <TextInput
              placeholder=" Enter password"
              placeholderTextColor={'grey'}
              secureTextEntry={show}
              style={styles.textInputStyle}
              onChangeText={text => setPassword(text)}
            />
            {!show ? (
              <TouchableOpacity
                onPress={() => {
                  setShow(true);
                }}
                style={{
                  position: 'absolute',
                  marginTop: 39,
                  marginLeft: '84%',
                }}>
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
              <TouchableOpacity
                onPress={() => {
                  setShow(false);
                }}
                style={{
                  position: 'absolute',
                  marginTop: 39,
                  marginLeft: '84%',
                }}>
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

          <View style={styles.inputMainView}>
            <Text style={styles.inputTitleStyle}>Confirm Password</Text>
            <TextInput
              placeholder=" Confirm password"
              placeholderTextColor={'grey'}
              secureTextEntry={show1}
              style={styles.textInputStyle}
              onChangeText={text => setCnfPassword(text)}
            />
            {!show1 ? (
              <TouchableOpacity
                onPress={() => {
                  setShow1(true);
                }}
                style={{
                  position: 'absolute',
                  marginTop: 39,
                  marginLeft: '84%',
                }}>
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
              <TouchableOpacity
                onPress={() => {
                  setShow1(false);
                }}
                style={{
                  position: 'absolute',
                  marginTop: 39,
                  marginLeft: '84%',
                }}>
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
                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: ResponsiveHeight / 5,
    width: ResponsiveHeight / 5,
    // resizeMode: 'contain',
    borderRadius: ResponsiveHeight / 5,
  },
  signUpBtnStyle: {
    height: 50,
    width: ResponsiveWidth - 50,
    backgroundColor: '#40E0D0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    alignSelf: 'center',
    marginVertical: 20,
  },
});


// import React from 'react';
// import {
//   View,
//   Image,
//   Text,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   KeyboardAvoidingView,
// } from 'react-native';
// import { useRef, useState } from 'react/cjs/react.production.min';

// import BackgroundImage from '../../../assets/OTPcode.png';
// // import BtnBack from '../../components/CustomButton/BackButton';
// import Button from '../../components/CustomButton/Button';

// const RecoveryEmail = ({navigation}) => {

// const pin1Ref = useRef(null);
// const pin2Ref = useRef(null);
// const pin3Ref = useRef(null);
// const pin4Ref = useRef(null);

// const [pin1, setPin1] = useState("");
// const [pin2, setPin2] = useState("");
// const [pin3, setPin3] = useState("");
// const [pin4, setPin4] = useState("");


//   return (
//     <View style={styles.container}>
//       {/* <BtnBack
//         onPress={() => {
//           console.warn('Back Button Pressed!');
//         }}
//       /> */}
//       <KeyboardAvoidingView>
//         <View style={styles.mainContainer}>
//           <Image source={BackgroundImage} style={styles.backgroundImg} />
//           <Text style={styles.simpleTxt}>Verification</Text>
//           <Text style={styles.information}>
//             Enter your verification code we just sent you on your Email or Phone
//             Number.
//           </Text>
//           <View style={styles.blockOTP}>
//             <View>
//             <TextInput 
//             ref={pin1Ref}
//             style={styles.txtOTP} 
//             keyboardType="numeric" 
//             maxLength={1} 
//             onChange={(pin1)=>{setPin1(pin1);
//             if(pin1 !== ""){
//               pin2Ref.current.focus()
//             }}} />
//             </View>
//             <View>
//             <TextInput ref={pin2Ref} style={styles.txtOTP} keyboardType="numeric" maxLength={1}  
//             onChange={(pin2)=>{setPin2(pin2); if(pin2 !== ""){
//               pin3Ref.current.focus()
//             }}}/>
//             </View>
//             <View>
//             <TextInput ref={pin3Ref} style={styles.txtOTP} keyboardType="numeric" maxLength={1}
//              onChange={(pin3)=>{setPin3(pin3); if(pin3 !== ""){
//               pin4Ref.current.focus()
//             }}}/>
//             </View>
//             <View>
//             <TextInput ref={pin4Ref} style={styles.txtOTP} keyboardType="numeric" maxLength={1}
//              onChange={(pin4)=>{setPin4(pin4)}}/>
//              </View>
//           </View>
//           <View style={styles.OTPBtn}>
//             <Button
//               label="Verify"
//               onPress={() => {
//                 navigation.navigate('ChangePassword');
//               }}
//             />
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#1E1E1E',
//     height: '100%',
//     padding: 16,
//   },
//   mainContainer: {
//     alignItems: 'center',
//     paddingTop: 50,
//   },
//   simpleTxt: {
//     padding: 10,
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#C2C9D1',
//   },
//   information: {
//     paddingTop: 20,
//     paddingBottom: 30,
//     fontSize: 18,
//     color: '#C2C9D1',
//     textAlign: 'center',
//   },
//   OTPBtn: {
//     width: 100,
//     marginTop: 20,
//   },
//   backgroundImg: {
//     height: 100,
//     width: 100,
//     borderRadius: 16,
//   },
//   txtOTP: {
//     height: 50,
//     width: 50,
//     margin: 10,
//     borderWidth: 1,
//     borderColor: 'white',
//     borderRadius: 10,
//     textAlign: 'center',
//     color: 'white',
//   },
//   blockOTP: {
//     flexDirection: 'row',
//   },
// });

// export default RecoveryEmail;
{/* <Text style={styles.inputTitleStyle}>Team Activities</Text>
                <View
                    style={{
                        zIndex: 1,
                        marginTop: 6,
                        marginBottom: 15,
                        paddingLeft: 3,
                        paddingRight: 5,
                    }}>
                    <DropDownPicker
                        placeholder="Team Activities"
                        open={openRole}
                        value={role}
                        dropDownDirection="TOP"
                        items={roleItems}
                        setOpen={openRoleModal}
                        setValue={setRole}
                        setItems={setRoleItems}
                        containerStyle={{ height: 40, flex: 1, marginLeft: 12, width: 330 }}
                        style={{
                            backgroundColor: '#000',
                            borderColor: '#C0C0C0',
                            borderRadius: 6,
                        }}
                        listItemContainerStyle={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#D3D3D3',
                            padding: 5,
                        }}
                        placeholderStyle={{
                            color: 'grey',
                            fontSize: 15,
                            paddingLeft: 5
                        }}
                        arrowIconStyle={{
                            backgroundColor: '#C2C9D1',
                        }}
                        selectedItemLabelStyle={{
                            color: 'grey',
                            fontSize: 15,
                        }}
                        textStyle={{
                            color: openRole ? '#000' : '#fff',
                            fontSize: 15,
                        }}
                        zIndex={5}
                    />
                </View>
                <Text style={styles.inputTitleStyle}>Who can post</Text>
                <View
                    style={{
                        zIndex: 1,
                        marginTop: 6,
                        marginBottom: 15,
                        paddingLeft: 3,
                        paddingRight: 5,
                    }}>
                    <DropDownPicker
                        placeholder="Who can post"
                        open={openRole1}
                        value={role1}
                        dropDownDirection="TOP"
                        items={roleItems1}
                        setOpen={openRoleModal1}
                        setValue={setRole1}
                        setItems={setRoleItems1}
                        containerStyle={{ height: 40, flex: 1, marginLeft: 12, width: 330 }}
                        style={{
                            backgroundColor: '#000',
                            borderColor: '#C0C0C0',
                            borderRadius: 6,
                        }}
                        listItemContainerStyle={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#D3D3D3',
                            padding: 5,
                        }}
                        placeholderStyle={{
                            color: 'grey',
                            fontSize: 15,
                            paddingLeft: 5
                        }}
                        arrowIconStyle={{
                            backgroundColor: '#C2C9D1',
                        }}
                        selectedItemLabelStyle={{
                            color: 'grey',
                            fontSize: 15,
                        }}
                        textStyle={{
                            color: openRole1 ? '#000' : '#fff',
                            fontSize: 15,
                        }}
                        zIndex={5}
                    />
                </View>
                <Text style={styles.inputTitleStyle}>Who can invite others</Text>
                <View
                    style={{
                        zIndex: 1,
                        marginTop: 6,
                        marginBottom: 15,
                        paddingLeft: 3,
                        paddingRight: 5,
                    }}>
                    <DropDownPicker
                        placeholder="Who can invite others"
                        open={openRole2}
                        value={role2}
                        dropDownDirection="TOP"
                        items={roleItems2}
                        setOpen={openRoleModal2}
                        setValue={setRole2}
                        setItems={setRoleItems2}
                        containerStyle={{ height: 40, flex: 1, marginLeft: 12, width: 330 }}
                        style={{
                            backgroundColor: '#000',
                            borderColor: '#C0C0C0',
                            borderRadius: 6,
                        }}
                        listItemContainerStyle={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#D3D3D3',
                            padding: 5,
                        }}
                        placeholderStyle={{
                            color: 'grey',
                            fontSize: 15,
                            paddingLeft: 5
                        }}
                        arrowIconStyle={{
                            backgroundColor: '#C2C9D1',
                        }}
                        selectedItemLabelStyle={{
                            color: 'grey',
                            fontSize: 15,
                        }}
                        textStyle={{
                            color: openRole2 ? '#000' : '#fff',
                            fontSize: 15,
                        }}
                        zIndex={5}
                    />
                </View> */}
                // const [openRole, openRoleModal] = useState(false);
    // const [role, setRole] = useState(null);
    // const [roleItems, setRoleItems] = useState([
    //     { label: 'Automatic', value: 'Automatic' },
    //     { label: 'Pinnned Only', value: 'Pinnned Only' },
    // ]);
    // const [openRole1, openRoleModal1] = useState(false);
    // const [role1, setRole1] = useState(null);
    // const [roleItems1, setRoleItems1] = useState([
    //     { label: 'Admin only', value: 'Admin only' },
    //     { label: 'All members', value: 'All members' },
    // ]);
    // const [openRole2, openRoleModal2] = useState(false);
    // const [role2, setRole2] = useState(null);
    // const [roleItems2, setRoleItems2] = useState([
    //     { label: 'Admin only', value: 'Admin only' },
    //     { label: 'All members', value: 'All members' },
    // ]);