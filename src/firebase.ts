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
} from 'firebase/firestore';


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
const database = getFirestore(app);

export const authentication = getAuth(app);

export async function signInWithGoogle() {
  const { user } = await signInWithPopup(authentication, provider);
  const documentReference = doc(database, FirestoreCollection.USERS, user.uid);
  const snapshot = await getDoc(documentReference);
  if (!snapshot.exists()) {
    await registerUser(documentReference);
  }
}

export async function signOut() {
  await authentication.signOut();
}
