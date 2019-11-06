import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() selectedPageEvent = new EventEmitter<string>();
  collapsed = true;

  constructor() { }

  ngOnInit() {
  }

  onPageSelect(page: string) {
    this.selectedPageEvent.emit(page);
  }

}
