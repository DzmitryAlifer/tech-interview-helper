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
  query,
  where,
} from 'firebase/firestore';
import { Tech } from 'src/types';

export interface User {
  uid?: string;
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
}

export interface Settings {
  userUid?: string;
  enabledTechs: Tech[];
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
const database: Firestore = getFirestore(app);
const authentication = getAuth(app);

export async function signOut() {
  await authentication.signOut();
}

export async function registerUser(reference: DocumentReference) {
  if (!authentication.currentUser) return;

  await setDoc(reference, {
    displayName: authentication.currentUser.displayName ?? '',
    photoURL: authentication.currentUser.photoURL ?? '',
    email: authentication.currentUser.email ?? '',
  });
}

export async function getUserSettings(): Promise<Settings|null> {
  if (!authentication.currentUser?.uid) return null;

  const reference = doc(database, 'settings', authentication.currentUser.uid);
  const snapshot = await getDoc(reference);

  return snapshot.exists() ? snapshot.data() as Settings : null;
}

export function saveUserSettings(settings: Settings) {
  if (!authentication.currentUser?.uid) return;
  
  const documentRef = doc(database, 'settings', authentication.currentUser.uid);
  
  setDoc(documentRef, settings).then(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  });
}