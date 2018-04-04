/**
 * @author hsky<habxp@163.com>
 * @since 2018-03-29 16:26:06
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { SceneDialog } from './ywtest/scene-dialog';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable()
export class SceneService {

  private apiURL = 'api/sceneDialogs'; // URL to web api

  constructor(private http: HttpClient) {
    console.log(`this is sceneService...`);
  }
  /** GET SceneDialog from the server */
  getSceneDialogs(): Observable < SceneDialog[] > {
    return this.http.get < SceneDialog[] > (this.apiURL)
      .pipe(
        tap(sceneDialogs => console.log('we got scenes from DB', sceneDialogs)),
        catchError(this.handleError('load scenes', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError < T > (operation = 'operation', result ?: T) {
    return (error: any): Observable < T > => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return Observable.of(result as T);
    };
  }
}
