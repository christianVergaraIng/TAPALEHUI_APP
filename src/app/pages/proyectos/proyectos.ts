import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CountUpComponent } from '../../components/count-up/count-up';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [RouterLink, CountUpComponent],
  template: `
    <div class="page-container">
      <!-- Header -->
      <section class="page-header text-center">
        <div class="header-badge">PORTAFOLIO DE INICIATIVAS</div>
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
              <div class="proj-stat-overlay">
                <span class="stat-number"><app-count-up [end]="proj.highlightStat"></app-count-up></span>
                <span class="stat-label">{{ proj.highlightLabel }}</span>
              </div>
            </div>

            <div class="proj-body">
              <span class="proj-category">{{ proj.category }}</span>
              <h2 class="proj-title">{{ proj.title }}</h2>
              <p class="proj-description">{{ proj.description }}</p>

              <div class="proj-highlights">
                <h4>Puntos Clave:</h4>
                <ul>
                  @for (feat of proj.features; track feat) {
                    <li>✔️ {{ feat }}</li>
                  }
                </ul>
              </div>

              <div class="proj-footer">
                <a routerLink="/contacto" class="btn-proj-contact">Saber más / Colaborar &rarr;</a>
              </div>
            </div>
          </div>
        }
      </section>

      <!-- Banner de Metodología de Impacto -->
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

    /* Degradado sutil para dar contraste al texto sin tapar la imagen */
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

    .btn-proj-contact {
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

    .btn-proj-contact:hover {
transform: translateY(-3px);
      background-color: #2d7d25ff;
      box-shadow: 0 10px 28px rgba(113, 198, 82, 0.55);
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
  proyectosDetalle = [
    {
      id: 'agri-reg',
      featured: true,
      category: 'PRODUCCIÓN BIOLÓGICA',
      title: 'Agricultura Regenerativa',
      highlightStat: '100 ha',
      highlightLabel: 'Superficie cultivada',
      image: 'assets/image2.jpeg',
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
      category: 'RESERVA ECOLÓGICA',
      title: 'Parque del Sapo',
      highlightStat: '50 ha',
      highlightLabel: 'Reserva & Senderos',
      image: 'assets/image3.jpeg',
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
      category: 'COOPERATIVA AGRÍCOLA',
      title: 'La Tehuixtlera',
      highlightStat: '80',
      highlightLabel: 'Campesinos Aliados',
      image: 'assets/image4.jpeg',
      description: 'Alianza comunitaria y comercial con 80 campesinos locales de la región para promover el cultivo responsable y precios justos.',
      features: [
        'Comercio justo y fortalecimiento de economía local',
        'Transferencia de tecnología agroecológica',
        'Centro regional de acopio bio-orgánico'
      ]
    },
    {
      id: 'centro-investigacion',
      featured: false,
      category: 'ACADEMIA & DESARROLLO',
      title: 'Centro de Investigación Comunitaria',
      highlightStat: 'Comunitario',
      highlightLabel: 'Desarrollo Social',
      image: 'assets/image3.jpeg',
      description: 'Espacio dedicado al estudio de tecnologías apropiadas, bio-arquitectura y metodologías de gobernanza y desarrollo social.',
      features: [
        'Laboratorio de bioconstrucción y materiales de la región',
        'Convenios con instituciones universitarias',
        'Publicación de estudios de impacto ambiental'
      ]
    }
  ];
}