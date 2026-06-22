import { inject, Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser
} from '@angular/fire/auth';
import { Database, ref, get, set } from '@angular/fire/database';
import { AppUser } from '../Core/models';
import { DataSnapshot } from 'firebase/database';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly db = inject(Database);
  private readonly router = inject(Router);

  // ----- Signals -----
  private readonly _currentUser = signal<AppUser | null>(this.loadFromStorage());
  readonly currentUser = this._currentUser.asReadonly();
  readonly isLoggedIn = computed(() => this._currentUser() !== null);
  readonly isAdmin = computed(() => this._currentUser()?.role === 'admin');
  readonly isManager = computed(() =>
    this._currentUser()?.role === 'admin' || this._currentUser()?.role === 'manager'
  );



  constructor() {


    // Keep the signal in sync with Firebase Auth state after page refreshes.
    onAuthStateChanged(this.auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const profile = await this.fetchUserProfile(firebaseUser.uid);
        if (profile) {
          this._currentUser.set(profile);
          this.saveToStorage(profile);
        } else {
          // Profile missing or deactivated — force logout
          await signOut(this.auth);
          this._currentUser.set(null);
          this.clearStorage();
        }
      } else {
        this._currentUser.set(null);
        this.clearStorage();
      }
    });
  }

  // ----- Public API -----





  hasRole(...roles: AppUser['role'][]): boolean {
    const role = this._currentUser()?.role;
    return role ? roles.includes(role) : false;
  }

  // ----- Private helpers -----

  private async fetchUserProfile(uid: string): Promise<AppUser | null> {
    const snap = await get(ref(this.db, `users/${uid}`));
    if (!snap.exists()) return null;
    return { uid, ...snap.val() } as AppUser;
  }

  private saveToStorage(user: AppUser): void {
    try {
      localStorage.setItem('app_user', JSON.stringify(user));
    } catch { /* ignore quota errors */ }
  }

  private clearStorage(): void {
    localStorage.removeItem('app_user');
  }

  private loadFromStorage(): AppUser | null {
    try {
      const raw = localStorage.getItem('app_user');
      return raw ? (JSON.parse(raw) as AppUser) : null;
    } catch {
      return null;
    }
  }
}
