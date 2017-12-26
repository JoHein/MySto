import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { ArticleModel } from '../article/acticle.model';

@Injectable()
export class ArticleService {

  constructor(private http: HttpClient) { }

  private urlAllArticleUser = 'http://localhost:8081/getListArticle';


listAllArticleUser(emailuser): Observable<any> {
  console.log(emailuser);
  return this.http.get( this.urlAllArticleUser, {params: new HttpParams().set('email', emailuser) })
    .pipe(
      catchError( this.handleError<any>('listAllArticleUser'))
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
