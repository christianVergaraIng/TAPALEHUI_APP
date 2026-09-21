import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  NgZone,
  inject
} from '@angular/core';

type IconType =
  | 'casa'
  | 'retiro'
  | 'cerro'
  | 'granja-sol'
  | 'granja-tehuixtlera'
  | 'person'
  | 'person-group';

interface BubbleNode {
  id: string;
  labels?: string[];
  icon?: IconType;
  parentId?: string;
  homeRatioX: number;
  homeRatioY: number;
  offsetX: number;
  offsetY: number;
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  isMain: boolean;
  color: string;
  mass: number;
}

@Component({
  selector: 'app-la-comunidad',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-container">
      <!-- Header Banner Redtapalehui -->
      <section class="page-header">
        <h1 class="page-title">Red Tapalehui</h1>
      </section>

      <!-- Diagrama de Burbujas Interactivo con Efecto Glass iOS -->
      <section class="diagram-section">
        <div class="canvas-container">
          <canvas #canvas class="interactive-canvas"></canvas>
          <div class="canvas-indicator" [class.connected]="isCommunityConnected">
            @if (isCommunityConnected) {
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span>✨ Red Tapalehui Conectada — Pasa el cursor fuera para desvincular</span>
            } @else {
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v8M8 12h8"/>
              </svg>
              <span>Pasa el cursor sobre Casa Tapalehui (centro) para conectar la comunidad</span>
            }
          </div>
        </div>
      </section>

      <!--
      ========================================================================
      CONTENIDO HISTÓRICO DE LA COMUNIDAD (COMENTADO SEGÚN INDICACIÓN)
      ========================================================================
      <section class="identity-section">
        <div class="identity-grid">
          <div class="identity-card primary">
            <span class="card-tag">¿QUÉ SOMOS?</span>
            <h2 class="card-heading">Un Ecosistema Vivo de Convivencia y Sustentable</h2>
            <p>
              Tapalehui no es un fraccionamiento inmobiliario convencional ni una privada cerrada. Somos una comunidad sustentable comprometida con el desarrollo armónico del ser humano, la conservación del suelo y el fortalecimiento del tejido social en el estado de Morelos.
            </p>
          </div>

          <div class="mision-vision-stack">
            <div class="mv-card">
              <div class="mv-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
              <div class="mv-content">
                <h3>Misión</h3>
                <p>
                  Promover un modelo de vida comunitario autosustentable que integre la bioconstrucción, la producción agroecológica y la educación social, regenerando el medio ambiente y garantizando la calidad de vida de sus habitantes.
                </p>
              </div>
            </div>

            <div class="mv-card">
              <div class="mv-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
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

      <section class="timeline-section">
        <div class="section-title-wrap text-center">
          <span class="section-subtitle">NUESTRO RECORRIDO</span>
          <h2 class="section-title">Nuestra Historia</h2>
          <p class="section-desc">Evolución constante desde 1985 transformando un espacio de retiro en una comunidad integral.</p>
        </div>

        <div class="timeline-wrapper">
          <div class="timeline-line"></div>
          @for (item of historyEvents; track item.year) {
            <div class="timeline-item">
              <div class="timeline-badge">{{ item.year }}</div>
              <div class="timeline-content">
                <h3 class="timeline-title">{{ item.title }}</h3>
                <p class="timeline-desc">{{ item.description }}</p>
              </div>
            </div>
          }
        </div>
      </section>

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
                <div class="diff-icon" [innerHTML]="diff.svgIcon"></div>
                <div class="diff-body">
                  <h3 class="diff-title">{{ diff.title }}</h3>
                  <p class="diff-text">{{ diff.description }}</p>
                </div>
              </div>
            }
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
      padding: 2.5rem 1.5rem 4rem;
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }

    .page-header {
      text-align: center;
      max-width: 820px;
      margin: 0 auto;
    }

    .header-badge {
      display: inline-block;
      padding: 0.4rem 1rem;
      border-radius: 20px;
      background: var(--color-terracotta-bg);
      color: var(--color-terracotta);
      font-size: 0.82rem;
      font-weight: 800;
      letter-spacing: 0.12em;
      margin-bottom: 0.75rem;
    }

    .page-title {
      font-family: 'Outfit', sans-serif;
      font-size: 2.75rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 0.75rem;
    }

    .page-subtitle {
      font-size: 1.05rem;
      color: var(--text-muted);
      line-height: 1.6;
    }

    /* Diagram Section */
    .diagram-section {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .canvas-container {
      position: relative;
      width: 100%;
      max-width: 1100px;
      height: 640px;
      background: var(--bg-surface);
      border: 1px solid var(--border-color-highlight);
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.06);
    }

    .interactive-canvas {
      width: 100%;
      height: 100%;
      display: block;
      touch-action: none;
    }

    .canvas-indicator {
      position: absolute;
      bottom: 1.25rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.55rem 1.25rem;
      border-radius: 30px;
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.35);
      color: var(--text-muted);
      font-size: 0.84rem;
      font-weight: 600;
      pointer-events: none;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      transition: all 0.3s ease;
    }

    .canvas-indicator.connected {
      background: rgba(41, 92, 43, 0.88);
      color: #FFFFFF;
      border-color: rgba(132, 204, 22, 0.60);
      box-shadow: 0 8px 28px rgba(41, 92, 43, 0.45);
    }

    @media (max-width: 768px) {
      .canvas-container {
        height: 520px;
      }
      .page-title {
        font-size: 2.1rem;
      }
    }
  `]
})
export class LaComunidadComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ngZone = inject(NgZone);
  private animationFrameId: number | null = null;
  private bubbles: BubbleNode[] = [];

  isCommunityConnected = false;
  private connectionPulse = 0;

  private mouse = {
    x: -9999,
    y: -9999,
    lastX: -9999,
    lastY: -9999,
    vx: 0,
    vy: 0,
    isOverCasa: false
  };

  private resizeObserver: ResizeObserver | null = null;

  // Preserved data for commented-out sections
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
      svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
      title: 'No son un fraccionamiento',
      description: 'Sin lógica comercial de especulación; un proyecto centrado en la vida y el habitar consciente.'
    },
    {
      svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19v3"/><path d="M8 19h8"/><path d="M12 2a7 7 0 0 0-7 7c0 3.87 3.13 7 7 7s7-3.13 7-7a7 7 0 0 0-7-7z"/></svg>`,
      title: 'Viven sin bardas',
      description: 'Espacios fluidos sin muros divisorios opresivos, integrando los jardines y veredas comunes.'
    },
    {
      svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
      title: 'Pozo comunitario compartido',
      description: 'Gestión colectiva responsable del agua potable y sistemas de recolección pluvial.'
    },
    {
      svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      title: 'Participación activa',
      description: 'Decisiones compartidas y colaboración directa en el mantenimiento y desarrollo del entorno.'
    },
    {
      svgIcon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.1 2 9 0 4.9-4 9-10 9z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
      title: 'Regeneración del entorno',
      description: 'Restauración continua de 150+ hectáreas destinadas a conservación y cultivos limpios.'
    }
  ];

  ngAfterViewInit(): void {
    if (!this.canvasRef) return;
    const canvas = this.canvasRef.nativeElement;

    this.setupListeners(canvas);
    this.initBubbles(canvas);

    this.ngZone.runOutsideAngular(() => {
      this.startLoop(canvas);
    });

    this.resizeObserver = new ResizeObserver(() => {
      this.updateCanvasDimensions(canvas);
    });
    this.resizeObserver.observe(canvas.parentElement || canvas);
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private setupListeners(canvas: HTMLCanvasElement) {
    const updateMouse = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const newX = clientX - rect.left;
      const newY = clientY - rect.top;

      if (this.mouse.lastX !== -9999) {
        this.mouse.vx = newX - this.mouse.lastX;
        this.mouse.vy = newY - this.mouse.lastY;
      }
      this.mouse.x = newX;
      this.mouse.y = newY;
      this.mouse.lastX = newX;
      this.mouse.lastY = newY;

      // Activate community connection animation on cursor HOVER over Casa Tapalehui
      const casaNode = this.bubbles.find((b) => b.id === 'casa-tapalehui');
      if (casaNode) {
        const dist = Math.hypot(newX - casaNode.x, newY - casaNode.y);
        const isHoveringCenter = dist <= casaNode.radius + 60;

        if (isHoveringCenter && !this.isCommunityConnected) {
          this.setCommunityConnected(true);
        } else if (!isHoveringCenter && dist > casaNode.radius + 150 && this.isCommunityConnected) {
          this.setCommunityConnected(false);
        }

        this.mouse.isOverCasa = dist <= casaNode.radius + 10;
        canvas.style.cursor = this.mouse.isOverCasa ? 'pointer' : 'default';
      }
    };

    canvas.addEventListener('mousemove', (e) => {
      updateMouse(e.clientX, e.clientY);
    });

    canvas.addEventListener('mouseleave', () => {
      this.mouse.x = -9999;
      this.mouse.y = -9999;
      this.mouse.vx = 0;
      this.mouse.vy = 0;
      this.mouse.isOverCasa = false;
      canvas.style.cursor = 'default';
      if (this.isCommunityConnected) {
        this.setCommunityConnected(false);
      }
    });

    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    canvas.addEventListener('touchend', () => {
      this.mouse.x = -9999;
      this.mouse.y = -9999;
      if (this.isCommunityConnected) {
        this.setCommunityConnected(false);
      }
    });
  }

  private setCommunityConnected(connected: boolean) {
    this.ngZone.run(() => {
      this.isCommunityConnected = connected;
    });

    if (connected) {
      this.connectionPulse = 1.0;
      this.bubbles.forEach((b) => {
        b.vx = (b.homeX - b.x) * 0.22;
        b.vy = (b.homeY - b.y) * 0.22;
      });
    }
  }

  private initBubbles(canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 1000;
    const h = rect.height || 640;

    const mainColor = '#538747';
    const ambientColor = '#59934B';

    // Base radii for the glass nodes
    const casaBaseRadius = 96;
    const surroundBaseRadius = 78;

    // The 4 petals sit tangent to Casa Tapalehui (just touching, not overlapping),
    // with a small breathing gap so no label is ever clipped by a neighboring sphere.
    const nodeGap = 8;
    const offsetY = casaBaseRadius + surroundBaseRadius + nodeGap;
    const offsetX = casaBaseRadius + surroundBaseRadius + nodeGap;

    const cx = 0.50;
    const cy = 0.50;

    // 5 Main central nodes with non-obscuring home coordinates
    const mainNodes: {
      id: string;
      labels: string[];
      icon: IconType;
      homeRatioX: number;
      homeRatioY: number;
      pixelOffsetY?: number;
      pixelOffsetX?: number;
      baseRadius: number;
      isMain: boolean;
      mass: number;
      color: string;
    }[] = [
      {
        id: 'casa-tapalehui',
        labels: ['Casa', 'Tapalehui'],
        icon: 'casa',
        homeRatioX: cx,
        homeRatioY: cy,
        pixelOffsetX: 0,
        pixelOffsetY: 0,
        baseRadius: casaBaseRadius,
        isMain: true,
        mass: 4.5,
        color: mainColor
      },
      {
        id: 'centro-retiros',
        labels: ['Centro de', 'Retiros'],
        icon: 'retiro',
        homeRatioX: cx,
        homeRatioY: cy,
        pixelOffsetX: 0,
        pixelOffsetY: -offsetY,
        baseRadius: surroundBaseRadius,
        isMain: true,
        mass: 3.2,
        color: mainColor
      },
      {
        id: 'granja-tehuixtlera',
        labels: ['Granja', 'Tehuixtlera'],
        icon: 'granja-tehuixtlera',
        homeRatioX: cx,
        homeRatioY: cy,
        pixelOffsetX: offsetX,
        pixelOffsetY: 0,
        baseRadius: surroundBaseRadius,
        isMain: true,
        mass: 3.2,
        color: mainColor
      },
      {
        id: 'granja-sol',
        labels: ['Granja del', 'Sol'],
        icon: 'granja-sol',
        homeRatioX: cx,
        homeRatioY: cy,
        pixelOffsetX: 0,
        pixelOffsetY: offsetY,
        baseRadius: surroundBaseRadius,
        isMain: true,
        mass: 3.2,
        color: mainColor
      },
      {
        id: 'cerro-sapo',
        labels: ['Cerro del', 'Sapo'],
        icon: 'cerro',
        homeRatioX: cx,
        homeRatioY: cy,
        pixelOffsetX: -offsetX,
        pixelOffsetY: 0,
        baseRadius: surroundBaseRadius,
        isMain: true,
        mass: 3.2,
        color: mainColor
      }
    ];

    // Ambient floating bubbles surrounding main nodes ("people" of the network).
    // Most carry a single-person icon; a few carry a person-group icon for variety,
    // matching the reference collage.
    const ambientOffsets: { rx: number; ry: number; r: number; icon: IconType }[] = [
      // Left cluster
      { rx: 0.10, ry: 0.14, r: 30, icon: 'person' },
      { rx: 0.17, ry: 0.10, r: 28, icon: 'person' },
      { rx: 0.26, ry: 0.11, r: 26, icon: 'person' },
      { rx: 0.06, ry: 0.30, r: 28, icon: 'person' },
      { rx: 0.16, ry: 0.27, r: 32, icon: 'person' },
      { rx: 0.25, ry: 0.28, r: 26, icon: 'person' },
      { rx: 0.05, ry: 0.46, r: 30, icon: 'person' },
      { rx: 0.13, ry: 0.41, r: 24, icon: 'person' },
      { rx: 0.08, ry: 0.60, r: 29, icon: 'person-group' },
      { rx: 0.16, ry: 0.65, r: 27, icon: 'person' },
      { rx: 0.12, ry: 0.79, r: 32, icon: 'person' },
      { rx: 0.22, ry: 0.81, r: 28, icon: 'person' },
      { rx: 0.29, ry: 0.92, r: 31, icon: 'person' },

      // Top cluster
      { rx: 0.39, ry: 0.08, r: 33, icon: 'person' },
      { rx: 0.73, ry: 0.09, r: 32, icon: 'person' },
      { rx: 0.85, ry: 0.10, r: 31, icon: 'person' },
      { rx: 0.60, ry: 0.21, r: 26, icon: 'person' },
      { rx: 0.74, ry: 0.22, r: 28, icon: 'person' },

      // Right cluster
      { rx: 0.91, ry: 0.23, r: 27, icon: 'person' },
      { rx: 0.81, ry: 0.29, r: 29, icon: 'person' },
      { rx: 0.93, ry: 0.45, r: 29, icon: 'person' },
      { rx: 0.80, ry: 0.52, r: 33, icon: 'person' },
      { rx: 0.89, ry: 0.63, r: 28, icon: 'person' },
      { rx: 0.77, ry: 0.71, r: 29, icon: 'person' },
      { rx: 0.69, ry: 0.77, r: 30, icon: 'person' },
      { rx: 0.87, ry: 0.82, r: 30, icon: 'person-group' },
      { rx: 0.78, ry: 0.90, r: 32, icon: 'person' },
      { rx: 0.69, ry: 0.91, r: 29, icon: 'person' },

      // Bottom center cluster
      { rx: 0.43, ry: 0.92, r: 26, icon: 'person' }
    ];

    this.bubbles = [];

    // Create main bubbles
    mainNodes.forEach((node, index) => {
      const hX = node.homeRatioX * w + (node.pixelOffsetX || 0);
      const hY = node.homeRatioY * h + (node.pixelOffsetY || 0);
      this.bubbles.push({
        id: node.id || `main-${index}`,
        labels: node.labels,
        icon: node.icon,
        homeRatioX: node.homeRatioX,
        homeRatioY: node.homeRatioY,
        offsetX: node.pixelOffsetX || 0,
        offsetY: node.pixelOffsetY || 0,
        homeX: hX,
        homeY: hY,
        x: hX,
        y: hY,
        vx: 0,
        vy: 0,
        radius: node.baseRadius,
        baseRadius: node.baseRadius,
        isMain: true,
        color: node.color,
        mass: node.mass
      });
    });

    // Create ambient bubbles
    ambientOffsets.forEach((amb, index) => {
      const hX = amb.rx * w;
      const hY = amb.ry * h;
      this.bubbles.push({
        id: `amb-${index}`,
        icon: amb.icon,
        homeRatioX: amb.rx,
        homeRatioY: amb.ry,
        offsetX: 0,
        offsetY: 0,
        homeX: hX,
        homeY: hY,
        x: hX,
        y: hY,
        vx: 0,
        vy: 0,
        radius: amb.r,
        baseRadius: amb.r,
        isMain: false,
        color: ambientColor,
        mass: 1.0
      });
    });

    this.assignClusterParents();
    this.updateCanvasDimensions(canvas);
  }

  /**
   * Links every ambient "person" bubble to its nearest surrounding main node,
   * then grows an organic nearest-neighbor tree within that cluster (similar to
   * a Prim's-algorithm minimum spanning tree). This produces the branching,
   * tube-like network of connections seen in the reference artwork instead of
   * a flat hub-and-spoke layout.
   */
  private assignClusterParents() {
    const mainSurround = this.bubbles.filter((b) => b.isMain && b.id !== 'casa-tapalehui');
    const ambient = this.bubbles.filter((b) => !b.isMain);

    const groups = new Map<string, BubbleNode[]>();
    ambient.forEach((b) => {
      let nearest = mainSurround[0];
      let nearestDist = Infinity;
      mainSurround.forEach((m) => {
        const d = Math.hypot(m.homeX - b.homeX, m.homeY - b.homeY);
        if (d < nearestDist) {
          nearestDist = d;
          nearest = m;
        }
      });
      if (!groups.has(nearest.id)) groups.set(nearest.id, []);
      groups.get(nearest.id)!.push(b);
    });

    groups.forEach((nodes, rootId) => {
      const root = this.bubbles.find((b) => b.id === rootId);
      if (!root) return;

      const placed: BubbleNode[] = [root];
      const remaining = [...nodes];

      while (remaining.length) {
        let bestI = 0;
        let bestJ = 0;
        let bestDist = Infinity;

        for (let i = 0; i < remaining.length; i++) {
          for (let j = 0; j < placed.length; j++) {
            const d = Math.hypot(
              remaining[i].homeX - placed[j].homeX,
              remaining[i].homeY - placed[j].homeY
            );
            if (d < bestDist) {
              bestDist = d;
              bestI = i;
              bestJ = j;
            }
          }
        }

        const chosen = remaining.splice(bestI, 1)[0];
        chosen.parentId = placed[bestJ].id;
        placed.push(chosen);
      }
    });
  }

  private updateCanvasDimensions(canvas: HTMLCanvasElement) {
    const parent = canvas.parentElement || canvas;
    const rect = parent.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const w = rect.width;
    const h = rect.height;

    const scaleFactor = Math.min(w / 1000, h / 640);
    const clampedScale = Math.max(0.65, Math.min(1.2, scaleFactor));

    this.bubbles.forEach((b) => {
      b.homeX = b.homeRatioX * w + (b.offsetX * clampedScale);
      b.homeY = b.homeRatioY * h + (b.offsetY * clampedScale);
      b.radius = b.baseRadius * clampedScale;
    });
  }

  private startLoop(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      this.updatePhysics(width, height);
      this.draw(ctx, width, height);

      ctx.restore();

      this.animationFrameId = requestAnimationFrame(loop);
    };

    loop();
  }

  private updatePhysics(w: number, h: number) {
    if (this.connectionPulse > 0) {
      this.connectionPulse -= 0.025;
      if (this.connectionPulse < 0) this.connectionPulse = 0;
    }

    const springKBase = this.isCommunityConnected ? 0.09 : 0.05;
    const frictionBase = this.isCommunityConnected ? 0.74 : 0.78;

    for (const b of this.bubbles) {
      const dxHome = b.homeX - b.x;
      const dyHome = b.homeY - b.y;

      b.vx += dxHome * springKBase;
      b.vy += dyHome * springKBase;

      b.vx *= frictionBase;
      b.vy *= frictionBase;

      // Subtler magnetic cursor push
      if (this.mouse.x !== -9999 && this.mouse.y !== -9999) {
        const mdx = b.x - this.mouse.x;
        const mdy = b.y - this.mouse.y;
        const mdist = Math.hypot(mdx, mdy);

        const magneticRadius = b.radius + (b.isMain ? 60 : 40);

        if (mdist < magneticRadius && mdist > 0.001) {
          const factor = (1 - mdist / magneticRadius);
          const pushForce = factor * factor * (this.isCommunityConnected ? 0.3 : (b.isMain ? 0.9 : 1.8));

          const nx = mdx / mdist;
          const ny = mdy / mdist;

          b.vx += nx * pushForce;
          b.vy += ny * pushForce;

          b.vx += this.mouse.vx * 0.03 * factor;
          b.vy += this.mouse.vy * 0.03 * factor;
        }
      }

      b.x += b.vx;
      b.y += b.vy;
    }

    this.mouse.vx *= 0.4;
    this.mouse.vy *= 0.4;

    // Circle Collisions (EXCLUDE main-to-main collision push so they stay in precise clover formation)
    for (let i = 0; i < this.bubbles.length; i++) {
      for (let j = i + 1; j < this.bubbles.length; j++) {
        const b1 = this.bubbles[i];
        const b2 = this.bubbles[j];

        if (b1.isMain && b2.isMain) {
          continue;
        }

        const cdx = b2.x - b1.x;
        const cdy = b2.y - b1.y;
        const cdist = Math.hypot(cdx, cdy);
        const minDist = b1.radius + b2.radius;

        if (cdist < minDist && cdist > 0.001) {
          const overlap = minDist - cdist;
          const nx = cdx / cdist;
          const ny = cdy / cdist;

          const mTotal = b1.mass + b2.mass;
          const r1 = b2.mass / mTotal;
          const r2 = b1.mass / mTotal;

          b1.x -= nx * overlap * r1 * 0.40;
          b1.y -= ny * overlap * r1 * 0.40;
          b2.x += nx * overlap * r2 * 0.40;
          b2.y += ny * overlap * r2 * 0.40;

          const kx = b1.vx - b2.vx;
          const ky = b1.vy - b2.vy;
          const p = (nx * kx + ny * ky) / mTotal;

          b1.vx -= p * b2.mass * nx * 0.35;
          b1.vy -= p * b2.mass * ny * 0.35;
          b2.vx += p * b1.mass * nx * 0.35;
          b2.vy += p * b1.mass * ny * 0.35;
        }
      }
    }
  }

  private draw(ctx: CanvasRenderingContext2D, w: number, h: number) {
    const casaNode = this.bubbles.find((b) => b.id === 'casa-tapalehui');

    // 1. Draw the organic network of "liquid glass" tube connectors + joint dots,
    // BEHIND every bubble, so each sphere sits cleanly on top of its links.
    this.drawConnectorNetwork(ctx, casaNode);

    // Animated pulse wave expanding from Casa Tapalehui on hover activation
    if (casaNode && this.connectionPulse > 0) {
      const pulseRadius = casaNode.radius + (1 - this.connectionPulse) * 350;
      ctx.beginPath();
      ctx.arc(casaNode.x, casaNode.y, pulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(132, 204, 22, ${this.connectionPulse * 0.75})`;
      ctx.lineWidth = 4;
      ctx.stroke();
    }

    // 2. Render Bubbles in specific layer order with glossy liquid-glass styling
    const ambientBubbles = this.bubbles.filter((b) => !b.isMain);
    const surroundingMainNodes = this.bubbles.filter((b) => b.isMain && b.id !== 'casa-tapalehui');

    const sortedDrawList = [
      ...ambientBubbles,
      ...surroundingMainNodes,
      ...(casaNode ? [casaNode] : [])
    ];

    for (const b of sortedDrawList) {
      this.drawBubble(ctx, b, b.id === 'casa-tapalehui');
    }
  }

  /**
   * Draws every connector as a rounded "glass tube" capsule (not a thin line),
   * with a small glossy joint sphere at each far end — matching the organic,
   * branching look of the reference artwork.
   */
  private drawConnectorNetwork(ctx: CanvasRenderingContext2D, casaNode: BubbleNode | undefined) {
    const connected = this.isCommunityConnected;

    // Casa Tapalehui <-> the 4 surrounding main nodes
    if (casaNode) {
      this.bubbles
        .filter((b) => b.isMain && b !== casaNode)
        .forEach((b) => {
          const tubeWidth = connected ? 6 : 4;
          const alpha = connected ? 0.85 : 0.4;
          this.drawCapsuleConnector(ctx, casaNode, b, tubeWidth, alpha, true);
        });
    }

    // Every ambient "person" bubble <-> its assigned parent (organic tree)
    this.bubbles
      .filter((b) => !b.isMain && b.parentId)
      .forEach((b) => {
        const parent = this.bubbles.find((p) => p.id === b.parentId);
        if (!parent) return;
        const tubeWidth = connected ? 3.5 : 2.5;
        const alpha = connected ? 0.75 : 0.4;
        this.drawCapsuleConnector(ctx, parent, b, tubeWidth, alpha, false);
      });
  }

  private drawCapsuleConnector(
    ctx: CanvasRenderingContext2D,
    from: BubbleNode,
    to: BubbleNode,
    width: number,
    alpha: number,
    withJointDots: boolean
  ) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.hypot(dx, dy);
    if (len < 0.001) return;

    const ux = dx / len;
    const uy = dy / len;
    const nx = -uy;
    const ny = ux;
    const hw = width / 2;

    // Pull the tube endpoints in slightly so they tuck under the spheres' rims
    const x1 = from.x + ux * (from.radius * 0.55);
    const y1 = from.y + uy * (from.radius * 0.55);
    const x2 = to.x - ux * (to.radius * 0.55);
    const y2 = to.y - uy * (to.radius * 0.55);

    ctx.save();
    ctx.globalAlpha = alpha;

    // Tube body: soft light-to-mid green gradient along its length
    const bodyGrad = ctx.createLinearGradient(x1, y1, x2, y2);
    bodyGrad.addColorStop(0, 'rgba(168, 214, 148, 0.95)');
    bodyGrad.addColorStop(0.5, 'rgba(120, 178, 100, 0.85)');
    bodyGrad.addColorStop(1, 'rgba(168, 214, 148, 0.95)');

    ctx.beginPath();
    ctx.moveTo(x1 + nx * hw, y1 + ny * hw);
    ctx.lineTo(x2 + nx * hw, y2 + ny * hw);
    ctx.arc(x2, y2, hw, Math.atan2(ny, nx), Math.atan2(-ny, -nx), false);
    ctx.lineTo(x1 - nx * hw, y1 - ny * hw);
    ctx.arc(x1, y1, hw, Math.atan2(-ny, -nx), Math.atan2(ny, nx), false);
    ctx.closePath();
    ctx.fillStyle = bodyGrad;
    ctx.fill();

    // Glassy top-edge highlight running along the tube (subtler than before)
    ctx.beginPath();
    ctx.moveTo(x1 + nx * hw * 0.4, y1 + ny * hw * 0.4);
    ctx.lineTo(x2 + nx * hw * 0.4, y2 + ny * hw * 0.4);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.30)';
    ctx.lineWidth = Math.max(1, hw * 0.3);
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.restore();

    // Small joint spheres marking each connection point — kept subtle
    if (withJointDots) {
      const jointR = Math.max(3, width * 0.55);
      this.drawJointDot(ctx, x1, y1, jointR, alpha);
      this.drawJointDot(ctx, x2, y2, jointR, alpha);
    } else {
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      this.drawJointDot(ctx, midX, midY, Math.max(2.5, width * 0.5), alpha);
    }
  }

  private drawJointDot(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, alpha: number) {
    ctx.save();
    ctx.globalAlpha = alpha;

    const grad = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.05, x, y, r);
    grad.addColorStop(0, 'rgba(190, 226, 170, 0.95)');
    grad.addColorStop(1, 'rgba(90, 150, 72, 0.90)');

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.restore();
  }

  /**
   * Renders a single node as a glossy "liquid glass" sphere: a rich radial
   * gradient body, a bright specular highlight, a soft rim light, and either
   * an icon glyph (main nodes / people) or nothing, plus text labels.
   */
  private drawBubble(ctx: CanvasRenderingContext2D, b: BubbleNode, isCasa: boolean) {
    ctx.save();

    let isHovered = false;
    if (this.mouse.x !== -9999 && this.mouse.y !== -9999) {
      const mdist = Math.hypot(b.x - this.mouse.x, b.y - this.mouse.y);
      if (mdist < b.radius) {
        isHovered = true;
      }
    }

    // Outer aura glow — now reserved for hover / active-connection feedback only,
    // so idle bubbles read as calm, flat glass rather than constantly glowing.
    if ((this.isCommunityConnected && b.isMain) || isHovered) {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius + (isHovered ? 6 : 4), 0, Math.PI * 2);
      if (this.isCommunityConnected) {
        ctx.fillStyle = isCasa ? 'rgba(132, 204, 22, 0.22)' : 'rgba(85, 139, 71, 0.14)';
      } else {
        ctx.fillStyle = 'rgba(85, 139, 71, 0.18)';
      }
      ctx.fill();
    }

    // Sphere body: soft radial gradient (gentle highlight upper-left, muted base)
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);

    const grad = ctx.createRadialGradient(
      b.x - b.radius * 0.35,
      b.y - b.radius * 0.4,
      b.radius * 0.05,
      b.x + b.radius * 0.1,
      b.y + b.radius * 0.15,
      b.radius * 1.05
    );

    if (isCasa) {
      if (this.isCommunityConnected) {
        grad.addColorStop(0, 'rgba(140, 198, 108, 0.96)');
        grad.addColorStop(0.5, 'rgba(80, 146, 66, 0.94)');
        grad.addColorStop(1, 'rgba(46, 92, 38, 0.95)');
      } else {
        grad.addColorStop(0, 'rgba(126, 182, 100, 0.94)');
        grad.addColorStop(0.5, 'rgba(72, 132, 58, 0.92)');
        grad.addColorStop(1, 'rgba(40, 82, 34, 0.94)');
      }
    } else if (b.isMain) {
      grad.addColorStop(0, 'rgba(118, 172, 94, 0.90)');
      grad.addColorStop(0.5, 'rgba(64, 120, 52, 0.88)');
      grad.addColorStop(1, 'rgba(36, 76, 30, 0.90)');
    } else {
      grad.addColorStop(0, 'rgba(114, 164, 92, 0.86)');
      grad.addColorStop(0.55, 'rgba(60, 112, 50, 0.84)');
      grad.addColorStop(1, 'rgba(32, 68, 28, 0.86)');
    }

    ctx.fillStyle = grad;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.16)';
    ctx.shadowBlur = b.isMain ? 8 : 4;
    ctx.shadowOffsetY = 3;
    ctx.fill();
    ctx.shadowColor = 'transparent';

    // Soft specular highlight (subtle glass sheen, not a bright lens flare)
    ctx.save();
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.clip();

    const specGrad = ctx.createRadialGradient(
      b.x - b.radius * 0.4,
      b.y - b.radius * 0.46,
      0,
      b.x - b.radius * 0.4,
      b.y - b.radius * 0.46,
      b.radius * 0.6
    );
    specGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
    specGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.12)');
    specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.beginPath();
    ctx.ellipse(
      b.x - b.radius * 0.38,
      b.y - b.radius * 0.44,
      b.radius * 0.5,
      b.radius * 0.36,
      -0.5,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = specGrad;
    ctx.fill();

    // Soft bottom rim light (barely-there, just enough to read as glass)
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius - 2, Math.PI * 0.2, Math.PI * 0.8);
    ctx.strokeStyle = 'rgba(210, 240, 190, 0.14)';
    ctx.lineWidth = b.radius * 0.08;
    ctx.stroke();
    ctx.restore();

    // Thin, quiet glass rim stroke
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    const strokeGrad = ctx.createLinearGradient(
      b.x - b.radius,
      b.y - b.radius,
      b.x + b.radius,
      b.y + b.radius
    );
    strokeGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
    strokeGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.16)');
    strokeGrad.addColorStop(1, 'rgba(255, 255, 255, 0.08)');
    ctx.strokeStyle = strokeGrad;
    ctx.lineWidth = b.isMain ? 1.4 : 1;
    ctx.stroke();

    // Icon glyph + text labels
    if (b.icon) {
      const hasLabels = !!(b.labels && b.labels.length > 0);
      const iconSize = b.radius * (b.isMain ? 0.52 : 0.62);
      const iconY = hasLabels ? b.y - b.radius * 0.28 : b.y;
      this.drawIcon(ctx, b.icon, b.x, iconY, iconSize);
    }

    if (b.labels && b.labels.length > 0) {
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
      ctx.shadowBlur = 3;
      ctx.shadowOffsetY = 1;

      const fontSize = Math.max(13, Math.min(22, b.radius * 0.22));
      ctx.font = `800 ${fontSize}px 'Outfit', sans-serif`;

      const lineHeight = fontSize * 1.2;
      const textStartY = b.y + b.radius * 0.18;

      b.labels.forEach((line, idx) => {
        ctx.fillText(line, b.x, textStartY + idx * lineHeight);
      });

      ctx.shadowColor = 'transparent';
    }

    ctx.restore();
  }

  /**
   * Draws a simple white glyph centered at (cx, cy) scaled to `size`, matching
   * the flat, friendly iconography of the reference artwork.
   */
  private drawIcon(ctx: CanvasRenderingContext2D, icon: IconType, cx: number, cy: number, size: number) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    switch (icon) {
      case 'casa': {
        const s = size;
        ctx.lineWidth = s * 0.11;
        // Roof
        ctx.beginPath();
        ctx.moveTo(-s * 0.62, -s * 0.02);
        ctx.lineTo(0, -s * 0.62);
        ctx.lineTo(s * 0.62, -s * 0.02);
        ctx.stroke();
        // Walls
        ctx.beginPath();
        ctx.moveTo(-s * 0.42, -s * 0.06);
        ctx.lineTo(-s * 0.42, s * 0.6);
        ctx.lineTo(s * 0.42, s * 0.6);
        ctx.lineTo(s * 0.42, -s * 0.06);
        ctx.stroke();
        // Sprout above the roof
        ctx.lineWidth = s * 0.09;
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.62);
        ctx.lineTo(0, -s * 0.95);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(-s * 0.14, -s * 0.9, s * 0.14, s * 0.09, -0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(s * 0.14, -s * 0.9, s * 0.14, s * 0.09, 0.6, 0, Math.PI * 2);
        ctx.fill();
        break;
      }

      case 'retiro': {
        const s = size;
        ctx.lineWidth = s * 0.1;
        // Cupped hands
        ctx.beginPath();
        ctx.moveTo(-s * 0.65, s * 0.05);
        ctx.quadraticCurveTo(-s * 0.55, s * 0.55, 0, s * 0.55);
        ctx.quadraticCurveTo(s * 0.55, s * 0.55, s * 0.65, s * 0.05);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-s * 0.65, s * 0.05);
        ctx.quadraticCurveTo(-s * 0.45, -s * 0.05, -s * 0.22, s * 0.12);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(s * 0.65, s * 0.05);
        ctx.quadraticCurveTo(s * 0.45, -s * 0.05, s * 0.22, s * 0.12);
        ctx.stroke();
        // Sprout rising from the hands
        ctx.lineWidth = s * 0.08;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.1);
        ctx.lineTo(0, -s * 0.35);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(-s * 0.16, -s * 0.32, s * 0.17, s * 0.1, -0.55, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(s * 0.16, -s * 0.32, s * 0.17, s * 0.1, 0.55, 0, Math.PI * 2);
        ctx.fill();
        break;
      }

      case 'cerro': {
        const s = size;
        ctx.lineWidth = s * 0.1;
        ctx.beginPath();
        ctx.moveTo(-s * 0.7, s * 0.35);
        ctx.lineTo(-s * 0.28, -s * 0.1);
        ctx.lineTo(-s * 0.02, s * 0.16);
        ctx.lineTo(s * 0.3, -s * 0.45);
        ctx.lineTo(s * 0.7, s * 0.35);
        ctx.stroke();
        break;
      }

      case 'granja-tehuixtlera': {
        const s = size;
        ctx.lineWidth = s * 0.1;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.55);
        ctx.lineTo(0, -s * 0.15);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(-s * 0.22, -s * 0.18, s * 0.24, s * 0.15, -0.55, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(s * 0.22, -s * 0.18, s * 0.24, s * 0.15, 0.55, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(0, -s * 0.5, s * 0.16, s * 0.22, 0, 0, Math.PI * 2);
        ctx.fill();
        break;
      }

      case 'granja-sol': {
        const s = size;
        ctx.lineWidth = s * 0.11;
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.32, 0, Math.PI * 2);
        ctx.stroke();
        for (let i = 0; i < 8; i++) {
          const angle = (Math.PI / 4) * i;
          const r1 = s * 0.52;
          const r2 = s * 0.8;
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * r1, Math.sin(angle) * r1);
          ctx.lineTo(Math.cos(angle) * r2, Math.sin(angle) * r2);
          ctx.stroke();
        }
        break;
      }

      case 'person': {
        const s = size;
        ctx.beginPath();
        ctx.arc(0, -s * 0.38, s * 0.32, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, s * 0.55, s * 0.58, Math.PI, Math.PI * 2);
        ctx.fill();
        break;
      }

      case 'person-group': {
        const s = size * 0.85;
        const drawPerson = (offsetX: number, scale: number) => {
          ctx.beginPath();
          ctx.arc(offsetX, -s * 0.36 * scale, s * 0.28 * scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(offsetX, s * 0.5 * scale, s * 0.52 * scale, Math.PI, Math.PI * 2);
          ctx.fill();
        };
        ctx.globalAlpha = 0.85;
        drawPerson(-s * 0.4, 0.85);
        ctx.globalAlpha = 0.95;
        drawPerson(s * 0.4, 0.85);
        ctx.globalAlpha = 1;
        drawPerson(0, 1);
        break;
      }
    }

    ctx.restore();
  }
}