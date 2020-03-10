import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../core/auth/auth.service';
import {UserService} from '../../core/user/user.service';
import {AuthProviderService} from '../../core/auth/auth-provider.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthService,
    private authProviderService: AuthProviderService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      ci: ['', Validators.required],
      name: [''],
      phone: [''],
    });
  }

  onSubmit() {
    // stop here if form is invalid
    if (!this.registerForm.valid) {
           return;
    }

    this.loading = true;
    const payload = this.registerForm.value;
    return this.userService.register(payload)
     .subscribe(
        data => {
          this.authProviderService.pushUser(data);
          this.router.navigate(['home']);
        },
        () => {
          this.loading = false;
        });
  }
}
