import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = "Todo App"
  path = 'https://swdv-finalserver.herokuapp.com'
  public tasks:any = []

  constructor(
    private http: HttpClient,
    public toastController: ToastController, 
    public alertController: AlertController,
    private camera: Camera
    ) {
      
    this.http.get(`${this.path}/todos/task`)
      .subscribe((response:[]) => {
      this.tasks = response
    });
  }

  async prompted (message:string){
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async postData(obj){
    this.http.post(`${this.path}/todos/task`,{
      ...obj
    })
    .subscribe((response) => {
      this.tasks = [...this.tasks, response]
    });
  }
  async editData(obj:any, index){
      console.log(obj)
      this.http.put(`${this.path}/todos/task/${obj._id}`,{
      ...obj
    })
    .subscribe((response:any) => {
      this.tasks[index] = obj
      this.prompted(obj.name + ` has been ${response.result}.`)
    });
  }

  async deleteData(obj:any, index){
    this.http.delete(`${this.path}/todos/task/${obj._id}`,{
  })
  .subscribe((response:any) => {
    this.tasks.splice(index,1)
    this.prompted(obj.name + ` has been ${response.result}.`)
  });
}

    async editTasks(index){
      let item = this.tasks[index]
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Add Tasks',
        message: 'Add Tasks Item.',
        inputs:[
          {
            name:'Name',
            placeholder:"Tasks Name",
            value: item.name
          },{
            name:"Tasks",
            placeholder:"Tasks Item",
            value: item.tasks
          }
        ],
        buttons:[
          {
          text:"Cancel",
            handler: async () =>{
              this.prompted('Cancelled')
            }
          },
          {
            text:"Save",
              handler: async (newItem) =>{
                let obj ={
                  name:newItem.Name,
                  tasks:newItem.Tasks,
                  _id:item._id
                }
                this.editData(obj, index)
              }
          }]
      });
      await alert.present();
    }

    async deleteTask(index){
      let tasks = this.tasks[index]
      this.deleteData(tasks, index)

    }

  async addTasks(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add Tasks',
      message: 'Add Tasks Item.',
      inputs:[
        
        {
          name:'Name',
          placeholder:"Tasks Name"
        },{
          name:"Tasks",
          placeholder:"Tasks Item"
        }
      ],
      buttons:[
        {
          text:"Picture",
            handler: async () =>{
              this.takePicture()
            }
          },
        {
        text:"Cancel",
          handler: async () =>{
            this.prompted('Cancelled')
          }
        },
        {
          text:"Add",
            handler: async (newItem) =>{

              let obj ={
                name:newItem.Name,
                tasks:newItem.Tasks
              }
              this.postData(obj)
              this.prompted(obj.name + ' has been added.')
            }
        }
      ]
    })
    await alert.present();
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // Do something with the new photo

    }, (err) => {
     // Handle error
     console.log("Camera issue: " + err);
    });
  }

}
