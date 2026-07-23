import { Component, signal } from '@angular/core';
import { CountUpComponent } from '../../components/count-up/count-up';

@Component({
  selector: 'app-historias',
  standalone: true,
  imports: [CountUpComponent],
  template: `
    <div class="page-container">
      <!-- Header -->
      <section class="page-header text-center">
        <div class="header-badge">TESTIMONIOS & VIVENCIAS</div>
        <h1 class="page-title">Historias de la Comunidad</h1>
        <p class="page-subtitle">
          Relatos, experiencias y aprendizajes compartidos por quienes habitan, colaboran y transforman Tapalehui día a día.
        </p>
      </section>

      <!-- Video Destacado de Historia -->
      <section class="featured-story-video">
        <div class="story-video-card">
          <div class="video-preview-box">
            @if (activeVideoUrl()) {
              <iframe
                [src]="activeVideoUrl()"
                title="Historia Destacada"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="story-iframe">
              </iframe>
            } @else {
              <div class="video-cover" (click)="loadVideo('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1')">
                <img src="assets/image4.jpeg" alt="Historia de Vida Tapalehui" class="cover-img" />
                <div class="cover-overlay">
                  <div class="play-btn-large">▶</div>
                  <span class="cover-tag">VIDEO DESTACADO</span>
                  <h3 class="cover-title">"Construir un hogar sin bardas": La historia de la familia Morales</h3>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Tarjetas de Testimonios e Historias Escritas -->
      <section class="historias-grid-section">
        <div class="historias-grid">
          @for (story of historias; track story.id) {
            <div class="story-card">
              <div class="story-header">
                <div class="avatar" [style.background]="story.color">{{ story.initials }}</div>
                <div class="story-author-info">
                  <h3 class="author-name">{{ story.author }}</h3>
                  <span class="author-role">{{ story.role }}</span>
                </div>
                <span class="story-date">{{ story.date }}</span>
              </div>

              <div class="story-body">
                <h4 class="story-title">"{{ story.title }}"</h4>
                <p class="story-text">{{ story.content }}</p>
              </div>

              @if (story.image) {
                <div class="story-img-box">
                  <img [src]="story.image" [alt]="story.title" class="story-img" />
                </div>
              }

              <div class="story-footer">
                <button (click)="likeStory(story.id)" class="btn-like">
                  ❤️ <app-count-up [end]="story.likes"></app-count-up> Me gusta
                </button>
                <span class="story-tag-pill">#{{ story.tag }}</span>
              </div>
            </div>
          }
        </div>
      </section>
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

    /* Video Destacado */
    .story-video-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.15);
    }

    .video-preview-box {
      position: relative;
      aspect-ratio: 16/9;
      width: 100%;
      background: #000;
    }

    .story-iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    .video-cover {
      position: relative;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    .cover-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .cover-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.2) 60%);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 2.5rem;
    }

    .play-btn-large {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: var(--color-brand-primary);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      margin-bottom: 1rem;
      box-shadow: 0 0 25px rgba(41, 92, 43, 0.5);
    }

    .cover-tag {
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--color-brand-primary);
      letter-spacing: 0.1em;
    }

    .cover-title {
      font-family: 'Outfit', sans-serif;
      font-size: 1.8rem;
      font-weight: 800;
      color: #ffffff;
    }

    /* Historias Grid */
    .historias-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
    }

    .story-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 14px rgba(0,0,0,.07);
      transition: box-shadow 0.22s ease, transform 0.22s ease, border-color 0.22s ease;
    }

    .story-card:hover {
      box-shadow: 0 12px 30px rgba(0,0,0,.12);
      border-color: var(--border-highlight);
      transform: translateY(-3px);
    }

    .story-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.25rem;
    }

    .avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      color: #ffffff;
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.95rem;
    }

    .story-author-info {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .author-name {
      font-family: 'Outfit', sans-serif;
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text-main);
    }

    .author-role {
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    .story-date {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .story-body {
      margin-bottom: 1.25rem;
    }

    .story-title {
      font-family: 'Outfit', sans-serif;
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--color-brand-primary);
      margin-bottom: 0.5rem;
    }

    .story-text {
      font-size: 0.9rem;
      color: var(--text-muted);
      line-height: 1.6;
    }

    .story-img-box {
      height: 180px;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 1.25rem;
    }

    .story-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .story-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
      border-top: 1px solid var(--border-color);
      padding-top: 1rem;
    }

    .btn-like {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      background: var(--bg-main);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      padding: 0.45rem 1rem;
      border-radius: 30px;
      font-size: 0.82rem;
      cursor: pointer;
      font-weight: 600;
      box-shadow: 0 2px 6px rgba(0,0,0,.05);
      transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
    }

    .btn-like:hover {
      transform: translateY(-2px);
      border-color: var(--brand);
      box-shadow: 0 4px 12px rgba(41,92,43,.16);
    }

    .story-tag-pill {
      font-size: 0.75rem;
      color: var(--color-terracotta);
      font-weight: 700;
    }
  `]
})
export class HistoriasComponent {
  activeVideoUrl = signal<string | null>(null);

  loadVideo(url: string) {
    this.activeVideoUrl.set(url);
  }

  historias = [
    {
      id: 1,
      author: 'Sofía & Martín',
      initials: 'SM',
      color: '#295C2B',
      role: 'Habitantes en Casa-Huerta',
      date: 'Hace 3 días',
      title: 'El primer año de cosecha en nuestro bio-huerto',
      content: 'Llegamos a Tapalehui buscando un cambio de ritmo. Hoy, nuestros hijos cosechan jitomates orgánicos y conocen el valor de cuidar el agua de pozo compartida.',
      image: 'assets/image2.jpeg',
      likes: 38,
      tag: 'VidaEnComunidad'
    },
    {
      id: 2,
      author: 'Dr. Alejandro Rivas',
      initials: 'AR',
      color: '#497541',
      role: 'Investigador Agroecológico',
      date: 'Hace 1 semana',
      title: 'Restaurando el suelo en el Parque del Sapo',
      content: 'En las 50 hectáreas del parque hemos documentado la llegada de especies de aves nativas que no se veían en la región desde hace 15 años.',
      image: 'assets/image3.jpeg',
      likes: 54,
      tag: 'Investigación'
    },
    {
      id: 3,
      author: 'Elena Torres',
      initials: 'ET',
      color: '#C67C52',
      role: 'Coordinadora de Faenas',
      date: 'Hace 2 semanas',
      title: 'Faenas de bioconstrucción y trabajo en equipo',
      content: 'Las faenas de los sábados son la verdadera alma de Tapalehui. Vecinos, voluntarios y familias colaborando hombro a hombro.',
      image: 'assets/image4.jpeg',
      likes: 29,
      tag: 'FaenasComunitarias'
    }
  ];

  likeStory(id: number) {
    const item = this.historias.find(h => h.id === id);
    if (item) {
      item.likes++;
    }
  }
}
