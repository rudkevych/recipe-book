import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'max-angular';
  selectedPage = 'recipe';

  showPage(pageName: string) {
    this.selectedPage = pageName;
  }
}
