import {Component} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface ValueGroup {
  value: string;
  viewDisplay: string;
}

interface Group {
  disabled?: boolean;
  name: string;
  group: ValueGroup[];
}

/** @title Select with option groups */
@Component({
  selector: 'select-box',
  templateUrl: 'select-box.component.html',
  styleUrls: ['select-box.component.scss']
})
export class SelectBoxComponent {
  isMultiple = true;
  label= 'Choose one for Halte';
  patternRegex = "^\\S.+$";
  selectBoxGroups: Group[] = [
    {
      name: 'Grass',
      group: [
        {value: 'bulbasaur-0', viewDisplay: 'Bulbasaur'},
        {value: 'oddish-1', viewDisplay: 'Oddish'},
        {value: 'bellsprout-2', viewDisplay: 'Bellsprout'},
      ],
    },
    {
      name: 'Water',
      group: [
        {value: 'squirtle-3', viewDisplay: 'Squirtle'},
        {value: 'psyduck-4', viewDisplay: 'Psyduck'},
        {value: 'horsea-5', viewDisplay: 'Horsea'},
      ],
    },
    {
      name: 'Fire',
      disabled: true,
      group: [
        {value: 'charmander-6', viewDisplay: 'Charmander'},
        {value: 'vulpix-7', viewDisplay: 'Vulpix'},
        {value: 'flareon-8', viewDisplay: 'Flareon'},
      ],
    },
    {
      name: 'Psychic',
      group: [
        {value: 'mew-9', viewDisplay: 'Mew'},
        {value: 'mewtwo-10', viewDisplay: 'Mewtwo'},
      ],
    },
  ];

  selectBoxControl = new FormControl(['valid'], [
    Validators.required,
    Validators.pattern(this.patternRegex)
  ]);

  matcher = new MyErrorStateMatcher();
}
