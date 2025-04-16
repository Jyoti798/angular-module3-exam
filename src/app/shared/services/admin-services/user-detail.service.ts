import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ManageService } from 'src/app/auth/services/manage.service';
import { USER_URL } from '../../contants/firebaseEnv';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  private userId: string | undefined;
  
  constructor(private http: HttpClient, private manageService: ManageService) {
    this.userId = this.manageService.getUserId();
  }

  getUserDetails(): Observable<any> {
   

    return this.http.get<any>(`${USER_URL}/${this.userId}.json`);
  }

  updateUser(id: string, user: any) {
    return this.http.put(`${USER_URL}/${id}.json`, user);
  }

}
