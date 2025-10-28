# Planificación Landing Page V2 - Calefones Uruguay

## 1. Estrategia General

### 1.1 Objetivos Principales
- Maximizar la tasa de conversión
- Diseño minimalista sin imágenes
- Proteger el número de contacto de los bots
- Optimización para Cloudflare Pages
- Rendimiento óptimo con fuentes del sistema

### 1.2 Enfoque Técnico
- HTML semántico y limpio
- CSS moderno y optimizado
- JavaScript vanilla mínimo
- Sistema de fuentes del sistema (system-ui stack)
- Protección de datos de contacto mediante JavaScript

## 2. Diseño por Secciones

### 2.1 Hero Section (Above the Fold)
- **Objetivo:** Conversión inmediata
- **Elementos:**
  - Headline principal: "Servicio Técnico de Calefones"
  - Subheadline: "Reparación e Instalación en el Día"
  - CTA primario: Botón de WhatsApp (renderizado via JS)
  - CTA secundario: "Solicitar Servicio" (formulario)
- **Diseño:**
  - Fondo: Gradiente profesional (azul oscuro a claro)
  - Layout geométrico con CSS
  - Énfasis en tipografía y espaciado

### 2.2 Servicios Principales
- **Objetivo:** Establecer credibilidad
- **Elementos:**
  - Cards con iconos minimalistas
  - Títulos concisos
  - Descripción breve
  - Micro-CTA en cada card
- **Diseño:**
  - Grid de 3 columnas (desktop)
  - Stack vertical (mobile)
  - Animaciones sutiles al scroll

### 2.3 Marcas
- **Objetivo:** Construir confianza
- **Elementos:**
  - Logos en escala de grises
  - Hover: color original
- **Diseño:**
  - Carrusel automático infinito
  - Grid estático en desktop
  - Responsive grid en mobile

### 2.4 Zonas de Cobertura
- **Objetivo:** Claridad de servicio
- **Elementos:**
  - Mapa interactivo minimalista
  - Lista de barrios organizada
- **Diseño:**
  - Split view: Mapa + Lista
  - Acordeón en mobile
  - Highlight de zonas al hover

### 2.5 Formulario de Contacto
- **Objetivo:** Captura de leads
- **Elementos:**
  - Campos mínimos necesarios
  - Validación en tiempo real
  - Feedback visual inmediato
- **Diseño:**
  - Card flotante con sombra suave
  - Progress bar de completitud
  - Diseño responsivo adaptativo

### 2.6 FAQ
- **Objetivo:** Resolver objeciones
- **Elementos:**
  - Preguntas más relevantes primero
  - Respuestas concisas
  - CTA contextual
- **Diseño:**
  - Acordeón interactivo
  - Animaciones suaves
  - Diseño limpio y espaciado

## 3. Paleta de Colores
- **Principal:** #1E3D59 (Azul Profesional)
- **Secundario:** #FF6B6B (Naranja CTA)
- **Terciario:** #4A90E2 (Azul Claro Acento)
- **Neutros:**
  - #F5F7FA (Fondo Claro)
  - #E4E7EB (Bordes)
  - #2D3748 (Texto Principal)

## 4. Tipografía (System Font Stack)
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
             "Helvetica Neue", Arial, sans-serif, 
             "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
```

## 5. Estrategia de Protección de Datos
- Número de teléfono y WhatsApp renderizado mediante JavaScript
- Implementación de data-attributes para almacenar datos encriptados
- Event listeners para decodificación en tiempo de ejecución
- Prevención de scraping mediante ofuscación de datos

## 6. Checklist de Implementación

### Fase 1: Preparación
- [ ] Crear estructura de carpetas V2
- [ ] Configurar archivos base (HTML, CSS, JS)
- [ ] Optimizar imágenes existentes
- [ ] Preparar assets nuevos

### Fase 2: Desarrollo Base
- [ ] Implementar HTML semántico base
- [ ] Desarrollar estilos CSS core
- [ ] Configurar variables CSS
- [ ] Implementar sistema de grid

### Fase 3: Componentes
- [ ] Desarrollar header responsive
- [ ] Crear hero section
- [ ] Implementar cards de servicios
- [ ] Desarrollar carrusel de marcas
- [ ] Crear mapa interactivo
- [ ] Implementar formulario de contacto
- [ ] Desarrollar acordeón FAQ

### Fase 4: Interactividad
- [ ] Implementar menú móvil
- [ ] Añadir animaciones scroll
- [ ] Configurar validación de formulario
- [ ] Implementar smooth scroll
- [ ] Añadir microinteracciones

### Fase 5: Optimización
- [ ] Optimizar imágenes y assets
- [ ] Minimizar CSS
- [ ] Optimizar JavaScript
- [ ] Implementar lazy loading
- [ ] Validar responsive design

### Fase 6: Testing
- [ ] Testing cross-browser
- [ ] Testing en dispositivos móviles
- [ ] Validación de rendimiento
- [ ] Testing de formularios
- [ ] Validación de accesibilidad

### Fase 7: Lanzamiento
- [ ] Revisión final de código
- [ ] Validación de enlaces
- [ ] Backup de versión actual
- [ ] Preparar documentación
- [ ] Plan de despliegue