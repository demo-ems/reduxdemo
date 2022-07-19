import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { AddCatData, CatListArray } from '../components/actions/LoginAction';

import { Images } from "../../src/Utils/Images";

const lightDurations = [2000, 2000, 2000];

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const TrafficDemo = ({ navigation, ...props }) => {
    const dispatch = useDispatch();

    const catListResData = useSelector(state => state.CATLISTRES);
    const catGetListRes = useSelector(state => state.CATLIStDATA);

    const [colorIndex, setColorIndex] = useState(0);
    const [greenCol, setGreen] = useState('green');
    const [redCol, setRed] = useState('red');
    const [yellowCol, setYellow] = useState('yellow');
    const [next, setNext] = useState('yellow');
    const [counter, setCounter] = useState(0);
    const [uiRender, setUiRender] = useState(false);

    //----- Page Load useEffect called to get the cat list -----//
    // useEffect(() => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setColorIndex((colorIndex + 1) % 3);
        }, lightDurations[colorIndex]);
        return () => clearTimeout(timer);
    }, [colorIndex]);

    //----- This is header view code -----//
    const HeaderView = () => {
        return (
            <View style={styles.headerMainView}>
                <View style={styles.backView}>
                    <TouchableOpacity disabled={true} onPress={() => navigation.goBack()}>
                        <Image source={Images.goBackArrow} style={styles.backImage} />
                    </TouchableOpacity>
                </View>
                <View style={styles.titleMainView}>
                    <Text style={styles.titleTextStyle}>Traffic Signal</Text>
                </View>
                <View style={styles.backView}>
                    <TouchableOpacity disabled={true} onPress={() => addCatFunc()}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                {HeaderView()}
                <View style={{ alignSelf: 'center', marginTop: 20 }}>
                    <View style={{ height: height / 7, width: height / 7, borderRadius: height / 2, backgroundColor: colorIndex === 0 ? 'red' : 'grey' }} />
                    <View style={{ height: height / 7, width: height / 7, borderRadius: height / 2, backgroundColor: colorIndex === 1 ? 'yellow' : 'grey', marginTop: 10 }} />
                    <View style={{ height: height / 7, width: height / 7, borderRadius: height / 2, backgroundColor: colorIndex === 2 ? 'green' : 'grey', marginTop: 10 }} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default TrafficDemo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerMainView: {
        height: 100,
        width: width,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderColor: 'lightgrey',
        paddingTop: 25
    },
    backView: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backImage: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    titleMainView: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleTextStyle: {
        color: '#000',
        fontSize: 18,
        fontWeight: '600'
    },

})