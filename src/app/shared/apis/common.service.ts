import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  baseApiUrl = environment.appConstants.baseApiUrl
  bearerToken = localStorage.getItem('access_token');
  constructor(private http: HttpClient) { }

  //api for user login
  userLogin(reqObj: any): Observable<any> {
    return this.http.post(this.baseApiUrl + "/api/user/userLogin", reqObj)
      .pipe(catchError(this.handleError));
  }

  //api for user registration
  userRegistration(reqObj: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.baseApiUrl + "/api/user/registerUser", reqObj, {
      headers: headers,
    }).pipe(catchError(this.handleError));
  }

  //api for create new chat
  callAiModel(reqObj: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`,
    });
    return this.http.post(this.baseApiUrl + "/api/model/callModel", reqObj, {
      headers: headers,
    }).pipe(catchError(this.handleError));
  }

  getAllChatHistoryByTitleId(reqObj: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`,
    });
    return this.http.post(this.baseApiUrl + "/api/model/getAllChatHistoryByTitleId", reqObj, {
      headers: headers,
    }).pipe(catchError(this.handleError));
  }

  getAllTitleByUserId(reqObj: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`,
    });
    return this.http.post(this.baseApiUrl + "/api/model/getAllTitleByUserId", reqObj, {
      headers: headers,
    }).pipe(catchError(this.handleError));
  }

  addUpdateChatHistory(reqObj: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`,
    });
    return this.http.post(this.baseApiUrl + "/api/model/addUpdateChatHistory", reqObj, {
      headers: headers,
    }).pipe(catchError(this.handleError));
  }


  getAllLogsByDateRange(reqObj: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`,
    });
    return this.http.post(this.baseApiUrl + "/api/model/getAllLogsByDateRange", reqObj, {
      headers: headers,
    }).pipe(catchError(this.handleError));
  }


  deleteChatHistoryByTitleId(reqObj: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`,
    });
    return this.http.delete(this.baseApiUrl + "/api/model/deleteChatHistoryByTitleId", {
      headers: headers,
      body: reqObj, // Move reqObj inside the options object
    }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(error);
  }
}
