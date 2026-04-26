# FotoAdriatic - Testiranje

Ovaj dokument sluzi kao brza checklist za provjeru nakon izmjena.

## 1. Login

- Otvori aplikaciju bez spremljenog tokena.
- Provjeri da se prikazuje login ekran.
- Prijavi se valjanim korisnikom.
- Provjeri da aplikacija ucita korisnicke podatke i glavni ekran.

## 2. Session expiry

- Simuliraj neispravan ili istekao token.
- Provjeri da se poruka `Sesija istekla` prikaze samo jednom.
- Provjeri da se korisnik vrati na login ekran.
- Provjeri da aplikacija ne ostane u poluulogiranom stanju.

## 3. Ručna odjava

- Prijavi se.
- Iz hamburger menija odaberi `Odjava`.
- Provjeri da se aplikacija reload-a.
- Provjeri da su lokalni podaci obrisani.
- Provjeri da se pri ponovnom otvaranju ne ucitava stari korisnik.

## 4. Kalkulator

- Unesi tipican posao.
- Usporedi bruto i neto s ocekivanim iznosom.
- Provjeri kombinacije: dron, kilometri, dodatni trosak, otkaz.
- Spremi posao i provjeri da ulazi u povijest.

## 5. Povijest

- Provjeri prikaz spremljenih poslova.
- Promijeni status placeno / neplaceno.
- Provjeri ukupne iznose i broj poslova.
- Provjeri mjesečne preglede ako postoje podaci za vise mjeseci.

## 6. Export

- Napravi PDF export.
- Napravi Excel export.
- Napravi JSON export.
- Provjeri da datoteke sadrze ocekivana polja i da export ne puca na starijim zapisima.

## 7. Klijenti i objekti

- Dodaj vlasnika i vise objekata.
- Uredi postojeci objekt.
- Provjeri GPS, adresu i status.
- Napravi CSV import/export ako je dirana logika modela.

## 8. Plan snimanja

- Povuci plan iz admin aplikacije / oblaka.
- Provjeri da se nalozi prikazuju po fotografu.
- Promijeni status na strani fotografa.
- Nakon admin izmjene provjeri da merge ne pregazi foto-polja.

## 9. Cloud sync

- Napravi rucni `Spremi na oblak`.
- Napravi rucni `Povuci s oblaka`.
- Izmijeni lokalne podatke i provjeri tihi auto-sync.
- Iskljuci mrezu i provjeri pending sync stanje.
- Vrati mrezu i provjeri da se sync dovrsi bez dupliranja ili gubitka podataka.

## 10. Backup

- Napravi lokalni backup.
- Uvezi backup natrag.
- Provjeri da su podaci citljivi i potpuni.
- Ako postoji share opcija, provjeri da generirana datoteka ima smislen sadrzaj.

## 11. PWA / offline

- Instaliraj aplikaciju kao PWA.
- Otvori aplikaciju nakon prvog ucitavanja bez mreze.
- Provjeri da se glavni ekran otvara.
- Nakon deploya nove verzije provjeri da se povukao novi `sw.js`.

## 12. Regresija nakon deploya

- Zatvori sve tabove / PWA instance.
- Ponovno otvori aplikaciju.
- Provjeri da su `index.html`, `upute.html` i `sw.js` uskladeni.
- Ako korisnik i dalje vidi staru verziju, provjeri cache verziju u `sw.js`.
