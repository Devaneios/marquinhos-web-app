interface PrivacySecion {
  title: string;
  body: string;
}

export interface PrivacyPolicy {
  title: string;
  date: string;
  body: string;
  sections: PrivacySecion[];
}
