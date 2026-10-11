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
beslutet prövas mot källans deklaration i registret (SP-09).

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

**Obekräftat tills steg 5 körts:** att GitHub släpper en deploy key förbi just det här rulesetet.
Faller steg 5 med GH006 är jobbet rött och felmeddelandet pekar hit.
