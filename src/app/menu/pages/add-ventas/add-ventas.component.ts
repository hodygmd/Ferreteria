import {Component, OnInit} from '@angular/core';
import {AppServiceService} from "../../../app-service.service";
import {
  DetalleVentaInterface,
  EmpleadoInterface,
  ProductoInterface,
  VentaInterface
} from "../../../Interfaces/producto-interface";
import {AddDetalleVenta} from "../../../Classes/add-detalle-venta";

@Component({
  selector: 'app-add-ventas',
  templateUrl: './add-ventas.component.html',
  styleUrls: ['./add-ventas.component.css']
})
export class AddVentasComponent implements OnInit{
  empleados!:EmpleadoInterface|any
  ventas!:VentaInterface|any
  detalles!:DetalleVentaInterface|any
  productos!:ProductoInterface|any
  ven!:string
  emp!:string
  checkboxMarcado:Array<boolean> = []
  cant:Array<string>=[]
  folio:string='foli'
  constructor(private service:AppServiceService) {
  }

  ngOnInit(): void {
    this.service.getProductos().subscribe(
      data=>{
        this.productos=data
        console.log(data)
      },error => {
        console.log(error)
      }
    )
    this.service.getEmpleados().subscribe(
      data=>{
        this.empleados=data
        this.emp=this.empleados[0].clave
      },error => {
        console.log(error)
      }
    )
    this.service.getVentas().subscribe(
      data=>{
        this.ventas=data
        this.ven=this.ventas[0].folio
        this.service.getProductosByFolio(this.ven).subscribe(
          data=>{
            this.detalles=data
          },error => {
            console.log(error)
          }
        )
      },error => {
        console.log(error)
      }
    )


  }

  change() {
    this.service.getProductosByFolio(this.ven).subscribe(
      data=>{
        this.detalles=data
      },error => {
        console.log(error)
      }
    )
  }

  addVenta() {
    const date = new Date();
    const random = Math.random();
    const timestamp = date.getTime();
    const randomWithTimestamp = random * timestamp;
    this.folio += Math.floor(randomWithTimestamp) % 10000000;
    this.service.createVenta(this.folio,this.emp).subscribe(
      response=>{
        console.log(response)
        this.folio='foli'
        this.service.getVentas().subscribe(
          data=>{
            this.ventas=data
            this.ven=this.ventas[0].folio
          },error => {
            console.log(error)
          }
        )
      },error => {
        console.log(error)
      }
    )
  }

  onCheckboxChange(event: any, j: number, id:number) {
    if(event.target.checked){
      this.dv.push(new AddDetalleVenta(this.ven,event.target.value,parseInt(this.cant[j])))
    }else{
      for (let i = 0; i < this.dv.length; i++) {
        if (this.dv[i].clave_producto === event.target.value) {
          this.dv.splice(i, 1);
          break;  // Terminar el bucle una vez que se elimine el registro
        }
      }
    }
    console.log(this.dv)
  }
  dv: AddDetalleVenta[]=[]

  addDetallesVenta() {
    this.service.addDetalleVenta(this.dv).subscribe(
      response=>{
        console.log(response)
        console.log('Las caracteristicas repetidas no se ingresan nuevamente')
        /*this.ngOnInit()*/
        this.service.getVentas().subscribe(
          data=>{
            this.ventas=data
          },error => {
            console.log(error)
          }
        )
        this.service.getProductosByFolio(this.ven).subscribe(
          data=>{
            this.detalles=data
          },error => {
            console.log(error)
          }
        )
      },error => {
        console.log(error)
      }
    )
  }

  deleteDetalleVenta(id:number) {
    this.service.deleteDetalleVenta(id).subscribe(
      response=>{
        this.service.getVentas().subscribe(
          data=>{
            this.ventas=data
          },error => {
            console.log(error)
          }
        )
        this.service.getProductosByFolio(this.ven).subscribe(
          data=>{
            this.detalles=data
          },error => {
            console.log(error)
          }
        )
      },error => {
        console.log(error)
      }
    )
  }

  deleteVenta(folio: string) {
    this.service.deleteVenta(folio).subscribe(
      response=>{
        this.service.getVentas().subscribe(
          data=>{
            this.ventas=data
          },error => {
            console.log(error)
          }
        )
        this.service.getProductosByFolio(this.ven).subscribe(
          data=>{
            this.detalles=data
          },error => {
            console.log(error)
          }
        )
      },error => {
        console.log(error)
      }
    )
  }

  setNull() {
    this.dv=[]
    this.checkboxMarcado=[]
    this.cant=[]
  }
}
