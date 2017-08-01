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
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var sticky_element_directive_1 = require("./sticky_element_directive");
var StickyTdLeftDirective = (function (_super) {
    __extends(StickyTdLeftDirective, _super);
    function StickyTdLeftDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StickyTdLeftDirective.prototype.handleHorizontalScrollEvent = function (event) {
        var leftOffset = event.target.scrollLeft;
        this.elements.forEach(function (el) {
            el.style.left = leftOffset + 'px';
        });
    };
    return StickyTdLeftDirective;
}(sticky_element_directive_1.StickyElementDirective));
StickyTdLeftDirective = __decorate([
    core_1.Directive({ selector: '[sticky-td-left]' })
], StickyTdLeftDirective);
exports.StickyTdLeftDirective = StickyTdLeftDirective;
//# sourceMappingURL=sticky_td_left.directive.js.map