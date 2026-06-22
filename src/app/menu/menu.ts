import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { Rest, MenuItem } from '../Services/rest';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {
  restService = inject(Rest);

  // Menu Category Filter
  currentFilter = signal<string>('all');

  // Menu items list
  menuItems = signal<MenuItem[]>([]);

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems(): void {
    this.restService.GetMenue().subscribe({
      next: (items) => {
        this.menuItems.set(items);
      },
      error: (err) => {
        console.error('Failed to load menu items:', err);
      }
    });
  }

  // Computed signal to filter menu items dynamically
  filteredMenuItems = computed(() => {
    const filter = this.currentFilter();
    if (filter === 'all') {
      return this.menuItems();
    }
    return this.menuItems().filter(item => item.category === filter);
  });

  setFilter(category: string) {
    this.currentFilter.set(category);
  }
}
