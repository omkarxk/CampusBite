// App.js — root with navigation + smooth animations
import 'react-native-gesture-handler';
import React, { useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Pressable, Animated, StyleSheet, Platform } from 'react-native';

import { AppProvider, useApp } from './src/state/AppState';
import { COLORS, RADIUS, SHADOWS } from './src/theme';

import OnboardingScreen    from './src/screens/OnboardingScreen';
import HomeScreen          from './src/screens/HomeScreen';
import MenuScreen          from './src/screens/MenuScreen';
import ItemDetailScreen    from './src/screens/ItemDetailScreen';
import CafePickerScreen    from './src/screens/CafePickerScreen';
import CartScreen          from './src/screens/CartScreen';
import CheckoutScreen      from './src/screens/CheckoutScreen';
import PaymentScreen       from './src/screens/PaymentScreen';
import ConfirmationScreen  from './src/screens/ConfirmationScreen';
import OrdersScreen        from './src/screens/OrdersScreen';
import ProfileScreen       from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab   = createBottomTabNavigator();

// ─── Animated tab bar icon ───────────────────────────────────────────────────
function AnimatedTabIcon({ name, focusedName, color, size, focused, badgeCount }) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (focused) {
      Animated.spring(scale, {
        toValue: 1.15,
        useNativeDriver: true,
        damping: 10,
        stiffness: 180,
      }).start();
    } else {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        damping: 12,
        stiffness: 200,
      }).start();
    }
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Ionicons name={focused ? focusedName : name} size={size} color={color} />
      {badgeCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      )}
    </Animated.View>
  );
}

// ─── Custom animated tab bar ──────────────────────────────────────────────────
const TAB_ITEMS = [
  { name: 'Home',    icon: 'home-outline',           focusedIcon: 'home',           label: 'Home'    },
  { name: 'Menu',    icon: 'grid-outline',            focusedIcon: 'grid',           label: 'Menu'    },
  { name: 'Cart',    icon: 'bag-outline',             focusedIcon: 'bag',            label: 'Cart'    },
  { name: 'Orders',  icon: 'receipt-outline',         focusedIcon: 'receipt',        label: 'Orders'  },
  { name: 'Profile', icon: 'person-circle-outline',   focusedIcon: 'person-circle',  label: 'Profile' },
];

function AnimatedTabBar({ state, descriptors, navigation }) {
  const { cartCount } = useApp();
  const cart = cartCount();

  // One press-scale value per tab
  const pressScales = useRef(TAB_ITEMS.map(() => new Animated.Value(1))).current;

  function onPress(route, index, isFocused) {
    // Spring pop on press
    Animated.sequence([
      Animated.spring(pressScales[index], { toValue: 0.88, useNativeDriver: true, damping: 8, stiffness: 300 }),
      Animated.spring(pressScales[index], { toValue: 1,    useNativeDriver: true, damping: 8, stiffness: 300 }),
    ]).start();

    const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  }

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const focused  = state.index === index;
        const tab      = TAB_ITEMS[index];
        const badgeCount = route.name === 'Cart' ? cart : 0;

        return (
          <Pressable
            key={route.key}
            onPress={() => onPress(route, index, focused)}
            style={styles.tabItem}
            android_ripple={null}
          >
            <Animated.View style={[
              styles.tabPill,
              focused && styles.tabPillActive,
              { transform: [{ scale: pressScales[index] }] },
            ]}>
              <AnimatedTabIcon
                name={tab.icon}
                focusedName={tab.focusedIcon}
                size={22}
                color={focused ? '#fff' : COLORS.inkFaint}
                focused={focused}
                badgeCount={badgeCount}
              />
              {focused && (
                <Text style={styles.tabLabel}>{tab.label}</Text>
              )}
            </Animated.View>
          </Pressable>
        );
      })}
    </View>
  );
}

// ─── Main tabs ────────────────────────────────────────────────────────────────
function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home"    component={HomeScreen}    />
      <Tab.Screen name="Menu"    component={MenuScreen}    />
      <Tab.Screen name="Cart"    component={CartScreen}    />
      <Tab.Screen name="Orders"  component={OrdersScreen}  />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// ─── Navigation theme ─────────────────────────────────────────────────────────
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.bg,
    card:       COLORS.card,
    text:       COLORS.ink,
    primary:    COLORS.primary,
    border:     COLORS.border,
  },
};

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <AppProvider>
      <SafeAreaProvider>
        <NavigationContainer theme={navTheme}>
          <StatusBar style="dark" />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              // Native iOS feel — hardware-accelerated slide
              animation: 'ios',
              // Full-screen swipe back (like iPhone)
              gestureEnabled: true,
              fullScreenGestureEnabled: true,
              gestureDirection: 'horizontal',
              contentStyle: { backgroundColor: COLORS.bg },
              // Crisp transitions
              animationDuration: 380,
            }}
          >
            <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
              options={{ animation: 'fade', animationDuration: 400 }}
            />
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{ animation: 'fade', animationDuration: 350 }}
            />
            <Stack.Screen
              name="ItemDetail"
              component={ItemDetailScreen}
              options={{
                presentation: 'formSheet',
                animation: 'slide_from_bottom',
                sheetAllowedDetents: [1.0],
                sheetCornerRadius: 24,
              }}
            />
            <Stack.Screen
              name="CafePicker"
              component={CafePickerScreen}
              options={{
                presentation: 'formSheet',
                animation: 'slide_from_bottom',
                sheetAllowedDetents: [0.6, 1.0],
                sheetCornerRadius: 24,
              }}
            />
            <Stack.Screen name="Checkout"     component={CheckoutScreen}     />
            <Stack.Screen name="Payment"      component={PaymentScreen}      />
            <Stack.Screen
              name="Confirmation"
              component={ConfirmationScreen}
              options={{ animation: 'fade', animationDuration: 400 }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AppProvider>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.card,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.pill,
    gap: 6,
  },
  tabPillActive: {
    backgroundColor: COLORS.ink,
  },
  tabLabel: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  badge: {
    position: 'absolute',
    top: -4, right: -8,
    minWidth: 16, height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
});
