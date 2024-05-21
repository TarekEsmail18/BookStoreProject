import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';
import { AddBookComponent } from './Components/Admin/AddBook/AddBook.component';
import { AdminBookListComponent } from './Components/Admin/AdminBookList/AdminBookList.component';
import { EditBookDetailsComponent } from './Components/Admin/EditBookDetails/EditBookDetails.component';
import { BookDetailsComponent } from './Components/book-details/book-details.component';
import { BookByCatComponent } from './Components/BookByCat/BookByCat.component';
import { CartComponent } from './Components/Cart/Cart.component';
import { HeaderComponent } from './Components/Header/Header.component';
import { HomeComponent } from './Components/Home/Home.component';
import { LoginComponent } from './Components/Login/Login.component';
import { RegisterPageComponent } from './Components/RegisterPage/RegisterPage.component';
import { ProductListComponent } from './Components/ProductList/ProductList.component';
import { BlogComponent } from './Components/Blog/Blog.component';
import { EventsComponent } from './Components/Events/Events.component';
import { AboutMeComponent } from './Components/AboutMe/AboutMe.component';
import { AdminAuthorListComponent } from './Components/Admin/AdminAuthorList/AdminAuthorList.component';
import { AddAuthorComponent } from './Components/Admin/AddAuthor/AddAuthor.component';
import { EditAuthorDetailsComponent } from './Components/Admin/EditAuthorDetails/EditAuthorDetails.component';
import { AdminEventListComponent } from './Components/Admin/AdminEventList/AdminEventList.component';
import { EditEventDetailsComponent } from './Components/Admin/EditEventDetails/EditEventDetails.component';
import { AddEventComponent } from './Components/Admin/AddEvent/AddEvent.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  //{path: 'Home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'Home', component: HomeComponent},
  {path:'Admin', component: AdminBookListComponent},
  {path:'Admin/BookDetails/:id', component: EditBookDetailsComponent},
  {path:'Admin/AddBook', component: AddBookComponent},
  {path:'Admin/AuthorList', component: AdminAuthorListComponent},
  {path:'Admin/AddAuthor', component: AddAuthorComponent},
  {path:'Admin/AuthorDetails/:Id', component: EditAuthorDetailsComponent},
  {path:'Admin/EventList', component: AdminEventListComponent},
  {path:'Admin/AddEvent', component: AddEventComponent},
  {path:'Admin/EventDetails/:Id', component: EditEventDetailsComponent},
  {path:'bookDetails/:id', component: BookDetailsComponent},
  {path:'BookList/:Cat', component: BookByCatComponent},
  {path:'RegisterPage', component: RegisterPageComponent},
  {path:'login', component: LoginComponent},
  {path:'Cart', component: CartComponent},
  {path:'ShopPage', component: ProductListComponent},
  {path:'Blog', component: BlogComponent},
  {path:'Events', component: EventsComponent},
  {path:'AboutMe', component: AboutMeComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
