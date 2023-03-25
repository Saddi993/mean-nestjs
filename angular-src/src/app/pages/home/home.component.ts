import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatTableDataSource, MatSnackBar, MatChipInputEvent } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { findIndex } from 'lodash';
import { FilmRestService } from 'src/app/providers/backend/film.service';

export interface Actor {
	name: string;
}

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	visible = true;
	selectable = true;
	removable = true;
	addOnBlur = true;
	readonly separatorKeysCodes: number[] = [ENTER, COMMA];
	actors: Actor[] = [];

	filmListTable: Object[] = [];
	dataSource = new MatTableDataSource(this.filmListTable);
	displayedColumns: string[] = ['title', 'director', 'year', 'actor', 'action'];

	form: FormGroup;

	constructor(private fb: FormBuilder, private filmRestSrv: FilmRestService, private _snackBar: MatSnackBar) { }

	ngOnInit() {

		this.form = this.fb.group({
			title: ['', Validators.required],
			director: ['', Validators.required],
			year: ['', Validators.required]
		});

		this.getAllFilms();
	}

	getAllFilms() {
		this.filmRestSrv.getFilms().subscribe(d => {
			this.filmListTable = d.data;
			this.dataSource.data = this.filmListTable;
		}, e => {
			console.log(e);
		});
	}


	add(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

		// Add our actor
		if ((value || '').trim()) {
			this.actors.push({ name: value.trim() });
		}

		// Reset the input value
		if (input) {
			input.value = '';
		}
	}

	remove(actor: Actor): void {
		const index = this.actors.indexOf(actor);

		if (index >= 0) {
			this.actors.splice(index, 1);
		}
	}

	// markComplete(id: any) {
	// 	this.todoRestSrv.updateTask(id).subscribe(d => {
	// 		const idx = findIndex(this.todoListTable, o => o.id === d.data.id);
	// 		// console.log(idx);
	// 		// console.log(this.todoListTable);
	// 		this.todoListTable[idx]['status'] = 'DONE';
	// 		this.dataSource.data = this.todoListTable;
	// 	}, e => {
	// 		console.log(e);
	// 	});
	// }

	onSubmit() {

		if (!this.form.valid) return;

		const title = this.form.get('title').value;
		const director = this.form.get('director').value;
		const year = this.form.get('year').value;

		this.filmRestSrv.addMovie({ title, director, year, actors: this.actors }).subscribe(d => {
			this.filmListTable.push(d.data);
			this.dataSource.data = this.filmListTable;
			this._snackBar.open("Film Added Successfully", "OK", {
				duration: 3000,
			});
		}, e => {
			this._snackBar.open("something went wrong", "OK", {
				duration: 3000,
			});
		});
	}

}
