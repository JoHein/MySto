import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { ArticleModel } from '../article/acticle.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ArticleService {

  constructor(private http: HttpClient) { }

  private urlAllArticleUser = 'http://localhost:8081/getListArticle';
  private urlSaveArticle = 'http://localhost:8081/saveArticle';


listAllArticleUser(emailuser): Observable<any> {
  console.log(emailuser);
  return this.http.get( this.urlAllArticleUser, {params: new HttpParams().set('email', emailuser) })
    .pipe(
      catchError( this.handleError<any>('listAllArticleUser'))
    );
}

saveArticle(emailuser: string, article: ArticleModel): Observable<any> {
  return this.http.post( this.urlSaveArticle, {'emailuser': emailuser, 'article': article }, httpOptions )
  .pipe(
    tap(() => console.log(`added article w/ id=${article.title}`)),
    catchError(this.handleError<any>('saveArticle'))
  );
}

deleteArticle(article: ArticleModel): Observable<any> {
  console.log('url delete article :: ', article);
  const url = `${this.urlAllArticleUser}/${article._id}`;
  return this.http.delete(url, httpOptions)
  .pipe(
    tap(() => console.log(`delete article w/ id=${article._id}`)),
    catchError(this.handleError<any>('deleteArticle'))
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
