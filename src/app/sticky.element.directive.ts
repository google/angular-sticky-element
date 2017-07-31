/*
Copyright 2017 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import {Input} from '@angular/core';
import {AfterViewInit, Directive, ElementRef} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

@Directive({selector: '[sticky-element]'})
export class StickyElementDirective implements AfterViewInit {
  /**
   * Required
   * Css selector for the element responsible for horizontal scrolling.
   */
  @Input() horizontalScrollSelector: string;

  /**
   * Required
   * Css selector for the element responsible for vertical scrolling.
   */
  @Input() verticalScrollSelector: string;

  /**
   * Required
   * Css selector for the element(s) that you want to stick to the side.
   */
  @Input() elementSelector: string;

  // References to the DOM elements responsible for scrolling, controlling stick
  // behavior, and the elements to be stuck, respectively.
  horizontalScrollElement: HTMLElement;
  verticalScrollElement: HTMLElement;
  stickyParentElement: HTMLElement;
  elements: HTMLElement[];

  /**
   * __Don't use this class__
   * Use a derived class for any behavioral stuff. This class is purely common
   * functionality between different stick element directives.
   * @param element
   */
  constructor(element: ElementRef) {
    this.stickyParentElement = element.nativeElement;
  }

  /**
   * Angular2 lifecycle hook to be called after the view side has been
   * initialized. This is necessary because we're querying for DOM elements.
   */
  ngAfterViewInit(): void {
    const parentQuerySubscription =
        Observable.timer(100, 100).subscribe((_) => {
          if (!this.queryForScrollParent()) {
            console.error(
                'Couldn\'t find scrollable parent for sticky element: ' +
                this.stickyParentElement.tagName + '\nretrying.');
            return;
          } else {
            parentQuerySubscription.unsubscribe();
          }
        });
    const elementsQuerySubscription =
        Observable.timer(100, 100).subscribe((_) => {
          if (!this.queryForElements()) {
            console.error(
                'Couldn\'t find sticky elements for parent: ' +
                this.stickyParentElement.tagName + '\nretrying.');
            return;
          } else {
            elementsQuerySubscription.unsubscribe();
          }
        });
  }

  /**
   * Debounced scroll handler, to be implemented in derived classes.
   * @param event
   */
  handleHorizontalScrollEvent(event: UIEvent): void {}

  /**
   * Debounced scroll handler, to be implemented in derived classes.
   * @param event
   */
  handleVerticalScrollEvent(event: UIEvent): void {}

  /**
   * Query for element that will be scrolled.
   * @returns True if the query was successful.
   */
  protected queryForScrollParent(): boolean {
    const document = this.stickyParentElement.ownerDocument;
    this.horizontalScrollElement =
        document.querySelector(this.horizontalScrollSelector) as HTMLElement;
    this.verticalScrollElement =
        document.querySelector(this.verticalScrollSelector) as HTMLElement;

    if (!this.horizontalScrollElement || !this.verticalScrollElement) {
      return false;
    }

    Observable.fromEvent(this.horizontalScrollElement, 'scroll')
        .debounce((_) => Observable.interval(50))
        .subscribe((ev: UIEvent) => {
          this.handleHorizontalScrollEvent(ev);
        });

    Observable.fromEvent(this.verticalScrollElement, 'scroll')
        .debounce((_) => Observable.interval(50))
        .subscribe((ev: UIEvent) => {
          this.handleVerticalScrollEvent(ev);
        });

    return true;
  }

  /**
   * Query for elements to be stuck.
   * @returns True if the query was successful.
   */
  protected queryForElements(): boolean {
    const document = this.stickyParentElement.ownerDocument;
    const nodeList = document.querySelectorAll(this.elementSelector);

    this.elements = [];
    for (let i = 0; i < nodeList.length; i++) {
      const node = nodeList.item(i) as HTMLElement;
      this.elements.push(node as HTMLElement);
    }

    return this.elements != null;
  }
}
