import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuRoutingModule} from "./menu-routing.module";
import {FormsModule} from "@angular/forms";
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { UnidadesMedidaComponent } from './pages/unidades-medida/unidades-medida.component';
import { CaracteristicasComponent } from './pages/caracteristicas/caracteristicas.component';
import { AddCaracteristicasComponent } from './pages/add-caracteristicas/add-caracteristicas.component';
import { AddVentasComponent } from './pages/add-ventas/add-ventas.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';



@NgModule({
  declarations: [
    SidebarComponent,
    ProductosComponent,
    MarcasComponent,
    CategoriasComponent,
    UnidadesMedidaComponent,
    CaracteristicasComponent,
    AddCaracteristicasComponent,
    AddVentasComponent,
    EmpleadosComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    FormsModule
  ]
})
export class MenuModule { }
