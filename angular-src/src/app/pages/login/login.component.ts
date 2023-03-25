import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserRestService } from 'src/app/providers/backend/user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	form: FormGroup;

	constructor(private fb: FormBuilder, private todoRestSrv: UserRestService, private _snackBar: MatSnackBar, private router: Router) { }

	ngOnInit() {

		this.form = this.fb.group({
			email: ['', Validators.email],
			password: ['', Validators.required]
		});
	}

	onSubmit() {
		const email = this.form.get('email').value;
		const password = this.form.get('password').value;

		this.todoRestSrv.login({ email, password }).subscribe(d => {
			this.router.navigate(['/home']);
		}, e => {
			this._snackBar.open("Wrong email or password", "OK", {
				duration: 3000,
			});
		});
	}

}
