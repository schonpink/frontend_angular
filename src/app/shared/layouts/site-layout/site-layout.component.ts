import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrl: './site-layout.component.css'
})
export class SiteLayoutComponent implements OnInit {

  links = [
    {url: '/overview', name: 'All books'},
    {url: '/categories', name: 'Category'},
    {url: '/transfer', name: 'Transfer book'},
    {url: '/create', name: 'Add book'},
    {url: '/edit', name: 'Edit book'},
    {url: '/delete', name: 'Delete book'},
  ]

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login'])
  }

}
