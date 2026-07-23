import { Component } from '@angular/core';
import { CountUpComponent } from '../../components/count-up/count-up';

@Component({
  selector: 'app-la-comunidad',
  standalone: true,
  imports: [CountUpComponent],
  template: `
    <div class="page-container">
      <!-- Header Banner -->
      <section class="page-header">
        <div class="header-badge">INSTITUCIONAL & IDENTIDAD</div>
        <h1 class="page-title">La Comunidad Tapalehui</h1>
        <p class="page-subtitle">
          Un proyecto de vida sostenible con historia, valores y una visión compartida hacia el futuro.
        </p>
      </section>

      <!-- ¿Qué somos? & Misión y Visión -->
      <section class="identity-section">
        <div class="identity-grid">
          <div class="identity-card primary">
            <span class="card-tag">¿QUÉ SOMOS?</span>
            <h2 class="card-heading">Un Ecosistema Vivo de Convivencia y Regeneración</h2>
            <p>
              Tapalehui no es un fraccionamiento inmobiliario convencional ni una privada cerrada. Somos una comunidad regenerativa comprometida con el desarrollo armónico del ser humano, la conservación del suelo y el fortalecimiento del tejido social en el estado de Morelos.
            </p>
          </div>

          <div class="mision-vision-stack">
            <div class="mv-card">
              <div class="mv-icon">🎯</div>
              <div class="mv-content">
                <h3>Misión</h3>
                <p>
                  Promover un modelo de vida comunitario autosustentable que integre la bioconstrucción, la producción agroecológica y la educación social, regenerando el medio ambiente y garantizando la calidad de vida de sus habitantes.
                </p>
              </div>
            </div>

            <div class="mv-card">
              <div class="mv-icon">🔭</div>
              <div class="mv-content">
                <h3>Visión</h3>
                <p>
                  Ser un referente latinoamericano de comunidades sostenibles autosuficientes, demostrando que es posible habitar la tierra con un impacto ambiental positivo, cohesión social y prosperidad compartida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Línea del tiempo / Historia (1985 a la actualidad) -->
      <section class="timeline-section">
        <div class="section-title-wrap text-center">
          <span class="section-subtitle">NUESTRO RECORRIDO</span>
          <h2 class="section-title">Nuestra Historia</h2>
          <p class="section-desc">Evolución constante desde <app-count-up end="1985"></app-count-up> transformando un espacio de retiro en una comunidad integral.</p>
        </div>

        <div class="timeline-wrapper">
          <div class="timeline-line"></div>
          @for (item of historyEvents; track item.year) {
            <div class="timeline-item">
              <div class="timeline-badge"><app-count-up [end]="item.year"></app-count-up></div>
              <div class="timeline-content">
                <h3 class="timeline-title">{{ item.title }}</h3>
                <p class="timeline-desc">{{ item.description }}</p>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Identidad y 7 Valores Clave -->
      <section class="valores-section">
        <div class="section-title-wrap text-center">
          <span class="section-subtitle">PRINCIPIOS MORALES & ÉTICOS</span>
          <h2 class="section-title">Los 7 Valores Tapalehui</h2>
          <p class="section-desc">Nuestra brújula cotidiana para la convivencia y la toma de decisiones.</p>
        </div>

        <div class="valores-grid">
          @for (val of valores; track val.name) {
            <div class="valor-card">
              <div class="valor-num">{{val.num}}</div>
              <h3 class="valor-name">{{ val.name }}</h3>
              <p class="valor-desc">{{ val.desc }}</p>
            </div>
          }
        </div>
      </section>

      <!-- Diferenciadores ("¿Por qué Tapalehui?") -->
      <section class="diferenciadores-section">
        <div class="diferenciadores-box">
          <div class="diferenciadores-header">
            <span class="section-subtitle light">NUESTRA ESENCIA</span>
            <h2 class="diferenciadores-title">¿Por qué Tapalehui?</h2>
            <p class="diferenciadores-subtitle">5 características que rompen con los esquemas urbanos tradicionales.</p>
          </div>

          <div class="diff-grid">
            @for (diff of diferenciadores; track diff.title) {
              <div class="diff-card">
                <div class="diff-icon">{{ diff.icon }}</div>
                <div class="diff-body">
                  <h3 class="diff-title">{{ diff.title }}</h3>
                  <p class="diff-text">{{ diff.description }}</p>
                </div>
              </div>
            }
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

    .page-header {
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
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
      line-height: 1.6;
    }

    /* Identity & Mission */
    .identity-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    .identity-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 2.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.04);
    }

    .identity-card.primary {
      background: var(--bg-surface);
      border-color: var(--border-color-highlight);
    }

    .card-tag {
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--color-brand-primary);
      letter-spacing: 0.1em;
      margin-bottom: 0.5rem;
    }

    .card-heading {
      font-family: 'Outfit', sans-serif;
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 1rem;
    }

    .identity-card p {
      color: var(--text-muted);
      line-height: 1.7;
      font-size: 1rem;
    }

    .mision-vision-stack {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .mv-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 1.75rem;
      display: flex;
      gap: 1.25rem;
      align-items: flex-start;
    }

    .mv-icon {
      font-size: 2rem;
      background: var(--bg-main);
      width: 50px;
      height: 50px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .mv-content h3 {
      font-family: 'Outfit', sans-serif;
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 0.4rem;
    }

    .mv-content p {
      font-size: 0.9rem;
      color: var(--text-muted);
      line-height: 1.6;
    }

    /* Timeline */
    .timeline-section {
      width: 100%;
    }

    .text-center {
      text-align: center;
    }

    .section-subtitle {
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.12em;
      color: var(--color-brand-primary);
    }

    .section-title {
      font-family: 'Outfit', sans-serif;
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--text-main);
      margin: 0.4rem 0;
    }

    .section-desc {
      color: var(--text-muted);
      max-width: 600px;
      margin: 0 auto 2.5rem;
    }

    .timeline-wrapper {
      position: relative;
      max-width: 900px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .timeline-line {
      position: absolute;
      left: 100px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--color-brand-primary);
      opacity: 0.3;
    }

    .timeline-item {
      display: flex;
      gap: 2.5rem;
      align-items: flex-start;
      position: relative;
    }

    .timeline-badge {
      width: 80px;
      padding: 0.5rem;
      border-radius: 10px;
      background: var(--color-brand-primary);
      color: #ffffff;
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 1rem;
      text-align: center;
      box-shadow: 0 4px 12px rgba(41, 92, 43, 0.3);
      flex-shrink: 0;
      z-index: 1;
    }

    .timeline-content {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 1.5rem;
      flex: 1;
    }

    .timeline-title {
      font-family: 'Outfit', sans-serif;
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 0.5rem;
    }

    .timeline-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
      line-height: 1.6;
    }

    /* Valores */
    .valores-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .valor-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 1.5rem;
      transition: transform 0.2s;
    }

    .valor-card:hover {
      transform: translateY(-4px);
      border-color: var(--border-color-highlight);
    }

    .valor-num {
      font-family: 'Outfit', sans-serif;
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--color-terracotta);
      margin-bottom: 0.5rem;
    }

    .valor-name {
      font-family: 'Outfit', sans-serif;
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 0.4rem;
    }

    .valor-desc {
      font-size: 0.88rem;
      color: var(--text-muted);
      line-height: 1.5;
    }

    /* Diferenciadores */
    .diferenciadores-box {
      background: var(--bg-surface);
      border: 1px solid var(--border-color-highlight);
      border-radius: 24px;
      padding: 3.5rem 2rem;
    }

    .diferenciadores-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .diferenciadores-title {
      font-family: 'Outfit', sans-serif;
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--text-main);
    }

    .diferenciadores-subtitle {
      color: var(--text-muted);
    }

    .diff-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .diff-card {
      background: var(--bg-main);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 1.5rem;
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }

    .diff-icon {
      font-size: 1.8rem;
      background: var(--card-bg);
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .diff-title {
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      font-size: 1.1rem;
      color: var(--text-main);
      margin-bottom: 0.3rem;
    }

    .diff-text {
      font-size: 0.88rem;
      color: var(--text-muted);
      line-height: 1.5;
    }

    @media (max-width: 800px) {
      .identity-grid {
        grid-template-columns: 1fr;
      }
      .timeline-line {
        left: 40px;
      }
      .timeline-item {
        flex-direction: column;
        gap: 0.75rem;
      }
      .timeline-badge {
        width: 70px;
      }
    }
  `]
})
export class LaComunidadComponent {
  historyEvents = [
    {
      year: '1985',
      title: 'Fundación como Casa de Retiro',
      description: 'Nace como un espacio de encuentro, descanso y reflexión en la naturaleza, sembrando la semilla de la comunidad.'
    },
    {
      year: '2000',
      title: 'Transición hacia la Sustentabilidad',
      description: 'Integración del pozo comunitario, primeros bio-huertos y adopción de políticas ecológicas de manejo de agua y residuos.'
    },
    {
      year: '2015',
      title: 'Consolidación de La Vista & Proyectos',
      description: 'Trazado del plan maestro de las 60 Casas-Huerta y articulación del Centro de Investigación Comunitaria.'
    },
    {
      year: '2026',
      title: 'Ecosistema de Red Tapalehui',
      description: 'Apertura de la red abierta para especialistas, escuelas, productores y familias comprometidas con la regeneración.'
    }
  ];

  valores = [
    { num: '01', name: 'Comunidad', desc: 'Priorizamos el bien común y la convivencia sólida por encima del individualismo aislado.' },
    { num: '02', name: 'Participación', desc: 'Cada miembro aporta sus saberes, energía y votos en faenas y asambleas horizontales.' },
    { num: '03', name: 'Inclusión', desc: 'Abrazamos la diversidad de orígenes, profesiones y edades en un entorno seguro y acogedor.' },
    { num: '04', name: 'Respeto', desc: 'Respeto mutuo entre seres humanos y reverencia sagrada hacia la flora y fauna regional.' },
    { num: '05', name: 'Regeneración', desc: 'No solo conservamos; sanamos activamente la tierra, las fuentes de agua y el bosque.' },
    { num: '06', name: 'Sustentabilidad', desc: 'Uso consciente de energía limpia, agua y recursos renovables con huella neutral.' },
    { num: '07', name: 'Colaboración', desc: 'Creamos alianzas con campesinos, universidades y vecinos para un impacto regional.' }
  ];

  diferenciadores = [
    {
      icon: '🏡',
      title: 'No son un fraccionamiento',
      description: 'Sin lógica comercial de especulación; un proyecto centrado en la vida y el habitar consciente.'
    },
    {
      icon: '🌳',
      title: 'Viven sin bardas',
      description: 'Espacios fluidos sin muros divisorios opresivos, integrando los jardines y veredas comunes.'
    },
    {
      icon: '💧',
      title: 'Pozo comunitario compartido',
      description: 'Gestión colectiva responsable del agua potable y sistemas de recolección pluvial.'
    },
    {
      icon: '🙌',
      title: 'Participación activa',
      description: 'Decisiones compartidas y colaboración directa en el mantenimiento y desarrollo del entorno.'
    },
    {
      icon: '🌿',
      title: 'Regeneración del entorno',
      description: 'Restauración continua de 150+ hectáreas destinadas a conservación y cultivos limpios.'
    }
  ];
}
