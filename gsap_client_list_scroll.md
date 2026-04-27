# GSAP — Client List Scroll-Driven

## Estructura HTML

```html
<!-- La sección ocupa N * 100vh para "consumir" scroll -->
<section class="clients-section">

  <!-- Panel sticky que se queda fijo mientras dura el scroll -->
  <div class="clients-sticky">

    <!-- Izquierda: lista completa, siempre visible -->
    <div class="clients-left">
      <span class="clients-label">The brands that bet on us</span>
      <ul class="clients-list">
        <li class="client-name" data-index="0">Gilead</li>
        <li class="client-name" data-index="1">Hulu</li>
        <li class="client-name" data-index="2">Warner</li>
        <li class="client-name" data-index="3">Spotify</li>
        <li class="client-name" data-index="4">Sony</li>
        <li class="client-name" data-index="5">Coachella</li>
        <li class="client-name" data-index="6">Art Basel</li>
        <li class="client-name" data-index="7">Fendi</li>
        <li class="client-name" data-index="8">Meta</li>
        <li class="client-name" data-index="9">Google</li>
      </ul>
    </div>

    <!-- Derecha: imagen + descripción, una por cliente -->
    <div class="clients-right">
      <div class="client-media" data-index="0">
        <img src="gilead.jpg" alt="Gilead" />
        <p>Launch moments that jumped off the timeline and into culture.</p>
      </div>
      <div class="client-media" data-index="1">
        <img src="hulu.jpg" alt="Hulu" />
        <p>A 100-year celebration turned into a cultural roar.</p>
      </div>
      <div class="client-media" data-index="2">
        <img src="warner.jpg" alt="Warner" />
        <p>Playlists and fans pulled into one louder conversation.</p>
      </div>
      <div class="client-media" data-index="3">
        <img src="spotify.jpg" alt="Spotify" />
        <p>Campaigns designed to move faster than the algo.</p>
      </div>
      <div class="client-media" data-index="4">
        <img src="sony.jpg" alt="Sony" />
        <p>Stories that made players feel something real.</p>
      </div>
      <div class="client-media" data-index="5">
        <img src="coachella.jpg" alt="Coachella" />
        <p>A desert reimagined as a brand curator's playground.</p>
      </div>
      <div class="client-media" data-index="6">
        <img src="artbasel.jpg" alt="Art Basel" />
        <p>Art and commerce blurred into one living moment.</p>
      </div>
      <div class="client-media" data-index="7">
        <img src="fendi.jpg" alt="Fendi" />
        <p>Heritage reframed for a generation that moves fast.</p>
      </div>
      <div class="client-media" data-index="8">
        <img src="meta.jpg" alt="Meta" />
        <p>Innovation translated into a story people could touch.</p>
      </div>
      <div class="client-media" data-index="9">
        <img src="google.jpg" alt="Google" />
        <p>Search made human, one campaign at a time.</p>
      </div>
    </div>

  </div>
</section>
```

---

## CSS base

```css
.clients-section {
  /* N clientes × altura por step — cuánto scroll consume la sección */
  height: calc(var(--client-count, 10) * 100vh);
}

.clients-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  overflow: hidden;
}

.clients-left {
  padding: 0 3rem 0 4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.clients-label {
  font-size: 13px;
  color: #888;
}

.clients-list {
  list-style: none;
  padding: 0;
  margin: 0;
  /* overflow oculto si se usa scroll interno del listado */
  overflow: hidden;
}

.client-name {
  font-size: clamp(32px, 5vw, 64px);
  font-weight: 500;
  line-height: 1.15;
  color: #1a1a1a;
  letter-spacing: -0.02em;
  transition: color 0.35s ease;
}

.clients-right {
  position: relative;
  padding: 0 4rem 0 2rem;
  height: 100%;
  display: flex;
  align-items: center;
}

.client-media {
  position: absolute;
  opacity: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.client-media img {
  width: 280px;
  aspect-ratio: 1 / 1.05;
  object-fit: cover;
  border-radius: 2px;
}

.client-media p {
  font-size: 15px;
  line-height: 1.55;
  color: #555;
  max-width: 240px;
}
```

---

## JavaScript — GSAP

```js
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const clients = gsap.utils.toArray('.client-name')
const medias  = gsap.utils.toArray('.client-media')
const COUNT   = clients.length

// ScrollTrigger principal atado a toda la sección
ScrollTrigger.create({
  trigger : '.clients-section',
  start   : 'top top',
  end     : 'bottom bottom',
  snap    : {
    snapTo   : 1 / (COUNT - 1),   // divide el progreso en N pasos iguales
    duration : { min: 0.3, max: 0.6 },
    ease     : 'power2.inOut',
  },
  onUpdate(self) {
    const active = Math.round(self.progress * (COUNT - 1))
    activateClient(active)
  },
})

// ─── Transición entre clientes ───────────────────────────────────────────────

let current = -1

function activateClient(index) {
  if (index === current) return
  const prev = current
  current = index

  // Nombre anterior → color neutro
  if (prev >= 0) {
    gsap.to(clients[prev], {
      color    : '#1a1a1a',
      duration : 0.35,
      ease     : 'power2.out',
    })
  }

  // Nombre nuevo → rojo ABCS
  gsap.to(clients[index], {
    color    : '#E03C1F',
    duration : 0.35,
    ease     : 'power2.out',
  })

  // Media anterior → fade out hacia arriba
  if (prev >= 0) {
    gsap.to(medias[prev], {
      opacity  : 0,
      y        : -12,
      duration : 0.3,
      ease     : 'power2.in',
    })
  }

  // Media nueva → fade in desde abajo
  gsap.fromTo(
    medias[index],
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', delay: 0.1 }
  )
}
```

---

## Extra — centrar el item activo en la lista (opcional)

Si la lista es larga y querés que el nombre activo siempre quede centrado verticalmente en pantalla, agregás esto al final de `activateClient`:

```js
const listEl = document.querySelector('.clients-list')
const itemEl = clients[index]
const offset = itemEl.offsetTop - listEl.clientHeight / 2 + itemEl.clientHeight / 2

gsap.to(listEl, {
  scrollTop : offset,
  duration  : 0.5,
  ease      : 'power2.inOut',
})
```

Para que esto funcione, `.clients-list` necesita:

```css
.clients-list {
  overflow-y: scroll;
  scrollbar-width: none; /* oculta la scrollbar en Firefox */
}
.clients-list::-webkit-scrollbar {
  display: none; /* oculta la scrollbar en Chrome/Safari */
}
```

---

## Por qué cada decisión

| Decisión | Razón |
|---|---|
| `height: N * 100vh` en la sección | Crea el espacio de scroll que GSAP consume sin mover visualmente nada |
| `position: sticky` en el panel | El layout se queda fijo mientras la sección scrollea por debajo |
| `snap` en el ScrollTrigger | Evita quedar entre dos clientes — salta limpiamente de uno al otro |
| `scrub` ausente + `onUpdate` | El scrub continuo haría el color un degradado intermedio; con snap siempre hay un ganador claro |
| `delay: 0.1` en el fade-in | Le da tiempo al fade-out anterior para que las imágenes no se superpongan |
| `y: ±12px` en los crossfades | La imagen nueva sube desde abajo, la vieja sale hacia arriba — da dirección al movimiento |
