import {Component, OnInit} from '@angular/core';
import {CategoriaInterface, MarcaInterface} from "../../../Interfaces/producto-interface";
import {AppServiceService} from "../../../app-service.service";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit{
  categorias?:CategoriaInterface|any
  id!:number
  desc!:string
  editar:boolean=false
  textButtonSubmit:string='Add'
  constructor(private service: AppServiceService) {
  }
  ngOnInit(): void {
    this.service.getCategorias().subscribe(
      data=>{
        this.categorias=data
      },error => {
        console.log(error)
      }
    )
  }
  createCategoria(desc:string){
    if(desc===''){
      alert('Llena todos los campos')
    }else{
      if(!this.editar){
        this.service.createCategoria(desc).subscribe(
          reponse=>{
            console.log(reponse)
            this.ngOnInit()
          },error => {
            console.log(error)
          }
        )
      }else{
        this.service.updateCategoria(this.id,desc).subscribe(
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
  updateCategoria(index:number){
    this.id=this.categorias[index].id
    this.desc=this.categorias[index].descripcion
    this.editar=true
    this.textButtonSubmit='Edit'
  }
  deleteCategoria(id:number){
    this.service.deleteCategoria(id).subscribe(
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
    this.editar=false
    this.textButtonSubmit='Add'
  }

}
