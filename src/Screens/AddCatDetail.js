import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector, useDispatch, Provider } from 'react-redux';
import {AddCatData, CatListArray} from '../components/actions/LoginAction';

import { Images } from "../../src/Utils/Images";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const AddCatDetail = ({ navigation, ...props }) => {
   const dispatch = useDispatch();

   const catListResData = useSelector(state => state.CATLISTRES);
   const catGetListRes = useSelector(state => state.CATLIStDATA);

    const [catName, setCatName] = useState('');
    const [catBreed, setCatBreed] = useState('');
    const [catDesc, setCatDesc] = useState('');
    const [catArray, setCatArray] = useState([]);

    //----- Page Load useEffect called to get the cat list -----//
    useEffect(() => {
            setCatArray([]);
            setCatName('');
            setCatBreed('');
            setCatDesc('');
            dispatch(AddCatData(''))
    }, [])

    //----- This useeffect call when there is catGetListRes -----//
    useEffect(() => {
        let array = [];
        if(catGetListRes != undefined && catGetListRes != ''){
            array.push(...catGetListRes)
        }
        setCatArray(array)
    }, [catGetListRes])

    //----- This useeffect call when adding the data -----//
    useEffect(() => {
        let arrayRe = [];
        if(catListResData != undefined && catListResData != ''){
            arrayRe.push(catListResData)
            setCatArray(catArray.push(catListResData))
            dispatch(CatListArray(catArray))
            navigation.goBack()
            dispatch(AddCatData(''))
        }
    }, [catListResData])

    //----- This is header view code -----//
    const HeaderView = () => {
        return (
            <View style={styles.headerMainView}>
                <View style={styles.backView}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={Images.goBackArrow} style={styles.backImage}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.titleMainView}>
                    <Text style={styles.titleTextStyle}>Add Cat Detail</Text>
                </View>
                <View style={styles.backView}>
                <TouchableOpacity onPress={() => addCatFunc()}>
                    <Text>Save</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }

    //----- This function is to call dispatch method of AddCatData -----//
    const addCatFunc = () => {
        const sendData = {
            name: catName,
            breed: catBreed,
            description: catDesc,
        }
        dispatch(AddCatData(sendData))
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
            {HeaderView()}
            <View>
                <View style={styles.catNameMainView}>
                    <Text>Cat Name</Text>
                    <TextInput
                        style={styles.catNameTextInput}
                        placeholder='Enter cat name'
                        value={catName}
                        onChangeText={(text) => setCatName(text)}
                    />
                </View>

                <View style={styles.catNameMainView}>
                    <Text>Cat Breed</Text>
                    <TextInput
                        style={styles.catNameTextInput}
                        placeholder='Enter cat breed'
                        value={catBreed}
                        onChangeText={(text) => setCatBreed(text)}
                    />
                </View>

                <View style={styles.catNameMainView}>
                    <Text>Cat Description</Text>
                    <TextInput
                        style={styles.catDescInput}
                        textAlignVertical='top'
                        placeholder='Enter cat description'
                        multiline={true}
                        value={catDesc}
                        onChangeText={(text) => setCatDesc(text)}
                    />
                </View>
            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}

export default AddCatDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    headerMainView:{
        height:100, 
        width: width, 
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth: 0.5,
        borderColor:'lightgrey',
        paddingTop: 25
    },
    backView:{
        flex:0.5, 
        alignItems:'center', 
        justifyContent:'center'
    },
    backImage:{
        height:20, 
        width:20, 
        resizeMode:'contain'
    },
    titleMainView:{
        flex:3, 
        alignItems:'center', 
        justifyContent:'center'
    },
    titleTextStyle:{
        color:'#000', 
        fontSize:18, 
        fontWeight:'600'
    },
    catNameMainView:{
        alignSelf:'center', 
        marginTop:10
    },
    catNameTextInput:{
        height:40, 
        width: width - 40, 
        backgroundColor:'#f2f2f2', 
        marginTop:5, 
        paddingHorizontal:10, 
        borderRadius:5
    },
    catDescInput:{
        height:100, 
        width: width - 40, 
        backgroundColor:'#f2f2f2', 
        marginTop:5, 
        paddingHorizontal:10, 
        borderRadius:5
    }
   
})