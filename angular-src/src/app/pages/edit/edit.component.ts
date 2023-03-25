import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BackEndService } from 'src/app/providers/backend/backend.service';
import { FilmRestService } from 'src/app/providers/backend/film.service';

export interface Actor {
	name: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent implements OnInit {

  filmForm: FormGroup;
  filmId: string;
  errorMessage: string;
  actors: Actor[] = [];

  visible = true;
	selectable = true;
	removable = true;
	addOnBlur = true;
	readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private fb: FormBuilder, private filmRestSrv: FilmRestService, private _snackBar: MatSnackBar,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log('asd')
    this.filmForm = this.fb.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
    });

    this.route.params.subscribe(params => {
      this.filmId = params.id;
      this.filmRestSrv.getFilmById(this.filmId).subscribe(film => {
        this.filmForm.patchValue(film.data);
        this.actors = film.data.actors;
      });
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

  onSubmit() {

		if (!this.filmForm.valid) return;

		const title = this.filmForm.get('title').value;
		const director = this.filmForm.get('director').value;
		const year = this.filmForm.get('year').value;

		this.filmRestSrv.updateFilmByID(this.filmId, { title, director, year, actors: this.actors }).subscribe(d => {
			
			this._snackBar.open("Film Updated Successfully", "OK", {
				duration: 3000,
			});
		}, e => {
			this._snackBar.open("something went wrong", "OK", {
				duration: 3000,
			});
		});
	}
}
