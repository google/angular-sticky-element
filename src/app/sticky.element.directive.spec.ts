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

import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StickyElementDirective} from './sticky.element.directive';

@Component({
  selector: 'mock-sticky-element-component',
  template: `<html>
              <body>
                <style>
                #main {
                  background-color: green;
                  width: 3000px;
                  height: 3000px;
                }
                </style>
                <div id="main">
                  <div sticky-element horizontalScrollSelector="#main" verticalScrollSelector="#main" elementSelector=".stick-me">
                    <!-- note 3 elements should be queried -->
                    <span class="stick-me">hello</span>
                    <span class="stick-me">hello</span>
                    <span class="stick-me">hello</span>
                  </div>
                </div>
              </body>
             </html>`
})
class MockStickyElementComponent {
}

describe('Sticky Element Directive', () => {
  let fixture: ComponentFixture<MockStickyElementComponent>;
  let directive: StickyElementDirective;


  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          declarations: [
            MockStickyElementComponent,
            StickyElementDirective,
          ],
        })
        .compileComponents();
    fixture = TestBed.createComponent(MockStickyElementComponent);

    const directiveEl =
        fixture.debugElement.query(By.directive(StickyElementDirective));
    expect(directiveEl).not.toBeNull();

    directive = directiveEl.injector.get(StickyElementDirective);
    expect(directive).not.toBeNull();
  }));

  it('Should query scroll parents', async(() => {
       fixture.detectChanges();
       fixture.whenStable().then(() => {
         expect(directive.horizontalScrollSelector).toEqual('#main');
         expect(directive.verticalScrollSelector).toEqual('#main');
         expect(directive.horizontalScrollElement).not.toBeNull();
         expect(directive.verticalScrollElement).not.toBeNull();
       });
     }));

  it('Should query elements to stick', async(() => {
       fixture.detectChanges();
       fixture.whenStable().then(() => {
         expect(directive.elementSelector).toEqual('.stick-me');
         expect(directive.elements).not.toBeNull();
         expect(directive.elements.length).toEqual(3);
       });
     }));
});