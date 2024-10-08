import { ClientService } from './../../services/client.service';
import { Component,inject,OnInit } from '@angular/core';
import { Client } from '../../../model/class/client';
import { FormsModule } from '@angular/forms';
import { APIResponseModel } from '../../../model/interface/role';
import { AsyncPipe, DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AlertComponent } from "../../reusableComponent/alert/alert.component";
import { MyButtonComponent } from "../../reusableComponent/my-button/my-button.component";

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, DatePipe, JsonPipe, AsyncPipe, AlertComponent, MyButtonComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit{

  currentDate:Date = new Date();

  clientObj: Client = new Client();
  clientList: Client[]= [];

  ClientService = inject(ClientService);

  userList$ : Observable<any> = new Observable<any>;

  ngOnInit(): void {
    this.loadClient();
    this.userList$ = this.ClientService.getAllUser();
  }

  loadClient(){
    this.ClientService.getAllClients().subscribe((res:APIResponseModel)=>{
      this.clientList = res.data;
    })

  }

  onSaveClient(data: string){
    debugger;
    this.ClientService.addUpdate(this.clientObj).subscribe((res:APIResponseModel)=>{
      if(res.result){
        alert("client created success");
        this.loadClient();
        this.clientObj = new Client();
      } else{
        alert(res.message)
      }
    })
  }

  onEdit(data:Client){
    this.clientObj = data;
  }

  onDelete(id:number){
    const isDelte = confirm("Are you sure you want to delete");
     if(isDelte){
      this.ClientService.deleteClientById(id).subscribe((res:APIResponseModel)=>{
        if(res.result){
          alert("client delete success");
          this.loadClient();
        } else{
          alert(res.message)
        }
      })

     }

  }
}
