import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class ManageService {
private USER_TOKEN='USER_DATA';
private userSubject=new BehaviorSubject<User|undefined>(this.getUserFromLocal());

getUser():User|undefined{
return this.userSubject.value;
}
getUserSubject():Observable<User|undefined>{
  return this.userSubject.asObservable();
}
getUserId():string|undefined{
  return this.userSubject.value?.id;
}
getUserFromLocal():User|undefined{
const data=localStorage.getItem(this.USER_TOKEN);
return data?JSON.parse(data):undefined;
}


  setUserInLocal(user:User){
    this.userSubject.next(user);
    localStorage.setItem(this.USER_TOKEN,JSON.stringify(user));
  }

  logout(){
    this.userSubject.next(undefined);
    localStorage.removeItem(this.USER_TOKEN);
  }
}
