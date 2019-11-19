import { Component, OnInit } from '@angular/core';
import {ProposedGuideService} from '../../core/services/proposed-guide.service';
import {MatSnackBar} from '@angular/material';
import {UserService} from '../../core/services/user.service';
import {ProposedGuide} from '../../models/proposed-guide';
import {Observable} from 'rxjs';
import {Favorite} from '../../models/favorite';
import {User} from '../../models/user';

@Component({
  selector: 'app-profile-new-guides',
  templateUrl: './profile-new-guides.component.html',
  styleUrls: ['./profile-new-guides.component.scss']
})
export class ProfileNewGuidesComponent implements OnInit {

  searchText;
  user = JSON.parse(sessionStorage.getItem('currentUser'));
  props: Observable<ProposedGuide[]>;
  constructor(private proposedGuides: ProposedGuideService,
              private toast: MatSnackBar,
              private userService: UserService) { }

  ngOnInit() {
    this.props = this.proposedGuides.getProposedGuides();
  }

  setPropGuide(prop: ProposedGuide) {
    let currentUser: User;
    this.userService.getUser(prop.userRef).subscribe(value => {
      currentUser = value;
      currentUser.role = 'Przewodnik';
      console.log(currentUser);
      this.userService.editUser(currentUser.key, currentUser)
        .then(this.onCreateSuccess.bind(this), this.onFailure.bind(this));
    });
  }

  removePropGuide(prop: ProposedGuide) {
    this.proposedGuides.removeProposedGuide(prop.key)
      .then(this.onRemoveSuccess.bind(this), this.onFailure.bind(this));
  }

  private onCreateSuccess() {
    this.toast.open('Ustawiono nową rolę pomyślnie', '', {panelClass: 'toast-success'});
  }

  private onRemoveSuccess() {
    this.toast.open('Usunięto propozycję pomyślnie', '', {panelClass: 'toast-success'});
  }

  private onFailure(error) {
    this.toast.open(error.message, '', {panelClass: 'toast-error'});
  }

}
