# Wycieczki PW

## Important:
Projekt nie zawiera `package-lock.json`, przy klonowaniu do nowego środowiska należy puścić `npm i`.
Przyszła zawartość pliku `.env` znajdzie się na slacku.

## Struktura folderów (w src):

- `assets`
    - statyczna grafika
- `components`
    - globalne komponenty dla całego projektu
- `config`
    - ścieżki backendu
- `constants`
    - rzeczy stałe, wszystko musi być opisane przez enumy w celu łatwej zmiany w razie wypadku
- `context`
- `pages`
    - główne widoki -- struktura poniżej:
    - `index.js`
    - `Component.jsx`
    - `Component.test.js` / `Component.test.jsx`
    - `components`
        - pomniejsze komponenty, które wykorzystuje się tylko w tym widoku
- `root`
    - folder główny, składa się (na razie) z dwóch podfolderów:
    - `App`
    - `Router`
- `styles`
    - pliki ze stylami poszczególnych komponentów (w plikach js)
- `utils`
    - globalnie używane funkcje / helpery