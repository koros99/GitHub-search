import { Component, OnInit } from '@angular/core';
import {Repos} from '../repos-class/repos';
import {ProfileRequestService} from '../profile-http/profile-request.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit {

  searchRepos:Repos[];
  searchName:string;
  error:boolean;

  constructor(public profileRequest:ProfileRequestService) {
    this.searchRepos=[];
   }

  ngOnInit() {
  }

  getRepo(){
    this.searchRepos=[];
    this.profileRequest.getProfileRepos(this.searchName).then(()=>{
      this.searchRepos=this.profileRequest.searchedRepos;
      this.error=false;
      if(this.searchRepos.length<1){
        this.error=true;
      }

    }).catch(error=>{
      this.error=true;
    })
  }

}
