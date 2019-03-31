import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../profile-class/profile';
import { environment } from '../../environments/environment';

@Injectable()
export class ProfileRequestService {
  profile: Profile;

  constructor(private http:HttpClient) {
    this.profile = new Profile ("", "", "", "", "", "", "")
  }

  username: string = "";

  getProfile(){
  	// return this.http.get("https://api.github.com/users/" + this.username + "?client_id=" + this.clientid + "&client_secret=" + this.clientsecret)
  	// .map(res => res.json());
    interface ApiResponse{
      login: string;
      name: string;
      bio: any;
      public_repos: number;
      followers: number;
      following: number;
      avatar_url: any;
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

        resolve();
      },
      error=>{
        this.profile.avatar = ""
        this.profile.username = "koros99"
        this.profile.name = "Victor Kilel"
        this.profile.bio = ""
        this.profile.repos = ""
        this.profile.followers = ""
        this.profile.following = ""

        reject(error);
      })
    })

    return promise;
  }

}
