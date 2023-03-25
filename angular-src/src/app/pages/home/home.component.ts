import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { UserRestService } from 'src/app/providers/backend/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { findIndex } from 'lodash';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	todoListTable: Object[] = [];
	dataSource = new MatTableDataSource(this.todoListTable);
	displayedColumns: string[] = ['task', 'status', 'action'];

	form: FormGroup;

	constructor(private fb: FormBuilder, private todoRestSrv: UserRestService, private _snackBar: MatSnackBar) { }

	ngOnInit() {

		this.form = this.fb.group({
			name: ['', Validators.required]
		});

		this.getAllTasks();
	}

	getAllTasks() {
		this.todoRestSrv.getTaskList().subscribe(d => {
			this.todoListTable = d.data;
			this.dataSource.data = this.todoListTable;
		}, e => {
			console.log(e);
		});
	}

	create() {
		this._snackBar.open("Task Added", "OK", {
			duration: 3000,
		});
	}

	markComplete(id: any) {
		this.todoRestSrv.updateTask(id).subscribe(d => {
			const idx = findIndex(this.todoListTable, o => o.id === d.data.id);
			// console.log(idx);
			// console.log(this.todoListTable);
			this.todoListTable[idx]['status'] = 'DONE';
			this.dataSource.data = this.todoListTable;
		}, e => {
			console.log(e);
		});
	}

	onSubmit() {
		const name = this.form.get('name').value;

		this.todoRestSrv.createTask({ name }).subscribe(d => {
			this.todoListTable.push(d.data);
			this.dataSource.data = this.todoListTable;
			this._snackBar.open("Task Added Successfully", "OK", {
				duration: 3000,
			});
		}, e => {
			this._snackBar.open("Wrong Username or password", "OK", {
				duration: 3000,
			});
		});
	}

}
