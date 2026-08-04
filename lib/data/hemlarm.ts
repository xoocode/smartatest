import { HEMLARM } from "@/lib/test-pages";
import { resolveServices, type ServiceSeed } from "@/lib/services";
import type { ConsideredProduct } from "@/lib/products";

/**
 * Hemlarm med larmcentral. Sajtens första tjänstekategori.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Priser och villkor är lästa hos bolaget självt** den 3 augusti 2026, med
 * curl mot bolagets egen sida så att vi läser samma text som en besökare.
 * Avtalsuppgifterna är hämtade ur avtalsdokumenten i original, och varje
 * sådan uppgift bär utgåva och punktnummer i `terms.termsVersion` respektive i
 * källhänvisningen på avgiften.
 *
 * **Kriteriebetygen är redaktionell bedömning** enligt den publicerade skalan
 * i lib/categories.ts. Vi har inte tecknat något abonnemang, inte installerat
 * något larm och inte utlöst något larm. Vi har läst det som binder bolaget.
 *
 * ## Den viktigaste konventionen
 *
 * `monthlyFee: null` betyder **att bolaget inte publicerar sin månadsavgift**,
 * inte att den är noll. Fyra av åtta publicerar ett månadstal och bara två
 * publicerar hela priset. Se `formatFee()` i lib/services.ts, som finns just
 * för att en saknad uppgift aldrig ska renderas som `0 kr`.
 *
 * ## Vad som saknas och varför
 *
 * Brev till samtliga åtta bolag med frågan om exempelpriser för tre
 * hushållsscenarier ligger **utkastade men ännu inte skickade** i
 * `.agent/drafts/`. De skickas när sajten är live.
 *
 * ⚠️ Sidan fick därför aldrig påstå att vi frågat. Tre sådana påståenden stod
 * i läsartext och togs bort 2026-08-04: en i #vem-har-kontrollerat, en i
 * Gardas omdöme och en i SecuritasHomes. Skriv aldrig in dem igen förrän
 * breven faktiskt gått iväg. Tills dess betyder ett tomt fält bara att
 * bolaget inte publicerar uppgiften, vilket är sant och räcker.
 */

export const PRICE_CHECKED = "3 augusti 2026";
const CHECKED = "2026-08-03";

const VERISURE_TERMS =
  "https://www.verisure.se/sites/se/files/flmngr/pdf-villkor/privat/allmanna_villkor/allmanna-villkor-verisure-2025-1.pdf";
const SECTOR_TERMS =
  "https://www.sectoralarm.se/hubfs/SE%20Documents/Avtalsvillkor_SAS_2.1_web.pdf";

const SEEDS: ServiceSeed[] = [
  {
    id: "verisure-smart-voice",
    provider: "Verisure",
    name: "Smart Voice Alarm",
    shortName: "Smart Voice",
    tagline:
      "Enda bolaget som publicerar månadsavgift, startavgift, bindningstid och priset för att lämna.",
    providerUrl: "https://www.verisure.se/hemlarm",
    checkedAt: CHECKED,
    award: "winner",
    superlative: "Öppnast med priset",
    scores: { oppna: 5, lamna: 3, larm: 4, larmcentral: 4.5, prisvarde: 2.5 },
    terms: {
      monthlyFee: 599,
      startFee: 3990,
      startFeeLabel: "Uppkopplingskostnad vid 12 mån bindning",
      startFeeWithoutBinding: 5990,
      bindingMonths: 12,
      noticeMonths: 3,
      excessCover: 10000,
      ownership: "frikop",
      withdrawalDays: 14,
      buyout: [
        { untilMonths: 24, price: 7000, label: "Inom 2 år" },
        { untilMonths: 48, price: 4000, label: "2–4 år" },
        { untilMonths: 60, price: 2000, label: "4–5 år" },
        { untilMonths: null, price: 1, label: "Efter 5 år" },
      ],
      buyoutNote:
        "Verisure skriver själva att ett friköp varken ger garanterad funktion eller tillgång till appen, och att friköpet måste anmälas innan avtalstiden löper ut.",
      exitFees: [
        {
          label: "Återtagandeavgift om du inte ger tillträde för avslutningsbesök",
          amount: 7000,
          source: "Allmänna villkor 2025:1, p. 13",
          conditional: true,
        },
        {
          label: "Nedmontering och retur av komponenter",
          amount: null,
          source: "Allmänna villkor 2025:1, p. 13. Sker på din bekostnad",
          conditional: false,
        },
      ],
      termsUrl: VERISURE_TERMS,
      termsVersion: "2025:1",
      termsCheckedAt: CHECKED,
    },
    included: [
      "Huvudenhet med röststyrning",
      "Kameradetektor",
      "Dörr- och fönsterdetektorer",
      "Larmbrickor",
      "Skyltar och dekaler",
    ],
    pros: [
      "Publicerar månadsavgift, startavgift och bindningstid på sin egen sida",
      "Publicerar dessutom en friköpstrappa, med vad det kostar att lämna",
      "Avtalsvillkor och tjänstevillkor ligger som nedladdningsbara pdf:er med utgåva",
      "Egen larmcentral och dubbla kommunikationsvägar",
      "Självriskeliminering upp till 10 000 kr",
    ],
    cons: [
      "Dyrast av bolagen räknat på fem år, cirka 39 900 kronor",
      "Behåller äganderätten till komponenterna även om du köpt dem i deras webbshop",
      "Friköp ger dig hårdvaran men ingen garanterad funktion och ingen app",
      "Återtagandeavgift på 7 000 kronor om du inte ger tillträde vid avslutet",
      "Ingen väktarutryckning första sju dagarna vid larm som inte kunnat verifieras",
    ],
    specs: [
      { label: "Månadsavgift", value: "599 kr", highlight: true },
      {
        label: "Startavgift",
        shortLabel: "Start",
        value: "3 990 kr med 12 mån bindning, 5 990 kr utan",
        highlight: true,
      },
      { label: "Bindningstid", value: "12 mån, eller ingen mot 2 000 kr extra", highlight: true },
      { label: "Uppsägningstid", value: "3 kalendermånader", highlight: true },
      { label: "Äganderätt", value: "Verisure äger, friköp möjligt", highlight: true },
      { label: "Självriskeliminering", value: "Upp till 10 000 kr" },
      { label: "Villkor", value: "Allmänna villkor 2025:1, tjänstevillkor 2024:2" },
      { label: "Ångerrätt", value: "14 dagar vid distans- eller hemförsäljning" },
    ],
    verdict:
      "Verisure är det enda bolaget som svarar på alla fyra frågorna en spekulant har innan mötet: vad kostar det i månaden, vad kostar det att komma igång, hur länge bindningen gäller och vad kostar det att sluta. Svaren är 599 kronor, 3 990 kronor, tolv månader och en trappa som börjar på 7 000 kronor. Att man kan ogilla varje enskilt svar är en annan sak än att inte få dem.\n\nDet som drar ner dem är kostnaden att lämna. Punkt 5 i villkoren säger att Verisure behåller äganderätten till komponenterna oavsett om du köpt dem i deras egen webbshop, och friköpssidan säger att ett friköp varken ger garanterad funktion eller tillgång till appen. Du köper alltså loss hårdvara som blir en lokal ljudsignal.\n\nLägg till återtagandeavgiften på 7 000 kronor om du inte ger tillträde vid avslutningsbesöket, så framgår att avtalet är skrivet av någon som tänkt igenom slutet noggrannare än du hinner göra vid köksbordet.",
  },
  {
    id: "securitashome-lilla",
    provider: "SecuritasHome",
    name: "LILLA",
    tagline:
      "Publicerar både månadsavgift och startpaket, och är billigast av dem som gör det.",
    providerUrl: "https://www.securitashome.se/abonnemang",
    checkedAt: CHECKED,
    superlative: "Billigast av de öppna",
    scores: { oppna: 4.5, lamna: 3, larm: 4, larmcentral: 3.5, prisvarde: 4.5 },
    terms: {
      monthlyFee: 349,
      startFee: 1995,
      startFeeLabel: "Startpaket villa, från",
      bindingMonths: null,
      noticeMonths: null,
      ownership: "kunden",
      withdrawalDays: 14,
      termsUrl: "https://www.securitashome.se/allmanna-villkor.html",
      termsCheckedAt: CHECKED,
    },
    included: [
      "Startpaket i tre storlekar: lägenhet 995 kr, radhus 1 495 kr, villa 1 995 kr",
      "Bildverifiering vid larm",
      "Fria utryckningar från Securitas larmcentral",
    ],
    pros: [
      "Publicerar månadsavgift för båda abonnemangen, 349 och 399 kronor",
      "Publicerar tre startpaketspriser efter boendeform i stället för ett från-pris",
      "Klart billigast över fem år av de bolag som går att räkna på",
      "Bildverifiering ingår i det billigare abonnemanget",
      "Du köper startpaketet i stället för att hyra det",
    ],
    cons: [
      "Bindningstid och uppsägningstid framgår inte av de publicerade sidorna",
      "Villkoren ligger som webbsida utan utgåvebeteckning, inte som daterat avtal",
      "Larmet är låst till Securitas och går inte att flytta till ett annat bolag",
      "Videokameror med inspelning kräver det dyrare abonnemanget STORA",
    ],
    specs: [
      { label: "Månadsavgift", value: "349 kr (LILLA), 399 kr (STORA)", highlight: true },
      { label: "Startavgift", shortLabel: "Start", value: "Från 1 995 kr för villa", highlight: true },
      { label: "Bindningstid", value: "Publiceras inte", highlight: true },
      { label: "Uppsägningstid", value: "Publiceras inte", highlight: true },
      { label: "Äganderätt", value: "Du köper startpaketet", highlight: true },
      { label: "Larmcentral", value: "Securitas larmcentral" },
    ],
    verdict:
      "SecuritasHome skriver 349 kronor i månaden rakt ut, delar upp startpaketet i tre priser efter om du bor i lägenhet, radhus eller villa, och låter dig köpa hårdvaran i stället för att hyra den. Räknat på fem år hamnar det runt 22 900 kronor mot Verisures 39 900, nästan halva kostnaden.\n\nDet som saknas är den andra halvan av avtalet. Bindningstid och uppsägningstid står inte på de sidor vi kunnat läsa, och villkoren ligger som en webbsida utan utgåva eller datum, vilket gör dem svårare att åberopa än ett daterat avtal.\n\nLarmkollen anger 24 månaders bindningstid för SecuritasHome, men vi har inte kunnat belägga det hos bolaget självt och publicerar därför ingen siffra.",
  },
  {
    id: "svenska-alarm",
    provider: "Svenska Alarm",
    name: "Hemlarm",
    tagline:
      "Publicerar ett från-pris på 175 kronor i månaden och delbetalning över 72 månader.",
    providerUrl: "https://www.svenskaalarm.se/hemlarm/",
    checkedAt: CHECKED,
    superlative: "Lägst månadsavgift av de publicerade",
    scores: { oppna: 3, lamna: 2.5, larm: 3, larmcentral: 3, prisvarde: 4 },
    terms: {
      monthlyFee: 175,
      startFee: null,
      bindingMonths: null,
      noticeMonths: null,
      ownership: "kunden",
      termsUrl: "https://www.svenskaalarm.se/villkor/",
      termsCheckedAt: CHECKED,
    },
    pros: [
      "Publicerar ett månadstal, vilket hälften av branschen inte gör",
      "Hårdvaran köps och kan delbetalas, så du äger den",
      "Egen villkorssida som listar sju separata villkorsdokument",
    ],
    cons: [
      "175 kronor är ett från-pris och sidan skriver att tjänster tillkommer",
      "Ingen startavgift publicerad, och hårdvarupriset framgår bara som delbetalning",
      "Delbetalning över 72 månader binder i praktiken i sex år",
      "Villkorssidan listar dokumenten men vi kunde inte läsa dem i sin helhet",
    ],
    specs: [
      { label: "Månadsavgift", value: "Från 175 kr, tjänster tillkommer", highlight: true },
      { label: "Startavgift", shortLabel: "Start", value: "Publiceras inte", highlight: true },
      { label: "Bindningstid", value: "Publiceras inte", highlight: true },
      { label: "Uppsägningstid", value: "Publiceras inte", highlight: true },
      { label: "Äganderätt", value: "Du köper hårdvaran, delbetalning upp till 72 mån", highlight: true },
    ],
    verdict:
      "Ett från-pris är inte samma sak som ett pris, och Svenska Alarm skriver det själva: tjänster tillkommer från 175 kronor i månaden. Det placerar dem i mitten av fältet snarare än i toppen, eftersom ett antytt svar inte går att räkna på.\n\nModellen är ändå värd att förstå, för den skiljer sig från de tvås. Du köper hårdvaran och kan delbetala den, i deras kalkylator upp till 72 månader. Det betyder att du äger utrustningen, vilket löser hela inlåsningsproblemet, men också att en avbetalning på sex år fungerar som en bindningstid även om den inte heter så.\n\nKampanjerna är många och tidsbegränsade, vilket gör det extra viktigt att få det pris du blir erbjuden skriftligt innan du skriver på.",
  },
  {
    id: "avarn-safe-home",
    provider: "Avarn Security",
    name: "SAFE HOME",
    tagline:
      "Sätter ut 449 kronor i månaden på tjänstesidan, men ingenting om avtalet.",
    providerUrl: "https://www.avarnsecurity.se/tjanster/safe-home/",
    checkedAt: CHECKED,
    scores: { oppna: 3, lamna: 2, larm: 3, larmcentral: 3.5, prisvarde: 3.5 },
    terms: {
      monthlyFee: 449,
      startFee: null,
      bindingMonths: null,
      noticeMonths: null,
      ownership: "bolaget",
      termsCheckedAt: CHECKED,
    },
    pros: [
      "Månadsavgiften står utskriven på tjänstesidan, 449 kronor",
      "Sabotageskydd som larmar larmcentralen om panelen manipuleras",
      "En enda centralenhet, vilket förenklar installationen",
    ],
    cons: [
      "Ingen startavgift publicerad",
      "Inga avtalsvillkor publicerade som vi kunnat hitta",
      "Ingen uppgift om bindningstid, uppsägningstid eller äganderätt",
      "Privatkunderbjudandet är svårt att hitta på en sajt som i övrigt vänder sig till företag",
    ],
    specs: [
      { label: "Månadsavgift", value: "449 kr", highlight: true },
      { label: "Startavgift", shortLabel: "Start", value: "Publiceras inte", highlight: true },
      { label: "Bindningstid", value: "Publiceras inte", highlight: true },
      { label: "Uppsägningstid", value: "Publiceras inte", highlight: true },
      { label: "Äganderätt", value: "Framgår inte", highlight: true },
    ],
    verdict:
      "Avarn gör hälften av det vi efterfrågar och gör den hälften bra: 449 kronor i månaden står på tjänstesidan utan att man behöver lämna ifrån sig något. Sedan tar det slut. Det finns ingen startavgift, inga publicerade avtalsvillkor och ingen uppgift om vad som händer när man vill sluta. För ett bolag som i övrigt riktar sig till företagsmarknaden är privaterbjudandet dessutom svårt att ens hitta, vilket är skälet till att det inte syns i jämförelser. Placeringen säger därför ingenting om larmet, bara om hur mycket av avtalet som går att läsa i förväg. Där saknas det mesta.",
  },
  {
    id: "sector-alarm",
    provider: "Sector Alarm",
    name: "Hemlarm",
    tagline:
      "Publicerar det mest genomarbetade avtalet i branschen, och inte månadsavgiften.",
    providerUrl: "https://www.sectoralarm.se/hemlarm/",
    checkedAt: CHECKED,
    superlative: "Tydligast avtal, dolt pris",
    scores: { oppna: 3, lamna: 1.5, larm: 3.5, larmcentral: 4.5, prisvarde: 2.5 },
    terms: {
      monthlyFee: null,
      startFee: 990,
      startFeeLabel: "Startpaket vid onlinebeställning, uppges värt 5 440 kr",
      bindingMonths: null,
      noticeMonths: 3,
      invoiceFee: 59,
      priceChangeAfterMonths: 12,
      excessCover: 10000,
      excessCoverPerYear: true,
      ownership: "bolaget",
      withdrawalDays: 14,
      exitFees: [
        {
          label: "Framkörning om du inte är hemma vid nedmonteringen",
          amount: 990,
          source: "Avtalsvillkor SAS 2.1, p. 12.2",
          conditional: true,
        },
        {
          label: "Få tillbaka nycklar du lämnat in",
          amount: 1990,
          source: "Avtalsvillkor SAS 2.1, p. 12.3",
          conditional: true,
        },
        {
          label: "Missbruk av den uppkopplade larmtjänsten",
          amount: 990,
          source: "Avtalsvillkor SAS 2.1, p. 7",
          conditional: true,
        },
      ],
      termsUrl: SECTOR_TERMS,
      termsVersion: "SAS 2.1",
      termsCheckedAt: CHECKED,
    },
    included: [
      "Gateway",
      "Manöverpanel",
      "Kameradetektor",
      "Dörr- och fönsterdetektorer",
    ],
    pros: [
      "Det utförligaste publicerade avtalet i kategorin, som nedladdningsbar pdf med utgåva",
      "Startpaket för 990 kronor vid onlinebeställning",
      "Självriskeliminering upp till 10 000 kronor per år, inklusive vattenläckage",
      "Egen larmcentral och Honeywell-hårdvara",
      "Fyra räntefria delbetalningar för installationen",
    ],
    cons: [
      "Publicerar ingen månadsavgift alls, vilket är den största enskilda kostnaden i ett larmavtal",
      "Larmsystemet förblir bolagets egendom och kan inte friköpas",
      "1 990 kronor för att få tillbaka nycklar du själv lämnat in",
      "Nycklarna förstörs utan förvarning om du inte begär dem skriftligt",
      "59 kronor per faktura om du inte väljer autogiro eller e-faktura",
      "Priset får ändras redan tolv månader efter att du skrivit under",
    ],
    specs: [
      { label: "Månadsavgift", value: "Publiceras inte", highlight: true },
      { label: "Startavgift", shortLabel: "Start", value: "990 kr online", highlight: true },
      { label: "Bindningstid", value: "Publiceras inte för privatkunder", highlight: true },
      { label: "Uppsägningstid", value: "3 mån från nästa månadsskifte", highlight: true },
      { label: "Äganderätt", value: "Sector äger, friköp erbjuds inte", highlight: true },
      { label: "Självriskeliminering", value: "Upp till 10 000 kr per år" },
      { label: "Villkor", value: "Avtalsvillkor SAS 2.1" },
      { label: "Ansvarstak", value: "100 000 kr enligt p. 11.8" },
    ],
    verdict:
      "Sector Alarm publicerar det mest genomarbetade avtalet någon i branschen lägger ut: en daterad pdf med utgåva, 22 paragrafer, avgifter angivna i kronor och ett uttalat ansvarstak. Läs det och du vet ovanligt mycket om vad du ger dig in i.\n\nMen du får inte veta vad det kostar. Månadsavgiften finns ingenstans på deras sajt, och det är den största enskilda posten i hela affären.\n\nVillkoren innehåller dessutom de hårdaste slutklausulerna av alla åtta. Punkt 8 säger att larmsystemet vid var tid förblir bolagets egendom och att du aldrig förvärvar någon rätt utöver nyttjanderätten, så det finns ingen friköpsmöjlighet över huvud taget. Punkt 12.3 säger att nycklar du lämnat in förstörs utan förvarning om du inte skriftligen ber att få dem tillbaka, och att returen då kostar 1 990 kronor. Det är den enskilt mest överraskande siffran vi hittade i den här kategorin.",
  },
  {
    id: "gardio",
    provider: "Gardio",
    name: "Hemlarm",
    tagline:
      "Publicerar fullständiga villkor men inte ett enda pris.",
    providerUrl: "https://gardio.se/",
    checkedAt: CHECKED,
    scores: { oppna: 2, lamna: 3.5, larm: 3, larmcentral: 3, prisvarde: 2.5 },
    terms: {
      monthlyFee: null,
      startFee: null,
      bindingMonths: null,
      noticeMonths: 3,
      ownership: "kunden",
      termsUrl: "https://gardio.se/villkor",
      termsCheckedAt: CHECKED,
    },
    pros: [
      "Fullständiga allmänna villkor publicerade och läsbara utan inloggning",
      "Villkoren förutser att äganderätten övergår till kunden vid köp",
      "Uppsägningstid angiven i villkoren, normalt tre månader",
      "Möjligt att teckna både med och utan bindningstid",
    ],
    cons: [
      "Inget pris publicerat någonstans på sajten",
      "Ingen startavgift och ingen månadsavgift går att hitta utan kontakt",
      "Larmcentralen är inköpt kapacitet och inte egen",
    ],
    specs: [
      { label: "Månadsavgift", value: "Publiceras inte", highlight: true },
      { label: "Startavgift", shortLabel: "Start", value: "Publiceras inte", highlight: true },
      { label: "Bindningstid", value: "Både med och utan erbjuds, belopp saknas", highlight: true },
      { label: "Uppsägningstid", value: "Normalt 3 mån enligt villkoren", highlight: true },
      { label: "Äganderätt", value: "Övergår till kunden vid köp", highlight: true },
    ],
    verdict:
      "Gardio speglar Sector Alarm i miniatyr: villkoren är publicerade och läsbara, priset är det inte. Villkorstexten är ovanligt utförlig för ett litet bolag och innehåller en formulering de större saknar, nämligen att äganderätten övergår till kunden när utrustningen är köpt. Det är den enda vägen ut ur inlåsningsproblemet och den är värd att lyfta. Att bolaget ändå hamnar i nedre halvan beror på att det vi väger tyngst är vad du kan ta reda på i förväg, och där finns inget pris alls. Larmcentralen är dessutom inköpt kapacitet snarare än egen, vilket i sig varken är bra eller dåligt men gör att ansvarskedjan har ett led till.",
  },
  {
    id: "garda-alarm",
    provider: "Garda Alarm",
    name: "Hemlarm utan månadskostnad",
    shortName: "Utan månadskostnad",
    tagline:
      "Bygger hela sitt erbjudande på att slippa månadsavgift, och anger ingen prislapp.",
    providerUrl: "https://www.gardaalarm.se/",
    checkedAt: CHECKED,
    superlative: "Enda modellen utan löpande avgift",
    scores: { oppna: 1, lamna: 3.5, larm: 2.5, larmcentral: 2.5, prisvarde: 4 },
    terms: {
      monthlyFee: null,
      startFee: null,
      bindingMonths: null,
      noticeMonths: null,
      ownership: "kunden",
      termsCheckedAt: CHECKED,
    },
    pros: [
      "Affärsmodellen bygger på köp i stället för abonnemang, vilket tar bort inlåsningen",
      "Egen larmcentralssida med kontaktvägar",
    ],
    cons: [
      "Inget pris publicerat, hela erbjudandet går via offertförfrågan",
      "Länken till villkoren leder ingenstans",
      "Ingen uppgift om vad larmcentralstjänsten kostar, om den kostar något",
      "Betyget vilar på bolagets egen beskrivning eftersom inget avtal finns att läsa",
    ],
    specs: [
      { label: "Månadsavgift", value: "Uppges saknas, belopp ej publicerat", highlight: true },
      { label: "Startavgift", shortLabel: "Start", value: "Publiceras inte", highlight: true },
      { label: "Bindningstid", value: "Publiceras inte", highlight: true },
      { label: "Uppsägningstid", value: "Publiceras inte", highlight: true },
      { label: "Äganderätt", value: "Du köper larmet, enligt bolagets egen beskrivning", highlight: true },
    ],
    verdict:
      "Garda Alarm säljer det mest intressanta erbjudandet av alla åtta och redovisar det sämst. Ett larm du köper och äger, utan löpande månadsavgift, löser precis det problem som gör resten av kategorin obehaglig. Men vi kan inte kontrollera en enda uppgift. Det finns inget pris, länken till villkoren leder ingenstans, och det framgår inte om larmcentralsanslutningen är gratis, ingår under en period eller kostar något löpande. Allt vi kan säga bygger därför på bolagets egen beskrivning, och det är precis det läge du ska vara försiktig i.",
  },
  {
    id: "safeland",
    provider: "Safeland",
    name: "Larm med lokal respons",
    shortName: "Lokal respons",
    tagline:
      "Bygger på grannar som rycker ut i stället för väktare, en annan sorts trygghet.",
    providerUrl: "https://www.safeland.se/se/",
    checkedAt: CHECKED,
    scores: { oppna: 1.5, lamna: 3.5, larm: 2, larmcentral: 1.5, prisvarde: 4 },
    terms: {
      monthlyFee: null,
      startFee: null,
      bindingMonths: null,
      noticeMonths: null,
      ownership: "kunden",
      termsCheckedAt: CHECKED,
    },
    pros: [
      "Larmet köps och ägs av dig, ingen operatörslåsning",
      "Lokal respons kan ge snabbare närvaro än en väktare som kör dit",
    ],
    cons: [
      "Inget pris publicerat på den sida vi läst",
      "Ingen bemannad larmcentral i grunderbjudandet",
      "Responsen bygger på att andra människor faktiskt svarar, vilket inte är avtalat",
      "Passar sämst av alla för den som specifikt vill ha väktarutryckning",
    ],
    specs: [
      { label: "Månadsavgift", value: "Publiceras inte", highlight: true },
      { label: "Startavgift", shortLabel: "Start", value: "Publiceras inte", highlight: true },
      { label: "Bindningstid", value: "Publiceras inte", highlight: true },
      { label: "Uppsägningstid", value: "Publiceras inte", highlight: true },
      { label: "Äganderätt", value: "Du äger larmet", highlight: true },
    ],
    verdict:
      "Safeland löser en annan uppgift än de sju andra. Grundtanken är lokal respons: människor i närheten larmas i stället för att en väktare kör dit från en central. För den som bor där det finns grannar som bryr sig kan det vara både snabbare och billigare. För den som köper ett hemlarm just för att någon annan ska rycka ut mot betalning är det inte samma produkt. Att de hamnar sist säger mer om att jämförelsen är byggd för abonnemangslarm med larmcentral än om kvaliteten på det de säljer. Läs raden som en varning för att jämföra äpplen med päron.",
  },
];

export const HEMLARM_SERVICES = resolveServices(HEMLARM, SEEDS);

/**
 * Bolag och lösningar vi tittade på och lämnade utanför rankningen.
 *
 * `ConsideredProduct` återanvänds med `brand` som bolagsnamn. Att införa en
 * separat `ConsideredService` hade gett en identisk typ med ett annat namn.
 */
export const HEMLARM_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Alert Alarm",
    name: "Hemlarm",
    reason:
      "Finns inte längre som eget alternativ. alertalarm.se omdirigerar sedan en tid till verisure.se, kontrollerat 2026-08-03. Prisuppgifter som fortfarande cirkulerar för märket, 169 kronor i månaden för bas och 349 för deluxe, är därmed inaktuella. Minst en svensk jämförelsesajt listar dem ändå som ett val och länkar dit.",
  },
  {
    brand: "Verisure",
    name: "Larm monterat av kund",
    reason:
      "Egen villkorsuppsättning och därför inte samma tjänst som den installerade. Värd att känna till av ett skäl: punkt 15 säger att avtalet är bindande i 24 kalendermånader, så det billigare egenmonterade alternativet en bindningstid som det dyra installerade saknar. Ingen jämförelsesajt vi läst nämner det.",
  },
  {
    brand: "Ajax Systems",
    name: "Hub 2 Plus med larmcentral",
    reason:
      "Säljs som hårdvara du äger och kan koppla till valfri larmcentral, vilket gör den till en annan sorts köp. Hör hemma på systersidan om larm utan abonnemang.",
    approxPrice: 6000,
  },
  {
    brand: "Ring",
    name: "Alarm Security Kit",
    reason:
      "Ingen svensk larmcentralsanslutning, så det larmar i din mobil och ingen annanstans. Samma avgränsning som ovan.",
    approxPrice: 3000,
  },
  {
    brand: "Designlarm",
    name: "Hemlarm",
    reason:
      "Nämns av en konkurrent som ett av nio rekommenderade bolag, men vi hittade varken publicerat pris, publicerade villkor eller uppgift om larmcentral. Utan någon kontrollerbar uppgift går det inte att sätta betyg som betyder något.",
  },
  {
    brand: "Svenska Trygghetslösningar",
    name: "Hemlarm",
    reason:
      "Samma sak. Bolaget finns och har en fungerande sajt, men vi hittade ingen uppgift som går att jämföra med de åtta i rankningen.",
  },
];

export const HEMLARM_FAQ = [
  {
    question: "Vad kostar hemlarm i månaden?",
    answer:
      "Hos de fyra bolag som publicerar ett månadstal: SecuritasHome 349 kronor för LILLA och 399 för STORA, Avarn Security 449 kronor, Verisure 599 kronor, och Svenska Alarm från 175 kronor med tillägg. Sector Alarm, Gardio, Garda Alarm och Safeland publicerar ingen månadsavgift alls. Till månadsavgiften kommer nästan alltid en startavgift, och den varierar från 990 kronor hos Sector till 5 990 hos Verisure om du väljer bort bindningstiden. Alla uppgifter är lästa på bolagets egen sida den 3 augusti 2026.",
  },
  {
    question: "Har hemlarm bindningstid?",
    answer:
      "Det beror på vad du väljer, och hos Verisure är valet prissatt: uppkopplingen kostar 3 990 kronor med tolv månaders bindningstid och 5 990 kronor utan. Friheten kostar alltså 2 000 kronor. Sector Alarms avtalsvillkor anger 24 månaders bindningstid enbart för företagskunder och för privatkunder bara att uppsägningstiden gäller med undantag för eventuell bindningstid. Verisures egenmonterade larm är däremot bindande i 24 kalendermånader enligt punkt 15 i dess villkor. Kräv siffran skriftligt innan du skriver under.",
  },
  {
    question: "Äger jag larmet eller hyr jag det?",
    answer:
      "Hos de två största hyr du det. Verisures allmänna villkor punkt 5 säger att de behåller äganderätten till alla monterade och uppkopplade komponenter oavsett om de införskaffats via deras webbshop eller på annat sätt. Sector Alarms punkt 8 säger att larmsystemet vid var tid förblir bolagets egendom och att kunden aldrig förvärvar någon rätt utöver en nyttjanderätt. Verisure erbjuder friköp enligt publicerad trappa, Sector erbjuder ingen friköpsmöjlighet alls. Hos SecuritasHome, Svenska Alarm, Gardio, Garda Alarm och Safeland köper du hårdvaran.",
  },
  {
    question: "Vad kostar det att säga upp ett hemlarm?",
    answer:
      "Minst uppsägningstiden, som är tre månader hos både Verisure och Sector Alarm. Hos Verisure tillkommer antingen nedmontering och retur på egen bekostnad, eller friköp enligt trappan: 7 000 kronor de två första åren, 4 000 kronor vid två till fyra år, 2 000 kronor vid fyra till fem och en krona därefter. Friköp ger dig hårdvaran men enligt Verisure ingen garanterad funktion och ingen app. Ger du inte tillträde till avslutningsbesöket har de rätt att ta ut 7 000 kronor i återtagandeavgift. Hos Sector kostar det 990 kronor om du inte är hemma vid nedmonteringen och 1 990 kronor att få tillbaka nycklar du lämnat in.",
  },
  {
    question: "Garanterar larmbolaget att en väktare kommer?",
    answer:
      "Nej, och båda de stora skriver ut det. Sector Alarms punkt 7 säger att de inte erbjuder utryckningstjänster i alla geografiska områden och att det inte finns någon garanti, varken uttrycklig eller underförstådd, för att en utryckning kommer att utföras. Verisures tjänstevillkor säger att de inte kan garantera fasta utryckningstider och inte heller att polis eller räddningstjänst rycker ut på förmedlade larm. Fråga specifikt om utryckningsberedskap på just din adress.",
  },
  {
    question: "Sänker hemlarm hemförsäkringen?",
    answer:
      "Det vanliga är i stället att larmbolaget ersätter din självrisk. Både Verisure och Sector Alarm ersätter upp till 10 000 kronor, hos Sector per år och inklusive vattenläckage om du har övervakad vattendetektor. Båda kräver att larmet var tillkopplat när skadan skedde. Om din försäkringspremie påverkas är en fråga för försäkringsbolaget, och svaret beror ofta på om anläggningen är utförd av en certifierad anläggarfirma enligt SSF 1015.",
  },
  {
    question: "Vad är skillnaden mot ett larm utan abonnemang?",
    answer:
      "Att någon annan tittar. Ett larm utan abonnemang skickar en notis till din mobil, och sedan är det du som ska bedöma om det är en inbrottstjuv eller katten. Ett abonnemangslarm har en bemannad larmcentral som verifierar larmet, kontaktar dig och vid behov skickar väktare eller polis. Skillnaden i pris är stor: ett Ajax-paket kostar runt 6 000 kronor en gång, ett abonnemang runt 25 000 till 40 000 kronor på fem år. Vi jämför larm utan abonnemang på en egen sida, eftersom det är ett annat köp.",
  },
  {
    question: "Hur lång uppsägningstid har hemlarm?",
    answer:
      "Tre månader hos de bolag som publicerar uppgiften alls, och det är bara tre av de åtta vi jämför. Övriga skriver ingenting om uppsägningstid i den information som går att läsa utan att begära offert, och vi redovisar det som att uppgiften inte publiceras i stället för att gissa. Tre månader betyder i praktiken att en uppsägning kostar ytterligare tre månadsavgifter, mellan 525 och 1 797 kronor beroende på bolag. Räkna in det när du jämför, och läs uppsägningstiden tillsammans med bindningstiden: de är två skilda villkor som läggs på varandra.",
  },
  {
    question: "Vad kostar det billigaste hemlarmet med larmcentral?",
    answer:
      "175 kronor i månaden, hos det billigaste av de bolag som publicerar en månadsavgift. Spannet bland dem som publicerar något är 175 till 599 kronor i månaden. Var noga med att månadsavgiften bara är halva priset: startavgifterna vi kunnat läsa ligger mellan 990 och 5 990 kronor, och det är den summan som avgör vad de första åren kostar. Fyra av åtta bolag publicerar en månadsavgift och bara två publicerar hela priset, både månadsavgift och startavgift, så en jämförelse av enbart månadsavgiften jämför fel sak.",
  },
  {
    question: "Varför är det så svårt att jämföra priser på hemlarm?",
    answer:
      "Därför att branschen inte publicerar dem. Av de åtta bolag vi jämför publicerar bara två hela priset, både månadsavgift och startavgift. Fyra publicerar ett månadstal utan startavgift, och två publicerar ingenting alls utan hänvisar till en offert efter hembesök. Det är också förklaringen till att två jämförelsesajter kan påstå olika saker om samma bolag utan att någon av dem far med osanning: de har fått olika offerter. Vi anger därför uppgiften som att den inte publiceras i stället för att skriva noll kronor, eftersom en nolla ser ut som ett pris och en gissning är sämre än ett tomt fält.",
  },
  {
    question: "Är startavgiften samma sak som vad utrustningen är värd?",
    answer:
      "Nej, och skillnaden kan vara stor. Ett av bolagen i vår jämförelse tar 990 kronor i startavgift vid onlinebeställning för ett startpaket som de själva uppger är värt 5 440 kronor. Det är inte en rabatt på hårdvara utan en subvention som betalas tillbaka genom månadsavgiften, vilket är hela affärsmodellen i kategorin. Praktiskt betyder det två saker. Ett lågt ingångspris säger ingenting om vad fem år kostar, och det förklarar varför bindningstid och friköpsvillkor finns: bolaget har lagt ut en kostnad som ska tjänas in.",
  },
  {
    question: "Vad händer om larmbolaget byter namn eller köps upp?",
    answer:
      "Det sker, och det är svårare att upptäcka än man tror. Under arbetet med den här sidan kontrollerade vi bolagens webbplatser och fann att alertalarm.se numera leder till verisure.se, så varumärket är inte längre ett eget alternativ. En av de svenska jämförelsesajterna länkar fortfarande dit som om det vore ett fristående bolag. För dig som kund betyder ett uppköp i första hand att avtalet följer med, eftersom villkoren är knutna till avtalet och inte till varumärket. Läs därför villkoren du faktiskt skrivit under, med beteckning och utgåva, snarare än vad som står på webbplatsen i dag.",
  },
  {
    question: "Vad är en rimlig månadskostnad för hemlarm?",
    answer:
      "Mellan 175 och 599 kronor bland de bolag som publicerar sin månadsavgift, och medianen ligger närmare mitten av det spannet än den lägre kanten. Men månadsavgiften ensam är inte ett svar på vad larmet kostar. Räkna i stället ut femårskostnaden: startavgift plus sextio månadsavgifter, plus eventuella avgifter vid avslut. Då hamnar de flesta abonnemangslarm mellan 25 000 och 40 000 kronor på fem år, vilket är storleksordningen du bör jämföra mot ett larm utan abonnemang. Vår räknare för femårskostnad gör räkningen åt dig med de publicerade talen.",
  },
];
