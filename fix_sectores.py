import os
import shutil

# 1. Rename template
if os.path.exists('sectores/index.html'):
    shutil.move('sectores/index.html', 'sectores/sector.html')

# 2. Update dummy redirects
dummies = ['ecommerce.html', 'salud.html', 'educacion.html', 'restauracion-turismo.html', 'servicios-profesionales.html', 'startups.html']
for d in dummies:
    path = os.path.join('sectores', d)
    if os.path.exists(path):
        key = d.replace('.html', '')
        with open(path, 'w') as f:
            f.write(f'<!DOCTYPE html><html><head><script>window.location.replace("sector.html?id={key}");</script></head><body></body></html>')

# 3. Create the new catalog
html = """<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sectores en los que trabajamos — Weaves</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/styles.css">
</head>
<body>

<div id="header-placeholder"></div>

<!-- HERO -->
<section class="hero-services" style="min-height: 60vh; padding: 140px 0 100px; background: var(--dark); position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end;">
  <div class="hero-services-bg" style="position: absolute; inset: 0; background: radial-gradient(ellipse 70% 55% at 75% 35%, rgba(245,158,11,0.45) 0%, transparent 55%), radial-gradient(ellipse 60% 55% at 85% 55%, rgba(245,158,11,0.3) 0%, transparent 60%), radial-gradient(ellipse 55% 60% at 65% 75%, rgba(0,180,166,0.3) 0%, transparent 55%), radial-gradient(ellipse 40% 50% at 20% 85%, rgba(30,42,74,0.6) 0%, transparent 60%), linear-gradient(135deg, var(--indigo-deep) 0%, #1A1530 60%, #2A1A3A 100%);"></div>
  <div class="hero-services-content reveal" style="max-width: 1400px; margin: 0 auto; padding: 0 48px; width: 100%; position: relative; z-index: 2;">
    <div class="hero-services-eyebrow" style="color: var(--teal); font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 20px;">Nuestra experiencia</div>
    <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: clamp(40px, 7vw, 88px); font-weight: 400; color: white; letter-spacing: -0.04em; margin-bottom: 24px; line-height: 1.0; max-width: 18ch;">Sectores en los que <em>trabajamos.</em></h1>
    <p style="font-size: 18px; font-weight: 300; line-height: 1.55; color: rgba(255,255,255,0.65); max-width: 600px; margin-bottom: 32px;">En Weaves no hablamos de "empresas en general". Trabajamos con tiendas online, clínicas, academias, despachos, restaurantes y proyectos digitales que lidian cada día con los mismos problemas.</p>
    <div><a href="#sectores-grid" class="btn-hero-primary" style="display:inline-flex; align-items:center; gap:8px; padding: 16px 36px; border-radius: 12px; background: white; color: var(--indigo); text-decoration: none; font-weight: 500;">Explorar sectores <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a></div>
  </div>
</section>

<!-- WHY SECTORS -->
<section style="padding: 120px 0; background: white;">
  <div style="max-width: 1400px; margin: 0 auto; padding: 0 48px;">
    <div class="reveal" style="max-width: 600px; margin-bottom: 72px;">
      <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: clamp(28px, 4vw, 48px); font-weight: 400; color: var(--indigo); line-height: 1.1; margin-bottom: 16px;">¿Por qué trabajamos por <em>sectores?</em></h2>
      <p style="font-size: 17px; color: var(--muted); line-height: 1.65; font-weight: 300;">Organizamos nuestras soluciones por sectores para hablar tu idioma, entender tus procesos y mostrarte ejemplos concretos de lo que se puede automatizar en tu tipo de negocio.</p>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px;">
      <div class="reveal">
        <div style="width: 48px; height: 48px; background: rgba(0,180,166,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;"><i data-lucide="crosshair" style="color: var(--teal);"></i></div>
        <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 20px; color: var(--indigo); margin-bottom: 12px;">Retos operativos diferentes</h3>
        <p style="color: var(--muted); font-size: 15px; line-height: 1.6;">Cada sector tiene desafíos específicos que requieren soluciones adaptadas a su realidad diaria.</p>
      </div>
      <div class="reveal reveal-delay-1">
        <div style="width: 48px; height: 48px; background: rgba(0,180,166,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;"><i data-lucide="file-check" style="color: var(--teal);"></i></div>
        <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 20px; color: var(--indigo); margin-bottom: 12px;">Casos de uso reales</h3>
        <p style="color: var(--muted); font-size: 15px; line-height: 1.6;">Te mostramos ejemplos concretos y aplicables, no teoría genérica desconectada de tu día a día.</p>
      </div>
      <div class="reveal reveal-delay-2">
        <div style="width: 48px; height: 48px; background: rgba(0,180,166,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;"><i data-lucide="eye" style="color: var(--teal);"></i></div>
        <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 20px; color: var(--indigo); margin-bottom: 12px;">Fácil identificación</h3>
        <p style="color: var(--muted); font-size: 15px; line-height: 1.6;">Te resulta más sencillo ver qué es aplicable a tu negocio cuando hablas de tu sector.</p>
      </div>
      <div class="reveal reveal-delay-3">
        <div style="width: 48px; height: 48px; background: rgba(0,180,166,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;"><i data-lucide="zap" style="color: var(--teal);"></i></div>
        <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 20px; color: var(--indigo); margin-bottom: 12px;">Automatización efectiva</h3>
        <p style="color: var(--muted); font-size: 15px; line-height: 1.6;">La automatización funciona mejor cuando nace de tu operación real, no de plantillas genéricas.</p>
      </div>
    </div>
  </div>
</section>

<!-- SECTORS GRID -->
<section id="sectores-grid" style="padding: 140px 0; background: var(--offwhite); border-top: 1px solid var(--border);">
  <div style="max-width: 1400px; margin: 0 auto; padding: 0 48px;">
    <div class="reveal" style="margin-bottom: 60px;">
      <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: clamp(28px, 4vw, 48px); font-weight: 400; color: var(--indigo); line-height: 1.1;">Sectores en los que estamos <em>especializados</em></h2>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 32px;">
      
      <!-- Card Ecom -->
      <a href="sector.html?id=ecommerce" class="reveal" style="background: white; border: 1px solid var(--border); border-radius: 16px; padding: 48px 40px; text-decoration: none; transition: all 0.3s; display: block; position: relative; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 20px 40px rgba(11,18,32,0.08)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 20px rgba(0,0,0,0.02)';">
        <div style="width: 56px; height: 56px; background: rgba(0,180,166,0.1); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;"><i data-lucide="shopping-cart" style="color: var(--teal);"></i></div>
        <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 24px; color: var(--indigo); margin-bottom: 16px;">Comercio electrónico y tiendas online</h3>
        <p style="color: var(--muted); font-size: 15px; line-height: 1.6; margin-bottom: 32px; font-weight: 300;">Automatizamos atención al cliente, gestión de pedidos, seguimiento post-compra y tareas internas, conectando tu tienda, canales de soporte y marketing.</p>
        <div style="color: var(--teal); font-weight: 600; display: inline-flex; align-items: center; gap: 8px;">Ver soluciones <i data-lucide="arrow-right" style="width:16px; height:16px;"></i></div>
      </a>
      
      <!-- Card Servicios Profesionales -->
      <a href="sector.html?id=servicios-profesionales" class="reveal reveal-delay-1" style="background: white; border: 1px solid var(--border); border-radius: 16px; padding: 48px 40px; text-decoration: none; transition: all 0.3s; display: block; position: relative; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 20px 40px rgba(11,18,32,0.08)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 20px rgba(0,0,0,0.02)';">
        <div style="width: 56px; height: 56px; background: rgba(0,180,166,0.1); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;"><i data-lucide="briefcase" style="color: var(--teal);"></i></div>
        <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 24px; color: var(--indigo); margin-bottom: 16px;">Servicios profesionales y consultoras</h3>
        <p style="color: var(--muted); font-size: 15px; line-height: 1.6; margin-bottom: 32px; font-weight: 300;">Ayudamos a despachos, asesorías y agencias a reducir tareas repetitivas, ordenar procesos y mejorar la experiencia de cliente.</p>
        <div style="color: var(--teal); font-weight: 600; display: inline-flex; align-items: center; gap: 8px;">Ver soluciones <i data-lucide="arrow-right" style="width:16px; height:16px;"></i></div>
      </a>
      
      <!-- Card Salud -->
      <a href="sector.html?id=salud" class="reveal reveal-delay-2" style="background: white; border: 1px solid var(--border); border-radius: 16px; padding: 48px 40px; text-decoration: none; transition: all 0.3s; display: block; position: relative; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 20px 40px rgba(11,18,32,0.08)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 20px rgba(0,0,0,0.02)';">
        <div style="width: 56px; height: 56px; background: rgba(0,180,166,0.1); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;"><i data-lucide="heart-pulse" style="color: var(--teal);"></i></div>
        <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 24px; color: var(--indigo); margin-bottom: 16px;">Salud, Clínicas y Bienestar</h3>
        <p style="color: var(--muted); font-size: 15px; line-height: 1.6; margin-bottom: 32px; font-weight: 300;">Automatiza la gestión de citas, recordatorios a pacientes y respuestas a preguntas frecuentes liberando a tu personal.</p>
        <div style="color: var(--teal); font-weight: 600; display: inline-flex; align-items: center; gap: 8px;">Ver soluciones <i data-lucide="arrow-right" style="width:16px; height:16px;"></i></div>
      </a>
      
      <!-- Card Educación -->
      <a href="sector.html?id=educacion" class="reveal" style="background: white; border: 1px solid var(--border); border-radius: 16px; padding: 48px 40px; text-decoration: none; transition: all 0.3s; display: block; position: relative; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 20px 40px rgba(11,18,32,0.08)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 20px rgba(0,0,0,0.02)';">
        <div style="width: 56px; height: 56px; background: rgba(0,180,166,0.1); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;"><i data-lucide="graduation-cap" style="color: var(--teal);"></i></div>
        <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 24px; color: var(--indigo); margin-bottom: 16px;">Educación y Academias</h3>
        <p style="color: var(--muted); font-size: 15px; line-height: 1.6; margin-bottom: 32px; font-weight: 300;">Gestión de alumnos, inscripciones, control de pagos y comunicación automatizada para centros educativos con cero dolores de cabeza.</p>
        <div style="color: var(--teal); font-weight: 600; display: inline-flex; align-items: center; gap: 8px;">Ver soluciones <i data-lucide="arrow-right" style="width:16px; height:16px;"></i></div>
      </a>
      
      <!-- Card Restauracion -->
      <a href="sector.html?id=restauracion-turismo" class="reveal reveal-delay-1" style="background: white; border: 1px solid var(--border); border-radius: 16px; padding: 48px 40px; text-decoration: none; transition: all 0.3s; display: block; position: relative; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 20px 40px rgba(11,18,32,0.08)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 20px rgba(0,0,0,0.02)';">
        <div style="width: 56px; height: 56px; background: rgba(0,180,166,0.1); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;"><i data-lucide="utensils" style="color: var(--teal);"></i></div>
        <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 24px; color: var(--indigo); margin-bottom: 16px;">Restauración y Turismo</h3>
        <p style="color: var(--muted); font-size: 15px; line-height: 1.6; margin-bottom: 32px; font-weight: 300;">Reservas automáticas, gestión de reseñas y atención al cliente para hoteles y restaurantes integrados con WhatsApp.</p>
        <div style="color: var(--teal); font-weight: 600; display: inline-flex; align-items: center; gap: 8px;">Ver soluciones <i data-lucide="arrow-right" style="width:16px; height:16px;"></i></div>
      </a>
      
      <!-- Card Startups -->
      <a href="sector.html?id=startups" class="reveal reveal-delay-2" style="background: white; border: 1px solid var(--border); border-radius: 16px; padding: 48px 40px; text-decoration: none; transition: all 0.3s; display: block; position: relative; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 20px 40px rgba(11,18,32,0.08)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 20px rgba(0,0,0,0.02)';">
        <div style="width: 56px; height: 56px; background: rgba(0,180,166,0.1); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;"><i data-lucide="rocket" style="color: var(--teal);"></i></div>
        <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 24px; color: var(--indigo); margin-bottom: 16px;">Startups y SaaS</h3>
        <p style="color: var(--muted); font-size: 15px; line-height: 1.6; margin-bottom: 32px; font-weight: 300;">Escala tus operaciones sin escalar tu equipo. Automatización extrema de onboarding, soporte L1 y procesos de ventas.</p>
        <div style="color: var(--teal); font-weight: 600; display: inline-flex; align-items: center; gap: 8px;">Ver soluciones <i data-lucide="arrow-right" style="width:16px; height:16px;"></i></div>
      </a>

    </div>
  </div>
</section>

<!-- HOW WE HELP ALL -->
<section style="padding: 120px 0; background: white; border-top: 1px solid var(--border);">
  <div style="max-width: 1400px; margin: 0 auto; padding: 0 48px;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;">
      <div class="reveal">
        <div class="section-eyebrow" style="color: var(--teal); margin-bottom: 16px; font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase;">La Base Común</div>
        <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: clamp(32px, 4vw, 52px); font-weight: 400; color: var(--indigo); letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 24px;">Qué hacemos en <em>todos los sectores.</em></h2>
        <p style="font-size: 17px; color: var(--muted); line-height: 1.65; font-weight: 300; margin-bottom: 32px;">En todos los sectores combinamos las mismas piezas modulares y potentes, adaptadas a tu contexto particular. La diferencia está en cómo aplicamos todo esto a tu sector y en qué casos de uso priorizamos para que el retorno sea visible cuanto antes.</p>
      </div>
      <div class="reveal reveal-delay-1" style="display: flex; flex-direction: column; gap: 32px;">
        <div>
           <h4 style="font-family: 'Space Grotesk', sans-serif; font-size: 18px; color: var(--indigo); margin-bottom: 8px; display: flex; align-items: center; gap: 8px;"><i data-lucide="message-square" style="color: var(--teal); width: 20px; height: 20px;"></i> Atención al cliente</h4>
           <p style="color: var(--muted); font-size: 15px; font-weight: 300; line-height: 1.6;">Canales de contacto integrados para responder más rápido y con mejor experiencia.</p>
        </div>
        <div>
           <h4 style="font-family: 'Space Grotesk', sans-serif; font-size: 18px; color: var(--indigo); margin-bottom: 8px; display: flex; align-items: center; gap: 8px;"><i data-lucide="layers" style="color: var(--teal); width: 20px; height: 20px;"></i> Procesos internos</h4>
           <p style="color: var(--muted); font-size: 15px; font-weight: 300; line-height: 1.6;">Conectamos y ordenamos procesos para que tu equipo no pierda tiempo en tareas repetitivas.</p>
        </div>
        <div>
           <h4 style="font-family: 'Space Grotesk', sans-serif; font-size: 18px; color: var(--indigo); margin-bottom: 8px; display: flex; align-items: center; gap: 8px;"><i data-lucide="link" style="color: var(--teal); width: 20px; height: 20px;"></i> Integraciones</h4>
           <p style="color: var(--muted); font-size: 15px; font-weight: 300; line-height: 1.6;">CRM, ERP, tienda online, agenda, email, WhatsApp... todo conectado y sincronizado.</p>
        </div>
        <div>
           <h4 style="font-family: 'Space Grotesk', sans-serif; font-size: 18px; color: var(--indigo); margin-bottom: 8px; display: flex; align-items: center; gap: 8px;"><i data-lucide="bar-chart" style="color: var(--teal); width: 20px; height: 20px;"></i> Paneles y reportes</h4>
           <p style="color: var(--muted); font-size: 15px; font-weight: 300; line-height: 1.6;">Visibilidad de lo que está pasando en tu negocio sin revisar múltiples herramientas.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- END CTA -->
<section style="padding: 120px 0; background: var(--offwhite); border-top: 1px solid var(--border);">
  <div style="max-width: 800px; margin: 0 auto; padding: 0 48px; text-align: center;" class="reveal">
    <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: clamp(32px, 4vw, 52px); font-weight: 400; color: var(--indigo); letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 24px;">¿Y si tu sector <em>no aparece aquí?</em></h2>
    <p style="font-size: 17px; color: var(--muted); line-height: 1.65; font-weight: 300; margin-bottom: 32px;">Si no ves tu sector en la lista, pero te reconoces en los problemas que describimos (falta de tiempo, tareas manuales, herramientas desconectadas), probablemente podamos ayudarte igual. Cuéntanos cómo trabajas hoy y veremos si tiene sentido plantear un proyecto de automatización para tu caso.</p>
    <a href="../pages/contacto.html" class="btn-hero-primary" style="display:inline-flex; align-items:center; gap:8px; padding: 18px 40px; border-radius: 12px; background: var(--amber); color: var(--indigo); text-decoration: none; font-weight: 600;">Cuéntanos tu caso <i data-lucide="arrow-right" style="width:18px; height:18px;"></i></a>
  </div>
</section>

<div id="footer-placeholder"></div>

<script src="https://unpkg.com/lucide@latest"></script>
<script src="../js/components-loader.js"></script>
<script src="../js/main.js"></script>
<script>
  if(typeof lucide !== 'undefined') lucide.createIcons();

  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => obs.observe(el));
</script>
</body>
</html>
"""
with open('sectores/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Sectores catalog mapped properly")
