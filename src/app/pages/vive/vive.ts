import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CountUpComponent } from '../../components/count-up/count-up';

@Component({
  selector: 'app-vive',
  standalone: true,
  imports: [RouterLink, CountUpComponent],
  template: `
    <div class="page-container">
      <!-- Header -->
      <section class="page-header text-center">
        <div class="header-badge">PROYECTO RESIDENCIAL</div>
        <h1 class="page-title">La Vista & Casas-Huerta</h1>
        <p class="page-subtitle">
          60 viviendas ecológicas diseñadas en armonía con el paisaje, huertos bio-intensivos y autonomía hídrica.
        </p>

        <!-- Navigation Tabs -->
        <div class="tab-navigation">
          <button (click)="setActiveTab('masterplan')" [class.active]="activeTab() === 'masterplan'" class="tab-btn">
            🗺️ Master Plan
          </button>
          <button (click)="setActiveTab('prototipos')" [class.active]="activeTab() === 'prototipos'" class="tab-btn">
            🏡 Prototipos
          </button>
          <button (click)="setActiveTab('multimedia')" [class.active]="activeTab() === 'multimedia'" class="tab-btn">
            📸 Galería & Videos
          </button>
          <button (click)="setActiveTab('operativa')" [class.active]="activeTab() === 'operativa'" class="tab-btn">
            📋 Proceso & FAQ
          </button>
        </div>
      </section>

      <!-- TAB 1: MASTER PLAN -->
      @if (activeTab() === 'masterplan') {
        <section class="tab-content fade-in">
          <div class="masterplan-card">
            <div class="mp-header">
              <h2>Master Plan Interactivo - La Vista</h2>
              <p>Trazado de <app-count-up end="60"></app-count-up> lotes para Casas-Huerta, zonificación de áreas verdes compartidas y pozo común.</p>
            </div>

            <div class="mp-visual">
              <div class="map-placeholder">
                <img src="assets/image2.jpeg" alt="Trazado La Vista Master Plan" class="mp-bg-img" />
                <div class="mp-overlay-points">
                  <div class="mp-point" style="top: 30%; left: 25%;" (click)="selectPoint('Pozo Comunitario')">
                    <span class="point-badge">💧 Pozo Comunitario</span>
                  </div>
                  <div class="mp-point" style="top: 45%; left: 60%;" (click)="selectPoint('Casas-Huerta Sector A')">
                    <span class="point-badge">🏡 Casas-Huerta (Sector A)</span>
                  </div>
                  <div class="mp-point" style="top: 70%; left: 40%;" (click)="selectPoint('Bio-Huerto Colectivo')">
                    <span class="point-badge">🌱 Bio-Huerto Colectivo</span>
                  </div>
                  <div class="mp-point" style="top: 20%; left: 75%;" (click)="selectPoint('Casa Club & SUM')">
                    <span class="point-badge">🏛️ Casa Club & SUM</span>
                  </div>
                </div>
              </div>
            </div>

            @if (selectedPoint()) {
              <div class="point-info-box">
                📍 <strong>Punto Seleccionado:</strong> {{ selectedPoint() }}
                <p class="point-desc">Área planificada bajo normas de bioconstrucción y respeto topográfico.</p>
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
          </div>
        </section>
      }

      <!-- TAB 2: PROTOTIPOS -->
      @if (activeTab() === 'prototipos') {
        <section class="tab-content fade-in">
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
                    <span>🛏️ <app-count-up [end]="proto.rooms"></app-count-up> Recámaras</span>
                    <span>🛁 <app-count-up [end]="proto.baths"></app-count-up> Baños</span>
                    <span>🌱 Huerto <app-count-up [end]="proto.huertoSize"></app-count-up> m²</span>
                  </div>

                  <a routerLink="/contacto" class="btn-select-proto">Solicitar Planos & Cotización &rarr;</a>
                </div>
              </div>
            }
          </div>
        </section>
      }

      <!-- TAB 3: MULTIMEDIA -->
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
      }

      <!-- TAB 4: INFORMACIÓN OPERATIVA & FAQ -->
      @if (activeTab() === 'operativa') {
        <section class="tab-content fade-in">
          <!-- Proceso de Integración -->
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

          <!-- FAQ Accordion -->
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
      }
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
      aspect-ratio: 16/9;
      border: 1px solid var(--border-color);
    }

    .map-placeholder {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .mp-bg-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.7);
    }

    .mp-overlay-points {
      position: absolute;
      inset: 0;
    }

    .mp-point {
      position: absolute;
      cursor: pointer;
      transform: translate(-50%, -50%);
    }

    .point-badge {
      background: var(--bg-surface);
      border: 1px solid var(--color-brand-primary);
      color: var(--text-main);
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 700;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      transition: transform 0.2s;
    }

    .mp-point:hover .point-badge {
      transform: scale(1.1);
      background: var(--color-brand-primary);
      color: #ffffff;
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
  `]
})
export class ViveComponent {
  activeTab = signal<'masterplan' | 'prototipos' | 'multimedia' | 'operativa'>('masterplan');
  selectedPoint = signal<string | null>(null);
  openFaqId = signal<number | null>(1);

  setActiveTab(tab: 'masterplan' | 'prototipos' | 'multimedia' | 'operativa') {
    this.activeTab.set(tab);
  }

  selectPoint(name: string) {
    this.selectedPoint.set(name);
  }

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
