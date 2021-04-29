import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  title = "Todo App"
  tasks = []
  path = 'https://swdv-finalserver.herokuapp.com'
  constructor(    
    private http: HttpClient
    ) {
    this.http.get(`${this.path}/todos/task`)
    .subscribe((response:[]) => {
    this.tasks = []
    response.forEach((arr:any)=>{
      this.tasks.push(arr.tasks)})
    console.log(this.tasks)
  });
  }
  
}
