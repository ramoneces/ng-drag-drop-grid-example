import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Example1Component } from './example1/example1.component';
import { Example2Component } from './example2/example2.component';

const routes: Routes = [
  { path: '', redirectTo: 'example1', pathMatch: 'full' },
  { path: 'example1', component: Example1Component },
  { path: 'example2', component: Example2Component },
  { path: '**', redirectTo: 'example1' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
