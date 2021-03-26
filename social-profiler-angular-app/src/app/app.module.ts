import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule  } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FacebookModule } from 'ngx-facebook';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';


var firebaseConfig = {
  apiKey: "AIzaSyCv8QCwKBR8YAT0YmwrhZ7pgbaPzmwExyw",
  authDomain: "social-profiler-angular-app.firebaseapp.com",
  projectId: "social-profiler-angular-app",
  storageBucket: "social-profiler-angular-app.appspot.com",
  messagingSenderId: "709418153167",
  appId: "1:709418153167:web:c8dcab4c4744d6e5e333ba",
  measurementId: "G-MMYKELM6P1"
};

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    HeaderComponent,
    SignupComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    FacebookModule.forRoot(),
    SocialLoginModule,
    NgxTwitterTimelineModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
