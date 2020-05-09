import { FormComponent } from './../form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './../weather.service';
import { Component, OnInit } from '@angular/core';
import { ConvertPropertyBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent{
  title: string;
  text: string;
  service: WeatherService;
  weatherResult : WeatherResult
  pictureUrl : string;
  clock_tick : number;

  constructor(service: WeatherService,private dialog:MatDialog) {
    this.service = service;
  }
  showWeather(){
    this.service.getWeather(this.title).subscribe(res => {
      this.weatherResult = res;
      this.text = String(this.weatherResult["main"]["temp"] - 273.15);
      this.text += "\xB0C"
      this.pictureUrl = "lightning-bolt.png";
      this.clock_tick = Date.now();
    });
  };

  openDialog() :void{
    const dialogRef = this.dialog.open(FormComponent, {
      width: '250px',
      data: {name : this.title}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.title = result;
    });
  }

}
  

export interface WeatherResult{
  coord : CoordResult,
  weather : Weather[],
  base : string,
  main : MainResult,
  visibility : number,
  wind : WindResult,
  clouds : CloudResult,
  dt : number,
  sys : SysResult
  timezone : number,
  id : number,
  name : string,
  cod : number
}
export interface CoordResult{
  lon : number,
  lat : number
}
export interface Weather{
  id : number,
  main : string,
  description : string,
  icon : string
}
export interface MainResult{
  temp : number,
  feels_like : number,
  temp_min : number,
  temp_max : number,
  pressure : number,
  humidity : number
}
export interface WindResult{
  speed : number,
  deg : number
}
export interface CloudResult{
  all : number
}
export interface SysResult{
  type : number,
  id : number,
  country : string,
  sunrise : number,
  sunset : number
}