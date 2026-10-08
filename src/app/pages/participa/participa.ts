import { Component, ChangeDetectionStrategy, AfterViewInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { RedDialogosComponent } from '../../components/red-dialogos';

// en @Component: imports: [RedDialogosComponent],

@Component({
  selector: 'app-participa',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-container">
      <!-- Título Principal de la Página -->
      <section class="page-header text-center scroll-reveal">
        <h1 class="page-main-title">Centro de Investigación Comunitaria</h1>
      </section>

      <!-- Fila 1: Texto a la izquierda, Imagen Investigacion01 a la derecha -->
      <section class="investigacion-row1 scroll-reveal">
        <div class="row1-container">
          <div class="row1-text-content scroll-reveal">
            <h2 class="row1-heading">
              El Centro funciona<br />
              a base de diálogos
            </h2>
            <p class="row1-subtext">
              Diálogos presenciales en este espacio que está en el centro de <strong>redtapalehui</strong>
            </p>
          </div>
          <div class="row1-image-wrapper scroll-reveal">
            <img
              src="assets/Investigacion01.jpg"
              alt="Centro de Investigación Comunitaria"
              class="investigacion-img"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <!-- Fila 2: Grid con 3 elementos (Texto + Investigacion02 + Investigacion03) -->
      <section class="investigacion-row2 scroll-reveal">
        <div class="row2-grid">
          <div class="row2-left-col">
            <div class="row2-text-card scroll-reveal">
              <h2 class="row2-heading">
                Diálogos presenciales<br />
                de dos días
              </h2>
            </div>
            <div class="row2-image-card scroll-reveal">
              <img
                src="assets/Investigacion02.jpg"
                alt="Diálogos presenciales de dos días - reunión"
                class="investigacion-img"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div class="row2-right-col scroll-reveal">
            <div class="row2-image-card tall">
              <img
                src="assets/Investigacion03.jpg"
                alt="Diálogos presenciales de dos días - taller"
                class="investigacion-img"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Fila 3: Diálogos virtuales (Texto a la izquierda, Investigacion04 a la derecha) -->
      <section class="investigacion-row3 scroll-reveal">
        <div class="row3-container">
          <div class="row3-text-card scroll-reveal">
            <h2 class="row3-heading">Diálogos virtuales</h2>
          </div>
          <div class="row3-image-card scroll-reveal">
            <img
              src="assets/Investigacion04.png"
              alt="Diálogos virtuales"
              class="investigacion-img"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <!--
      ========================================================================
      CONTENIDO ANTERIOR COMENTADO A PETICIÓN
      ========================================================================
      <section class="page-header text-center">
        <div class="header-badge">RED TAPALEHUI</div>
        <h1 class="page-title">Una Comunidad Sin Fronteras</h1>
        <p class="page-subtitle">
          No necesitas residir físicamente en Tapalehui para formar parte del ecosistema. Suma tus talentos, proyectos y vocación a una red global regenerativa.
        </p>
      </section>

      <section class="audiencias-section">
        <div class="section-title-wrap text-center">
          <span class="section-subtitle">¿A QUIÉN BUSCAMOS?</span>
          <h2 class="section-title">Encuentra Tu Perfil en la Red</h2>
          <p class="section-desc">Diversidad de roles articulados en un propósito común.</p>
        </div>

        <div class="audiencias-grid">
          @for (aud of audiencias; track aud.title) {
            <div class="audiencia-card">
              <div class="aud-icon" [innerHTML]="aud.svgIcon"></div>
              <h3 class="aud-title">{{ aud.title }}</h3>
              <p class="aud-desc">{{ aud.desc }}</p>
            </div>
          }
        </div>
      </section>

      <section class="areas-section">
        <div class="section-title-wrap text-center">
          <span class="section-subtitle">CAMPOS DE ACCIÓN</span>
          <h2 class="section-title"><app-count-up end="3"></app-count-up> Áreas de Participación</h2>
        </div>

        <div class="areas-grid">
          <div class="area-card">
            <div class="area-tag">PILAR <app-count-up end="1"></app-count-up></div>
            <h3>Proyectos Productivos</h3>
            <p>
              Iniciativas de bio-agricultura, agregación de valor a la cosecha local, huertos medicinales y emprendimientos sostenibles con comercio justo.
            </p>
            <ul>
              <li>Agricultura Regenerativa</li>
              <li>Apicultura & Miel Orgánica</li>
              <li>Bioconstrucción y Talleres</li>
            </ul>
          </div>

          <div class="area-card highlight">
            <div class="area-tag">PILAR <app-count-up end="2"></app-count-up></div>
            <h3>Investigación en Sustentabilidad</h3>
            <p>
              Desarrollo de prototipos de ecotecnología, monitoreo de la biodiversidad, física de suelos y sistemas de purificación de agua sin químicos.
            </p>
            <ul>
              <li>Monitoreo de Suelos</li>
              <li>Tecnologías Hídricas</li>
              <li>Energías Renovables</li>
            </ul>
          </div>

          <div class="area-card">
            <div class="area-tag">PILAR <app-count-up end="3"></app-count-up></div>
            <h3>Educación Ambiental y Social</h3>
            <p>
              Seminarios, campamentos escolares, residencias artísticas y programas de formación para escuelas y comunidades vecinas.
            </p>
            <ul>
              <li>Visitas Guiadas Escolares</li>
              <li>Residencias Artísticas</li>
              <li>Talleres de Gobernanza</li>
            </ul>
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
      padding: 3rem 1.5rem 6rem;
      display: flex;
      flex-direction: column;
      gap: 4rem;
    }

    .text-center { text-align: center; }

    /* Animaciones de Entrada y Salida al Desplazarse (Scroll Reveal) */
    .scroll-reveal {
      opacity: 0;
      transform: translateY(40px) scale(0.97);
      transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
                  transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform;
    }

    .scroll-reveal.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }

    /* Título Principal */
    .page-main-title {
      font-family: 'Outfit', sans-serif;
      font-size: 2.75rem;
      font-weight: 800;
      color: var(--text-main);
      margin: 0;
      letter-spacing: -0.02em;
    }

    /* Fila 1 */
    .investigacion-row1 {
      width: 100%;
    }

    .row1-container {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 3.5rem;
      align-items: center;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 28px;
      padding: 3rem 2.5rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
    }

    .row1-text-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .row1-heading {
      font-family: 'Outfit', sans-serif;
      font-size: 2.25rem;
      font-weight: 700;
      color: var(--text-main);
      line-height: 1.25;
      margin: 0;
    }

    .row1-subtext {
      font-size: 1.25rem;
      line-height: 1.55;
      color: var(--text-main);
      margin: 0;
    }

    .row1-subtext strong {
      color: var(--brand);
      font-weight: 800;
    }

    .row1-image-wrapper {
      width: 100%;
      border-radius: 22px;
      overflow: hidden;
      border: 1px solid var(--border-highlight);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
      background: var(--bg-surface);
    }

    .investigacion-img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .row1-image-wrapper:hover .investigacion-img,
    .row2-image-card:hover .investigacion-img {
      transform: scale(1.03);
    }

    /* Fila 2 (Grid 3 Elementos) */
    .investigacion-row2 {
      width: 100%;
    }

    .row2-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem;
      align-items: stretch;
    }

    .row2-left-col {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }

    .row2-text-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 28px;
      padding: 2.5rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
      display: flex;
      align-items: center;
    }

    .row2-heading {
      font-family: 'Outfit', sans-serif;
      font-size: 2.25rem;
      font-weight: 700;
      color: var(--text-main);
      line-height: 1.25;
      margin: 0;
    }

    .row2-image-card {
      border-radius: 24px;
      overflow: hidden;
      border: 1px solid var(--border-highlight);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
      background: var(--bg-surface);
      height: 100%;
      min-height: 280px;
    }

    .row2-right-col {
      display: flex;
    }

    .row2-image-card.tall {
      width: 100%;
      height: 100%;
      min-height: 480px;
    }

    /* Fila 3 (Diálogos virtuales) */
    .investigacion-row3 {
      width: 100%;
    }

    .row3-container {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 3.5rem;
      align-items: center;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 28px;
      padding: 3rem 2.5rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
    }

    .row3-text-card {
      display: flex;
      align-items: center;
    }

    .row3-heading {
      font-family: 'Outfit', sans-serif;
      font-size: 2.25rem;
      font-weight: 700;
      color: var(--text-main);
      line-height: 1.25;
      margin: 0;
    }

    .row3-image-card {
      border-radius: 24px;
      overflow: hidden;
      border: 1px solid var(--border-highlight);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
      background: var(--bg-surface);
      width: 100%;
    }

    .row3-image-card:hover .investigacion-img {
      transform: scale(1.03);
    }

    @media (max-width: 900px) {
      .row1-container, .row3-container {
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 2rem;
      }

      .row2-grid {
        grid-template-columns: 1fr;
      }

      .page-main-title {
        font-size: 2.1rem;
      }

      .row1-heading, .row2-heading, .row3-heading {
        font-size: 1.85rem;
      }

      .row2-image-card.tall {
        min-height: 320px;
      }
    }
  `]
})
export class ParticipaComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private observer: IntersectionObserver | null = null;

  ngAfterViewInit(): void {
    this.setupScrollObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupScrollObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            // Oculta el elemento cuando sale de la vista al desplazarse
            entry.target.classList.remove('visible');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = this.el.nativeElement.querySelectorAll('.scroll-reveal');
    elements.forEach((element: Element) => {
      this.observer?.observe(element);
    });
  }

  // Datos del contenido anterior conservados
  audiencias = [
    { svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`, title: 'Habitantes', desc: 'Residentes de La Vista y la zona que buscan construir tejido social activo.' },
    { svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 18h12M12 2v10m-4-6h8"/></svg>`, title: 'Especialistas', desc: 'Ingenieros, arquitectos bioclimáticos y biólogos para proyectos clave.' },
    { svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`, title: 'Investigadores', desc: 'Académicos en permacultura, física de suelos y dinámicas sociales.' },
    { svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.1 2 9 0 4.9-4 9-10 9z"/></svg>`, title: 'Productores', desc: 'Agricultores locales que suman cosechas y técnicas regenerativas.' },
    { svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>`, title: 'Chefs', desc: 'Gastrónomos enfocados en cocina de origen y consumo responsable.' },
    { svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 20 7 4 7 12 2"/></svg>`, title: 'Universidades', desc: 'Instituciones para prácticas profesionales y estancias de campo.' },
    { svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`, title: 'Escuelas', desc: 'Comunidades educativas para talleres y concientización ambiental.' },
    { svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>`, title: 'Familias', desc: 'Grupos familiares buscando contacto directo con la tierra y el bienestar.' },
    { svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`, title: 'Estudiantes', desc: 'Jóvenes aprendices y voluntarios en faenas y ecotecnología.' }
  ];
}
