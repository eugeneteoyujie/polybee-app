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
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  service: WeatherService;
  weatherResult : WeatherResult
  pictureUrl : string;
  clock_tick : number;
  myInterval : any;
  clicked : boolean = false;

  constructor(service: WeatherService,private dialog:MatDialog) {
    this.service = service;
  }
  showWeather(city:string){
    this.clicked = false;
    clearInterval(this.myInterval);
    this.service.getWeather(city).subscribe(res => {
      this.myInterval = setInterval(()=>{this.showWeather(city);},10000);
      this.title = city;
      this.weatherResult = res;
      this.text1 = "Current Temperature:"+(this.weatherResult["main"]["temp"]- 273.15).toFixed(2) + "\xB0C";
      this.text2 = "Humidity: "+ String(this.weatherResult["main"]["humidity"]) + "%";
      this.text3 = "Description: " + this.weatherResult["weather"][0]["description"];
      this.text4 = "Wind Speed: " +(this.weatherResult['wind']['speed'])
      this.pictureUrl = this.weatherResult["weather"][0]["main"] +".png";
      this.clock_tick = Date.now();
      localStorage.setItem(city,JSON.stringify(this.weatherResult));
    },
    error => {
      if (error.status==0)
      {
        clearInterval(this.myInterval);
        this.weatherResult = JSON.parse(localStorage.getItem(city));
        if (this.weatherResult==null)
        {
          this.title = "Sorry";
          this.text1 = "There are no offline results for this city";
        }
        else
        {
          this.text1 = "Current Temperature:"+(this.weatherResult["main"]["temp"]- 273.15).toFixed(2) + "\xB0C";
          this.text2 = "Humidity: "+ String(this.weatherResult["main"]["humidity"]) + "%";
          this.text3 = "Description: " + this.weatherResult["weather"][0]["description"];
          this.text4 = "Wind Speed: " +(this.weatherResult['wind']['speed'])
          this.pictureUrl = this.weatherResult["weather"][0]["main"] +".png";
          this.title += " - Offline Results"
        }
      }
      else
      {
        this.title = "Error, No such city";
        this.text1 = "";
        this.text2 = "";
        this.text3 = "";
        this.text4 = "";
        this.pictureUrl = "";
      }
    });
  };
  openDialog() :void{
    const dialogRef = this.dialog.open(FormComponent, {
      width: '250px',
      data: {name : this.title}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        this.showWeather(result);
      }
    });
  }
  click(){
    if (!this.title)
    {
      this.clicked = true;
    }
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