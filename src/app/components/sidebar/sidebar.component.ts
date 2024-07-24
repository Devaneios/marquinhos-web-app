import { DOCUMENT, NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  Input,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar',
  imports: [NgFor],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  host: {
    class: 'app-sidebar',
    '[class.app-sidebar-collapsed]': 'collapsed',
  },
})
export class SidebarComponent implements OnInit {
  @Output() collapseChange = new EventEmitter<boolean>();
  @Output() itemChange = new EventEmitter<string>();

  @Input() collapsed = true;
  @Input() selected = '';
  @Input() options = [
    { id: 'profile', icon: 'account', label: 'Perfil' },
    { id: 'lastfm', icon: 'music-note', label: 'Lastfm' },
    { id: 'settings', icon: 'settings', label: 'Ajustes' },
    { id: 'logout', icon: 'logout', label: 'Sair' },
  ];
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
    this.selected = item.id;
    this.itemChange.emit(item.id);
  }
}
