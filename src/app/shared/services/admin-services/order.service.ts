import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ManageService } from 'src/app/auth/services/manage.service';
import { ORDER_URL } from '../../contants/firebaseEnv';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

private userId: string | undefined;
  constructor(private http: HttpClient, private manageService: ManageService) {
    this.userId = this.manageService.getUserId();
  }
fetchOrder():Observable<any[]>{
  return this.http.get<any[]>(`${ORDER_URL}.json`)
  .pipe(map((response:any)=>{
    if(!response) return [];
    return Object.keys(response).map((key) => ({
      ...response[key],
      id: key,
   
    }));
  }));
}

updateOrder(id:string,order:any){
return this.http.put(`${ORDER_URL}/${id}.json`,order);
}


}
