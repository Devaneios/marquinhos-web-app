import { Directive, ElementRef, inject, Input } from '@angular/core';
import { completeIconSet } from './marquinhos-icons';

@Directive({
  selector: 'svg-icon',
  standalone: true,
})
export class SvgIconDirective {
  @Input() set appSvgIcon(iconName: string) {
    if (completeIconSet.find((iconSet) => iconSet.name === iconName)) {
      this._elementRef.nativeElement.innerHTML =
        completeIconSet.find((iconSet) => iconSet.name === iconName)?.data ||
        '';
    }
  }

  private readonly _elementRef = inject(ElementRef);
}
