# 🎮 Danielle's Rincón Web

Sitio personal con estética **Web 1.0 + Windows 98 / Internet Explorer 5**, diseñado para recrear la experiencia visual de finales de los 90 e inicios de los 2000.

## 🌐 Qué incluye

- Ventana principal estilo Win98 (`.win98-window`) con title bar, menú y toolbars clásicas.
- Layout modular con Grid/Flex (sin perspectiva 3D moderna).
- Panel “Mis Redes” tipo explorador/directorio con micro íconos de 16x16.
- Footer tipo “trophy case” con badges 88x31.
- Reproductor MP3 **visual-only** (sin audio real), con LCD retro y playlist XML.
- Efecto CRT con scanlines y tipografía retro.

## 📂 Estructura del proyecto

```
/
├── index.html
├── style.css
├── script.js
├── playlist.xml
├── assets/
└── README.md
```

## 🎵 Reproductor MP3 (simulación visual)

El reproductor no reproduce archivos de audio. Simula reproducción usando estado interno y un temporizador.

### Controles

- `PLAY`: inicia contador falso (`setInterval` cada 1s).
- `PAUSE`: pausa contador.
- `STOP`: detiene y reinicia a `00:00`.
- `|◀` (`Prev`) y `▶|` (`Next`): cambian pista manualmente y reinician tiempo.

### LCD

Formato mostrado:

`[ID]. [TITLE] | [MM:SS] | [STATE]`

Ejemplo: `01. Final Fantasy VII - Battle Theme | 00:14 | PLAY`

### `playlist.xml`

Cada pista usa este formato:

```xml
<track>
	<id>01</id>
	<title>Nombre de la canción</title>
	<duration>185</duration>
</track>
```

- `duration` está en segundos.
- Cuando `elapsedSeconds >= duration`, el reproductor hace auto-skip a la siguiente pista.
- Al llegar al final, vuelve al índice `0` (loop).

## 🔗 Mis Redes

Los enlaces del panel “MIS REDES”:

- redirigen a URLs reales,
- se abren en pestaña nueva (`target="_blank"`),
- usan `rel="noopener noreferrer"`.

## 🎨 Lineamientos visuales implementados

- Botones y paneles con biseles Win98 (relieve/inset).
- Toolbars con `grips`, separadores verticales y botones icon+texto.
- Íconos 16x16 con `image-rendering: pixelated`.
- Badges 88x31 en footer con borde retro.
- Tipografía y densidad visual orientadas a look técnico clásico.

## 🚀 Ejecutar localmente

1. Abrir el proyecto en VS Code.
2. Levantar un servidor local (recomendado, para `fetch('playlist.xml')`).
3. Abrir `index.html` en el navegador.

> Nota: si `playlist.xml` no carga por contexto local, el reproductor usa una playlist de respaldo para mantener la simulación visual.

---

© 2026 Danielle's Rincón Web.
