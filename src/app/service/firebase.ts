import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {
  DocumentReference,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  Firestore,
  query,
  where,
  DocumentData,
} from 'firebase/firestore';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { DictionaryAnswer, Tech } from 'src/types';
import {Settings} from '../settings-panel/state/settings.reducers';


export interface User {
  uid?: string;
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
}

const config = {
  apiKey: "AIzaSyBxfkwcHwkojE_-lTJpSU0YHqVyxFJmr9s",
  authDomain: "tech-interview-helper.firebaseapp.com",
  projectId: "tech-interview-helper",
  storageBucket: "tech-interview-helper.appspot.com",
  messagingSenderId: "228304227676",
  appId: "1:228304227676:web:085e2ebaf9aa8547b5c599",
  measurementId: "G-M4891K4VB7"
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

export function saveUserSettings(settings: Partial<Settings>): void {
  if (!authentication.currentUser?.uid) return;
  
  const documentRef = doc(database, 'settings', authentication.currentUser.uid);
  
  setDoc(documentRef, settings).then(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  });
}

export function saveDictionaryAnswer(dictionaryAnswer: DictionaryAnswer): Promise<void> {
  const documentRef = doc(database, `tech/${dictionaryAnswer.tech}`, `topic/${dictionaryAnswer.topic}`);
  return setDoc(documentRef, dictionaryAnswer);
}

export function getDictionaryAnswers(): Observable<DictionaryAnswer[]> {
  const collectionRef = collectionGroup(database, 'topic');
  const queryRef = query(collectionRef);
  const result = getDocs(queryRef);
  
  return from(result).pipe(
    map(snapshot => snapshot.docs.map(doc => doc.data()))) as Observable<DictionaryAnswer[]>;
}