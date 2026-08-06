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
 * inte att den är noll. Se `formatFee()` i lib/services.ts, som finns just
 * för att en saknad uppgift aldrig ska renderas som `0 kr`.
 *
 * Talen som sidan bygger på, efter genomgången 2026-08-06:
 *
 * | Publicerar | Antal | Bolag |
 * |---|---|---|
 * | Hela priset, löpande och start | 4 | SecuritasHome, Verisure, Gardio, Safeland |
 * | En löpande avgift | 7 | de fyra ovan plus Avarn, Svenska Alarm, Garda |
 * | Enbart en startavgift | 1 | Sector Alarm |
 *
 * ⚠️ Räkna aldrig löpande avgifter genom att bara titta på `monthlyFee`.
 * Garda Alarm har ingen månadsavgift men två publicerade årsavgifter, och det
 * var precis så bolaget kom att stå som "inget pris publicerat" i tre dygn.
 * Använd `disclosureOf()`, som väger in `annualFee`.
 *
 * ## Samma fel fyra gånger, i fyra olika bolag
 *
 * Gardio 5 augusti, SecuritasHome, Garda Alarm och Safeland 6 augusti: i alla
 * fyra fallen läste vi bolagets sida men inte det dokument eller den butik
 * sidan pekar på, och skrev att en uppgift inte publicerades. **Fem av åtta
 * poster i den här filen har rättats av det skälet.**
 *
 * Talet "publicerar hela priset" har därför rättats uppåt tre gånger på tre
 * dygn: två, tre, fyra. Varje gång var källan något vi redan hade tillgång
 * till. Innan du skriver en ny siffra om prisöppenhet i prosan, härled den ur
 * `disclosureOf()` i stället för ur minnet, och öppna dokumentet.
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
/**
 * Bolag vars villkor och avgifter lästes om den 6 augusti 2026.
 *
 * Fyra av åtta: Garda Alarm, Safeland, Svenska Alarm och Avarn Security. För
 * alla fyra stod uppgifter vi angett som opublicerade i dokument bolaget
 * redan publicerat, i tre fall i ett dokument den här filen redan länkade
 * till. `CHECKED` står kvar på de fyra som inte lästes om.
 */
const RECHECKED = "2026-08-06";

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
      "599 kronor i månaden, 3 990 i start och bindning på bara tolv månader.",
    providerUrl: "https://www.verisure.se/hemlarm",
    checkedAt: CHECKED,
    award: "editor",
    superlative: "Bäst med allt hos ett bolag",
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
      "599 kr i månaden, 3 990 i start och tolv månaders bindning, allt på egen sida",
      "Friköpstrappa från 7 000 kronor, så du vet i förväg vad det kostar att lämna",
      "Bindningstiden kan köpas bort helt mot 2 000 kronor extra i startavgift",
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
      "Verisure Smart Voice kostar 599 kronor i månaden och 3 990 kronor i start vid tolv månaders bindning, eller 5 990 utan bindning alls. Det är dyrast i jämförelsen, cirka 39 900 kronor över fem år.\n\nFör pengarna får du den mest genomarbetade kedjan från larm till väktare: egen larmcentral, dubbla kommunikationsvägar så att ett bredbandsavbrott inte tystar larmet, och självriskeliminering upp till 10 000 kronor om inbrottet ändå sker. Tolv månaders bindning är kortast här, och den går att köpa bort helt mot 2 000 kronor extra i startavgift, vilket ingen annan erbjuder.\n\nDet som drar ned dem är kostnaden att lämna. Verisure behåller äganderätten till komponenterna oavsett om du köpt dem i deras egen webbshop (allmänna villkor 2025:1, p. 5), och ett friköp ger varken garanterad funktion eller tillgång till appen. Du köper alltså loss hårdvara som blir en lokal ljudsignal. Ger du inte tillträde vid avslutningsbesöket kostar det 7 000 kronor i återtagandeavgift.\n\nKöp Verisure om du vill ha hela kedjan hos ett enda bolag och kunna hoppa av efter ett år. Är det femårskostnaden som avgör betalar du nästan hälften så mycket hos SecuritasHome för ett larm med bildverifiering och bevakad larmcentral.",
  },
  {
    id: "securitashome-lilla",
    provider: "SecuritasHome",
    name: "LILLA",
    tagline:
      "349 kronor i månaden och 1 995 för villapaketet, utan hembesök först.",
    providerUrl: "https://www.securitashome.se/abonnemang",
    checkedAt: CHECKED,
    superlative: "Lägst totalkostnad över fem år",
    award: "winner",
    scores: { oppna: 5, lamna: 3.5, larm: 4, larmcentral: 3.5, prisvarde: 4.5 },
    terms: {
      monthlyFee: 349,
      startFee: 1995,
      startFeeLabel: "Startpaket villa, från",
      /* §4.1 i de allmänna villkoren, som produktsidan länkar till: "Avtalet
         gäller i tjugofyra (24) månader räknat från leveransdag och kan
         därefter sägas upp med en (1) månads varsel av vardera part." Vi
         angav båda som opublicerade fram till 2026-08-06. Läst i villkoren
         samma dag. */
      bindingMonths: 24,
      noticeMonths: 1,
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
      "349 kronor i månaden, och 399 för STORA med inspelande kamera",
      "Startpaketet kostar 995, 1 495 eller 1 995 kronor efter boendeform",
      "Runt 22 900 kronor över fem år mot Verisures 39 900, alltså nästan hälften",
      "Bildverifiering ingår i det billigare abonnemanget",
      "Du köper startpaketet i stället för att hyra det",
    ],
    cons: [
      "24 månaders bindningstid, dubbelt mot Verisures tolv",
      "Larmet slutar vara bevakat när avtalet upphör, och du kopplar bort det själv",
      "Larmet är låst till Securitas och går inte att flytta till ett annat bolag",
      "Videokameror med inspelning kräver det dyrare abonnemanget STORA",
    ],
    specs: [
      { label: "Månadsavgift", value: "349 kr (LILLA), 399 kr (STORA)", highlight: true },
      { label: "Startavgift", shortLabel: "Start", value: "Från 1 995 kr för villa", highlight: true },
      { label: "Bindningstid", value: "24 månader", highlight: true },
      { label: "Uppsägningstid", value: "1 månad efter bindningstiden", highlight: true },
      { label: "Äganderätt", value: "Du köper startpaketet", highlight: true },
      { label: "Larmcentral", value: "Securitas larmcentral" },
    ],
    verdict:
      "SecuritasHome LILLA kostar 349 kronor i månaden och 1 995 kronor för villapaketet, och du köper hårdvaran i stället för att hyra den. Över fem år landar det på runt 22 900 kronor mot Verisures 39 900, alltså nästan hälften för ett larm med bevakad larmcentral och fria utryckningar.\n\nStartpaketet delas upp efter boendeform, 995 kronor för lägenhet, 1 495 för radhus och 1 995 för villa, i stället för ett från-pris som växer när säljaren väl sitter i soffan. Bildverifiering ingår redan i det billigare abonnemanget, alltså att larmcentralen ser vad som utlöste larmet innan någon skickas ut. Avtalet löper i 24 månader och kan därefter sägas upp med en månads varsel.\n\nDe 24 månaderna är invändningen. Det är dubbelt mot Verisure, och när avtalet upphör stänger Securitas av SIM-kortet och du kopplar bort utrustningen på egen bekostnad. Du äger lådorna, men de slutar vara ett bevakat larm. Vill du ha inspelande kamera kostar det 399 i månaden i stället för 349.\n\nKöp det här. Det är det billigaste larmet i jämförelsen du kan prisjämföra i förväg, det enda under 25 000 kronor över fem år som har både bildverifiering och egen larmcentral, och du behöver inte släppa in en säljare för att få veta vad det kostar.",
  },
  {
    id: "svenska-alarm",
    provider: "Svenska Alarm",
    name: "Hemlarm",
    tagline:
      "Från 175 kronor i månaden, och hårdvaran är din från dag ett.",
    providerUrl: "https://www.svenskaalarm.se/hemlarm/",
    checkedAt: CHECKED,
    superlative: "Lägst ingångspris i månaden",
    scores: { oppna: 3, lamna: 2.5, larm: 2.5, larmcentral: 3, prisvarde: 4 },
    terms: {
      monthlyFee: 175,
      startFee: null,
      bindingMonths: null,
      /* Allmänna avtalsvillkor 20201216 p. 6.3, läst 2026-08-06: tre månaders
         uppsägningstid, och avtalet förlängs om uppsägning inte sker senast
         tre månader före bindningstidens utgång. Själva bindningstiden står
         bara som "överenskommen bindningstid", alltså i det individuella
         kontraktet, och den är därför fortfarande null. */
      noticeMonths: 3,
      ownership: "kunden",
      termsUrl: "https://www.svenskaalarm.se/villkor/",
      termsVersion: "Allmänna avtalsvillkor 20201216",
      termsCheckedAt: RECHECKED,
    },
    pros: [
      "175 kronor i månaden är det lägsta ingångspriset bland de fem som publicerar ett tal",
      "Du köper hårdvaran och kan delbetala den, så inlåsningen försvinner",
      "Sju separata villkorsdokument publicerade och läsbara utan inloggning",
      "Tre månaders uppsägningstid står skriven i de allmänna villkoren",
    ],
    cons: [
      "175 kronor är ett från-pris och bolaget skriver själv att tjänster tillkommer",
      "Väktartjänsten aktiveras bara om du väljer den skriftligt, annars sker ingen utryckning",
      "Väktarutryckningen utförs av ett bevakningsbolag Svenska Alarm handlar upp åt dig och fritt får byta, och de svarar inte för dess täckning eller tillgång",
      "Delbetalning över 72 månader fungerar som en bindningstid i sex år",
      "Bindningstiden står som \"överenskommen\" i villkoren, alltså i ditt eget kontrakt",
    ],
    specs: [
      { label: "Månadsavgift", value: "Från 175 kr, tjänster tillkommer", highlight: true },
      { label: "Startavgift", shortLabel: "Start", value: "Publiceras inte", highlight: true },
      { label: "Bindningstid", value: "Publiceras inte", highlight: true },
      { label: "Uppsägningstid", value: "3 mån", highlight: true },
      { label: "Äganderätt", value: "Du köper hårdvaran, delbetalning upp till 72 mån", highlight: true },
      { label: "Larmcentral", value: "Bemannad larmcentral som tilläggstjänst" },
      { label: "Villkor", value: "Allmänna avtalsvillkor 20201216, sju dokument" },
    ],
    verdict:
      "Svenska Alarm börjar på 175 kronor i månaden, det lägsta ingångspriset bland bolagen som skriver ut ett tal, och du köper hårdvaran i stället för att hyra den. Bolaget skriver själv att tjänster tillkommer, så 175 är golvet och inte notan.\n\nAtt äga utrustningen är det som skiljer dem från de två stora, och det går att delbetala upp till 72 månader. Uppsägningstiden är tre månader och står i de allmänna villkoren, som ligger publicerade i sju separata dokument utan inloggning. Det är fler villkor än något annat bolag här lägger fram.\n\nLäs villkoren för bemannad larmcentral innan du skriver på, för väktarutryckningen är inte deras. Svenska Alarm handlar upp den åt dig hos ett bevakningsbolag de fritt får byta, och skriver ut att de inte ansvarar för tjänstens fullgörande, kvalitet, täckning eller tillgång. Väljer du inte väktartjänsten skriftligt aktiveras den inte alls. Lägg därtill att en avbetalning över sex år binder dig lika hårt som en bindningstid, fast under ett annat namn.\n\nBegär ett skriftligt totalpris med bevakningsbolaget namngivet innan du skriver på. Utan det köper du 175 kronor i månaden plus ett tillägg ingen ännu satt en siffra på, och en väktartjänst som levereras av någon annan än den du betalar.",
  },
  {
    /* Villkorsfrånvaron är belagd positivt 2026-08-06 genom att räkna upp
       avarnsecurity.se/sitemap.xml i sin helhet: 160 adresser, varav /gdpr/,
       /cookies/ och /integritetspolicy/ men inga allmänna villkor för SAFE
       HOME. Det är rung två i establishing-absence.md och skiljer sig från
       Garda-fallet, där sitemapen räknades upp men sidorna i den inte lästes. */
    id: "avarn-safe-home",
    provider: "Avarn Security",
    name: "SAFE HOME",
    tagline:
      "449 kronor i månaden för en panel som larmar även när tjuven slår sönder den.",
    providerUrl: "https://www.avarnsecurity.se/tjanster/safe-home/",
    checkedAt: RECHECKED,
    superlative: "Bäst för koll på en anhörig",
    scores: { oppna: 3, lamna: 2, larm: 3.5, larmcentral: 3.5, prisvarde: 3.5 },
    terms: {
      monthlyFee: 449,
      startFee: null,
      bindingMonths: null,
      noticeMonths: null,
      ownership: "bolaget",
      termsCheckedAt: RECHECKED,
    },
    included: [
      "Centralenhet med 7-tumsskärm och Crash and smash",
      "PIR-kameror med visuell verifiering",
      "Rökdetektor",
      "Magnetkontakter",
      "Inaktivitetslarm",
    ],
    pros: [
      "449 kronor i månaden står utskrivet på tjänstesidan",
      "Crash and smash: slås panelen sönder registreras inkräktaren ändå och larmcentralen får besked",
      "Inaktivitetslarm som säger till när ingenting hänt i bostaden på ett tag",
      "En enda centralenhet räcker till hela bostaden, vilket ger färre saker som kan tappa kontakten",
      "Bilder skickas direkt vid larm, och husdjur upp till normal storlek utlöser inte detektorerna",
    ],
    cons: [
      "Inga avtalsvillkor publicerade, så bindningstid och uppsägningstid får du veta först vid hembesöket",
      "Ingen startavgift publicerad, vilket gör att första årets kostnad inte går att räkna",
      "Utrustningen förblir bolagets, det finns ingen publicerad friköpsmöjlighet",
      "Inspelning kräver tillval, och Yale Doorman och vattendetektor kostar extra",
    ],
    specs: [
      { label: "Månadsavgift", value: "449 kr", highlight: true },
      { label: "Startavgift", shortLabel: "Start", value: "Publiceras inte", highlight: true },
      { label: "Bindningstid", value: "Publiceras inte", highlight: true },
      { label: "Uppsägningstid", value: "Publiceras inte", highlight: true },
      { label: "Äganderätt", value: "Avarn äger, friköp erbjuds inte", highlight: true },
      { label: "Larmcentral", value: "Avarns egen, hela leveransen i egen regi" },
      { label: "Sabotageskydd", value: "Crash and smash i panelen" },
    ],
    verdict:
      "Avarn SAFE HOME kostar 449 kronor i månaden och bygger på en enda centralenhet med sjutumsskärm för hela bostaden. Startavgiften står ingenstans, så vad det första året landar på får du veta av en säljare.\n\nPanelen har Crash and smash, alltså att en inkräktare som slår sönder den ändå registreras och larmcentralen får besked omedelbart. Det är den vanligaste attacken mot ett hemlarm och de är ensamma här om att skriva ut skyddet mot den. PIR-kamerorna skickar bild direkt vid larm så att larmcentralen ser vad som hänt innan någon skickas ut, och husdjur utlöser dem inte. Ovanpå inbrottslarmet ligger ett inaktivitetslarm som säger till när ingenting rört sig i bostaden på ett tag, vilket är den funktion man skaffar när det är en förälder som bor ensam och inte en villa som står tom.\n\nSedan tar öppenheten slut. Det finns inga publicerade avtalsvillkor alls, alltså ingen bindningstid, ingen uppsägningstid och inget om vad som gäller när du vill sluta. Utrustningen förblir Avarns och någon friköpsmöjlighet finns inte skriven någonstans, så kostnaden att lämna är okänd tills du sitter med papperet framför dig.\n\nSka du bara skydda ett hem mot inbrott betalar du hundra kronor för mycket i månaden. Samma bildverifierade kedja finns för 349 hos SecuritasHome, med bindningstid och uppsägningstid utskrivna innan du bokar något möte. Avarn är värt sitt pris först när det är inaktivitetslarmet du egentligen köper.",
  },
  {
    id: "sector-alarm",
    provider: "Sector Alarm",
    name: "Hemlarm",
    tagline:
      "22 paragrafer avtal med varje avgift angiven i kronor, och startpaket för 990.",
    providerUrl: "https://www.sectoralarm.se/hemlarm/",
    checkedAt: CHECKED,
    superlative: "Bäst för dig som läser avtalet",
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
      "Sector Alarm ger dig det mest genomarbetade avtalet i branschen och det minst kompletta priset. Startpaketet kostar 990 kronor vid onlinebeställning, månadsavgiften står ingenstans, och det är den största enskilda posten i hela affären.\n\nAvtalet är däremot 22 paragrafer i en daterad pdf med utgåva, med avgifterna angivna i kronor och ett ansvarstak på 100 000 kronor utskrivet. Larmet går till en egen larmcentral på Honeywell-hårdvara, och självriskelimineringen sträcker sig till 10 000 kronor per år och täcker även vattenläckage om du har övervakad vattendetektor. Installationen kan delas upp på fyra räntefria betalningar.\n\nSlutklausulerna är de hårdaste av alla åtta. Larmsystemet förblir bolagets egendom och du förvärvar aldrig någon rätt utöver nyttjanderätten (p. 8), alltså finns ingen friköpsmöjlighet över huvud taget. Nycklar du lämnat in förstörs utan förvarning om du inte skriftligen ber att få dem tillbaka, och returen kostar då 1 990 kronor (p. 12.3). Priset får dessutom ändras redan tolv månader efter påskrift.\n\nSector Alarm är för den som faktiskt läser avtalet. Gör du inte det köper du kategorins hårdaste slutklausuler utan att märka det, och du gör det dessutom utan att veta månadsavgiften förrän en säljare räknat fram den åt dig.",
  },
  {
    /* ⚠️ RÄTTAD 2026-08-05. Posten påstod "Inget pris publicerat någonstans på
       sajten" och gav 2,0 på öppenhet. Det var fel, och felet var vårt eget
       sätt att leta: någon läste gardio.se, såg ingen prislapp på förstasidan
       och skrev en slutsats om hela sajten.

       Vad som faktiskt står där, maskinläst ur deras egen JSON-LD samma dag:
       elva av elva produkter har pris. Hemlarmet heter "Gardio hemlarm med två
       HD-kameror och väktare", kostar 249,00 kr/månad, har 24 månaders
       bindningstid och ingen startavgift. Sajten är WooCommerce med publik
       sitemap på /wp-sitemap.xml.

       Leta aldrig efter ett pris på en förstasida. Leta i sitemapen, i
       butiken och i strukturerad data. */
    id: "gardio",
    provider: "Gardio",
    name: "Hemlarm med två HD-kameror och väktare",
    shortName: "Hemlarm med väktare",
    tagline:
      "249 kronor i månaden med två kameror och fria utryckningar, utan startavgift.",
    providerUrl:
      "https://gardio.se/produkt/gardio-trygg-larmadress-avarn/",
    checkedAt: CHECKED,
    superlative: "Bäst med kameror i avgiften",
    scores: { oppna: 5, lamna: 3, larm: 3.5, larmcentral: 3, prisvarde: 4.5 },
    terms: {
      monthlyFee: 249,
      /* Noll och inte null. "Ingen startavgift" står utskrivet på
         produktsidan, alltså är det en uppgift och inte en lucka. */
      startFee: 0,
      bindingMonths: 24,
      noticeMonths: 3,
      ownership: "kunden",
      termsUrl: "https://gardio.se/villkor",
      termsCheckedAt: CHECKED,
    },
    pros: [
      "Månadsavgift, bindningstid och startavgift står på produktsidan",
      "Fullständiga allmänna villkor publicerade och läsbara utan inloggning",
      "Fria väktarutryckningar anges, vilket ingen annan skriver ut",
      "Två HD-kameror ingår i månadsavgiften, ingen startavgift",
      "Villkoren förutser att äganderätten övergår till kunden vid köp",
    ],
    cons: [
      "24 månaders bindningstid, den längsta av de åtta",
      "Larmcentralen är Avarn, alltså inköpt kapacitet och inte egen",
      "Priset står i butiken men inte på de två sidor som förklarar larmet",
    ],
    specs: [
      { label: "Månadsavgift", value: "249 kr", highlight: true },
      { label: "Startavgift", shortLabel: "Start", value: "Ingen", highlight: true },
      { label: "Bindningstid", value: "24 mån", highlight: true },
      { label: "Uppsägningstid", value: "Normalt 3 mån enligt villkoren", highlight: true },
      { label: "Äganderätt", value: "Övergår till kunden vid köp", highlight: true },
      { label: "Ingår", value: "Två HD-kameror, app, Avarn larmcentral" },
      { label: "Väktarutryckning", value: "Ingår, anges som fri" },
    ],
    verdict:
      "Gardio kostar 249 kronor i månaden, har ingen startavgift alls och binder dig i 24 månader. Det är billigast i månaden av allt som har bevakad larmcentral, och du kan räkna på det utan att lämna ifrån dig ett telefonnummer. Verisure publicerar också hela sitt pris, men Verisure kostar 599 i månaden plus 3 990 kronor i startavgift, alltså nästan tre gånger så mycket över fem år.\n\nI månadsavgiften ingår två HD-kameror och Avarns larmcentral, och väktarutryckningarna anges som fria. Det sista är värt att stanna vid: inget avtal här garanterar utryckning, och Gardio är ensamma om att skriva att den inte kostar extra när den väl sker.\n\nDet som drar ned är bindningstiden. 24 månader är dubbelt mot Verisures tolv och det längsta någon i jämförelsen kräver. Larmcentralen är dessutom inköpt kapacitet snarare än egen, vilket varken är bra eller dåligt i sig men lägger ett led till i ansvarskedjan.\n\nTill 249 kronor i månaden utan startavgift gör Gardio samma jobb som Verisure gör för 599 plus 3 990, alltså för under en tredjedel över fem år. Klarar du två års bindning finns det inget billigare sätt att få två kameror och en bevakad larmcentral.",
  },
  {
    /* ⚠️ RÄTTAD 2026-08-06, andra gången. Posten påstod "Inget pris
       publicerat", "Ingen uppgift om vad larmcentralstjänsten kostar" och att
       inget avtal fanns att läsa. Allt tre var fel.

       Villkorsdokumentet vi själva länkade till i `termsUrl` innehåller
       priset: punkt 2.5 anger 1 199 kr per år för säkerhetsavtalet för
       privatkunder. Punkt 14.1 anger 36 månaders bindningstid och tre
       månaders uppsägningstid med ett års förlängning. Bolagets egen sida
       /kop-hemlarm.html och kundtjänstsidan /kundtjanst-avtal.html anger
       serviceavtalet till 695 kr/år efter ett kostnadsfritt första år.

       Rättelsen den 6 augusti slog fast att Garda inte publicerar något pris,
       "fastställt genom att gå igenom bolagets sitemap". Sitemapen räknades
       upp men sidorna i den lästes inte. Att räkna upp en sitemap är rung två
       i establishing-absence.md, inte sista rungen. */
    id: "garda-alarm",
    provider: "Garda Alarm",
    name: "Hemlarm utan månadskostnad",
    shortName: "Utan månadskostnad",
    tagline:
      "Ingen månadsavgift alls, 1 199 kronor om året för larmcentralen.",
    providerUrl: "https://www.gardaalarm.se/",
    checkedAt: RECHECKED,
    superlative: "Lägst löpande kostnad",
    scores: { oppna: 3.5, lamna: 2.5, larm: 3, larmcentral: 3, prisvarde: 4 },
    terms: {
      monthlyFee: null,
      /* Punkt 2.5: "Kunden ska som privatkund betala en kostnad till Garda som
         f.n. är 1199 kr per år för säkerhetsavtalet." Säkerhetsavtalet är
         uppkopplingen mot larmcentral enligt punkt 15. */
      annualFee: 1199,
      annualFeeLabel: "Säkerhetsavtal, uppkoppling mot larmcentral, per år",
      startFee: null,
      bindingMonths: 36,
      noticeMonths: 3,
      excessCover: 3000,
      ownership: "kunden",
      withdrawalDays: 14,
      exitFees: [
        {
          label:
            "Återstående månadsavgifter av bindningstiden om avtalet sägs upp för utebliven betalning",
          amount: null,
          source: "Villkor för hemlarm, p. 5.5",
          conditional: true,
        },
        {
          label:
            "Obligatoriskt servicebesök om serviceavtalet ska tecknas igen i efterhand",
          amount: 995,
          source: "gardaalarm.se/kundtjanst-avtal.html",
          conditional: true,
        },
      ],
      /* Hittad 2026-08-05, läst i sin helhet 2026-08-06. Inte länkad från
         sajten, men indexerad och nåbar, alltså läsbar för den som söker. */
      termsUrl:
        "https://www.gardaalarm.se/uploads/1/3/5/0/135017696/garda_alarm_-_villkor_f%C3%B6r_hemlarm.pdf",
      termsCheckedAt: RECHECKED,
    },
    included: [
      "Garda Home-panel med 7-tumsskärm",
      "IR-kamera med bildverifiering och mörkerseende",
      "Rökdetektor",
      "Magnetkontakter",
      "Skyltar och dekaler",
    ],
    pros: [
      "Ingen månadsavgift: larmcentralen kostar 1 199 kronor om året, alltså 100 i månaden",
      "Du äger larmsystemet, så det följer med vid flytt och kan överlåtas till nästa ägare",
      "Serviceavtalet ingår första året och ger fri service, fri support och tio års materialgaranti",
      "Bildverifiering, så larmcentralen ser vad som utlöste larmet innan åtgärd skickas",
      "Lövestad Larmcentral tar emot larmet dygnet runt, certifierad enligt SSF och SBSC",
    ],
    cons: [
      "36 månaders bindningstid på tjänsterna, den längsta i jämförelsen",
      "Säger du inte upp tre månader före avtalstidens slut förlängs avtalet ett år i taget",
      "Självriskelimineringen slutar vid 3 000 kronor, mot 10 000 hos Verisure och Sector Alarm",
      "Kopplar du in utrustning från någon annan leverantör upphör garantin på hela systemet",
      "Priset på själva larmet får du först efter hembesök, och uppsägning sker bara per telefon",
    ],
    specs: [
      { label: "Månadsavgift", value: "Ingen, 1 199 kr/år för larmcentralen", highlight: true },
      { label: "Startavgift", shortLabel: "Start", value: "Publiceras inte", highlight: true },
      { label: "Bindningstid", value: "36 mån", highlight: true },
      { label: "Uppsägningstid", value: "3 mån, annars förlängs avtalet ett år", highlight: true },
      { label: "Äganderätt", value: "Du äger larmsystemet", highlight: true },
      { label: "Självriskeliminering", value: "Upp till 3 000 kr" },
      { label: "Larmcentral", value: "Lövestad Larmcentral, SSF- och SBSC-certifierad" },
      { label: "Serviceavtal", value: "Ingår år 1, sedan 695 kr/år" },
      { label: "Villkor", value: "Villkor för hemlarm, odaterad utgåva" },
      { label: "Ansvarstak", value: "50 000 kr enligt p. 9.1" },
      { label: "Ångerrätt", value: "14 dagar, hämtning utan kostnad" },
    ],
    verdict:
      "Garda Alarm säljer larmet i stället för att hyra ut det, och tar 1 199 kronor om året för uppkopplingen mot larmcentral i stället för en månadsavgift. Priset på själva hårdvaran sätts efter ett hembesök, så vad det första året kostar vet du inte förrän säljaren räknat.\n\nÅrsavgiften är den lägsta löpande kostnaden i jämförelsen med bred marginal: 1 199 kronor om året är 100 kronor i månaden mot Verisures 599. Serviceavtalet ingår första året och kostar sedan 695 kronor om året, och ger fri service, fri teknisk support och materialgaranti i tio år. Larmet går till Lövestad Larmcentral, som verifierar med bild innan väktare eller räddningstjänst skickas. Att du äger systemet betyder att det följer med vid flytt och inte slutar fungera för att du säger upp bevakningen.\n\nBindningen är 36 månader på tjänsterna, längst av alla åtta, och avtalet förlängs ett år i taget om du inte säger upp det tre månader före avtalstidens utgång (punkt 14.1). Självriskelimineringen slutar vid 3 000 kronor mot 10 000 hos de två stora, och kopplar du in en enda enhet från någon annan leverantör upphör garantin på hela systemet.\n\nKöp det här om du vet att du bor kvar i tre år och vill ned till knappt 1 900 kronor om året när serviceavtalet börjar faktureras. Är du osäker på hur länge du bor kvar tar du Safeland, som är det enda avtalet här utan bindningstid.",
  },
  {
    /* ⚠️ RÄTTAD 2026-08-06. Posten angav bindningstid och uppsägningstid som
       opublicerade, äganderätten som kundens och larmcentralen som frånvarande
       i grunderbjudandet. Safeland publicerar fyra villkorsdokument på
       safeland.se/se/villkor, och de säger något annat:

       - Tjänstevillkoren p. 9: "Avtalet har ingen bindningstid eller
         uppsägningstid förutsatt att du inte betalar med avbetalning."
       - Särskilda villkor för abonnemang av larmsystem 1.5: systemet **hyrs**,
         inte köps. "Du kan närsomhelst säga upp hyresavtalet."
       - Tjänstevillkoren p. 6.2: larmcentralen finns som tilläggstjänst och
         levereras av Westra Security. Utryckning är kostnadsfri vid bekräftat
         inbrott och kostar annars 2 400 kr.

       Ingen av uppgifterna krävde mer än att öppna villkorssidan i sidfoten.

       ⚠️ Priset stod i webbutiken på shop.safeland.se, som är en egen
       subdomän och inte länkad från larmsidorna annat än via ordet Webbshop i
       sidfoten. "Larmpaket med abonnemang": 249 kr/mån ordinarie och 3 990 kr
       i start, samt "Ingen bindningstid, ingen uppsägningstid" ordagrant.
       Larmcentral med väktare är en separat produkt, 1 490 kr för 12 månader.

       Det sista är det som gör priset jämförbart: de 249 kronorna är larmet
       utan larmcentral, och sidan jämför abonnemangslarm **med** larmcentral.
       Femårskostnaden är därför 249 × 60 + 1 490 × 5 + 3 990 = 26 380 kr. */
    id: "safeland",
    provider: "Safeland",
    name: "Larm med lokal respons",
    shortName: "Lokal respons",
    tagline:
      "249 kronor i månaden utan bindningstid och utan uppsägningstid.",
    providerUrl: "https://shop.safeland.se/se/butik/ajax/larm-bas-med-abonnemang/",
    checkedAt: RECHECKED,
    superlative: "Bäst utan bindningstid",
    scores: { oppna: 5, lamna: 4.5, larm: 2.5, larmcentral: 3, prisvarde: 3.5 },
    terms: {
      /* Butikens ordinarie pris. Kampanjen samma dag var 198 kr/mån och
         2 490 kr i start, men ett kampanjpris åldras fortare än sidan gör och
         skulle dessutom räkna ned femårskostnaden med drygt 6 000 kronor. */
      monthlyFee: 249,
      /* Larmcentral med väktare säljs som en egen tjänst, 12 månader
         förbetalt. Den ingår alltså inte i de 249 kronorna, och utan den här
         raden jämför femårsräknaren ett larm utan larmcentral med sju som har
         en. Se totalCost() i lib/services.ts. */
      annualFee: 1490,
      annualFeeLabel: "larmcentral och väktare, 12 månader förbetalt",
      startFee: 3990,
      startFeeLabel: "Larmpaket med abonnemang, ordinarie",
      /* Noll och inte null. "Ingen bindningstid eller uppsägningstid" står
         utskrivet i tjänstevillkoren p. 9, alltså är det en uppgift och inte
         en lucka. Undantaget bolaget själv anger: avbetalning på hårdvaran. */
      bindingMonths: 0,
      noticeMonths: 0,
      invoiceFee: 49,
      ownership: "bolaget",
      withdrawalDays: 14,
      exitFees: [
        {
          label:
            "Nedmontering, paketering och retur av samtliga komponenter, på din bekostnad",
          amount: null,
          source: "Särskilda villkor för abonnemang av larmsystem 1.5",
          conditional: false,
        },
        {
          label: "Slitage utöver normalt bruk vid återlämning",
          amount: null,
          source: "Särskilda villkor för abonnemang av larmsystem 1.5",
          conditional: true,
        },
        {
          label: "Returkostnad när du minskar antalet hyrda komponenter",
          amount: 99,
          source: "Särskilda villkor för abonnemang av larmsystem 1.5",
          conditional: true,
        },
      ],
      termsUrl: "https://www.safeland.se/se/villkor/",
      termsVersion: "Abonnemangsvillkor 1.5",
      termsCheckedAt: RECHECKED,
    },
    pros: [
      "Varken bindningstid eller uppsägningstid, du säger upp hyresavtalet när du vill",
      "249 kronor i månaden och 3 990 i start står i butiken, och larmcentralen prissätts separat",
      "Ajax Hub 2 Plus i säkerhetsklass Grad 2, med larmväg över både ethernet, wifi och 4G",
      "Hyran täcker hårdvara, mobil datatrafik, support och full garanti hela tiden",
      "Kvarterskollen larmar grannar och anhöriga parallellt, alltså folk som redan är på plats",
    ],
    cons: [
      "Larmcentral med väktare kostar 1 490 kronor om året extra och ingår inte i månadsavgiften",
      "2 400 kronor för en väktarutryckning som inte kan styrkas med polisanmälan",
      "Väktarutryckning kan nekas där inget väktarbolag finns i närheten av din ort",
      "Du hyr utrustningen och monterar ned och returnerar den själv vid uppsägning",
      "Larmcentralen köps tolv månader i taget, vilket binder den delen trots att larmet inte binder",
    ],
    specs: [
      { label: "Månadsavgift", value: "249 kr, larmcentral 1 490 kr/år extra", highlight: true },
      { label: "Startavgift", shortLabel: "Start", value: "3 990 kr", highlight: true },
      { label: "Bindningstid", value: "Ingen", highlight: true },
      { label: "Uppsägningstid", value: "Ingen, säg upp när du vill", highlight: true },
      { label: "Äganderätt", value: "Du hyr, friköp erbjuds", highlight: true },
      { label: "Larmcentral", value: "Westra Security, tillval 1 490 kr/år" },
      { label: "Väktarutryckning", value: "Fri vid polisanmält inbrott, annars 2 400 kr" },
      { label: "Säkerhetsklass", value: "Grad 2, Ajax Hub 2 Plus" },
      { label: "Villkor", value: "Abonnemangsvillkor 1.5, tjänstevillkor" },
      { label: "Ångerrätt", value: "14 dagar" },
    ],
    verdict:
      "Safeland hyr ut ett Ajax-system för 249 kronor i månaden med 3 990 kronor i start, och binder dig inte alls. Larmcentral med väktare är en egen tjänst som kostar 1 490 kronor om året, så räknat med den landar fem år på cirka 26 400 kronor.\n\nAtt avtalet varken har bindningstid eller uppsägningstid är unikt här och står både i tjänstevillkoren och rakt ut i butiken. Du säger upp när du vill, skickar tillbaka lådorna och slutar betala. Prishöjningar är dessutom tak-satta till konsumentprisindex eller 5 procent om året och får inte ske alls de första tolv månaderna, vilket inget annat bolag lovar. Hyran täcker hårdvaran, mobil datatrafik, support och full garanti så länge du är kund, och hubben larmar ut över ethernet, wifi och 4G. Ovanpå det ligger Kvarterskollen, som larmar grannar och anhöriga samtidigt som larmcentralen.\n\nUtryckningen är den svaga länken. En väktarutryckning är kostnadsfri bara om inbrottet styrks med polisanmälan, annars kostar den 2 400 kronor, och Safeland får neka utryckning helt där de saknar väktarbolag i närheten av din ort. Larmcentralen drivs inte av dem utan av Westra Security, och den köps tolv månader i taget, så just den delen binder dig ändå.\n\nBor du i hyresrätt, vet inte hur länge du blir kvar eller vill kunna byta bolag utan att räkna på avhoppet finns det inget bättre val på den här sidan. Är du beredd att binda dig två år för att slippa fundera på om utryckningen kostar 2 400 kronor är SecuritasHome billigare och enklare.",
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
      "Mellan 175 och 599 kronor hos de fem bolag som publicerar ett månadstal: Svenska Alarm från 175 kronor med tillägg, Gardio 249, SecuritasHome 349 för LILLA och 399 för STORA, Avarn Security 449 och Verisure 599. Garda Alarm har ingen månadsavgift alls utan tar 1 199 kronor om året för uppkopplingen mot larmcentral, plus 695 kronor om året för serviceavtalet efter det första året. Safeland tar 249 kronor i månaden för larmet och 1 490 kronor om året för larmcentral med väktare. Sector Alarm är ensamma om att inte publicera någon löpande avgift alls. Till den löpande avgiften kommer nästan alltid en startavgift, och den varierar från 990 kronor hos Sector till 5 990 hos Verisure om du väljer bort bindningstiden.",
  },
  {
    question: "Har hemlarm bindningstid?",
    answer:
      "Det beror på vad du väljer, och hos Verisure är valet prissatt: uppkopplingen kostar 3 990 kronor med tolv månaders bindningstid och 5 990 kronor utan. Friheten kostar alltså 2 000 kronor. Sector Alarms avtalsvillkor anger 24 månaders bindningstid enbart för företagskunder och för privatkunder bara att uppsägningstiden gäller med undantag för eventuell bindningstid. Verisures egenmonterade larm är däremot bindande i 24 kalendermånader enligt punkt 15 i dess villkor. Spannet i övrigt är stort: Safeland har varken bindningstid eller uppsägningstid, SecuritasHome och Gardio binder i 24 månader, och Garda Alarm i 36 med förlängning ett år i taget om uppsägningen kommer senare än tre månader före avtalstidens slut. Kräv siffran skriftligt innan du skriver under.",
  },
  {
    question: "Äger jag larmet eller hyr jag det?",
    answer:
      "Hos de två största hyr du det. Verisures allmänna villkor punkt 5 säger att de behåller äganderätten till alla monterade och uppkopplade komponenter oavsett om de införskaffats via deras webbshop eller på annat sätt. Sector Alarms punkt 8 säger att larmsystemet vid var tid förblir bolagets egendom och att kunden aldrig förvärvar någon rätt utöver en nyttjanderätt. Verisure erbjuder friköp enligt publicerad trappa, Sector erbjuder ingen friköpsmöjlighet alls. Hos SecuritasHome, Svenska Alarm, Gardio och Garda Alarm köper du hårdvaran. Safeland hyr ut sitt system, med mobil datatrafik, support och full garanti inräknade i hyran, och erbjuder friköp mot ett pris du får på förfrågan. Avarn Security publicerar ingen uppgift om saken.",
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
      "Tre månader är det vanliga och gäller hos Verisure, Sector Alarm, Gardio, Svenska Alarm och Garda Alarm. SecuritasHome har en månad efter bindningstidens slut, och Safeland skriver både i tjänstevillkoren och i sin butik att avtalet varken har bindningstid eller uppsägningstid. Avarn Security är det enda bolaget som inte publicerar uppgiften alls. Tre månader betyder i praktiken att en uppsägning kostar ytterligare tre månadsavgifter, mellan 525 och 1 797 kronor beroende på bolag. Läs uppsägningstiden tillsammans med bindningstiden: de är två skilda villkor som läggs på varandra, och hos Garda Alarm förlängs avtalet ett helt år om uppsägningen kommer för sent.",
  },
  {
    question: "Vad kostar det billigaste hemlarmet med larmcentral?",
    answer:
      "Räknat på hela femårskostnaden är Gardio billigast: 249 kronor i månaden utan startavgift blir 14 940 kronor på fem år, med två HD-kameror och bevakad larmcentral. Därefter kommer SecuritasHome på cirka 22 900 kronor och Safeland på cirka 26 400 med larmcentral inräknad. Räknat i enbart löpande avgift är Garda Alarm lägst med 1 199 kronor om året för larmcentralen plus 695 för serviceavtalet, men deras hårdvarupris publiceras inte och betalas separat, så femårskostnaden går inte att räkna. Var noga med att den löpande avgiften bara är halva priset: startavgifterna ligger mellan noll och 5 990 kronor, och det är den summan som avgör vad de första åren kostar.",
  },
  {
    question: "Varför är det så svårt att jämföra priser på hemlarm?",
    answer:
      "Därför att branschen publicerar halva svaret, och den halva som finns ligger sällan där man letar. Av de åtta bolag vi jämför publicerar bara fyra hela priset, både löpande avgift och startavgift. Tre till publicerar en löpande avgift men ingen startavgift, och Sector Alarm publicerar bara ett startpaketspris. Det är också förklaringen till att två jämförelsesajter kan påstå olika saker om samma bolag utan att någon av dem far med osanning: de har fått olika offerter. Ett tips som gäller hela kategorin: leta i avtalsvillkoren och i webbutiken, inte på prissidan. Garda Alarms årsavgift står i punkt 2.5 i villkoren och ingen annanstans, och Safelands månadsavgift står i deras webbutik på en egen subdomän. Vi anger uppgiften som att den inte publiceras i stället för att skriva noll kronor, eftersom en nolla ser ut som ett pris och en gissning är sämre än ett tomt fält.",
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
