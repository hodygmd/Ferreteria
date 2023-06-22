export class AddVenta {
  constructor(
    public folio: string,
    public total: number,
    public clave_empleado: string,
    public status: number
  ) {
  }
}
