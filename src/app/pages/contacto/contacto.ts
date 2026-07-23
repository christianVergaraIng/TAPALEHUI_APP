import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [],
  template: `
    <div class="page-container">
      <!-- Header -->
      <section class="page-header text-center">
        <div class="header-badge">CONEXIÓN & VISITAS</div>
        <h1 class="page-title">Ponte en Contacto</h1>
        <p class="page-subtitle">
          Estamos encantados de escucharte. Selecciona la opción que mejor describa tu interés y agendemos un encuentro.
        </p>
      </section>

      <!-- Botonera de Intenciones / Conversión -->
      <section class="intenciones-section">
        <div class="intenciones-grid">
          <button (click)="selectReason('Agenda una visita')" [class.active]="selectedReason() === 'Agenda una visita'" class="intencion-btn">
            📅 Agenda una Visita
          </button>
          <button (click)="selectReason('Solicita información')" [class.active]="selectedReason() === 'Solicita información'" class="intencion-btn">
            ℹ️ Solicita Información
          </button>
          <button (click)="selectReason('Únete a la Red')" [class.active]="selectedReason() === 'Únete a la Red'" class="intencion-btn">
            🌐 Únete a la Red
          </button>
          <button (click)="selectReason('Conoce La Vista')" [class.active]="selectedReason() === 'Conoce La Vista'" class="intencion-btn">
            🏡 Conoce La Vista
          </button>
        </div>
      </section>

      <!-- Layout Principal: Formulario + Datos & Mapa -->
      <section class="contact-main-grid">
        <!-- Formulario de Contacto -->
        <div class="form-card">
          <div class="form-header">
            <h2>Envíanos un Mensaje</h2>
            <p>Motivo seleccionado: <strong class="reason-tag">{{ selectedReason() }}</strong></p>
          </div>

          @if (isSubmitted()) {
            <div class="success-banner">
              🎉 <strong>¡Mensaje Enviado con Éxito!</strong>
              <p>Gracias por contactar a la Comunidad Tapalehui. Un integrante de nuestro equipo te responderá en breve a tu correo o teléfono.</p>
              <button (click)="resetForm()" class="btn-reset">Enviar otro mensaje</button>
            </div>
          } @else {
            <form (submit)="handleSubmit($event)" class="contact-form">
              <div class="form-row">
                <div class="form-field">
                  <label>Nombre Completo *</label>
                  <input type="text" required placeholder="Ej: María Fernández" class="form-control" />
                </div>
                <div class="form-field">
                  <label>Correo Electrónico *</label>
                  <input type="email" required placeholder="tu&#64;correo.com" class="form-control" />
                </div>
              </div>

              <div class="form-row">
                <div class="form-field">
                  <label>Teléfono / WhatsApp</label>
                  <input type="tel" placeholder="+52 777 123 4567" class="form-control" />
                </div>
                <div class="form-field">
                  <label>Asunto / Tema principal</label>
                  <select class="form-control" [value]="selectedReason()" (change)="onReasonChange($event)">
                    <option value="Agenda una visita">Agenda una visita</option>
                    <option value="Solicita información">Solicita información</option>
                    <option value="Únete a la Red">Únete a la Red</option>
                    <option value="Conoce La Vista">Conoce La Vista</option>
                  </select>
                </div>
              </div>

              <div class="form-field">
                <label>Mensaje o Comentarios *</label>
                <textarea rows="5" required placeholder="Cuéntanos más sobre tus dudas, fecha tentativa de visita o intereses..." class="form-control"></textarea>
              </div>

              <button type="submit" class="btn-send-contact">
                Enviar Formulario &rarr;
              </button>
            </form>
          }
        </div>

        <!-- Sidebar con Info, Mapa & Instagram -->
        <div class="info-sidebar">
          <!-- Tarjeta de Ubicación -->
          <div class="info-card">
            <h3>📍 Ubicación & Visitas</h3>
            <p>Comunidad Tapalehui<br/>Estado de Morelos, México.</p>
            <p class="sub-text">Visitas guiadas únicamente con previa cita confirmada.</p>
          </div>

          <!-- Redes Sociales Directas -->
          <div class="info-card">
            <h3>📲 Redes Sociales & Contacto Directo</h3>
            <div class="contact-links-list">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="contact-link-item insta">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                </svg>
                <span>Síguenos en Instagram (&#64;comunidad_tapalehui)</span>
              </a>
              <div class="contact-link-item">
                <span>✉️ contacto&#64;tapalehui.org</span>
              </div>
            </div>
          </div>

          <!-- Mapa Interactivo Embed -->
          <div class="info-card map-card">
            <h3>🗺️ Ubicación Geográfica</h3>
            <div class="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120950.4851234567!2d-99.23!3d18.92!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU1JzEyLjAiTiA5OcKwMTMnNDggMCJX!5e0!3m2!1ses!2smx!4v1600000000000!5m2!1ses!2smx"
                width="100%"
                height="220"
                style="border:0; border-radius: 12px;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
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
      gap: 3rem;
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

    /* Intenciones */
    .intenciones-grid {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .intencion-btn {
      padding: 0.75rem 1.6rem;
      border-radius: 30px;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      font-weight: 600;
      font-size: 0.92rem;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    .intencion-btn:hover {
      background: var(--card-bg-hover);
      border-color: var(--border-highlight);
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(41,92,43,0.12);
    }

    .intencion-btn.active {
      background: var(--btn-brand-bg);
      color: var(--btn-brand-text);
      border-color: var(--brand);
      box-shadow: 0 4px 18px rgba(41, 92, 43, 0.38);
      font-weight: 700;
      transform: translateY(-1px);
    }

    /* Main Grid */
    .contact-main-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 2rem;
    }

    .form-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 24px;
      padding: 2.5rem;
      box-shadow: 0 6px 20px rgba(0,0,0,.08);
    }

    .form-header {
      margin-bottom: 2rem;
    }

    .form-header h2 {
      font-family: 'Outfit', sans-serif;
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--text-main);
    }

    .reason-tag {
      color: var(--color-terracotta);
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .form-field label {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-main);
    }

    .form-control {
      padding: 0.85rem 1rem;
      border-radius: 12px;
      background: var(--input-bg);
      border: 1px solid var(--input-border);
      color: var(--input-text);
      font-size: 0.95rem;
      font-family: var(--font-body);
    }

    .form-control::placeholder {
      color: var(--text-muted);
      opacity: 0.8;
    }

    .form-control:focus {
      outline: none;
      border-color: var(--color-brand-primary);
      box-shadow: 0 0 0 3px rgba(41, 92, 43, 0.15);
    }

    .btn-send-contact {
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
    .btn-send-contact:hover {
      transform: translateY(-3px);
      background-color: #2d7d25ff;
      box-shadow: 0 10px 28px rgba(113, 198, 82, 0.55);
    }
    .success-banner {
      background: var(--color-terracotta-bg);
      border: 1px solid var(--color-terracotta);
      border-radius: 16px;
      padding: 2rem;
      color: var(--text-main);
      text-align: center;
    }

    .success-banner strong {
      font-size: 1.2rem;
      color: var(--color-terracotta);
      display: block;
      margin-bottom: 0.5rem;
    }

    .btn-reset {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-top: 1.5rem;
      padding: 0.65rem 1.5rem;
      border-radius: 30px;
      background: var(--btn-brand-bg);
      border: 1.5px solid var(--brand);
      color: var(--btn-brand-text);
      cursor: pointer;
      font-weight: 700;
      box-shadow: 0 4px 14px rgba(41,92,43,0.24);
      transition: transform 0.18s ease, box-shadow 0.18s ease;
    }

    .btn-reset:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 22px rgba(41,92,43,0.34);
    }

    /* Sidebar */
    .info-sidebar {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .info-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 1.75rem;
      color: var(--text-main);
      box-shadow: 0 4px 14px rgba(0,0,0,.07);
      transition: box-shadow 0.22s ease, transform 0.22s ease;
    }

    .info-card:hover {
      box-shadow: 0 10px 24px rgba(0,0,0,.12);
      transform: translateY(-2px);
    }

    .info-card h3 {
      font-family: 'Outfit', sans-serif;
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      color: var(--text-main);
    }

    .sub-text {
      font-size: 0.82rem;
      color: var(--text-muted);
      margin-top: 0.5rem;
    }

    .contact-links-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .contact-link-item {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      color: var(--text-main);
      text-decoration: none;
      font-size: 0.9rem;
    }

    .contact-link-item.insta:hover {
      color: #E1306C;
    }

    @media (max-width: 900px) {
      .contact-main-grid {
        grid-template-columns: 1fr;
      }
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactoComponent {
  selectedReason = signal<string>('Agenda una visita');
  isSubmitted = signal<boolean>(false);

  selectReason(reason: string) {
    this.selectedReason.set(reason);
  }

  onReasonChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedReason.set(val);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    this.isSubmitted.set(true);
  }

  resetForm() {
    this.isSubmitted.set(false);
  }
}
