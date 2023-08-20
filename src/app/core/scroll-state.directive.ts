import {
  Directive,
  Input,
  ViewContainerRef,
  OnDestroy,
  HostBinding,
  AfterContentInit,
} from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, auditTime, startWith } from 'rxjs/operators';

@Directive({
  selector: '[scrollState]',
  standalone: true,
})
export class ScrollStateDirective implements OnDestroy, AfterContentInit {
  @Input() canScrollUpClass: string = 'can-scroll-up';
  @Input() canScrollDownClass: string = 'can-scroll-down';
  @Input() auditTimeMs: number = 125;

  private readonly destroy$: Subject<void> = new Subject();
  private readonly hostElement: HTMLElement;

  constructor(readonly vcRef: ViewContainerRef) {
    this.hostElement = vcRef.element.nativeElement;

    // TODO: handle host height changes as well
    fromEvent(this.hostElement, 'scroll')
      .pipe(auditTime(this.auditTimeMs), takeUntil(this.destroy$))
      .subscribe(() => {
        this.setClasses();
      });
  }

  // Alternatively use HostListener instead of fromEvent to listen to scroll event, but HostListener triggers CD on each scroll and you still have to add an observable to debounce it
  // @HostListener('scroll')

  public ngAfterContentInit(): void {
    setTimeout(() => this.setClasses(), 500);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setClasses() {
    // TODO: check if margins/paddings have to be included in these calculations
    const canScrollUp = this.hostElement.scrollTop > 0;
    const canScrollDown =
      this.hostElement.scrollTop + this.hostElement.clientHeight <
      this.hostElement.scrollHeight;

    console.log(
      this.hostElement.scrollTop,
      this.hostElement.clientHeight,
      this.hostElement.scrollHeight,
    );

    // TODO: make setting and removing classes platform-agnostic (use Renderer2)
    this.hostElement.classList.remove(this.canScrollDownClass);
    this.hostElement.classList.remove(this.canScrollUpClass);

    if (this.canScrollUpClass && canScrollUp) {
      this.hostElement.classList.add(this.canScrollUpClass);
    }

    if (this.canScrollDownClass && canScrollDown) {
      this.hostElement.classList.add(this.canScrollDownClass);
    }
  }
}
