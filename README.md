# Flashcard-react
Projekt na lekcje
# Podziękowania
> Cały styl dokumentacji został pożyczony od [@Teczak-dev](https://github.com/Teczak-dev)

## Krótki opis
Moja aplikacja codziennie generuje zestaw 10 fiszek, identyczny dla wszystkich użytkowników: 8 łatwych oraz 2 trudne. Użytkownik może przeglądać swoje statystyki, a także – jeśli chce – zobaczyć pełną listę dostępnych fiszek. Aplikacja wspiera naukę dwóch języków: hiszpańskiego oraz angielskiego.

## Live demo
- [Link do live demo ->](https://fiszkireact.infinityfree.me/)

## Screenshots
![pulpit](./public/img1.png)
![analiza](./public/img2.png)

## Video demo
[Demo](https://youtu.be/mU6r3AmY8_A) 

## Funkcjonalności
- Strona: nauka - pasek postępu, fiszki, statystyki
- Strona: statystyki - ogolne statystki (zapis do localStorage), wykres
- Strona: słowka - zbior wszystkich fiszek, wyszukiwarka
- Responsywnosc
- Wybor jezyka do nauki (angielski / hiszpanski), zapis do localStorage

### Krótki przewodnik po frontendzie aplikacji FitTrack.

## Szybki start
1. Sklonuj repozytorium
```bash
git clone https://github.com/Teczak-dev/fittrack-frontend.git
cd fittrack-frontend
```
2. Zainstaluj zależności
```bash
npm install
```
3. Uruchom w trybie deweloperskim
```bash
npm run dev
```
4. Otwórz w przeglądarce (Vite poda URL, zwykle `http://localhost:5173`)

## Budowanie produkcyjne
```bash
npm run build
npm run preview
```

## Konfiguracja
- Projekt nie wymaga kluczy API w tym repo, API jest prywatnym projektem, dostęp do backendu możliwy po kontakcie prywatnym, jeżeli masz własne API to zmień lokalizację w vite.config.ts 

- Wyjasnienie endpointów API znajdują się w [docs/api.md](./docs/api.md)

## Struktura projektu (krótko)
- `src/` — kod źródłowy
  - `components/` — atoms/molecules/organisms/templates
  - `context/` —  (`LanguageContext.jsx`)
  - `hooks/` — custom hook (`useDailyWords.js`)
  - `pages/` — strony aplikacji (np. `Study.jsx`)
  - `assets/` — obrazy i zasoby publiczne

Pełna dokumentacja znajduje się w katalogu [docs/structure](./docs/structure.md).

## Biblioteki

- `hamburger-react` ^2.5.2 - do menu hamburget na stronie /home
- `react-circular-progressbar` ^2.2.0 - do renderowania kółka
- `react-device-detect` ^2.2.3 - do wykrywania typu urządzenia ( telefon / komputer )
- `recharts` ^3.5.1 - użyte do wyświetlania statystyk

## Known issues
Spis znanych problemów w [docs/known_issues.md](./docs/known_issues.md).

## Architektura i komponenty
- Diagram architektury i opis kluczowych komponentów: [docs/architecture.md](./docs/architecture.md) i [docs/components.md](./docs/components.md).

## Co sprawiło trudność
- Krótkie omówienie problemów i rozwiązań: [docs/adr.md](./docs/adr.md').

## Contribution
- Instrukcja dodawania funkcjonalności: [docs/contribution.md](./docs/contribution.md).

## Q&A
#### Co sprawiło największe problemy i jak je rozwiązałeś?
Największym problemem okazały się operacje na zbiorach danych (ćwiczenia). To na nich spędziłem najwięcej czasu. Poradziłem sobie dzięki korzystaniu z dokumentacji JS/TS, zasobów na StackOverflow oraz rozrysowaniu problemu.

#### Czy powtórzyłbyś taki projekt?
Nie!

## Licencja
Sprawdź plik `LICENSE` w repozytorium.

---

## 👨‍💻 Autor

**Mikołaj Sobczak** - [@Teczak-dev](https://github.com/Teczak-dev)

- 🌐 **Website:** [mikolaj-sobczak.pl](https://mikolaj-sobczak.pl/)
- 💼 **LinkedIn:** [Mikołaj Sobczak](https://www.linkedin.com/in/mikołaj-sobczak-27b0a429a)
- 📧 **Contact:** poprzez GitHub Issues

---

*Projekt stworzony w celach edukacyjnych jako demonstracja nowoczesnych technik frontend development.*
