# Gränserna

Här står de faktiska reglerna. Resten av den här mappen beskriver en hållning
och lämnar bedömningen till dig. Det här avsnittet gör inte det, eftersom
gränserna är juridiska eller kommersiella och en felbedömning kostar mer än den
sparar.

---

## Vi provar ingenting fysiskt

Aldrig ett mätvärde vi inte tagit fram. Aldrig ett betyg vi inte fått läsa.
Aldrig ett brev vi inte skickat. Aldrig en tidsrymd vi inte suttit igenom.

Pilotens första version påstod en fotodiodrigg, ett åttaveckorstest och inköpta
exemplar. Allt fick skrivas om. På en publicerad sajt är det ett problem under
marknadsföringslagen, inte en tonfråga.

Skriv jämförelseramat från början. Det är både sant och den modell vi säljer.

## Affiliateupplysningen

Affiliateord hör hemma på `/annonsmarkning`, `/integritetspolicy`, `/om-oss`,
`/sa-testar-vi`, och i komponenterna `LegalDisclaimer`, `AffiliateDisclosure`
och `TrustBlock`. Ingen annanstans.

Upplysningen får stå på tre ställen, men **aldrig två gånger i samma register**:

| Var | Variant | Vad den gör |
|---|---|---|
| Överst i artikeln | `balk` | Den framträdande upplysningen, som länkar vidare till `/annonsmarkning` |
| I bylineblocket | `inline` | En dämpad rad, för den som läser vem som skrivit |
| Sidfoten | `footer` | Sitewide, den juridiska |

Regeln är inte ett antal utan en upprepning. Samma försäkring två gånger i
samma tonläge läser som oro. De tre ovan har olika tyngd, står på olika platser
och nås av olika läsare: balken av den som skummar, raden av den som kollar vem
som skrivit, sidfoten av den som letar efter det finstilta.

Det som fäller är två balkar, två inline-rader, eller en balk som säger samma
sak med samma ord som raden tjugo rader längre ner. `pnpm check:upplysning`
räknar varianterna.

Och försvara aldrig affärsmodellen i löpande text. En läsare som inte frågat får
inte ett svar; hen får en anledning att undra.

## Vad som ska stå kvar

Ärligheten om vad vi inte gjort är affärsidén och ska inte tvättas bort under
någon språkgranskning:

- "Vi har inte tänt eld på något."
- "Kriteriebetygen är vår bedömning, inte mätvärden."
- Att en källa saknar provning, standard eller mätvärde.
- Att vi inte kunnat verifiera ett pris, uttryckt som vad butiken inte skriver.

Skillnaden mot läckorna: det här är **vad vi vet och inte vet**. Läckorna
handlar om **hur vi tog reda på det**.

## Inga em-streck i läsartext

`pnpm check:emdash` fäller dem, kommentarer undantagna, och den har hittat dem
på ställen som är lätta att missa, bland annat i en `aria-label` som bara en
skärmläsare hör.

Tankstreck i intervall är korrekt och förväntat.

## Kategorinamn, inte konceptnamn

Texten riktar sig mot köpavsikt. Använd produktkategorinamn: `robotdammsugare`,
`brandvarnare`, `övervakningskamera`. Inte `smart hem`.

Ingen shoppar på ordet "smart". Det enda stället där ordet leder är sajtens eget
namn. Köpguiden får bygga bron: "är en smart robotdammsugare värd priset?"

## Ett tal, en behandling

Stjärnor och en betygsbricka är samma siffra två gånger. Visa den ena, och
använd utrymmet till en genuint annan signal, som butikens kundbetyg.

## Undvik ordet "hen"

Skriv om meningen i stället för att byta pronomen. "Han eller hon" är en sämre
lösning än en omskrivning: gör subjektet till "köparen", "den som", "du", eller
formulera om satsen så att pronomenet inte behövs.

## Verktygssvar säljer inte

Ett agentverktyg svarar med råd, kriterier, placering och tal. Aldrig ett
produktnamn, ett pris eller en butikslänk, och alltid med en länk till
test page sist.

Sajten får betalt när en människa klickar sig vidare till butiken. Ett verktyg
som lämnar ifrån sig hela svaret ersätter det steget. Frestelsen är störst på de
väljare som redan filtrerar vår egen rankning, eftersom listan ligger där.
