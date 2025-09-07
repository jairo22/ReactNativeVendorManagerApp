import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useSelector } from 'react-redux'
import { Image } from 'expo-image'
import { useTheme, useTranslations } from '../core/dopebase'
import { IMDrawerMenu } from '../core/ui/drawer/IMDrawerMenu/IMDrawerMenu'
import {
  LoadScreen,
  LoginScreen,
  SignupScreen,
  SmsAuthenticationScreen,
  ResetPasswordScreen,
  WalkthroughScreen,
  WelcomeScreen,
} from '../core/onboarding'
import { IMChatScreen } from '../core/chat'

import MyProfileScreen from '../components/MyProfileScreen'
import {
  IMEditProfileScreen,
  IMUserSettingsScreen,
  IMContactUsScreen,
} from '../core/profile'
import VendorHomeScreen from '../vendorapp/screens/Home/HomeScreen'
import VendorProductsScreen from '../vendorapp/screens/ProductList/ProductListScreen'

import { NavigationContainer } from '@react-navigation/native'
import { useConfig } from '../config'
import useNotificationOpenedApp from '../core/helpers/notificationOpenedApp'

const Login = createStackNavigator()
const LoginStack = () => {
  return (
    <Login.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Welcome">
      <Login.Screen name="Login" component={LoginScreen} />
      <Login.Screen name="Signup" component={SignupScreen} />
      <Login.Screen name="Welcome" component={WelcomeScreen} />
      <Login.Screen name="Sms" component={SmsAuthenticationScreen} />
      <Login.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Login.Navigator>
  )
}

const VendorMain = createStackNavigator()
const VendorMainNavigation = () => {
  const { theme, appearance } = useTheme()

  return (
    <VendorMain.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: theme.colors[appearance].primaryBackground,
        },
        headerTitleAlign: 'center',
        headerTintColor: theme.colors[appearance].primaryText,
      })}
      initialRouteName="Home"
      headerMode="float">
      <VendorMain.Screen name="Home" component={VendorHomeScreen} />
      <VendorMain.Screen name="Products" component={VendorProductsScreen} />
    </VendorMain.Navigator>
  )
}

const VendorDrawer = createDrawerNavigator()
const VendorDrawerStack = () => {
  const config = useConfig()
  return (
    <VendorDrawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerStyle={{ width: 250 }}
      drawerPosition="left"
      drawerContent={({ navigation }) => (
        <IMDrawerMenu
          navigation={navigation}
          menuItems={config.drawerMenuConfig.vendorDrawer.upperMenu}
          menuItemsSettings={config.drawerMenuConfig.vendorDrawer.lowerMenu}
        />
      )}>
      <VendorDrawer.Screen name="Main" component={VendorMainNavigation} />
    </VendorDrawer.Navigator>
  )
}

const RootStack = createStackNavigator()
const RootNavigator = () => {
  const currentUser = useSelector(state => state.auth.user)
  return (
    <RootStack.Navigator
      initialRouteName="LoadScreen"
      screenOptions={{ headerShown: false, animationEnabled: false }}
      headerMode="none">
      <RootStack.Screen
        options={{ headerShown: false }}
        name="LoadScreen"
        component={LoadScreen}
      />
      <RootStack.Screen
        options={{ headerShown: false }}
        name="Walkthrough"
        component={WalkthroughScreen}
      />
      <RootStack.Screen
        options={{ headerShown: false }}
        name="LoginStack"
        component={LoginStack}
      />

      <RootStack.Screen
        options={{ headerShown: false }}
        name="MainStack"
        component={VendorDrawerStack}
      />
    </RootStack.Navigator>
  )
}

const linking = {
  prefixes: ['https://mychat.com', 'mychat://', 'http://localhost:19006'],
  config: {
    screens: {
      // PersonalChat: 'channelxxx=:channel',
    },
  },
}

const AppNavigator = () => {
  const { appearance, theme } = useTheme()

  return (
    <NavigationContainer
      linking={linking}
      theme={
        appearance === 'dark'
          ? theme.navContainerTheme.dark
          : theme.navContainerTheme.light
      }>
      <RootNavigator />
    </NavigationContainer>
  )
}

export { RootNavigator, AppNavigator }

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapImage: { width: 25, height: 25 },
})
