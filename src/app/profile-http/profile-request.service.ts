import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../profile-class/profile';
import { environment } from '../../environments/environment';

@Injectable()
export class ProfileRequestService {
  profile: Profile;
  username: string;

  constructor(private http:HttpClient) {
    this.profile = new Profile ("", "", "", "", "", "", "", "")
  }

  newProfile(username: string){
    this.username = username;
  }


  getProfile(){
    interface ApiResponse{
      login: string;
      name: string;
      bio: any;
      public_repos: number;
      followers: number;
      following: number;
      avatar_url: any;
      html_url:any;
    }
    let promise = new Promise((resolve,reject)=>{
      this.http.get<ApiResponse>(environment.apiUrl + this.username + "?access_token" + environment.access_token).toPromise().then(response=>{
        this.profile.avatar = response.avatar_url
        this.profile.username = response.login
        this.profile.name = response.name
        this.profile.bio = response.bio
        this.profile.repos = response.public_repos
        this.profile.followers = response.followers
        this.profile.following = response.following
        this.profile.link = response.html_url

        resolve();
      },
      error=>{
        this.profile.avatar = ""
        this.profile.username = "koros99"
        this.profile.name = "Victor Kilel"
        this.profile.bio = "Tech Developer"
        this.profile.repos = 19
        this.profile.followers = 0
        this.profile.following = 1

        reject(error);
      })
    })

    return promise;
  }

}
