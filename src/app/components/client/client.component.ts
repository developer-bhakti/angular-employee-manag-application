import { ClientService } from './../../services/client.service';
import { Component,inject,OnInit } from '@angular/core';
import { Client } from '../../../model/class/client';
import { FormsModule } from '@angular/forms';
import { APIResponseModel } from '../../../model/interface/role';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit{

  clientObj: Client = new Client();
  clientList: Client[]= [];

  ClientService = inject(ClientService);

  ngOnInit(): void {
    this.loadClient();
  }

  loadClient(){
    this.ClientService.getAllClients().subscribe((res:APIResponseModel)=>{
      this.clientList = res.data;
    })

  }

  onSaveClient(){
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
