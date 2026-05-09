// App.js — root with navigation
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { AppProvider, useApp } from './src/state/AppState';
import { COLORS } from './src/theme';

import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import ItemDetailScreen from './src/screens/ItemDetailScreen';
import CafePickerScreen from './src/screens/CafePickerScreen';
import CartScreen from './src/screens/CartScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import ConfirmationScreen from './src/screens/ConfirmationScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CartTabIcon({ color, size }) {
  const { cartCount } = useApp();
  const n = cartCount();
  return (
    <View>
      <Ionicons name="bag-outline" size={size} color={color} />
      {n > 0 ? (
        <View style={{
          position: 'absolute', top: -4, right: -8, minWidth: 16, height: 16,
          borderRadius: 8, backgroundColor: COLORS.primary, paddingHorizontal: 4,
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>{n}</Text>
        </View>
      ) : null}
    </View>
  );
}

import { View, Text } from 'react-native';

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.ink,
        tabBarInactiveTintColor: COLORS.inkFaint,
        tabBarStyle: {
          backgroundColor: COLORS.card,
          borderTopColor: COLORS.border,
          height: 84,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ color, size, focused }) => {
          const icons = {
            Home: focused ? 'home' : 'home-outline',
            Menu: focused ? 'grid' : 'grid-outline',
            Cart: focused ? 'bag' : 'bag-outline',
            Orders: focused ? 'receipt' : 'receipt-outline',
            Profile: focused ? 'person-circle' : 'person-circle-outline',
          };
          if (route.name === 'Cart') return <CartTabIcon color={color} size={size} />;
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home"    component={HomeScreen} />
      <Tab.Screen name="Menu"    component={MenuScreen} />
      <Tab.Screen name="Cart"    component={CartScreen} />
      <Tab.Screen name="Orders"  component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: COLORS.bg, card: COLORS.card, text: COLORS.ink, primary: COLORS.primary, border: COLORS.border },
};

export default function App() {
  return (
    <AppProvider>
      <SafeAreaProvider>
        <NavigationContainer theme={navTheme}>
          <StatusBar style="dark" />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
              contentStyle: { backgroundColor: COLORS.bg },
            }}
          >
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ animation: 'fade' }} />
            <Stack.Screen name="Main" component={MainTabs} options={{ animation: 'fade' }} />
            <Stack.Screen name="ItemDetail" component={ItemDetailScreen} options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
            <Stack.Screen name="CafePicker" component={CafePickerScreen} options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
            <Stack.Screen name="Checkout"   component={CheckoutScreen} />
            <Stack.Screen name="Payment"    component={PaymentScreen} />
            <Stack.Screen name="Confirmation" component={ConfirmationScreen} options={{ animation: 'fade' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AppProvider>
  );
}
