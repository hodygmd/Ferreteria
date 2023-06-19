import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {path: 'menu',loadChildren:()=>import('./menu/menu.module').then(m=>m.MenuModule)},
  {path: '**',redirectTo:'menu'}
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
