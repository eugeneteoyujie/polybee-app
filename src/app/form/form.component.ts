import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { _getOptionScrollPosition } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';

export interface DialogData {
  name : string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  options: string[];
  
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private http : HttpClient) {
      data.name = "";
      http.get('assets/citylist.txt',{responseType:'text'}).subscribe(data=> {
        this.options = data.split("\n");
      })
    };
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(this.data.name))
      );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
