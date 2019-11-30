import { Component, OnInit } from '@angular/core';
import {RatedAttrService} from '../../core/services/rated-attr.service';
import {Router} from '@angular/router';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {Rated} from '../../models/rated';

@Component({
  selector: 'app-profile-rated-remove',
  templateUrl: './profile-rated-remove.component.html',
  styleUrls: ['./profile-rated-remove.component.scss']
})
export class ProfileRatedRemoveComponent implements OnInit {

  rate = JSON.parse(sessionStorage.getItem('attrRate'));

  constructor(private ratedService: RatedAttrService,
              private router: Router,
              private toast: MatSnackBar,
              private dialogRef: MatDialogRef<ProfileRatedRemoveComponent>) { }

  ngOnInit() {
  }

  removeRate() {
    this.ratedService.removeRate(this.rate.key)
      .then(this.onRemoveSuccess.bind(this), this.onFailure.bind(this));
  }

  private onRemoveSuccess() {
    this.dialogRef.close();
    this.toast.open('Usunięto ocenę atrakcji pomyślnie', '', {panelClass: 'toast-success'});
  }

  private onFailure(error) {
    this.toast.open(error.message, '', {panelClass: 'toast-error'});
  }

}
