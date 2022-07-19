import React from 'react';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { Alert } from 'react-native';
import { API } from '../../Utils/BaseUrl';

export const AddCatData = (list) => {
  return async (dispatch) => {
    dispatch({ type: 'CatListRes', payload: list });
  }
};

export const CatListArray = (catList) => {
  return async (dispatch) => {
    dispatch({ type: 'CatListData', payload: catList });
  }
};

export const LoginAction = (params, navigation) => {
  var formData = new FormData();
  formData.append('email', params.email);
  formData.append('password', params.password);

  return async dispatch => {
    fetch(`${API.BASE}/login.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(res => res.json())
      .then(res => {
        console.log("ress....", res)
        if (res.status === true) {
          Alert.alert(res.message)
          dispatch({ type: 'LoginSuccess', payload: res });
        } else if (res.status != true) {
          Alert.alert(res.message)
          dispatch({ type: 'LoginSuccess', payload: res });
        }
      })
      .catch(e => {
        if (e.message === 'Network request failed') {
          Alert.alert('No Internet Connection');
        }
      });
  };
};


export const getHomeList = () => {

  return async dispatch => {
    fetch(`${API.BASE}/fetch.php`, {
      method: 'GET',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // }
    })
      .then(res => res.json())
      .then(res => {
        console.log("ress....", res)
        if (res.status === true) {
          // Alert.alert(res.message)
          dispatch({ type: 'HomeDataSuccess', payload: res });
        } else if (res.status != true) {
          // Alert.alert(res.message)
          dispatch({ type: 'HomeDataSuccess', payload: res });
        }
      })
      .catch(e => {
        if (e.message === 'Network request failed') {
          Alert.alert('No Internet Connection');
        }
      });
  };
};