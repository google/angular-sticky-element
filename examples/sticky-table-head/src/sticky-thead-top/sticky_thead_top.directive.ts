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

import {Directive} from '@angular/core';

import {getOffset} from './dom_utils';
import {StickyElementDirective} from './sticky_element_directive';

@Directive({selector: '[sticky-thead-top]'})
export class StickyTheadTopDirective extends StickyElementDirective {
  handleVerticalScrollEvent(event: UIEvent): void {
    this.elements.forEach((el: HTMLElement) => {
      const topOffset = getOffset(el.parentNode as HTMLElement).top;

      if ((topOffset + el.clientHeight) < 0) {
        el.style.position = 'fixed';
        el.style.top = 0 + 'px';
      } else {
        el.style.position = 'relative';
        el.style.top = 0 + 'px';
      }
    });
  }

  handleHorizontalScrollEvent(event: UIEvent): void {
    this.elements.forEach((el: HTMLElement) => {
      const leftOffset = (event.target as HTMLElement).scrollLeft;
      el.style.left = (-leftOffset) + 'px';
    });
  }
}
