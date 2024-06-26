# Angular Drag Drop Directive

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

This Angular project implements a drag-and-drop functionality for managing lists of items. It consists of a `DraggableListComponent` that utilizes a custom ``DragDropDirective` to enable draggable behavior on list items, facilitating reordering through drag operations.

## `DragDropDirective`

**`@HostBinding('draggable') get draggable()`**: This property binding makes the host element draggable or not based on the value of `canDrag`. If `canDrag` is true, the element becomes draggable; otherwise, it's not.

```ts
@HostBinding('draggable')
  get draggable() {
    return this.canDrag;
  }
```

---

**`@HostListener('dragstart', ['$event']) onDragStart(event: DragEvent)`**: This method handles the `dragstart` event triggered when dragging starts. It sets the data (`text/plain` format) to the index of the item being dragged and applies a 'dragged' class to the element for styling.

```ts
@HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {
    if (this.canDrag) {
      event.dataTransfer?.setData('text/plain', this.appDragDrop.toString());
      this.renderer.addClass(this.el.nativeElement, 'dragged');
    }
  }
```

---

**`@HostListener('dragover', ['$event']) onDragOver(event: DragEvent)`**: This method handles the `dragover` event, which occurs when an element is being dragged over a valid drop target. It prevents the default behavior and emits the `dragOver` event with the index of the current item if dropping is allowed (``canDrop` is true).

```ts
@HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    if (this.canDrop) {
      event.preventDefault();
      this.dragOver.emit(this.appDragDrop);
    }
  }
```

---

**`@HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent)`**: This method handles the `dragleave` event, emitted when a dragged element leaves a valid drop target area. It emits the ``dragLeave` event to indicate the drag operation has left the target area.

```ts
@HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    this.dragLeave.emit();
  }
```

---

**`@HostListener('drop', ['$event']) onDrop(event: DragEvent)`**: This method handles the `drop` event, triggered when a dragged element is dropped onto a valid drop target. It prevents the default behavior, checks if dropping is allowed (`canDrop` is true), emits the `itemDropped` event with the index of the dropped item, and removes the 'dragged' class from the element.

```ts
@HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    if (this.canDrop) {
      const data = event.dataTransfer?.getData('text');
      if (data !== null) {
        this.itemDropped.emit(Number(data));
      }
      this.dragLeave.emit();
      this.renderer.removeClass(this.el.nativeElement, 'dragged');
    }
  }
```

## HTML Explanation for Lists in DraggableListComponent

`.list-container`: This div wraps the list of draggable items (`div.list-item`). Each item uses the `appDragDrop` directive to enable drag-and-drop functionality with specific event bindings (`canDrop, canDrag, itemDropped, dragOver, dragLeave, class.placeholder, class.no-drop`). These bindings and events are controlled by methods in the DragDropDirective.

```html
<div class="list-container">
  <div
    *ngFor="let item of updatedItems; let i = index"
    [appDragDrop]="i"
    [canDrop]="canDropItem(i)"
    [canDrag]="canDragItem(i)"
    (itemDropped)="onItemDropped($event, i)"
    (dragOver)="onDragOver(i)"
    (dragLeave)="onDragLeave()"
    [class.placeholder]="dragOverIndex === i && canDropItem(i)"
    [class.no-drop]="!canDropItem(i)"
    class="list-item">
    {{ item }}
  </div>
</div>
```

---

This documentation provides a clear breakdown of the `DragDropDirective` code snippets and their functionality, followed by an explanation of the HTML structure used in the `DraggableListComponent` to implement drag-and-drop lists in an Angular application.
