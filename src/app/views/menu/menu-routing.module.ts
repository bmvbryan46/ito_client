import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
 {
   path: '',
   data: {
     title: 'Menu modulo'
   },
   children: [
     {
       path: '',
       component: MenuComponent,
       data: {
         title: 'Menu'
       }
     },

   ]
 }];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class MenuRoutingModule { }
