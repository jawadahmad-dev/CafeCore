import { Injectable, Injector, runInInjectionContext, inject } from '@angular/core';
import {
  Database,
  ref,
  get,
  set,
  push,
  update,
  remove,
  DataSnapshot
} from '@angular/fire/database';
import { from, map, Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { Shared } from './shared';
import { HttpClient } from '@angular/common/http';

// ── Domain models ──────────────────────────────────────────────────────────
export interface MenuItem {
  id?: string;
  name: string;
  price: number;
  description: string;
  category: string;
  badge?: string;
}

// ── Service ─────────────────────────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class Rest {
  private readonly db = inject(Database);
  private readonly injector = inject(Injector);
  private readonly auth = inject(Auth)
  private readonly sharedService = inject(Shared)
  private http = inject(HttpClient)

  // seedAdmin() {
  //   push(ref(this.db, `users}`), {
  //     email: 'nordic@ex.com',
  //     name: 'Jawad Ahmad',
  //     role: 'admin',
  //     password: this.sharedService.EnCrypt("Nordic321")
  //   });
  // }

  // ── MENU (existing public storefront data) ─────────────────────────────

  getUsers(): Promise<DataSnapshot> {
    this.sharedService.show()
    return get(ref(this.db, `users}`)).finally(() => {
      this.sharedService.hide()
    })
  }
  setLogin(data: { role: string, email: string, loggedIn: boolean, name: string }): Promise<void> {
    this.sharedService.show()
    return set(ref(this.db, 'auth'), data).finally(() => {
      this.sharedService.hide()
    })
  }
  getLoggedInUser(): Promise<DataSnapshot> {
    this.sharedService.show()
    return get(ref(this.db, 'auth')).finally(() => {
      this.sharedService.hide()
    })
  }

  addMenue(item: MenuItem) {
    this.sharedService.show()
    return from(
      runInInjectionContext(this.injector, () => {
        const newRef = push(ref(this.db, 'menue'));
        return set(newRef, item);
      }).finally(() => {
        this.sharedService.hide()
      })
    );
  }

  UpdateMenu(id: string, item: MenuItem) {
    this.sharedService.show()
    return from(
      runInInjectionContext(this.injector, () =>
        update(ref(this.db, `menue/${id}`), item as unknown as Record<string, unknown>)
      )
    );
  }

  GetMenue() {
    return from(
      runInInjectionContext(this.injector, () =>
        get(ref(this.db, 'menue'))
      )
    ).pipe(
      map(snap => {
        if (!snap.exists()) return [] as MenuItem[];
        const val = snap.val() as Record<string, MenuItem>;
        return Object.keys(val).map(key => ({ ...val[key], id: key }));
      })
    );
  }

  DeleteMenue(id: string) {
    return from(
      runInInjectionContext(this.injector, () =>
        remove(ref(this.db, `menue/${id}`))
      )
    );
  }



  // ── Hero Section ─────────────────────────────────────────────────────────

  getHero(): Promise<DataSnapshot> {
    this.sharedService.show();
    return get(ref(this.db, 'hero')).finally(() => {
      this.sharedService.hide();
    });
  }

  setHero(data: { heading: string; desc: string; image: string }): Promise<void> {
    this.sharedService.show();
    return set(ref(this.db, 'hero'), data).finally(() => {
      this.sharedService.hide();
    });
  }

  // ImageUpload To Cloudinary
  uploadImage(file: File) {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'nordic_crumb');

    return this.http.post(
      'https://api.cloudinary.com/v1_1/dsyszhzvu/image/upload',
      formData
    );
  }

  sendContactForm(payload: any): Observable<any> {
    return this.http.post('https://api.web3forms.com/submit', payload);
  }
}
