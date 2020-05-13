import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  //This selector for the hostBinding will work only on Bootstrap 3. From Bootstrap 4+, it won't work.
  //Why? The open class used by Bootstrap 3 was removed.
  //This class seems not to be documented, since it's normally used by bootstrap under the hood.
  //Please visit, https://developer.mozilla.org/en-US/docs/Web/API/Element/className.
  @HostBinding('class.open') isOpen: boolean;

  //The ElementRef type is used to identify your element attached to.
  constructor(private elementRef: ElementRef) { }

  //We listen to any click on the document DOM and then see if the target is inside of our native element.
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
}
