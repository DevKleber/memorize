import { Component, OnInit, Input,forwardRef } from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { RadioOption } from './radio-option.model';


@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi:true
    }
  ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  @Input() options: RadioOption[]
  value: any
  onchange: any
  constructor() { }

  ngOnInit() {
  }
  setValue(value:any){
    this.value = value
    this.onchange(this.value)
  }

  /**
     * Write a new value to the element.
     */
    writeValue(obj: any): void{
      this.value = obj
    }
    /**
     * Set the function to be called when the control receives a change event.
     */
    registerOnChange(fn: any): void{
      this.onchange = fn 
    }
    /**
     * Set the function to be called when the control receives a touch event.
     */
    registerOnTouched(fn: any): void{}
    /**
     * This function is called when the control status changes to or from "DISABLED".
     * Depending on the value, it will enable or disable the appropriate DOM element.
     *
     * @param isDisabled
     */
    setDisabledState?(isDisabled: boolean): void{}

}
