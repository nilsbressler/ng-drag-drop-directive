import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DraggableListComponent } from './components/draggable-list/draggable-list.component';
import { DragDropDirective } from './directive/drag-drop/drag-drop.directive';

@NgModule({
  declarations: [AppComponent, DraggableListComponent, DragDropDirective],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
