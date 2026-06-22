import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hero } from '../../Core/models/hero.model';
import { Rest } from '../../Services/rest';
import { Shared } from '../../Services/shared';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-update-home',
  imports: [ReactiveFormsModule, TextareaModule, ButtonModule, CardModule, InputTextModule],
  templateUrl: './update-home.html',
  styleUrl: './update-home.scss',
})
export class UpdateHome implements OnInit {
  heroForm!: FormGroup;
  fb = inject(FormBuilder);
  restService = inject(Rest);
  sharedService = inject(Shared)
  heroData: Hero | null = null;
  imagePreview = '';
  isUploading = false;

  ngOnInit(): void {
    this.formInit();
    this.getHeroDate();
  }
  getHeroDate() {

    if (this.heroData) {
      this.heroForm.patchValue(this.heroData);
      this.imagePreview = this.heroData.image;
    }
  }
  formInit() {
    this.heroForm = this.fb.group({
      heading: ['', Validators.required],
      image: ['', Validators.required],
      desc: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched();
      return;
    }

    const payload: Hero = this.heroForm.value;

    console.log(payload);

  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const file = input.files[0];

    this.uploadImage(file);
  }
  uploadImage(file: File) {
    this.isUploading = true;
    this.restService.uploadImage(file).subscribe({
      next: (res: any) => {
        this.heroForm.patchValue({
          image: res.secure_url
        });
        this.imagePreview = res.secure_url;
        this.isUploading = false;
      },
      error: (err) => {
        this.isUploading = false;
        this.sharedService.toaster('error', 'Upload Error', err.message)
      }
    })
  }

}
