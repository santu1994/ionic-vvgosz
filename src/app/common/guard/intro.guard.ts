import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

export const INTRO_KEY = 'intro-seen';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {
  constructor(private router: Router, private storage: Storage) { }

  async canLoad(): Promise<boolean> {
    const hasSeenIntro = await this.storage.get(INTRO_KEY);
    if (hasSeenIntro) {
      return true;
    } else {
      this.router.navigateByUrl('/intro', { replaceUrl: true });
      return false;
    }
  }

}
