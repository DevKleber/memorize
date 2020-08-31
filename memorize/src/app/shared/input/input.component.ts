import { Component, OnInit,Input,ContentChild,AfterContentInit } from '@angular/core';
import {NgModel,FormControlName} from '@angular/forms'
@Component({
  selector: 'app-input-container',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, AfterContentInit {
  @Input() class: string
  @Input() label: string
  @Input() errorMessage: string
  @Input() showTip : boolean = true
  input:any
  @ContentChild(NgModel, /* TODO: add static flag */ {static: true}) model:NgModel
  @ContentChild(FormControlName, /* TODO: add static flag */ {static: true}) control:FormControlName
  constructor() { }

  ngOnInit() {
  }
  
  labelInput(){
    return this.label != undefined ? this.label : false;
  }
  getClass(){
    return this.class != undefined ? this.class : false;
  }
  ngAfterContentInit(){
    this.input = this.model || this.control
    if(this.input === undefined){
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou FormControlName')
    }
  }
  hasSuccess(): boolean{
    
    return this.input.valid && (this.input.dirty || this.input.touched)
  }
  hasError():boolean{
    
    return this.input.invalid && (this.input.dirty || this.input.touched)
    // return this.input.invalid
  }
  hasRequired():boolean{
    return this.input.invalid
  }

}