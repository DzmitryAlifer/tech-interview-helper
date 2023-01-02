import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {
  DocumentReference,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  Firestore,
  query,
  writeBatch,
} from 'firebase/firestore';
import {EMPTY, from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DictionaryAnswer} from 'src/types';
import {Settings} from '../settings-panel/state/settings.reducers';


export interface User {
  uid?: string;
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
}

const config = {
  apiKey: 'AIzaSyBxfkwcHwkojE_-lTJpSU0YHqVyxFJmr9s',
  authDomain: 'tech-interview-helper.firebaseapp.com',
  projectId: 'tech-interview-helper',
  storageBucket: 'tech-interview-helper.appspot.com',
  messagingSenderId: '228304227676',
  appId: '1:228304227676:web:085e2ebaf9aa8547b5c599',
  measurementId: 'G-M4891K4VB7',
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

export async function saveDictionaryAnswer(dictionaryAnswer: DictionaryAnswer): Promise<void|null> {
  if (!authentication.currentUser?.uid) return null;

  const documentRef = doc(
    database,
    `users/${authentication.currentUser.uid}`,
    `tech/${dictionaryAnswer.tech}`,
    `topic/${dictionaryAnswer.topic}`,
  );
  
  return setDoc(documentRef, dictionaryAnswer);
}

export async function saveDictionaryAnswers(
  tech: string,
  enabledTopicsMap: Partial<{[x: string]: boolean | null}>,
  dictionaryAnswers: DictionaryAnswer[]): Promise<void|null> {
  if (!authentication.currentUser?.uid) return null;

  const batch = writeBatch(database);

  Object.entries(enabledTopicsMap).forEach(([topic, isEnabled]) => {
    const dictionaryAnswerRef = doc(
      database,
      `users/${authentication.currentUser!.uid}`,
      `tech/${tech}`,
      `topic/${topic}`,
    );

    batch.update(dictionaryAnswerRef, {isEnabled});
  });

  dictionaryAnswers.filter(({isMarkedForDelete}) => !!isMarkedForDelete)
    .forEach(({tech, topic}) => {
      const dictionaryAnswerRef = doc(
        database,
        `users/${authentication.currentUser!.uid}`,
        `tech/${tech}`,
        `topic/${topic}`,
      );

      batch.delete(dictionaryAnswerRef);
    });

  return batch.commit();
}

export function getUserDictionaryAnswers(): Observable<DictionaryAnswer[]> {
  const storedUser = localStorage.getItem('user');
  const userId = !!storedUser && storedUser !== 'null' ? 
      (JSON.parse(storedUser) as User).uid : 
      authentication.currentUser?.uid;

  if (!userId) return EMPTY;

  const collectionRef = collectionGroup(database, 'topic');
  const queryRef = query(collectionRef);
  const result = getDocs(queryRef);
  
  return from(result).pipe(
    map(snapshot => snapshot.docs.map(doc => doc.data()))) as Observable<DictionaryAnswer[]>;
}