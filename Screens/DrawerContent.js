import React from 'react';
import { View, StyleSheet,Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Caption, Drawer } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import i18n from 'i18n-js';
import en from './Languages/en.json';
import kn from './Languages/kn.json'

const trans={
    en: ()=>require('./Languages/en.json'),
    kn: ()=>require('./Languages/kn.json')
}
i18n.translations = { kn, en };

function DrawerContent(props) {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15, justifyContent:'center' }}>
                            <Image source={require('../assets/icon.png')} style={{ width: 50, height: 50}} />
                        </View>
                        <View style={{flexDirection:'column', alignItems:'center', paddingTop:10}}>
                            <Caption style={styles.caption}>{i18n.t('caption')}</Caption>
                        </View>
                    </View>
                    <Drawer.Section style='styles.drawerSection'>
                        <DrawerItem icon={({ color, size }) =>
                            (
                                <Icon
                                    name='settings-box'
                                    color={color}
                                    size={size}
                                />
                            )}
                            label={i18n.t('language')}
                            onPress={() => { props.navigation.reset({
                                index:0,
                                routes: [{name: 'Language'}],
                            })}}
                            />
                            <DrawerItem icon={({color,size})=>
                           (
                               <Icon
                               name='home'
                               color={color}
                               size={size}
                               />
                           )
                        }
                        label={i18n.t('home')}
                        onPress={()=>props.navigation.navigate('Home',{val:i18n.locale})}/>
    
                        <DrawerItem icon={({ color, size }) =>
                            (
                                <Icon
                                    name='library'
                                    color={color}
                                    size={size}
                                />
                            )}
                            label={i18n.t('library')}
                                onPress={() => {props.navigation.navigate('Agricultural Dictionary')}}
                        />
                        <DrawerItem icon={({ color, size }) =>
                            (
                                <Icon
                                    name='information'
                                    color={color}
                                    size={size}
                                />
                            )}
                            label={i18n.t('about')}
                                onPress={() => {props.navigation.navigate('About') }}
                        />
                        
                    </Drawer.Section>
                   
                </View>
            </DrawerContentScrollView>
            
        </View>
        )
}
const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection:{
        paddingLeft: 20,
        borderBottomColor:'#ffffff'
            },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
        color:'#fff'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        color:'#fff',
        marginTop:9
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        color:"#fff"
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3
    },
    drawerSection: {
        marginTop: 15,
        color:"#fff"
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    }  
})
export default DrawerContent;