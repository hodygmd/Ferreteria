import {Component, OnInit} from '@angular/core';
import {AppServiceService} from "../../../app-service.service";
import {CaracteristicaInterface, ProductoInterface} from "../../../Interfaces/producto-interface";

@Component({
  selector: 'app-add-caracteristicas',
  templateUrl: './add-caracteristicas.component.html',
  styleUrls: ['./add-caracteristicas.component.css']
})
export class AddCaracteristicasComponent implements OnInit{
  productos!:ProductoInterface|any
  caracteristicas!:CaracteristicaInterface|any
  prod!:number
  constructor(private service:AppServiceService) {
  }
  ngOnInit(): void {
    this.service.getProductos().subscribe(
      data=>{
        this.productos=data
      },error => {
        console.log(error)
      }
    )
    this.service.getCaracteristicas().subscribe(
      data=>{
        this.caracteristicas=data
      },error => {
        console.log(error)
      }
    )
  }
  onCheckboxChange(event: any) {
    if(event.target.checked){
      /*this.ids.push(event.target.value)*/
    }else {
      /*let index=this.ids.indexOf(event.target.value)
      if(index!==-1){
        this.ids.splice(index,1)
      }*/
    }
    /*this.ids[0]=event.target.value*/
  }
}
