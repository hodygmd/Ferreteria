import {Component, OnInit} from '@angular/core';
import {CategoriaInterface, MarcaInterface} from "../../../Interfaces/producto-interface";
import {AppServiceService} from "../../../app-service.service";

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{
  productos?: ProductosComponent | any
  categorias?:CategoriaInterface|any
  marcas?:MarcaInterface|any
  cat: number=1;
  marc: number=1;
  clave: string='prod';
  nom!:string
  prec!:string
  desc!:string
  stmax!:string
  stmin!:string
  exis!:string
  editar:boolean=false
  textButtonSubmit:string='Add'
  constructor(private service: AppServiceService) {
  }

  ngOnInit(): void {
    this.service.getProductos().subscribe(
      data => {
        this.productos = data
      },
      error => {
        console.log('Error fetching products:', error)
      }
    )
    this.service.getCategorias().subscribe(
      data => {
        this.categorias = data
      },
      error => {
        console.log('Error fetching products:', error)
      }
    )
    this.service.getMarcas().subscribe(
      data => {
        this.marcas = data
      },
      error => {
        console.log('Error fetching products:', error)
      }
    )
  }
  createProducto(nom:string,desc:string,pre:number,stmin:number,stmax:number,exis:number){
    if(nom===''||desc===''||pre===null||stmin===null||stmax===null||exis===null){
      alert('Llena todos los campos')
    }else {
      if(!this.editar){
        const date = new Date();
        const random = Math.random();
        const timestamp = date.getTime();
        const randomWithTimestamp = random * timestamp;
        this.clave += Math.floor(randomWithTimestamp) % 10000000;
        console.log(this.clave)
        this.service.createProducto(this.clave,nom,pre,desc,stmax,stmin,exis,this.cat,this.marc).subscribe(
          reponse=>{
            console.log(reponse)
            this.ngOnInit()
          },error => {
            console.log(error)
          }
        )
      }else {
        this.service.updateProducto(this.clave,nom,pre,desc,stmax,stmin,exis,this.cat,this.marc).subscribe(
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
  updateProducto(index:number){
    this.clave=this.productos[index].clave
    this.nom=this.productos[index].nombre
    this.prec=this.productos[index].precio
    this.desc=this.productos[index].descripcion
    this.stmax=this.productos[index].stock_max
    this.stmin=this.productos[index].stock_min
    this.exis=this.productos[index].existencias
    this.cat=this.productos[index].id_categoria.id
    this.marc=this.productos[index].id_marca.id
    this.editar=true
    this.textButtonSubmit='Edit'
  }
  deleteProducto(clave:string){
    this.service.deleteProducto(clave).subscribe(
      response=>{
        console.log("borrado")
        this.ngOnInit()
      },error => {
        console.log(error)
      }
    )
  }

  protected readonly parseInt = parseInt;
  protected readonly parseFloat = parseFloat;
  setNull(){
    this.nom=''
    this.prec=''
    this.desc=''
    this.stmax=''
    this.stmin=''
    this.exis=''
    this.cat=1
    this.marc=1
    this.editar=false
    this.textButtonSubmit='Add'
  }
}
