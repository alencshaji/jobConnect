import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {




  constructor(private http: HttpClient) { }


  baseUrl: any = "http://localhost:5004/"

  search = new BehaviorSubject("")
  searchState = new BehaviorSubject("")
  //admin login
  adminLogin(uname: any, psw: any) {
    const bodyData = { uname, psw };
    return this.http.post(`${this.baseUrl}admin/login`, bodyData)
  }
  userData(){
    return this.http.get(`${this.baseUrl}admin/userData`)
  }
  companyData(){
    return this.http.get(`${this.baseUrl}admin/companyData`)
  }
  userLogin(email: any, psw: any) {
    const bodyData = { email, psw };
    return this.http.post(`${this.baseUrl}user/login`, bodyData)
  }
  userRegister(fname: any, lname: any, username: any, email: any, psw: any,
    location: any, category: any, state: any, dob: any,
    gender: any, cod: any, ph: any) {
    const bodyData = {
      fname, lname, username, email, psw, location, category,
      state, dob, gender, cod, ph
    }
    return this.http.post(`${this.baseUrl}user/register`, bodyData)
  }
  companyRegister(cname: any, email: any, psw: any) {
    const bodyData = { cname, email, psw };
    return this.http.post(`${this.baseUrl}company/register`, bodyData)
  }
  companyLogin(email: any, psw: any) {
    const bodyData = { email, psw };
    return this.http.post(`${this.baseUrl}company/login`, bodyData)
  }
  jobPost(body: any) {
    return this.http.post(`${this.baseUrl}company/job/post`, body)
  }
  allJObs() {
    return this.http.get(`${this.baseUrl}job/alljob`)
  }
  getOneJob(id: any) {
    return this.http.get(`${this.baseUrl}company/getJobDetails/` + id)
  }
  editJobs(id: any, body: any) {
    return this.http.put(`${this.baseUrl}company/job/edit/` + id, body)
  }

  //delete
  deleteJob(id: any) {
    return this.http.delete(`${this.baseUrl}company/delete/job/` + id)
  }
  deleteSavedJob(id: any) {
    return this.http.delete(`${this.baseUrl}user/delete/job/` + id)
  }
  deleteSavedAllJob(id: any) {
    return this.http.delete(`${this.baseUrl}user/delete/job/all/` + id)
  }
  deleteCompany(cid:any){
    return this.http.delete(`${this.baseUrl}admin/delete/company/`+cid)
  }
  deleteUser(uid:any){
    return this.http.delete(`${this.baseUrl}admin/delete/user/`+uid)
  }

  //
  applyJob(body:any) {
  console.log(body);
    return this.http.post(`${this.baseUrl}user/apply/job`,body)
  }
  appliedJob(uid:any){
    return this.http.get(`${this.baseUrl}user/applied/job/`+uid)
  }
  savedJobs(uid: any, jid: any) {
    return this.http.post(`${this.baseUrl}user/saved/job/${uid}/${jid}`,{});
  }
  savedJobList(uid:any){
    return this.http.get(`${this.baseUrl}user/saved/job/list/`+uid)
  }
  viewApplicants(cid:any){
    return this.http.get(`${this.baseUrl}company/getapplicantDetails/`+cid)
  }
  statusChanger(cid:any,uid:any,jid:any,body:any){
    return this.http.put(`${this.baseUrl}company/application/status/${cid}/${uid}/${jid}`,body)
  }

}
