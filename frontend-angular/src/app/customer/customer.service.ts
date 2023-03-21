import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "./customer";
import {Portfolio} from "../portfolio/portfolio";
import {AbstractControl, AsyncValidatorFn} from "@angular/forms";

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

  create(customer: Customer) {

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

  findByName(name: string): Observable<any> {

    return this.httpClient.get(this.apiURL + '/customer/name/' + name)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  // custom async validator for unique name
  validateName():AsyncValidatorFn  {
    return (control: AbstractControl) => {
      return this.findByName(control.value)
        .pipe(
          map((data) => {
            return data.length > 0 ? {'validateName': 'This name is not available'} : {};
          })
        );
    }
  }

  nameValidUpdate(id: string): AsyncValidatorFn  {
    return (control: AbstractControl) => {
      let customer: Customer[] = [];
      let validName: boolean = true;

      this.find(id).subscribe((data: Customer[]) => {
        customer = data;
      });
      return this.findByName(control.value)
        .pipe(
          map((data) => {
            data.map((searchCustomer: Customer) => {
              customer.map((customer:Customer) => {
                if (!(searchCustomer.id === customer.id)) {
                  console.log('another customer has this name');
                  validName = false;
                } else {
                  validName = true;
                }
              })
            })
            return !validName ? {'validateName': 'This name is not available'} : {};
          })
        );
    }
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
