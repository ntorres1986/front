const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:8080/api/";

import{ AppSettings } from "./app-settings"
import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Customer } from './models/customer';
import { Card } from './models/card';
import { Consume } from './models/consume';
import { Adviser } from './models/adviser';


import { AuthResponse } from './models/authResponse';
import { User } from "./models/user";
 
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  //Login
  onLogin(authResponse): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(AppSettings.API_ENDPOINT + "auth/signin", authResponse, httpOptions).pipe(
      tap((auth: AuthResponse) => console.log(`loggged  w/ id=${authResponse}`)),
      catchError(this.handleError<AuthResponse>('addCustomer'))
    );
  }
  //signUp
  signUp(authResponse): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(AppSettings.API_ENDPOINT + "auth/signup", authResponse, httpOptions).pipe(
        tap((auth: AuthResponse) => console.log(`added  w/ id=${authResponse}`)),
        catchError(this.handleError<AuthResponse>('addCustomer'))
      );
  }
  resetAccount(email: string): Observable<{}> {
    return this.http.get<{}>(AppSettings.API_ENDPOINT+ "auth/resetAccount/"+email).pipe(
      tap(_ => console.log(`fetched  id=${email}`)),
      catchError(this.handleError<{}>(`getConsume email=${email}`))
    );
  }
  validateCredentials(token: string): Observable<{}> {
    return this.http.get<{}>(AppSettings.API_ENDPOINT+ "auth/validateCredentials/"+token).pipe(
      tap(_ => console.log(`fetched  id=${token}`)),
      catchError(this.handleError<{}>(`validate token=${token}`))
    );
  }
  changeCredentials(data): Observable<{}> {
    return this.http.post<{}>(AppSettings.API_ENDPOINT + "auth/changeCredentials", data, httpOptions).pipe(
      tap((auth: {}) => console.log(`error  w/ id=${data}`)),
      catchError(this.handleError<{}>('eror'))
    );
}

  //Customers
  getCustomers (): Observable<Customer[]> {
    return this.http.get<Customer[]>(apiUrl + "customers")
      .pipe(
        tap(customers => console.log('fetched customers')),
        catchError(this.handleError('getCustomers', []))
      );
  }
  
  getCustomer(id: number): Observable<Customer> {
    const url = `${apiUrl}/customers/${id}`;
    return this.http.get<Customer>(url).pipe(
      tap(_ => console.log(`fetched customer id=${id}`)),
      catchError(this.handleError<Customer>(`getCustomer id=${id}`))
    );
  }
  
  addCustomer(customer): Observable<Customer> {
    return this.http.post<Customer>(apiUrl + "customers/add", customer, httpOptions).pipe(
      tap((customer: Customer) => console.log(`added product w/ id=${customer.id}`)),
      catchError(this.handleError<Customer>('addCustomer'))
    );
  }
  
  updateCustomer (id, customer): Observable<any> {
    const url = `${apiUrl}customers/${id}`;
    return this.http.put(url, customer, httpOptions).pipe(
      tap(_ => console.log(`updated customer id=${id}`)),
      catchError(this.handleError<any>('updateCustomer'))
    );
  }
  
  deleteCustomer(id): Observable<Customer> {
    const url = `${apiUrl}customers/${id}`;
  
    return this.http.delete<Customer>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted customer id=${id}`)),
      catchError(this.handleError<Customer>('deleteCustomer'))
    );
  }

  //Cards
  getCards(id): Observable<Card[]> {
    return this.http.get<Card[]>(`${apiUrl}cards/${id}`)
      .pipe(
        tap(cards => console.log('fetched cards')),
        catchError(this.handleError('getCards', []))
      );
  }
  addCard(card): Observable<Card> {
    return this.http.post<Card>(apiUrl + "cards-add", card, httpOptions).pipe(
      tap((customer: Card) => console.log(`added card w/ id=${card.id}`)),
      catchError(this.handleError<Card>('addCard'))
    );
  }

  getCard(id: number): Observable<Card> {
    const url = `${apiUrl}/card/${id}`;
    return this.http.get<Card>(url).pipe(
      tap(_ => console.log(`fetched card id=${id}`)),
      catchError(this.handleError<Card>(`getCard id=${id}`))
    );
  }

  updateCard (id, card): Observable<any> {
    const url = `${apiUrl}card/${id}`;
    return this.http.put(url, card, httpOptions).pipe(
      tap(_ => console.log(`updated card id=${id}`)),
      catchError(this.handleError<any>('updateCard'))
    );
  }
  
  deleteCard(id): Observable<Card> {
    const url = `${apiUrl}card/${id}`;
  
    return this.http.delete<Card>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted card id=${id}`)),
      catchError(this.handleError<Card>('deleteCard'))
    );
  }

  //Consumes
  getConsumes(id): Observable<Consume[]> {
    return this.http.get<Consume[]>(`${apiUrl}consumes/${id}`)
      .pipe(
        tap(consumes => console.log('fetched consumes')),
        catchError(this.handleError('getConsumes', []))
      );
  }
  addConsume(consume): Observable<Consume> {
    return this.http.post<Consume>(apiUrl + "consume/add", consume, httpOptions).pipe(
      tap((consume: Consume) => console.log(`added consume w/ id=${consume.id}`)),
      catchError(this.handleError<Consume>('addconsume'))
    );
  }

  getConsume(id: number): Observable<Consume> {
    const url = `${apiUrl}/consume/${id}`;
    return this.http.get<Consume>(url).pipe(
      tap(_ => console.log(`fetched consume id=${id}`)),
      catchError(this.handleError<Consume>(`getConsume id=${id}`))
    );
  }

  updateConsume (id, consume): Observable<any> {
    const url = `${apiUrl}consume/${id}`;
    return this.http.put(url, consume, httpOptions).pipe(
      tap(_ => console.log(`updated consume id=${id}`)),
      catchError(this.handleError<any>('updateConsume'))
    );
  }
  
  deleteConsume(id): Observable<Consume> {
    const url = `${apiUrl}consume/${id}`;
  
    return this.http.delete<Consume>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted consume id=${id}`)),
      catchError(this.handleError<Consume>('deleteConsume'))
    );
  }

  //Advisers
  getAdvisers(): Observable<Adviser[]> {
    return this.http.get<Adviser[]>(`${apiUrl}advisers`)
      .pipe(
        tap(advisers => console.log('fetched advisers')),
        catchError(this.handleError('getAdvisers', []))
      );
  }
  addAdviser(adviser): Observable<Adviser> {
    return this.http.post<Adviser>(apiUrl + "adviser-add", adviser, httpOptions).pipe(
      tap((adviser: Adviser) => console.log(`added adviser w/ id=${adviser.id}`)),
      catchError(this.handleError<Adviser>('addAviser'))
    );
  }

  getAdviser(id: number): Observable<Adviser> {
    const url = `${apiUrl}adviser/${id}`;
    return this.http.get<Adviser>(url).pipe(
      tap(_ => console.log(`fetched adviser id=${id}`)),
      catchError(this.handleError<Adviser>(`getAdviser id=${id}`))
    );
  }

  updateAdviser(id, adviser): Observable<any> {
    const url = `${apiUrl}adviser/${id}`;
    return this.http.put(url, adviser, httpOptions).pipe(
      tap(_ => console.log(`updated adviser id=${id}`)),
      catchError(this.handleError<any>('updateAdviser'))
    );
  }
  
  deleteAdviser(id): Observable<Adviser> {
    const url = `${apiUrl}adviser/${id}`;
  
    return this.http.delete<Adviser>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted adviser id=${id}`)),
      catchError(this.handleError<Adviser>('deleteAdviser'))
    );
  }
}
