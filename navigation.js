import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/home'
import CityWeather from './screens/cityWeather'
import SearchCity from './screens/searchCity'
import FindCityAroundMe from './screens/findCityAroundMe'

const Stack = createStackNavigator();

function stackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">  
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="CityWeather" component={CityWeather} options={{ headerShown: false }} />
        <Stack.Screen name="SearchCity" component={SearchCity} options={{ headerShown: false }} />
        <Stack.Screen name="FindCityAroundMe" component={FindCityAroundMe} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default stackNavigation;