import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC-rEFMFdpoqkOISHRfVUHtBqofGi0oK-g",
    authDomain: "playlist-b118d.firebaseapp.com",
    projectId: "playlist-b118d",
    storageBucket: "playlist-b118d.appspot.com",
    messagingSenderId: "992513805761",
    appId: "1:992513805761:web:d8aac5913832f5ebe7f340"
};

//初始化数据库
firebase.initializeApp(firebaseConfig)

//初始化服务器
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

//时间戳
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectAuth, projectFirestore, projectStorage, timestamp }