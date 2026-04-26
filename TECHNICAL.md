# FotoKalk PRO - Technical Notes

Ovaj dokument je namijenjen programeru koji preuzima odrzavanje ili doradu aplikacije.

## Svrha aplikacije

`fotopro` je PWA aplikacija za fotografa na terenu. Slui za:

- izracun honorara
- vodjenje povijesti poslova
- upravljanje klijentima i objektima
- pregled plana snimanja
- lokalni rad i offline koristenje
- spremanje i povlacenje podataka iz oblaka

## Glavna arhitektura

Aplikacija je napravljena kao jedan veliki `index.html` s ugraenim:

- HTML prikazom
- CSS stilovima
- JavaScript logikom

Nema odvojenog build sustava ni frameworka. Vecina logike je u jednoj datoteci, pa je prije vecih izmjena dobro traziti funkcije po nazivu i pratiti gdje se iste vrijednosti citaju i zapisuju.

Glavne datoteke:

- `index.html` - cijela aplikacija
- `upute.html` - korisnicke upute
- `sw.js` - service worker / cache
- `manifest.json` - PWA manifest

## Stanja i pohrana podataka

Podaci se cuvaju na dva nivoa:

1. Lokalno u browseru
- `localStorage`
- dio privremenog stanja u `sessionStorage`

2. U oblaku
- Supabase Auth za prijavu
- Supabase REST/API zapisi za korisnicke podatke

Lokalno se cuvaju:

- postavke fotografa
- povijest poslova
- klijenti i objekti
- plan snimanja
- backup/sync zastavice

## Login i sesija

Prijava ide preko Supabase autentikacije.

Vazne varijable:

- `sbToken`
- `sbUserId`

Vazno ponasanje:

- nakon uspjesnog logina token se sprema lokalno
- pri pokretanju aplikacija pokusava obnoviti korisnicko stanje iz lokalnog storagea
- kod isteka sesije sada postoji centralni `handleAuthExpired()`

`handleAuthExpired()`:

- cisti token i user id
- mice pending sync stanje
- skriva sync indikator
- vraca korisnika na login ekran
- sprjecava da se poruka `Sesija istekla` prikazuje beskrajno vise puta

Ovo je bitno jer je ranije vise razlicitih `401/403` grana nezavisno pokazivalo istu poruku.

## Kalkulator

Kalkulator izracunava bruto i neto prema:

- broju kategorija
- dronu
- kilometrima
- putnim troskovima
- otkazu po dolasku
- dodatnim troskovima
- poreznim postavkama fotografa

Ako se mijenja poslovna logika obracuna, treba provjeriti:

- UI formu za unos
- mjesto gdje se rezultat sprema u povijest
- eksport funkcije
- sve prikaze totala i mjesecnih sazetaka

## Povijest i export

Povijest poslova koristi lokalne zapise i sluzi za:

- pregled starih poslova
- oznake placeno / neplaceno
- ukupne iznose
- PDF / Excel / JSON export

Kod promjene strukture zapisa treba paziti da:

- stari spremljeni podaci i dalje budu citljivi
- eksport ne pukne zbog novih ili nedostajucih polja

## Klijenti i objekti

Model nije samo "jedan klijent = jedan objekt".

Jedan vlasnik moze imati vise objekata, a objekt moze imati:

- sifru objekta
- broj ugovora
- adresu
- GPS
- status
- napomenu

CSV import/export ovisi o imenima i redoslijedu polja, pa svaka promjena modela trazi i provjeru tih funkcija.

## Plan snimanja

Plan snimanja prikazuje naloge dodijeljene iz admin aplikacije `nalozi`.

Bitno:

- admin i fotograf ne uredjuju potpuno ista polja
- kod sinkronizacije se radi merge
- fotografova statusna i terenska polja ne bi se smjela pregaziti admin updateom

Ako se dira model naloga, treba provjeriti obje aplikacije zajedno.

## Cloud sync

Aplikacija podrzava:

- rucno spremanje na oblak
- rucno povlacenje s oblaka
- tihi pull pri startu
- tihi auto-sync nakon lokalnih izmjena
- pending sync kad je uredaj offline

To je jedno od najosjetljivijih podrucja aplikacije.

Kod izmjena cloud logike treba posebno paziti na:

- `401/403` handling
- merge lokalnih i cloud podataka
- offline povratak online
- prikaz sync indikatora

## Ručna odjava i brisanje podataka

To nisu iste akcije.

`Odjava`:

- brise token
- radi `localStorage.clear()`
- radi `sessionStorage.clear()`
- efektivno brise sve lokalne podatke korisnika

`Obrisi sve podatke`:

- brise aplikacijske podatke
- ali namjerno moze ostaviti login stanje / token

To razlikovanje je vazno ako se mijenjaju sigurnosna ili UX pravila.

## PWA i service worker

`sw.js` koristi cache verziju:

```js
const CACHE_NAME = 'fotokalkpro-v0.4';
```

Kod svake bitne promjene deploya preporuka je:

- dignuti `CACHE_NAME`
- objaviti novi `sw.js`
- po potrebi dodati nove staticke datoteke u cache listu

U pripremljenoj verziji je i `upute.html` ukljucen u cache.

## Oprez kod izmjena

Prije izmjena posebno provjeriti:

- login i session handling
- sync s oblakom
- merge planova snimanja
- export funkcije
- localStorage kljuceve

Ovo nije modulariziran kod, pa jedna izmjena lako ima nuspojave na vise mjesta.

## Preporuceni smjer poboljsanja

- izvuci veca podrucja logike u odvojene `.js` module
- centralizirati sve `localStorage` kljuceve
- centralizirati Supabase pozive
- uvesti jedinstveni model podataka za klijente, plan i povijest
- dodati vise guard logike za stara / nekompatibilna stanja u storageu
