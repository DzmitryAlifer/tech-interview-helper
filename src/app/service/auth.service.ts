import {Injectable} from '@angular/core';
import {GoogleAuthProvider} from 'firebase/auth';
import firebase from 'firebase/compat/app';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {merge, Observable, Subject} from 'rxjs';
import {updateSettings} from '../settings-panel/state/settings.actions';
import {getUserSettings} from './firebase';
import {Settings} from '../settings-panel/state/settings.reducers';


export default interface User {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  emailVerified: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly userSubject$ = new Subject<firebase.User | null>();
  readonly authenticatedUser$: Observable<firebase.User | null> = 
      merge(this.fireAuth.authState, this.userSubject$);
  
  constructor(
    private readonly fireAuth: AngularFireAuth,
    private readonly firestore: AngularFirestore,
    private readonly router: Router,
    private readonly store: Store,
  ) {
    this.authenticatedUser$.subscribe(user => {
      localStorage.setItem('user', user ? JSON.stringify(user) : 'null');
      
      getUserSettings().then(settings => {
        this.store.dispatch(updateSettings(settings ?? {} as Settings));
        localStorage.setItem('settings', JSON.stringify(settings));
      });
    });
  }

  signIn(email: string, password: string) {
    return this.fireAuth
        .signInWithEmailAndPassword(email, password)
        .then(result => {
          this.setUserData(result.user);
        })
        .catch(error => {
          window.alert(error.message);
        });
  }

  signUp(email: string, password: string) {
    return this.fireAuth
        .createUserWithEmailAndPassword(email, password)
        .then(result => {
          this.sendVerificationMail();
          this.setUserData(result.user);
        })
        .catch(error => {
          window.alert(error.message);
        });
  }

  sendVerificationMail() {
    return this.fireAuth.currentUser
        .then((user: any) => user.sendEmailVerification())
        .then(() => {
          this.router.navigate(['verify-email-address']);
        });
  }

  forgotPassword(passwordResetEmail: string) {
    return this.fireAuth
        .sendPasswordResetEmail(passwordResetEmail)
        .then(() => {
          window.alert('Password reset email sent, check your inbox.');
        })
        .catch(error => {
          window.alert(error);
        });
  }

  googleAuth(): Promise<any> {
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider())
        .then(({user}) => {
          this.setUserData(user);
          this.userSubject$.next(user);
          return user;
        })
        .catch((error) => {
          window.alert(error);
        });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {merge: true});
  }

  signOut() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.userSubject$.next(null);
    });
  }
}