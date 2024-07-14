import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PrivacyPolicyDialogComponent } from 'src/app/components/privacy-policy-dialog/privacy-policy-dialog.component';
import { MiscService } from 'src/app/core/services/misc.service';
import { LastfmStoryComponent } from 'src/app/components/lastfm-story/lastfm-story.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatDialogModule, PrivacyPolicyDialogComponent],
  template: `
    <header>
      <h1>Bem-vindo ao MarquinhosBOT!</h1>
      <p>Seu parceiro no Discord</p>
    </header>
    <section id="content">
      <p>
        O MarquinhosBOT é um assistente multifuncional para o seu servidor do
        Discord. Oferecemos uma variedade de recursos para ajudar a manter seu
        servidor organizado e interativo.
      </p>
      <p>
        Além disso, nossa funcionalidade musical permite que você acompanhe
        todas as músicas tocadas por outros bots diretamente na sua conta do
        Last.fm.
      </p>
      <p>
        Para mais detalhes sobre como coletamos, usamos e protegemos suas
        informações, leia nossa
        <a class="privacy-policy" (click)="openPrivacyPolicy()"
          >Política de Privacidade</a
        >.
      </p>
    </section>
    <footer>
      <p>
        Deseja saber mais? Junte-se ao nosso servidor no Discord:
        <a href="https://discord.gg/RKWBudnFe"
          >Link para o servidor do Devaneios</a
        >.
      </p>
    </footer>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: #fff;

        header {
          text-align: center;
          margin-bottom: 2rem;

          h1 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
          }

          p {
            font-size: 1.2rem;
            color: #aaa;
          }
        }

        #content {
          width: 100%;
          max-width: 750px;
          padding: 0 1rem;

          h2 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
          }

          p {
            font-size: 1.2rem;
            margin-bottom: 1rem;
          }

          ul {
            margin-left: 1rem;
            margin-bottom: 1rem;
          }

          li {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
          }

          .privacy-policy {
            color: #fff;
            text-decoration: underline;
            cursor: pointer;
          }
        }

        footer {
          font-size: 1.2rem;
          color: #aaa;
          text-align: center;
          margin-top: 2rem;

          p {
            margin-bottom: 0.5rem;
          }
        }
      }
    `,
  ],
})
export class HomeComponent {
  private miscService = inject(MiscService);
  private dialog = inject(MatDialog);

  async openPrivacyPolicy() {
    this.dialog.open(PrivacyPolicyDialogComponent, {
      data: {
        privacyPolicy: await this.miscService.getPrivacyPolicy(),
        showActions: false,
      },
      maxWidth: '750px',
    });
  }

  async openImageGenerator() {
    this.dialog.open(LastfmStoryComponent, {
      data: {},
      width: '360px',
    });
  }
}
