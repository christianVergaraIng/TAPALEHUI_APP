import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';

interface Nodo {
  id: number;
  x: number;
  y: number;
}

/**
 * Red de diálogos dibujada con SVG.
 * - Nodos distribuidos sobre una elipse (se calculan, no se posicionan a mano).
 * - Aristas entre nodos definidas como pares de índices.
 * - Foto central con dos variantes (claro/oscuro) que se intercambian por CSS.
 * - Colores como variables CSS: el tema cambia sin tocar TypeScript.
 */
@Component({
  selector: 'app-red-dialogos',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      class="red"
      viewBox="0 0 600 400"
      role="img"
      aria-label="Red de nueve participantes conectados alrededor del Centro de Investigación Comunitaria"
    >
      <defs>
        <clipPath id="clip-foto">
          <rect x="190" y="120" width="220" height="160" rx="14" />
        </clipPath>
      </defs>

      <!-- Fondo elíptico -->
      <ellipse class="halo" cx="300" cy="200" rx="288" ry="188" />

      <!-- Aristas -->
      <g class="aristas">
        @for (a of aristas; track $index) {
          <line
            class="arista"
            [class.activa]="esActiva(a[0], a[1])"
            [attr.x1]="nodos[a[0]].x"
            [attr.y1]="nodos[a[0]].y"
            [attr.x2]="nodos[a[1]].x"
            [attr.y2]="nodos[a[1]].y"
            pathLength="1"
            [style.--retardo.ms]="$index * 45"
          />
        }
      </g>

      <!-- Foto central -->
      <g class="foto">
        <rect class="foto-marco" x="186" y="116" width="228" height="168" rx="17" />
        <image
          class="img-claro"
          [attr.href]="fotoClara()"
          x="190" y="120" width="220" height="160"
          preserveAspectRatio="xMidYMid slice"
          clip-path="url(#clip-foto)"
        />
        <image
          class="img-oscuro"
          [attr.href]="fotoOscura()"
          x="190" y="120" width="220" height="160"
          preserveAspectRatio="xMidYMid slice"
          clip-path="url(#clip-foto)"
        />
      </g>

      <!-- Nodos -->
      <g class="nodos">
        @for (n of nodos; track n.id) {
          <circle
            class="nodo"
            [class.activo]="hover() === n.id"
            [attr.cx]="n.x"
            [attr.cy]="n.y"
            r="13"
            tabindex="0"
            (mouseenter)="hover.set(n.id)"
            (mouseleave)="hover.set(null)"
            (focus)="hover.set(n.id)"
            (blur)="hover.set(null)"
          />
        }
      </g>
    </svg>
  `,
  styles: [`
    /* ---------- Tokens de color (tema claro por defecto) ---------- */
    :host {
      --red-halo: #dcebc8;
      --red-halo-borde: transparent;
      --red-arista: #0d5275;
      --red-arista-opacidad: 0.28;
      --red-nodo: #0d5275;
      --red-nodo-borde: #08334a;
      --red-nodo-activo: #1479a8;
      --red-marco: #ffffff;

      display: block;
      width: 100%;
    }

    /* ---------- Tema oscuro (selección manual) ---------- */
    :host-context([data-theme='dark']) {
      --red-halo: rgba(255, 255, 255, 0.05);
      --red-halo-borde: rgba(255, 255, 255, 0.14);
      --red-arista: #d6e6da;
      --red-arista-opacidad: 0.4;
      --red-nodo: #3f9cc4;
      --red-nodo-borde: #d6ecf6;
      --red-nodo-activo: #7cc8e8;
    }

    /* ---------- Tema oscuro (sistema, si no hay selección manual) ---------- */
    @media (prefers-color-scheme: dark) {
      :host-context(:root:not([data-theme='light'])) {
        --red-halo: rgba(255, 255, 255, 0.05);
        --red-halo-borde: rgba(255, 255, 255, 0.14);
        --red-arista: #d6e6da;
        --red-arista-opacidad: 0.4;
        --red-nodo: #3f9cc4;
        --red-nodo-borde: #d6ecf6;
        --red-nodo-activo: #7cc8e8;
      }
    }

    .red {
      width: 100%;
      height: auto;
      display: block;
      overflow: visible;
    }

    .halo {
      fill: var(--red-halo);
      stroke: var(--red-halo-borde);
      stroke-width: 1.5;
    }

    /* ---------- Aristas ---------- */
    .arista {
      stroke: var(--red-arista);
      stroke-opacity: var(--red-arista-opacidad);
      stroke-width: 1.4;
      stroke-dasharray: 1;
      stroke-dashoffset: 0;
      transition: stroke-opacity 0.25s ease, stroke-width 0.25s ease;
    }

    .arista.activa {
      stroke-opacity: 0.95;
      stroke-width: 2.2;
    }

    /* Un solo momento de animación: las líneas se trazan una vez al cargar */
    @media (prefers-reduced-motion: no-preference) {
      .arista {
        animation: trazar 1.1s cubic-bezier(0.16, 1, 0.3, 1) both;
        animation-delay: var(--retardo, 0ms);
      }
    }

    @keyframes trazar {
      from { stroke-dashoffset: 1; }
      to   { stroke-dashoffset: 0; }
    }

    /* ---------- Foto central ---------- */
    .foto-marco {
      fill: var(--red-marco);
    }

    .img-oscuro { display: none; }

    :host-context([data-theme='dark']) .img-claro  { display: none; }
    :host-context([data-theme='dark']) .img-oscuro { display: inline; }

    @media (prefers-color-scheme: dark) {
      :host-context(:root:not([data-theme='light'])) .img-claro  { display: none; }
      :host-context(:root:not([data-theme='light'])) .img-oscuro { display: inline; }
    }

    /* ---------- Nodos ---------- */
    .nodo {
      fill: var(--red-nodo);
      stroke: var(--red-nodo-borde);
      stroke-width: 2;
      cursor: pointer;
      transition: fill 0.2s ease, r 0.2s ease;
      outline: none;
    }

    .nodo.activo,
    .nodo:focus-visible {
      fill: var(--red-nodo-activo);
      r: 16;
    }

    .nodo:focus-visible {
      stroke-width: 3.5;
    }
  `]
})
export class RedDialogosComponent {
  /** Rutas de la foto central, una por tema */
  readonly fotoClara = input('assets/Investigacion04-claro.jpg');
  readonly fotoOscura = input('assets/Investigacion04-oscuro.png');

  /** Nodo bajo el cursor o con foco (resalta sus aristas) */
  protected readonly hover = signal<number | null>(null);

  /** 9 nodos repartidos sobre una elipse, con una ligera irregularidad orgánica */
  protected readonly nodos: Nodo[] = this.crearNodos(9, 300, 200, 245, 158);

  /** Conexiones entre nodos (pares de índices) */
  protected readonly aristas: [number, number][] = [
    [0, 1], [0, 2], [0, 8], [1, 2], [1, 3], [2, 3],
    [2, 5], [3, 4], [3, 6], [4, 5], [4, 7], [5, 6],
    [5, 7], [6, 7], [6, 8], [7, 8], [0, 7], [1, 8],
  ];

  protected esActiva(a: number, b: number): boolean {
    const h = this.hover();
    return h !== null && (a === h || b === h);
  }

  private crearNodos(n: number, cx: number, cy: number, rx: number, ry: number): Nodo[] {
    // Pequeñas variaciones fijas (determinísticas) para que no se vea un reloj perfecto
    const ruido = [0, 6, -5, 4, -6, 5, -4, 6, -5];
    const inicio = -Math.PI / 2 - 0.35;

    return Array.from({ length: n }, (_, i) => {
      const ang = inicio + (i / n) * Math.PI * 2;
      const k = 1 + ruido[i % ruido.length] / 100;
      return {
        id: i,
        x: Math.round(cx + rx * k * Math.cos(ang)),
        y: Math.round(cy + ry * k * Math.sin(ang)),
      };
    });
  }
}
