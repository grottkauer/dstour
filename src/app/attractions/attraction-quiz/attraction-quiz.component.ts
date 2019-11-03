import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attraction-quiz',
  templateUrl: './attraction-quiz.component.html',
  styleUrls: ['./attraction-quiz.component.scss']
})
export class AttractionQuizComponent implements OnInit {

  i = 0;
  heroes = [
    { id: 11, q: 'Mr. Nice', o1: 'India', o2: 'ss' },
    { id: 12, q: 'Mr. dvsa', o1: 'dd', o2: 'ss'},
    { id: 13, q: 'sca. Nice', o1: 'cs', o2: 'sccs'},
    { id: 14, q: 'Mr. hcgj', o1: 'Indjfia', o2: 'ss'},
    { id: 15, q: 'Mr. Nice', o1: 'fjwe', o2: 'ss'},
    { id: 16, q: 'Mr. vdas', o1: 'd', o2: 'ss'},
    { id: 17, q: 'Mr. Nice', o1: 'jf', o2: 'ss'}
  ];
  quizlength = this.heroes.length;

  constructor() { }

  ngOnInit() {
  }

  next() {
    ++this.i;
    // this.question = this.selectedlanques[this.i].question;
    // this.option = this.selectedlanques[this.i].anslistobj;
  }
  previous() {
    --this.i;
    // this.question = this.selectedlanques[this.i].question;
    // this.option = this.selectedlanques[this.i].anslistobj;
  }

  generatemark() {
    // for (var i = 0; i < this.answerkey.length; i++) {
    //   if (this.answerkey[i].choosen == this.quizlist[i].answer) this.marks++;
    // }
    // alert("your score is "+JSON.stringify(this.marks));
    // document.writeln("your score is " + this.marks);
  }

}
