import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {PropositionService} from '../services/proposition.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  name: string;
  email: string;
  phone: string;
  message: string;
  proposition: any;
  myForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private toast: MatSnackBar,
              private propositionService: PropositionService,
              private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.myForm = this.formBuilder.group({
      name: [this.name, Validators.required],
      email: [this.email, Validators.required],
      phone: [this.phone, Validators.required],
      message: [this.message, Validators.required]
    });
  }

  sendMessage() {
    // this.proposition = {
    //   name: this.name,
    //   email: this.email,
    //   phone: this.phone,
    //   message: this.message
    // };
    console.log(this.myForm.value);
    this.propositionService.addProposition(this.myForm.value)
      .then(this.onAddPropSuccess.bind(this), this.onFailure.bind(this));
  }

  private onAddPropSuccess() {
    this.router.navigate(['/']);
    this.toast.open('Dodano propozycję pomyślnie', '', {panelClass: 'toast-success'});
  }

  private onFailure(error) {
    this.toast.open(error.message, '', {panelClass: 'toast-error'});
  }

}
