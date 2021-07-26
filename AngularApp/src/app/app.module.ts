import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Provider } from '@angular/core';
import { MyErrorHandler } from './errorHandler'
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import {MyInterceptor} from './myInterceptor'
import { AppRoutingModule } from './app-routing.module';
import { HammerModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { environment as env } from '../environments/environment'





import { NestDirective } from './directive/nest.directive';
import { LatchDirective } from './directive/latch.directive';
import { DeltaNodeDirective } from './directive/delta-node.directive';
import { SectionDirective } from './directive/section.directive';
import { NavigationDirective } from './directive/navigation.directive';
import { VanillaTiltDirective } from './directive/vanilla-tilt.directive';
import { VisibleDirective } from './directive/visible.directive';
import { AttributeDirective } from './directive/attribute.directive';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import { ComponentsComponent } from './components/components.component';
import { ComponentsDirective } from './directive/components.directive';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoginDirective } from './directive/login.directive';
import { ParticlesJSDirective } from './directive/particles-js.directive';
import { FacebookLoginDirective } from './directive/facebook-login.directive';
import { NanonetsDirective } from './directive/nanonets.directive';
import { PictureUploadDirective } from './directive/picture-upload.directive';
import { DashboardDirective } from './directive/dashboard.directive';


let providers:Provider[] = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: MyInterceptor,
        multi: true
    }
]
if (env.testingAcct.confirm === "true") {

    providers.push({ provide: ErrorHandler, useClass: MyErrorHandler })
}

//  no messages
(console.log as any) = ()=>{}
(console.warn as any) = ()=>{}
(console.error as any) = ()=>{}
//
@NgModule({
    declarations: [
        AppComponent,
        FormComponent,
        NestDirective,
        LatchDirective,

        DeltaNodeDirective,

        SectionDirective,
        NavigationDirective,
        VanillaTiltDirective,
        VisibleDirective,
        ComponentsComponent,
        ComponentsDirective,
        LoginDirective,
        AttributeDirective,
        ParticlesJSDirective,
        FacebookLoginDirective,
        NanonetsDirective,
        PictureUploadDirective,
        DashboardDirective,

    ],
    imports: [

        HammerModule,
        BrowserModule,
        FormsModule,
        TableModule,
        // AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ButtonModule,
        CarouselModule,
        CardModule,
        DropdownModule,
        ProgressSpinnerModule
    ],
    providers,
    bootstrap: [AppComponent]
})
export class AppModule { }
