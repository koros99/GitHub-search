import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../profile-class/profile';
import { Repos } from '../repos-class/repos';
import { environment } from '../../environments/environment';

interface ReposInterface {
  total_count: number;
  incomplete_results: boolean;
  items: Repo[];
}

interface Repo {
  name: string;
  html_url: string;
  forks: number;
  description: string;
  stars_number: number;
  language: string;
  //full_name: string;
}
@Injectable()
export class ProfileRequestService {
  access_token: string = environment.access_token;
  profileUrl: string = environment.apiUrl;
  reposUrl: string = environment.reposUrl;

  profile: Profile;
  profileRepos: Repos[];
  searchedRepos: Repos[];

  constructor(private http: HttpClient) {
    this.profileRepos = [];
    this.searchedRepos = [];

  }


  getProfile(username: string) {
    interface ApiResponse {
      avatar_url: any;
      login: string;
      name: string;
      bio: any;
      public_repos: number;
      followers: number;
      following: number;
      html_url: any;
    }
    let promise = new Promise((resolve, reject) => {
      let accessUrl = this.profileUrl + username + "?access_token=" + this.access_token;
      this.http.get<ApiResponse>(accessUrl).toPromise().then(response => {
        this.profile = new Profile(
          response.avatar_url,
          response.login,
          response.name,
          response.bio,
          response.public_repos,
          response.followers,
          response.following,
          response.html_url
        )
        resolve();
      },
        error => {
          reject(error);
        })
    })

    return promise;
  }
  getProfileRepos(username: string) {
    let promise = new Promise((resolve, reject) => {
      let profileReposUrl = this.profileUrl + username + "/repos?access_token=" + this.access_token;
      this.http.get<Repo[]>(profileReposUrl).toPromise().then(response => {
        this.profileRepos = [];
        if (response.length > 0) {
          for (var i = 0; i < response.length; i++) {
            this.profileRepos.push(
              new Repos(
                response[i].name,
                response[i].html_url,
                response[i].forks,
                response[i].description,
                response[i].stars_number,
                response[i].language
              )
            )
          }
        }
        resolve()
      },
        error => {
          this.profileRepos = [];
          reject()
        }
      )
    })
    return promise;

  }

  searchRepos(query: string) {
    let promise = new Promise((resolve, reject) => {
      let searchReposUrl = this.reposUrl + query + "&access_token=" + this.access_token;
      this.http.get<ReposInterface>(searchReposUrl).toPromise().then(response => {
        this.searchedRepos = [];
        if (response.total_count > 0) {
          for (var i = 0; i < response.items.length; i++) {
            this.searchedRepos.push(
              new Repos(
                response.items[i].name,
                response.items[i].html_url,
                response.items[i].forks,
                response.items[i].description,
                response.items[i].stars_number,
                response.items[i].language,
              )
            )
          }
        }
        resolve()
      }, error => {
        this.searchedRepos = [];
        reject()
      }
      )
    })
    return promise;
  }
}
