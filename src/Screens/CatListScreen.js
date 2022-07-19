import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Linking,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getHomeList} from '../components/actions/LoginAction';
import {Images} from '../../src/Utils/Images';
import {ScrollView, TextInput} from 'react-native-gesture-handler';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const CatListScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const HomeListData = useSelector(state => state.login.HOMELISTRES);
  console.log('HOMELISTRES', HomeListData);

  const [catMainList, setCatList] = useState([]);
  const [uiRender, setUiRender] = useState(false);
  const [arrayholder, setArrayholder] = useState([]);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  //----- CatList res Useeffect called -----//
  useEffect(() => {
    dispatch(getHomeList());
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (HomeListData?.users) {
      setCatList(HomeListData?.users);
      setArrayholder(HomeListData?.users);
      setIsLoading(false);
    }
  }, [HomeListData]);

  const handleSearch = text => {
    setText(text);
    const filterData = catMainList.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setArrayholder(filterData);
  };
  //----- This is header view code -----//
  const HeaderView = () => {
    return (
      <View style={styles.headerMainView}>
        <View style={styles.backView}>
          <TouchableOpacity>
            {/* <Image source={Images.goBackArrow} style={styles.backImage}/> */}
          </TouchableOpacity>
        </View>
        <SafeAreaView style={styles.titleMainView}>
          <Text style={styles.titleTextStyle}>Home Page</Text>
        </SafeAreaView>
        <View style={styles.backView}>
          <TouchableOpacity
            onPress={() => {
              dispatch({type: 'HomeDataSuccess', payload: ''});
              navigation.navigate('LoginScreen');
            }}>
            <SafeAreaView>
              <Text style={{color: '#40E0D0', marginRight: 10}}>Logout</Text>
            </SafeAreaView>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const openCall = catItem => {
    Linking.openURL(`tel:${Number(catItem)}`);
  };

  //----- This is delete function -----//
  const deleteItemFunc = getData => {
    const index = catMainList.indexOf(getData);
    catMainList.splice(index, 1);
    dispatch(CatListArray(catMainList));
    setUiRender(!uiRender);
  };
  console.log('arrrrrr ', arrayholder);
  return (
    <View style={styles.container}>
      {HeaderView()}
      <View style={{marginLeft: 10, marginBottom: 5}}>
        <TextInput
          placeholder=" Search..."
          placeholderTextColor={'grey'}
          style={styles.textInputStyle}
          value={text}
          onChangeText={text => handleSearch(text)}
        />
      </View>
      {isLoading ? (
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
          <View>
            {arrayholder && arrayholder.length > 0 ? (
              <View>
                {arrayholder.map((catItem, catIndex) => (
                  <View key={catIndex} style={styles.ListMainTouchable}>
                    <View>
                      <View style={{flexDirection: 'row'}}>
                        <View>
                          {catItem.profile_picture ? (
                            <Image
                              source={{uri: catItem.profile_picture}}
                              style={{height: 60, width: 60, borderRadius: 30}}
                            />
                          ) : (
                            <Image
                              source={Images.dummyImage}
                              style={{
                                height: 60,
                                width: 60,
                                borderRadius: 30 / 2,
                              }}
                            />
                          )}
                        </View>
                        <View style={{marginLeft: 15}}>
                          <Text>{catItem.name}</Text>
                          <Text style={{marginTop: 5}}>{catItem.age}</Text>
                          <Text style={{marginTop: 5}}>
                            {catItem.level_of_expertise}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => openCall(catItem.phone_number)}>
                      <Image
                        source={Images.CallImage}
                        style={{height: 25, width: 25}}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default CatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerMainView: {
    height: 70,
    width: width,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: 'lightgrey',
  },
  backView: {
    // flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  titleMainView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle: {
    color: '#40E0D0',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  ListMainTouchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderColor: '#000',
    borderBottomWidth: 0.5,
  },
  nameDescMainView: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  nameBreedMainViewe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breedTextStyle: {
    color: 'lightgrey',
    fontSize: 11,
    marginLeft: 10,
  },
  descTextStyle: {
    color: 'grey',
    fontSize: 12,
    width: width / 2 + 85,
  },
  editDeleteView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  editDeleteImageStyle: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  textInputStyle: {
    height: height / 15,
    width: width - 20,
    color: '#000',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    fontSize: 16,
    borderColor: '#40E0D0',
  },
});
