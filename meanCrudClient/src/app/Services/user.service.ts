import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../Interfaces/user';
import { APIResponse } from '../Interfaces/APIResponse';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  private ENDPOINT = "http://localhost:3000/api/v1"+"/users"
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]>{
    return this.http.get<APIResponse<User[]>>(this.ENDPOINT).pipe(
      map((response)=> response.data)
    );
  }
  createUser(data: Partial<User>): Observable<User>{
    return this.http.post<APIResponse<User>>(this.ENDPOINT, data).pipe(
      map((response)=> response.data)
    );
  }



  getUserById(id:string){
    return this.http.get<APIResponse<User>>(this.ENDPOINT+"/"+id).pipe(
      map((response)=> response.data)
    );
  }

  deleteUser(id:string){
    return this.http.delete<APIResponse<User>>(this.ENDPOINT+"/"+id).pipe(
      map((response)=> response.data)
    );
  }

  updateUser(id:string, changes:Partial<User>){
    return this.http.patch<APIResponse<User>>(this.ENDPOINT+"/"+id, changes).pipe(
      map((response)=> response.data)
    );
  }
}
