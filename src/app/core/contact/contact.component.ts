import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {PropositionService} from '../services/proposition.service';
import {Router} from '@angular/router';

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
  constructor(private toast: MatSnackBar,
              private propositionService: PropositionService,
              private router: Router) { }

  ngOnInit() {
  }

  sendMessage() {
    this.proposition = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      message: this.message
    };
    console.log(this.proposition);
    this.propositionService.addProposition(this.proposition)
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
