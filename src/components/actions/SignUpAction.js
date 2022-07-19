import React from 'react';
import { API } from '../../Utils/BaseUrl';
import { Alert } from 'react-native';
import showToast from '../../Utils/ShowToast';

//----- Register Api
// Params { first_name, last_name, email, password, password_confirmation, profile }
export const SignupAction = (params) => {
    var formData = new FormData();
    formData.append('name', params.name);
    formData.append('phone_number', params.phone_number);
    formData.append('profile_picture', params.profile_picture);
    formData.append('level_of_expertise', params.level_of_expertise);
    formData.append('age', params.age);
    formData.append('email', params.email);
    formData.append('password', params.password);

    console.log("formData", formData);

    return async dispatch => {
        fetch(`${API.BASE}/signup.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
            .then(res => res.json())
            .then(res => {
                console.log("res....", res)
                if (res.status === true) {
                    Alert.alert(res.message)
                    dispatch({ type: 'Register', payload: res });
                } else if (res.status != true) {
                    Alert.alert(res.message)
                    dispatch({ type: 'Register', payload: res });
                }
            })
            .catch(e => {
                console.log("eeeee",e)
                if (e.message === 'Network request failed') {
                    Alert.alert('No Internet Connection');
                }
            });
    };
};
