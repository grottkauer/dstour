import {Component, ViewChild} from '@angular/core';
import {AttractionFormComponent} from '../attraction-form/attraction-form.component';
import {AttractionsService} from '../../core/services/attractions.service';
import {MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-new-attraction',
  templateUrl: './new-attraction.component.html',
  styleUrls: ['./new-attraction.component.scss']
})
export class NewAttractionComponent {

  @ViewChild(`attractionForm`, {static: false}) attractionForm: AttractionFormComponent;

  constructor(
    private attractionsService: AttractionsService,
    private toast: MatSnackBar,
    private dialogRef: MatDialogRef<NewAttractionComponent>
  ) { }

  createFlight() {
    this.attractionsService.addAttraction(this.attractionForm.form.value)
      .then(this.onCreatingSuccess.bind(this), this.onCreatingFailure.bind(this));
  }

  private onCreatingSuccess() {
    this.dialogRef.close();
    this.toast.open('Atrakcja dodana pomyślnie', '', { panelClass: 'toast-success'});
  }

  private onCreatingFailure(error) {
    this.toast.open(error.message, '', { panelClass: 'toast-error'});
  }

}
