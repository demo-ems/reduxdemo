import React from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { API } from '../../Utils/BaseUrl';
import showToast from '../../Utils/ShowToast';

//----- Image Upload Api for uploading profile image-----//
export const ImageUploadApi = params => {
    var formData = new FormData();
    formData.append('profile_picture', {
        uri: params.path,
        type: params.type,
        name: params.name,
    });
    console.log('formData', formData);

    return async dispatch => {
        fetch(`${API.BASE}/upload.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
            .then(res => res.json())
            .then(res => {
                console.log("res", res)
                if (res.status === true) {
                    // Alert.alert("Image uploaded successfully");
                    dispatch({ type: 'UPLOADIMAGE', payload: res });
                } else if (res.status != true) {
                    Alert.alert(res.message);
                }
            })
            .catch(e => {
                console.log("eeee", e)
                if (e.message === 'Network request failed') {
                    Alert.alert('No Internet Connection');
                }
            });
    };
};