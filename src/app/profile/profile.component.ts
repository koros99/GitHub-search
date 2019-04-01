import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile-class/profile';
//import { Http } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ProfileRequestService } from '../profile-http/profile-request.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [ProfileRequestService],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileRequestService: ProfileRequestService;
  profile: Profile;
  username: "";

  constructor(profileRequestService: ProfileRequestService, private http: HttpClient, private router: Router) {
    this.profile = new Profile("","","","","","","","");
  }

  profileLookUp(){
    this.profileRequestService.newProfile(this.username);
    console.log(this.username);
    this.profileRequestService.getProfile();
    this.profile = this.profileRequestService.profile;
  }
  // getProfile(){
  //   interface ApiResponse{
  //     login: string;
  //     name: string;
  //     bio: any;
  //     public_repos: number;
  //     followers: number;
  //     following: number;
  //     avatar_url: any;
  //     html_url:any;
  //   }
  //   let promise = new Promise((resolve,reject)=>{
  //     this.http.get<ApiResponse>(environment.apiUrl + this.username + "?access_token" + environment.access_token).toPromise().then(response=>{
  //       this.profile.avatar = response.avatar_url
  //       this.profile.username = response.login
  //       this.profile.name = response.name
  //       this.profile.bio = response.bio
  //       this.profile.repos = response.public_repos
  //       this.profile.followers = response.followers
  //       this.profile.following = response.following
  //       this.profile.link = response.html_url
  //
  //       resolve();
  //     },
  //     error=>{
  //       this.profile.avatar = ""
  //       this.profile.username = "koros99"
  //       this.profile.name = "Victor Kilel"
  //       this.profile.bio = "Tech Developer"
  //       this.profile.repos = 19
  //       this.profile.followers = 0
  //       this.profile.following = 1
  //       this.profile.link = "https://github.com/koros99"
  //
  //       reject(error);
  //     })
  //   })
  //   return promise
  // }
  ngOnInit() {
    this.profile.avatar = "https://avatars1.githubusercontent.com/u/47349082?v=4"
    this.profile.username = "koros99"
    this.profile.name = "Victor Kilel"
    this.profile.bio = "Android Developer"
    this.profile.repos = 19
    this.profile.followers = 0
    this.profile.following = 1
    this.profile.link = "https://github.com/koros99"
  }

}
