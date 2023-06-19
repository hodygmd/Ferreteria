export class AddProducto {
  constructor(
    public clave: string,
    public nombre: string,
    public precio: number,
    public descripcion: string,
    public stock_max: number,
    public stock_min: number,
    public existencias: number,
    public id_categoria: number,
    public id_marca: number,
    public status: number,
  ) {
  }
}
