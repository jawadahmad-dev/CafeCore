import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hero } from '../../Core/models/hero.model';
import { Rest } from '../../Services/rest';
import { Shared } from '../../Services/shared';

@Component({
  selector: 'app-update-home',
  imports: [ReactiveFormsModule],
  templateUrl: './update-home.html',
  styleUrl: './update-home.scss',
})
export class UpdateHome implements OnInit {
  heroForm!: FormGroup;
  fb = inject(FormBuilder);
  restService = inject(Rest);
  sharedService = inject(Shared);

  heroData: Hero | null = null;
  imagePreview = '';
  isUploading = false;
  isSaving = false;
  saveSuccess = false;
  saveError = '';

  ngOnInit(): void {
    this.formInit();
    setTimeout(() => this.loadHeroData());
  }

  formInit() {
    this.heroForm = this.fb.group({
      heading: ['', Validators.required],
      image: [''],
      desc: ['', Validators.required],
    });
  }

  loadHeroData() {
    this.restService.getHero().then((snap) => {
      if (snap.exists()) {
        const data = snap.val() as Hero;
        this.heroData = data;
        this.heroForm.patchValue(data);
        this.imagePreview = data.image;
      }
    }).catch((err) => {
      this.sharedService.toaster('error', 'Load Error', err.message);
    });
  }

  onSubmit() {
    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.saveSuccess = false;
    this.saveError = '';

    const payload: Hero = this.heroForm.value;

    this.restService.setHero(payload).then(() => {
      this.isSaving = false;
      this.saveSuccess = true;
      this.sharedService.toaster('success', 'Saved!', 'Hero section updated successfully.');
    }).catch((err) => {
      this.isSaving = false;
      this.saveError = err.message ?? 'Failed to save. Please try again.';
      this.sharedService.toaster('error', 'Save Error', this.saveError);
    });
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.uploadImage(input.files[0]);
  }

  uploadImage(file: File) {
    this.isUploading = true;
    this.restService.uploadImage(file).subscribe({
      next: (res: any) => {
        this.heroForm.patchValue({ image: res.secure_url });
        this.imagePreview = res.secure_url;
        this.isUploading = false;
      },
      error: (err) => {
        this.isUploading = false;
        this.sharedService.toaster('error', 'Upload Error', err.message);
      },
    });
  }

  resetPreview() {
    this.imagePreview = this.heroData?.image ?? '';
    this.heroForm.patchValue({ image: this.heroData?.image ?? '' });
  }
}
