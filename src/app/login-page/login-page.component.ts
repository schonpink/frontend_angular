import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";

import {Subscription} from "rxjs";

import {ActivatedRoute, Router} from "@angular/router";
import {MaterialServices} from "../shared/classes/material.services";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form!: FormGroup
  aSub!: Subscription

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })

    this.route.queryParams.subscribe(
      (params) => {
        if (params['registered']) {
          MaterialServices.toast('Now you can log in using your credentials')

        } else if (params['accessDenied']) {
          MaterialServices.toast('Please, sign in')

        }
      }
    )

  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()

    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      error => {
        MaterialServices.toast('User with this email not found or wrong password');
        this.form.enable()
      }
    )
  }

}
