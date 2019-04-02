import { Component, OnInit } from '@angular/core';
import { ProfileRequestService } from "../profile-http/profile-request.service"
import { Profile } from "../profile-class/profile";
import { Repos } from "../repos-class/repos";
import { Router } from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers:[ProfileRequestService],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Profile;
  profileRepos: Repos[];
  searchName: string;
  error: boolean;

  constructor(private profileRequest: ProfileRequestService, private router: Router) {
    this.profileRepos = [];
    this.profileRequest = profileRequest;
  }

  searchUser() {
    this.profile = null;
    this.profileRepos = [];
    this.profileRequest.getProfile(this.searchName).then(() => {
      this.profile = this.profileRequest.profile
      this.profileRequest.getProfileRepos(this.searchName).then(() => {
        this.profileRepos = this.profileRequest.profileRepos;
        this.error = false
      })
    }).catch(error => {
      this.error = true;
    })
  }

  ngOnInit() {
    this.searchName = "koros99";
    this.searchUser();
    
  }

}
