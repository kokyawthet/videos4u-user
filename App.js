import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import KeepAwake from 'react-native-keep-awake';

import Home from './screens/Home';
import Hartha from './screens/Hartha';
import More from './screens/More';
import Cartoon from './screens/Cartoon'
import DJSong from './screens/DJSong';
import Setting from './screens/Setting';

import VideoPlayer from './screens/Player'
import Header from './components/header';
import Search from './screens/Search';
import Videos from './screens/Videos';
import Episodes from './screens/Episodes';
import EpisodesVideos from './screens/EpisodeVideos';
import Loading from './screens/Loading';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
import { reducer } from './components/postReducer';
import { Provider, useDispatch } from 'react-redux';
import { createStore, combineReducers } from 'redux';
const rootReducer = combineReducers({
  post: reducer,
})
const store = createStore(rootReducer)

import { fcmServices } from './src/FCMServices';
import { LocalNotificatinonServices } from './src/LocalNotificationServices';
import messaging from '@react-native-firebase/messaging';

const RootHome = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      tabBarOptions={{
        activeTintColor: '#FFFFFF',
        labelStyle: { fontSize: 13, fontWeight: 'bold', paddingBottom: 7 },
        style: { backgroundColor: '#FF5722', height: 40 },
        inactiveTintColor: '#f2f2f2',
        indicatorStyle: { backgroundColor: '#fff', elevation: 15 },
        scrollEnabled: true,
        tabStyle: { width: 90 }
      }}
    >
      <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: 'Latest' }} />
      <Tab.Screen name="Cartoon" component={Cartoon} />
      <Tab.Screen name="Hartha" component={Hartha} />
      <Tab.Screen name="DJSong" component={DJSong} options={{ tabBarLabel: 'Songs' }}/>
      <Tab.Screen name="More" component={More} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  )
}

export default function App() {

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  useEffect(() => {
    fcmServices.registerAppWithFCM()
    fcmServices.register(onRegister, onNotification, onOpenNotification)
    LocalNotificatinonServices.configure(onOpenNotification)
    changeKeepAwake(true)

    return () => {
      console.log("[App] unRegister")
      fcmServices.unRegister()
      LocalNotificatinonServices.unRegister()
    }
  }, [])

  function onRegister(token) {
    console.log("[App] on register ", token)
  }

  function onNotification(notify) {
    console.log("[App] on notification ", notify)
    const options = {
      soundName: 'default',
      playSound: true
    }
    LocalNotificatinonServices.showNotification(
      0,
      notify.title,
      notify.body,
      notify,
      options
    )
  }

  function onOpenNotification(notify) {
    console.log("[App] onOpenNotification ", notify)
  }
  function changeKeepAwake(shouldBeAwake) {
    if (shouldBeAwake)
    {
      KeepAwake.activate();
    } else
    {
      KeepAwake.deactivate();
    }
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor="#E64A19" barStyle="light-content" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#E64A19',
              height: 35,
            },
            headerTitle: () => (
              <Header />
            ),
            headerLeft: () => (
              <Text style={styles.header}>Videos 4U</Text>
            ),
          }}
        >
          <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false, }} />
          <Stack.Screen name="RootHome" component={RootHome} options={{ headerShown: true, }} />
          <Stack.Screen name="VideoPlayer" component={VideoPlayer} options={{ headerShown: false }} />
          <Stack.Screen name="Videos" component={Videos} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
          <Stack.Screen name="Episodes" component={Episodes} options={{ headerShown: false }} />
          <Stack.Screen name="EpisodesVideos" component={EpisodesVideos} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  rightHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  header: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 15,
    fontSize: 18
  }
})
