# 📷 FotoKalk PRO — Kalkulator honorara za fotografe (RH 2026)

> Terenski pomoćnik za fotografe koji rade za **Adriatic.hr** — evidencija klijenata, plan snimanja i automatski obračun neto honorara prema hrvatskim poreznim propisima za 2026. godinu.

🔗 **Live aplikacija:** [pietaspula-spec.github.io/foto](https://pietaspula-spec.github.io/foto/)

---

## ✨ Funkcionalnosti

- **Autentikacija** — obavezna prijava e-mailom i lozinkom, bez mogućnosti korištenja bez prijave
- **Multi-user cloud sync** — svaki korisnik ima vlastiti korisnički račun i odvojene podatke na Supabase cloudu
- **Evidencija klijenata i objekata** — vlasnici, šifre objekata, ugovori, GPS koordinate, status fotografiranja
- **Plan snimanja** — termini s jasnim statusima (na čekanju / obavljeno / otkazano), zadani prikaz "Na čekanju"
- **Kalkulator honorara** — automatski izračun bruto i neto iznosa prema čl. 4 ugovora:
  - Kategorije objekta (6,50 € bruto/kat)
  - Snimanje dronom (32,50 € bruto)
  - Putni troškovi (€/km, prag km)
  - Naknade za otkazana snimanja (30 € propuštena dobit)
- **Porezni obračun za RH 2026** — prilagođen gradu/općini i statusu fotografa (samostalni umjetnik, zaposleni, umirovljenik)
- **Statistike** — zarada po mjesecima, ukupni neto, neplaćeni iznosi, PDV prag upozorenje
- **Izvoz podataka** — Excel, PDF, JSON, CSV
- **Backup sustav** — cloud backup (Supabase) + lokalni backup (.json) koji se može podijeliti

---

## 🔒 Autentikacija i pohrana podataka

Aplikacija zahtijeva prijavu. Korisnici se **ne mogu sami registrirati** — administrator ih dodaje putem Supabase Dashboarda.

**Podaci se čuvaju na dva mjesta:**
- **Lokalno** u `localStorage` preglednika (brz pristup, radi offline)
- **Supabase cloud** — ručnim klikom na "Spremi na oblak" u ☰ izborniku

Svaki korisnik vidi i može mijenjati **isključivo vlastite podatke** — Row Level Security (RLS) na razini baze onemogućava pristup tuđim podacima.

---

## 👤 Upravljanje korisnicima

Novi korisnici se dodaju putem **Supabase Dashboarda**:

1. Idi na **Authentication → Users**
2. Klikni **"Add user"** ili **"Invite user"**
3. Unesi e-mail i lozinku (ili Supabase šalje pozivnicu s linkom)

Promjena lozinke: Authentication → Users → klikni korisnika → "Reset password"

---

## ☁️ Cloud sync (Supabase)

Struktura baze podataka — tablica `podaci`:

```sql
-- Unique constraint (jedan red po korisniku)
ALTER TABLE podaci ADD CONSTRAINT podaci_user_id_key UNIQUE (user_id);

-- Row Level Security
ALTER TABLE podaci ENABLE ROW LEVEL SECURITY;
CREATE POLICY "vlastiti_podaci" ON podaci
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

Cloud sync nije automatski — korisnik ga pokreće ručno:
- **☰ → Oblak / Backup → Spremi na oblak** — šalje lokalne podatke na cloud
- **☰ → Oblak / Backup → Povuci s oblaka** — preuzima cloud podatke na uređaj

---

## ⚠️ Rizik gubitka podataka

Lokalni podaci (`localStorage`) brišu se ako korisnik obriše cache preglednika.

**Preporuka:** koristiti cloud backup svakodnevno + lokalni .json backup jednom tjedno.

---

## 📱 PWA — Instalacija na uređaj

Aplikacija je dostupna kao **Progressive Web App (PWA)** i može se instalirati:

- **Android / Chrome** — tri točke → *Dodaj na početni zaslon*
- **iOS / Safari** — dijeli ikona → *Dodaj na početni zaslon*
- **Desktop / Chrome** → ikona instalacije u adresnoj traci

Nakon instalacije aplikacija radi **potpuno offline** (cloud sync zahtijeva internet).

---

## 🔄 Napomena za developere — ažuriranje verzije

Aplikacija koristi **Service Worker s cache-first strategijom**. Nova verzija aktivira se tek kada korisnik zatvori sve tabove i ponovno otvori aplikaciju.

**Pri svakom novom deployu povećaj verziju cachea u `sw.js`:**

```js
const CACHE_NAME = 'fotokalk-v2'; // ← povećaj broj pri svakom deployu
```

---

## 🛠️ Tech stack

- Vanilla HTML / CSS / JavaScript (bez frameworka)
- [Supabase](https://supabase.com/) — autentikacija (Auth) i cloud pohrana podataka (PostgreSQL + RLS)
- Service Worker (offline podrška, PWA)
- localStorage (lokalna pohrana i brzi pristup)
- [SheetJS (XLSX)](https://sheetjs.com/) — izvoz u Excel
- GitHub Pages — hosting

---

## 📄 Licenca

Ovaj projekt je privatni alat. Nije predviđen za redistribuciju bez dozvole autora.
