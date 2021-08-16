import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  FormsList : any = [];

  constructor(public service : SharedService) { }

  ngOnInit() {
    this.refreshFormsList();
  }

  refreshFormsList(){
    this.service.getFormsList().subscribe(data=>
      {
        this.FormsList = data
      })
  }

  deleteForm(form){
    if(confirm('Are you sure??')){
      this.service.deleteForm(form.FormID).subscribe(data=>{
        alert(data.toString());
        this.refreshFormsList();
      })
    }
  }

}
