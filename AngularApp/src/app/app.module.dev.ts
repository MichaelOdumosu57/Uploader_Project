import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { MyErrorHandler } from './errorHandler'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HammerModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { environment as env } from '../environments/environment'



import { NestDirective } from './directiveDev/nest.directive';
import { LatchDirective } from './directiveDev/latch.directive';
import { DeltaNodeDirective } from './directiveDev/delta-node.directive';
import { SectionDirective } from './directiveDev/section.directive';
import { NavigationDirective } from './directiveDev/navigation.directive';
import { VanillaTiltDirective } from './directiveDev/vanilla-tilt.directive';
import { VisibleDirective } from './directiveDev/visible.directive';
import { AttributeDirective } from './directiveDev/attribute.directive';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import { ComponentsComponent } from './components/components.component';
import { ComponentsDirective } from './directiveDev/components.directive';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoginDirective } from './directiveDev/login.directive';
import { ParticlesJSDirective } from './directiveDev/particles-js.directive';
import { FacebookLoginDirective } from './directiveDev/facebook-login.directive';
import { NanonetsDirective } from './directiveDev/nanonets.directive';
import { PictureUploadDirective } from './directiveDev/picture-upload.directive';
import { DashboardDirective } from './directiveDev/dashboard.directive';



let providers = []
if (env.testingAcct.confirm === "true") {

    providers = [{ provide: ErrorHandler, useClass: MyErrorHandler }]
}

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
        DashboardDirective

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
