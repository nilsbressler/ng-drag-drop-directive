import { Component } from '@angular/core';

/**
 * Component to display and manage a list of items with drag and drop functionality.
 * Updates the order of items based on drag and drop interactions.
 */
@Component({
  selector: 'app-draggable-list',
  templateUrl: './draggable-list.component.html',
  styleUrl: './draggable-list.component.scss',
})
export class DraggableListComponent {
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];
  updatedItems = [...this.items];
  dragOverIndex: number | null = null;

  /**
   * Handles the item dropped event.
   * Updates the list by moving the dragged item to the dropped position.
   */
  onItemDropped(draggedIndex: number, droppedIndex: number) {
    const movedItem = this.updatedItems.splice(draggedIndex, 1)[0];
    this.updatedItems.splice(droppedIndex, 0, movedItem);
    this.dragOverIndex = null;
  }

  /**
   * Handles the drag over event.
   * Sets the index where the item is currently dragged over.
   */
  onDragOver(index: number) {
    this.dragOverIndex = index;
  }

  /**
   * Handles the drag leave event.
   * Resets the drag over index.
   */
  onDragLeave() {
    this.dragOverIndex = null;
  }

  /**
   * Determines if an item can be dropped at the specified index.
   * Prevents dropping at the first and last positions.
   */
  canDropItem(droppedIndex: number): boolean {
    return droppedIndex !== 0 && droppedIndex !== this.updatedItems.length - 1;
  }

  /**
   * Determines if an item can be dragged.
   * Prevents dragging of items at the first and last positions.
   */
  canDragItem(index: number): boolean {
    return index !== 0 && index !== this.updatedItems.length - 1;
  }
}
