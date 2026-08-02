import type { Category } from "@/lib/products";
import type { Crumb } from "@/components/site/breadcrumbs";
import { SAKERHET, SMART_HEM } from "@/lib/catalog";

/**
 * The breadcrumb trail for a category page, minus "Hem" which Breadcrumbs
 * prepends. Centralised so every category page produces an identical trail and
 * a new group never has to be wired up page by page.
 */
export function categoryTrail(category: Category): Crumb[] {
  const trail: Crumb[] = [];
  if (category.group) {
    trail.push({ label: category.group.label, href: category.group.href });
  }
  trail.push({ label: category.label });
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
export const SMART_BELYSNING: Category = {
  slug: "smart-belysning",
  label: "Smart belysning",
  title: "Bäst i test smart belysning 2026",
  group: SMART_HEM,
  methodology:
    "Vi jämför smarta lampor på specifikationer, publicerade mätvärden och resultat från oberoende tester i Sverige och Norden. Alla lampor bedöms mot samma kriterier och samma viktning, och källorna finns länkade längre ner på sidan. Där en lampa saknar ett publicerat omdöme om just den modellen skriver vi det rakt ut i stället för att gissa. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
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
export const SMART_PLUG: Category = {
  slug: "smart-plug",
  label: "Smart plug",
  title: "Bäst i test smart plug 2026",
  group: SMART_HEM,
  methodology:
    "Vi jämför smarta uttag på specifikationer från butikernas och tillverkarnas egna uppgifter, och på hur produkterna bedömts i oberoende tester i Sverige, Norden och Storbritannien. Alla pluggar bedöms mot samma kriterier och samma viktning, och källorna finns länkade längre ner. Där en produkt saknar oberoende test skriver vi det rakt ut i stället för att gissa. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
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
export const SMART_STROMBRYTARE: Category = {
  slug: "smart-strombrytare",
  label: "Smart strömbrytare",
  title:
    "Smart strömbrytare bäst i test 2026: väggbrytare, reläer och vad du får installera själv",
  group: SMART_HEM,
  methodology:
    "Vi jämför smarta strömbrytare och inbyggnadsreläer på specifikationer från butikernas och tillverkarnas egna uppgifter, på Elsäkerhetsverkets regler för vad du får göra själv, och på hur produkterna bedömts i oberoende tester. Alla produkter bedöms mot samma kriterier och samma viktning, och källorna finns länkade längre ner. Där en produkt saknar oberoende test skriver vi det rakt ut i stället för att gissa. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "installation",
      label: "Installation och nolledare",
      weight: 25,
      description:
        "Om produkten kräver nolledare i dosan, om den får plats bakom en svensk strömbrytare, och vad Elsäkerhetsverkets regler innebär för just den installationen. Väger tyngst eftersom det är det som avgör om produkten över huvud taget går att montera hemma hos dig, och för att en modul som kräver behörig elektriker kostar mer i arbete än den gör i inköp.",
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
 * produktunderlaget räcker till det. Se .agent/keyword-research-utfall.md.
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
export const ELEKTRISK_RULLGARDIN: Category = {
  slug: "elektrisk-rullgardin",
  label: "Elektrisk rullgardin",
  title:
    "Elektrisk rullgardin och gardinmotor bäst i test 2026: vad som passar din upphängning",
  group: SMART_HEM,
  methodology:
    "Vi jämför motorer som gör gardinen du redan har smart, inte färdiga gardiner. Betygen bygger på tillverkarnas och butikernas egna uppgifter, på vad produkterna kostar hos den butik vi länkar till, och på hur de bedömts i oberoende produkttester. Alla produkter bedöms mot samma kriterier och samma viktning, och källorna finns länkade längre ner. Där en produkt saknar oberoende test skriver vi det rakt ut i stället för att gissa. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
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
export const UTOMHUSTIMER: Category = {
  slug: "utomhustimer",
  label: "Utomhustimer",
  title: "Utomhustimer bäst i test 2026: mekanisk, digital eller smart",
  group: SMART_HEM,
  methodology:
    "Vi jämför timers och fjärrströmbrytare för utomhusbruk på specifikationer från butikernas och tillverkarnas egna uppgifter, på Elsäkerhetsverkets krav för el utomhus, och på de betyg butikernas egna kunder satt. Alla produkter bedöms mot samma kriterier och samma viktning, oavsett om de är mekaniska eller smarta, och källorna finns länkade längre ner. Där en uppgift saknas skriver vi det rakt ut i stället för att gissa. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
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
export const VATTENLARM: Category = {
  slug: "vattenlarm",
  label: "Vattenlarm",
  title: "Vattenlarm bäst i test 2026: läckagesensorer med och utan hubb",
  group: SAKERHET,
  methodology:
    "Vi jämför vattenlarm på specifikationer lästa på butikernas och tillverkarnas egna sidor: hur larmet når dig, om en hubb krävs, batteritid, sensorutförande och pris per skyddad plats. Kategorin saknar oberoende laboratorieprovningar, vilket vi skriver rakt ut i stället för att antyda egna mätningar. Alla larm bedöms mot samma kriterier och samma viktning, och källorna finns länkade längre ner. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
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
export const BRANDVARNARE: Category = {
  slug: "brandvarnare",
  label: "Brandvarnare",
  title: "Brandvarnare bäst i test 2026: sammankopplade och fristående",
  group: SAKERHET,
  methodology:
    "Vi jämför brandvarnare på specifikationer lästa på butikernas och tillverkarnas egna sidor: om de kan kopplas ihop och på vilken frekvens, hur länge batteriet håller, hur högt larmet låter och om det finns pausfunktion, samt vad publicerade jämförelser kommit fram till. Vi har inte tänt eld på något, och vi skriver det rakt ut i stället för att antyda motsatsen. Alla varnare bedöms mot samma kriterier och samma viktning, och källorna finns länkade längre ner. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
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
        "Hur många publicerade jämförelser som utsett produkten till vinnare eller topplacering. Källorna redovisas per produkt, eftersom fyra av sju svenska jämförelser är affiliatesajter utan egen provning och en av dem rankar en produkt som lades ner i mars 2025. En nedlagd produkt får aldrig poäng här.",
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
export const SMART_BRANDVARNARE: Category = {
  slug: "smart-brandvarnare",
  label: "Smart brandvarnare",
  title: "Smart brandvarnare bäst i test 2026: efter Nest Protect",
  group: SAKERHET,
  methodology:
    "Vi jämför uppkopplade brandvarnare på specifikationer lästa på butikernas och tillverkarnas egna sidor: vad appen faktiskt gör, vad som fortsätter fungera utan tillverkarens molntjänst, batteritid, vad som krävs utöver larmet självt och pris per skyddad plats. Vi har inte tänt eld på något och skriver det rakt ut. Alla varnare bedöms mot samma kriterier och samma viktning, och källorna finns länkade längre ner. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
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
export const BRANDSLACKARE: Category = {
  slug: "brandslackare",
  label: "Brandsläckare",
  title: "Brandsläckare bäst i test 2026: vilken du ska ha hemma",
  group: SAKERHET,
  methodology:
    "Vi jämför handbrandsläckare på det som står på etiketten och på butikens egen produktsida: effektklass enligt EN 3, redovisat typgodkännande, vikt och utrustning, temperaturområde och väggfäste, samt pris ställt mot släckeffekt. Vi har inte tänt eld på något och skriver det rakt ut. Alla släckare bedöms mot samma kriterier och samma viktning, och källorna finns länkade längre ner. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
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
export const BRANDFILT: Category = {
  slug: "brandfilt",
  label: "Brandfilt",
  title: "Brandfilt bäst i test 2026: storleken och certifieringen som avgör",
  group: SAKERHET,
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
 * köparen kan kontrollera innan hen betalar, och skalan publiceras på sidan.
 *
 * ## Varför det inte finns något kriterium för testomdömen
 *
 * Consumer Reports provar CO-varnare i labb, men mot UL 2034 och inte mot
 * EN 50291, och deras X-Sense-test gäller en annan modell än den vi rankar.
 * Ingen svensk eller nordisk redaktion har testat kategorin. Se
 * .agent/research-kolmonoxidvarnare.md.
 */
export const KOLMONOXIDVARNARE: Category = {
  slug: "kolmonoxidvarnare",
  label: "Kolmonoxidvarnare",
  title: "Kolmonoxidvarnare bäst i test 2026: del 1 eller del 2 av EN 50291",
  group: SAKERHET,
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
 * Ordet brandstege täcker två marknader. Den hängande kostar 699 till 1 294
 * kronor och kräver ingen montering. Den fasta fasadstegen kostar 1 327 till
 * 9 199 och är ett byggjobb. Trettonfaldigt prisspann i samma rankning hade
 * varit samma fel som /vattenlarm undvek. De fasta får /utrymningsstege.
 *
 * ## Varför det inte finns något kriterium för testomdömen
 *
 * Ingen redaktion i Sverige eller Norden har provat hängande brandstegar. Den
 * bästa svenska sidan i kategorin, brandinfo.se, skriver att den testat men
 * redovisar ingen metod. Se .agent/research-brandstege.md §7.
 *
 * ## Varför räckvidd väger tyngst
 *
 * Boverkets byggregler drar gränsen vid fem meter: sitter fönstrets underkant
 * högre krävs en fast monterad stege, och under den höjden räknar reglerna med
 * att du hoppar. Kriteriet mäter därför inte råa meter utan hur stor del av det
 * intervallet stegen täcker.
 */
export const BRANDSTEGE: Category = {
  slug: "brandstege",
  label: "Brandstege",
  title: "Brandstege bäst i test 2026: kilotalet går inte att jämföra",
  group: SAKERHET,
  methodology:
    "Det finns inget svenskt eller nordiskt test av hängande brandstegar, och det finns ingen produktstandard som gäller stegtypen. Den standard två av tillverkarna hänvisar till, EN 131-6, gäller enligt SIS lutande och stående teleskopstegar, och Bauhaus anger den dessutom i en utgåva som SIS listar som tillbakadragen. Följden är att maxlasten på kartongen inte går att jämföra: samma sorts stege anges till 150, 200, 400 och 450 kilo utan att någon butik anger hur talet mätts. Det vi gör i stället är att läsa varje butiks och varje tillverkares egna uppgifter, ställa räckvidden mot Boverkets femmetersgräns och betygsätta dokumentationen efter en publicerad skala. Alla uppgifter är lästa på butikens eller tillverkarens egen sida och daterade. Vi har inte belastat eller klättrat i någon stege. Ingen tillverkare och ingen butik har fått påverka betyg eller ordning.",
  criteria: [
    {
      key: "rackvidd",
      label: "Räckvidd",
      weight: 30,
      description:
        "Hur högt sittande fönster stegen når från, mätt mot Boverkets gräns. Byggreglerna accepterar utrymning genom fönster om underkanten sitter högst 5,0 meter över marken, och över den höjden krävs en fast monterad stege. Kriteriet mäter alltså inte råa meter utan hur stor del av det intervallet stegen täcker med marginal. En stege på 4,5 meter räcker till en normal andravåning, en på 4,3 blir knapp i ett hus med hög takhöjd, och sju meter är det enda som når tre våningar.",
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

export const CATEGORIES: Category[] = [
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
];
