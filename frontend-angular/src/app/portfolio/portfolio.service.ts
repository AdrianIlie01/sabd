import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {Portfolio} from "./portfolio";
import {AbstractControl, AsyncValidatorFn} from "@angular/forms";
import {Customer} from "../customer/customer";

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
    return (control: AbstractControl) => {
      return this.findByTitle(control.value)
        .pipe(
          map((data) => {
            return data.length > 0 ? {'validateTitle': 'This title is not available'} : {};
          })
        );
    }
  }

  validateTitleUpdate(id: string): AsyncValidatorFn  {
    return (control: AbstractControl) => {
      let portfolio: Portfolio[] = [];
      let validTitle: boolean = true;

      this.find(id).subscribe((data: Portfolio[]) => {
        portfolio = data;
      });
      return this.findByTitle(control.value)
        .pipe(
          map((data) => {
            data.map((searchPortfolio: Portfolio) => {
              portfolio.map((portfolio:Portfolio) => {
                if (!(searchPortfolio.title === portfolio.title)) {
                  console.log('another portfolio has this title');
                  validTitle = false;
                } else {
                  validTitle = true;
                }
              })
              return !validTitle ? {'validateTitle': 'This title is not available'} : {};
            })
            console.log(validTitle);
            return !validTitle ? {'validateTitle': 'This title is not available'} : {};
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
