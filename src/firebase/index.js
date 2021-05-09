// Configuração do firebase
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

// Variáveis de ambiente de configuração do firebase
export const firebaseApp = firebase.initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_AP_ID
})

// Criação do plugin do firebase para utilização de forma global
export default function install (Vue) {
  Object.defineProperty(Vue.prototype, '$firebase', {
    get () {
      return firebaseApp
    }
  })
}
