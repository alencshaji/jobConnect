import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  uid:any=''
  cid:any=''

  constructor(private http:HttpClient) { }


  baseUrl:any ="http://localhost:5004/"


  //admin login
  adminLogin(uname: any, psw: any) {
    const bodyData = { uname, psw };
    return this.http.post(`${this.baseUrl}admin/login`, bodyData)
  }
  userLogin(email:any,psw:any){
    const bodyData = {email,psw};
    return this.http.post(`${this.baseUrl}user/login`,bodyData)
  }
  userRegister(fname:any,lname:any,username:any,email:any,psw:any,
    location:any,category:any,state:any,dob:any,
    gender:any,cod:any,ph:any){
    const bodyData ={
      fname,lname,username,email,psw,location,category,
      state,dob,gender,cod,ph
    }
    return this.http.post(`${this.baseUrl}user/register`,bodyData)
  }
  companyRegister(cname:any,email:any,psw:any){
    const bodyData = {cname,email,psw};
    return this.http.post(`${this.baseUrl}company/register`,bodyData)
  }
  companyLogin(email:any,psw:any){
    const bodyData = {email,psw};
    return this.http.post(`${this.baseUrl}company/login`,bodyData)
  }
  jobPost(body:any){
    return this.http.post(`${this.baseUrl}company/job/post`,body)
  }
  allJObs(){
    return this.http.get(`${this.baseUrl}job/alljob`)
  }

}
