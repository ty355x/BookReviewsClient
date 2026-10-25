import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { ReaderModule } from './reader/reader.module';
import { AppHttpInterceptor } from './app-http-interceptor';
import { AuthorModule } from './author/author.module';
import { SharedModule } from './shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NotFoundRoutingModule } from './public/not-found-routing.module';
import { PublicModule } from './public/public.module';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        MatDialogModule,
        FormsModule,
        SharedModule,
        PublicModule,
        AdminModule,
        ReaderModule,
        AuthorModule,
        DragDropModule,
        NotFoundRoutingModule,
    ],
    declarations: [
        AppComponent,
    ],
    exports: [
        SharedModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppHttpInterceptor,
            multi: true
        },
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: { disableClose: true }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
