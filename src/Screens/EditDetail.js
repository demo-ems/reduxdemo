import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector, useDispatch, Provider } from 'react-redux';
import {CatListArray} from '../components/actions/LoginAction';

import { Images } from "../../src/Utils/Images";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const EditDetail = ({ navigation, ...props }) => {
   const dispatch = useDispatch();

   const catListResData = useSelector(state => state.CATLIStDATA);

    const [catName, setCatName] = useState('');
    const [catBreed, setCatBreed] = useState('');
    const [catDesc, setCatDesc] = useState('');
    const [catMainList, setCatList] = useState([]);
    const [arrayIndex, setArrayIndex] = useState('');

    //----- Page Load useEffect called to get the cat list -----//
    useEffect(() => {
            if(props && props.route && props.route.params){
                if(props.route.params.editData){
                    setCatName(props.route.params.editData.name);
                    setCatBreed(props.route.params.editData.breed);
                    setCatDesc(props.route.params.editData.description);
                }
                if(props.route.params){
                    setArrayIndex(props.route.params.editIndex);
                }
            }
    }, [])

    //----- This useEffect will call when catListResData > 0 -----//
    useEffect(() => {
        if(catListResData != undefined && catListResData.length > 0){
            setCatList(catListResData)
        }
    }, [catListResData])

    //----- This is Header code -----//
    const HeaderView = () => {
        return (
            <View style={styles.headerMainView}>
                <View style={styles.backView}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={Images.goBackArrow} style={styles.backImage}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.titleMainView}>
                    <Text style={styles.titleTextStyle}>Edit Detail</Text>
                </View>
                <View style={styles.backView}>
                <TouchableOpacity onPress={() => EditFunc()}>
                    <Text>Save</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }

    //----- This function is for edit the data of a particular index of an array -----//
    const EditFunc = () => {
        const newValue = {
            name: catName,
            breed: catBreed,
            description: catDesc,
        }
        const copyOfImages = [...catMainList];
        copyOfImages[arrayIndex] = newValue;
        dispatch(CatListArray(copyOfImages))
        navigation.goBack()
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

export default EditDetail;

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