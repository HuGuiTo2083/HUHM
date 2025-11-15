# 📱 Breakpoints con Detección por Height

## 🎯 Breakpoints Optimizados

HUHM ahora incluye **6 breakpoints principales** que usan **width Y height** para detectar con precisión el tipo de dispositivo.

## 📊 Breakpoints Disponibles

| Breakpoint | Rango Width | Rango Height | Dispositivos Detectados |
|------------|-------------|--------------|------------------------|
| `@mobile` | ≤767px | - | iPhone, Android phones |
| `@tablet` | 768-1023px | ≤1366px | iPad estándar, tablets Android |
| `@largeTablet` | 1024-1366px | ≤1366px | iPad Pro 11", iPad Pro 12.9" |
| `@laptop` | 1280-1919px | 700-1200px | MacBook Air, MacBook Pro 13" |
| `@desktop` | 1920-2560px | ≥1080px | Full HD, 2K (2560x1440) |
| `@largeScreen` | ≥2561px | - | 4K, ultra wide, monitores grandes |

## 🔍 Detección por Dispositivo

### 📱 Mobile (`@mobile`)
**Criterio:** `(max-width: 767px)`

**Dispositivos detectados:**
- iPhone SE: 375x667 ✅
- iPhone 12/13: 390x844 ✅
- iPhone 14 Pro Max: 430x932 ✅
- Android pequeños: 360x640 ✅
- Android grandes: 412x915 ✅

**Ejemplo:**
```html
<div class="w|@mobile[100%]|">Mobile only</div>
```

### 📱 Tablet (`@tablet`)
**Criterio:** `(min-width: 768px) and (max-width: 1023px) and (max-height: 1366px)`

**Dispositivos detectados:**
- iPad portrait: 768x1024 ✅
- iPad landscape: 1024x768 ✅
- Android tablets: 800x1280 ✅

**Por qué usa height:**
- Distingue tablets de laptops pequeños (que tienen height > 1366px)
- Captura tanto portrait como landscape

**Ejemplo:**
```html
<div class="w|@tablet[50%]|">Tablet only</div>
```

### 📱 LargeTablet (`@largeTablet`)
**Criterio:** `(min-width: 1024px) and (max-width: 1366px) and (max-height: 1366px)`

**Dispositivos detectados:**
- iPad Pro 11" portrait: 834x1194 ✅
- iPad Pro 11" landscape: 1194x834 ✅
- iPad Pro 12.9" portrait: 1024x1366 ✅
- iPad Pro 12.9" landscape: 1366x1024 ✅

**Por qué es importante:**
- Antes, iPad Pro se clasificaba como "Computer"
- Ahora correctamente identificado como tablet grande
- Usa height para distinguir de laptops

**Ejemplo:**
```html
<div class="w|@largeTablet[40%]|">Large Tablet</div>
```

### 💻 Laptop (`@laptop`)
**Criterio:** `(min-width: 1280px) and (max-width: 1919px) and (min-height: 700px) and (max-height: 1200px)`

**Dispositivos detectados:**
- MacBook Air 13": 1280x800 ✅
- MacBook Pro 13": 1280x800 ✅
- Surface Laptop: 1500x1000 ✅
- Laptops típicos: 1366x768, 1920x1080 ✅

**Por qué usa height:**
- Distingue laptops de tablets grandes en landscape
- Distingue laptops de desktops (que tienen height > 1200px)

**Ejemplo:**
```html
<div class="w|@laptop[33.33%]|">Laptop</div>
```

### 🖥️ Desktop (`@desktop`)
**Criterio:** `(min-width: 1920px) and (max-width: 2560px) and (min-height: 1080px)`

**Dispositivos detectados:**
- Full HD: 1920x1080 ✅
- 2K: 2560x1440 ✅
- iMac 27": 2560x1440 ✅
- Monitores 24-27": 1920x1080, 2560x1440 ✅

**Por qué usa height:**
- Asegura que es un monitor (height ≥ 1080px)
- Distingue de laptops con width similar pero height menor

**Ejemplo:**
```html
<div class="w|@desktop[25%]|">Desktop</div>
```

### 🖥️ LargeScreen (`@largeScreen`)
**Criterio:** `(min-width: 2561px)`

**Dispositivos detectados:**
- 4K: 3840x2160 ✅
- Ultra wide: 3440x1440 ✅
- Monitores 32"+: 3840x2160, 5120x2880 ✅

**Ejemplo:**
```html
<div class="w|@largeScreen[20%]|">Large Screen</div>
```

## 🎨 Ejemplos de Uso

### Grid Responsive Completo

```html
<div class="w|@mobile[100%],@tablet[50%],@largeTablet[40%],@laptop[33.33%],@desktop[25%],@largeScreen[20%]|">
  Grid que se adapta a todos los dispositivos
</div>
```

**Comportamiento:**
- 📱 **Mobile** (≤767px): 1 columna (100%)
- 📱 **Tablet** (768-1023px, height ≤1366px): 2 columnas (50%)
- 📱 **LargeTablet** (1024-1366px, height ≤1366px): 2.5 columnas (40%)
- 💻 **Laptop** (1280-1919px, height 700-1200px): 3 columnas (33.33%)
- 🖥️ **Desktop** (1920-2560px, height ≥1080px): 4 columnas (25%)
- 🖥️ **LargeScreen** (≥2561px): 5 columnas (20%)

### Tipografía Responsive

```html
<h1 class="fontSize|@mobile[24px],@tablet[32px],@largeTablet[36px],@laptop[40px],@desktop[48px],@largeScreen[56px]|">
  Título que escala perfectamente
</h1>
```

### Padding Adaptativo

```html
<section class="p|@mobile[15px],@tablet[20px],@largeTablet[25px],@laptop[30px],@desktop[40px],@largeScreen[60px]|">
  Espaciado que crece con la pantalla
</section>
```

### Sidebar + Content

```html
<!-- Sidebar -->
<aside class="w|@mobile[100%],@tablet[30%],@largeTablet[25%],@laptop[20%],@desktop[15%]|">
  Sidebar
</aside>

<!-- Content -->
<main class="w|@mobile[100%],@tablet[70%],@largeTablet[75%],@laptop[80%],@desktop[85%]|">
  Main Content
</main>
```

## 🔬 Cómo Funciona la Detección por Height

### Caso 1: iPad vs Laptop

**Problema anterior:**
- iPad Pro 12.9" landscape: 1366x1024
- MacBook Air: 1280x800
- Ambos tienen width similar, ¿cómo distinguirlos?

**Solución:**
- `@largeTablet`: height ≤ 1366px (captura iPad)
- `@laptop`: height 700-1200px (captura MacBook)
- ✅ Distinción perfecta

### Caso 2: Tablet Normal vs Tablet Grande

**Problema anterior:**
- iPad estándar: 768x1024 o 1024x768
- iPad Pro 12.9": 1024x1366 o 1366x1024
- Ambos pueden tener width 1024px

**Solución:**
- `@tablet`: width 768-1023px
- `@largeTablet`: width 1024-1366px
- ✅ Separación clara

### Caso 3: Laptop vs Desktop

**Problema anterior:**
- Laptop Full HD: 1920x1080
- Desktop Full HD: 1920x1080
- Misma resolución, ¿cómo distinguirlos?

**Solución:**
- `@laptop`: width 1280-1919px Y height 700-1200px
- `@desktop`: width 1920-2560px Y height ≥ 1080px
- ✅ Laptops con 1920x1080 se detectan como desktop (correcto para diseño)

## 📐 Tabla de Dispositivos

| Dispositivo | Resolución | Breakpoint | Razón |
|-------------|------------|------------|-------|
| iPhone SE | 375x667 | `@mobile` | width ≤ 767px |
| iPhone 12 Pro | 390x844 | `@mobile` | width ≤ 767px |
| iPad | 768x1024 | `@tablet` | width 768-1023px, height ≤ 1366px |
| iPad landscape | 1024x768 | `@tablet` | width 768-1023px (en portrait) |
| iPad Pro 11" | 834x1194 | `@largeTablet` | width 834-1023px, height ≥ 1194px |
| iPad Pro 12.9" | 1024x1366 | `@largeTablet` | width 1024-1366px, height ≤ 1366px |
| MacBook Air | 1280x800 | `@laptop` | width 1280-1919px, height 700-1200px |
| MacBook Pro 16" | 1728x1117 | `@laptop` | width 1280-1919px, height 700-1200px |
| Desktop Full HD | 1920x1080 | `@desktop` | width 1920-2560px, height ≥ 1080px |
| iMac 27" | 2560x1440 | `@desktop` | width 1920-2560px, height ≥ 1080px |
| Monitor 4K | 3840x2160 | `@largeScreen` | width ≥ 2561px |
| Ultra Wide | 3440x1440 | `@largeScreen` | width ≥ 2561px |

## 🚀 Ventajas de la Detección por Height

1. ✅ **Precisión**: Distingue tablets de laptops
2. ✅ **Orientación**: Funciona en portrait y landscape
3. ✅ **Dispositivos Reales**: Basado en resoluciones reales
4. ✅ **Menos Confusión**: iPad Pro ya no es "Computer"
5. ✅ **Mejor UX**: Layouts más apropiados para cada dispositivo

## 📱 Testing

### Chrome DevTools

1. F12 → Toggle Device Toolbar (Ctrl+Shift+M)
2. Prueba estos dispositivos:

```
iPhone SE (375x667)        → @mobile ✅
iPhone 12 Pro (390x844)    → @mobile ✅
iPad (768x1024)            → @tablet ✅
iPad landscape (1024x768)  → @tablet ✅
iPad Pro 12.9" (1024x1366) → @largeTablet ✅
MacBook Air (1280x800)     → @laptop ✅
Desktop (1920x1080)        → @desktop ✅
iMac (2560x1440)           → @desktop ✅
4K Monitor (3840x2160)     → @largeScreen ✅
```

### Resize Manual

Cambia el tamaño de la ventana y observa:
- **Width < 768px** → Mobile
- **Width 768-1023px + Height ≤ 1366px** → Tablet
- **Width 1024-1366px + Height ≤ 1366px** → LargeTablet
- **Width 1280-1919px + Height 700-1200px** → Laptop
- **Width 1920-2560px + Height ≥ 1080px** → Desktop
- **Width ≥ 2561px** → LargeScreen

## 🎯 Mejores Prácticas

1. **Mobile First**: Diseña primero para móviles
2. **Usa Height**: Aprovecha la detección por height para mejor precisión
3. **Prueba en Dispositivos Reales**: Emuladores no siempre reflejan la realidad
4. **Considera Orientación**: Tablets pueden estar en portrait o landscape
5. **Breakpoints Semánticos**: Usa nombres descriptivos (`@tablet` vs valores hardcoded)

## 🔗 Ver También

- [Breakpoints Responsive](./BREAKPOINTS-RESPONSIVE.md) - Documentación general
- [Documentación Principal](./README.md)
- [Referencias a Elementos](./REFERENCIAS-ELEMENTOS.md)

