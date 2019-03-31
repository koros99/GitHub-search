import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile-class/profile'
import { HttpClient } from '@angular/common/http';
import { ProfileRequestService } from '../profile-http/profile-request.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileRequestService: ProfileRequestService;
  profile: Profile;
  username: string = "";

  constructor(profileRequestService: ProfileRequestService, private router: Router) {
  }

  ngOnInit() {
    this.profileRequestService.getProfile();
    this.profile = this.profileRequestService.profile;
  }

}
