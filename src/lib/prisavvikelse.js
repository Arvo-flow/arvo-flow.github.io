// src/lib/prisavvikelse.js — fakturavyns besked när licensprövningen stoppade prissättningen.
//
// EN MENING, OCH DEN PÅSTÅR INGET OM TALET (tionde granskningen, efter fem varv med samma form: N-1, P-1,
// Q-1, R-1 och S-1/S-2). Varje förklaring av talet var sann för fakturan den prövades på och falsk för
// en annan som samma prövning stoppar: «licenspris» om ett pris per plats, Microsofts tillägg på en
// Adobe-faktura, «antalet licenser» där nämnaren var användare, «fakturans kostnad» där perioden lästs om
// av vår egen regel, «per användare» där regeln skapat nämnaren ur en rad utan användare, och «licensrad»
// om en paketrad. Prövningen finns för att fånga felläsningar, så varje sats om talets enhet eller
// ursprung kan bli falsk precis när prövningen gör rätt. Meningen säger därför bara att en kontroll slog
// till, att priset inte behöver vara fel, och vad kontrollen är till för (LT-11). Exemplet gäller kontrollens
// syfte, aldrig skälet för just den fakturan. LT-11 låser texten ordagrant.

export const PRISAVVIKELSE_RUBRIK = 'Vi stoppade prissättningen.';

export const PRISAVVIKELSE_MENING = 'En av våra automatiska priskontroller slog till. Det behöver inte '
  + 'betyda att priset är fel: kontrollen finns för att fånga tal vi kan ha läst fel, till exempel en '
  + 'kvartalssumma som ett månadspris, och den stoppar också vissa korrekta fakturor.';

export const PRISAVVIKELSE_SLUT = 'Därför visar vi inga besparingssiffror för den här fakturan.';
