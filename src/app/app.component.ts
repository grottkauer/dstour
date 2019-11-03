import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ds-tour';

  onClick(): void {
    // $element.nativeElement.scrollIntoView({behavior: 'smooth'});
    // window.scroll(0, 0);
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

  constructor(private swUpdate: SwUpdate) { }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('Istnieje nowa wersja aplikacji. Załadować ją?')) {
          window.location.reload();
        }
      });
    }
  }
}
