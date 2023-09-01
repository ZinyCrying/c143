/**
 * The function creates a top tab navigation using React Navigation in a React Native app, with three
 * screens: PopularMoviesScreen, RecommendedMoviesScreen, and LikedMoviesScreen.
 * @returns The TopTabNav component is returning a MaterialTopTabNavigator component from the
 * react-navigation library. The MaterialTopTabNavigator component is configured with several screen
 * options, including tabBarLabelStyle, tabBarItemStyle, tabBarStyle, and tabBarActiveTintColor. It has
 * three screens: PopularMoviesScreen, RecommendedMoviesScreen, and LikedMoviesScreen.
 */
import React from "react";
import PopularMoviesScreen from "../screens/Popular";
import RecommendedMoviesScreen from "../screens/Recommendation";
import LikedMoviesScreen from "../screens/Liked";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RFValue } from "react-native-responsive-fontsize";

const AppTopNavigation = createMaterialTopTabNavigator();

export default function TopTabNav() {
  return (
    <AppTopNavigation.Navigator  screenOptions={{
      tabBarLabelStyle: { fontSize: RFValue(12) ,fontFamily:"monospace"},
      tabBarItemStyle: { borderWidth:1, borderColor:"white" },
      tabBarStyle: { backgroundColor: '#182854' },
      tabBarActiveTintColor: 'white',
    }}>
      <AppTopNavigation.Screen name="Popular" component={PopularMoviesScreen} />
      <AppTopNavigation.Screen name="Recommended" component={RecommendedMoviesScreen} />
      <AppTopNavigation.Screen name="Liked" component={LikedMoviesScreen} />
    </AppTopNavigation.Navigator>
  );
}