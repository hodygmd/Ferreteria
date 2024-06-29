import {Component, OnInit} from '@angular/core';
import {AppServiceService} from "../../../app-service.service";
import {EmpleadoInterface} from "../../../Interfaces/producto-interface";

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit{
  empleados!:EmpleadoInterface|any
  clave:string='empl'
  nom!:string
  user!:string
  pass!:string
  editar:boolean=false
  editarPass:boolean=false
  textButtonSubmit:string='Add'
  constructor(private service:AppServiceService) {}

  ngOnInit(): void {
    this.service.getEmpleados().subscribe(
      data=>{
        this.empleados=data
      },error => {
        console.log(error)
      }
    )
  }
  createEmpleado(nom: string,user:string,pass:string) {
    /*if(pass===''){
      alert('Llena todos los campos')
    }else{*/
      if(!this.editar&&!this.editarPass) {
        if(nom===''||user===''||pass===''){
          alert('Llena todos los campos')
          return;
        }
        const date = new Date();
        const random = Math.random();
        const timestamp = date.getTime();
        const randomWithTimestamp = random * timestamp;
        this.clave += Math.floor(randomWithTimestamp) % 10000000;
        console.log(this.clave)
        console.log(user)
        console.log(pass)
        this.service.createEmpleado(this.clave,nom,user,pass).subscribe(
          response=>{
            console.log(response)
            this.ngOnInit()
          },error => {
            console.log(error)
          }
        )
      }else if(this.editarPass){
        if(pass===''){
          alert('Llena todos los campos')
          return
        }
        console.log('editar pass')
        this.service.updatePassword(this.clave,this.nom,this.user,this.pass).subscribe(
          response=>{
            console.log(response)
            this.ngOnInit()
          },error => {
            console.log(error)
          }
        )
      }else {
        if(nom===''||user===''){
          alert('Llena todos los campos')
          return;
        }
        console.log('editar')
        this.service.updateEmpleado(this.clave,nom,user,pass).subscribe(
          response=>{
            console.log(response)
            this.ngOnInit()
          },error => {
            console.log(error)
          }
        )
      }
    //}
  }

  updateEmpleado(index: number) {
    this.clave=this.empleados[index].clave
    this.nom=this.empleados[index].nombre
    this.user=this.empleados[index].username
    this.pass=this.empleados[index].password
    this.editar=true
    this.editarPass=false
    this.textButtonSubmit='Edit'
  }
  updatePassword(index:number){
    this.editarPass=true
    this.clave=this.empleados[index].clave
    this.pass=''
    this.editar=false
    this.editarPass=true
    this.textButtonSubmit='Edit Password'
  }
  deleteEmpleado(clave: string) {
    this.service.deleteEmpleado(clave).subscribe(
      response=>{
        console.log("borrado")
        this.ngOnInit()
      },error => {
        console.log(error)
      }
    )
  }

  setNull() {
    this.clave='empl'
    this.nom=''
    this.user=''
    this.pass=''
    this.editar=false
    this.editarPass=false
    this.textButtonSubmit='Add'
  }
}
