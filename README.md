# 📷 FotoKalk PRO — Kalkulator honorara za fotografe (RH 2026)

> Terenski pomoćnik za fotografe koji rade za **Adriatic.hr** — evidencija klijenata, plan snimanja i automatski obračun neto honorara prema hrvatskim poreznim propisima za 2026. godinu.

🔗 **Live aplikacija:** [pietaspula-spec.github.io/foto](https://pietaspula-spec.github.io/foto/)

---

## ✨ Funkcionalnosti

- **Evidencija klijenata i objekata** — vlasnici, šifre objekata, ugovori, GPS koordinate, status fotografiranja
- **Plan snimanja** — termini s jasnim statusima (na čekanju / obavljeno / otkazano)
- **Kalkulator honorara** — automatski izračun bruto i neto iznosa prema čl. 4 ugovora:
  - Kategorije objekta (6,50 € bruto/kat)
  - Snimanje dronom (32,50 € bruto)
  - Putni troškovi (€/km, prag km)
  - Naknade za otkazana snimanja (30 € propuštena dobit)
- **Porezni obračun za RH 2026** — prilagođen gradu/općini i statusu fotografa (samostalni umjetnik, zaposleni, umirovljenik), s obračunom MIO, zdravstvenog i poreza na dohodak
- **Statistike** — zarada po mjesecima, ukupni neto, neplaćeni iznosi, PDV prag upozorenje
- **Izvoz podataka** — Excel, PDF, JSON, CSV
- **Backup sustav** — lokalni backup koji se može podijeliti putem maila, WhatsApp-a ili Google Drivea

---

## 🔒 Privatnost i pohrana podataka

Aplikacija je izrađena u skladu s važećom regulativom o zaštiti osobnih podataka **(GDPR / Uredba EU 2016/679)**.

**Svi podaci pohranjuju se isključivo lokalno na uređaju korisnika** (`localStorage` preglednika) — ništa se ne šalje na vanjske poslužitelje niti se ikakvi podaci prikupljaju centralno.

---

## ⚠️ Važno — gubitak podataka pri brisanju cachea

Budući da se podaci čuvaju lokalno u pregledniku, postoji jedan kritičan rizik:

> **Ako korisnik obriše cache / podatke preglednika, svi uneseni podaci bit će trajno izgubljeni.**

### Kako napraviti backup (preporučuje se redovito):

1. U aplikaciji klikni gumb **„💾 Backup — sve podatke"** (dno stranice / postavke)
2. Odaberi **„Preuzmi backup"** ili **„Podijeli backup"**
3. Backup datoteku pošalji sebi na **mail**, spremi na **Google Drive**, **iCloud** ili podijeli putem **WhatsAppa**
4. Za obnovu podataka koristi opciju **„Uvezi backup"**

> 💡 Preporučuje se backup nakon svakog radnog dana ili barem jednom tjedno.

---

## 📱 PWA — Instalacija na uređaj

Aplikacija je dostupna kao **Progressive Web App (PWA)** i može se instalirati na mobitel ili računalo:

- **Android / Chrome** — tri točke → *Dodaj na početni zaslon*
- **iOS / Safari** — dijeli ikona → *Dodaj na početni zaslon*
- **Desktop / Chrome** → ikona instalacije u adresnoj traci

Nakon instalacije aplikacija radi **potpuno offline**.

---

## 🔄 Napomena za developere — ažuriranje verzije

Aplikacija koristi **Service Worker s cache-first strategijom** što znači da korisnici **ne dobivaju automatski novu verziju** odmah nakon deploya na GitHub Pages.

Nova verzija aktivira se tek kada korisnik zatvori sve tabove i ponovno otvori aplikaciju.

**Da bi se forsiralo ažuriranje kod korisnika, pri svakom novom deployu treba povećati verziju cachea u `sw.js`:**

```js
// Primjer — mijenjaj pri svakom deployu:
const CACHE_NAME = 'fotokalk-v2'; // ← povećaj broj
```

Stari cache se tada automatski briše i korisnici preuzimaju novu verziju pri sljedećem otvaranju.

---

## 🛠️ Tech stack

- Vanilla HTML / CSS / JavaScript (bez frameworka)
- Service Worker (offline podrška, PWA)
- localStorage (lokalna pohrana podataka)
- [SheetJS (XLSX)](https://sheetjs.com/) — izvoz u Excel
- GitHub Pages — hosting

---

## 📄 Licenca

Ovaj projekt je privatni alat. Nije predviđen za redistribuciju bez dozvole autora.
