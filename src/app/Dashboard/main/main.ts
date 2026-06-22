import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth';
import { Rest, MenuItem } from '../../Services/rest';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main implements OnInit {
  authService = inject(AuthService);
  restService = inject(Rest);
  fb = inject(FormBuilder);

  menuForm!: FormGroup;
  menuItems: MenuItem[] = [];
  isEditing = false;
  editingId: string | null = null;
  formError = '';
  formSuccess = '';
  isFormSubmitting = false;

  // Categories helper
  categories = [
    { value: 'bread', label: 'Sourdough Loaves' },
    { value: 'pastries', label: 'Fika Pastries' },
    { value: 'coffee', label: 'Slow Coffee' }
  ];

  ngOnInit(): void {
    this.initForm();
    this.loadMenuItems();
  }

  initForm(): void {
    this.menuForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['bread', [Validators.required]],
      badge: ['']
    });
  }

  loadMenuItems(): void {
    this.restService.GetMenue().subscribe({
      next: (items) => {
        this.menuItems = items;
      },
      error: (err) => {
        console.error('Failed to load menu items:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.menuForm.invalid) {
      this.menuForm.markAllAsTouched();
      return;
    }

    this.isFormSubmitting = true;
    this.formError = '';
    this.formSuccess = '';

    const formValue = this.menuForm.value;
    const itemData: MenuItem = {
      name: formValue.name.trim(),
      price: Number(formValue.price),
      description: formValue.description.trim(),
      category: formValue.category,
      badge: formValue.badge ? formValue.badge.trim() : undefined
    };

    if (this.isEditing && this.editingId) {
      this.restService.UpdateMenu(this.editingId, itemData).subscribe({
        next: () => {
          this.isFormSubmitting = false;
          this.formSuccess = 'Menu item updated successfully!';
          this.resetForm();
          this.loadMenuItems();
        },
        error: (err) => {
          this.isFormSubmitting = false;
          this.formError = 'Failed to update menu item. Please try again.';
          console.error(err);
        }
      });
    } else {
      this.restService.addMenue(itemData).subscribe({
        next: () => {
          this.isFormSubmitting = false;
          this.formSuccess = 'Menu item added successfully!';
          this.resetForm();
          this.loadMenuItems();
        },
        error: (err) => {
          this.isFormSubmitting = false;
          this.formError = 'Failed to add menu item. Please try again.';
          console.error(err);
        }
      });
    }
  }

  editItem(item: MenuItem): void {
    if (!item.id) return;
    this.isEditing = true;
    this.editingId = item.id;
    this.formError = '';
    this.formSuccess = '';
    
    this.menuForm.patchValue({
      name: item.name,
      price: item.price,
      description: item.description,
      category: item.category,
      badge: item.badge || ''
    });
  }

  deleteItem(id: string | undefined): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this menu item?')) {
      this.restService.DeleteMenue(id).subscribe({
        next: () => {
          this.loadMenuItems();
          if (this.editingId === id) {
            this.resetForm();
          }
        },
        error: (err) => {
          console.error('Failed to delete menu item:', err);
        }
      });
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.editingId = null;
    this.menuForm.reset({
      category: 'bread',
      badge: ''
    });
  }
}
