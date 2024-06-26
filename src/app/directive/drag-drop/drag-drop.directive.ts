import {
  Directive,
  HostListener,
  HostBinding,
  EventEmitter,
  Output,
  Input,
  Renderer2,
  ElementRef,
} from '@angular/core';

/**
 * Directive to enable drag and drop functionality on list items.
 * It handles drag start, drag over, drag leave, and drop events.
 * Allows customization of drop eligibility through the 'canDrop' input property.
 */
@Directive({
  selector: '[appDragDrop]',
})
export class DragDropDirective {
  @Input() appDragDrop: number = 0;
  @Input() canDrop: boolean = true;
  @Input() canDrag: boolean = true;
  @Output() itemDropped: EventEmitter<number> = new EventEmitter<number>();
  @Output() dragOver: EventEmitter<number> = new EventEmitter<number>();
  @Output() dragLeave: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  /**
   * Sets the element to be draggable based on the canDrag input.
   */
  @HostBinding('draggable')
  get draggable() {
    return this.canDrag;
  }

  /**
   * Handles the drag start event.
   * Sets the dragged item's index as the drag data.
   */
  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {
    if (this.canDrag) {
      event.dataTransfer?.setData('text/plain', this.appDragDrop.toString());
      this.renderer.addClass(this.el.nativeElement, 'dragged');
    }
  }

  /**
   * Handles the drag over event.
   * Emits the drag over event if the drop is allowed.
   */
  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    if (this.canDrop) {
      event.preventDefault();
      this.dragOver.emit(this.appDragDrop);
    }
  }

  /**
   * Handles the drag leave event.
   * Emits the drag leave event.
   */
  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    this.dragLeave.emit();
  }

  /**
   * Handles the drop event.
   * Emits the item dropped event if the drop is allowed.
   */
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
}
