import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError} from 'rxjs/operators';

@Injectable()
export class PapersService {

  constructor(private http: HttpClient) { }

  private test_url: string = "/assets/testdata/testpapers.json"

  getPapers(start: number = 0, end: number = 0): Observable<any>  {

    if (start == 0 && end == 0) {
      var url = `${environment.api_url}/papers`;
    } else {
      var url = `${environment.api_url}/papers?start=${start}&end=${end}`;
    }

    return this.http.get(url)
      .pipe(catchError(this.handleError));
  }

  getPaper(id: number): Observable<any>  {
    var url = `${environment.api_url}/papers/${id}`;

    return this.http.get(url)
      .pipe(catchError(this.handleError));
  }

  getPaperPdf(id: number): Observable<any>  {
    var url = `${environment.api_url}/papers/${id}/pdf`;

    return this.http.get(url, {responseType: 'blob'})
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error");
  }

}
