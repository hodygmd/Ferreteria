import {Component, OnInit} from '@angular/core';
import {AppServiceService} from "../../../app-service.service";
import {CaracteristicaInterface, UnidadMedidaInterface} from "../../../Interfaces/producto-interface";

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.css']
})
export class CaracteristicasComponent implements OnInit{
  caracteristicas!:CaracteristicaInterface|any
  id!:number
  desc!:string
  editar:boolean=false
  textButtonSubmit:string='Add'

  constructor(private service:AppServiceService) {
}

  ngOnInit(): void {
    this.service.getCaracteristicas().subscribe(
      data=>{
        this.caracteristicas=data
      },error => {
        console.log(error)
      }
    )
  }
  createCaracteristica(desc:string){
    if(desc===''){
      alert('Llena todos los campos')
    }else{
      if(!this.editar){
        this.service.createCaracteristica(desc).subscribe(
          reponse=>{
            console.log(reponse)
            this.ngOnInit()
          },error => {
            console.log(error)
          }
        )
      }else{
        this.service.updateCaracteristica(this.id,desc).subscribe(
          response=>{
            console.log(response)
            this.ngOnInit()
          },error => {
            console.log(error)
          }
        )
      }
    }
  }
  updateCaracteristica(index:number){
    this.id=this.caracteristicas[index].id
    this.desc=this.caracteristicas[index].descripcion
    /*this.uni=this.caracteristicas[index].id_unidad_medida.id
    this.med=this.caracteristicas[index].medida*/
    this.editar=true
    this.textButtonSubmit='Edit'
  }
  deleteCaracteristica(id:number){
    this.service.deleteCaracteristica(id).subscribe(
      response=>{
        console.log('borrado')
        this.ngOnInit()
      },error => {
        console.log(error)
      }
    )
  }
  setNull(){
    this.desc=''
    /*this.uni=1
    this.med=''*/
    this.editar=false
    this.textButtonSubmit='Add'
  }

  protected readonly parseFloat = parseFloat;
}
