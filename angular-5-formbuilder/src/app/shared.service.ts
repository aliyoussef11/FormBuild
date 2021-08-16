import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIurl = "https://localhost:44305/api";

  constructor(public http: HttpClient) { }

  getFormsList():Observable<any[]>{
    return this.http.get<any>(this.APIurl+'/forms');
  }

  addForm(val : any){
    return this.http.post(this.APIurl+'/forms', val);
  }

  updateForm(val : any){
    return this.http.put(this.APIurl+'/forms', val);
  }

  deleteForm(val : any){
    return this.http.delete(this.APIurl+'/forms/'+val);
  }

  getUsersList():Observable<any[]>{
    return this.http.get<any>(this.APIurl+'/Users');
  }

  getGroupsList():Observable<any[]>{
    return this.http.get<any>(this.APIurl+'/Groups');
  }

  SendAttributesData(val : any){
    return localStorage.setItem('attributes', val);
  }

  GetAttributesData(){
    return JSON.parse(localStorage.getItem('attributes'));
  }

  RemoveF(fieldName)
  {
    return localStorage.setItem('field', fieldName);
  }

  GetField(){
    return localStorage.getItem('field');
  }

  ClearStorage(){
    localStorage.clear();
  }
}
