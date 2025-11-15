# 📱 Breakpoints Responsive en HUHM

## 🎯 Breakpoints Actualizados

HUHM ahora incluye **breakpoints mejorados** que cubren desde móviles pequeños hasta pantallas ultra wide (4K+).

## 📊 Breakpoints Recomendados (Sintaxis @)

| Nombre | Rango | Dispositivos Típicos | Uso |
|--------|-------|---------------------|-----|
| `@mobile` | ≤767px | iPhone, Android phones | Móviles en general |
| `@tablets` | 768px - 1279px | iPad, iPad Pro, tablets | Tablets normales y grandes |
| `@laptop` | 1280px - 1439px | MacBook, laptops | Laptops estándar |
| `@desktop` | 1440px - 1919px | iMac, monitores 27" | Desktops estándar |
| `@largeScreen` | 1920px - 2559px | Monitores Full HD+ | Pantallas grandes |
| `@ultraWide` | ≥2560px | Monitores 4K+ | Ultra wide / 4K |

## 🔍 Breakpoints Específicos Adicionales

| Nombre | Rango | Uso |
|--------|-------|-----|
| `@smallMobile` | ≤374px | iPhone SE, móviles pequeños |
| `@largeMobile` | 375px - 767px | iPhone 12+, móviles grandes |
| `@smallTablet` | 768px - 1023px | iPad estándar |
| `@largeTablet` | 1024px - 1279px | iPad Pro 12.9" |

## 🚀 Cómo Usar

### Sintaxis Básica

```html
<div class="w|@breakpoint[valor]|">...</div>
```

### Ejemplo Simple

```html
<!-- Ancho responsive -->
<div class="w|@mobile[100%],@tablets[50%],@laptop[33.33%]|">
  Contenido
</div>
```

**Resultado:**
- 📱 **Mobile** (≤767px): 100% de ancho
- 📱 **Tablets** (768-1279px): 50% de ancho
- 💻 **Laptop** (≥1280px): 33.33% de ancho

### Ejemplo Completo con Todas las Pantallas

```html
<div class="w|@mobile[100%],@tablets[50%],@laptop[33.33%],@desktop[25%],@largeScreen[20%],@ultraWide[16.66%]|">
  Grid responsive
</div>
```

**Comportamiento:**
- 📱 **Mobile**: 1 columna (100%)
- 📱 **Tablets**: 2 columnas (50%)
- 💻 **Laptop**: 3 columnas (33.33%)
- 🖥️ **Desktop**: 4 columnas (25%)
- 🖥️ **Large Screen**: 5 columnas (20%)
- 🖥️ **Ultra Wide**: 6 columnas (16.66%)

## 💡 Casos de Uso

### 1. Layout de Cards

```html
<!-- Card que se adapta a diferentes tamaños -->
<div class="w|@mobile[100%],@tablets[50%],@laptop[33.33%],@desktop[25%]| p|20px| bg|white| rounded|8px|">
  <h3>Card Title</h3>
  <p>Card content...</p>
</div>
```

### 2. Tipografía Responsive

```html
<!-- Título que escala según pantalla -->
<h1 class="fontSize|@mobile[24px],@tablets[32px],@laptop[40px],@desktop[48px],@largeScreen[56px]|">
  Título Responsive
</h1>
```

### 3. Padding/Spacing Responsive

```html
<!-- Espaciado que aumenta en pantallas grandes -->
<section class="p|@mobile[15px],@tablets[20px],@laptop[30px],@desktop[40px],@largeScreen[60px]|">
  Contenido con espaciado adaptable
</section>
```

### 4. Grid Complejo

```html
<!-- Grid que cambia de columnas según pantalla -->
<div class="display|grid| cols|@mobile[1fr],@tablets[repeat(2,1fr)],@laptop[repeat(3,1fr)],@desktop[repeat(4,1fr)]| gap|20px|">
  <div class="bg|blue|">Item 1</div>
  <div class="bg|green|">Item 2</div>
  <div class="bg|red|">Item 3</div>
  <div class="bg|yellow|">Item 4</div>
</div>
```

### 5. Navigation Bar

```html
<!-- Navbar que se adapta -->
<nav class="flex|flex| 
  p|@mobile[10px],@tablets[15px],@laptop[20px]| 
  fontSize|@mobile[14px],@tablets[16px],@laptop[18px]|">
  <a href="#">Home</a>
  <a href="#">About</a>
  <a href="#">Contact</a>
</nav>
```

### 6. Sidebar + Content

```html
<!-- Sidebar -->
<aside class="w|@mobile[100%],@tablets[30%],@laptop[25%],@desktop[20%]| bg|#f3f4f6|">
  Sidebar
</aside>

<!-- Content -->
<main class="w|@mobile[100%],@tablets[70%],@laptop[75%],@desktop[80%]|">
  Main Content
</main>
```

## 📐 Rangos Exactos de Breakpoints

### Por Tamaño de Pantalla

```
┌─────────────────────────────────────────────────────────────────┐
│                      Rango de Pantallas                          │
├──────────┬──────────┬──────────┬──────────┬──────────┬──────────┤
│  Mobile  │ Tablets  │  Laptop  │ Desktop  │  Large   │   Ultra  │
│  ≤767px  │768-1279px│1280-1439 │1440-1919 │1920-2559 │  ≥2560px │
│          │          │    px    │    px    │    px    │          │
└──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘
```

### Dispositivos Comunes

| Dispositivo | Ancho | Breakpoint Aplicado |
|-------------|-------|---------------------|
| iPhone SE | 375px | `@mobile` |
| iPhone 12 Pro | 390px | `@mobile` |
| iPhone 12 Pro Max | 428px | `@mobile` |
| iPad | 768px | `@tablets` |
| iPad Pro 11" | 834px | `@tablets` |
| iPad Pro 12.9" | 1024px | `@tablets` |
| MacBook Air | 1280px | `@laptop` |
| MacBook Pro 16" | 1728px | `@desktop` |
| iMac 27" | 2560px | `@ultraWide` |
| Full HD Monitor | 1920px | `@largeScreen` |
| 4K Monitor | 3840px | `@ultraWide` |

## 🎨 Estrategias de Diseño

### Mobile First (Recomendado)

```html
<!-- Define mobile primero, luego sobreescribe para pantallas más grandes -->
<div class="w|100%| w|@tablets[50%]| w|@laptop[33.33%]| w|@desktop[25%]|">
  Content
</div>
```

### All-in-One

```html
<!-- Define todos los breakpoints en una sola clase -->
<div class="w|@mobile[100%],@tablets[50%],@laptop[33.33%],@desktop[25%]|">
  Content
</div>
```

## 🔄 Cambios Importantes

### ⚠️ Actualización de Tablets

**Antes:**
```javascript
'tablets': '(min-width: 768px) and (max-width: 1023px)'
```

**Ahora:**
```javascript
'tablets': '(min-width: 768px) and (max-width: 1279px)'
```

**Razón:** Incluye tablets grandes como iPad Pro 12.9" (1024px) que antes se consideraban "Computer".

### ⚠️ Actualización de Computer

**Antes:**
```javascript
'Computer': '(min-width: 1024px)'
```

**Ahora:**
```javascript
'Computer': '(min-width: 1280px)'
```

**Razón:** Ahora "Computer" se refiere específicamente a laptops y desktops, no tablets grandes.

## 🎯 Ejemplos Prácticos Completos

### Landing Page Hero

```html
<section class="
  h|@mobile[60vh],@tablets[70vh],@laptop[80vh],@desktop[90vh]|
  p|@mobile[20px],@tablets[40px],@laptop[60px],@desktop[80px]|
  fontSize|@mobile[32px],@tablets[48px],@laptop[64px],@desktop[72px]|
  bg|#3b82f6|">
  
  <h1 class="text|white|">Hero Title</h1>
</section>
```

### Product Grid

```html
<div class="display|grid| 
  cols|@mobile[1fr],@tablets[repeat(2,1fr)],@laptop[repeat(3,1fr)],@desktop[repeat(4,1fr)],@largeScreen[repeat(5,1fr)]|
  gap|@mobile[15px],@tablets[20px],@laptop[25px],@desktop[30px]|">
  
  <!-- Products -->
  <div class="bg|white| rounded|8px| p|20px|">Product 1</div>
  <div class="bg|white| rounded|8px| p|20px|">Product 2</div>
  <div class="bg|white| rounded|8px| p|20px|">Product 3</div>
  <!-- ... más productos -->
</div>
```

### App Layout

```html
<!-- Container principal -->
<div class="display|flex| 
  flex|@mobile[column],@tablets[row]|">
  
  <!-- Sidebar -->
  <aside class="
    w|@mobile[100%],@tablets[250px],@laptop[300px],@desktop[350px]|
    bg|#1f2937|">
    Sidebar
  </aside>
  
  <!-- Main content -->
  <main class="flex|1| 
    p|@mobile[15px],@tablets[20px],@laptop[30px],@desktop[40px]|">
    Content
  </main>
</div>
```

## 📱 Testing Responsivo

### En Chrome DevTools

1. Abre DevTools (F12)
2. Click en "Toggle device toolbar" (Ctrl+Shift+M)
3. Prueba con:
   - iPhone SE (375px) → `@mobile`
   - iPad (768px) → `@tablets`
   - iPad Pro (1024px) → `@tablets`
   - MacBook (1280px) → `@laptop`
   - Desktop (1920px) → `@largeScreen`

### Resize Manual

Cambia el tamaño de la ventana y observa cómo cambian los estilos:
- < 768px → Mobile
- 768-1279px → Tablets
- 1280-1439px → Laptop
- 1440-1919px → Desktop
- ≥1920px → Large Screen

## 🚀 Mejores Prácticas

1. **Mobile First**: Diseña primero para móviles, luego escala
2. **Prueba en Dispositivos Reales**: Emuladores no siempre reflejan la realidad
3. **Usa Breakpoints Semánticos**: `@tablets` en vez de valores hardcoded
4. **Considera el Contenido**: A veces necesitas breakpoints custom
5. **Performance**: Menos breakpoints = CSS más pequeño

## 🔗 Ver También

- [Documentación Principal](./README.md)
- [Referencias a Elementos](./REFERENCIAS-ELEMENTOS.md)
- [Copiar Clases](./COPIAR-CLASES.md)

