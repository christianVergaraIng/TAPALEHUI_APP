import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="app-footer">
      <div class="footer-container">
        <div class="footer-grid">
          <!-- Col 1: Brand & Slogan -->
          <div class="footer-brand">
            <div class="brand-header">
              <div class="logo-box">
                <svg class="logo-icon" viewBox="0 0 512 512" width="24" height="24" fill="currentColor">
                  <path d="M272 96c-78.6 0-145.1 51.5-167.7 122.5c33.6-17 71.5-26.5 111.7-26.5h88c8.8 0 16 7.2 16 16s-7.2 16-16 16H288 216s0 0 0 0c-16.6 0-32.7 1.9-48.2 5.4c-25.9 5.9-50 16.4-71.4 30.7c0 0 0 0 0 0C38.3 298.8 0 364.9 0 440v16c0 13.3 10.7 24 24 24s24-10.7 24-24V440c0-48.7 20.7-92.5 53.8-123.2C121.6 392.3 190.3 448 272 448l1 0c132.1-.7 239-130.9 239-291.4c0-42.6-7.5-83.1-21.1-119.6c-2.6-6.9-12.7-6.6-16.2-.1C455.9 72.1 418.7 96 376 96L272 96z"></path>
                </svg>
              </div>
              <span class="brand-title">TAPALEHUI</span>
            </div>
            <p class="footer-slogan">
              "Vivir en comunidad. Regenerar la naturaleza. Compartir el futuro."
            </p>
            <p class="footer-desc">
              Un modelo integral de hábitat sostenible, agricultura regenerativa e inclusión social activo desde 1985.
            </p>
          </div>

          <!-- Col 2: Enlaces Rápidos -->
          <div class="footer-col">
            <h4 class="footer-title">Navegación</h4>
            <ul class="footer-links">
              <li><a routerLink="/inicio">Inicio</a></li>
              <li><a routerLink="/la-comunidad">La Comunidad</a></li>
              <li><a routerLink="/vive-en-tapalehui">Vive en Tapalehui</a></li>
              <li><a routerLink="/participa">Participa</a></li>
              <li><a routerLink="/proyectos">Proyectos</a></li>
            </ul>
          </div>

          <!-- Col 3: Descubrir -->
          <div class="footer-col">
            <h4 class="footer-title">Explora</h4>
            <ul class="footer-links">
              <li><a routerLink="/historias">Historias</a></li>
              <li><a routerLink="/noticias">Noticias & Instagram</a></li>
              <li><a routerLink="/contacto">Contacto & Visitas</a></li>
              <li><a routerLink="/vive-en-tapalehui">Casas-Huerta (La Vista)</a></li>
              <li><a routerLink="/participa">Red Tapalehui</a></li>
            </ul>
          </div>

          <!-- Col 4: Contacto & Redes -->
          <div class="footer-col">
            <h4 class="footer-title">Conéctate</h4>
            <div class="footer-socials">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-btn instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                <span>Instagram</span>
              </a>
            </div>
            <div class="contact-info">
              <p>📍 Estado de Morelos, México</p>
              <p>✉️ contacto&#64;tapalehui.org</p>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} Comunidad Tapalehui. Todos los derechos reservados.</p>
          <p class="footer-subtext">Diseñado para la regeneración del entorno y la armonía comunitaria.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .app-footer {
      background: var(--footer-bg);
      border-top: 1px solid var(--border-color);
      padding: 4rem 1.5rem 2rem;
      color: var(--text-muted);
      transition: background 0.4s ease;
    }

    .footer-container {
      max-width: 1280px;
      margin: 0 auto;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.5fr;
      gap: 3rem;
      margin-bottom: 3rem;
    }

    .brand-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .logo-box {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: var(--bg-surface);
      border: 1px solid var(--border-color-highlight);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-icon {
      color: var(--logo-color);
    }

    .brand-title {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 1.25rem;
      letter-spacing: 0.08em;
      color: var(--color-brand-primary);
    }

    .footer-slogan {
      font-style: italic;
      color: var(--color-brand-primary);
      font-size: 0.95rem;
      margin-bottom: 0.75rem;
      font-weight: 600;
    }

    .footer-desc {
      font-size: 0.85rem;
      line-height: 1.6;
      color: var(--text-muted);
    }

    .footer-title {
      font-family: 'Outfit', sans-serif;
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 1.25rem;
      letter-spacing: 0.03em;
    }

    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .footer-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.88rem;
      transition: color 0.2s;
    }

    .footer-links a:hover {
      color: var(--color-brand-primary);
    }

    .footer-socials {
      margin-bottom: 1.25rem;
    }

    .social-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.55rem 1.1rem;
      border-radius: 10px;
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      text-decoration: none;
      font-weight: 600;
      font-size: 0.88rem;
      transition: all 0.2s;
    }

    .social-btn:hover {
      background: linear-gradient(135deg, #E1306C, #F77737);
      color: #ffffff;
      border-color: transparent;
      transform: translateY(-2px);
    }

    .contact-info p {
      font-size: 0.85rem;
      margin: 0.4rem 0;
      color: var(--text-muted);
    }

    .footer-bottom {
      border-top: 1px solid var(--border-color);
      padding-top: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.82rem;
      color: var(--text-muted);
    }

    .footer-subtext {
      opacity: 0.8;
    }

    @media (max-width: 900px) {
      .footer-grid {
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
      }
    }

    @media (max-width: 600px) {
      .footer-grid {
        grid-template-columns: 1fr;
      }
      .footer-bottom {
        flex-direction: column;
        gap: 0.5rem;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
