import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError} from 'rxjs/operators';

@Injectable()
export class PapersService {

  constructor(private http: HttpClient) { }

  private test_url: string = "/assets/testdata/testpapers.json"

  getPapers(): Observable<any>  {
    return this.http.get(`${environment.api_url}` + "/papers")
      .pipe(catchError(this.handleError));
  }

  // getPapers(): Observable<any>  {
  //   return this.http.get(this.test_url)
  //     .pipe(catchError(this.handleError));
  // }

  handleError(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error");
  }

}
