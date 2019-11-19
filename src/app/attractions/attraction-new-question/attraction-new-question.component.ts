import {Component, OnInit, ViewChild} from '@angular/core';
import {AttractionQuestionFormComponent} from '../attraction-question-form/attraction-question-form.component';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {ProposedTaskService} from '../../core/services/proposed-task.service';
import {ProposedTask} from '../../models/proposed-task';
import {TaskService} from '../../core/services/task.service';

@Component({
  selector: 'app-attraction-new-question',
  templateUrl: './attraction-new-question.component.html',
  styleUrls: ['./attraction-new-question.component.scss']
})
export class AttractionNewQuestionComponent implements OnInit {

  @ViewChild(`attractionForm`, {static: false}) attractionForm: AttractionQuestionFormComponent;
  attraction = JSON.parse(sessionStorage.getItem('currentAttr'));
  searchText;
  propositions: ProposedTask[];
  constructor(private toast: MatSnackBar,
              private proposedTaskService: ProposedTaskService,
              private taskService: TaskService) { }

  ngOnInit() {
    this.loadPropositions();
  }

  private loadPropositions() {
    this.proposedTaskService.getProposedTaskByAttr(this.attraction.key)
      .subscribe(val => {
          this.propositions = val;
          console.log(this.propositions);
          console.log(this.attraction.key);
      });
  }

  createTask(prop: ProposedTask) {
    this.taskService.addTask(prop)
      .then(this.onAddTaskSuccess.bind(this), this.onFailure.bind(this));
    this.proposedTaskService.removeProposedTask(prop.key);
  }

  removeProposition(prop: ProposedTask) {
    this.proposedTaskService.removeProposedTask(prop.key)
      .then(this.onRemoveTaskSuccess.bind(this), this.onFailure.bind(this));
  }

  private onAddTaskSuccess() {
    this.toast.open('Dodano zadanie do atrakcji pomyślnie', '', {panelClass: 'toast-success'});
  }

  private onRemoveTaskSuccess() {
    this.toast.open('Usunięto propozycję zadania do atrakcji pomyślnie', '', {panelClass: 'toast-success'});
  }

  private onFailure(error) {
    this.toast.open(error.message, '', {panelClass: 'toast-error'});
  }

}
