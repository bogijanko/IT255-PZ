import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DrugsManagementComponent} from "./drugs-management/drugs-management.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "drugs",
    component: DrugsManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
