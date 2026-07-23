import { Component, signal } from '@angular/core';
import { CountUpComponent } from '../../components/count-up/count-up';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CountUpComponent],
  template: `
    <div class="page-container">
      <!-- Header -->
      <section class="page-header text-center">
        <div class="header-badge">NOVEDADES & REDES</div>
        <h1 class="page-title">Noticias & Instagram Feed</h1>
        <p class="page-subtitle">
          Mantente al día con las actividades comunitarias, eventos agendados y publicaciones recientes de nuestra cuenta oficial.
        </p>
      </section>

      <!-- Instagram Widget Integration Box -->
      <section class="instagram-widget-section">
        <div class="insta-box">
          <div class="insta-header">
            <div class="insta-profile">
              <div class="insta-avatar">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </div>
              <div class="insta-info">
                <h3 class="insta-handle">&#64;comunidad_tapalehui</h3>
                <span class="insta-sub">Instagram Oficial &bull; Morelos, MX</span>
              </div>
            </div>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="btn-follow-insta">
              Seguir en Instagram ↗
            </a>
          </div>

          <!-- Instagram Grid Feed -->
          <div class="insta-grid">
            @for (post of instaPosts; track post.id) {
              <div class="insta-post-card" (click)="openInstaModal(post)">
                <img [src]="post.image" [alt]="post.caption" class="insta-post-img" />
                <div class="insta-post-overlay">
                  <div class="insta-stats">
                    <span>❤️ <app-count-up [end]="post.likes"></app-count-up></span>
                    <span>💬 <app-count-up [end]="post.comments"></app-count-up></span>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Calendario de Eventos & Blog de Noticias -->
      <section class="eventos-blog-section">
        <div class="section-title-wrap">
          <span class="section-subtitle">AGENDA COMUNITARIA</span>
          <h2 class="section-title">Próximos Eventos & Talleres</h2>
        </div>

        <div class="eventos-grid">
          @for (evt of eventos; track evt.id) {
            <div class="evento-card">
              <div class="date-badge">
                <span class="date-day"><app-count-up [end]="evt.day"></app-count-up></span>
                <span class="date-month">{{ evt.month }}</span>
              </div>
              <div class="evento-info">
                <span class="evento-cat">{{ evt.category }}</span>
                <h3 class="evento-title">{{ evt.title }}</h3>
                <p class="evento-desc">{{ evt.desc }}</p>
                <div class="evento-meta">
                  <span>⏰ {{ evt.time }}</span>
                  <span>📍 {{ evt.location }}</span>
                </div>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Modal de Detalle de Instagram -->
      @if (selectedInstaPost()) {
        <div class="modal-backdrop" (click)="closeInstaModal()">
          <div class="modal-card" (click)="$event.stopPropagation()">
            <button class="modal-close" (click)="closeInstaModal()">✕</button>
            <div class="modal-grid">
              <div class="modal-img-wrap">
                <img [src]="selectedInstaPost()?.image" [alt]="selectedInstaPost()?.caption" />
              </div>
              <div class="modal-details">
                <div class="modal-user">
                  <div class="mini-avatar">T</div>
                  <strong>&#64;comunidad_tapalehui</strong>
                </div>
                <p class="modal-caption">{{ selectedInstaPost()?.caption }}</p>
                <div class="modal-footer-stats">
                  <span>❤️ {{ selectedInstaPost()?.likes }} Me gusta</span>
                  <span>📅 {{ selectedInstaPost()?.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 3rem 1.5rem 5rem;
      display: flex;
      flex-direction: column;
      gap: 4rem;
    }

    .text-center { text-align: center; }

    .header-badge {
      display: inline-block;
      padding: 0.35rem 0.9rem;
      border-radius: 20px;
      background: var(--color-terracotta-bg);
      color: var(--color-terracotta);
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      margin-bottom: 1rem;
    }

    .page-title {
      font-family: 'Outfit', sans-serif;
      font-size: 2.75rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 0.75rem;
    }

    .page-subtitle {
      font-size: 1.1rem;
      color: var(--text-muted);
      max-width: 700px;
      margin: 0 auto;
    }

    /* Instagram Widget */
    .insta-box {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 24px;
      padding: 2rem;
      box-shadow: 0 4px 16px rgba(0,0,0,.07);
    }

    .insta-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .insta-profile {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .insta-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #E1306C, #F77737);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .insta-handle {
      font-family: 'Outfit', sans-serif;
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--text-main);
    }

    .insta-sub {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .btn-follow-insta {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.65rem 1.5rem;
      border-radius: 30px;
      background: linear-gradient(135deg, #E1306C, #F77737);
      color: #ffffff;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.88rem;
      box-shadow: 0 4px 15px rgba(225, 48, 108, 0.4);
      transition: transform 0.18s ease, box-shadow 0.18s ease;
    }

    .btn-follow-insta:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 22px rgba(225, 48, 108, 0.50);
    }

    .insta-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.25rem;
    }

    .insta-post-card {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      aspect-ratio: 1;
      cursor: pointer;
    }

    .insta-post-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .insta-post-card:hover .insta-post-img {
      transform: scale(1.06);
    }

    .insta-post-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      opacity: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.2s;
    }

    .insta-post-card:hover .insta-post-overlay {
      opacity: 1;
    }

    .insta-stats {
      display: flex;
      gap: 1rem;
      color: #ffffff;
      font-weight: 700;
      font-size: 1rem;
    }

    /* Eventos */
    .section-subtitle {
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.12em;
      color: var(--color-brand-primary);
    }

    .section-title {
      font-family: 'Outfit', sans-serif;
      font-size: 2rem;
      font-weight: 800;
      color: var(--text-main);
      margin-top: 0.4rem;
    }

    .eventos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .evento-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 18px;
      padding: 1.5rem;
      display: flex;
      gap: 1.25rem;
      align-items: flex-start;
      box-shadow: 0 3px 10px rgba(0,0,0,.06);
      transition: box-shadow 0.22s ease, transform 0.22s ease;
    }

    .evento-card:hover {
      box-shadow: 0 8px 22px rgba(0,0,0,.11);
      transform: translateY(-2px);
    }

    .date-badge {
      background: var(--color-brand-gradient);
      color: #ffffff;
      border-radius: 14px;
      padding: 0.6rem 0.8rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 60px;
    }

    .date-day {
      font-family: 'Outfit', sans-serif;
      font-size: 1.6rem;
      font-weight: 800;
      line-height: 1;
    }

    .date-month {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
    }

    .evento-info {
      display: flex;
      flex-direction: column;
    }

    .evento-cat {
      font-size: 0.72rem;
      font-weight: 800;
      color: var(--color-terracotta);
      letter-spacing: 0.08em;
    }

    .evento-title {
      font-family: 'Outfit', sans-serif;
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--text-main);
      margin: 0.2rem 0 0.4rem;
    }

    .evento-desc {
      font-size: 0.85rem;
      color: var(--text-muted);
      line-height: 1.5;
      margin-bottom: 0.75rem;
    }

    .evento-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    /* Modal Insta */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(8px);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }

    .modal-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-highlight);
      border-radius: 20px;
      max-width: 800px;
      width: 100%;
      overflow: hidden;
      position: relative;
      box-shadow: 0 20px 60px rgba(0,0,0,0.25);
      animation: modalIn 0.28s cubic-bezier(0.34,1.56,0.64,1) both;
    }

    @keyframes modalIn {
      from { opacity: 0; transform: scale(0.9) translateY(20px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }

    .modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(0, 0, 0, 0.6);
      border: none;
      color: #ffffff;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      z-index: 10;
    }

    .modal-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .modal-img-wrap {
      height: 380px;
    }

    .modal-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .modal-details {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: var(--text-main);
    }

    .modal-user {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .mini-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--color-brand-primary);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
    }

    .modal-caption {
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.6;
    }

    .modal-footer-stats {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid var(--border-color);
      padding-top: 1rem;
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    @media (max-width: 700px) {
      .modal-grid {
        grid-template-columns: 1fr;
      }
      .modal-img-wrap {
        height: 250px;
      }
    }
  `]
})
export class NoticiasComponent {
  selectedInstaPost = signal<any | null>(null);

  instaPosts = [
    {
      id: 1,
      image: 'assets/image2.jpeg',
      caption: '🌱 Amanecer en las Casas-Huerta de La Vista. La neblina sobre los bio-huertos nos regala una jornada llena de vida.',
      likes: 142,
      comments: 18,
      date: 'Hace 1 día'
    },
    {
      id: 2,
      image: 'assets/image3.jpeg',
      caption: '🐝 Taller comunitario de apicultura y conservación de abejas nativas en el Parque del Sapo. ¡Gracias a los asistentes!',
      likes: 215,
      comments: 34,
      date: 'Hace 3 días'
    },
    {
      id: 3,
      image: 'assets/image4.jpeg',
      caption: '🥦 Cosecha directa de la cooperativa La Tehuixtlera. Alimentos limpios para nuestra red de familias aliadas.',
      likes: 189,
      comments: 22,
      date: 'Hace 5 días'
    },
    {
      id: 4,
      image: 'assets/image2.jpeg',
      caption: '💧 Recorrido técnico por el pozo comunitario y el sistema de filtración biológica.',
      likes: 98,
      comments: 11,
      date: 'Hace 1 semana'
    }
  ];

  eventos = [
    {
      id: 1,
      day: '15',
      month: 'AGO',
      category: 'TALLER ABIERTO',
      title: 'Principios de Permacultura y Huertos Urbanos',
      desc: 'Capacitación práctica para el diseño de huertos domésticos sin químicos sintéticos.',
      time: '10:00 AM - 1:00 PM',
      location: 'Casa Club Tapalehui'
    },
    {
      id: 2,
      day: '22',
      month: 'AGO',
      category: 'FAENA COMUNITARIA',
      title: 'Jornada de Reforestación Nativa en Parque del Sapo',
      desc: 'Siembra comunitaria de 200 árboles nativos con el equipo de biólogos.',
      time: '09:00 AM - 12:30 PM',
      location: 'Reserva Parque del Sapo'
    },
    {
      id: 3,
      day: '05',
      month: 'SEP',
      category: 'ASAMBLEA VECINAL',
      title: 'Reunión Trimestral de Integración & Proyectos Q3',
      desc: 'Revisión de avances en las 60 Casas-Huerta y presentación de nuevos miembros de la Red.',
      time: '11:00 AM - 2:00 PM',
      location: 'Salón de Usos Múltiples'
    }
  ];

  openInstaModal(post: any) {
    this.selectedInstaPost.set(post);
  }

  closeInstaModal() {
    this.selectedInstaPost.set(null);
  }
}
