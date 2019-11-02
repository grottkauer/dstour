import {Component, OnInit, ViewChild} from '@angular/core';
import {ProfileTripQuickFormComponent} from '../profile-trip-quick-form/profile-trip-quick-form.component';
import {ProfileRatedAttrFormComponent} from '../profile-rated-attr-form/profile-rated-attr-form.component';

@Component({
  selector: 'app-profile-rated-attr-edit',
  templateUrl: './profile-rated-attr-edit.component.html',
  styleUrls: ['./profile-rated-attr-edit.component.scss']
})
export class ProfileRatedAttrEditComponent implements OnInit {

  @ViewChild(`rateForm`, {static: false}) tripForm: ProfileRatedAttrFormComponent;

  constructor() { }

  ngOnInit() {
  }

  editRate() {
    // this.attractionsService.addAttraction(this.attractionForm.form.value)
    //   .then(this.onCreatingSuccess.bind(this), this.onCreatingFailure.bind(this));
  }

}
