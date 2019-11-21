import { AuthService } from './auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { error } from 'util';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  loginForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onResetForm() {
    this.loginForm.reset();
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    const credentials = this.loginForm.value;
    if (this.isLoginMode) {

    } else {
      this.authService.signUp(credentials.email, credentials.password).subscribe(
        responseData => {
          console.log(responseData);
        },
        error => {
          console.log(error);

        });
    }
    this.onResetForm();
  }

}
