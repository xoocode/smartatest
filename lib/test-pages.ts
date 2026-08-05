import type { TestPage } from "@/lib/products";
import type { Crumb } from "@/components/site/breadcrumbs";
import { ELEKTRONIK, HEM_HUSHALL, liveTestPages, SAKERHET, SMART_HEM } from "@/lib/catalog";

/**
 * The breadcrumb trail for a category page, minus "Hem" which Breadcrumbs
 * prepends. Centralised so every category page produces an identical trail and
 * a new group never has to be wired up page by page.
 */
export function testPageTrail(testPage: TestPage): Crumb[] {
  const trail: Crumb[] = [];
  if (testPage.category) {
    trail.push({ label: testPage.category.label, href: testPage.category.href });
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
    "Vi jämför smarta lampor på specifikationer, publicerade mätvärden och resultat från oberoende tester i Sverige och Norden. Alla lampor bedöms mot samma kriterier och samma viktning, och källorna finns länkade längre ner på sidan. Saknar en lampa ett publicerat omdöme om just den modellen står det så, i stället för ett gissat betyg. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "fargatergivning",
      label: "Färgåtergivning",
      weight: 22,
      description:
        "Färgåtergivning och färgtemperaturens omfång enligt specifikation, vägt mot hur oberoende tester bedömt ljuskvaliteten. Väger tyngst eftersom det är den skillnad du ser varje dag.",
    },
    {
      key: "dimring",
      label: "Dimring",
      weight: 18,
      description:
        "Hur lågt lampan går att dimra innan den flimrar eller slocknar, enligt tillverkarens uppgift och rapporterat flimmer i publicerade tester.",
    },
    {
      key: "anslutning",
      label: "Anslutning och stabilitet",
      weight: 17,
      description:
        "Protokoll, räckvidd och rapporterad stabilitet. Zigbee och Thread bygger ett eget nät mellan lamporna och får högre betyg än Wi-Fi när antalet enheter växer.",
    },
    {
      key: "testomdome",
      label: "Omdöme i oberoende tester",
      weight: 15,
      description:
        "Hur lampan bedömts av de oberoende testare vi citerar i källistan. Råd & Rön utser Philips Hue till Bäst i test och ger WiZ utmärkelsen Bra köp. Övriga tre lampor saknar ett publicerat omdöme om just den modell vi rankar, och då står det Ej testat på raden i stället för ett gissat betyg. Kriteriets vikt fördelas då på de övriga.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 15,
      description:
        "Pris per lampa vägt mot betygen i övriga kriterier, inte mot varumärket. En dyr lampa kan få högt betyg om resultaten motiverar priset.",
    },
    {
      key: "ljusstyrka",
      label: "Ljusstyrka",
      weight: 13,
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
    "Vi jämför smarta uttag på specifikationer från butikernas och tillverkarnas egna uppgifter, och på hur produkterna bedömts i oberoende tester i Sverige, Norden och Storbritannien. Alla pluggar bedöms mot samma kriterier och samma viktning, och källorna finns länkade längre ner. Saknar en produkt oberoende test står det så, i stället för ett gissat betyg. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
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
        "Vad pluggen själv drar dygnet runt för att kunna ta emot kommandot att slå på. Skiljer fem gånger mellan produkterna i jämförelsen, från 0,3 W till 1,48 W. Flera tillverkare uppger inte siffran alls.",
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
 * Ingen av de fem rankade produkterna dimrar. Ett kriterium där alla får samma
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
    "Vi jämför smarta strömbrytare och inbyggnadsreläer på specifikationer från butikernas och tillverkarnas egna uppgifter, på Elsäkerhetsverkets regler för vad du får göra själv, och på hur produkterna bedömts i oberoende tester. Alla produkter bedöms mot samma kriterier och samma viktning, och källorna finns länkade längre ner. Saknar en produkt oberoende test står det så, i stället för ett gissat betyg. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
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
        "Hur produkten bedömts av de oberoende testare vi citerar i källistan. Vikten är lägre här än på smart plug, eftersom bara två av fem produkter har ett publicerat produkttest. Saknas ett test står det ut på raden, och kriteriets vikt fördelas då på de övriga.",
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
    "Vi jämför motorer som gör gardinen du redan har smart, inte färdiga gardiner. Betygen bygger på tillverkarnas och butikernas egna uppgifter, på vad produkterna kostar hos den butik vi länkar till, och på hur de bedömts i oberoende produkttester. Alla produkter bedöms mot samma kriterier och samma viktning, och källorna finns länkade längre ner. Saknar en produkt oberoende test står det så, i stället för ett gissat betyg. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
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
        "Hur mycket motorn hörs när den går. Produkten sitter i ett sovrum och startar på morgonen, vilket gör detta till den vanligaste invändningen i testerna vi läst. SwitchBot anger 25 dB i sitt tysta läge mot 42 dB i normalläge. Aqara anger ingen siffra alls, vare sig på produktsidan eller i sin specifikation.",
    },
    {
      key: "dragkraft",
      label: "Dragkraft och gardinvikt",
      weight: 18,
      description:
        "Hur tung gardin motorn orkar dra, och hur den klarar en skena som går trögt. Avgör om mörkläggningsgardiner i tjockt tyg fungerar eller om motorn hakar upp sig halvvägs. SwitchBot uppger 16 kg för U-skena, Kjell uppger 12 kg för Aqara.",
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
        "Hur produkten bedömts av de oberoende testare vi citerar i källistan. Vikten är låg eftersom det inte finns något svenskt eller nordiskt grupptest av kategorin, så allt underlag är enskilda engelskspråkiga produkttester. Tre av fyra rankade produkter har ett sådant. Saknas det står det ut på raden, och kriteriets vikt fördelas då på de övriga.",
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
    "Vi jämför brandvarnare på specifikationer lästa på butikernas och tillverkarnas egna sidor: om de kan kopplas ihop och på vilken frekvens, hur länge batteriet håller, hur högt larmet låter och om det finns pausfunktion, samt vad publicerade jämförelser kommit fram till. Vi har inte tänt eld på något. Alla varnare bedöms mot samma kriterier och samma viktning, och källorna finns länkade längre ner. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "sammankoppling",
      label: "Sammankoppling och räckvidd",
      weight: 25,
      description:
        "Om varnaren kan larma tillsammans med andra, hur många enheter systemet klarar och på vilken frekvens. Väger tyngst eftersom det är den funktion räddningstjänsterna lyfter fram: en brand i källaren ska väcka den som sover på övervåningen. 868 MHz går genom väggar bättre än 433 MHz.",
    },
    {
      key: "batteritid",
      label: "Batteri och livslängd",
      weight: 25,
      description:
        "Förseglat tioårsbatteri mot utbytbara AA eller 9 V, plus garantitiden. En brandvarnare ska bytas efter tio år och ses aldrig till däremellan, så ett batteri som tar slut efter fem år är den vanligaste orsaken till att varnaren är tyst den dag det brinner.",
    },
    {
      key: "tydlighet",
      label: "Larmets tydlighet",
      weight: 20,
      description:
        "Ljudnivå i decibel på tre meters avstånd, om det finns pausfunktion för matos och om testknappen går att nå. EN 14604 kräver minst 85 dB, så siffran skiljer sällan, men pausfunktionen avgör om varnaren sitter kvar i taket eller hamnar i en låda efter tredje falsklarmet.",
    },
    {
      key: "omdome",
      label: "Omdöme i publicerade jämförelser",
      weight: 15,
      description:
        "Hur många publicerade jämförelser som utsett produkten till vinnare eller topplacering. Källorna redovisas per produkt, eftersom fyra av sju svenska jämförelser inte beskriver någon egen provning och en av dem rankar en produkt som lades ner i mars 2025. En nedlagd produkt får aldrig poäng här.",
    },
    {
      key: "prisvarde",
      label: "Pris per skyddad plats",
      weight: 15,
      description:
        "Priset delat med antalet varnare i förpackningen, inte styckepriset. Ett hem behöver en varnare per våningsplan och helst utanför varje sovrum, så ett trepack för 299 kronor skyddar tre platser för hundra kronor styck medan en ensam varnare för 265 skyddar en.",
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
 * ## Kriteriet som fick skrivas om under bygget
 *
 * Första versionen hette "redovisad certifiering" och gav full poäng till den
 * butik som skrev ut sitt typgodkännande. Det mätte i praktiken **hur bra
 * butiken skriver produkttext**, inte hur bra släckaren är. Housegard är
 * Sveriges största brandskyddsmärke och deras släckare är med all sannolikhet
 * EN 3-godkända; att Kjell inte skriver ut det är ett textproblem hos Kjell.
 * Modellen dubbelräknade dessutom manometern, en gång under certifiering och
 * en gång under hanterbarhet.
 *
 * Kriteriet mäter nu **tillförlitlighet**: manometer för egen kontroll,
 * dokumenterat typgodkännande och angivet arbetstemperaturområde. Vikten sänktes
 * från 25 till 15 och gick till släckeffekten, eftersom effektklassen är det
 * enda måttet i kategorin som faktiskt provats fram av ett certifieringsorgan.
 *
 * En produkt får fortfarande bottenbetyg: Kjells Design Edition, där butiken
 * uttryckligen skriver att släckaren inte är EN3-klassad. Det är en verklig
 * produktbrist och inte en utelämnad uppgift.
 */
export const BRANDSLACKARE: TestPage = {
  slug: "brandslackare",
  label: "Brandsläckare",
  title: "Brandsläckare bäst i test 2026: vilken du ska ha hemma",
  category: SAKERHET,
  methodology:
    "Vi jämför handbrandsläckare på det som står på etiketten och på butikens egen produktsida: effektklass enligt EN 3, redovisat typgodkännande, vikt och utrustning, temperaturområde och väggfäste, samt pris ställt mot släckeffekt. Vi har inte tömt en enda släckare. Alla bedöms mot samma kriterier och samma viktning, och källorna finns länkade längre ner. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "slackeffekt",
      label: "Släckeffekt",
      weight: 40,
      description:
        "Effektklassen enligt EN 3, alltså siffrorna som 55A 233B C på etiketten. A-talet anger hur stor brand i fasta material släckaren klarar, B-talet hur många liter brinnande vätska. En 55A täcker upp till 5,5 meter från släckaren och en 43A knappt 4,3, alltså tjugoåtta procent mindre. Väger tyngst med bred marginal, eftersom det är det enda måttet i kategorin som faktiskt provats fram av ett certifieringsorgan. Allt annat vi jämför är uppgifter från butiken.",
    },
    {
      key: "tillforlitlighet",
      label: "Tillförlitlighet",
      weight: 15,
      description:
        "Manometer för egen tryckkontroll, dokumenterat typgodkännande och angivet arbetstemperaturområde. En släckare som tappat trycket ser exakt likadan ut som en laddad, så manometern är det enda du själv kan kontrollera under tio år. Bottenbetyg bara där butiken uttryckligen skriver att släckaren inte är EN3-klassad, vilket gäller en produkt här.",
    },
    {
      key: "hanterbarhet",
      label: "Hanterbarhet",
      weight: 20,
      description:
        "Vikt och mått. En sexkilos väger nära nio kilo fylld och ska lyftas ur sitt fäste, säkras och riktas av någon som just upptäckt en brand. Alla i hushållet klarar inte det, och en tvåkilos som faktiskt går att använda är bättre än en sexkilos som står kvar på golvet.",
    },
    {
      key: "placering",
      label: "Placering och utrustning",
      weight: 15,
      description:
        "Om väggfäste ingår, vilket temperaturområde släckaren tål och om den får stå kallt. En släckare i garaget eller sommarstugan måste klara minusgrader, och en som ligger i en garderob i stället för att hänga synligt är en släckare ingen hittar när det behövs.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde per släckenhet",
      weight: 10,
      description:
        "Priset ställt mot effektklassen, inte mot vikten. Spannet i jämförelsen är 349 till 699 kronor, och den dyraste är inte den med högst klass. Vikten är låg med flit: en brandsläckare köps en gång på tio år, och hundra kronor är fel skäl att välja bort släckeffekt.",
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
    "Det finns inget oberoende test av brandfiltar i Sverige eller Norden. Vi har letat och redovisar utfallet på sidan i stället för att låtsas om något annat. Det vi kan göra är att läsa standarden i original och sedan kontrollera varje butiks egen produktsida mot den. Vi jämför därför brandfiltar på vad butiken dokumenterar om certifieringen, på storlek, på hur snabbt filten går att få ut ur förpackningen, på material och temperatur samt på pris. Alla uppgifter är lästa på butikernas egna sidor och daterade. Vi har inte tänt eld på något och vi har inte sett något provningsintyg. Alla filtar bedöms mot samma kriterier och samma viktning. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "certifiering",
      label: "Dokumenterad certifiering",
      weight: 35,
      description:
        "Vad du kan kontrollera innan du betalar, inte vad filten fysiskt klarar. Ingen av uppgifterna är granskad av tredje part, så det vi betygsätter är vad butiken skriver ut. Skalan är 5,0 för utskrivet EN 1869:2019, alltså provad mot matolja, heptan och ett skärpt elprov. 2,5 när standarden anges utan årtal, eftersom båda versionerna innebär matolja och elprov men bara 2019 innebär heptan. 1,5 för utskrivet EN 1869:1997, som är provad mot matolja och el men uttryckligen inte mot heptan. 1,0 när butiken inte anger någon standard alls, eftersom ingenting då går att verifiera. Väger tyngst eftersom uppgiften står i butikstexten men saknas i varje annan svensk jämförelse.",
    },
    {
      key: "storlek",
      label: "Storlek",
      weight: 25,
      description:
        "Standarden säger själv att filtar som är tillräckligt stora anses lämpliga för att kväva elden på en person vars kläder brinner, men den anger ingen centimetersiffra. Den kommer från räddningstjänsterna, som rekommenderar 120 × 180 cm. En filt på 120 × 120 räcker till en kastrull men inte till en soffa eller en människa, och prisskillnaden är ofta under hundra kronor. Fyra av åtta filtar i jämförelsen är den mindre storleken.",
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
        "Silikonbehandlad glasfiberväv är standard, och det som skiljer är vilken temperatur butiken anger att filten tål, mellan 500 och 550 grader. Låg vikt eftersom skillnaden är liten och samtliga är asbestfria.",
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
    "Det finns inget svenskt eller nordiskt test av kolmonoxidvarnare. Consumer Reports i USA provar kategorin i labb, men mot den amerikanska standarden UL 2034 och inte mot den europeiska EN 50291, och deras test av X-Sense gäller en annan modell än den vi rankar. Vi redovisar det på sidan i stället för att låna deras omdöme. Det vi gör i stället är att läsa vad EN 50291 kräver och kontrollera varje varnares angivna godkännande mot det, tillsammans med sensorns livslängd, hur larmet når fram, vad butiken tar betalt och vad varnaren visar. Alla uppgifter är lästa på butikernas egna produktsidor och daterade. Vi har inte utsatt någon varnare för kolmonoxid. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "certifiering",
      label: "Dokumenterad certifiering",
      weight: 30,
      description:
        "Vilken del av EN 50291 varnaren anges vara provad mot, och i vilken utgåva. Del 1 gäller bostäder, del 2 lägger till husvagn, husbil och båt. Utgåvan spelar roll eftersom 2018 gjorde livslängdsindikering obligatorisk och föregångaren drogs tillbaka 2021. Skalan är 5,0 för del 1 och 2 i gällande utgåvor, 4,0 för enbart del 2 i gällande utgåva, 3,5 för enbart del 1 i gällande utgåva och 2,0 när båda delarna anges men i tillbakadragen utgåva. Vi betygsätter vad du kan kontrollera före köp, inte vad varnaren fysiskt klarar, eftersom ingen uppgift är granskad av tredje part.",
    },
    {
      key: "livslangd",
      label: "Sensorns livslängd",
      weight: 25,
      description:
        "En CO-sensor löper ut och då ska hela varnaren bytas, inte batteriet. Det är kategorins verkliga kostnad och spannet är stort: fem år mot tio år är dubbla priset över tid. Vi väger angiven livslängd mot pris och mot om varnaren har en indikering som säger till när den är förbrukad.",
    },
    {
      key: "larmvag",
      label: "Larmväg",
      weight: 20,
      description:
        "Kolmonoxid dödar särskilt den som sover, och en varnare som bara tjuter där den hänger hjälper ingen som inte är i rummet. Här väger vi ljudnivå, om varnare går att koppla samman så att alla larmar samtidigt, och om larmet når en telefon. En varnare i husvagnen på tomten hörs inte in i huset.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 15,
      description:
        "Priset ställt mot certifiering och mot livslängd, alltså mot kronor per år snarare än mot prislappen. Spannet är 399 till 1 099 kronor, nästan tre gånger.",
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
  title: "Brandstege bäst i test 2026: kilotalet går inte att jämföra",
  category: SAKERHET,
  methodology:
    "Det finns inget svenskt eller nordiskt test av hängande brandstegar, och det finns ingen produktstandard som gäller stegtypen. Den standard två av tillverkarna hänvisar till, EN 131-6, gäller enligt SIS lutande och stående teleskopstegar, och Bauhaus anger den dessutom i en utgåva som SIS listar som tillbakadragen. Följden är att maxlasten på kartongen inte går att jämföra: samma sorts stege anges till 150, 200, 400 och 450 kilo utan att någon butik anger hur talet mätts, och två av åtta anger den inte alls. Det vi gör i stället är att läsa varje butiks och varje tillverkares egna uppgifter, ställa räckvidden mot Boverkets femmetersgräns och betygsätta dokumentationen efter en publicerad skala. Alla uppgifter är lästa på butikens eller tillverkarens egen sida och daterade. Vi har inte belastat eller klättrat i någon stege. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "rackvidd",
      label: "Räckvidd",
      weight: 30,
      description:
        "Hur högt sittande fönster stegen når från, mätt mot Boverkets gräns. Byggreglerna accepterar utrymning genom fönster om underkanten sitter högst 5,0 meter över marken, och över den höjden krävs en fast monterad stege. Kriteriet mäter alltså inte råa meter utan hur stor del av det intervallet stegen täcker med marginal. En stege på 4,5 meter räcker till en normal andravåning, en på 4,3 blir knapp i ett hus med hög takhöjd, och sju meter och uppåt krävs för tre våningar.",
    },
    {
      key: "nedstigning",
      label: "Nedstigning",
      weight: 25,
      description:
        "Det som avgör om foten får plats när stegen ligger an mot fasaden. Distanser som håller ut stegen från väggen, stegbredd, och om stegpinnarna är räfflade eller släta. En stege utan distanser pressas mot väggen av din egen vikt och då finns ingenstans att sätta framfoten. Vi väger publicerade mått högre än beskrivande ord.",
    },
    {
      key: "provning",
      label: "Dokumenterad provning",
      weight: 20,
      description:
        "Vad du kan kontrollera innan du betalar, inte vad stegen fysiskt klarar. Ingen uppgift i kategorin är granskad av tredje part och ingen butik anger en provmetod för maxlasten. Skalan är 5,0 för en gällande standard med årtal som gäller den här stegtypen, vilket ingen produkt når eftersom en sådan standard inte finns, 2,5 när en standard anges utan årtal, 1,5 när den anges i en utgåva som SIS listar som tillbakadragen och 1,0 när ingen standard anges alls. Även 2,5 är generöst, eftersom EN 131-6 gäller lutande och stående teleskopstegar och inte en stege av nylonband som hänger fritt.",
    },
    {
      key: "passform",
      label: "Passform",
      weight: 15,
      description:
        "Om stegen över huvud taget går att haka på ditt fönster. Krokarna har en största karmtjocklek, och en av produkterna anger även en minsta. Här väger också vikten att hantera i mörker och om stegen levereras i något som gör att den går att hitta och få ut snabbt. Måttet är gratis att kontrollera i förväg och kostsamt att upptäcka i efterhand.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 10,
      description:
        "Priset ställt mot räckvidden, alltså kronor per meter du faktiskt kan utrymma från, och mot vad som ingår. Spannet är 699 till 1 294 kronor, alltså knappt dubbelt, vilket är litet i förhållande till hur mycket produkterna skiljer sig i dokumentation.",
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
  title: "Utrymningsstege bäst i test 2026: en av fem har ett godkännande",
  category: SAKERHET,
  methodology:
    "Det finns inget svenskt test av fasta utrymningsstegar. Däremot finns något bättre: SINTEF Certification i Norge har en egen produktgrupp för räddningsstegar, och deras tekniska godkännanden anger provlast, monteringsvillkor, hur högt fönster stegen får användas till och ett utgångsdatum. Fyra stegar i världen har ett sådant godkännande och en av dem säljs i Sverige. Det är den enda kontrollerbara skillnaden i kategorin, och därför väger dokumentationen tyngst hos oss. Övriga uppgifter är lästa på butikens eller tillverkarens egen sida och daterade. Vi har inte belastat, monterat eller klättrat i någon stege. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "provning",
      label: "Dokumenterad provning",
      weight: 30,
      description:
        "Vad du kan kontrollera innan du betalar, inte vad stegen fysiskt klarar. Skalan är 5,0 för ett tredjepartsgodkännande för just den här produkttypen, med provlast, användningsområde och utgångsdatum, 2,5 för en gällande standard angiven med årtal, 1,5 när standarden anges i en utgåva som SIS listar som tillbakadragen, och 1,0 när ingen standard anges alls. Fyra av fem produkter ligger på eller under 1,5, och det är i sig kategorins besked.",
    },
    {
      key: "rackvidd",
      label: "Räckvidd inom godkänt bruk",
      weight: 25,
      description:
        "Inte råa meter, utan hur högt sittande fönster stegen täcker inom det den är godkänd eller specificerad för. Boverket tillåter utrymning genom fönster upp till 8,0 meter över marken om det finns en fast monterad stege. Modums eget godkännande stannar samtidigt vid 5,0 meter utan ryggbygel och 7,5 med. Den som säljer en stege i sexton längder utan att någonstans ange en högsta användningshöjd får inte betalt för längden i det här kriteriet.",
    },
    {
      key: "nedstigning",
      label: "Nedstigning",
      weight: 20,
      description:
        "Avgör om nedklättringen fungerar när du står i den. Fotstegets bredd, avståndet mellan stegen, hur långt stegen bygger ut från fasaden i utfällt läge, halkskydd, och om det finns ryggbygel att komplettera med. En bred stegpinne med publicerat mått väger tyngre än ordet halksäker.",
    },
    {
      key: "montering",
      label: "Montering och infästning",
      weight: 15,
      description:
        "En fast stege är bara så stark som skruvarna i väggen. Här väger vi vad som ingår i lådan, vilka fasadtyper leverantören täcker, om skruvdimension och avstånd mellan infästningarna är angivna, och om stegen går att skarva till rätt längd. Den som skriver ut att panelen ska vara minst nitton millimeter tjock har tänkt på det som faktiskt går sönder.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 10,
      description:
        "Kronor per meter täckt räckvidd, och vad du får för dem. Spannet är 3 695 till 14 513 kronor för stegar som gör samma sak, alltså det bredaste på någon av våra sidor. Här väger också att flera av produkterna säljs av två butiker till priser som skiljer fyrtio till femtio procent på samma artikelnummer.",
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
    "Det finns inget svenskt test av övervakningskameror för villa. Däremot finns en svensk regel som avgör om kameran alls får användas som köparen tänkt, och en produktfunktion som Integritetsskyddsmyndigheten själv pekar ut som lösningen. Vi har läst IMY:s regeltext i original och därefter varje tillverkares egen dokumentation av den funktionen, och det är den jämförelsen sidan bygger på. Övriga uppgifter är lästa på butikens egen sida och daterade. Vi har inte monterat, filmat med eller mätt bildkvaliteten på någon kamera. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "integritet",
      label: "Integritet och maskering",
      weight: 30,
      description:
        "Om kameran har en riktig sekretesszon som svartar ut pixlarna i inspelningen, och om den fortsätter göra det när kameran används normalt. Det ska inte förväxlas med detekteringszon, som bara styr vad kameran larmar om. Skalan är 5,0 när funktionen gäller modellen och inget i tillverkarens dokumentation urholkar den, 4,0 när brasklappen bara slår in vid en funktion du kan låta bli, 2,5 när zonen förskjuts eller försvinner vid normal användning av modellens huvudfunktion, 1,5 när tillverkaren själv skriver att maskeringen inte säkert hindrar inspelning, och 1,0 när modellen inte står i tillverkarens egen lista över modeller som har funktionen.",
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
        "Vad som slutar fungera utan abonnemang. Kriteriet mäter beroendet och inte kronorna: vi har inte kunnat läsa något abonnemangspris hos vare sig Arlo eller TP-Link, och publicerar därför inget. Det som går att belägga är vilka funktioner butiken och tillverkaren själva märker som abonnemangsberoende, och för två av fabrikaten gäller det både molninspelningen och den igenkänning som säljs som produktens huvudfunktion.",
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
  title: "Dörrklocka med kamera bäst i test 2026: i lägenhet gäller inte undantaget",
  category: SAKERHET,
  methodology:
    "Det finns inget svenskt test av dörrklockor med kamera. Det finns däremot en myndighetstext med ett färdigt exempel som gäller dörrkameror på lägenhetsdörrar, och fem tillverkares egen dokumentation av den funktion som avgör om produkten går att använda lagligt. Vi har läst båda i original. Övriga uppgifter är lästa på butikens egen sida och daterade. Vi har inte monterat, ringt på eller filmat med någon dörrklocka. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "integritet",
      label: "Integritet och maskering",
      weight: 25,
      description:
        "En dörrklocka pekar per definition mot vägen fram till dörren, och i ett flerbostadshus mot trapphuset. Kriteriet mäter om produkten har en riktig sekretesszon som svartar ut pixlarna i inspelningen, och om den fortsätter göra det när kameran används. Skalan är 5,0 när funktionen gäller modellen och inget i tillverkarens dokumentation urholkar den, 4,0 när brasklappen bara slår in vid något du kan låta bli, 2,5 när zonen förskjuts eller försvinner vid normal användning, 1,5 när tillverkaren själv reserverar sig för att maskeringen inte hindrar inspelning, och 1,0 när modellen inte står i tillverkarens egen lista.",
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
        "Vad som slutar fungera utan abonnemang, och var materialet hamnar. Kriteriet mäter beroendet och inte kronorna: vi har inte kunnat läsa någon prislista hos Arlo, Ring eller Yale och publicerar därför inga abonnemangspriser. Det som går att belägga är vilka funktioner butiken och tillverkaren själva märker som abonnemangsberoende, och om produkten sparar något lokalt utan dem.",
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
    "Det finns inget svenskt test av inomhuskameror. Det vi gör i stället är att läsa IMY:s regeltext i original, ta reda på vilka produkter som har ett fysiskt linsskydd i stället för bara ett programläge, och kontrollera varje sådan uppgift hos tillverkaren själv. Övriga uppgifter är lästa på butikens egen sida och daterade. Vi har inte monterat eller filmat med någon kamera. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "avstangning",
      label: "Går den att stänga av på riktigt?",
      weight: 30,
      description:
        "Skillnaden mellan ett mekaniskt linsskydd och ett läge i en app. Ett skydd som fysiskt täcker eller vrider bort linsen syns tvärs över rummet och kräver ingen tillit till programvaran. Ett privatläge i appen är ett löfte, och det är ett löfte du inte kan kontrollera. Skalan är 5,0 för ett fysiskt skydd som stängs automatiskt när larmet slås av, 4,0 för ett fysiskt skydd du styr själv, 2,5 för enbart ett programläge som stänger av både bild och ljud, 1,5 för enbart pausad inspelning där kameran fortfarande ser, och 1,0 när ingen avstängning alls dokumenteras.",
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
        "Vad som slutar fungera utan abonnemang, och var materialet hamnar. Inomhusbilder är det känsligaste material ett hem producerar, och frågan var de lagras är därför inte bara ekonomisk. Kriteriet mäter beroendet och inte kronorna, eftersom vi inte kunnat läsa någon prislista hos de tillverkare som kräver abonnemang.",
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
  title: "Kodlås till ytterdörr bäst i test 2026: certifikatet gäller inte koden",
  category: SAKERHET,
  methodology:
    "Det finns inget svenskt test av kodlås till ytterdörr. Däremot finns något starkare: en svensk norm, ett certifieringsorgan och certifikat som går att läsa i original. Stöldskyddsföreningen definierar vad en godkänd låsenhet är, SBSC certifierar mot normen, och certifikaten anger både klass, giltighetstid och vilka inställningar godkännandet gäller för. Vi har läst normtexten och det certifikat som finns för kategorins ledande produkt. Övriga uppgifter är lästa på butikens egen sida och daterade. Vi har inte monterat, dyrkat eller provat något lås. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "godkand",
      label: "Godkänd låsenhet",
      weight: 30,
      description:
        "Vad du kan kontrollera innan du betalar. En godkänd låsenhet är enligt SSF hela enheten, alltså låshus, cylinder, slutbleck och förstärkningsbehör, där varje del och helheten når klass 3 enligt SSF 3522 eller klass S3 enligt SSF 3523. Skalan är 5,0 när vi läst ett certifikat hos SBSC med nummer, klass och giltighetstid, 4,0 när butiken eller tillverkaren anger klass 3 eller S3 men vi inte hittat certifikatet, 2,5 när en klass anges men lägre än 3, alltså inte en godkänd låsenhet, 1,5 när ingen klass anges alls, och 1,0 när butiken uttryckligen skriver att låset inte är godkänt.",
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
        "Inköpspris ställt mot vad du får. Spannet är 1 990 till 5 488 kronor, alltså nästan tre gånger, och det dyraste är också det enda med ett läsbart certifikat. Här väger också vad som säljs separat: brickor, uppkopplingsmodul och batteripaket ligger inte alltid i lådan.",
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
  title: "Hemlarm bäst i test 2026: två av åtta skriver ut vad det kostar",
  category: SAKERHET,
  methodology:
    "Det finns inget svenskt test av hemlarmstjänster, och det går inte att göra ett: en tjänst med larmcentral kan inte provas i ett labb. Vi har i stället läst det som faktiskt binder bolaget, alltså avtalsvillkoren, i original och med utgåva och punktnummer angivna. Verisures allmänna villkor 2025:1, tjänstevillkoren för inbrottslarm 2024:2 och villkoren för larm monterat av kund 2025:1, samt Sector Alarms avtalsvillkor SAS 2.1. Priserna är lästa på bolagets egen sida samma dag, och där bolaget inte publicerar något pris står det som saknad uppgift och aldrig som en gissning. Ingen leverantör har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "oppna",
      label: "Öppna villkor",
      weight: 30,
      description:
        "Vad du kan ta reda på innan du släpper in en säljare. Fem av åtta bolag publicerar ett månadstal och bara två publicerar hela priset. Publiceras månadsavgiften på bolagets egen sida? Publiceras startavgiften, bindningstiden och uppsägningstiden? Går avtalsvillkoren att läsa i sin helhet utan att lämna ifrån sig kontaktuppgifter? Skalan är 5,0 när månadsavgift, startavgift och fullständiga villkor är publicerade, 3,5 när villkoren finns men bara en del av priset, 2,0 när enbart ett startpaketspris publiceras, och 1,0 när ingen prisuppgift alls går att hitta utan offertförfrågan. Kriteriet mäter öppenhet och inte prisnivå: ett dyrt bolag som skriver sitt pris slår ett billigt som vägrar.",
    },
    {
      key: "lamna",
      label: "Kostnaden att lämna",
      weight: 25,
      description:
        "Vad som händer när du vill sluta. Vem äger utrustningen, finns det en publicerad friköpstrappa, hur lång är uppsägningstiden och vilka avgifter kan utlösas vid avslutet? Här väger också om hårdvaran fortsätter fungera efteråt. Verisure publicerar en friköpstrappa men skriver samtidigt att de inte garanterar någon funktion efter friköp, och Sector erbjuder ingen friköpsmöjlighet alls för larmsystemet.",
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
        "Vad larmet gör när bredbandet försvinner, vilket är det enklaste sättet att slå ut ett uppkopplat larm. Två saker mäts: om det finns en reservkanal utöver hemmets nät, alltså mobilnät eller en andra internetleverantör, och hur länge hubben går på eget batteri vid strömavbrott. En reservkanal som kräver en prenumeration räknas inte som ingående, den räknas under nästa kriterium. Skalan är 5,0 när flera kanaler och mobilnät ingår i priset, 3,0 när reservbatteriet är långt men mobilnätet kräver en plan, och 1,0 när butiken varken anger reservkanal eller batteritid.",
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
        "Vad du får för pengarna, inte lägst pris. Spannet är 599 till 8 259 kronor, alltså fjorton gånger, och det dyraste är också det enda där reservuppkopplingen ingår. Här väger också vad som saknas i lådan: en separat siren, en knappsats eller en extra detektor kostar mellan 495 och 1 315 kronor att lägga till.",
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
    "Kategorin har en primärkälla som är bättre än ett test: Kemikalieinspektionen och Elsäkerhetsverket granskade tillsammans tjugo luftrenare på den svenska marknaden och publicerade resultatet i januari 2026. Vi har läst hela rapporten, alla 45 sidor, och den avgör hur vi väger. Därutöver läser vi EN 1822, standarden som avgör vad ordet HEPA betyder, och sedan varje produkts specifikation hos butiken rad för rad. Alla priser, kundbetyg, filterklasser, ytor, luftflöden och ljudnivåer är lästa på butikens egen sida och daterade. Där butiken inte anger en uppgift står det som saknad uppgift och aldrig som en nolla. Vi har inte mätt partikelhalter, inte mätt ozon och inte provat någon apparat. Rapporten namnger inte de produkter som föll, och vi antyder därför aldrig vilka de var. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "teknik",
      label: "Reningsteknik och biprodukter",
      weight: 25,
      description:
        "Vad apparaten lägger till utöver filtret. En luftrenare som pressar luft genom filter bildar ingenting extra. Lägger den till jonisering, UV-ljus, plasma eller katalytisk oxidation kan den enligt Kemikalieinspektionens och Elsäkerhetsverkets granskning bilda ozon som biprodukt, och ozon irriterar luftvägar och ögon och kan förvärra astma. Skalan är 5,0 för filter enbart, 2,5 när ett aktivt steg finns men butiken varken förklarar det eller nämner biprodukter, och 1,0 när butiken själv skriver att produkten avger ozon. Kriteriet mäter tekniken och den upplysning du får före köp, inte en mätning vi gjort.",
    },
    {
      key: "filterklass",
      label: "Filterklass enligt EN 1822",
      weight: 25,
      description:
        "Vad filtret fångar, och hur mycket av det du kan kontrollera i förväg. EN 1822 delar in filter i EPA, alltså E10 till E12, HEPA, alltså H13 och H14, och ULPA. Bara H13 och H14 är HEPA. Ordet används ändå fritt i handeln, och skillnaden mellan ett E11 och ett H13 är stor vid den partikelstorlek som är svårast att fånga. Skalan är 5,0 när klassen står i specifikationstabellen, 3,5 när den bara står i säljtexten, 2,0 när det står HEPA utan klass, och 1,0 när ingen filterklass anges alls.",
    },
    {
      key: "kapacitet",
      label: "Kapacitet mot rumsstorlek",
      weight: 20,
      description:
        "Om apparaten räcker till rummet du tänkt ha den i. Här väger CADR, alltså renluftsflödet i kubikmeter per timme, tyngre än den yta butiken anger, eftersom ytan bygger på ett antagande om takhöjd och antal luftväxlingar som sällan skrivs ut. En apparat som anger båda talen går att kontrollera. En som bara anger kvadratmeter får du lita på.",
    },
    {
      key: "ljudOchDrift",
      label: "Ljudnivå och driftkostnad",
      weight: 15,
      description:
        "Vad det kostar att ha den igång, i decibel och i kronor. En luftrenare som står i ett sovrum måste gå att sova bredvid, och skillnaden mellan 48 och 66 decibel är stor. Filterbytena är den dolda kostnaden: ett filter kostar några hundralappar och byts oftast en gång om året, vilket över fem år kan bli mer än apparaten kostade.",
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
  title: "Luftfuktare bäst i test 2026: expertorganet avråder, och vi säger det först",
  category: HEM_HUSHALL,
  methodology:
    "Kategorin har två svenska normkällor som väger tyngre än något test, och vi har läst båda i original. Folkhälsomyndighetens allmänna råd FoHMFS 2014:14 namnger 45 procent relativ luftfuktighet vid 21 grader som en indikation som kan få tillsynsmyndigheten att kräva undersökning av bostaden. SweSIAQ, den svenska föreningen för inomhusmiljö, skriver att man i allmänhet bör undvika konstgjord befuktning av luften. Därutöver har vi läst två tyska laboratorieprov som odlat bakterier ur luften från luftfuktare, och det svenska grupptest som finns. Varje produkts teknik, kapacitet, tankvolym, ljudnivå och reglerbarhet är läst på butikens egen produktsida och daterad. Där butiken inte anger en uppgift står det som saknad uppgift och aldrig som en nolla. Vi har inte mätt luftfuktighet, inte odlat bakterier och inte provat någon apparat. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
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
        "Om tekniken finfördelar tankens innehåll ut i rummet, och vad tillverkaren gör åt det. Ultraljud slår sönder vattnet till dimma och skickar med allt som finns i det, både mineraler och bakterier. Det är den teknik ÖKO-TEST pekade ut när fem av åtta apparater spred mellan 400 000 och drygt 60 miljoner kolonibildande enheter i timmen. Förångning låter vattnet avdunsta genom en veke, så mineraler och mikrober stannar i filtret, och ånga kokar vattnet. Skalan är 5,0 för förångning, 4,5 för ånga, 2,5 för ultraljud med silverstav eller motsvarande åtgärd, och 2,0 för ultraljud utan åtgärd.",
    },
    {
      key: "kapacitet",
      label: "Kapacitet mot rummet",
      weight: 20,
      description:
        "Om apparaten räcker till rummet, och om butiken talar om det. Här väger avgiven fukt i milliliter per timme tyngre än den yta butiken anger, eftersom ytan bygger på antaganden om takhöjd och luftväxling som sällan skrivs ut. En apparat som anger båda går att kontrollera. Överdimensionering är dessutom det praktiska sättet att råka passera 45 procent, så störst är inte bäst.",
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
        "Vad du får för pengarna, inte lägst pris. Spannet är 399,90 till 1 999 kronor, alltså fem gånger. Här väger också kundunderlaget där det finns: en produkt med 561 omdömen säger mer om vardagen än en med noll, oavsett vad specifikationen lovar.",
    },
  ],
};

/**
 * Hygrometer. Fjärde sidan i Hem & hushåll, och den som betjänar en efterfrågan
 * vi själva skapat: fyra sidor ber elva gånger läsaren mäta fukten först, utan
 * att ha haft något att länka till.
 *
 * Kategorins fynd är att **avvikelsen aldrig trycks på förpackningen.** Av
 * tretton kartlagda produkter, från 139,90 till 1 199 kronor, anger två något
 * alls om hur mycket fel de får visa. Kjells produktblad ger mätområdet och en
 * tolerans för temperaturen, aldrig för fukten. TFA Dostmanns eget datablad
 * för Moxx gör likadant.
 *
 * Det är inte en detalj. Våra egna sidor ber läsaren agera vid 45 procent
 * (FoHMFS 2014:14), vid 45 till 50 (SweSIAQ, kvalster) och vid 60 (mögel). En
 * mätare med ± 5 procentenheter som visar 58 kan stå på 53 eller 63, alltså på
 * båda sidor om den gräns vi bett läsaren agera på.
 *
 * De två som anger något: Beurer HM 16 med ± 5 procentenheter mellan 40 och
 * 80 procent och ± 8 utanför, och Govee H5075 med ± 3. Beurer HM 22 anger 8
 * och kostar mer än HM 16 som anger 5.
 *
 * ⚠️ **Angiven noggrannhet och uppmätt avvikelse är två skilda rader och får
 * aldrig slås ihop.** Det förra är tillverkarens utfästelse, det senare vad
 * Bundesverband Schimmelpilzsanierung mätte mot ett referensinstrument för
 * 1 050 euro. Båda står i `ALDRIG_BEDOMD` i `lib/spec-schema.mjs`: en gissad
 * tolerans vore en påhittad mätning.
 *
 * ⚠️ Sex svenska jämförelsesajter korar Shelly H&T Gen 3 till bäst i test.
 * Shelly publicerar ingen tolerans för fukt, varken på produktsidan, i
 * dokumentationen eller i kunskapsbasen. Det är kontrollerat, inte antaget.
 *
 * Vikterna är användarens beslut 2026-08-04. Se `.agent/research/hygrometer.md`.
 */
export const HYGROMETER: TestPage = {
  slug: "hygrometer",
  label: "Hygrometer",
  title: "Hygrometer bäst i test 2026: två av tretton vågar ange hur fel de får visa",
  category: HEM_HUSHALL,
  methodology:
    "Kategorin avgörs av ett tal som nästan ingen publicerar: hur många procentenheter mätaren får visa fel. Vi har läst efter det hos varje tillverkare i original, inte hos butiken, och antecknat både när det stod där och när det inte gjorde det. Två av tretton kartlagda produkter anger något. Den enda oberoende provning vi hittat är Bundesverband Schimmelpilzsanierungs, där fjorton mätare jämfördes mot ett kalibrerat referensinstrument för 1 050 euro; den är från 2015 och 2016 och gäller de exemplaren, inte dagens. Angiven noggrannhet och uppmätt avvikelse hålls därför i skilda rader, eftersom en utfästelse och en mätning inte är samma sorts uppgift. Tröskelvärdena vi mäter mot kommer från Folkhälsomyndighetens allmänna råd FoHMFS 2014:14 och från SweSIAQ. Priser, betyg och specifikationer är lästa på butikernas egna produktsidor och daterade. Vi har inte mätt någon luftfuktighet och inte provat någon mätare. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "noggrannhet",
      label: "Noggrannhet",
      weight: 35,
      description:
        "Hur mycket fel mätaren får visa, i procentenheter relativ fuktighet, och om tillverkaren över huvud taget säger det. Det här är kategorins enda egenskap som avgör om avläsningen går att lita på, och den är också den mest undanhållna: av tretton kartlagda produkter anger två något. Skalan är 5,0 när tillverkaren anger högst ± 3 procentenheter, 4,5 när en oberoende provning mätt avvikelsen till under en procentenhet, 4,0 vid ± 5, 3,0 vid ± 8, 2,5 när ingen uppgift finns men konstruktionen är digital och en provning visat att digitala mätare i den klassen håller sig inom några procentenheter, och 1,5 när mätaren är analog, eftersom samma provning fann upp till tolv procentenheters spridning mellan tre exemplar av en och samma analoga modell.",
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
        "Vad du får för pengarna, inte lägst pris. Spannet är 139,90 till 1 199 kronor, alltså nästan nio gånger, och det är en kategori där priset förutsäger noggrannheten sämre än i någon annan vi mätt: den dyraste produkten i tabellen anger ingen tolerans alls, och den provning vi läst fann att den billigaste digitala mätaren i hela fältet låg inom en halv procentenhet. Ett flerpack som ger en mätare per rum räknas här som det det är, inte som ett budgetalternativ.",
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
  title: "Luftkvalitetsmätare bäst i test 2026: tre av åtta mäter inte koldioxid",
  category: HEM_HUSHALL,
  methodology:
    "Kategorin avgörs av vilka givare som faktiskt sitter i apparaten, och det är inte alltid de man tror att man köper. Vi har läst varje produkts givaruppsättning hos butiken och hos tillverkaren och antecknat både vad den mäter och hur. Tre av åtta kartlagda mätare saknar koldioxidgivare helt, och en anger eCO2, alltså ett tal uträknat ur halten flyktiga organiska ämnen i stället för en mätning av koldioxid. Noggrannheten är läst i tillverkarens eget datablad där den publiceras; där den inte gör det står det så. Reglerna för radonmätning är hämtade ur Strålsäkerhetsmyndighetens egen vägledning och återges i köpguiden, men de påverkar inte betygen: en digital radonmätare bedöms på vad den gör, inte på vad den inte är avsedd för. Den enda oberoende provning vi hittat är Stiftung Warentests av 26 koldioxidmätare från december 2021, och den täcker en av de sju vi rankar; där den finns redovisas betyget som testets och inte som vårt. Priser och kundbetyg är lästa på butikernas egna produktsidor och daterade. Vi har inte mätt någon luft, inte provat någon mätare och inte jämfört någon avläsning mot ett referensinstrument. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "givare",
      label: "Givare och mätteknik",
      weight: 35,
      description:
        "Vad apparaten faktiskt mäter, och med vilken sorts givare. Det här är kategorins avgörande egenskap eftersom skillnaden mellan modellerna inte är hur bra de mäter utan vad de mäter: tre av åtta saknar koldioxidgivare helt trots att de säljs som luftkvalitetsmätare. Skalan väger både antalet verkliga storheter och teknikens art. En NDIR-givare mäter koldioxid genom hur infrarött ljus absorberas. En eCO2-uppgift är uträknad ur halten flyktiga organiska ämnen och stiger av en doftspray i ett tomt rum, vilket ger 5,0 för en bred uppsättning med NDIR och partikelmätning, och ner mot 2,0 för tre givare eller för ett härlett koldioxidtal.",
    },
    {
      key: "beslutsnytta",
      label: "Beslutsnytta",
      weight: 25,
      description:
        "Om talet du får går att göra något åt. En koldioxidhalt i ppm säger när du ska vädra, en partikelhalt säger när du ska stänga fönstret mot gatan, och en radonnivå säger om det är värt att beställa en riktig mätning. Ett eCO2-tal säger ingenting du kan handla på, eftersom det inte motsvarar någon storhet som finns i rummet. Kriteriet mäter alltså inte hur många värden appen visar utan hur många av dem som leder till en åtgärd, och en larmfunktion vid en gräns du satt själv väger tyngre än ytterligare en kurva.",
    },
    {
      key: "avlasning",
      label: "Avläsning och app",
      weight: 15,
      description:
        "Om du ser värdet när det spelar roll. En mätare utan display kräver att du plockar upp telefonen, och en luftkvalitetsmätare man måste öppna en app för att läsa blir en mätare man läser en gång i månaden. Här väger inbyggd display tungt, liksom en färgindikator som syns i förbifarten. Appens kvalitet räknas för historiken: att kunna se vad koldioxidhalten gjorde i sovrummet i natt är hela skälet att mäta över tid i stället för att titta på ett ögonblicksvärde.",
    },
    {
      key: "noggrannhet",
      label: "Angiven noggrannhet",
      weight: 15,
      description:
        "Om tillverkaren skriver ut hur mycket fel mätaren får visa. Airthings anger ±30 ppm ±3 % för koldioxid mellan 15 och 35 grader, vilket är den tydligaste redovisningen i kategorin. Flera andra anger ingenting alls, och det är samma mönster som på hygrometersidan: den som har en riktig givare tenderar att våga sätta en siffra på den. Kriteriet belönar att uppgiften publiceras, inte att den är imponerande, eftersom en utskriven tolerans går att kontrollera medan en utelämnad inte gör det.",
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
    "Kategorin avgörs av tomten och inte av maskinen, så vi rankar på det köparen måste matcha mot sin egen gräsmatta. Klippyta och max lutning publiceras för nästan varje modell och är därför jämförbara i klartext; navigeringstekniken och hinderhanteringen är läst i butikens och tillverkarens egna beskrivningar. Råd & Rön har provat 69 robotar och publicerade i juni 2026, men resultaten ligger bakom betalvägg, så vi återger inga modellbetyg därifrån och använder testet bara för det som är fritt läsbart om metod och slutsatser. Forskningen om robotgräsklippare och igelkottar redovisas i köpguiden och påverkar inte betygen, eftersom det saknas publicerade provresultat per modell och den studie som konstruerade provet inte kunde belägga att något konstruktionsdrag förutsäger utfallet. Priser och kundomdömen är lästa på butikens egen produktsida och daterade. Vi har inte klippt någon gräsmatta, inte mätt någon ljudnivå och inte provat någon robot. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
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
        "Hur mycket den hörs, och därmed när du kan köra den. En robotgräsklippare går många timmar i veckan i en trädgård med grannar på tre sidor, och ljudnivån avgör om du kan köra kvällstid utan att irritera någon. Den avgör också om du kan följa rådet att köra dagtid av hänsyn till igelkottar: en tyst robot kan gå mitt på dagen utan att störa dig själv. Under 57 decibel räknas som tyst i kategorin, och där tillverkaren inte anger något tal står det som saknad uppgift.",
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
  title: "Fönsterputsrobot bäst i test 2026: vad linan tål säger bara en av dem",
  category: HEM_HUSHALL,
  methodology:
    "Kategorin skiljer sig från allt annat vi jämför på en punkt: produkten sitter fast på utsidan av ett fönster flera våningar upp, och om den lossnar faller den. Vi rankar därför på vad tillverkaren publicerar om just det, och de publicerar olika saker. Linans hållfasthet anges av en av tillverkarna, hålltiden vid strömavbrott av tre, och reglerna för vilket glas roboten får sitta på skiljer sig så mycket att en modell förbjuder båglöst glas medan en annan tillåter det med marginal. Allt är läst i tillverkarnas egna manualer och produktsidor, inte i butikstext, och där en uppgift saknas står det som saknad uppgift. Priser och kundomdömen är lästa på den butik vi länkar till och daterade. Vi har inte hängt någon robot i något fönster, inte belastat någon lina och inte mätt någon rengöring. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "sakerhet",
      label: "Säkerhet på höjd",
      weight: 30,
      description:
        "Vad som håller roboten uppe när något går fel, och om tillverkaren säger det. Två uppgifter avgör: hur mycket säkerhetslinan tål, och hur länge reservbatteriet håller kvar roboten om strömmen går. Spannet är stort där talen finns, från 20 till 40 minuters hålltid, och en av tillverkarna anger linans hållfasthet i kilo medan de andra bara nämner att en lina medföljer. Kriteriet belönar att uppgiften publiceras minst lika mycket som att talet är imponerande, eftersom en utskriven siffra går att kontrollera medan en utelämnad inte gör det.",
    },
    {
      key: "fonstertyp",
      label: "Fönstertyp och mått",
      weight: 25,
      description:
        "Om roboten får sitta på dina fönster. Det här är den fråga som oftast gör att köpet inte fungerar, och svaren skiljer sig mer än man tror: en modell förbjuder uttryckligen båglöst glas, en annan tillåter det men kräver tio centimeters marginal till kanten. Minsta fönsterstorlek avgör om spröjsade rutor går att putsa alls, och minsta glastjocklek utesluter tunna rutor och speglar. Kriteriet väger både vad roboten klarar och hur tydligt tillverkaren skriver ut det.",
    },
    {
      key: "rengoring",
      label: "Rengöringsresultat",
      weight: 20,
      description:
        "Hur rent fönstret blir och hur roboten går till väga. Sugkraften i pascal avgör vidhäftningen snarare än rengöringen, och det som skiljer i resultat är i stället hur vattnet fördelas: sprejmunstycken som fuktar glaset framför duken ger jämnare resultat än en förfuktad duk som torkar under passet. Kanter och hörn är kategorins svaga punkt eftersom chassit inte når hela vägen ut, och det är där skillnaden mellan modellerna syns tydligast.",
    },
    {
      key: "hantering",
      label: "Hantering och ljud",
      weight: 15,
      description:
        "Vad det innebär att använda den. Roboten ska lyftas upp mot rutan, sladden ska dras och linan ska fästas i något som håller, och en tung robot är obekvämare att hålla mot ett fönster med en arm. Ljudnivån väger in eftersom apparaten sitter på rutan i samma rum som du, ofta i tjugo minuter per fönster. Appstyrning och fjärrkontroll räknas här snarare än under säkerhet, eftersom de handlar om bekvämlighet och inte om vad som håller roboten uppe.",
    },
    {
      key: "prisvarde",
      label: "Pris och värde",
      weight: 10,
      description:
        "Vad du får för pengarna. Spannet är 2 190 till 6 026 kronor, alltså knappt tre gånger, och sambandet mellan pris och publicerad säkerhet är svagt: den billigaste roboten i jämförelsen anger längst hålltid vid strömavbrott. Här väger också in att samma modell kan skilja mer än tusen kronor mellan svenska butiker, vilket är ovanligt mycket i en kategori med så få återförsäljare.",
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
    "Sidan rankar bara radiatortermostater, alltså de som skruvas på ventilen på ett vattenburet element. Rumstermostater för elvärme, infraröd styrning av luftvärmepump och framledningsstyrning är andra produkter som löser andra problem, och de förklaras i köpguiden i stället för att blandas in i en rankning. Kategorins svåraste problem är att besparingsprocenten inte går att jämföra: Fibaro anger 42 procent med fotnoten att det bygger på tillverkarens egen forskning, Netatmo 37, Danfoss 30 på sin egen sida och 23 i butikstexten, tado 28, och Aqara ingen siffra alls. Ljud & Bild, som är den enda svenska redaktion som haft produkterna i handen, avstår från att ange ett tal och skriver att det skulle kräva ett test under mycket lång tid. Stiftung Warentest provade elva modeller i labb och lägger besparingsavsnittet bakom betalvägg. Vi har därför läst tados grundkälla i original, Fraunhofer IBP-Report 579 E, och redovisar vad den faktiskt är: en simulering med münchenklimat, med spannet 12 till 28 procent, beställd av tado. Ingen procentsats påverkar något betyg. Vi har inte skruvat på någon termostat, inte mätt någon förbrukning och inte jämfört någon elräkning. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "kravs",
      label: "Krävs utöver termostaten",
      weight: 25,
      description:
        "Vad du behöver köpa till för att termostaten ska göra det kategorin lovar, alltså styra värmen även när du inte står bredvid elementet. Det är kategorins dolda prislapp, och Ljud & Bild ägnar hela sitt prisstycke åt just den: en termostat för 559 kronor kostar inte 559 kronor om den behöver en Matter Border Router du inte har. Skalan belönar den som klarar sig med en hubb du kanske redan äger, eller med vilken tredjepartshubb som helst i en öppen standard, och sänker den som kräver tillverkarens egen brygga och därtill ett abonnemang för de funktioner som är hela poängen. En produkt som inte behöver någonting alls men heller inte går att nå hemifrån får inte full poäng: den har inte tagit bort kostnaden utan funktionen.",
    },
    {
      key: "ventil",
      label: "Angiven ventilpassning",
      weight: 25,
      description:
        "Om tillverkaren publicerar vilka ventiler termostaten passar på. Radiatortermostaten skruvas på den befintliga ventilen, och passar den inte fungerar ingenting, vilket inte går att se på en produktbild. Fem nivåer: högst betyg till den som namnger varje adapter och dessutom skiljer på vad som ingår och vad som kostar extra, eller skriver ut vad som inte fungerar. Därefter den som namnger adaptrarna, den som namnger två fattningar, den som anger en gänga och säger de flesta om resten, och lägst den som bara anger ett procenttal eller en mängd olika tillverkare. Kriteriet mäter vad du kan kontrollera före köpet, inte hur bra termostaten sitter, och den skillnaden är avsiktlig: en uppgift du kan slå upp är värd mer än ett löfte du får tro på.",
    },
    {
      key: "oberoende",
      label: "Oberoende av tillverkaren",
      weight: 20,
      description:
        "Vad som fortsätter fungera om appen stängs, kontot försvinner eller avgiften höjs. Eve anger i klartext att produkten varken har konto, moln eller abonnemang. En Zigbee-termostat som talar med vilken hubb som helst lever vidare oberoende av vad märket bestämmer, medan en molnbunden termostat slutar vara smart samma dag som servern gör det. Här väger också in om ett abonnemang krävs för de funktioner som säljer produkten: tado flyttade sina automatiska funktioner till den årliga tjänsten Auto-Assist, och Ljud & Bilds testare kallar den lösningen den enda riktiga bromsklossen.",
    },
    {
      key: "provning",
      label: "Omdöme i publicerade provningar",
      weight: 15,
      description:
        "Vad de som faktiskt haft produkten i handen kommit fram till. Två redaktioner täcker kategorin. Ljud & Bild har provat fyra av modellerna här och publicerar sina omdömen öppet, så de väger tyngst. Stiftung Warentest har labbprovat elva radiatortermostater men lägger betygen bakom betalvägg, och där krediterar vi enbart att modellen genomgått en oberoende labbprovning, aldrig hur den klarade sig, eftersom vi inte har läst resultatet. En modell som ingen redaktion provat får ingen poäng alls på raden, och vikten fördelas då om över de övriga kriterierna i stället för att dra ner betyget. Vi väger aldrig in ett omdöme om en tidigare generation: Warentests test från 2023 gäller tados V3+, inte X-serien vi rankar.",
    },
    {
      key: "prisvarde",
      label: "Pris och värde",
      weight: 15,
      description:
        "Vad tre rum kostar, inte vad en termostat kostar. Spannet på en enda enhet är 361 till 1 229 kronor, alltså 3,4 gånger, för produkter som gör samma sak på samma ventil, och styckpriset döljer nästan alltid något. En billig Zigbee-termostat behöver en hubb, ett startpaket innehåller en brygga du bara behöver en av, och en prenumeration återkommer varje år. Vi räknar därför med det som krävs för att komma igång i tre rum, vilket är den vanligaste utbyggnaden och den Ljud & Bild själva utgår från.",
    },
  ],
};

export const SMART_HEM_HUBB: TestPage = {
  slug: "smart-hem-hubb",
  label: "Smart hem-hubb",
  title: "Smart hem-hubb bäst i test 2026: tre olika produkter på samma hylla",
  category: SMART_HEM,
  methodology:
    "Kategorin skiljer sig från allt annat vi jämför genom att hyllan blandar tre produkter som löser olika problem under samma ord. En märkesbrygga talar bara med sitt eget märke, en Matter-controller kan lägga till andra tillverkares enheter, och en universell hubb talar varje radio. Vi har läst varje tillverkares egen beskrivning och klassificerat sorten därifrån, inte ur butikens rubrik, och där en tillverkare inte beskriver räckvidden står det som saknad uppgift i stället för att gissas. Detsamma gäller frågan om hubben fungerar utan internet: tre tillverkare säger uttryckligen ja och resten säger ingenting, vilket inte är samma sak som nej. Priser och kundbetyg är lästa på butikens egen produktsida och daterade. Vi har inte kopplat in någon hubb, inte dragit ur någon internetkabel och inte mätt någon räckvidd. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "rackvidd",
      label: "Räckvidd och protokoll",
      weight: 30,
      description:
        "Hur mycket av hemmet hubben faktiskt når, vilket är det enda som avgör om den löser problemet du köpte den för. Två saker väger: vilka radior den talar, och om den kan styra andra tillverkares produkter eller bara sina egna. Skillnaden är större än priset antyder. En brygga för 899 kronor styr ett enda märke, en Matter-controller i samma prisklass kan lägga till andra tillverkares Matter-enheter, och en universell hubb talar Zigbee, Z-Wave, Thread, Bluetooth, infraröd och 433 MHz. Har du redan enheter i huset är det den här raden som avgör om de går att samla, och inget annat på sidan spelar då någon roll.",
    },
    {
      key: "oberoende",
      label: "Oberoende av moln och tillverkare",
      weight: 25,
      description:
        "Om hemmet fortsätter fungera när internet ligger nere, och vem som bestämmer hur länge produkten lever. En hubb är navet: slutar den fungera slutar allt som hänger på den att fungera. Homey Pro, Home Assistant Green och Aqara M100 anger uttryckligen att automationer körs lokalt utan internet. De övriga säger ingenting om saken, vilket inte betyder att de inte gör det men betyder att du inte kan veta i förväg. Här väger också in om ett abonnemang krävs för grundfunktionerna, och om plattformen är öppen nog att någon annan kan hålla den vid liv om tillverkaren tröttnar.",
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
 * Kategorin har ett fynd som ingen svensk jämförelse nämner: **talet alla
 * jämför är inte jämförbart**. Wood's anger kapacitet och effekt vid 30 ºC och
 * 80 % RH, Meaco anger effekten vid 20 °C och 60 % RH men säger inte ett ord
 * om vid vilka villkor literantalet i modellnamnet gäller, och Clas Ohlsons
 * egna, eeese, Xiaomi och Duux anger inga villkor alls. Clas Ohlson publicerar
 * dessutom **båda talen för samma apparat**: Wood's LD40 avfuktar 7,5 liter per
 * dygn vid 20 °C och 70 % RF och 13 liter vid 30 °C och 80 % RF.
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
 * är enda riktiga provningen och den täcker två av nio rankade produkter.
 */
export const AVFUKTARE: TestPage = {
  slug: "avfuktare",
  label: "Avfuktare",
  title: "Avfuktare bäst i test 2026: literantalet på kartongen går inte att jämföra",
  category: HEM_HUSHALL,
  methodology:
    "Kategorins svåraste problem är att kapacitetstalet i liter per dygn saknar gemensam grund. Wood's anger sina tal vid 30 grader och 80 procent relativ fuktighet, Meaco anger effekten vid 20 grader och 60 procent men inget om literantalet, och Clas Ohlsons egna apparater, eeese, Xiaomi och Duux anger inga villkor alls. Vi har därför läst varje uppgift på tillverkarens eller butikens egen sida, skrivit ut vilken grund den vilar på, och gjort själva redovisningen till ett kriterium. Den enda riktiga provningen i Europa är brittiska Which?, som Stiftung Warentest publicerar och håller uppdaterad, och den provar vid 21 grader och kallare och mäter elen per uppsamlad liter vatten i stället för per timme. Där Which? har ett omdöme väger det tyngst när avfuktningspoängen sätts, och där det saknas står det utskrivet. Vi har inte mätt avfuktning, inte vägt uppsamlat vatten och inte provat någon apparat. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "avfuktning",
      label: "Avfuktning i praktiken",
      weight: 25,
      description:
        "Hur mycket vatten apparaten faktiskt tar ur luften i ett svenskt hem, inte hur mycket den tar vid 30 grader. Där brittiska Which? har provat modellen väger deras omdöme tyngst, eftersom de mäter vid 21 grader och kallare. Av de nio rankade är två provade, Meaco Arete One 12L och 25L, och för de sju övriga bygger poängen på tillverkarens egna tal tillsammans med den grund talen vilar på. Ett högt literantal utan angivna villkor väger lättare än ett lägre tal som går att kontrollera.",
    },
    {
      key: "kyla",
      label: "Drift i kyla",
      weight: 20,
      description:
        "Vid vilken temperatur apparaten slutar fungera, och vad den gör åt isbildningen dessförinnan. Det här är den svenska halvan av problemet: en kondensavfuktare arbetar genom att kyla luft under daggpunkten, och ju kallare luften är desto mindre vatten finns det att fälla ut. Källare, garage och krypgrund ligger långt under de 30 grader talen är uppmätta vid. Skalan följer angivet temperaturintervall och förekomsten av avfrostning, med tillägg där Which? uttryckligen skriver att apparaten fungerar bra i kyla.",
    },
    {
      key: "energi",
      label: "Energi per liter",
      weight: 20,
      description:
        "Vad det kostar att få ut en liter vatten, inte vad apparaten drar i timmen. Which? räknar just så och förklarar varför: drifttiden för samma vattenmängd kan skilja dubbelt mellan två apparater, så watt per timme säger ingenting utan literantalet bredvid. Vi delar deklarerad effekt med deklarerad kapacitet och skriver ut vilken grund varje tal vilar på, eftersom kvoten ärver samma jämförbarhetsproblem som talen den bygger på.",
    },
    {
      key: "redovisning",
      label: "Öppen redovisning",
      weight: 15,
      description:
        "Om tillverkaren skriver ut vid vilka villkor talen gäller. Det här kriteriet mäter inte apparaten utan vad du får veta om den, och det är det enda vi kan kontrollera själva, påstående för påstående. Skalan är 5,0 när både kapacitet och effekt anges vid namngivna villkor och mer än en punkt redovisas, 4,0 vid en namngiven punkt för båda talen, 3,0 när bara effekten har villkor, 2,0 vid en vag reservation i löptext och 1,0 när inga villkor alls anges.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 20,
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
        "Det svenska kriteriet. Ljud & Bild provade fyra robotar i mellanklassen och skriver att nordiska trösklar var en av de största utmaningarna i hela grupptestet, där en robot fick ge upp helt. Att både Roborock och Dreame säljer en tröskelramp som tillbehör, för 330 respektive 199 kronor, säger samma sak från andra hållet. Skalan följer angiven passerhöjd tillsammans med hur roboten tar sig över: ett chassi som lyfter sig klarar mer än hjul som bara rullar på. Ett förbehåll som hör hit: passerhöjden i millimeter kommer från tillverkaren själv, ingen anger provmetod, och talet är därför en uppgift och inte en mätning. Mät din högsta tröskel innan du väljer.",
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
    "Kategorin har något nästan ingen annan av våra har: en riktig provning på ett oberoende institut. Länsförsäkringars Forskningsfond bekostade den, RISE utförde den, och åtta vattenfelsbrytare provades mot SP-Metod 5314. I första omgången klarade sig ingen. Tillverkarna fick tid att åtgärda, och därefter godkändes två. Den provningen är fyra år gammal och vi återger den som det den är, ett utfall från 2022 och inte ett läge i dag. Sedan dess har regelverket flyttat sig: Branschregler Säker Vatteninstallation 2026:1 gäller sedan 1 januari 2026 och kräver typgodkännande enligt certifieringsregeln CR 139, som omfattar läckagebrytare, vattenfelsbrytare och vattenlarm. Vi har läst branschreglerna och det officiella ändringsdokumentet i original, med paragrafnummer, och citerar aldrig en butiks återgivning av dem. Betyget för dokumenterat typgodkännande mäter vad tillverkaren själv publicerar, eftersom RISE eget register inte går att läsa. Ett lågt betyg betyder att inget certifikatnummer anges, aldrig att produkten underkänts. Priser och lagerstatus är lästa på butikernas egna produktsidor och daterade, och eftersom ingen butik för hela sortimentet står källan utskriven per produkt. Vi har inte installerat, provat eller läckagetestat en enda av dem.",
  criteria: [
    {
      key: "typgodkannande",
      label: "Dokumenterat typgodkännande",
      weight: 30,
      description:
        "Om tillverkaren själv publicerar att produkten är typgodkänd, och mot vilken provmetod. Det här är kategorins enda publicerade måttstock, och sedan 1 januari 2026 är den dessutom det branschreglerna hänvisar till för aktivt skydd i kök. Skalan mäter vad en köpare kan kontrollera före köp: 5,0 när produkten namnges som godkänd i en oberoende källa eller tillverkaren anger certifikatnummer, 3,0 när tillverkaren skriver att produkten uppfyller metoden utan att ange nummer eller intyg, och 1,5 när ingen uppgift alls går att hitta. Ett lågt betyg betyder att ingenting publiceras, inte att produkten provats och underkänts. Den skillnaden är avgörande: RISE register går inte att läsa utifrån, så vi uttalar oss aldrig om frånvaro.",
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
  title: "USB-C-laddare bäst i test 2026: tretton väggladdare från 179 till 1 699 kr",
  category: ELEKTRONIK,
  methodology:
    "Vi har läst direktiv (EU) 2022/2380 om den gemensamma laddaren i original på EUR-Lex, och det visade sig reglera något annat än vad kategorin påstår: kraven gäller apparaten, alltså telefonen, plattan och sedan den 28 april 2026 även den bärbara datorn, inte den fristående laddaren. En laddare är därför den enda delen av kedjan som ingen myndighet ställt krav på, och varje wattal på en kartong är tillverkarens eget påstående. Rankningen bygger på vad tillverkaren och butiken publicerar om just den modellen, läst på produktsidan och daterad. Belgiska Testaankoop har labbprovat runt 40 universella USB-C-nätaggregat i tre effektklasser, publicerat 2026-04-14 och refererat av Stiftung Warentest i maj; deras mätningar används i köpguiden för att förklara vad talen betyder, men de blir ingen betygskolumn, eftersom ingen av de nio modeller de namnger med poäng säljs av de butiker vi jämför. Att låna ett provresultat från en modell till en annan vore en påhittad mätning. Vi har inte mätt en enda laddare själva och påstår aldrig något annat. Där en uppgift som effektfördelning mellan portarna inte publiceras räknas det som en brist i betyget för öppen redovisning, eftersom konsekvensen av att inte veta bärs av dig och inte av oss. Priser och kundbetyg är lästa på butikens egen produktsida 2026-08-05. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "effektdelning",
      label: "Effekt och effektdelning",
      weight: 30,
      description:
        "Vad laddaren ger på en port, och vad som händer med den effekten när du sätter i en enhet till. Det är kategorins mest missförstådda tal, eftersom siffran på kartongen nästan alltid är summan över alla portar och inte vad någon enskild enhet får. Testaankoop mätte att den första porten alltid ger mer än den andra, och att den andra porten som mest gav 48 W i hela fältet. En laddare märkt 65 W kan alltså ge 45 W till datorn och 20 W till telefonen när båda sitter i, vilket är skillnaden mellan att datorn laddar och att den laddar ur långsammare. Tyngst väger att effekten per port är publicerad, att den högsta porten räcker till en laptop, och att den andra porten inte kollapsar när den används. Ugreen publicerar hela fördelningstabellen på produktsidan; Linocell hänvisar till manualen under support.",
    },
    {
      key: "prisvarde",
      label: "Pris per watt",
      weight: 25,
      description:
        "Vad effekten kostar, räknat som kronor per watt märkeffekt. Måttet finns här för att rankningen är en enda lista över allt från en 20-wattsladdare för 199 kronor till en 200-wattsstation för 1 699, och utan normalisering hade den största laddaren vunnit på konstruktion i stället för på förtjänst. Spannet är stort och följer inte priset: den billigaste laddaren i jämförelsen kostar knappt fyra kronor per watt och den dyraste per watt nästan elva. Här väger också in vad som ligger i kartongen. Testaankoop noterade att kabeln nästan aldrig ingår och att en USB-C-kabel i deras urval kostade i snitt 19,95 euro, alltså en fjärdedel av laddarens snittpris ovanpå. En laddare som är fem procent dyrare men levereras med kabeln är billigare.",
    },
    {
      key: "storlek",
      label: "Storlek och plats i uttaget",
      weight: 20,
      description:
        "Hur stor laddaren är i förhållande till effekten, och om den låter dig använda uttaget bredvid. Det är hela skälet till att galliumnitrid finns: en GaN-laddare behöver färre komponenter och mindre höjd för värmen, och blir därför mindre vid samma effekt. Skillnaden är verklig och stor, från 50 gram till 280 i den här jämförelsen. Testaankoop underkände flera modeller på just den här punkten, däribland Amazon Basics prisvinnare, för att de blockerar grannuttaget när de sitter i ett grenuttag. Det är samma iakttagelse som vi gjorde om breda smarta pluggar, och den irriterar alla som råkat ut för den. En laddare som tar två platser i grenuttaget vid skrivbordet är en sämre laddare även om den laddar lika snabbt.",
    },
    {
      key: "redovisning",
      label: "Öppen redovisning",
      weight: 15,
      description:
        "Hur mycket du får veta innan du köper, vilket i den här kategorin skiljer sig mer än produkterna gör. Här väger in om effekten står utskriven vid varje port, om fördelningen mellan portarna publiceras, om mått och vikt anges, och om tomgångsförbrukningen redovisas trots att den bara krävs i den tekniska dokumentationen. Testaankoop underkände Apple rakt av på den här punkten, eftersom inget anges vid portarna och höljet är för stort för effekten, och utsåg Belkins märkning till testets bästa, medan IKEA:s prisvinnare hade fel märkning på sina portar. Bland laddarna här är Samsung ensam om att publicera ett tal för standby. En uppgift som inte går att kontrollera räknas som en brist, aldrig som ett neutralt tomrum.",
    },
    {
      key: "protokoll",
      label: "Protokoll och kompatibilitet",
      weight: 10,
      description:
        "Vilka laddprotokoll laddaren talar, vilket avgör om din enhet får full fart eller bara ström. USB Power Delivery är det protokoll direktivet pekar ut, och det som gäller: alla laddare i Testaankoops fält stödde PD 3.0, men bara en enda av runt fyrtio stödde PD 3.1, som krävs för de högsta effekterna över 100 W. PPS spelar roll för Samsung och en del Android-telefoner, eftersom det låter laddaren finjustera spänningen i små steg i stället för att hoppa mellan fasta nivåer. Vikten är avsiktligt låg, av två skäl: skillnaderna är mindre än marknadsföringen antyder när alla klarar PD 3.0, och en PD 3.1-märkning i svensk handel är ett påstående ingen oberoende part kontrollerat. Vi betygsätter vad som är publicerat, inte vad som är verifierat, och säger det rakt ut.",
    },
  ],
};

export const NYCKELSKAP: TestPage = {
  slug: "nyckelskap",
  label: "Nyckelskåp",
  title: "Nyckelskåp bäst i test 2026: fem boxar med kod till ytterdörrsnyckeln",
  category: SAKERHET,
  methodology:
    "Fyra av produkterna i kategorin har provats av RISE på uppdrag av Villaägarnas Riksförbund, rapport P115210 från 2022, med provmetoden SS-EN 1630:2021 på nivåerna RC2 och RC3. Två av dem säljs fortfarande här och rankas nedan. Vi har läst rapporten i sin helhet och skrivit av tiderna per angreppspunkt, och vi har bekräftat mot rapportens egna foton att det skåp som provades är den mekaniska ABUS KeyGarage 787 och inte den elektroniska Smart-BT-modellen, eftersom de är olika produkter med samma nummer. Provresultaten väger in i betygen för infästning och för lucka och lås, men bara för de två modeller som har ett eget resultat i rapporten. Övriga tre bedöms på publicerad konstruktion, alltså gods, infästningens utförande och låstyp, och de får aldrig ett lånat provresultat från en systermodell. Skåpen är inte klassade enligt RC2 eller RC3: standarden omfattar dörrar och fönster, och RISE valde den för att kunna simulera ett standardiserat inbrottsförsök. Där en uppgift som väderskydd inte går att fastställa räknas det som en brist i betyget, eftersom en okontrollerbar egenskap är sämre för dig än en kontrollerbar. Priser och kundbetyg är lästa på butikens egen produktsida och daterade. Vi har inte brutit upp ett enda skåp. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
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
        "Om skåpet klarar att sitta ute året om, och om koden går att använda i februari. Ett nyckelskåp sitter nästan alltid utomhus, och det som slutar fungera först är sällan stålet utan mekaniken bakom sifferhjulen och batteriet bakom en knappsats. Ett skåp med IP-klass och ett angivet temperaturspann går att kontrollera mot verkligheten där du bor. Ett där uppgiften är okänd får du prova dig fram med, och det räknas som en brist här, eftersom konsekvensen bärs av dig och inte av oss. Ett skåp som bara är avsett för skyddat läge under tak är inte sämre, men det begränsar var det får sitta, och det är värt att veta innan du borrar.",
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
  title: "Garageportsöppnare bäst i test 2026: sex motorer, och talet på kartongen",
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
      key: "redovisning",
      label: "Öppen redovisning",
      weight: 25,
      description:
        "Hur mycket du kan ta reda på innan du köper, och om butiken och manualen säger samma sak. Kategorin är ovanligt spretig här. Bauhaus anger dragkraft i newton, portyta i kvadratmeter, portvikt i kilo och standbyförbrukning på samma sida. Jula anger vridmoment i newtonmeter under rubriken vridmoment, vilket stämmer för den ena öppnaren och inte för den andra, där manualens egen försäkran säger newton. Clas Ohlson anger ingen teknisk uppgift alls om produkten, bara förpackningens mått. Här väger också in vilka standarder tillverkaren åberopar i sin försäkran om överensstämmelse, eftersom det är det enda kontrollerbara påstående som finns om produktens säkerhet: Julas 377011 åberopar EN 12453, EN 13241, EN 12635 och EN ISO 12100, medan Boxers åberopar tre direktiv varav två var upphävda när dokumentet undertecknades. Det gör inte den ena öppnaren säkrare än den andra. Det gör den ena kontrollerbar.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 15,
      description:
        "Vad du får för pengarna, mätt mot vad de andra kostar för samma sak. Spannet i den här jämförelsen är stort, från 499 kronor till över 3 000, och skillnaden i pris följer inte skillnaden i förmåga särskilt väl. Här väger in vad som ingår i lådan, alltså antal fjärrkontroller, skena, beslag och nödutlösning, eftersom en öppnare som kräver tillbehör för att bli komplett kostar mer än prislappen. Kundbetyg från butiken visas i tabellen men vägs aldrig in, eftersom betyg från olika butiker inte är jämförbara.",
    },
    {
      key: "drift",
      label: "Drift och hållbarhet",
      weight: 5,
      description:
        "Vad öppnaren drar när den står still, hur fort den går och hur länge garantin gäller. Standbyförbrukningen är den post som kostar pengar, eftersom en portöppnare står strömsatt dygnet runt och används några minuter om dagen. Bauhaus anger 8 watt för Boxer, vilket blir omkring 70 kilowattimmar om året. Kriteriet väger lätt eftersom uppgiften saknas hos de flesta och eftersom skillnaderna i praktiken är små jämfört med vad de andra kriterierna avgör.",
    },
  ],
};

export const USB_C_KABEL: TestPage = {
  slug: "usb-c-kabel",
  label: "USB-C-kabel",
  title: "USB-C-kabel bäst i test 2026: tretton kablar från 59 till 1 099 kr",
  category: ELEKTRONIK,
  methodology:
    "Kontakten ser likadan ut i båda ändar av kategorin, och det är hela problemet: två kablar som inte går att skilja åt på hyllan kan skilja 83 gånger i datahastighet och fyra gånger i effekt. Vi har därför byggt rankningen på vad säljaren publicerar om just den kabeln, läst på produktsidan och daterat. Direktiv (EU) 2022/2380 är läst i original på EUR-Lex, och det namnger kabelstandarden EN IEC 62680-1-3:2021 i svensk lagtext utan att ställa ett enda krav på kabeln du köper: skyldigheten ligger på apparaten, som ska kunna laddas med en kabel som uppfyller standarden. Varje tal på en kabelförpackning är alltså tillverkarens eget påstående. Den enda oberoende provning som finns i kategorin är Testfaktas, där tyska PZT böjde tolv laddkablar 5 000 gånger med en publicerad metod, publicerad i februari 2020. Den bär köpguiden och förklarar varför en kabel går sönder, men den blir ingen betygskolumn: samtliga sex USB-C-kablar där är USB-A-formen, och den här sidan rankar bara USB-C till USB-C. Att låna ett provresultat från en kabelform till en annan vore en påhittad mätning. Tillverkarnas egna böjtal betygsätts inte heller, eftersom ingen av dem publicerar en metod och samma tillverkare anger allt från 5 000 till 300 000 böjningar för olika produkter. Priserna jämförs per meter, eftersom modellerna säljs i allt från 0,3 till 3 meter och den korta kabeln annars vinner på att vara kort. Vi har inte mätt en enda kabel själva och påstår aldrig något annat. Priser och kundbetyg är lästa på butikens egen produktsida 2026-08-05. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "datahastighet",
      label: "Datahastighet och skärmstöd",
      weight: 30,
      description:
        "Hur snabbt kabeln flyttar data, och om den kan driva en skärm. Det här är den egenskap som skiljer kategorin mest och som syns minst, eftersom kontakten är identisk oavsett vad som sitter inuti. En USB-C-kontakt har 24 stift, en USB 2.0-kontakt fyra, och en tillverkare som vill spara kopplar helt enkelt inte de åtta ledarna för de snabba datakanalerna. Spannet i den här jämförelsen går från 480 megabit i sekunden till 40 gigabit, alltså 83 gånger, och priset förutsäger det inte: hos Kjell kostar en kabel som anger 480 Mb/s 299,90 kronor medan en som anger 40 Gbps kostar 329. Skärmstödet ligger i samma kriterium och inte i en egen kolumn, av den enkla anledningen att en kabel som stannar på 480 Mb/s saknar de ledarpar DisplayPort Alt Mode behöver. Högst betyg får den som når 40 Gbps och driver 8K, lägst den som bara laddar. För den som enbart laddar en telefon spelar skillnaden ingen roll, och det står i köpguiden.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde per meter",
      weight: 25,
      description:
        "Vad kabeln kostar per meter, vilket är det enda sättet att jämföra en rankning där modellerna säljs i 0,3 till 3 meter. Utan normaliseringen hade den kortaste kabeln vunnit på att vara kort, och en tremeterskabel förlorat på att räcka längre. Spannet är stort och följer inte kvaliteten: 39 kronor per meter i botten och 550 i toppen, alltså fjorton gånger, medan datahastigheten i toppen ibland är den samma som i botten. Måttet är också det som gör en tremeterskabel rättvisa, och längd är den egenskap köpare oftast underskattar. Kabeln som följde med telefonen är typiskt en meter, vilket räcker till ett nattduksbord och inte till en soffa. Här väger inte in vad kabeln klarar, det gör de andra kriterierna, utan bara vad metern kostar.",
    },
    {
      key: "effekt",
      label: "Effekt och e-marker",
      weight: 20,
      description:
        "Hur mycket ström kabeln får släppa fram, och om den har det chip som krävs för att säga det. En USB-C-kabel utan e-marker klarar 3 ampere, alltså omkring 60 watt, oavsett hur stark laddaren är, eftersom laddaren håller igen när kabeln inte kan uppge vad den tål. Över 60 watt måste kabeln bära ett e-markerchip, och för 240 watt krävs Extended Power Range och USB PD 3.1, alltså 48 volt och 5 ampere. Det är den vanligaste orsaken till att en dyr laddare laddar långsamt, och den syns inte på kabeln. Här väger både märkeffekten och om e-markern är utskriven: Delock anger chipset e-marker rakt ut i specifikationen, medan flera kablar som säljs som 240 watt inte nämner ordet någonstans. En 60-wattskabel är inte sämre än en 240-watts för en telefon, men den är en annan produkt än vad priset ibland antyder.",
    },
    {
      key: "redovisning",
      label: "Öppen redovisning",
      weight: 15,
      description:
        "Hur mycket du får veta innan du köper, vilket i den här kategorin skiljer sig mer än kablarna gör. Här väger in om datahastigheten anges med ett tal, om e-markern nämns, om USB-IF-certifiering och effekt står utskrivna, och om säljaren skriver ut vad kabeln inte klarar. Skillnaderna är stora och följer inte priset. Clas Ohlsons egen kabel anger USB 2.0, 480 Mbps, spänningsstegen för både PD 3.1 och PD 3.0 och att den är certifierad av USB-IF. Elgigantens husmärke lägger både certifieringen och 480 Mbps i själva produktnamnet och skriver dessutom ut att kabeln inte stöder USB 3.0, 4K, 8K eller Thunderbolt. Amazons specifikationstabell för en av de mest sålda kablarna anger i stället datahastigheten i gigabyte per sekund, vilket är en omöjlig enhet. En uppgift som inte går att kontrollera räknas som en brist, aldrig som ett neutralt tomrum, eftersom det är du och inte vi som får leva med att kabeln inte gör det du trodde.",
    },
    {
      key: "konstruktion",
      label: "Konstruktion och längdutbud",
      weight: 10,
      description:
        "Vad kabeln är klädd i och i vilka längder modellen finns. Materialet står här därför att det är där kablar faktiskt går sönder: när PZT böjde tolv laddkablar åt Testfakta var skadan i samtliga fall ett sprucket eller missfärgat kabelhölje vid dragavlastningen, inte ett brott i ledarna. Flätad nylon och silikon står emot den påfrestningen bättre än slät plast, och det syns på butikens egen produktbild. Längdutbudet väger in därför att en modell som bara finns i en meter inte löser problemet för den som behöver tre, och att byta märke för att byta längd betyder att man börjar om med en okänd kabel. Vikten är avsiktligt låg. Tillverkarnas böjtal betygsätts inte alls: ingen publicerar en metod, och samma tillverkare anger allt mellan 5 000 och 300 000 böjningar för olika produkter i sitt eget sortiment.",
    },
  ],
};

/**
 * Smart garageportsöppnare.
 *
 * Systersida till GARAGEPORTSOPPNARE, beslutad av användaren 2026-08-05. Den
 * här sidan rankar modulerna som kopplas till en öppnare du redan har.
 *
 * ## Varför strömförsörjningen är ett eget kriterium
 *
 * De två billigaste modulerna, 374 och 384 kr, matas med 230 V och är
 * konstruerade för att sitta i en kopplingsdosa. De från 499 kr och uppåt går
 * på USB. Enligt Elsäkerhetsverket är en relämodul i den fasta installationen
 * arbete för registrerat elinstallationsföretag, och då är den billigaste
 * modulen inte längre billigast. Gränsen är utredd och rättad en gång på
 * /smart-strombrytare, och formuleringen är hämtad därifrån.
 *
 * ## ⚠️ Positionssensorn blev inget kriterium
 *
 * Utkastet byggde på att billiga reläer bara kan trycka på knappen medan dyra
 * också vet var porten står. Kontrollerat i butikernas egna texter föll den:
 * garageportsbrytarreläet på 374 kr anger "visning av styrenhetens aktuella
 * status (öppen/stängd)" och Tuya-modulen på 384 kr levereras med
 * öppningssensor för tungkontakt. Sensorn är standard i hela kategorin och
 * skiljer ingenting. Se .agent/research/smart-garageportsoppnare.md §3.
 *
 * ## ⚠️ Inget testomdömekriterium
 *
 * Ljud & Bilds Yale-test är kategorins enda oberoende provning och täcker en av
 * sex produkter. Samma bedömning som på /smart-strombrytare, där vikten sattes
 * efter hur mycket underlag kategorin faktiskt har och inte som en konstant.
 */
export const SMART_GARAGEPORTSOPPNARE: TestPage = {
  slug: "smart-garageportsoppnare",
  label: "Smart garageportsöppnare",
  title:
    "Smart garageportsöppnare bäst i test 2026: sex moduler till porten du redan har",
  category: SMART_HEM,
  methodology:
    "Sidan jämför moduler som kopplas till en garageportsöppnare du redan äger, inte motorer. Alla sex gör i grunden samma sak: de sluter en kontakt och härmar ett tryck på väggknappen. Kategorin saknar oberoende provning så när som på ett test, Ljud & Bilds genomgång av Yale Smart Opener, som täcker en av sex produkter. Det är för tunt för ett eget kriterium men det står som källa. Betygen bygger i övrigt på tillverkarnas och butikernas publicerade uppgifter om strömförsörjning, ekosystem, kontosäkerhet och kompatibilitet. Strömförsörjningen väger tungt därför att den avgör vad du får montera själv: en modul som matas med 230 V och ska sitta i en kopplingsdosa är enligt Elsäkerhetsverket en förändring av den fasta installationen och kräver registrerat elinstallationsföretag, medan en USB-matad modul är ett skruvmejseljobb. Där en uppgift om kryptering eller tvåstegsverifiering inte gått att fastställa räknas det som en brist under säkerhet, eftersom en produkt som öppnar ditt garage över internet bör gå att kontrollera innan du köper den. Priser, artikelnummer och kundbetyg är lästa på butikens egen produktsida och daterade. Vi har inte monterat en enda modul. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "installation",
      label: "Installation och behörighet",
      weight: 25,
      description:
        "Vad du får sätta upp själv, och vad som kräver att någon annan gör det. Skillnaden går rakt genom kategorin och den syns inte på prislappen. De två billigaste modulerna matas med 230 volt och är konstruerade för att sitta i en kopplingsdosa bakom väggknappen. Att lägga in en relämodul där är en förändring av den fasta installationen, och det kräver registrerat elinstallationsföretag. De dyrare modulerna går på USB eller matas från portöppnaren, och då handlar monteringen om två kablar och en skruvmejsel. Räknar du in en elektriker i priset ser kategorins prisordning helt annorlunda ut. Här väger också in hur mycket som ingår i lådan, alltså om sensor, kablar och fästen följer med eller köps separat.",
    },
    {
      key: "sakerhet",
      label: "Säkerhet och kontoskydd",
      weight: 25,
      description:
        "Vad som skyddar kontot som kan öppna ditt garage. En sådan här modul flyttar en dörr till ditt hus ut på internet, och då är kontot bakom appen lika mycket en nyckel som fjärrkontrollen i bilen. Tyngst väger tvåstegsverifiering, alltså att ett stulet lösenord inte räcker för att komma in, och därefter vad tillverkaren anger om kryptering av trafiken mellan telefon, modul och molntjänst. Här väger också in om modulen kan varna dig när porten öppnas, eftersom en avisering är det enda du har att gå på när du inte är hemma. Där uppgiften inte publiceras räknas det som en brist: en produkt du inte kan kontrollera före köpet är sämre för dig än en du kan, och konsekvensen bärs av dig.",
    },
    {
      key: "ekosystem",
      label: "Ekosystem och app",
      weight: 20,
      description:
        "Om modulen passar in i det du redan har hemma. De flesta som köper en sådan här produkt har redan valt sida mellan Apple, Google och Amazon, och en modul som inte pratar med rätt system blir en app till bland alla andra. Matter väger tyngst här, eftersom det är den enda uppkopplingen som fungerar över alla tre utan att tillverkaren behöver stödja dem var för sig. Apples ekosystem är det som oftast fattas: flera tillverkare säljer HomeKit-stödet som en egen artikel med ett eget artikelnummer, vilket betyder att du kan köpa fel modul utan att märka det förrän den är monterad. Här väger också in om en separat hubb krävs, eftersom en hubb är en extra kostnad och en extra sak som kan sluta fungera.",
    },
    {
      key: "kompatibilitet",
      label: "Kompatibilitet",
      weight: 15,
      description:
        "Om modulen fungerar med din portöppnare och din port. Alla modulerna här arbetar likadant: de sluter en potentialfri kontakt, alltså samma slutning som när du trycker på väggknappen. Det förutsätter att din öppnare har två skruvplintar för en sådan knapp, och det har de flesta men inte alla. Här väger också in vilka porttyper tillverkaren anger, alltså takskjutport, vipport eller båda, och hur många portar en enhet klarar. Där tillverkaren inte anger vilka öppnare modulen fungerar med räknas det som en brist, eftersom det är den enda fråga som avgör om produkten alls går att använda och du inte kan svara på den innan du köpt.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 15,
      description:
        "Vad du får för pengarna, mätt mot vad de andra kostar för samma sak. Spannet är stort, från 374 till 2 109 kronor för produkter som utför samma grundläggande handling. Här väger in vad som ingår i lådan och vad som måste köpas till. Det som väger allra tyngst är att en modul som kräver elinstallatör bär den kostnaden i sitt verkliga pris, även när den ser billigast ut i butikshyllan. Kundbetyg från butiken visas i tabellen men vägs aldrig in, eftersom betyg från olika butiker inte är jämförbara.",
    },
  ],
};

/**
 * Powerbank, vardagsklassen.
 *
 * Systersida till USB_C_LADDARE och USB_C_KABEL, vars avgränsning sköt
 * powerbanken hit. Delad på storlek efter användarbeslut 2026-08-05: den här
 * sidan rankar 5 000 till 10 000 mAh, alltså det som laddar en telefon och
 * ryms i en ficka. Den stora rese- och laptopklassen från 20 000 mAh får
 * `/powerbank-20000`. Stiftung Warentest delar sitt eget test på samma sätt.
 *
 * ## ⚠️ Inget testomdömekriterium
 *
 * Warentest 2/2026 provade 24 powerbanks och mätte uttagbar energi, men
 * resultaten per modell ligger bakom betalvägg på 4,90 euro som vi inte köpt.
 * Metoden och de öppna spannen bär köpguiden i stället. Samma lösning som
 * Testaankoop på /usb-c-laddare.
 *
 * ## Öppen redovisning väger 15 och straffar tystnad
 *
 * Användarbeslut 2026-08-05: en produkt som inte anger wattimmar dras ner,
 * eftersom konsekvensen bärs av köparen. Wh är den storhet Transportstyrelsen
 * reglerar efter, och den som bara får ett mAh-tal kan inte svara på om
 * powerbanken får följa med ombord. Samma konstruktion som Väderskydd på
 * /nyckelskap.
 */
export const POWERBANK: TestPage = {
  slug: "powerbank",
  label: "Powerbank",
  title: "Powerbank bäst i test 2026: åtta som laddar telefonen i fickan",
  category: ELEKTRONIK,
  methodology:
    "Sidan jämför powerbanks i den storlek som laddar en telefon och ryms i en ficka, alltså 5 000 till 10 000 mAh. Den större rese- och laptopklassen jämförs för sig. Kategorin har en riktig labbprovning, Stiftung Warentests test av 24 powerbanks i februari 2026, men resultaten per modell ligger bakom en betalvägg vi inte betalat, och därför finns inget kriterium för testomdöme. Det labbet slår fast i sitt öppna avsnitt är däremot avgörande för hur sidan är byggd: de marknadsförda mAh-talen är enligt dem av begränsat värde, och det som betyder något är uttagbar energi i wattimmar. Wattimmar är också den enhet Transportstyrelsen reglerar efter, med 100 Wh som gräns för vad som får följa med ombord utan flygbolagets godkännande. Vi har därför räknat hur många produkter som faktiskt anger talet, och av de åtta som rankas här gör två det. Där en produkt bara anger milliamperetimmar har vi låtit cellen stå tom i stället för att räkna om, eftersom cellspänningen varierar och de två tillverkare som faktiskt räknat anger olika wattimmar för samma nominella kapacitet. Att uppgiften saknas räknas som en brist under öppen redovisning, eftersom konsekvensen bärs av dig och inte av oss. Priser, artikelnummer och kundbetyg är lästa på butikens egen produktsida och daterade. Vi har inte laddat ur en enda powerbank. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "kapacitet",
      label: "Kapacitet och uttagbar energi",
      weight: 35,
      description:
        "Hur mycket ström som ryms, och hur mycket av den som når telefonen. Kapaciteten anges nästan alltid i milliamperetimmar, och det talet gäller cellen vid dess egen spänning på omkring 3,6 till 3,7 volt. Din telefon laddas vid 5 volt eller mer, och omvandlingen dit kostar energi. Det labb som mätt saken beskriver mAh-talet som av begränsat värde och pekar i stället på uttagbar energi i wattimmar, där spridningen mellan modeller i samma nominella klass visade sig vara stor. Här väger därför både det nominella talet och den publicerade wattimmen in, tillsammans med hur många laddningar av en normal telefon det räcker till i praktiken. En bank på 10 000 mAh landar runt 36 till 37 wattimmar, vilket i verkligheten blir ungefär två fulla telefonladdningar och inte de tre som kartongen ofta antyder.",
    },
    {
      key: "laddeffekt",
      label: "Laddeffekt och portar",
      weight: 20,
      description:
        "Hur fort den fyller telefonen, hur fort den själv fyller på, och hur många saker den klarar samtidigt. Effekten ut avgör om en halvtimme vid ett vägguttag ger dig en fjärdedel eller halva telefonen, och skillnaden mellan 12 och 30 watt märks varje gång du har bråttom. Lika viktig är effekten in, eftersom en powerbank som tar fyra timmar att ladda ofta står tom när du behöver den. Här väger också antalet portar in, om den kan ladda och laddas samtidigt, och om en kabel sitter fast i enheten så att du slipper komma ihåg en. Trådlös laddning räknas hit men väger lättare, eftersom den kostar mer energi i värme än sladden gör.",
    },
    {
      key: "redovisning",
      label: "Öppen redovisning",
      weight: 15,
      description:
        "Hur mycket du kan ta reda på innan du betalar. Spridningen är stor och den följer inte priset. I den storleksklass sidan rankar anger två av åtta produkter energiinnehållet i wattimmar, och tre saknar teknisk specifikation helt i butiken, trots att två av dem är de mest omdömda produkterna på hyllan. Wattimmen är inte en detalj för specialintresserade: det är den enhet Transportstyrelsen sätter sina gränser i, och den som bara har ett mAh-tal kan inte svara på om powerbanken får följa med ombord. Här väger också in om vikt, mått, laddtid och portar går att läsa före köpet. Att en uppgift saknas dras ner, eftersom en egenskap du inte kan kontrollera är sämre för dig än en du kan.",
    },
    {
      key: "format",
      label: "Format och vikt",
      weight: 15,
      description:
        "Om den följer med eller blir kvar hemma. En powerbank som ligger i byrålådan laddar ingenting, och vikten är det som avgör om den hamnar i fickan eller i väskan. Spannet i den här klassen är stort: från runt 130 gram för de tunnaste magnetiska till 200 gram för de tjockare, alltså mer än en halv telefon i skillnad. Här väger också formen in. En platt magnetisk bank som fäster på baksidan av telefonen används på ett annat sätt än en klumpig som kräver kabel, och en enhet med fast kabel slipper det vanligaste skälet till att en powerbank inte gör nytta, nämligen att sladden ligger hemma.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 15,
      description:
        "Vad du får för pengarna, mätt mot vad de andra kostar för samma sak. Spannet är brett i den här klassen, från under 150 kronor till nära 800 för produkter som rymmer lika mycket ström. Det som skiljer är laddeffekt, format och hur mycket du får veta, och de tre följer inte priset särskilt väl. Här väger också in vad som ingår, alltså om kabel medföljer eller sitter fast, eftersom en powerbank utan kabel kräver en kabel du kanske redan har eller kanske måste köpa. Kundbetyg från butiken visas i tabellen men vägs aldrig in, eftersom betyg från olika butiker inte är jämförbara.",
    },
  ],
};

/**
 * iPhone-skal.
 *
 * Fjärde sidan i Elektronik, byggd 2026-08-05.
 *
 * ## Varför fyra kriterier och inte fem
 *
 * Garanti föreslogs som femte kriterium och ströks av användaren innan
 * insamlingen började. Skälet höll: märkena anger två år, husmärkena ett, och
 * kolumnen hade skiljt produkterna åt på en axel ingen köper efter. Vikten
 * fördelades på de fyra som blev kvar, med konstruktionen tyngst efter
 * användarbeslut.
 *
 * ## ⚠️ Inget testomdömekriterium, och den här gången är kategorin helt tom
 *
 * Råd & Rön provar mobiler men inte skal. Testfakta har ingen provning. Stiftung
 * Warentest har provat vattentäta fodral och dykhus, alltså en annan produkt.
 * Det finns med andra ord ingen oberoende provning av skyddsskal över huvud
 * taget, och det står utskrivet på sidan enligt IDÉ-012. Samma läge som
 * /utomhustimer, /vattenlarm och /garageportsoppnare.
 *
 * ## ⚠️ Fallhöjden och militärstandarden betygsätts aldrig
 *
 * De ligger i ALDRIG_BEDOMD och bär kriteriet `redovisning`, inte ett eget
 * kriterium. Skälet är läst i original: MIL-STD-810H del ett §1.2 b säger att
 * det inte är giltigt att betrakta en metods provvillkor som oföränderliga, och
 * varje metod bär noten "Tailoring is essential". Två tal från två tillverkare
 * är därför inte jämförbara ens när båda anges. Samma beslut som `Angiven
 * besparing` på /smart-termostat och `Angivet böjtal` på /usb-c-kabel.
 */
export const IPHONE_SKAL: TestPage = {
  slug: "iphone-skal",
  label: "iPhone-skal",
  title: "iPhone-skal bäst i test 2026: tolv skal från 99 till 1 099 kr",
  category: ELEKTRONIK,
  methodology:
    "Sidan rankar skyddsskal till iPhone 17, 17 Pro, 17 Pro Max och Air. Ett skal passar exakt en modellstorlek, och iPhone 17 och 17 Pro delar skärmstorlek men inte skal, så varje rad säger vilka modeller skalet finns till och priset gäller genomgående 17 Pro-varianten. Plånboksfodral, skärmskydd och kameralinsskydd är en annan sorts köp och förklaras i köpguiden. Ingen har provat skyddsskal: Råd & Rön provar mobiler men inte skal, Testfakta har ingen provning, och Stiftung Warentests fallprov gäller vattentäta dykhus. Det finns alltså inget testomdöme att väga in, och vi har inte tappat en enda telefon själva. Det som återstår är dels vad du kan se på skalet, dels vad säljaren skriver ut om det, och de två väger 40 respektive 22. MIL-STD-810 är läst i original i tre utgåvor. Talen därifrån går inte att jämföra mellan tillverkare: del ett §1.2 b säger att det inte är giltigt att betrakta en metods provvillkor som oföränderliga, varje metod bär noten att anpassning är nödvändig, och tabell 516.8-IX tillåter att de 26 fallen delas på upp till fem exemplar. Underlaget är dessutom stål sedan 2014, medan plywooden som hela branschen beskriver hör till 2008 års utgåva. Därför betygsätts varken angiven fallhöjd eller angiven militärstandard som mätvärden. De väger in enbart genom hur mycket du får veta före köpet, vilket är något du kan kontrollera själv. Priser, artikelnummer och lagerstatus är lästa på butikens egen produktsida 2026-08-05. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "konstruktion",
      label: "Skydd du kan se",
      weight: 40,
      description:
        "Det skalet gör med telefonen när den träffar marken, bedömt på konstruktion i stället för på påståenden. Fyra saker väger: om kanten runt skärmen är förhöjd så att glaset inte tar i när telefonen landar på ansiktet, om kanten runt kameran är det så att linserna klarar att telefonen läggs ner på ett bord, om hörnen är förstärkta där energin faktiskt tas upp, och om knapparna är täckta eller lämnas öppna. Hörnen väger tyngst av dem. En telefon som faller landar nästan aldrig platt, och ett skal som bara är ett tunt lager plast över baksidan flyttar kraften rakt in i ramen. Ett hårt polykarbonatskal utan mjuk ram är därför sämre skydd än en hybrid som kombinerar en styv baksida med en TPU-kant, även när det hårda skalet känns mer robust i handen. Här väger också helheten: ett skal som täcker fyra sidor men lämnar kamerablocket i nivå med bordet skyddar det som kostar minst att laga. Vikten är sidans högsta därför att det är det här läsaren betalar för.",
    },
    {
      key: "redovisning",
      label: "Öppen redovisning av skydd",
      weight: 22,
      description:
        "Hur mycket du får veta om skyddet innan du betalar, vilket i den här kategorin skiljer mer än skalen gör. Spannet går från ingenting alls till en utgåva med metodnummer. Det som väger är om det finns ett tal, om det finns en standard, och om standarden är angiven så exakt att den går att slå upp. MIL-STD-810 är läst i original i tre utgåvor, och den säger själv varför den inte kan användas som ett jämförelsetal: varje metod ska anpassas till det som provas, provvillkoren får uttryckligen ändras, och de 26 fall som brukar citeras får delas på upp till fem exemplar. Underlaget är dessutom stål sedan den 15 april 2014, medan plywooden som varje förklaring i världen beskriver hör till utgåvan från 2008. Ett skal som anger 7,6 meter utan att namnge någon standard säger alltså mindre än det låter, och 7,6 meter är sex gånger den fallhöjd standarden föreskriver. Poängen här mäter inte hur bra skalet skyddar, för det vet ingen. Den mäter hur mycket av köpbeslutet du får ta själv i stället för på förtroende. En uppgift som saknas räknas som en brist, eftersom det är du som får leva med att skalet inte gjorde det du trodde.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 22,
      description:
        "Vad du får för pengarna, mätt mot vad samma skydd kostar någon annanstans i jämförelsen. Spannet är elva gånger, från 99 till 1 099 kronor, och det följer varken skyddet eller redovisningen. Ett hybridskal med förhöjda kanter, förstärkta hörn och magnetring kostar 269 kronor, och ett femlagersskal i kevlar kostar 1 099. Skillnaden i vad de gör är verklig men inte elva gånger. I andra änden finns skal för 99 kronor som skyddar mot repor i fickan och ingenting mer, och de är prisvärda för den som köper dem till det. Här väger också in vad som faktiskt ingår: en magnetring är den enda funktionen i kategorin som kostar pengar att lägga till i efterhand, eftersom ett skal utan magnet gör att laddaren, bilhållaren och plånboken slutar sitta fast. Ett billigt skal som tvingar fram ett andra köp är inte billigt.",
    },
    {
      key: "magnet",
      label: "Magnet och trådlös laddning",
      weight: 16,
      description:
        "Om skalet har en magnetring, och vad den ringen duger till. Det här är kategorins vanligaste förväxling och den kostar pengar: två skal från samma tillverkare kan heta nästan samma sak, se identiska ut och kosta 70 kronor isär, där det ena har magneter och det andra inte. Utan ring faller MagSafe-laddaren av, magnetplånboken sitter inte kvar och bilhållaren blir en klämma. Skillnaden syns inte på produktbilden. Här väger också om ringen sitter rätt, alltså om trådlös laddning fungerar genom skalet över huvud taget, och om tillverkaren skriver ut Qi2 eller bara nämner att skalet är magnetiskt. Orden är inte utbytbara: ett magnetiskt skal kan vara ett skal med en plåtbricka för en bilhållare, vilket sitter fast på en magnet men inte laddar. Vikten är kategorins lägsta av fyra därför att den som laddar med sladd inte behöver något av det, men för alla andra är det skillnaden mellan ett skal som fungerar med resten av tillbehören och ett som inte gör det.",
    },
  ],
};

/**
 * Powerbank, reseklassen.
 *
 * Systersida till POWERBANK. Delningen på storlek är ett användarbeslut
 * 2026-08-05, och Stiftung Warentest delar sitt eget test likadant. Den här
 * sidan rankar från 20 000 mAh och uppåt, alltså det som laddar en dator och
 * följer med på resa.
 *
 * ## ⚠️ Fyndet är det omvända mot vardagsklassen
 *
 * På /powerbank anger två av åtta produkter sitt energiinnehåll i wattimmar.
 * Här gör sju av nio det. Skälet är att taket på 100 Wh bara är i sikte i den
 * här storleken: en bank på 10 000 mAh kan omöjligt komma nära, en på 27 600
 * ligger 0,64 wattimmar under. Wattimmen publiceras när tillverkaren har ett
 * skäl att visa att produkten ryms under gränsen.
 *
 * ## ⚠️ Tre gånger 20 000 mAh ger tre olika wattimmar
 *
 * Linocell Premium anger 72 Wh, Anker Prime 72,36 Wh för 20 100 mAh, och Xtorm
 * 100 Wh. De två första är förenliga med varandra; den tredje är 39 procent
 * högre för samma nominella kapacitet. Vi påstår inte att någon har fel — vi
 * redovisar spridningen, som på /avfuktare och /garageportsoppnare. Talet är
 * butikens publicerade uppgift och inget annat.
 *
 * ## ⚠️ Inget testomdömekriterium
 *
 * Warentests resultat per modell ligger bakom betalvägg. Metod och de öppna
 * spannen bär köpguiden i stället.
 */
export const POWERBANK_20000: TestPage = {
  slug: "powerbank-20000",
  label: "Powerbank 20 000 mAh",
  title: "Powerbank 20 000 mAh bäst i test 2026: åtta för resan och datorn",
  category: ELEKTRONIK,
  methodology:
    "Sidan jämför powerbanks från 20 000 mAh och uppåt, alltså den storlek som laddar en bärbar dator och följer med på resa. Den mindre klassen som laddar en telefon jämförs för sig. Kategorin har en riktig labbprovning, Stiftung Warentests test av 24 powerbanks i februari 2026, men resultaten per modell ligger bakom en betalvägg vi inte betalat, och därför finns inget kriterium för testomdöme. Det är i den här storleken flygreglerna börjar spela roll: Transportstyrelsen tillåter högst 100 wattimmar utan flygbolagets godkännande, och två av produkterna nedan anger 99,75 respektive 99,36 wattimmar. Sju av nio produkter i storleksklassen anger sitt energiinnehåll, vilket är fler än i den mindre klassen där två av åtta gör det. Tre powerbanks med samma nominella 20 000 mAh anger däremot 72, 72,36 och 100 wattimmar, och den spridningen går inte att förena. Vi återger vad som står och räknar aldrig om åt någon, eftersom cellspänningen varierar. Där en uppgift saknas räknas det som en brist under öppen redovisning, eftersom konsekvensen bärs av dig. Priser, artikelnummer och kundbetyg är lästa på butikens egen produktsida och daterade. Vi har inte laddat ur en enda powerbank. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "kapacitet",
      label: "Kapacitet och uttagbar energi",
      weight: 30,
      description:
        "Hur mycket ström som ryms, och hur nära taket det för dig. I den här storleken är kapaciteten inte bara en fråga om hur länge den räcker utan om vad du får ta med ombord. Transportstyrelsens gräns går vid 100 wattimmar, och den nås runt 27 000 milliamperetimmar. Två av produkterna här ligger inom en wattimme under gränsen, vilket är konstruktion och inte slump. Här väger både det nominella talet och det publicerade energiinnehållet in, tillsammans med vad det räcker till i praktiken: en bank på 20 000 mAh ger en telefon ungefär fyra laddningar eller en lättare bärbar dator ungefär en. Ett labb som mätt uttagbar energi på den här storleksklassen fann mellan 58 och 70 wattimmar, alltså mindre än de nominella talen antyder.",
    },
    {
      key: "laddeffekt",
      label: "Laddeffekt och portar",
      weight: 25,
      description:
        "Hur fort den fyller det du kopplar in, och hur fort den själv fylls. Spannet i den här klassen är extremt: från 22,5 watt till 300, alltså mer än tretton gånger. Under 60 watt laddar den en telefon fort men en bärbar dator långsamt eller inte alls. Över 100 watt laddar den en dator i full fart medan den samtidigt håller en telefon igång. Lika viktig är uppladdningen av banken själv, eftersom 20 000 milliamperetimmar tar lång tid att fylla: de snabbaste tar emot 250 watt och är fulla på under en timme, de långsammaste behöver en kväll. Här väger också antalet portar in, om en kabel sitter fast i enheten, och om laddprotokollen täcker både nyare USB-C-enheter och äldre USB-A.",
    },
    {
      key: "redovisning",
      label: "Öppen redovisning",
      weight: 15,
      description:
        "Om du kan ta reda på vad du köper, och om talen går att förena med varandra. I den här storleksklassen anger de flesta sitt energiinnehåll i wattimmar, vilket är bättre än i den mindre klassen. Men uppgifterna är inte alltid inbördes begripliga: tre powerbanks med samma nominella kapacitet på 20 000 milliamperetimmar anger 72, 72,36 och 100 wattimmar, och en köpare som ska svara på om produkten får följa med ombord kan inte avgöra vilken uppgift som gäller. Här väger därför både om talet finns och om det stämmer överens med resten av hyllan. Vikt, mått, batterityp, effekt per port och laddtid räknas också hit, eftersom det är de uppgifter som avgör om produkten passar din väska och din dator.",
    },
    {
      key: "vikt",
      label: "Vikt och format",
      weight: 15,
      description:
        "Vad den väger i väskan, och om den går att bära hela dagen. Det här är den stora skillnaden mot den mindre klassen: en powerbank på 20 000 milliamperetimmar väger mellan 400 och 535 gram, alltså mellan en och en och en halv telefon extra i packningen. Skillnaden på 135 gram mellan den lättaste och den tyngsta märks på en flygplats. Här väger också formen in, eftersom en tjock och kantig enhet tar plats i en datorväska på ett annat sätt än en platt. Att vikten över huvud taget går att läsa före köpet är inte självklart, och där den saknas kan du inte planera packningen.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 15,
      description:
        "Vad du får för pengarna, mätt mot vad de andra kostar för samma sak. Spannet är kategorins bredaste: från 349 till 2 490 kronor för produkter som alla rymmer minst 20 000 milliamperetimmar. Det som skiljer är laddeffekt, vikt och hur mycket du får veta, och de tre följer priset bättre här än i den mindre klassen men långt ifrån perfekt. Här väger också in vad som ingår, alltså om en kabel sitter fast eller följer med, eftersom en powerbank som ska ladda en dator kräver en kabel som klarar effekten. Kundbetyg från butiken visas i tabellen men vägs aldrig in, eftersom betyg från olika butiker inte är jämförbara.",
    },
  ],
};

export const SLACKSPRAY: TestPage = {
  slug: "slackspray",
  label: "Släckspray",
  title: "Släckspray bäst i test 2026: fem sprayer och klassen som står på burken",
  category: SAKERHET,
  methodology:
    "Släcksprayer omfattas av samma standard som handbrandsläckare, SS-EN 3–7, och ska därför bära en effektivitetsklass. Den klassen är det vi rankar på, eftersom den säger hur stort testbål produkten faktiskt provats mot. Rapporten anger att den lägsta klassning som rekommenderas till hemmet är 43A 233B C, och att den i dagsläget bara uppfylls av sexkilos pulversläckare och niolitersskumsläckare. De sprayer som anger en klass ligger på 5A respektive 3A, alltså ett testbål omkring åtta till fjorton gånger mindre. Underlaget är ett examensarbete från Avdelningen för Brandteknik vid Lunds universitet, skrivet hösten 2020 och publicerat 2022, där två av produkterna nedan provades med släckförsök på MSB:s övningsfält Revinge. Vi har läst rapporten i original och skrivit av klasserna, och vi har kontrollerat dem mot två butikers egna produktsidor. Det är ett examensarbete och inte en ackrediterad provning, vilket vi säger rakt ut. Vi har inte tänt en enda brand själva. Där en tillverkare inte anger någon klass räknas det som en brist i betyget och inte som ett neutralt tomrum, eftersom en produkt du inte kan jämföra är sämre för dig än en du kan. Priser och kundbetyg är lästa på butikernas egna produktsidor och daterade. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "slackeffekt",
      label: "Angiven släckeffekt",
      weight: 30,
      description:
        "Vilken effektivitetsklass enligt SS-EN 3–7 tillverkaren anger, och därmed hur stor brand produkten är provad mot. Koden läses som på en vanlig brandsläckare: A är trä och textil, B är brännbara vätskor, F är fett i en kastrull, och talet framför varje bokstav är storleken på testbålet. Housegard FireStopper anger 5A 21B (E) 5F och Taerosol Fire Fighter 3A 13B (E) 5F. Till jämförelse anger rapporten 43A 233B C som den lägsta klassning som rekommenderas till hemmet. Skillnaden mellan 43A och 5A är ungefär åtta gånger testbålet, och mellan 43A och 3A drygt fjorton. Den som inte anger någon klass alls får lågt betyg här, och det är avsiktligt: två av sprayerna i jämförelsen säljs utan att någonstans säga vad de klarar, och då kan du varken jämföra dem eller veta när de räcker.",
    },
    {
      key: "anvandning",
      label: "Vad den är gjord för",
      weight: 25,
      description:
        "Vilket brandscenario produkten faktiskt är byggd och provad för, vilket avgör var den gör nytta. Fettbrand är det viktigaste för de flesta: en kastrull med matolja är den vanligaste brandstarten i ett svenskt kök, och F i koden betyder att produkten provats mot just den. Här väger också in vilket släckmedel som används och om tillverkaren skriver ut vad det är, samt om produkten tål att ligga i en bil över vintern. Litiumsprayerna bedöms i samma kolumn men med en varning: standarden SS-EN 3–7 har ingen klass för brand i litiumjonbatterier, så den A-klass de bär gäller trä och textil och säger ingenting om batteriet. Vi betygsätter vad som är publicerat om produkten, inte vad marknadsföringen antyder att den klarar.",
    },
    {
      key: "prisvarde",
      label: "Prisvärde",
      weight: 25,
      description:
        "Vad du får för pengarna, i en kategori där spannet är stort och inte följer förmågan. Den billigaste sprayen i jämförelsen kostar 99,90 kronor och den dyraste 539, alltså mer än fem gånger så mycket. Väg priset mot vad produkten ersätter och inte mot de andra sprayerna: en sexkilos pulversläckare med 43A kostar några hundralappar mer än den dyraste sprayen här och klarar ett testbål åtta gånger större. Sprayen köper du för att den får plats i ett köksskåp, i en verktygslåda eller i ett handskfack, och för att den går att använda med en hand. Betalar du sprayens pris för en produkt som varken anger klass eller innehåll är prisvärdet lågt oavsett hur låg summan är.",
    },
    {
      key: "uthallighet",
      label: "Volym och tömningstid",
      weight: 20,
      description:
        "Hur länge du faktiskt kan spruta, vilket är den kortaste och mest underskattade siffran i kategorin. De två provade sprayerna töms på 20 till 30 respektive 15 till 25 sekunder, och det är hela din insats. En handbrandsläckare på sex kilo håller betydligt längre och når fem till sju meter, mot sprayens tre till fyra. Beräkningarna i den rapport vi bygger på pekar på att en spray klarar en möbelbrand i ungefär tre minuter efter att brandtillväxten startat, och därefter inte. Volymen i milliliter är det tal butikerna anger, men det är tömningstiden som säger vad du har att arbeta med, och den anges sällan.",
    },
  ],
};

export const TEST_PAGES: TestPage[] = [
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

/**
 * Kategorier vars viktning faktiskt går att läsa.
 *
 * ⚠️ Finns för att `/om-oss` och `/sa-testar-vi` påstod olika saker om samma
 * fakta: den ena skrev "Vi har 22 kategorier med publicerad viktning", den
 * andra "Just nu har vi 23 kategorier med publicerad viktning". Båda talen var
 * härledda, men ur var sin lista.
 *
 * `TEST_PAGES` är alla viktningar som är författade, `liveTestPages()` är alla
 * sidor som är publicerade, och de är inte samma sak. Robotdammsugare har en
 * färdig viktning men står som `planned`, så viktningen finns men är inte
 * publicerad. Att räkna `TEST_PAGES.length` övertalade därför läsaren med en.
 *
 * Snittet är det enda tal som gör påståendet sant. Använd den här funktionen
 * varje gång en sida vill säga hur många kategorier vi publicerat en viktning
 * för, så kan de två sidorna inte glida isär igen.
 */
export function publishedCategories(): TestPage[] {
  const publicerade = new Set(liveTestPages().map((c) => c.href));
  return TEST_PAGES.filter((c) => publicerade.has(`/${c.slug}`));
}
