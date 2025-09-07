import { firebase } from '@react-native-firebase/firestore'


import fauth from '@react-native-firebase/auth'
import ffirestore from '@react-native-firebase/firestore'
import ffunctions from '@react-native-firebase/functions'

export const db = ffirestore()
export const auth = fauth
export const firestore = ffirestore
export const functions = ffunctions
export const uploadMediaFunctionURL =
  'https://us-central1-development-69cdc.cloudfunctions.net/uploadMedia'


const firebaseConfig = {
  apiKey: "AIzaSyDSxS_S2HhlXZQ3R3nj85M_SQWuma3iSG4",
  authDomain: "yasta-bfd20.firebaseapp.com",
  projectId: "yasta-bfd20",
  storageBucket: "yasta-bfd20.appspot.com",
  messagingSenderId: "589084856582",
  appId: "1:589084856582:web:8304f1934de833a4a08e87",
  measurementId: "G-DYPHXB6QBN"
  };





export { firebase }

