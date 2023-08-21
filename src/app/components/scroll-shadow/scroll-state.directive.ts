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

    fromEvent(this.hostElement, 'scroll')
      .pipe(auditTime(this.auditTimeMs), takeUntil(this.destroy$))
      .subscribe(() => {
        this.setClasses();
      });
  }

  public ngAfterContentInit(): void {
    setTimeout(() => this.setClasses(), 500);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setClasses() {
    const canScrollUp = this.hostElement.scrollTop > 0;
    const canScrollDown =
      this.hostElement.scrollTop + this.hostElement.clientHeight <
      this.hostElement.scrollHeight;

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
