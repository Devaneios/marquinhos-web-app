import { DOCUMENT, NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  Input,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SidebarItem } from '../../core/types/sidebar-item.type';
import { SvgIconDirective } from '../svg-icon/svg-icon.directive';

@Component({
  selector: 'app-sidebar',
  imports: [NgFor, NgIf, SvgIconDirective],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  host: {
    class: 'app-sidebar',
  },
})
export class SidebarComponent implements OnInit {
  @Output() collapseChange = new EventEmitter<boolean>();
  @Output() itemChange = new EventEmitter<SidebarItem>();

  @Input() collapsed = true;
  @Input() selected = '';
  @Input() options: SidebarItem[] = [];
  @Input() mobile = false;

  private readonly _breakpointObserver = inject(BreakpointObserver);

  constructor() {}

  ngOnInit() {
    this._breakpointObserver
      .observe('(min-width: 768px)')
      .subscribe((state) => {
        if (!state.matches) {
          this.mobile = true;
        }
      });
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.collapseChange.emit(this.collapsed);
  }

  onItemClick(item: any) {
    this.collapsed = true;
    this.itemChange.emit(item);
    this.collapseChange.emit(this.collapsed);
  }

  onHomeClick() {
    this.itemChange.emit({ id: 'home', icon: 'home', label: 'Início' });
    this.collapsed = true;
    this.collapseChange.emit(this.collapsed);
  }

  onBackdropClick() {
    if (this.mobile) {
      this.toggleSidebar();
    }
  }
}
