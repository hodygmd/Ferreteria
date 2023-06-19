import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  CaracteristicaInterface,
  CategoriaInterface,
  MarcaInterface, ProductoCaracteristicaInterface,
  ProductoInterface,
  UnidadMedidaInterface
} from "./Interfaces/producto-interface";
import {AddProducto} from "./Classes/add-producto";
import {AddMarca} from "./Classes/add-marca";
import {AddCategoria} from "./Classes/add-categoria";
import {AddUnidadMedida} from "./Classes/add-unidad-medida";
import {AddCaracteristica} from "./Classes/add-caracteristica";

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }
  /*-------------------------------------------------------------------------------------*/
  /*------------------------------------PRODUCTOS----------------------------------------*/

  /*-------------------------------------------------------------------------------------*/
  getProductos() {
    return this.http.get<ProductoInterface>(`${this.baseUrl}/producto`)
  }

  createProducto(clv: string, nom: string,pre: number, desc: string, stmax: number,stmin: number, exis: number, idcat: number, idmarc: number) {
    return this.http.post<ProductoInterface>(`${this.baseUrl}/producto/create`, new AddProducto(clv, nom, pre,desc, stmax, stmin, exis, idcat, idmarc, 1))
  }

  updateProducto(clv: string, nom: string,pre: number, desc: string, stmax: number,stmin: number, exis: number, idcat: number, idmarc: number) {
    return this.http.put<ProductoInterface>(`${this.baseUrl}/producto/update/${clv}`, new AddProducto(clv, nom, pre,desc, stmax, stmin, exis, idcat, idmarc, 1))
  }

  deleteProducto(clave: string) {
    return this.http.put<ProductoInterface>(`${this.baseUrl}/producto/delete/${clave}`, '')
  }
  /*--------------------------------------------------------------------------------------*/
  /*------------------------------------CATEGORIAS----------------------------------------*/

  /*--------------------------------------------------------------------------------------*/
  getCategorias() {
    return this.http.get<CategoriaInterface>(`${this.baseUrl}/categoria`)
  }
  createCategoria(desc: string) {
    return this.http.post<CategoriaInterface>(`${this.baseUrl}/categoria/create`, new AddCategoria(desc, 1))
  }

  updateCategoria(id: number, desc: string) {
    return this.http.put<CategoriaInterface>(`${this.baseUrl}/categoria/update/${id}`, new AddCategoria(desc, 1))
  }

  deleteCategoria(id: number) {
    return this.http.put<CategoriaInterface>(`${this.baseUrl}/categoria/delete/${id}`, '')
  }
  /*----------------------------------------------------------------------------------*/
  /*------------------------------------MARCAS----------------------------------------*/

  /*----------------------------------------------------------------------------------*/
  getMarcas() {
    return this.http.get<MarcaInterface>(`${this.baseUrl}/marca`)
  }
  createMarca(nom: string) {
    return this.http.post<MarcaInterface>(`${this.baseUrl}/marca/create`, new AddMarca(nom, 1))
  }

  updateMarca(id: number, nom: string) {
    return this.http.put<MarcaInterface>(`${this.baseUrl}/marca/update/${id}`, new AddMarca(nom, 1))
  }

  deleteMarca(id: number) {
    return this.http.put<MarcaInterface>(`${this.baseUrl}/marca/delete/${id}`, '')
  }
  /*-------------------------------------------------------------------------------------*/
  /*--------------------------------UNIDADES DE MEDIDA-----------------------------------*/

  /*-------------------------------------------------------------------------------------*/
  getUnidadesMedida() {
    return this.http.get<UnidadMedidaInterface>(`${this.baseUrl}/unidad-medida`)
  }
  createUnidadMedida(unidad:string){
    return this.http.post<UnidadMedidaInterface>(`${this.baseUrl}/unidad-medida/create`,new AddUnidadMedida(unidad,1))
  }
  updateUnidadMedida(id:number,unidad:string){
    return this.http.put<UnidadMedidaInterface>(`${this.baseUrl}/unidad-medida/update/${id}`,new AddUnidadMedida(unidad,1))
  }
  deleteUnidadMedida(id:number){
    return this.http.put<UnidadMedidaInterface>(`${this.baseUrl}/unidad-medida/delete/${id}`,'')
  }
  /*-------------------------------------------------------------------------------------*/
  /*----------------------------------CARACTERISTICAS------------------------------------*/

  /*-------------------------------------------------------------------------------------*/
  getCaracteristicas(){
    return this.http.get<CaracteristicaInterface>(`${this.baseUrl}/caracteristica`)
  }
  createCaracteristica(desc:string,idum:number,med:number){
    return this.http.post<CaracteristicaInterface>(`${this.baseUrl}/caracteristica/create`,new AddCaracteristica(desc,idum,med,1))
  }
  updateCaracteristica(id:number,desc:string,idum:number,med:number){
    return this.http.put<CaracteristicaInterface>(`${this.baseUrl}/caracteristica/update/${id}`,new AddCaracteristica(desc,idum,med,1))
  }
  deleteCaracteristica(id:number){
    return this.http.put<CaracteristicaInterface>(`${this.baseUrl}/caracteristica/delete/${id}`,'')
  }
  /*-------------------------------------------------------------------------------------*/
  /*------------------------------CARACTERISTICAS PRODCUTO-------------------------------*/

  /*-------------------------------------------------------------------------------------*/
  getCaracteristicasByClave(clave:string){
    return this.http.get<ProductoCaracteristicaInterface>(`${this.baseUrl}/pc/${clave}`)
  }
  getProductosC(){
    return this.http.get<ProductoInterface>(`${this.baseUrl}/producto`)
  }
}
