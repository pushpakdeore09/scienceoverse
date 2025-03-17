import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { GoogleUserInfo } from '../../models/googleuserinfo.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare var google: any;

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements AfterViewInit {
  password: string = '';
  hashedPassword: string | null = null;
  username: string = '';
  fusername: string = '';
  lusername: string = '';
  email: string = '';
  SignupMessageSuccess: boolean = false;
  SignupMessageInvalid: boolean = false;
  type: string = '';
  selectedtype: string = '';
  client_id: string = '';

  @ViewChild('fusernameInput') fusernameInput!: ElementRef;
  @ViewChild('lusernameInput') lusernameInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  @Output() signupcloseClicked = new EventEmitter<void>();

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  close() {
    document.getElementById('signup-modal-container')?.classList.remove('show');
  }

  closeSignup() {
    this.signupcloseClicked.emit();
  }

  ngAfterViewInit() {
    this.loadGoogleScript();
    this.handleLinkedInRedirect();
  }

  loadGoogleScript() {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.initGoogleSignIn();
    };
    document.head.appendChild(script);
  }

  initGoogleSignIn() {
    google.accounts.id.initialize({
      client_id:
        '',
      callback: this.handleCredentialResponse.bind(this),
    });
  }

  signInWithGoogle() {
    google.accounts.id.prompt();
  }

  handleCredentialResponse(response: any) {
    try {
      if (response && response.credential) {
        const userInfo = jwtDecode<GoogleUserInfo>(response.credential);
        console.log(userInfo);
        this.fusername = userInfo.given_name;
        this.lusername = userInfo.family_name;
        this.email = userInfo.email;
      } else {
        console.error('Google Sign-In failed. Response:', response);
      }
    } catch (error) {
      console.error('Error handling Google sign-in response:', error);
    }
  }

  signinWithLinkedin() {
    const params = {
      response_type: 'code',
      client_id: this.client_id,
      redirect_uri: 'http://localhost:4200/signup', 
      scope: 'r_liteprofile r_emailaddress',
    };
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=${params.response_type}&client_id=${params.client_id}&redirect_uri=${params.redirect_uri}&scope=${params.scope}`;
  }

  handleLinkedInRedirect() {
    this.route.queryParams.subscribe((params) => {
      const code = params['code'];
      if (code) {
        console.log('Authorization Code:', code);
      
        this.exchangeCodeForToken(code);
      }
    });
  }

  
  exchangeCodeForToken(code: string) {
    const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';
    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('code', code);
    body.set('redirect_uri', 'http://localhost:4200/signup'); 
    body.set('client_id', this.client_id);
    body.set('client_secret', 'WPL_AP1.EpGl8II17kuIcieG.6EKiWA=='); 

    this.http
      .post(tokenUrl, body.toString(), {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
      .subscribe(
        (response: any) => {
          console.log('LinkedIn Access Token Response:', response);
          const accessToken = response.access_token;
          this.getLinkedInUserProfile(accessToken);
        },
        (error) => {
          console.error('Error exchanging code for token:', error);
        }
      );
  }

  // Fetch LinkedIn user profile after receiving the access token
  getLinkedInUserProfile(accessToken: string) {
    const profileUrl = 'https://api.linkedin.com/v2/userinfo';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    this.http.get(profileUrl, { headers }).subscribe(
      (profile: any) => {
        console.log('LinkedIn Profile:', profile);
        this.fusername = profile.localizedFirstName;
        this.lusername = profile.localizedLastName;
        this.email = profile.emailAddress || 'Email not available';
      },
      (error) => {
        console.error('Error fetching LinkedIn profile:', error);
      }
    );
  }

  onSelectType(event: Event) {
    this.selectedtype = (event.target as HTMLSelectElement).value;
  }

  Submit() {
    
  }
}
