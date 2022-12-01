import { DocumentData } from '@angular/fire/compat/firestore';
import {initializeApp} from 'firebase/app';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import {
  DocumentReference,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  Firestore,
} from 'firebase/firestore';

export interface User {
  uid?: string;
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
}

export interface Settings {
  userUid: string;
  enabledTechs: string[];
}

const config = {
  apiKey: 'AIzaSyBxfkwcHwkojE_-lTJpSU0YHqVyxFJmr9s',
  authDomain: 'tech-interview-helper.firebaseapp.com',
  projectId: 'tech-interview-helper',
  storageBucket: 'tech-interview-helper.appspot.com',
  messagingSenderId: '228304227676',
  appId: '1:228304227676:web:fb3bbc2fcd70d2a9b5c599',
  measurementId: 'G-40ZBRQZNTP',
};

const app = initializeApp(config);
const provider = new GoogleAuthProvider();
const database: Firestore = getFirestore(app);
const authentication = getAuth(app);

export async function signInWithGoogle() {
  const { user } = await signInWithPopup(authentication, provider);
  const documentReference = doc(database, 'users', user.uid);
  const snapshot = await getDoc(documentReference);
  
  if (!snapshot.exists()) {
    await registerUser(documentReference);
  }
}

export async function signOut() {
  await authentication.signOut();
}

export async function registerUser(reference: DocumentReference) {
  const { currentUser } = authentication;
  if (!currentUser) return;
  const { displayName, photoURL, email } = currentUser;
  const data: User = {
    displayName: displayName || '',
    photoURL: photoURL || '',
    email: email || '',
  };
  await setDoc(reference, data);
}

export async function getCurrentUserSettings() {
  const { currentUser } = authentication;
  if (!currentUser) return;
  const documentReference = doc(database, 'settings', currentUser?.uid ?? '');
  const snapshot = await getDoc<DocumentData>(documentReference);

  if (snapshot.exists()) {
    console.log("Document data:", snapshot.data());
  } else {
    console.log("No such document!");
  }
  return snapshot;
}