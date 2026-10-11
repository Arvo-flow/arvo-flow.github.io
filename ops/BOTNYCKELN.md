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
   Radera sedan båda filerna lokalt.
4. **Repo → Settings → Rules → Rulesets →** rulesetet för `main` **→ Bypass list → Add bypass →
   Deploy keys → Always allow.** Spara.
5. **Prova:** Actions → *Verify price sources (factory)* → Run workflow på `main`. I jobbet
   *Stämpla verifieringsdatum på main* ska loggen visa `✓ stampelvakt` och `✓ stämpeln ligger på
   main` (eller «inga datum att flytta» om dagens datum redan står där). Kör sedan
   *Sond — GitHub-hemligheterna*: `BOT_DEPLOY_KEY` ska vara SATT i `sond` och SAKNAS i `utan-miljo`.

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
