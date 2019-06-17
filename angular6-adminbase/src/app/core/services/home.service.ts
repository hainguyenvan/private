// import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Rx';

// @Injectable()
// export class HomeService {

//   constructor(private http: Http) {
//     // this.token = localStorage.getItem(Config.TOKEN_KEY);
//   }

//   getTopDesign(body): Observable<any> {
//     return this.http.post(Config.API_GET_TOP_DESIGN_FOR_HOME_PAGE, body)
//       .map((res: Response) => {
//         let json = res.json();
//         return json;
//       })
//       .catch((error: any) => Observable.throw(error || 'Server error'));
//   }

//   getCountDataForHomePage(): Observable<any> {
//     return this.http.post(Config.API_GET_COUNT_DATA_FOR_HOME_PAGE, {})
//       .map((res: Response) => {
//         let json = res.json();
//         return json;
//       })
//       .catch((error: any) => Observable.throw(error || 'Server error'));
//   }

//   getDesignRequest(body): Observable<any> {
//     return this.http.post(Config.API_GET_DESIGN_REQUEST_FOR_HOME_PAGE, body)
//       .map((res: Response) => {
//         let json = res.json();
//         return json;
//       })
//       .catch((error: any) => Observable.throw(error || 'Server error'));
//   }

//   getTopEngineer(body): Observable<any> {
//     return this.http.post(Config.API_GET_TOP_ENGINEER_FOR_HOME_PAGE, body)
//       .map((res: Response) => {
//         let json = res.json();
//         return json;
//       })
//       .catch((error: any) => Observable.throw(error || 'Server error'));
//   }
// }