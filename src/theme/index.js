import { Platform } from 'react-native'

const HORIZONTAL_SPACING_BASE = Platform.OS === 'web' ? 4 : 2
const VERTICAL_SPACING_BASE = 4

const icons = {
  logo: require('../assets/icons/restaurant-menu.png'),
  menuHamburger: require('../assets/icons/hamburger-menu-icon.png'),
  playButton: require('../assets/icons/play-button.png'),
  cameraFilled: require('../assets/icons/camera-filled.png'),
  close: require('../assets/icons/close-x-icon.png'),
  home: require('../assets/icons/shop.png'),
  userAvatar: require('../assets/icons/default-avatar.jpg'),
  backArrow: require('../assets/icons/arrow-back-icon.png'),
  create: require('../assets/icons/create.png'),
  shop: require('../assets/icons/shop.png'),
  foods: require('../assets/icons/foods.png'),
  shutdown: require('../assets/icons/shutdown.png'),
  delivery: require('../assets/icons/delivery-icon.png'),
  profile: require('../assets/icons/profile.png'),
  menu: require('../assets/icons/menu.png'),
  search: require('../assets/icons/search.png'),
  cart: require('../assets/icons/cart.png'),
  reserve: require('../assets/icons/reserve.png'),
  paypal: require('../assets/icons/paypal.png'),
  cashOnDelivery: require('../assets/icons/cod.png'),
}

const navContainerTheme = {
  dark: {
    colors: {
      primary: '#704BFF',
      background: '#000000',
      card: '#000000',
      text: '#ffffff',
      border: '#f5f5f5',
      notification: '#ea0606',
    },
    dark: true,
    light: false,
  },
  light: {
    colors: {
      primary: '#704BFF',
      background: '#ffffff',
      card: '#ffffff',
      text: '#000000',
      border: '#d6d6d6',
      notification: '#ea0606',
    },
    dark: false,
    light: true,
  },
}

const lightColors = {
  primaryBackground: '#ffffff',
  secondaryBackground: '#ffffff',
  primaryForeground: '#ee274a',
  secondaryForeground: '#5ea23a',
  foregroundContrast: 'white',
  primaryText: '#555555',
  secondaryText: '#7e7e7e',
  hairline: '#e0e0e0',
  grey0: '#fafafa',
  grey3: '#f5f5f5',
  grey6: '#d6d6d6',
  grey9: '#939393',
  red: '#ea0606',
}

const InstamobileTheme = {
  navContainerTheme,
  colors: {
    light: lightColors,
    'no-preference': lightColors,
    dark: {
      primaryBackground: '#ee274a',
      secondaryBackground: '#000000',
      primaryForeground: '#5ea23a',
      secondaryForeground: '#8442bd',
      foregroundContrast: 'white',
      primaryText: '#aaaaaa',
      secondaryText: '#818181',
      hairline: '#222222',
      grey0: '#0a0a0a',
      grey3: '#2a2a2a',
      grey6: '#f5f5f5',
      grey9: '#eaeaea',
      red: '#ea0606',
    },
  },
  spaces: {
    horizontal: {
      s: 2 * HORIZONTAL_SPACING_BASE,
      m: 4 * HORIZONTAL_SPACING_BASE,
      l: 6 * HORIZONTAL_SPACING_BASE,
      xl: 8 * HORIZONTAL_SPACING_BASE,
    },
    vertical: {
      s: 2 * VERTICAL_SPACING_BASE,
      m: 4 * VERTICAL_SPACING_BASE,
      l: 6 * VERTICAL_SPACING_BASE,
      xl: 8 * VERTICAL_SPACING_BASE,
    },
  },
  fontSizes: {
    xxs: 8,
    xs: 12,
    s: 14,
    m: 16,
    l: 18,
    xl: 24,
    xxl: 32,
  },
  fontWeights: {
    s: '400',
    m: '600',
    l: '800',
  },
  icons: icons,
  // color, font size, space / margin / padding, vstack / hstack
  button: {
    borderRadius: 8,
  },
}

export default InstamobileTheme
