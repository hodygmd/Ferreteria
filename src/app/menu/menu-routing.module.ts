import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarComponent} from "./pages/sidebar/sidebar.component";
import {RouterModule, Routes} from "@angular/router";
import {ProductosComponent} from "./pages/productos/productos.component";
import {MarcasComponent} from "./pages/marcas/marcas.component";
import {CategoriasComponent} from "./pages/categorias/categorias.component";
import {UnidadesMedidaComponent} from "./pages/unidades-medida/unidades-medida.component";
import {CaracteristicasComponent} from "./pages/caracteristicas/caracteristicas.component";
import {AddCaracteristicasComponent} from "./pages/add-caracteristicas/add-caracteristicas.component";
import {AddVentasComponent} from "./pages/add-ventas/add-ventas.component";
import {EmpleadosComponent} from "./pages/empleados/empleados.component";


const routes: Routes=[
  {path: '',
    component:SidebarComponent,
    children:[
      {path: 'productos',component:ProductosComponent},/*

      {path: 'presentaciones',component:PresentacionesComponent},*/
      {path: 'caracteristicas',component:CaracteristicasComponent},
      {path: 'add-caracteristicas',component:AddCaracteristicasComponent},
      {path: 'unidades-medida',component:UnidadesMedidaComponent},
      {path: 'categorias',component:CategoriasComponent},
      {path: 'marcas',component:MarcasComponent},
      {path: 'add-ventas',component:AddVentasComponent},
      {path: 'empleados',component:EmpleadosComponent},
      {path: '**',redirectTo:'productos'}
    ]}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class MenuRoutingModule { }
