import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'theme-toggle',
  templateUrl: './themeToggle.component.html',
  styleUrls: ['./themeToggle.component.scss']
})
export class ThemeToggleComponent implements OnInit {

  @Input() isLight: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
