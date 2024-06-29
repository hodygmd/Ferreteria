export interface ProductoInterface {
  clave:string
  nombre:string
  precio:number
  descripcion:string
  stock_max:number
  stock_min:number
  existencias:number
  id_categoria:CategoriaInterface
  id_marca:MarcaInterface
  status:number
}
export interface CategoriaInterface{
  id:number
  descripcion:string
  status:number
}
export interface MarcaInterface{
  id:number
  nombre:string
  status:number
}
export interface ProductoCaracteristicaInterface{
  clave_producto:ProductoInterface,
  id_caracteristica:CaracteristicaInterface
}
export interface CaracteristicaInterface{
  id:number
  descripcion:string
  id_unidad_medida:UnidadMedidaInterface
  medida:number
  status:number
}
export interface UnidadMedidaInterface{
  id:number
  unidad:string
  status:number
}
export interface EmpleadoInterface{
  clave:string
  nombre:string
  username:string
  password:string
  status:number
}
export interface VentaInterface{
  folio:string
  fecha:string
  total:number
  clave_empleado:EmpleadoInterface
  status:number
}
export interface DetalleVentaInterface{
  id:number
  folio_v:VentaInterface
  clave_producto:ProductoInterface
  cantidad:number
  precio:number
}
