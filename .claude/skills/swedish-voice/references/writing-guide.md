# Skrivguiden

Hur en recension byggs, mening för mening. **Vem** som skriver står i
`who-you-are.md`, **vem** som läser i `who-reads.md`. Den här filen förutsätter
båda och handlar bara om hantverket.

Formerna nedan är figurer att fylla med omdöme, inte mallar att fylla i. Sju
omdömen som följer formen ord för ord låter som sju omdömen skrivna av samma
maskin, vilket de i så fall är. Varje form nedan har därför en anteckning om vad
som ska variera.

Det allmänna svenska hantverket ligger i den globala skillen
`svensk-produktrecension-skrivstil`. Här står bara det som avgjorts för
smartatest.se.

---

## Recensionens fyra rörelser

**De fyra rörelserna är fyra stycken.** Separera dem med tom rad i strängen.
`VerdictText` delar på `\n{2,}` och stödjer `**fetstil**` på den mening som bär
poängen; utan tomrad blir hela omdömet ett enda block, eftersom HTML gör
radbrytningar till mellanslag.

Det är inte en formatfråga. `/nyckelskap` levererades med sex omdömen på 649
till 1 177 tecken, samtliga i ett stycke, och `/avfuktare` hade tidigare 1 900
tecken som blev 375 pixlar sammanhängande löptext i 918 pixlars bredd. Ingen
läser det. `pnpm check:omdomen` rapporterar varje omdöme över 500 tecken utan
styckebrytning.

**1. Vad produkten är, hur den skiljer sig, vad den kostar.** Två meningar. Ut
med det viktigaste direkt: den starkaste egenskapen och prisläget. Läsaren ska
kunna sluta läsa efter mening två och ändå veta om produkten är intressant.

**2. USP:arna, en i taget, var och en med sin följd.** Det här är brödet. En
egenskap utan konsekvens är en specifikation, och specifikationer står redan i
tabellen.

**3. En ärlig begränsning, med sin följd.** En enda, den som faktiskt får någon
att välja bort produkten.

**4. Rekommendationen.** Vem ska köpa den, och vad ska den som inte ska köpa den
ta i stället.

Vinnaren får en obetingad rekommendation. Övriga får villkorade. En läsare som
just läst att produkten är bäst i test och sedan får ett hedgat råd blir mer
osäker av att läsa oss, inte mindre.

### Öppningen namnger produkten och dess styrka

Ingen uppvärmning, ingen fråga till läsaren, ingen scen. Omdömet får öppna
platt, men aldrig subjektslöst och aldrig på ett dokument.

| I stället för | Skriv |
|---|---|
| "Winbot W1 Pro är ensam om att tala om vad som gäller på båglöst glas." | "Winbot W1 Pro är roboten för glas utan ram." |
| "Winbot Mini är den minsta roboten, och storleken är hela argumentet." | "Winbot Mini är den minsta och lättaste roboten här, och för 3 299 kronor den näst billigaste." |
| "Det finns tre saker att veta om den här modellen." | *(passar vilken produkt som helst i vilken kategori som helst)* |

Den andra raden visar också vad "hela argumentet" är för fel: den lovar ett
argument innan något argumenterats. Skriv egenskapen, inte löftet om den.

### Varje USP bär sin konsekvens

Talet i sig övertygar ingen som inte redan kan kategorin. Talet plus vad det
betyder i hens hem gör det.

| Specifikation | USP |
|---|---|
| "40 minuters hålltid vid strömavbrott." | "Går säkringen medan roboten sitter tre våningar upp är det marginalen du har på dig att komma hem och lyfta ner den." |
| "Sprejmunstycken framför duken." | "En duk som fuktats en gång torkar under passet. Sprejen håller den blöt hela vägen genom huset." |
| "Kompakt chassi." | "Lämnar den smalaste remsan i hörnen av alla robotar här." |

Regeln: **skriv aldrig ett tal utan att nästa sats säger vad det gör för
läsaren.** Om du inte kan skriva den satsen hör talet hemma i tabellen, inte i
prosan.

### Avslutet ska utesluta någon

Sista stycket säger vem som ska köpa och varför, och vad alternativet är för den
som inte ska. "Ett bra val för många" utesluter ingen och hjälper därför ingen.

**Ett omdöme som inte utesluter en enda köpare har inte gett ett råd.**

Variera konstruktionen. På `/fonsterputsrobot` slutade alla sju omdömen på
`Köp den om X. Har du Y ska du välja Z i stället.` Sju likadana avslut är en
mall som syns. Alternativ som fungerar lika bra:

- "För alla andra: köp Kärcher RCW 2." — rakt, för vinnaren
- "Har du båglöst glas är valet redan gjort." — förutsättningen avgör
- "Putsar du några rutor då och då tar du W2 Pro och lägger mellanskillnaden på
  något annat." — rekommendation genom avrådan
- "Till priset ovan gör Kärcher jobbet för en tredjedel." — jämförelsen avgör

Varianten `Ska du X är A. Ska du Y är B.` är bra och blir en mall så snart den
används på fler än ett par produkter. På `/nyckelskap` bar fyra av sex avslut
samma tvåarmade villkor. Låt minst hälften av avsluten på en sida ha en annan
form: ett rakt köpråd, en avrådan, en prisjämförelse, en förutsättning som
avgör åt läsaren.

## Definiera inte genom kontrast

Vanan att säga vad något *inte* är, eller vad det används *i stället för*, i
stället för att säga vad det är. Mätt mot referenskorpusen är det sajtens
tydligaste egna tic:

| Fras | Vi | Referens | Kvot |
|---|---|---|---|
| `i stället för` | 272 | 7 | 18,4x |
| `går inte att` | 61 | 1 | 29,0x |
| `och inte en` | 26 | 1 | 12,3x |
| `är inte ett` | 29 | 2 | 6,9x |
| `aldrig som` | 22 | 0 | — |
| `inte samma sak som` | 14 | 0 | — |

Att `är inte` ensamt ligger på 2,6x visar vad regeln *inte* är: negation i sig
är oproblematisk. Det är den kontrastiva definitionen som är vanan.

| Vi skrev | Skriv |
|---|---|
| "Skillnaden är inte teoretisk." | "HOBOT-388 klarar 20 minuter. Kärcher klarar 40." |
| "'Mer än 30 minuter' är ett golv och inte en mätning." | *(stryk meningen, den handlar om ett dokument)* |
| "En produktsida som ligger kvar är inte samma sak som en produkt som säljs." | "Butiken har tagit bort priset, så den går inte att beställa." |
| "Det är vidhäftning, inte rengöring." | "Pascaltalet säger hur hårt roboten suger sig fast mot glaset." |

Aforismen av typen *X är inte Y* känns skarp när man skriver den och säger
sällan något. Skriv påståendet.

`skillnaden mellan` mättes samtidigt och ligger på 2,5x, alltså inom normalen.
Den är fri att använda. Mät innan du stryker något; se `measurements.md`.

## Siffror skrivs med siffror

Allt läsaren kan tänkas jämföra skrivs med siffror: `40 minuter`, `200 kilo`,
`10 centimeter`, `3 299 kronor`. Utskrivet i bokstäver blir det osökbart, tar
mer plats och stannar ögat som skummar.

`/fonsterputsrobot` hade `40 minuter` i sektionen och `fyrtio minuter` i
omdömet om samma sak. Skriv siffror i båda.

Bokstäver kvar där talet inte är ett mått: "ett par kilo", "de sju", "en enda".

## Betyget är ingen konsekvens

Vi sätter kriteriebetyg och de är publicerade. Men "det kostar poäng på
trösklar" säger läsaren ingenting, för poängen är vår interna valuta och hen ska
fatta ett beslut, inte läsa ett protokoll.

Omdömet får nämna betyget bara om samma mening säger vad det betyder för
köparen. Skriv vad hen förlorar:

| I stället för | Skriv |
|---|---|
| "Det kostar poäng på trösklar." | "Den fastnar på trösklar över två centimeter, vilket är de flesta innerdörrar i ett äldre hus." |
| "Batteritiden drar ner totalbetyget." | "Batteriet räcker en våning. Har du två får du hämta den halvvägs." |
| "Ljudnivån ger avdrag." | "Den låter som en hårtork, så den går inte att köra medan någon sover." |

Placeringen i listan är inte heller en konsekvens. "Därför ligger den ändå
fyra" förklarar vår sortering, inte produkten.

## Rubriker ska förtjäna läsningen

En rubrik med ett tal eller en konkret konsekvens i sig gör det. En rubrik som
namnger ett ämne gör det inte.

"Sugkraften i pascal" är för vagt: det säger vilket ämne som kommer, inte varför
någon ska läsa vidare. "10 000 pascal räcker till mattor, 4 000 gör det inte"
gör båda.

En rubrik får inte heller handla om källäget. "200 kilo, 40 minuter, och
tystnaden däremellan" är välskriven och fel: tystnaden är ett påstående om
tillverkarnas publicering, inte om vad läsaren får.

## Namnge varan, inte platsen

Formuleringar som pekar på sidan i stället för på produkten är den vanligaste
tomgången i våra egna texter, och de finns inte alls i referenskorpusen.

| Vi skrev | Skriv |
|---|---|
| `sidans billigaste apparat` | `billigast av apparaterna i jämförelsen` |
| `Alla åtta är gjorda av glasfiberväv` | `Alla filtarna är gjorda av glasfiberväv` |
| `kategorins enda med Thread` | `den enda med Thread` |

Substantivet gör jobbet. Och byt inte en formel mot en annan: `av de tolv`
infördes på 145 ställen som ersättning för `sidans` och visade sig vara precis
lika främmande för referensen, med 49 förekomster hos oss mot noll där. Mät
ersättningen också. Se `measurements.md`.

## För- och nackdelar

Varje punkt är något varan gör för den som äger den, eller något hen kommer att
märka. Det är hela urvalsregeln.

En nackdel ska vara en riktig anledning att välja en annan produkt. Hittar du
ingen sådan är produkten antingen felrankad, eller så har du läst för få
tester. En nackdel som är en förklädd fördel ("enda nackdelen är att den är så
kraftfull att...") är värre än ingen alls, eftersom den avslöjar att listan är
skriven för att sälja.

En nackdel får peka vidare till produkten som löser problemet. Det är den
nyttigaste sortens nackdel vi kan skriva.

Bra nackdelar, alla från riktiga sidor:

- "Bara två meter, så den som vill ha en kort kabel till väskan får leta hos någon annan"
- "24 månaders bindningstid, den längsta av de åtta"
- "Larmcentralen är Avarn, alltså inköpt kapacitet och inte egen"
- "625 gram, alltså den tyngsta här och märkbar i en jackficka"

Var och en säger vad ägaren råkar ut för. Det är testet.

En nackdel får peka vidare till den produkt som löser problemet. Det är den
mest användbara sortens nackdel vi kan skriva, eftersom den både är ärlig och
för läsaren närmare ett beslut.

## Taglines och superlativ

`tagline` säljer en fördel, inte en mekanism och aldrig en invändning.

| I stället för | Skriv |
|---|---|
| "Sprejar glaset framför duken i stället för bakom." | "Håller duken fuktig hela vägen genom huset." |
| "Dubbla ultraljudsmunstycken, och dyrast av allihop." | "Ultraljudsdimma i stället för sprejstråle." |
| "Enda tillverkaren som säger vad linan tål." | "Säkerhetslinan tål 200 kilo stötkraft." |

En tagline som slutar i priset argumenterar mot sitt eget kort.

**Ett tal i en tagline behöver sin måttstock.** "Stod emot skruvmejsel i 3
minuter och 39 sekunder" läser sig som en svaghet för den som inte vet att det
svagaste skåpet gick upp på 38 sekunder. Antingen bär talet jämförelsen med sig,
eller så väljer du ett annat tal.

`superlative` är fri text per produkt: "Bäst för Thread-hem". Den ska peka ut
**vem** produkten passar, inte hur bra den är.

**Vinnarens superlativ får aldrig vara "Bäst i test".** Det står redan i H1 och
på utmärkelsebrickan, så kortet säger samma sak tre gånger och lägger noll ny
information till. Skriv vem den passar i stället: `Bäst för uthyrning`,
`Bäst för höga fönster`. `pnpm check:omdomen` listar de sidor som har kvar det.

**Två produkter på samma sida får inte dela superlativ.** Den avvägande läsaren
står mellan just de två, och två etiketter som pekar på samma köpare lämnar hen
utan hjälp precis där hjälpen behövs. Samma kontroll fäller dubbletter.

Två superlativ på samma sida får inte peka på samma köpare. "Bäst för många
fönster i rad" och "Bäst för hela huset på en dag" lämnade läsaren som stod
mellan just de två produkterna utan hjälp, vilket är precis den läsare
superlativen finns för.

### Placeringar är inga utmärkelser

Det finns ingen `runnerup`-etikett längre. En andraplats bär sitt eget skäl:
`Billigaste 55A`, `Bäst köp för en normal andravåning`, `Provad av Which?,
1 300 kr billigare`.

`Tvåa i test` säger att produkten är sämre än vinnaren och ingenting om varför
någon ändå ska välja den. Den avvägande läsaren står mellan två produkter och
behöver skillnaden som avgör, inte en placering. Se `who-reads.md`.

Kvar som fasta etiketter är `winner`, `budget`, `premium` och `editor`. De
säger alla något om urvalet, inte om ordningen.

## Långa texter bryts i stycken

Fyra fält blir lätt en vägg, eftersom de skrivs i ett svep och renderas i ett
svep: `methodology`, kriteriernas `description`, källnoternas `note` och
omdömena.

Mätt den 6 augusti 2026: 541 sådana strängar, **inte en enda med
styckebrytning**. Metodtexterna låg på 977 tecken i median och den längsta
kriteriebeskrivningen på 1 166. Det är fem hundra ords löptext i en spalt, och
ingen läser det.

Komponenterna delar på tomrad sedan samma dag, alltså räcker det att skriva
texten i stycken. `**fetstil**` fungerar också, på den mening som bär poängen.

Riktvärden, inte gränser:

| Fält | Lagom | Om den blir längre |
|---|---|---|
| `methodology` | 3 till 5 meningar | bryt i stycken, ett per tanke |
| kriteriets `description` | 2 till 4 meningar | bryt, eller korta ned |
| källans `note` | 1 till 3 meningar | bryt |

**Kortare är oftast bättre än brutet.** En kriteriebeskrivning som behöver tre
stycken beskriver förmodligen två kriterier, eller berättar något som hör hemma
i köpguiden. Skriv om innan du bryter.

## Vad ett omdöme är till för

Läsaren står i butiken med kortet i handen och undrar vilken av sju hen ska ta
hem. Omdömet ska svara på det, med det vi vet.

Skriv om varan: vad den gör, vad den kostar, vad den är byggd för, vad som gör
den bättre eller sämre än den bredvid, och vem som blir nöjd med den. Det är ett
gott omdöme, och det är hela uppgiften.

**Skriv om det du har.** Researchen ger dig sällan varje uppgift om varje
produkt, och det spelar mindre roll än man tror. Ett omdöme byggt på de tolv
saker vi vet är bättre än ett som ägnar ett stycke åt den trettonde. En kabel
har en mantel oavsett vad databladet nämner, en powerbank väger vad den väger,
och läsaren som ska välja mellan två kablar har ingen nytta av att veta vad vi
inte hann läsa. Låt det du inte har ligga i tabellen som ett streck, och fyll
omdömet med det som faktiskt hjälper hen att välja.

Det här är sajtens vanligaste och dyraste fel. På `/usb-c-kabel` gick halva
vinnarens omdöme åt till att en mantel inte stod angiven — och den stod angiven,
TPE, i Delocks eget datablad. Två fel i samma stycke: fel research, och fel
ämne.

Fyra saker hör aldrig hemma i ett omdöme, av andra skäl:

- En upplevelse av produkten. Du har inte hållit i den.
- Ett mätvärde vi inte hämtat från en namngiven källa.
- Vår egen urvals- eller källpolicy. Den hör hemma i viktningen, en gång.
- Produktens placering i vår lista som förklaring till något.
- Lagerstatus. Se `.claude/context/data.md`.
- Förstaperson i omdömesfälten. `pnpm check:lackor` fäller det.

## När en saknad uppgift ändå är nyheten

Ibland är det du inte kan få reda på precis det köparen går in i. Då är det
ämnet, och det ska skrivas rakt ut.

Ett larmbolag som inte publicerar sitt pris lämnar dig utan möjlighet att
jämföra innan en säljare sitter i soffan. En hel produktkategori där varenda
tillverkare anger en besparingsprocent och ingen av dem har mätt något säger dig
vad marknadsföringen är värd. `/hemlarm` och `/smart-termostat` bär sina sidor
på just det, och de är två av våra bästa.

Skillnaden mot manteln: **där är frånvaron något läsaren själv stöter på.**
Priset går inte att få tag i, hur mycket hen än letar. Manteln är bara något vi
inte läste, och kabeln fungerar likadant vare sig vi läste det eller inte.

Frågan att ställa: **hindrar det köparen, eller hindrade det bara oss?**

Och utgå från det senare. Av tjugo kontrollerade påståenden om att en uppgift
saknades var elva falska, och fyra av svaren låg i ett dokument vi själva
länkade till. Presumtionen är alltså att vi inte letat färdigt, inte att källan
tigit. Undantaget måste beläggas positivt: du försökte få priset och blev
stoppad. Att du inte hittade måttet är inget belägg för någonting.
