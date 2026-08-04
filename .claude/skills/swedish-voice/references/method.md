# Hur en regel blir en regel här

Läs den här filen **innan** du föreslår en språkregel. Den finns för att fyra
regler en gång lades fram och alla fyra underkändes med orden "none of these".

De var en språkmodells åsikter om svenska. De lät rimliga. De var fel.

---

## De tre stegen

1. **Ingen regel utan belägg.** Antingen en mätning mot referenskorpusen eller
   en rättelse från Peter. Aldrig "det här låter engelskt för mig". Din
   intuition om svensk naturlighet är tränad på översatt text och kan inte
   skilja en kalkering från en idiomatisk konstruktion.

2. **Referenskorpusen avgör i första ledet.** 151 000 ord svensk konsument- och
   testjournalistik i `.agent/referens/`, till största delen Råd & Rön.

   ```bash
   pnpm sprak "lämnar * helt utanför"
   ```

   `*` matchar valfritt ord. Jämför alltid vår frekvens mot referensens, inte
   bara mot noll: en fras som förekommer två gånger hos oss och noll gånger i
   referensen är svagare bevis än en som förekommer 237 gånger.

3. **Peter avgör i sista ledet.** En nolla i referensen är en indikation. Råd &
   Rön har ett eget register och saknar massor av fullt idiomatisk svenska.
   Fraser som saknas där men försvaras av en riktig källa hamnar under
   *Flaggat men inte avgjort* i `measurements.md`, inte bland reglerna.

## Mät också ersättningen

Det här steget glömdes en gång och kostade 145 redigeringar.

`sidans` byttes mot `av de tolv` över hela sajten. Ersättningen visade sig ha
noll förekomster i referensen, precis som originalet. En formel hade bytts mot
en annan formel.

Kör `pnpm sprak` på det du tänker skriva **innan** du kör en bred ersättning,
inte bara på det du tänker ta bort.

## Var en ny regel ska stå

Tre lager, och fel lager är nästan lika illa som ingen regel.

| Regeln gäller | Lägg den i |
|---|---|
| All svensk text, oavsett projekt | Global skill `naturlig-svenska` |
| Svenska produktrecensioner i allmänhet | Global skill `svensk-produktrecension-skrivstil` |
| Bara smartatest.se | Den här mappen |

Provet: **skulle regeln vara sann för en svensk recension av vandringskängor?**
Om ja hör den hemma i en global skill, inte här.

## Kan en maskin avgöra den?

Om regeln går att uttrycka som ett mönster i text ska den bli ett skript i
`scripts/` och en rad i `pnpm check`, inte en rad i en markdownfil.

En regel i prosa är en regel någon ska komma ihåg. En regel i `pnpm check` är
en regel som inte går att glömma. Se `.claude/context/ship.md`.

Det som stannar i prosa är det ingen maskin kan bedöma: om ett omdöme vågar
avråda, om en rubrik förtjänar läsningen, om en nackdel är en förklädd fördel.
