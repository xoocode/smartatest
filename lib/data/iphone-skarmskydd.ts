import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { IPHONE_SKARMSKYDD } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Riktiga produkter för /iphone-skarmskydd.
 *
 * Priser, artikelnummer och specifikationer är lästa på iPhonebutikens egna
 * produktsidor 2026-08-05.
 *
 * AFFILIATE-SWAP — `merchantUrl` är det som ligger i href i dag: direkt,
 * ospårat, dofollow. Inget `affiliateUrl` någonstans än. Se lib/links.ts.
 *
 * ## Avgränsningen
 *
 * Sidan rankar **skärmskydd till iPhone 17 Pro**, efter användarbeslut
 * 2026-08-05: härdat glas, sekretessglas och plastfilm i samma lista.
 * Kameralinsskydd är en annan produkt och förklaras i köpguiden. Skyddsskal
 * ligger på /iphone-skal och plånboksfodral på /iphone-fodral.
 *
 * Spannet 69 till 399 kronor är avsiktligt odelat, av samma skäl som
 * /iphone-skal spände 99 till 1 099: att den billigaste filmen gör mindre än
 * ordet skärmskydd antyder syns bara om den får vara med.
 *
 * ## FYNDET: 9H är taket på en färgstandards skala
 *
 * Tio av femton skydd anger 9H. Skalan går enligt ASTM D3363 och ISO 15184 från
 * 6B till 9H, och båda standarderna gäller färg och lack. ISO skriver i sitt
 * eget abstract att metoden inte duger till att jämföra olika beläggningar.
 * Talet betygsätts därför aldrig som ett mätvärde, se lib/spec-schema.mjs.
 *
 * ## ⚠️ Lagerstatus väger inte in
 *
 * Användarbeslut 2026-08-05. Spigen Glas.tR EZ Fit hade 2 till 6 veckors
 * leveranstid vid bygget och rankas ändå, utan att lagerläget nämns i någon
 * läsartext. Se `.claude/context/data.md`.
 *
 * ## ⚠️ Prisvärdet räknas per skydd
 *
 * Fyra artiklar är 2-pack. `price` är det butiken drar, och `Pris per skydd` är
 * uträknat av oss. Kriteriet prisvärde följer det senare.
 *
 * ## ⚠️ Enkay bär en variantmiss i butikens egen listning
 *
 * Sidtiteln säger iPhone 17 Pro Max, specifikationsraden och produkttexten säger
 * iPhone 17 Pro. `Passar modeller` följer specifikationsraden och artikelnumret,
 * alltså 17 Pro. Kontrollera om vid nästa prisrunda. Samma sorts fälla som ABUS
 * 787 mot 787 Smart-BT på /nyckelskap.
 *
 * ## ⚠️ Inga GTIN
 *
 * Butiken publicerar interna artikelnummer men inga EAN-koder, precis som på
 * /iphone-skal och /iphone-fodral. `GTIN` är `Ej angiven` för samtliga femton.
 *
 * ## Betygen
 *
 * Kriteriepoängen är redaktionell bedömning ur publicerade specifikationer,
 * inte mätningar. Ingen har provat skärmskydd, och vi har inte satt ett enda på
 * en telefon.
 */

export const PRICE_CHECKED = "2026-08-05";

const SEEDS: ProductSeed[] = [
  {
    id: "spigen-glastr-ez-fit-17-pro",
    brand: "Spigen",
    name: "Glas.tR EZ Fit",
    shortName: "Glas.tR EZ Fit",
    image: productImage(IPHONE_SKARMSKYDD.slug, "spigen-glastr-ez-fit-17-pro"),
    tagline: "Två glas och en bygel som lägger dem rakt första gången.",
    scores: { skydd: 4.5, montering: 5, prisvarde: 5 },
    price: 249,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/spigen-glastr-ez-fit-iphone-16-pro1717-pro-55738.html",
    award: "winner",
    superlative: "Bäst för den som monterat snett förr",
    pros: [
      "Monteringsbygeln gör att glaset bara kan hamna rätt, och rengöringskitet tar dammet som annars blir en bubbla",
      "Två glas i asken, så första försöket får misslyckas",
      "Täcker även frontkameran och sensorerna ovanför skärmen, alltså ytan som möter bordsskivan",
    ],
    cons: [
      "Skalvänlig passform lämnar en fri remsa vid kanten, alltså mindre täckning än de heltäckande glasen här",
      "Ingen svart ram, så limfogen syns mot en ljus bakgrund",
    ],
    specs: [
      { label: "Pris per skydd", shortLabel: "Per skydd", value: "124,50 kr", highlight: true },
      { label: "Material", value: "Härdat glas", highlight: true },
      { label: "Täckning", value: "Skärmen plus frontkamera och sensorer", highlight: true },
      { label: "Monteringsram", shortLabel: "Ram", value: "Ja, installationsbricka", highlight: true },
      { label: "Angiven hårdhet", shortLabel: "Hårdhet", value: "9H", highlight: true },
      { label: "Sekretessfilter", shortLabel: "Sekretess", value: "Nej", highlight: true },
      { label: "Antal i förpackningen", value: "2 st" },
      { label: "Ingår i förpackningen", value: "2 glas, installationsbricka, rengöringskit" },
      { label: "Skyddar framsensorer", value: "Ja" },
      { label: "Skalvänlig", value: "Ja" },
      { label: "Kantutförande", value: "Genomskinlig kant" },
      { label: "Tjocklek", value: "Ej angiven" },
      /* AluminaCore: "Made from High Alumina Silicate Tempered Glass",
         spigen.com produktsida för iPhone 17-serien, läst 2026-08-06. */
      { label: "Glastyp", value: "Aluminosilikatglas (AluminaCore)" },
      { label: "Ytbehandling", value: "Ej angiven" },
      { label: "Passar modeller", value: "iPhone 16 Pro, iPhone 17, iPhone 17 Pro" },
      /* Garantitiden står på butikens egen produktsida för samtliga femton
         artiklar, läst 2026-08-06. Spannet är 6 månader till livstid. */
      { label: "Garanti", value: "2 år", highlight: true },
    ],
    verdict:
      "Spigen Glas.tR EZ Fit kostar 249 kronor för två glas, alltså 124,50 per skydd, och är det enda skyddet här som också lägger sig över frontkameran och sensorerna ovanför skärmen.\n\n**Bygeln är skälet att det här skyddet vinner.** Telefonen läggs i en plastram och glaset sänks ner genom den, vilket gör att det inte kan hamna snett. Det låter litet tills man vet att ett skärmskydd inte går att lyfta och lägga om: hamnar det två millimeter fel är pengarna borta. Rengöringskitet i asken tar dammkornet som annars blir en bubbla mitt i bilden. Och skulle det ändå gå fel ligger ett andra glas kvar i förpackningen, vilket gör att det här är det enda skyddet i jämförelsen där ett misslyckat försök inte kostar ett nytt köp. Att sensorytan ovanför skärmen också täcks är den detalj som märks efter ett år: det är den remsan som repas mot bordsskivor och bilhållare.\n\nSkyddet är skalvänligt, vilket betyder att glaset stannar innanför kanten och lämnar en fri remsa. Det är priset för att vilket skal som helst ska få plats bredvid, och det är mindre täckning än de heltäckande glasen ger. Någon svart ram som döljer limfogen finns inte heller, så fogen syns mot en ljus bakgrund.\n\nKöp det här. Det är billigast per skydd av allt utom ett tvåpack, det är det enda som skyddar sensorerna, och det är det enda som ger dig två försök. Vill du att ingen ska kunna läsa skärmen på pendeltåget tar du Spigens sekretessversion i stället, och betalar 25 kronor mer per glas.",
  },
  {
    id: "spigen-glastr-ez-fit-privacy-17-pro",
    brand: "Spigen",
    name: "Glas.tR EZ Fit Privacy",
    shortName: "EZ Fit Privacy",
    image: productImage(IPHONE_SKARMSKYDD.slug, "spigen-glastr-ez-fit-privacy-17-pro"),
    tagline: "Insynsskydd i tvåpack, till halva priset per glas.",
    scores: { skydd: 4, montering: 5, prisvarde: 4.5 },
    price: 299,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/spigen-glastr-ez-fit-privacy-iphone-16-pro1717-pro-55740.html",
    superlative: "Billigast insynsskydd per glas",
    pros: [
      "149,50 kronor per glas, alltså under halva priset mot det andra sekretessglaset här",
      "Monteringsram och två glas, samma försäkring mot ett snett försök som vinnaren",
      "Fungerar med de flesta skal, så det behöver inte bytas när skalet gör det",
    ],
    cons: [
      "Sekretessfiltret gör skärmen mörkare rakt framifrån, vilket märks utomhus i solljus",
      "Sekretess du inte behöver är bortkastade pengar, och 50 kronor mer per glas än vanliga EZ Fit",
    ],
    specs: [
      { label: "Pris per skydd", shortLabel: "Per skydd", value: "149,50 kr", highlight: true },
      { label: "Material", value: "Härdat glas med sekretessfilter", highlight: true },
      { label: "Täckning", value: "Ej angiven", highlight: true },
      { label: "Monteringsram", shortLabel: "Ram", value: "Ja", highlight: true },
      { label: "Angiven hårdhet", shortLabel: "Hårdhet", value: "9H", highlight: true },
      { label: "Sekretessfilter", shortLabel: "Sekretess", value: "Ja", highlight: true },
      { label: "Antal i förpackningen", value: "2 st" },
      { label: "Ingår i förpackningen", value: "2 glas, monteringsram" },
      { label: "Skyddar framsensorer", value: "Ej angivet" },
      { label: "Skalvänlig", value: "Ja" },
      { label: "Kantutförande", value: "Ej angivet" },
      { label: "Tjocklek", value: "Ej angiven" },
      /* Samma glas som vinnaren enligt spigen.com: "AluminaCore … Silicate
         Tempered Glass", produktsidan för Privacy-varianten, läst 2026-08-06. */
      { label: "Glastyp", value: "Aluminosilikatglas (AluminaCore)" },
      { label: "Ytbehandling", value: "Ej angiven" },
      { label: "Passar modeller", value: "iPhone 16 Pro, iPhone 17, iPhone 17 Pro" },
      { label: "Garanti", value: "2 år", highlight: true },
    ],
    verdict:
      "Spigen Glas.tR EZ Fit Privacy kostar 299 kronor för två glas med inbyggt sekretessfilter, alltså 149,50 per skydd. Det är det billigaste sättet att göra skärmen svart för den som sitter bredvid.\n\n**Filtret är hela produkten, och det gör exakt en sak.** Ljuset släpps rakt fram och stryps åt sidorna, så personen i sätet bredvid ser en mörk yta medan du läser som vanligt. Det är värt något om du hanterar patientuppgifter, avtal eller din egen bankapp i kollektivtrafik, och ingenting alls om du inte gör det. Att det kommer två glas i asken och en monteringsram med dem betyder att du får samma försäkring mot ett snett försök som vinnaren ger, vilket är ovanligt i den här delen av prislistan. Glaset fungerar dessutom med de flesta skal, så det behöver inte bytas den dagen skalet gör det.\n\nPriset betalas i ljusstyrka. Ett sekretessfilter tar bort en del av ljuset även rakt framifrån, och det märks utomhus en solig dag när du redan ligger på högsta nivån.\n\nKöp det här om du regelbundet läser något på skärmen som andra inte ska se, och vill ha två glas för priset av ett annat märkes ena. Behöver du inte insynsskydd är det bortkastade pengar och en mörkare skärm, och då tar du vanliga Glas.tR EZ Fit för 50 kronor mindre.",
  },
  {
    id: "devia-full-glass-assist-tool-17-pro",
    brand: "Devia",
    name: "Full Glass with Assist Tool",
    shortName: "Devia Full Glass",
    image: productImage(IPHONE_SKARMSKYDD.slug, "devia-full-glass-assist-tool-17-pro"),
    tagline: "Heltäckande glas med monteringsram i enpack.",
    scores: { skydd: 4.5, montering: 4.5, prisvarde: 3 },
    price: 209,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/devia-full-glass-with-assist-tool-iphone-17-pro-57144.html",
    award: "editor",
    superlative: "Bäst heltäckande för ett enda glas",
    pros: [
      "Glaset går ända ut i kanten, alltså också över den yta som tar smällen när telefonen landar på hörnet",
      "Monteringsram ingår, vilket bara fyra andra skydd här har",
      "209 kronor för ett heltäckande glas med ram, mot 299 för det närmaste alternativet",
    ],
    cons: [
      "Ett glas i asken, så ett misslyckat försök kostar ett nytt köp",
      "Heltäckande glas går ända ut i kanten, så ett skal med hög kant kan lyfta hörnen",
    ],
    specs: [
      { label: "Pris per skydd", shortLabel: "Per skydd", value: "209 kr", highlight: true },
      { label: "Material", value: "Härdat glas", highlight: true },
      { label: "Täckning", value: "Heltäckande, ända ut i kanten", highlight: true },
      { label: "Monteringsram", shortLabel: "Ram", value: "Ja, Assist Tool", highlight: true },
      { label: "Angiven hårdhet", shortLabel: "Hårdhet", value: "9H", highlight: true },
      { label: "Sekretessfilter", shortLabel: "Sekretess", value: "Nej", highlight: true },
      { label: "Antal i förpackningen", value: "1 st" },
      { label: "Ingår i förpackningen", value: "Glas, monteringsram" },
      { label: "Skyddar framsensorer", value: "Ej angivet" },
      { label: "Skalvänlig", value: "Ej angivet" },
      { label: "Kantutförande", value: "Ej angivet" },
      { label: "Tjocklek", value: "Ej angiven" },
      { label: "Glastyp", value: "Ej angiven" },
      { label: "Ytbehandling", value: "Ej angiven" },
      { label: "Passar modeller", value: "iPhone 17 Pro" },
      { label: "Garanti", value: "1 år", highlight: true },
    ],
    verdict:
      "Devia Full Glass with Assist Tool kostar 209 kronor och är det billigaste heltäckande glaset som levereras med en monteringsram.\n\n**Kombinationen är ovanligare än den låter.** Heltäckande glas är svårast av alla att sätta rakt, eftersom felmarginalen är noll när kanten ska möta kanten, och det är just de skydden som oftast säljs utan hjälpmedel. Här läggs telefonen i en ram och glaset sänks ner genom den. Att glaset går ända ut betyder också att den yta som faktiskt tar smällen ligger skyddad: en telefon som tappas landar sällan platt, den landar på ett hörn eller en kant, och där slutar ett standardglas en bit innan. Devia täcker den delen.\n\nDet ligger ett glas i asken. Går monteringen fel finns ingen andra chans, och det är den verkliga skillnaden mot vinnaren som ger dig två för 40 kronor mer.\n\nTa det här om du vill ha ett heltäckande glas och bara behöver ett. Vill du ha två försök, eller skydd även över sensorerna, är Spigens tvåpack både billigare per glas och mer förlåtande.",
  },
  {
    id: "panzerglass-privacy-2-way-17-pro",
    brand: "PanzerGlass",
    name: "Privacy Screen Protector 2-way",
    shortName: "PanzerGlass Privacy",
    image: productImage(IPHONE_SKARMSKYDD.slug, "panzerglass-privacy-2-way-17-pro"),
    tagline: "Insynsskydd över hela framsidan, med stötdämpande kant.",
    scores: { skydd: 4.5, montering: 4.5, prisvarde: 1.5 },
    price: 399,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/panzerglass-privacy-screen-protector-2-way-iphone-17-pro-57250.html",
    award: "premium",
    superlative: "Bäst heltäckande insynsskydd",
    pros: [
      "Täcker hela framsidan och lämnar ändå plats åt ett skal runt om",
      "Stötdämpning i kanten, alltså den del av glaset som möter golvet först",
      "EasyAligner ingår, så det heltäckande glaset går att lägga rakt utan hjälp",
    ],
    cons: [
      "399 kronor för ett glas, alltså mer än två och en halv gånger priset per glas mot Spigens sekretesspack",
      "Sekretessfiltret dämpar skärmen rakt framifrån, och det går inte att stänga av",
    ],
    specs: [
      { label: "Pris per skydd", shortLabel: "Per skydd", value: "399 kr", highlight: true },
      { label: "Material", value: "Härdat glas 9H med sekretessfilter", highlight: true },
      { label: "Täckning", value: "Hela framsidan, med plats för skal", highlight: true },
      { label: "Monteringsram", shortLabel: "Ram", value: "Ja, EasyAligner", highlight: true },
      { label: "Angiven hårdhet", shortLabel: "Hårdhet", value: "9H", highlight: true },
      { label: "Sekretessfilter", shortLabel: "Sekretess", value: "Ja, tvåvägs", highlight: true },
      { label: "Antal i förpackningen", value: "1 st" },
      { label: "Ingår i förpackningen", value: "Glas, EasyAligner, monteringsanvisning" },
      { label: "Skyddar framsensorer", value: "Ej angivet" },
      { label: "Skalvänlig", value: "Ja" },
      /* Butiken namnger dämpningen: "Air Cushion-stötdämpning", produktsidan
         läst 2026-08-06. */
      { label: "Kantutförande", value: "Air Cushion-stötdämpning i kanten" },
      { label: "Tjocklek", value: "Ej angiven" },
      { label: "Glastyp", value: "60 % återvunnet glas" },
      { label: "Ytbehandling", value: "Smutsavvisande" },
      { label: "Passar modeller", value: "iPhone 17 Pro" },
      { label: "Garanti", value: "6 månader", highlight: true },
    ],
    verdict:
      "PanzerGlass Privacy Screen Protector 2-way kostar 399 kronor och är det dyraste skyddet i jämförelsen. Det täcker hela framsidan och gör skärmen mörk för den som sitter vid sidan.\n\n**Det du betalar för är att båda sakerna finns i samma glas.** Sekretessfilter säljs oftast som ett standardglas som slutar innanför kanten, och då ligger telefonens mest utsatta yta bar. Här går glaset ut över hela framsidan och lämnar ändå en remsa fri så att ett skal får plats bredvid, vilket är skillnaden mellan att kunna behålla skalet och att få välja. Kanten är dessutom stötdämpande, och det är kanten som möter golvet först när en telefon landar. Monteringen sköts av en EasyAligner i asken, alltså en bygel som telefonen läggs i, och den behövs verkligen på ett glas som ska möta kanten på millimetern. Glaset består till 60 procent av återvunnet material.\n\nPriset är det som gör valet svårt. Ett annat sekretessglas i jämförelsen kostar 149,50 per styck och kommer i tvåpack, alltså under hälften för samma grundfunktion.\n\nKöp det här om du vill ha insynsskydd utan att ge upp den heltäckande formen, och om du hellre monterar en gång än två. Är det bara filtret du är ute efter gör Spigens tvåpack samma jobb för mindre än halva priset per glas.",
  },
  {
    id: "panzerglass-standard-fit-17-pro",
    brand: "PanzerGlass",
    name: "Standard Fit",
    shortName: "PanzerGlass Standard",
    image: productImage(IPHONE_SKARMSKYDD.slug, "panzerglass-standard-fit-17-pro"),
    tagline: "Täcker den aktiva ytan och lämnar plats åt skalet.",
    scores: { skydd: 3.5, montering: 4.5, prisvarde: 2 },
    price: 299,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/panzerglass-standard-fit-iphone-17-pro-57254.html",
    superlative: "Bäst för dig som har ett tjockt skal",
    pros: [
      "Formen är gjord för att inte krocka med skalet, vilket är det vanligaste skälet att ett glas lossnar i kanten",
      "EasyAligner i asken lägger glaset rakt utan att du håller i det",
      "Anti-fingeravtrycksbeläggning som håller fett och smuts borta från ytan",
    ],
    cons: [
      "Standardformen lämnar kanterna bara, alltså den yta som träffar golvet först",
      "299 kronor för ett glas, mot 209 för ett heltäckande med samma sorts ram",
    ],
    specs: [
      { label: "Pris per skydd", shortLabel: "Per skydd", value: "299 kr", highlight: true },
      { label: "Material", value: "Härdat glas 9H", highlight: true },
      { label: "Täckning", value: "Aktiva skärmytan, kanterna fria", highlight: true },
      { label: "Monteringsram", shortLabel: "Ram", value: "Ja, EasyAligner", highlight: true },
      { label: "Angiven hårdhet", shortLabel: "Hårdhet", value: "9H", highlight: true },
      { label: "Sekretessfilter", shortLabel: "Sekretess", value: "Nej", highlight: true },
      { label: "Antal i förpackningen", value: "1 st" },
      { label: "Ingår i förpackningen", value: "Glas, EasyAligner" },
      { label: "Skyddar framsensorer", value: "Nej" },
      { label: "Skalvänlig", value: "Ja, formen är gjord för det" },
      { label: "Kantutförande", value: "Ej angivet" },
      { label: "Tjocklek", value: "Ej angiven" },
      { label: "Glastyp", value: "Ej angiven" },
      { label: "Ytbehandling", value: "Anti-fingeravtryck" },
      { label: "Passar modeller", value: "iPhone 17 Pro" },
      { label: "Garanti", value: "6 månader", highlight: true },
    ],
    verdict:
      "PanzerGlass Standard Fit kostar 299 kronor och är byggt för att sluta innan skalet börjar. Formen är ett val och inte en besparing.\n\n**Den formen löser ett problem som gör att glas lossnar.** Ett heltäckande glas möter skalets innerkant, och möts de på fel ställe lyfter skalet glaset lite i taget tills en kant släpper och smuts kryper in under. Standardformen slutar innanför den zonen, så glaset och skalet rör aldrig varandra. Har du ett tjockt skal med hög kant runt skärmen är det här skillnaden mellan ett glas som sitter kvar i två år och ett som börjar bubbla i hörnet efter en månad. EasyAligner ligger i asken, och beläggningen mot fingeravtryck gör att ytan går att torka ren på en gång i stället för att smeta.\n\nDet du inte får är skydd i kanten. Den yta som träffar golvet först när telefonen landar på högkant ligger bar, och det är den vanligaste vägen till en spricka.\n\nTa det här om du kör med ett kraftigt skal och är trött på glas som lossnar i kanten. Är skalet tunt eller obefintligt får du mer skydd för mindre pengar av Devias heltäckande glas.",
  },
  {
    id: "enkay-tempered-glass-2-pack-17-pro",
    brand: "Enkay",
    name: "Skärmskydd 2-pack",
    shortName: "Enkay 2-pack",
    image: productImage(IPHONE_SKARMSKYDD.slug, "enkay-tempered-glass-2-pack-17-pro"),
    tagline: "Två glas för 199 kronor, tunnast i jämförelsen.",
    scores: { skydd: 2.5, montering: 3, prisvarde: 5 },
    price: 199,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/enkay-tempered-glass-2-pack-iphone-17-pro18-pro-57064.html",
    award: "budget",
    superlative: "Billigast per skydd",
    pros: [
      "99,50 kronor per glas, alltså billigast i hela jämförelsen",
      "0,26 millimeter, tunnast här, så fingret möter nästan samma yta som utan skydd",
      "Rundade kanter som inte skaver mot tummen vid svepning från sidan",
    ],
    cons: [
      "Ingen monteringsram, så båda glasen ska läggas på frihand",
      "Tunnast betyder minst material mellan skärmen och golvet",
    ],
    specs: [
      { label: "Pris per skydd", shortLabel: "Per skydd", value: "99,50 kr", highlight: true },
      { label: "Material", value: "Härdat glas", highlight: true },
      { label: "Täckning", value: "Ej angiven", highlight: true },
      { label: "Monteringsram", shortLabel: "Ram", value: "Nej", highlight: true },
      { label: "Angiven hårdhet", shortLabel: "Hårdhet", value: "9H", highlight: true },
      { label: "Sekretessfilter", shortLabel: "Sekretess", value: "Nej", highlight: true },
      { label: "Antal i förpackningen", value: "2 st" },
      { label: "Ingår i förpackningen", value: "2 glas" },
      { label: "Skyddar framsensorer", value: "Nej" },
      { label: "Skalvänlig", value: "Ja" },
      { label: "Kantutförande", value: "Rundade kanter" },
      { label: "Tjocklek", value: "0,26 mm" },
      { label: "Glastyp", value: "Ej angiven" },
      { label: "Ytbehandling", value: "Ej angiven" },
      { label: "Passar modeller", value: "iPhone 17 Pro" },
      { label: "Garanti", value: "6 månader", highlight: true },
    ],
    verdict:
      "Enkays tvåpack kostar 199 kronor för två glas, alltså 99,50 per skydd. Det är billigast i jämförelsen, och med 0,26 millimeter också tunnast.\n\n**Tvåpacket är det som gör priset intressant.** Ett skärmskydd är en engångsmontering: går det snett kan du inte lyfta glaset och lägga om det, utan då är det ett nytt köp. Att det ligger ett andra glas i asken betyder att första försöket får misslyckas utan att det kostar något, och i praktiken är det värt mer än någon egenskap hos själva glaset. 0,26 millimeter känns dessutom i fingret: svepningar från kanten går utan att man känner ett steg upp i glaset. De rundade kanterna hör ihop med det och gör att tummen inte fastnar mot en skarp övergång.\n\nDet följer ingen ram med. Två glas på frihand är fortfarande två chanser, men det är två chanser att göra samma fel, och dammkornet under limmet syns lika mycket båda gångerna.\n\nTa det här om du vill ha ett fungerande glas till lägsta möjliga pris och har satt ett skärmskydd förut. Har du inte det är Spigens tvåpack 25 kronor dyrare per glas och kommer med bygeln som gör att du slipper öva.",
  },
  {
    id: "celly-full-glass-17-pro",
    brand: "Celly",
    name: "Full Glass",
    shortName: "Celly Full Glass",
    image: productImage(IPHONE_SKARMSKYDD.slug, "celly-full-glass-17-pro"),
    tagline: "Heltäckande glas på 0,3 millimeter.",
    scores: { skydd: 4, montering: 2, prisvarde: 2.5 },
    price: 219,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/celly-full-glass-iphone-16-pro1717-pro-55220.html",
    superlative: "Heltäckande skydd på 0,3 millimeter",
    pros: [
      "Skyddar hela skärmen, alltså också kanten där en tappad telefon landar",
      "0,3 millimeter tunt, så kanten under fingret knappt känns",
    ],
    cons: [
      "Ingen monteringsram, och heltäckande glas är svårast av alla att lägga rakt",
      "Ett glas i asken till 219 kronor, mot 99,50 per glas för det billigaste tvåpacket",
    ],
    specs: [
      { label: "Pris per skydd", shortLabel: "Per skydd", value: "219 kr", highlight: true },
      { label: "Material", value: "Härdat glas", highlight: true },
      { label: "Täckning", value: "Heltäckande, hela skärmen", highlight: true },
      { label: "Monteringsram", shortLabel: "Ram", value: "Nej", highlight: true },
      { label: "Angiven hårdhet", shortLabel: "Hårdhet", value: "9H", highlight: true },
      { label: "Sekretessfilter", shortLabel: "Sekretess", value: "Nej", highlight: true },
      { label: "Antal i förpackningen", value: "1 st" },
      { label: "Ingår i förpackningen", value: "Glas" },
      { label: "Skyddar framsensorer", value: "Nej" },
      { label: "Skalvänlig", value: "Ej angivet" },
      { label: "Kantutförande", value: "Ej angivet" },
      { label: "Tjocklek", value: "0,3 mm" },
      { label: "Glastyp", value: "Ej angiven" },
      { label: "Ytbehandling", value: "Ej angiven" },
      { label: "Passar modeller", value: "iPhone 16 Pro, iPhone 17, iPhone 17 Pro" },
      { label: "Garanti", value: "2 år", highlight: true },
    ],
    verdict:
      "Celly Full Glass kostar 219 kronor, täcker hela skärmen och är 0,3 millimeter tjockt.\n\n**Tre tiondels millimeter är mitten i kategorin:** tunt nog att fingret inte känner en tröskel vid kanten, tjockt nog att glaset spricker i stället för att spricka igenom. Heltäckningen är den andra halvan av argumentet, och den betyder något konkret: en telefon som tappas landar nästan aldrig platt, den landar på en kant eller ett hörn, och där tar ett heltäckande glas smällen medan ett standardglas slutar en bit innan.\n\nDet ligger ingen ram i asken. Heltäckande glas har noll felmarginal eftersom kanten ska möta kanten, och att lägga ett sådant på frihand är kategorins svåraste moment.\n\nTa det här om du vill ha heltäckande skydd och litar på din egen hand. Är du minsta osäker på monteringen ger Devia dig samma täckning med en ram, och 10 kronor billigare.",
  },
  {
    id: "trolsk-full-cover-glas-17-pro",
    brand: "Trolsk",
    name: "Skärmskydd Full Cover Härdat Glas",
    shortName: "Trolsk Full Cover",
    image: productImage(IPHONE_SKARMSKYDD.slug, "trolsk-full-cover-glas-17-pro"),
    tagline: "Svart ram runt kanten som döljer limfogen.",
    scores: { skydd: 4, montering: 1.5, prisvarde: 3.5 },
    price: 149,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/trolsk-skarmskydd-full-cover-hardat-glas-iphone-16-pro1717-pro18-pro-55395.html",
    superlative: "Billigast heltäckande",
    pros: [
      "Glaset går ända ut i kanten för 149 kronor, alltså 60 kronor under nästa heltäckande",
      "Svart ram runt kanten som döljer limfogen, så övergången inte syns mot ljus bakgrund",
      "Behandlad yta som gör att fingeravtryck syns mindre",
    ],
    cons: [
      "Ingen ram och inget rengöringskit, så hela monteringen ligger på dig",
      "Ett glas i asken, alltså inget andra försök om det första hamnar snett",
    ],
    specs: [
      { label: "Pris per skydd", shortLabel: "Per skydd", value: "149 kr", highlight: true },
      { label: "Material", value: "Härdat glas", highlight: true },
      { label: "Täckning", value: "Heltäckande, ända ut i kanten", highlight: true },
      { label: "Monteringsram", shortLabel: "Ram", value: "Nej", highlight: true },
      { label: "Angiven hårdhet", shortLabel: "Hårdhet", value: "9H", highlight: true },
      { label: "Sekretessfilter", shortLabel: "Sekretess", value: "Nej", highlight: true },
      { label: "Antal i förpackningen", value: "1 st" },
      { label: "Ingår i förpackningen", value: "Glas" },
      { label: "Skyddar framsensorer", value: "Nej" },
      { label: "Skalvänlig", value: "Ej angivet" },
      { label: "Kantutförande", value: "Svart ram runt kanten" },
      { label: "Tjocklek", value: "Ej angiven" },
      { label: "Glastyp", value: "Ej angiven" },
      { label: "Ytbehandling", value: "Behandlad mot fingeravtryck" },
      { label: "Passar modeller", value: "iPhone 16 Pro, iPhone 17, iPhone 17 Pro, iPhone 18 Pro" },
      { label: "Garanti", value: "1 år", highlight: true },
    ],
    verdict:
      "Trolsk Skärmskydd Full Cover kostar 149 kronor och är det billigaste glaset i jämförelsen som går ända ut i kanten.\n\n**Den svarta ramen är mer än en färg.** Ett heltäckande glas limmas bara i kanten, eftersom mitten måste ligga fritt mot skärmen, och den limzonen syns som en ljusare rand mot en vit webbsida på varje klart glas som saknar ram. Här ligger en svart tryckt kant över fogen, så övergången försvinner. Att glaset dessutom når hela vägen ut betyder att kanten skyddas, alltså den del av telefonen som möter golvet först vid ett fall på högkant. Ytan är behandlad så att fingeravtryck syns mindre, vilket på en svart ram märks mer än på ett klart glas.\n\nDu får ett glas och ingenting annat. Ingen bygel, ingen trasa, ingen dammlapp, och heltäckande glas är den svåraste sorten att lägga rakt eftersom kanten ska möta kanten på millimetern.\n\nTa det här om du vill ha heltäckande skydd billigast möjligt och har satt ett skärmskydd förut. Har du inte det bränner du 149 kronor på ett försök, och då är Devias glas med ram 60 kronor bättre använda.",
  },
  {
    id: "trolsk-hardat-glas-17-pro",
    brand: "Trolsk",
    name: "Skärmskydd Härdat Glas",
    shortName: "Trolsk Härdat Glas",
    image: productImage(IPHONE_SKARMSKYDD.slug, "trolsk-hardat-glas-17-pro"),
    tagline: "0,33 millimeter glas för 129 kronor.",
    scores: { skydd: 3, montering: 1.5, prisvarde: 4 },
    price: 129,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/trolsk-skarmskydd-hardat-glas-iphone-16-pro1717-pro18-pro-55392.html",
    superlative: "Billigaste enpacket i härdat glas",
    pros: [
      "129 kronor, billigast av alla enpack i härdat glas",
      "0,33 millimeter glas, alltså mer material att spricka i stället för skärmen",
    ],
    cons: [
      "Varken ram eller rengöringskit, och bara ett glas i asken, så första försöket måste sitta",
      "129 kronor för ett glas, mot 99,50 per glas i det billigaste tvåpacket",
    ],
    specs: [
      { label: "Pris per skydd", shortLabel: "Per skydd", value: "129 kr", highlight: true },
      { label: "Material", value: "Härdat glas", highlight: true },
      { label: "Täckning", value: "Ej angiven", highlight: true },
      { label: "Monteringsram", shortLabel: "Ram", value: "Nej", highlight: true },
      { label: "Angiven hårdhet", shortLabel: "Hårdhet", value: "9H", highlight: true },
      { label: "Sekretessfilter", shortLabel: "Sekretess", value: "Nej", highlight: true },
      { label: "Antal i förpackningen", value: "1 st" },
      { label: "Ingår i förpackningen", value: "Glas" },
      { label: "Skyddar framsensorer", value: "Nej" },
      /* Stod som "Ej angivet" fram till 2026-08-06. Butikens egen produkttext
         säger "Du kan använda det med de flesta skal och fodral". */
      { label: "Skalvänlig", value: "Ja" },
      { label: "Kantutförande", value: "Ej angivet" },
      { label: "Tjocklek", value: "0,33 mm" },
      { label: "Glastyp", value: "Ej angiven" },
      { label: "Ytbehandling", value: "Ej angiven" },
      { label: "Passar modeller", value: "iPhone 16 Pro, iPhone 17, iPhone 17 Pro, iPhone 18 Pro" },
      { label: "Garanti", value: "1 år", highlight: true },
    ],
    verdict:
      "Trolsk Skärmskydd Härdat Glas kostar 129 kronor och är det billigaste enpacket i härdat glas här. Tjockleken är 0,33 millimeter.\n\n**Tjockleken spelar åt två håll.** En tredjedels millimeter är mer material mellan skärmen och golvet, alltså mer som kan ta upp en stöt innan den når displayen. Samtidigt är det också det du känner under fingret vid kanten, och skillnaden mot det tunnaste glaset i jämförelsen är sju hundradelar av en millimeter, alltså inget du hittar utan att leta.\n\nDet är ett standardglas, och ett standardglas slutar en bit innanför den böjda kanten. Där ligger den yta som möter golvet först, och för 129 kronor följer varken ram, rengöringskit eller ett andra glas med.\n\nTa det här om du vill ha ett riktigt glas, inte en film, till lägsta möjliga styckpris och struntar i tillbehören. Vill du ha kanten skyddad kostar Trolsks heltäckande 20 kronor mer.",
  },
  {
    id: "celly-easy-glass-17-pro",
    brand: "Celly",
    name: "Easy Glass",
    shortName: "Celly Easy Glass",
    image: productImage(IPHONE_SKARMSKYDD.slug, "celly-easy-glass-17-pro"),
    tagline: "Rengöringskit i asken, alltså det som avgör om glaset hamnar bubbelfritt.",
    scores: { skydd: 2.5, montering: 2.5, prisvarde: 3 },
    price: 159,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/celly-easy-glass-iphone-16-pro1717-pro-55225.html",
    superlative: "Bäst för dig som vill ha rengöringskit i asken",
    pros: [
      "Rengöringskit ingår, alltså det som tar dammet som annars blir en bubbla",
      "0,3 millimeter tunt, så det knappt känns under fingret",
      "Standardform som lämnar kanten fri, alltså plats för ett skal med hög kant",
    ],
    cons: [
      "Glaset slutar innanför kanten, och det är kanten som möter golvet först",
      "159 kronor för ett glas som täcker mindre än det heltäckande för 149",
    ],
    specs: [
      { label: "Pris per skydd", shortLabel: "Per skydd", value: "159 kr", highlight: true },
      { label: "Material", value: "Härdat glas", highlight: true },
      { label: "Täckning", value: "Går inte hela vägen ut i kanten", highlight: true },
      { label: "Monteringsram", shortLabel: "Ram", value: "Nej", highlight: true },
      { label: "Angiven hårdhet", shortLabel: "Hårdhet", value: "9H", highlight: true },
      { label: "Sekretessfilter", shortLabel: "Sekretess", value: "Nej", highlight: true },
      { label: "Antal i förpackningen", value: "1 st" },
      { label: "Ingår i förpackningen", value: "Glas, rengöringskit" },
      { label: "Skyddar framsensorer", value: "Nej" },
      { label: "Skalvänlig", value: "Ja, glaset slutar innanför skalkanten" },
      { label: "Kantutförande", value: "Ej angivet" },
      { label: "Tjocklek", value: "0,3 mm" },
      { label: "Glastyp", value: "Ej angiven" },
      { label: "Ytbehandling", value: "Ej angiven" },
      { label: "Passar modeller", value: "iPhone 16 Pro, iPhone 17, iPhone 17 Pro" },
      { label: "Garanti", value: "2 år", highlight: true },
    ],
    verdict:
      "Celly Easy Glass kostar 159 kronor, är 0,3 millimeter tjockt och kommer med rengöringskit.\n\n**Rengöringskitet är skälet att välja det.** Dammet på displayen är den vanligaste orsaken till en bubbla, och en trasa plus en klisterlapp för damm avgör oftare än glaskvaliteten om monteringen lyckas. Glaset är dessutom skalvänligt och stannar innanför skalkanten, så vilket skal som helst får plats bredvid utan att lyfta hörnen. 0,3 millimeter gör att fingret inte känner någon tröskel där glaset slutar.\n\nTäckningen är vad du betalar med. Glaset går inte hela vägen ut, och det är kanten en tappad telefon landar på, inte mitten. En bar kant är den vanligaste vägen till en spricka.\n\nTa det här om skalet du redan har täcker kanten och du vill ha rengöringskitet på köpet. Ska glaset göra jobbet ensamt tar du Trolsks heltäckande, som täcker mer och kostar 10 kronor mindre.",
  },
  {
    id: "trolsk-privacy-glas-17-pro",
    brand: "Trolsk",
    name: "Skärmskydd Privacy Härdat Glas",
    shortName: "Trolsk Privacy",
    image: productImage(IPHONE_SKARMSKYDD.slug, "trolsk-privacy-glas-17-pro"),
    tagline: "Svart skärm för alla utom dig, för 179 kronor.",
    scores: { skydd: 4, montering: 1.5, prisvarde: 3.5 },
    price: 179,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/trolsk-skarmskydd-privacy-hardat-glas-iphone-16-pro1717-pro-55396.html",
    superlative: "Bäst för dig som vill dölja skärmen ända ut i kanten",
    pros: [
      "179 kronor för ett sekretessglas, mot 399 för det dyraste i jämförelsen",
      "Heltäckande, så insynsskyddet slutar inte innanför kanten som de flesta gör",
      "Den som sitter bredvid ser en svart yta i stället för din skärm",
    ],
    cons: [
      "Ingen ram till ett heltäckande glas, alltså kategorins svåraste montering på frihand",
      "Sekretessfiltret sitter på hela tiden, så skärmen är mörkare även när du sitter ensam",
    ],
    specs: [
      { label: "Pris per skydd", shortLabel: "Per skydd", value: "179 kr", highlight: true },
      { label: "Material", value: "Härdat glas med sekretessfilter", highlight: true },
      { label: "Täckning", value: "Heltäckande, ända ut i kanten", highlight: true },
      { label: "Monteringsram", shortLabel: "Ram", value: "Nej", highlight: true },
      { label: "Angiven hårdhet", shortLabel: "Hårdhet", value: "Ej angiven", highlight: true },
      { label: "Sekretessfilter", shortLabel: "Sekretess", value: "Ja", highlight: true },
      { label: "Antal i förpackningen", value: "1 st" },
      { label: "Ingår i förpackningen", value: "Ej angivet" },
      { label: "Skyddar framsensorer", value: "Nej" },
      { label: "Skalvänlig", value: "Ej angivet" },
      { label: "Kantutförande", value: "Svart" },
      { label: "Tjocklek", value: "Ej angiven" },
      { label: "Glastyp", value: "Ej angiven" },
      { label: "Ytbehandling", value: "Ej angiven" },
      { label: "Passar modeller", value: "iPhone 16 Pro, iPhone 17, iPhone 17 Pro" },
      { label: "Garanti", value: "1 år", highlight: true },
    ],
    verdict:
      "Trolsk Skärmskydd Privacy kostar 179 kronor och är det billigaste sättet i jämförelsen att göra skärmen svart för den som sitter bredvid.\n\n**Att filtret sitter i ett heltäckande glas är det ovanliga.** Sekretessglas säljs oftast i standardform, alltså slutande en bit innanför kanten, och då finns en remsa längs sidan där skärmen fortfarande syns snett uppifrån. Här går glaset ända ut, så det som ska vara mörkt är mörkt hela vägen. Det gör också att kanten skyddas, alltså den yta som möter golvet först när telefonen tappas på högkant. För 179 kronor får du båda sakerna, och nästa heltäckande sekretessglas i listan kostar 220 kronor mer.\n\nMonteringen är helt din ensak. Ingen bygel, inget rengöringskit och ett enda glas i asken, och ett heltäckande glas är det svåraste av alla att lägga rakt eftersom det inte finns någon fri kant att rätta mot.\n\nTa det här om du vill ha insynsskydd över hela skärmen och priset avgör. Monterar du helst med en bygel, eller vill ha två glas för säkerhets skull, är Spigens sekretesspack rätt val trots att det kostar 120 kronor mer.",
  },
  {
    id: "copter-exoglass-17-pro",
    brand: "Copter",
    name: "Exoglass",
    shortName: "Copter Exoglass",
    image: productImage(IPHONE_SKARMSKYDD.slug, "copter-exoglass-17-pro"),
    tagline: "Fettavvisande yta som torkas ren i ett drag.",
    /* Montering 2,0 → 2,5 den 2026-08-06: Copters appliceringsanvisning visar
       att våtservett, torkduk och dammdekal ligger i asken, alltså samma
       rengöringskit som Celly Easy Glass redan fick 2,5 för. */
    scores: { skydd: 3.5, montering: 2.5, prisvarde: 2.5 },
    price: 199,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/copter-exoglass-iphone-1717-pro-57334.html",
    superlative: "Bäst yta mot fett och fingeravtryck",
    pros: [
      "Fettavvisande nanobeläggning som gör att fett torkas bort i ett drag i stället för att smetas ut",
      "Dubbelhärdat glas som tar upp stötar och inte bara står emot repor",
      "Våtservett, torkduk och dammdekal i asken, alltså det som avgör om monteringen blir bubbelfri",
    ],
    cons: [
      "Ingen monteringsram, och glaset ska riktas in på frihand mot skärmens kanter",
      "199 kronor för ett glas, mot 99,50 per glas för det billigaste tvåpacket",
    ],
    specs: [
      { label: "Pris per skydd", shortLabel: "Per skydd", value: "199 kr", highlight: true },
      { label: "Material", value: "Härdat glas", highlight: true },
      { label: "Täckning", value: "Ej angiven", highlight: true },
      /* Copters egen appliceringsanvisning (art.nr 9927, PDF länkad från
         copter.com) beskriver frihandsmontering steg för steg: glaset riktas
         in centralt på skärmen. Ingen bygel ingår. Läst 2026-08-06. */
      { label: "Monteringsram", shortLabel: "Ram", value: "Nej", highlight: true },
      /* Stod som "Ej angiven" fram till 2026-08-06. copter.com anger
         "Double-tempered ionized glass with 9H hardness". */
      { label: "Angiven hårdhet", shortLabel: "Hårdhet", value: "9H", highlight: true },
      { label: "Sekretessfilter", shortLabel: "Sekretess", value: "Nej", highlight: true },
      { label: "Antal i förpackningen", value: "1 st" },
      /* Innehållet står i appliceringsanvisningen ovan: våt pappersduk,
         torr pappersduk och dammdekal används i tur och ordning. */
      { label: "Ingår i förpackningen", value: "Glas, våtservett, torkduk, dammdekal" },
      { label: "Skyddar framsensorer", value: "Nej" },
      { label: "Skalvänlig", value: "Ej angivet" },
      { label: "Kantutförande", value: "Ej angivet" },
      { label: "Tjocklek", value: "Ej angiven" },
      { label: "Glastyp", value: "Dubbelhärdat joniserat glas" },
      { label: "Ytbehandling", value: "Olje- och vattenavvisande nanobeläggning" },
      { label: "Passar modeller", value: "iPhone 17, iPhone 17 Pro" },
      { label: "Garanti", value: "Livstid", highlight: true },
    ],
    verdict:
      "Copter Exoglass kostar 199 kronor och säljs på sin yta: en nanobeläggning som stöter bort både fett och vatten.\n\n**Den beläggningen är den egenskap man märker varje dag.** Ett skärmskydd utan den samlar hudfett i ett grått lager som smetas ut när man torkar, och det syns värst på en mörk skärm i motljus. Den här ytan släpper fettet i stället, så en torkning på byxbenet räcker. Glaset under är dubbelhärdat och joniserat, alltså två härdningar i stället för en, och det spricker i ditt ställe i stället för att bara hålla nycklar borta. I asken ligger också en våtservett, en torkduk och en dammdekal, vilket är de tre sakerna som avgör om glaset hamnar bubbelfritt.\n\nNågon bygel finns däremot inte. Glaset ska riktas in mot skärmens kanter på frihand, och det är ett moment som bara går att göra en gång.\n\nTa det här om du är trött på flottiga skärmar och vill ha en yta som går att torka ren på byxbenet. Är det täckningen och inte ytan du köper går Celly Full Glass ända ut i kanten för 20 kronor mer.",
  },
  {
    id: "uag-glass-shield-17-pro",
    brand: "UAG",
    name: "Glass Shield",
    shortName: "UAG Glass Shield",
    image: productImage(IPHONE_SKARMSKYDD.slug, "uag-glass-shield-17-pro"),
    tagline: "Förstärkta kanter, alltså mer glas där skydd normalt spricker.",
    /* Montering 2,0 → 4,5 och prisvärde 1,5 → 2,0 den 2026-08-06. Skyddet har
       monteringsapplikator, mikrofiberduk, våtservett och dammdekal, alltså
       kriteriets högsta steg plus rengöringskit. Se lib/corrections.ts. */
    scores: { skydd: 4, montering: 4.5, prisvarde: 2 },
    price: 399,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/uag-glass-shield-iphone-17-pro-57984.html",
    superlative: "Bäst för dig som spräckt ett glas i kanten",
    pros: [
      "Förstärkta kanter, alltså mer material just där glas normalt börjar spricka",
      "Klarar en stålkula släppt från 1,8 meter, den enda fallhöjd som finns för något skydd här",
      "Applikator, mikrofiberduk, våtservett och dammdekal i asken, alltså kategorins mest kompletta monteringssats",
    ],
    cons: [
      "399 kronor för ett glas, dyrast per skydd tillsammans med sekretessglaset",
      "Ett glas i asken, så en misslyckad montering kostar 399 kronor till",
    ],
    specs: [
      { label: "Pris per skydd", shortLabel: "Per skydd", value: "399 kr", highlight: true },
      { label: "Material", value: "Dubbelförstärkt härdat glas", highlight: true },
      /* ⚠️ RÄTTELSE 2026-08-06. Fyra celler stod som "Ej angiven" och två av
         dem var fel. Både butikens egen produktsida — den URL som redan låg i
         merchantUrl — och urbanarmorgear.com beskriver installationspaketet
         ordagrant: "Paketet innehåller en applikator för en snabb, bubbelfri
         montering, tillsammans med en mikrofiberduk, våtservett och
         klistermärke för dammavlägsnande" respektive "Each kit comes with an
         installation frame, microfiber cloth, wet wipe, and dust removal
         sticker". Betyget för montering var satt till 2,0 på en produkt som
         har kategorins mest kompletta monteringssats. Se lib/corrections.ts. */
      { label: "Täckning", value: "Skalvänlig passform med svart kant", highlight: true },
      { label: "Monteringsram", shortLabel: "Ram", value: "Ja, applikator", highlight: true },
      { label: "Angiven hårdhet", shortLabel: "Hårdhet", value: "9H", highlight: true },
      { label: "Sekretessfilter", shortLabel: "Sekretess", value: "Nej", highlight: true },
      { label: "Antal i förpackningen", value: "1 st" },
      { label: "Ingår i förpackningen", value: "Glas, applikator, mikrofiberduk, våtservett, dammdekal" },
      { label: "Skyddar framsensorer", value: "Nej" },
      { label: "Skalvänlig", value: "Ja, anpassat för UAG:s egna skal" },
      { label: "Kantutförande", value: "Förstärkta kanter, svart ram" },
      { label: "Tjocklek", value: "Ej angiven" },
      { label: "Glastyp", value: "Ej angiven" },
      { label: "Ytbehandling", value: "Anti-fingeravtryck" },
      { label: "Passar modeller", value: "iPhone 17 Pro" },
      { label: "Garanti", value: "2 år", highlight: true },
    ],
    verdict:
      "UAG Glass Shield kostar 399 kronor och lägger materialet där glas normalt går sönder: i kanterna.\n\n**Kanten är rätt ställe att förstärka.** Ett skärmskydd spricker sällan i mitten. Det spricker när telefonen landar på en kant eller ett hörn och kraften går in i glaset från sidan, och där är ett vanligt glas som tunnast. UAG bygger upp just den zonen och lägger dessutom två härdade lager i stället för ett. Glaset klarar en stålkula släppt från 1,8 meter, vilket är den enda fallhöjd som finns för något skydd i jämförelsen och ungefär den höjd en telefon lämnar en ficka på. Asken innehåller dessutom en applikator, en mikrofiberduk, en våtservett och en dammdekal, alltså både bygeln som lägger glaset rakt och de tre sakerna som avgör om det blir bubbelfritt. Ingen annan tillverkare här packar allt fyra.\n\nDet ligger ett glas i asken. Går monteringen fel trots applikatorn kostar nästa försök 399 kronor, och det är tre gånger vad Trolsks glas kostar.\n\nKöp det här om du spräckt ett skärmskydd i kanten förut och vill lägga pengar på att slippa det igen. Är kanten inte ditt problem gör Devias heltäckande glas med ram samma monteringsjobb för nästan halva priset.",
  },
  {
    id: "copter-screen-protector-17-pro",
    brand: "Copter",
    name: "Screen Protector displayfilm",
    shortName: "Copter Displayfilm",
    image: productImage(IPHONE_SKARMSKYDD.slug, "copter-screen-protector-17-pro"),
    tagline: "Byts kostnadsfritt om den slutar fungera.",
    scores: { skydd: 2, montering: 2, prisvarde: 3 },
    price: 199,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/copter-screen-protector-iphone-1717-pro-57369.html",
    superlative: "Bäst för dig som inte vill ha glas på skärmen",
    pros: [
      "Livstidsgaranti med kostnadsfritt utbyte, och villkoren står utskrivna",
      "Mjuk film som inte spricker, alltså inget glas att plocka bort från skärmen",
      "Följer skärmens kant utan att bygga en tröskel som fingret känner",
    ],
    cons: [
      "Film tar upp betydligt mindre stöt än glas, så en tappad telefon är fortfarande utsatt",
      "Garantin gäller inte slitage, felaktig montering eller olyckshändelser, alltså de vanligaste skälen att den går sönder",
    ],
    specs: [
      { label: "Pris per skydd", shortLabel: "Per skydd", value: "199 kr", highlight: true },
      { label: "Material", value: "Displayfilm", highlight: true },
      { label: "Täckning", value: "Ej angiven", highlight: true },
      { label: "Monteringsram", shortLabel: "Ram", value: "Ej angiven", highlight: true },
      { label: "Angiven hårdhet", shortLabel: "Hårdhet", value: "Ej angiven", highlight: true },
      { label: "Sekretessfilter", shortLabel: "Sekretess", value: "Nej", highlight: true },
      { label: "Antal i förpackningen", value: "1 st" },
      { label: "Ingår i förpackningen", value: "Ej angivet" },
      { label: "Skyddar framsensorer", value: "Nej" },
      { label: "Skalvänlig", value: "Ej angivet" },
      { label: "Kantutförande", value: "Ej angivet" },
      { label: "Tjocklek", value: "Ej angiven" },
      { label: "Glastyp", value: "Ej tillämpligt, film" },
      { label: "Ytbehandling", value: "Ej angiven" },
      { label: "Passar modeller", value: "iPhone 17, iPhone 17 Pro" },
      { label: "Garanti", value: "Livstid, med undantag", highlight: true },
    ],
    verdict:
      "Copter Screen Protector kostar 199 kronor, är en mjuk displayfilm och kommer med livstidsgaranti. Slutar den fungera byts den kostnadsfritt.\n\n**Garantin är smalare än ordet livstid låter.** Utbytet gäller inte slitage, inte felaktig montering, inte olyckshändelser och inte film som utsatts för extrem kyla eller hetta. Kvar blir att filmen slutar fungera av sig själv, alltså att limmet eller materialet ger upp utan att du gjort något. Det är en verklig garanti, men den täcker inte de tre vanligaste skälen till att ett skärmskydd byts. Filmen i sig har en fördel glas saknar: den spricker inte. Ett sprucket glas ska plockas bort i skärvor, medan en repad film bara sitter kvar tills du drar av den.\n\nSkyddet mot fall är det svaga. En mjuk film tar upp bråkdelen av vad ett härdat glas gör, och det är därför den ligger så långt ner här.\n\nTa det här om skärmen mest ska klara nycklar och sand i fickan och du hellre byter en film några gånger än plockar glasskärvor en gång. Ska skyddet klara ett fall behöver du glas, och då är Trolsks för 129 kronor både billigare och rätt sorts produkt.",
  },
  {
    id: "trolsk-film-tunn-17-pro",
    brand: "Trolsk",
    name: "Skärmskydd Film Tunn",
    shortName: "Trolsk Film",
    image: productImage(IPHONE_SKARMSKYDD.slug, "trolsk-film-tunn-17-pro"),
    tagline: "Mjuk PET-film för 69 kronor.",
    scores: { skydd: 1.5, montering: 2, prisvarde: 3.5 },
    price: 69,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/trolsk-skarmskydd-film-tunn-iphone-17-pro18-pro-57001.html",
    superlative: "Billigast av alla",
    pros: [
      "69 kronor, alltså under halva priset mot billigaste glaset",
      "PET-film som lämnar bildkvaliteten orörd",
      "Så tunn att den inte bygger någon kant mot fingret",
    ],
    cons: [
      "Mjuk film skyddar mot repor och damm men knappt alls mot ett fall",
      "En repa i filmen sitter kvar tills du drar av hela skyddet och sätter ett nytt",
    ],
    specs: [
      { label: "Pris per skydd", shortLabel: "Per skydd", value: "69 kr", highlight: true },
      { label: "Material", value: "PET-film", highlight: true },
      { label: "Täckning", value: "Ej angiven", highlight: true },
      { label: "Monteringsram", shortLabel: "Ram", value: "Nej", highlight: true },
      { label: "Angiven hårdhet", shortLabel: "Hårdhet", value: "Ej angiven", highlight: true },
      { label: "Sekretessfilter", shortLabel: "Sekretess", value: "Nej", highlight: true },
      { label: "Antal i förpackningen", value: "1 st" },
      { label: "Ingår i förpackningen", value: "Ej angivet" },
      { label: "Skyddar framsensorer", value: "Nej" },
      { label: "Skalvänlig", value: "Ja" },
      { label: "Kantutförande", value: "Ej angivet" },
      { label: "Tjocklek", value: "Ej angiven" },
      { label: "Glastyp", value: "Ej tillämpligt, film" },
      { label: "Ytbehandling", value: "Ej angiven" },
      { label: "Passar modeller", value: "iPhone 17 Pro, iPhone 18 Pro" },
      { label: "Garanti", value: "1 år", highlight: true },
    ],
    verdict:
      "Trolsk Skärmskydd Film Tunn kostar 69 kronor och är en mjuk PET-film, alltså plast och inte glas.\n\n**Den gör en sak och den gör den billigt.** En film hindrar repor från nycklar, mynt och sand, och den är så tunn att fingret inte känner någon övergång vid kanten. PET-materialet lämnar bilden orörd, så du ser samma skärm som utan skydd. För 69 kronor är det den lägsta tröskeln in i kategorin, och för en telefon som ändå ska säljas vidare om ett halvår kan det räcka.\n\nMot ett fall gör den nästan ingenting. Ett härdat glas offrar sig och spricker i skärmens ställe, medan en mjuk film följer med rörelsen och låter kraften gå rakt igenom. Det är hela skillnaden mellan de två produkttyperna, och den märks en enda gång, i asfalten.\n\nKöp inte det här om skärmen ska klara ett tapp. För 60 kronor mer får du Trolsks härdade glas, som är rätt sorts produkt för det jobbet. Filmen är för dig som bär telefonen med nycklar och bara vill hålla repor borta.",
  },
];

const CONSIDERED: ConsideredProduct[] = [
  {
    brand: "SiGN",
    name: "Protection Package",
    reason:
      "Ett paket med skal, skärmskydd och linsskydd i samma ask för 249 kronor. Det gör det till ett bra startpaket och till en dålig rad i en jämförelse av skärmskydd, eftersom priset delas mellan tre produkter och glaset inte går att bedöma för sig. Ska du köpa allt på en gång är det prisvärt, och skalen jämför vi separat.",
    approxPrice: 249,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/sign-protection-package-iphone-17-pro-57099.html",
  },
  {
    brand: "PanzerGlass",
    name: "PicturePerfect Camera Protector",
    reason:
      "Ett härdat glas över kameralinserna och inte över skärmen. Kameralinsskydd är en egen produkt med egna avvägningar, framför allt hur mycket glaset stör blixten i mörker, och de förklaras i köpguiden. De får en egen jämförelse.",
    approxPrice: 249,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/panzerglass-pictureperfect-camera-protector-iphone-17-pro-57261.html",
  },
  {
    brand: "Spigen",
    name: "Glas.tR EZ Fit Optik Pro",
    reason:
      "Namnet ser ut som skärmskydden ovan, men Optik är Spigens serie för kameralinser. Den skyddar de tre linserna på baksidan och inte displayen. Värd att känna till just för att den lätt hamnar i korgen i stället för Glas.tR EZ Fit, som är skärmskyddet och vinnaren här.",
    approxPrice: 299,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/spigen-glastr-ez-fit-optik-pro-iphone-17-pro17-pro-max-57402.html",
  },
  {
    brand: "Trolsk",
    name: "Kameralinsskydd härdat glas, 2-pack",
    reason:
      "Två glas till kameralinserna för under hundralappen. Samma sak som ovan: fel yta för den här jämförelsen. Den som vill skydda både skärmen och kameran köper två artiklar, och budgetalternativet finns.",
    approxPrice: 99,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/trolsk-kameralinsskydd-hardat-glas-2-pack-iphone-17-pro-57030.html",
  },
  {
    brand: "Enkay",
    name: "Glitter Ring Lens Protector",
    reason:
      "Ett dekorativt linsskydd med glittrande ring runt kamerorna. Det är ett smyckesköp snarare än ett skydd, och det hör varken hemma bland skärmskydden eller i en jämförelse som väger skydd på 35 procent.",
    approxPrice: 149,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/enkay-glitter-ring-lens-protector-iphone-17-pro17-pro-max-58383.html",
  },
  {
    brand: "Celly",
    name: "Camera Lens Protector",
    reason:
      "Cellys linsskydd i härdat glas, alltså samma märke som två av glasen i rankningen men för kamerorna. Med här för att göra gränsen tydlig: sidan rankar det som ligger över skärmen, ingenting annat.",
    approxPrice: 129,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/celly-camera-lens-protector-iphone-17-pro-56987.html",
  },
];

export const IPHONE_SKARMSKYDD_PRODUCTS = resolveProducts(
  IPHONE_SKARMSKYDD,
  SEEDS,
);

export const IPHONE_SKARMSKYDD_CONSIDERED = CONSIDERED;

/**
 * Frågorna är de som faktiskt ställs i kategorin, och svaren står på egna ben
 * eftersom FAQ-rutan kan visas ensam i ett sökresultat.
 */
export const IPHONE_SKARMSKYDD_FAQ = [
  {
    question: "Vad betyder 9H på ett skärmskydd?",
    answer:
      "Det är det högsta värdet på en skala som mäter hur hårt en blyertspenna får vara innan den repar en yta. Skalan går från 6B, mjukast, till 9H, hårdast, och den kommer ur två standarder för färg och lack: ASTM D3363 och ISO 15184. Eftersom 9H är skalans tak anger nästan alla skärmskydd det, vilket gör talet oanvändbart för att skilja två skydd åt. ISO skriver dessutom i sin egen sammanfattning att metoden inte lämpar sig för att jämföra olika beläggningar med varandra. Talet säger alltså att ytan står emot den hårdaste blyertspennan, ingenting mer, och det säger ingenting om hur skyddet klarar ett fall mot asfalt.",
  },
  {
    question: "Är 9H samma sak som 9 på Mohs hårdhetsskala?",
    answer:
      "Nej, och förväxlingen är vanlig. Mohs skala mäter mineraler och där är 9 korund, alltså samma material som safir, medan 10 är diamant. Ett vanligt glas ligger på ungefär 5,5 på den skalan. 9H kommer från en helt annan mätning, pennskalan i ASTM D3363, och de två har bara bokstaven och siffran gemensamt. Den praktiska följden är värd att känna till: kvarts, alltså huvudbeståndsdelen i vanlig sand, ligger på 7 på Mohs skala och är därmed hårdare än allt glas. Sand i fickan repar ett skärmskydd oavsett vad som står på kartongen, medan en nyckel av stål oftast inte gör det.",
  },
  {
    question: "Skyddar ett härdat glas bättre än en plastfilm?",
    answer:
      "Ja, mot fall, och det är den viktigaste skillnaden mellan de två. Ett härdat glas är styvt och spricker sönder när kraften blir för stor, vilket betyder att det tar upp energin i stället för skärmen under. En mjuk film följer med rörelsen och låter kraften gå rakt igenom, så den skyddar mot repor och damm men knappt alls mot ett tapp. Filmen har två fördelar: den är billigare, och den spricker inte, så du slipper plocka glasskärvor från skärmen. Ska telefonen klara ett fall mot golv är det glas du ska ha. Ska den bara klara nycklar i samma ficka räcker filmen.",
  },
  {
    question: "Vad är skillnaden mellan heltäckande och vanligt skärmskydd?",
    answer:
      "Hur långt ut mot kanten glaset går. Ett heltäckande skydd sträcker sig ända ut och har oftast en svart tryckt ram som döljer limfogen. Ett standardskydd slutar en bit innanför kanten, ibland flera millimeter, och lämnar den ytan bar. Det spelar roll av två skäl. En telefon som tappas landar sällan platt utan på en kant eller ett hörn, alltså precis där ett standardglas inte når. Å andra sidan är standardformen lättare att kombinera med ett tjockt skal: möts glaset och skalkanten på fel ställe kan skalet lyfta glaset lite i taget tills en kant släpper. Har du ett kraftigt skal med hög skärmkant är standardformen ofta det som håller längst.",
  },
  {
    question: "Behöver jag en monteringsram?",
    answer:
      "Om du inte satt ett skärmskydd förut är den värd mer än nästan allt annat i förpackningen. Ett skärmskydd är en engångsmontering: limmet fäster direkt och glaset går inte att lyfta och lägga om utan att både damm och luft kommer in. En monteringsram är en plastbygel som telefonen läggs i, så att glaset bara kan hamna rätt. Sex av de femton skydd vi jämför har en, och tillverkarna kallar den olika saker: installationsbricka, Assist Tool, EasyAligner, applikator. Har du ingen ram är det andra bästa ett tvåpack, eftersom det andra glaset är din andra chans, och det tredje bästa ett rengöringskit: det är dammet på skärmen som blir en bubbla, inte din hand.",
  },
  {
    question: "Hur får jag bort bubblor under skärmskyddet?",
    answer:
      "Det beror på vad bubblan innehåller. Ren luft vandrar ofta ut av sig själv inom ett dygn, eller går att trycka ut mot närmaste kant med ett kort från mitten och utåt. Sitter en bubbla kvar efter det ligger det oftast ett dammkorn under, och då hjälper ingen tryckning. Lyft glaset försiktigt i ett hörn med en tejpbit, ta bort kornet med en annan tejpbit och lägg tillbaka glaset direkt. Räkna med att limmet tappar en del av greppet varje gång. Det bästa botemedlet är förebyggande: torka skärmen, låt den vara helt torr, och sätt skyddet i ett rum där ingen nyss dammsugit eller skakat en filt.",
  },
  {
    question: "Passar ett skärmskydd till iPhone 17 även på iPhone 17 Pro?",
    answer:
      "Ofta men inte alltid, och det ska kontrolleras artikel för artikel. iPhone 17 och 17 Pro har samma skärmstorlek, så flera av skydden i jämförelsen anger båda modellerna plus iPhone 16 Pro. iPhone 17 Pro Max har en större skärm och iPhone Air en annan, och där passar de inte. Kontrollera att artikeln du lägger i korgen räknar upp exakt din modell och inte bara serien, och lita på specifikationsraden framför produktnamnet om de säger olika saker. Priserna på den här sidan gäller genomgående 17 Pro-varianten.",
  },
  {
    question: "Påverkar ett skärmskydd Face ID eller pekkänsligheten?",
    answer:
      "Ett korrekt monterat skydd ska inte göra det, men två saker är värda att veta. Face ID läser av ansiktet genom sensorerna ovanför skärmen, och de flesta skärmskydd lämnar den ytan fri; ett av skydden i jämförelsen täcker den med avsikt och uppger att funktionen ändå fungerar. Pekkänsligheten påverkas i teorin av tjockleken, men skillnaden mellan det tunnaste och det tjockaste skyddet här är sju hundradels millimeter, vilket inget finger känner. Det som däremot märks är en bubbla eller ett snett monterat glas, eftersom luftspalten under är det som gör att skärmen inte svarar på just det stället.",
  },
];
