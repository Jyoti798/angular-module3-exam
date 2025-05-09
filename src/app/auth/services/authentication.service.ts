import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ManageService } from './manage.service';
import { AuthResponse } from 'src/app/models/authreponse/authresponse';
import { BASE_URL, SIGN_IN_URL, SIGN_UP_URL, USER_ENDPOINT } from 'src/app/shared/contants/firebaseEnv';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user/user';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient,private manageService:ManageService) { }


  registerUser(user:{email:string;password:string;type:string}){
    return this.http.post<AuthResponse>(SIGN_UP_URL,{
      ...user,
     returnSecureToken:true,

    })
    .pipe(switchMap((response)=>this.storeUserData(response,user.type)));
  }
  storeUserData(authResponse:AuthResponse,type:string){
    const userId=authResponse.localId;
    const token=authResponse.idToken;
    return this.http.put<User>(`${BASE_URL}/${USER_ENDPOINT}/${userId}.json?auth=${token}`,
      {
        id:userId,
        name:'',
        email:authResponse.email,
       type:type,
        address:'',
        pincode:'',
        phone:'',
      }
    );
  }

  loginUser(user:{email:string,password:string}){
    return this.http.post<AuthResponse>(SIGN_IN_URL,{
      ...user,
      returnSecureToken:true,
    })
    .pipe(switchMap((response)=>this.fetchUserData(response)));
 
  }

  fetchUserData(authResponse: AuthResponse) {
    const userId = authResponse.localId;
    const token = authResponse.idToken;
  
    return this.http.get<User>(`${BASE_URL}/${USER_ENDPOINT}/${userId}.json?auth=${token}`)
      .pipe(
        tap(user => console.log('Fetched user from DB:', user)), 
        map(user => ({
          ...user,
          token,
          refreshToken: authResponse.refreshToken
        })),
        tap((user: User) => {
          this.manageService.setUserInLocalStorage(user);
        })
      );
  }
  

  logout(){
    this.manageService.logout();

  }
}
