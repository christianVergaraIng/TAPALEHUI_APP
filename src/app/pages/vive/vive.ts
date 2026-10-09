import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CountUpComponent } from '../../components/count-up/count-up';

@Component({
  selector: 'app-vive',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-container">
      <!-- Header -->
      <section class="page-header text-center">
        <h1 class="page-title">La Vista & Casas-Huerta</h1>

        <!-- Navigation Tabs -->
        <div class="tab-navigation">
          <button (click)="setActiveTab('masterplan')" [class.active]="activeTab() === 'masterplan'" class="tab-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-right: 5px;">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
            </svg>
            Master Plan
          </button>
          <button (click)="setActiveTab('prototipos')" [class.active]="activeTab() === 'prototipos'" class="tab-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-right: 5px;">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Prototipos
          </button>
          <button (click)="setActiveTab('sustentable')" [class.active]="activeTab() === 'sustentable'" class="tab-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 5px;">
              <path d="M12 12v8m0-8v1h3a6 6 0 0 0 6-6V6h-3a6 6 0 0 0-6 6m0-2v1H9a6 6 0 0 1-6-6V4h3a6 6 0 0 1 6 6" />
            </svg>
            Sustentable
          </button>
          <button (click)="setActiveTab('multimedia')" [class.active]="activeTab() === 'multimedia'" class="tab-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-right: 5px;">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
            </svg>
            Evidencia
          </button>
          <!--
          <button (click)="setActiveTab('operativa')" [class.active]="activeTab() === 'operativa'" class="tab-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-right: 5px;">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
            </svg>
            Proceso & FAQ
          </button>
          -->
        </div>
      </section>

      <!-- TAB 1: MASTER PLAN -->
      @if (activeTab() === 'masterplan') {
        <section class="tab-content fade-in">
          <!-- Showcase Grid La Vista Tapalehui -->
          <div class="vista-showcase-card">
            <div class="vista-showcase-grid">
              <!-- Columna 1: Texto + Vista01.png -->
              <div class="vista-text-col">
                <div class="vista-brand-header">
                  <div class="vista-brand-icon">
                    <svg viewBox="0 0 36 36" width="36" height="36" fill="none" stroke="#4A6B4B" stroke-width="2.2">
                      <rect x="4" y="4" width="12" height="12" rx="2"/>
                      <circle cx="24" cy="10" r="4"/>
                      <path d="M4 24c0-3.5 2.5-6 6-6s6 2.5 6 6v6H4v-6z"/>
                      <path d="M24 20c2.5 0 4.5 2 4.5 4.5V30"/>
                    </svg>
                  </div>
                  <div class="vista-brand-title">
                    <span class="vbrand-top">LA VISTA</span>
                    <span class="vbrand-bot">TAPALEHUI</span>
                  </div>
                </div>

                <p class="vista-p">
                  Conjunto residencial ubicado en Xoxocotla, Morelos, que busca crear un equilibrio entre la arquitectura y la naturaleza. El proyecto ofrece lotes ideales para construir casas modulares tipo cabaña, pensadas para adaptarse a las necesidades y estilo de vida de cada persona.
                </p>
                <p class="vista-p">
                  Este sistema permite personalizar los espacios y crecer conforme a las posibilidades de cada familia. Se presentan tres prototipos de diferentes dimensiones que reflejan la esencia del desarrollo: flexibilidad, confort y una conexión genuina con el entorno natural.
                </p>

                <div class="vista-img-wrapper vista01-wrapper">
                  <img src="assets/Vista01.png" alt="Entorno Natural La Vista" class="vista-img" loading="lazy" decoding="async" />
                </div>
              </div>

              <!-- Columna 2: Imagen Principal Vista02.png (más grande) -->
              <div class="vista-main-img-col">
                <div class="vista-img-wrapper vista02-wrapper">
                  <img src="assets/Vista02.png" alt="Terraza Cabaña La Vista" class="vista-img" loading="lazy" decoding="async" />
                </div>
              </div>

              <!-- Columna 3: Dos imágenes apiladas (Vista03.png arriba, Vista04.png abajo) -->
              <div class="vista-stack-col">
                <div class="vista-img-wrapper vista03-wrapper">
                  <img src="assets/Vista03.png" alt="Interior Cocina La Vista" class="vista-img" loading="lazy" decoding="async" />
                </div>
                <div class="vista-img-wrapper vista04-wrapper">
                  <img src="assets/Vista04.png" alt="Interior Recámara La Vista" class="vista-img" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>

          <div class="masterplan-card">
            <div class="mp-header">
              <h2>La Vista</h2>
            </div>

            <div class="mp-visual">
              <div class="map-placeholder">
                <img src="assets/LaVista01.jpg" alt="Trazado La Vista Master Plan" class="mp-bg-img" />

                <!-- <div class="mp-overlay-points">
                  @for (pt of masterPlanPoints; track pt.id) {
                    <div 
                      class="mp-point" 
                      [attr.data-dir]="pt.dir"
                      [style.top]="pt.top" 
                      [style.left]="pt.left" 
                      (click)="selectPointInfo(pt)">
                      <span class="point-dot"></span>
                      <span class="point-badge">
                        @if (pt.icon === 'water') {
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
                        } @else if (pt.icon === 'home') {
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                        } @else if (pt.icon === 'leaf') {
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.1 2 9 0 4.9-4 9-10 9z"/></svg>
                        } @else if (pt.icon === 'club') {
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><line x1="2" y1="22" x2="22" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7 12 2"/></svg>
                        } @else {
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/></svg>
                        }
                        {{ pt.name }}
                      </span>
                    </div>
                  }
                </div>
-->
              </div>
            </div>

            <!--

            @if (selectedPointDetail()) {
              <div class="point-info-box fade-in">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-right: 6px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <strong>Punto Seleccionado:</strong> {{ selectedPointDetail()?.name }}
                <p class="point-desc">{{ selectedPointDetail()?.description }}</p>
              </div>
            }

            <div class="mp-stats-grid">
              <div class="mp-stat">
                <span class="stat-num"><app-count-up end="60"></app-count-up></span>
                <span class="stat-lbl">Casas-Huerta totales</span>
              </div>
              <div class="mp-stat">
                <span class="stat-num"><app-count-up end="40%"></app-count-up></span>
                <span class="stat-lbl">Área verde de conservación</span>
              </div>
              <div class="mp-stat">
                <span class="stat-num"><app-count-up end="100%"></app-count-up></span>
                <span class="stat-lbl">Agua de pozo común</span>
              </div>
              <div class="mp-stat">
                <span class="stat-num"><app-count-up end="0"></app-count-up></span>
                <span class="stat-lbl">Bardas perimetrales opresivas</span>
              </div>
            </div>
            -->
          </div>

        </section>
        
      }

      <!-- TAB 2: PROTOTIPOS -->
      @if (activeTab() === 'prototipos') {
        <section class="tab-content fade-in">
          <div class="prototipos-showcase-card">
            <div class="prototipos-img-wrapper">
              <img src="assets/Prototipos.png" alt="Prototipos La Vista Tapalehui" class="prototipos-showcase-img" loading="lazy" decoding="async" />
            </div>
          </div>

          <!--
          ========================================================================
          CONTENIDO ANTERIOR COMENTADO A PETICIÓN
          ========================================================================
          <div class="prototipos-grid">
            @for (proto of prototipos; track proto.id) {
              <div class="proto-card">
                <div class="proto-img-wrap">
                  <img [src]="proto.image" [alt]="proto.name" class="proto-img" />
                  <span class="proto-tag"><app-count-up [end]="proto.area"></app-count-up> m²</span>
                </div>
                <div class="proto-body">
                  <h3 class="proto-title">{{ proto.name }}</h3>
                  <p class="proto-subtitle">{{ proto.tagline }}</p>
                  <p class="proto-desc">{{ proto.description }}</p>
                  
                  <div class="proto-specs">
                    <span>Recámaras</span>
                    <span>Baños</span>
                    <span>Huerto</span>
                  </div>

                  <a routerLink="/contacto" class="btn-select-proto">Solicitar Planos & Cotización &rarr;</a>
                </div>
              </div>
            }
          </div>
          -->
        </section>
      }

      <!-- TAB 3: SUSTENTABLE -->
      @if (activeTab() === 'sustentable') {
        <section class="tab-content fade-in">
          <div class="sustentable-container">
            <!-- Video RedTapalehui -->
            <section class="featured-story-video">
              <div class="hero-video-box">
                <div class="video-container">
                  @if (isPlayingVideo()) {
                    <video
                      src="http://redtapalehui.com.mx/media/video_sustentabilidad.mp4"
                      controls
                      autoplay
                      playsinline
                      class="video-player">
                    </video>
                  } @else {
                    <div class="video-poster" (click)="playVideo()">
                      <img src="assets/Tapalehui_VideoPlayer02.jpg" alt="Presentación Red Tapalehui" class="poster-img" loading="lazy" decoding="async" />
                      <div class="video-overlay">
                        <div class="play-button">
                          <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </section>

            <p class="sustentable-desc-text">
              La mitad del terreno será para una huerta con las características de agricultura regenerativa que se ha desarrollado en Casa Tapalehui con Pistaches, Café y Vainilla
            </p>
          </div>
        </section>
      }

      <!-- TAB 3: MULTIMEDIA (CARRUSEL) -->
      @if (activeTab() === 'multimedia') {
        <section class="tab-content fade-in">
          <div class="carousel-container">
            <div class="carousel-wrapper">
              <!-- Slide Display -->
              <div class="carousel-slide">
                <img 
                  [src]="carouselImages[currentSlide()].src" 
                  [alt]="carouselImages[currentSlide()].title" 
                  class="carousel-img" 
                  loading="lazy" 
                  decoding="async" 
                />
                <div class="carousel-caption">
                  <span>{{ carouselImages[currentSlide()].title }}</span>
                  <span class="slide-counter">{{ currentSlide() + 1 }} / {{ carouselImages.length }}</span>
                </div>
              </div>

              <!-- Navigation Controls -->
              <button class="carousel-btn prev-btn" (click)="prevSlide()" aria-label="Imagen anterior">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <button class="carousel-btn next-btn" (click)="nextSlide()" aria-label="Siguiente imagen">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>

            <!-- Dots Indicator -->
            <div class="carousel-indicators">
              @for (img of carouselImages; track $index) {
                <button 
                  class="indicator-dot" 
                  [class.active]="$index === currentSlide()" 
                  (click)="goToSlide($index)"
                  [attr.aria-label]="'Ir a imagen ' + ($index + 1)">
                </button>
              }
            </div>

            <!-- Thumbnails Strip -->
            <div class="carousel-thumbnails">
              @for (img of carouselImages; track $index) {
                <div 
                  class="thumb-item" 
                  [class.active]="$index === currentSlide()" 
                  (click)="goToSlide($index)">
                  <img [src]="img.src" [alt]="img.title" class="thumb-img" />
                </div>
              }
            </div>
          </div>
        </section>
      } 


      <!-- TAB 3: MULTIMEDIA
      @if (activeTab() === 'multimedia') {
        <section class="tab-content fade-in">
          <div class="multimedia-section">
            <h2 class="sub-heading">Galería Fotográfica</h2>
            <div class="gallery-grid">
              <div class="gallery-item">
                <img src="assets/image2.jpeg" alt="La Vista Entorno" />
                <div class="gallery-caption">Entorno Natural y Verdes</div>
              </div>
              <div class="gallery-item">
                <img src="assets/image3.jpeg" alt="Arquitectura Sustentable" />
                <div class="gallery-caption">Arquitectura Bioclimática</div>
              </div>
              <div class="gallery-item">
                <img src="assets/image4.jpeg" alt="Huertos Comunitarios" />
                <div class="gallery-caption">Huertos e Interacción</div>
              </div>
            </div>

            <h2 class="sub-heading" style="margin-top: 3rem;">Recorridos en Video</h2>
            <div class="videos-grid">
              <div class="video-card">
                <div class="video-thumb">
                  <img src="assets/image3.jpeg" alt="Recorrido La Vista" />
                  <div class="video-play-icon">▶</div>
                </div>
                <h4 class="video-card-title">Recorrido por las Casas-Huerta</h4>
                <p class="video-card-desc">Conoce cómo se integran las casas con los huertos medicinales.</p>
              </div>

              <div class="video-card">
                <div class="video-thumb">
                  <img src="assets/image4.jpeg" alt="Entrevista Vecinos" />
                  <div class="video-play-icon">▶</div>
                </div>
                <h4 class="video-card-title">Testimonios de Habitantes</h4>
                <p class="video-card-desc">Familias comparten su experiencia viviendo en Tapalehui.</p>
              </div>
            </div>
          </div>
        </section>
      } -->

      <!-- TAB 4: INFORMACIÓN OPERATIVA & FAQ
      @if (activeTab() === 'operativa') {
        <section class="tab-content fade-in">
          Proceso de Integración
          <div class="proceso-box">
            <h2 class="sub-heading text-center">Proceso de Integración a La Vista</h2>
            <p class="section-desc text-center">Cuatro pasos para formar parte de la comunidad residencial.</p>

            <div class="pasos-grid">
              <div class="paso-card">
                <div class="paso-num">1</div>
                <h3>Visita Guiada</h3>
                <p>Agenda una entrevista y recorrido presencial por el terreno y áreas comunes.</p>
              </div>
              <div class="paso-card">
                <div class="paso-num">2</div>
                <h3>Entrevista de Afinidad</h3>
                <p>Diálogo con el comité vecinal para alinear expectativas y valores comunitarios.</p>
              </div>
              <div class="paso-card">
                <div class="paso-num">3</div>
                <h3>Elección de Lote</h3>
                <p>Selección de tu Casa-Huerta y firma de carta de compromiso sostenible.</p>
              </div>
              <div class="paso-card">
                <div class="paso-num">4</div>
                <h3>Integración & Construcción</h3>
                <p>Bienvenida a la asamblea vecinal e inicio del proceso bioclimático.</p>
              </div>
            </div>
          </div>

          FAQ Accordion
          <div class="faq-box" style="margin-top: 4rem;">
            <h2 class="sub-heading text-center">Preguntas Frecuentes (FAQ)</h2>
            
            <div class="faq-list">
              @for (item of faqItems; track item.id) {
                <div class="faq-item" [class.open]="openFaqId() === item.id">
                  <button (click)="toggleFaq(item.id)" class="faq-question">
                    <span>{{ item.question }}</span>
                    <span class="faq-icon">{{ openFaqId() === item.id ? '−' : '+' }}</span>
                  </button>
                  @if (openFaqId() === item.id) {
                    <div class="faq-answer">
                      <p>{{ item.answer }}</p>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        </section>
        
      }-->
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 3rem 1.5rem 5rem;
    }

    .page-header {
      margin-bottom: 3rem;
    }

    .text-center {
      text-align: center;
    }

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
      margin: 0 auto 2rem;
    }

    /* Tabs */
    .tab-navigation {
      display: flex;
      justify-content: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .tab-btn {
      padding: 0.7rem 1.5rem;
      border-radius: 30px;
      background: #FFFFFF;
      border: 1px solid rgba(0, 0, 0, 0.15);
      color: #1F1F1F;
      font-weight: 600;
      font-size: 0.92rem;
      cursor: pointer;
      transition: all 0.22s ease;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }

    :host-context(body.dark-theme) .tab-btn {
      background: #2B312B;
      border-color: rgba(255, 255, 255, 0.15);
      color: #F8F7F2;
    }

    .tab-btn:hover {
      background: #F4F7F2;
      border-color: rgba(41, 92, 43, 0.4);
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(41,92,43,0.14);
    }

    :host-context(body.dark-theme) .tab-btn:hover {
      background: #343B34;
      border-color: rgba(160, 183, 107, 0.4);
    }

    .tab-btn.active {
      background: #295C2B;
      background-image: linear-gradient(135deg, #295C2B 0%, #1C421E 100%);
      border-color: #295C2B;
      color: #ffffff;
      box-shadow: 0 4px 18px rgba(41, 92, 43, 0.42);
      transform: translateY(-1px);
    }

    :host-context(body.dark-theme) .tab-btn.active {
      background: #497541;
      background-image: linear-gradient(135deg, #497541 0%, #295C2B 100%);
      border-color: #A0B76B;
      color: #ffffff;
      box-shadow: 0 4px 18px rgba(160, 183, 107, 0.36);
    }

    .tab-content {
      margin-top: 2rem;
    }

    .fade-in {
      animation: fadeIn 0.3s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* La Vista Tapalehui Showcase Grid */
    .vista-showcase-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 24px;
      padding: 2.5rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
      margin-bottom: 3rem;
    }

    .vista-showcase-grid {
      display: grid;
      grid-template-columns: 0.92fr 1.15fr 0.93fr;
      gap: 1.5rem;
      align-items: stretch;
    }

    .vista-text-col {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      justify-content: space-between;
    }

    .vista-brand-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.25rem;
    }

    .vista-brand-icon {
      color: var(--brand);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .vista-brand-title {
      display: flex;
      flex-direction: column;
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: 0.06em;
    }

    .vbrand-top {
      font-size: 1.5rem;
      color: var(--brand);
    }

    .vbrand-bot {
      font-size: 1.4rem;
      color: var(--brand);
    }

    .vista-p {
      font-size: 0.92rem;
      line-height: 1.6;
      color: var(--text-main);
      margin: 0;
      text-align: justify;
    }

    .vista-img-wrapper {
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid var(--border-highlight);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
      background: var(--bg-surface);
      position: relative;
    }

    .vista01-wrapper {
      height: 175px;
      margin-top: 0.5rem;
    }

    .vista-main-img-col {
      display: flex;
      height: 100%;
    }

    .vista02-wrapper {
      width: 100%;
      height: 100%;
      min-height: 500px;
    }

    .vista-stack-col {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      height: 100%;
    }

    .vista03-wrapper, .vista04-wrapper {
      flex: 1;
      min-height: 235px;
    }

    .vista-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
    }

    .vista-img-wrapper:hover .vista-img {
      transform: scale(1.03);
    }

    @media (max-width: 1024px) {
      .vista-showcase-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      .vista02-wrapper {
        min-height: 360px;
      }
      .vista03-wrapper, .vista04-wrapper {
        min-height: 240px;
      }
    }

    /* Master Plan Tab */
    .masterplan-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 24px;
      padding: 2.5rem;
      box-shadow: 0 4px 16px rgba(0,0,0,.08), 0 1px 4px rgba(0,0,0,.04);
      transition: box-shadow var(--speed-fast) ease;
    }

    .mp-header {
      margin-bottom: 1.5rem;
    }

    .mp-header h2 {
      font-family: 'Outfit', sans-serif;
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--text-main);
    }

    .mp-header p {
      color: var(--text-muted);
    }

    .mp-visual {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      margin-bottom: 1.5rem;
      border: 1px solid var(--border-color);
      background: var(--card-bg);
    }

    .map-placeholder {
      position: relative;
      width: 100%;
      container-type: inline-size;
    }

    .mp-bg-img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: contain;
      filter: brightness(0.95);
    }

    .mp-overlay-points {
      position: absolute;
      inset: 0;
    }

    /* El punto (0,0) de .mp-point es el anclaje exacto sobre el mapa */
    .mp-point {
      position: absolute;
      width: 0;
      height: 0;
      cursor: pointer;
    }

    .point-dot {
      position: absolute;
      left: -6px;
      top: -6px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #295C2B;
      border: 2px solid #FFFFFF;
      box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.35), 0 2px 6px rgba(0, 0, 0, 0.5);
    }

    /* Posición del badge respecto al anclaje */
    .mp-point[data-dir='top'] .point-badge    { bottom: 14px; left: 0; translate: -50% 0; }
    .mp-point[data-dir='bottom'] .point-badge { top: 14px; left: 0; translate: -50% 0; }
    .mp-point[data-dir='left'] .point-badge   { right: 14px; top: 0; translate: 0 -50%; }
    .mp-point[data-dir='right'] .point-badge  { left: 14px; top: 0; translate: 0 -50%; }

    .mp-point:hover { z-index: 5; }

    .point-badge {
      position: absolute;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #FFFFFF;
      color: #122814;
      border: 2px solid #295C2B;
      padding: 0.5rem 0.95rem;
      border-radius: 30px;
      font-size: clamp(0.6rem, 1.6cqw, 0.82rem);
      font-weight: 800;
      letter-spacing: 0.01em;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45), 0 2px 6px rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(8px);
      white-space: nowrap;
      transition: scale 0.22s cubic-bezier(0.4, 0, 0.2, 1), background 0.22s, color 0.22s, border-color 0.22s, box-shadow 0.22s;
    }

    .point-badge svg {
      color: #295C2B;
      flex-shrink: 0;
    }

    .mp-point:hover .point-badge {
      scale: 1.08;
      background: #295C2B;
      border-color: #A0B76B;
      color: #FFFFFF;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.55), 0 0 16px rgba(160, 183, 107, 0.5);
    }

    .mp-point:hover .point-badge svg {
      color: #FFFFFF;
    }

    .point-info-box {
      background: var(--color-terracotta-bg);
      border: 1px solid var(--color-terracotta);
      border-radius: 12px;
      padding: 1rem 1.5rem;
      margin-bottom: 1.5rem;
      color: var(--text-main);
    }

    .mp-stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      border-top: 1px solid var(--border-color);
      padding-top: 1.5rem;
    }

    .mp-stat {
      display: flex;
      flex-direction: column;
    }

    .stat-num {
      font-family: 'Outfit', sans-serif;
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--color-brand-primary);
    }

    .stat-lbl {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    /* Prototipos Showcase Image */
    .prototipos-showcase-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 24px;
      padding: 2.5rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
    }

    .prototipos-img-wrapper {
      width: 100%;
      border-radius: 18px;
      overflow: hidden;
      border: 1px solid var(--border-highlight);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      background: var(--bg-surface);
    }

    .prototipos-showcase-img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
    }

    /* Prototipos */
    .prototipos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
    }

    .proto-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0,0,0,.08), 0 1px 4px rgba(0,0,0,.04);
      transition: box-shadow 0.22s ease, transform 0.22s ease, border-color 0.22s ease;
    }

    .proto-card:hover {
      box-shadow: 0 12px 32px rgba(0,0,0,.14);
      border-color: var(--border-highlight);
      transform: translateY(-3px);
    }

    .proto-img-wrap {
      position: relative;
      height: 220px;
    }

    .proto-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .proto-tag {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      background: var(--color-terracotta);
      color: #ffffff;
      padding: 0.3rem 0.8rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 700;
    }

    .proto-body {
      padding: 1.5rem;
    }

    .proto-title {
      font-family: 'Outfit', sans-serif;
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--text-main);
    }

    .proto-subtitle {
      font-size: 0.85rem;
      color: var(--color-brand-primary);
      font-weight: 700;
      margin-bottom: 0.75rem;
    }

    .proto-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
      line-height: 1.5;
      margin-bottom: 1.25rem;
    }

    .proto-specs {
      display: flex;
      gap: 1rem;
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }

    .btn-select-proto {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 2rem;
      border-radius: 30px;
      background-color: #359b23ff;
      color: #ffffff;
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 1.1rem;
      letter-spacing: 0.02em;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(92, 198, 82, 0.45);
      transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
    }

    .btn-select-proto:hover {
      transform: translateY(-3px);
      background-color: #2d7d25ff;
      box-shadow: 0 10px 28px rgba(113, 198, 82, 0.55);
    }

    /* Multimedia */
    .sub-heading {
      font-family: 'Outfit', sans-serif;
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 1.5rem;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .gallery-item {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      height: 200px;
    }

    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .gallery-caption {
      position: absolute;
      bottom: 0;
      inset-x: 0;
      padding: 0.75rem 1rem;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
      color: #ffffff;
      font-size: 0.85rem;
      font-weight: 600;
    }

    .videos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .video-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 1rem;
    }

    .video-thumb {
      position: relative;
      height: 180px;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 1rem;
    }

    .video-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .video-play-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--color-brand-primary);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    .video-card-title {
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      color: var(--text-main);
    }

    .video-card-desc {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    /* Operativa & FAQ */
    .pasos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .paso-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 1.5rem;
      text-align: center;
    }

    .paso-num {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--color-brand-primary);
      color: #ffffff;
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
    }

    .paso-card h3 {
      font-family: 'Outfit', sans-serif;
      font-size: 1.1rem;
      color: var(--text-main);
      margin-bottom: 0.5rem;
    }

    .paso-card p {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .faq-list {
      max-width: 800px;
      margin: 2rem auto 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .faq-item {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      overflow: hidden;
    }

    .faq-question {
      width: 100%;
      padding: 1.25rem 1.5rem;
      background: none;
      border: none;
      color: var(--text-main);
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      font-size: 1.05rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      text-align: left;
    }

    .faq-icon {
      font-size: 1.5rem;
      color: var(--color-brand-primary);
    }

    .faq-answer {
      padding: 0 1.5rem 1.25rem;
      color: var(--text-muted);
      font-size: 0.92rem;
      line-height: 1.6;
    }

    /* Multimedia Carousel Styles */
    .carousel-container {
      max-width: 1000px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .carousel-wrapper {
      position: relative;
      width: 100%;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
      background: #000;
      aspect-ratio: 16 / 9;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .carousel-slide {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .carousel-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      animation: fadeIn 0.3s ease-in-out;
    }

    .carousel-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1.25rem 2rem;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%);
      color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Outfit', sans-serif;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .slide-counter {
      font-size: 0.85rem;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(8px);
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-weight: 700;
    }

    .carousel-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.85);
      color: #1a1a1a;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
      transition: all 0.22s ease;
      z-index: 10;
    }

    :host-context(body.dark-theme) .carousel-btn {
      background: rgba(30, 30, 30, 0.85);
      color: #ffffff;
    }

    .carousel-btn:hover {
      background: #ffffff;
      transform: translateY(-50%) scale(1.1);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
    }

    :host-context(body.dark-theme) .carousel-btn:hover {
      background: #333333;
    }

    .prev-btn { left: 1.25rem; }
    .next-btn { right: 1.25rem; }

    .carousel-indicators {
      display: flex;
      justify-content: center;
      gap: 0.6rem;
    }

    .indicator-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--border-color);
      border: none;
      cursor: pointer;
      transition: all 0.25s ease;
    }

    .indicator-dot.active {
      background: var(--color-brand-primary);
      width: 32px;
      border-radius: 12px;
    }

    .carousel-thumbnails {
      display: flex;
      justify-content: center;
      gap: 0.75rem;
      overflow-x: auto;
      padding: 0.5rem 0;
    }

    .thumb-item {
      width: 90px;
      height: 60px;
      border-radius: 10px;
      overflow: hidden;
      cursor: pointer;
      border: 2px solid transparent;
      opacity: 0.6;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .thumb-item:hover {
      opacity: 0.9;
    }

    .thumb-item.active {
      border-color: var(--color-brand-primary);
      opacity: 1;
      transform: scale(1.05);
    }

    .thumb-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Sustentable Tab & Video Player Styles */
    .sustentable-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      max-width: 1100px;
      margin: 0 auto;
      width: 100%;
    }

    .featured-story-video {
      width: 100%;
      max-width: 1100px;
      margin: 0 auto;
    }

    .hero-video-box {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.2);
      border: 1px solid var(--border-color, rgba(255, 255, 255, 0.12));
      background: #000;
      aspect-ratio: 16/9;
      width: 100%;
    }

    .video-container {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .video-player {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border: none;
      background: #000;
      display: block;
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
      transition: transform 0.4s ease;
    }

    .video-poster:hover .poster-img {
      transform: scale(1.04);
    }

    .video-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.2) 60%);
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
      background: var(--color-brand-primary, #7A8F4D);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 25px rgba(122, 143, 77, 0.6);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .video-poster:hover .play-button {
      transform: scale(1.1);
      box-shadow: 0 0 35px rgba(160, 183, 107, 0.8);
    }

    .sustentable-desc-text {
      font-family: var(--font-heading, 'Outfit', sans-serif);
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--color-text-primary);
      text-align: center;
      line-height: 1.6;
      max-width: 850px;
      margin: 0 auto;
      padding: 1.5rem 2rem;
      background: var(--color-card-bg, #222A22);
      border: 1px solid var(--border-color, rgba(255, 255, 255, 0.12));
      border-radius: 20px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }
  `]
})
export class ViveComponent {
  activeTab = signal<'masterplan' | 'prototipos' | 'sustentable' | 'multimedia' | 'operativa'>('masterplan');
  openFaqId = signal<number | null>(1);

  // Video Player State
  isPlayingVideo = signal<boolean>(false);

  playVideo() {
    this.isPlayingVideo.set(true);
  }

  setActiveTab(tab: 'masterplan' | 'prototipos' | 'sustentable' | 'multimedia' | 'operativa') {
    this.activeTab.set(tab);
  }

  // Multimedia Carousel State
  currentSlide = signal<number>(0);
  carouselImages = [
    { src: 'assets/Multimedia01.jpg', title: ' ' }
    /*
    { src: 'assets/Investigacion02.jpg', title: 'Diálogos e Investigación Comunitaria' },
    { src: 'assets/Investigacion03.jpg', title: 'Espacios de Trabajo y Colaboración' },
    { src: 'assets/ParqueSapo.jpg', title: 'Parque del Sapo' },
    { src: 'assets/Granja Tehuixtlera.png', title: 'Granja Tehuixtlera' }
    */
  ];

  nextSlide() {
    this.currentSlide.update(curr => (curr + 1) % this.carouselImages.length);
  }

  prevSlide() {
    this.currentSlide.update(curr => (curr - 1 + this.carouselImages.length) % this.carouselImages.length);
  }

  goToSlide(index: number) {
    this.currentSlide.set(index);
  }

  selectedPointDetail = signal<{ name: string; description: string } | null>({
    name: 'Pozo Comunitario',
    description: 'Pozo comunitario con autonomía hídrica que distribuye agua limpia a las 60 Casas-Huerta y zonas agrícolas.'
  });

  selectPointInfo(pt: { name: string; description: string }) {
    this.selectedPointDetail.set(pt);
  }

  masterPlanPoints = [
    {
      id: 'camino-huamuchil',
      name: 'Camino del Huamuchil',
      top: '17.5%',
      left: '20.6%',
      dir: 'left',
      icon: 'road',
      description: 'Vía principal de acceso al desarrollo que recorre la Sección C y conecta con los huertos nativos de Huamuchil.'
    },
    {
      id: 'cerrada-cerro-sapo',
      name: 'Cerrada del Cerro del Sapo',
      top: '14.9%',
      left: '45.4%',
      dir: 'top',
      icon: 'road',
      description: 'Calle residencial privada en la parte elevada del Sector B, con vistas panorámicas hacia la reserva del Cerro del Sapo.'
    },
    {
      id: 'camino-cerro-sapo',
      name: 'Camino al Cerro del Sapo',
      top: '34.1%',
      left: '26.7%',
      dir: 'left',
      icon: 'road',
      description: 'Sendero ecológico perimetral hacia la reserva natural y zona de conservación del Cerro del Sapo.'
    },
    {
      id: 'camino-casahuates',
      name: 'Camino de los Casahuates',
      top: '35.2%',
      left: '65.7%',
      dir: 'top',
      icon: 'road',
      description: 'Vía verde arbolada con casahuates que divide el Sector A y B, equipada con zanjas de infiltración pluviométrica.'
    },
    {
      id: 'casas-huerta-a',
      name: 'Casas-Huerta (Sector A)',
      top: '52.6%',
      left: '67.0%',
      dir: 'top',
      icon: 'home',
      description: 'Sector A residencial planificado con lotes modulares, huertos individuales bio-intensivos e integración paisajística.'
    },
    {
      id: 'camino-pistaches',
      name: 'Camino de los Pistaches',
      top: '58.9%',
      left: '72.5%',
      dir: 'right',
      icon: 'road',
      description: 'Avenida oriental bordeada por nogales y árboles frutales de pistache que conecta el sector A.'
    },
    {
      id: 'cerrada-pistaches',
      name: 'Cerrada de los Pistaches',
      top: '67.6%',
      left: '71.9%',
      dir: 'bottom',
      icon: 'road',
      description: 'Callejón residencial contiguo a la bio-piscina de filtración natural y área de esparcimiento.'
    },
    {
      id: 'pozo-comunitario',
      name: 'Pozo Comunitario',
      top: '67.2%',
      left: '81.0%',
      dir: 'right',
      icon: 'water',
      description: 'Pozo comunitario con autonomía hídrica que distribuye agua limpia a las 60 Casas-Huerta y zonas agrícolas.'
    },
    {
      id: 'camino-huamuchil-sur',
      name: 'Camino del Huamuchil (Sur)',
      top: '79.7%',
      left: '42.7%',
      dir: 'left',
      icon: 'road',
      description: 'Tramo sur del Camino del Huamuchil que recorre la Sección C y conduce a la Cerrada del Huamuchil.'
    },
    {
      id: 'cerrada-huamuchil',
      name: 'Cerrada del Huamuchil',
      top: '81.9%',
      left: '51.6%',
      dir: 'right',
      icon: 'road',
      description: 'Acceso residencial del extremo sur de la Sección C con sistemas permaculturales de recolección de agua.'
    }
  ];

  toggleFaq(id: number) {
    this.openFaqId.update(curr => (curr === id ? null : id));
  }

  prototipos = [
    {
      id: 1,
      name: 'Modelo Ceiba',
      tagline: 'Vivienda Familiar Bioclimática',
      area: 145,
      rooms: 3,
      baths: 2,
      huertoSize: 120,
      image: 'assets/image2.jpeg',
      description: 'Espaciosa residencia en 2 niveles con ventilación cruzada, azotea verde y huerto biológico directo.'
    },
    {
      id: 2,
      name: 'Modelo Bambú',
      tagline: 'Cabaña Eco-Eficiente',
      area: 95,
      rooms: 2,
      baths: 1.5,
      huertoSize: 80,
      image: 'assets/image3.jpeg',
      description: 'Ideal para parejas o estudio de trabajo. Construcción con materiales locales de bajo impacto térmico.'
    },
    {
      id: 3,
      name: 'Modelo Roble',
      tagline: 'Villa de Retiro & Trabajo Remoto',
      area: 180,
      rooms: 4,
      baths: 3,
      huertoSize: 200,
      image: 'assets/image4.jpeg',
      description: 'Amplia villa con estudio independiente, terraza solar y bio-piscina de filtración natural.'
    }
  ];

  faqItems = [
    {
      id: 1,
      question: '¿Cómo funciona la propiedad de la tierra en La Vista?',
      answer: 'Cada Casa-Huerta cuenta con título privado para la vivienda y el huerto individual, sumado a un porcentaje de indiviso sobre las 150+ hectáreas comunitarias y el pozo de agua.'
    },
    {
      id: 2,
      question: '¿Es obligatorio trabajar en los huertos?',
      answer: 'No es obligatorio. El proyecto ofrece mantenimiento compartido de huertos para quienes no dispongan de tiempo completo, fomentando siempre la participación voluntaria.'
    },
    {
      id: 3,
      question: '¿Qué servicios están incluidos en la cuota comunitaria?',
      answer: 'La cuota incluye mantenimiento del pozo de agua, caminos internos, iluminación solar perimetral, recolección diferenciada de residuos y conservación del Parque del Sapo.'
    },
    {
      id: 4,
      question: '¿Puedo personalizar el diseño de mi Casa-Huerta?',
      answer: 'Sí, respetando los lineamientos del Reglamento Bioclimático de Tapalehui (materiales locales, altura máxima y sistemas de tratamiento de agua residual).'
    }
  ];
}