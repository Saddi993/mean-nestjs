import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TodoRestService } from 'src/app/providers/backend/todo.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	form: FormGroup;

	constructor(private fb: FormBuilder, private todoRestSrv: TodoRestService, private _snackBar: MatSnackBar, private router: Router) { }

	ngOnInit() {

		this.form = this.fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	onSubmit() {
		const username = this.form.get('username').value;
		const password = this.form.get('password').value;

		this.todoRestSrv.login({ username, password }).subscribe(d => {
			if(d.data.loggedIn) {
				this.router.navigate(['/home']);
			}
		}, e => {
			this._snackBar.open("Wrong Username or password", "OK", {
				duration: 3000,
			});
		});
	}

}
