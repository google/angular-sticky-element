Angular Sticky Element
======================
A dynamic element that'll stick to walls, ceilings, and your heart.

Usage
-----
Add the package to your dependencies.

`npm install --save angular-sticky-element`

Compile the library
1. Download or clone this repository.
2. Link the included module with your angular project.
3. Create a create a sticky-element of your own by subclassing the
sticky_element_directive.ts, or use one of the included ones.
4. To include a sticky-element, use directive syntax in one of your templates.
To see required arguments, refer to the self-documenting code+comments
inside sticky_element_directive.ts.

Create your own
---------------
1. Subclass sticky_element_directive.ts.
2. Most of the behavior of a sticky_x.ts can be defined by the two handle
scroll events (horizontal+vertical).
3. Refer to existing subclasses for behavior hints.
4. When you're done with your new sticky element, add it to the module so the
rest of your project can see it.
