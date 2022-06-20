import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';
import { EditComponent } from './edit/edit.component';
import { SearchComponent } from './search/search.component';
import { ViewComponent } from './view/view.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: "page", component: PageComponent},
  {path: "edit", component: EditComponent},
  {path: "search", component: SearchComponent},
  {path: "view", component: ViewComponent},
  {path: "login", component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
