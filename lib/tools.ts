/**
 * Registry of the interactive tools.
 *
 * Every tool renders in two places: embedded in the buying guide of each
 * category that uses it, and on its own page at /guider/{slug}. The widget
 * itself is one component used by both. The dedicated page adds editorial copy
 * and its own FAQ around it, so it has something to rank on beyond the widget.
 *
 * ## Naming rule
 *
 * A name and slug must survive a second tool of the same kind. "Lumenräknare"
 * and "Watt till lumen" are inherently about light and need no qualifier.
 * "Protokollväljare" and "Driftkostnadsräknare" do not: the day we publish a
 * running-cost calculator for dishwashers, `driftkostnad` would be ambiguous
 * and the URL would have to change, which costs the rankings it earned. Name
 * the subject in the slug from the start.
 *
 * `usedOn` holds category slugs and is the single source for the backlinks from
 * a tool page to the tests that embed it, so a tool page can never claim to
 * serve a test that no longer uses it.
 */

export type ToolSection = {
  heading: string;
  /** Paragraphs. Kept as plain strings so the registry stays free of markup. */
  body: string[];
};

export type ToolFaq = { question: string; answer: string };

export type Tool = {
  slug: string;
  /** Short label. Shown as the widget heading and in tool listings. */
  name: string;
  /** H1 on the tool's own page. */
  title: string;
  /** Meta description and the blurb on the index. */
  description: string;
  /** Lead paragraph above the widget. */
  intro: string;
  /** Editorial copy below the widget. */
  sections?: ToolSection[];
  /** Rendered with FAQPage markup on the tool page. */
  faq?: ToolFaq[];
  /** TestPage slugs that embed this tool. */
  usedOn: string[];
  /**
   * Datum då verktygssidan senast ändrades i sak, `YYYY-MM-DD`.
   *
   * Blir `<lastmod>` i sitemapen. Obligatoriskt med flit: ett verktyg utan
   * datum hade tyst hamnat utanför, och det är precis den sortens fält som
   * aldrig fylls i om det går att hoppa över.
   *
   * Bump det när du ändrar `intro`, `sections`, `faq` eller själva widgeten.
   * Rena omformuleringar räknas inte, sakinnehållet gör det.
   *
   * Utgångsdatumen är satta till den nyaste kategorin i `usedOn`, eftersom
   * sidan listar de tester som bäddar in verktyget. Den listan ändras när en
   * kategori tillkommer, alltså ändras sidan. `pnpm check:refs` bevakar just
   * den relationen: `updated` får aldrig vara äldre än nyaste kategorin här.
   */
  updated: string;
};

export const TOOLS: Tool[] = [
  {
    slug: "oljekostnad-fritos",
    name: "Oljekostnad fritös",
    title: "Oljekostnad fritös: vad litertalet på kartongen kostar per år",
    description:
      "Räknar om en fritös oljemängd till vad oljan kostar per år och per portion, med det bytesintervall Test-Achats och Tefal själva anger.",
    intro:
      "Litertalet på kartongen är oljan du köper och slänger, inte maten du lagar. Räknaren översätter talet till kronor per år utifrån hur ofta du friterar, och visar vad en maskin med filtrering är värd.",
    sections: [
      {
        heading: "Två källor anger samma bytesintervall",
        body: [
          "Belgiska Test-Achats, som provat 24 fritöser i den provning Stiftung Warentest publicerade i december 2025, rekommenderar att frityrfettet byts efter fem till sex omgångar. Tefals egen bruksanvisning för sina fritöser säger fem till sju gånger.",
          "Räknaren utgår därför från sex omgångar per fyllning och låter dig flytta talet mellan fyra och tio. Skälet till bytet är att matrester samlas i fettet, ändrar smaken och påverkar hur oljan beter sig när den värms.",
        ],
      },
      {
        heading: "Oljemängden och matmängden är två olika tal",
        body: [
          "Tefal listar dem som två skilda rader i sin egen jämförelsetabell, och de följer inte varandra. Tefal Easy Pro, Princess 182727 och Severin FR 2431 tar alla tre exakt 3 liter olja och friterar 1,2 kilo, 600 gram respektive 400 gram mat.",
          "Det betyder att samma oljekostnad ger tre gånger så mycket mat ur den ena maskinen som ur den andra. Över hela fältet spänner kvoten från 1,54 till 7,50 liter olja per kilo mat.",
        ],
      },
      {
        heading: "Vad filtreringen är värd",
        body: [
          "En kallzon håller smulorna borta från värmeelementet så att de inte bränns, och ett oljefilter silar bort dem. Tefals Oleoclean-modeller gör båda delarna automatiskt och lagrar oljan i en sluten låda mellan gångerna.",
          "Hur många extra omgångar det ger är däremot ingen tillverkare och ingen provning som anger. Räknaren lägger på ett halvt steg för kallzon och två för automatisk filtrering, och det är en uppskattning som står utskriven vid resultatet.",
        ],
      },
    ],
    faq: [
      {
        question: "Hur mycket kostar oljan till en fritös per år?",
        answer:
          "Mellan ungefär hundra och tusen kronor, beroende på maskinen och på hur ofta du friterar. En tvålitersmaskin som används varannan vecka drar omkring 26 liter om året, alltså runt 260 kronor med rapsolja i dunk. En femlitersmaskin vid samma bruk drar 65 liter och kostar omkring 650. Skillnaden på fem år är då nästan två tusen kronor, vilket är mer än vad någon fritös i jämförelsen kostar att köpa.",
      },
      {
        question: "Hur ofta måste man byta frityrolja?",
        answer:
          "Efter fem till sju omgångar. Test-Achats anger fem till sex i den provning av 24 fritöser som Stiftung Warentest publicerade i december 2025, och Tefals egen bruksanvisning anger fem till sju. Har du friterat fisk bör oljan bytas direkt efteråt oavsett hur många gånger den använts, eftersom smaken annars följer med. En kallzon och ett oljefilter förlänger intervallet genom att hålla smulorna borta från värmen.",
      },
      {
        question: "Lönar sig en fritös med automatisk oljefiltrering?",
        answer:
          "Om du friterar oftare än ungefär en gång i månaden, ja. Tefals Oleoclean-modeller silar oljan ned i en sluten låda när du vrider på ratten, så den varken står kvar i grytan eller ska hällas genom en sil för hand. Merpriset mot en maskin utan filtrering är några hundralappar, och det tjänas in dels på olja som räcker längre, dels på att momentet som får en fritös att stå oanvänd försvinner. Friterar du fyra gånger om året finns det ingen ekonomi i det.",
      },
      {
        question: "Vilken olja räknar verktyget med?",
        answer:
          "Rapsolja på 30 kronor litern, vilket motsvarar femlitersdunk i svensk dagligvaruhandel, och priset går att ändra. Rapsolja är också den olja som passar bäst till fritering: neutral smak och en rökpunkt runt 240 grader, alltså god marginal till de 175 till 190 grader man friterar i. Fast frityrfett håller något längre men kostar mer per kilo, och olivolja har både lägre rökpunkt och en smak som följer med maten.",
      },
    ],
    usedOn: ["fritos"],
    updated: "2026-08-07",
  },
  {
    slug: "drifttid-skaftdammsugare",
    name: "Drifttid skaftdammsugare",
    title: "Drifttid skaftdammsugare: vad kartongens minuttal blir i turboläge",
    description:
      "Räknar om en skaftdammsugares angivna drifttid till vad batteriet räcker till i det läge du faktiskt städar i, med den kvot fem tillverkare själva publicerar.",
    intro:
      "Minuttalet på kartongen gäller ekoläget, och hos flera tillverkare dessutom ett tillbehör utan motor. Räknaren översätter talet till vad du får när borsten snurrar, och till hur stor yta det räcker till.",
    sections: [
      {
        heading: "Fem tillverkare anger båda talen",
        body: [
          "De flesta publicerar bara ekotalet. Fem gör inte det: Bosch anger 80 minuter i ekoläge och 11 i turboläge för Unlimited 10, Philips 60 mot 15 för 5000 Series, Electrolux 40 mot 10 för Animal 700 och 45 mot 13 för Clean 500, och Xiaomi 45 mot 15 för G20 Lite.",
          "Kvoterna blir 0,14, 0,25, 0,25, 0,29 och 0,33. Medianen är en fjärdedel, och det är vad räknaren använder. Att Bosch ligger lägst är väntat: en kraftigare motor tömmer samma batteri fortare när den går för fullt.",
        ],
      },
      {
        heading: "Ytan kommer från tillverkarna själva",
        body: [
          "Två av dem publicerar hur stor yta en laddning räcker till, och de är överens. Dreame anger 300 kvadratmeter på 90 minuter i ekoläge, alltså 3,3 kvadratmeter i minuten. Philips anger mer än 195 kvadratmeter på 60 minuter, alltså 3,25.",
          "Räknaren använder 3,3 kvadratmeter i minuten oavsett läge. Det är en förenkling: Philips egna tal antyder att man rör sig snabbare i turboläge, men två uppgifter räcker inte för att skilja lägena åt.",
        ],
      },
      {
        heading: "Vad talet betyder när du väljer",
        body: [
          "Ett högre ekotal ger ett högre turbotal, så jämförelsen mellan maskiner håller. Det som inte håller är att läsa kartongens tal som städtid: 60 minuter blir omkring 15 med borsten igång, vilket räcker till ungefär 50 kvadratmeter.",
          "Har du mest hårt golv och lite damm städar du i ekoläge större delen av tiden, och då gäller kartongens tal. Har du mattor, husdjur eller golvspringor i parkett behöver du turboläget, och då är det den fjärdedelen som avgör om du kommer runt på en laddning.",
        ],
      },
    ],
    faq: [
      {
        question: "Hur länge räcker en skaftdammsugare i turboläge?",
        answer:
          "Ungefär en fjärdedel av talet på kartongen. En maskin angiven till 60 minuter håller omkring 15 med borsten igång på full effekt, och en angiven till 80 håller omkring 20. Kvoten kommer från de fem tillverkare som publicerar båda talen, och de landar mellan 0,14 och 0,33 gånger.",
      },
      {
        question: "Varför anger tillverkarna drifttiden i ekoläge?",
        answer:
          "För att det är det längsta talet som är sant. Flera anger det dessutom med ett tillbehör utan motor, alltså utan den roterande borste maskinen normalt används med. Bosch skriver ut alla fyra talen för samma maskin: 80 minuter i ekoläge utan elektriskt tillbehör, 65 i ekoläge med golvmunstycket, 25 i autoläge och 11 i turboläge.",
      },
      {
        question: "Räcker en laddning till en trea?",
        answer:
          "I ekoläge, ja, om maskinen anger 30 minuter eller mer. I turboläge behöver du omkring 25 minuter kvar efter omräkningen för att klara 80 kvadratmeter, vilket motsvarar ett angivet tal på runt 100 minuter. Det är fler minuter än någon skaftdammsugare i handeln anger, så en trea med mycket matta kräver antingen ett byte till ekoläge på hårt golv eller ett extra batteri.",
      },
      {
        question: "Går det att köpa ett extra batteri?",
        answer:
          "På de flesta maskiner, och det är det billigaste sättet att fördubbla städtiden. Bosch använder Power for All 18V, samma batteri som deras trädgårds- och elverktyg, så paketet kan redan finnas i garaget. Samsung, Dyson, Philips och Electrolux säljer egna löstagbara batterier som reservdelar. Ett bytbart batteri betyder också att maskinen går att laga när cellerna tappat kapacitet.",
      },
    ],
    usedOn: ["skaftdammsugare"],
    updated: "2026-08-06",
  },
  {
    slug: "rackvidd-babyvakt",
    name: "Räckvidd babyvakt",
    title: "Räckvidd babyvakt: vad tillverkarens metertal blir inomhus",
    description:
      "Räknar om en babyvakts angivna räckvidd i fri sikt till ungefär vad den når genom väggar, med den kvot fyra tillverkare själva publicerar.",
    intro:
      "En babyvakt anges alltid i fri sikt, alltså utomhus utan hinder. Det är därför en apparat avsedd för en trerumslägenhet står angiven till 800 meter. Räknaren översätter talet till något du kan hålla en tumstock mot.",
    sections: [
      {
        heading: "Fyra tillverkare anger båda talen, och de är överens",
        body: [
          "De flesta publicerar bara frisiktstalet. Fyra gör inte det: Motorola anger 160 fot inomhus och 1 000 fot utomhus för sin PIP10, alltså 49 mot 305 meter. Philips Avent anger 50 mot 300 för SCD892. VTech anger 75 mot 460 för DM1212. Alecto anger 50 mot 300.",
          "Kvoterna blir 6,2, 6,0, 6,1 och 6,0. Fyra fabrikat som inte har något med varandra att göra landar alltså inom två tiondelar av varandra, och det är därför räknaren delar med sex jämnt. Ett tal du kan göra i huvudet framför hyllan är mer värt än en tredje decimal fyra uppgifter inte kan bära.",
        ],
      },
      {
        heading: "Väggarna avgör resten",
        body: [
          "Radiovågor på 868 megahertz, DECT-bandet och 2,4 gigahertz dämpas alla av massa, och betong och plåt dämpar mer än gips och trä. En gjuten källartrappa är det värsta hindret i ett normalt hem, och ett sextiotalshus med betongbjälklag äter mer räckvidd än en villa från nittiotalet.",
          "Nedskrivningen för tunga väggar är en marginal och inte en mätning. Ingen tillverkare anger vilken sorts vägg de provat genom, så använd resultatet som en storleksordning och köp marginal om du bor i betong.",
        ],
      },
      {
        heading: "Vad talet betyder när du väljer",
        body: [
          "Räckvidd är det enda tal hela kategorin publicerar, vilket gör det till den siffra marknadsföringen bygger på. Det är också skälet till att vi väger det lågt: 15 av 100 poäng, mot 25 för vad föräldraenheten gör när den tappar babyenheten.",
          "I praktiken har varje babyvakt i vår jämförelse tillräcklig räckvidd för en lägenhet. Skillnaden märks först när du vill kunna gå ut i trädgården, ner i tvättstugan eller bort till förrådet.",
        ],
      },
    ],
    faq: [
      {
        question: "Hur långt räcker en babyvakt inomhus?",
        answer:
          "Ungefär en sjättedel av talet på kartongen. En apparat angiven till 800 meter räcker omkring 130 meter genom väggar, och en angiven till 300 räcker omkring 50. Kvoten kommer från de fyra tillverkare som publicerar båda talen, och de landar alla mellan 6,0 och 6,2 gånger.",
      },
      {
        question: "Varför anger tillverkarna räckvidd i fri sikt?",
        answer:
          "För att det är det enda villkor som går att upprepa. Räckvidd genom väggar beror på vad väggarna är gjorda av, hur många de är och vad annat som sänder i huset, alltså på förhållanden tillverkaren inte känner till. Frisiktstalet är därför riktigt, det är bara mätt i ett förhållande produkten aldrig används i.",
      },
      {
        question: "Räcker 300 meter till en villa?",
        answer:
          "Ja, inom huset. 300 meter i fri sikt blir omkring 50 meter genom väggar, vilket täcker två plan och ut på altanen i ett normalt hus. Vill du kunna vara i garaget, i tvättstugan i källaren eller längst bort på tomten behöver du ett högre tal.",
      },
      {
        question: "Vad händer när jag går utanför räckvidden?",
        answer:
          "Det beror på apparaten, och det är viktigare än metertalet. De flesta föräldraenheter larmar med ljud efter 20 till 30 sekunder. På ett par modeller är larmet en inställning i menyn som du själv måste slå på, och då tystnar apparaten utan att säga till. Kontrollera det innan du börjar använda den.",
      },
    ],
    usedOn: ["babyvakt"],
    updated: "2026-08-06",
  },
  {
    slug: "lumenraknare",
    name: "Lumenräknare",
    title: "Lumenräknare: hur mycket ljus behöver rummet?",
    description:
      "Räkna ut hur många lumen du behöver i vardagsrum, kök, sovrum eller badrum. Ange rummets storlek och få ljusflödet, plus hur många lampor det motsvarar.",
    intro:
      "Watt säger ingenting om hur mycket det lyser. Lumen gör det. Ange rummets yta och vad du använder det till, så räknar vi fram hur mycket ljus rummet behöver totalt och hur många lampor det blir.",
    sections: [
      {
        heading: "Så räknar vi",
        body: [
          "Räknaren utgår från lumen per kvadratmeter, vilket är det enklaste sättet att komma fram till ett vettigt tal utan att mäta något. Ett vardagsrum vill ha runt 100 till 150 lumen per kvadratmeter i allmänbelysning. Ett kök behöver det dubbla, eftersom du gör saker där som kräver att du ser vad du gör.",
          "Talet du får är rummets totala behov, inte vad en enskild lampa ska klara. Det är en viktig skillnad. Fyra lampor på 500 lumen ger ett trivsammare rum än en lampa på 2 000, trots att summan är densamma, eftersom ljus från flera håll ger färre hårda skuggor.",
        ],
      },
      {
        heading: "Allmänbelysning är inte hela sanningen",
        body: [
          "Siffrorna gäller det ljus som fyller rummet. Arbetsytor behöver egen belysning ovanpå: en bänkbelysning i köket, en läslampa vid fåtöljen, en skrivbordslampa. Räkna dem som tillägg och inte som en del av totalen.",
          "Tak, väggar och golv påverkar också. Ett rum med vitt tak och ljusa väggar kastar tillbaka betydligt mer ljus än ett med mörk panel, och kan klara sig på den nedre delen av intervallet. Har du mörka ytor, sikta på den övre.",
        ],
      },
    ],
    faq: [
      {
        question: "Hur många lumen behöver ett vardagsrum på 20 kvadratmeter?",
        answer:
          "Räkna med 2 000 till 3 000 lumen totalt, eller 100 till 150 lumen per kvadratmeter. Det motsvarar ungefär tre lampor på 806 lumen eller två på 1 100. Fördela dem på flera ljuspunkter i rummet i stället för att lösa allt med en lampa i taket.",
      },
      {
        question: "Behöver kök mer ljus än vardagsrum?",
        answer:
          "Ja, ungefär det dubbla per kvadratmeter. Ett kök landar på 250 till 300 lumen per kvadratmeter i allmänbelysning, mot vardagsrummets 100 till 150. Ovanpå det behöver bänken egen belysning, eftersom du står mellan taklampan och arbetsytan och skuggar den du själv jobbar på.",
      },
      {
        question: "Kan man ha för mycket ljus?",
        answer:
          "Ja, men problemet är sällan totalen utan fördelningen och färgtemperaturen. Ett rum med rätt antal lumen från en enda stark källa upplevs obehagligt, medan samma mängd fördelad på fyra lampor känns lagom. Kallt ljus på kvällen upplevs också som starkare än varmt ljus med samma lumen.",
      },
      {
        question: "Gäller lumen per kvadratmeter i alla rum?",
        answer:
          "Som utgångspunkt, ja, men takhöjden påverkar. Ett rum med högt i tak behöver mer, eftersom ljuset sprids över en längre sträcka innan det når golvet. Har du mer än tre meter i takhöjd, lägg på ungefär tjugo procent.",
      },
    ],
    usedOn: ["smart-belysning"],
    updated: "2026-08-06",
  },
  {
    slug: "elkostnad-lampor",
    name: "Elkostnad för lampor",
    title: "Vad kostar dina lampor i el per år?",
    description:
      "Räkna ut vad belysningen kostar i el per år, inklusive den ström smarta lampor drar i viloläge. Ange antal lampor, brinntid och ditt elpris.",
    intro:
      "En smart lampa drar ström även när den är släckt, eftersom radion måste vara vaken för att kunna ta emot kommandot att tända. Det är sällan mycket, men det är alltid mer än noll, och med tillräckligt många lampor blir det en post.",
    sections: [
      {
        heading: "Viloläget är en andel, inte ett belopp",
        body: [
          "Kronorna för viloläge blir små i de flesta hem. Det intressanta är förhållandet mellan tänd och släckt tid. En lampa i en garderob som lyser tio minuter om dygnet står släckt i 23 timmar och 50 minuter, och under den tiden drar den ström hela tiden. Där kan viloläget bli den större posten av de två.",
          "Samma lampa i ett vardagsrum som lyser fem timmar per kväll ser helt annorlunda ut. Slutsatsen är alltså inte att undvika smarta lampor, utan att inte sätta dem i utrymmen du knappt använder.",
        ],
      },
      {
        heading: "Vad vi räknar med",
        body: [
          "Vi räknar med 0,3 W i viloläge per lampa, vilket ligger mitt i det intervall oberoende mätningar rapporterar för Wi-Fi- och Zigbee-lampor. Effekten när lampan lyser tar du från lampans egen märkning, och elpriset sätter du själv.",
          "Elpriset är den siffra som skiljer mest mellan hushåll. Det tal du ska mata in är totalpriset per kilowattimme inklusive elnätsavgift, energiskatt och moms, inte spotpriset. Det ligger som regel någonstans mellan 1,50 och 2,50 kronor beroende på elområde och avtal.",
        ],
      },
      {
        heading: "Smart belysning kan spara mer än den kostar",
        body: [
          "Poängen med en smart lampa är sällan lampan i sig utan att den släcks när ingen är i rummet. En lampa som står tänd fyra timmar i onödan varje dag kostar långt mer än vilolägets tre tiondels watt. Räkna gärna två gånger: en gång med dagens brinntid och en gång med den du tror att du får med scheman och sensorer.",
        ],
      },
    ],
    faq: [
      {
        question: "Drar smarta lampor ström när de är avstängda?",
        answer:
          "Ja, ungefär tre tiondels watt per lampa. Radion måste vara vaken för att kunna ta emot kommandot att tända, annars skulle lampan inte gå att slå på från appen. Det gäller alla smarta lampor oavsett protokoll, och det är priset för att slippa gå fram till strömbrytaren.",
      },
      {
        question: "Vad kostar tio smarta lampor i el per år?",
        answer:
          "Med fyra timmars brinntid per dygn, 9 W per lampa och 2 kronor per kilowattimme landar tio lampor på runt 260 kronor per år, varav ungefär 45 kronor är viloläge. Halverar du brinntiden halveras driftkostnaden, medan vilolägets andel växer eftersom lamporna står släckta längre.",
      },
      {
        question: "Lönar det sig att byta till LED om jag redan har halogen?",
        answer:
          "Nästan alltid, och snabbt. En halogenlampa på 60 W ersätts av en LED på runt 9 W med samma ljusflöde, under en sjättedel av förbrukningen. Skillnaden betalar lampan på mindre än ett år i ett rum som används dagligen, även med ett smart lamppris.",
      },
      {
        question: "Vilket elpris ska jag räkna med?",
        answer:
          "Använd totalpriset per kilowattimme, inte spotpriset. I totalpriset ingår elhandelspriset, elnätsavgiften, energiskatten och momsen, och summan brukar hamna mellan 1,50 och 2,50 kronor beroende på elområde och avtal. Priset står på din elräkning.",
      },
    ],
    usedOn: ["smart-belysning"],
    updated: "2026-08-06",
  },
  {
    slug: "protokollvaljare-smart-hem",
    name: "Protokollväljare för smart hem",
    title: "Wi-Fi, Zigbee eller Thread? Hitta rätt protokoll",
    description:
      "Fyra frågor om ditt hem och hur många enheter du planerar, så får du veta vilket protokoll för smart hem som passar och vad det innebär för hubb och räckvidd.",
    intro:
      "Protokollet är det val som är svårast att ångra. Lampan byter du för en hundralapp, men har du fyrtio enheter på fel teknik tar bytet en helg. Fyra frågor räcker för att peka ut rätt spår.",
    sections: [
      {
        heading: "Varför valet spelar roll",
        body: [
          "Alla fyra teknikerna tänder en lampa lika bra. Skillnaden märks först när enheterna blir många, och då märks den ordentligt. Wi-Fi ger varje enhet en egen plats på nätverket, vilket fungerar utmärkt tills routern får för mycket att hålla reda på. Zigbee och Thread gör tvärtom: varje enhet blir en relästation åt de andra, så nätet blir stabilare ju fler du har.",
          "Det är därför svaret nästan alltid hänger på hur många enheter du planerar. Under tio är Wi-Fi genuint enklast. Över tio slutar det vara en smaksak.",
        ],
      },
      {
        heading: "Matter är inte ett protokoll i den här bemärkelsen",
        body: [
          "Matter ligger ovanpå och avgör vilka appar en produkt fungerar i, inte hur den skickar signalen. Matter går över Wi-Fi och Thread, aldrig över Zigbee. Zigbee-produkter kommer in i ett Matter-hem via bryggan, som Philips Hue Bridge eller IKEA Dirigera, och då spelar det ingen roll att lampan själv inte kan Matter.",
          "Praktiskt betyder det att du kan välja protokoll efter hemmets förutsättningar och ändå få produkter som fungerar ihop, så länge det finns en brygga eller en border router i kedjan.",
        ],
      },
      {
        heading: "Betongväggar stoppar mer än trägolv",
        body: [
          "Ett test utfört i en trävilla och ett i en betonglägenhet ger olika svar om exakt samma produkt. Betong och armering dämpar 2,4 GHz kraftigt, vilket drabbar Wi-Fi hårdast eftersom varje enhet måste nå routern direkt. Zigbee och Thread kan i stället ta vägen via en enhet i mellanrummet.",
        ],
      },
    ],
    faq: [
      {
        question: "Är Zigbee eller Wi-Fi bäst för smart belysning?",
        answer:
          "Under tio enheter är Wi-Fi enklast, eftersom du slipper köpa en brygga och kan skruva i lampan och komma igång direkt. Över tio enheter är Zigbee bättre, eftersom lamporna då bildar ett eget nät mellan sig i stället för att var och en belasta routern. Har du betongväggar flyttas gränsen nedåt.",
      },
      {
        question: "Vad är en border router och behöver jag en?",
        answer:
          "En border router släpper in Thread-nätet i ditt vanliga nätverk, ungefär som en brygga gör för Zigbee. Du behöver en för att kunna använda Thread-enheter fullt ut, men du har troligen redan en: HomePod, Apple TV 4K, nyare Nest Hub, flera Echo-modeller och IKEA Dirigera fungerar alla som border router.",
      },
      {
        question: "Kan jag blanda Zigbee, Thread och Wi-Fi i samma hem?",
        answer:
          "Ja, och de flesta gör det. En styrapp som talar Matter kan visa enheter från alla tre samtidigt. Det du bör undvika är att sprida ut samma sorts enhet över flera tekniker utan anledning, eftersom felsökning blir betydligt svårare när du inte vet vilken teknik som strulade.",
      },
      {
        question: "Hur många Wi-Fi-enheter klarar en vanlig router?",
        answer:
          "Runt tio smarta enheter innan en normal hemmarouter börjar tappa i prestanda. Gränsen beror på routern och på vad du annars gör på nätet. Symptomen är sällan att något slutar fungera helt, utan att enheter svarar långsamt eller tappar kontakten sporadiskt, vilket är svårare att felsöka.",
      },
      {
        question: "Är Z-Wave värt att titta på?",
        answer:
          "För lampor, sällan. Z-Wave kör på 868 MHz i Europa, utanför det band Wi-Fi trängs på, och har därför bra räckvidd. Men det kräver egen hubb, stöder inte Matter och har ett mindre utbud. Det är fortfarande starkt för lås och sensorer, men som grund för belysning är Zigbee eller Thread ett rimligare val.",
      },
    ],
    usedOn: [
      "smart-belysning",
      "smart-plug",
      "smart-strombrytare",
      "elektrisk-rullgardin",
      /* Köpguiden för utomhustimer bäddade in väljaren utan att den här listan
         följde med, så verktygssidan listade fyra tester av fem. Hittat av
         `pnpm check:tools` 2026-08-04. */
      "utomhustimer",
      /* Hubbsidan bäddar in väljaren i avsnittet om när ett köp lönar sig:
         frågan "vilket protokoll" kommer före frågan "vilken hubb", och den
         som svarar wifi behöver ingen hubb alls. Samma kontroll fångade
         även den här. */
      "smart-hem-hubb",
      /* Termostatsidan bäddar in väljaren i avsnittet om att räkna på hubben
         i stället för på termostaten. Nästan varje radiatortermostat kräver
         något mer för att kunna nås utifrån, och vilket protokoll den talar
         avgör om du redan äger det eller måste köpa det. */
      "smart-termostat",
    ],
    updated: "2026-08-06",
  },
  {
    slug: "fargtemperatur",
    name: "Färgtemperaturväljare",
    title: "Färgtemperatur: så ser 2 200 K ut mot 6 500 K",
    description:
      "Dra i reglaget och se skillnaden mellan levandeljusvarmt och kallt dagsljus. Med rekommendationer för vilket rum som vill ha vilken kelvin.",
    intro:
      "Kelvin är ett tal som är svårt att föreställa sig och lätt att se. Dra i reglaget så färgas förhandsvisningen om, och läs av vad talet betyder i praktiken.",
    sections: [
      {
        heading: "Vad talet faktiskt beskriver",
        body: [
          "Färgtemperatur mäts i kelvin och beskriver ljusets ton, inte dess styrka. Skalan känns baklänges första gången man ser den: låga tal ger varmt, gulaktigt ljus och höga tal ger kallt, blåaktigt. Anledningen är att den utgår från vilken färg ett föremål glöder i när det hettas upp, och en glödande metallbit går från röd till vit ju hetare den blir.",
          "I praktiken behöver du bara tre hållpunkter. 2 200 K är levandeljusvarmt. 2 700 K motsvarar den gamla glödlampan och är det de flesta menar med varmvitt. 6 500 K är kallt dagsljus.",
        ],
      },
      {
        heading: "Rätt kelvin i rätt rum",
        body: [
          "Vardagsrum och sovrum vill ha varmt ljus, 2 700 K eller lägre. Kök och hall mår bra av något vaknare, runt 3 000 till 3 500 K. Arbetsrum och badrum tål 4 000 K, men där börjar det kännas som kontor snarare än hem. Över 5 000 K hör i praktiken hemma i garage och tvättstuga.",
          "Ska du bara ha en enda inställning i hela hemmet är 2 700 K det tryggaste valet, eftersom det är det ljus svenska hem har haft i hundra år och det ingen reagerar på.",
        ],
      },
      {
        heading: "Varför lampor som ändrar färgtemperatur är värda pengarna",
        body: [
          "Kroppen läser av ljusets färg för att avgöra vad klockan är. Kallt ljus på morgonen hjälper dig att vakna, varmt ljus på kvällen signalerar att dagen är slut. En lampa som byter automatiskt över dygnet gör den skillnaden utan att du behöver tänka på den, och det är den funktion som flest personer säger sig sakna när de går tillbaka till vanliga lampor.",
        ],
      },
    ],
    faq: [
      {
        question: "Vilken färgtemperatur ska man ha hemma?",
        answer:
          "2 700 K är det tryggaste valet för vardagsrum och sovrum, eftersom det motsvarar en gammal glödlampa. Kök och hall fungerar bra på 3 000 till 3 500 K. Har du bara en inställning att välja, ta 2 700 K, eftersom kallare ljus upplevs som obehagligt på kvällen medan varmare sällan stör någon.",
      },
      {
        question: "Vad är skillnaden mellan varmvitt och kallvitt?",
        answer:
          "Varmvitt ligger runt 2 700 K och är gulaktigt, ungefär som en glödlampa. Kallvitt ligger runt 5 000 K och drar åt blått, likt ljuset mitt på dagen. Skillnaden handlar bara om ljusets ton, inte om hur starkt det lyser, så två lampor med samma lumen och olika kelvin ger lika mycket ljus men helt olika känsla.",
      },
      {
        question: "Är kallt ljus skadligt på kvällen?",
        answer:
          "Skadligt är fel ord, men blått ljus på kvällen dämpar melatoninproduktionen och kan göra det svårare att somna. Effekten är mindre än för en skärm nära ansiktet, eftersom en taklampa sitter längre bort. Vill du undvika det helt, håll dig under 3 000 K efter mörkrets inbrott.",
      },
      {
        question: "Vad betyder K på en lampförpackning?",
        answer:
          "K står för kelvin och anger ljusets färgton. Står det ett intervall, till exempel 2 200 till 6 500 K, betyder det att lampan kan ställas om mellan de värdena. Står det ett enda tal är färgtemperaturen fast och går inte att ändra, oavsett hur smart lampan i övrigt är.",
      },
    ],
    usedOn: ["smart-belysning"],
    updated: "2026-08-06",
  },
  {
    slug: "watt-till-lumen",
    name: "Watt till lumen",
    title: "Watt till lumen: vad motsvarar en 60-wattslampa?",
    description:
      "Omvandlingstabell från gammal glödlampa i watt till lumen, så du vet vad du ska leta efter när du byter till LED.",
    intro:
      "Alla vet vad en 60-wattslampa lyser som. Nästan ingen vet vad 806 lumen lyser som, och det är samma sak. Tabellen översätter mellan de två.",
    sections: [
      {
        heading: "Varför watt slutade betyda något",
        body: [
          "Watt mäter hur mycket ström en lampa drar, inte hur mycket den lyser. Det fungerade som jämförelse så länge alla lampor var glödlampor, eftersom de omvandlade energi till ljus lika ineffektivt allihop. En 60-wattare lyste alltid ungefär lika mycket som nästa 60-wattare.",
          "LED bröt det sambandet. En LED på 9 W ger lika mycket ljus som den gamla 60-wattaren, och två LED-lampor på 9 W kan skilja fyrtio procent i ljusflöde. Därför står lumen numera först på förpackningen, och det är det talet du ska jämföra.",
        ],
      },
      {
        heading: "Effektiviteten skiljer sex gånger",
        body: [
          "Lumen per watt är måttet på hur effektiv lampan är. En genomsnittlig LED ligger runt 80 till 100 lumen per watt. Billiga lampor hamnar lägre, och lampor som pressar ut mycket ljus ur lite effekt gör det ibland på bekostnad av färgåtergivningen.",
          "Ser du en lampa som lovar betydligt fler lumen per watt än konkurrenterna till halva priset, är det värt att kontrollera CRI-värdet innan du köper.",
        ],
      },
    ],
    faq: [
      {
        question: "Hur många lumen är 60 watt?",
        answer:
          "Ungefär 806 lumen. Det är den vanligaste motsvarigheten och den du hittar på de flesta LED-lampor märkta som ersättare för en 60-wattare. Andra vanliga tal: 40 W blir 470 lumen, 75 W blir 1 055 lumen och 100 W blir 1 521 lumen.",
      },
      {
        question: "Hur många watt drar en LED som ersätter 60 watt?",
        answer:
          "Runt 8 till 9 watt. Det är alltså under en sjundedel av den gamla lampans förbrukning för samma mängd ljus. Exakt effekt varierar mellan tillverkare, vilket är just därför du ska jämföra lumen och inte watt.",
      },
      {
        question: "Varför står det fortfarande watt på förpackningen?",
        answer:
          "För att de flesta fortfarande tänker i watt. Tillverkarna skriver ofta både lampans faktiska effekt och vilken glödlampa den motsvarar, exempelvis 9 W och 60 W. Det andra talet är en jämförelse, inte en mätning, och det är lumen som är den riktiga siffran.",
      },
      {
        question: "Vad är lumen per watt?",
        answer:
          "Det är måttet på hur effektiv lampan är: hur mycket ljus den ger per enhet ström. En bra LED ligger runt 80 till 100 lumen per watt. Talet är användbart när du jämför två lampor med samma ljusflöde, eftersom den med högre lumen per watt kostar mindre att ha tänd.",
      },
    ],
    usedOn: ["smart-belysning"],
    updated: "2026-08-06",
  },
  {
    slug: "elkostnad-uttag",
    name: "Elkostnad för smarta uttag",
    title: "Vad kostar ett smart uttag i el per år?",
    description:
      "Räkna ut vad ett smart uttag kostar att äga, inklusive den ström uttaget självt drar dygnet runt. Viloförbrukningen skiljer fem gånger mellan produkterna.",
    intro:
      "Ett smart uttag drar ström hela tiden, även när det som sitter i det är avstängt. Radion måste vara vaken för att kunna ta emot kommandot att slå på. Skillnaden mellan produkterna är däremot mycket större än för smarta lampor, och det är den siffran den här räknaren handlar om.",
    sections: [
      {
        heading: "Fem gånger skillnad, och nästan ingen skriver ut den",
        body: [
          "TP-Link anger 1,48 W i viloläge för Tapo P100. Plejd anger 0,3 W för SPR-01. Det är nära fem gånger så mycket för en produkt som ser likadan ut i hyllan och kostar ungefär lika mycket. 1,48 W dygnet runt blir 13 kilowattimmar om året, mer än en smart lampa drar när den faktiskt lyser.",
          "Med sex uttag och två kronor per kilowattimme skiljer det ungefär hundrafemtio kronor om året mellan den snålaste och den törstigaste, bara för att stå påslagna och vänta. Det är inte en avgörande summa, men det är värt att veta när produkten ofta säljs med argumentet att den ska spara el.",
        ],
      },
      {
        heading: "Siffran står i manualen, inte i butiken",
        body: [
          "Butikssidan har den nästan aldrig, men tillverkarens specifikation eller den manual butiken länkar har den oftast. Plejd anger 0,3 W, TP-Link 1,48 W, och både Cleverio och Shelly anger under 1 W. Philips är den som inte publicerar något alls för sitt uttag.",
          "Saknas uppgiften är 1 W en rimlig utgångspunkt för ett wifi-uttag, och räknaren låter dig sätta talet själv. Bluetooth- och Zigbee-baserade uttag ligger som regel lägre, eftersom radion är enklare och inte behöver hålla en wifi-anslutning vid liv.",
        ],
      },
      {
        heading: "Vad du faktiskt ska jämföra",
        body: [
          "Det intressanta är förhållandet mellan vad apparaten drar och vad uttaget drar. Ett smart uttag på ett element som går tre timmar om dygnet är helt försumbart i sammanhanget. Samma uttag på en LED-lampa på 9 W kan mycket väl dra mer i viloläge än lampan gör när den lyser.",
          "Slutsatsen är alltså inte att undvika smarta uttag, utan att inte sätta dem på apparater som redan drar nästan ingenting. Där gör de ingen nytta som motsvarar sin egen förbrukning.",
        ],
      },
    ],
    faq: [
      {
        question: "Hur mycket ström drar ett smart uttag i viloläge?",
        answer:
          "Mellan ungefär 0,3 och 1,5 watt beroende på modell och protokoll. TP-Link anger 1,48 W för Tapo P100 och Plejd anger 0,3 W för SPR-01, nära fem gånger skillnad. Wifi-baserade uttag ligger som regel högst eftersom radion måste hålla en anslutning vid liv, medan Bluetooth- och Zigbee-uttag klarar sig på mindre.",
      },
      {
        question: "Vad kostar sex smarta uttag i el per år?",
        answer:
          "Bara uttagens egen viloförbrukning landar på runt 30 kronor per år vid 0,3 W styck och runt 155 kronor vid 1,48 W, räknat med två kronor per kilowattimme. Ovanpå det kommer förstås vad apparaterna du kopplar in drar, vilket i de flesta hem är den betydligt större posten.",
      },
      {
        question: "Kan ett smart uttag dra mer än det sparar?",
        answer:
          "Ja, och det gäller fler uttag än man skulle gissa. Ett uttag som drar 1,5 W dygnet runt förbrukar 13 kilowattimmar om året. Sitter det på en golvlampa med LED som lyser två timmar om dygnet drar lampan runt 7 kilowattimmar. Uttaget kostar alltså nästan dubbelt så mycket som det styr. På ett element eller en billaddare är förhållandet det omvända.",
      },
      {
        question: "Vilket elpris ska jag räkna med?",
        answer:
          "Använd totalpriset per kilowattimme, inte spotpriset. I totalpriset ingår elhandelspriset, elnätsavgiften, energiskatten och momsen, och summan brukar hamna mellan 1,50 och 2,50 kronor beroende på elområde och avtal. Priset står på din elräkning.",
      },
    ],
    usedOn: ["smart-plug"],
    updated: "2026-08-06",
  },
  {
    slug: "effektkoll-smart-plug",
    name: "Effektkoll för smart plug",
    title: "Klarar pluggen din apparat? Effektkoll för smart plug",
    description:
      "Välj vad du ska koppla in och var uttaget sitter, så får du veta om du behöver 10 eller 16 ampere, vilken kapslingsklass och vilken drifttemperatur.",
    intro:
      "Det vanligaste felköpet i den här kategorin är en plugg som inte klarar det den ska styra. Välj apparat och plats, så får du märkningen att leta efter.",
    sections: [
      {
        heading: "10 eller 16 ampere är hela frågan",
        body: [
          "Smarta uttag säljs i praktiken i två storlekar: märkta för 10 ampere, som är 2 300 watt, eller för 16 ampere, som är 3 680 watt. Skillnaden avgör vad du kan koppla in, och den syns nästan alltid i produktnamnet hos svenska butiker.",
          "Golvlampor, tv-apparater, routrar och kaffebryggare ligger långt under gränsen. Element, vattenkokare, torkskåp och kupévärmare gör det inte. Rekommendationen är att lägga minst tjugo procent på apparatens märkeffekt, eftersom en apparat som står på i timmar inte ska ligga och arbeta i taket av vad adaptern tål.",
        ],
      },
      {
        heading: "Motorer räknas annorlunda",
        body: [
          "Märkningen på ett smart uttag gäller resistiv last: sådant som bara omvandlar ström till värme. Pumpar, fläktar, kompressorer, kylskåp och avfuktare innehåller i stället en motor, och en motor drar en kraftig startström under någon sekund varje gång den går i gång.",
          "Den toppen syns inte i den siffra som står på apparaten. Därför pekar räknaren på 16 ampere så fort det du kopplar in innehåller en motor, även när märkeffekten ser låg ut.",
        ],
      },
      {
        heading: "Platsen avgör kapslingsklass och temperatur",
        body: [
          "Ska uttaget sitta ute eller i ett ouppvärmt utrymme räcker det inte att effekten stämmer. Kapslingsklassen ska vara minst IP44 för att tåla fukt och stänk, och drifttemperaturen ska täcka det kallaste platsen blir.",
          "Det andra är det som oftast missas. Ett vanligt inomhusuttag är inte sällan specat ner till noll grader, vilket gör det opålitligt i ett garage på vintern. Shelly Outdoor Plug S Gen3 anger −25 till 51 °C, medan flera konkurrenter stannar vid −20 °C. Uppgiften står i databladet, inte alltid i butiken.",
        ],
      },
    ],
    faq: [
      {
        question: "Hur många watt klarar en smart plug?",
        answer:
          "Antingen 2 300 watt eller 3 680 watt, det vill säga 10 eller 16 ampere. Vilket det är står nästan alltid i produktnamnet hos svenska butiker. Kopplar du in något som drar mer än pluggen är märkt för blir den varm, och i värsta fall smälter den. Lägg minst tjugo procent marginal på apparatens märkeffekt.",
      },
      {
        question: "Vilken smart plug klarar ett element?",
        answer:
          "En som är märkt för 16 ampere, motsvarande 3 680 watt. Ett oljefyllt element drar mellan 1 000 och 2 000 watt, vilket i sig ryms i en 10 A-plugg, men marginalen blir för liten för något som står på i timmar. Element är dessutom den vanligaste svenska anledningen att köpa ett smart uttag, och den mest rekommenderade pluggen i Sverige klarar det inte.",
      },
      {
        question: "Kan jag koppla en pump eller fläkt till ett smart uttag?",
        answer:
          "Ja, men välj 16 ampere även om apparatens märkeffekt ser låg ut. Motorer drar en startström som är flera gånger högre än märkeffekten under någon sekund varje gång de startar, och den toppen står inte på apparaten. En pump på 400 watt kan dra över 1 500 watt i startögonblicket.",
      },
      {
        question: "Vad betyder IP44 på ett smart uttag?",
        answer:
          "Att uttaget tål stänkande vatten från alla håll och fasta föremål större än en millimeter. Det är miniminivån för utomhusbruk och för fuktiga utrymmen som garage och krypgrund. IP20, som gäller för de flesta inomhusuttag, betyder att kapslingen skyddar mot fingrar men inte mot vatten alls.",
      },
      {
        question: "Fungerar ett smart uttag i minusgrader?",
        answer:
          "Bara om det är specat för det. Många inomhusuttag anger noll grader som lägsta drifttemperatur, vilket gör dem opålitliga i ett ouppvärmt garage. Utomhusmodeller ligger normalt mellan −20 och −25 grader som lägst. Uppgiften står i databladet och ibland i butikens specifikation, men den finns nästan aldrig med i jämförelser.",
      },
    ],
    usedOn: ["smart-plug"],
    updated: "2026-08-06",
  },
  {
    slug: "installationsguide-strombrytare",
    name: "Installationsguiden",
    title: "Smart strömbrytare: vilken typ får du installera själv?",
    description:
      "Svara på tre frågor och få veta vilken typ av smart strömbrytare som fungerar i din dosa, vad Elsäkerhetsverkets regler säger om att göra jobbet själv, och vilka av produkterna vi testat som passar.",
    intro:
      "Två frågor avgör vilken smart strömbrytare som är möjlig hemma hos dig, och de hänger ihop. Har du nolledare i dosan bestämmer vilka produkter som fungerar. Om du byter knappen eller lägger in en modul bakom den bestämmer om du får göra jobbet själv. Svara på frågorna nedan så får du båda svaren, plus vilka av produkterna vi testat som klarar det.",
    sections: [
      {
        heading: "Byta eller förändra, det är hela skillnaden",
        body: [
          "Elsäkerhetsverket delar upp elarbete i hemmet efter vad du gör, inte efter hur avancerat det känns. På listan över vad en privatperson får utföra själv står bland annat att byta en befintlig strömbrytare för högst 16 A som sitter i en egen kapsling eller dosa. Myndigheten lägger till ett villkor med egna ord: om du vet hur du ska göra.",
          "Att i stället lägga in en relämodul bakom den befintliga knappen är något annat. Då tillför du en enhet till den fasta installationen, och förändringar i den fasta installationen kräver ett registrerat elinstallationsföretag. Kjell & Company skriver det själva rakt ut på sina produktsidor för både Shelly 1 Gen4 och Philips inbyggnadsrelä.",
          "Det ger ett resultat som är lätt att missa: den typ av produkt som nästan alla guider rekommenderar är den som kräver elektriker, och den typ du faktiskt får montera själv nämns sällan. Det är inte för att relämodulerna är sämre, utan för att de är osynliga och behåller husets utseende. Men det är inte samma jobb.",
        ],
      },
      {
        heading: "Nolledaren, som avgör mer än folk tror",
        body: [
          "En smart brytare behöver ström dygnet runt för att kunna ta emot kommandot att tända. Till det krävs både fas och nolledare i dosan. I många äldre svenska hem går bara fasen till brytaren, medan nolledaren möter lampan uppe i taket, och då fungerar inte en produkt som kräver nolla.",
          "Hur avgörande det är syns tydligast i butikshyllan. Kjell säljer Aqara Smart Wall Switch H1 som två separata artikelnummer, ett med och ett utan krav på neutralledare, och versionen som klarar sig utan kostar 90 kronor mer. Den som bor i ett äldre hus betalar alltså mer för samma funktion.",
          "Att dra fram en nolledare löser förstås problemet, men det är en förändring av den fasta installationen och alltså inget du gör själv. Räkna med att arbetet kostar mer än produkten. Vill du undvika hela frågan finns en tredje väg: en trådlös batteribrytare rör aldrig 230 volt, kräver varken nolledare eller elektriker och får sättas upp av vem som helst.",
        ],
      },
      {
        heading: "Vad guiden inte kan avgöra",
        body: [
          "Guiden läser inte din dosa. Det utgår från vad du svarar, och svarar du fel får du fel råd. Är du osäker på om du har nolledare ska du räkna med att du inte har det tills du sett efter, och att titta efter kräver att strömmen är bruten.",
          "Reglerna återges dessutom i sammandrag. Elsäkerhetsverkets egna sidor är länkade under Källor på testsidan och är det som gäller. Myndighetens egen formulering är att du alltid ska kontakta ett elinstallationsföretag om du är det minsta osäker, med motiveringen att felaktiga kopplingar kan innebära livsfara. Det är inte en brasklapp vi lagt till för säkerhets skull.",
        ],
      },
    ],
    faq: [
      {
        question: "Får jag byta en strömbrytare själv i Sverige?",
        answer:
          "Ja, under förutsättningar. Elsäkerhetsverket listar att byta en befintlig strömbrytare för högst 16 A som sitter i egen kapsling eller dosa som tillåtet egenarbete, med tillägget att det gäller om du vet hur du ska göra. Du får byta, inte flytta, och inget i den fasta installationen får förändras. Är du det minsta osäker ska du enligt myndigheten kontakta ett elinstallationsföretag, eftersom felaktiga kopplingar kan innebära livsfara.",
      },
      {
        question: "Krävs elektriker för att installera Shelly?",
        answer:
          "En Shelly-modul som läggs in bakom en befintlig strömbrytare tillför en enhet till den fasta installationen, vilket kräver ett registrerat elinstallationsföretag. Kjell & Company anger själva att installation kräver behörig elektriker på produktsidan för Shelly 1 Gen4. Det gäller oavsett hur enkel kopplingen ser ut i tillverkarens schema.",
      },
      {
        question: "Vad gör jag om jag saknar nolla i dosan?",
        answer:
          "Du har tre alternativ. Byt själva knappen mot en smart brytare som är byggd för att klara sig utan nolledare, till exempel Aqara Smart Wall Switch H1 i versionen utan neutralledare. Sätt upp en trådlös batteribrytare som inte kopplas till 230 volt alls. Eller låt ett registrerat elinstallationsföretag dra fram en nolledare, vilket är en förändring av den fasta installationen och normalt kostar mer i arbete än produkten kostar i inköp.",
      },
      {
        question: "Hur ser jag om det finns nolledare bakom strömbrytaren?",
        answer:
          "Slå av säkringen, kontrollera att strömmen är bruten, skruva loss brytaren och titta efter en blå ledare utöver de svarta eller bruna. Finns den är det sannolikt nolledaren. Ett vanligt undantag är att ett vägguttag sitter i golvnivå rakt under brytaren, för då passerar ofta en nolledare genom dosan bakom knappen. Är du osäker på vad du ser ska du fråga en elektriker i stället för att gissa.",
      },
      {
        question: "Är en smart väggbrytare eller en relämodul bäst?",
        answer:
          "De löser olika problem. En relämodul göms i dosan, din befintliga knapp fungerar som förut och huset ser likadant ut, men installationen kräver elektriker. En smart väggbrytare ersätter knappen, ger nya funktioner direkt på väggen och är ett brytarbyte som du får göra själv om du vet hur. Saknar du nolledare i dosan är brytaren dessutom det enda av de två som finns i en variant som fungerar.",
      },
    ],
    /* Bumpad 2026-08-06: Nexa infälld lades till i verktygets produktlista,
       där den saknats sedan den flyttade in i rankningen. */
    usedOn: ["smart-strombrytare"],
    updated: "2026-08-06",
  },
  {
    /* "monteringsvaljare-gardin" och inte bara "monteringsvaljare": slugen
       måste överleva ett andra verktyg av samma sort. Den dag persienner eller
       markiser får en egen väljare skulle en naken "monteringsvaljare" behöva
       byta URL och tappa sina placeringar. */
    slug: "monteringsvaljare-gardin",
    name: "Monteringsväljaren",
    title: "Smarta gardiner: vilken motor passar din upphängning?",
    description:
      "Svara på vad som hänger i fönstret och få veta vilken typ av gardinmotor som går att montera, vad skillnaden mellan U-skena, I-skena och stång innebär, och vilka av produkterna vi rankat som passar.",
    intro:
      "Felköpet i den här kategorin är inte att man väljer en sämre produkt, utan att man väljer en som inte går att sätta fast. Motorerna säljs som olika artikelnummer för U-skena, I-skena och gardinstång, och artiklarna heter nästan likadant och kostar nästan lika mycket. Svara på frågorna nedan så får du veta vilken typ du ska leta efter och vilka av produkterna vi rankat som passar.",
    sections: [
      {
        heading: "Titta uppåt innan du beställer",
        body: [
          "En gardinstång är ett runt rör där gardinen hänger i ringar, öglor eller klämmor som glider utanpå. En gardinskena är en profil skruvad i tak eller vägg, där gardinen hänger i glidare som löper inuti profilen. Skillnaden syns på en sekund när du vet vad du ska titta efter, och den avgör vilken artikel du ska köpa.",
          "Skenor finns i sin tur i två utföranden. En U-skena är öppen nedåt som ett upp och nedvänt U, och det är den vanligaste i svenska hem. En I-skena har spår på båda sidor om en mittdel, sedd från sidan ungefär som bokstaven I. Motorn behöver få grepp om skenan för att kunna dra sig fram längs den, och greppet ser olika ut i de två fallen.",
          "Rullgardiner och persienner är något helt annat. Där finns ingen gardin att dra i sidled, utan en kedja att rulla eller lameller att vinkla, och det kräver egna produkttyper som inte har något gemensamt med gardinrobotarna annat än appen.",
        ],
      },
      {
        heading: "Varför butikernas produktnamn inte hjälper",
        body: [
          "I Kjells kategori ligger \"Curtain Driver E1 Gardinkontroll för gardinstång\" och \"Curtain Driver E1 Gardinkontroll för U- och I-skena\" bredvid varandra. Hos Proshop heter samma sak \"Curtain Rod 3\" och \"Curtain U Rail 3\". Namnen skiljer sig på ett ord, produktbilderna är närmast identiska och priserna ligger inom hundralappen från varandra.",
          "Det gör att felköpet är lätt att göra även för den som vet vilken skena som sitter uppe. Rådet är enkelt: bestäm upphängningen först, leta upp artikelnumret sedan, och beställ på numret i stället för på modellnamnet.",
          "Har du I-skena finns det ett svar, och det är Aqara Curtain Driver E1 i skenversion. Den får sitta på både U-skena och I-skena, till skillnad från alla andra motorer här, och kravet är att I-skenans underkant är slät och bredare än 10 millimeter. Mät med en linjal innan du beställer.",
        ],
      },
      {
        heading: "Vad väljaren inte kan avgöra",
        body: [
          "Guiden ser inte ditt fönster. Det utgår från vad du svarar, och svarar du fel får du fel förslag. Är du osäker på vilken skena du har är det bästa rådet att fotografera den underifrån och jämföra med butikens produktbilder innan du beställer.",
          "Det tar heller inte hänsyn till friktion, som i praktiken stoppar fler motorer än vikten gör. En skena som går trögt, glidare som kärvar eller en gardin som fastnar mot fönsterbrädan kräver mer kraft än tyget väger. Dra gardinen för hand först, och känns det trögt för dig blir det trögt för motorn.",
        ],
      },
    ],
    faq: [
      {
        question: "Hur ser jag om jag har U-skena eller I-skena?",
        answer:
          "Titta på skenan underifrån. Är den öppen nedåt som ett upp och nedvänt U, med glidarna dolda inuti och bara en springa synlig, är det en U-skena. Har den i stället spår på båda sidor om en mittdel, så att tvärsnittet liknar bokstaven I, är det en I-skena. U-skena är den vanligaste i svenska hem. Är du osäker, fotografera skenan underifrån och jämför med butikens produktbilder innan du beställer.",
      },
      {
        question: "Passar en gardinmotor för skena även på gardinstång?",
        answer:
          "Nej. Motorn måste få grepp om upphängningen för att kunna dra sig fram längs den, och greppet ser helt olika ut på en rund stång och i en skena. Både SwitchBot och Aqara säljer därför separata artiklar för de två fallen. Artiklarna heter nästan likadant och kostar ungefär lika mycket, så beställ på artikelnumret i stället för på modellnamnet.",
      },
      {
        question: "Kan jag motorisera en rullgardin utan att byta den?",
        answer:
          "Ja, om den har en kedja. Det finns motorer som hakar i kedjan och rullar upp och ner gardinen du redan har, vilket är det billiga alternativet och kostar från runt 750 kronor. Alternativet är en komplett motoriserad rullgardin som ersätter den gamla helt, vilket kostar ungefär tre gånger så mycket men slipper kämpa mot den befintliga mekanismen och därför både låter och sliter mindre.",
      },
      {
        question: "Finns det smarta motorer för persienner?",
        answer:
          "Ja, men utbudet är magert. När vi gick igenom svensk handel hittade vi ett enda eftermonterat alternativ, och det vinklar lamellerna snarare än hissar upp persiennen. Vill du kunna hissa upp den behöver du en persienn som redan är motoriserad, och till den en 230 V-modul som kräver elektriker.",
      },
      {
        question: "Behöver jag två motorer till ett fönster?",
        answer:
          "Om gardinerna möts på mitten och ska dras åt varsitt håll, ja. Varje motor drar en gardinhalva, så ett fönster med två våder kräver två enheter. Har du i stället en enda gardin som dras åt ett håll räcker en. Det är värt att räkna på innan du beställer, eftersom det dubblar kostnaden per fönster.",
      },
    ],
    /* Bumpad 2026-08-06: I-skenefrågan var beskriven som olöst, och Aqaras egen
       manual avgjorde den. Verktyget föreslår nu skenversionen för I-skena. */
    usedOn: ["elektrisk-rullgardin"],
    updated: "2026-08-06",
  },
  {
    /* "timervaljare-utomhus" och inte bara "timervaljare": slugen måste
       överleva ett andra verktyg av samma sort. En bevattningstimer eller en
       timer för inomhusbruk skulle annars tvinga fram ett URL-byte. */
    slug: "timervaljare-utomhus",
    name: "Timerväljaren",
    title: "Utomhustimer: mekanisk, digital eller smart?",
    description:
      "Svara på vad timern ska styra, när den ska användas och om du vill nå den hemifrån. Guiden säger vilken sorts utomhustimer som räcker, vilken märkeffekt du behöver och vilka av produkterna vi rankat som klarar det.",
    intro:
      "Priset förutsäger inte kapaciteten i den här kategorin. Julas mekaniska timer på 49,90 kronor klarar 3 500 W medan deras digitala på 99,90 stannar vid 1 800, och ett skymningsrelä för 129 kronor klarar 1 000. Den som köper den lite bättre till motorvärmaren köper alltså ofta den som inte räcker. Svara på de tre frågorna nedan så får du veta vad som faktiskt behövs.",
    sections: [
      {
        heading: "Räkna ihop hela lasten, inte bara den apparat du tänker på",
        body: [
          "Effekten står oftast på en dekal på apparaten, ibland i ampere i stället för watt, och då är effekten ampere gånger 230. Lägg på tjugo procent marginal på summan. En apparat som står på i timmar ska inte ligga precis på gränsen, och märkeffekten på förpackningen är ett typvärde snarare än ditt värde.",
          "Motorvärmaren är det vanligaste räknefelet. Själva motorvärmaren ligger ofta mellan 400 och 1 000 W, vilket ryms i nästan vad som helst. Men kupévärmaren som sitter på samma uttag kan ensam dra 1 500 W eller mer, och det är summan timern ska klara. Har du båda ska du leta efter märkningen 3 680 W, som är 16 ampere.",
          "Pumpar, fläktar och kompressorer är ett eget fall. De drar en startström som under någon sekund ligger flera gånger över märkeffekten, och den toppen syns inte i siffran på apparaten. Ta 16 A även när märkeffekten ser låg ut.",
        ],
      },
      {
        heading: "Astro behövs inte alltid, och det är säsongen som avgör",
        body: [
          "En astrotimer räknar ut när solen går upp och ner på din plats och flyttar tändningen efter årstiden. Ett skymningsrelä löser samma sak enklare genom att mäta hur ljust det faktiskt är. Båda gör att du aldrig behöver ställa om.",
          "Men behovet finns bara om belysningen ska gå över en längre period. Mellan december och juni flyttar sig solnedgången i Sverige omkring sju timmar, och en timer med fast klockslag blir då grovt fel. Under en julsäsong på sex veckor rör den sig i stället knappt tjugo minuter, och där tillför astrofunktionen ingenting som är värt att betala för.",
          "Det är därför guiden rekommenderar en mekanisk timer till julbelysningen även om du svarat att lasten är stor. Frågan guiden besvarar är vad som räcker, inte vad som är mest avancerat.",
        ],
      },
      {
        heading: "Fjärrstyrning är ett eget svar",
        body: [
          "Vill du kunna ändra tiden när du inte står bredvid produkten krävs en smart plugg med wifi, Zigbee eller Z-Wave. Det finns en mellanform som är lätt att missa: en Bluetooth-styrd plugg programmeras från mobilen men bara inom cirka femton meter. Det räcker för att slippa böja sig ner och trycka på segment, men inte för att släcka hemifrån jobbet.",
          "Fjärrstyrningen har ett verkligt värde just för motorvärmaren, eftersom avresetiden ändras oftare än julbelysningens tändningstid. Den har ett betydligt mindre värde för en ljusslinga som ska lysa samma timmar varje kväll i sex veckor.",
          "Zigbee och Z-Wave kräver dessutom en hubb. Har du ingen sedan tidigare är en wifi-plugg det enklare valet, även om radion i sig är sämre.",
        ],
      },
    ],
    faq: [
      {
        question: "Hur många watt klarar en utomhustimer?",
        answer:
          "Spannet är fyra gånger inom samma kategori. De bästa är märkta för 3 680 W, motsvarande 16 ampere. En vanlig mekanisk utomhustimer ligger runt 3 500 W. Digitala timers ligger ofta lägre: Julas digitala utomhustimer stannar vid 1 800 W. Ett skymningsrelä klarar typiskt 1 000 W. Siffran står i produktens specifikation och är det första du ska kontrollera, eftersom den inte följer priset.",
      },
      {
        question: "Behöver jag astrofunktion till julbelysningen?",
        answer:
          "Nej, inte för en säsong i december. Solnedgången rör sig knappt tjugo minuter under de sex veckor julbelysningen är uppe, så ett fast klockslag som du ställer en gång fungerar hela säsongen. Astrofunktion eller skymningsrelä blir intressant först när belysningen ska gå året runt, eftersom solnedgången då flyttar sig omkring sju timmar mellan vinter och sommar.",
      },
      {
        question: "Vad är skillnaden mellan astrotimer och skymningsrelä?",
        answer:
          "En astrotimer räknar ut solens upp- och nedgång utifrån datum och plats, med en formel. Ett skymningsrelä mäter i stället hur ljust det verkligen är med en sensor. Astro fungerar oavsett var sensorn sitter och kan förskjutas med ett antal minuter, men kräver att produkten vet var den står. Skymningsreläet är okänsligt för allt det men känsligt för placeringen: sitter sensorn där gatubelysningen lyser på den tänder den aldrig.",
      },
      {
        question: "Kan jag använda en inomhustimer utomhus om den sitter torrt?",
        answer:
          "Nej. Elsäkerhetsverket sätter IP44 som gräns för det som placeras på mark utomhus, och en inomhustimer är typiskt IP20: skyddad mot fingrar men inte mot vatten. Att lägga den i ett skyddat läge eller i en påse gör den inte godkänd, och fukt i en produkt med 230 volt är en brandrisk snarare än ett funktionsproblem.",
      },
      {
        question: "Fungerar timern om strömmen går?",
        answer:
          "Det beror på typen. En mekanisk timer stannar och tappar tiden, så den går fel med exakt avbrottets längd tills någon ställer om den. En digital med backupbatteri behåller tiden, och batteriet räcker ofta ett par dygn eller mer. En smart plugg behåller schemat i minnet men kan tappa fjärrstyrningen så länge nätet är nere. Ett skymningsrelä har ingen klocka alls och kan därför inte gå fel.",
      },
    ],
    usedOn: ["utomhustimer"],
    updated: "2026-08-06",
  },
  {
    /* "elkostnad-julbelysning" och inte "elkostnad": samma räknare finns redan
       för lampor och för smarta uttag, med andra förinställningar. Ämnet i
       slugen är det som håller de tre isär. */
    slug: "elkostnad-julbelysning",
    name: "Elkostnad för julbelysningen",
    title: "Vad kostar julbelysningen i el?",
    description:
      "Räkna ut vad ljusslingorna kostar under säsongen. Ange antal, effekt och hur många timmar de lyser, så får du kilowattimmar och kronor, och vad en timer faktiskt sparar.",
    intro:
      "Julbelysning har rykte om sig att kosta pengar, och för LED-slingor stämmer det sällan. Räknaren nedan är förinställd på femton slingor på 5 W som lyser åtta timmar om dygnet, vilket är en normal svensk villa. Siffran som kommer ut är oftast lägre än väntat, och det är värt att veta innan du köper en timer för att spara el.",
    sections: [
      {
        heading: "LED ändrade kalkylen helt",
        body: [
          "En gammal glödlampsslinga med tjugo lampor på 3 W drog 60 W. En LED-slinga med samma antal ljuspunkter drar ofta 3 till 5 W totalt, en tiondel. Det är därför gamla tumregler om vad julbelysning kostar nästan alltid är för höga i dag.",
          "Räkna med runt 2 kronor per kilowattimme inklusive nät och skatt om du inte vet ditt eget pris. En slinga på 5 W som lyser åtta timmar om dygnet i sex veckor drar cirka 1,7 kWh, några kronor för hela säsongen.",
          "Det som faktiskt kostar är antalet och tiden, inte slingan. Femton slingor som lyser dygnet runt i stället för åtta timmar blir tre gånger så mycket, och där börjar det synas på räkningen.",
        ],
      },
      {
        heading: "Timern sparar mindre än den lovar",
        body: [
          "Skillnaden mellan att lysa åtta timmar och dygnet runt är tre gånger elen, men på en LED-uppsättning är utgångsläget så lågt att tre gånger fortfarande är litet. En timer på 49,90 kronor tjänar in sig, en smart plugg på 259 kronor gör det oftast inte på elen ensam.",
          "Det verkliga argumentet för en timer är ett annat, och Elsäkerhetsverket formulerar det: timerfunktion och fjärrstyrning minskar risken att belysningen glöms tänd. Det handlar alltså om att slippa komma ihåg, och om att inte ha ström framme i onödan.",
          "En smart plugg drar dessutom själv runt 1 W dygnet runt för att kunna ta emot kommandot att slå på. På en uppsättning som bara lyser sex veckor om året kan pluggens egen viloförbrukning under resten av året äta upp en del av vinsten, vilket du kan pröva i räknaren genom att skriva in en viloförbrukning.",
        ],
      },
      {
        heading: "Så använder du räknaren",
        body: [
          "Effekten per slinga står på förpackningen eller på transformatorn. Saknas den är 5 W ett rimligt antagande för en LED-slinga och 40 W för en äldre glödlampsslinga.",
          "Timmarna är den siffra som gör störst skillnad. Åtta timmar motsvarar ungefär från skymning till läggdags. Dygnet runt är vad som händer när ingen släcker.",
          "Vill du jämföra med vad en smart plugg drar i viloläge skriver du in den siffran i fältet för viloförbrukning. Räknaren lägger då till den dygnet runt, vilket är hur den faktiskt fungerar.",
        ],
      },
    ],
    faq: [
      {
        question: "Vad kostar det att ha julbelysningen tänd?",
        answer:
          "Betydligt mindre än de flesta tror om slingorna är LED. En slinga på 5 W som lyser åtta timmar om dygnet i sex veckor drar cirka 1,7 kWh, några kronor för hela säsongen med ett elpris runt 2 kronor per kilowattimme. Femton sådana slingor blir cirka 25 kWh, runt 50 kronor. Lyser samma uppsättning dygnet runt blir det i stället runt 150 kWh och några hundralappar.",
      },
      {
        question: "Drar en ljusslinga ström när den är släckt?",
        answer:
          "Slingan gör det inte, men transformatorn kan göra det om den sitter kvar i uttaget. Moderna adaptrar drar mycket lite, ofta under 0,3 W. Sitter belysningen på en smart plugg drar däremot pluggen själv omkring 1 W dygnet runt året om, eftersom radion måste vara vaken för att kunna ta emot kommandot att slå på.",
      },
      {
        question: "Lönar sig en timer till julbelysningen?",
        answer:
          "På elen ensam lönar sig en mekanisk timer på 49,90 kronor, medan en smart plugg på 259 sällan gör det för en LED-uppsättning. Det starkare skälet är att belysningen inte står tänd i onödan och att du slipper komma ihåg att släcka, vilket Elsäkerhetsverket lyfter som en säkerhetsvinst snarare än en besparing.",
      },
    ],
    usedOn: ["utomhustimer"],
    updated: "2026-08-06",
  },
  {
    /* Slugen namnger ämnet och inte funktionen, enligt namnregeln i filhuvudet:
       `skalvaljare` hade blivit tvetydig den dag vi bygger en väljare för
       Samsung-skal eller för skärmskydd. */
    /* Slugen namnger produkten och inte funktionen, enligt namnregeln i
       filhuvudet. `fodralvaljare` hade varit tvetydig av exakt samma skäl som
       gör testsidans slug tvetydig: ordet fodral täcker både plånboksfodral
       och mobilskydd i svensk handel. */
    slug: "planboksfodralvaljare",
    name: "Plånboksfodralväljaren",
    title: "Vilket plånboksfodral till iPhone behöver du?",
    description:
      "Svara på tre frågor om hur du laddar, vad som ska få plats och hur länge fodralet ska hålla. Du får kraven och de fodral vi rankat som uppfyller dem, eller beskedet att kombinationen inte finns.",
    intro:
      "Ett plånboksfodral tvingar fram ett val som ingen produktsida skriver ut: du kan få en hel plånbok, eller trådlös laddning, men inte båda. Svara på tre frågor så får du veta vilka fodral som klarar just dina krav, och när kraven inte går ihop får du veta varför.",
    sections: [
      {
        heading: "Så tänker väljaren",
        body: [
          "Den första frågan är laddningen, och den har tre svar i stället för två. Ett fodral kan blockera trådlös laddning helt, vilket sju av tolv gör, och då ska telefonen ur fodralet varje kväll. Det kan ladda genom fodralet men sakna magnetring, och då måste laddaren läggas rätt för hand varje gång. Eller så har det magnetring, och då dras laddaren till rätt läge av sig själv precis som utan fodral. Bara två fodral i jämförelsen klarar det sista.",
          "Den andra frågan är vad som ska få plats. Kortkapaciteten spänner från två fack till tio, och myntfacket finns bara i tre av tolv. Det är myntfacket snarare än kortfacken som avgör om plånboken kan lämnas hemma helt, eftersom mynt i en annan ficka betyder att du fortfarande bär två saker.",
          "Den tredje är materialet. Ett fodral viks flera gånger om dagen, och det är i vecket skillnaden syns: läderimitation spricker där, garvat läder mjuknar och mörknar. Väljer du att fodralet ska hålla länge filtrerar verktyget bort allt utom garvat läder.",
        ],
      },
      {
        heading: "När svaret blir tomt är det inte ett fel",
        body: [
          "Flera kombinationer går inte att uppfylla, och det är verktygets mest användbara besked. Inget fodral i jämförelsen kombinerar nio kortfack med trådlös laddning: de som laddar tar tre kort, och de som tar nio eller tio blockerar laddningen. Inget fodral med myntfack laddar trådlöst. Och alla fodral med nio fack eller fler är i läderimitation, eftersom fler fack kräver ett tunnare och mjukare material.",
          "Det är kategorins verkliga avvägning, och den står inte utskriven någonstans i handeln. När väljaren säger att kombinationen inte finns är det svaret på frågan, inte ett tomt sökresultat.",
        ],
      },
    ],
    faq: [
      {
        question: "Varför får jag inget resultat?",
        answer:
          "För att kombinationen du valt inte finns, och verktyget säger vilken av kraven som krockar. Det vanligaste är en hel plånbok plus trådlös laddning. Fodral som laddar genom materialet är tunna och tar tre kort, medan fodral med nio eller tio fack bygger så mycket att laddningen inte når igenom. Släpp det krav som betyder minst för dig, så kommer träffarna tillbaka.",
      },
      {
        question: "Varför föreslås inte alltid testvinnaren?",
        answer:
          "För att frågan här är en annan än den rankningen svarar på. Rankningen säger vilket fodral som är bäst sammantaget, väljaren säger vilka som klarar just dina krav. Ska du bära hela plånboken är vinnaren fel svar, eftersom den tar tre kort, och då föreslås ett fodral som ligger längre ner men tar tio. Träffarna sorteras dessutom billigast först, eftersom frågan är vad som räcker.",
      },
      {
        question: "Varför frågar verktyget inte om RFID-skydd?",
        answer:
          "Eftersom uppgiften inte skiljer produkterna åt. Alla som anger ett RFID-skydd anger samma sak, ett ja utan dämpning, frekvens eller standard, och både det billigaste och det dyraste fodralet i jämförelsen anger det. Ett filter på ett ja som alla har hade sett ut som ett urval utan att vara ett. Vad skyddet faktiskt gör står i köpguiden.",
      },
    ],
    usedOn: ["iphone-fodral"],
    updated: "2026-08-06",
  },
  {
    slug: "skaltypsvaljare",
    name: "Skaltypsväljaren",
    title: "Vilken sorts iPhone-skal behöver du?",
    description:
      "Svara på tre frågor om var telefonen är, hur du laddar och hur skalet ska se ut, så får du veta vilken sorts skal som räcker och vilka av de skal vi rankat som uppfyller kraven.",
    intro:
      "Skal går inte att skilja åt på priset och knappt på bilden. Två skal från samma tillverkare kan heta nästan samma sak, se identiska ut och kosta 70 kronor isär, där det ena har magnetring och det andra inte. Svara på tre frågor, så får du kraven och de skal som uppfyller dem.",
    sections: [
      {
        heading: "Så tänker väljaren",
        body: [
          "Tre saker skiljer skalen åt i praktiken, och ingen av dem går att läsa av priset. Det första är hörnen. En telefon som faller landar nästan aldrig platt, den träffar ett hörn, och kraften går därifrån in i ramen. Förstärkta hörn eller Air Cushion är därför det som avgör om skalet gör något alls vid ett fall, och ett skal i enbart hård plast känns robust i handen samtidigt som det för stöten vidare.",
          "Det andra är kanten runt kameran. Linserna repas av sand och nycklar i en ficka långt oftare än de spricker av ett fall, och kameraglaset är dyrt att byta. Bara en kant som är högre än linserna hindrar det, och tre nivåer finns i handeln: en förhöjd ring runt blocket, ett skal där hela blocket är inbyggt, och ett skjutbart lock som täcker linserna helt.",
          "Det tredje är magnetringen. Ett skal utan ring gör att laddaren, magnetplånboken och bilhållaren slutar sitta fast, och det går inte att lägga till i efterhand. Var uppmärksam på att ordet magnetisk inte betyder ring: ett skal kan ha en metallplatta för en magnetisk bilhållare, vilket fäster mot en magnet men inte laddar någonting.",
        ],
      },
      {
        heading: "Varför verktyget inte frågar om fallhöjd",
        body: [
          "Nästan varje skal anger något om fall, och talen ser jämförbara ut. De är det inte. Talen kommer från MIL-STD-810, ett amerikanskt försvarsdokument, och dokumentets första del säger att det inte är giltigt att betrakta en metods provvillkor som oföränderliga. Höjden, antalet fall och underlaget får anpassas av den som provar, och varje metod bär noten att anpassning är nödvändig.",
          "Två tillverkare kan alltså ha provat på helt olika sätt och ändå ange samma sorts påstående. Att låta dig välja skal på ett sådant tal vore att bygga in ett mått som inte håller. Verktyget frågar därför bara efter sådant som går att kontrollera på skalet självt.",
        ],
      },
    ],
    faq: [
      {
        question: "Varför föreslås inte testvinnaren alltid?",
        answer:
          "För att frågan här är en annan än den rankningen svarar på. Rankningen säger vilket skal som är bäst sammantaget, väljaren säger vilka skal som klarar just dina krav. Vill du se telefonens färg är vinnaren fel svar, eftersom den är mattsvart, och då föreslås ett genomskinligt skal som ligger längre ner i listan. Träffarna sorteras dessutom billigast först och inte högst betyg först, eftersom frågan är vad som räcker.",
      },
      {
        question: "Vad gör jag om inget skal uppfyller kraven?",
        answer:
          "Då säger verktyget vilken kombination som inte går ihop, och det är oftast läder mot fallskydd. Det enda läderskalet i jämförelsen är fullnarvigt läder rakt igenom, alltså utan den styva baksida som sprider kraften i ett hybridskal. Det är ett medvetet val från tillverkaren och inte ett fel. Släpp det krav som betyder minst för dig, eller titta bland de skal vi övervägde men inte rankade.",
      },
      {
        question: "Räknar väljaren in vilken iPhone jag har?",
        answer:
          "Nej, och det är viktigt att veta. Ett skal passar exakt en modellstorlek, och iPhone 17 och 17 Pro har samma skärmstorlek men delar inte skal eftersom kameraplatån och tjockleken skiljer. Priserna och artiklarna vi visar gäller 17 Pro-varianten. Kontrollera alltid att artikeln du lägger i korgen anger exakt din modell och inte bara serien.",
      },
    ],
    usedOn: ["iphone-skal"],
    updated: "2026-08-06",
  },
  {
    slug: "vattenlarmsvaljare",
    name: "Vattenlarmsväljaren",
    title: "Vilket vattenlarm räcker för ditt hem?",
    description:
      "Svara på var larmet ska ligga, hur ofta bostaden står tom och om du redan har en hubb. Guiden säger vilken sorts vattenlarm som räcker och vilka av dem vi rankat som uppfyller kraven.",
    intro:
      "Priset säger ingenting om vad ett vattenlarm gör i den här kategorin. Numens 204 kostar 197 kronor och SQ400B 199, och de ser ut som samma sorts produkt. Den ena tjuter bara där den ligger, den andra ringer din telefon. Svara på de tre frågorna nedan så får du veta vilken sort du behöver.",
    sections: [
      {
        heading: "Frågan som avgör allt är om huset står tomt",
        body: [
          "Ett vattenlarm med bara siren gör precis lika mycket nytta som ingen alls när ingen är hemma. En läcka som börjar klockan nio på morgonen har åtta timmar på sig innan någon kommer hem, och det är i det tidsfönstret ett golv hinner ta skada. Sirenen tjuter hela tiden, men för tomma rum.",
          "Är någon nästan alltid hemma vänder resonemanget. Då hörs sirenen av någon som kan stänga av kranen, och du behöver varken wifi, konto eller app. Välj i så fall på batteritid i stället, eftersom det vanligaste skälet till att ett vattenlarm inte larmar är att batteriet tog slut i tysthet för ett år sedan.",
          "Räknar du med att vara bortrest ens en vecka om året faller dock kalkylen. Att lägga tvåhundra kronor på ett larm som når telefonen är billigt jämfört med att komma hem till en vecka gammal läcka.",
        ],
      },
      {
        heading: "Hubben förändrar vad som är billigt",
        body: [
          "Tre av larmen vi rankat kan inte prata med din telefon på egen hand. TP-Link Tapo T300 kör 868/922 MHz och behöver en Tapo-hubb, Aqara T1 kör Zigbee och behöver en Aqara-hubb, och Fibaro kör Z-Wave och behöver en Z-Wave-styrenhet. Alla tre säljs separat och kostar i regel mer än larmet självt.",
          "Har du ingen hubb betyder det att ett larm för 199 kronor i praktiken kostar närmare tusen. Har du redan en blir samma larm det billigaste vettiga köpet på hela sidan, och en Tapo-hubb hanterar dessutom upp till 64 sensorer, så nästa larm kostar bara sensorpriset.",
          "Vill du slippa frågan helt finns två vägar: ett wifi-larm som ansluter direkt till routern, eller ett paket där basstationen ingår i priset.",
        ],
      },
      {
        heading: "Placeringen sätter kraven på utförandet",
        body: [
          "Enligt Vattenskadecentrum sker flest vattenskador i köket och orsakas av vitvaror. Under diskbänken och bakom diskmaskinen är alltså rätt första plats, och lägsta punkten på golvet är rätt höjd, eftersom vatten söker sig dit först.",
          "Bakom en maskin kommer du däremot inte åt att lägga en klump på golvet, och där behövs ett larm med lös sond eller kabel. Nedis SmartLife har 115 centimeters kabel mellan enhet och sensor och är det enda larmet som löser det ordentligt. Numens 204 har löstagbara sensorbläck som kommer en bit på vägen.",
          "Intill en varmvattenberedare gäller en annan sak: de flesta larm är godkända till fyrtio grader, vilket inte räcker där. Aqara T1 är godkänd till 55 grader och är det enda larmet som uttryckligen klarar den placeringen.",
        ],
      },
    ],
    faq: [
      {
        question: "Räcker ett vattenlarm med bara siren?",
        answer:
          "Bara om någon nästan alltid är hemma och kan höra det. En siren i en tom bostad gör ingen nytta, och det är just när ingen är hemma en läcka hinner arbeta sig genom ett golv. Är du borta på dagarna eller reser bort perioder ska larmet nå din telefon.",
      },
      {
        question: "Vilka vattenlarm kräver hubb?",
        answer:
          "TP-Link Tapo T300 kräver en Tapo-hubb H100 eller H200, Aqara Water Leak Sensor T1 kräver en Aqara-hubb, och Fibaro Flood Sensor kräver en Z-Wave-styrenhet. Alla tre säljs separat och kostar oftast mer än larmet. SQ400B och Nedis SmartLife ansluter direkt till wifi, och X-Sense SWS54 har basstationen inkluderad i paketet.",
      },
      {
        question: "Var ska vattenlarmet ligga?",
        answer:
          "På den lägsta punkten på golvet, under diskbänken och vid de maskiner som är anslutna till vatten. Vattenskadecentrum anger köket som vanligaste skadeplats, orsakat av vitvaror. Därefter tvättstugan bakom tvättmaskinen och utrymmet vid varmvattenberedaren.",
      },
      {
        question: "Fungerar vattenlarm intill en varmvattenberedare?",
        answer:
          "Bara om det är godkänt för temperaturen. Nedis, Tapo T300 och Fibaro anges till 0 till 40 grader, vilket är för lite intill en beredare. Housegard WA201S tål mest med +60 grader, följt av Aqara T1 på +55 och X-Sense, SQ400B och Numens på +50. Kontrollera arbetstemperaturen i tillverkarens specifikation, för det står sällan i butiksrubriken.",
      },
      {
        question: "Hur många vattenlarm behöver jag?",
        answer:
          "Ett per ställe där vatten kan komma ut, i praktiken tre till fyra i en villa. Läckan uppstår där du inte gissade, så ett enda larm skyddar bara den plats det ligger på. Det är därför paket med flera sensorer ofta blir billigare per skyddad plats än en lös sensor som ser billig ut.",
      },
    ],
    /* 2026-08-06: FAQ-svaret om varmvattenberedare namngav Aqara T1 som enda
       larm som klarar placeringen. Sex av nio gör det, och Housegard tål mest
       med +60 °C. Väljarens hotSpot-flagga är rättad i samma pass.

       Kommentaren står före `usedOn` med flit: check-refs matchar `updated`
       direkt efter `usedOn` med bara `\s*` emellan, så en kommentar mellan dem
       läses som ett saknat datum. */
    usedOn: ["vattenlarm"],
    updated: "2026-08-06",
  },
  {
    /* "aterbetalning-vattenfelsbrytare" och inte "aterbetalning": dagen vi
       räknar återbetalning på solceller eller värmepump skulle en naken slug
       behöva byta URL och tappa det den rankat på. Samma regel som gav
       "elkostnad-lampor" sitt suffix. */
    slug: "aterbetalning-vattenfelsbrytare",
    name: "Återbetalning på vattenfelsbrytare",
    title: "Lönar sig en vattenfelsbrytare på försäkringsrabatten?",
    description:
      "Länsförsäkringar och Folksam ger tio procents rabatt på villaförsäkringen för en godkänd vattenfelsbrytare. Räkna ut hur många år rabatten behöver för att betala installationen.",
    intro:
      "Det här är det enda beslutet om vattenlarm som faktiskt går att räkna på, och svaret är oftare nej än ja. Fyll i din villapremie så får du veta hur lång tid tio procents rabatt behöver för att betala en vattenfelsbrytare som enligt Länsförsäkringar kostar 6 000 till 10 000 kronor installerad.",
    sections: [
      {
        heading: "Rabatten finns, men bara för felsbrytaren",
        body: [
          "Både Länsförsäkringar och Folksam ger tio procent på villa- och fritidshusförsäkringen för en godkänd vattenfelsbrytare. Länsförsäkringar kräver installationsintyg. Folksam kräver dessutom skyddsunderlägg under vitvaror och diskbänk för att rabatten ska gälla.",
          "Ett vattenlarm ger ingen rabatt hos något av bolagen. Det är en viktig skillnad, eftersom flera jämförelser blandar ihop de två produkterna. Larmet varnar dig, felsbrytaren stänger av vattnet, och det är bara det senare försäkringsbolagen betalar för.",
          "Villkoren sätts av respektive bolag, och för Länsförsäkringars del av varje enskilt länsbolag. Kontrollera vad som gäller för just din försäkring innan du beställer något.",
        ],
      },
      {
        heading: "Varför svaret oftast blir nej",
        body: [
          "Tio procent på en villapremie är några hundralappar om året för de flesta hushåll. Ställt mot 6 000 till 10 000 kronor installerad hamnar återbetalningstiden ofta på tjugo år eller mer, längre än produktens rimliga livslängd.",
          "Det betyder inte att en vattenfelsbrytare är ett dåligt köp. Det betyder att rabatten är fel argument för det. Köpet ska motiveras av skyddet: att vattnet faktiskt stängs av medan du är bortrest, inte av premien.",
          "Räknaren säger därför nej i de flesta fall. En jämförelsesajt som alltid säger ja är ingen jämförelsesajt.",
        ],
      },
      {
        heading: "Det som inte syns i återbetalningstiden",
        body: [
          "Den verkliga besparingen ligger i den skada som aldrig händer. Vattenskadecentrum anger snittkostnaden till 49 700 kronor per skada, och för lägenheter mellan 80 000 och 133 000 kronor. Även med försäkring betalar du självrisken, som ligger mellan 3 440 och 10 000 kronor, plus åldersavdrag på 9 700 till 26 100 kronor.",
          "En enda undviken skada kan alltså vara värd mer än trettio års rabatt. Men hur sannolikt det är vet varken vi eller du, och därför visar räknaren den siffran som en jämförelse i stället för att bygga in den i resultatet. Ett tal om förväntad besparing skulle förutsätta en skadefrekvens vi skulle behöva hitta på.",
          "Ett vattenlarm för 199 kronor spelar in i samma kalkyl från andra hållet. Det sänker inte premien alls, men det kan mycket väl spara dig självrisken, och där är återbetalningstiden en enda undviken läcka.",
        ],
      },
    ],
    faq: [
      {
        question: "Hur mycket rabatt ger en vattenfelsbrytare på försäkringen?",
        answer:
          "Tio procent hos både Länsförsäkringar och Folksam, kontrollerat i augusti 2026. Länsförsäkringar ger det på villa- och fritidshusförsäkringen mot uppvisat installationsintyg. Folksam ger det på villa- eller fritidshusförsäkringen, men kräver även underlägg under vitvaror och diskbänk. Nivåerna kan skilja sig mellan Länsförsäkringars länsbolag.",
      },
      {
        question: "Ger vattenlarm rabatt på hemförsäkringen?",
        answer:
          "Nej. Varken Länsförsäkringar eller Folksam anger vattenlarm som rabattgrundande. Rabatten kräver en godkänd vattenfelsbrytare, en enhet som stänger av inkommande vatten. Ett vattenlarm lönar sig ändå, men genom att du hinner stoppa läckan och slipper självrisken.",
      },
      {
        question: "Vad kostar en vattenfelsbrytare installerad?",
        answer:
          "Länsförsäkringar anger 6 000 till 10 000 kronor för arbetet. Ovanpå det kommer enheten, och de centrala brytarna kostar 5 373 till 8 495 kronor, kontrollerat 2026-08-04. En central vattenfelsbrytare landar alltså realistiskt på 12 000 till 18 000 kronor installerad. Räknaren är förinställd på 8 000 kronor, mitten av bolagets eget spann för arbetet.",
      },
      {
        question: "Vad kostar en vattenskada i genomsnitt?",
        answer:
          "Enligt Vattenskadecentrum är snittkostnaden 49 700 kronor per skada för hem, villor, fritidshus och företag sammantaget. För lägenheter ligger snittskadan mellan 80 000 och 133 000 kronor. Självrisken ligger på 3 440 till 10 000 kronor och åldersavdraget på 9 700 till 26 100 kronor.",
      },
      {
        question: "Är en vattenfelsbrytare värd pengarna?",
        answer:
          "Inte om du köper den för rabattens skull, eftersom återbetalningstiden på tio procents premierabatt oftast blir över tjugo år. Den är värd pengarna om du vill att vattnet faktiskt stängs av när du inte är hemma, till exempel i ett hus som står tomt delar av året. Räknaren ovan visar din egen siffra så du kan avgöra det.",
      },
    ],
    /* Bor på båda sidorna med flit. Frågan ställs av den som läser om larm och
       upptäcker att rabatten inte gäller dem, och av den som står inför att
       betala 12 000 till 18 000 kronor för en brytare installerad.

       ⚠️ "Godkänd vattenfelsbrytare" i texterna nedan betyder typgodkänd enligt
       CR 139. Vilka produkter som är det går att slå upp på cert.ri.se, se
       /vattenfelsbrytare. Kontrollerat 2026-08-06. */
    usedOn: ["vattenlarm", "vattenfelsbrytare"],
    updated: "2026-08-06",
  },
  {
    slug: "brandskydd-hemma",
    name: "Brandskyddsguiden",
    title: "Vad behöver hemmet i brandskydd?",
    description:
      "Räddningstjänsterna rekommenderar brandvarnare på varje våningsplan, en sexkilos pulversläckare och en brandfilt. Svara på tre frågor och få antalen för just din bostad, plus vad det kostar som billigast.",
    intro:
      "De flesta som köper brandskydd köper en sak i taget och slutar efter den första. Rekommendationen är tre saker, och antalet beror på hur du bor. Ange bostad, antal våningsplan och var köket ligger, så räknar vi fram listan och priset.",
    sections: [
      {
        heading: "Var antalen kommer ifrån",
        body: [
          "Det här är inte vår egen modell. Storstockholms brandförsvar, Räddningstjänsten Syd och Myndigheten för civilt försvar ger i praktiken samma råd: brandvarnare på varje våningsplan, en pulversläckare på sex kilo och en brandfilt. Alla tre källorna är länkade från våra jämförelser av respektive produkt.",
          "Sex kilo är inte en detalj. En släckare på ett kilo tömmer sig på några sekunder, och det är kortare tid än de flesta behöver för att hinna rikta strålen rätt. Det är också skälet till att guiden räknar priset på billigaste sexkilos och inte på billigaste släckare.",
          "Brandfilten ska vara 120 × 180 centimeter. Standarden EN 1869:2019 säger själv att tillräckligt stora filtar anses lämpliga för att kväva elden på en person vars kläder brinner, men den anger ingen siffra. Siffran kommer från räddningstjänsterna.",
        ],
      },
      {
        heading: "Det guiden inte räknar in",
        body: [
          "Sovrumsdörrar. En stängd dörr dämpar ljudet från en brandvarnare betydligt mer än de flesta tror, och sover någon bakom en behövs en varnare i eller utanför just det rummet. Vi frågar inte om det, så det står som en not i resultatet i stället för att räknas in i antalet.",
          "Eldstäder. Har du öppen spis, vedkamin eller pannrum bör släckaren hänga där snarare än i hallen. Antalet ändras inte, placeringen gör det.",
          "Kolmonoxid. En kolmonoxidvarnare är en annan produkt som skyddar mot något en brandvarnare inte känner av, och den hör hemma där det finns förbränning: gasol, braskamin eller pannrum.",
        ],
      },
    ],
    faq: [
      {
        question: "Hur många brandvarnare behöver man?",
        answer:
          "Minst en per våningsplan. I en lägenhet på ett plan räcker en, i ett tvåplanshus behövs två. Sover någon bakom en stängd dörr behövs dessutom en i eller utanför det rummet, eftersom en stängd dörr dämpar ljudet mer än de flesta räknar med.",
      },
      {
        question: "Vad ska ett hem ha i brandskydd?",
        answer:
          "Brandvarnare på varje våningsplan, en pulversläckare på sex kilo och en brandfilt på 120 × 180 centimeter. Det är den gemensamma rekommendationen från räddningstjänsterna och Myndigheten för civilt försvar. Bor du på flera plan är en släckare per plan rimligt, eftersom en släckare du måste springa en trappa efter inte hjälper.",
      },
      {
        question: "Vad kostar ett komplett brandskydd till hemmet?",
        answer:
          "Billigaste kombinationen som faktiskt uppfyller rekommendationen ligger på några hundralappar för en lägenhet och runt tusenlappen för ett tvåplanshus, räknat på de billigaste produkterna i våra egna jämförelser. Guiden ovan räknar fram din summa och visar vilken butik och produkt varje pris kommer från.",
      },
      {
        question: "Räcker det med en brandfilt?",
        answer:
          "Nej. En brandfilt kväver en brand i en kastrull, i textil eller på en person, men den räcker inte mot en brand som hunnit sprida sig. Rekommendationen är filt och släckare och brandvarnare, eftersom de tre löser olika delar av samma problem: varnaren väcker dig, filten kväver det som just börjat och släckaren tar det som hunnit växa.",
      },
      {
        question: "Behöver man brandsläckare i lägenhet?",
        answer:
          "Räddningstjänsterna rekommenderar det, ja, och rådet skiljer inte på lägenhet och villa. En sexkilos pulversläckare tar plats men är den enda utrustning i hemmet som klarar en brand som redan spridit sig från sitt ursprung. I en lägenhet räcker en, placerad så att du når den från hallen på väg ut.",
      },
    ],
    usedOn: ["brandfilt", "brandvarnare", "brandslackare"],
    updated: "2026-08-06",
  },
  {
    slug: "behover-du-kolmonoxidvarnare",
    name: "Behöver du en kolmonoxidvarnare?",
    title: "Behöver du en kolmonoxidvarnare?",
    description:
      "Kolmonoxid bildas bara där något förbränns. Ange vad du har i bostaden och var varnaren ska sitta, så får du veta om du behöver en och vilken del av EN 50291 den måste vara provad enligt.",
    intro:
      "Många svenska hem behöver ingen kolmonoxidvarnare, och det är sällan någon som säljer dem säger det. Gasen bildas vid ofullständig förbränning, så utan förbränningskälla finns ingen källa. Ange vad du har, så får du svaret och vilken del av standarden som gäller för din placering.",
    sections: [
      {
        heading: "Varför svaret ibland är nej",
        body: [
          "En lägenhet med fjärrvärme, elspis och inget garage har ingen källa till kolmonoxid. En varnare där skulle aldrig larma, för det finns ingenting som kan bilda gasen. Det är ett tråkigt svar, och det är ändå det riktiga.",
          "Det gör också det omvända svaret starkare. Har du braskamin, panna, gasol eller garage under bostaden är kolmonoxid en verklig risk som ingen annan larmtyp upptäcker, eftersom gasen varken syns eller luktar.",
        ],
      },
      {
        heading: "Del 2 är inte en detalj",
        body: [
          "Ska varnaren sitta i husvagn, husbil eller båt måste den vara provad enligt EN 50291-2. Den delen provar varnaren för vibration, rörelse och temperaturväxlingar, precis det ett fordon utsätter den för och som ett vardagsrum aldrig gör.",
          "Fyra av de sex varnare vi rankar är provade enligt den delen, två är det inte. Guiden filtrerar därför bort de två när du väljer fordon. Står fordonet kallt om vintern är driftstemperaturen värd en titt också: en av varnarna fungerar först vid +4 °C.",
          "Har du gasol i fordonet behöver du dessutom en gasolvarnare. Den känner av oförbränd gasol som läcker, medan kolmonoxidvarnaren känner av vad som bildas när gasolen förbränns dåligt. Två sensorer för två olika faror.",
        ],
      },
    ],
    faq: [
      {
        question: "Behöver alla hem en kolmonoxidvarnare?",
        answer:
          "Nej. Kolmonoxid bildas vid ofullständig förbränning, så risken finns där något förbränns: braskamin, vedspis, olje- eller vedpanna, gasolkök, fotogenkamin, eller ett garage som ligger under bostaden. En bostad med enbart el och fjärrvärme har ingen sådan källa. Undantaget är flerfamiljshus och radhus med delad skorstensstock, där gas kan ta sig in från en grannes eldning.",
      },
      {
        question: "Behöver man kolmonoxidvarnare med braskamin?",
        answer:
          "Ja. En braskamin är den vanligaste källan till kolmonoxid i svenska hem. Gasen bildas när förbränningen blir ofullständig, exempelvis vid igensatt skorsten, dåligt drag eller när man stänger spjället för tidigt. Sätt varnaren i samma rum som kaminen och gärna en till utanför sovrummet om det ligger på ett annat plan.",
      },
      {
        question: "Vilken kolmonoxidvarnare behövs i husvagn?",
        answer:
          "En som är provad enligt EN 50291-2, alltså den del av standarden som provar varnaren för vibration, rörelse och temperaturväxling. Det är vad ett fordon utsätter den för, och en varnare som bara är provad enligt del 1 är avsedd för bostäder. Kontrollera också driftstemperaturen om vagnen står kall på vintern.",
      },
      {
        question: "Var ska kolmonoxidvarnaren sitta?",
        answer:
          "I samma rum som förbränningskällan, och i eller utanför sovrummet om det ligger på ett annat plan. Kolmonoxid väger ungefär lika mycket som luft och blandar sig med den, så den stiger inte som rök och varnaren behöver inte sitta i taket. Undvik direkt ovanför en eldstad, där värmen stör sensorn, och undvik drag från fönster och ventiler.",
      },
    ],
    usedOn: ["kolmonoxidvarnare"],
    updated: "2026-08-06",
  },
  {
    slug: "co-halt-larmgrans",
    name: "CO-halt och larmgräns",
    title: "Vad betyder halten, och när måste varnaren larma?",
    description:
      "EN 50291 anger både hur sent en kolmonoxidvarnare får larma och hur tidigt den får göra det. Välj en halt i ppm och se vad standarden kräver och vad halten gör med en människa.",
    intro:
      "Kolmonoxid mäts i ppm, miljondelar. Standarden sätter både en övre och en undre gräns för när varnaren får larma, och den undre är den som förvånar: vid låga halter ska den vara tyst i upp till två timmar. Välj en halt så ser du kravet och effekten bredvid varandra.",
    sections: [
      {
        heading: "Den tysta timmen",
        body: [
          "Vid 50 ppm får varnaren enligt EN 50291 inte larma under den första timmen. Vid 30 ppm ska den vara tyst i två timmar. Kravet finns av ett gott skäl: en varnare som tjuter vid varje stekpanna hamnar snart i en byrålåda, och en varnare i en byrålåda skyddar ingen.",
          "Konsekvensen är ändå värd att känna till. En långsam läcka kan pågå i timmar innan något ljud hörs, och det förloppet ger huvudvärk och trötthet som går över när man kommer ut. Det misstas ofta för influensa, och skillnaden är att influensa inte blir bättre av att man går ut på gården.",
          "Det är också det bästa argumentet för en varnare med display. Fyrtio ppm står på skärmen långt innan varnaren över huvud taget får lov att larma.",
        ],
      },
      {
        heading: "Varför vi inte räknar fram tid till dödlig halt",
        body: [
          "Den räknare många efterfrågar är hur länge något måste läcka innan halten blir livsfarlig, gärna per kvadratmeter. Vi bygger den inte, och skälet är värt att skriva ut.",
          "Uträkningen kräver två tal som varken du eller vi har. Det första är hur mycket kolmonoxid källan avger, vilket skiljer med storleksordningar mellan en välskött kamin och en trasig panna och beror på exakt hur felet ser ut. Det andra är rummets luftomsättning, som ändras med vind, ventilation och om en dörr står öppen.",
          "Ett exakt svar byggt på två gissningar är sämre än inget svar, särskilt när frågan gäller en dödlig risk. Det som däremot går att svara på exakt är vad som gäller vid en given halt, och det är vad räknaren ovan gör.",
        ],
      },
    ],
    faq: [
      {
        question: "Vad är en farlig nivå av kolmonoxid?",
        answer:
          "Vid 200 ppm kommer lätt huvudvärk efter två till tre timmar. Vid 400 ppm blir det livshotande efter omkring tre timmar. Vid 800 ppm kommer medvetslöshet efter en timme och dödsfall inom två till tre timmar. Talen gäller friska vuxna. Barn, gravida, äldre och personer med hjärt- eller lungsjukdom påverkas vid lägre halter och tidigare.",
      },
      {
        question: "Hur snabbt måste en kolmonoxidvarnare larma?",
        answer:
          "Enligt EN 50291 senast efter 3 minuter vid 300 ppm, senast efter 40 minuter vid 100 ppm och senast efter 90 minuter vid 50 ppm. Standarden anger också hur tidigt den får larma: vid 50 ppm tidigast efter 60 minuter och vid 30 ppm inte alls före 120 minuter. Den undre gränsen finns för att minska falsklarm.",
      },
      {
        question: "Varför larmar inte varnaren vid låga halter?",
        answer:
          "Därför att standarden förbjuder det. Vid 30 ppm får varnaren inte larma före två timmar, och vid 50 ppm inte under den första timmen. Syftet är att en varnare som ljuder vid matlagningsos snabbt blir avstängd eller nedplockad. Det betyder också att en låg och långvarig läcka kan pågå länge innan något hörs, vilket är skälet till att en display som visar halten är värd något.",
      },
      {
        question: "Vad gör jag om kolmonoxidvarnaren larmar?",
        answer:
          "Gå ut med alla i bostaden, öppna dörrar och fönster på vägen ut om det går utan att dröja kvar, ring 112, och gå inte in igen förrän räddningstjänsten säger till. Släck inte pannan och leta inte efter källan först. Kolmonoxid är luktfri och de första symtomen, huvudvärk och illamående, sätter ner omdömet just när det behövs.",
      },
      {
        question: "Vad betyder ppm på en kolmonoxidvarnare?",
        answer:
          "Miljondelar: hur många delar kolmonoxid det finns per miljon delar luft. 50 ppm betyder att en femtiotusendel av luften är kolmonoxid. Måttet används därför att gasen är farlig i mycket små mängder: redan vid några hundra ppm är det livshotande inom timmar.",
      },
    ],
    usedOn: ["kolmonoxidvarnare"],
    updated: "2026-08-06",
  },
  {
    slug: "vilken-brandstege-passar",
    name: "Vilken brandstege når och passar?",
    title: "Vilken brandstege når och passar ditt fönster?",
    description:
      "Mät från marken till fönstrets underkant och mät karmen. Guiden visar vilka brandstegar som är långa nog och vilka vars krokar faktiskt hakar på just ditt fönster.",
    intro:
      "Två mått avgör om en brandstege fungerar hemma hos dig, och båda går att mäta på en minut. Höjden från marken till fönstrets underkant avgör om stegen når. Fönsterkarmens tjocklek avgör om krokarna hakar fast. Mät båda innan du beställer, för en stege som inte hakar fast är inte en stege.",
    sections: [
      {
        heading: "Femmetersgränsen kommer från byggreglerna",
        body: [
          "Boverkets byggregler accepterar utrymning genom fönster om underkanten sitter högst 5,0 meter över marken, eller högst 8,0 meter om det finns en fast monterad stege. En stege som hängs över karmen räknas aldrig som fast monterad, oavsett hur lång den är.",
          "Under fem meter skriver Boverket rakt ut vad alternativet är: att man utrymmer genom att hoppa, och att man då riskerar att skadas. Det är det bästa argumentet för att ha en stege, och det är formulerat av en myndighet och inte av en butik.",
          "Guiden lägger till en halv meter marginal mot stegens publicerade längd, så att den når hela vägen ner även på ojämn mark. Vi räknar inte fram någon egen nyttolängd per produkt, eftersom bara tre stegar publicerar en evakueringshöjd skild från längden och två av dem gör det bara i bruksanvisningen.",
        ],
      },
      {
        heading: "Karmmåttet är det billigaste förköpet du kan göra",
        body: [
          "Krokarna hakas över karmen och har en gräns, och den ligger på 30 centimeter för samtliga stegar. Housegard anger som enda tillverkare ett intervall i båda riktningarna: 15 till 30 centimeter.",
          "Minimum spelar roll också. En alltför tunn karm ger krokarna för lite grepp, och Housegards gräns går vid 15 centimeter. I ett hus med tjock isolering eller djup fönsternisch är det i stället taket på 30 centimeter som blir problemet.",
          "Tre av stegarna anger sitt karmmått bara i bruksanvisningen, alltså i det dokument du läser efter köpet. Guiden läser samma tal som tabellen bredvid, så du slipper leta upp manualen först.",
        ],
      },
    ],
    faq: [
      {
        question: "Hur lång brandstege behöver jag?",
        answer:
          "Mät från marken upp till fönstrets underkant och lägg till en halv meter marginal. Som tumregel går det åt 2,5 till 3,5 meter per våningsplan beroende på takhöjd. En 4,5-metersstege täcker en normal andravåning, medan 4 till 4,3 meter blir knappt i ett hus med hög takhöjd. Över fem meter till marken krävs enligt byggreglerna en fast monterad stege.",
      },
      {
        question: "Hur tjock fönsterkarm klarar en brandstege?",
        answer:
          "Högst 30 centimeter, och det gäller alla stegarna i guiden. Housegard är ensam om att ange ett minimum också, 15 centimeter, eftersom en alltför tunn karm ger krokarna för lite grepp. Mät karmen vid det fönster du tänkt utrymma genom innan du beställer.",
      },
      {
        question: "Räknas en brandstege som utrymningsväg?",
        answer:
          "Nej, inte en hängande. Boverkets byggregler räknar bara en fast monterad stege som utrymningsväg, och den höjer gränsen för fönsterutrymning från 5,0 till 8,0 meter. En hängande stege är ett frivilligt komplement till en bostad som redan uppfyller reglerna, inte ett sätt att uppfylla dem.",
      },
      {
        question: "Vad gör man om fönstret sitter högre än fem meter?",
        answer:
          "Då är en hängande stege fel produkt. Byggreglerna kräver en fast monterad stege på fasaden, och den typen börjar på cirka 3 700 kronor och går upp mot 9 000. Över åtta meter räknar reglerna inte med utrymning genom fönster med egen stege alls, utan med trapphus och med räddningstjänstens utrustning. En bärbar utskjutsstege når normalt elva meter från deras uppställningsplats.",
      },
    ],
    usedOn: ["brandstege"],
    updated: "2026-08-06",
  },
  {
    slug: "godkand-utrymningshojd",
    name: "Vilken höjd är stegen godkänd för?",
    title: "Vilken utrymningsstege är godkänd för ditt fönster?",
    description:
      "Fönstrets höjd över marken avgör vilken fast utrymningsstege som räcker, och vilken som är godkänd för höjden. Räckvidd och godkännande är två olika saker, och bara Modum har en godkänd höjd.",
    intro:
      "Att en stege säljs i 5,7 meter betyder inte att någon sagt att den får användas från ett fönster 5,7 meter upp. Det är hela skillnaden mellan de fasta utrymningsstegarna, och den syns inte i längdtabellen. Mät höjden från marken till fönstrets underkant, så visar guiden vilka stegar som når, vilka som är godkända för höjden och vad den kortaste tillräckliga längden kostar.",
    sections: [
      {
        heading: "Två höjdgränser som inte går ihop",
        body: [
          "Boverkets byggregler accepterar utrymning genom fönster om underkanten sitter högst 5,0 meter över marken, eller högst 8,0 meter om det finns en fast monterad stege. Det är den enda skillnaden regeltexten gör mellan en fast och en hängande stege, och den går bara åt ena hållet.",
          "Det enda fabrikat med ett tredjepartsgodkännande, Modum, får enligt sitt eget certifikat användas från fönster högst 5,0 meter över marken utan ryggbygel, och högst 7,5 meter med. Godkännandet slutar alltså innan byggreglerna gör det.",
          "Övriga fabrikat når längre i ett stycke: Skeppshultstegen säljs i 5,7 meter och W.Steps 400 i 6,0, och båda går att skarva. Guiden visar dem separat, eftersom räckvidd och godkänd höjd är två olika saker och bara Modum har det senare.",
        ],
      },
      {
        heading: "Stegen ska inte nå marken",
        body: [
          "En fast utrymningsstege ska sitta ungefär sju decimeter ovanför fönsterkarmen, så att du har något att greppa medan du kliver ut, och sluta en halv till en meter över marken så att den går att fälla ut även när det ligger snö. Housegard anger 50 till 100 centimeter, Modums certifikat minst 60 centimeter till nedersta steget.",
          "De två avstånden tar ungefär ut varandra, och därför jämför guiden stegens längd mot fönstrets höjd över marken rakt av i stället för att lägga på en marginal.",
          "Om det finns risk att snö hindrar utfällningen bör stegen sitta högre än minimimåttet. Både Housegard och Skeppshultstegen skriver ut det i sina anvisningar.",
        ],
      },
      {
        heading: "Ryggbygeln är inte en detalj",
        body: [
          "Det som flyttar Modums godkända höjd från 5,0 till 7,5 meter är ryggbygeln, den korg som omsluter stegen bakifrån. Certifikatet beskriver den som en bygel monterad mellan två stegar, och den nedersta bygeln ska sluta 2,2 till 3,0 meter över marken.",
          "Everglow säljer bygeln, men listar den utan publicerat pris. Ska du utrymma från ett fönster högre än fem meter behöver du alltså begära offert innan du vet vad lösningen kostar.",
          "Ingen av de övriga tillverkarna säljer någon ryggbygel. Vill du ha den sortens skydd på en hög montering är Modum enda vägen dit.",
        ],
      },
    ],
    faq: [
      {
        question: "Hur lång fast utrymningsstege behöver jag?",
        answer:
          "Ungefär lika många meter som fönstrets underkant sitter över marken. Stegen ska sitta cirka sjuttio centimeter ovanför karmen och sluta en halv till en meter över marken, och de två avstånden tar ut varandra. Sitter fönstret 3,9 meter upp är en stege på cirka 3,9 meter rätt. Mät alltid själv, eftersom marken sällan är plan.",
      },
      {
        question: "Hur högt får en fast utrymningsstege användas?",
        answer:
          "Boverket tillåter 8,0 meter för en fast monterad stege. Modums certifikat TG 2536 tillåter 5,0 meter utan ryggbygel och 7,5 meter med, mätt från fönstrets underkant. Modum är den enda tillverkaren i svensk handel som alls anger en högsta användningshöjd. Skeppshultstegen säljer en stege på 5,7 meter och W.Steps en på 6,0 utan att ange någon gräns.",
      },
      {
        question: "Vad kostar en fast utrymningsstege?",
        answer:
          "3 695 till 14 513 kronor i ungefär 3,9 meters längd, beroende på fabrikat. Housegard EL39 kostar 3 695 kronor hos Kjell, Skeppshultstegen 7 799 hos Bauhaus, Modum 9 621 hos Everglow och W.Steps 11 378 respektive 14 513 hos Stegfabriken. Priset följer varken godkännandet eller stegbredden: den billigaste anger både maxlast och provning, och den dyraste har det bredaste steget.",
      },
      {
        question: "Vad gör jag om fönstret sitter högre än 7,5 meter?",
        answer:
          "Då finns ingen stege med ett godkännande som täcker höjden, men det finns stegar som når. W.Steps 400 säljs i 6,0 meter och får skarvas till 18, och Skeppshultstegen går att skarva till önskad längd. Byggreglerna tillåter utrymning genom fönster upp till 8,0 meter med fast stege. Över 7,5 meter köper du alltså räckvidd utan att någon tredje part provat produkten för höjden, och den avvägningen är din.",
      },
    ],
    usedOn: ["utrymningsstege"],
    updated: "2026-08-06",
  },
  {
    slug: "klarar-roboten-troskeln",
    name: "Klarar roboten din tröskel?",
    title: "Klarar robotdammsugaren din tröskel?",
    description:
      "Nordiska trösklar var det största hindret när Ljud & Bild grupptestade fyra robotdammsugare, och en av fyra fick ge upp helt. Guiden visar om din tröskelhöjd ligger inom det de flesta robotar klarar, och vad du behöver för chassi över den gränsen.",
    intro:
      "Mät den högsta tröskeln mellan de rum roboten ska städa, innan du väljer modell. De flesta städrobotar klarar ungefär en till två centimeter enligt Ljud & Bilds köpguide, och över den gränsen behöver du ett chassi som lyfter sig över listen. Guiden räknar på en tröskel i ett steg, alltså en vanlig dörrlist, och inte på det högre tal tillverkarna skyltar med.",
    sections: [
      {
        heading: "Varför trösklar är ett svenskt problem",
        body: [
          "Amerikanska tester av robotdammsugare handlar sällan om trösklar, eftersom amerikanska hem sällan har lister mellan varje rum. Svenska hem har det, och det märks så snart någon provar robotarna här.",
          "Ljud & Bild provade fyra robotar i mellanklassen och skriver att nordiska trösklar var en av de största utmaningarna i hela grupptestet. En av de fyra fick ge upp helt.",
          "Tillverkarna vet om det. Både Roborock och Dreame säljer en tröskelramp som tillbehör, för 330 respektive 199 kronor. En ramp gör en enskild dörr farbar, men fem dörrar blir både en kostnad och en fråga om hur hallen ser ut.",
        ],
      },
      {
        heading: "Talet är en uppgift, inte ett mätvärde",
        body: [
          "Passerhöjden i millimeter kommer från tillverkaren själv. Dreame, Roborock och Xiaomi anger alla att de mätt i eget labb, ingen använder en gemensam provmetod, och ingen oberoende provning publicerar siffran. Guiden säger därför aldrig att en robot klarar din tröskel, bara vad tillverkaren anger.",
          "Skillnaden mot sugkraften i pascal är ändå betydande. Stiftung Warentest kallar pascaltalet ett reklampåstående man lugnt kan bortse från, medan en passerhöjd i millimeter åtminstone går att hålla en tumstock mot.",
          "Den fälla du ska se upp med är att talen kommer i par. Det högre gäller en tröskel med två steg, där roboten kan ta stödet i två omgångar, och det förutsätter dessutom att steget är brett nog. Det lägre gäller en vanlig list. Dreame säljer L50s Pro Ultra på 40 millimeter, och över en list i ett steg tar den sig 22.",
        ],
      },
    ],
    faq: [
      {
        question: "Hur höga trösklar klarar en robotdammsugare?",
        answer:
          "Ungefär en till två centimeter för de flesta modeller, enligt Ljud & Bilds köpguide. Över det behöver du ett chassi som lyfter sig över listen i stället för hjul som bara rullar på, och toppmodellerna tar sig 4,2 till 4,5 centimeter. Ett förbehåll som är lätt att gå på: tillverkarna publicerar två tal, och det högre gäller en tröskel med två steg som en skjutdörrsskena. Mät din högsta tröskel och jämför med det lägre talet. Talen kommer dessutom från tillverkarnas egna labb utan gemensam provmetod, så de är uppgifter och inte mätvärden.",
      },
      {
        question: "Vad gör jag om tröskeln är för hög?",
        answer:
          "Tre vägar finns. En tröskelramp i de dörrar det gäller, och både Roborock och Dreame säljer en sådan för 330 respektive 199 kronor. En robot per våningsplan eller rumsavsnitt, vilket ofta blir billigare än en enda dyr robot. Eller att acceptera att bära roboten över tröskeln, vilket i praktiken betyder att du får en robot som städar ett rum i taget.",
      },
      {
        question: "Kan roboten köra ner för trappan om den tar sig över tröskeln?",
        answer:
          "Nej. Råd & Rön skriver att samtliga modeller i deras test av 62 robotar vänder om när de kommer för nära trappans öppning. Det är en av få saker där hela kategorin får godkänt utan förbehåll. Däremot tar sig roboten inte mellan våningar av egen kraft, så flera våningar betyder att du bär den eller köper en robot till.",
      },
    ],
    usedOn: ["robotdammsugare"],
    updated: "2026-08-06",
  },
  {
    slug: "vad-far-kameran-filma",
    name: "Vad får kameran filma?",
    title: "Vad får din övervakningskamera filma, och vilken maskering håller?",
    description:
      "Ser kameran grannens tomt eller trottoaren utanför gäller inte privatundantaget. Guiden visar vad som gäller och vilka kameror som har en maskering som håller när kameran används.",
    intro:
      "Ställ dig där kameran ska sitta och titta åt det håll den ska titta. Det som syns därifrån är det kameran spelar in, och det avgör både vad som är tillåtet och vilken kamera som passar. Ser kameran bara din egen tomt är frågan enkel. Kommer grannens staket, trottoaren eller ett hus på håll med i bild är maskeringen inte en extrafunktion utan förutsättningen.",
    sections: [
      {
        heading: "Privatundantaget har fem villkor, och två av dem är produktfrågor",
        body: [
          "Integritetsskyddsmyndigheten skriver att varken GDPR eller kamerabevakningslagen gäller om bevakningen omfattas av privatundantaget, och att undantaget ska tolkas snävt. Fem villkor ska alla vara uppfyllda samtidigt.",
          "Två av dem avgörs av produkten. Bevakningen ska vara begränsad till ditt hem eller din tomt och får inte filma en grannes tomt eller en plats dit allmänheten har tillträde, och i samma mening står att ljud inte heller tas upp utanför tomten. Nästan varje kamera har mikrofon påslagen från start.",
          "IMY nämner själva vilka områden som är lättast att missa: ytor på grannens tomt som syns över staketet, trottoaren utanför uppfarten, en sjö där båtar kan passera, och en fastighet längre bort som syns över en häck.",
        ],
      },
      {
        heading: "Detekteringszon och sekretesszon är inte samma sak",
        body: [
          "En detekteringszon, ibland kallad aktivitetszon eller rörelsezon, styr vad kameran larmar om. Den stoppar notiser. Grannens tomt spelas fortfarande in.",
          "En sekretesszon, ibland kallad integritetszon, svartar ut området i själva bilden så att det varken syns i direktbild eller i inspelning. Det är den funktionen IMY pekar ut när de skriver att du kan rätta till saken genom att vinkla om kameran eller maskera området digitalt.",
          "Skillnaden syns sällan i butikens specifikation, där båda ofta kallas zoner. Vill du veta vilken sorts zon en kamera har får du leta i tillverkarens beskrivning av funktionen, och det är värt en minut innan du betalar.",
        ],
      },
      {
        heading: "Alla har funktionen, alla har en brasklapp",
        body: [
          "Sekretesszoner finns hos alla fem fabrikaten, men masken beter sig olika när kameran används, och begränsningarna pekar åt samma håll: så fort kameran rör sig slutar masken täcka det den ritades över.",
          "Arlo raderar zonerna automatiskt vid autospårning, vid ändrat synfält och vid rotering 180 grader, och på pan/tilt-modellerna försvinner zonen så fort kameran rör sig. TP-Link skriver att zonerna följer med vyn och inte längre täcker originalområdet. Reolinks statiska mask förskjuts vid panorering, och den dynamiska varianten finns bara på tre modeller som inte säljs i svensk handel.",
          "Ring har två zoner, men rörelsedetektorn känner av området ändå, så larmen fortsätter komma från ytan du svartat ut. eufy går längst och anger att aktivitet i zonerna kanske inte helt kan undvikas från att spelas in.",
        ],
      },
    ],
    faq: [
      {
        question: "Får jag filma trottoaren utanför min uppfart?",
        answer:
          "Inte inom privatundantaget. En plats dit allmänheten har tillträde faller utanför, och IMY nämner trottoaren utanför uppfarten som ett av de områden som är lättast att missa. Det gäller även vägar över egen mark när andra använder dem, inklusive servitutsvägar. Vinkla om kameran eller maskera bort ytan.",
      },
      {
        question: "Vad händer om jag ändå filmar grannens tomt?",
        answer:
          "Då gäller GDPR och kamerabevakningslagen i stället för privatundantaget. IMY skriver att sådan bevakning sällan är tillåten eftersom det är ett allvarligt intrång i grannarnas personliga integritet, och att kamerabevakning av människor i deras hem dessutom kan vara brottsligt enligt straffrättsliga bestämmelser.",
      },
      {
        question: "Räcker det att stänga av notiserna för det området?",
        answer:
          "Nej. Att stänga av notiser är en detekteringszon och den påverkar bara vad kameran larmar om. Materialet spelas in ändå. Det du behöver är en sekretesszon som svartar ut området i bilden, den digitala maskering IMY pekar ut.",
      },
      {
        question: "Kan jag lita på maskeringen om kameran kan panorera?",
        answer:
          "Nej, inte utan vidare. TP-Link skriver att zonerna följer med vyn och slutar täcka originalområdet om kameran vrids. Arlo skriver att zonen försvinner så fort en pan/tilt-kamera rör sig, och raderas helt om autospårning slås på. Reolinks dynamiska mask som följer med finns bara på tre modeller. En fast monterad kamera har inte problemet.",
      },
      {
        question: "Måste jag berätta för grannen?",
        answer:
          "IMY rekommenderar det. Sätter du upp kameror som är synliga för grannarna bör du informera dem om vad kamerorna filmar, och berätta vad du gjort för att undvika att fånga dem på bild. Samma sak gäller en kamera som inte är aktiv och en attrapp, eftersom det obehagliga är att kameran ser ut att vara riktad mot ens tomt.",
      },
    ],
    usedOn: ["overvakningskamera"],
    updated: "2026-08-06",
  },
  {
    slug: "dorrklocka-lagenhet-eller-villa",
    name: "Får du sätta upp den, och hörs den?",
    title: "Får du sätta upp en dörrklocka med kamera, och hörs den inne?",
    description:
      "Bor du i lägenhet säger IMY att privatundantaget inte gäller. Bor du i villa avgör strömmen och signalenheten vilken dörrklocka som fungerar. Guiden svarar på båda frågorna.",
    intro:
      "Två frågor avgör en dörrklocka med kamera, och ingen av dem handlar om megapixlar. Den första är boendeformen: Integritetsskyddsmyndigheten har ett eget exempel som säger att en dörrkamera på en lägenhetsdörr faller utanför privatundantaget. Den andra är om det ringer inne i bostaden eller bara i telefonen, vilket tre av åtta modeller inte gör utan att du köper till en signalenhet.",
    sections: [
      {
        heading: "IMY:s exempel om lägenhetsdörren",
        body: [
          "Myndigheten publicerar fyra egna exempel där privatundantaget inte gäller, och det första gäller en dörrkamera på en lägenhetsdörr: en boende i ett lägenhetshus sätter upp en dörrkamera på sin ytterdörr i trygghetssyfte. Svaret är nej. Sker bevakningen från en lägenhetsdörr och förbipasserande i trapphuset eller grannars lägenheter riskerar att komma med i bild gäller GDPR och kamerabevakningslagen.",
          "Det betyder inte att produkten är förbjuden. Det betyder att du blir personuppgiftsansvarig, behöver en rättslig grund, ska göra en intresseavvägning och ska informera om bevakningen. IMY skriver samtidigt att bevakning som innebär ett allvarligt intrång i grannars personliga integritet sällan är tillåten.",
          "Lägg till en praktisk sak som inte är juridik: ytterdörren till en lägenhet tillhör oftast föreningen eller hyresvärden, inte dig. Att borra i den, eller att montera något på den, är en fråga att ställa innan och inte efter.",
        ],
      },
      {
        heading: "Strömmen avgör vad som ens är möjligt",
        body: [
          "Många svenska villor har en ringklocktransformator bakom den gamla tamburklockan, på 8 till 24 volt. Finns den kan du driva dörrklockan därifrån och slipper ladda batterier två gånger om året.",
          "Finns den inte är det bara Yale Smart Video Doorbell som faller bort helt: den saknar batteri och kan bara drivas med kabel eller med en strömadapter som säljs separat. Reolink D340W saknar också batteri och vill ha 12 till 24 volt, men strömadaptern ligger i lådan tillsammans med förlängningskablar på 4,5 meter, så det räcker med ett eluttag inom räckhåll. Tapo D235, Aqara G410 och Imou 2S klarar båda vägarna, och resten är batteridrivna.",
          "Kontrollera vad du har innan du beställer. Det är fem minuters arbete med en skruvmejsel, och det avgör om du kan slippa ladda batteri två gånger om året.",
        ],
      },
      {
        heading: "Ringklockan ingår inte alltid",
        body: [
          "Aqara G410 levereras med en chime-hubb och sex AA-batterier. Tapo D235 och D230S1 levereras med en signalenhet som sätts i ett eluttag inomhus. Reolink D340W har en ringklocka på 433 MHz i lådan, och Imou 2S en som dessutom rymmer minneskortet och förstärker wifi vid dörren.",
          "Ring Battery Video Doorbell levereras med dörrklocka, kabel, monteringssats, ett demonteringsverktyg och en snabbstartsguide. Ingen signalenhet. Arlo och Google Nest gör likadant och säljer sina ringklockor som separata artiklar.",
          "Skillnaden märks inte i butiken men varje dag därefter. En dörrklocka vars enda signal är en notis fungerar inte när mobilen ligger på ljudlöst, laddar i ett annat rum eller saknar täckning, och den fungerar inte alls för den som inte bär telefonen på sig hemma.",
        ],
      },
    ],
    faq: [
      {
        question: "Får jag sätta upp en dörrklocka med kamera i lägenhet?",
        answer:
          "Inte inom privatundantaget. IMY har ett eget exempel: sker bevakningen från en lägenhetsdörr och förbipasserande i trapphuset eller grannars lägenheter riskerar att komma med i bild, då gäller GDPR och kamerabevakningslagen i stället. Du blir personuppgiftsansvarig och ska informera om bevakningen. Fråga också föreningen eller hyresvärden, eftersom ytterdörren sällan är din.",
      },
      {
        question: "Vad gäller om jag har egen ytterdörr utifrån?",
        answer:
          "Då är trapphusproblemet borta, och frågan blir i stället vad som syns i bild. Är gångvägen fram till dörren gemensam eller allmän mark gäller samma sak som för trottoaren utanför en villauppfart: maskera bort den, eller rikta kameran nedåt mot den egna tröskeln så att den inte kommer med.",
      },
      {
        question: "Hur vet jag om jag har ström till dörrklockan?",
        answer:
          "Skruva loss den gamla dörrklockan eller tamburklockan och titta efter två tunna ledare. En mekanisk ringklocka drivs nästan alltid av en transformator på 8 till 24 volt, ofta placerad i elcentralen eller i en kopplingsdosa i hallen. Finns den kan de flesta kabelanslutna dörrklockor använda den. Är du osäker, välj en batteridriven modell, så slipper du frågan helt.",
      },
      {
        question: "Kan jag koppla dörrklockan till min gamla ringklocka?",
        answer:
          "Ibland. Flera modeller kan driva en befintlig mekanisk ringklocka via samma ledning, och Imou levererar till exempel en bygelkabel för det ändamålet. De batteridrivna löser det i stället med en egen signalenhet som sätts i ett eluttag. Kontrollera i produktens manual innan du räknar med det.",
      },
    ],
    usedOn: ["dorrklocka-med-kamera"],
    updated: "2026-08-06",
  },
  {
    slug: "kamera-nar-nagon-arbetar-hemma",
    name: "Kamera när någon arbetar i hemmet",
    title: "Inomhuskamera när någon annan arbetar i ditt hem",
    description:
      "Inomhus är kamerabevakning oftast tillåten, men inte om du regelbundet får besök av hemtjänst. Guiden visar vad som gäller och vilka kameror som har en avstängning personalen kan se.",
    intro:
      "Inomhus är juridiken generös. IMY skriver att kamerabevakning i den egna bostaden oftast omfattas av privatundantaget, och att det gäller även när kameran är kopplad till en larmcentral. Men myndigheten har ett eget exempel som säger nej till det vanligaste skälet att köpa produkten: får du regelbundet besök av hemtjänsten bevakas personalen under sin arbetstid, och då gäller GDPR i stället.",
    sections: [
      {
        heading: "Regelbundenheten är gränsen, inte avsikten",
        body: [
          "IMY skriver att privatundantaget gäller även om kameran vid enstaka tillfällen filmar en hantverkare som utför arbete i bostaden, så länge din avsikt inte är att bevaka hantverkaren. Ett enstaka besök ändrar alltså ingenting.",
          "Men i myndighetens exempel om hemtjänst blir svaret nej, och skälet är formulerat så här: personalen besöker hemmet i sin yrkesroll och blir på så sätt bevakade under sin arbetstid. Samma villkor står i den allmänna listan, där undantaget bara gäller om du inte bevakar en plats där personer som utför arbete regelbundet passerar eller regelbundet utför sina arbetsuppgifter.",
          "Det träffar precis den som sätter upp en kamera hemma hos en åldrande förälder för att kunna se att allt är bra. Avsikten är omtanke, men regeln handlar om vem som blir filmad och hur ofta.",
        ],
      },
      {
        heading: "Ett skydd som syns är inte samma sak som ett läge i appen",
        body: [
          "När någon annan arbetar i hemmet räcker det inte att kameran går att stänga av. Den behöver gå att stänga av på ett sätt personalen kan se, för annars är avstängningen ett påstående som de ska ta på ditt ord.",
          "Arlo Essential 3 PTZ lutar ner objektivet mot foten så snart systemet står i standby eller hemmaläge, och stänger av rörelsedetektering och mikrofon samtidigt. Aqara Camera Hub G3 vrider bort linsenheten och visar ett sovande ansikte, antingen för hand eller via en regel du bygger själv. TP-Links Tapo C125 och C225 har en knapp på höljet som fäller ner ett skydd eller vrider bort linsen. Ring Pan-Tilt har ett inbyggt linsskydd, Indoor Cam Plus ett löst i förpackningen.",
          "Övriga kameror i vår jämförelse har bara ett läge i appen. TP-Links läge stänger av både bild och ljud, vilket är mer än många, men objektivet pekar fortfarande in i rummet och ingen som står framför kameran kan se om läget är på.",
        ],
      },
      {
        heading: "Var bilderna hamnar spelar roll här",
        body: [
          "Inomhusbilder är det känsligaste material ett hem producerar, och när de dessutom innehåller någon annans arbetsdag blir frågan om lagring mer än ekonomisk.",
          "Kameror med minneskort behåller materialet i bostaden. Tapo, Aqara och Imou fungerar så. Ring och Arlo sparar bara i molnet och kräver abonnemang för att spara något alls.",
          "Personal som arbetar i ett hem har rimligen lättare att acceptera en kamera vars bilder ligger på ett kort i hallen än en vars bilder ligger på en molntjänst i ett annat land. Det är inget juridiskt argument, men det är ett praktiskt.",
        ],
      },
    ],
    faq: [
      {
        question: "Får jag ha kamera hemma om jag har hemtjänst?",
        answer:
          "Inte inom privatundantaget. IMY:s eget exempel säger nej: får en privatperson regelbundet besök av hemtjänsten omfattas kamerabevakningen inte av undantaget, eftersom personalen besöker hemmet i sin yrkesroll och bevakas under sin arbetstid. Då gäller GDPR, vilket innebär att du behöver en rättslig grund, ska göra en intresseavvägning och ska informera om bevakningen. Det praktiska svaret är att kameran ska vara avstängd under besöken.",
      },
      {
        question: "Räcker det att jag stänger av kameran i appen?",
        answer:
          "Juridiskt kan det räcka, om bevakningen faktiskt är avstängd. Praktiskt är det svagare: den som arbetar i hemmet kan inte se om läget är på, utan får ta ditt ord för det. En fysisk avstängning gör den synlig, och hos Arlo och Aqara kan den dessutom ske automatiskt så att ingen behöver komma ihåg den.",
      },
      {
        question: "Vad gäller för en hantverkare som kommer en gång?",
        answer:
          "Då gäller privatundantaget fortfarande. IMY skriver uttryckligen att undantaget omfattar bevakning som vid enstaka tillfällen filmar en hantverkare som utför arbete i bostaden, så länge avsikten inte är att bevaka hantverkaren. Det är regelbundenheten som är gränsen.",
      },
      {
        question: "Gäller samma sak för en inneboende eller au pair?",
        answer:
          "Situationen liknar den, men grunden är en annan. Någon som bor i bostaden utan att vara en del av ditt hushåll har egna förväntningar på privatliv, och IMY:s villkor om att bevakningen ska vara av rent privat natur och inte ha negativ inverkan på den som bevakas blir svårt att uppfylla i gemensamma utrymmen. Det praktiska svaret är detsamma: en avstängning som går att se, och en överenskommelse i förväg.",
      },
    ],
    usedOn: ["inomhuskamera"],
    updated: "2026-08-06",
  },
  {
    slug: "godkant-las-till-ytterdorr",
    name: "Vilket lås är godkänt?",
    title: "Vilket kodlås till ytterdörr är en godkänd låsenhet?",
    description:
      "Fem av sex lås är certifierade, och varje certifikat har ett villkorsfält som stänger av eller kräver något. Guiden visar vad som gäller för just den öppningsmetod du tänkt använda, och vad som gäller i bostadsrätt.",
    intro:
      "En godkänd låsenhet är enligt Stöldskyddsföreningen hela enheten: låshus, cylinder, slutbleck och förstärkningsbehör, där varje del och helheten når klass 3. Certifikaten slutar dessutom med ett villkorsfält som är lätt att missa: låsenheten är certifierad med vissa, men inte alla, inställningar aktiverade. Välj hur du tänker låsa upp, så visar guiden vad som faktiskt är belagt för den vägen in.",
    sections: [
      {
        heading: "Certifikatet gäller en konfiguration, inte en produkt",
        body: [
          "Samtliga fem certifierade lås i jämförelsen bär ett villkorsfält. Yale Doorman L3 kräver för sitt digitala S3-godkännande, certifikat 21-537, bortasäkert läge med blockerade användarkoder och upplåsning med nyckelbricka eller appen Yale Home. Nimly Code Pro och Nimly Code kräver koder på minst fyra siffror, påslagen anti-inbrottsfunktion, bortasäkert läge och tvåfaktorsinloggning, samt att kamouflagefunktionen är avstängd.",
          "Yale Doorman Classic, certifikat 20-19, kräver integritetsswitchen i läge hög, automatisk låsning påslagen och upplåsning med nyckelbricka eller nyckelbricka plus kod. Yale Linus L2, certifikat 24-365, är godkänt tillsammans med Yale Dot. Skilj samtidigt på Yales två certifikat: det mekaniska 20-172 i klass 3 bär inga villkor om öppningssätt alls.",
          "Det betyder inte att ett lås blir osäkert för att du slår på en funktion, och det säger ingenting om vad ditt försäkringsbolag accepterar. Det betyder att den konfiguration som är provad sällan är den som säljs in, och att frågan är värd att ställa före köpet snarare än efter en inbrottsanmälan.",
        ],
      },
      {
        heading: "Klass 3 är gränsen, och 2A är inte klass 3",
        body: [
          "SSF delar in låsenheter i klasserna 1A, 1B, 2A, 2B, 3, 4 och 5 enligt SSF 3522, och i S1, S2, S3 och S5 enligt SSF 3523 för digitala enheter. Klass 3 respektive S3 är grundkravet i samtliga skyddsklasser och den låsning SSF rekommenderar även för bostäder.",
          "Klass 2A har samma krav på inbrottsskydd från dörrens utsida som klass 3, men manövreringen från insidan underordnas utgång och utrymning. SSF:s eget exempel är lägenheter utan annan entréväg, och de skriver i samma mening att man ska kontrollera försäkringskraven. En godkänd låsenhet kräver klass 3.",
          "Nimly Code visar varför varje del räknas: låshus och slutbleck är certifierade i klass 3, men mekatronikcylindern är klass 2A, och därmed blir hela enheten 2A. CE-märkning är något helt annat igen. Den är tillverkarens egen försäkran och säger ingenting om inbrottsskydd. Leta efter certifikatsnumret och klassen, inte efter CE.",
        ],
      },
      {
        heading: "I bostadsrätt och hyresrätt äger du sällan dörren",
        body: [
          "Ytterdörren tillhör normalt föreningen respektive hyresvärden, och den ingår ofta i ett låssystem med huvudnyckel för fastighetsskötsel. Att byta ut låsenheten kan därför kräva tillstånd även när du betalar för det själv.",
          "Ett lås som monteras utanpå det befintliga vredet på insidan, som Yale Linus eller Danalock, rör inte den enhet som sitter i dörren. Det brukar vara enklare att få igenom, eftersom en godkänd låsenhet som redan finns står kvar orörd.",
          "Yale Linus L2 har dessutom ett eget certifikat, 24-365 i klass 2A enligt SSF 3522, giltigt till den 11 februari 2030 och godkänt tillsammans med Yale Dot. Det gör frågan till styrelsen kortare: det finns ett nummer att hänvisa till.",
        ],
      },
    ],
    faq: [
      {
        question: "Gäller certifikatet om jag använder koden?",
        answer:
          "Det beror på vilket lås och vilket certifikat. Yale Doorman L3:s digitala certifikat 21-537 i klass S3 gäller bortasäkert läge med blockerade användarkoder, medan dess mekaniska certifikat 20-172 i klass 3 inte har några villkor om öppningssätt. Nimly Code Pro går åt andra hållet: klass 3-certifikaten gäller med koden påslagen, förutsatt att den har minst fyra siffror, men kräver att kamouflagefunktionen är avstängd. Ring ditt försäkringsbolag och fråga specifikt om den öppningsmetod du tänkt använda.",
      },
      {
        question: "Vad är en godkänd låsenhet?",
        answer:
          "Hela enheten: låshus, låscylinder, säkerhetsslutbleck och förstärkningsbehör. För att vara godkänd ska hela enheten och varje ingående produkt var för sig nå klass 3 enligt SSF 3522 eller klass S3 enligt SSF 3523. Nimly Code visar vad det innebär i praktiken: låshuset och slutblecket är klass 3, men cylindern är klass 2A, och därför blir enheten 2A. Byter du ut en del kan godkännandet påverkas, och SSF skriver att man alltid ska kontrollera försäkringskraven innan man förändrar något.",
      },
      {
        question: "Räcker CE-märkning?",
        answer:
          "Nej. CE är tillverkarens egen försäkran om att produkten uppfyller EU-krav och säger ingenting om inbrottsskydd. En godkänd låsenhet kräver tredjepartscertifiering: ett oberoende organ som SBSC kontrollerar att provningen skett korrekt och med godkänt resultat.",
      },
      {
        question: "Får jag byta lås i en bostadsrätt?",
        answer:
          "Fråga föreningen först. Ytterdörren tillhör normalt föreningen och inte dig, och den ingår ofta i ett låssystem med huvudnyckel. Ett lås som monteras utanpå insidans vred rör inte den befintliga enheten och brukar vara enklare att få igenom, men frågan ska ställas ändå.",
      },
      {
        question: "Vad provas i ett digitalt låscertifikat?",
        answer:
          "Mekaniskt inbrottsskydd enligt SSF 3522, hantering av digitala nycklar enligt SSF 1075, och motstånd mot elektroniskt angrepp enligt prEN 16867. Att ett svenskt certifikat även granskar hur appen distribuerar och lagrar nycklar är det få som känner till.",
      },
    ],
    usedOn: ["kodlas-ytterdorr"],
    updated: "2026-08-06",
  },
  {
    slug: "vad-kostar-det-att-lamna-hemlarmet",
    name: "Vad kostar det att lämna?",
    title: "Vad kostar det att säga upp hemlarmet?",
    description:
      "Uppsägningstid, friköp av utrustningen och de avgifter som kan utlösas vid avslutet. Räknat på bolagens egna publicerade villkor, och tomt där bolaget inte publicerar något.",
    intro:
      "Varje jämförelse av hemlarm räknar på vad det kostar att vara kund. Nästan ingen räknar på vad det kostar att sluta vara det, trots att det är den kostnaden som avgör om du sitter fast. Den består av tre delar som står på tre olika ställen i avtalet: uppsägningstiden, friköpspriset om du vill behålla utrustningen, och avgifter som utlöses om avslutet inte sköts på bolagets villkor. Välj bolag och hur länge du varit kund.",
    sections: [
      {
        heading: "Du hyr larmet, du äger det inte",
        body: [
          "Verisures allmänna villkor 2025:1 punkt 5 säger att de behåller äganderätten till alla monterade och uppkopplade komponenter, oavsett om dessa införskaffats via Verisures webbshop eller på annat sätt. Du kan alltså köpa en komponent av dem och ändå inte äga den, så länge den är uppkopplad i tjänsten.",
          "Sector Alarms avtalsvillkor SAS 2.1 punkt 8 går längre: larmsystemet är och ska vid var tid förbli företagets egendom, och kunden förvärvar ingen rätt till eller i larmsystemet utöver en nyttjanderätt under avtalstiden. Det finns ingen friköpsmöjlighet för larmsystemet alls, bara för elektroniska dörrlås enligt punkt 12.4 och till ett pris bolaget själv sätter.",
          "Hos SecuritasHome, Svenska Alarm, Gardio och Garda Alarm köper du hårdvaran i stället. Det tar bort hela frågan, och det är den viktigaste skillnaden mellan de två affärsmodellerna. Safeland hyr ut sitt system men binder dig inte: du säger upp hyresavtalet när du vill, monterar ned utrustningen själv och skickar tillbaka den.",
        ],
      },
      {
        heading: "Friköp är en trappa, inte ett pris",
        body: [
          "Verisure publicerar sin friköpstabell öppet. Inom två år kostar det 7 000 kronor att köpa loss larmlösningen, vid två till fyra år 4 000 kronor, vid fyra till fem år 2 000 kronor, och efter fem år en krona. Det innebär i praktiken en femårig trappa som gör samma sak som en bindningstid utan att heta så.",
          "Det finstilta avgör om trappan är värd något. Verisure skriver att de i samband med friköp inte garanterar någon funktion, och att du inte kan använda Mina Sidor eller appen efter avslutat avtal. Du köper alltså loss hårdvara som i bästa fall blir en lokal ljudsignal.",
          "Och friköpet måste anmälas innan avtalstiden löper ut. Bolagets egen formulering är att när avtalet väl har gått ut har du tyvärr ingen rätt till friköp längre.",
        ],
      },
      {
        heading: "Avgifterna som utlöses vid avslutet",
        body: [
          "Verisure har rätt att debitera en återtagandeavgift om 7 000 kronor om du inte avtalar tid eller lämnar tillträde för avslutningsbesöket, enligt punkt 13 i de allmänna villkoren. Beloppet är detsamma som det högsta friköpspriset.",
          "Sector Alarm tar 990 kronor inklusive moms i framkörningsavgift om du inte är tillgänglig vid nedmonteringen, enligt punkt 12.2. Och punkt 12.3 innehåller den mest överraskande meningen i hela materialet: nycklar du lämnat in förstörs utan föregående meddelande om du inte skriftligen begär att få dem tillbaka under uppsägningstiden, och en retur kostar då 1 990 kronor inklusive moms.",
          "Räknaren håller de här avgifterna utanför summan och redovisar dem separat, eftersom du kan undvika dem. En kostnad du kan välja bort hör inte hemma i ett tal vi presenterar som vad det kostar.",
        ],
      },
    ],
    faq: [
      {
        question: "Hur lång är uppsägningstiden på ett hemlarm?",
        answer:
          "Det skiljer från ingen alls till fyra månader. Safeland har kortast: deras tjänstevillkor punkt 9 säger att avtalet varken har bindningstid eller uppsägningstid. SecuritasHome ger en månads varsel när de 24 bindningsmånaderna löpt ut enligt §4.1. Verisures allmänna villkor 2025:1 punkt 13 anger löpande tre kalendermånader från uppsägning, och Gardio, Svenska Alarm och Garda Alarm anger också tre. Längst har Sector Alarm, vars punkt 12.1 räknar tre månader från den första dagen i påföljande månad, vilket i praktiken kan bli upp till fyra. Avarn Security är det enda bolaget som inte publicerar någon uppsägningstid.",
      },
      {
        question: "Kan jag ta med mig larmet till ett annat bolag?",
        answer:
          "Nej. Larmen är operatörslåsta, vilket betyder att utrustningen bara fungerar mot det bolag som levererat den. Även när du köpt hårdvaran, som hos SecuritasHome, är den låst till leverantören. Det finns alltså ingen fungerande andrahandsmarknad och inget sätt att byta bolag utan att byta utrustning.",
      },
      {
        question: "Vad händer med larmet om jag slutar betala?",
        answer:
          "Tjänsten kopplas ur. Sector Alarms punkt 12.1 ger dem rätt att tillfälligt koppla ur tjänsterna vid betalningar som är mer än trettio dagar sena, och utebliven betalning över tre månader räknas som väsentligt avtalsbrott som ger rätt till omedelbar uppsägning. Verisures punkt 4 ger rätt att säga upp samtliga tjänster till omedelbart upphörande vid upprepade förseningar. Utrustningen slutar då fungera som larm, eftersom larmcentralen är det som gör den till ett larm.",
      },
      {
        question: "Får bolaget höja priset under avtalet?",
        answer:
          "Ja, med varsel. Sector Alarms punkt 13.5 säger att priserna får ändras tolv månader efter att du skrivit under, och därefter med minst en månads varsel. Verisures punkt 12 skiljer på tjänster som löper tillsvidare, där de får justera avgiften, och tjänster med bindningstid, där en höjning under bindningstiden bara får ske vid kostnadsökningar utanför bolagets kontroll. Båda ger dig rätt att säga upp avtalet utan extra kostnad om du inte accepterar höjningen.",
      },
    ],
    usedOn: ["hemlarm"],
    updated: "2026-08-06",
  },
  {
    slug: "femarskostnad-larm",
    name: "Larm med eller utan abonnemang?",
    title: "Vad kostar larmet på fem år, med och utan abonnemang?",
    description:
      "Ett larmpaket kostar en gång, ett abonnemangslarm varje månad. Räknaren ställer de två mot varandra över en period du väljer själv, på priser lästa hos butiken och hos larmbolaget.",
    intro:
      "Ett larm utan abonnemang kostar mellan 599 och 8 259 kronor, en gång. Ett abonnemangslarm kostar en startavgift plus en månadsavgift så länge du är kund. De två talen går inte att jämföra förrän man valt hur länge man tänker ha larmet, och det steget hoppar de flesta över. Välj ett paket, ett larmbolag och en tidshorisont.",
    sections: [
      {
        heading: "Varför fem år är förvalet",
        body: [
          "Fem år är inte något vi hittat på. Larmkollen, den mest utbyggda svenska jämförelsen av hemlarm, publicerar femårskostnader per bolag. Fem år är också där Verisures friköpstrappa når sin botten: inom två år kostar det 7 000 kronor att köpa loss utrustningen, efter fem år en krona.",
          "Reglaget går ändå från ett till tio år, eftersom svaret vänder någonstans i det spannet för de flesta kombinationer. Ett larmpaket för 599 kronor passeras av ett abonnemang på 599 kronor i månaden redan under första månaden. Ett Ajax-paket för 8 259 kronor tar betydligt längre tid att komma ikapp.",
          "Brytpunkten är inte hela svaret. Efter den betalar du för något du inte får med engångsköpet, nämligen att en bemannad larmcentral tittar och vid behov skickar väktare. Frågan är om det är värt månadsavgiften, inte om abonnemanget blir dyrare. Det blir det alltid till slut.",
        ],
      },
      {
        heading: "Fyra av åtta bolag går inte att räkna på",
        body: [
          "Räknaren kräver både en publicerad månadsavgift och en publicerad startavgift. Bara fyra av de åtta larmbolag vi jämför publicerar båda: SecuritasHome, Verisure, Gardio och Safeland.",
          "Vi tar ändå med de övriga i listan, med sin brist synlig. Att sålla bort dem hade dolt marknadens verkliga tillstånd, som är att en majoritet av bolagen inte skriver ut vad tjänsten kostar. Väljer du ett av dem svarar räknaren att den inte kan räkna, i stället för att gissa.",
          "En gissning ser lika trovärdig ut som en verklig siffra när den står i ett resultatfält. Därför gissar vi inte.",
        ],
      },
      {
        heading: "Vad summan medvetet utelämnar",
        body: [
          "Ingen prishöjning under perioden. Sector Alarms villkor punkt 13.5 tillåter prisändring tolv månader efter påskrift och därefter med en månads varsel, och Verisures punkt 12 tillåter justering på tjänster som löper tillsvidare. Ingen av dem publicerar någon procentsats, så varje höjning vi lade in hade varit påhittad.",
          "Ingen kostnad för SIM-abonnemanget. Ajax Hub 2 Plus har två SIM-kortsplatser och Ring och Yale kan använda mobilnätet mot en prenumeration. Trafiken kostar pengar hos någon operatör, men vi har inte hittat någon publicerad prisuppgift.",
          "Räkna alltså resultatet som ett golv för abonnemangets kostnad och inte som ett tak. Den verkliga skillnaden över fem år är sannolikt större än den räknaren visar, inte mindre.",
        ],
      },
    ],
    faq: [
      {
        question: "Är det billigare med larm utan abonnemang?",
        answer:
          "På sikt nästan alltid, eftersom en engångskostnad till slut passeras av vilken månadsavgift som helst. Ett larmpaket kostar 599 till 8 259 kronor en gång. Ett abonnemang hos Verisure kostar 3 990 kronor i startavgift plus 599 kronor i månaden, ungefär 39 900 kronor på fem år. Frågan är inte vilket som blir billigast utan vad du får för skillnaden, och det du får är en bemannad larmcentral som verifierar larmet och vid behov skickar väktare.",
      },
      {
        question: "När går abonnemanget om engångsköpet?",
        answer:
          "Ofta inom det första året. Med Verisures publicerade priser, 3 990 kronor i start och 599 i månaden, passeras ett eufy-paket för 1 990 kronor redan av startavgiften. Ett Ajax-paket för 8 259 kronor passeras efter ungefär åtta månaders avgifter utöver startavgiften. Räknaren visar brytpunkten i år och månader för den kombination du väljer.",
      },
      {
        question: "Varför kan räknaren inte räkna på alla larmbolag?",
        answer:
          "Därför att hälften av bolagen inte publicerar hela priset. Av de åtta larmbolag vi jämför publicerar sju en löpande avgift men bara fyra både den och startavgiften: SecuritasHome, Verisure, Gardio och Safeland. Avarn Security och Svenska Alarm anger en månadsavgift men ingen startavgift, Garda Alarm tar 1 199 kronor om året i stället för en månadsavgift och publicerar inget hårdvarupris, och Sector Alarm anger bara ett startpaketspris. Vi räknar bara när båda talen finns, eftersom en gissad summa är sämre än ett tomt fält.",
      },
      {
        question: "Kan jag lägga till en larmcentral på ett larm utan abonnemang?",
        answer:
          "Ibland, men då är det ett abonnemang igen. Ajax säljs av installatörer som också erbjuder larmcentralsanslutning, och Yale erbjuder professionell övervakning i sin egen prenumerationsplan. Ring och eufy har ingen svensk larmcentralsanslutning. Vet du redan att du vill ha en larmcentral är frågan snarare vilket abonnemangslarm som är bäst, och då är hårdvaran sällan det som avgör.",
      },
    ],
    usedOn: ["larm-utan-abonnemang", "hemlarm"],
    updated: "2026-08-06",
  },
  {
    /* Luftklustrets enda verktyg, inbäddat på alla tre kategorisidorna.
       Slugen bär inte ordet väljare, eftersom frågan "vilken luftapparat"
       överlever en andra väljare på samma tema. */
    slug: "vilken-luftapparat",
    name: "Vilken luftapparat behöver du?",
    title: "Luftrenare, luftfuktare eller avfuktare? Tre frågor ger svaret",
    description:
      "Tre frågor om besvär, uppmätt luftfuktighet och utrymme, så får du veta vilken av de tre luftapparaterna som löser ditt problem, eller om svaret är att du inte behöver någon alls.",
    intro:
      "De tre produkterna förväxlas ständigt och löser tre olika problem. En luftrenare tar bort partiklar, en luftfuktare tillför vatten och en avfuktare tar bort det. Väljer du fel gör två av dem aktiv skada, och i ett av de vanligaste fallen är rätt svar att inte köpa någonting.",
    sections: [
      {
        heading: "Varför mätvärdet kommer före köpet",
        body: [
          "Torr luft känns likadant vid 25 procent som vid 40, och bara det ena är ovanligt. Kondens på fönstren kan betyda att luften är för fuktig, men det kan lika gärna betyda att fönstret är kallt. Ingen av de två skillnaderna går att se med ögat, och båda avgör vilken apparat som är rätt.",
          "Därför ger guiden inget köpråd alls när du inte mätt. En hygrometer kostar ungefär hundra kronor, mindre än varje produkt vi rankar i de tre kategorierna, och två veckors mätning svarar på både vilken apparat du behöver och om du behöver någon.",
        ],
      },
      {
        heading: "Talen som svaren vilar på",
        body: [
          "Folkhälsomyndighetens allmänna råd FoHMFS 2014:14 namnger cirka 45 procent relativ luftfuktighet vid 21 grader som en indikation som kan få tillsynsmyndigheten att kräva undersökning av en byggnad. Stiftung Warentest anger att mögel hotar när luftfuktigheten i rum varaktigt stiger över 60 procent. ÖKO-TEST rekommenderar luftfuktare först när fukten legat under 30 procent under en längre tid.",
          "Observera vad allmänna råd är: rekommendationer och inte bindande regler, vilket författningssamlingen själv skriver ut. 45 procent är en indikation och inget gränsvärde.",
        ],
      },
      {
        heading: "Två svar som inte är produkter",
        body: [
          "Ligger du mellan 30 och 45 procent svarar guiden att du inte behöver någon av dem. Det är normalt inomhus under eldningssäsongen, och Folkhälsomyndighetens allmänna råd innehåller ingen nedre gräns alls och inget råd om att fukta.",
          "SweSIAQ, svenska föreningen för inomhusmiljö, pekar dessutom på två åtgärder som inte kostar något: sänk inomhustemperaturen, eftersom det är uppvärmningen som gör den relativa fuktigheten låg, och anpassa ventilationen så att luftflödena inte är högre än antalet personer kräver.",
        ],
      },
    ],
    faq: [
      {
        question: "Kan en luftrenare ta bort fukt?",
        answer:
          "Nej. En luftrenare drar luft genom ett filter och fångar partiklar som damm, pollen och pälsdjursallergen, men den ändrar inte luftens vatteninnehåll alls. Fukt och partiklar är två helt skilda axlar: du kan ha 70 procent luftfuktighet och ren luft, eller 30 procent och full av pollen. Behöver du både och är det två apparater, även om en del avfuktare har ett filter som gör en del av jobbet.",
      },
      {
        question: "Vilken luftfuktighet är normal inomhus på vintern?",
        answer:
          "30 till 45 procent är vanligt i ett uppvärmt svenskt hem under eldningssäsongen, och det finns inget svenskt riktvärde som säger att det är för lågt. Folkhälsomyndighetens allmänna råd innehåller ingen nedre gräns och inget råd om att fukta. Åt andra hållet namnger de cirka 45 procent vid 21 grader som en indikation som kan få tillsynsmyndigheten att kräva undersökning av byggnaden, så det du bör undvika är snarare för högt än för lågt.",
      },
      {
        question: "Jag har kondens på insidan av fönstren. Behöver jag en avfuktare?",
        answer:
          "Kanske, men mät först. Kondens uppstår när fuktig luft möter en kall yta, och det betyder att antingen luften är för fuktig eller att fönstret är kallt, ofta båda. Visar hygrometern över 60 procent har du ett verkligt fuktöverskott och en avfuktare hjälper. Ligger du under 45 är det fönstret och inte luften, och då gör en avfuktare ingen nytta. Vädra kort och ofta i stället för länge och sällan, och kontrollera att ventilerna inte är igensatta.",
      },
      {
        question: "Kan jag använda samma apparat i krypgrunden som i vardagsrummet?",
        answer:
          "Sällan. De flesta kondensavfuktare anger en nedre driftstemperatur på 5 grader och slutar fungera under den, och kapacitetstalet på förpackningen är i regel uppmätt vid 30 grader, långt över vad en krypgrund håller. Till riktigt kalla utrymmen behövs en sorptionsavfuktare, som arbetar även i minusgrader men drar mer el. Kontrollera driftstemperaturen innan du köper, inte literantalet.",
      },
      {
        question: "Guiden säger att jag inte behöver någon apparat. Varför säljer ni dem då?",
        answer:
          "Därför att svaret beror på vad hygrometern visar, inte på vad vi helst hade velat svara. I ungefär hälften av utfallen pekar guiden på en av våra tre kategorisidor, och i resten säger det att du ska mäta om, ventilera eller sänka temperaturen. En jämförelsesajt som aldrig säger nej är inte värd att läsa, och de källor vi lutar oss mot, SweSIAQ och ÖKO-TEST, säger båda nej oftare än branschen gör.",
      },
    ],
    usedOn: [
      "luftrenare",
      "luftfuktare",
      "avfuktare",
      "hygrometer",
      "luftkvalitetsmatare",
    ],
    updated: "2026-08-06",
  },
  {
    /* Kabelsidans enda verktyg. Slugen bär inte ordet väljare, av samma skäl
       som luftapparatens: frågan "vilken usb-c-kabel" överlever att en andra
       väljare byggs på samma tema, exempelvis för billaddare. */
    slug: "vilken-usb-c-kabel",
    name: "Vilken USB-C-kabel behöver du?",
    title: "Vilken USB-C-kabel behöver du? Tre frågor ger kraven",
    description:
      "Tre frågor om vad kabeln ska göra, vad den ska ladda och hur lång den behöver vara, så får du de tal som ska stå på förpackningen: watt, gigabit, e-marker och om den behöver klara video.",
    intro:
      "Kontakten ser likadan ut i hela kategorin, och det är hela problemet. Två kablar som inte går att skilja åt på hyllan kan skilja 83 gånger i datahastighet och fyra gånger i effekt, och priset förutsäger ingetdera. Guiden översätter det du faktiskt ska göra till en kravlista du kan bära med dig in i vilken butik som helst.",
    sections: [
      {
        heading: "Varför uppgiften avgör och inte priset",
        body: [
          "Ska kabeln ladda en telefon är den billigaste i butiken tekniskt likvärdig med den dyraste. Ingen telefon som säljs i dag drar mer än 60 watt, och varje USB-C-kabel klarar det. Det är därför guiden i det vanligaste fallet svarar att du inte ska betala mer.",
          "Det som kostar pengar är data och bild. En vanlig laddkabel gör 480 megabit i sekunden, en USB4-kabel 40 gigabit. Samma filflytt tar en kvart eller en hel kväll beroende på vilken sladd som råkade ligga närmast, och skillnaden syns inte på kontakten.",
        ],
      },
      {
        heading: "Sextio watt är gränsen där kabeln börjar spela roll",
        body: [
          "En USB-C-kabel utan e-marker klarar 3 ampere, alltså omkring 60 watt, oavsett hur stark laddaren är. E-markern är ett litet chip som talar om för laddaren vad kabeln tål, och utan det håller laddaren igen. Det är den vanligaste orsaken till att en dyr laddare laddar långsamt.",
          "Över 60 watt behövs alltså en e-marker, och för 240 watt krävs dessutom att kabeln stöder Extended Power Range och USB PD 3.1, alltså 48 volt och 5 ampere. Under 60 watt behövs ingenting särskilt.",
        ],
      },
      {
        heading: "En bildskärm ställer ett krav som ett wattal inte täcker",
        body: [
          "Bildsignalen går genom samma ledarpar som de snabba datakanalerna, och i en laddkabel är de ofta inte inkopplade alls. En kabel kan därför ladda med 240 watt och ändå lämna skärmen svart. Leta efter DisplayPort Alt Mode eller en angiven upplösning som 4K 60 Hz.",
          "Långa kablar är en egen sak. En passiv kabel tappar bandbredd med längden, vilket är skälet till att aktiva kablar med elektronik i kontakterna finns och kostar det de gör. Behöver du både tre meter och full hastighet blir det dyrt, och att flytta skärmen närmare är ofta billigare.",
        ],
      },
    ],
    faq: [
      {
        question: "Guiden säger att den billigaste kabeln räcker. Varför jämför ni då dyrare?",
        answer:
          "Därför att svaret beror på vad kabeln ska göra. Ska den ladda en telefon räcker den billigaste, och det säger guiden rakt ut i det vanligaste utfallet. Ska den flytta filer från en extern disk eller driva en bildskärm är det en helt annan produkt, och då är den billigaste kabeln inte en sämre variant utan fel sak. Vår jämförelse rankar tolv kablar just därför att de löser olika problem.",
      },
      {
        question: "Hur vet jag hur många watt min laptop behöver?",
        answer:
          "Det står på datorns egen nätdel och på förpackningen den kom i. Sedan direktivet om den gemensamma laddaren trädde i kraft ska förpackningen bära en etikett med ett tal följt av W, och det talet är den effekt en laddare minst måste ge för att apparaten ska nå sin högsta laddhastighet. Som tumregel vill en ultrabook ha 65 watt, en 14-tumsdator omkring 100 och en 16-tums MacBook Pro 140.",
      },
      {
        question: "Kan jag skada något med fel kabel?",
        answer:
          "Nej, i praktiken inte. En kabel som klarar mindre än laddaren kan ge håller laddaren tillbaka, eftersom effekten förhandlas fram mellan de tre delarna innan strömmen släpps på. Konsekvensen är att laddningen går långsammare, inte att något går sönder. Det är också därför problemet är svårt att upptäcka: allt fungerar, bara sämre än det borde.",
      },
    ],
    usedOn: ["usb-c-kabel"],
    updated: "2026-08-06",
  },
  {
    /* Kompaktkamerasidans enda verktyg. Slugen namnger avvägningen och inte
       produkten, eftersom frågan "sensor eller räckvidd" gäller lika mycket
       för en systemkamera och överlever att kategorin byggs ut. */
    slug: "sensor-eller-rackvidd",
    name: "Sensor eller räckvidd?",
    title: "Sensor eller räckvidd? Tre frågor avgör vilken kamera du ska ha",
    description:
      "Tre frågor om vad du fotograferar, om du filmar och var kameran ska vara, så får du veta vilken av de två egenskaperna som är värd pengarna för just dig, och vad som ska stå i specifikationen.",
    intro:
      "En kompaktkamera under 7 000 kronor ger dig antingen en stor sensor eller lång zoom, aldrig båda, och priset avslöjar inte vilket. Den billigaste kameran i vår jämförelse med sensor av 1,0-typ kostar mindre än de två med minsta sensorn och längsta zoomen. Guiden översätter det du faktiskt fotograferar till den av egenskaperna som betyder något, och till de tal som ska stå på förpackningen.",
    sections: [
      {
        heading: "Varför du inte kan få både stor sensor och lång zoom",
        body: [
          "Ett objektiv som ska nå 700 millimeter måste projicera bilden på en yta, och ju större den ytan är desto större blir linserna. Ett 30-gångers zoomobjektiv för en sensor av 1,0-typ blir därför så stort att kameran inte längre ryms i en ficka, vilket är hela poängen med en kompaktkamera.",
          "Följden är att tillverkarna väljer åt dig. Kameror med sensor av 1,0-typ stannar på 100 till 200 millimeter eller saknar zoom helt, medan de som når 720 och 960 millimeter alla har 1/2,3-tums sensor. Skillnaden i sensoryta mellan de två klasserna är ungefär fyra gånger.",
        ],
      },
      {
        heading: "Sensorytan avgör allt som händer efter oktober",
        body: [
          "En sensor av 1,0-typ mäter 13,2 × 8,8 millimeter. En 1/2,3-tums mäter ungefär 6,2 × 4,6. Talen är gamla mått från tv-kamerarörens tid och anger inte diagonalen, vilket är skälet till att skillnaden ser mindre ut än den är: fyra gånger arean, inte drygt två.",
          "Den ytan är allt som avgör i dåligt ljus, alltså varje inomhusmiljö en svensk vinterkväll. En kamera med liten sensor kan vara utmärkt i dagsljus och samtidigt ge sämre bilder än telefonen i fickan vid middagsbordet i november.",
        ],
      },
      {
        heading: "Vattentäthet utesluter frågan helt",
        body: [
          "Ska kameran under ytan är avvägningen redan gjord åt dig. Ingen tillverkare bygger en kamera med stor sensor som tål vatten, eftersom tätningen kräver ett litet hus och ett fast objektiv som inte skjuts ut. Valet står då mellan de två tåliga kameror som finns, och båda har 1/2,3-tums sensor.",
          "Kontrollera vilket djup som anges i meter. Ett angivet djup på 1 eller 3 meter är gjort för poolkanten och regnet, medan 15 meter räcker till snorkling över ett rev. Ordet vattentät utan ett tal säger ingenting.",
        ],
      },
    ],
    faq: [
      {
        question: "Kan jag inte bara zooma digitalt och behålla den stora sensorn?",
        answer:
          "Digital zoom beskär bilden och förstorar utsnittet, alltså precis det du själv kan göra i telefonen efteråt. Ingen detalj tillkommer. En kamera med 20 megapixel som beskärs till en fjärdedel ger en bild på 5 megapixel, vilket räcker till en skärm men inte till att se fjädrarna på fågeln. Optisk zoom flyttar linser och samlar verkligt ljus från motivet, och det är den enda zoom som ska stå i din jämförelse.",
      },
      {
        question: "Guiden säger att jag ska behålla telefonen. Varför säljer ni då kameror?",
        answer:
          "Därför att svaret beror på vad du fotograferar. Fotar du rum, mat och personer på nära håll i dagsljus har en kamera med 1/2,3-tums sensor ungefär samma sensoryta som en bra mobil och sämre bildbehandling, och då är köpet inget steg upp. Steget upp finns vid 1,0-typ, eller när du behöver zoom en telefon inte kan låtsas ha. Vår jämförelse rankar tio kameror just därför att de löser olika problem.",
      },
      {
        question: "Vad betyder talen 1,0-typ och 1/2,3 tum egentligen?",
        answer:
          "De kommer från diametern på de glasrör som satt i tv-kameror på femtiotalet, och de beskriver inte sensorn. En sensor av 1,0-typ har en diagonal på knappt 16 millimeter, alltså långt under en tum. Det enda du behöver veta är rangordningen och att skillnaden i yta är större än talen antyder: 1,4 tum är störst av dem som finns i fickformat, sedan 1,0-typ, och 1/2,3 tum är minst med ungefär en fjärdedel av arean.",
      },
    ],
    usedOn: ["kompaktkamera"],
    updated: "2026-08-06",
  },
  {
    /* Powerstationsidans enda verktyg. Slugen bär inte ordet väljare, eftersom
       frågan är en dimensionering och inte ett val mellan produkter, och
       eftersom "hur stor" är just den fråga kategorin ställer. */
    slug: "hur-stor-powerstation",
    name: "Hur stor powerstation behöver du?",
    title: "Hur stor powerstation behöver du? Två tal, inte ett",
    description:
      "Välj vad stationen ska driva, om apparaterna går samtidigt och hur länge, så får du de två tal som ska stå i specifikationen: kontinuerlig effekt i watt och kapacitet i wattimmar, plus toppeffekten som avgör om en motor kommer igång.",
    intro:
      "En powerstation säljs med ett tal i modellnamnet, och köparen behöver två. Watt avgör vad som över huvud taget går att koppla in. Wattimmar avgör hur länge det kan gå. Ett stort batteri bakom en svag växelriktare startar aldrig vattenkokaren, och en stark växelriktare med litet batteri gör det i tio minuter. Räknaren översätter det du faktiskt ska driva till båda talen.",
    sections: [
      {
        heading: "Watt och wattimmar svarar på olika frågor",
        body: [
          "Watt är effekt och beskriver ögonblicket. Klarar växelriktaren 500 watt startar ingenting som drar mer, hur stort batteriet än är. Wattimmar är energi och beskriver uthålligheten: 1 000 wattimmar räcker till 100 watt i tio timmar eller 1 000 watt i en timme.",
          "Gränsen i praktiken går vid värme. Allt som ska laddas eller lysa håller sig under 250 watt. Allt som ska bli varmt, alltså vattenkokare, hårtork, kaffebryggare och mikrovågsugn, ligger mellan 1 000 och 2 000. Det är därför samma station kan kännas överdimensionerad och otillräcklig beroende på vad den ska göra.",
        ],
      },
      {
        heading: "Startrycket är ett tredje tal",
        body: [
          "En kompressor eller motor drar två till tre gånger sin märkeffekt under den första sekunden. Ett kylskåp som förbrukar 100 watt i drift kan kräva 400 för att komma igång, och en dränkbar pump på 400 watt kan kräva 1 000.",
          "Det talet heter toppeffekt och står separat i specifikationen. En station som klarar driften kan alltså ändå vägra starta apparaten, och det är den vanligaste orsaken till att ett köp inte fungerar som tänkt.",
        ],
      },
      {
        heading: "Femton procent försvinner på vägen",
        body: [
          "Tillverkarnas wattimmar gäller batteriet, inte uttaget. Växelriktaren som gör 230 volt växelström av batteriets likspänning kostar energi, och en del försvinner dessutom som värme.",
          "Räknaren lägger därför på 15 procent, vilket är den försiktiga änden av vad som är vanligt i kategorin. Räknar du själv på en produktsidas tal ska du dra av ungefär lika mycket innan du jämför med ditt behov.",
        ],
      },
    ],
    faq: [
      {
        question: "Varför blir effektkravet inte summan av allt jag valt?",
        answer:
          "Därför att effekt är ett ögonblick och inte en mängd. Ska apparaterna gå en i taget behöver växelriktaren bara orka den som drar mest, och fem lampor på 20 watt som tänds efter varandra kräver alltså 20 watt och inte 100. Ska de gå samtidigt är summan rätt tal, och då frågar räknaren om det. Energikravet räknas däremot alltid på allt tillsammans, eftersom samma arbete kostar lika mycket energi oavsett i vilken ordning det utförs.",
      },
      {
        question: "Räknaren säger att jag behöver mer än tusen wattimmar. Vad gör jag då?",
        answer:
          "Då är en bärbar powerstation fel produkt för behovet. Den klass som går att bära slutar runt tusen wattimmar, och över den finns hemreservklassen på två till fyra kilowattimmar som väger mellan 20 och 50 kilo. Behöver du ännu mer är alternativen ett fast installerat hembatteri eller ett elverk med förbränningsmotor. Ett elverk kräver bränsle, låter betydligt mer och får aldrig köras inomhus eller i ett garage, eftersom avgaserna innehåller kolmonoxid.",
      },
      {
        question: "Kan jag lita på talen för apparaterna?",
        answer:
          "De är typiska värden och satta i den övre änden av vad som är vanligt, eftersom ett för lågt krav ger ett köp som inte fungerar medan ett för högt bara ger marginal. Din egen apparat har sitt tal tryckt på märkskylten, oftast på undersidan eller baksidan, och står angivet i watt eller som volt och ampere som du multiplicerar. Har du talet ska du använda det. Räknaren finns för att ge en storleksordning innan du står i butiken.",
      },
    ],
    usedOn: ["powerstation"],
    updated: "2026-08-06",
  },
  {
    slug: "vad-betyder-talet-pa-hygrometern",
    name: "Vad betyder talet på hygrometern?",
    title: "Hygrometern visar 58 procent. Vad betyder det egentligen?",
    description:
      "Skriv in det mätaren visar och den noggrannhet bruksanvisningen anger, så räknas avläsningen om till det spann den faktiskt betyder, och du får veta vilka av gränserna 45, 50 och 60 procent talet kan avgöra.",
    intro:
      "En hygrometer visar ett tal med en decimals självsäkerhet, men mätaren får visa fel och hur mycket står i bruksanvisningen snarare än på förpackningen. Med ± 5 procentenheter, som är vad de flesta anger, kan en avläsning på 58 i verkligheten vara 53 eller 63, på båda sidor om mögelgränsen. Verktyget räknar om talet till det spann det betyder och säger rakt ut när avläsningen inte räcker för att avgöra saken.",
    sections: [
      {
        heading: "Toleransen står i manualen, inte i spectabellen",
        body: [
          "Produktsidan anger mätområdet, alltså mellan vilka värden mätaren över huvud taget visar något. Det säger ingenting om hur rätt den visar. Felmarginalen står på sista uppslaget i bruksanvisningen, som PDF, en länk ned från samma sida. Öppna den innan du köper, och innan du utgår från att din nuvarande mätare inte har någon angiven.",
          "Priset förutsäger inte talet. Rubicson Kompakt för 179,90 kronor, Beurer HM 16 för 199,90 och Beurer HM 22 för 269 anger alla ± 5 procentenheter mellan 40 och 80 procent och ± 8 utanför. Snävast av dem vi jämfört är Govee H5075 för 219 kronor med ± 3.",
        ],
      },
      {
        heading: "Tre gränser inom femton procentenheter",
        body: [
          "Folkhälsomyndighetens allmänna råd FoHMFS 2014:14 anger 7 g vatten per kg torr luft under eldningssäsongen, vilket motsvarar cirka 45 procent relativ luftfuktighet vid 21 grader, som en indikation som kan få tillsynsmyndigheten att kräva undersökning av byggnaden. SweSIAQ anger att kvalstertillväxt kan börja i rumstemperatur redan över 45 till 50 procent. Mögel brukar sättas vid varaktigt över 60.",
          "De tre ligger så tätt att en mätare med ± 8 procentenheter inte kan skilja dem åt. Det är därför verktyget hellre svarar att avläsningen inte räcker än ger ett råd talet inte bär. Observera att allmänna råd är rekommendationer och inte bindande regler, vilket författningssamlingen själv skriver ut, och att 45 procent är en indikation och inget gränsvärde.",
        ],
      },
      {
        heading: "När toleransen inte står någonstans",
        body: [
          "Det finns ett eget val för det. Verktyget räknar då på ± 5 procentenheter och skriver ut att talet är ett antagande och inte en uppgift om just din mätare. Fem är valt därför att det är vad de flesta tillverkare anger i mellanspannet, och därför att de digitala mätare någon oberoende faktiskt mätt låg inom 4,4. Skälet att räkna alls är att ett spann säger mer än ett ensamt tal även när bredden är osäker; skälet att skriva ut antagandet är att ett spann som ser exakt ut vore värre än inget.",
          "En sak som gör spannet bredare än det ser ut: en analog visarmätare kan skilja sig kraftigt mellan enskilda exemplar av samma modell. Tyska mögelsaneringsförbundet fann upp till tolv procentenheters spridning mellan tre exemplar av en och samma analoga modell när de jämförde fjorton mätare mot ett kalibrerat referensinstrument. Har du en visarmätare är svaret här mer osäkert än vad verktyget visar.",
        ],
      },
    ],
    faq: [
      {
        question: "Vad ska luftfuktigheten vara inomhus?",
        answer:
          "30 till 45 procent är vanligt i ett uppvärmt svenskt hem under eldningssäsongen. Folkhälsomyndighetens allmänna råd innehåller ingen nedre gräns och inget råd om att fukta, så det finns inget svenskt riktvärde som säger att torr luft är för torr. Åt andra hållet namnger de cirka 45 procent vid 21 grader som en indikation som kan få tillsynsmyndigheten att kräva undersökning av byggnaden, och över 60 procent varaktigt gynnar mögel. Det du bör undvika är alltså snarare för högt än för lågt.",
      },
      {
        question: "Min mätare anger ingen noggrannhet. Är den dålig?",
        answer:
          "Leta i bruksanvisningen först. Talet står nästan aldrig i spectabellen på produktsidan, men det ligger ofta på sista uppslaget i manualen, som brukar finnas som PDF hos butiken eller tillverkaren. Hittar du det ändå inte betyder det inte att mätaren är dålig: när tyska mögelsaneringsförbundet mätte åtta digitala mätare mellan 5,99 och 136 euro mot ett kalibrerat referensinstrument låg samtliga inom 4,4 procentenheter, alltså inom det branschen brukar utfästa. Är mätaren analog är läget ett annat, och där är svaret oftare ja.",
      },
      {
        question: "Är analoga hygrometrar sämre än digitala?",
        answer:
          "På den enda punkt som gått att mäta, ja. När mögelsaneringsförbundet jämförde fjorton mätare mot ett kalibrerat referensinstrument fann de upp till tolv procentenheters spridning mellan tre exemplar av en och samma analoga modell, mellan urtavlor av samma vara. Det går inte att kalibrera bort och det syns inte på mätaren. Deras rekommendation efter provningen var digitalt rakt av, och de billiga digitala klarade sig genomgående bra.",
      },
      {
        question: "Kan jag kontrollera om min hygrometer visar rätt?",
        answer:
          "Det finns en känd metod med mättad koksaltlösning i en sluten behållare, som ger ungefär 75 procent relativ fuktighet vid rumstemperatur. Vi har inte utfört den och redovisar därför inga resultat från den. Det enklare svaret om du misstänker att mätaren visar fel är att ställa två mätare bredvid varandra i samma rum ett dygn: skiljer de sig mer än några procentenheter vet du att åtminstone den ena inte går att lita på.",
      },
      {
        question: "Varför säger verktyget ibland att avläsningen inte räcker?",
        answer:
          "Därför att felmarginalen då är bredare än avståndet till gränsen. Visar mätaren 58 procent med ± 5 procentenheter ligger det verkliga värdet någonstans mellan 53 och 63, både under och över mögelgränsen på 60. Att i det läget svara ja eller nej vore att låtsas om en precision talet inte har. Vill du komma vidare behöver du en mätare med snävare angiven tolerans, eller mäta upprepat över tid i stället för att lita på en enskild avläsning.",
      },
    ],
    usedOn: ["hygrometer"],
    updated: "2026-08-06",
  },
  {
    slug: "vilken-termostat-passar-min-ventil",
    name: "Vilken termostat passar min ventil?",
    title: "Vilken smart radiatortermostat passar min ventil?",
    description:
      "Välj vad som står på ventilkroppen under vredet, så får du veta vilka av elva smarta radiatortermostater som monteras på just den fattningen, vilka som säljer adaptern separat och vilka som inte når den alls.",
    intro:
      "En radiatortermostat skruvas på den ventil som redan sitter där, och passar den inte hjälper varken pris eller protokoll. Spannet är femfaldigt: Netatmo når tio fattningar, Danfoss Ally RA når två. Ingen av uppgifterna står i butiken, där det bara sägs att termostaten passar en mängd olika tillverkare. Välj din fattning här.",
    sections: [
      {
        heading: "Tre svar, inte två",
        body: [
          "Verktyget skiljer på att adaptern ligger i lådan, att den finns men säljs separat, och att fattningen inte täcks av tillverkarens underlag. Den sista kategorin är inte ett nej. Flera termostater levererar sannolikt adaptrar som aldrig räknas upp, och en lös adapter i metall från en VVS-butik löser ofta resten. Skillnaden är att du köper på hoppet i stället för på en uppgift.",
          "Listorna byggdes om den 6 augusti 2026 och tre av dem var för korta. SONOFF låg på en enda fattning tills vi öppnade deras kompatibilitetsguide över 41 ventilmärken, Fibaro låg på noll tills vi läste första sidan i deras bruksanvisning, och Danfoss Eco låg på två mot fyra i Danfoss eget produktregister. Felet var vårt, inte tillverkarnas.",
        ],
      },
      {
        heading: "Fyra fattningar räcker oftast, sju behövs ibland",
        body: [
          "Fyra fattningar betyder gängan M30x1,5 plus Danfoss RA, RAV och RAVL, alltså de klämfattningar som sitter på en stor del av det svenska beståndet. Fem av de elva termostaterna ligger där, och är alla dina element från samma årtionde behöver du sällan mer.",
          "Sju behövs när elementen är från olika årtionden. Då dyker M28x1,5 och de italienska klämfattningarna Caleffi och Giacomini upp, och de klarar bara Aqara W600, tado X och SONOFF TRVZB. Netatmo når tio och är ensam om att över huvud taget nå Vaillant, om än mot en extra adapter som säljs i tiopack.",
        ],
      },
      {
        heading: "Två fällor som inte syns på produktbilden",
        body: [
          "Den första är ventiltypen. En radiatortermostat reglerar värmen genom att trycka på ventilens stift, vilket förutsätter en termostatventil, alltså ett vred med siffror. På en manuell kran finns inget stift och ingen av dem fungerar. I ett enrörssystem, där vattnet går i slinga mellan elementen, påverkar du flödet till alla element efter det du struper, och Aqara E1 är den enda som anger det innan du beställer.",
          "Den andra är själva adaptern. Ljud & Bilds testare, som använt tado i flera år, skriver att de medföljande plastadaptrarna inte klarat trycket när termostaterna öppnat och stängt värmen, med följden att termostater fallit av och landat på golvet medan värmen stått fullt uppskruvad, ibland på natten. Hans råd är att köpa en adapter i metall hos en VVS-butik. Att en fattning står i tabellen säger alltså inget om hur väl den sitter.",
        ],
      },
    ],
    faq: [
      {
        question: "Hur tar jag reda på vilken ventil jag har?",
        answer:
          "Skruva loss det befintliga vredet, för hand eller med en tång. Det läcker inte vatten när du gör det, eftersom vredet bara trycker på ett stift och inte håller tätt mot vattnet. Under sitter ventilkroppen, och där står oftast tillverkarens namn. Är fattningen gängad och 30 mm i diameter är det nästan alltid M30 x 1,5. Klickas vredet fast i stället för att skruvas är det sannolikt en Danfoss RA. Vill du mäta: ta diametern med linjal eller skjutmått, och räkna tre gängtoppar för att få stigningen. Är avståndet 3 mm är stigningen 1,5.",
      },
      {
        question: "Vad händer om jag köper fel adapter?",
        answer:
          "Termostaten går inte att montera, eller sitter så löst att den lossnar när motorn arbetar. Det andra är värre än det första. Ljud & Bilds testare beskriver att termostater fallit av och landat på golvet med värmen fullt uppskruvad, ibland på natten, vilket betyder att elementet stått på för fullt tills någon upptäckt det. Adaptrar går att köpa separat hos VVS-handeln, och flera tillverkare pekar själva dit för de fattningar de inte levererar.",
      },
      {
        question: "Min ventil är av ett märke ingen nämner. Vad gör jag?",
        answer:
          "Utgå från fattningen i stället för från märket. De flesta ventiler använder någon av ett fåtal standardfattningar, och märkesnamnet spelar mindre roll än gängan. Är det M30 x 1,5 passar i praktiken det mesta. Är det något annat, och ingen tillverkare namnger det, är svaret att du köper på hoppet, och då är det värt att fråga en VVS-butik om det finns en adapter innan du beställer termostaten.",
      },
      {
        question: "Fungerar det på handdukstork och golvvärme?",
        answer:
          "En handdukstork som är ansluten till det vattenburna systemet har oftast en vanlig termostatventil och fungerar därmed likadant som ett element. En elektrisk handdukstork har det inte. Golvvärme styrs inte av en radiatortermostat alls utan av en rumstermostat i väggen eller av en fördelare, vilket är en annan produkt med en annan installation. Aqaras egen text för E1 nämner handdukstork och golvvärme, men den uppgiften kommer från butiken och gäller anslutningen till systemet, inte apparaten.",
      },
      {
        question: "Varför saknas vissa termostater i listan för min fattning?",
        answer:
          "Därför att deras adaptrar inte täcker just den fattningen i tillverkarens eget underlag. Det är inte ett underkännande av produkten. Flera av dem levererar sannolikt fler adaptrar än de räknar upp, och en lös adapter i metall från en VVS-butik kostar under hundralappen och löser ofta saken. Skillnaden mot dem som står med är att du inte kan kontrollera det i förväg, och att svaret kommer först när paketet är öppnat.",
      },
    ],
    usedOn: ["smart-termostat"],
    updated: "2026-08-06",
  },
];


export function findTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function toolHref(tool: Tool | string): string {
  return `/guider/${typeof tool === "string" ? tool : tool.slug}`;
}

/** Tools embedded by a given category, for that page's guide. */
export function toolsForCategory(testPageSlug: string): Tool[] {
  return TOOLS.filter((t) => t.usedOn.includes(testPageSlug));
}
