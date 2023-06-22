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
  checkboxMarcado:Array<boolean> = []
  constructor(private service:AppServiceService) {
  }
  ngOnInit(): void {
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
  }
  addCaracteristicas(){
    this.service.addProductoCaracteristicas(this.c).subscribe(
      response=>{
        console.log(response)
        console.log('Las caracteristicas repetidas no se ingresan nuevamente')
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
    this.checkboxMarcado=[]
  }
}
