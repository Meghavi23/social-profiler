import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import firebase from "../../../node_modules/firebase"
import { SocialUser } from '../model/social-user.model';


@Injectable({
  providedIn: 'root'
})
export class SocialAuthService {

  user$: Observable<SocialUser| null | undefined>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          return this.afs.doc<SocialUser>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user : any) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<SocialUser> = this.afs.doc(`users/${user.uid}`);
    console.log(userRef);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    this.router.navigate(["/home"]);
    console.log(userRef.set(data, { merge: true }));
    return userRef.set(data, { merge: true })

  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
    localStorage.removeItem('FB_TOKEN');
    localStorage.removeItem('FB_ID');
    localStorage.removeItem('TWITTER_NAME');
  }
}
