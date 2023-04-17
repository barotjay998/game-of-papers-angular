import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PapersComponent } from './papers/papers.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', redirectTo : '/home', pathMatch: 'full' },
  { path: 'home', component : HomeComponent },
  { path: 'papers', component: PapersComponent},
  { path: 'papers/:id', component: ViewComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


export const routingComponents = [
  HomeComponent, 
  PapersComponent, 
  PageNotFoundComponent
];