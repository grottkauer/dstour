import { Component } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ds-tour';

  onClick(): void {
    // $element.nativeElement.scrollIntoView({behavior: 'smooth'});
    // window.scroll(0, 0);
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }
}
