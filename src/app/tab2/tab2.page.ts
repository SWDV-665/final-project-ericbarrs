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
  constructor(    
    private http: HttpClient
    ) {
    this.http.get('http://localhost:5000/todos/task')
    .subscribe((response:[]) => {
    this.tasks = []
    response.forEach((arr:any)=>{
      this.tasks.push(arr.tasks)})
    console.log(this.tasks)
  });
  }
  
}
