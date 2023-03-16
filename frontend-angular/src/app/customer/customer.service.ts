import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Customer} from "./customer";
import {Portfolio} from "../portfolio/portfolio";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiURL = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {

    return this.httpClient.get(this.apiURL + '/customer/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(customer: Customer): Observable<any> {

    return this.httpClient.post(this.apiURL + '/customer/', JSON.stringify(customer), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(id:string): Observable<any> {

    return this.httpClient.get(this.apiURL + '/customer/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  update(id:string, customer:Customer) {

    return this.httpClient.patch(this.apiURL + '/customer/' + id, JSON.stringify(customer), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  delete(id:string){

    return this.httpClient.delete(this.apiURL + '/customer/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addWork(id: string, portfolio: Portfolio){

    return this.httpClient.post(this.apiURL + '/customer/addWork/' + id, JSON.stringify(portfolio), this.httpOptions)
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
