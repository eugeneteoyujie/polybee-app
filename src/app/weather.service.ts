import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { WeatherResult } from './city/city.component';

@Injectable()
export class WeatherService{

    baseUrl = "api.openweathermap.org/data/2.5/weather?q=";
    apiKey = "5dd8ba0ce8c2ad20cf59054c316ac762";
    result:string;
    constructor(private http: HttpClient){}
    
    getWeather(city:string):Observable<WeatherResult>{
        return this.http.get<any>("http://api.openweathermap.org/data/2.5/weather?q=Suwayr&appid=5dd8ba0ce8c2ad20cf59054c316ac762");
    }
        
}