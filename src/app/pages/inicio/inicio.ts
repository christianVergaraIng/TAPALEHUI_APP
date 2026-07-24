import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CountUpComponent } from '../../components/count-up/count-up';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, CountUpComponent],
  template: `
    <div class="page-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-badge">🌿 Comunidad Ecológica & Sostenible</div>
          <h1 class="hero-title">
            Vivir en comunidad.<br/>
            <span class="gradient-text">Regenerar la naturaleza.</span><br/>
            Compartir el futuro.
          </h1>
          <p class="hero-subtitle">
            Un ecosistema habitacional e investigativo pionero desde 1985, combinando arquitectura en armonía, agricultura biológica e inclusión social en México.
          </p>

          <div class="hero-actions">
            <a routerLink="/vive-en-tapalehui" class="btn-primary">Conoce La Vista</a>
            <a routerLink="/participa" class="btn-terracotta">Únete a la Red</a>
          </div>
        </div>

        <!-- Video Julio Box -->
        <div class="hero-video-box">
          <div class="video-container">
            @if (isPlayingVideo()) {
              <iframe
                src="https://redtapalehui.com.mx/videoinformativo.html"
                title="Presentación Tapalehui"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="video-iframe">
              </iframe>
            } @else {
              <div class="video-poster" (click)="playVideo()">
                <img src="assets/image2.jpeg" alt="Vista Tapalehui" class="poster-img" />
                <div class="video-overlay">
                  <div class="play-button">
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div class="video-tag">
                    <span class="video-label">VIDEO OFICIAL</span>
                    <span class="video-title">Presentación General</span>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Sección de Pilares (6 Principios) -->
      <section class="pilares-section">
        <div class="section-header text-center">
          <span class="section-subtitle">NUESTROS FUNDAMENTOS</span>
          <h2 class="section-title">Los 6 Pilares de Tapalehui</h2>
          <p class="section-desc">
            Principios rectores que guían nuestra convivencia, preservación ecológica y desarrollo social.
          </p>
        </div>

        <div class="pilares-grid">
          @for (pilar of pilares; track pilar.id) {
            <div class="pilar-card">
              <div class="pilar-icon-wrapper" [style.background]="pilar.gradient">
                <span class="pilar-icon">{{ pilar.icon }}</span>
              </div>
              <h3 class="pilar-title">{{ pilar.title }}</h3>
              <p class="pilar-desc">{{ pilar.description }}</p>
            </div>
          }
        </div>
      </section>

      <!-- Ecosistema de Proyectos (6 Proyectos Principales) -->
      <section class="proyectos-section">
        <div class="section-header">
          <span class="section-subtitle">IMPACTO & TERRITORIO</span>
          <h2 class="section-title">Ecosistema de Proyectos</h2>
          <p class="section-desc">
            Iniciativas integradas para la producción, preservación e investigación comunitaria.
          </p>
        </div>

        <div class="proyectos-grid">
          @for (proj of proyectos; track proj.id) {
            <div class="proyecto-card">
              <div class="proyecto-image-wrapper">
                <img [src]="proj.image" [alt]="proj.title" class="proyecto-img" />
                <div class="proyecto-badge">{{ proj.tag }}</div>
              </div>
              <div class="proyecto-body">
                <h3 class="proyecto-title">{{ proj.title }}</h3>
                <p class="proyecto-desc">{{ proj.description }}</p>
                <div class="proyecto-footer">
                  <span class="proyecto-stat"> {{ proj.stat}}</span>
                  <a [routerLink]="proj.link" class="proyecto-link">
                    Explorar
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Sección Tres Maneras de Formar Parte (CTA) -->
      <section class="cta-section">
        <div class="cta-banner">
          <div class="cta-header text-center">
            <span class="section-subtitle light">TU LUGAR EN EL CAMBIO</span>
            <h2 class="cta-title">Tres Maneras de Formar Parte</h2>
            <p class="cta-desc">
              Elige cómo deseas integrar tus talentos, tiempo o proyecto de vida en nuestra comunidad.
            </p>
          </div>

          <div class="cta-grid">
            <!-- 1) Vive -->
            <div class="cta-card">
              <div class="cta-number"><app-count-up end="01"></app-count-up></div>
              <h3 class="cta-card-title">VIVE</h3>
              <p class="cta-card-desc">
                Descubre <strong>La Vista</strong> y sus <app-count-up end="60"></app-count-up> Casas-Huerta. Un hogar rodeado de naturaleza con pozo comunitario y espacios compartidos.
              </p>
              <a routerLink="/vive-en-tapalehui" class="btn-meet-view">Conoce La Vista &rarr;</a>
            </div>

            <!-- 2) Participa -->
            <div class="cta-card highlight">
              <div class="cta-number"><app-count-up end="02"></app-count-up></div>
              <h3 class="cta-card-title">PARTICIPA</h3>
              <p class="cta-card-desc">
                Súmate a la <strong>redtapalehui</strong> como especialista, voluntario, investigador o creador en nuestra comunidad sin fronteras.
              </p>
              <a routerLink="/participa" class="btn-join-main">Únete a la Red &rarr;</a>
            </div>

            <!-- 3) Colabora -->
            <div class="cta-card">
              <div class="cta-number"><app-count-up end="03"></app-count-up></div>
              <h3 class="cta-card-title">COLABORA</h3>
              <p class="cta-card-desc">
                Impulsa proyectos de agricultura regenerativa, el Centro de Investigación o iniciativas eco-turísticas en el Parque del Sapo.
              </p>
              <a routerLink="/proyectos" class="btn-meet-view">Impulsa Proyectos &rarr;</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .page-container {
      display: flex;
      flex-direction: column;
      gap: 4rem;
      padding-bottom: 4rem;
    }

    /* Hero */
    .hero-section {
      position: relative;
      padding: 4rem 1.5rem 2rem;
      max-width: 1280px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
    }

    .hero-badge {
      display: inline-block;
      padding: 0.4rem 1rem;
      border-radius: 20px;
      background: var(--color-terracotta-bg);
      border: 1px solid var(--color-terracotta);
      color: var(--color-terracotta);
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 1.25rem;
    }

    .hero-title {
      font-family: 'Outfit', sans-serif;
      font-size: 3rem;
      line-height: 1.15;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 1.25rem;
    }

    .gradient-text {
      color: var(--color-brand-primary);
    }

    .hero-subtitle {
      font-size: 1.1rem;
      line-height: 1.6;
      color: var(--text-muted);
      margin-bottom: 2rem;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    /* Video Box */
    .hero-video-box {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.15);
      border: 1px solid var(--border-color);
      background: #000;
      aspect-ratio: 16/9;
    }

    .btn-meet-view{
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 2.4rem;
      border-radius: 30px;
      background-color: #C67C52;
      color: #ffffff;
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 1.1rem;
      letter-spacing: 0.02em;
      border: 2px solid #C67C52;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(198, 124, 82, 0.45);
      transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
    }

    .btn-meet-view:hover {
      transform: translateY(-3px);
      background-color: #B06940;
      box-shadow: 0 10px 28px rgba(198, 124, 82, 0.55);
    }

      .btn-join-main {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 2.4rem;
      border-radius: 30px;
      background-color: #C67C52;
      color: #ffffff;
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 1.1rem;
      letter-spacing: 0.02em;
      border: 2px solid #C67C52;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(198, 124, 82, 0.45);
      transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
    }
    .btn-join-main:hover {
      transform: translateY(-3px);
      background-color: #B06940;
      box-shadow: 0 10px 28px rgba(198, 124, 82, 0.55);
    }

    .video-container {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .video-iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    .video-poster {
      position: relative;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    .poster-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s;
    }

    .video-poster:hover .poster-img {
      transform: scale(1.04);
    }

    .video-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.2) 60%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
    }

    .play-button {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: var(--color-brand-primary);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 25px rgba(41, 92, 43, 0.6);
      transition: transform 0.2s;
    }

    .video-poster:hover .play-button {
      transform: scale(1.1);
    }

    .video-tag {
      position: absolute;
      bottom: 1.5rem;
      left: 1.5rem;
      display: flex;
      flex-direction: column;
    }

    .video-label {
      font-size: 0.7rem;
      font-weight: 800;
      color: var(--color-brand-primary);
      letter-spacing: 0.1em;
    }

    .video-title {
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      color: #ffffff;
      font-size: 1.1rem;
    }

    /* Pilares Section */
    .pilares-section {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
      width: 100%;
    }

    .section-header {
      margin-bottom: 3rem;
    }

    .text-center {
      text-align: center;
    }

    .section-subtitle {
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.12em;
      color: var(--color-brand-primary);
      text-transform: uppercase;
    }

    .section-title {
      font-family: 'Outfit', sans-serif;
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--text-main);
      margin: 0.5rem 0;
    }

    .section-desc {
      color: var(--text-muted);
      max-width: 640px;
      margin: 0 auto;
      font-size: 1rem;
    }

    .pilares-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .pilar-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 18px;
      padding: 1.75rem;
      transition: all 0.25s ease;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
    }

    .pilar-card:hover {
      transform: translateY(-4px);
      border-color: var(--border-highlight);
      background: var(--card-bg-hover);
      box-shadow: 0 12px 28px rgba(0,0,0,.11);
    }

    .pilar-icon-wrapper {
      width: 52px;
      height: 52px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      margin-bottom: 1.25rem;
    }

    .pilar-title {
      font-family: 'Outfit', sans-serif;
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 0.5rem;
    }

    .pilar-desc {
      font-size: 0.9rem;
      line-height: 1.55;
      color: var(--text-muted);
    }

    /* Proyectos Section */
    .proyectos-section {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
      width: 100%;
    }

    .proyectos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 2rem;
    }

    .proyecto-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
    }

    .proyecto-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.14);
      border-color: var(--border-highlight);
    }

    .proyecto-image-wrapper {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .proyecto-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s;
    }

    .proyecto-card:hover .proyecto-img {
      transform: scale(1.06);
    }

    .proyecto-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      background: var(--color-terracotta);
      color: #ffffff;
      font-size: 0.75rem;
      font-weight: 700;
    }

    .proyecto-body {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .proyecto-title {
      font-family: 'Outfit', sans-serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 0.5rem;
    }

    .proyecto-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
      line-height: 1.5;
      margin-bottom: 1.5rem;
      flex: 1;
    }

    .proyecto-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid var(--border-color);
      padding-top: 1rem;
    }

    .proyecto-stat {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--color-brand-primary);
    }

    .proyecto-link {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      color: var(--color-brand-primary);
      text-decoration: none;
      font-weight: 700;
      font-size: 0.88rem;
      transition: color 0.2s;
    }

    .proyecto-link:hover {
      color: var(--color-terracotta);
    }

    /* CTA Section */
    .cta-section {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
      width: 100%;
    }

    .cta-banner {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: 24px;
      padding: 3.5rem 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    }

    .cta-header {
      margin-bottom: 3rem;
    }

    .cta-title {
      font-family: 'Outfit', sans-serif;
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--text-main);
      margin: 0.5rem 0;
    }

    .cta-desc {
      color: var(--text-muted);
      max-width: 600px;
      margin: 0 auto;
    }

    .cta-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .cta-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 18px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    }

    .cta-card.highlight {
      border-color: var(--color-terracotta);
      background: var(--color-terracotta-bg);
    }

    .cta-number {
      font-family: 'Outfit', sans-serif;
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-brand-primary);
      opacity: 0.5;
      margin-bottom: 0.5rem;
    }

    .cta-card-title {
      font-family: 'Outfit', sans-serif;
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 0.75rem;
    }

    .cta-card-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 1.5rem;
      flex: 1;
    }

    .cta-card-btn {
      display: inline-flex;
      align-items: center;
      color: var(--brand);
      font-weight: 700;
      text-decoration: none;
      font-size: 0.95rem;
      padding: 0.65rem 1.25rem;
      border-radius: 30px;
      border: 1.5px solid var(--brand);
      transition: transform 0.18s ease, box-shadow 0.18s ease;
    }

    .cta-card-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 14px rgba(41,92,43,0.20);
    }

    .cta-card-btn.glow {
      color: var(--btn-terracotta-text) !important;
      background: var(--btn-terracotta-bg) !important;
      padding: 0.65rem 1.2rem;
      border-radius: 10px;
      display: inline-block;
      text-align: center;
      border: 1px solid var(--color-terracotta);
      box-shadow: 0 4px 14px rgba(198, 124, 82, 0.3);
    }

    @media (max-width: 900px) {
      .hero-section {
        grid-template-columns: 1fr;
        padding-top: 2rem;
      }
      .hero-title {
        font-size: 2.25rem;
      }
    }
  `]
})
export class InicioComponent {
  isPlayingVideo = signal(false);

  playVideo() {
    this.isPlayingVideo.set(true);
  }

  pilares = [
    {
      id: 1,
      icon: '🤝',
      title: 'Comunidad',
      description: 'Convivencia activa, gobernanza colaborativa y fortalecimiento constante del tejido social.',
      gradient: 'linear-gradient(135deg, #295C2B 0%, #1C421E 100%)'
    },
    {
      id: 2,
      icon: '🌱',
      title: 'Sustentabilidad',
      description: 'Gestión responsable de energía solar, pozo comunitario y autonomía de recursos vitales.',
      gradient: 'linear-gradient(135deg, #497541 0%, #295C2B 100%)'
    },
    {
      id: 3,
      icon: '🔄',
      title: 'Regeneración',
      description: 'Reforestación de flora nativa, bioconstrucción y técnicas de agricultura regenerativa.',
      gradient: 'linear-gradient(135deg, #84CC16 0%, #4D7C0F 100%)'
    },
    {
      id: 4,
      icon: '🙋‍♂️',
      title: 'Participación',
      description: 'Faenas de voluntariado, toma de decisiones horizontales y co-creación constante.',
      gradient: 'linear-gradient(135deg, #C67C52 0%, #A05B33 100%)'
    },
    {
      id: 5,
      icon: '🌐',
      title: 'Inclusión',
      description: 'Apertura para familias, especialistas, estudiantes y diversidad de perfiles en un entorno seguro.',
      gradient: 'linear-gradient(135deg, #556B2F 0%, #3B4B20 100%)'
    },
    {
      id: 6,
      icon: '☀️',
      title: 'Bienestar',
      description: 'Vivir en contacto directo con la naturaleza, aire puro y una atmósfera serena y saludable.',
      gradient: 'linear-gradient(135deg, #D4A373 0%, #C67C52 100%)'
    }
  ];

  proyectos = [
    {
      id: 'la-vista',
      title: 'La Vista',
      tag: 'Residencial',
      image: 'assets/image2.jpeg',
      description: 'Desarrollo habitacional sostenible con 60 Casas-Huerta integradas al entorno natural.',
      stat: '60 Casas-Huerta',
      link: '/vive-en-tapalehui'
    },
    {
      id: 'redtapalehui',
      title: 'redtapalehui',
      tag: 'Red Global',
      image: 'assets/image3.jpeg',
      description: 'Red comunitaria de talentos, profesionales y colaboradores locales e internacionales.',
      stat: 'Red Abierta',
      link: '/participa'
    },
    {
      id: 'centro-investigacion',
      title: 'Centro de Investigación',
      tag: 'Academia & Ciencia',
      image: 'assets/image4.jpeg',
      description: 'Espacio dedicado al estudio de tecnologías apropiadas, bioconstrucción y ecología.',
      stat: 'Investigación Comunitaria',
      link: '/proyectos'
    },
    {
      id: 'parque-sapo',
      title: 'Parque del Sapo',
      tag: 'Ecoturismo',
      image: 'assets/image3.jpeg',
      description: 'Reserva ecológica protegida orientada al ecoturismo, senderismo y educación ambiental.',
      stat: '50 Hectáreas',
      link: '/proyectos'
    },
    {
      id: 'agri-regenerativa',
      title: 'Agricultura Regenerativa',
      tag: 'Producción Biológica',
      image: 'assets/image2.jpeg',
      description: 'Cultivos sin agrotóxicos y restauración biológica del suelo con técnicas permaculturales.',
      stat: '100 Hectáreas',
      link: '/proyectos'
    },
    {
      id: 'tehuixtlera',
      title: 'La Tehuixtlera',
      tag: 'Alianza Agrícola',
      image: 'assets/image4.jpeg',
      description: 'Cooperativa y trabajo colaborativo con productores locales de la región.',
      stat: '80 Campesinos',
      link: '/proyectos'
    }
  ];
}
