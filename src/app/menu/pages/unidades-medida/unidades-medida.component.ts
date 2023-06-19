import {Component, OnInit} from '@angular/core';
import {UnidadMedidaInterface} from "../../../Interfaces/producto-interface";
import {AppServiceService} from "../../../app-service.service";

@Component({
  selector: 'app-unidades-medida',
  templateUrl: './unidades-medida.component.html',
  styleUrls: ['./unidades-medida.component.css']
})
export class UnidadesMedidaComponent implements OnInit{
  unidades?:UnidadMedidaInterface|any
  id!:number
  uni!:string
  editar:boolean=false
  textButtonSubmit:string='Add'
  constructor(private service: AppServiceService) {
  }

  ngOnInit(): void {
    this.service.getUnidadesMedida().subscribe(
      data=>{
        this.unidades=data
      },error => {
        console.log(error)
      }
    )
  }
  createUnidadMedida(uni:string){
    if(uni===''){
      alert('Llena todos los campos')
    }else{
      if(!this.editar){
        this.service.createUnidadMedida(uni).subscribe(
          reponse=>{
            console.log(reponse)
            this.ngOnInit()
          },error => {
            console.log(error)
          }
        )
      }else{
        this.service.updateUnidadMedida(this.id,uni).subscribe(
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
  updateUnidadMedida(index:number){
    this.id=this.unidades[index].id
    this.uni=this.unidades[index].unidad
    this.editar=true
    this.textButtonSubmit='Edit'
  }
  deleteUnidadMedida(id:number){
    this.service.deleteUnidadMedida(id).subscribe(
      response=>{
        console.log('borrado')
        this.ngOnInit()
      },error => {
        console.log(error)
      }
    )
  }
  setNull(){
    this.uni=''
    this.editar=false
    this.textButtonSubmit='Add'
  }
}
