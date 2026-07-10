# Заміна плейсхолдерів на реальні фото

Зараз секції "Наш гараж" та "До/Після" показують текстові плейсхолдери
(назва авто на темній панелі) замість фото — реальних файлів фотографій
поки немає (скріншоти в чаті не зберігаються як файли).

Коли будуть готові файли (jpg/webp, без статус-бару телефону й UI Instagram):

## Галерея (`#garage .garage-grid`)
Покласти файли в `img/gallery/` і в `index.html` замінити кожен
`<figure class="garage-item ph" data-car="...">` на:
```html
<figure class="garage-item">
  <img src="img/gallery/bmw-m8.jpg" alt="BMW M8 Gran Coupe — detailing NM Detailing Kraków" loading="lazy" />
  <div class="garage-caption">BMW M8 Gran Coupe</div>
</figure>
```

Рекомендовані імена файлів (порядок як у розмітці):
- `img/gallery/bmw-m8.jpg`
- `img/gallery/audi-sq7.jpg`
- `img/gallery/mercedes-g-class.jpg`
- `img/gallery/ducati-streetfighter.jpg`
- `img/gallery/bmw-3-series.jpg`
- `img/gallery/vw-golf-gti.jpg`

## До/Після (`#garage .ba-slider`)
Покласти `img/before-after/golf-gti-before.jpg` та `golf-gti-after.jpg`,
замінити `.ph-car.dirty` та `.ph-car.clean` на звичайні `<img>`:
```html
<img class="ba-before" src="img/before-after/golf-gti-before.jpg" alt="Przed" />
<div class="ba-after-wrap">
  <img src="img/before-after/golf-gti-after.jpg" alt="Po" />
</div>
```

Формат фото: 4:5 для галереї, 16:10 для до/після, JPEG якість ~80 або WebP.
