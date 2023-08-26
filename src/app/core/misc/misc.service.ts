import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PrivacyPolicy } from 'src/app/types/privacy-policy.interface';

@Injectable({
  providedIn: 'root',
})
export class MiscService {
  private httpClient = inject(HttpClient);
  constructor() {}

  async getPrivacyPolicy(): Promise<PrivacyPolicy | null> {
    const response = await firstValueFrom(
      this.httpClient.get(`${environment.apiUrl}/privacy-policy`),
      { defaultValue: null },
    );

    return response as PrivacyPolicy | null;
  }
}
