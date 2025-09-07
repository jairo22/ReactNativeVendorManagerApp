import React, { useContext } from 'react'
import { Platform } from 'react-native'
import { useTheme, useTranslations } from '../core/dopebase'

const regexForNames = /^[a-zA-Z]{2,25}$/
const regexForPhoneNumber = /\d{9}$/

export const ConfigContext = React.createContext({})

export const ConfigProvider = ({ children }) => {
  const { theme } = useTheme()
  const { localized } = useTranslations()
  const config = {
    isMultiVendorEnabled: false,
    isSMSAuthEnabled: true,
    isGoogleAuthEnabled: true,
    isAppleAuthEnabled: true,
    isFacebookAuthEnabled: true,
    forgotPasswordEnabled: true,
    appIdentifier: `rn-multivendor-vendorapp-${Platform.OS}`,
    facebookIdentifier: '1288726485109267',
    isDelayedLoginEnabled: false,
    webClientId: Platform.select({
      ios: '22965687108-k9uqgstoahao7bndat1lgbhmlektp2jb.apps.googleusercontent.com',
      default:
        '22965687108-eb2r7krmmebfrd7ks8cl4pc073kek39g.apps.googleusercontent.com',
    }),
    googleAPIKey: 'AIzaSyABq2WJNGXFZC2u-_9Z9SjWovSdmTe29ko', // This is used for fetching Google Maps data, such as geocoding data, reverse geocoding, directions, maps, etc.
    tables: {
      vendorsTableName: 'vendors',
      vendorOrdersTableName: 'restaurant_orders',
      vendorDeliveriesTableName: 'restaurant_deliveries',
      vendorReviewsTableName: 'vendor_reviews',
      vendorProductsTableName: 'vendor_products',
      vendorCategoriesTableName: 'vendor_categories',
      reservationsTableName: 'reservations',
    },
    onboardingConfig: {
      welcomeTitle: localized('Bienvenido a Yasta'),
      welcomeCaption: localized(
        'app para cocineros',
      ),
      walkthroughScreens: [
        {
          icon: require('../assets/icons/restaurant-menu.png'),
          title: localized('Bienvenido a Yasta'),
          description: localized(
            'Inicie sesión y pida comida deliciosa de cocineros cercanos',
          ),
        },
        {
          icon: require('../assets/icons/delivery-icon.png'),
          title: localized('Pedidos'),
          description: localized(
            'Su cliente puede comenzar a pedir comida en su cocina ahora mismo.',
          ),
        },
        {
          icon: require('../assets/icons/binoculars.png'),
          title: localized('Envíos'),
          description: localized(
            'Todos los pedidos que acepta tu restaurante son entregados por nuestros conductores.',
          ),
        },
        {
          icon: require('../assets/icons/apple.png'),
          title: localized('Pagos'),
          description: localized(
            'Nosotros nos encargamos de los pagos y la infraestructura del envío',
          ),
        },
      ],
    },
    drawerMenuConfig: {
      vendorDrawer: {
        upperMenu: [
          {
            title: localized('GESTIONAR PEDIDOS'),
            icon: theme.icons.shop,
            navigationPath: 'Home',
          },
          {
            title: localized('GESTIONA PRODUCTOS'),
            icon: theme.icons.foods,
            navigationPath: 'Products',
          },
        ],
        lowerMenu: [
          {
            title: localized('SALIR'),
            icon: theme.icons.shutdown,
            action: 'logout',
          },
        ],
      },
    },
    tosLink: 'https://www.instamobile.io/eula-instachatty/',
    isUsernameFieldEnabled: false,
    smsSignupFields: [
      {
        displayName: localized('Nombre'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'firstName',
        placeholder: 'First Name',
      },
      {
        displayName: localized('Apellido'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'lastName',
        placeholder: 'Last Name',
      },
    ],
    signupFields: [
      {
        displayName: localized('Nombre'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'firstName',
        placeholder: 'First Name',
      },
      {
        displayName: localized('Apellido'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'lastName',
        placeholder: 'Last Name',
      },
      {
        displayName: localized('E-mail'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'email',
        placeholder: 'E-mail Address',
        autoCapitalize: 'none',
      },
      {
        displayName: localized('Password'),
        type: 'default',
        secureTextEntry: true,
        editable: true,
        regex: regexForNames,
        key: 'password',
        placeholder: 'Password',
        autoCapitalize: 'none',
      },
    ],
    editProfileFields: {
      sections: [
        {
          title: localized('PUBLIC PROFILE'),
          fields: [
            {
              displayName: localized('First Name'),
              type: 'text',
              editable: true,
              regex: regexForNames,
              key: 'firstName',
              placeholder: 'Your first name',
            },
            {
              displayName: localized('Last Name'),
              type: 'text',
              editable: true,
              regex: regexForNames,
              key: 'lastName',
              placeholder: 'Your last name',
            },
          ],
        },
        {
          title: localized('PRIVATE DETAILS'),
          fields: [
            {
              displayName: localized('E-mail Address'),
              type: 'text',
              editable: false,
              key: 'email',
              placeholder: 'Your email address',
            },
            {
              displayName: localized('Phone Number'),
              type: 'text',
              editable: true,
              regex: regexForPhoneNumber,
              key: 'phone',
              placeholder: 'Your phone number',
            },
          ],
        },
      ],
    },
    userSettingsFields: {
      sections: [
        {
          title: localized('SECURITY'),
          fields: [
            {
              displayName: localized('Allow Push Notifications'),
              type: 'switch',
              editable: true,
              key: 'push_notifications_enabled',
              value: true,
            },
            {
              ...(Platform.OS === 'ios'
                ? {
                    displayName: localized('Enable Face ID / Touch ID'),
                    type: 'switch',
                    editable: true,
                    key: 'face_id_enabled',
                    value: false,
                  }
                : {}),
            },
          ],
        },
        {
          title: localized('PUSH NOTIFICATIONS'),
          fields: [
            {
              displayName: localized('Order updates'),
              type: 'switch',
              editable: true,
              key: 'order_updates',
              value: false,
            },
            {
              displayName: localized('New arrivals'),
              type: 'switch',
              editable: false,
              key: 'new_arrivals',
              value: false,
            },
            {
              displayName: localized('Promotions'),
              type: 'switch',
              editable: false,
              key: 'promotions',
              value: false,
            },
          ],
        },
        {
          title: localized('ACCOUNT'),
          fields: [
            {
              displayName: localized('Save'),
              type: 'button',
              key: 'savebutton',
            },
          ],
        },
      ],
    },
    contactUsFields: {
      sections: [
        {
          title: localized('CONTACTO'),
          fields: [
            {
              displayName: localized('Address'),
              type: 'text',
              editable: false,
              key: 'contacus',
              value: '142 Steiner Street, San Francisco, CA, 94115',
            },
            {
              displayName: localized('E-mail us'),
              value: 'florian@instamobile.io',
              type: 'text',
              editable: false,
              key: 'email',
              placeholder: 'Your email address',
            },
          ],
        },
        {
          title: '',
          fields: [
            {
              displayName: localized('Call Us'),
              type: 'button',
              key: 'savebutton',
            },
          ],
        },
      ],
    },
    contactUsPhoneNumber: '+16504859694',
    APIs: {
      firebase: 'firebase',
    },
    API_TO_USE: 'firebase', // "firebase", "wooCommerce", "shopify",
    serverSideEnv: {
      API: {
        baseURL: 'https://yastaconsumidor-2602d2b61ea4.herokuapp.com/', //your copied heroku link
        timeout: 15000,
      },
    },
    stripeConfig: {
      PUBLISHABLE_KEY:
        'pk_live_51ROuaLBCZoMKnAmD5CpNAQzSiy3KCv6OKjUZEz1MbmudDskoGOj97GDtjEoHZH5kULeocpNxXRfpeMtjzSppvPUo00zLKcx8v0', // "pk_test_..." in test mode and ""pk_live_..."" in live mode
      MERCHANT_ID: 'merchant.io.yasta',
      ANDROID_PAYMENT_MODE: 'production', // test || production
    },
    GOOGLE_SIGNIN_CONFIG: {
      SCOPES: ['https://www.googleapis.com/auth/drive.photos.readonly'],
      WEB_CLIENT_ID:
        '706061484183-l0l58dds4kg329fh1trbiha1ci5rqm5n.apps.googleusercontent.com', // from google-services.json file
      OFFLINE_ACCESS: true,
    },
    FIREBASE_COLLECTIONS: {
      USERS: 'users',
      PAYMENT_METHODS: 'payment_methods',
      STRIPE_CUSTOMERS: 'stripe_customers',
      CATEGORIES: 'vendor_categories',
      CHARGES: 'charges',
      ORDERS: 'restaurant_orders',
      SOURCES: 'sources',
      PRODUCTS: 'vendor_products',
      SHIPPING_METHODS: 'shipping_methods',
    },
  }

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  )
}

export const useConfig = () => useContext(ConfigContext)
