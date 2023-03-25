import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserRestService } from 'src/app/providers/backend/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

	constructor(private fb: FormBuilder, private userRestSrv: UserRestService, private _snackBar: MatSnackBar, private router: Router) { }

	ngOnInit() {

		this.form = this.fb.group({
			email: ['', Validators.email],
			password: ['', Validators.required],
			name: ['', Validators.required],
			age: ['', Validators.required],
			location: ['', Validators.required],
		});
	}

	onSubmit() {
		const email = this.form.get('email').value;
		const password = this.form.get('password').value;
		const name = this.form.get('name').value;
		const age = this.form.get('age').value;
		const location = this.form.get('location').value;

    if (!this.form.valid) return;

		this.userRestSrv.register({ email, password, name, age, location }).subscribe(d => {
			this.router.navigate(['/']);
		}, e => {
			this._snackBar.open("something went wrong", "OK", {
				duration: 3000,
			});
		});
	}

}
