import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CategoryLinkService {
  private apiURL = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {

    return this.httpClient.get(this.apiURL + '/category-links/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(customer: any) {

    return this.httpClient.post(this.apiURL + '/category-links/', JSON.stringify(customer), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(id:string): Observable<any> {

    return this.httpClient.get(this.apiURL + '/category-links/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  // custom async validator for unique name

  update(id:string, customer:any) {

    return this.httpClient.patch(this.apiURL + '/category-links/' + id, JSON.stringify(customer), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  delete(id:string){

    return this.httpClient.delete(this.apiURL + '/category-links/' + id, this.httpOptions)
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
