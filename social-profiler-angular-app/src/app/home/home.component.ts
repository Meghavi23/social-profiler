import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {FacebookService, InitParams, LoginOptions, LoginResponse} from 'ngx-facebook';
import { SocialAuthService } from '../service/social-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: string | null | undefined;
  posts: [] = [];
  filtered: [] = [];
  isFb = false;
  isTwitter = false;
  isTwitterSelected = false;
  authForm!: FormGroup;
  isSubmitted!: boolean;
  twitterName: string | null | undefined;
  type:number= 2;

  constructor(
    public auth: SocialAuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private fb: FacebookService
  ) { 
    this.username = localStorage.getItem('USER_NAME');
    const initParams: InitParams = {
      appId: '3359867127422528',
      xfbml: true,
      version: 'v2.8'
    };
    fb.init(initParams);
    this.authForm = this.formBuilder.group({
      twitterName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('USER_NAME');
    this.twitterName = localStorage.getItem('TWITTER_NAME') || null;
    if (localStorage.getItem('FB_TOKEN') !== null) {
      this.isFb = true;
      this.getPosts();
    }
    if (localStorage.getItem('TWITTER_NAME') !== null) {
      this.isTwitter = true;
    }
  }

  loginWithFacebook(): void {
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'user_posts'
    };
    this.fb.login(loginOptions)
      .then((response: LoginResponse) => {
        console.log("fbrespose",response)
        this.isFb = true;
        localStorage.setItem('FB_ID', response.authResponse.userID);
        localStorage.setItem('FB_TOKEN', response.authResponse.accessToken);
        this.getPosts();
      })
      .catch((error: any) => console.error(error));
  }

  getPosts(): void {
    this.fb.api('/me/feed', 'get', { access_token: localStorage.getItem('FB_TOKEN'), fields: 'id,message,picture,shares,name,story' })
      .then((res: any) => {
        this.posts = res.data;
        this.filtered = res.data;
      })
      .catch((error: any) => console.error(error));
  }

  searchFbPosts(e : any): void {
    const search = e.target.value.toLowerCase();
    const filered = this.posts.filter((item: any) => {
      return (item.message !== undefined && item.message.toLowerCase().includes(search))
        || (item.story !== undefined && item.story.toLowerCase().includes(search)
          || (item.name !== undefined && item.name.toLowerCase().includes(search)));
    });
    console.log(filered);
    // @ts-ignore
    this.filtered = filered;
  }
  addTwitterName() {
    this.isTwitterSelected = true;
  }

  addTwitter() {
    this.isSubmitted = true;
    this.isTwitter = true;
    this.isTwitterSelected = false;
    if (this.authForm.invalid) {
      return;
    }
    localStorage.setItem('TWITTER_NAME', this.authForm.value.twitterName);
    this.twitterName = this.authForm.value.twitterName;
  }
  changeFeed(type : number) {
    this.type = type;
  }
}
