# CampusBite — React Native (Expo)

A college food delivery app: coffee, meals, snacks, late-night. Pay with meal plan, split with roommates, track orders.

## Run it

```bash
cd react-native
npm install
npx expo start
```

Scan the QR code with the **Expo Go** app on iOS / Android, or press `i` for iOS simulator / `a` for Android.

## Stack

- **Expo SDK 51** (no native build step needed)
- **React Native 0.74**
- **React Navigation v6** — native stack + bottom tabs with native iOS-style transitions
- **@expo/vector-icons** (Ionicons) — no extra setup
- **React Context** for cart & auth state

## Project layout

```
react-native/
├── App.js                    Root, navigation, theme provider
├── app.json                  Expo config
├── babel.config.js           Babel + Reanimated plugin
├── package.json
└── src/
    ├── theme.js              Colors, spacing, type, shadows
    ├── data.js               Mock menu, cafes, orders
    ├── state/AppState.js     Cart + user context
    ├── components/
    │   ├── UI.js             Buttons, Card, Chip, Section, Tag
    │   └── ItemImage.js      Tinted placeholder visual
    └── screens/
        ├── OnboardingScreen.js
        ├── HomeScreen.js
        ├── MenuScreen.js
        ├── ItemDetailScreen.js     (modal, slides up)
        ├── CafePickerScreen.js     (modal, slides up)
        ├── CartScreen.js
        ├── CheckoutScreen.js
        ├── PaymentScreen.js
        ├── ConfirmationScreen.js
        ├── OrdersScreen.js
        └── ProfileScreen.js
```

## Native iOS-style transitions

Push screens use `slide_from_right` (iOS UINavigationController feel). Modal-style screens (item detail, cafe picker) use `slide_from_bottom` like a UIKit sheet. Tab switches are instant per Apple HIG.

Pressables compress to ~97% on touch (`PrimaryButton`, `Chip`, `Card`) to mimic UIKit haptic feedback.

## Where to plug real data

- Replace `src/data.js` with API fetches.
- Wire `placeOrder` in `AppState.js` to your backend.
- Swap `<ItemImage>` placeholders with real `<Image>` components.
- Add real auth in `OnboardingScreen` (currently `replace('Main')` on submit).

## Notes

- No image assets shipped — tinted letter blocks act as placeholders. Drop your own product photography into `assets/` and import them per item.
- Ionicons covers every glyph used. You can swap for SF Symbols or custom SVGs.
- Currency formatted USD; localize via `Intl.NumberFormat` if needed.
