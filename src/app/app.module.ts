import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material/material.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SidenavService } from './services/sidenav/sidenav.service';
import { MainPageComponent } from './components/main-page/main-page/main-page.component';
import { ChartsModule } from 'ng2-charts';
import { ProjectCardComponent } from './components/project-card/project-card/project-card.component';
import { TaskSectionComponent } from './components/task-section/task-section/task-section.component';
import { TaskComponent } from './components/task/task/task.component';
import { TaskDialogComponent } from './components/dialogs/task-dialog/task-dialog/task-dialog.component';
import { AddUserToProjectDialogComponent } from './components/dialogs/add-user-to-project-dialog/add-user-to-project-dialog/add-user-to-project-dialog.component';
import { UserUpdateDialogComponent } from './components/dialogs/user-update-dialog/user-update-dialog/user-update-dialog.component';
import { CreateListDialogComponent } from './components/dialogs/create-list-dialog/create-list-dialog/create-list-dialog.component';
import { TestComponent } from './components/dialogs/test/test/test.component';
import { CreateProjectDialogComponent } from './components/dialogs/create-project-dialog/create-project-dialog/create-project-dialog.component';
import { JwtInterceptor } from './models/JwtInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    MainPageComponent,
    ProjectCardComponent,
    TaskSectionComponent,
    TaskComponent,
    TaskDialogComponent,
    AddUserToProjectDialogComponent,
    UserUpdateDialogComponent,
    CreateListDialogComponent,
    TestComponent,
    CreateProjectDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule,
  ],
  providers: [
    SidenavService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
