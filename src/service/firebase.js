// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebaseConfig"

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();

const register = async function(email, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

const login = async function(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch(err) {
    switch (err.code) {
      case 'auth/invalid-email': throw new Error('Email không hợp lệ')
      case 'auth/user-not-found': throw new Error('Tài khoản không tìm thấy')
      case 'auth/wrong-password': throw new Error('Mật khẩu không đúng')
      case 'auth/user-disabled': throw new Error('Tài khoản đã bị chặn. Hãy liên hệ admin')
      default:
        throw new Error('Lỗi không xác định')
    }
  }
}

const logout = async function() {
  await signOut(auth)
}

export { register, login, logout }

// https://firebase.google.com/docs/auth/web/start?authuser=0#web-version-9
// https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth