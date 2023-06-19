import {Component, OnInit} from '@angular/core';
import {MarcaInterface} from "../../../Interfaces/producto-interface";
import {AppServiceService} from "../../../app-service.service";

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit{
  marcas?:MarcaInterface|any
  id!:number
  nom!:string
  editar:boolean=false
  textButtonSubmit:string='Add'
  constructor(private service: AppServiceService) {
  }

  ngOnInit(): void {
    this.service.getMarcas().subscribe(
      data=>{
        this.marcas=data
      },error => {
        console.log(error)
      }
    )
  }
  createMarca(nom:string){
    if(nom===''){
      alert('Llena todos los campos')
    }else{
      if(!this.editar){
        this.service.createMarca(nom).subscribe(
          reponse=>{
            console.log(reponse)
            this.ngOnInit()
          },error => {
            console.log(error)
          }
        )
      }else{
        this.service.updateMarca(this.id,nom).subscribe(
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
  updateMarca(index:number){
    this.id=this.marcas[index].id
    this.nom=this.marcas[index].nombre
    this.editar=true
    this.textButtonSubmit='Edit'
  }
  deleteMarca(id:number){
    this.service.deleteMarca(id).subscribe(
      response=>{
        console.log('borrado')
        this.ngOnInit()
      },error => {
        console.log(error)
      }
    )
  }
  setNull(){
    this.nom=''
    this.editar=false
    this.textButtonSubmit='Add'
  }
}
