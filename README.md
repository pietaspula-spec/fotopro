# FotoAdriatic

Terenski alat za fotografe koji rade za Adriatic.hr i slične naručitelje: kalkulator honorara, povijest poslova, baza klijenata, plan snimanja, cloud sync i backup.

## Što aplikacija radi

- Prijava korisnika e-mailom i lozinkom
- Kalkulator bruto i neto honorara
- Povijest poslova s ukupnim statistikama
- Izvoz u PDF, Excel i JSON
- Baza klijenata i objekata
- Plan snimanja i sinkronizacija naloga iz admin aplikacije
- Cloud spremanje i povlačenje podataka
- Lokalni backup i dijeljenje backupa
- PWA instalacija i offline rad

## Glavne funkcionalnosti

### 1. Prijava i korisnički račun

Korisnik se prijavljuje putem Supabase Auth prijave. Nakon uspješne prijave aplikacija sprema token lokalno i pokušava podići korisničko stanje pri idućem otvaranju.

Nova verzija uključuje centralno rukovanje istekom sesije kako se poruka o isteku ne bi beskonačno ponavljala tijekom tihog cloud pull/sync procesa.

### 2. Kalkulator honorara

Kalkulator podržava:

- broj kategorija
- dron
- kilometre i putne troškove
- otkaz po dolasku
- dodatne troškove
- porezne i doprinosne izračune

Izračun koristi lokalne postavke fotografa: status, grad/općinu, poreznu stopu, MIO, ZO i paušalne izdatke.

### 3. Povijest i izvoz

Kartica Povijest prikazuje:

- ukupan neto
- ukupan bruto
- broj poslova
- oznake plaćeno / neplaćeno
- mjesečne preglede

Podaci se mogu izvoziti kao:

- PDF evidencija
- Excel `.xlsx`
- JSON

### 4. Klijenti

Jedan vlasnik može imati više objekata. Svaki objekt može sadržavati:

- šifru objekta
- broj ugovora
- adresu
- GPS koordinate
- status fotografiranja
- napomenu

Podržan je i CSV import/export klijenata.

### 5. Plan snimanja

Plan snimanja služi za:

- pregled naloga koje je admin dodijelio fotografu
- status naloga
- datum snimanja
- navigaciju prema lokaciji
- sinkronizaciju s cloud zapisom

Kod sinkronizacije admin polja i foto polja se mergeaju kako se međusobno ne bi pregazila.

### 6. Oblak i backup

Aplikacija podržava dva načina rada s podacima:

- cloud spremanje kroz Supabase
- lokalni backup kroz JSON datoteku

Ručne cloud opcije:

- `Spremi na oblak`
- `Povuci s oblaka`

Osim ručnih opcija, nova verzija koristi i:

- tihi cloud pull pri startu
- tihi auto sync nakon lokalnih izmjena
- pending sync kad je uređaj offline

### 7. PWA i offline rad

FotoAdriatic je PWA aplikacija. Service worker kešira ključne resurse i omogućuje rad nakon prvog učitavanja.

U ovoj pripremljenoj verziji `sw.js` koristi cache:

```js
const CACHE_NAME = 'fotoadriatic-v0.6';
```

Kod novog deploya preporučuje se podići cache verziju kako bi korisnici brže dobili novu verziju aplikacije.

## Struktura repoa

```text
index.html
upute.html
sw.js
manifest.json
icon-192.png
icon-512.png
README.md
IZMJENE.md
```

## Tehnologija

- Vanilla HTML / CSS / JavaScript
- Supabase Auth + REST
- localStorage
- Service Worker
- GitHub Pages
- SheetJS (`xlsx`) za Excel export

## Napomena za deploy

Ako mijenjaš `index.html`, preporuka je istovremeno objaviti i novu verziju `sw.js` s podignutim `CACHE_NAME`.
