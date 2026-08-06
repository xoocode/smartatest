import type { TestPage } from "@/lib/products";
import type { Crumb } from "@/components/site/breadcrumbs";
import {
  ELEKTRONIK,
  HEM_HUSHALL,
  KOK,
  liveTestPages,
  SAKERHET,
  SMART_HEM,
} from "@/lib/catalog";

/**
 * The breadcrumb trail for a category page, minus "Hem" which Breadcrumbs
 * prepends. Centralised so every category page produces an identical trail and
 * a new group never has to be wired up page by page.
 */
export function testPageTrail(testPage: TestPage): Crumb[] {
  const trail: Crumb[] = [];
  if (testPage.category) {
    trail.push({
      label: testPage.category.label,
      href: testPage.category.href,
    });
  }
  trail.push({ label: testPage.label });
  return trail;
}

/**
 * Scoring models per category.
 *
 * Weights must sum to 100. `MethodologyBlock` renders a visible warning if they
 * do not, because a category whose weights drift is a silent scoring bug.
 */
/**
 * Smart belysning.
 *
 * ## testomdome infördes retroaktivt 2026-08-01
 *
 * Kriteriet lades till enligt IDÉ-007, efter att det redan fanns på
 * /smart-plug och /smart-strombrytare. Vikten är 15, satt efter samma regel
 * som på strömbrytarsidan: den följer hur mycket underlag kategorin faktiskt
 * har, inte en konstant över hela sajten. Två av fem lampor har ett publicerat
 * omdöme om just den produkt vi rankar. Övriga fyra kriterier skalades ned
 * proportionellt från 25/20/20/15/20 för att ge plats.
 *
 * ## Varför IKEA räknas som otestad trots att tester nämner Trådfri
 *
 * Tek.nos samletest är från 2017 och Dinsides duell från 2019. Båda handlar om
 * Trådfri-systemet i dess tidiga år, inte om den TRÅDFRI E27 med vitt spektrum
 * som säljs i dag. Vi har gjort samma bedömning två gånger tidigare: Shelly
 * Plug S testades i föregående generation, och Hemmastyrning testade Plejd
 * DIM-01 och inte CTR-01 som vi rankar.
 *
 * Beslutet är värt att känna till eftersom alternativet gav ett sämre utfall.
 * Lät man 2017 års omdöme räknas passerade TP-Link Tapo, som saknar oberoende
 * test helt, den IKEA-lampa som faktiskt har ett. Ett kriterium som belönar
 * otestade produkter framför testade motverkar sitt eget syfte.
 */
export const SMART_BELYSNING: TestPage = {
  slug: "smart-belysning",
  label: "Smart belysning",
  title: "Bäst i test smart belysning 2026",
  category: SMART_HEM,
  methodology:
    "Vi jämför smarta lampor på specifikationer, publicerade mätvärden och resultat från oberoende tester i Sverige och Norden. Alla lampor bedöms mot samma kriterier och samma viktning, och källorna finns länkade längre ner på sidan.\n\nFärgåtergivning, rött index, ljusflöde och viloförbrukning är hämtade ur tillverkarnas egna registreringar i EU:s energimärkningsregister EPREL, inte ur butikernas produktdatabaser. Skälet är att de sistnämnda visade sig ha fel: en av lamporna hade fyra felaktiga tal i sin butiksspecifikation. Ljusflödet är användbart ljusflöde enligt samma mätmetod för alla fem, vilket inte alltid är talet på förpackningen.\n\nSaknar en lampa ett publicerat omdöme om just den modellen står det Ej testat på raden, i stället för ett gissat betyg, och kriteriet ger då noll poäng. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "fargatergivning",
      label: "Färgåtergivning",
      weight: 19,
      description:
        "CRI och rött index ur tillverkarnas EU-registreringar, vägt mot hur långt färgtemperaturen sträcker sig i den varma änden. Väger tyngst eftersom det är den skillnad du ser varje dag, i maten på bordet och i hudton.\n\nTalet följer inte priset. Nanoleaf anger 91, IKEA 90 och Philips Hue, WiZ och TP-Link 80. **Rött index skiljer ännu mer:** Nanoleaf deklarerar 52, medan Signify anger 0 för både Hue och WiZ. Ett högt CRI kan dölja ett uselt R9, och det är R9 som avgör om kött och hudton ser levande ut.",
    },
    {
      key: "dimring",
      label: "Dimring",
      weight: 16,
      description:
        "Hur lågt lampan går att dimra innan den flimrar eller slocknar, enligt tillverkarens uppgift och rapporterat flimmer i publicerade tester.",
    },
    {
      key: "anslutning",
      label: "Anslutning och stabilitet",
      weight: 15,
      description:
        "Protokoll, räckvidd och rapporterad stabilitet. Zigbee och Thread bygger ett eget nät mellan lamporna och får högre betyg än Wi-Fi när antalet enheter växer.",
    },
    {
      key: "testomdome",
      label: "Omdöme i oberoende tester",
      weight: 13,
      description:
        "Hur lampan bedömts av de oberoende testare vi citerar i källistan. Råd & Rön utser Philips Hue till Bäst i test och ger WiZ utmärkelsen Bra köp.\n\nÖvriga tre saknar ett publicerat omdöme om just den modell vi rankar, och då står det Ej testat på raden i stället för ett gissat betyg. **Till skillnad från andra kategorier fördelas vikten inte om här.** En lampa utan omdöme får noll poäng på kriteriet och bedöms mot samma 100 som alla andra, eftersom omfördelningen annars delar ut 15 poäng gratis till just de lampor ingen mätt.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 13,
      description:
        "Pris per lampa vägt mot betygen i övriga kriterier, inte mot varumärket. En dyr lampa kan få högt betyg om resultaten motiverar priset.",
    },
    {
      key: "flimmer",
      label: "Flimmer",
      weight: 12,
      description:
        "Hur mycket ljuset pulserar. All LED pulserar, och frågan är bara hur djupt och hur långsamt. Måttet heter PstLM, det är obligatoriskt att deklarera sedan ekodesignförordningen 2019/2020 och det står i EU:s produktregister EPREL för varenda lampa här. Talet väger in pulsens djup, kurvform och frekvens på en gång, vilket är skälet att vi inte redovisar hertz separat: ingen tillverkare publicerar frekvensen, och PstLM innehåller den redan.\n\nGränsen är 1,0, och den är satt vid den nivå där ungefär hälften av alla som tittar börjar se flimret. Nanoleaf och Tapo deklarerar 0,1, alltså en tiondel av det tillåtna. Hue, WiZ och IKEA deklarerar exakt 1,0.\n\n⚠️ Läs det senare talet försiktigt. Tre tillverkare som alla landar precis på gränsvärdet ser mer ut som en försiktig deklaration än som tre mätningar, och EPREL kräver inte att man skriver ut vilket som är vilket. Vi betygsätter det som deklarerats, eftersom det är vad som binder tillverkaren, men skillnaden mellan 0,1 och 1,0 säger säkrare att de två första ligger lågt än att de tre andra ligger högt. Kriteriet väger därför 12 och inte mer.\n\nVad det betyder för dig: flimmer under gränsen ser nästan ingen medvetet. Det man märker är trötta ögon efter en kväll i rummet, huvudvärk, och för den som får migrän kan det vara en utlösande faktor. IEEE:s rekommendation 1789-2015 räknar upp ansträngda ögon, huvudvärk, migrän och sämre koncentration. Anfall hos den som har fotosensitiv epilepsi hör till frekvenser mellan 3 och 70 hertz och till lampor som gått sönder, inte till lampor som fungerar och håller EU-gränsen. Ingen lampa på den här sidan är farlig.",
    },
    {
      key: "ljusstyrka",
      label: "Ljusstyrka",
      weight: 12,
      description:
        "Angivet ljusflöde i lumen vägt mot effekten, och hur väl uppgiften stämmer i oberoende mätningar. Avvikelser nedåt drar ner betyget.",
    },
  ],
};

/**
 * Smart plug.
 *
 * Skiljer sig från smart belysning på en punkt som är värd att förklara:
 * `testomdome` väger tyngst. Hela vår modell är att vi läser andras tester i
 * stället för att köra eget labb, och då ska det som andra faktiskt kommit
 * fram till också väga tyngst i betyget. Kriteriet är avsett att införas
 * retroaktivt på övriga kategorier.
 *
 * Konsekvensen är värd att känna till: `weightedRating` fördelar om vikten för
 * kriterier som saknas. En produkt ingen oberoende part har testat bedöms
 * alltså på de kriterier vi kan fylla i, inte mot ett påhittat betyg. Det syns
 * i CriteriaScores som "Ej testat" på raden, och det står i klartext under
 * "Så gjorde vi testet".
 */
export const SMART_PLUG: TestPage = {
  slug: "smart-plug",
  label: "Smart plug",
  title: "Bäst i test smart plug 2026",
  category: SMART_HEM,
  methodology:
    "Vi jämför smarta uttag på tillverkarnas egna specifikationer och manualer, och på hur produkterna bedömts i oberoende tester i Sverige, Norden och Storbritannien.\n\nAlla fem bedöms mot samma kriterier och samma viktning, och källorna finns länkade längre ner. Saknar en produkt oberoende test står det ut på raden och kriteriets vikt fördelas på de övriga.\n\nIngen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "testomdome",
      label: "Omdöme i oberoende tester",
      weight: 30,
      description:
        "Hur produkten bedömts av de oberoende testare vi citerar i källistan. Väger tyngst eftersom det är det vi faktiskt gör: samlar andras mätningar i stället för att påstå egna. Saknas ett test står det ut på raden, och kriteriets vikt fördelas då på de övriga.",
    },
    {
      key: "maxeffekt",
      label: "Maxeffekt och säkerhet",
      weight: 20,
      description:
        "Hur mycket last pluggen är märkt för, alltså 10 A eller 16 A. Avgör om den duger till ett element, en vattenkokare eller ett torkskåp, vilket är det vanligaste skälet att köpa en i Sverige. Ljud & Bild lyfter effekttålighet som ett uttalat plus på två av sex testade produkter.",
    },
    {
      key: "anslutning",
      label: "Anslutning och ekosystem",
      weight: 15,
      description:
        "Protokoll, Matter-stöd, om en hubb eller brygga krävs och hur stabil uppkopplingen rapporteras vara. Ljud & Bild underkänner Hama enbart på krånglande uppkoppling, trots att produkten i övrigt hade fler funktioner än de flesta.",
    },
    {
      key: "energimatning",
      label: "Energimätning",
      weight: 15,
      description:
        "Om pluggen kan visa vad den inkopplade apparaten drar, och hur detaljerat. Det är den funktion som gör att uttaget kan betala sig, och den skiljer produkterna åt: flera i jämförelsen saknar den helt.",
    },
    {
      key: "viloforbrukning",
      label: "Viloförbrukning",
      weight: 10,
      description:
        "Vad uttaget själv drar dygnet runt för att kunna ta emot kommandot att slå på. Skiljer fem gånger mellan produkterna, från 0,3 W till 1,48 W.\n\nÅtta uttag av den törstigare sorten kostar över tvåhundra kronor om året i ren bakgrundsförbrukning, vilket är mer än flera av dem kostar att köpa.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 10,
      description:
        "Pris vägt mot betygen i övriga kriterier, inte mot varumärket. En dyrare plugg kan få högt betyg om den klarar mer eller mäter bättre.",
    },
  ],
};

/**
 * Smart strömbrytare, alltså det som sitter i väggdosan.
 *
 * ## Varför `installation` väger tyngst
 *
 * Kategorins verkliga köpstopp är inte pris eller protokoll, det är nolledaren.
 * Saknas nolla i dosan faller merparten av sortimentet bort, och Kjell säljer
 * Aqara H1 som två separata artikelnummer just av det skälet. Samma fråga
 * avgör dessutom om jobbet är lagligt att göra själv, se `lib/data`-filen.
 *
 * ## Varför `testomdome` väger 15 här och 30 på smart plug
 *
 * Kriteriet är detsamma och infördes enligt IDÉ-007, men underlaget är
 * halverat. Av fem produkter har två ett oberoende produkttest: Shelly 1 Gen4
 * och Aqara H1. Plejd, Tapo och Philips inbyggnadsrelä har inget alls. Att
 * låta ett kriterium ingen kan fylla i för tre av fem väga tyngst hade gjort
 * omfördelningen i `weightedRating` till den faktiska rankningsmekanismen i
 * stället för till ett undantag. Vikten är därför sänkt, efter beslut, och
 * luckorna syns som "Ej testat" i CriteriaScores.
 *
 * ## Varför `dimring` mäter systemet och inte modulen
 *
 * Ingen av de sex rankade produkterna dimrar. Ett kriterium där alla får samma
 * betyg är inget kriterium, så det mäter i stället om du kan dimra kretsen
 * inom samma system och app, och vad det i så fall kostar extra. Det är den
 * fråga läsaren faktiskt har.
 */
export const SMART_STROMBRYTARE: TestPage = {
  slug: "smart-strombrytare",
  label: "Smart strömbrytare",
  title:
    "Smart strömbrytare bäst i test 2026: väggbrytare, reläer och vad du får installera själv",
  category: SMART_HEM,
  methodology:
    "Vi jämför smarta strömbrytare och inbyggnadsreläer på specifikationer från butikernas och tillverkarnas egna uppgifter, på Elsäkerhetsverkets regler för vad du får göra själv, och på hur produkterna bedömts i oberoende tester.\n\nAlla sex bedöms mot samma kriterier och samma viktning, och källorna finns länkade längre ner. Saknar en produkt oberoende test lämnas den raden tom och vikten fördelas på de övriga kriterierna. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "installation",
      label: "Installation och nolledare",
      weight: 25,
      description:
        "Om produkten kräver nolledare i dosan, om den får plats bakom en svensk strömbrytare, och vad Elsäkerhetsverkets regler innebär för just den installationen. Väger tyngst eftersom det är det som avgör om produkten över huvud taget går att montera hemma hos dig, och för att en modul som kräver ett registrerat elinstallationsföretag kostar mer i arbete än den gör i inköp.",
    },
    {
      key: "ekosystem",
      label: "Ekosystem och protokoll",
      weight: 20,
      description:
        "Protokoll, Matter-stöd, om en hubb eller brygga krävs, och hur väl produkten fungerar med det läsaren redan har hemma. Skillnaden är stor: Shelly 1 Gen4 talar wifi, Bluetooth, Zigbee och Matter i samma modul, medan Plejd bygger ett eget Bluetooth-nät och Philips kräver Hue Bridge för full funktion.",
    },
    {
      key: "testomdome",
      label: "Omdöme i oberoende tester",
      weight: 15,
      description:
        "Hur produkten bedömts av de oberoende testare vi citerar i källistan. Vikten är lägre här än på smart plug, eftersom bara två av sex produkter har ett publicerat produkttest. Saknas ett test lämnas raden tom, och kriteriets vikt fördelas då på de övriga.",
    },
    {
      key: "lokal",
      label: "Drift utan moln",
      weight: 15,
      description:
        "Om ljuset går att tända när internet ligger nere, och om produkten fungerar den dagen tillverkarens molntjänst stängs. En väggbrytare är infrastruktur på ett sätt ett uttag inte är: här står den fysiska knappen kvar och ska fungera oavsett vad som händer med appen.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 15,
      description:
        "Pris vägt mot betygen i övriga kriterier, och mot vad hela installationen kostar snarare än vad en enskild modul kostar. Elinstallatören har räknat på en normalstor villa: skillnaden mellan systemen blir tusenlappar när antalet belysningsgrupper växer.",
    },
    {
      key: "dimring",
      label: "Dimring",
      weight: 10,
      description:
        "Om du kan dimra kretsen inom samma system och samma app, och vad den möjligheten kostar extra. Ingen av de rankade modulerna dimrar själv, så kriteriet mäter systemet runt omkring: finns en dimmervariant, funkar den med dina lampor, och behöver du byta app för att nå den.",
    },
  ],
};

/**
 * Elektriska rullgardiner och gardinmotorer, alltså motorerna som flyttar det
 * som redan hänger i fönstret.
 *
 * ## Slugen bytte namn 2026-08-01
 *
 * Hette `/smarta-gardiner` fram till dess. Keyword Planner visade att vi valt
 * klustrets näst minsta term: `elektrisk rullgardin` 1 600 i månaden mot
 * `smarta gardiner` 110, alltså fjorton gånger. Den ursprungliga iakttagelsen
 * var ändå riktig: bara ordet `rullgardin` leder till en möbelkategori med
 * icke-motoriserade gardiner. `elektrisk rullgardin` gör inte det, den är
 * entydigt vår produkt.
 *
 * ⚠️ Kvarstående obalans, medveten: fem av åtta rankade produkter är
 * gardinrobotar och bara tre är rullgardinsprodukter, medan volymen ligger på
 * rullgardin. H1 bär därför båda orden. Den rimliga lösningen på sikt är att
 * dela sidan i två, en för rullgardin och en för gardinmotorer, när
 * produktunderlaget räcker till det. Se .agent/keywords/utfall.md.
 *
 * ## Varför `passform` väger tyngst
 *
 * Kategorin har ett köpstopp som saknar motsvarighet i de andra: köper du fel
 * monteringstyp är produkten inte sämre, den är oanvändbar. SwitchBot säljer
 * Curtain 3 som tre separata artikelnummer för U-skena, I-skena och stång, och
 * Aqara säljer Curtain Driver E1 som två. Den vi rankar är U-skeneversionen.
 * Samma roll som nolledaren har på strömbrytarsidan.
 *
 * ## Varför `ljudniva` väger näst tyngst
 *
 * Produkten står i ett sovrum och går i gryningen. Det är den enskilt vanligaste
 * invändningen i de tester vi läst, och skillnaden mellan produkterna är stor:
 * SwitchBot anger 25 dB i QuietDrift mot 42 dB i normalläge, medan Aqara inte
 * publicerar någon siffra alls och recensenter genomgående beskriver den som
 * hörbart högre. Att en tillverkare inte anger siffran är i sig information.
 *
 * ## Varför `testomdome` bara väger 10
 *
 * Kriteriet finns här för att täckningen är majoritet, tre av fyra rankade
 * produkter, vilket är bättre än både belysning och strömbrytare hade när det
 * infördes där. Men det finns **inget svenskt eller nordiskt grupptest av
 * kategorin över huvud taget**, så allt underlag är engelskspråkigt och gäller
 * enskilda produkter snarare än en jämförelse. Vikten följer den svagheten.
 * Aqara Roller Shade Driver E1 saknar test helt och får "Ej testat" på raden.
 */
export const ELEKTRISK_RULLGARDIN: TestPage = {
  slug: "elektrisk-rullgardin",
  label: "Elektrisk rullgardin",
  title:
    "Elektrisk rullgardin och gardinmotor bäst i test 2026: vad som passar din upphängning",
  category: SMART_HEM,
  methodology:
    "Vi jämför motorer som gör gardinen du redan har smart, och en färdig motoriserad rullgardin för den som hellre byter hela. Betygen bygger på tillverkarnas och butikernas egna uppgifter, på priset hos den butik vi länkar till, och på hur produkterna bedömts i oberoende tester.\n\nAlla åtta bedöms mot samma kriterier och samma viktning, och källorna finns länkade längre ner. Saknas underlaget för ett kriterium sätter vi inget betyg alls och fördelar vikten på de övriga, hellre än att gissa. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "passform",
      label: "Passform och montering",
      weight: 22,
      description:
        "Vilka skenor, stänger, kedjor eller lameller produkten faktiskt passar, och hur lätt den är att få på plats. Väger tyngst eftersom fel monteringstyp inte gör produkten sämre utan oanvändbar. SwitchBot säljer Curtain 3 som tre olika artikelnummer och Aqara sin Curtain Driver E1 som två, just av det skälet.",
    },
    {
      key: "ljudniva",
      label: "Ljudnivå",
      weight: 18,
      description:
        "Hur mycket motorn hörs när den går. Produkten sitter i ett sovrum och startar på morgonen, vilket gör detta till den vanligaste invändningen i testerna vi läst.\n\nSpannet är 25 till 45 dB: 25 i SwitchBots tysta läge, 30 för Roller Shade, 40 för Blind Tilt. Där ingen tillverkare mätt väger vi testarnas samstämmiga omdöme i stället, och finns varken tal eller test sätts inget betyg.",
    },
    {
      key: "dragkraft",
      label: "Dragkraft och gardinvikt",
      weight: 18,
      description:
        "Hur tung gardin motorn orkar dra, och hur den klarar en skena som går trögt. Avgör om mörkläggningsgardiner i tungt tyg fungerar eller om motorn hakar upp sig halvvägs. SwitchBot uppger 16 kg för U-skena och 15 för stång, Aqara 12 kg för sin Curtain Driver E1.",
    },
    {
      key: "ekosystem",
      label: "Ekosystem och protokoll",
      weight: 14,
      description:
        "Protokoll, Matter-stöd och om en hubb krävs för att styra produkten utanför hemmet. Skillnaden är principiell: Aqara kör Zigbee och kräver hubb för att fungera alls, medan SwitchBot kör Bluetooth och fungerar utan hubb så länge du står i rummet.",
    },
    {
      key: "testomdome",
      label: "Omdöme i oberoende tester",
      weight: 10,
      description:
        "Hur produkten bedömts av de oberoende testare vi citerar i källistan. Vikten är låg eftersom det inte finns något svenskt eller nordiskt grupptest av kategorin, så allt underlag är enskilda engelskspråkiga produkttester. Sju av åtta produkter har minst ett.",
    },
    {
      key: "batteri",
      label: "Batteri och laddning",
      weight: 10,
      description:
        "Hur ofta produkten behöver laddas och hur du gör det. Skillnaden är dramatisk och sällan utskriven: Aqara uppger upp till ett år för sin gardinmotor men bara två månader för rullgardinsmotorn, medan SwitchBot uppger åtta månader och säljer en solpanel som gör laddningen underhållsfri.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 8,
      description:
        "Pris vägt mot betygen i övriga kriterier. Priset är det du betalar hos butiken vi länkar till, inte marknadens lägsta, vilket står förklarat i metodavsnittet.",
    },
  ],
};

/**
 * Utomhustimer, alltså allt som sitter mellan uttaget ute och det som ska
 * tändas: mekaniska kopplingsur, digitala veckotimers och smarta pluggar.
 *
 * ## Varför tre produkttyper ligger i samma rankning
 *
 * Vanligtvis är kategoriblandning ett fel, och vi kritiserar testix.se för att
 * ranka en smart plugg mot ett vägguttag för fast installation. Här är det inte
 * samma sak. En timer på 49,90 kronor och en Matter-plugg på 399 gör exakt
 * samma jobb, i samma uttag, för samma köpare, och skillnaden är bara hur
 * schemat kommer in i produkten. Två av sex svenska konkurrentsidor sätter
 * dessutom redan en smart produkt överst i ett test som heter "timer utomhus",
 * utan att förklara för läsaren varför.
 *
 * ## Varför det inte finns något `testomdome`
 *
 * Det finns inget oberoende test av kategorin på någon nordisk marknad. Inte
 * Råd & Rön, inte Ljud & Bild, inte Tek.no. Samtliga "tester" i sökresultatet
 * är affiliatelistor, utom Bygghemmas som är en butiks jämförelse av det egna
 * sortimentet. Regeln från gardinsidan säger att kriteriet ska bort när
 * täckningen är för tunn, och här finns ingen täckning alls att tunna ut.
 *
 * ## Varför `vaderskydd` och `styrning` väger lika tyngst
 *
 * Väderskyddet är kategorins enda hårda krav: Elsäkerhetsverket sätter IP44 som
 * gräns för det som får stå på marken ute. Men IP-klassen säger ingenting om
 * kyla, och drifttemperaturen skiljer sextio grader mellan produkterna, från
 * Nedis −10 °C till Shellys −25 °C. Styrningen väger lika mycket eftersom
 * solnedgången i Sverige flyttar sig från omkring 14:45 i december till efter
 * 22:00 i juni. En timer med fast klockslag måste ställas om under säsongen.
 *
 * ⚠️ Sidan är byggd i augusti för en term som toppar i november. Tre av de
 * rankade produkterna var slut hos butiken vid pristillfället, vilket står i
 * deras specar. Kör om priskontrollen före lansering.
 */
export const UTOMHUSTIMER: TestPage = {
  slug: "utomhustimer",
  label: "Utomhustimer",
  title: "Utomhustimer bäst i test 2026: mekanisk, digital eller smart",
  category: SMART_HEM,
  methodology:
    "Vi jämför timers och fjärrströmbrytare för utomhusbruk på specifikationer från butikernas och tillverkarnas egna uppgifter, på Elsäkerhetsverkets krav för el utomhus, och på de betyg butikernas egna kunder satt. Alla produkter bedöms mot samma kriterier och samma viktning, oavsett om de är mekaniska eller smarta, och källorna finns länkade längre ner. Saknas en uppgift står den som saknad, aldrig som en gissning. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "vaderskydd",
      label: "Väderskydd och kyla",
      weight: 25,
      description:
        "Kapslingsklass och drifttemperatur. Elsäkerhetsverket skriver att IP44 eller högre gäller för det som placeras på marken utomhus, och alla produkter här klarar den gränsen. Skillnaden ligger i kylan, som IP-klassen inte säger något om: Shelly anger −25 °C, Nedis −10 °C, och flera tillverkare anger ingenting alls. Väger tyngst tillsammans med styrningen eftersom en produkt som slutar fungera i januari inte löser något problem i november.",
    },
    {
      key: "styrning",
      label: "Styrning och schema",
      weight: 25,
      description:
        "Hur schemat ställs in och hur väl det följer verkligheten. Solnedgången i Sverige flyttar sig från omkring 14:45 i december till efter 22:00 i juni, så ett fast klockslag blir fel några veckor efter att du ställt det. Astrofunktion, ljussensor och app löser det på tre olika sätt och till helt olika pris. Väger lika tungt som väderskyddet eftersom det är kategorins största funktionsskillnad.",
    },
    {
      key: "maxlast",
      label: "Maxlast",
      weight: 20,
      description:
        "Vad produkten är märkt för. Spannet är fyra gånger: 3 680 W hos de bästa, 1 000 W hos ett skymningsrelä. Avgör om timern duger till motorvärmare, vilket är en egen svensk sökintention, och priset förutsäger det inte. Julas mekaniska timer på 49,90 kronor klarar 3 500 W medan deras digitala på 99,90 stannar vid 1 800.",
    },
    {
      key: "driftsakerhet",
      label: "Driftsäkerhet",
      weight: 20,
      description:
        "Vad som händer vid strömavbrott och vad produkten är beroende av för att fungera. En mekanisk timer tappar tiden helt och går fel resten av säsongen. En digital med backupbatteri gör det inte. En smart plugg behåller schemat men kan i stället tappa fjärrstyrningen den dagen tillverkarens molntjänst ligger nere eller stängs.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 10,
      description:
        "Pris vägt mot betygen i övriga kriterier. Spannet i jämförelsen är fjorton gånger, från 49,90 till 689 kronor, vilket gör priset till en egen fråga snarare än en detalj. Vikten är ändå låg: den billigaste produkten är inte den vi rekommenderar till allt, och recensionen säger varför.",
    },
  ],
};

/**
 * Vattenlarm. Första sidan i gruppen Säkerhet.
 *
 * ## Varför inget testomdöme-kriterium
 *
 * Kategorin saknar i praktiken oberoende provningar. Stiftung Warentest har
 * inte testat vattenlarm alls, de tyska träffar som ser ut som tester är
 * jämförelsesajter utan mätvärden, och de nordiska instituten gav ingen träff.
 * Brandinfo har recenserat X-Sense-systemet, alltså en av tio produkter, och
 * ett kriterium som är blankt för nio av tio ger inget jämförelsevärde.
 *
 * Det gör oss inte sämre ställda än konkurrenterna. Alla tre svenska
 * sensorsidor påstår i rubriker att de utfört egna tester, utan att redovisa
 * ett enda mätvärde. Vår sida säger i stället rakt ut att ingen har provat de
 * här produkterna, inte de och inte vi, och rankar på specifikation.
 *
 * ## Varför larmvägen väger dubbelt så tungt som något annat
 *
 * Sensorerna i kategorin skiljer sig knappt åt i det de mäter: de känner vatten
 * på golvet, punkt. Det som skiljer dem är vad som händer sedan, och där går
 * skillnaden mellan en produkt som gör nytta och en som tjuter i ett tomt hus.
 * Läckan som kostar pengar är den som börjar medan du är på jobbet.
 */
export const VATTENLARM: TestPage = {
  slug: "vattenlarm",
  label: "Vattenlarm",
  title: "Vattenlarm bäst i test 2026: läckagesensorer med och utan hubb",
  category: SAKERHET,
  methodology:
    "Vi jämför vattenlarm på specifikationer lästa på butikernas och tillverkarnas egna sidor: hur larmet når dig, om en hubb krävs, batteritid, sensorutförande och pris per skyddad plats. Kategorin saknar oberoende laboratorieprovningar, och vi har inte gjort några egna. Alla larm bedöms mot samma kriterier och samma viktning, och källorna finns länkade längre ner. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "larmvag",
      label: "Larmväg",
      weight: 30,
      description:
        "Når larmet dig när du inte är hemma? Ett larm som bara har en siren tjuter där det ligger, och en läcka som börjar på förmiddagen hinner göra sitt innan någon kommer hem. Väger tyngst ensam eftersom det är den enda skillnaden som avgör om produkten löser problemet eller inte.",
    },
    {
      key: "fristaende",
      label: "Fristående drift",
      weight: 20,
      description:
        "Vad som krävs utöver larmet självt. En sensor för 199 kronor som förutsätter en hubb för sju hundra är inte en produkt för 199 kronor. Här bedöms också om grundfunktionen kräver konto, moln eller abonnemang.",
    },
    {
      key: "batteritid",
      label: "Batteritid och underhåll",
      weight: 20,
      description:
        "Uppgiven batteritid, om batteriet medföljer, om enheten varnar när det börjar ta slut och hur ofta den behöver ses till. Ett larm med tomt batteri är sämre än inget larm, eftersom du tror att du är skyddad.",
    },
    {
      key: "sensorutforande",
      label: "Sensorutförande",
      weight: 15,
      description:
        "IP-klass, hur sensorn känner av vatten, och om det finns lös sond eller förlängningskabel. Det avgör om larmet går att få bakom tvättmaskinen och under diskbänksskåpet, alltså där läckorna faktiskt börjar, i stället för mitt på ett fritt golv.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde per skyddad plats",
      weight: 15,
      description:
        "Priset delat med hur många ställen larmet faktiskt täcker, inklusive det hubben kostar om en sådan krävs. Ett paket med tre sensorer och basstation kan bli billigare per plats än tre lösa sensorer som var för sig ser billiga ut.",
    },
  ],
};

/**
 * Brandvarnare, alltså fristående och radiosammankopplade utan app.
 * De app- och hubbanslutna får en egen sida, /smart-brandvarnare.
 *
 * ## Varför sammankoppling väger tyngst
 *
 * Det är den enda funktionen som räddningstjänsterna faktiskt trycker på: att
 * en brand i källaren väcker den som sover en trappa upp. Det är också den axel
 * marknaden själv delar på. Brandvarnare.se har System, Brandvarnare och
 * Färdiga kit i sin meny, och brandskyddskollen.se har en egen sida bara för
 * seriekopplade. Ingen av dem delar på smart.
 *
 * ## Varför kriteriet heter omdöme i publicerade jämförelser
 *
 * Inte "testomdöme". Stiftung Warentest är den enda källan i kategorin med
 * verklig brandprovning, och de testade tyska märken: Ei Electronics, Abus,
 * Busch-Jaeger, Pyrexx, Cavius och Hekatron. **Ingen av de nio produkter vi
 * rankar finns med.** Täckningen mot svenska hyllor är alltså noll.
 *
 * Kriteriet räknar därför hur många publicerade jämförelser som utsett
 * produkten till vinnare eller topplacering, enligt användarens beslut
 * 2026-08-02 att räkna alla källor lika.
 *
 * ⚠️ Det för med sig en cirkularitetsrisk som sidan måste vara öppen med: fyra
 * av de sju svenska jämförelserna är affiliatesajter utan egen provning, och
 * Brandinfo rankar Google Nest Protect i ett test daterat 2026 trots att Google
 * lade ner produkten i mars 2025. Källorna listas därför per produkt, och en
 * nedlagd produkt får aldrig poäng här oavsett hur många som rankat den.
 */
export const BRANDVARNARE: TestPage = {
  slug: "brandvarnare",
  label: "Brandvarnare",
  title: "Brandvarnare bäst i test 2026: sammankopplade och fristående",
  category: SAKERHET,
  methodology:
    "Vi jämför brandvarnare på specifikationer lästa hos tillverkaren och hos butiken: om de kan larma tillsammans och på vilken frekvens, hur länge batteriet håller och hur många celler det kräver, vad varnaren gör för att slippa falsklarm, och vad varje skyddad plats kostar.\n\nAlla tio klarar standardens 85 decibel på tre meter, så ljudnivån skiljer dem inte åt och väger ingenting. Vi har inte tänt eld på något, och kriteriebetygen är vår bedömning och inte mätvärden. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "sammankoppling",
      label: "Sammankoppling och räckvidd",
      weight: 30,
      description:
        "Om varnaren kan larma tillsammans med andra, hur många enheter systemet klarar och på vilken frekvens. Väger tyngst eftersom det är den funktion räddningstjänsterna lyfter fram: en brand i källaren ska väcka den som sover på övervåningen. 868 MHz går genom betongbjälklag bättre än 433 MHz.",
    },
    {
      key: "batteritid",
      label: "Batteri och livslängd",
      weight: 30,
      description:
        "Förseglat tioårsbatteri mot utbytbara celler, hur många celler varje varnare kräver och hur lång garantin är. En brandvarnare ska sitta uppe i tio år och ses aldrig till däremellan, så ett batteri som ska bytas varje år är den vanligaste orsaken till att varnaren är tyst den dag det brinner.",
    },
    {
      key: "handhavande",
      label: "Falsklarm och skötsel",
      weight: 20,
      description:
        "Pausfunktion för matos, självövervakning som märker damm eller fel, och sensorer som klarar mer än standardens minimum. Falsklarm är den vanligaste orsaken till att en varnare plockas ner, och en varnare i en byrålåda skyddar ingen.",
    },
    {
      key: "prisvarde",
      label: "Pris per skyddad plats",
      weight: 20,
      description:
        "Priset delat med antalet varnare i förpackningen, och hur många platser förpackningen räcker till. Ett hem behöver en varnare per våningsplan och helst utanför varje sovrum, så ett trepack för 299 kronor skyddar tre platser för hundra kronor styck medan en ensam varnare för 265 skyddar en.",
    },
  ],
};

/**
 * Smarta brandvarnare, alltså de som når din telefon. Systersida till
 * /brandvarnare, som rankar dem som klarar sig utan app.
 *
 * ## Varför oberoende av tillverkaren väger lika tungt som appen
 *
 * En brandvarnare ska sitta i taket i tio år. Google Nest Protect levde i
 * precis tio år: lanserad 2015, tillverkningen nedlagd 28 mars 2025. Enheterna
 * fungerar sin livslängd ut, men produkten går inte längre att köpa, och
 * svenska jämförelser rankar den fortfarande.
 *
 * Det är kategorins verkliga risk, och den är osynlig i varje
 * specifikationstabell. Därför är den ett eget kriterium här: vad fortsätter
 * fungera den dag tillverkarens app stängs av? Ett Z-Wave-larm gör allt utom
 * att sluta lyda din egen styrenhet. Ett wifi-larm mot ett proprietärt moln
 * blir en siren.
 *
 * ## Gränsen mot /brandvarnare
 *
 * Housegard Luma finns på båda sidorna, men som två olika köp. Där rankas
 * tvåpacket för 599 kronor, som seriekopplas med radio helt utan app. Här
 * rankas systemet, alltså tvåpacket plus hubben, till 1 098,90 kronor.
 */
export const SMART_BRANDVARNARE: TestPage = {
  slug: "smart-brandvarnare",
  label: "Smart brandvarnare",
  title: "Smart brandvarnare bäst i test 2026: efter Nest Protect",
  category: SAKERHET,
  methodology:
    "Vi jämför uppkopplade brandvarnare på specifikationer lästa på butikernas och tillverkarnas egna sidor: vad appen faktiskt gör, vad som fortsätter fungera utan tillverkarens molntjänst, batteritid, vad som krävs utöver larmet självt och pris per skyddad plats. Ingen av varnarna har utsatts för rök hos oss. Alla bedöms mot samma kriterier och samma viktning, och källorna finns länkade längre ner. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "app",
      label: "Larmväg och app",
      weight: 25,
      description:
        "Vad appen faktiskt gör utöver att visa att larmet finns: notis när du inte är hemma, självtest som upptäcker en trasig sensor, möjlighet att tysta ett falsklarm på distans och att låta larmet trigga annat i hemmet. Det är hela skälet att betala extra för uppkoppling.",
    },
    {
      key: "oberoende",
      label: "Oberoende av tillverkaren",
      weight: 25,
      description:
        "Vad som fortsätter fungera den dag tillverkarens app eller moln stängs av. Öppna protokoll som Z-Wave lyder din egen styrenhet och bryr sig inte om vem som äger varumärket. Ett larm som bara talar med sin egen molntjänst blir en vanlig siren. Google Nest Protect visade i mars 2025 att frågan inte är teoretisk.",
    },
    {
      key: "batteritid",
      label: "Batteri och livslängd",
      weight: 20,
      description:
        "Uppgiven batteritid och om batteriet är förseglat eller utbytbart. En brandvarnare får sitta uppe i tio år, så ett femårsbatteri betyder ett garanterat byte halvvägs och ett tvåårsbatteri betyder fyra.",
    },
    {
      key: "kravs",
      label: "Vad som krävs utöver larmet",
      weight: 15,
      description:
        "Hubb, basstation, konto eller abonnemang. En sensor för 332 kronor som förutsätter en basstation är inte en produkt för 332 kronor, och det står sällan i produktnamnet.",
    },
    {
      key: "prisvarde",
      label: "Pris per skyddad plats",
      weight: 15,
      description:
        "Totalpriset delat med antalet varnare du får, inklusive det basstationen eller hubben kostar. Ett system för nästan tvåtusen kronor kan bli billigare per rum än en ensam varnare för niohundra.",
    },
  ],
};

/**
 * Brandsläckare.
 *
 * ## Varför släckeffekt väger tyngst
 *
 * Effektklassen står på varje etikett, den är kategorins enda riktiga
 * prestandamått, och ingen svensk jämförelse förklarar den. Två sexkilos i vår
 * lista skiljer 55A mot 43A, alltså tjugoåtta procents skillnad i släckyta, och
 * priset följer inte klassen: billigaste 55A kostar 579 kronor och dyraste
 * kostar 699.
 *
 * ## Kriteriet som mätte vår egen research, och vad som ersatte det
 *
 * Sidan bar i två omgångar ett kriterium som betygsatte om butiken skrivit ut
 * sitt typgodkännande. Först hette det "redovisad certifiering" och vägde 25,
 * sedan döptes det om till "tillförlitlighet" och vägde 15. Bytet löste
 * ingenting: skalan gav fortfarande 5,0 till den enda butik vi hittat ett
 * godkännande hos och 3,0 till alla andra.
 *
 * Vid research 2026-08-06 visade det sig att sex av sju släckare har ett
 * utskrivet godkännande, på sidor vi själva länkade till. Brandvarnare.se anger
 * EN3-7:2004+A1:2007 på alla tre under fliken "Ytterligare information",
 * Housegard anger EN3-7, CE och Wheelmark i sin egen specifikation, och Biltema
 * anger EN 3-7/8 i produkttexten. Kriteriet mätte alltså inte produkterna. Det
 * mätte vilka flikar vi hade öppnat.
 *
 * De 15 poängen ligger nu på **var släckaren får sitta**, som är en egenskap
 * hos varan och inte hos texten. SS-EN 3-7 punkt 16.1 kräver röd färg. En vit
 * släckare kan därför aldrig vara EN 3-7-godkänd, och både Kjell och Deltronic
 * skriver ut vad det innebär: den får bara sitta i en privatbostad där de som
 * bor där vet var den hänger. I ett trapphus, ett delat garage eller en uthyrd
 * lägenhet ska släckaren vara röd. Det är en verklig inskränkning i vad köparen
 * kan göra med produkten.
 *
 * Brandskyddsföreningens norm SBF 2011:1 bygger på samma punkt: en
 * hembrandsläckare ska uppfylla samtliga krav i SS-EN 3-7 **utom** 16.1 om
 * färgen, vara pulver, väga 6 kg och klara provbål 43A och 233B.
 */
export const BRANDSLACKARE: TestPage = {
  slug: "brandslackare",
  label: "Brandsläckare",
  title: "Brandsläckare bäst i test 2026: vilken du ska ha hemma",
  category: SAKERHET,
  methodology:
    "Vi jämför handbrandsläckare på effektklassen enligt EN 3, på fylld vikt och mått, på var släckaren får sitta, på utrustning och temperaturområde, och på pris ställt mot släckeffekt.\n\nUppgifterna är hämtade från tillverkarnas egna specifikationer, produktbladen och manualerna, och kompletterade med butikernas produktsidor. Vi har inte tömt en enda släckare.\n\nAlla bedöms mot samma kriterier och samma viktning, och källorna finns länkade längre ner. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "slackeffekt",
      label: "Släckeffekt",
      weight: 40,
      description:
        "Effektklassen enligt EN 3, alltså siffrorna som 55A 233B C på etiketten. A-talet anger hur stor brand i fasta material släckaren klarar, B-talet hur många liter brinnande vätska.\n\nEn 55A täcker upp till 5,5 meter från släckaren och en 43A knappt 4,3, alltså 28 procent mindre. Väger tyngst med bred marginal, eftersom klassen provas fram mot standardiserade provbål av ett certifieringsorgan.",
    },
    {
      key: "placeringsfrihet",
      label: "Var den får sitta",
      weight: 15,
      description:
        "SS-EN 3-7 kräver röd färg. En röd släckare får därför sitta var som helst: i trapphuset, i det delade garaget, i en uthyrd lägenhet och på en arbetsplats.\n\nEn vit eller svart får inte det. Både Kjell och Deltronic skriver ut att den bara är avsedd för en privatbostad där de som bor där vet var den hänger. Vad du betalar för färgen är alltså hälften av de platser du kan hänga den på.",
    },
    {
      key: "hanterbarhet",
      label: "Hanterbarhet",
      weight: 20,
      description:
        "Fylld vikt och mått. En sexkilos väger 9,4 kilo fylld och ska lyftas ur sitt fäste, säkras och riktas av någon som just upptäckt en brand. En tvåkilos väger 4 kilo och en enkilos 1,8.\n\nAlla i hushållet klarar inte de nio kilona, och en tvåkilos som faktiskt går att använda är bättre än en sexkilos som står kvar på golvet.",
    },
    {
      key: "utrustning",
      label: "Utrustning och kyltålighet",
      weight: 15,
      description:
        "Manometer, väggfäste, övertrycksventil och det temperaturområde släckaren är provad för. Manometern är det enda du själv kan kontrollera under släckarens tio år, eftersom en släckare som tappat trycket ser exakt likadan ut som en laddad.\n\nTemperaturen avgör om den får stå i garaget, uthuset eller sommarstugan.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde per släckenhet",
      weight: 10,
      description:
        "Priset ställt mot effektklassen, inte mot vikten. Spannet är 349 till 699 kronor, och den dyraste är inte den med högst klass.\n\nVikten är låg med flit: en brandsläckare köps en gång på tio år, och hundra kronor är fel skäl att välja bort släckeffekt.",
    },
  ],
};

/**
 * Brandfilt.
 *
 * ## Varför certifieringen väger tyngst här, till skillnad från på /brandslackare
 *
 * På brandsläckarsidan sänktes certifieringskriteriet, eftersom det mätte
 * butikens produkttext snarare än produkten. Här är läget det motsatta, och
 * skälet är att **standarden finns i två versioner som provar olika saker**.
 *
 * EN 1869:1997 provade brandfiltar enbart mot brand i matolja. Revisionen från
 * 2019 lade till klass B-brand med heptan, skärpte provningen av elektrisk
 * ledningsförmåga och slog fast att en brandfilt är en engångsprodukt. En filt
 * certifierad mot 1997 är alltså bara provad mot en enda brandtyp.
 *
 * Versionsnumret står på förpackningen och i butikstexten, och det skiljer
 * produkterna åt: Brandvarnare.se anger 2019 på hela sitt sortiment, Biltema på
 * sin ena men inte sin andra, Kjells Luxorparts anger standarden utan årtal och
 * Kjells dyraste filt anger 1997.
 *
 * Det är alltså inte en fråga om vem som skriver bäst produkttext, utan om
 * vilken provning filten faktiskt genomgått.
 */
export const BRANDFILT: TestPage = {
  slug: "brandfilt",
  label: "Brandfilt",
  title: "Brandfilt bäst i test 2026: storleken och certifieringen som avgör",
  category: SAKERHET,
  methodology:
    "Det finns inget oberoende test av brandfiltar i Sverige eller Norden. Vi har letat hos Råd & Rön, Testfakta och de nordiska testredaktionerna, och redovisar utfallet på sidan i stället för att låna någon annans omdöme.\n\nDet vi gör i stället är att läsa EN 1869 i original och jämföra filtarna på vad de är provade mot, på storlek, på hur snabbt filten går att få ut ur förpackningen, på material och temperatur samt på pris. Uppgifterna kommer ur tillverkarnas och butikernas egna specifikationer och är daterade.\n\nAlla filtarna bedöms mot samma kriterier och samma viktning. Vi har inte tänt eld på något och vi har inte sett något provningsintyg. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "certifiering",
      label: "Provning enligt EN 1869",
      weight: 30,
      description:
        "EN 1869:2019 kräver tre prov: brand i matolja, brand i vätska med heptan och ett prov av elektrisk ledningsförmåga. Versionen från 1997 kräver matolja och elprov men inget heptanprov, och drogs tillbaka 2020.\n\nSkalan följer provningen. 5,0 för en filt provad mot 2019, alltså även mot brinnande vätska. 3,0 när matolja och elprov är fastställda men heptanprovet inte är det. En filt vars provning vi inte kunnat fastställa får inget betyg här, utan står bland de övervägda i stället.",
    },
    {
      key: "storlek",
      label: "Storlek",
      weight: 30,
      description:
        "Standarden säger själv att filtar som är tillräckligt stora anses lämpliga för att kväva elden på en person vars kläder brinner, men den anger ingen centimetersiffra. Den kommer från räddningstjänsterna, som rekommenderar 120 × 180 cm.\n\nVäger lika tungt som provningen, eftersom en filt som är för liten för att svepa om en människa inte kan göra det jobbet hur väl provad den än är. En 120 × 120 räcker till en kastrull, och prisskillnaden upp till den större är ofta under hundra kronor. Fyra av sju filtar i jämförelsen är den mindre storleken.",
    },
    {
      key: "atkomst",
      label: "Åtkomst",
      weight: 20,
      description:
        "Hur snabbt filten går att få ut, alltså hård box mot mjuk påse, och om förpackningen är gjord för att hängas på vägg. En brandfilt i en byrålåda är en brandfilt du inte hinner hämta. Hård box öppnas med ett grepp, mjuk påse kräver att du drar i två flikar.",
    },
    {
      key: "material",
      label: "Material och temperatur",
      weight: 10,
      description:
        "Alla filtarna är glasfiberväv och alla tål 500 °C, så det som skiljer är ytbehandlingen. Silikon gör väven tätare mot genomträngning och styvare att lägga på plats, och en obehandlad väv är den billigaste vägen till samma temperaturtålighet.\n\nLåg vikt, eftersom skillnaden märks i handen men inte i vad filten klarar av att kväva.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 10,
      description:
        "Priset ställt mot storlek och certifiering. Spannet är 99,90 till 299,90 kronor, alltså tre gånger, och den dyraste är certifierad mot den äldre versionen av standarden.",
    },
  ],
};

/**
 * Kolmonoxidvarnare.
 *
 * ## Sidans fynd: EN 50291 har två delar, och två generationer
 *
 * **Del 1** gäller kolmonoxidvarnare i bostäder. **Del 2** gäller husvagn,
 * husbil och båt, och lägger till krav för rörliga och tuffa miljöer: vibration,
 * rörelse och temperaturväxling. En varnare som bara är provad mot del 1 är
 * alltså inte provad för det fordon många köper den till.
 *
 * Dessutom skiljer utgåvorna. EN 50291-1:2018 gjorde **livslängdsindikering
 * obligatorisk**, med både ljud och synlig signal, utökade antalet störgaser som
 * varnaren provas mot och skärpte kraven på nätanslutna varnares reservkraft.
 * Föregångaren 2010+A1:2012 drogs tillbaka av BSI i september 2021.
 *
 * Livslängdsindikeringen är den viktigaste av dem, och den kopplar ihop de två
 * tyngsta kriterierna på sidan: en CO-sensor löper ut, och utan indikering blir
 * varnaren en död dosa som ingen vet är död.
 *
 * ## Varför kriteriet heter Dokumenterad certifiering
 *
 * Samma konstruktion som på /brandfilt, och av samma skäl. Vi har inte sett
 * något provningsintyg och vi provar ingenting själva. Det vi kan bedöma är vad
 * köparen kan kontrollera före betalningen, och skalan publiceras på sidan.
 *
 * ## Varför det inte finns något kriterium för testomdömen
 *
 * Consumer Reports provar CO-varnare i labb, men mot UL 2034 och inte mot
 * EN 50291, och deras X-Sense-test gäller en annan modell än den vi rankar.
 * Ingen svensk eller nordisk redaktion har testat kategorin. Se
 * .agent/research/kolmonoxidvarnare.md.
 */
export const KOLMONOXIDVARNARE: TestPage = {
  slug: "kolmonoxidvarnare",
  label: "Kolmonoxidvarnare",
  title: "Kolmonoxidvarnare bäst i test 2026: del 1 eller del 2 av EN 50291",
  category: SAKERHET,
  methodology:
    "Det finns inget svenskt eller nordiskt test av kolmonoxidvarnare. Consumer Reports i USA provar kategorin i labb, men mot den amerikanska standarden UL 2034 och inte mot den europeiska EN 50291, och deras test av X-Sense gäller en annan modell än den vi rankar. Vi redovisar det på sidan i stället för att låna deras omdöme.\n\nDet vi gör i stället är att läsa vad EN 50291 kräver och kontrollera varje varnare mot det, tillsammans med sensorns livslängd, hur larmet når fram, vid vilka temperaturer varnaren fungerar, vad den kostar och vad den visar. Uppgifterna är hämtade ur tillverkarnas egna dokument: försäkringar om överensstämmelse, specifikationsblad och manualer, samt öppna certifikatregister hos BSI och TÜV Rheinland. Priserna är lästa på butikernas egna sidor och daterade.\n\nAtt vi går till tillverkaren och inte till butiken är en följd av den här sidans egen historia. Sidan byggde tidigare på butikernas specifikationsrader, och sex av sju kontrollerade uppgifter visade sig då vara fel, tre av dem om vilken standard varnaren är provad mot. Rättelsen finns publicerad. Vi har inte utsatt någon varnare för kolmonoxid, och kriteriebetygen är vår bedömning och inte mätvärden. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "certifiering",
      label: "Provad för hem eller fordon",
      weight: 25,
      /*
       * ⚠️ Hette "Dokumenterad certifiering" och vägde 30 till 2026-08-06.
       * Beskrivningen skrev ut att kriteriet mätte "vad du kan kontrollera
       * före köp, inte vad varnaren fysiskt klarar", alltså säljarens
       * produktblad och inte varan. Steget på 2,0 för tillbakadragen utgåva
       * träffade dessutom två varnare som är provade mot gällande utgåva.
       * Se lib/corrections.ts och .claude/skills/fix-page.
       */
      description:
        "Vilka delar av EN 50291 varnaren är provad enligt. Del 1 gäller bostäder. Del 2 lägger till prov för vibration, rörelse och temperaturväxling, alltså husvagn, husbil och båt.\n\nSkalan har två steg och båda handlar om varan: 5,0 för en varnare som är provad enligt både del 1 och del 2, 3,5 för en som är provad enligt del 1 och därmed avsedd för bostad. Alla sex är provade enligt 2018 års utgåva av del 1.",
    },
    {
      key: "livslangd",
      label: "Sensorns livslängd",
      weight: 25,
      description:
        "En CO-sensor löper ut och då ska hela varnaren bytas, inte batteriet. Det är kategorins verkliga kostnad, och sju år mot tio är en tredjedel dyrare per år.\n\nVi väger sensorns livslängd mot priset, och mot om batteriet går att byta. Ett inbyggt batteri betyder att varnaren kastas när cellen tar slut även om sensorn hade år kvar.",
    },
    {
      key: "larmvag",
      label: "Larmväg",
      weight: 20,
      description:
        "Kolmonoxid dödar särskilt den som sover, och en varnare som bara tjuter där den hänger hjälper ingen som inte är i rummet. Här väger vi om varnare går att koppla samman så att alla larmar samtidigt, hur långt den kopplingen räcker, och om larmet når en telefon. En varnare i husvagnen på tomten hörs inte in i huset.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 20,
      description:
        "Priset ställt mot vad varnaren är provad för och hur länge den lever, alltså mot kronor per år snarare än mot prislappen. Spannet är 399 till 1 099 kronor, nästan tre gånger.",
    },
    {
      key: "avlasning",
      label: "Avläsning",
      weight: 10,
      description:
        "Om varnaren visar uppmätt halt i ppm eller bara larmar. En display som visar aktuell och högsta uppmätta halt gör skillnad vid en långsam läcka, alltså den som ger huvudvärk i veckor utan att nå larmnivån. Låg vikt eftersom en varnare utan display fortfarande larmar när det gäller.",
    },
  ],
};

/**
 * Brandstege, alltså den hängande som krokas över fönsterkarmen.
 *
 * ## Varför de fasta stegarna inte är med
 *
 * Ordet brandstege täcker två marknader. Den hängande kostar 699 till 2 249
 * kronor och kräver ingen montering. Den fasta fasadstegen kostar 5 599 till
 * 9 199 och är ett byggjobb. Trettonfaldigt prisspann i samma rankning hade
 * varit samma fel som /vattenlarm undvek. De fasta får /utrymningsstege.
 *
 * ⚠️ Rättat 2026-08-03: spannen stod tidigare som 699–1 294 respektive
 * 1 327–9 199. Den nedre gränsen för de fasta var i själva verket priset på
 * Skeppshultstegens **hängande** repstege, och den sammanblandningen gjorde
 * att två hängande stegar missades helt när sidan byggdes. Se
 * .agent/research/brandstege.md §9b.
 *
 * ## Varför det inte finns något kriterium för testomdömen
 *
 * Ingen redaktion i Sverige eller Norden har provat hängande brandstegar. Den
 * bästa svenska sidan i kategorin, brandinfo.se, skriver att den testat men
 * redovisar ingen metod. Se .agent/research/brandstege.md §7.
 *
 * ## Varför räckvidd väger tyngst
 *
 * Boverkets byggregler drar gränsen vid fem meter: sitter fönstrets underkant
 * högre krävs en fast monterad stege, och under den höjden räknar reglerna med
 * att du hoppar. Kriteriet mäter därför inte råa meter utan hur stor del av det
 * intervallet stegen täcker.
 */
export const BRANDSTEGE: TestPage = {
  slug: "brandstege",
  label: "Brandstege",
  title: "Brandstege bäst i test 2026: sex av åtta får bara användas en gång",
  category: SAKERHET,
  methodology:
    "Det finns inget svenskt eller nordiskt test av hängande brandstegar, och ingen produktstandard som gäller stegtypen. Vi har därför läst tillverkarnas egna bruksanvisningar för varje stege där en finns, och det är där kategorin visar sig: sex av de åtta stegarna får enligt sin egen manual utlösas en enda gång och kasseras efteråt, och samtliga manualer säger att du inte ska dra i utlösningsbandet när du övar.\n\nMaxlasten på kartongen går samtidigt inte att jämföra. Samma sorts stege anges till 150, 200, 400 och 450 kilo, ingen anger hur talet mätts, och två av manualerna säger att stegen är avsedd för en person i taget oavsett vilket tal som står på förpackningen.\n\nRankningen bygger därför på det du kan mäta mot ditt eget hus och kontrollera i manualen: räckvidden ställd mot Boverkets femmetersgräns, om foten får plats när stegen ligger an mot fasaden, om krokarna passar din fönsterkarm, och vad stegen kostar per meter du faktiskt kan utrymma från. Uppgifterna är lästa i bruksanvisningen, hos tillverkaren och på butikens egen produktsida, daterade. Vi har inte belastat eller klättrat i någon stege. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "rackvidd",
      label: "Räckvidd",
      weight: 38,
      description:
        "Hur högt sittande fönster stegen når från, mätt mot Boverkets gräns. Byggreglerna accepterar utrymning genom fönster om underkanten sitter högst 5,0 meter över marken, och över den höjden krävs en fast monterad stege. Kriteriet mäter alltså inte råa meter utan hur stor del av det intervallet stegen täcker med marginal. En stege på 4,5 meter räcker till en normal andravåning, en på 4,3 blir knapp i ett hus med hög takhöjd, och sju meter och uppåt krävs för tre våningar.",
    },
    {
      key: "nedstigning",
      label: "Nedstigning",
      weight: 31,
      description:
        "Det som avgör om foten får plats när stegen ligger an mot fasaden. Distanser som håller ut stegen från väggen, stegbredd, och om stegpinnarna är räfflade eller släta. En stege utan distanser pressas mot väggen av din egen vikt, och då finns ingenstans att sätta framfoten.\n\nHar stegen distanser räknas det, oavsett var uppgiften står. Fyra av stegarna har dem enligt sin bruksanvisning eller sin produkttext, och två av dem säger det bara i manualen.",
    },
    {
      key: "passform",
      label: "Passform",
      weight: 19,
      description:
        "Om stegen över huvud taget går att haka på ditt fönster. Krokarna tar en största karmtjocklek på 30 centimeter, och en av produkterna anger även en minsta. Här väger också vikten att hantera i mörker och om stegen levereras i något som gör att den går att hitta och få ut snabbt. Måttet är gratis att kontrollera i förväg och kostsamt att upptäcka i efterhand.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 12,
      description:
        "Priset ställt mot räckvidden, alltså kronor per meter du faktiskt kan utrymma från, och mot vad som ingår. Spannet är 699 till 2 249 kronor för stegar som gör samma sak, och den dyraste är tre gånger den billigaste utan att nå tre gånger så långt.",
    },
  ],
};

/**
 * Utrymningsstege, de fast monterade fasadstegarna. Systersida till
 * /brandstege, som rankar de hängande.
 *
 * Sidans kriterium för dokumenterad provning är det enda i brandfamiljen där
 * någon produkt faktiskt når 5,0. SINTEF Certification har en produktgrupp som
 * heter Redningsstiger med fyra godkända stegar, och en av dem, Modum, säljs i
 * Sverige. Certifikatet TG 2536 anger provlast, användningsområde i meter,
 * monteringsvillkor och ett utgångsdatum. Ingen av de andra fyra produkterna
 * har någon motsvarighet.
 *
 * Se .agent/research/utrymningsstege.md.
 */
export const UTRYMNINGSSTEGE: TestPage = {
  slug: "utrymningsstege",
  label: "Utrymningsstege",
  title: "Utrymningsstege bäst i test 2026: en av fem är godkänd för utrymning",
  category: SAKERHET,
  methodology:
    "Det finns inget svenskt test av fasta utrymningsstegar. Vi har därför gått till tillverkarnas egna produktblad, monteringsanvisningar och certifikat, och läst dem i original i stället för att lita på butikernas specifikationsrader.\n\nDet gav måtten som avgör en nedklättring: stegbredd från 240 till 400 millimeter, stegavstånd på 300 millimeter hos samtliga, och de väggmaterial varje tillverkare faktiskt anvisar ett fäste för. Vi har också läst SINTEF Certifications register över godkända räddningsstegar och W.Steps egna RISE-intyg i sin helhet, så att uppgiften om vilka stegar som är provade av tredje part är kontrollerad och inte antagen.\n\nVi har inte belastat, monterat eller klättrat i någon stege. Kriteriebetygen är vår bedömning, inte mätvärden. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "provning",
      label: "Provad och godkänd för utrymning",
      weight: 20,
      description:
        "Om stegen är provad för det den säljs till, och av vem. 5,0 för ett tredjepartsgodkännande för fast utrymningsstege, med provlast och högsta användningshöjd. 2,5 när tillverkaren själv anger provning mot gällande utgåva av EN 131 och en maxlast i kilo. 1,0 när stegen inte ingår i någon sådan ordning.\n\nDet lägsta steget är kontrollerat och inte antaget: SINTEF:s produktgrupp för räddningsstegar är uppräknad, och W.Steps båda RISE-intyg är lästa i sin helhet. Ingen av dem omfattar utrymningsstegarna.",
    },
    {
      key: "rackvidd",
      label: "Räckvidd och längdval",
      weight: 20,
      description:
        "Hur högt sittande fönster stegen når, och hur nära din faktiska fönsterhöjd du kan komma. En serie i steg om 3 decimeter träffar rätt längd, ett hopp från 2,1 till 3,6 meter gör det inte.\n\nHär väger också om stegen går att skarva och om den kan öppnas på flera våningar. Boverket tillåter en fast monterad stege upp till 8,0 meter, vilket är mer än de flesta av stegarna når i ett stycke.",
    },
    {
      key: "nedstigning",
      label: "Nedstigning",
      weight: 25,
      description:
        "Hur mycket fot du får på stegpinnen, eftersom du klättrar ner barfota eller i strumplästen. Stegbredden spänner från 240 till 400 millimeter, alltså 16 centimeter mellan smalast och bredast, och det är den enskilt största fysiska skillnaden mellan stegarna.\n\nStegavståndet är 300 millimeter hos samtliga fem och skiljer dem därför inte åt. Halkskydd, ståplan, handtag och ryggbygel väger in, eftersom de avgör vad du kliver ut på.",
    },
    {
      key: "montering",
      label: "Montering och infästning",
      weight: 15,
      description:
        "Vilka väggar stegen går upp på, och vad som ligger i lådan. Spannet är stort: ett fabrikat anvisar fäste för sju väggmaterial från trä till lättklinker, ett annat skickar med hela satsen för träfasad, och två levererar väggfästen men inga bultar alls.\n\nKonsoler och distanser väger in, eftersom en fasad med sockel eller list annars inte går att montera på.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 20,
      description:
        "Kronor per meter räckvidd, och vad de köper. Spannet är 957 till 4 031 kronor per meter, alltså mer än fyra gånger mellan billigast och dyrast för stegar som gör samma sak.\n\nHär väger också att flera av fabrikaten säljs av två butiker till priser som skiljer 41 till 49 procent på samma artikelnummer.",
    },
  ],
};

/**
 * Övervakningskamera, bara de för utomhusbruk vid villa.
 *
 * Sidans fynd är att IMY pekar ut digital maskering som åtgärden när kameran
 * råkar få med grannens tomt, och att varje enskild tillverkare publicerar en
 * brasklapp som urholkar just den funktionen. Alltid åt samma håll: så fort
 * kameran rör sig slutar masken täcka det den ritades över. Arlo raderar
 * zonerna, Tapo och Reolink förskjuter dem, eufy skriver att maskeringen inte
 * säkert hindrar inspelning.
 *
 * ⚠️ Kriteriet `kostnad` poängsätts på vad som slutar fungera utan
 * abonnemang, inte på kronor per månad. Arlos plansidor svarar 403 och 404 mot
 * curl och TP-Link renderar pristabellen i JavaScript, så vi har inte läst
 * något abonnemangspris och publicerar därför inget. Se
 * .agent/research/overvakningskamera.md §9.
 */
export const OVERVAKNINGSKAMERA: TestPage = {
  slug: "overvakningskamera",
  label: "Övervakningskamera",
  title: "Övervakningskamera bäst i test 2026: maskeringen som försvinner",
  category: SAKERHET,
  methodology:
    "Det finns inget svenskt test av övervakningskameror för villa. Däremot finns en svensk regel som avgör om kameran alls får sitta där du tänkt, och en produktfunktion som Integritetsskyddsmyndigheten själv pekar ut som lösningen.\n\nVi har läst IMY:s regeltext i original och därefter varje tillverkares beskrivning av hur maskeringen beter sig när kameran används. Priser, upplösning, synfält, lagring och abonnemangskostnader är lästa hos butiken eller tillverkaren och daterade.\n\nVi har inte monterat, filmat med eller mätt bildkvaliteten på någon kamera. Kriteriebetygen är vår bedömning, inte mätvärden. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "integritet",
      label: "Integritet och maskering",
      weight: 30,
      description:
        "Om kameran har en riktig sekretesszon som svartar ut pixlarna i inspelningen, och om masken ligger kvar när kameran används. Det ska inte förväxlas med detekteringszon, som bara styr vad kameran larmar om.\n\nSkalan mäter vad masken gör: 5,0 när den ligger kvar under normal användning, 4,0 när den bara släpper vid en funktion du kan låta bli att slå på, 2,5 när den förskjuts eller raderas så fort modellens huvudfunktion används, och 1,5 när tillverkaren anger att maskeringen inte hindrar inspelning.",
    },
    {
      key: "bild",
      label: "Bildunderlag när det gäller",
      weight: 25,
      description:
        "Om bilden duger som underlag och inte bara som notis. Upplösning, synfält och mörkerseende i färg eller infrarött. En kamera som larmar men ger en gryning av pixlar när du zoomar in ansiktet har löst halva problemet. Vi väger publicerade mått, inte marknadsföringsord, och vi har inte filmat med någon av kamerorna.",
    },
    {
      key: "kostnad",
      label: "Kostnad efter köp",
      weight: 20,
      description:
        "Vad kameran kostar efter att du burit hem den, och vad som slutar fungera om du inte betalar. Reolink, Tapo och eufy sparar på minneskort och kräver ingenting alls.\n\nRing spelar inte in utan abonnemang och tar 3,99 euro i månaden eller 39,99 euro om året för en kamera. Arlo låser både molninspelningen och igenkänningen av personer, fordon och paket bakom Arlo Secure, som kostar 149 kronor i månaden eller 1 639 kronor om året för ett hem med två till fyra kameror.",
    },
    {
      key: "lagring",
      label: "Lagring och oberoende",
      weight: 15,
      description:
        "Var materialet hamnar och vad som händer om tjänsten läggs ner. Minneskort eller nätverksinspelare i huset mot enbart moln. Samma fråga som gjorde Google Nest Protect till en varning på vår sida om smarta brandvarnare: en produkt vars funktion bor på någon annans server är utlånad, inte köpt.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 10,
      description:
        "Inköpspris ställt mot vad kameran ger, och mot vad den kräver därefter. Spannet är 999 till 2 099 kronor, alltså drygt dubbelt, medan skillnaden i vad du får ut är betydligt större än så. En kamera som kostar mer och sedan kostar mer varje månad hamnar långt ner här.",
    },
  ],
};

/**
 * Dörrklocka med kamera. Systersida till /overvakningskamera.
 *
 * Den enda kategori på sajten där IMY har ett eget exempel som säger nej:
 * en dörrkamera på en lägenhetsdörr faller utanför privatundantaget,
 * eftersom förbipasserande i trapphuset eller grannars lägenheter riskerar
 * att komma med i bild. Det gör boendeformen till första frågan och inte en
 * fotnot.
 *
 * Andra särdraget är ringklockan. En dörrklocka vars enda signal går till en
 * telefon är ingen dörrklocka, den är en kamera med knapp. Därför väger
 * signalen tjugo procent, vilket ingen konkurrent gör.
 *
 * Se .agent/research/dorrklocka-med-kamera.md.
 */
export const DORRKLOCKA_MED_KAMERA: TestPage = {
  slug: "dorrklocka-med-kamera",
  label: "Dörrklocka med kamera",
  title:
    "Dörrklocka med kamera bäst i test 2026: i lägenhet gäller inte undantaget",
  category: SAKERHET,
  methodology:
    "Det finns inget svenskt test av dörrklockor med kamera. Det finns däremot en myndighetstext med ett färdigt exempel som gäller dörrkameror på lägenhetsdörrar, och fem tillverkares egen dokumentation av den funktion som avgör om produkten går att använda lagligt. Vi har läst båda i original. Övriga uppgifter är lästa på butikens egen sida och daterade. Vi har inte monterat, ringt på eller filmat med någon dörrklocka. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "integritet",
      label: "Integritet och maskering",
      weight: 25,
      description:
        "En dörrklocka pekar per definition mot vägen fram till dörren, och i ett flerbostadshus mot trapphuset. Kriteriet mäter vilken sorts zon produkten faktiskt har, och om den svartar ut området i inspelningen eller bara stänger av notiserna.\n\nSkalan är 5,0 för en sekretesszon som svartar ut området i inspelningen utan förbehåll som rör en fast monterad dörrklocka, 4,0 för samma zon med ett förbehåll som bara slår in om du flyttar eller vrider enheten, 3,0 när tillverkaren skriver att rörelsedetektorn känner av området ändå eller att zonerna raderas när du justerar bilden, och 1,5 när den zon tillverkaren dokumenterar för modellen är en aktivitets- eller detekteringszon, alltså en som enligt tillverkarens egen text inte ändrar vad kameran spelar in.",
    },
    {
      key: "bild",
      label: "Vad du ser i dörren",
      weight: 25,
      description:
        "Om bilden svarar på frågan man faktiskt ställer sig i dörren. Upplösning, men framför allt vertikalt synfält: en dörrklocka som ser ansiktet men inte paketet på trappen har missat halva uppgiften, och den skillnaden syns i bildformatet snarare än i megapixlarna. Här väger också färgseende i mörker och om produkten spelar in sekunderna före tryckningen.",
    },
    {
      key: "signalen",
      label: "Ringklockan",
      weight: 20,
      description:
        "Om det ringer i bostaden och inte bara i telefonen. En dörrklocka vars enda signal är en notis fungerar inte när telefonen ligger på ljudlöst, laddar i ett annat rum eller har dåligt nät, och den fungerar inte alls för den som inte bär mobilen på sig hemma. Kriteriet mäter om en signalenhet ingår i lådan, om den kan kopplas till en befintlig ringklocka, och vad ett tillägg kostar när det inte ingår.",
    },
    {
      key: "kostnad",
      label: "Kostnad efter köp",
      weight: 20,
      description:
        "Vad som slutar fungera utan abonnemang, vad abonnemanget kostar och var materialet hamnar. En dörrklocka som inte sparar något lokalt kostar sitt hyllpris plus en avgift så länge du äger den, och den summan hör till köpbeslutet. Arlo Secure går på 99 kronor i månaden för en enhet, Ring Basic på 3,99 euro och Google Home Premium på 100 kronor. De fem som sparar på minneskort kostar ingenting alls efter köpet.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 10,
      description:
        "Inköpspris ställt mot vad som ingår och vad som krävs därefter. Spannet är 699 till 1 619 kronor, men det säger lite innan man räknat in signalenhet, strömadapter och abonnemang. Två produkter som skiljer 300 kronor i hyllan kan skilja tusen när allt som behövs ligger i kassen.",
    },
  ],
};

/**
 * Inomhuskamera. Systersida till /overvakningskamera, med omvänd juridik.
 *
 * IMY skriver att kamerabevakning inne i bostaden oftast omfattas av
 * privatundantaget, även kopplad till larmcentral. Undantaget är den som
 * regelbundet får besök i sitt hem av någon som arbetar, och myndighetens
 * eget exempel är hemtjänst. Det träffar precis den köpare som sätter upp en
 * kamera hos en åldrande förälder, alltså ett av kategorins vanligaste skäl.
 *
 * Produktfrågan som följer är en annan än utomhus. Där handlade allt om att
 * maskera bort det som ligger utanför tomten. Här handlar det om att kunna
 * stänga av kameran på ett sätt som går att se: ett skjutbart linsskydd är
 * ett mekaniskt löfte, ett läge i en app är ett löfte om programvara.
 *
 * Se .agent/research/inomhuskamera.md.
 */
export const INOMHUSKAMERA: TestPage = {
  slug: "inomhuskamera",
  label: "Inomhuskamera",
  title: "Inomhuskamera bäst i test 2026: linsskyddet du kan se med egna ögon",
  category: SAKERHET,
  methodology:
    "Det finns inget svenskt test av inomhuskameror. Det vi gör i stället är att läsa IMY:s regeltext i original, ta reda på hur varje kamera faktiskt går att stänga av, och hämta måtten ur tillverkarens egen specifikation, manual eller produktblad i stället för ur den svenska butikstexten. Priser och kundbetyg är lästa hos butiken och daterade. Vi har inte monterat eller filmat med någon kamera. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "avstangning",
      label: "Går den att stänga av på riktigt?",
      weight: 30,
      description:
        "Skillnaden mellan ett mekaniskt linsskydd och ett läge i en app. Ett skydd som fysiskt täcker eller vrider bort linsen syns tvärs över rummet och kräver ingen tillit till programvaran. Ett privatläge i appen är ett löfte, och det är ett löfte du inte kan kontrollera.\n\nSkalan graderar mekanismen. 5,0 för ett fysiskt skydd som går på av sig självt när kameran avlarmas, 4,5 för ett fysiskt skydd som sitter i kameran och går att automatisera med en egen regel, 4,0 för ett fysiskt skydd som sitter i kameran och styrs för hand, 3,5 för ett löst linsskydd du sätter på plats själv, och 2,5 för ett programläge som stänger av både bild och ljud.",
    },
    {
      key: "bild",
      label: "Bild och täckning",
      weight: 20,
      description:
        "Upplösning, synfält och om kameran kan panorera för att täcka ett helt rum. Inomhus är avstånden korta, så upplösningen betyder mindre här än utomhus och täckningen mer. En fast kamera i ett hörn ser en fjärdedel av rummet, en som vrider sig ser hela.",
    },
    {
      key: "kostnad",
      label: "Kostnad efter köp",
      weight: 20,
      description:
        "Vad som slutar fungera utan abonnemang, vad abonnemanget kostar och var materialet hamnar. Inomhusbilder är det känsligaste material ett hem producerar, och frågan var de lagras är därför inte bara ekonomisk.\n\nEn kamera med minneskort får 5,0, eftersom den fungerar fullt ut för noll kronor i månaden. Därifrån drar priset och beroendet ner: en kamera som inte sparar någonting alls utan abonnemang får 1,5 och en som bara tappar detekteringen får mer.",
    },
    {
      key: "hemtjanst",
      label: "Håller den när någon arbetar i hemmet?",
      weight: 20,
      description:
        "IMY:s eget exempel säger att privatundantaget inte gäller om du regelbundet får besök av hemtjänst, eftersom personalen då bevakas under sin arbetstid. Kriteriet mäter vad produkten erbjuder den situationen: schemaläggning så att kameran är av under besökstid, ett skydd som stängs automatiskt när någon är hemma, och om materialet stannar lokalt i stället för att hamna hos en molnleverantör.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 10,
      description:
        "Inköpspris ställt mot vad kameran ger. Spannet i kategorin är litet i kronor och stort i egenskaper: den billigaste kostar under en femhundring och den dyraste sex gånger så mycket, medan skillnaden i vad de gör är större än så.",
    },
  ],
};

/**
 * Kodlås till ytterdörr.
 *
 * Sidans fynd står i ett certifikat. Yale Doorman L3 är SBSC-certifierad
 * enligt SSF 3523 klass S3, certifikat 21-537, och certifikatets eget fält
 * Additional säger vad godkännandet gäller för: "bortasäkert läge med
 * blockerade användarkoder och låsöppning med nyckelbricka eller med appen
 * Yale Home". Alltså ligger knappsatsen utanför den provade konfigurationen,
 * på den produkt kategorin är uppkallad efter.
 *
 * Det är Stöldskyddsföreningens allmänna varning gjord konkret: "det finns
 * begränsningar i vilka funktioner som får aktiveras för att uppfylla kraven
 * för godkänd låsenhet".
 *
 * Se .agent/research/kodlas-ytterdorr.md.
 */
export const KODLAS_YTTERDORR: TestPage = {
  slug: "kodlas-ytterdorr",
  label: "Kodlås till ytterdörr",
  title:
    "Kodlås till ytterdörr bäst i test 2026: varje certifikat har ett villkor",
  category: SAKERHET,
  methodology:
    "Det finns inget svenskt test av kodlås till ytterdörr. Däremot finns något starkare: en svensk norm, ett certifieringsorgan och certifikat som går att läsa i original. Stöldskyddsföreningen definierar vad en godkänd låsenhet är, SBSC certifierar mot normen, och certifikaten anger klass, giltighetstid och vilka inställningar godkännandet gäller för.\n\nVi har läst normtexten och samtliga elva certifikat som finns för låsen i jämförelsen, ett i taget, och bekräftat klasserna en andra gång hos tillverkaren. Priser, mått och funktioner är lästa på butikens egen sida och daterade. Vi har inte monterat, dyrkat eller provat något lås. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "godkand",
      label: "Godkänd låsenhet",
      weight: 30,
      description:
        "Vilken klass låset är certifierat i. En godkänd låsenhet är enligt SSF hela enheten, alltså låshus, cylinder, slutbleck och förstärkningsbehör, där varje del och helheten når klass 3 enligt SSF 3522 eller klass S3 enligt SSF 3523.\n\nSkalan är 5,0 för klass 3 eller S3 på varje certifierad del och prövning även enligt den digitala normen, 4,5 för klass 3 på varje certifierad del men bara mekaniskt, 2,5 för certifiering i klass 2A, som har samma inbrottsskydd utifrån men inte räcker till en godkänd låsenhet, och 1,0 när låset anges vara icke godkänt. Ett villkor i certifikatet sänker inte betyget: det står i tabellen och i omdömet, eftersom det är köparen som avgör om villkoret spelar roll för hen.",
    },
    {
      key: "dorren",
      label: "Dörren och installationen",
      weight: 25,
      description:
        "Om låset passar en svensk ytterdörr och vad monteringen innebär. Skandinaviska låshus har ett eget uttag som internationella lås sällan matchar, och dörrtjocklek mellan 40 och 90 millimeter avgör resten. Här väger också vilken arkitektur låset har: byter det hela låsenheten, eller monteras det utanpå det befintliga vredet på insidan? Den skillnaden avgör om en godkänd låsenhet kan finnas kvar orörd bakom.",
    },
    {
      key: "vardagen",
      label: "Vardagen",
      weight: 20,
      description:
        "Hur du faktiskt kommer in. Antal koder och brickor, fingerläsare, app, automatisk låsning och om det finns en mekanisk nödnyckel. Ett lås som klarar tio koder räcker för en familj men inte för en bostadsrättsförening med städfirma och hantverkare, och skillnaden mellan tio och 999 kostar sällan så mycket som den ser ut att göra.",
    },
    {
      key: "drift",
      label: "Oberoende och drift",
      weight: 15,
      description:
        "Vad som händer när batteriet tar slut, när wifi ligger nere eller när tillverkaren stänger en tjänst. Batterityp och angiven livslängd, om låset fungerar utan app och moln, och om det finns en nödöppning som inte kräver ström. Ett lås vars grundfunktion bor på någon annans server är utlånat och inte köpt.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 10,
      description:
        "Inköpspris ställt mot vad du får. Spannet är 1 990 till 5 488 kronor, alltså nästan tre gånger, och det dyraste är också det enda som är prövat enligt den digitala normen. Här väger också vad som säljs separat: brickor, uppkopplingsmodul och batteripaket ligger inte alltid i lådan.",
    },
  ],
};

/**
 * Hemlarm med larmcentral.
 *
 * Sajtens första **tjänst** och inte produkt. Se lib/services.ts för varför det
 * kräver en egen typ.
 *
 * ## Sidans fynd
 *
 * **Två av åtta bolag publicerar hela priset**, alltså både månadsavgift och
 * startavgift. Fyra publicerar ett månadstal, varav ett bara som från-pris.
 * Fyra publicerar ingen månadsavgift alls. Det är svaret på varför `vad kostar
 * hemlarm i månaden` har 90 sökningar i månaden och ett toppbud på 181 kronor:
 * frågan är obesvarad därför att halva branschen valt att inte svara på den.
 *
 * ⚠️ Ett tidigare utkast skrev "ett av åtta". Det var fel och byggde på att
 * SecuritasHomes och Avarns prissidor renderas i JavaScript respektive ligger
 * under en tjänstemeny, så att den första curl-omgången missade dem. Rättat
 * innan något publicerades. Se .agent/research/hemlarm.md avsnitt 6c.
 *
 * Det andra fyndet är att bindningstiden inte är dold utan **prissatt**.
 * Verisure tar 3 990 kronor i uppkoppling med tolv månaders bindning och
 * 5 990 utan. Friheten kostar alltså 2 000 kronor, och ingen jämförelsesajt
 * skriver det, eftersom de valt var sitt av de två talen.
 *
 * Det tredje är att du hyr larmet. Båda marknadsledarna skriver ut det, och
 * bara den ena erbjuder friköp.
 *
 * ## Varför kriteriet heter öppna villkor och inte pris
 *
 * Samma mönster som `dokumenterad provning` i brandfamiljen: mät det köparen
 * kan kontrollera själv före betalning, med en publicerad skala där tystnad
 * ger lägst poäng. Ett bolag som tar 599 kronor och skriver det är mer värt än
 * ett som kanske tar 400 och vägrar säga det.
 *
 * Se .agent/research/hemlarm.md.
 */
export const HEMLARM: TestPage = {
  slug: "hemlarm",
  label: "Hemlarm",
  title: "Hemlarm bäst i test 2026: hälften skriver ut vad det kostar",
  category: SAKERHET,
  methodology:
    "Det finns inget svenskt test av hemlarmstjänster, och det går inte att göra ett: en tjänst med larmcentral kan inte provas i ett labb. Vi har i stället läst det som faktiskt binder bolaget, alltså avtalsvillkoren, i original och med utgåva och punktnummer angivna.\n\nLästa i sin helhet: Verisures allmänna villkor 2025:1, tjänstevillkoren för inbrottslarm 2024:2 och villkoren för larm monterat av kund 2025:1, Sector Alarms avtalsvillkor SAS 2.1, SecuritasHomes allmänna villkor, Svenska Alarms sju villkorsdokument, Safelands tjänstevillkor och abonnemangsvillkor 1.5, samt Garda Alarms villkor för hemlarm.\n\nPriserna är lästa på bolagets egen sida, och där bolaget inte publicerar något pris står det som saknad uppgift och aldrig som en gissning. Ett belopp som bara står i avtalsdokumentet räknas som publicerat, eftersom det går att läsa innan man skriver under. Ingen leverantör har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "oppna",
      label: "Öppna villkor",
      weight: 30,
      description:
        "Vad du kan ta reda på innan du släpper in en säljare. Sju av åtta bolag publicerar en löpande avgift och bara fyra publicerar hela priset. Publiceras den löpande avgiften på bolagets egen sida? Publiceras startavgiften, bindningstiden och uppsägningstiden? Går avtalsvillkoren att läsa i sin helhet utan att lämna ifrån sig kontaktuppgifter?\n\nSkalan är 5,0 när löpande avgift, startavgift och fullständiga villkor är publicerade, 3,5 när villkoren finns men bara en del av priset, 2,0 när enbart ett startpaketspris publiceras, och 1,0 när ingen prisuppgift alls går att hitta utan offertförfrågan. En avgift som faktureras per år räknas som en publicerad löpande avgift.\n\nKriteriet mäter öppenhet och inte prisnivå: ett dyrt bolag som skriver sitt pris slår ett billigt som vägrar. Det mäter däremot inte hur lätt uppgiften var att hitta: ett villkorsdokument som ligger publicerat räknas som publicerat även när sajten inte länkar till det.",
    },
    {
      key: "lamna",
      label: "Kostnaden att lämna",
      weight: 25,
      description:
        "Vad som händer när du vill sluta. Vem äger utrustningen, hur lång är bindningstiden och uppsägningstiden, finns det en publicerad friköpstrappa och vilka avgifter kan utlösas vid avslutet? Här väger också om hårdvaran fortsätter fungera efteråt.\n\nSpannet är stort. Safeland har varken bindningstid eller uppsägningstid och Garda Alarm binder i 36 månader med ett års förlängning. Verisure publicerar en friköpstrappa men garanterar ingen funktion efter friköp, och Sector Alarm erbjuder ingen friköpsmöjlighet alls för larmsystemet.",
    },
    {
      key: "larm",
      label: "Åtgärd vid larm",
      weight: 20,
      description:
        "Vad avtalet faktiskt lovar när larmet går. Hur verifieras ett larm, ingår väktarutryckning och under vilka förutsättningar, vad gäller under den första tiden efter installation, och hur stor är självriskelimineringen? Inget bolag garanterar utryckning, vilket är värt att veta, men skillnaderna i hur de beskriver kedjan är stora och de står i tjänstevillkoren.",
    },
    {
      key: "larmcentral",
      label: "Larmcentral och certifiering",
      weight: 15,
      description:
        "Vem tar emot larmet. Egen bemannad larmcentral eller inköpt kapacitet, certifiering enligt SSF-normerna för anläggarfirma och larmcentral, tillstånd enligt larmlagen, och om kommunikationen går dubbla vägar så att ett bredbandsavbrott inte tystar larmet. Vi redovisar vad bolaget själv anger och påstår aldrig att ett bolag saknar certifikat vi inte kunnat kontrollera.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 10,
      description:
        "Vad du får för pengarna över tid, räknat på fem år inklusive startavgift. Kriteriet väger lätt av en enkel anledning: för fem av åtta bolag går det inte att räkna, eftersom hela priset inte publiceras. Att låta prisvärde väga tungt hade betytt att betygsätta gissningar.",
    },
  ],
};

/**
 * Larm utan abonnemang, alltså hårdvara du köper och monterar själv.
 *
 * Systersida till /hemlarm. Där är produkten en tjänst med larmcentral och
 * månadsavgift; här äger du utrustningen och ingen bemannad central tittar.
 *
 * ## Varför det inte finns något kriterium för testomdöme
 *
 * Det finns fyra svenska tester i kategorin, och alla fyra testar Ajax. PC för
 * Alla och Allt för Hemmet har till och med riktig Product- och Review-schema
 * med betyg. Men täckningen är en av fem rankade produkter, och ett kriterium
 * som bara en produkt kan få poäng på är en bonus till den produkten och inte
 * ett mått. Samma bedömning som på /brandvarnare.
 *
 * ## Sidans två fynd
 *
 * **Larmklass R.** SSF 140 är normen för precis den här produkten, alltså
 * inbrottslarm med trådlös förbindelse i bostad, och den definierar en egen
 * larmklass R. SBSC, certifieringsorganet, skriver att den som projekterar och
 * installerar som lägst måste vara certifierad enligt SSF 1112. En anläggning
 * blir alltså godkänd av vem som installerat och intygat den, inte av hur bra
 * hårdvaran är. Det gör påståendet att larm sänker hemförsäkringen ogrundat
 * för den här produktklassen. Normerna är samtidigt frivilliga och
 * försäkringsbolagen får avtala om annat, vilket sidan skriver ut.
 *
 * **Reservuppkopplingen.** Två av fem säljer 4G-backup som ett abonnemang, i
 * en kategori som definieras av att inte ha abonnemang. Två har ingen backup
 * alls. Den enda där den ingår kostar 8 259 kronor.
 *
 * Se .agent/research/larm-utan-abonnemang.md.
 */
export const LARM_UTAN_ABONNEMANG: TestPage = {
  slug: "larm-utan-abonnemang",
  label: "Larm utan abonnemang",
  title:
    "Larm utan abonnemang bäst i test 2026: två av fem tar betalt för reservuppkopplingen",
  category: SAKERHET,
  methodology:
    "Det finns fyra svenska tester av larm utan abonnemang och alla fyra testar samma märke, så vi har inget kriterium för testomdöme. Det vi gör i stället är att läsa två saker i original. Det första är normerna: SSF 140 för inbrottslarm med trådlös förbindelse i bostad, SBSC:s krav på vem som får installera enligt den, Svensk Försäkrings beskrivning av vad en försäkringsanläggning är, och larmlagen. Det andra är butikernas egna specifikationer, rad för rad, med särskild uppmärksamhet på vad som kräver en prenumeration. Alla priser och uppgifter är lästa på butikens egen sida och daterade. Där en butik inte anger en uppgift står det som saknad uppgift och aldrig som en nolla. Vi har inte monterat, larmat eller försökt sabotera något system. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "uppkoppling",
      label: "Uppkoppling när nätet dör",
      weight: 25,
      description:
        "Vad larmet gör när bredbandet försvinner, vilket är det enklaste sättet att slå ut ett uppkopplat larm. Två saker mäts: om det finns en reservkanal utöver hemmets nät, alltså mobilnät eller en andra internetleverantör, och hur länge hubben går på eget batteri vid strömavbrott. En reservkanal som kräver en prenumeration räknas inte som ingående, den räknas under nästa kriterium.\n\nSkalan är 5,0 när flera kanaler och mobilnät ingår i priset, 3,0 när hubben har ett långt reservbatteri men mobilnätet kräver en plan, och 1,0 när systemet varken har en reservkanal eller ett reservbatteri. Alla fem batteritider är hämtade ur tillverkarens egen dokumentation.",
    },
    {
      key: "utanAbonnemang",
      label: "Vad som fungerar utan abonnemang",
      weight: 25,
      description:
        "Kategorins hela löfte, prövat mot vad som faktiskt är låst bakom en plan. Här räknas larmets kärnfunktioner: att sirenen ljuder, att notisen kommer fram, att historiken går att läsa och att reservuppkopplingen fungerar. Att en videotjänst eller en professionell bevakning kostar extra är rimligt och drar inte ner betyget. Att skyddet mot en avklippt uppkoppling gör det, eftersom det är en larmfunktion och inte en tilläggstjänst.",
    },
    {
      key: "larmfunktion",
      label: "Larmfunktion",
      weight: 20,
      description:
        "Själva larmet. Sirenens ljudnivå i decibel där den anges, om sirenen sitter i hubben eller är en egen enhet, vad som ingår i paketet, om det finns knappsats, och sensorernas räckvidd och batteritid. En siren inuti hubben hörs sämre och är lättare att tysta än en separat siren på en vägg, och en knappsats avgör om någon som inte har appen kan larma av.",
    },
    {
      key: "utbyggnad",
      label: "Utbyggnad och kompatibilitet",
      weight: 15,
      description:
        "Hur långt systemet räcker efter startpaketet. Antal enheter det tar, bredden i sortimentet av detektorer och sirener, om det pratar med lås och kameror från samma tillverkare, och om det går att koppla till annat du redan har. Ett larm köps sällan färdigt: de flesta börjar med ytterdörren och lägger till efter hand.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 15,
      description:
        "Vad du får för pengarna, inte lägst pris. Spannet är 629 till 8 259 kronor, alltså tretton gånger, och det dyraste är också det enda där reservuppkopplingen ingår. Här väger också vad som saknas i lådan: en separat siren, en knappsats eller en extra detektor kostar mellan 495 och 1 315 kronor att lägga till.",
    },
  ],
};

/**
 * Luftrenare. Öppnar gruppen Hem & hushåll.
 *
 * ## Sidans fynd: myndigheterna granskade kategorin i januari
 *
 * Kemikalieinspektionen och Elsäkerhetsverket publicerade 2026-01-23 en
 * gemensam marknadskontroll, Tillsyn 2/26. Fyra av tjugo granskade luftrenare
 * klarade inte gränsvärdet för ozonavgivning, tre av dem låg långt över, och
 * majoriteten hade någon form av brist. Granskningen gällde apparater avsedda
 * att stå på medan personer vistas i rummet.
 *
 * Ingen av de sex svenska konkurrentsidor vi mätt nämner granskningen.
 *
 * ## Varför reningsteknik och filterklass väger lika tungt
 *
 * De två kriterierna svarar på var sin halva av samma fråga. Reningsteknik
 * frågar vad apparaten **lägger till** utöver filtret, eftersom jonisering, UV
 * och plasma enligt rapporten kan bilda ozon som biprodukt. Filterklass frågar
 * vad filtret faktiskt **fångar**, mätt mot EN 1822 där bara H13 och H14 är
 * HEPA.
 *
 * Båda är kontrollerbara i butikens egen text före köp, vilket är hela
 * skillnaden mot att gissa. Tillsammans väger de 50 av 100.
 *
 * ## Varför det inte finns något kriterium för testomdöme
 *
 * Det såg först ut att finnas: Råd & Rön uppges ha testat med poäng, vilket
 * hade blivit sajtens första kriterium med verklig svensk provning bakom sig.
 * Uppgiften kom från en sökmotorsammanfattning och gick inte att bekräfta i
 * original. Båda produkterna i den visade sig dessutom vara en utgången modell
 * respektive en proffsprodukt för 11 990 kronor. Se
 * .agent/research/luftrenare.md §9.
 */
export const LUFTRENARE: TestPage = {
  slug: "luftrenare",
  label: "Luftrenare",
  title: "Luftrenare bäst i test 2026: fyra av tjugo klarade inte ozongränsen",
  category: HEM_HUSHALL,
  methodology:
    "Kategorin har en primärkälla som är bättre än ett test. Kemikalieinspektionen och Elsäkerhetsverket köpte in tjugo luftrenare, mätte ozonavgivningen, provade elsäkerheten och analyserade kemikalieinnehållet, och publicerade resultatet i januari 2026. Rapporten är på 45 sidor, vi har läst den i sin helhet, och den avgör hur vi väger.\n\nDärutöver läser vi EN 1822, standarden som avgör vad ordet HEPA betyder, tillverkarnas egna datablad, manualer och supportsvar, och varje produkts specifikation hos butiken rad för rad. Priser, kundbetyg, filterklasser, ytor, luftflöden, ljudnivåer och priset på ett utbytesfilter är lästa i original och daterade.\n\nVi har inte mätt partikelhalter, inte mätt ozon och inte provat någon apparat. Rapporten namnger inte de produkter som föll, och vi antyder därför aldrig vilka de var. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "teknik",
      label: "Reningsteknik och biprodukter",
      weight: 25,
      description:
        "Vad apparaten gör utöver att pressa luft genom ett filter. Ett filter tar partiklarna ur luften och bildar ingenting nytt. Jonisering, UV-ljus, plasma och katalytisk oxidation kan enligt Kemikalieinspektionens och Elsäkerhetsverkets granskning bilda ozon som biprodukt, och ozon irriterar luftvägar och ögon och kan förvärra astma.\n\nSkalan: **5,0** för filter enbart. **2,5** för ett aktivt steg vid sidan av filtret. **2,0** för två aktiva steg där tillverkaren själv anger att det ena avger ozon. **1,0** när jonisering är hela reningsprincipen och apparaten saknar filter.",
    },
    {
      key: "filterklass",
      label: "Vad filtret fångar",
      weight: 25,
      description:
        "EN 1822 delar in filter i EPA, alltså E10 till E12, HEPA, alltså H13 och H14, och ULPA. Bara H13 och H14 är HEPA, och de är provade vid den partikelstorlek som är svårast att fånga, kring 0,1 till 0,2 mikrometer. Ordet HEPA används ändå fritt i handeln.\n\nSkalan: **5,0** för ett H13 eller H14. **3,5** utan klass, men med en angiven avskiljning vid 0,1 till 0,2 mikrometer, alltså mätt där det är svårast. **2,5** utan klass och med avskiljningen angiven bara vid 0,3 mikrometer, som är ett lättare prov. **1,0** för en apparat utan HEPA-filter. Ett H13 är ett H13 oavsett var det står.",
    },
    {
      key: "kapacitet",
      label: "Kapacitet mot rumsstorlek",
      weight: 20,
      description:
        "Om apparaten räcker till rummet du tänkt ha den i. CADR, alltså renluftsflödet i kubikmeter per timme, väger tyngre än den angivna ytan, eftersom ytan vilar på ett antagande om takhöjd och luftväxlingar. Samma apparat räcker till 60 kvadratmeter vid en luftväxling i timmen och till 12 vid nästan fem, och det är den skillnaden som avgör om den klarar rummet eller bara ser ut att göra det.",
    },
    {
      key: "ljudOchDrift",
      label: "Ljudnivå och driftkostnad",
      weight: 15,
      description:
        "Vad det kostar att ha den igång, i decibel och i kronor. Skillnaden mellan 22 och 66 decibel avgör om apparaten kan stå i ett sovrum eller bara i en hall.\n\nFiltren är den dolda kostnaden. Ett utbytesfilter kostar 300 till 1 100 kronor i samma butik och byts oftast en gång om året, så över fem år kan förbrukningen bli mer än vad apparaten kostade.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 15,
      description:
        "Vad du får för pengarna, inte lägst pris. Spannet är 599,90 till 2 999 kronor, alltså fem gånger. Här väger också kundunderlaget där det finns: en produkt med 721 omdömen säger mer om vardagen än en med noll, oavsett vad specifikationen lovar.",
    },
  ],
};

/**
 * Luftfuktare. Systersida till LUFTRENARE och andra sidan i Hem & hushåll.
 *
 * Kategorin är den första där **expertorganet avråder från själva produkten**.
 * SweSIAQ skriver att man i allmänhet bör undvika konstgjord befuktning, och
 * Folkhälsomyndighetens allmänna råd namnger 45 % vid 21 °C som en indikation
 * som kan få tillsynsmyndigheten att kräva undersökning av bostaden. Det ligger
 * mitt i det spann varje butik marknadsför. Sidan rankar ändå, men säger det
 * först. Se .agent/research/luftfuktare.md §1.
 *
 * ⚠️ **Inget testomdömekriterium.** Kontrollerat produkt för produkt: av elva
 * rankade täcks två av oberoende test, Philips 5000 av Ljud & Bild och Beurer
 * LB 300 Plus av Stiftung Warentest. Det är för tunt för ett eget kriterium.
 */
export const LUFTFUKTARE: TestPage = {
  slug: "luftfuktare",
  label: "Luftfuktare",
  title:
    "Luftfuktare bäst i test 2026: expertorganet avråder, och vi säger det först",
  category: HEM_HUSHALL,
  methodology:
    "Kategorin har två svenska normkällor som väger tyngre än något test, och vi har läst båda i original. Folkhälsomyndighetens allmänna råd FoHMFS 2014:14 namnger 45 procent relativ luftfuktighet vid 21 grader som en indikation som kan få tillsynsmyndigheten att kräva undersökning av bostaden. SweSIAQ, den svenska föreningen för inomhusmiljö, skriver att man i allmänhet bör undvika konstgjord befuktning av luften.\n\nDärutöver har vi läst två tyska laboratorieprov som odlat bakterier ur luften från luftfuktare, och det svenska grupptest som finns. Varje produkts teknik, målfuktighet, kapacitet, tankvolym och effekt är hämtad ur tillverkarens manual eller produktblad och daterad, och för sju av apparaterna löste manualen en uppgift produktsidan saknade.\n\nVi har inte mätt luftfuktighet, inte odlat bakterier och inte provat någon apparat. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "fuktreglering",
      label: "Fuktreglering",
      weight: 25,
      description:
        "Om apparaten kan hålla en nivå du bestämmer, eller bara går tills tanken är tom. Det här är kategorins viktigaste egenskap och den minst omtalade, eftersom hela risken ligger i att fukta för mycket: Folkhälsomyndigheten namnger 45 procent vid 21 grader som en indikation för att kräva undersökning av bostaden, och en apparat utan hygrostat kan inte hjälpa dig att stanna under den. Skalan är 5,0 när målnivån går att ställa fritt i små steg, 4,0 när den går att ställa i fasta steg, 3,5 när apparaten mäter fukten men inte låter dig sätta ett mål, 2,0 när den bara har effektlägen och 1,0 när den bara har en timer.",
    },
    {
      key: "hygien",
      label: "Hygien och teknik",
      weight: 25,
      description:
        "Om tekniken finfördelar tankens innehåll ut i rummet, och vad tillverkaren gör åt det. Ultraljud slår sönder vattnet till dimma och skickar med allt som finns i det, både mineraler och bakterier. Det är den teknik ÖKO-TEST pekade ut när fem av åtta apparater spred mellan 400 000 och drygt 60 miljoner kolonibildande enheter i timmen. Förångning låter vattnet avdunsta genom en veke, så mineraler och mikrober stannar i filtret, och ånga kokar vattnet.\n\nSkalan är 5,0 för förångning, 4,5 för ånga, 2,5 för ultraljud med en åtgärd mot bakterier i vattnet, alltså silverstav, UV-lampa eller keramiskt filter, och 2,0 för ultraljud utan.",
    },
    {
      key: "kapacitet",
      label: "Kapacitet mot rummet",
      weight: 20,
      description:
        "Om apparaten räcker till rummet du ska ha den i. Avgiven fukt i milliliter per timme väger tyngre än ytan i kvadratmeter, eftersom ytan bygger på antaganden om takhöjd och luftväxling. Spannet är stort: 150 ml/h i botten och 600 i toppen, alltså fyra gånger.\n\nTanken väger också in, eftersom den avgör hur ofta du fyller på. Överdimensionering är samtidigt det praktiska sättet att råka passera 45 procent, så störst är inte bäst.",
    },
    {
      key: "drift",
      label: "Driftkostnad",
      weight: 15,
      description:
        "Vad det kostar att ha den igång, i el och i förbrukningsdelar. Stiftung Warentest räknade fram 13 till 247 euro om året för åtta apparater, alltså grovt 150 till 2 800 kronor, och skillnaden ligger nästan helt i filter och vekar. Elen skiljer också: de här elva drar mellan 13 och 280 watt, vilket är en faktor tjugo.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 15,
      description:
        "Vad du får för pengarna, inte lägst pris. Spannet är 399,90 till 1 999 kronor, alltså fem gånger. En apparat som kostar lika mycket som vinnaren utan att göra det vinnaren gör faller här, och en billig apparat som räcker till ett sovrum stiger.",
    },
  ],
};

/**
 * Hygrometer. Fjärde sidan i Hem & hushåll, och den som betjänar en efterfrågan
 * vi själva skapat: fyra sidor ber elva gånger läsaren mäta fukten först, utan
 * att ha haft något att länka till.
 *
 * ⚠️ **Sidans fynd är omskrivet 2026-08-06.** Den byggdes på att två av tretton
 * mätare anger hur mycket fel de får visa. Ett gap-pass mot manualerna gav fem
 * av de sju rankade, och tre påståenden om saknade uppgifter var falska. Se
 * filhuvudet i `lib/data/hygrometer.ts` och rättelsen i `lib/corrections.ts`.
 *
 * Kategorins fynd är i stället att **toleransen är standardiserad och för vid.**
 * Beurer HM 16, Beurer HM 22 och Rubicson Kompakt anger identiska ± 5
 * procentenheter mellan 40 och 80 procent och ± 8 utanför, trots att de kostar
 * 179,90, 199,90 och 269 kronor. Två slår standarden: TFA Moxx med ± 4 och
 * Govee H5075 med ± 3.
 *
 * Det räcker inte. Våra egna sidor ber läsaren agera vid 45 procent (FoHMFS
 * 2014:14), vid 45 till 50 (SweSIAQ, kvalster) och vid 60 (mögel), alltså tre
 * gränser inom femton procentenheter. En mätare med ± 5 spänner tio.
 *
 * ⚠️ **Toleransen står i manualen, inte på produktsidan.** Det var därför sidan
 * hade fel. Öppna den PDF butiken eller tillverkaren själv länkar innan du
 * skriver något om vad någon inte anger.
 *
 * ⚠️ **Noggrannhet fukt och uppmätt avvikelse får aldrig slås ihop.** Det förra
 * är tillverkarens utfästelse, det senare vad Bundesverband
 * Schimmelpilzsanierung mätte mot ett referensinstrument för 1 050 euro. Båda
 * står i `ALDRIG_BEDOMD` i `lib/spec-schema.mjs`: en gissad tolerans vore en
 * påhittad mätning.
 *
 * ⚠️ Sex svenska jämförelsesajter korar Shelly H&T Gen 3 till bäst i test.
 * Shelly publicerar ingen tolerans för fukt, varken på produktsidan, i
 * dokumentationen eller i kunskapsbasen. Kontrollerat på nytt 2026-08-06.
 * **Den frånvaron drar inte ner betyget**, se `noggrannhet` nedan.
 *
 * Vikterna är användarens beslut 2026-08-04. Se `.agent/research/hygrometer.md`.
 */
export const HYGROMETER: TestPage = {
  slug: "hygrometer",
  label: "Hygrometer",
  title:
    "Hygrometer bäst i test 2026: felmarginalen är 3 till 8 procentenheter",
  category: HEM_HUSHALL,
  methodology:
    "Kategorin avgörs av hur många procentenheter mätaren får visa fel, och det talet står nästan aldrig på produktsidan. Vi har läst det i tillverkarens egen specifikation och i de bruksanvisningar butikerna själva länkar, aldrig i butikstexten och aldrig i en söklista.\n\nFem av de sju rankade mätarna anger en tolerans för fukten. Tre av dem anger identiska ± 5 procentenheter mellan 40 och 80 procent och ± 8 utanför, trots att de kostar 179,90, 199,90 och 269 kronor. Tröskelvärdena vi mäter mot kommer från Folkhälsomyndighetens allmänna råd FoHMFS 2014:14 och från SweSIAQ.\n\nDen enda oberoende provning vi hittat är Bundesverband Schimmelpilzsanierungs, där fjorton mätare jämfördes mot ett kalibrerat referensinstrument för 1 050 euro. Den är från 2015 och 2016 och gäller de exemplaren, inte dagens, och den täcker en av de sju. Ett uppmätt fel och en utfäst tolerans hålls därför isär: det ena är ett resultat, det andra ett löfte.\n\nEn mätare vars tolerans vi inte hittat får inget avdrag för det. Betyget svarar mot vad mätaren gör, aldrig mot vad vi lyckats läsa oss till. Priser, betyg och specifikationer är lästa på butikernas och tillverkarnas egna sidor och daterade. Vi har inte mätt någon luftfuktighet och inte provat någon mätare. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "noggrannhet",
      label: "Noggrannhet",
      weight: 35,
      description:
        "Hur mycket fel mätaren visar, i procentenheter relativ fuktighet. Det avgör om avläsningen går att lita på nära en gräns, och därför väger det tyngst.\n\nEn oberoende mätning går före tillverkarens utfästelse. Skalan är 5,0 när någon utomstående mätt avvikelsen till under en procentenhet, 4,5 vid ± 3, 4,0 vid ± 4 till ± 5 i det spann ett bostadsrum ligger i, 3,5 för en digital mätare utan publicerad tolerans, 3,0 vid ± 8 rakt igenom och 1,5 för analog konstruktion.\n\nAtt en digital mätare utan publicerad tolerans hamnar på 3,5 är ingen gissning och inget avdrag. Bundesverband Schimmelpilzsanierung mätte åtta digitala mätare mellan 5,99 och 136 euro och samtliga låg inom 4,4 procentenheter, alltså inom det branschen anger. Analogt hamnar lägre av motsatt skäl: samma provning fann upp till tolv procentenheters spridning mellan tre exemplar av en och samma analoga modell.",
    },
    {
      key: "avlasning",
      label: "Avläsning och placering",
      weight: 20,
      description:
        "Om du kan läsa av talet där fukten faktiskt är. Problemet sitter sällan i vardagsrummet utan i krypgrunden, källaren, badrummet och sovrumsväggen bakom garderoben, och en mätare du måste krypa fram till för att läsa blir en mätare du inte läser. Här väger trådlös eller uppkopplad avläsning tungt, liksom sifferstorlek och om den går att både ställa och hänga. Ett flerpack väger också in, eftersom fukt är en fråga per rum och inte per bostad.",
    },
    {
      key: "funktion",
      label: "Mätområde och funktion",
      weight: 20,
      description:
        "Om mätaren täcker det spann du behöver och kommer ihåg vad den sett. De flesta börjar vid 20 procent och slutar vid 95, vilket räcker inomhus men inte alltid i en krypgrund om vintern. Min- och maxminne avgör om du kan se vad som hände i natt eller bara vad som är just nu, och logg över tid är skillnaden mellan att gissa och att veta om avfuktaren gör nytta. Larm vid en gräns du satt själv väger också in.",
    },
    {
      key: "prisvarde",
      label: "Pris och värde",
      weight: 15,
      description:
        "Vad du får för pengarna, inte lägst pris. Priset förutsäger noggrannheten sämre här än i någon annan kategori vi mätt: Rubicson Kompakt för 179,90 anger samma tolerans som Beurer HM 22 för 269, och den snävaste av allihop kostar 219. Det priset köper är display, loggning och uppkoppling. Ett flerpack som ger en mätare per rum räknas som det det är, inte som ett budgetalternativ.",
    },
    {
      key: "bygg",
      label: "Bygg och batteri",
      weight: 10,
      description:
        "Om den håller och hur ofta du måste bry dig. En hygrometer ska sitta orörd i åratal, ofta på ett kallt och fuktigt ställe, och det som avgör är batterityp och batteritid snarare än materialkänsla. Knappcell räcker längre än man tror i en enkel display men kortare i en uppkopplad givare, och en uppkopplad mätare med tomt batteri är sämre än en enkel som fortfarande visar rätt.",
    },
  ],
};

/**
 * Luftkvalitetsmätare. Systersida till hygrometer, byggd samma dag, men en helt
 * annan kategori i pengar: 729 till 3 299 kronor mot hygrometerns 139,90 till
 * 1 199. Här är det verkligt möjligt att lägga tretusen kronor på fel sak.
 *
 * ## Kategorins fråga är vilka givare som sitter i lådan
 *
 * **Tre av åtta kartlagda saknar CO2-givare helt**, trots att de säljs som
 * luftkvalitetsmätare, och en fjärde anger `eCO2`. Det är inte en mätning av
 * koldioxid utan ett tal uträknat ur halten flyktiga organiska ämnen, och
 * samma tal stiger av en doftspray i ett tomt rum. Mill Sense för 729 kronor
 * anger `eCO2` i Clas Ohlsons egen produkttext.
 *
 * Airthings använder riktig NDIR och publicerar dessutom en tolerans, ±30 ppm
 * ±3 % mellan 15 och 35 °C. Samma mönster som hygrometersidan, fast vänt: den
 * som har en riktig givare skriver ut vad den klarar.
 *
 * **View Radon kostar 1 899 kronor och mäter radon, fukt och temperatur.**
 * Inget annat.
 *
 * ## ⚠️ Radonregeln ligger i köpguiden, inte i rankningen
 *
 * Användarbeslut 2026-08-04. Strålsäkerhetsmyndigheten skriver att en
 * korttidsmätning "bara är rådgivande, den kan inte användas för något
 * myndighetsbeslut", och att en giltig långtidsmätning kräver spårfilm i minst
 * två månader mellan 1 oktober och 30 april, i minst två rum, beställd genom
 * ett ackrediterat laboratorium. Ingen av de fyra svenska konkurrenterna nämner
 * något av det.
 *
 * Det står därför i köpguiden och i FAQ, och **radonmätarna straffas inte i
 * rankningen för det**.
 *
 * `beslutsnytta` mäter alltså **om avläsningen går att agera på över huvud
 * taget**, inte om den duger till ett myndighetsbeslut. `eCO2` straffas hårt,
 * eftersom talet inte motsvarar någon verklig storhet. Radonmätarna gör det
 * inte: deras nytta är verklig och består i att tala om ifall det är värt att
 * beställa den riktiga mätningen, och i att visa säsongsvariation och om en
 * åtgärd hjälpte. Spårfilmen gör inte det.
 *
 * ⚠️ **Vi publicerar inget pris på en ackrediterad mätning.** Sökresultat gav
 * tre olika tal och laboratoriernas egna produktsidor svarar 404. Se
 * `.agent/research/luftkvalitetsmatare.md`.
 *
 * Vikterna är användarens beslut 2026-08-04.
 */
export const LUFTKVALITETSMATARE: TestPage = {
  slug: "luftkvalitetsmatare",
  label: "Luftkvalitetsmätare",
  title:
    "Luftkvalitetsmätare bäst i test 2026: tre av åtta mäter inte koldioxid",
  category: HEM_HUSHALL,
  methodology:
    "Kategorin avgörs av vilka givare som faktiskt sitter i apparaten, och det är inte alltid de man tror att man köper. Vi har läst varje produkts givaruppsättning i tillverkarens eget produktblad, eftersom butikens lista visade sig vara kortare än varan: Clas Ohlson anger fyra storheter för Airthings Wave Enhance, Airthings eget produktblad sju.\n\nTre av åtta kartlagda mätare saknar koldioxidgivare helt, och en anger eCO2, alltså ett tal uträknat ur halten flyktiga organiska ämnen i stället för en mätning av koldioxid.\n\nReglerna för radonmätning är hämtade ur Strålsäkerhetsmyndighetens egen vägledning och återges i köpguiden, men de påverkar inte betygen: en digital radonmätare bedöms på vad den gör, inte på vad den inte är avsedd för. Den enda oberoende provning vi hittat är Stiftung Warentests av 26 koldioxidmätare från december 2021, och den täcker en av de sju vi rankar; där den finns redovisas betyget som testets och inte som vårt.\n\nPriser och kundbetyg är lästa på butikernas egna produktsidor och daterade. Vi har inte mätt någon luft, inte provat någon mätare och inte jämfört någon avläsning mot ett referensinstrument. Kriteriebetygen är vår bedömning, inte mätvärden. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "givare",
      label: "Givare och mätteknik",
      weight: 40,
      description:
        "Vad apparaten faktiskt mäter, och med vilken sorts givare. Det här är kategorins avgörande egenskap, eftersom skillnaden mellan modellerna inte är hur bra de mäter utan vad de mäter: tre av åtta saknar koldioxidgivare helt trots att de säljs som luftkvalitetsmätare.\n\nSkalan väger antalet verkliga storheter och teknikens art. En NDIR-givare mäter koldioxid genom hur infrarött ljus absorberas; en eCO2-uppgift är uträknad ur halten flyktiga organiska ämnen och stiger av en doftspray i ett tomt rum. 5,0 kräver en bred uppsättning med både NDIR och partikelmätning, och 2,0 ger tre storheter eller ett härlett koldioxidtal. Radon och partiklar väger tyngst av de enskilda givarna, eftersom ingen annan mätning ersätter dem.",
    },
    {
      key: "beslutsnytta",
      label: "Beslutsnytta",
      weight: 30,
      description:
        "Om talet du får går att göra något åt. En koldioxidhalt i ppm säger när du ska vädra, en partikelhalt säger när du ska stänga fönstret mot gatan, och en radonnivå säger om det är värt att beställa en riktig mätning. Ett eCO2-tal säger ingenting du kan handla på, eftersom det inte motsvarar någon storhet som finns i rummet. Kriteriet mäter alltså inte hur många värden appen visar utan hur många av dem som leder till en åtgärd, och en larmfunktion vid en gräns du satt själv väger tyngre än ytterligare en kurva.",
    },
    {
      key: "avlasning",
      label: "Avläsning och app",
      weight: 20,
      description:
        "Om du ser värdet när det spelar roll. En mätare utan display kräver att du plockar upp telefonen, och en luftkvalitetsmätare man måste öppna en app för att läsa blir en mätare man läser en gång i månaden. Här väger inbyggd display tungt, liksom en färgindikator som syns i förbifarten.\n\nStrömförsörjningen räknas in på samma rad, eftersom den avgör var apparaten får stå: en nätdriven mätare kan inte ställas i ett krypgrund, och en som håller tre år på batterier kan glömmas bort där. Appen räknas för historiken, alltså att kunna se vad koldioxidhalten gjorde i sovrummet i natt.",
    },
    {
      key: "prisvarde",
      label: "Pris och värde",
      weight: 10,
      description:
        "Vad du får för pengarna, inte lägst pris. Spannet är 729 till 3 299 kronor, alltså mer än fyra gånger, och sambandet mellan pris och givaruppsättning är svagare än man skulle tro: en av de dyraste mätarna har tre givare. Här väger också butiksskillnaderna in, eftersom samma apparat kan skilja flera hundra kronor mellan två svenska butiker.",
    },
  ],
};

/**
 * Robotgräsklippare. Sajtens största kategori tillsammans med
 * robotdammsugare: **49 500 sökningar i månaden**, uppmätt 2026-08-01.
 *
 * ## Byggd i augusti av ett skäl
 *
 * Säsongen är den skarpaste vi mätt, kvot **13,6** mellan topp och botten:
 * 9 900 i januari och 135 000 i maj och juni. Sidan byggs på nedgången för att
 * hinna åldras och indexeras före rampen i mars, samma resonemang som valde
 * luftfuktare.
 *
 * ## ⚠️ Vinkeln som inte finns längre
 *
 * Slinga mot slinglöst var kategorins skiljelinje i flera år. Den är avgjord:
 * av 18 robotar hos Clas Ohlson 2026-08-04 är **17 slinglösa**. Att skriva en
 * sida om att välja bort slingan vore att slåss om en fråga marknaden redan
 * besvarat.
 *
 * ## Sidans fynd ligger i köpguiden, inte i betygen
 *
 * Rasmussen m.fl. provade 18 robotar mot igelkottar (`Animals`, 2021): **ingen
 * upptäckte djuret innan den körde på det**, och samtliga körde över ungar.
 * 2024 publicerade samma grupp ett standardiserat säkerhetsprov med
 * klassningen 0 till 4, föreslaget för CENELEC. **Ingen tillverkare redovisar
 * ett resultat.** Husqvarna välkomnar forskningen och uppger att deras robotar
 * "fick bra resultat" utan att publicera någon siffra.
 *
 * ⚠️ **Igelkotten är inget kriterium**, efter användarbeslut 2026-08-04 och av
 * ett hårdare skäl: det finns inga publicerade provresultat per modell, och
 * 2024 års studie kunde inte belägga att något konstruktionsdrag förutsäger
 * utfallet. Ett betyg på det vore ett påhittat mätvärde. Fyndet får en egen
 * sektion och FAQ, som radonregeln på `/luftkvalitetsmatare`.
 *
 * ⚠️ Sidan får **aldrig** påstå att robotgräsklippare orsakar igelkottens
 * rödlistning. SLU anger att orsakerna är oklara och nämner dem inte.
 *
 * ⚠️ Råd & Röns test av 69 robotar (2026-06-26) ligger bakom betalvägg.
 * **Inga modellbetyg därifrån återges**, precis som på `/robotdammsugare`.
 *
 * Vikterna är användarens beslut 2026-08-04.
 */
export const ROBOTGRASKLIPPARE: TestPage = {
  slug: "robotgrasklippare",
  label: "Robotgräsklippare",
  title: "Robotgräsklippare bäst i test 2026: tomten avgör, inte roboten",
  category: HEM_HUSHALL,
  methodology:
    "Kategorin avgörs av tomten och inte av maskinen, så vi rankar på det köparen måste matcha mot sin egen gräsmatta. Klippyta, max lutning, ljudnivå, klippbredd, klipphöjd och vikt publiceras för varje modell och är därför jämförbara i klartext; navigeringstekniken och hinderhanteringen är läst i butikens och tillverkarens egna beskrivningar.\n\nRåd & Rön har provat 69 robotar och publicerade i juni 2026, men resultaten ligger bakom betalvägg, så vi återger inga modellbetyg därifrån och använder testet bara för det som är fritt läsbart om metod och slutsatser. Forskningen om robotgräsklippare och igelkottar redovisas i köpguiden och påverkar inte betygen, eftersom det saknas publicerade provresultat per modell och den studie som konstruerade provet inte kunde belägga att något konstruktionsdrag förutsäger utfallet.\n\nPriser och kundomdömen är lästa på butikens egen produktsida 2026-08-04, tekniska data hos butik och tillverkare 2026-08-06. Vi har inte klippt någon gräsmatta, inte mätt någon ljudnivå och inte provat någon robot. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "ytaterrang",
      label: "Yta och terräng",
      weight: 30,
      description:
        "Om roboten passar din tomt, vilket är det enda som avgör om köpet blir bra. Två tal styr och båda publiceras: klippytan i kvadratmeter och den högsta lutning roboten klarar i procent. Spannet är stort, från 300 till 5 000 kvadratmeter och från 25 till 80 procents lutning, och en robot som är för svag för tomten blir aldrig bra hur mycket den än kostar. Lutningen är den som oftast underskattas: 25 procent låter mycket men motsvarar en slänt de flesta villatomter har någonstans. Kriteriet väger ytan mot priset och belönar marginal, eftersom en robot som ligger precis på gränsen får köra längre och oftare.",
    },
    {
      key: "navigering",
      label: "Navigering och tillförlitlighet",
      weight: 25,
      description:
        "Hur roboten vet var den är och vad den gör när något står i vägen. Slinglösa robotar använder RTK-satellit, lidar, kamera eller en kombination, och skillnaderna är verkliga: satellitmottagning störs av tät trädkrona och husväggar, medan kameror och lidar klarar sig bättre under träd men sämre i mörker och motljus. Råd & Rön beskriver slinglöst som flexiblare men med ojämn tillförlitlighet beroende på tomtens form. Hinderigenkänning väger också in, eftersom en robot som kör in i möbler och leksaker blir en robot du plockar upp.",
    },
    {
      key: "klippresultat",
      label: "Klippresultat",
      weight: 20,
      description:
        "Hur gräsmattan ser ut efteråt. Råd & Rön mäter jämnhet på normal gräsmatta, långt gräs, blött gräs och hur robotarna når in i hörn och smala passager, och deras slutsats är att blött gräs och svackor är det som skiljer. Klippbredd och klipphöjdsintervall väger in där de anges, liksom om roboten mulchar tillräckligt fint för att klippet ska försvinna ner i mattan. Betyget här är redaktionell bedömning ur publicerade uppgifter, eftersom testets modellbetyg ligger bakom betalvägg.",
    },
    {
      key: "ljud",
      label: "Ljud och grannförhållanden",
      weight: 15,
      description:
        "Hur mycket den hörs, och därmed när du kan köra den. En robotgräsklippare går många timmar i veckan i en trädgård med grannar på tre sidor, och ljudnivån avgör om du kan köra kvällstid utan att irritera någon. Den avgör också om du kan följa rådet att köra dagtid av hänsyn till igelkottar: en tyst robot kan gå mitt på dagen utan att störa dig själv.\n\nSpannet är 50 till 64 decibel, och eftersom skalan är logaritmisk är fjorton decibel en stor skillnad i trädgården. Betyget följer en fast skala: 50 dB eller lägre ger 5,0, 51 till 55 ger 4,5, 56 till 58 ger 4,0, 59 till 61 ger 3,0, 62 till 63 ger 2,5 och 64 eller mer ger 2,0. Ingen tillverkare anger mätavstånd, så talen jämförs som storleksordningar.",
    },
    {
      key: "prisvarde",
      label: "Pris och värde",
      weight: 10,
      description:
        "Vad du får för pengarna, mätt som kvadratmeter och funktion per krona. Spannet är 1 999 till 36 789 kronor, alltså mer än arton gånger, och sambandet mellan pris och kapacitet är svagare än man skulle tro: samma modellnamn kan kosta mer i en variant för halva ytan. Kontrollera alltid vilken yta varianten gäller innan du jämför två priser.",
    },
  ],
};

/**
 * Fönsterputsrobot. Femte maskinsidan i Hem & hushåll.
 *
 * ## Sökvolymen är inte uppmätt, och det spelar ingen roll
 *
 * `fönsterputsrobot` finns inte i våra keyword-CSV:er. Det är en upplysning
 * och inte ett hinder: sidan står på att den svarar på en fråga ingen annan
 * svarar på, och en mätning hade inte ändrat en rad i den.
 *
 * ## Sidans fynd: tre säkerhetstal, ojämnt publicerade
 *
 * Roboten hänger utanför fönstret, ofta flera våningar upp. Tre uppgifter
 * avgör om det är rimligt, och **ingen tillverkare publicerar alla tre**:
 *
 * 1. **Linans hållfasthet.** HOBOT-388 anger att linan tål en stötkraft på
 *    200 kg. Ecovacs och Kärcher nämner att en lina medföljer och anger inget
 *    tal.
 * 2. **Hålltid vid strömavbrott.** Kärcher RCW 2 anger 40 minuter och
 *    publicerar batteriet, 0,65 Ah och 14,8 V. Ecovacs W2 och W3 anger mer än
 *    30 minuter. HOBOT-388 anger 20. Ecovacs W1 Pro anger ingen tid alls.
 * 3. **Vilket glas roboten får sitta på.** HOBOT-388: "Do not use on frameless
 *    glass". Ecovacs W1 Pro tillåter båglöst men kräver tio centimeters
 *    marginal till kanten. Motsatta besked i samma produktgrupp.
 *
 * ## Den svenska frågan är spröjsen
 *
 * Kärcher anger minsta fönster till 35 × 35 cm. Spröjsade fönster med mindre
 * rutor är vanliga i äldre svenska hus, och då fungerar ingen robot oavsett
 * pris. Ecovacs W1 Pro kräver dessutom en båge på minst 5 mm.
 *
 * ⚠️ Vi har inte hängt någon robot i något fönster och inte belastat någon
 * lina. Talen är tillverkarnas, lästa i deras egna manualer och produktsidor.
 *
 * Se `.agent/research/fonsterputsrobot.md`.
 */
export const FONSTERPUTSROBOT: TestPage = {
  slug: "fonsterputsrobot",
  label: "Fönsterputsrobot",
  title:
    "Fönsterputsrobot bäst i test 2026: 22 × 25 cm är den minsta ruta någon klarar",
  category: HEM_HUSHALL,
  methodology:
    "Produkten sitter fast på utsidan av ett fönster, ofta flera våningar upp, och faller om den lossnar. Tyngst i rankningen väger därför det som håller den kvar: hur länge reservbatteriet driver sugkoppen när strömmen går, och hur långt säkerhetslinan räcker.\n\nNäst tyngst väger måtten. Minsta ruta, glastjocklek och om roboten är godkänd för glas utan båge avgör om köpet fungerar över huvud taget, och där skiljer sig robotarna mer åt än i pris: från 22 × 25 till 40 × 40 centimeter minsta ruta, och en modell som uttryckligen förbjuds på båglöst glas.\n\nTalen är hämtade ur tillverkarnas egna manualer, specifikationsblad och produktsidor, lästa i original. Priser är lästa hos den butik vi länkar till och daterade. Vi har inte hängt någon robot i något fönster, inte belastat någon lina och inte mätt någon rengöring. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "sakerhet",
      label: "Säkerhet på höjd",
      weight: 30,
      description:
        "Vad som håller roboten uppe när något går fel. Två egenskaper avgör: hur länge reservbatteriet driver sugkoppen när strömmen går, och hur lång säkerhetslinan är, alltså hur långt bort du kan knyta den i något som håller.\n\nHålltiden väger tyngst av de två och spänner från 20 till 40 minuter. Linan väger lättare: 3 meter eller mer når normalt ett fast föremål inne i rummet, 1,5 meter gör det ofta inte. Är hålltiden inte fastställd betygsätts roboten på linan, aldrig med ett avdrag.",
    },
    {
      key: "fonstertyp",
      label: "Fönstertyp och mått",
      weight: 25,
      description:
        "Om roboten får sitta på dina fönster, vilket är den fråga som oftast gör att köpet inte fungerar. Minsta ruta väger tyngst och spänner från 22 × 25 till 40 × 40 centimeter, alltså mer än dubbla ytan mellan ytterlägena, och det avgör om spröjsade fönster går att putsa alls.\n\nDärefter väger glaset. En modell är förbjuden på rutor utan båge, en annan kräver 10 centimeters marginal till kanten på sådana, och en tredje går på glas av vilken tjocklek som helst där Ecovacs kräver 3 millimeter och 4 på speglar.",
    },
    {
      key: "rengoring",
      label: "Rengöringsresultat",
      weight: 20,
      description:
        "Hur rent fönstret blir. Pascaltalet i specifikationen säger hur hårt roboten suger sig fast mot glaset, alltså vidhäftning, och det som avgör resultatet är hur vattnet fördelas: munstycken som fuktar glaset framför duken håller den blöt hela passet, medan en duk som fuktats en gång torkar och börjar skjuta smutsen framför sig.\n\nKanter och hörn väger också in. Duken sitter innanför chassit på varje modell, så en remsa blir alltid kvar mot bågen, och en liten robot lämnar en smalare remsa än en stor.",
    },
    {
      key: "hantering",
      label: "Hantering och ljud",
      weight: 15,
      description:
        "Vad det innebär att använda den. Roboten ska lyftas upp mot varje ny ruta och hållas där med en arm tills sugkoppen tar, medan den andra håller i linan, så vikten väger tyngst här: spannet är 0,92 till 1,8 kilo, alltså nästan dubbelt.\n\nDärefter väger sladden, basstationen och ljudnivån, eftersom apparaten arbetar i ögonhöjd i samma rum som du. Appstyrning och fjärrkontroll räknas som bekvämlighet och hamnar därför här, inte under säkerheten.",
    },
    {
      key: "prisvarde",
      label: "Pris och värde",
      weight: 10,
      description:
        "Vad du får för pengarna. Spannet är 2 190 till 6 026 kronor, alltså knappt tre gånger, och priset följer inte säkerheten: den billigaste roboten här sitter kvar längst när strömmen går.\n\nHär väger också in att samma modell kan skilja mer än tusen kronor mellan svenska butiker, vilket är ovanligt mycket i en kategori med så få återförsäljare.",
    },
  ],
};

/**
 * Smart hem-hubb. Byggd av intern efterfrågan, inte av volym.
 *
 * ## Sexton sidor skapar frågan och ingen besvarar den
 *
 * Orden `hubb`, `gateway`, `brygga` och `bridge` förekommer **285 gånger
 * över 16 kategorier** i läsartext och produktdata, med vattenlarm på 51 och
 * elektrisk rullgardin på 46. Det fanns inget länkmål alls.
 *
 * Till jämförelse byggdes hygrometersidan på elva omnämnanden över fyra filer.
 *
 * ## Sidans fynd: ordet täcker tre olika produkter
 *
 * Kjell säljer 33 artiklar under `controllers`, från 329 till 4 999 kronor.
 * Tillverkarnas egna texter beskriver tre sorter som löser olika problem:
 *
 * 1. **Märkesbrygga.** Plejd Gateway styr enbart Plejd, enligt Plejds egen
 *    produktsida, och kräver en befintlig Plejd-installation. 899 kronor, på
 *    samma hylla som de universella.
 * 2. **Matter-controller.** Aqara M3 skriver rakt ut "kan styra
 *    tredjepartsprodukter" och är ensam om att göra det.
 * 3. **Universell hubb.** Homey Pro talar wifi, Zigbee, Z-Wave, BLE, Matter,
 *    Thread, infraröd och 433 MHz, kör lokalt och kräver inget abonnemang.
 *
 * ⚠️ **Philips säger varken ja eller nej.** Kjells text för Hue Bridge säger
 * att den "kan kopplas till enheter från flera tillverkare"; Philips egen
 * Matter-sida beskriver bara riktningen utåt, mot Alexa, Apple Home och Google.
 * Sidan skriver att uppgiften saknas, aldrig att bryggan inte kan.
 *
 * ## Andra axeln: fungerar den utan internet?
 *
 * Homey Pro, Home Assistant Green och Aqara M100 säger uttryckligen ja. De
 * övriga säger ingenting, och tystnad är inte ett nej.
 *
 * ⚠️ Vi har inte kopplat in någon hubb och inte dragit ur någon internetkabel.
 * Talen är tillverkarnas och butikens.
 *
 * Se `.agent/research/smart-hem-hubb.md`.
 */
/**
 * Smart termostat. Rankar bara radiatortermostater, efter användarbeslut
 * 2026-08-04: ordet täcker fyra produkter i svensk handel och de löser olika
 * problem. Slugen är bred, avgränsningen bärs av H1 och ingress.
 *
 * ## Sidans fynd: alla anger en procentsats utom de som provat produkterna
 *
 * | Vem | Höll i den | Tal |
 * |---|---|---|
 * | Ljud & Bild, grupptest av tre | ja | **inget, av princip** |
 * | Stiftung Warentest, elva i labb | ja | bakom betalvägg |
 * | Fibaro | nej | 42 % |
 * | Netatmo | nej | 37 % |
 * | Danfoss | nej | 30 % |
 * | tado | nej | 28 % |
 * | Aqara | nej | inget |
 *
 * ⚠️ **Besparingen är inget kriterium.** Det finns inga provresultat per
 * modell, bara tillverkarnas egna påståenden, och ett betyg på ett påstående
 * mäter butikens copywriting. Samma beslut som igelkotten på
 * `/robotgrasklippare`. Talen ligger i fyndsektionen, köpguiden och tabellen.
 *
 * ⚠️ **tados 28 % är läst i original.** Fraunhofer IBP-Report 579 E (2022) är
 * en TRNSYS-simulering med testårsklimat för München, spannet är 12–28, och
 * hela rapporten fås bara av uppdragsgivaren tado. Påstå aldrig att någon mätt
 * det i bebodda hus.
 *
 * ⚠️ **Warentest fann att en av elva föll på frostskyddsprovet.** Vilken ligger
 * bakom betalvägg och får aldrig gissas.
 */
export const SMART_TERMOSTAT: TestPage = {
  slug: "smart-termostat",
  label: "Smart termostat",
  title:
    "Smart termostat bäst i test 2026: de som provat dem anger ingen besparing",
  category: SMART_HEM,
  methodology:
    "Sidan rankar bara radiatortermostater, alltså de som skruvas på ventilen på ett vattenburet element. Rumstermostater för elvärme, infraröd styrning av luftvärmepump och framledningsstyrning löser andra problem och förklaras i köpguiden i stället för att blandas in i rankningen.\n\nTyngst väger de två frågor som avgör om köpet fungerar och vad det slutar kosta: vilka ventilfattningar termostaten monteras på, och vad du måste köpa till för att nå den hemifrån. Tillsammans är de halva betyget.\n\n**Besparingsprocenten påverkar inget betyg.** Talen spänner från 23 till 42 procent, ingen av dem är mätt per modell, och att betygsätta ett påstående vore att mäta butikens copywriting. Vi har läst tados grundkälla i original, Fraunhofer IBP-Report 579 E, och redovisar vad den är: en simulering med münchenklimat och spannet 12 till 28 procent, beställd av tado.\n\nVi har inte skruvat på någon termostat, inte mätt någon förbrukning och inte jämfört någon elräkning. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "kravs",
      label: "Krävs utöver termostaten",
      weight: 25,
      description:
        "Vad du behöver köpa till för att termostaten ska styra värmen även när du inte står bredvid elementet. Det är kategorins dolda prislapp: en termostat för 559 kronor kostar inte 559 kronor om den kräver en Matter Border Router du inte har.\n\nSkalan belönar den som klarar sig med en hubb du kanske redan äger, eller med vilken tredjepartshubb som helst i en öppen standard, och sänker den som kräver tillverkarens egen brygga plus ett abonnemang för funktionerna som är hela poängen. En produkt som inte behöver någonting alls men heller inte går att nå hemifrån får inte full poäng: den har tagit bort funktionen, inte kostnaden.",
    },
    {
      key: "ventil",
      label: "Ventilpassning",
      weight: 25,
      description:
        "Hur många ventilfattningar termostaten monteras på med adaptrarna som ligger i lådan. Termostaten skruvas på den ventil som redan sitter där, och passar den inte hjälper varken pris eller protokoll.\n\nSkalan räknar fattningar. Sju eller fler ger 5,0, sex ger 4,5, fyra ger 4,0, tre ger 3,0 och två ger 2,0. Fyra är den nivå där hela Danfoss-familjen ryms, alltså RA, RAV och RAVL plus gängan M30x1,5, vilket täcker de allra flesta svenska element.\n\nVi krediterar bara fattningar tillverkaren namnger. Ett löfte om att adaptrar för de flesta system följer med är inget vi kan räkna, och en termostat vars underlag täcker fler fattningar än förpackningsinnehållet visar landar därför på den nivå vi kan belägga.",
    },
    {
      key: "oberoende",
      label: "Oberoende av tillverkaren",
      weight: 20,
      description:
        "Vad som fortsätter fungera om appen stängs, kontot försvinner eller avgiften höjs. En Zigbee- eller Z-Wave-termostat som talar med vilken hubb som helst lever vidare oberoende av vad märket bestämmer, medan en molnbunden termostat slutar vara smart samma dag som servern gör det.\n\nHär väger också in om ett abonnemang krävs för de funktioner som säljer produkten. tado flyttade sin automatik till den årliga tjänsten Auto-Assist, och Ljud & Bilds testare kallar den lösningen den enda riktiga bromsklossen. Eve går längst åt andra hållet med varken konto, moln eller abonnemang.",
    },
    {
      key: "provning",
      label: "Omdöme i publicerade provningar",
      weight: 15,
      description:
        "Vad de som faktiskt haft produkten i handen kommit fram till. Ljud & Bild har provat fyra av modellerna här och publicerar sina omdömen öppet, så de väger tyngst. Stiftung Warentest har labbprovat elva men lägger betygen bakom betalvägg, och där krediterar vi enbart att modellen genomgått provningen, aldrig hur den klarade sig.\n\nEn modell ingen provat får ingen poäng på raden, och vikten fördelas om över de övriga kriterierna i stället för att dra ner betyget. Vi väger aldrig in ett omdöme om fel generation: Warentests test från 2023 gäller tados V3+, inte X-serien vi rankar.",
    },
    {
      key: "prisvarde",
      label: "Pris och värde",
      weight: 15,
      description:
        "Vad tre rum kostar, inte vad en termostat kostar. Spannet på en enda enhet är 361 till 1 229 kronor, alltså 3,4 gånger, för produkter som gör samma sak på samma ventil.\n\nStyckpriset döljer nästan alltid något: en billig Zigbee-termostat behöver en hubb, ett startpaket innehåller en brygga du bara behöver en av, och en prenumeration återkommer varje år. Vi räknar därför med det som krävs för att komma igång i tre rum, vilket är den vanligaste utbyggnaden.",
    },
  ],
};

export const SMART_HEM_HUBB: TestPage = {
  slug: "smart-hem-hubb",
  label: "Smart hem-hubb",
  title: "Smart hem-hubb bäst i test 2026: tre olika produkter på samma hylla",
  category: SMART_HEM,
  methodology:
    "Kategorin skiljer sig från allt annat vi jämför genom att hyllan blandar tre produkter som löser olika problem under samma ord. En märkesbrygga talar bara med sitt eget märke, en Matter-controller kan lägga till andra tillverkares enheter, och en universell hubb talar varje radio. Vi har läst varje tillverkares egen beskrivning och klassificerat sorten därifrån, inte ur butikens rubrik.\n\nRankningen bygger på vad hubben når och var intelligensen sitter. Vilka radior som finns i lådan avgör vilka enheter den över huvud taget kan tala med, och om den kan lägga till andra tillverkares Matter-enheter avgör om den samlar hemmet eller bara exponerar sitt eget märke. Därefter väger vi om automationerna körs i enheten eller på någon annans server, eftersom en hubb är navet och allt annat hänger på den.\n\nTillbehör räknas in i priset. En hubb utan inbyggd radio kräver en dongel, och den kostnaden står på samma rad som hubben. Priser och kundbetyg är lästa på butikens egen produktsida och daterade. Vi har inte kopplat in någon hubb, inte dragit ur någon internetkabel och inte mätt någon räckvidd. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "rackvidd",
      label: "Räckvidd och protokoll",
      weight: 30,
      description:
        "Hur mycket av hemmet hubben faktiskt når, vilket är det enda som avgör om den löser problemet du köpte den för. Två saker väger: vilka radior den talar, och om den kan lägga till andra tillverkares enheter eller bara sina egna.\n\nRadion måste sitta i lådan för att räknas fullt ut. En hubb som når Zigbee först sedan du köpt en dongel för 249 kronor når mindre än en som gör det direkt, och skillnaden märks den kväll du packar upp den. En brygga för 899 kronor styr ett enda märke medan en Matter-controller för 329 når flera, så priset duger inte som vägvisare.",
    },
    {
      key: "oberoende",
      label: "Oberoende av moln och tillverkare",
      weight: 25,
      description:
        "Om hemmet fortsätter fungera när internet ligger nere, och vem som bestämmer hur länge produkten lever. En hubb är navet: slutar den fungera slutar allt som hänger på den att fungera.\n\nSkalan graderar var automationen körs, inte hur tydligt tillverkaren skriver om saken. En hubb som bearbetar lokalt får samma poäng vare sig ordet står i en rubrik eller i ett stycke längre ned. Här väger också in om ett abonnemang krävs för grundfunktionerna, och om plattformen är öppen nog att någon annan kan hålla den vid liv när tillverkaren tröttnar.",
    },
    {
      key: "upprattande",
      label: "Upprättande och app",
      weight: 20,
      description:
        "Vad det innebär att komma igång och att leva med den. Spannet i den här produktgruppen är extremt: en märkesbrygga kopplas in och hittar sina egna lampor på några minuter, medan en universell plattform kan kräva en kväll och en vilja att läsa dokumentation. Ingetdera är fel, men de passar olika människor, och en hubb som står halvinstallerad i en byrålåda är sämre än ingen alls. Appens kvalitet och hur automationer byggs väger tyngre här än antalet funktioner.",
    },
    {
      key: "framtid",
      label: "Framtidssäkerhet",
      weight: 15,
      description:
        "Om köpet håller när hemmet växer och när standarderna rör sig. Matter och Thread är de två som förändrar kategorin just nu, och stödet skiljer sig mer än förpackningarna antyder: en produkt kan vara Matter-certifierad och ändå bara exponera sina egna enheter utåt. En Thread Border Router stärker dessutom nätet för alla Thread-enheter i huset och är värd något i sig. Här väger också in om hubben kan byggas ut, och om tillverkaren har visat att äldre modeller får fortsatt stöd.",
    },
    {
      key: "prisvarde",
      label: "Pris och värde",
      weight: 10,
      description:
        "Vad du får för pengarna, och den här produktgruppen har sajtens bredaste spann: 329 till 4 999 kronor, alltså femton gånger. Priset säger nästan ingenting om räckvidden. Den billigaste i jämförelsen är en Matter-controller som kör lokala automationer, medan en dyrare produkt i mitten av listan bara talar med sitt eget märke. Väg alltid priset mot vad hubben når, aldrig mot vad den kostar jämfört med grannen på hyllan.",
    },
  ],
};

/**
 * Avfuktare. Tredje sidan i Hem & hushåll och sista i luftklustret.
 *
 * Kategorin har ett fynd som ingen svensk jämförelse nämner: **talet i
 * modellnamnet är uppmätt vid 30 ºC och 80 % RH, och du får ungefär 40 procent
 * av det i ett svalt rum.** Meacos egen extraktionstabell bevisar det per modell
 * och per grad: Arete One 25L tar 25 liter i det varma och fuktiga, 17,5 vid
 * 20 ºC/80 % RH, 10,7 vid 20 ºC/60 % RH och 3,5 vid 10 ºC/60 % RH. Wood's LD40
 * visar samma sak i två tal, 13 liter vid 30/80 mot 7,5 vid 20 ºC/70 % RF.
 *
 * ⚠️ **Rättat 2026-08-06.** Sidan påstod tidigare att Meaco, eeese och sju
 * andra inte anger villkoren. Meaco publicerar sex rader per modell och eeese
 * två. Det var vår research som saknades, inte tillverkarnas uppgifter. Kvar
 * utan villkor: Clas Ohlsons två egna och Xiaomi.
 *
 * SS-EN 810 handlar om precis det här, "provning av avfuktningsförmåga,
 * märkning, funktionskrav och redovisning av tekniska data". Den är gällande,
 * utgåva 1, fastställd 1997-04-30, och gäller enligt sin titel bara avfuktare
 * **med eldriven kompressor**.
 *
 * ⚠️ Vi har inte köpt standarden och påstår aldrig vilka provvillkor den
 * föreskriver. Se .agent/research/avfuktare.md §1.
 *
 * ⚠️ **Testomdöme är inte ett eget kriterium** utan vägs in i avfuktning,
 * efter användarbeslut 2026-08-03. Which?, publicerad av Stiftung Warentest,
 * är enda riktiga provningen och den täcker två av tolv rankade produkter.
 */
export const AVFUKTARE: TestPage = {
  slug: "avfuktare",
  label: "Avfuktare",
  title:
    "Avfuktare bäst i test 2026: 25-litersapparaten tar 10,7 liter i en sval källare",
  category: HEM_HUSHALL,
  methodology:
    "Talet i modellnamnet är uppmätt vid 30 grader och 80 procents luftfuktighet. Ett svenskt hus håller inte det, och skillnaden är inte liten: Meacos egen tabell för Arete One 25L visar 25 liter per dygn i det varma och fuktiga, 10,7 liter vid 20 grader och 60 procent, och 3,5 liter vid 10 grader och 60. Samma apparat, en femtedel så mycket vatten i det kallaste läget.\n\nRankningen bygger därför på vattnet i svalt och inte på modellnamnet, tillsammans med hur djupt ned i temperatur apparaten fortsätter arbeta, hur mycket el den drar per liter den samlar vid samma villkor, och vad den kostar. Den enda riktiga provningen i Europa är brittiska Which?, som Stiftung Warentest publicerar och håller uppdaterad. Den provar vid 21 grader och kallare och mäter elen per uppsamlad liter vatten i stället för per timme. Där Which? har ett omdöme väger det tyngst när avfuktningspoängen sätts, och det gäller två av tolv.\n\nUppgifterna är lästa hos tillverkaren där tillverkaren publicerar dem, annars hos butiken, och daterade. Vi har inte mätt avfuktning, inte vägt uppsamlat vatten och inte provat någon apparat. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "avfuktning",
      label: "Avfuktning i praktiken",
      weight: 28,
      description:
        "Hur mycket vatten apparaten tar ur luften i ett svalt rum, inte hur mycket den tar vid 30 grader. Tio av tolv har ett tal vid svalare villkor, men de tre mätpunkterna skiljer sig: Meaco mäter vid 20 grader och 60 procent, Wood's vid 20 och 70, eeese och Xiaomi vid 27 och 60. Ett varmare och fuktigare rum ger ett högre tal, så talen vägs mot varandra med den skillnaden inräknad och inte som en rak lista. För Clas Ohlsons två bedöms nominell kapacitet tillsammans med luftflödet, eftersom vatten som fälls ut i ett hörn inte hjälper i det andra.\n\nDär brittiska Which? har provat modellen väger deras omdöme tyngst, eftersom de mäter vid 21 grader och kallare och räknar elen per uppsamlad liter. Det gäller Meaco Arete One 12L och 25L. Omdömet lyfter dem över apparater som ingen mätt, men det väger inte tyngre än vattnet: 12L tar 5,2 liter i svalt mot 25L:s 10,7 och hamnar därför under den.",
    },
    {
      key: "kyla",
      label: "Drift i kyla",
      weight: 24,
      description:
        "Vid vilken temperatur apparaten slutar fungera, och vad den gör åt isbildningen dessförinnan. Det här är den svenska halvan av problemet: en kondensavfuktare arbetar genom att kyla luft under daggpunkten, och ju kallare luften är desto mindre vatten finns det att fälla ut. Källare, garage och krypgrund ligger långt under de 30 grader talen är uppmätta vid. Skalan följer angivet temperaturintervall och förekomsten av avfrostning, med tillägg där Which? uttryckligen skriver att apparaten fungerar bra i kyla.",
    },
    {
      key: "energi",
      label: "Energi per liter",
      weight: 24,
      description:
        "Vad det kostar att få ut en liter vatten, inte vad apparaten drar i timmen. Which? räknar just så och förklarar varför: drifttiden för samma vattenmängd kan skilja dubbelt mellan två apparater, så watt per timme säger ingenting utan literantalet bredvid.\n\nVi delar watt med liter per dygn **vid samma villkor**, alltså 30 grader och 80 procent, där sju av tolv har ett publicerat par. Meaco 20L och 25L publicerar ingen 30-gradersrad, så för dem används 20 grader och 80 procent, ett svårare läge som håller deras tal på den försiktiga sidan. Under 13 watt per liter ger 5,0, 13 till 17 ger 4,5, 17 till 20 ger 4,0, 20 till 25 ger 3,0 och över 30 ger 1,5.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 24,
      description:
        "Vad du får för pengarna, inte lägst pris. Spannet är 1 499 till 7 890 kronor, alltså mer än fem gånger. Kundunderlaget väger in där det finns: Clas Ohlsons egen tjugolitersapparat har 416 omdömen, medan flera av de dyrare har noll eller ett.",
    },
  ],
};

export const ROBOTDAMMSUGARE: TestPage = {
  slug: "robotdammsugare",
  label: "Robotdammsugare",
  title: "Robotdammsugare bäst i test 2026: sugkraften på kartongen är reklam",
  category: HEM_HUSHALL,
  methodology:
    "Talet som står störst på varje kartong är sugkraften i pascal, och det är det tal du kan bortse från. Stiftung Warentest konstaterar att sugkrafter på många tusen Pa är reklampåståenden utan samband med hur rent det blir, och prislistan visar samma sak: Dreame L10s Ultra Gen 3 anger 25 000 Pa för 4 990 kronor medan Roborock Qrevo Curv 2 Flow anger 20 000 för 11 490. Vi har därför byggt rankningen på det de två labben faktiskt mäter. Råd & Rön har provat 62 robotar mellan 1 000 och 17 000 kronor och Stiftung Warentest provar efter DIN EN 62929, och båda kommer fram till att moppningen är den svagaste funktionen. Därför väger den tyngst här. Ljud & Bild lägger till det som är svenskt: nordiska trösklar var största hindret i deras grupptest och en av fyra robotar fick ge upp helt. Båda tillverkarna i toppen säljer själva en tröskelramp som tillbehör. Betygen i tabellerna hos Råd & Rön och Stiftung Warentest ligger bakom betalvägg, så vi återger dem inte och har inget kriterium för testomdöme. Vi har inte dammsugit några golv, inte vägt något damm och inte provat någon robot. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "moppning",
      label: "Moppning",
      weight: 30,
      description:
        "Väger tyngst för att det är här maskinerna skiljer sig mest, och för att båda labben pekar ut moppningen som svagast i kategorin. Råd & Rön lät robotarna moppa upp lerfläckar och chokladfläckar, och noterar att flera smetar ut chokladen så att golvet ser smutsigare ut efteråt än före. Skalan följer vilken sorts mopp roboten har och vad stationen gör med den. Högst hamnar rullmopp som sköljs och skrapas ren under drift, alltså det som fortfarande är rent när roboten går över golvet sista gången. Därefter kommer roterande skrubbmoppar med tvätt i stationen, och lägst hamnar en fuktig duk som släpas runt hela passet. Tvätt i varmt vatten och torkning i stationen väger upp, eftersom en mopp som torkar blöt i en sluten docka börjar lukta. Notera att ingen av dem tömmer sitt moppvatten själv: det byter du för hand efter varje moppning.",
    },
    {
      key: "trosklar",
      label: "Trösklar och framkomlighet",
      weight: 20,
      description:
        "Det svenska kriteriet. Ljud & Bild provade fyra robotar i mellanklassen och skriver att nordiska trösklar var en av de största utmaningarna i hela grupptestet, där en robot fick ge upp helt. Att både Roborock och Dreame säljer en tröskelramp som tillbehör, för 330 respektive 199 kronor, säger samma sak från andra hållet.\n\nSkalan mäter hur högt roboten tar sig, inte vem som skriver ut talet. Högst hamnar ett chassi som lyfter sig över listen och klarar mer än 40 millimeter i ett steg, lägst en robot som rullar rakt på och stannar vid tio. Där tillverkaren inte publicerar någon höjd bedöms konstruktionen, och betyget landar i mitten: en okänd passerhöjd är en osäkerhet, aldrig ett underkännande.\n\nTvå fällor i talen, båda verkliga. Tillverkarna anger ofta en höjd för tröskel med två steg, till exempel en skjutdörrsskena, och den är ungefär dubbelt så hög som den för en vanlig list. Vi räknar alltid på enkelsteget. Och samtliga tal kommer från tillverkarnas egna labb utan gemensam provmetod, så de är uppgifter och inte mätningar. Mät din högsta tröskel innan du väljer.",
    },
    {
      key: "station",
      label: "Station och underhåll",
      weight: 20,
      description:
        "Vad du själv måste göra, och hur ofta. Råd & Rön är hård här: att tömma stationen går bra på de flesta, men robotens egen behållare är ofta svår att få loss utan att damm ramlar ut, och att byta borstar och filter får låga betyg genomgående. Ljudet väger in och det är inget litet problem. Tömningsstationerna får bottenbetyg rakt över, och den värsta ligger på 80 decibel, ungefär vad ett vardagsrum vid en trafikerad gata låter som. Skalan följer hur många dagar stationen klarar sig mellan tömningar, om moppen tvättas och torkas automatiskt, och hur lätt filter och borstar går att komma åt.",
    },
    {
      key: "navigering",
      label: "Navigering och täckning",
      weight: 20,
      description:
        "Om roboten hittar smutsen och kommer överallt. Det här är kategorins tystaste svaghet: Råd & Rön lade ut tjugo små högar fullkornsflingor för att mäta ytteckning, och ingen robot var i närheten av att städa bort alla. Stiftung Warentest mätte samma sak uppifrån och såg en robot missa en sjättedel av golvet medan en annan missade mer än en tredjedel. Fler än hälften av Råd & Röns robotar trasslade dessutom in sig i elsladden längs väggen. Skalan följer sensoruppsättningen, alltså laserrotor mot kamera mot ToF, tillsammans med hur många våningar roboten kan kartlägga. Två saker att vara lugn över: alla modeller vänder vid trappöppning, och av de tretton som kan sätta virtuella gränser respekterade elva dem.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 10,
      description:
        "Vad du får för pengarna. Spannet på sidan är 1 999 till 14 890 kronor, alltså mer än sju gånger, och det följer marknaden: Råd & Rön provade robotar mellan 1 000 och 17 000. Kriteriet väger lätt med avsikt, eftersom skillnaden mellan en billig och en dyr robot i den här kategorin är verklig och inte inbillad. Den som vill veta om det räcker med den billigaste får svaret i egen sektion längre ner på sidan.",
    },
  ],
};

/**
 * Vattenfelsbrytare och läckagebrytare. Underlag i
 * .agent/research/vattenfelsbrytare.md.
 *
 * ## Viktningen sattes före all prisinsamling, med avsikt
 *
 * Kategorin bär en konflikt som hade varit lätt att lösa åt fel håll: den enda
 * produkt vi kan belägga ett typgodkännande för kostar 8 995 kr, den utan
 * publicerat godkännande 5 499, och den dyrare ligger hos den enda butik som
 * betalar oss provision. Vikterna beslutades av användaren innan ett enda pris
 * var hämtat, just för att utfallet inte skulle kunna forma dem i efterhand.
 * Se .claude/context/money.md: viktning är aldrig en spak.
 *
 * ## Kriterium 1 mäter vad tillverkaren publicerar, inte vad produkten är
 *
 * Konstruktionen är hämtad från /brandfilt och IDÉ-013. Ett lågt betyg betyder
 * "anger inget certifikatnummer", aldrig "underkänd av RISE". Skillnaden är
 * inte en nyans: RISE certifieringsregister svarar med botkontroll och går
 * inte att läsa, så ett påstående om frånvaro vore ett påstående vi inte kan
 * belägga. Samma försiktighet som med SBSC på /kodlas-ytterdorr.
 */
export const VATTENFELSBRYTARE: TestPage = {
  slug: "vattenfelsbrytare",
  label: "Vattenfelsbrytare",
  title:
    "Vattenfelsbrytare bäst i test 2026: åtta provades, noll klarade sig först",
  category: SAKERHET,
  methodology:
    "Kategorin har något nästan ingen annan av våra har: en riktig provning på ett oberoende institut. Länsförsäkringars Forskningsfond bekostade den, RISE utförde den, och åtta vattenfelsbrytare provades mot SP-Metod 5314. I första omgången klarade sig ingen. Tillverkarna fick tid att åtgärda, och därefter godkändes två. Den provningen är fyra år gammal och vi återger den som det den är, ett utfall från 2022 och inte ett läge i dag.\n\nSedan dess har regelverket flyttat sig. Branschregler Säker Vatteninstallation 2026:1 gäller sedan 1 januari 2026 och kräver typgodkännande enligt certifieringsregeln CR 139, som omfattar läckagebrytare, vattenfelsbrytare och vattenlarm. Vi har läst branschreglerna och det officiella ändringsdokumentet i original, med paragrafnummer, och citerar aldrig en butiks återgivning av dem.\n\nBetyget för typgodkännande är satt mot RISE öppna certifikatregister, som listar samtliga produkter godkända enligt CR 139 och går att söka på nummer eller produktnamn. Registret läste vi 2026-08-06 och det avgör både vilka som är godkända och hur länge. Certifikaten är dessutom lästa i original som PDF hos tillverkarna.\n\nPriser är lästa på butikernas egna produktsidor och daterade, och eftersom ingen butik för hela sortimentet står källan utskriven per produkt. Vi har inte installerat, provat eller läckagetestat en enda av dem.",
  criteria: [
    {
      key: "typgodkannande",
      label: "Typgodkännande enligt CR 139",
      weight: 30,
      description:
        "Om produkten är typgodkänd enligt CR 139, alltså den certifieringsregel branschreglerna hänvisar till. Sedan 1 januari 2026 kräver Säker Vatteninstallation 2026:1 ett typgodkänt aktivt skydd i kök, och försäkringsrabatten förutsätter en godkänd vattenfelsbrytare. Godkännandet är därför inte en formalitet utan det som avgör om din installatör kan intyga arbetet och om rabatten gäller.\n\nSkalan: 5,0 för ett giltigt typgodkännande enligt CR 139, 2,5 när produkten är provad och godkänd av ett annat oberoende organ men inte enligt CR 139, och 1,0 när ingen oberoende provning för svensk marknad finns. Betyget mäter vad produkten har genomgått, aldrig hur lätt tillverkaren gör det att hitta uppgiften.\n\nSamtliga betyg är satta mot RISE öppna certifikatregister, som går att söka på certifikatnummer eller produktnamn. Där står också hur länge varje godkännande gäller, och ett av dem löper ut inom ett halvår.",
    },
    {
      key: "omfattning",
      label: "Skyddets omfattning",
      weight: 25,
      description:
        "Vad produkten faktiskt upptäcker och hur mycket den stänger av. Det var precis det RISE provade: om brytaren varnar för både små droppläckage och större rörbrott, och om den stänger av när ett läckage uppstår. En central vattenfelsbrytare mäter tryck och flöde på inkommande ledning och stänger av hela huset, alltså även den läcka som uppstår bakom en vägg där ingen sensor ligger. En läckagebrytare stänger av vid den apparat sensorn ligger under, vilket täcker diskmaskinen men inte röret i badrummet. Antal sensorer och om fler kan läggas till väger in här, liksom om produkten känner av frysrisk.",
    },
    {
      key: "installation",
      label: "Installation och drift",
      weight: 20,
      description:
        "Vad som krävs för att få den på plats och vad som händer sedan. En central vattenfelsbrytare är ett ingrepp på inkommande servisledning och kräver rörmokare, och Länsförsäkringar anger 6 000 till 10 000 kronor installerad. En läckagebrytare med motorventil på en apparatanslutning är en betydligt mindre sak och sitter ofta i ett vägguttag. Här väger också det som sällan står i butiken: vad ventilen gör vid strömavbrott, om den går att stänga manuellt, och om den behöver internet för att fungera alls. En produkt som slutar skydda när routern går ned är inte ett skydd.",
    },
    {
      key: "prisvarde",
      label: "Pris och värde",
      weight: 15,
      description:
        "Vad du får för pengarna, inklusive det installationen kostar. Spannet är stort, från cirka 2 400 kronor för en läckagebrytare på en apparat till över 10 000 för en central enhet, och det är inte samma produkt i två storlekar utan två olika skyddsnivåer. Prisvärdet ställs mot vad en vattenskada kostar: Vattenskadecentrum anger 49 700 kronor i snitt, och självrisken ensam 3 440 till 10 000 med åldersavdrag utöver det. Här vägs också in att samma artikel skiljer över tjugo procent mellan butiker, vilket gör butiksvalet till en del av priset.",
    },
    {
      key: "uppkoppling",
      label: "Uppkoppling och kontroll",
      weight: 10,
      description:
        "Om du får veta något medan du är borta, och om du kan göra något åt det. En brytare som stänger av vattnet gör sitt jobb även utan app, och därför väger det här minst av kriterierna. Men skillnaden mellan att komma hem till ett avstängt hus och att få ett meddelande samma minut är verklig, särskilt i ett fritidshus. Här väger notis i telefonen, möjligheten att stänga eller öppna på distans, och om funktionen kräver en prenumeration. Ett larm som bara piper i ett tomt hus är samma svaghet som på vattenlarmssidan.",
    },
  ],
};

/**
 * Nyckelskåp.
 *
 * ## Viktningen följer var kategorin faktiskt avgörs
 *
 * Beslutad av användaren 2026-08-05: 30/25/15/15/15. Underlaget är RISE
 * P115210, där fyra skåp angreps på fyra punkter. Utfallet var lopsided på ett
 * sätt som bestämde vikterna: **varje** skåp lossnade från väggen med kofot, på
 * 16 till 75 sekunder, medan spridningen mot luckan var stor, från 38 sekunder
 * till över tre minuter. Infästningen är alltså både den svagaste punkten och
 * den som skiljer minst, luckan den som skiljer mest.
 *
 * ## Inget eget kriterium för oberoende provning
 *
 * Två av sex rankade produkter har ett resultat i RISE-rapporten, alltså samma
 * täckning som Which? hade på /avfuktare (två av tio). Där löstes det genom att
 * väga in provningen i sakkriteriet i stället för att lägga en egen kolumn som
 * fyra rader skulle fylla med streck. Samma val här: RISE-tiderna väger in i
 * `infastning` och `luckalas` för de två modeller som faktiskt provats, och det
 * står i metodrutan.
 *
 * ⚠️ Betygen på de fyra oprovade produkterna är redaktionell bedömning ur
 * publicerad konstruktion — godset, infästningens utförande, låstypen — och
 * aldrig ett lånat provresultat. Se ALDRIG_BEDOMD i lib/spec-schema.mjs.
 */
export const USB_C_LADDARE: TestPage = {
  slug: "usb-c-laddare",
  label: "USB-C-laddare",
  title:
    "USB-C-laddare bäst i test 2026: tretton väggladdare från 179 till 1 699 kr",
  category: ELEKTRONIK,
  methodology:
    "Vi har läst direktiv (EU) 2022/2380 om den gemensamma laddaren i original på EUR-Lex, och det visade sig reglera något annat än vad kategorin påstår: kraven gäller apparaten, alltså telefonen, plattan och sedan den 28 april 2026 även den bärbara datorn, inte den fristående laddaren. En laddare är därför den enda delen av kedjan som ingen myndighet ställt krav på, och varje wattal på en kartong är tillverkarens eget påstående.\n\nRankningen bygger på vad laddaren gör: effekten på en port, vad som är kvar när en andra enhet sätts i, storleken i uttaget, priset per watt och vilka protokoll den talar. Uppgifterna är hämtade ur tillverkarens tekniska data och bruksanvisning, som är den källa som faktiskt sätter tal på fördelningen mellan portarna, och kontrollerade mot artikelnumret så att inget värde vandrar mellan två modeller som liknar varandra.\n\nBelgiska Testaankoop har labbprovat runt 40 universella USB-C-nätaggregat i tre effektklasser, publicerat 2026-04-14 och refererat av Stiftung Warentest i maj. Deras mätningar används i köpguiden för att förklara vad talen betyder, men de blir ingen betygskolumn, eftersom ingen av de nio modeller de namnger med poäng säljs av de butiker vi jämför. Att låna ett provresultat från en modell till en annan vore en påhittad mätning. Vi har inte mätt en enda laddare själva och påstår aldrig något annat.\n\nPriser och kundbetyg är lästa på butikens egen produktsida 2026-08-05. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "effektdelning",
      label: "Effekt och effektdelning",
      weight: 35,
      description:
        "Vad laddaren ger på en port, och vad som händer med den effekten när du sätter i en enhet till. Det är kategorins mest missförstådda tal, eftersom siffran på kartongen nästan alltid är summan över alla portar och inte vad någon enskild enhet får. Testaankoop mätte att den första porten alltid ger mer än den andra, och att den andra porten som mest gav 48 W i hela fältet. En laddare märkt 65 W kan alltså ge 45 W till datorn och 20 W till telefonen när båda sitter i, vilket är skillnaden mellan att datorn laddar och att den laddar ur långsammare. Tyngst väger att den högsta porten räcker till en laptop, och att den andra porten inte kollapsar när den används. En laddare som ger 45 W till datorn och 20 W till telefonen samtidigt är en bättre laddare än en som ger 65 W till den ena och 5 W till den andra, oavsett vad det står på kartongen.",
    },
    {
      key: "prisvarde",
      label: "Pris per watt",
      weight: 29,
      description:
        "Vad effekten kostar, räknat som kronor per watt märkeffekt. Måttet finns här för att rankningen är en enda lista över allt från en 20-wattsladdare för 199 kronor till en 200-wattsstation för 1 699, och utan normalisering hade den största laddaren vunnit på konstruktion i stället för på förtjänst. Spannet är stort och följer inte priset: den billigaste laddaren i jämförelsen kostar knappt fyra kronor per watt och den dyraste per watt nästan elva. Här väger också in vad som ligger i kartongen. Testaankoop noterade att kabeln nästan aldrig ingår och att en USB-C-kabel i deras urval kostade i snitt 19,95 euro, alltså en fjärdedel av laddarens snittpris ovanpå. En laddare som är fem procent dyrare men levereras med kabeln är billigare.",
    },
    {
      key: "storlek",
      label: "Storlek och plats i uttaget",
      weight: 24,
      description:
        "Hur stor laddaren är i förhållande till effekten, och om den låter dig använda uttaget bredvid. Det är hela skälet till att galliumnitrid finns: en GaN-laddare behöver färre komponenter och mindre höjd för värmen, och blir därför mindre vid samma effekt. Skillnaden är verklig och stor, från 50 gram till 280 i den här jämförelsen. Testaankoop underkände flera modeller på just den här punkten, däribland Amazon Basics prisvinnare, för att de blockerar grannuttaget när de sitter i ett grenuttag. Det är samma iakttagelse som vi gjorde om breda smarta pluggar, och den irriterar alla som råkat ut för den. En laddare som tar två platser i grenuttaget vid skrivbordet är en sämre laddare även om den laddar lika snabbt.",
    },
    {
      key: "protokoll",
      label: "Protokoll och kompatibilitet",
      weight: 12,
      description:
        "Vilka laddprotokoll laddaren talar, vilket avgör om din enhet får full fart eller bara ström. USB Power Delivery är det protokoll direktivet pekar ut, och det som gäller: alla laddare i Testaankoops fält stödde PD 3.0, men bara en enda av runt fyrtio stödde PD 3.1, som krävs för de högsta effekterna över 100 W. PPS spelar roll för Samsung och en del Android-telefoner, eftersom det låter laddaren finjustera spänningen i små steg i stället för att hoppa mellan fasta nivåer. Vikten är avsiktligt låg, av två skäl: skillnaderna är mindre än marknadsföringen antyder när alla klarar PD 3.0, och en PD 3.1-märkning i svensk handel är ett påstående ingen oberoende part kontrollerat. Vi betygsätter vad som är publicerat, inte vad som är verifierat, och säger det rakt ut.",
    },
  ],
};

export const NYCKELSKAP: TestPage = {
  slug: "nyckelskap",
  label: "Nyckelskåp",
  title:
    "Nyckelskåp bäst i test 2026: fem boxar med kod till ytterdörrsnyckeln",
  category: SAKERHET,
  methodology:
    "Fyra av produkterna i kategorin har provats av RISE på uppdrag av Villaägarnas Riksförbund, rapport P115210 från 2022, med provmetoden SS-EN 1630:2021 på nivåerna RC2 och RC3. Två av dem säljs fortfarande här och rankas nedan. Vi har läst rapporten i sin helhet och skrivit av tiderna per angreppspunkt, och vi har bekräftat mot rapportens egna foton att det skåp som provades är den mekaniska ABUS KeyGarage 787 och inte den elektroniska Smart-BT-modellen, eftersom de är olika produkter med samma nummer. Provresultaten väger in i betygen för infästning och för lucka och lås, men bara för de två modeller som har ett eget resultat i rapporten. Övriga tre bedöms på publicerad konstruktion, alltså gods, infästningens utförande och låstyp, och de får aldrig ett lånat provresultat från en systermodell. Skåpen är inte klassade enligt RC2 eller RC3: standarden omfattar dörrar och fönster, och RISE valde den för att kunna simulera ett standardiserat inbrottsförsök. Väderskyddet betygsätts på vad tillverkaren byggt skåpet för, alltså en angiven kapslingsklass, ett angivet temperaturspann eller ett lock över kodhjulen. En uppgift vi inte fått fram sänker aldrig ett betyg. Priser och kundbetyg är lästa på butikens egen produktsida och daterade. Vi har inte brutit upp ett enda skåp. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "infastning",
      label: "Infästning i vägg",
      weight: 30,
      description:
        "Hur skåpet sitter fast, vilket är det som avgör om tjuven behöver öppna det alls. Ett skåp som går att bryta loss tar man med sig och öppnar i lugn och ro någon annanstans, och då spelar låset ingen roll. Det här är kategorins svagaste punkt: i provningen lossnade samtliga fyra skåp från väggen med kofot, snabbast på 16 sekunder och långsammast på 1 minut och 15. Tyngst väger antalet infästningspunkter, om skruvarna sitter innanför luckan så att de inte går att skruva ur utifrån, och om bakstycket sitter ihop med skåpkroppen. På två av de provade skåpen lossnade bakstycket från kroppen, vilket gjorde innehållet åtkomligt utan att luckan öppnades. Underlaget väger lika mycket som skåpet: fyra skruvar i massivt trä eller betong är en annan sak än fyra i en tunn panel.",
    },
    {
      key: "luckalas",
      label: "Lucka, gångjärn och lås",
      weight: 25,
      description:
        "Vad som händer när någon angriper själva luckan, vid låset eller vid gångjärnen. Här är spridningen störst och därför är raden värd mest när du jämför två skåp: i provningen öppnades den svagaste luckan på 38 sekunder med skruvmejsel och kniv, medan den starkaste stod emot hela den tid metoden ger. Gångjärnssidan är oftare den svaga av de två, och tre av fyra luckor lossnade just där. Här väger också in vad godset är gjort av. En lucka i tryckgjuten zink och en kropp i aluminium beter sig olika under en kil, och tunn plåt viker sig där gjutgods spricker. Det snabbaste angreppet i hela provningen hörde hemma på den här raden: åtta slag med en vanlig snickarhammare och nio sekunder.",
    },
    {
      key: "vaderskydd",
      label: "Väderskydd",
      weight: 15,
      description:
        "Om skåpet klarar att sitta ute året om, och om koden går att använda i februari. Ett nyckelskåp sitter nästan alltid utomhus, och det som slutar fungera först är sällan stålet utan mekaniken bakom sifferhjulen och batteriet bakom en knappsats.\n\nSkalan mäter vad tillverkaren byggt skåpet för. 5,0 för en kapslingsklass tillsammans med ett temperaturspann, alltså ett skåp du kan hålla mot vintern där du bor. 4,0 för en kapslingsklass utan spann. 3,5 för ett väderskydd som täcker hela huset och ett lås som inte drar ström. 3,0 för ett lock över kodhjulen och ett lås utan ström.\n\nEtt skåp som är byggt för skyddat läge under tak är inte sämre gjort, men det begränsar var det får sitta, och det är värt att veta innan du borrar.",
    },
    {
      key: "kod",
      label: "Kod och handhavande",
      weight: 15,
      description:
        "Hur du släpper in någon, och hur du släpper ut dem igen. Fyra sifferhjul ger 10 000 kombinationer, fungerar i alla temperaturer och behöver aldrig batteri, men alla som någon gång fått koden har den kvar tills du vrider om hjulen manuellt. En elektronisk knappsats kan ge varje gäst en egen kod som slutar gälla av sig själv, vilket är hela poängen om du hyr ut, men den slutar också fungera när batteriet tar slut. Här väger även in om koden går att avläsa av någon som står bakom dig, och om sifferhjulen syns i mörker.",
    },
    {
      key: "prisvarde",
      label: "Pris och värde",
      weight: 15,
      description:
        "Vad du får för pengarna i en kategori där priset säger påfallande lite om motståndet. Spannet i jämförelsen är 349 till 2 599 kronor, alltså mer än sju gånger, och det dyraste skåpet är inte det som stod emot bäst. Väg priset mot vad som ligger i skåpet och hur länge det ligger där. Ett skåp som används två veckor om året när stugan hyrs ut är ett annat köp än ett som sitter framme dygnet runt för hemtjänsten, och det senare motiverar mer pengar även när skillnaden i plåt är liten.",
    },
  ],
};

/**
 * Garageportsöppnare.
 *
 * ## Varför skydd vid stängning väger tyngst
 *
 * Utkastet lade 40 på dragkraft, eftersom det är talet kategorin säljs på.
 * Manualerna ändrade det. Boxers säger att *"Trækkraften kan reguleres i en
 * skala 1-9, hvor 9 er det maksimale (800N / 1000N)"* och Chamberlains
 * avsnitt 26 heter "Ställa in kraften" och beskriver hur den **lärs in** vid
 * installationen. Talet på kartongen är alltså högsta läget på ett reglage,
 * inte levererad förmåga, och att vikta det till 40 hade mätt ett tak som om
 * det vore ett utfall. Vikten sänktes till 25 efter användarbeslut 2026-08-05.
 *
 * Skydd vid stängning tog över på 30, eftersom det är den enda axeln där
 * tillverkarna säger olika saker och där skillnaden är kontrollerbar per
 * modell ur tier A-källor.
 *
 * ## ⚠️ Inget testomdömekriterium
 *
 * Ingen har provat portöppnare. Råd & Rön saknar test, Stiftung Warentest
 * saknar test, och de tyska träffarna är Vergleich-sidor utan egen provning.
 * Ljud & Bilds enda test i ämnet gäller Yale Smart Opener, alltså smart
 * styrning av en befintlig öppnare, och hör hemma på systersidan. Samma
 * situation som /utomhustimer, /vattenlarm och /luftrenare.
 *
 * ## ⚠️ Kraften får aldrig härledas
 *
 * `Dragkraft` och `Vridmoment` ligger i `ALDRIG_BEDOMD` i lib/spec-schema.mjs.
 * Att räkna om Nm till N kräver utväxling och kuggdiameter som ingen
 * publicerar. Den som tiger ska synas tiga.
 */
export const GARAGEPORTSOPPNARE: TestPage = {
  slug: "garageportsoppnare",
  label: "Garageportsöppnare",
  title:
    "Garageportsöppnare bäst i test 2026: sex motorer, och talet på kartongen",
  category: HEM_HUSHALL,
  methodology:
    "Kategorin saknar oberoende provning. Ingen av produkterna nedan har testats i labb av Råd & Rön, Stiftung Warentest eller någon annan vi kunnat hitta, och därför finns inget kriterium för testomdöme. I stället har vi hämtat och läst tillverkarnas egna bruksanvisningar, vilket är den enda källa som säger något om stängningskraft, fotocell och hinderprov. Det gav tre uppgifter butikerna inte skriver ut. Chamberlains manual sätter en gräns på 400 newton för kraften vid den stängande portkanten och kräver fotocell över den, medan Boxers anger max 1000 newton för både öppning och stängning. Boxers manual visar också att dragkraften ställs in på en skala från ett till nio, alltså att talet i produktnamnet är högsta läget på ett reglage och inte vad öppnaren levererar. Och Julas försäkran om överensstämmelse anger 700 newton dragkraft för en öppnare som butiken säljer som 700 newtonmeter vridmoment, vilket är en annan storhet. Där en uppgift inte gått att fastställa räknas det som en brist i betyget för öppen redovisning, eftersom en egenskap du inte kan kontrollera före köpet är sämre för dig än en du kan. Priser, artikelnummer och kundbetyg är lästa på butikens egen produktsida och daterade. Vi har inte monterat en enda öppnare och inte mätt en enda kraft. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "skydd",
      label: "Skydd vid stängning",
      weight: 30,
      description:
        "Vad som händer när porten stänger sig mot något som inte borde vara där. En garageport är den tyngsta rörliga sak de flesta har hemma, och den rör sig nedåt. Tyngst väger vad tillverkaren själv skriver ut. Chamberlains manual sätter en gräns: kraften vid den stängande portkanten får inte överstiga 400 newton, och över den gränsen blir fotocellen obligatorisk. Boxers manual anger i stället max 1000 newton för både öppning och stängning, alltså inget särskilt tak för den riktning som kan klämma någon. Här väger också in om fotocellen ligger i lådan, och det gör den inte hos någon av dem: hos Chamberlain är den tillbehör 770EML, hos Jula finns bara plintarna förberedda, hos Boxer nämns den inte alls. Dessutom väger automatisk stängning in, eftersom Boxer levereras med den påslagen från fabrik. Och slutligen om manualen alls beskriver hinderprovet du ska göra själv, och mot vilken höjd: 40 mm hos Chamberlain, 50 mm hos Jula 377011, och både 50 och 100 mm på två ställen i samma Jula-manual.",
    },
    {
      key: "kapacitet",
      label: "Dragkraft och portkapacitet",
      weight: 25,
      description:
        "Vad öppnaren orkar med, och om den räcker till just din port. Dragkraften anges i newton och är det tal som beskriver arbetet, men den är inte en fast egenskap: Boxers manual säger att kraften ställs in på en skala från ett till nio där nio är maximum, och Chamberlains att den lärs in under installationen. Talet på kartongen är alltså ett tak, inte ett utfall, och vi betygsätter det som ett tak. Därför väger max portvikt, portyta och porthöjd nästan lika tungt, eftersom de är de mått du faktiskt kan hålla mot din egen port med ett måttband. En öppnare som klarar 16 kvadratmeter och 120 kilo är ett annat köp än en som klarar 12 och 80, och den skillnaden går att kontrollera innan du borrar. Där en tillverkare anger vridmoment i newtonmeter i stället för dragkraft i newton har vi inte räknat om talet, eftersom omräkningen kräver utväxling och kuggdiameter som ingen publicerar.",
    },
    {
      key: "standarder",
      label: "Säkerhetsstandarder i försäkran",
      weight: 25,
      description:
        "Vilka säkerhetsstandarder tillverkaren åberopar i sin försäkran om överensstämmelse. Det är det enda kontrollerbara påstående som finns om vad öppnaren gör mot det som står i vägen, och det är bindande för tillverkaren på ett sätt som ett tal på en kartong inte är. EN 12453 är den som betyder något. Den sätter gränser för kraften vid den stängande portkanten, alltså precis den kraft som träffar ett barn eller en bilhuv, och den är skriven för maskindrivna portar. EN 13241 gäller porten som produkt och EN ISO 12100 maskinsäkerhet i allmänhet. Skalan: 5,0 när försäkran åberopar EN 12453, 3,0 när den åberopar gällande maskindirektiv och allmänna säkerhetsstandarder men inte portstandarderna, 2,0 när den bara åberopar elsäkerhet, och 1,0 när den åberopar direktiv som redan var upphävda när den undertecknades. Det sista är inte en teoretisk nivå. Boxers försäkran, undertecknad 2015, åberopar maskindirektivet 98/37/EG som upphörde att gälla 2009 och EMC-direktivet 89/336/EEG som upphörde 2007. Det säger ingenting om huruvida öppnaren är säker eller lagligt CE-märkt, och vi har inte provat något. Det säger att dokumentet inte hållits aktuellt. En produkt vars försäkran vi inte fått fram får inget betyg här alls. Vi drar inte av för vad vi inte hittat."
      },
      {
        key: "prisvarde",
        label: "Prisvärde",
        weight: 15,
        description: "Vad du får för pengarna, mätt mot vad de andra kostar för samma sak. Spannet i den här jämförelsen är stort, från 499 kronor till över 3 000, och skillnaden i pris följer inte skillnaden i förmåga särskilt väl. Här väger in vad som ingår i lådan, alltså antal fjärrkontroller, skena, beslag och nödutlösning, eftersom en öppnare som kräver tillbehör för att bli komplett kostar mer än prislappen. Kundbetyg från butiken visas i tabellen men vägs aldrig in, eftersom betyg från olika butiker inte är jämförbara.",

      },
      {
        key: "drift",
        label: "Drift och hållbarhet",
        weight: 5,
        description: "Vad öppnaren drar när den står still, hur fort den går och hur länge garantin gäller. Standbyförbrukningen är den post som kostar pengar, eftersom en portöppnare står strömsatt dygnet runt och används några minuter om dagen. Bauhaus anger 8 watt för Boxer, vilket blir omkring 70 kilowattimmar om året. Kriteriet väger lätt eftersom uppgiften saknas hos de flesta och eftersom skillnaderna i praktiken är små jämfört med vad de andra kriterierna avgör.",

      },

    ],

  };
export const USB_C_KABEL: TestPage = {
    slug: "usb-c-kabel",
    label: "USB-C-kabel",
    title: "USB-C-kabel bäst i test 2026: tretton kablar från 59 till 1 099 kr",
    category: ELEKTRONIK,
    methodology: "Kontakten ser likadan ut i båda ändar av kategorin, och det är hela problemet: två kablar som inte går att skilja åt på hyllan kan skilja 83 gånger i datahastighet och fyra gånger i effekt. Rankningen bygger på vad kabeln gör: hur snabbt den flyttar data, om den driver en skärm, vad metern kostar, hur mycket effekt den släpper fram och vad den är byggd av. Uppgifterna är hämtade från tillverkarens eget datablad där ett sådant finns och från butikens produktsida i övrigt, och de är kontrollerade mot varandra. Att en uppgift är svår att hitta säger något om säljaren och ingenting om kabeln, så det påverkar inget betyg. Direktiv (EU) 2022/2380 är läst i original på EUR-Lex, och det namnger kabelstandarden EN IEC 62680-1-3:2021 i svensk lagtext utan att ställa ett enda krav på kabeln du köper: skyldigheten ligger på apparaten, som ska kunna laddas med en kabel som uppfyller standarden. Varje tal på en kabelförpackning är alltså tillverkarens eget påstående. Den enda oberoende provning som finns i kategorin är Testfaktas, där tyska PZT böjde tolv laddkablar 5 000 gånger med en publicerad metod, publicerad i februari 2020. Den bär köpguiden och förklarar varför en kabel går sönder, men den blir ingen betygskolumn: samtliga sex USB-C-kablar där är USB-A-formen, och den här sidan rankar bara USB-C till USB-C. Att låna ett provresultat från en kabelform till en annan vore en påhittad mätning. Tillverkarnas egna böjtal betygsätts inte heller, eftersom ingen av dem publicerar en metod och samma tillverkare anger allt från 5 000 till 300 000 böjningar för olika produkter. Priserna jämförs per meter, eftersom modellerna säljs i allt från 0,3 till 3 meter och den korta kabeln annars vinner på att vara kort. Vi har inte mätt en enda kabel själva och påstår aldrig något annat. Priser och kundbetyg är lästa på butikens egen produktsida 2026-08-05. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
    criteria: [
      {
        key: "datahastighet",
        label: "Datahastighet och skärmstöd",
        weight: 35,
        description: "Hur snabbt kabeln flyttar data, och om den kan driva en skärm. Det här är den egenskap som skiljer kategorin mest och som syns minst, eftersom kontakten är identisk oavsett vad som sitter inuti. En USB-C-kontakt har 24 stift, en USB 2.0-kontakt fyra, och en tillverkare som vill spara kopplar helt enkelt inte de åtta ledarna för de snabba datakanalerna. Spannet i den här jämförelsen går från 480 megabit i sekunden till 40 gigabit, alltså 83 gånger, och priset förutsäger det inte: hos Kjell kostar en kabel som anger 480 Mb/s 299,90 kronor medan en som anger 40 Gbps kostar 329. Skärmstödet ligger i samma kriterium och inte i en egen kolumn, av den enkla anledningen att en kabel som stannar på 480 Mb/s saknar de ledarpar DisplayPort Alt Mode behöver. Högst betyg får den som når 40 Gbps och driver 8K, lägst den som bara laddar. För den som enbart laddar en telefon spelar skillnaden ingen roll, och det står i köpguiden.",

      },
      {
        key: "prisvarde",
        label: "Prisvärde per meter",
        weight: 30,
        description: "Vad kabeln kostar per meter, vilket är det enda sättet att jämföra en rankning där modellerna säljs i 0,3 till 3 meter. Utan normaliseringen hade den kortaste kabeln vunnit på att vara kort, och en tremeterskabel förlorat på att räcka längre. Spannet är stort och följer inte kvaliteten: 39 kronor per meter i botten och 550 i toppen, alltså fjorton gånger, medan datahastigheten i toppen ibland är den samma som i botten. Måttet är också det som gör en tremeterskabel rättvisa, och längd är den egenskap köpare oftast underskattar. Kabeln som följde med telefonen är typiskt en meter, vilket räcker till ett nattduksbord och inte till en soffa. Här väger inte in vad kabeln klarar, det gör de andra kriterierna, utan bara vad metern kostar.",

      },
      {
        key: "effekt",
        label: "Effekt och e-marker",
        weight: 23,
        description: "Hur mycket effekt kabeln släpper fram. Utan e-markerchip stannar en USB-C-kabel på 3 ampere, alltså omkring 60 watt, hur stark laddaren än är, eftersom laddaren håller igen när kabeln inte kan uppge vad den tål. För 240 watt krävs Extended Power Range och USB PD 3.1, alltså 48 volt och 5 ampere. Det är den vanligaste orsaken till att en dyr laddare laddar långsamt, och den syns inte på kabeln.\n\nBetyget följer effekten och ingenting annat: 240 watt högst, 100 watt i mitten, 60 watt lägst. En kabel märkt 240 watt bär e-markerchipet vare sig säljaren skriver ut det eller inte, eftersom den annars inte hade fått gå över 60 watt, så watt-talet ensamt avgör. En 60-wattskabel laddar för övrigt varje telefon som säljs i full fart och är därför en annan produkt, inte en sämre.",

      },
      {
        key: "konstruktion",
        label: "Konstruktion och längdutbud",
        weight: 12,
        description: "Vad kabeln är klädd i och i vilka längder modellen finns. Materialet står här därför att det är där kablar faktiskt går sönder: när PZT böjde tolv laddkablar åt Testfakta var skadan i samtliga fall ett sprucket eller missfärgat kabelhölje vid dragavlastningen, inte ett brott i ledarna. Flätad nylon och silikon står emot den påfrestningen bättre än slät plast, och det syns på butikens egen produktbild. Längdutbudet väger in därför att en modell som bara finns i en meter inte löser problemet för den som behöver tre, och att byta märke för att byta längd betyder att man börjar om med en okänd kabel. Vikten är avsiktligt låg. Tillverkarnas böjtal betygsätts inte alls: ingen publicerar en metod, och samma tillverkare anger allt mellan 5 000 och 300 000 böjningar för olika produkter i sitt eget sortiment.",

      },

    ],

  };
/** * Smart garageportsöppnare. * * Systersida till GARAGEPORTSOPPNARE, beslutad av användaren 2026-08-05. Den * här sidan rankar modulerna som kopplas till en öppnare du redan har. * * ## Varför strömförsörjningen är ett eget kriterium * * De två billigaste modulerna, 374 och 384 kr, matas med 230 V och är * konstruerade för att sitta i en kopplingsdosa. De från 499 kr och uppåt går * på USB. Enligt Elsäkerhetsverket är en relämodul i den fasta installationen * arbete för registrerat elinstallationsföretag, och då är den billigaste * modulen inte längre billigast. Gränsen är utredd och rättad en gång på * /smart-strombrytare, och formuleringen är hämtad därifrån. * * ## ⚠️ Positionssensorn blev inget kriterium * * Utkastet byggde på att billiga reläer bara kan trycka på knappen medan dyra * också vet var porten står. Kontrollerat i butikernas egna texter föll den: * garageportsbrytarreläet på 374 kr anger "visning av styrenhetens aktuella * status (öppen/stängd)" och Tuya-modulen på 384 kr levereras med * öppningssensor för tungkontakt. Sensorn är standard i hela kategorin och * skiljer ingenting. Se .agent/research/smart-garageportsoppnare.md §3. * * ## ⚠️ Inget testomdömekriterium * * Ljud & Bilds Yale-test är kategorins enda oberoende provning och täcker en av * sex produkter. Samma bedömning som på /smart-strombrytare, där vikten sattes * efter hur mycket underlag kategorin faktiskt har och inte som en konstant. */

export const SMART_GARAGEPORTSOPPNARE: TestPage = {
    slug: "smart-garageportsoppnare",
    label: "Smart garageportsöppnare",
    title: "Smart garageportsöppnare bäst i test 2026: sex moduler till porten du redan har",
    category: SMART_HEM,
    methodology: "Sidan jämför moduler som kopplas till en garageportsöppnare du redan äger, inte motorer. Alla sex gör i grunden samma sak: de sluter en kontakt och härmar ett tryck på väggknappen.\n\nStrömförsörjningen väger tyngst tillsammans med kontoskyddet. Den avgör vad du får montera själv: en modul som matas med 230 V och ska sitta i en kopplingsdosa är enligt Elsäkerhetsverket en förändring av den fasta installationen och kräver registrerat elinstallationsföretag, medan en USB-matad modul är ett skruvmejseljobb.\n\nUppgifter om kontoskydd, kryptering, ekosystem och kompatibilitet är hämtade hos tillverkaren själv, alltså i hjälpcentret, manualen och produktsidan, och inte i butikens säljtext. Fyra av de sex tillverkarna beskriver hur kontot skyddas; för de två som bygger på Tuyas Smart Life har vi inte kunnat fastställa det, och den raden står som streck i tabellen i stället för att räknas som en brist.\n\nKategorin saknar oberoende provning så när som på ett test, Ljud & Bilds genomgång av Yale Smart Opener, som täcker en av sex produkter. Det är för tunt för ett eget kriterium men det står som källa. Priser, artikelnummer och kundbetyg är lästa på butikens egen produktsida och daterade. Vi har inte monterat en enda modul. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
    criteria: [
      {
        key: "installation",
        label: "Installation och behörighet",
        weight: 25,
        description: "Vad du får sätta upp själv, och vad som kräver att någon annan gör det. Skillnaden går rakt genom kategorin och den syns inte på prislappen. De två billigaste modulerna matas med 230 volt och är konstruerade för att sitta i en kopplingsdosa bakom väggknappen. Att lägga in en relämodul där är en förändring av den fasta installationen, och det kräver registrerat elinstallationsföretag. De dyrare modulerna går på USB eller matas från portöppnaren, och då handlar monteringen om två kablar och en skruvmejsel. Räknar du in en elektriker i priset ser kategorins prisordning helt annorlunda ut. Här väger också in hur mycket som ingår i lådan, alltså om sensor, kablar och fästen följer med eller köps separat.",

      },
      {
        key: "sakerhet",
        label: "Säkerhet och kontoskydd",
        weight: 25,
        description: "Vad som skyddar kontot som kan öppna ditt garage. Modulen flyttar en dörr till ditt hus ut på internet, och då är kontot bakom appen lika mycket en nyckel som fjärrkontrollen i bilen.\n\nTyngst väger tvåstegsverifiering. En kod ur en autentiseringsapp väger tyngre än en kod som skickas med e-post eller sms, eftersom e-postkontot och telefonnumret i sin tur kan kapas. Därefter väger krypteringen av trafiken mellan telefon, modul och tjänst.\n\nEn modul som håller data och inställningar i sig själv i stället för i en molntjänst väger lika tungt som tvåfaktor: det finns ingen central tjänst där ett intrång exponerar alla användare på en gång, och porten går att nå från hemmets nät även när internet ligger nere. Att modulen kan varna dig när porten öppnas väger också in, eftersom aviseringen är det enda du har att gå på när du inte är hemma.",

      },
      {
        key: "ekosystem",
        label: "Ekosystem och app",
        weight: 20,
        description: "Om modulen passar in i det du redan har hemma. De flesta som köper en sådan här produkt har redan valt sida mellan Apple, Google och Amazon, och en modul som inte pratar med rätt system blir en app till bland alla andra.\n\nMatter väger tyngst, eftersom det är den enda uppkopplingen som fungerar över alla tre utan att tillverkaren behöver stödja dem var för sig. Ett inbyggt HomeKit-stöd väger nästan lika tungt och räcker hela vägen för den som kör Apple i dag. Apples ekosystem är det som oftast fattas helt, och en modul som stänger ute det stänger ute en tredjedel av köparna. Här väger också in om en separat hubb krävs, eftersom en hubb är en extra kostnad och en extra sak som kan sluta fungera.",

      },
      {
        key: "kompatibilitet",
        label: "Kompatibilitet",
        weight: 15,
        description: "Om modulen fungerar med din portöppnare och din port. Alla modulerna här arbetar likadant: de sluter en potentialfri kontakt, alltså samma slutning som när du trycker på väggknappen. Det förutsätter att din öppnare har två skruvplintar för en sådan knapp, och det har de flesta men inte alla.\n\nHögst väger hur brett urval av öppnare modulen är provad mot och hur enkelt du kan kontrollera din egen innan du beställer, alltså en modellista eller en kompatibilitetskontroll att slå upp namnet i. Därefter väger vilka porttyper som är utpekade, alltså takskjutport, vipport eller båda, och hur många portar en enhet klarar. En modul som behöver ett extra tillbehör för en vanlig öppnarfamilj dras ner.",

      },
      {
        key: "prisvarde",
        label: "Prisvärde",
        weight: 15,
        description: "Vad du får för pengarna, mätt mot vad de andra kostar för samma sak. Spannet är stort, från 374 till 2 109 kronor för produkter som utför samma grundläggande handling. Här väger in vad som ingår i lådan och vad som måste köpas till. Det som väger allra tyngst är att en modul som kräver elinstallatör bär den kostnaden i sitt verkliga pris, även när den ser billigast ut i butikshyllan. Kundbetyg från butiken visas i tabellen men vägs aldrig in, eftersom betyg från olika butiker inte är jämförbara.",

      },

    ],

  };
/** * Powerbank, vardagsklassen. * * Systersida till USB_C_LADDARE och USB_C_KABEL, vars avgränsning sköt * powerbanken hit. Delad på storlek efter användarbeslut 2026-08-05: den här * sidan rankar 5 000 till 10 000 mAh, alltså det som laddar en telefon och * ryms i en ficka. Den stora rese- och laptopklassen från 20 000 mAh får * `/powerbank-20000`. Stiftung Warentest delar sitt eget test på samma sätt. * * ## ⚠️ Inget testomdömekriterium * * Warentest 2/2026 provade 24 powerbanks och mätte uttagbar energi, men * resultaten per modell ligger bakom betalvägg på 4,90 euro som vi inte köpt. * Metoden och de öppna spannen bär köpguiden i stället. Samma lösning som * Testaankoop på /usb-c-laddare. * * ## Öppen redovisning väger 15 och straffar tystnad * * Användarbeslut 2026-08-05: en produkt som inte anger wattimmar dras ner, * eftersom konsekvensen bärs av köparen. Wh är den storhet Transportstyrelsen * reglerar efter, och den som bara får ett mAh-tal kan inte svara på om * powerbanken får följa med ombord. Samma konstruktion som Väderskydd på * /nyckelskap. */ /** * ## Powerstation * * Viktningen är användarbeslut 2026-08-05 och följer **Stiftung Warentests egen * provform**, eftersom deras test är den enda riktiga labbprovning kategorin * har. De laddade ur elva powerstations vid tillverkarens egen angivna * maxeffekt tills batteriet var tomt, mätte laddtid, mätte ljudnivå i labb vid * både laddning och urladdning, lät flera provpersoner bedöma handhavande och * transport, och bedömde säkerheten vid upp- och urladdning. * * ⚠️ **Inget kriterium för testomdöme, och det är ett medvetet val.** Warentests * test är från 2023-07-20, resultaten per modell ligger bakom en betalvägg på * 4,90 EUR som vi inte betalat, och testet gäller föregående generation — * EcoFlow River 2 Max nämns vid namn medan svensk handel säljer River 3. M3:s * svenska grupptest av åtta produkter är från 2021–2023 och **noll av de åtta * säljs i de svenska kategorier vi läste 2026-08-05**. Ett kriterium som täcker * noll av tio rankade produkter är en kolumn med streck. Samma beslut som på * /iphone-skal, /utomhustimer och /garageportsoppnare. * * Metoden bär däremot både viktningen och köpguiden, och det öppna fyndet ur * testet bär sidan: **en av elva stängde av sig efter trettio minuter vid * tillverkarens eget angivna maxuttag.** * * ⚠️ **Risken med den här formen skrevs ut innan den valdes.** `Laddning och * drift` bygger delvis på ljudnivå, och den publiceras inte av alla. Gap-passet * kördes därför mot tillverkarnas egna sidor i stället för butikens och gav * dB-tal för sex av tio. Kriteriet vilar därför på tre ben — laddtid, ljudnivå * och solladdning — och inte på ett. */

export const POWERSTATION: TestPage = {
    slug: "powerstation",
    label: "Powerstation",
    title: "Powerstation bäst i test 2026: tio med ström i ett 230-voltsuttag",
    category: ELEKTRONIK,
    methodology: "Sidan jämför powerstations i den storlek som räcker till camping, stugan och ett strömavbrott, alltså 231 till 1 024 wattimmar och 1 999 till 8 999 kronor. Gränsen nedåt mot powerbank är Stiftung Warentests egen: en powerstation har minst ett 230 V-uttag. Hemreservklassen från 2 kWh jämförs för sig.\n\nViktningen följer formen i Warentests provning från juli 2023, där elva powerstations laddades ur vid tillverkarens angivna maxeffekt tills batteriet var tomt, laddtid och ljudnivå mättes i labb, och flera provpersoner bedömde handhavande och transport. Deras resultat per modell ligger bakom en betalvägg vi inte betalat, testet gäller föregående produktgeneration och ingen av produkterna här ingår i det. Därför finns inget kriterium för testomdöme.\n\nEffekten står i tre skilda rader i tabellen. Kontinuerlig effekt är vad växelriktaren orkar hela tiden, toppeffekt är sekunderna när en motor startar, och boosteffekt är ett läge där stationen sänker spänningen för att driva värmande last över märkeffekten. Talen är hämtade ur tillverkarens egen specifikation, eftersom butikerna publicerar dem i samma fält utan att säga vilket av de tre det är: för en och samma streckkod anger en butik 2 400 watt och en annan 4 000.\n\nEn uppgift vi inte fått fram sänker aldrig ett betyg och står som ett streck i tabellen. Vi räknar aldrig om ett cykeltal ur cellkemin och lånar aldrig ett värde från en systermodell. Där en kapslingsklass gäller batteripaketet och inte hela apparaten står det utskrivet, eftersom tillverkarna själva skiljer på det i fotnoten men inte i rubriken.\n\nSpecifikationerna är kompletterade 2026-08-06 ur tillverkarnas egna datablad och bruksanvisningar, matchade på GTIN. Priser, artikelnummer och kundbetyg är lästa på butikens egen produktsida och daterade. Vi har inte laddat ur en enda powerstation. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
    criteria: [
      {
        key: "energi",
        label: "Energi och effekt",
        weight: 30,
        description: "Hur mycket ström som ryms, och hur mycket den orkar lämna på en gång. Två tal avgör och de mäter helt olika saker. Wattimmar är energi och avgör hur länge något kan drivas: 1 000 wattimmar räcker till ett kylskåp i ungefär ett dygn eller en dator i tio timmar. Watt är effekt och avgör vad som över huvud taget går att koppla in, och en vattenkokare på 2 000 watt startar inte på en station som klarar 500 hur stort batteriet än är.\n\nDen kontinuerliga effekten väger tyngst och toppeffekten lättare, eftersom toppen bara varar i sekunder när en motor startar. Boostlägen räknas separat och lägst, eftersom de når sina watt genom att sänka spänningen och därför bara fungerar på värmande last.\n\nTalet i produktnamnet räknas inte alls. Det är ibland watt, ibland wattimmar och ibland ingetdera.",

      },
      {
        key: "livslangd",
        label: "Säkerhet och livslängd",
        weight: 25,
        description: "Hur många gånger den går att ladda innan den tappat en femtedel av sin kapacitet. Det är kategorins största dolda kostnad: litiumjärnfosfat, förkortat LiFePO4 eller LFP, anges till mellan 3 000 och 4 000 cykler, ternär litium och vanlig litiumjon till omkring 1 000. Skillnaden är en faktor tre till fyra på hur mycket energi produkten levererar under sin livstid, och den syns inte i priset.\n\nCellkemin väger tyngst, cykeltalet därnäst och garantins längd sist. Skyddsfunktioner som överlast, kortslutning och temperaturövervakning räknas hit. Kapslingsklassen räknas under bärbarhet och inte här, så den väger en gång och inte två.\n\nEtt cykeltal vi inte fått fram sänker aldrig ett betyg. Batteriet håller lika länge vare sig talet står tryckt någonstans eller inte, och vi gissar aldrig ett cykeltal ur cellkemin. En produkt där ingenting på den här punkten är belagt får inget betyg alls i stället för ett lågt.",

      },
      {
        key: "drift",
        label: "Laddning och drift",
        weight: 20,
        description: "Hur snabbt den fylls, hur mycket väsen den för, och om den kan laddas av solen. Laddtiden skiljer mest i praktiken: spannet här är från 49 minuter till nästan två timmar för att fylla ett tomt batteri, vilket avgör om den hinner bli full mellan två dagar i en stuga.\n\nLjudnivån väger in därför att en powerstation ofta står i samma rum som någon sover i, och skillnaden mellan 20 och 40 decibel är fyrfaldig eftersom skalan är logaritmisk. Det labb som mätt saken gjorde det både vid laddning och urladdning, eftersom fläkten går åt båda hållen.\n\nHit hör också solladdningen, alltså om regulatorn sitter inbyggd och hur många watt panel stationen tar emot, samt hur snabbt den kopplar om till batteridrift när nätet försvinner.",

      },
      {
        key: "barbarhet",
        label: "Bärbarhet",
        weight: 15,
        description: "Om den går att flytta dit strömmen behövs. Ordet portabel står på varenda kartong i kategorin och betyder väldigt olika saker: produkterna här väger från 2,75 till 12,5 kilo, alltså nästan en femdubbling. Det labb som provat kategorin bedömde transporten som en egen punkt och fann skillnader som inte bara följde vikten, utan också handtagens placering.\n\nVikt och format väger tyngst. Antalet uttag räknas hit, eftersom en station med ett enda 230-voltsuttag kräver en grendosa så fort två saker ska drivas, och en grendosa är en sak till att komma ihåg.\n\nHit hör också om stationen tål att stå ute, och där är rubriken sällan hela svaret. EcoFlow anger IP54 och IP65, men skriver i sin egen fotnot att klassen gäller batteripaketet och inte hela apparaten. Vi räknar den som det tillverkaren faktiskt provat, alltså som ett skydd för cellerna och inte som ett löfte om att stationen får stå i regn.",

      },
      {
        key: "prisvarde",
        label: "Prisvärde",
        weight: 10,
        description: "Vad du får för pengarna, räknat i kronor per wattimme och vägt mot vad de andra kostar. Spannet här är från 6,18 till 13,25 kronor per wattimme, alltså mer än en fördubbling för samma sorts lagrad energi.\n\nDet billigaste per wattimme är inte automatiskt det bästa köpet. En station med en fjärdedel så många cykler levererar en fjärdedel så mycket energi under sin livstid och kostar därför mer per uttagen kilowattimme, vilket vänder ordningen helt på den här sidan.\n\nHär väger också in vad som ingår, alltså laddkablar och adapter för solpanel, eftersom en solpanelskabel kostar 300 till 600 kronor extra. Kundbetyg från butiken visas i tabellen men vägs aldrig in, eftersom betyg från olika butiker inte är jämförbara.",

      },

    ],

  };
export const POWERBANK: TestPage = {
    slug: "powerbank",
    label: "Powerbank",
    title: "Powerbank bäst i test 2026: åtta som laddar telefonen i fickan",
    category: ELEKTRONIK,
    methodology: "Sidan jämför powerbanks i den storlek som laddar en telefon och ryms i en ficka, alltså 5 000 till 10 000 mAh. Den större rese- och laptopklassen jämförs för sig.\n\nDet som avgör betygen är energi, fart, format och pris, viktade 41, 23, 18 och 18. Kapaciteten väger tyngst därför att det är den fråga läsaren kommer med, men den mäts i wattimmar och inte i milliamperetimmar. Skälet syns i vårt eget material: de fyra powerbanks på nominellt 10 000 mAh som rankas här rymmer 36, 37 och 38,5 wattimmar, eftersom tillverkarna räknar med cellspänningarna 3,6, 3,7 och 3,85 volt. Samma tal på kartongen, sju procents skillnad i energi. Wattimmen är dessutom den enhet Transportstyrelsen reglerar efter, med 100 Wh som gräns för vad som får följa med ombord utan flygbolagets godkännande.\n\nVi räknar aldrig om milliamperetimmar till wattimmar åt en tillverkare som inte publicerat talet, av precis det skälet: spridningen ovan visar att en uträknad siffra kan slå fel med sju procent. En produkt utan publicerad wattimme får ett streck i tabellen och betygsätts på sin kapacitet i milliamperetimmar, som är känd. Att en uppgift saknas sänker aldrig ett betyg.\n\nKategorin har en riktig labbprovning, Stiftung Warentests test av 24 powerbanks i februari 2026, men resultaten per modell ligger bakom en betalvägg vi inte betalat. Ljud & Bild har provat fjorton powerbanks, varav en finns här. Ett testomdöme kräver täckning över hela fältet, så sidan har inget sådant kriterium.\n\nPriser, artikelnummer och kundbetyg är lästa på butikens egen produktsida 2026-08-05. Specifikationerna är kompletterade 2026-08-06 ur tillverkarnas egna manualer och användarguider. Vi har inte laddat ur en enda powerbank. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
    criteria: [
      {
        key: "kapacitet",
        label: "Kapacitet och uttagbar energi",
        weight: 41,
        description: "Hur mycket energi som ryms, och hur mycket av den som når telefonen. Talet på kartongen är milliamperetimmar och gäller cellen vid dess egen spänning. Din telefon laddas vid 5 volt eller mer, och omvandlingen dit kostar energi, så av 10 000 mAh blir det i praktiken ungefär två fulla telefonladdningar och inte de tre kartongen antyder.\n\nDärför väger wattimmen tyngre än milliamperetimmen här. De fyra tiotusenmodellerna på sidan rymmer 36, 37 och 38,5 wattimmar, eftersom cellspänningen varierar mellan 3,6 och 3,85 volt. Det är sju procents skillnad bakom ett identiskt tal på förpackningen, och den skillnaden är verklig energi i din ficka.",

      },
      {
        key: "laddeffekt",
        label: "Laddeffekt och portar",
        weight: 23,
        description: "Hur fort den fyller telefonen, hur fort den själv fyller på, och hur många saker den klarar samtidigt. Effekten ut avgör om en halvtimme ger dig en fjärdedel eller halva telefonen, och spannet här är fyrfaldigt: från 10,5 till 45 watt. Lika viktig är effekten in, som spänner från två till fyra timmar, eftersom en powerbank som laddar långsamt ofta står tom när du ska iväg.\n\nHär väger också antalet uttag, vad summan blir när flera används samtidigt, och om en kabel sitter fast i enheten så att du slipper komma ihåg en. Trådlös laddning räknas hit men väger lättare, eftersom den kostar mer energi i värme än sladden gör, och farten skiljer sig: Qi2 ger 15 watt mot en iPhone där de äldre magnetfästena ger 7,5.",

      },
      {
        key: "format",
        label: "Format och vikt",
        weight: 18,
        description: "Om den följer med eller blir kvar hemma. En powerbank som ligger i byrålådan laddar ingenting, och vikten är det som avgör om den hamnar i fickan eller i väskan. Spannet här är dubbelt: 120 gram för den lättaste mot 240 för den tyngsta, alltså en hel telefon i skillnad.\n\nTjockleken väger nästan lika mycket som vikten. 8,6 millimeter går ner i en innerficka med telefonen på; 36 millimeter gör det inte, hur lite den än väger. Formen räknas också: en platt magnetisk bank som sitter på telefonens baksida används på ett annat sätt än en som kräver att du gräver fram en sladd, och en enhet med fast eller utdragbar kabel slipper det vanligaste skälet till att en powerbank inte gör nytta.",

      },
      {
        key: "prisvarde",
        label: "Prisvärde",
        weight: 18,
        description: "Vad du får för pengarna, räknat per wattimme och inte per milliamperetimme. Spannet är trefaldigt: från 6,75 kronor per wattimme till 21,60 för produkter som rymmer exakt lika mycket energi. Den dyraste tiotusenmodellen kostar alltså tre gånger så mycket per laddning som den billigaste, och skillnaden ligger i fart, format och uttag snarare än i hur länge de räcker.\n\nHär väger också in vad som ingår, alltså om en kabel medföljer eller sitter fast, eftersom en powerbank utan kabel kräver en du kanske måste köpa. Kundbetyg från butiken visas i tabellen men vägs aldrig in, eftersom betyg från olika butiker inte är jämförbara.",

      },

    ],

  };
/** * iPhone-skal. * * Fjärde sidan i Elektronik, byggd 2026-08-05. * * ## Varför tre kriterier * * Garanti föreslogs som femte och ströks av användaren före insamlingen: * märkena anger två år, husmärkena ett, och kolumnen hade skiljt produkterna åt * på en axel ingen köper efter. * * `Öppen redovisning av skydd` bar vikt 22 från lanseringen till 2026-08-06 och * togs bort då, se lib/corrections.ts. Kriteriet betygsatte om tillverkaren * skrivit ut en fallhöjd och en standard, alltså säljarens produktblad och inte * skalet. Vikten fördelades proportionellt: 40/22/16 blev 51/28/21. * * ## ⚠️ Inget testomdömekriterium, och den här gången är kategorin helt tom * * Råd & Rön provar mobiler men inte skal. Testfakta har ingen provning. Stiftung * Warentest har provat vattentäta fodral och dykhus, alltså en annan produkt. * Det finns med andra ord ingen oberoende provning av skyddsskal över huvud * taget, och det står utskrivet på sidan enligt IDÉ-012. Samma läge som * /utomhustimer, /vattenlarm och /garageportsoppnare. * * ## ⚠️ Fallhöjden och militärstandarden betygsätts aldrig * * De ligger i ALDRIG_BEDOMD och bär numera inget kriterium alls. De står i * tabellen som tillverkarens uppgift och stannar där. Skälet är läst i * original: MIL-STD-810H del ett §1.2 b säger att det inte är giltigt att * betrakta en metods provvillkor som oföränderliga, och varje metod bär noten * "Tailoring is essential". Två tal från två tillverkare är därför inte * jämförbara ens när båda anges. Samma beslut som `Angiven besparing` på * /smart-termostat och `Angivet böjtal` på /usb-c-kabel. * * ## ⚠️ Ingen kategori utan tillämplig standard får ett redovisningskriterium * * Det som gör skalen till just det fallet är att motparten saknas: ingen * myndighet provar mobilskal och utfärdar intyg, och standarden själv säger att * villkoren får ändras. Kriteriet kunde därför bara mäta vem som tryckt ett tal * på kartongen. Samma form som `Dokumenterad provning` på /brandstege. */ /** * Galaxy S26-skal. * * Byggd 2026-08-05 tillsammans med /galaxy-s26-fodral, med delad research i * `.agent/research/galaxy-s26-skal.md`. Systersida till IPHONE_SKAL. * * ## ⚠️ Fyndet är iPhone-sidans fynd upp och ned * * Galaxy S26-serien saknar inbyggda Qi2-magneter. Samsung svarade 9to5Google * 2026-02-28 att serien i stället "supports Qi2-compatible phone cases", alltså * hänvisar tillverkaren köparen till skalet för en funktion telefonen inte har. * Samtidigt säljer Samsung både magnetisk powerbank och magnetladdare till just * den serien. * * På iPhone sitter magneten i telefonen och skalet får inte vara i vägen. Här * finns magneten bara om skalet bär den. Därför väger magnetkriteriet 30 mot 16 * på systersidan, efter användarbeslut. * * ## ⚠️ Samma skal säljs med och utan magnet, för 30 kronors skillnad * * Ringke Fusion X kostar 199 kr utan magnetring och Ringke Magnetic Fusion X * 229 kr med. Onyx och Magnetic Onyx skiljer 50 kr. Namnen skiljer sig på ett * ord. Det är sidans mest användbara enskilda uppgift, och de tre skalen utan * magnet rankas därför kvar i listan efter användarbeslut, i stället för att * flyttas till övervägda: kontrasten syns bara om båda står där. * * ## ⚠️ Serien heter S26, S26+ och S26 Ultra * * Aldrig "S26 Pro" eller "S26 Edge". De namnen kommer ur ryktesrapporteringen * före lanseringen och lever kvar i svensk teknikpress. Verifierat mot Samsungs * egen svenska sida, Elgigantens produktdata och Skal-mans modellnavigation. * Den här sidan rankar **bara basmodellen Galaxy S26**, efter användarbeslut. */ /** * Galaxy S26-fodral. * * Byggd 2026-08-05 tillsammans med /galaxy-s26-skal, delad research i * `.agent/research/galaxy-s26-skal.md`. Systersida till IPHONE_FODRAL. * * ## ⚠️ Fyndet följer direkt ur skalsidans * * Skalsidan slår fast att Galaxy S26 saknar inbyggda Qi2-magneter och att * skalet därför måste bära magneten. Läsaren kommer alltså hit och letar efter * ordet magnet — och hittar det överallt. * * Tolv av tretton konstruktioner utlovar en magnet. Det är **spännet som håller * locket stängt**, inte en laddmagnet. Ett enda fodral anger att laddning * fungerar genom fodralet. * * Det gör kriteriet laddning till något annat än på iPhone-sidan: där handlade * det om ifall telefonen måste ur fodralet, här handlar det dessutom om att * ordet magnet betyder fel sak i den här hyllan. * * ## Viktningen är iPhone-sidans, efter användarbeslut * * Kortkapacitet 25, konstruktion 25, laddning 20, prisvärde 20, * vardagsfunktion 10. Identisk med IPHONE_FODRAL, vilket gör systersidorna * direkt jämförbara. */

export const GALAXY_S26_FODRAL: TestPage = {
    slug: "galaxy-s26-fodral",
    label: "Galaxy S26 plånboksfodral",
    title: "Galaxy S26 plånboksfodral bäst i test 2026: tolv fodral från 89 till 479 kr",
    category: ELEKTRONIK,
    methodology: "Sidan rankar uppfällbara plånboksfodral till Samsung Galaxy S26, alltså basmodellen. Ett fodral passar exakt en modellstorlek, så fodral till S26+ och S26 Ultra hör inte hit. Skyddsskal utan kortfack jämförs för sig. En rad är en konstruktion och inte ett mönster: samma fodral säljs i upp till fem tryck, och mönstret hör till färgvalet.\n\nDet som är värt att veta innan du läser tabellen är vad ordet magnet betyder här. Galaxy S26 saknar inbyggda Qi2-magneter, vilket gör magnetringen till det viktigaste på ett skyddsskal, och en läsare tar med sig det hit. I den här hyllan betyder magnet nästan alltid spännet som håller locket stängt. Ett fodral bär magnetiska tillbehör, två laddar trådlöst genom fodralet, och fem tillverkare anger uttryckligen att deras fodral gör varken eller. Därför skiljer tabellen på magnetens funktion och laddning genom fodralet, i två kolumner i stället för en.\n\nIngen har provat plånboksfodral, varken vi eller någon annan, och kategorin saknar oberoende provning helt. Vi har inte burit ett enda fodral. Betygen bygger på hur fodralet är byggt och vad det rymmer.\n\nFyra fodral får inget betyg alls på laddning och magnettillbehör, eftersom ingen av de två egenskaperna är belagd för dem. Deras betyg räknas då på de fyra övriga kriterierna. Specifikationerna är hämtade hos tillverkarna Tech-Protect, Puro, Celly och Partner Tele.com samt ur Icecats produktdatabas 2026-08-06, och priser och artikelnummer på butikens egen produktsida 2026-08-05. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
    criteria: [
      {
        key: "kortkapacitet",
        label: "Kort och kontanter",
        weight: 25,
        description: "Hur mycket av plånboken som får plats, vilket är hela skälet att välja ett fodral framför ett skal. Antalet fack väger tyngst, och spannet är litet men avgörande: en ficka räcker till bankkortet, två till ett kort och en legitimation, tre till det plus ett resekort.\n\nSedelfacket väger nästan lika mycket, eftersom det avgör om plånboken kan lämnas hemma helt i stället för att bantas. Ett eget fack för sedlar är mer värt än ett delat: 5,0 kräver tre kortfack plus en egen sedelplats, medan tre fickor som kort och sedlar samsas i landar på 4,0. Ett fotofack räknas som ett grundare fack för ett kort du sällan tar fram.\n\nEtt fodral vars fack är beskrivna men inte uppräknade betygsätts på det som är belagt, alltså flera fack plus sedelplats, och aldrig lägre för att antalet inte står någonstans. Vi lånar aldrig ett tal från en systermodell i en annan färg.",

      },
      {
        key: "konstruktion",
        label: "Konstruktion och infästning",
        weight: 25,
        description: "Hur fodralet är byggt, och framför allt hur telefonen sitter fast i det. Infästningen är kategorins dolda skillnad och den är viktigare på den här telefonen än på en iPhone, som håller fodralet med sina egna magneter. Galaxy S26 har inga, så varje fodral måste hålla telefonen mekaniskt: en TPU- eller silikonhållare som telefonen trycks ner i, ett hårt innerskal, eller ett integrerat skal.\n\nSkillnaden märks. En mjuk hållare går att lyfta telefonen ur när du vill ha den naken men sitter lösare, medan ett hårt innerskal håller formen bättre när fodralet ligger i en väska med annat ovanpå.\n\nMaterialet och vecket väger tungt. Konstläder spricker där fodralet viks flera gånger om dagen, och det vecket är den punkt där ett fodral nästan alltid går sönder först. Två lösningar höjer betyget påtagligt: en styv ram som hindrar kanterna från att bågna, och ett perforerat veck som viker sig på en bestämd linje. Kriteriet väger lika tungt som kortkapaciteten därför att det här är det enda på ett fodral som inte går att lägga till i efterhand.",

      },
      {
        key: "laddning",
        label: "Laddning och magnettillbehör",
        weight: 20,
        description: "Vad fodralet släpper igenom och vad det bär. Två egenskaper mäts: om telefonen laddas trådlöst utan att tas ur, och om fodralets magneter håller fast ett tillbehör i stället för bara locket. Ett fodral som blockerar laddningen betyder att telefonen ska ur varje kväll, vilket är ett fumligt moment med korten i.\n\nSkalan går 5,0 för ett fodral som laddar trådlöst genom sig, och 2,0 för ett där tillverkaren anger att magneterna inte bär tillbehör. Det senare är ett besked om varan: en magnetladdare eller bilhållare du redan äger blir oanvändbar.\n\nFyra fodral får inget betyg här alls, eftersom ingen av de två egenskaperna är belagd för dem. De räknas då på de fyra övriga kriterierna i stället för att sättas på nedersta steget, därför att en uppgift vi inte fått fram är vårt problem och inte produktens.\n\nDen som laddar med sladd och aldrig använt ett magnetiskt tillbehör kan bortse från hela kriteriet, och för den läsaren säger tabellen vilka fodral som duger ändå.",

      },
      {
        key: "prisvarde",
        label: "Prisvärde",
        weight: 20,
        description: "Vad du får för pengarna, mätt mot vad samma funktion kostar någon annanstans i jämförelsen. Spannet är fem gånger, från 89 till 479 kronor, och det följer varken kortkapaciteten eller laddningen. Det dyraste fodralet kostar 479 kronor och har två kortfack; det billigaste kostar 89 och har två kortfack, fotofack, sedelhållare, ställfunktion och en handledsrem i förpackningen.\n\nHär väger också hur länge fodralet håller. Konstläder som spricker i vecket efter ett år är inte billigt även om det kostade 129 kronor, och ett fodral som måste bytas två gånger är dyrare än ett som inte måste det. Därför väger materialet in här och inte bara under konstruktion.",

      },
      {
        key: "vardagsfunktion",
        label: "Vardagsfunktion",
        weight: 10,
        description: "Det som gör fodralet bekvämt snarare än bra. Ställfunktionen väger mest: ett fodral som viks till ett stöd gör telefonen till en liten skärm på ett köksbord eller ett flygbord, och det är den vanligaste anledningen till att någon som provat ett fodral inte vill tillbaka till skal. Tio av tolv fodral här har den.\n\nHandledsremmen väger näst mest och är underskattad. En telefon i ett plånboksfodral är tyngre och halare än en naken telefon, och remmen är skillnaden mellan att tappa den och att inte göra det. Två fodral har en, och båda får den räknad.\n\nHit hör också magnetstängningens styrka, åt två håll: en stark magnet håller locket stängt i fickan, en för stark gör fodralet trögt att öppna med en hand. Ett fönster i locket som visar notiser utan att fodralet öppnas räknas här, eftersom det gör något åt att ett lock döljer skärmen.",

      },

    ],

  };
export const GALAXY_S26_SKAL: TestPage = {
    slug: "galaxy-s26-skal",
    label: "Galaxy S26-skal",
    title: "Galaxy S26-skal bäst i test 2026: tolv skal från 159 till 779 kr",
    category: ELEKTRONIK,
    methodology: "Sidan rankar skyddsskal till Samsung Galaxy S26, alltså basmodellen. Ett skal passar exakt en modellstorlek, så skal till S26+ och S26 Ultra hör inte hit även när de heter samma sak. Plånboksfodral är en annan sorts köp och jämförs för sig.\n\nDet som avgör mest i den här kategorin är magnetringen, och skälet ligger i telefonen: Galaxy S26-serien har inga inbyggda Qi2-magneter, och Samsung svarade 9to5Google i februari 2026 att serien i stället stöder magnetiska skal. Samtidigt säljer Samsung en magnetisk powerbank och en magnetladdare till just den serien. Ett skal utan ring gör alltså tillverkarens egna tillbehör oanvändbara, och det syns inte på produktnamnet: Ringke säljer samma skal i två versioner som skiljer 30 kronor och ett ord. Därför väger magneten 38.\n\nIngen har provat skyddsskal. Råd & Rön provar mobiler men inte skal, Testfakta har ingen provning, och vi har inte tappat en enda telefon själva. Kvar att bedöma är hur skalet är byggt och vad det kostar, och de väger 35 respektive 27.\n\nFallhöjder och militärstandarder står i tabellen men ingår inte i något betyg. MIL-STD-810 är läst i original i tre utgåvor: del ett säger att det inte är giltigt att betrakta en metods provvillkor som oföränderliga, varje metod bär noten att anpassning är nödvändig, och tabell 516.8-IX tillåter att de 26 fallen delas på upp till fem exemplar. Samsung anger 1,22 meter i fem omgångar om 26 fall mot stål, Spigen 1,2 meter och 26 fall, UNIQ tre meter utan att säga hur. De tre talen mäter inte samma sak, och att betygsätta dem hade rankat marknadsföringen.\n\nPriser och artikelnummer är lästa på butikens egen produktsida 2026-08-05. Material, hörnkonstruktioner, vikter, tjocklekar och fallprov är kompletterade hos tillverkarna 2026-08-06. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
    criteria: [
      {
        key: "magnet",
        label: "Magnetring och laddning",
        weight: 38,
        description: "Om skalet bär en magnetring, och vad den ringen duger till. Skälet att det här väger tyngst ligger i telefonen och inte i skalet: Galaxy S26 har inga inbyggda magneter. På en iPhone sitter de i telefonen och skalet behöver bara låta bli att vara i vägen. Här finns de bara om du köper dem, och du köper dem i form av ett skal.\n\nUtan ring fäster varken Samsungs egen magnetiska powerbank, deras egen magnetladdare, en bilhållare eller en magnetplånbok. Skillnaden syns knappt i namnet: Ringke Fusion X kostar 199 kronor och Ringke Magnetic Fusion X 229, och det är samma skal.\n\nHär väger också om laddning genom skalet fungerar över huvud taget, och om ringen sitter så att laddaren hamnar rätt. En magnetisk baksida är inte samma sak som en magnetring: en plåtbricka för en bilhållare fäster på en magnet utan att ladda någonting. Den som laddar med sladd kan bortse från hela kriteriet, och för den läsaren säger tabellen rakt ut vilka skal som duger ändå.",

      },
      {
        key: "konstruktion",
        label: "Skydd du kan se",
        weight: 35,
        description: "Det skalet gör med telefonen när den träffar marken, bedömt på hur det är byggt. Fyra saker väger: om kanten runt skärmen är förhöjd så att glaset inte tar i när telefonen landar på ansiktet, om kanten runt kameran är det så att linserna klarar att telefonen läggs ner på ett bord, om hörnen är förstärkta där energin faktiskt tas upp, och om knapparna är täckta eller lämnas öppna.\n\nHörnen väger tyngst av dem. En telefon som faller landar nästan aldrig platt, och ett skal som bara är ett tunt lager plast över baksidan flyttar kraften rakt in i ramen. Ett hårt polykarbonatskal utan mjuk ram skyddar därför sämre än en hybrid som kombinerar en styv baksida med en mjuk kant, även när det hårda skalet känns mer robust i handen.\n\nKameran är värd ett eget stycke på just den här telefonen, eftersom kamerablocket sticker ut och möter bordsskivan först. Vikten är sidans näst högsta därför att det är det här läsaren tror att hon betalar för.",

      },
      {
        key: "prisvarde",
        label: "Prisvärde",
        weight: 27,
        description: "Vad du får för pengarna, mätt mot vad samma skydd kostar någon annanstans i jämförelsen. Spannet är nästan fem gånger, från 159 till 779 kronor, och skyddet följer inte med hela vägen: ett skal med förhöjda kanter, luftkuddar i hörnen och magnetring kostar 159 kronor, och Samsungs eget skal med förstärkta kanter och magnetring kostar 779.\n\nHär väger också in vad som händer efter köpet. Magnetringen är den enda funktionen i kategorin som inte går att lägga till i efterhand, så ett billigt skal utan ring tvingar fram ett andra köp den dag du skaffar en magnetladdare. Ett skal för 199 kronor som måste bytas ut är dyrare än ett för 229 som inte måste det.\n\nÅt andra hållet gäller att den som verkligen laddar med sladd får ett fullgott skal billigare, och den läsaren ska inte betala för en ring hon aldrig använder.",

      },

    ],

  };
export const IPHONE_SKAL: TestPage = {
    slug: "iphone-skal",
    label: "iPhone-skal",
    title: "iPhone-skal bäst i test 2026: tolv skal från 99 till 1 099 kr",
    category: ELEKTRONIK,
    methodology: "Sidan rankar skyddsskal till iPhone 17-serien. Ett skal passar exakt en modellstorlek, och iPhone 17 och 17 Pro delar skärmstorlek men inte skal, så varje rad säger vilken artikel vi prissatt och priset gäller genomgående 17 Pro-varianten. Plånboksfodral, skärmskydd och kameralinsskydd är en annan sorts köp och förklaras i köpguiden.\n\nIngen har provat skyddsskal: Råd & Rön provar mobiler men inte skal, Testfakta har ingen provning, och Stiftung Warentests fallprov gäller vattentäta dykhus. Det finns alltså inget testomdöme att väga in, och vi har inte tappat en enda telefon själva. Betygen sätts på hur skalet är byggt, vad det kostar och vad magneten duger till, viktade 51, 28 och 21.\n\nFallhöjder och militärstandarder står i tabellen men ingår inte i något betyg. MIL-STD-810 är läst i original i tre utgåvor: del ett §1.2 b säger att det inte är giltigt att betrakta en metods provvillkor som oföränderliga, varje metod bär noten att anpassning är nödvändig, och tabell 516.8-IX tillåter att de 26 fallen delas på upp till fem exemplar. Ingen myndighet provar mobilskal och utfärdar intyg. Två tal från två tillverkare mäter därför inte samma sak, och att betygsätta dem hade rankat marknadsföringen.\n\nPriser, artikelnummer och lagerstatus är lästa på butikens egen produktsida 2026-08-05. Specifikationerna är kompletterade hos tillverkarna 2026-08-06. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
    criteria: [
      {
        key: "konstruktion",
        label: "Skydd du kan se",
        weight: 51,
        description: "Det skalet gör med telefonen när den träffar marken, bedömt på hur det är byggt. Fyra saker väger: om kanten runt skärmen är högre än glaset, om kanten runt kameran är högre än linserna, om hörnen är förstärkta där energin tas upp, och om knapparna är täckta.\n\nHörnen väger tyngst. En telefon som faller landar nästan aldrig platt, och ett tunt lager plast över baksidan flyttar kraften rakt in i ramen. Ett hårt polykarbonatskal utan mjuk ram skyddar därför sämre än en hybrid med styv baksida och TPU-kant, även när det hårda skalet känns mer robust i handen.\n\nVikten är sidans högsta därför att det är det här du betalar för, och det enda i kategorin som går att bedöma på annat än ett påstående.",

      },
      {
        key: "prisvarde",
        label: "Prisvärde",
        weight: 28,
        description: "Vad du får för pengarna, mätt mot vad samma skydd kostar någon annanstans i jämförelsen. Spannet är elva gånger, från 99 till 1 099 kronor, och skyddet följer inte med hela vägen: ett hybridskal med förhöjda kanter, förstärkta hörn och magnetring kostar 269 kronor, ett femlagersskal i kevlar 1 099.\n\nHär väger också vad som ingår. En magnetring är den enda funktionen i kategorin som kostar ett helt nytt skal att lägga till i efterhand, eftersom laddaren, bilhållaren och plånboken slutar sitta fast utan den. Ett billigt skal som tvingar fram ett andra köp är inte billigt.",

      },
      {
        key: "magnet",
        label: "Magnet och trådlös laddning",
        weight: 21,
        description: "Om skalet har en magnetring, och vad ringen duger till. Utan den faller MagSafe-laddaren av, magnetplånboken sitter inte kvar och bilhållaren blir en klämma, och skillnaden syns inte på produktbilden: två skal från samma tillverkare kan heta nästan samma sak, se identiska ut och kosta 70 kronor isär.\n\nHär väger också om laddningen fungerar genom skalet och om Qi2 anges, alltså 25 watt i stället för 15. Ett skal som bara kallas magnetiskt kan ha en plåtbricka för en bilhållare, vilket fäster mot en magnet men inte laddar.",

      },

    ],

  };
/** * Powerbank, reseklassen. * * Systersida till POWERBANK. Delningen på storlek är ett användarbeslut * 2026-08-05, och Stiftung Warentest delar sitt eget test likadant. Den här * sidan rankar från 20 000 mAh och uppåt, alltså det som laddar en dator och * följer med på resa. * * ## ⚠️ Fyndet är det omvända mot vardagsklassen * * På /powerbank anger två av åtta produkter sitt energiinnehåll i wattimmar. * Här gör sju av nio det. Skälet är att taket på 100 Wh bara är i sikte i den * här storleken: en bank på 10 000 mAh kan omöjligt komma nära, en på 27 600 * ligger 0,64 wattimmar under. Wattimmen publiceras när tillverkaren har ett * skäl att visa att produkten ryms under gränsen. * * ## ⚠️ Tre gånger 20 000 mAh ger tre olika wattimmar * * Linocell Premium anger 72 Wh, Anker Prime 72,36 Wh för 20 100 mAh, och Xtorm * 100 Wh. De två första är förenliga med varandra; den tredje är 39 procent * högre för samma nominella kapacitet. Vi påstår inte att någon har fel — vi * redovisar spridningen, som på /avfuktare och /garageportsoppnare. Talet är * butikens publicerade uppgift och inget annat. * * ## ⚠️ Inget testomdömekriterium * * Warentests resultat per modell ligger bakom betalvägg. Metod och de öppna * spannen bär köpguiden i stället. */

export const POWERBANK_20000: TestPage = {
    slug: "powerbank-20000",
    label: "Powerbank 20 000 mAh",
    title: "Powerbank 20 000 mAh bäst i test 2026: åtta för resan och datorn",
    category: ELEKTRONIK,
    methodology: "Sidan jämför powerbanks från 20 000 mAh och uppåt, alltså den storlek som laddar en bärbar dator och följer med på resa. Den mindre klassen som laddar en telefon jämförs för sig.\n\nDet är i den här storleken flygreglerna börjar spela roll. Transportstyrelsen tillåter högst 100 wattimmar i handbagaget utan flygbolagets godkännande, och två av produkterna nedan ligger på 99,75 respektive 99,36 wattimmar. Ingen powerbank får checkas in, och den regeln gäller varje storlek.\n\nKategorin har en riktig labbprovning, Stiftung Warentests test av 24 powerbanks i februari 2026, men resultaten per modell ligger bakom en betalvägg vi inte betalat. Därför finns inget kriterium för testomdöme, och inget modellresultat därifrån återges eller gissas.\n\nVikten väger 18 av 100 och är framtagen för alla åtta, eftersom 225 gram skiljer den lättaste från den tyngsta och det är den skillnad som märks på en resdag. Priser, artikelnummer, specifikationer och kundbetyg är lästa på butikens och tillverkarens egna sidor och daterade. Vi har inte laddat ur en enda powerbank. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
    criteria: [
      {
        key: "kapacitet",
        label: "Kapacitet och uttagbar energi",
        weight: 35,
        description: "Hur mycket ström som ryms, och hur nära taket det för dig. Transportstyrelsens gräns för handbagage går vid 100 wattimmar, och den nås runt 27 000 milliamperetimmar. Två av produkterna här ligger inom en wattimme under gränsen, alltså på maximal laglig kapacitet.\n\nSkalan följer den nominella kapaciteten: 5,0 från 26 000 milliamperetimmar och uppåt, 4,5 vid 25 000 och 3,5 vid 20 000. En bank på 20 000 mAh ger en telefon ungefär fyra laddningar eller en lättare bärbar dator ungefär en. Ett labb som mätt uttagbar energi i den här storleksklassen fann mellan 58 och 70 wattimmar, alltså mindre än de nominella talen antyder.",

      },
      {
        key: "laddeffekt",
        label: "Laddeffekt och portar",
        weight: 29,
        description: "Hur fort den fyller det du kopplar in, och hur fort den själv fylls. Spannet är extremt: från 22,5 watt totalt till 300, alltså mer än tretton gånger. Under 60 watt laddar den en telefon fort men en bärbar dator långsamt eller inte alls, och över 100 watt laddar den en dator i full fart medan en telefon hålls igång.\n\nDet som skiljer toppen från mitten är den totala effekten och inte portens: fyra av åtta ger 140 watt ur en enda port, men det de klarar med allt inkopplat spänner från 87,5 till 300 watt. Uppladdningen av banken själv väger lika tungt, eftersom 20 000 milliamperetimmar tar lång tid att fylla: de snabbaste är fulla på en timme, de långsammaste behöver tre och en halv. Antal portar, en fast kabel och stödet för äldre USB-A väger också in.",

      },
      {
        key: "vikt",
        label: "Vikt och format",
        weight: 18,
        description: "Vad den väger i väskan, och om den går att bära hela dagen. Spannet är 400 till 625 gram, alltså mellan en och en och en halv telefon extra i packningen, och de 225 grammen mellan den lättaste och den tyngsta märks på en flygplats.\n\nSkalan följer vikten: 5,0 vid 400 gram, 4,5 upp till 460, 4,0 upp till 495, 3,5 upp till 510, 2,5 upp till 535, 2,0 upp till 600 och 1,5 däröver. Formen justerar där den skiljer sig tydligt, eftersom en tjock och kantig enhet tar plats i en datorväska på ett annat sätt än en platt: den mest kompakta tar 280 kubikcentimeter och den mest utrymmeskrävande 484.",

      },
      {
        key: "prisvarde",
        label: "Prisvärde",
        weight: 18,
        description: "Vad du får för pengarna, mätt mot vad de andra kostar för samma sak. Spannet är kategorins bredaste: från 349 till 2 490 kronor för produkter som alla rymmer minst 20 000 milliamperetimmar. Det som skiljer är laddeffekt och vikt, och de två följer priset långt ifrån perfekt.\n\nHär väger också in vad som ingår, alltså om en kabel sitter fast eller följer med, eftersom en powerbank som ska ladda en dator kräver en kabel som klarar effekten. Kundbetyg från butiken visas i tabellen men vägs aldrig in, eftersom betyg från olika butiker inte är jämförbara.",

      },

    ],

  };
export const SLACKSPRAY: TestPage = {
    slug: "slackspray",
    label: "Släckspray",
    title: "Släckspray bäst i test 2026: fem sprayer och klassen som står på burken",
    category: SAKERHET,
    methodology: "Släcksprayer omfattas av samma standard som handbrandsläckare, SS-EN 3–7, och bär därför en effektivitetsklass. Den klassen väger tyngst här, eftersom den säger hur stort testbål produkten provats mot. Rapporten anger att den lägsta klassning som rekommenderas till hemmet är 43A 233B C, och att den i dagsläget bara uppfylls av sexkilos pulversläckare och niolitersskumsläckare. De sprayer som bär en klass ligger på 5A respektive 3A, alltså ett testbål omkring åtta till fjorton gånger mindre.\n\nUnderlaget är ett examensarbete från Avdelningen för Brandteknik vid Lunds universitet, skrivet hösten 2020 och publicerat 2022, där två av produkterna nedan provades med släckförsök på MSB:s övningsfält Revinge. Vi har läst rapporten i original och skrivit av klasserna, och kontrollerat dem mot butikernas och tillverkarnas egna produktsidor. Det är ett examensarbete och inte en ackrediterad provning, vilket vi säger rakt ut. Vi har inte tänt en enda brand själva.\n\nSpaltvärdena är hämtade från tillverkarnas egna produktblad och säkerhetsdatablad, som anger släckmedel, drivgas, pH och arbetstemperatur. Där en uppgift ändå inte gått att fastställa står ett streck i tabellen, och produkten betygsätts på det som är fastställt om den. **En uppgift vi inte fått fram är vår begränsning och inte varans, och den sänker aldrig ett betyg.**\n\nPriser och kundbetyg är lästa på butikernas egna produktsidor och daterade. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
    criteria: [
      {
        key: "slackeffekt",
        label: "Släckförmåga",
        weight: 30,
        description: "Vilken brand produkten är provad mot, mätt i effektivitetsklassen enligt SS-EN 3–7. Koden läses som på en handbrandsläckare: A är trä och textil, B är brännbara vätskor, F är fett i en kastrull, och talet framför varje bokstav är storleken på testbålet.\n\nHousegard FireStopper bär 5A 21B (E) 5F och Taerosol Fire Fighter 3A 13B (E) 5F, den senare klassad av provningsanstalten MPA Dresden. Rapporten anger 43A 233B C som den lägsta klassning som rekommenderas till hemmet, alltså ett testbål ungefär åtta gånger större än vinnarens och drygt fjorton gånger större än tvåans.\n\nDär ingen klass är fastställd betygsätts produkten på det som är fastställt om den: släckmedel, spraytid och kastlängd.",

      },
      {
        key: "anvandning",
        label: "Vad den är gjord för",
        weight: 25,
        description: "Vilket brandscenario produkten är byggd och provad för, vilket avgör var den gör nytta. Fettbrand är det viktigaste för de flesta: en kastrull med matolja är den vanligaste brandstarten i ett kök, och F i koden betyder att produkten provats mot just den.\n\nHär väger också vilket släckmedel produkten arbetar med. Tre av sprayerna sprutar skum, två sprutar AVD, alltså vermikulit uppslammat i vatten, som lägger ett kylande täcke över battericellerna i stället för att kväva en låga.\n\nLitiumsprayerna bedöms i samma kolumn men med en varning: SS-EN 3–7 har ingen klass för brand i litiumjonbatterier, så den A-klass de bär gäller trä och textil och säger ingenting om batteriet.",

      },
      {
        key: "prisvarde",
        label: "Prisvärde",
        weight: 25,
        description: "Vad du får för pengarna, i en kategori där spannet är stort och inte följer förmågan. Den billigaste sprayen kostar 99,90 kronor och den dyraste 539, alltså mer än fem gånger så mycket.\n\nVäg priset mot vad produkten ersätter och inte bara mot de andra sprayerna: en sexkilos pulversläckare med 43A kostar några hundralappar mer än den dyraste sprayen här och klarar ett testbål åtta gånger större. Sprayen köper du för att den får plats i ett köksskåp, i en verktygslåda eller i ett handskfack, och för att den går att använda med en hand.",

      },
      {
        key: "uthallighet",
        label: "Volym och tömningstid",
        weight: 20,
        description: "Hur länge du faktiskt kan spruta, vilket är den kortaste och mest underskattade siffran i kategorin. Tre av sprayerna töms på 20 till 30 respektive 15 till 25 sekunder, och det är hela din insats.\n\nKastlängden avgör hur nära du måste stå. Skumsprayerna når 3 till 4 meter, litiumsprayen Lith-EX bara 2, och en sexkilos pulversläckare 5 till 7. Ju kortare kastlängd, desto längre in mot elden får du gå.\n\nBeräkningarna i den rapport sidan bygger på pekar på att en spray klarar en möbelbrand i ungefär tre minuter efter att brandtillväxten startat, och därefter inte.",

      },

    ],

  };
/** * iPhone-fodral, alltså uppfällbara plånboksfodral. * * Systersidan till IPHONE_SKAL, byggd samma dag. Den sidans avgränsning sköt * uttryckligen plånboksfodralen hit. * * ## ⚠️ Slugen är vald mot rekommendationen, och det är dokumenterat * * `fodral` används i svensk handel både om plånboksfodral och som allmänt ord * för mobilskydd. Testix driver båda betydelserna samtidigt, med * `/test/planboksfodral-till-mobil` och `/test/fodral-till-mobil`. * `/planboksfodral` rekommenderades just för att undvika krock med * `/iphone-skal`; användaren valde `/iphone-fodral` 2026-08-05 med risken * utskriven. * * Motåtgärden ligger på sidan i stället: H1, ingress och `title` säger * **plånboksfodral** och inte bara fodral, och de två sidorna korslänkar * varandra som `/brandvarnare` och `/smart-brandvarnare`. Signalerna på sidan * ska bära den skillnad URL:en inte bär. * * ## ⚠️ Inget kriterium för RFID, efter användarbeslut * * Uppgiften är ett rent ja utan tal, den skiljer inte produkterna åt, och den * enda oberoende provning som finns uteslöt fodralens mekanism. Se * lib/spec-schema.mjs, ALDRIG_BEDOMD. * * ## ⚠️ Inget testomdömekriterium * * Ingen har provat plånboksfodral. Testix jämför kundrecensioner och sortiment * och säger det själva, vilket är ärligare än deras skalsida. */

export const IPHONE_FODRAL: TestPage = {
    slug: "iphone-fodral",
    label: "iPhone-fodral",
    title: "iPhone plånboksfodral bäst i test 2026: tolv fodral från 149 till 799 kr",
    category: ELEKTRONIK,
    methodology: "Sidan rankar uppfällbara plånboksfodral till iPhone 17, alltså boken med kortfack som viks över skärmen. Avtagbara 2-i-1, magnetiska korthållare och skal med kortficka är andra produkter och förklaras i köpguiden. Vill du ha ett vanligt skyddsskal utan kortfack ligger den jämförelsen på /iphone-skal. Ett fodral passar exakt en modellstorlek, så priset gäller genomgående 17 Pro-varianten. Ingen har provat plånboksfodral: det finns ingen svensk eller internationell provning av kategorin, och vi har inte använt ett enda fodral själva. Betygen bygger därför på vad butiken och tillverkaren publicerar om just den artikeln, läst på produktsidan och daterat. Den uppgift som skiljer mest och syns minst är om trådlös laddning fungerar genom fodralet: sju av tolv blockerar den helt, och två fodral från samma tillverkare till nästan samma pris skiljer sig på just den punkten. Kortkapaciteten spänner från två fack till tio. RFID-skydd betygsätts inte, efter användarbeslut och av tre skäl: ingen tillverkare anger dämpning, frekvens eller standard, uppgiften skiljer inte produkterna åt eftersom både det billigaste och det dyraste anger den, och den enda oberoende utvärdering som gjorts av RFID-blockerande produkter uteslöt uttryckligen den skärmande mekanism ett fodral använder. Ett fodral bär dessutom en strålningsdämpande membranuppgift som vi varken återger eller bemöter, eftersom ett hälsopåstående kräver en myndighetskälla vi inte läst i original. Priser, artikelnummer och lagerstatus är lästa på butikens egen produktsida 2026-08-05. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
    criteria: [
      {
        key: "kortkapacitet",
        label: "Kortkapacitet och förvaring",
        weight: 25,
        description: "Hur mycket plånbok du faktiskt får, vilket är skälet att välja ett fodral framför ett skal. Spannet går från två kort till tio, alltså fem gånger, och det följer inte priset: fodralet med flest fack kostar 279 kronor medan de för 699 och 799 tar tre.\n\nAntalet kortfack väger tyngst, men också vad som mer får plats. Ett eget sedelfack finns i tio av fodralen, ett myntfack i tre, och för den som fortfarande betalar kontant ibland är myntfacket skillnaden mellan en plånbok och ett korthållarfodral. Ett genomskinligt ID-fönster väger också in, eftersom legitimation är det kort man oftast behöver visa utan att ta ut.\n\nVar uppmärksam på att många fack också gör fodralet tjockt. Tio fyllda kortfack är en klump i fickan, och den avvägningen kan sidan inte göra åt dig.",

      },
      {
        key: "konstruktion",
        label: "Material och konstruktion",
        weight: 25,
        description: "Vad fodralet är gjort av och hur telefonen sitter fast i det, alltså de två saker som avgör om det håller ett år eller fem. Materialet spänner från läderimitation till fullnarvigt läder, och skillnaden är verklig: konstläder spricker i vecket där fodralet viks, medan garvat läder mjuknar och mörknar. Tre av fodralen anger härkomst ända ned till garveriet.\n\nInfästningen väger lika tungt och nämns nästan aldrig i rubriken. Tre konstruktioner säljs under samma ord. Ett limmat plastskal släpper från lädret när limmet åldras, en mjuk TPU- eller silikonhållare gör det inte, och ett avtagbart magnetskal går att lyfta ur helt. Här väger också vad fodralet skyddar: ett metallramat kameraurtag och en förhöjd kant runt skärmen är sådant du märker den dag telefonen ligger med luckan öppen.",

      },
      {
        key: "laddning",
        label: "Laddning och magnet",
        weight: 20,
        description: "Om telefonen går att ladda utan att tas ur fodralet, och om magneterna sitter rätt för MagSafe. Det här är kategorins största och minst synliga skillnad. Sju av tolv fodral blockerar trådlös laddning helt, alltså måste telefonen ur fodralet varje kväll, och det står i specifikationen men aldrig i rubriken. Fällan är att två fodral från samma tillverkare, i samma prisklass och med nästan samma namn, kan skilja sig på just den punkten.\n\nHär väger tre nivåer. Lägst får den som blockerar laddningen. Mitten får den som laddar på en platt Qi-platta men saknar magnetring, alltså där laddaren måste läggas rätt för hand. Högst får den som har magnetring och därmed drar en MagSafe- eller Qi2-laddare till rätt läge av sig själv. I ett av fodralen kan magneterna dessutom störa induktionsladdningen, och då är trådlös laddning ett kanske snarare än ett ja.",

      },
      {
        key: "prisvarde",
        label: "Prisvärde",
        weight: 20,
        description: "Vad du får för pengarna, mätt mot vad samma sak kostar någon annanstans i jämförelsen. Spannet är fem gånger, från 149 till 799 kronor, och det köper två olika saker. I botten får du konstläder, tre kort och ingen trådlös laddning. I toppen får du garvat läder med angiven härkomst, mikrofiberfoder och laddning genom fodralet. Däremellan ligger kategorins intressantaste punkt: ett fodral för 199 kronor som laddar trådlöst och bär magnetring, alltså den funktion som annars kostar 500 kronor till.\n\nHär väger också garantin. Tio av fodralen ger ett år och två ger sex månader, på en produkt som ska vikas flera gånger om dagen. Ett fodral är en gångjärnskonstruktion, och gångjärn är det som går sönder.",

      },
      {
        key: "vardagsfunktion",
        label: "Vardagsfunktion",
        weight: 10,
        description: "Sådant du använder varje dag utan att tänka på det. Stativfunktionen väger tyngst: ett fodral som viks till ett ställ gör telefonen till en liten skärm på ett bord. De tre som inte gör det är Nomad, Mujjo och Trolsks MagSafe-fodral, alltså tre av de fem fodral som laddar trådlöst. Den som vill ha båda sakerna får leta.\n\nStängningen väger också in, och där finns tre lösningar med olika svagheter. Ett enkelt magnetlås öppnar sig i väskan när fodralet är fullt, dubbla magnetknäppen håller bättre just därför, och en dragkedja håller allt men tar längre tid. En avtagbar handledsrem är den detalj som faktiskt hindrar att telefonen tappas, och den finns på två.\n\nVikten är sidans lägsta med flit, eftersom ingen av de här sakerna är skälet att köpa ett fodral.",

      },

    ],

  };
/** * iPhone skärmskydd. * * Tredje sidan i iPhone-familjen, byggd 2026-08-05. Skalsidans avgränsning sköt * uttryckligen skärmskydden hit. * * ## ⚠️ Hårdheten är inget kriterium, och det är sidans hela poäng * * Talet 9H står på tio av femton skydd här. Det är taket på pennskalan i * ASTM D3363 och ISO 15184, alltså standarder för färg och lack, och ISO skriver * i sitt eget abstract att metoden inte duger till att jämföra olika * beläggningar. Lasten som pennan trycks med avgör utfallet och redovisas * aldrig i handeln. * * Att betygsätta ett tal som alla anger, på en skala som slutar där, vore att * mäta butikens copywriting. Femte gången beslutet fattas i repot. Se * lib/spec-schema.mjs, ALDRIG_BEDOMD. * * ## ⚠️ Inget testomdömekriterium * * Råd & Rön och Testfakta har ingen provning av kategorin. Den enda riktiga * labbprovning som hittats är connect 12/2014, och den gäller folier snarare än * härdat glas och innehåller inte en enda av de rankade produkterna. Metoden och * mätvärdena bär köpguiden i stället, som Testfaktas kabelprovning på * /usb-c-kabel. * * ## ⚠️ Prisvärdet räknas per skydd * * Fyra artiklar är 2-pack. Efter användarbeslut 2026-08-05 rankas prisvärdet på * vad ett skydd på skärmen kostar, medan förpackningspriset står kvar i * tabellen. Annars vinner enpacket på att vara ett. */

export const IPHONE_SKARMSKYDD: TestPage = {
    slug: "iphone-skarmskydd",
    label: "iPhone skärmskydd",
    title: "iPhone skärmskydd bäst i test 2026: femton skydd till iPhone 17 Pro, från 69 till 399 kr",
    category: ELEKTRONIK,
    methodology: "Sidan rankar skärmskydd till iPhone 17 Pro: härdat glas, sekretessglas och plastfilm i samma lista, från 69 till 399 kronor. Kameralinsskydd är en annan produkt och förklaras i köpguiden. Ett skärmskydd passar exakt en skärmstorlek, så priset gäller genomgående 17 Pro-varianten. Fyra artiklar säljs som 2-pack, och prisvärdet räknas därför per skydd medan förpackningspriset står kvar i tabellen.\n\nRankningen vilar på tre saker: hur mycket av skärmen som ligger under glaset och vad glaset är gjort av, om skyddet kommer med det som krävs för att hamna rakt första gången, och vad ett skydd på skärmen kostar. Det är de tre som avgör om pengarna är väl använda, och de går att jämföra mellan alla femton artiklarna.\n\nHårdhetstalet 9H väger inte in i något betyg. Det är inte ett mätvärde utan taket på pennskalan i ASTM D3363 och ISO 15184, båda standarder för färg och lack, och ISO skriver i sitt eget abstract att metoden inte duger till att jämföra olika beläggningar. Lasten pennan trycks med avgör utfallet, och den anges inte för något skydd i handeln. Talet står kvar i tabellen därför att köparen letar efter det, men det påverkar ingen placering.\n\nIngen har provat skärmskydd: Råd & Rön och Testfakta har ingen provning av kategorin, och den enda riktiga labbprovning som finns gäller folier och är från 2014, utan en enda av produkterna här. Vi har inte satt ett enda skydd på en telefon själva. Priser och artikelnummer är lästa på butikens egen produktsida 2026-08-05. Lagerstatus väger inte in, efter användarbeslut. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
    criteria: [
      {
        key: "skydd",
        label: "Skydd och täckning",
        weight: 47,
        description: "Hur mycket av skärmen som ligger under glaset, och vad glaset gör när telefonen faller. Materialet väger tyngst: härdat glas spricker i stället för skärmen och tar upp stöten, medan en mjuk plastfilm bara håller repor borta och lika gärna kan vikas dubbel.\n\nSedan kommer täckningen, som skiljer sig mer än produktnamnen antyder. Ett heltäckande glas går ända ut i kanten och har en svart ram som döljer limfogen. Ett standardglas täcker den aktiva ytan och lämnar en remsa fri så att ett skal får plats bredvid. Ett tredje slutar en bit innanför kanten, och då ligger telefonens mest utsatta yta bar.\n\nHär väger också vad mer som hamnar under glaset: ett av skydden täcker frontkameran och sensorerna ovanför skärmen, alltså den del som blir repig av bordsskivor. Tjockleken väger in åt två håll och därför lätt. 0,33 millimeter är mer material att spricka i, 0,26 är mindre att känna under fingret.",

      },
      {
        key: "montering",
        label: "Montering",
        weight: 29,
        description: "Om du får skyddet rakt på skärmen vid första försöket. Det här är kategorins verkliga felkälla och det som mest sannolikt gör pengarna bortkastade: ett skydd som hamnar två millimeter snett eller får ett dammkorn under limmet går inte att lyfta och lägga om, och då är det ett nytt köp.\n\nHögst betyg får de som levererar en monteringsram, alltså en plastbygel som telefonen läggs i så att glaset bara kan hamna rätt. Sex av skydden har en, och tillverkarna kallar den olika saker. Näst högst betyg får ett 2-pack, av det enkla skälet att det andra glaset är din andra chans, och det är därför de billigaste 2-packen slår dyrare enpack här.\n\nEtt rengöringskit väger också in: dammet på skärmen är det som blir en bubbla, och en trasa och en klisterlapp för damm kostar tillverkaren några kronor. Lägst betyg får den som säger enkel installation och lämnar dig med ett fritt liggande glas och två tummar.",

      },
      {
        key: "prisvarde",
        label: "Prisvärde",
        weight: 24,
        description: "Vad ett skydd på skärmen kostar, alltså förpackningspriset delat med antalet i asken. Spannet är nästan sex gånger, från 99,50 till 399 kronor per skydd, och det är därför den här kolumnen inte kan läsas ur prislappen. Ett 2-pack för 199 kronor är billigare per skydd än allt annat i jämförelsen, och ett 2-pack för 249 är billigare per skydd än nio av de tio enpacken.\n\nHär väger också vad pengarna köper utöver glaset. En monteringsram, ett rengöringskit och ett extra glas är verkliga tillägg, medan ett sekretessfilter är en annan produkt snarare än ett dyrare skydd och därför inte belönas som ett.\n\nVar uppmärksam på att det billigaste i hela jämförelsen inte är billigast per skydd, och att det dyraste inte skyddar mest. Ett skärmskydd byts dessutom oftare än telefonen, så priset ska läsas som en löpande kostnad och inte som en engångsutgift.",

      },

    ],

  };
/** * Bluetooth-högtalare, bärbara. * * Byggd 2026-08-05. Sidan rankar bara de bärbara, alltså under cirka två kilo; * partihögtalare får en egen systersida. * * ## ⚠️ Inget testomdömekriterium, och den här gången är det fastställt * * Ljud & Bild provade sju bärbara högtalare 2025-07-07. Samtliga sju enskilda * recensioner är hämtade och genomsökta efter betyg, poäng och stjärnor: * **noll av sju bär ett betyg.** De skriver prosarecensioner med faktaruta. * Deras omdömen återges per modell med publikationen namngiven och påverkar * inga poäng. * * ## ⚠️ Ljudet betygsätts inte * * Ingen har satt poäng på det, och vi har inte lyssnat. Det är den egenskap * köparen bryr sig mest om och den enda vi inte kan väga, och det ska stå rakt * ut i viktningen. * * ## ⚠️ Speltiden anges två gånger och talen är inte överens * * Betygen använder spectabellens lägre tal. Se lib/spec-schema.mjs. */

export const BLUETOOTH_HOGTALARE: TestPage = {
    slug: "bluetooth-hogtalare",
    label: "Bluetooth-högtalare",
    title: "Bluetooth-högtalare bäst i test 2026: tio bärbara från 790 till 3 490 kr",
    category: ELEKTRONIK,
    methodology: "Sidan rankar bärbara Bluetooth-högtalare under ungefär två kilo, från 790 till 3 490 kronor. Partihögtalare som Marshall Kilburn III, Sony ULT Field 5 och Soundcore Boom 2 Pro väger tre till fyra kilo, löser ett annat problem och får en egen jämförelse. Nätanslutna högtalare utan batteri ingår inte alls.\n\nLjudkvaliteten är inte betygsatt, och det är sidans viktigaste begränsning. Vi har inte lyssnat på en enda högtalare. Ljud & Bild provade sju av modellerna i juli 2025 men publicerar prosaomdömen utan betyg, vilket vi kontrollerat genom att läsa alla sju recensionerna. Deras omdöme om en enskild modell återges i recensionen av just den modellen, med publikationen namngiven, och påverkar inga poäng.\n\nBetygen bygger på det som går att kontrollera före köp: batteriets storlek i wattimmar, speltiden, kapslingsklassen, vikten och anslutningen. Speltid och batteridata är hämtade från tillverkarens egen publicering där den finns, alltså Marshalls produktsida, Harman Kardons produktblad, Urbanistas spectabell och Sonos produktsida, och annars från butiksledet där två oberoende butiker anger samma tal.\n\nVikten är hämtad från tillverkaren eller från Ljud & Bild och aldrig från butikens fält, som för en av modellerna anger mer än dubbla den verkliga vikten. Samma fälla finns hos tillverkaren: Harman Kardons webbtabell anger 1,13 kg för Luna, medan deras eget spec sheet skiljer på produktens vikt 0,71 kg och förpackningens 1,13. Vi använder produktens.\n\nPriser är lästa på butikens egen produktsida 2026-08-05. Sex av tio högtalare kommer från JBL eller Harman Kardon, alltså samma koncern, vilket speglar butikens sortiment och inte vårt urval. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
    criteria: [
      {
        key: "batteri",
        label: "Batteri och livslängd",
        weight: 28,
        description: "Hur länge högtalaren spelar, och hur länge den kommer att finnas till. Det här väger tyngst av två skäl.\n\nDet första är vardagligt: en bärbar högtalare som tar slut mitt på dagen är en högtalare du slutar ta med. Här räknas batteriets storlek i wattimmar, som är den enda jämförbara siffran, tillsammans med speltiden. Spannet är stort: från 5,32 wattimmar till 34, alltså mer än sex gånger, och från 10 timmar till 32.\n\nDet andra skälet är att batteriet i praktiken är produktens livslängd. Cellen åldras med varje laddcykel, och när den är slut är högtalaren det oftast också, eftersom nästan alla säljs med batteriet inbyggt. Från februari 2027 ändras det av ett EU-krav på att bärbara batterier ska gå att byta, med ett undantag för apparater byggda för vatten. Vi betygsätter inte hur en tillverkare kommer att förhålla sig till det kravet.\n\nEn högtalare vars wattimmar tillverkaren inte skriver ut förlorar inga poäng på det. Kriteriet väger den energi och den speltid som är belagd, och två av Marshalls modeller bedöms alltså på sina 32 respektive 30 timmar.",

      },
      {
        key: "talighet",
        label: "Tålighet",
        weight: 24,
        description: "Vad högtalaren tål av det den faktiskt utsätts för. Kapslingsklassen är den enda hårdvarufakta i kategorin som är standardiserad och jämförbar, och den läses i två steg.\n\nFörsta siffran är dammskyddet: en sexa betyder att inget damm tar sig in. Andra siffran är vattnet: en sjua betyder nedsänkning en meter i trettio minuter, en åtta mer än så. Ett X betyder att positionen inte provats, vilket är viktigare än det låter. En högtalare märkt IPX7 klarar alltså ett dopp men har inget bevisat dammskydd, och sand är hårdare än de flesta material i en högtalare. Nio av de tio här bär en sexa i första positionen och en har ett X.\n\nHär väger också om högtalaren flyter, eftersom en högtalare som sjunker i en sjö är förlorad oavsett hur många meter kapslingen tål. Vi har inte utsatt någon högtalare för vatten själva; klassningen är tillverkarens och den är standardiserad, vilket är precis därför den går att jämföra.",

      },
      {
        key: "prisvarde",
        label: "Prisvärde",
        weight: 20,
        description: "Vad pengarna köper, mätt mot vad samma sak kostar någon annanstans i listan. Spannet är mer än fyra gånger, från 790 till 3 490 kronor, och det följer varken batteri eller tålighet särskilt väl.\n\nDen tydligaste jämförelsen i hela listan är att två högtalare från samma tillverkare kostar exakt lika mycket medan den ena har tio timmar längre speltid och dubbelt så mycket batteri. Den näst tydligaste är att den billigaste vägen till tjugo timmars speltid kostar 1 290 kronor, medan en högtalare för 2 090 spelar tolv.\n\nHär väger också vad som ingår utan att kosta extra: en integrerad karbinhake, en powerbank-funktion eller solceller är verklig nytta, medan ett välkänt märke inte är det. Räkna priset per wattimme om du är osäker mellan två modeller, eftersom det är den uträkning som skiljer dem åt snabbast.",

      },
      {
        key: "barbarhet",
        label: "Bärbarhet",
        weight: 16,
        description: "Om högtalaren faktiskt följer med, vilket är hela skälet att köpa en bärbar. Vikten väger tyngst och spannet är stort: 285 gram mot 1 800, alltså mer än sex gånger.\n\nGränserna som betyder något i praktiken är ungefär tre: under 300 gram klipps den fast i något och följer med utan att du planerar för det, runt ett halvt kilo ryms den i en jackficka, och över ett kilo packas den ner i en väska. Här väger också hur den ska bäras. En karbinhake som är en del av chassit är en annan sak än ett snöre som ska knytas, och en bärrem gör ett kilo hanterbart.\n\nVikten är hämtad från tillverkaren eller från oberoende test och aldrig från butikens fält, eftersom det för en av modellerna anger mer än dubbla den verkliga vikten. Den vanligaste besvikelsen i kategorin är att köpa för stort: en högtalare som är obekväm att ta med blir en högtalare som står hemma.",

      },
      {
        key: "anslutning",
        label: "Anslutning",
        weight: 12,
        description: "Hur högtalaren kopplas ihop med telefonen och med andra högtalare. Kriteriet väger lägst med flit, eftersom ingen köper en bärbar högtalare för dess Bluetooth-version.\n\nTyngst här väger möjligheten att koppla ihop flera högtalare, eftersom det är den funktion som förlänger produktens användbarhet: två små högtalare i stereo löser ett problem som en stor inte gör. Lösningarna fungerar bara inom sitt eget märke, så valet binder dig till ett fabrikat om du tänker bygga ut. Wifi väger också in, men åt två håll: det ger multirum och stabilare anslutning hemma och kostar batteri ute.\n\nBluetooth-versionen väger lättast av allt men är inte betydelselös: 5.4 mot 5.1 handlar om räckvidd och strömförbrukning snarare än ljudkvalitet, och skillnaden märks när telefonen ligger i fickan inne och högtalaren står ute.\n\nMarshall skriver inte ut vilken Bluetooth-version deras högtalare bär, och det drar inga poäng. Emberton III och Middleton II bedöms på det de gör: två anslutna enheter samtidigt och stereoparning med andra Marshall.",

      },

    ],

  };
/** * Mjölkskummare. * * Första sidan i gruppen Kök, byggd 2026-08-05. * * ## Fyra kriterier, och det femte ströks som regel * * `Öppen redovisning` föreslogs med vikt 20 och ströks av användaren innan * insamlingen började, med en stående regel: **redovisning får aldrig bära * vikt**. Skälet är att ett kriterium som belönar publicering rankar säljarens * produktblad och inte produkten, så två skummare som gör exakt samma sak * hamnar på olika plats av skäl köparen inte kan använda. De 20 poängen * fördelades på det som mäter apparaten. Se `pnpm check:redovisning` för de nio * sidor som ärvde kriteriet innan regeln fanns. * * Fyndet överlever utan kriteriet. Att Severins "Spuma 500" skummar 260 ml * bärs av tabellen, köpguiden, omdömena och FAQ. * * ## Inget testomdöme, trots att provningen finns * * Råd & Rön har provat 18 elektriska mjölkskummare med riktig labbmetod. Vi har * **inte** köpt testet, efter användarbeslut, så resultaten per modell är okända * för oss och inget betyg härifrån kommer därifrån. Metoden, betygsspannet och * temperaturbandet 63 till 67 grader är fritt läsbara och bär köpguiden. * * Samma läge som /powerbank mot Stiftung Warentest. */

export const MJOLKSKUMMARE: TestPage = {
    slug: "mjolkskummare",
    label: "Mjölkskummare",
    title: "Mjölkskummare bäst i test 2026: så mycket skum får du faktiskt",
    category: KOK,
    methodology:
      "Sidan jämför elektriska mjölkskummare med värmeelement, alltså kannan som värmer och skummar automatiskt. Manuella pumpskummare och handhållna batterivispar är andra produkter och förklaras i köpguiden.\n\nKategorin har en riktig svensk labbprovning, Råd & Röns test av 18 mjölkskummare, men resultaten per modell ligger bakom en betalvägg vi inte betalat. Därför finns inget kriterium för testomdöme och ingen uppgift om vilken modell som vann. Det labbet skriver i sitt öppna avsnitt är däremot avgörande för hur sidan är byggd: skummet bör hålla mellan 63 och 67 grader, volymökningen är måttet på om skummet duger, och resultatet varierar enormt mellan olika sorters mjölk.\n\nDet vi själva räknat på är kapaciteten. En mjölkskummare har två maxnivåer, hur mycket den kan skumma och hur mycket den kan värma, och de skiljer ungefär på hälften. Talet i modellnamnet och i butikens produktnamn är genomgående det senare. Båda talen är lästa hos tillverkaren där de publiceras och hos butiken där de inte gör det, och fyra av tillverkarnas egna bruksanvisningar är lästa i original för att kontrollera dem. En kvot som stämmer för ett fabrikat räknas aldrig om till ett annat.\n\nPriser, artikelnummer och kundbetyg är lästa på butikens egen produktsida och daterade. Vi har inte skummat en enda liter mjölk. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
    criteria: [
      {
        key: "skumkapacitet",
        label: "Skumkapacitet",
        weight: 35,
        description:
          "Hur många koppar du faktiskt får, mätt i milliliter skum och inte i kannans rymd. Det är kategorins svåraste tal att läsa, eftersom en mjölkskummare har två maxnivåer som skiljer ungefär på hälften: Severins Spuma 500 heter 500 efter hur mycket mjölk den kan värma, men skummar 120 till 260 ml.\n\nRäkna 60 ml skum per cappuccino, ett mått Philips själva ger genom att skriva att deras 120 ml räcker till två. Med det blir spannet begripligt. 90 ml är en och en halv kopp, 350 ml är sex, och för den som gör två koppar varje morgon avgör det om apparaten körs en gång eller tre.\n\nSkumtalet är läst hos tillverkaren där det finns och hos butiken där tillverkaren tiger. En kvot som gäller ett fabrikat lånas aldrig till ett annat.",

      },
      {
        key: "mjolktyper",
        label: "Mjölktyper och program",
        weight: 25,
        description:
          "Vad den klarar utöver varm standardmjölk. Labbet som provat kategorin fann att resultatet varierar enormt mellan olika sorters mjölk, att lättmjölken är den svåra, och att ingen av de 18 provade lyckas göra ordentligt kallt skum.\n\nHär väger antalet program, ett läge för kallt skum till iskaffe, ett eget program för växtbaserad dryck, och om apparaten kan värma mjölk utan att skumma den. Två av de 18 provade saknade den sista funktionen helt. Ett läge som bara ändrar hastigheten räknas inte som ett program.\n\nStyrbar temperatur väger tyngst av allt här, eftersom det är den enda inställning som låter dig träffa de 63 till 67 grader labbet pekar ut. Fyra av tio apparater har den.",

      },
      {
        key: "prisvarde",
        label: "Prisvärde",
        weight: 25,
        description:
          "Vad du får för pengarna, mätt mot vad samma jobb kostar någon annanstans i jämförelsen. Spannet är fem gånger, från 392 till 1 999 kronor för apparater som alla värmer och skummar mjölk med en knapp.\n\nDet som skiljer följer priset dåligt. Den dyraste rymmer mest men gör inte finare skum enligt någon publicerad mätning, och en av de billigaste har flest program. Här väger också vad som ingår i kartongen: tre vispar för fast skum, fint skum och enbart uppvärmning är skillnaden mellan en apparat och tre.\n\nKundbetyg från butiken visas där de finns men vägs aldrig in, eftersom betyg från olika butiker inte är jämförbara.",

      },
      {
        key: "rengoring",
        label: "Rengöring",
        weight: 15,
        description:
          "Om den blir diskad eller ställd längst in i skåpet. Mjölk bränner fast och surnar, och en kanna som måste handdiskas försiktigt varje morgon används mer sällan än en som går i maskinen. Labbet fann att tre av de 18 provade inte går att maskindiska alls och dessutom har smutsfällor där mjölkrester blir kvar.\n\nHär väger om kannan tål maskindisk, om den går att lyfta av basen så att den kan sköljas direkt, och om insidan har nonstick-beläggning eller är blank rostfri. En kanna med värmeelementet inbyggt i själva kärlet kan aldrig maskindiskas, och tre av apparaterna här är byggda så.",

      },

    ],

  };
/**
 * Babyvakt. Ljud- och videovakter, inte andningslarm.
 *
 * ## Varför inget testomdöme-kriterium
 *
 * Råd & Röns test av babyvakter bär **Publicerad 15 juni 2012** och är
 * fortfarande förstasidesträff på `babyvakt bäst i test`. De tretton provade
 * modellerna är Philips AVENT SCD505/525/600, NOVA SuperNOVA och VisionNOVA,
 * PADWICO 830 och 903, Withings Smart Baby monitor, Topcom Babyviewer 4500 och
 * Babytalker 1020, Neonate BC-5000, IKEA Patrull och TappyTaps. **Ingen av dem
 * säljs i svensk handel 2026.** Täckningen mot hyllan är noll, alltså samma
 * läge som Stiftung Warentest på /brandvarnare.
 *
 * ⚠️ Råd & Rön förbjuder uttryckligen vidarepublicering av testresultat och
 * betyg. Sidan får konstatera att provningen finns och vilket datum den bär.
 * Betygen står i .agent/research/babyvakt.md och renderas aldrig.
 *
 * ## Varför räckvidd bara väger 15
 *
 * Det är talet varje konkurrent leder med och det är uppmätt i fri sikt. Fyra
 * tillverkare publicerar båda talen och kvoten är nästan identisk: Motorola
 * PIP10 49 mot 305 meter, Philips Avent 50 mot 300, VTech DM1212 75 mot 460,
 * Alecto 50 mot 300. Alltså 6,0 till 6,2 gånger, fyra fabrikat oberoende av
 * varandra. Att väga talet tungt hade varit att väga ett förhållande produkten
 * aldrig används i.
 *
 * ## Varför larm vid bruten förbindelse väger tyngst
 *
 * Det är den enda egenskapen som avgör om apparaten gör sitt jobb den stund den
 * slutar fungera. En babyvakt som tystnar tolkas som ett barn som sover.
 * Råd & Rön mätte axeln redan 2012 och behövde då filtervärdet *Ingen varning*,
 * vilket betyder att sådana produkter fanns på hyllan.
 *
 * Poängen är läst i tillverkarnas egna manualer, inte i butikstexten. Se §10 i
 * researchfilen, inklusive den kontroll som räddade ett falskt påstående om
 * Motorola VM483.
 *
 * ## Sändareffekt är inte ett kriterium
 *
 * Den nordiska halvan av kategorin säljer på låg strålning och talen håller
 * inte: CAPiDi anges till 10 mW i två butiker medan tillverkarens egen manual
 * deklarerar 12 dBm, alltså 15,8 mW, och samtidigt påstår 10 procent av DECT,
 * vilket vore 25 mW. Neonate BC-6500D anges till 20 mW hos Jollyroom och 25 mW
 * hos Babyland. Talet hör hemma i tabellen och i köpguiden, men att belöna lägre
 * effekt hade byggt in en hälsohierarki vi inte kan belägga, och lägre effekt
 * betalas dessutom med kortare räckvidd, som redan vägs.
 */
export const BABYVAKT: TestPage = {
  slug: "babyvakt",
  label: "Babyvakt",
  title: "Babyvakt bäst i test 2026: ljud och video jämförda",
  category: SAKERHET,
  methodology:
    "Vi jämför babyvakter på specifikationer lästa hos butikerna och i tillverkarnas egna manualer: vad föräldraenheten gör när förbindelsen bryts, vad apparaten kräver för att fungera, räckvidd, vad du kan göra från enheten i handen och pris. Elva manualer är lästa i original, och de svarar på frågor butikstexten inte tar upp.\n\nRäckvidden är alltid uppmätt i fri sikt. De fyra tillverkare som publicerar båda talen anger inomhusräckvidden till en sjättedel: 49 mot 305 meter, 50 mot 300, 75 mot 460 och 50 mot 300. Därför väger räckvidd bara 15, trots att det är det tal marknadsföringen bygger på.\n\nDet finns inget kriterium för testomdöme. Den enda svenska laboratorieprovningen av babyvakter publicerades 15 juni 2012, och ingen av de tretton modeller den provade säljs i dag. Vi har inte provat något själva.\n\nAlla elva bedöms mot samma kriterier och samma viktning, och källorna finns länkade längre ner. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "brytlarm",
      label: "Larm när förbindelsen bryts",
      weight: 25,
      description:
        "Vad föräldraenheten gör när den tappar babyenheten. En babyvakt som tystnar utan att säga till är sämre än ingen alls, eftersom tystnaden läses som ett barn som sover.\n\nHögst betyg går till den som ger både ljud och synlig varning och dessutom täcker fler fel än avstånd: att babyenheten stängts av, att batteriet tagit slut, att den slutat sända. Lägre betyg till den som bara byter bild på skärmen eller blinkar med en lampa, eftersom den varningen kräver att du redan tittar.\n\nBedömningen är läst i tillverkarens egen manual och inte i butikens produkttext.",
    },
    {
      key: "fristaende",
      label: "Fristående drift",
      weight: 25,
      description:
        "Vad som krävs utöver de två enheterna i kartongen. En babyvakt med egen föräldraenhet fungerar när routern startas om, när fibern grävs av och när tillverkaren stänger sin molntjänst.\n\nEn som skickar bilden via wifi och app gör det inte, och den behöver dessutom ett konto hos någon annan. Här bedöms om en föräldraenhet ingår, om grundfunktionen kräver router, konto eller app, och om enheterna paras ihop direkt med varandra.",
    },
    {
      key: "foraldraenheten",
      label: "Föräldraenheten i handen",
      weight: 20,
      description:
        "Det du faktiskt använder, hundra gånger i veckan. Vibrationslarm gör att du kan ha den med i ett stökigt kök eller sova bredvid den utan att stänga av ljudet.\n\nJusterbar mikrofonkänslighet avgör om apparaten väcker dig på snörvlingar eller först på skrik. Här väger också tvåvägstal, temperaturvisning från barnrummet, bältesclip och om systemet går att bygga ut med fler babyenheter för syskon.",
    },
    {
      key: "rackvidd",
      label: "Räckvidd i fri sikt",
      weight: 15,
      description:
        "Metertalet tillverkaren anger, uppmätt utomhus utan hinder. Det är det enda räckviddstal hela fältet publicerar, så det är det enda som går att jämföra rakt av.\n\nRäkna med ungefär en sjättedel inomhus. Fyra tillverkare publicerar båda talen och de landar alla mellan 6,0 och 6,2 gånger. 800 meter blir alltså ungefär 130 meter genom väggar, vilket räcker i varje svensk bostad och ut till förrådet.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 15,
      description:
        "Priset vägt mot betygen i övriga kriterier. Spannet är 399 till 3 899 kronor, alltså nästan tio gånger, för apparater som alla gör samma grundsak.\n\nVikten är ändå låg, eftersom den billigaste sällan är den vi rekommenderar och skillnaderna i de fyra kriterierna ovan betyder mer för hur nöjd du blir.",
    },
  ],
};

/**
 * Skaftdammsugare. Underlag i .agent/research/skaftdammsugare.md.
 *
 * ## Varför inget kriterium för testomdöme
 *
 * Kategorin har en riktig svensk labbprovning, och den är stor: Råd & Rön
 * provade 46 golvdammsugare och 65 skaftdammsugare och publicerade 13 augusti
 * 2025. Alla åtta produkter här ingår i den. Men betygen per modell ligger
 * bakom en betalvägg vi inte betalat, och Råd & Rön förbjuder vidarepublicering
 * av testresultat. Samma beslut som /mjolkskummare och /robotdammsugare.
 *
 * ## Varför drifttiden vid full effekt inte är ett eget kriterium
 *
 * Frestelsen var stor, eftersom talet är sidans hela vinkel: Bosch anger 11
 * minuter i turboläge mot 80 på kartongen, Electrolux 700 anger 10 mot 50.
 * Men bara fem av åtta tillverkare publicerar hela stegen, och ett kriterium
 * som fem av åtta kan placeras på hade delat ut de andra tres vikt gratis. Det
 * är exakt felet som beskrivs vid `redistributeMissing` i lib/products.ts.
 *
 * Talet bär i stället ett eget avsnitt högt på sidan, och drifttiden vägs inom
 * kriteriet Batteri och drifttid tillsammans med batteribyte och laddtid, där
 * varje produkt går att placera.
 *
 * ## Varför luftwatt och pascal inte får en egen rad i viktningen
 *
 * De mäter inte samma sak och tillverkarna mäter dem olika. Samsung skriver
 * själva ut villkoret: 210 luftwatt är uppmätt vid inloppet till ett
 * icke-motoriserat verktyg med tom dammbehållare. Dreames 310 luftwatt och
 * 28 000 pascal kommer ur deras eget labb. Ett kriterium som rankade talet rakt
 * av hade rankat mätmetoden.
 */
export const SKAFTDAMMSUGARE: TestPage = {
  slug: "skaftdammsugare",
  label: "Skaftdammsugare",
  title: "Skaftdammsugare bäst i test 2026: åtta sladdlösa jämförda",
  category: HEM_HUSHALL,
  methodology:
    "Vi jämför skaftdammsugare på uppgifter lästa hos tillverkarna och i butikernas egna produktsidor: munstycket och luftflödet, hur länge batteriet räcker i varje effektläge, filtreringen och dammbehållaren, vikten och priset. Alla åtta säljs i svensk handel och priserna är kontrollerade hos den butik vi länkar till.\n\nDrifttiden är det tal kategorin marknadsförs på och det är uppmätt i ekoläge, i flera fall med ett munstycke utan motor. Bosch anger 80 minuter så, 65 med det motoriserade golvmunstycket, 25 i autoläge och 11 i turboläge. Philips anger 60 mot 15. Electrolux 700 anger 40, 20 och 10. Räkna med en tiondel till en fjärdedel av kartongens tal när borsten snurrar och effekten står på max.\n\nDet finns inget kriterium för testomdöme. Råd & Rön har provat samtliga åtta i sitt test av 111 dammsugare, men betygen per modell ligger bakom betalvägg och får inte återges. Vi har inte haft en enda maskin i handen, och kriteriebetygen är vår sammanvägning av specifikationerna, inte mätvärden.\n\nAlla åtta bedöms mot samma fem kriterier och samma viktning. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "stadformaga",
      label: "Munstycke och sugförmåga",
      weight: 25,
      description:
        "Det som avgör hur mycket som följer med upp från golvet. Ett motoriserat golvmunstycke med roterande borste är skälet till att en skaftdammsugare tar djurhår bättre än en slang, och borstens diameter och antitrasselkonstruktion avgör om långt hår måste klippas loss varje månad.\n\nHär väger också vilka munstycken som ligger i kartongen, om golvmunstycket lyser upp golvet framför sig och hur väl maskinen når in i hörn och under möbler.\n\nLuftwatt och pascal vägs in där tillverkaren anger dem, men försiktigt. De är två olika mått och de mäts under olika villkor, så ett högre tal hos en tillverkare betyder inte ett starkare sug än ett lägre tal hos en annan.",
    },
    {
      key: "batteri",
      label: "Batteri och drifttid",
      weight: 25,
      description:
        "Skaftdammsugarens svaga punkt, och den som avgör om du kommer igenom hela bostaden på en laddning. Drifttiden vägs i det läge du faktiskt städar i och inte i ekoläget på kartongen, eftersom borsten måste snurra för att få upp damm ur springorna i parkett och klinker.\n\nEtt batteri som går att lyfta ur och byta mot ett laddat väger tungt: det gör dubbla passet möjligt i dag och gör maskinen lagningsbar om fem år, när cellerna tappat kapacitet. Bosch och Electrolux delar dessutom batteri med sina egna trädgårdsmaskiner, så reservbatteriet kan redan ligga i garaget.\n\nLaddtiden vägs sist. Fyra till fem timmar är normen och en halvtimmes skillnad märks sällan.",
    },
    {
      key: "filtrering",
      label: "Filtrering och tömning",
      weight: 20,
      description:
        "Vad som kommer ut ur maskinen igen, och hur ofta du måste öppna den. En förseglad filterkedja håller kvar det fina dammet i behållaren i stället för att blåsa ut det på andra sidan rummet, och det är den enda delen av städningen som märks i luften i timmar efteråt.\n\nHögst betyg går till helt förseglad filtrering ned till 0,1 mikrometer eller ett filter i HEPA-klass 13 eller 14. Lägre betyg till tvåstegsfiltrering, där grovsilen och motorfiltret är allt som står mellan dammet och rummet.\n\nDammbehållarens volym vägs in här. En behållare på tre deciliter töms tre gånger under en villastädning, en på åtta räcker hela vägen.",
    },
    {
      key: "hantering",
      label: "Vikt och hantering",
      weight: 15,
      description:
        "Vikten du håller ut i armen när du dammsuger taklisten, och skillnaden mellan 1,5 och 3,1 kilo är dubbelt så stor som den låter när armen är utsträckt.\n\nHär väger också om skaftet går att lyfta av så att handenheten kan följa med ut i bilen, om munstycket står upp av sig självt när telefonen ringer, om röret böjs för att komma under sängen, och om laddstället skruvas i väggen eller står på golvet.",
    },
    {
      key: "prisvarde",
      label: "Pris och prisvärde",
      weight: 15,
      description:
        "Priset vägt mot betygen ovan. Spannet är 1 290 till 8 990 kronor, alltså sju gånger, för maskiner som alla ska suga upp samma smulor från samma golv.\n\nVikten hålls låg med flit. Den billigaste är sällan den vi rekommenderar, och en skaftdammsugare som inte orkar få upp damm ur en golvspringa är dyr oavsett vad den kostar.",
    },
  ],
};

export const TEST_PAGES: TestPage[

  ] = [
    SKAFTDAMMSUGARE,
    BABYVAKT,
    MJOLKSKUMMARE,
    BLUETOOTH_HOGTALARE,
    POWERSTATION,
    GALAXY_S26_FODRAL,
    GALAXY_S26_SKAL,
    IPHONE_SKARMSKYDD,
    IPHONE_FODRAL,
    SLACKSPRAY,
    POWERBANK_20000,
    IPHONE_SKAL,
    POWERBANK,
    SMART_GARAGEPORTSOPPNARE,
    USB_C_KABEL,
    GARAGEPORTSOPPNARE,
    USB_C_LADDARE,
    NYCKELSKAP,
    VATTENFELSBRYTARE,
    SMART_BELYSNING,
    SMART_PLUG,
    SMART_STROMBRYTARE,
    ELEKTRISK_RULLGARDIN,
    UTOMHUSTIMER,
    VATTENLARM,
    BRANDVARNARE,
    SMART_BRANDVARNARE,
    BRANDSLACKARE,
    BRANDFILT,
    KOLMONOXIDVARNARE,
    BRANDSTEGE,
    UTRYMNINGSSTEGE,
    OVERVAKNINGSKAMERA,
    DORRKLOCKA_MED_KAMERA,
    INOMHUSKAMERA,
    KODLAS_YTTERDORR,
    HEMLARM,
    LARM_UTAN_ABONNEMANG,
    LUFTRENARE,
    LUFTFUKTARE,
    AVFUKTARE,
    ROBOTDAMMSUGARE,
    HYGROMETER,
    LUFTKVALITETSMATARE,
    ROBOTGRASKLIPPARE,
    FONSTERPUTSROBOT,
    SMART_HEM_HUBB,
    SMART_TERMOSTAT,

  ];
/** * Kategorier vars viktning faktiskt går att läsa. * * ⚠️ Finns för att `/om-oss` och `/sa-testar-vi` påstod olika saker om samma * fakta: den ena skrev "Vi har 22 kategorier med publicerad viktning", den * andra "Just nu har vi 23 kategorier med publicerad viktning". Båda talen var * härledda, men ur var sin lista. * * `TEST_PAGES` är alla viktningar som är författade, `liveTestPages()` är alla * sidor som är publicerade, och de är inte samma sak. Robotdammsugare har en * färdig viktning men står som `planned`, så viktningen finns men är inte * publicerad. Att räkna `TEST_PAGES.length` övertalade därför läsaren med en. * * Snittet är det enda tal som gör påståendet sant. Använd den här funktionen * varje gång en sida vill säga hur många kategorier vi publicerat en viktning * för, så kan de två sidorna inte glida isär igen. */ export function publishedCategories(): TestPage[

  ] {
    const publicerade = new Set(liveTestPages().map((c) => c.href));
return TEST_PAGES.filter((c) => publicerade.has(`/${
      c.slug
    }`));

  }
