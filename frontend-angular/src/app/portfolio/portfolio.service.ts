import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {Portfolio} from "./portfolio";
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiURL = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {

    return this.httpClient.get(this.apiURL + '/portfolio/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(portfolio: Portfolio): Observable<any> {

    return this.httpClient.post(this.apiURL + '/portfolio/', JSON.stringify(portfolio), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(id:string): Observable<any> {

    return this.httpClient.get(this.apiURL + '/portfolio/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  findByTitle(title: string): Observable<any> {

    return this.httpClient.get(this.apiURL + '/portfolio/title/' + title)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  // custom async validator for unique title
  validateTitle():AsyncValidatorFn  {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.findByTitle(control.value)
        .pipe(
          map((data) => {
            return data.length > 0 ? {'validateTitle': 'This title is not available'} : {};
          })
        );
    }
  }

  titleValidUpdate(id: string): AsyncValidatorFn  {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.findByTitle(control.value).pipe(
          map((portfolio: Portfolio[]) => {
            const matchingTitle = portfolio.filter((portfolio: Portfolio) => portfolio.id !== id);
            return matchingTitle.length > 0 ? {'titleValidUpdate': 'This title is not available'} : null;
          })
        );
    }
  }

  update(id:string, portfolio: Portfolio) {

    return this.httpClient.patch(this.apiURL + '/portfolio/' + id, JSON.stringify(portfolio), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  delete(id:string){

    return this.httpClient.delete(this.apiURL + '/portfolio/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  uploadImage(id: string, file: any){

    return this.httpClient.post(this.apiURL + '/portfolio/uploadImage/' + id, file)
      .pipe(
        catchError(this.errorHandler)
      )

  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}
