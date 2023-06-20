import {Component, OnInit} from '@angular/core';
import {AppServiceService} from "../../../app-service.service";
import {
  CaracteristicaInterface, ProductoCaracteristicaInterface,
  ProductoInterface,
  UnidadMedidaInterface
} from "../../../Interfaces/producto-interface";
import {AddProductoCaracteristica} from "../../../Classes/add-producto-caracteristica";

@Component({
  selector: 'app-add-caracteristicas',
  templateUrl: './add-caracteristicas.component.html',
  styleUrls: ['./add-caracteristicas.component.css']
})
export class AddCaracteristicasComponent implements OnInit{
  pcs!:ProductoCaracteristicaInterface|any
  productos!:ProductoInterface|any
  caracteristicas!:CaracteristicaInterface|any
  unidades!:UnidadMedidaInterface|any
  uni:Array<number>=[]
  prod!:string
  med:Array<string>=[]
  mostrar: boolean = true
  mostrarT: boolean = true
  checkboxMarcado:Array<boolean> = []

  ocultarBoton() {
    this.mostrar = false;
  }
  ocultarTabla() {
    this.mostrarT = false;
  }
  mostrarBoton() {
    this.mostrar = true;
  }
  mostrarTabla() {
    this.mostrarT = true;
  }
  /*carac:Array<number>=[]
  un:Array<number>=[]*/
  constructor(private service:AppServiceService) {
  }
  ngOnInit(): void {
    /*this.c=[]
    this.med=[]
    this.prod=''*/
    /*this.ocultarTabla()
    this.ocultarBoton()*/

    this.service.getProductos().subscribe(
      data=>{
        this.productos=data
        this.prod=this.productos[0].clave
        this.service.getCaracteristicasByClave(this.prod).subscribe(
          data=>{
            this.pcs=data
          },error => {
            console.log(error)
          }
        )
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
    this.service.getUnidadesMedida().subscribe(
      data=>{
        this.unidades=data
        for (let i=0;i<this.caracteristicas.length;i++){
          this.uni[i]=this.unidades[0].id
        }
      },error => {
        console.log(error)
      }
    )
  }
  onCheckboxChange(event: any,inde:number,id:number) {
    if(event.target.checked){
      /*this.carac.push(parseInt(event.target.value))*/
      this.c.push(new AddProductoCaracteristica(this.prod,event.target.value,this.uni[inde],parseFloat(this.med[inde])))
    }else {
      /*console.log(event.target.value)
      let index=this.c.indexOf(event.target.value)
      console.log(index)
      if(index!==-1){
        this.c.splice(index,1)
      }*/
      /*alumn.filter(obj => obj.id !== id)
      this.c = this.c.filter((element, i) => i !== id);*/
      for (let i = 0; i < this.c.length; i++) {
        if (this.c[i].id_caracteristica === event.target.value) {
          this.c.splice(i, 1);
          break;  // Terminar el bucle una vez que se elimine el registro
        }
      }

    }
    /*console.log(id)
    console.log(this.c)*/
  }
  addCaracteristicas(){
    /*for(let i=0;i<this.carac.length;i++){
      this.c.push(new AddProductoCaracteristica(this.prod,this.carac[i],1,1))
    }*/
    this.service.addProductoCaracteristicas(this.c).subscribe(
      response=>{
        console.log(response)
        alert('Las caracteristicas repetidas no se ingresan nuevamente')
        /*this.ngOnInit()*/
        this.service.getCaracteristicasByClave(this.prod).subscribe(
          data=>{
            this.pcs=data
          },error => {
            console.log(error)
          }
        )
      },error => {
        console.log(error)
      }
    )
  }
  c: AddProductoCaracteristica[]=[]
  protected readonly parseInt = parseInt;
  change(){
    this.service.getCaracteristicasByClave(this.prod).subscribe(
      data=>{
        this.pcs=data
        this.mostrarBoton()
        this.mostrarTabla()
        this.checkboxMarcado=[]
      },error => {
        console.log(error)
      }
    )
  }
  deleteProductoCaracteristica(clave:string,id:number){
    this.service.deleteProductoCaracteristica(clave,id).subscribe(
      response=>{
        console.log(response)
        /*this.ngOnInit()*/
        this.service.getCaracteristicasByClave(this.prod).subscribe(
          data=>{
            this.pcs=data
          },error => {
            console.log(error)
          }
        )
      },error => {
        console.log(error)
      }
    )
  }
  setNull(){
    this.c=[]
    this.med=[]
  }
}
