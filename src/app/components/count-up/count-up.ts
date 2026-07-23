import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-count-up',
  standalone: true,
  template: `{{ displayValue() }}`,
})
export class CountUpComponent implements OnInit, OnChanges, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  @Input() end: number | string = 0;
  @Input() duration: number = 1200; // ms
  // 'quad' se ve más fluido que 'cubic' porque desacelera menos al final
  @Input() easing: 'linear' | 'quad' | 'cubic' = 'quad';

  protected displayValue = signal<string>('0');

  private observer?: IntersectionObserver;
  private animationFrameId?: number;
  private hasAnimated = false;

  ngOnInit(): void {
    // Mostrar el valor final de entrada mientras no haya animado (útil también en SSR)
    this.displayValue.set(String(this.end ?? 0));

    if (this.isBrowser) {
      this.setupObserver(String(this.end ?? 0));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['end'] && !changes['end'].firstChange) {
      const rawString = String(this.end ?? 0);

      // Reiniciar estado para poder re-animar con el nuevo valor
      this.hasAnimated = false;
      this.cancelAnimation();

      if (this.isBrowser) {
        // Si el observer ya existe y el elemento sigue visible, re-observarlo;
        // si no hay observer (por ejemplo SSR->browser tardío), lo creamos.
        if (this.observer) {
          this.observer.disconnect();
        }
        this.setupObserver(rawString);
      } else {
        this.displayValue.set(rawString);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.cancelAnimation();
  }

  private cancelAnimation(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = undefined;
    }
  }

  private setupObserver(rawString: string): void {
    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.hasAnimated) {
              this.hasAnimated = true;
              this.startCountAnimation(rawString);
              this.observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      this.observer.observe(this.el.nativeElement);
    } else {
      this.startCountAnimation(rawString);
    }
  }

  private startCountAnimation(rawString: string): void {
    // Extraer prefijo, número y sufijo
    // Ej: "150+" -> prefix="", target=150, suffix="+"
    // Ej: "100%" -> prefix="", target=100, suffix="%"
    // Ej: "01" -> prefix="0", target=1, suffix="", padLen=2
    // Ej: "1985" -> target=1985
    // Ej: "99.9" -> target=99.9, decimals=1
    const match = rawString.match(/^([^\d]*)([\d.,]+)([^\d]*)$/);

    if (!match) {
      this.displayValue.set(rawString);
      return;
    }

    const prefix = match[1] || '';
    const numRaw = match[2];
    const suffix = match[3] || '';

    // Separador decimal: se asume que si hay un único punto y no hay comas,
    // ese punto es decimal. Las comas se tratan siempre como separador de miles.
    const hasComma = numRaw.includes(',');
    const dotCount = (numRaw.match(/\./g) || []).length;
    const dotIsDecimal = dotCount === 1 && !hasComma;

    const numStr = dotIsDecimal
      ? numRaw.replace(/,/g, '')
      : numRaw.replace(/[.,]/g, '');

    const targetNum = parseFloat(numStr);

    // padLen y padding se calculan solo sobre la parte entera de dígitos,
    // ignorando separadores de miles/decimales
    const integerDigitsOnly = numRaw.split(/[.,]/)[0].replace(/\D/g, '');
    const isPadded =
      integerDigitsOnly.length > 1 && integerDigitsOnly.startsWith('0');
    const padLen = integerDigitsOnly.length;

    const decimals = dotIsDecimal ? (numStr.split('.')[1]?.length ?? 0) : 0;

    if (isNaN(targetNum) || targetNum === 0) {
      this.displayValue.set(rawString);
      return;
    }

    const startTime = performance.now();
    const isNegative = targetNum < 0;
    const absTarget = Math.abs(targetNum);
    // Escala usada solo para comparar "número mostrado" frame a frame
    // (si hay decimales, comparamos en unidades de la última cifra decimal)
    const stepScale = decimals > 0 ? Math.pow(10, decimals) : 1;
    let lastShownScaled = 0;

    const easeFn = (p: number): number => {
      switch (this.easing) {
        case 'linear':
          return p;
        case 'cubic':
          return 1 - Math.pow(1 - p, 3);
        case 'quad':
        default:
          // easeOutQuad: desacelera menos que cubic al final,
          // evita el "freeze" perceptible cerca del valor final
          return 1 - Math.pow(1 - p, 2);
      }
    };

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      const easeProgress = easeFn(progress);

      let currentAbs = absTarget * easeProgress;
      let currentScaled = Math.floor(currentAbs * stepScale);

      // Garantiza que, si todavía no llegamos al final, el valor mostrado
      // avance al menos 1 "paso" respecto al frame anterior. Sin esto,
      // en tramos donde la curva casi no avanza (colas de easing, números
      // chicos), el dígito visible queda "congelado" varios frames seguidos.
      if (progress < 1 && currentScaled <= lastShownScaled) {
        currentScaled = lastShownScaled + 1;
        currentAbs = currentScaled / stepScale;
      }

      const maxScaled = Math.round(absTarget * stepScale);
      currentScaled = Math.min(currentScaled, maxScaled);
      lastShownScaled = currentScaled;

      const currentNum = (isNegative ? -1 : 1) * (currentScaled / stepScale);

      let formattedNum =
        decimals > 0 ? currentNum.toFixed(decimals) : currentNum.toString();

      if (isPadded) {
        const negSign = formattedNum.startsWith('-') ? '-' : '';
        const unsigned = negSign ? formattedNum.slice(1) : formattedNum;
        const [intPart, decPart] = unsigned.split('.');
        const paddedInt = intPart.padStart(padLen, '0');
        formattedNum = `${negSign}${paddedInt}${decPart ? '.' + decPart : ''}`;
      }

      this.displayValue.set(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1 && currentScaled < maxScaled) {
        this.animationFrameId = requestAnimationFrame(update);
      } else {
        // Asegurar que quede exactamente el valor final
        this.displayValue.set(rawString);
      }
    };

    this.animationFrameId = requestAnimationFrame(update);
  }
}