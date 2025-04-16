import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ManageService } from 'src/app/auth/services/manage.service';
import { CART_URL, INVENTORY_URL, ORDER_URL, userurl } from '../../contants/firebaseEnv';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private userId:string|undefined;
  constructor(private http:HttpClient,
    private manageServices:ManageService
  ){}

  placeOrder(order:any){
return this.http.post(`${ORDER_URL}.json`,order);
  }
FetchAllOrder():Observable<any[]>{
  return this.http.get(`${ORDER_URL}.json`).pipe(
    map((response: any) => {
      if (!response) return [];
      return Object.keys(response).map((key) => ({
        ...response[key],
        id: key,
        
      }));
    })
  );
}
  getUserDetails():Observable<any[]>{
return this.http.get<any>(`${userurl}/${this.userId}.json`);
  }
  updateUser(id:string,user:any){
    return this.http.put(`${userurl}/${id}}.json`,user);
  }

  fetchInventory():Observable<any[]>{
   return this.http.get(`${INVENTORY_URL}.json`).pipe(
       map((response: any) => {
         if (!response) return [];
         return Object.keys(response).map((key) => ({
           id: key,
           ...response[key],
         }));
       })
     );
  }

  loadCartItems():Observable<any[]>{
    return this.http.get(`${CART_URL}/${this.userId}.json`)
    .pipe(map((response:any)=>{
      if(!response) return [];
      return Object.keys(response).map((key) => ({
        ...response[key],
        id: key,
       
      }));
  })
);
  }


  updateCartItem(id:string,item:any){
return this.http.put(`${CART_URL}/${this.userId}/${id}.json`,item);
  }

  addItemToCart(item:any){
return this.http.post(`${CART_URL}/${this.userId}.json`,item);
  }
  deleteCartItem(id:string){
    return this.http.delete(`${CART_URL}/${this.userId}/${id}.json`);
  }
}
