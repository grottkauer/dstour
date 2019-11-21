import { Component, OnInit } from '@angular/core';
import {ProposedGuideService} from '../../core/services/proposed-guide.service';
import {MatSnackBar} from '@angular/material';
import {UserService} from '../../core/services/user.service';
import {ProposedGuide} from '../../models/proposed-guide';
import {Observable} from 'rxjs';
import {Favorite} from '../../models/favorite';
import {User} from '../../models/user';
import {PropositionService} from '../../core/services/proposition.service';
import {Proposition} from '../../models/proposition';

@Component({
  selector: 'app-profile-new-guides',
  templateUrl: './profile-new-guides.component.html',
  styleUrls: ['./profile-new-guides.component.scss']
})
export class ProfileNewGuidesComponent implements OnInit {

  searchText;
  searchText2;
  user = JSON.parse(sessionStorage.getItem('currentUser'));
  props: Observable<ProposedGuide[]>;
  propositions: Observable<Proposition[]>;
  constructor(private proposedGuides: ProposedGuideService,
              private toast: MatSnackBar,
              private userService: UserService,
              private propositionService: PropositionService) { }

  ngOnInit() {
    this.props = this.proposedGuides.getProposedGuides();
    this.propositions = this.propositionService.getPropositions();
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

  removeProposition(prop: Proposition) {
    this.propositionService.removeProposition(prop.key)
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
