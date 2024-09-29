import { APIResponseModel, IDesignation } from './../../../model/interface/role';
import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-designation',
  standalone: true,
  imports: [],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css'
})
export class DesignationComponent implements OnInit{
  isLoader: boolean = true;
  designationList: IDesignation [] = [];

  masterService = inject(MasterService);

  ngOnInit(): void {
      this.masterService.getDesignations().subscribe((result:APIResponseModel)=>{
       this.designationList = result.data;
       this.isLoader = false;
      },error=>{
        alert("API error / Network Down")
        this.isLoader = false;
      }
      )
  }
}


