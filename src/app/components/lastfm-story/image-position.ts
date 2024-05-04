export class ImageDetails {
  name: string;
  url: string;
  x: number;
  y: number;

  constructor({ name, url, x, y }: Details) {
    this.name = name;
    this.url = url;
    this.x = x;
    this.y = y;
  }
}

interface Details {
  name: string;
  url: string;
  x: number;
  y: number;
}
