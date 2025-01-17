# DT193G - Projekt - Apotek 24/7 Klientapplikation

I detta repo finns koden för ett Vue-projekt som är ett lagerhanteringssystem för Apotek 24/7. Projektet är skapat av Stina Persson och Hanin Farhan för kursen Fullstackutveckling med ramverk (DT193G) på Mittuniversitetet. 

## Klientapp -Lagerhantering

Klientapplikationen är gjord för ett lagerhanteringssystem åt ett onlineapotek. Den konsumerar webbtjänsten som man kan läsa mer om här https://github.com/Webbutvecklings-programmet/projekt---webbtjanst-api-Hanin-96. Appen har följande funktionalitet: 
<ul>
  <li>Läser in produkter</li>
  <li>Lägga till nya produkter</li>
  <li>Uppdatera produkter</li>
  <li>Ta bort produkter</li>
  <li>Skyddade router med krav på autentisering</li>
  <li>Inlogg och registrering av användare</li>
</ul>

## Filstruktur
I rotmappen ligger filer för Vue och Tailwind, samt config-filger och package.json. Src-mappen innehåller filerna för själva frontend som App.vue och main.js. Här finns också komponentmappen med alla komponenter och viewsmappen med våra views. I routermappen ligger även alla routes och redirects. Der finns även en storemapp, men dock så används inte den storen. Under Assetsmappen finns grafiska filer som logotyp, favicon och css-fil. 

## Installation

```sh
npm install
```

### Starta appen lokalt

```sh
npm run dev
```

### Bygga appen

```sh
npm run build
```
