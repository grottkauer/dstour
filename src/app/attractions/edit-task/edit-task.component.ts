import {Component, OnInit, ViewChild} from '@angular/core';
import {AttractionQuestionFormComponent} from '../attraction-question-form/attraction-question-form.component';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {ProposedTaskService} from '../../core/services/proposed-task.service';
import {TaskService} from '../../core/services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  @ViewChild(`questionForm`, {static: false}) questionForm: AttractionQuestionFormComponent;
  attraction = JSON.parse(sessionStorage.getItem('currentAttr'));
  proposedTask = JSON.parse(sessionStorage.getItem('taskToEdit'));
  constructor(private toast: MatSnackBar,
              private taskService: TaskService,
              private dialogRef: MatDialogRef<EditTaskComponent>,
              private proposedTaskService: ProposedTaskService) { }

  ngOnInit() {
  }

  editTask() {
    this.questionForm.form.value.attrRef = this.attraction.key;
    console.log(this.questionForm.form.value);
    console.log(this.questionForm.form.value.attrRef);

    this.proposedTaskService.editProposedTask(this.proposedTask.key , this.questionForm.form.value)
      .then(this.onAddProposedTaskSuccess.bind(this), this.onFailure.bind(this));
  }

  private onAddProposedTaskSuccess() {
    this.dialogRef.close();
    this.toast.open('Edytowano propozycję zadania do atrakcji pomyślnie', '', {panelClass: 'toast-success'});
  }

  private onFailure(error) {
    this.toast.open(error.message, '', {panelClass: 'toast-error'});
  }

}
