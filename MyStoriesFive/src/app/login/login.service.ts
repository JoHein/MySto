import { ReturnStatement } from '@angular/compiler/public_api';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginModel } from './login.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class LoginService {

  private authenticatedUrl = '/authenticated';
  private loginInfo = '/login';

  constructor(private http: HttpClient) { }

  isAuthenticated(): Observable<any> {
    return this.http.get<any>( this.authenticatedUrl )
    .pipe(
      catchError( this.handleError<any>('isAuthenticated'))
    );

  }


  loginUser(loginModel: LoginModel): Observable<any> {
    return this.http.post<any>(this.loginInfo, {loginModel})
    .pipe(
      catchError( this.handleError<any>('loginUser') )
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error, '${error.message}') ; // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}


