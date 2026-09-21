import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CountUpComponent } from '../../components/count-up/count-up';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CountUpComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-container">
      <!-- Header -->
      <section class="page-header text-center">
        <h1 class="page-title">Proyectos & Impacto Territorial</h1>
        <p class="page-subtitle">
          Iniciativas dedicadas al desarrollo comunitario, la restauración biológica y el ecoturismo responsable.
        </p>
      </section>

      <!-- Grid Destacado de Proyectos -->
      <section class="proyectos-detail-grid">
        @for (proj of proyectosDetalle; track proj.id) {
          <div class="proj-detail-card" [class.featured]="proj.featured">
            <div class="proj-img-wrap">
              <img [src]="proj.image" [alt]="proj.title" class="proj-img" />
              @if (proj.highlightStat) {
                <div class="proj-stat-overlay">
                  <span class="stat-number"><app-count-up [end]="proj.highlightStat"></app-count-up></span>
                  <span class="stat-label">{{ proj.highlightLabel }}</span>
                </div>
              }
            </div>

            <div class="proj-body">
              <span class="proj-category">{{ proj.category }}</span>
              <h2 class="proj-title">{{ proj.title }}</h2>
              @if (proj.description) {
                <p class="proj-description">{{ proj.description }}</p>
              }

              <div class="proj-highlights">
                <h4>Puntos Clave:</h4>
                <ul>
                  @for (feat of proj.features; track feat) {
                    <li>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-right: 5px;">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {{ feat }}
                    </li>
                  }
                </ul>
              </div>
            </div>
          </div>
        }
      </section>

      <!-- Sección Residencial & Hábitat (Integrado desde Vive) -->
      <!-- Sección Residencial & Hábitat (Integrado desde Vive) -->
      <section class="section-la-vista">
        <div class="section-header text-center">
          <div class="header-badge">PROYECTO RESIDENCIAL & HÁBITAT</div>
          <h2 class="section-title">La Vista & Casas-Huerta</h2>
          <p class="section-desc">
            60 viviendas ecológicas diseñadas en armonía con el paisaje, huertos bio-intensivos y autonomía hídrica.
          </p>

          <!-- Navigation Tabs - Comentadas a petición del usuario
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
            <button (click)="setActiveTab('multimedia')" [class.active]="activeTab() === 'multimedia'" class="tab-btn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-right: 5px;">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
              </svg>
              Galería & Videos
            </button>
            <button (click)="setActiveTab('operativa')" [class.active]="activeTab() === 'operativa'" class="tab-btn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-right: 5px;">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
              </svg>
              Proceso & FAQ
            </button>
          </div>
          -->
        </div>

        <!-- MASTER PLAN DE LA VISTA -->
        <div class="tab-content fade-in">
          <div class="masterplan-card">
            <div class="mp-header">
              <h2>Master Plan Interactivo - La Vista</h2>
              <p>Trazado de <app-count-up end="60"></app-count-up> lotes para Casas-Huerta, zonificación de áreas verdes compartidas y pozo común.</p>
            </div>

            <div class="mp-visual">
              <div class="map-placeholder">
                <img src="assets/Tapalehui_VideoPlayer.jpg" alt="Trazado La Vista Master Plan" class="mp-bg-img" />
                <div class="mp-overlay-points">
                  <div class="mp-point" style="top: 30%; left: 25%;" (click)="selectPoint('Pozo Comunitario')">
                    <span class="point-badge">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-right: 4px;"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
                      Pozo Comunitario
                    </span>
                  </div>
                  <div class="mp-point" style="top: 45%; left: 60%;" (click)="selectPoint('Casas-Huerta Sector A')">
                    <span class="point-badge">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-right: 4px;"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                      Casas-Huerta (Sector A)
                    </span>
                  </div>
                  <div class="mp-point" style="top: 70%; left: 40%;" (click)="selectPoint('Bio-Huerto Colectivo')">
                    <span class="point-badge">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-right: 4px;"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.1 2 9 0 4.9-4 9-10 9z"/></svg>
                      Bio-Huerto Colectivo
                    </span>
                  </div>
                  <div class="mp-point" style="top: 20%; left: 75%;" (click)="selectPoint('Casa Club & SUM')">
                    <span class="point-badge">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-right: 4px;"><line x1="2" y1="22" x2="22" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7 12 2"/></svg>
                      Casa Club & SUM
                    </span>
                  </div>
                </div>
              </div>
            </div>

            @if (selectedPoint()) {
              <div class="point-info-box">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-right: 4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <strong>Punto Seleccionado:</strong> {{ selectedPoint() }}
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
        </div>

        <!-- Secciones adicionales comentadas a petición
        @if (activeTab() === 'prototipos') { ... }
        @if (activeTab() === 'multimedia') { ... }
        @if (activeTab() === 'operativa') { ... }
        -->
      </section>

      <!-- Banner de Metodología de Impacto 
      <section class="impacto-banner">
        <div class="impacto-box text-center">
          <h2>Medición de Impacto y Transparencia</h2>
          <p>
            Todos nuestros proyectos son monitoreados mediante indicadores de regeneración del suelo, huella de carbono neutral e integración social.
          </p>
          <div class="impacto-stats">
            <div class="istat">
              <span class="num"><app-count-up end="150+"></app-count-up></span>
              <span class="lbl">Hectáreas Protegidas</span>
            </div>
            <div class="istat">
              <span class="num"><app-count-up end="80+"></app-count-up></span>
              <span class="lbl">Familias Campesinas Aliadas</span>
            </div>
            <div class="istat">
              <span class="num"><app-count-up end="100%"></app-count-up></span>
              <span class="lbl">Manejo Biológico</span>
            </div>
          </div>
        </div>
      </section>
      -->
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

    /* Proyectos Detail Grid */
    .proyectos-detail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 2rem;
    }

    .proj-detail-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 24px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all 0.25s ease;
      box-shadow: 0 4px 16px rgba(0,0,0,.08);
    }

    .proj-detail-card:hover {
      transform: translateY(-6px);
      border-color: var(--border-highlight);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
    }

    .proj-detail-card.featured {
      border-color: var(--color-terracotta);
      background: var(--bg-surface);
    }

    .proj-img-wrap {
      position: relative;
      height: 240px;
    }

    .proj-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .proj-img-wrap::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.55) 0%,
        rgba(0, 0, 0, 0.25) 35%,
        rgba(0, 0, 0, 0) 65%
      );
      pointer-events: none;
    }

    .proj-stat-overlay {
      position: absolute;
      bottom: 1rem;
      left: 1.2rem;
      display: flex;
      flex-direction: column;
      z-index: 1;
    }

    .stat-number {
      font-family: 'Outfit', sans-serif;
      font-size: 1.6rem;
      font-weight: 800;
      color: #ffffff;
      line-height: 1;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.35);
    }

    .stat-label {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.9);
      font-weight: 600;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    }

    .proj-body {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .proj-category {
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--color-brand-primary);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 0.4rem;
    }

    .proj-title {
      font-family: 'Outfit', sans-serif;
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 0.75rem;
    }

    .proj-description {
      font-size: 0.92rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .proj-highlights {
      background: var(--bg-main);
      border-radius: 12px;
      padding: 1rem;
      margin-bottom: 1.5rem;
      flex: 1;
    }

    .proj-highlights h4 {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 0.5rem;
    }

    .proj-highlights ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    /* Section La Vista */
    .section-la-vista {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }

    .section-header {
      margin-bottom: 1rem;
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
      max-width: 650px;
      margin: 0 auto 2rem;
      font-size: 1rem;
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
      margin-top: 1rem;
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
      box-shadow: 0 4px 16px rgba(0,0,0,.08);
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

    .point-desc {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-top: 0.25rem;
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
      box-shadow: 0 4px 16px rgba(0,0,0,.08);
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
      flex-wrap: wrap;
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

    .paso-card h4 {
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

    /* Impacto Banner */
    .impacto-box {
      background: var(--bg-surface);
      border: 1px solid var(--border-highlight);
      border-radius: 24px;
      padding: 3.5rem 2rem;
      box-shadow: 0 8px 28px rgba(0,0,0,0.08);
    }

    .impacto-box h2 {
      font-family: 'Outfit', sans-serif;
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 0.75rem;
    }

    .impacto-box p {
      color: var(--text-muted);
      max-width: 650px;
      margin: 0 auto 2.5rem;
    }

    .impacto-stats {
      display: flex;
      justify-content: center;
      gap: 3rem;
      flex-wrap: wrap;
    }

    .istat {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .istat .num {
      font-family: 'Outfit', sans-serif;
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-brand-primary);
    }

    .istat .lbl {
      font-size: 0.85rem;
      color: var(--text-muted);
    }
  `]
})
export class ProyectosComponent {
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

  proyectosDetalle = [
    {
      id: 'agri-reg',
      featured: true,
      category: 'Centro de Investigación Comunitaria',
      title: 'Centro de Investigación Comunitaria',
      highlightStat: '100 ha',
      highlightLabel: 'Superficie cultivada',
      image: 'assets/CentroInvestigacion.png',
      description: 'Modelo de cultivo libre de pesticidas químicos enfocado en la recuperación de la microbiología del suelo y la producción de alimentos orgánicos.',
      features: [
        'Rotación de cultivos y compostaje bio-intensivo',
        'Captación de agua de lluvia para riego inteligente',
        'Distribución directa a familias e iniciativas locales'
      ]
    },
    {
      id: 'parque-sapo',
      featured: true,
      category: 'Parque del Sapo',
      title: 'Parque del Sapo',
      highlightStat: '50 ha',
      highlightLabel: 'Reserva & Senderos',
      image: 'assets/ParqueSapo.jpg',
      description: 'Área natural protegida dedicada a la conservación de especies nativas, senderismo guiado, avistamiento de aves y ecoturismo respetuoso.',
      features: [
        '50 Hectáreas de flora y fauna silvestre protegida',
        'Rutas de senderismo pedagógico para escuelas',
        'Estación de observación de polinizadores'
      ]
    },
    {
      id: 'tehuixtlera',
      featured: false,
      category: 'Granja Tehuixtlera',
      title: 'Granja Tehuixtlera',
      highlightStat: '80',
      highlightLabel: 'Campesinos Aliados',
      image: 'assets/Granja Tehuixtlera.png',
      description: 'Alianza comunitaria y comercial con 80 campesinos locales de la región para promover el cultivo responsable y precios justos.',
      features: [
        'Comercio justo y fortalecimiento de economía local',
        'Transferencia de tecnología agroecológica',
        'Centro regional de acopio bio-orgánico'
      ]
    }
  ];

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