import { Component, OnInit} from '@angular/core';
import { DndDropEvent,DropEffect} from 'ngx-drag-drop';
import { field, value } from '../global.model';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.css']
})
export class EditAppComponent implements OnInit {

  value:value={
    label:"",
    value:""
  };
  success = false;

  UsersList : any = [];
  GroupsList : any = [];
  Components : any = [];
  divs: number[] = [0];

  fieldModels:Array<field>=[
    {
      "type": "text",
      "icon": "fa-font",
      "label": "Text",
      "description": "Enter your name",
      "placeholder": "Enter your name",
      "className": "form-control",
      "subtype": "text",
      "regex" : "",
      "handle":true
    },
    {
      "type": "email",
      "icon": "fa-envelope",
      "required": true,
      "label": "Email",
      "description": "Enter your email",
      "placeholder": "Enter your email",
      "className": "form-control",
      "subtype": "text",
      "regex" : "^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$",
      "errorText": "Please enter a valid email",
      "handle":true,
    },
    {
      "type": "phone",
      "icon": "fa-phone",
      "label": "Phone",
      "description": "Enter your phone",
      "placeholder": "Enter your phone",
      "className": "form-control",
      "subtype": "text",
      "regex" : "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$",
      "errorText": "Please enter a valid phone number",
      "handle":true
    },
    {
      "type": "number",
      "label": "Number",
      "icon": "fa-html5",
      "description": "Age",
      "placeholder": "Enter your age",
      "className": "form-control",
      "value": "20",
      "min": 12,
      "max": 90
    },
    {
      "type": "date",
      "icon":"fa-calendar",
      "label": "Date",
      "placeholder": "Date",
      "className": "form-control"
    },
    {
      "type": "datetime-local",
      "icon":"fa-calendar",
      "label": "DateTime",
      "placeholder": "Date Time",
      "className": "form-control"
    },
    {
      "type": "textarea",
      "icon":"fa-text-width",
      "label": "Textarea" 
    },
    {
      "type": "table",
      "icon": "fa-table",
      "label": "Table",
      "placeholder": "Table" ,
      "TotalDivsNumber" : this.divs.length,
      "columns" :[],
    },
    {
      "type": "checkbox",
      "required": true,
      "label": "Checkbox",
      "icon":"fa-list",
      "description": "Checkbox",
      "inline": true,
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        }
      ]
    },
    {
      "type": "radio",
      "icon":"fa-list-ul",
      "label": "Radio",
      "description": "Radio boxes",
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        }
      ]
    },
    {
      "type": "autocomplete",
      "icon":"fa-bars",
      "label": "Select",
      "description": "Select",
      "placeholder": "Select",
      "className": "form-control",
      "values": [
        
      ]
    },
    {
      "type": "file",
      "icon":"fa-file",
      "label": "File Upload",
      "className": "form-control",
      "subtype": "file"
    },
    {
      "type": "button",
      "icon":"fa-paper-plane",
      "subtype": "submit",
      "label": "Submit"
    }
  ];

  modelFields:Array<field>=[];
  model:any = {
    name:'Form Name',
    description:'Description',
    section: 'Initial',
    theme:{
      bgColor:"ffffff",
      textColor:"555555",
      bannerImage:""
    },
    attributes:this.modelFields
  };

  report = false;
  reports:any = [];
  showSuccessMessage : boolean;
  DisplayForm : boolean;
  Erase : boolean;

  constructor(
    private route:ActivatedRoute,
    public service : SharedService
  ) { }

  ngOnInit() {
  }

  AddTableAttributes(column : any, divNumber : number){
     var key = Object.keys(this.model.attributes);
     for (let i = 0; i < key.length ; i++) {
        let attributeKey = this.model.attributes[i];
        if(attributeKey['type'] == 'table'){
          column[i]['DivNumber'] = divNumber
          attributeKey['columns'].push(column)
        }
      }
  } 

  refreshTable(){
    this.Components = [];
     var key = Object.keys(this.model.attributes);
     for (let i = 0; i < key.length ; i++) {
       let attributeKey = this.model.attributes[i];
       if(attributeKey['type'] == 'table'){
        let values_key = Object.keys(attributeKey['columns']);
          for(let j = 0; j < values_key.length ; j++){
            let valueKey = attributeKey['columns'][j][0];
            this.Components.push(valueKey)
          }
       }
     }

    //  console.log(this.Components)

  }

  RemoveColumn(ItemName : any){
    var key = Object.keys(this.model.attributes);
    for (let i = 0; i < key.length ; i++) {
      let attributeKey = this.model.attributes[i];
      if(attributeKey['type'] == 'table'){
        let values_key = Object.keys(attributeKey['columns']);
        for(let j = 0; j < values_key.length ; j++){
            let valueKey = attributeKey['columns'][j][0];
             if(valueKey['name'] == ItemName){
                attributeKey['columns'].splice(j , 1);
            }
          }
      } 
    }
  }

  checkIfComponentExist(divNumber){
    var counter = 0;
    var key = Object.keys(this.model.attributes);
    for (let i = 0; i < key.length ; i++) {
      let attributeKey = this.model.attributes[i];
      if(attributeKey['type'] == 'table'){
        let values_key = Object.keys(attributeKey['columns']);
        for(let j = 0; j < values_key.length ; j++){
            let valueKey = attributeKey['columns'][j][0];
             if(valueKey['DivNumber'] == divNumber){
               counter++;
            }
          }
      } 
    }
    return counter;
  }
  
  createDiv(TableName): void {
    this.Erase = true;
    this.divs.push(this.divs.length);
    var key = Object.keys(this.model.attributes);
    for (let i = 0; i < key.length ; i++) {
      let attributeKey = this.model.attributes[i];
      if(attributeKey['type'] == 'table' && attributeKey['name'] == TableName){
        attributeKey['TotalDivsNumber'] = this.divs.length;
      }
    }

  }

  // removeDiv(div){
  //   // delete this.divs[div];
  //   this.divs.splice(div, 1);
  //   console.log(this.divs);
  // }

  changeType(type : any) {
    if(type == 'Users'){
      this.UsersList = this.GetUsers();
      this.GroupsList = [];
    }
    if(type == 'Groups'){
      this.GroupsList = this.GetGroups();
      this.UsersList = [];
    }
  }

  saveForm(){
     swal({
      title: 'Are you sure?',
      text: "Do you want to save this Form?",
      type: 'success',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!'
    }).then((result) => {
      if (result.value) {
        var val = {
          FormName : this.model.name,
           JsonForm : JSON.stringify(this.model.attributes)
        };
          this.service.addForm(val).subscribe(res=>{
          alert(res.toString());
         });
         this.model.attributes = []
        // setTimeout(() => (this.showSuccessMessage = false), 3000);
      }
    });
     
  }

  displayForm(){
    this.DisplayForm = true;
  }

  GetUsers(){
    this.service.getUsersList().subscribe(data=>
      {
        this.UsersList = data
    })
  }

  GetGroups(){
    this.service.getGroupsList().subscribe(data=>
      {
        this.GroupsList = data
    })
  }

  onDragStart(event:DragEvent) {
    console.log("drag started", JSON.stringify(event, null, 2));
  }
  
  onDragEnd(event:DragEvent) {
    console.log("drag ended", JSON.stringify(event, null, 2));
  }
  
  onDraggableCopied(event:DragEvent) {
    console.log("draggable copied", JSON.stringify(event, null, 2));
  }
  
  onDraggableLinked(event:DragEvent) {
    console.log("draggable linked", JSON.stringify(event, null, 2));
  }
    
   onDragged( item:any, list:any[], effect:DropEffect ) {
    if( effect === "move" ) {
      const index = list.indexOf( item );
      list.splice( index, 1 );
    }
  }
      
  onDragCanceled(event:DragEvent) {
    console.log("drag cancelled", JSON.stringify(event, null, 2));
  }
  
  onDragover(event:DragEvent) {
    console.log("dragover", JSON.stringify(event, null, 2));
  }
  
  onDrop( event:DndDropEvent, list?:any[] ) { 
    if(event.data['type'] == 'table'){
    var key = Object.keys(this.model.attributes);
    var counter = 0;
     for (let i = 0; i < key.length ; i++) {
        let attributeKey = this.model.attributes[i];
        if(attributeKey['type'] == 'table'){
          counter ++;
        }
      }

      if(counter >= 1){
        console.log("Table Exist")
        delete event.data;
    }
    }

     if( list && (event.dropEffect === "copy" || event.dropEffect === "move") ) {
      
      if(event.dropEffect === "copy")
      event.data.name = event.data.type+'-'+new Date().getTime();
      let index = event.index;
      if( typeof index === "undefined" ) {
        index = list.length;
      }
      list.splice( index, 0, event.data );
    }

    

    
  }

  

  addValue(values){
    values.push(this.value);
    this.value={label:"",value:""};
  }

  removeField(i){
    swal({
      title: 'Are you sure?',
      text: "Do you want to remove this field?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove!'
    }).then((result) => {
      if (result.value) {
        this.model.attributes.splice(i,1);
      }
    });

  }

  updateForm(){
    let input = new FormData;
    input.append('id',this.model._id);
    input.append('name',this.model.name);
    input.append('description',this.model.description);
    input.append('bannerImage',this.model.theme.bannerImage);
    input.append('bgColor',this.model.theme.bgColor);
    input.append('textColor',this.model.theme.textColor);
    input.append('attributes',JSON.stringify(this.model.attributes));
  }


  initReport(){
    this.report = true; 
    let input = {
      id:this.model._id
    }
  }



  toggleValue(item){
    item.selected = !item.selected;
  }

  submit(){
    let valid = true;
    let validationArray = JSON.parse(JSON.stringify(this.model.attributes));
    validationArray.reverse().forEach(field => {
      console.log(field.label+'=>'+field.required+"=>"+field.value);
      if(field.required && !field.value && field.type != 'checkbox'){
        swal('Error','Please enter '+field.label,'error');
        valid = false;
        return false;
      }
      if(field.required && field.regex){
        let regex = new RegExp(field.regex);
        if(regex.test(field.value) == false){
          swal('Error',field.errorText,'error');
          valid = false;
          return false;
        }
      }
      if(field.required && field.type == 'checkbox'){
        if(field.values.filter(r=>r.selected).length == 0){
          swal('Error','Please enterrr '+field.label,'error');
          valid = false;
          return false;
        }

      }
    });
    if(!valid){
      return false;
    }
    console.log('Save',this.model);
    let input = new FormData;
    input.append('formId',this.model._id);
    input.append('attributes',JSON.stringify(this.model.attributes))

  }

}
