# Izmjene

## Zadnje pripremljene izmjene

### 1. Session handling

- uveden centralni `handleAuthExpired()`
- spriječeno stalno ponavljanje poruke `Sesija istekla`
- kod isteka sesije aplikacija čisti token i vraća korisnika na login

### 2. Cloud pull usklađivanje

- cloud pull sada ne preskače prazne ili resetirane vrijednosti iz oblaka
- stare lokalne vrijednosti se uklanjaju ako ih oblak više nema
- ručni i tihi pull sada konzistentnije vraćaju stvarno stanje backupa

### 3. Upute

- pripremljena nova kompletna datoteka `upute.html`
- stare parcijalne informacije zamijenjene punim uputama
- opisane nove cloud i backup funkcionalnosti

### 4. PWA / service worker

- podignut `CACHE_NAME` u `sw.js` na `fotoadriatic-v0.6`
- dodan `upute.html` u cache listu

### 5. Paket za upload

Za upload u repo pripremljene su ove datoteke:

- `index.html`
- `upute.html`
- `sw.js`
- `README.md`
- `IZMJENE.md`
