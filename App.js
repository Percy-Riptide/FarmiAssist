import React,{useState,useEffect} from 'react';
import {Modal,Text,View,StyleSheet,Image,TextInput,TouchableOpacity} from 'react-native';
import * as Localize from 'expo-localization';
import i18n from 'i18n-js';

const en = {
  appname: "Farmi-Assist",
  send: "Submit",
  cancel: "Clear",
  problem: "Please Enter Your Problem Here",
  speak: "Speak your problem"
}

const kn = {
  appname: "ಫಾರ್ಮಿ-ಅಸಿಸ್ಟ್",
  send: "ಸಲ್ಲಿಸಿ",
  cancel: "ಅಳಿಸಿ",
  problem: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ಇಲ್ಲಿ ನಮೂದಿಸಿ",
  speak: "ನಿಮ್ಮ ಸಮಸ್ಯೆ ಮಾತನಾಡಿ"
}

i18n.translations = { kn,en };
i18n.locale = "en";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [textinput, setTextinput] = useState('');
  const [addQuery, setAddQuery] = useState('');
  const [modalVisible,setModalVisible] = useState(true);

  const InputTextHandler = (textinput) => {
    setTextinput(textinput);
  }

  const QueryHandler = () => {
    setAddQuery(textinput);
    setTextinput('');
  }

  const ClearText = () => {
    setTextinput('');
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  });

  let longitude = 'Waiting..';
  let latitude = 'Waiting';

  if (errorMsg) {
    longitude='Error!';
    latitude='Error!';
  }
  else if (location) {
    longitude = JSON.stringify(location.coords.longitude);
    latitude = JSON.stringify(location.coords.latitude);
  }

  return (
    <View style={styles.bg}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}>
        <View style={{ flex:1,backgroundColor:'#1c1c1c', alignItems:'center',justifyContent: 'center' }}>
        <View style={styles.buttonholder}>
          <View style={{margin:50, width:90}}>
            <TouchableOpacity 
              onPress={() => {
                i18n.locale = "kn";
                setModalVisible(!modalVisible);
              }}
              style={{alignItems: 'center',
              padding: 10,backgroundColor: '#009999',
              borderRadius:24}}>
                <Text style={styles.textcol}>ಕನ್ನಡ</Text></TouchableOpacity>
          </View>
          <View style={{margin:50, width:90}} >
            <TouchableOpacity 
              onPress={() => {
                i18n.locale = "en";
                setModalVisible(!modalVisible);
              }}
              style={{
                alignItems: 'center',
                padding: 10,
                backgroundColor:'#009999',
                borderRadius:24}}>
              <Text style={styles.textcol}>English</Text></TouchableOpacity>
          </View>
        </View>
        </View>
      </Modal>
      <View style={styles.topview}>
        <Image
          source={require('./assets/icon.png')}
          style={{width:50, height:50}}
        />
        <View style={styles.container}><Text style={styles.textcol}>{i18n.t('appname')}</Text></View>
      </View>
      <Text style={styles.textcol}>{i18n.t('problem')}</Text>
      <View 
        style={{
          backgroundColor:'rgba(195, 195, 162,0.2)',
          borderRadius: 30,
          margin:20
        }}
      >
        <TextInput
          multiline
          numberOfLines={2}
          placeholder="......."
          keyboardAppearance="dark"
          style={{width: '95%', color: '#ffffff',padding: 15,fontSize:20}}
          onChangeText={InputTextHandler} value={textinput}
        />
      </View>
        <View style={styles.buttonholder}>
          <View style={{margin:50, width:90}}>
            <TouchableOpacity 
              onPress={ClearText}
              style={{alignItems: 'center',
              padding: 10,backgroundColor: '#d06060',
              borderRadius:24}}>
                <Text style={styles.textcol}>{i18n.t('cancel')}</Text></TouchableOpacity>
          </View>
          <View style={{margin:50, width:90}} >
            <TouchableOpacity 
              onPress={QueryHandler}
              style={{
                alignItems: 'center',
                padding: 10,
                backgroundColor:'#79d488',
                borderRadius:24}}>
              <Text style={styles.textcol}>{i18n.t('send')}</Text></TouchableOpacity>
          </View>
        </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            padding: 12,
            backgroundColor:'#7979f1',
            borderRadius:24}}>
          <Text style={styles.textcol}>{i18n.t('speak')}</Text></TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.textcol}>{addQuery}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topview: {
    paddingTop: 40,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container:{
    padding: 35,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bg:{
    backgroundColor: '#1c1c1c',
    flex: 1
  },
  textcol:{
    color: '#ffffff',
    fontSize: 20
  },
  buttonholder:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  }
});