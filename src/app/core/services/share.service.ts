import { Injectable, inject } from '@angular/core';
import { ShareResult } from '../types/share-result.type';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  async shareBlobAsPng(blob: Blob, filename: string): Promise<ShareResult> {
    try {
      if (navigator.share) {
        const imageFile = new File([blob], `${filename}.png`, {
          type: 'image/png',
          lastModified: new Date().getTime(),
        });

        await navigator.share({
          files: [imageFile],
        });
        return 'success';
      } else {
        console.log('Web Share API is not supported in this browser.');
        return 'unsupported';
      }
    } catch (error) {
      return 'error';
    }
  }
}
