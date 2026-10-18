# Botnyckeln — så når verifieringsdatumen main igen

**Varför.** Grenskyddet på `main` (PR #80) nekar varje push som inte går via en PR. Prisverifierarnas
stämpel (`lastVerified` i `agents/recommender/branchindex.js`) pushades direkt till main och nekades
(GH006, körning 38090943472) medan jobbet visade grönt. Utan stämpeln står datumen bredvid
«verifierat» i kundens rum still, och efter 60 dagar larmar price-audit på ett pris som är riktigt.

**Varför inte en PR per stämpel.** En PR som skapas av `GITHUB_TOKEN` startar inga arbetsflöden, så
Grindens fyra kontroller rapporteras aldrig. Stämpeln ändrar dessutom en fil i `agents/`, så
Commitkravet och Andra blicken hade krävt ett sabotage och en granskning av ett datum. En bot kan bara
uppfylla det genom att hitta på texten.

**Lösningen.** Ett jobb (`verify-sources.yml#stampla`, miljön `produktion`) får en egen nyckel förbi
grenskyddet. Före varje push kontrollerar `scripts/stampelvakt.mjs` att commiten bara flyttar
`lastVerified`-datum framåt och inte förbi i dag. Allt annat, som ett pris, en rad eller en annan fil,
fäller pushen rött (SP-01..07, SP-10). Varje beslut bär dessutom prisbokens avtryck vid
verifieringen, så att ett pris som ändrats under körningen aldrig får dagens datum (SP-08), och
beslutet prövas mot källans deklaration i registret (SP-09). Avtrycket räknas också av
`discover`-jobbet, som inte kör några paket, och ett beslut med ett annat avtryck än det är ett
instrumentfel och rött (SP-13). Varje matrisjobbs beslut läses ur en egen katalog,
`stampel-<id>/stampel-<id>.json`, och en katalog som bär något annat är rött (SP-14).

## Fem steg för grundaren (ca 5 minuter)

1. **Skapa nyckeln lokalt** (ingen lösenfras):
   ```
   ssh-keygen -t ed25519 -C "arvo-verify-bot" -f arvo-bot -N ""
   ```
2. **Repo → Settings → Deploy keys → Add deploy key.** Titel: `Arvo Verify Bot`. Klistra in
   innehållet i `arvo-bot.pub`. Kryssa i **Allow write access**.
3. **Repo → Settings → Environments → produktion → Add environment secret.** Namn: `BOT_DEPLOY_KEY`.
   Värde: hela innehållet i `arvo-bot` (den privata nyckeln, med raderna `BEGIN` och `END`).
   Lägg den **inte** som repository-hemlighet: då når den varje gren, och läckkontrollen larmar.
   Spara filerna tills steg 5 är grönt (se Felsökning), och radera dem sedan.
4. **Repo → Settings → Rules → Rulesets →** rulesetet för `main` **→ Bypass list → Add bypass →
   Deploy keys → Always allow.** Spara.
5. **Prova:** Actions → *Verify price sources (factory)* → Run workflow på `main`. I jobbet
   *Stämpla verifieringsdatum på main* ska loggen visa `✓ stampelvakt` och `✓ stämpeln ligger på
   main` (eller «inga datum att flytta» om dagens datum redan står där). Kör sedan
   *Sond — GitHub-hemligheterna*: `BOT_DEPLOY_KEY` ska vara SATT i `sond` och SAKNAS i `utan-miljo`.

## Felsökning

**«git@github.com: Permission denied (publickey)» i steget *Checka ut main med botnyckeln*.**
Avläst 2026-10-11 (körning 38131322678, försök 3): hemligheten fanns (`HAR_NYCKEL: true`), och GitHub
vägrade nyckeln redan vid *läsning* av repot. Det är alltså inte rulesetet, som bara styr pushar.
Loggen har ingen rad «Load key … invalid format», så nyckeln lästes troligen som en privat nyckel
(obekräftat; den nya diagnosen mäter det). Trolig orsak: GitHub känner inte igen nyckeln för det här
repot. Antingen ligger den publika nyckeln inte under *Deploy keys* i **Arvo-flow/arvo-flow.github.io**,
eller så hör den publika nyckeln där och den privata i hemligheten till olika par.

Snabbast är att prova nyckeln lokalt innan något läggs in igen. Det tar fem sekunder:
```
ssh -i arvo-bot -o IdentitiesOnly=yes -T git@github.com
```
- `Hi Arvo-flow/arvo-flow.github.io! You've successfully authenticated…` — nyckeln är rätt. Lägg in
  just den filen (`arvo-bot`, hela, med BEGIN/END) som `BOT_DEPLOY_KEY` i miljön `produktion`.
- `Hi Arvo-flow/<annat-repo>!` — nyckeln är deploy key i ett annat repo. Lägg till en ny i rätt repo.
- `Permission denied (publickey)` — GitHub känner inte nyckeln. Lägg till `arvo-bot.pub` under
  Settings → Deploy keys i det här repot, med *Allow write access* ikryssat.

Har filerna redan raderats: skapa ett nytt par (steg 1) och byt **både** deploy key och hemlighet.
Kör sedan om bara jobbet *Stämpla verifieringsdatum på main* i samma körning (Re-run → det jobbet).
Besluten från matrisen ligger kvar som artefakter i sju dygn, så hela matrisen behöver inte köras om.
Sedan 17 okt behöver jobbet också `discover`-jobbets avtryck. Om en omkörning av ett enskilt jobb får
det från den första omgången är obekräftat; GitHubs dokumentation säger bara att omkörningen använder
samma `GITHUB_SHA`. Saknas avtrycket blir jobbet rött med «avtrycket av den verifierade prisboken
saknas», aldrig grönt. Kör då om hela körningen.

Från och med nästa version gör jobbet samma kontroll själv i steget *Botnyckeln känns igen av GitHub*
och skriver ut nyckelns fingeravtryck, som kan jämföras med det som står under Deploy keys (SP-12).

**«GH006: Protected branch update failed» i pushsteget.** Nyckeln fungerar men rulesetet släpper inte
igenom den: lägg till *Deploy keys* i rulesetets bypass-lista (steg 4).

**«The key you are authenticating with has been marked as read only».** Kryssa i *Allow write access*
på nyckeln under Deploy keys.

## Det undantaget betyder, öppet

- Undantaget gäller **varje** deploy key med skrivrätt. Håll exakt en (Settings → Deploy keys).
- Nyckeln ligger bara i miljön `produktion`. **Avläst 2026-10-10** (körning 38093302641, sonden
  dispatchad på en feature-gren): jobbet i `produktion` fick ingen runner och föll på 1 sekund utan att
  köra ett steg, medan jobbet utan miljö i samma körning fick en runner och körde (motprovet). En
  feature-gren når alltså inte miljön. Själva felmeddelandet går inte att läsa via API:t; kontrollera
  gärna att miljöns *Deployment branches* står på `main` (Settings → Environments → produktion).
  Den som vill använda nyckeln måste alltså först få en ändring av ett arbetsflöde genom en granskad PR.
- Vakten skyddar bara mot det `stampla`-jobbet skickar. SP-11 fäller sviten om något annat jobb i
  något arbetsflöde läser `BOT_DEPLOY_KEY` (utom sonden, som bara prövar att den finns). Blind för:
  en ändring som går förbi sviten, till exempel en direkt redigering i GitHubs webbgränssnitt mot en
  gren som sedan mergas utan att Grinden körts.
- Stämpelcommiten bär `[skip ci]`, så Grinden körs inte i efterhand på den. Det som prövar den är
  stampelvakten, före pushen.

## Avläst 2026-10-12: steg 5 är grönt

Körning 38245160978 (12 okt, schemalagd). Diagnossteget skrev `Nyckelns fingeravtryck: 256
SHA256:oUK/ZQjdHMogBViLo6ducUD4DipsvQYN9rL9jwx2Jsc arvo-bot (ED25519)` och `✓ GitHub känner igen
nyckeln`. Pushen gav `remote: Bypassed rule violations for refs/heads/main` och
`26ee710..a0f740e HEAD -> main`. GitHub släpper alltså en deploy key förbi just det här rulesetet.
Två stämplar ligger på main, fbf5e893 (11 okt, 23 datum) och a0f740ea (12 okt, 21 datum). Båda
prövade med `granskaStampeldiff`: bara datum ändrade.

Samma körning: 13 av 18 verifierare gröna, 5 röda (pipedrive HTTP 403, google-workspace 3 poster
oläsbara, telia-vaxel T1 oläsbar, villkorsbok märkt «DRIFT» för en 404, eurostat-el märkt «källa
oåtkomlig» för en ny period). De röda källornas beslutslistor var tomma, så de stämplade ingenting.

**Nyckelparen.** Grenen `fabrikssvep-2026-10-16` bär två publika nycklar i repots rot.
`arvo-bot-key.pub` har fingeravtrycket ovan och är den som fungerar. `arvo-bot.pub`
(`SHA256:uU2Io0c3QLxPAU7mYBGKexvbBpVoGvEwSWyF+NGtVuM`, kommentar `arvo-verify-bot`) är det första paret,
det GitHub inte kände igen i körning #47. Undantaget i rulesetet gäller varje deploy key med
skrivrätt: står det första paret kvar under Deploy keys ska det tas bort. Steg 5 är grönt, så de
privata nyckelfilerna ska raderas lokalt nu.

## Avläst 2026-10-17: läckan var öppen, nu stängd, och sonden sa för mycket

- **06:01 UTC, körning 39008341450.** Jobbet utan miljö såg sex repo-kopior: `ANTHROPIC_API_KEY`,
  `ARVO_ADMIN_SECRET`, `BOT_DEPLOY_KEY`, `CRON_SECRET`, `DATABASE_URL` och `RESEND_API_KEY`.
  Botnyckeln hade alltså också lagts in på repo-nivå, mot steg 3. Då når den varje gren, och ett
  arbetsflöde på en feature-gren hade kunnat pusha till main utan PR. Avläst: inga körningar på
  andra grenar läste nyckeln medan kopian fanns. I repots 100 senaste körningar (7–17 okt) körde
  utanför main bara Grinden, tre gånger den 11 okt, och SP-11 låser att Grinden inte läser nyckeln.
  Grenen `fabrikssvep-2026-10-16` har inga körningar. När kopian lades in vet jag inte.
- **Grundaren raderade de sex repo-kopiorna samma dag.**
- **20:44 UTC, körning 39068005452.** Jobbet utan miljö: alla 10 namn SAKNAS. Motprov: samma jobb
  såg sex av dem på morgonen, så sonden kan svara «satt». Jobbet i `produktion`: fem av sex satta.
  **`ARVO_ADMIN_SECRET` saknas.**
- **Sondens morgonsvar var grönt på fel grund.** Den sa «✓ Miljön produktion bär de 6». Men ett jobb
  i en miljö ser också repo-hemligheterna, så sonden kunde inte skilja dem åt. `ARVO_ADMIN_SECRET`
  fanns bara på repo-nivå. Nu väntar `sond` på läckkontrollen och skriver ✓ bara när den var grön,
  annars «Obevisat» och rött (HB-07).
- **Grundarens steg:** lägg `ARVO_ADMIN_SECRET`, med samma värde som i Vercel, som miljöhemlighet i
  `produktion`. Bara `run-batch-prospects.yml` läser den. Kör sedan sonden: båda jobben ska vara
  gröna.

## Tredje blickens fem [VAKT], stängda 2026-10-17

- **V1** (fetch som gick grönt): lagad i PR #82 (SP-07).
- **V2** (avtryckets producent oprövad): `nyttBeslut` räknar avtrycket ur prisbokens text och prövas i
  SP-13. Stämpeljobbet kräver dessutom `discover`-jobbets avtryck (`VERIFIERAD_AVTRYCK`). Ett fel i
  producenten blir alltså rött i drift, inte en varning i ett grönt jobb.
- **V3** (`merge-multiple` kunde skriva över): `merge-multiple: false`, och `lasBeslut` kräver exakt
  `stampel-<id>/stampel-<id>.json` (SP-14). Läst i källan till `download-artifact@v4`: med
  `pattern` och utan `merge-multiple` hamnar varje artefakt i `path/<artifact.name>/`, även en ensam.
- **V4** (läsaren såg inte `toJSON(secrets)`): ett uttryck som läser hemligheter utan att namnge dem
  räknas som alla, och SP-11 räknar också `secrets: inherit` (HB-06, SP-11).
- **V5** (avtryckets kornighet): masken läser datumvärdet inom raden (`DATUMFALT`), och SP-08 prövar
  en valuta på samma rad som datumet. Avtrycket för dagens prisbok blev detsamma.

SP-12 körs nu i både `bash` och `sh`. Steget använde `${X,,}`, som saknas i macOS bash 3.2, och
sviten föll därför på Mac men inte i Actions.

## Andra blicken på lagningen (17–18 okt): tolv sabotage fällde noll

Tre granskare startades med uppdraget «hitta var det gröna är osant». Alla dog på sessionsgränsen;
två hann köra 50 respektive 25 kommandon, som räddades ur transkripten (`npm run skorda`). Deras
sabotage som fällde 0 tester, alla [VAKT], alla lagade 18 okt:
- **Stämpelkedjan (4).** Räknesteget i gammal form gav n=0, och jobbet hoppade över allt och gick
  grönt. Ett tomt avtryck från `discover`, en råhash som skrev över producentens avtryck och fel fil som
  prisbok gav rött i drift men grönt i sviten. SP-15 kör nu kedjan som i Actions (discover-steget,
  den riktiga verify.mjs, nedladdningens form, räknesteget, stampla.mjs), och räknesteget jämför
  antalet kataloger mot allt i katalogen. Granskarens sonder fann också att en symlänkad katalog
  lästes och att «constructor» klarade registeruppslaget (SP-14).
- **Läcksonden (4).** Hemligheten läst under ett annat variabelnamn, `continue-on-error`, `|| true`
  och ett hårdkodat `LACKKONTROLL=success` gjorde sonden grön utan prövning. HB-08 kör båda stegen ur
  arbetsflödet och kräver samma namn på varje rad.
- **Läsaren (4 sabotage, fem former).** Citerat `inherit`, `env:` efter `jobs:`, YAML-escapes,
  `}}` i en strängliteral, och versaler eller flera rader i den dynamiska formen (HB-06). Inget av
  repots 148 flöden använder formerna i dag (granskarens inventering, omräknad 18 okt).

Lagningen fällde 18 sabotage, alla med `assert old in s`. Två rader i den togs bort för att de saknade
tand. **Lagningen har inte haft en egen andra blick.**
