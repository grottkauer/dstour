import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AttractionQuestionFormComponent} from '../attraction-question-form/attraction-question-form.component';
import {Attraction} from '../../models/attraction';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {ProposedTaskService} from '../../core/services/proposed-task.service';

@Component({
  selector: 'app-attraction-propose-question',
  templateUrl: './attraction-propose-question.component.html',
  styleUrls: ['./attraction-propose-question.component.scss']
})
export class AttractionProposeQuestionComponent implements OnInit {

  @ViewChild(`questionForm`, {static: false}) questionForm: AttractionQuestionFormComponent;
  attraction = JSON.parse(sessionStorage.getItem('currentAttr'));
  constructor(private toast: MatSnackBar,
              private proposedTaskService: ProposedTaskService,
              private dialogRef: MatDialogRef<AttractionProposeQuestionComponent>) { }

  ngOnInit() {
  }

  createProposedTask() {
    this.questionForm.form.value.attrRef = this.attraction.key;
    console.log(this.questionForm.form.value);

    this.proposedTaskService.addProposedTask(this.questionForm.form.value)
      .then(this.onAddProposedTaskSuccess.bind(this), this.onFailure.bind(this));
  }

  private onAddProposedTaskSuccess() {
    this.dialogRef.close();
    this.toast.open('Dodano propozycję zadania do atrakcji pomyślnie', '', {panelClass: 'toast-success'});
  }

  private onFailure(error) {
    this.toast.open(error.message, '', {panelClass: 'toast-error'});
  }

}
