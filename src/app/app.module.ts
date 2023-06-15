//  MODULES
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/Shared/Modules/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//  HIGHLIGHT.JS
import { HighlightModule, HIGHLIGHT_OPTIONS} from 'ngx-highlightjs';

//  SCRIPTS
import { AngularHTML } from './CodeGeneration/codelogic/Angular';
import { AngularMaterialHTML } from './CodeGeneration/codelogic/AngularMaterial';
import { ngBootstrap } from './CodeGeneration/codelogic/ngbootstrap';
import { SAPUI5HTML } from './CodeGeneration/codelogic/SAPUI5';

//  COMPONENTS
import { AppComponent } from './app.component';
import { FeedbackComponent } from './Feedback/feedback.component';
import { CodeGenerationComponent } from './CodeGeneration/codegeneration.component';
import { ObjectEditComponent } from './ObjectEdit/objectedit.component';
import { TutorialComponent } from './Tutorial/tutorial.component';
import { LayoutDesignComponent } from './LayoutDesign/layoutdesign.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeGenerationComponent,
    ObjectEditComponent,
    TutorialComponent,
    FeedbackComponent,
    LayoutDesignComponent
  ],
  imports: [
    ClipboardModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HighlightModule, 
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [AngularHTML, AngularMaterialHTML, ngBootstrap, SAPUI5HTML, {
    provide: HIGHLIGHT_OPTIONS,
    useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
            typescript: () => import('highlight.js/lib/languages/typescript'),
            css: () => import('highlight.js/lib/languages/css'),
            xml: () => import('highlight.js/lib/languages/xml'),
            json: () => import('highlight.js/lib/languages/json')
        }
    }
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
