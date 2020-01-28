import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  themeColor: {}
  router: any;
  constructor(
    private route: Router,
  ) { 
    this.router = route.url;
  }

  ngOnInit() {
  }

}
