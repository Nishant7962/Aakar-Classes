import { Route, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { CoursesComponent } from './courses/courses.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const APP_ROUTE: Route[] = [
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'enquiry',component:EnquiryComponent},
    {path:'courses',component:CoursesComponent},
    {path:'sign_in',component:SignInComponent},
    {path:'sign_up',component:SignUpComponent}
];
