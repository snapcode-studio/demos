# PRO-MET | Wizytówka CNC & Heavy-Duty

Nowoczesna, statyczna platforma wizytówkowa dla zakładu obróbki skrawaniem CNC – **PRO-MET**. Zaprojektowana w surowym, technicznym stylu "Heavy-Duty" (Dark Mode + Safety Orange), idealnie oddająca charakter branży metalowej, sprzętu fitness i komponentów budowlanych.

## 🚀 Technologie
* **Framework:** Next.js 16.2.9 (React 19)
* **Styling:** Tailwind CSS v4 (zoptymalizowany system gridów i układów bento)
* **Animacje:** Framer Motion (płynne, subtelne przejścia)
* **Architektura:** SSG (Static Site Generation) ze względu na `output: "export"`. Zapewnia błyskawiczne czasy ładowania, maksymalne bezpieczeństwo i darmowy hosting w dowolnym miejscu.
* **Ikony:** Lucide React

## ⚙️ Uruchomienie lokalne (Development)

Aby uruchomić aplikację w trybie deweloperskim na swoim komputerze:

1. Zainstaluj zależności:
```bash
npm install
```
2. Uruchom serwer deweloperski:
```bash
npm run dev
```
3. Otwórz w przeglądarce `http://localhost:3000`.

*Uwaga: Serwer deweloperski zawiera mnóstwo dodatkowego kodu ułatwiającego pracę programiście (Hot Module Replacement, React DevTools), dlatego wyniki w narzędziach takich jak Lighthouse będą zaniżone ze względu na większy rozmiar paczek JS.*

## ⚡ Wersja Produkcyjna (Testowanie wydajności)

Aby przetestować prawdziwą prędkość strony i upewnić się, że uzyskasz 100/100 punktów w Lighthouse:

1. Zbuduj statyczne pliki (folder `out`):
```bash
npm run build
```
2. Zaserwuj statycznie wygenerowaną paczkę:
```bash
npx serve@latest out
```
3. Wejdź na wyświetlony adres (najczęściej `http://localhost:3000`) i wykonaj test wydajności w przeglądarce incognito.

## 🌍 Wdrożenie (Deployment - Vercel)

Aplikacja jest zoptymalizowana do łatwego wdrożenia np. na platformie Vercel.

**Ważne podczas importu projektu w Vercel:**
1. Po wczytaniu repozytorium upewnij się, że **Framework Preset** jest ustawiony na **`Next.js`**. (Jeśli wykryje "Other", zmień to na Next.js).
2. Po zmianie presetu Vercel automatycznie obsłuży statyczny eksport z folderu `out`.
3. Kliknij **Deploy**.

---
*Stworzone przy użyciu Antigravity & Next.js*
