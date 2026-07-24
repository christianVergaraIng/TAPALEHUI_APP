import { Component, signal, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="app-header">
      <div class="header-container">
        <!-- Logo con Icono de Hoja -->
        <a routerLink="/inicio" class="brand-logo">
          <div class="logo-box">
            <svg class="logo-icon" viewBox="0 0 512 512" width="26" height="26" fill="currentColor">
              <path d="M272 96c-78.6 0-145.1 51.5-167.7 122.5c33.6-17 71.5-26.5 111.7-26.5h88c8.8 0 16 7.2 16 16s-7.2 16-16 16H288 216s0 0 0 0c-16.6 0-32.7 1.9-48.2 5.4c-25.9 5.9-50 16.4-71.4 30.7c0 0 0 0 0 0C38.3 298.8 0 364.9 0 440v16c0 13.3 10.7 24 24 24s24-10.7 24-24V440c0-48.7 20.7-92.5 53.8-123.2C121.6 392.3 190.3 448 272 448l1 0c132.1-.7 239-130.9 239-291.4c0-42.6-7.5-83.1-21.1-119.6c-2.6-6.9-12.7-6.6-16.2-.1C455.9 72.1 418.7 96 376 96L272 96z"></path>
            </svg>
          </div>
          <div class="brand-text">
            <span class="brand-name">TAPALEHUI</span>
            <span class="brand-tagline">Comunidad Sustentable</span>
          </div>
        </a>

        <!-- Desktop Navigation Menu (8 buttons) -->
        <nav class="desktop-nav">
          <a routerLink="/inicio" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-btn">Inicio</a>
          <a routerLink="/la-comunidad" routerLinkActive="active" class="nav-btn">La Comunidad</a>
          <a routerLink="/vive-en-tapalehui" routerLinkActive="active" class="nav-btn">Vive en Tapalehui</a>
          <a routerLink="/participa" routerLinkActive="active" class="nav-btn">Participa</a>
          <a routerLink="/proyectos" routerLinkActive="active" class="nav-btn">Proyectos</a>
          <a routerLink="/historias" routerLinkActive="active" class="nav-btn">Historias</a>
          <a routerLink="/noticias" routerLinkActive="active" class="nav-btn">Noticias</a>
          <a routerLink="/contacto" routerLinkActive="active" class="nav-btn nav-btn-highlight">Contacto</a>
        </nav>

        <!-- Right Utilities -->
        <div class="header-actions">
          <button (click)="toggleTheme.emit()" class="theme-toggle-btn" aria-label="Cambiar tema">
            @if (isDarkMode()) {
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            } @else {
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            }
          </button>

          <button (click)="toggleMobileMenu()" class="mobile-hamburger" aria-label="Abrir menú">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
              @if (mobileMenuOpen()) {
                <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/>
              } @else {
                <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"/>
              }
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      @if (mobileMenuOpen()) {
        <div class="mobile-nav-drawer">
          <nav class="mobile-nav-list">
            <a routerLink="/inicio" routerLinkActive="active" (click)="closeMobileMenu()" class="mobile-nav-item">Inicio</a>
            <a routerLink="/la-comunidad" routerLinkActive="active" (click)="closeMobileMenu()" class="mobile-nav-item">La Comunidad</a>
            <a routerLink="/vive-en-tapalehui" routerLinkActive="active" (click)="closeMobileMenu()" class="mobile-nav-item">Vive en Tapalehui</a>
            <a routerLink="/participa" routerLinkActive="active" (click)="closeMobileMenu()" class="mobile-nav-item">Participa</a>
            <a routerLink="/proyectos" routerLinkActive="active" (click)="closeMobileMenu()" class="mobile-nav-item">Proyectos</a>
            <a routerLink="/historias" routerLinkActive="active" (click)="closeMobileMenu()" class="mobile-nav-item">Historias</a>
            <a routerLink="/noticias" routerLinkActive="active" (click)="closeMobileMenu()" class="mobile-nav-item">Noticias</a>
            <a routerLink="/contacto" routerLinkActive="active" (click)="closeMobileMenu()" class="mobile-nav-item highlight">Contacto</a>
          </nav>
        </div>
      }
    </header>
  `,
  styles: [`
    .app-header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: var(--header-bg);
      /* Reduced from 16px — heavy GPU compositing cost */
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--border-color);
      transition:
        background   var(--speed-base) ease,
        border-color var(--speed-base) ease;
    }

    .header-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0.75rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .brand-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: var(--text-main);
    }

    .logo-box {
      width:         40px;
      height:        40px;
      border-radius: 10px;
      background:    var(--bg-surface);
      border:        1px solid var(--border-highlight);
      display:       flex;
      align-items:   center;
      justify-content: center;
      transition:
        background   var(--speed-base) ease,
        border-color var(--speed-base) ease;
    }

    .logo-icon {
      color:      var(--logo-color);
      transition:
        color     var(--speed-base) ease,
        transform var(--speed-fast) ease;
    }

    .brand-logo:hover .logo-icon {
      transform: scale(1.08) rotate(4deg);
    }

    .brand-text {
      display: flex;
      flex-direction: column;
    }

    .brand-name {
      font-family:    'Outfit', sans-serif;
      font-size:      1.2rem;
      font-weight:    800;
      letter-spacing: 0.08em;
      color:          var(--brand);
      transition:     color var(--speed-base) ease;
    }

    .brand-tagline {
      font-size: 0.68rem;
      color: var(--text-muted);
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .nav-btn {
      position:      relative;
      padding:       0.5rem 0.95rem;
      border-radius: 20px;
      font-size:     0.88rem;
      font-weight:   600;
      color:         var(--text-muted);
      white-space:   nowrap;
      transition:
        color       var(--speed-fast) ease,
        background  var(--speed-fast) ease,
        box-shadow  var(--speed-fast) ease,
        transform   var(--speed-fast) ease;
    }

    .nav-btn:hover {
      color:       var(--text-main);
      background:  var(--border-color);
      transform:   translateY(-1px);
    }

    .nav-btn.active {
      color:       var(--text-main);
      background:   var(--brand);
      font-weight:  800;
      box-shadow:   0 4px 14px rgba(41, 92, 43, 0.35);
      border-radius: 20px;
    }

    :host-context(body.dark-theme) .nav-btn.active {
      background:   #497541;
      color:        #FFFFFF !important;
      box-shadow:   0 4px 16px rgba(160, 183, 107, 0.40);
    }

    /* .nav-btn-highlight is styled globally in app.css */

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .theme-toggle-btn, .mobile-hamburger {
      background:    var(--bg-surface);
      border:        1px solid var(--border-color);
      color:         var(--text-main);
      width:         38px;
      height:        38px;
      border-radius: 10px;
      display:       flex;
      align-items:   center;
      justify-content: center;
      cursor:        pointer;
      transition:
        border-color var(--speed-fast) ease,
        color        var(--speed-fast) ease;
    }

    .theme-toggle-btn:hover, .mobile-hamburger:hover {
      border-color: var(--brand);
      color:        var(--brand);
    }

    .mobile-hamburger {
      display: none;
    }

    .mobile-nav-drawer {
      padding: 1rem 1.5rem 1.5rem;
      border-top: 1px solid var(--border-color);
      background: var(--header-bg);
      animation: slideDown 0.22s ease both;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .mobile-nav-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .mobile-nav-item {
      padding: 0.75rem 1rem;
      border-radius: 10px;
      color: var(--text-main);
      text-decoration: none;
      font-weight: 600;
      transition: background 0.2s;
    }

    .mobile-nav-item.active {
      background:  var(--brand);
      color:       #FFFFFF !important;
      font-weight: 800;
      box-shadow:  0 4px 12px rgba(41, 92, 43, 0.3);
    }

    :host-context(body.dark-theme) .mobile-nav-item.active {
      background:  #497541;
      color:       #FFFFFF !important;
    }

    .mobile-nav-item.highlight {
      background:  var(--btn-brand-bg);
      color:       var(--btn-brand-text);
      text-align:  center;
      font-weight: 700;
      margin-top:  0.5rem;
    }

    @media (max-width: 1024px) {
      .desktop-nav {
        display: none;
      }
      .mobile-hamburger {
        display: flex;
      }
    }
  `]
})
export class HeaderComponent {
  isDarkMode = input<boolean>(true);
  toggleTheme = output<void>();

  mobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
