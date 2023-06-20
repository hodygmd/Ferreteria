export class AddProductoCaracteristica {
  constructor(
    public clave_producto: string,
    public id_caracteristica: number,
    public id_unidad_medida: number,
    public medida: number
  ) {
  }
}
