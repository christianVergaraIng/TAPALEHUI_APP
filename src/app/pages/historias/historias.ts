import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CountUpComponent } from '../../components/count-up/count-up';

interface Story {
  id: number;
  author: string;
  initials: string;
  color: string;
  role: string;
  date: string;
  title: string;
  content: string;
  image?: string;
  likes: number;
  tag: string;
}

@Component({
  selector: 'app-historias',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-container">
      <!-- Header -->
      <section class="page-header text-center">
        <h1 class="page-title">Historias de la Comunidad</h1>
      </section>

      <!-- Imagen Destacada: El Sueño -->
      <section class="story-featured-image-section">
        <div class="story-image-card">
          <img
            src="assets/Historias01.jpg"
            alt="El Sueño - Orígenes de Tapalehui"
            class="story-featured-img"
            loading="lazy"
            decoding="async"
          />
        </div>
        <p class="image-subtitle">"El Sueño"</p>
      </section>

      <!-- Controlador de Audio Destacado -->
      <section class="audio-player-section">
        <div class="audio-card">
          <!-- Reproductor de Audio -->
          <div class="audio-controls-container">
            <audio
              #audioPlayer
              src="https://redtapalehui.com.mx/media/historia_sueno.mp4"
              preload="metadata"
              (play)="isPlaying.set(true)"
              (pause)="isPlaying.set(false)"
              (timeupdate)="onTimeUpdate(audioPlayer)"
              (loadedmetadata)="onLoadedMetadata(audioPlayer)"
              (ended)="onAudioEnded()"
              class="native-audio-hidden">
            </audio>

            <div class="player-main-controls">
              <!-- Botón Reproducir / Pausar -->
              <button class="btn-play-toggle" (click)="togglePlay(audioPlayer)" [attr.aria-label]="isPlaying() ? 'Pausar audio' : 'Reproducir audio'">
                @if (isPlaying()) {
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                } @else {
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" style="margin-left: 3px;">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                }
              </button>

              <!-- Timeline y Barra de Progreso -->
              <div class="timeline-container">
                <div class="time-display">
                  <span class="current-time">{{ formatTime(currentTime()) }}</span>
                  <span class="duration-divider">/</span>
                  <span class="total-time">{{ formatTime(duration()) }}</span>
                </div>
                <input
                  type="range"
                  class="audio-slider"
                  min="0"
                  [max]="duration() || 100"
                  [value]="currentTime()"
                  (input)="seek(audioPlayer, $event)"
                />
              </div>

              <!-- Controles Adicionales (Silenciar y Velocidad) -->
              <div class="extra-controls">
                <button class="btn-icon" (click)="toggleMute(audioPlayer)" [class.active]="isMuted()" title="Silenciar / Activar sonido">
                  @if (isMuted()) {
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                    </svg>
                  } @else {
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                  }
                </button>

                <button class="btn-speed" (click)="cycleSpeed(audioPlayer)" title="Velocidad de reproducción">
                  {{ playbackRate() }}x
                </button>
              </div>
            </div>

            <!-- Animación de Onda Sonora al Reproducir -->
            @if (isPlaying()) {
              <div class="soundwave-container">
                <span class="wave-bar bar1"></span>
                <span class="wave-bar bar2"></span>
                <span class="wave-bar bar3"></span>
                <span class="wave-bar bar4"></span>
                <span class="wave-bar bar5"></span>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Video Destacado de Historia 
      <section class="featured-story-video">
        <div class="section-title-wrap text-center">
          <span class="section-subtitle">HISTORIA DESTACADA EN VIDEO</span>
          <h2 class="section-title">"Construir un hogar sin bardas"</h2>
        </div>

        <div class="story-video-card">
          <div class="video-preview-box">
            @if (activeVideoUrl()) {
              <iframe
                [src]="activeVideoUrl()"
                title="Historia Destacada - Familia Morales"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="story-iframe">
              </iframe>
            } @else {
              <div class="video-cover" (click)="loadVideo('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1')">
                <img src="assets/Tapalehui_VideoPlayer.jpg" alt="Historia de Vida Tapalehui" class="cover-img" />
                <div class="cover-overlay">
                  <div class="play-btn-large">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <span class="cover-tag">VIDEO DOCUMENTAL</span>
                  <h3 class="cover-title">La experiencia de la familia Morales en Tapalehui</h3>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Tarjetas de Testimonios e Historias Escritas 
      <section class="historias-grid-section">
        <div class="section-title-wrap text-center">
          <span class="section-subtitle">EXPERIENCIAS & VIVENCIAS</span>
          <h2 class="section-title">Voces de Tapalehui</h2>
        </div>

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
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="vertical-align: -2px; margin-right: 4px;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  <app-count-up [end]="story.likes"></app-count-up> Me gusta
                </button>
                <span class="story-tag-pill">#{{ story.tag }}</span>
              </div>
            </div>
          }
        </div>
      </section>
    </div>
    -->
  `,
  styles: [`
    .page-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 3rem 1.5rem 5rem;
      display: flex;
      flex-direction: column;
      gap: 3.5rem;
    }

    .text-center { text-align: center; }

    /* Header */
    .page-header {
      margin-bottom: 0.5rem;
    }

    .header-badge {
      display: inline-block;
      padding: 0.4rem 1rem;
      border-radius: 20px;
      background: rgba(122, 143, 77, 0.15);
      border: 1px solid var(--color-brand-primary);
      color: var(--color-brand-light, #A0B76B);
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0.12em;
      margin-bottom: 1rem;
    }

    .page-title {
      font-family: var(--font-heading, 'Outfit', sans-serif);
      font-size: 2.75rem;
      font-weight: 800;
      color: var(--color-text-primary);
      margin-bottom: 0.75rem;
      letter-spacing: -0.02em;
    }

    .page-subtitle {
      font-size: 1.1rem;
      color: var(--color-text-secondary);
      max-width: 720px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .section-title-wrap {
      margin-bottom: 2rem;
    }

    .section-subtitle {
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0.14em;
      color: var(--color-brand-light, #A0B76B);
      text-transform: uppercase;
    }

    .section-title {
      font-family: var(--font-heading, 'Outfit', sans-serif);
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--color-text-primary);
      margin-top: 0.4rem;
    }

    /* Audio Player Section */
    .audio-player-section {
      width: 100%;
    }

    .audio-card {
      background: var(--color-card-bg, #2B312B);
      border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.1));
      border-radius: 24px;
      padding: 2.25rem;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(20px);
      transition: box-shadow 0.3s ease, border-color 0.3s ease;
    }

    .audio-card:hover {
      border-color: var(--color-brand-primary);
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.28);
    }

    .audio-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .audio-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: rgba(122, 143, 77, 0.2);
      color: var(--color-brand-light, #A0B76B);
      padding: 0.35rem 0.85rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      border: 1px solid rgba(160, 183, 107, 0.3);
    }

    .audio-tag {
      font-size: 0.8rem;
      color: var(--color-text-muted);
      font-weight: 600;
      letter-spacing: 0.05em;
    }

    .audio-info {
      margin-bottom: 1.75rem;
    }

    .audio-title {
      font-family: var(--font-heading, 'Outfit', sans-serif);
      font-size: 1.75rem;
      font-weight: 800;
      color: var(--color-text-primary);
      margin-bottom: 0.4rem;
    }

    .audio-description {
      font-size: 0.98rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
      max-width: 850px;
    }

    .native-audio-hidden {
      display: none;
    }

    /* Audio Controls */
    .audio-controls-container {
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));
      border-radius: 18px;
      padding: 1.25rem 1.5rem;
      position: relative;
    }

    .player-main-controls {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      flex-wrap: wrap;
    }

    /* Imagen Destacada "El Sueño" */
    .story-featured-image-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.85rem;
      width: 100%;
    }

    .story-image-card {
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 880px;
      width: 100%;
      margin: 0 auto;
      border-radius: 24px;
      overflow: hidden;
      border: 1px solid var(--color-border, rgba(255, 255, 255, 0.1));
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
      background: #ffffffff;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .story-image-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.22);
    }

    .story-featured-img {
      display: block;
      width: 100%;
      max-width: 100%;
      height: auto;
      max-height: 520px;
      object-fit: contain;
      border-radius: 24px;
    }

    .image-subtitle {
      font-family: var(--font-heading, 'Outfit', sans-serif);
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-text-secondary);
      text-align: center;
      letter-spacing: 0.02em;
      margin-top: 0.2rem;
    }

    .btn-play-toggle {
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: var(--gradient-primary, linear-gradient(135deg, #A0B76B, #7A8F4D));
      color: #ffffff;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(122, 143, 77, 0.4);
      transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
      flex-shrink: 0;
    }

    .btn-play-toggle:hover {
      transform: scale(1.06);
      filter: brightness(1.1);
      box-shadow: 0 8px 26px rgba(160, 183, 107, 0.55);
    }

    .timeline-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      min-width: 220px;
    }

    .time-display {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--color-text-muted);
      font-family: var(--font-heading, 'Outfit', sans-serif);
    }

    .current-time {
      color: var(--color-brand-light, #A0B76B);
    }

    .audio-slider {
      width: 100%;
      height: 6px;
      accent-color: var(--color-brand-light, #A0B76B);
      cursor: pointer;
      border-radius: 4px;
    }

    .extra-controls {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-shrink: 0;
    }

    .btn-icon {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--color-border);
      color: var(--color-text-primary);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-icon:hover, .btn-icon.active {
      border-color: var(--color-brand-light);
      color: var(--color-brand-light);
      background: rgba(160, 183, 107, 0.15);
    }

    .btn-speed {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--color-border);
      color: var(--color-text-primary);
      padding: 0.4rem 0.85rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-speed:hover {
      border-color: var(--color-brand-light);
      color: var(--color-brand-light);
      background: rgba(160, 183, 107, 0.15);
    }

    /* Soundwave animation */
    .soundwave-container {
      display: flex;
      align-items: flex-end;
      gap: 4px;
      height: 22px;
      margin-top: 0.85rem;
      justify-content: flex-start;
    }

    .wave-bar {
      width: 4px;
      background: var(--color-brand-light, #A0B76B);
      border-radius: 2px;
      animation: soundwave 1.2s ease-in-out infinite alternate;
    }

    .bar1 { animation-delay: 0.1s; height: 16px; }
    .bar2 { animation-delay: 0.3s; height: 22px; }
    .bar3 { animation-delay: 0.2s; height: 10px; }
    .bar4 { animation-delay: 0.4s; height: 18px; }
    .bar5 { animation-delay: 0.25s; height: 12px; }

    @keyframes soundwave {
      0% { height: 4px; }
      100% { height: 22px; }
    }

    /* Video Destacado */
    .story-video-card {
      background: var(--color-card-bg);
      border: 1px solid var(--color-border);
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
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
      transition: transform 0.5s ease;
    }

    .video-cover:hover .cover-img {
      transform: scale(1.03);
    }

    .cover-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.25) 60%);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 2.5rem;
    }

    .play-btn-large {
      width: 68px;
      height: 68px;
      border-radius: 50%;
      background: var(--gradient-primary, linear-gradient(135deg, #A0B76B, #7A8F4D));
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      box-shadow: 0 0 30px rgba(160, 183, 107, 0.5);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .video-cover:hover .play-btn-large {
      transform: scale(1.1);
      box-shadow: 0 0 40px rgba(160, 183, 107, 0.7);
    }

    .cover-tag {
      font-size: 0.78rem;
      font-weight: 800;
      color: var(--color-brand-light, #A0B76B);
      letter-spacing: 0.12em;
      margin-bottom: 0.3rem;
    }

    .cover-title {
      font-family: var(--font-heading, 'Outfit', sans-serif);
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
      background: var(--color-card-bg);
      border: 1px solid var(--color-border);
      border-radius: 24px;
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
    }

    .story-card:hover {
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22);
      border-color: var(--color-brand-light);
      transform: translateY(-4px);
    }

    .story-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.25rem;
    }

    .avatar {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      color: #ffffff;
      font-family: var(--font-heading, 'Outfit', sans-serif);
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.95rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      flex-shrink: 0;
    }

    .story-author-info {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .author-name {
      font-family: var(--font-heading, 'Outfit', sans-serif);
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .author-role {
      font-size: 0.78rem;
      color: var(--color-text-muted);
    }

    .story-date {
      font-size: 0.75rem;
      color: var(--color-text-muted);
    }

    .story-body {
      margin-bottom: 1.25rem;
    }

    .story-title {
      font-family: var(--font-heading, 'Outfit', sans-serif);
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--color-brand-light, #A0B76B);
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }

    .story-text {
      font-size: 0.92rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
    }

    .story-img-box {
      height: 190px;
      border-radius: 16px;
      overflow: hidden;
      margin-bottom: 1.25rem;
    }

    .story-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    .story-card:hover .story-img {
      transform: scale(1.05);
    }

    .story-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
      border-top: 1px solid var(--color-border);
      padding-top: 1rem;
    }

    .btn-like {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--color-border);
      color: var(--color-text-primary);
      padding: 0.45rem 1rem;
      border-radius: 30px;
      font-size: 0.82rem;
      cursor: pointer;
      font-weight: 600;
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
    }

    .btn-like:hover {
      transform: translateY(-2px);
      border-color: var(--color-brand-light);
      color: var(--color-brand-light);
      background: rgba(160, 183, 107, 0.12);
      box-shadow: 0 4px 14px rgba(160, 183, 107, 0.2);
    }

    .story-tag-pill {
      font-size: 0.78rem;
      color: var(--color-brand-light, #A0B76B);
      font-weight: 700;
      letter-spacing: 0.04em;
    }

    @media (max-width: 768px) {
      .page-title {
        font-size: 2.2rem;
      }
      .page-subtitle {
        font-size: 1rem;
      }
      .audio-card {
        padding: 1.5rem;
      }
      .cover-overlay {
        padding: 1.5rem;
      }
      .cover-title {
        font-size: 1.3rem;
      }
      .player-main-controls {
        gap: 1rem;
      }
    }
  `]
})
export class HistoriasComponent {
  private sanitizer = inject(DomSanitizer);

  // Audio Player State Signals
  isPlaying = signal<boolean>(false);
  currentTime = signal<number>(0);
  duration = signal<number>(0);
  playbackRate = signal<number>(1);
  isMuted = signal<boolean>(false);

  // Video State
  activeVideoUrl = signal<SafeResourceUrl | null>(null);

  togglePlay(audio: HTMLAudioElement) {
    if (audio.paused) {
      audio.play().catch(err => console.error('Error al reproducir audio:', err));
    } else {
      audio.pause();
    }
  }

  onTimeUpdate(audio: HTMLAudioElement) {
    this.currentTime.set(audio.currentTime);
  }

  onLoadedMetadata(audio: HTMLAudioElement) {
    this.duration.set(audio.duration || 0);
  }

  onAudioEnded() {
    this.isPlaying.set(false);
    this.currentTime.set(0);
  }

  seek(audio: HTMLAudioElement, event: Event) {
    const input = event.target as HTMLInputElement;
    const time = parseFloat(input.value);
    audio.currentTime = time;
    this.currentTime.set(time);
  }

  toggleMute(audio: HTMLAudioElement) {
    audio.muted = !audio.muted;
    this.isMuted.set(audio.muted);
  }

  cycleSpeed(audio: HTMLAudioElement) {
    const current = this.playbackRate();
    const next = current === 1 ? 1.25 : current === 1.25 ? 1.5 : current === 1.5 ? 2 : 1;
    audio.playbackRate = next;
    this.playbackRate.set(next);
  }

  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  loadVideo(url: string) {
    this.activeVideoUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }

  historias: Story[] = [
    {
      id: 1,
      author: 'Sofía & Martín',
      initials: 'SM',
      color: 'linear-gradient(135deg, #7A8F4D, #497541)',
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
      color: 'linear-gradient(135deg, #497541, #295C2B)',
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
      color: 'linear-gradient(135deg, #C67C52, #A0522D)',
      role: 'Coordinadora de Faenas',
      date: 'Hace 2 semanas',
      title: 'Faenas de bioconstrucción y trabajo en equipo',
      content: 'Las faenas de los sábados son la verdadera alma de Tapalehui. Vecinos, voluntarios y familias colaborando hombro a hombro.',
      image: 'assets/image4.jpeg',
      likes: 29,
      tag: 'FaenasComunitarias'
    },
    {
      id: 4,
      author: 'Familia Morales',
      initials: 'FM',
      color: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
      role: 'Co-creadores de Tapalehui',
      date: 'Hace 1 mes',
      title: 'Construir un hogar sin bardas',
      content: 'Decidimos sembrar nuestras vidas aquí porque creímos en un modelo donde el respeto a la naturaleza y la vida en común son el verdadero centro.',
      image: 'assets/Historias01.jpeg',
      likes: 72,
      tag: 'OrigenTapalehui'
    }
  ];

  likeStory(id: number) {
    const item = this.historias.find(h => h.id === id);
    if (item) {
      item.likes++;
    }
  }
}
