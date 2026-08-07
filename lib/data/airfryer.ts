import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { AIRFRYER } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Real products for /airfryer.
 *
 * Tredje sidan i gruppen Kök, byggd 2026-08-06. Sidan rankar korgfritöser
 * mellan 859 och 2 162 kronor. Ugnstyper, multikokare och grillhybrider ligger
 * bland övervägda efter användarbeslut.
 *
 * Priser, artikelnummer, GTIN och lagerstatus är lästa i produktsidans egen
 * JSON-LD hos butiken på PRICE_CHECKED. Specifikationerna är lästa hos
 * **tillverkaren**: Ninjas bruksanvisningar för AF300EU, AF400EU, AF500EU och
 * FN101EU, Philips egna produktsidor, Boschs svenska produktsida, OBH Nordicas
 * manual för AG8558N0, Cosoris egna produktsidor och AIVIQ:s egen katalog.
 *
 * AFFILIATE-SWAP — `merchantUrl` är butikens egen produktsida. Inget
 * `affiliateUrl` någonstans; vi har inget program i kategorin ännu. Se
 * lib/links.ts för vad LINK_MODE står på i dag.
 *
 * ## Två lådor delar på effekten
 *
 * Sidans fynd, och det som avgör rankningen. RTINGS har mätt Ninja Foodi DZ201
 * till **1 540 W med båda lådorna igång och 1 470 W med bara en**. Den andra
 * lådan lägger alltså till sjuttio watt, inte fjortonhundra.
 *
 * Det gäller EU-modellerna lika mycket. Ninjas egna bruksanvisningar anger
 * `Effekt: 2470W` för både AF300EU på 7,6 liter och AF400EU på 9,5, alltså
 * totalt för två zoner. 1 235 W per låda ligger under de 1 400 W RTINGS
 * rekommenderar för att maskinen ska hinna tillbaka till måltemperatur när kall
 * mat läggs i.
 *
 * Därav ordningen. De två som toppar listan, Ninja AF500EU och Cosori Twinfry,
 * är de enda som kan lyfta ur delaren och lägga hela effekten på en enda
 * kammare. Ninja AF400EU, den klassiska dubbelkorgen som svenska
 * jämförelsesidor rankar högst, hamnar sist.
 *
 * ## Literangivelsen är kammarens volym, inte portionen
 *
 * Ninjas svenska bruksanvisning skriver det själv: "se till att ingredienserna
 * placeras i ett jämnt lager på botten av lådan och att de inte ligger på
 * varandra". Råd & Rön mätte samma sak från andra hållet — minsta modellen i
 * deras test klarar 433 gram pommes, men bara 289 gram om de ska bli bra.
 * RTINGS tröskel är 325 kvadratcentimeter bottenyta.
 *
 * ⚠️ `Korgens bottenyta` är därför **omarkerad** i specarna. Bara AIVIQ
 * publicerar korgmått i svensk handel, och RTINGS har mätt två av modellerna i
 * deras amerikanska utförande. Tre av tio är för få för en jämförelserad, och
 * en omarkerad uppgift på tre produkter är sourcad data i produktens egen
 * lista. Se varningen i check:tackning.
 *
 * ## Vad ingen har gjort
 *
 * Vi har inte friterat en pommes. Råd & Rön har provat 70 luftfritöser,
 * Stiftung Warentest 20 och RTINGS 52; de två första ligger bakom betalvägg och
 * får inte återges, och RTINGS provar 120-voltsmodeller. Inget av deras betyg
 * påverkar en enda poäng här.
 */

export const PRICE_CHECKED = "2026-08-06";

const SEEDS: ProductSeed[] = [
  {
    id: "ninja-af500eu",
    brand: "Ninja",
    name: "Foodi FlexDrawer AF500EU",
    shortName: "Ninja AF500EU",
    image: productImage(AIRFRYER.slug, "ninja-af500eu"),
    tagline: "Ta ur delaren, så går 2 470 watt till en enda kammare på 10,4 liter.",
    scores: {
      /* MegaZone: delaren lyfts ur och hela kammaren blir en zon på 10,4 liter,
         enligt bruksanvisningen. Enda konstruktionen tillsammans med Cosori
         Twinfry där maten kan ligga i ett lager över hela bottenytan. */
      "jamn-tillagning": 5,
      /* 2 470 W enligt manualen. Delat på två zoner blir det 1 235 W per låda,
         under RTINGS tröskel på 1 400. I MegaZone går hela effekten till en
         kammare, vilket ingen fast dubbelkorg klarar. */
      effekt: 4.5,
      /* 1 890 kr för 10,4 liter är billigare än Ninjas egen niolitersmodell. */
      prisvarde: 4.5,
      /* 40 till 240 °C. */
      temperatur: 5,
      /* Låda, delare och två krispningsplattor, alltså fyra delar. Non-stick. */
      rengoring: 3.5,
    },
    price: 1890,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Airfryer/Ninja-AF500EU-Flex-Drawer/3243985",
    award: "winner",
    superlative: "Bäst när alla ska äta samtidigt",
    pros: [
      "Delaren lyfts ur, så hela kammaren blir en zon på 10,4 liter",
      "2 470 watt hamnar på en enda yta i det läget, mot 1 235 per låda i tvåzonsläge",
      "40 till 240 grader, alltså över de 204 grader RTINGS friterar vid",
      "10,4 liter för 1 890 kronor, billigare än niolitersmodellen från samma tillverkare",
      "Alla löstagbara delar tål maskindisk",
    ],
    cons: [
      "Fyra delar att diska när du kört med delaren i: låda, delare och två plattor",
      "51 centimeter bred, alltså den bredaste här och svår att ställa undan",
      "Non-stick och inte keramik, till skillnad från Cosoris svarta utförande",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 890 kr", highlight: true },
      { label: "Kammare", shortLabel: "Kammare", value: "En låda med löstagbar delare", highlight: true },
      { label: "Total volym", shortLabel: "Volym", value: "10,4 l", highlight: true },
      { label: "Volym per kammare", shortLabel: "Per zon", value: "5,2 l", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "2 470 W", highlight: true },
      { label: "Effekt per kammare", shortLabel: "W/kammare", value: "2 470 W odelad, 1 235 W per zon", highlight: true },
      { label: "Maxtemperatur", shortLabel: "Max", value: "240 °C", highlight: true },
      { label: "Beläggning", shortLabel: "Yta", value: "Non-stick", highlight: true },
      { label: "Temperaturomfång", value: "40–240 °C" },
      { label: "Antal program", value: "7" },
      { label: "Delar att diska", value: "Låda, delare, två krispningsplattor" },
      { label: "Yttermått", value: "51 × 39 × 32 cm" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "0622356270373" },
    ],
    verdict:
      "Ninja Foodi FlexDrawer AF500EU kostar 1 890 kronor och är den enda dubbelkorgen här som går att göra till en enkelkorg. Delaren lyfts ur, och 10,4 liter blir en enda kammare.\n\n**Det är hela skälet att den vinner.** En vanlig dubbelkorg delar sin effekt: 2 470 watt fördelat på två zoner blir 1 235 watt per låda, och RTINGS har mätt hur lite den andra lådan tillför. 1 540 watt med båda igång mot 1 470 med bara en. Med delaren ur går alla 2 470 watt till en yta, och maten kan ligga i ett lager över hela botten i stället för i två högar. Ninjas egen bruksanvisning säger varför det spelar roll: ingredienserna ska ligga i ett jämnt lager utan att ligga på varandra. Behöver du ändå två temperaturer sätter du tillbaka delaren och får en helt vanlig dubbelkorg.\n\nDärtill 240 grader, alltså över de 204 grader RTINGS kör hela sin provning vid, och 10,4 liter för mindre pengar än Ninjas egen niolitersmodell kostar. Alla löstagbara delar tål maskindisk.\n\nDen är bred. 51 centimeter bänk är mer än någon annan här tar, och har du kört med delaren i blir det fyra delar att diska. Köp den ändå, för det här är maskinen som gör krispig mat åt fyra personer på en gång, och den enda som låter dig välja om du vill ha en stor låda eller två små.",
  },
  {
    id: "cosori-twinfry-10l",
    brand: "Cosori",
    name: "Dual Blaze Twinfry 10L",
    shortName: "Cosori Twinfry 10L",
    image: productImage(AIRFRYER.slug, "cosori-twinfry-10l"),
    tagline: "2 800 watt, och delaren går att lyfta ur när allt ska i samma korg.",
    scores: {
      /* Tio liter i en kammare, delbar med en löstagbar delare i två femliters
         zoner. Samma princip som Ninjas MegaZone. */
      "jamn-tillagning": 5,
      /* 2 800 W, alltså 1 400 W per zon delat — precis på RTINGS tröskel — och
         hela effekten på en kammare med delaren ur. */
      effekt: 4.5,
      /* 2 162 kr, dyrast av de rankade. */
      prisvarde: 3.5,
      /* 35 till 240 °C, det bredaste spannet här. */
      temperatur: 5,
      /* Svart utförande med PFAS-fri keramik, appstyrning, diskmaskinssäkert. */
      rengoring: 4.5,
    },
    price: 2162,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Airfryer/Cosori-Dual-Blaze-Twinfry-Chef-Edition/3473462",
    award: "premium",
    superlative: "Bäst för appstyrning",
    pros: [
      "2 800 watt, mest av allihop, och hela effekten går till en kammare med delaren ur",
      "35 till 240 grader, det bredaste temperaturspannet här",
      "Svart utförande har PFAS-fri keramik i stället för teflon",
      "Tio liter delbart i två femliters zoner",
      "Appstyrning med schemaläggning",
    ],
    cons: [
      "2 162 kronor, dyrast av de rankade",
      "52 centimeter djup, så den kräver en bänk utan överskåp rakt ovanför",
      "Den ljusa varianten har vanlig non-stick, alltså är färgvalet också ett materialval",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "2 162 kr", highlight: true },
      { label: "Kammare", shortLabel: "Kammare", value: "En låda med löstagbar delare", highlight: true },
      { label: "Total volym", shortLabel: "Volym", value: "10 l", highlight: true },
      { label: "Volym per kammare", shortLabel: "Per zon", value: "5 l", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "2 800 W", highlight: true },
      { label: "Effekt per kammare", shortLabel: "W/kammare", value: "2 800 W odelad, 1 400 W per zon", highlight: true },
      { label: "Maxtemperatur", shortLabel: "Max", value: "240 °C", highlight: true },
      { label: "Beläggning", shortLabel: "Yta", value: "PFAS-fri keramik (svart)", highlight: true },
      { label: "Temperaturomfång", value: "35–240 °C" },
      { label: "Antal program", value: "6" },
      { label: "Delar att diska", value: "Låda, delare, två galler" },
      { label: "Yttermått", value: "51,8 × 33,8 × 31,3 cm" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "0810123673285" },
    ],
    verdict:
      "Cosori Dual Blaze Twinfry 10L kostar 2 162 kronor och drar 2 800 watt, mer än någon annan här. Delaren är löstagbar, så tio liter kan köras som en kammare eller som två på fem.\n\n**2 800 watt på en enda yta är det närmaste en hushållsfritös kommer en riktig varmluftsugn.** Effekten avgör hur snabbt maskinen tar sig tillbaka till måltemperatur när du lägger i kall mat, och RTINGS har visat vad som händer när den inte gör det: samma maskin med effekten nedskruvad tog tio minuter längre och gav övervägande rå mat, eftersom kammaren låg under måltemperaturen större delen av tiden. Även delad i två zoner ligger den på 1 400 watt per låda, alltså precis på den tröskel RTINGS rekommenderar och 165 watt över vad Ninjas dubbelkorgar klarar.\n\nSpannet 35 till 240 grader är det bredaste här, vilket betyder att samma maskin både friterar och torkar svamp och äppelskivor. Och det svarta utförandet har keramik utan PFAS, medan den ljusa varianten har vanlig teflon, så färgvalet är alltså också ett materialval.\n\nDen är stor och den är dyrast. 52 centimeter djup kräver en bänk utan överskåp rakt ovanför, och 300 kronor mer än Ninja AF500EU köper mest watt och keramik. Vill du ha PFAS-fri yta och appstyrning är det den här som gäller. Är det bara krispig mat till familjen du är ute efter gör Ninjan samma jobb för mindre.",
  },
  {
    id: "cosori-turboblaze",
    brand: "Cosori",
    name: "TurboBlaze Chef Edition 6L",
    shortName: "Cosori TurboBlaze",
    image: productImage(AIRFRYER.slug, "cosori-turboblaze"),
    tagline: "1 725 watt på sex liter, alltså mest värme per portion här.",
    scores: {
      /* En enda kammare på sex liter, fem fläktlägen. Fläktvarvtalets bredd är
         RTINGS tredje faktor och den enda maskinen här som anger den. */
      "jamn-tillagning": 4.5,
      /* 1 725 W till en kammare, över RTINGS tröskel på 1 400. */
      effekt: 5,
      /* 1 716 kr för sex liter är dyrt per liter, billigt per portion. */
      prisvarde: 3.5,
      /* 30 till 230 °C. */
      temperatur: 4.5,
      /* Rostfritt hölje, en korg och ett galler. */
      rengoring: 4,
    },
    price: 1716,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Airfryer/Cosori-TurboBlaze-Chef-Edition-Air-Fryer/3397802",
    award: "editor",
    superlative: "Bäst för dig som lagar åt tre",
    pros: [
      "1 725 watt till en enda korg, alltså inget som delas med en andra låda",
      "Fem fläktlägen, och fläktens hastighet är den tredje faktor RTINGS pekar ut",
      "30 grader som lägsta steg, så den torkar frukt och svamp",
      "Två delar att diska, korg och galler",
      "Rostfritt hölje i stället för plast",
    ],
    cons: [
      "Sex liter räcker till tre personer, inte till fem",
      "230 grader, alltså tio under vad Ninja och Cosoris egen tioliters når",
      "1 716 kronor för sex liter är dyrt om du räknar kronor per liter",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 716 kr", highlight: true },
      { label: "Kammare", shortLabel: "Kammare", value: "En låda", highlight: true },
      { label: "Total volym", shortLabel: "Volym", value: "6 l", highlight: true },
      { label: "Volym per kammare", shortLabel: "Per zon", value: "6 l", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "1 725 W", highlight: true },
      { label: "Effekt per kammare", shortLabel: "W/kammare", value: "1 725 W", highlight: true },
      { label: "Maxtemperatur", shortLabel: "Max", value: "230 °C", highlight: true },
      { label: "Beläggning", shortLabel: "Yta", value: "Non-stick", highlight: true },
      { label: "Temperaturomfång", value: "30–230 °C" },
      { label: "Antal program", value: "6" },
      { label: "Delar att diska", value: "Korg och galler" },
      { label: "Yttermått", value: "40 × 30 × 30,1 cm" },
      { label: "Vikt", value: "6 kg" },
      { label: "Garanti", value: "2 år" },
    ],
    verdict:
      "Cosori TurboBlaze Chef Edition kostar 1 716 kronor och lägger 1 725 watt på en enda korg om sex liter. Det är mest värme per portion av allt som rankas här.\n\n**Ingen effekt delas med en andra låda, och det märks på maten.** En dubbelkorg på 2 470 watt ger 1 235 watt till varje låda så fort du kör båda, alltså under de 1 400 watt RTINGS anger som gräns för att maskinen ska hinna tillbaka till måltemperatur. Den här ligger 325 watt över gränsen på hela sin yta. Till det kommer fem fläktlägen. Luftflödet är den tredje faktorn RTINGS isolerade i sitt sabotageförsök, där en sänkning från 3 600 till 2 100 varv ångkokte maten i stället för att göra den krispig, och det är den enda maskinen här som anger hur många lägen fläkten har.\n\n30 grader som lägsta steg gör den till en torkapparat för svamp och äppelskivor, och två delar att diska efter middagen är hälften mot vad en dubbelkorg lämnar. Höljet är rostfritt.\n\nSex liter är gränsen. Det räcker till tre personer och till en hel kyckling, men fem som ska äta samtidigt får köra två omgångar. Är ni tre eller färre är det här maskinen som gör bäst mat av allihop. Är ni fler ska du ta Ninja AF500EU och betala 174 kronor mindre för nästan dubbla kammaren.",
  },
  {
    id: "bosch-maf671b1",
    brand: "Bosch",
    name: "Serie 6 MAF671B1",
    shortName: "Bosch Serie 6",
    image: productImage(AIRFRYER.slug, "bosch-maf671b1"),
    tagline: "1 800 watt rakt ner i en enda korg på 7,2 liter.",
    scores: {
      /* En låda på 7,2 liter med övervärme, alltså den konventionella
         konstruktion RTINGS teardowns visar fungerar bäst. */
      "jamn-tillagning": 4.5,
      /* 1 800 W till en kammare, högst av enkelkorgarna. */
      effekt: 5,
      /* 1 699 kr för 7,2 liter från ett märke med svensk service. */
      prisvarde: 4,
      /* 40 till 200 °C. Toppar under de 204 grader RTINGS friterar vid. */
      temperatur: 2.5,
      /* Kompakt korg och löstagbart galler, båda maskindiskbara. */
      rengoring: 4,
    },
    price: 1699,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Airfryer/Bosch-Serie-6-MAF671B1/3410509",
    superlative: "Bäst för dig som lagar varje dag",
    pros: [
      "1 800 watt till en enda korg, mest av enkelkorgarna här",
      "7,2 liter räcker till fem portioner enligt tillverkaren",
      "Övervärme med fläkt ovanför, den konstruktion som fördelar luften jämnast",
      "Behöver ingen förvärmning enligt Bosch",
      "Grillset ingår, alltså extra tillagningsyta på höjden",
    ],
    cons: [
      "200 grader som tak, mot 240 hos Ninja, Cosori och AIVIQ",
      "40 grader som lägsta steg räcker till torkning, men programmen saknar torkläge",
      "Ingen delare, så två rätter med olika temperatur kräver två omgångar",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 699 kr", highlight: true },
      { label: "Kammare", shortLabel: "Kammare", value: "En låda", highlight: true },
      { label: "Total volym", shortLabel: "Volym", value: "7,2 l", highlight: true },
      { label: "Volym per kammare", shortLabel: "Per zon", value: "7,2 l", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "1 800 W", highlight: true },
      { label: "Effekt per kammare", shortLabel: "W/kammare", value: "1 800 W", highlight: true },
      { label: "Maxtemperatur", shortLabel: "Max", value: "200 °C", highlight: true },
      { label: "Beläggning", shortLabel: "Yta", value: "Non-stick", highlight: true },
      { label: "Temperaturomfång", value: "40–200 °C" },
      { label: "Antal program", value: "7" },
      { label: "Delar att diska", value: "Korg och löstagbart galler" },
      { label: "Yttermått", value: "31,4 × 30,9 × 38,8 cm" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "4242005525997" },
    ],
    verdict:
      "Bosch Serie 6 MAF671B1 kostar 1 699 kronor och sätter 1 800 watt på en korg om 7,2 liter. Det är mest effekt per kammare av enkelkorgarna här.\n\n**Konstruktionen är den tråkiga och den fungerar.** Bosch anger själva elementtypen som övervärme, alltså värmeslinga och fläkt ovanför maten, precis den uppbyggnad RTINGS fann i varje välfungerande korgfritös när de plockade isär dem, och som de avvikande konstruktionerna med element i änden eller nedsänkt fläkt presterar sämre än. 7,2 liter i en enda kammare betyder att fem portioner kan ligga i ett lager i stället för i två högar, och Bosch anger att maskinen inte behöver förvärmas. Ett grillset följer med, vilket ger tillagningsyta på höjden.\n\nDen är också den enda här med ett servicenät som täcker hela landet, vilket för en apparat som ska stå framme i tio år betyder mer än en funktion till.\n\nTaket är 200 grader, och det är den verkliga invändningen. RTINGS kör hela sin provning vid 204, och Maillardreaktionen som ger stekyta arbetar långsammare ju längre under du ligger. Vill du ha 240 grader kostar det 191 kronor extra hos Ninja AF500EU. Lagar du mest pommes, kyckling och grönsaker på vardagar märker du aldrig skillnaden, och då är det här den enklaste maskinen att leva med.",
  },
  {
    id: "obh-easy-fry-mega",
    brand: "OBH Nordica",
    name: "Easy Fry Mega 7,5 l",
    shortName: "OBH Easy Fry Mega",
    image: productImage(AIRFRYER.slug, "obh-easy-fry-mega"),
    tagline: "7,5 liter som tillverkaren räknar som 2 kilo mat, inte som luft.",
    scores: {
      /* En enda låda med 7,5 liter angivet som användbar kapacitet. */
      "jamn-tillagning": 4.5,
      /* 1 700 till 2 020 W enligt manualen, allt till en kammare. */
      effekt: 5,
      /* 1 749 kr direkt hos tillverkaren. */
      prisvarde: 3.5,
      /* 80 till 200 °C. Både lägst tak och högst golv här. */
      temperatur: 2,
      /* En korg med uttagbart galler, non-stick, maskindiskbar. Reparerbar
         enligt tillverkarens egen märkning. */
      rengoring: 4.5,
    },
    price: 1749,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "OBH Nordica",
    merchantUrl:
      "https://www.obhnordica.se/koksredskap/matlagning/airfryer/easy-fry-mega-air-fryer-75-l-black",
    superlative: "Bäst för stora portioner",
    pros: [
      "7,5 liter angivet som användbar kapacitet, inte som kammarens volym",
      "2 kilo mat och åtta portioner enligt tillverkaren",
      "1 700 till 2 020 watt till en enda korg",
      "Korg med uttagbart galler, båda maskindiskbara",
      "Märkt som reparerbar av tillverkaren, med reservdelar",
    ],
    cons: [
      "80 grader som lägsta steg, så torkning av frukt och svamp är utesluten",
      "200 grader som tak, mot 240 hos Ninja och Cosori",
      "Åtta fasta program och ingen delare, alltså en rätt i taget",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 749 kr", highlight: true },
      { label: "Kammare", shortLabel: "Kammare", value: "En låda", highlight: true },
      { label: "Total volym", shortLabel: "Volym", value: "7,5 l", highlight: true },
      { label: "Volym per kammare", shortLabel: "Per zon", value: "7,5 l", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "1 700–2 020 W", highlight: true },
      { label: "Effekt per kammare", shortLabel: "W/kammare", value: "1 700–2 020 W", highlight: true },
      { label: "Maxtemperatur", shortLabel: "Max", value: "200 °C", highlight: true },
      { label: "Beläggning", shortLabel: "Yta", value: "Non-stick", highlight: true },
      { label: "Temperaturomfång", value: "80–200 °C" },
      { label: "Angiven matmängd", value: "2 kg" },
      { label: "Antal program", value: "8" },
      { label: "Delar att diska", value: "Korg och uttagbart galler" },
      { label: "Yttermått", value: "39 × 31,5 × 30,5 cm" },
      { label: "Vikt", value: "6 kg" },
      { label: "GTIN", value: "3045380027220" },
    ],
    verdict:
      "OBH Nordica Easy Fry Mega kostar 1 749 kronor och tar 7,5 liter i en enda låda. Tillverkaren anger det som användbar kapacitet och sätter dessutom ut vad det motsvarar i mat: 2 kilo, eller åtta portioner.\n\n**Det kilotalet är ovanligt användbart.** Litertalet på en airfryer är kammarens volym, och maten ska enligt tillverkarna själva ligga i ett lager på botten utan att staplas. Råd & Rön fann att den minsta modellen i deras test rymde 433 gram pommes men bara klarade 289 gram om de skulle bli bra. En maskin som anger 2 kilo talar alltså om samma sak som köparen faktiskt undrar över. Effekten på 1 700 till 2 020 watt går oavkortat till den enda kammaren, vilket är mer än varje låda får i någon dubbelkorg här.\n\nDen är också byggd för att hålla. OBH märker den som reparerbar och säljer reservdelar, vilket i den här prisklassen är sällsynt, och korgen med sitt uttagbara galler är två delar att diska.\n\nTemperaturen är begränsningen och den är dubbel: 200 grader som tak och 80 grader som golv. Det senare stänger dörren för torkning helt, och det förra ligger under de 204 grader RTINGS friterar vid. Ska du bara laga mat åt många på en gång är det här den rymligaste enkelkorgen. Vill du torka svamp eller nå 240 grader tar du Cosori TurboBlaze.",
  },
  {
    id: "aiviq-premio-dual-8l",
    brand: "AIVIQ",
    name: "Premio Dual Airfryer 8L",
    shortName: "AIVIQ Premio Dual",
    image: productImage(AIRFRYER.slug, "aiviq-premio-dual-8l"),
    tagline: "Korgen mäter 22 × 16 centimeter, så pommesen ligger i ett lager.",
    scores: {
      /* Två fasta lådor, men 355 cm² bottenyta per låda — över RTINGS tröskel
         på 325, och den enda maskinen i svensk handel där korgmåttet går att
         läsa hos tillverkaren. */
      "jamn-tillagning": 4,
      /* 2 460 W delat på två zoner blir 1 230 W per låda, under tröskeln. */
      effekt: 2.5,
      /* 1 393 kr är billigast av tvålådorna här. */
      prisvarde: 4.5,
      /* 40 till 240 °C, och 40 grader som golv gör torkning möjlig. */
      temperatur: 5,
      /* Två lådor med varsin tillagningsplatta, alltså fyra delar. */
      rengoring: 3.5,
    },
    price: 1393,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "AIVIQ",
    merchantUrl: "https://www.aiviq.se/products/premio-dual-airfryer-8l",
    superlative: "Bäst för dig som torkar frukt",
    pros: [
      "Korgen mäter 22,4 × 15,9 centimeter, alltså 355 kvadratcentimeter botten per låda",
      "1 393 kronor, billigast av tvålådorna här",
      "40 till 240 grader, och 40 som golv räcker till torkning i upp till 12 timmar",
      "Hölje i rostfritt stål",
      "Tillagningsplattorna tål maskindisk",
    ],
    cons: [
      "2 460 watt delat på två zoner blir 1 230 watt per låda när båda går",
      "Fyra liter per låda räcker till två portioner, inte till fyra",
      "Husmärke utan oberoende provning, till skillnad från Ninja och Philips",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 393 kr", highlight: true },
      { label: "Kammare", shortLabel: "Kammare", value: "Två fasta lådor", highlight: true },
      { label: "Total volym", shortLabel: "Volym", value: "8 l", highlight: true },
      { label: "Volym per kammare", shortLabel: "Per zon", value: "4 l", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "2 460 W", highlight: true },
      { label: "Effekt per kammare", shortLabel: "W/kammare", value: "1 230 W", highlight: true },
      { label: "Maxtemperatur", shortLabel: "Max", value: "240 °C", highlight: true },
      { label: "Beläggning", shortLabel: "Yta", value: "Non-stick", highlight: true },
      { label: "Temperaturomfång", value: "40–240 °C" },
      { label: "Korgens bottenyta", value: "355 cm² per låda" },
      { label: "Antal program", value: "6" },
      { label: "Delar att diska", value: "Två lådor, två tillagningsplattor" },
      { label: "Yttermått", value: "39,1 × 36,6 × 35,0 cm" },
      { label: "GTIN", value: "5745000461486" },
    ],
    verdict:
      "AIVIQ Premio Dual Airfryer 8L kostar 1 393 kronor och är den billigaste tvålådan här. Den är också den enda maskinen i svensk handel vars tillverkare skriver ut hur stor korgen är: 22,4 gånger 15,9 centimeter.\n\n**Det måttet är viktigare än litertalet, och nästan ingen publicerar det.** RTINGS mätning av 52 luftfritöser visar att bottenytan är det som starkast följer andelen perfekt krispiga pommes, eftersom maten måste ligga i ett lager för att luften ska komma åt varje bit. Deras gräns går vid 325 kvadratcentimeter. De 355 kvadratcentimeter varje låda här har ligger över den, och över de 280 kvadratcentimeter RTINGS mätte upp i en jämnstor dubbelkorg från Ninja. Till det kommer 240 grader och 40 grader som lägsta steg, vilket räcker till torkning i upp till tolv timmar.\n\nHöljet är rostfritt och tillagningsplattorna tål maskindisk.\n\nEffekten är svagheten och den är strukturell: 2 460 watt delat på två zoner blir 1 230 watt per låda så fort du kör båda, alltså under de 1 400 watt RTINGS anger som gräns. Fyra liter per låda räcker dessutom till två portioner. Lagar du åt två och vill kunna köra kyckling i ena lådan och grönsaker i den andra är det här mycket maskin för 1 393 kronor. Ska hela familjen äta samtidigt behöver du en kammare som går att slå ihop, alltså Ninja AF500EU.",
  },
  {
    id: "philips-na351",
    brand: "Philips",
    name: "Airfryer 3000 Series Dual Basket NA351/00",
    shortName: "Philips NA351/00",
    image: productImage(AIRFRYER.slug, "philips-na351"),
    tagline: "Nio liter delat på en stor och en liten låda, inte på två lika.",
    scores: {
      /* Två fasta lådor, men olika stora: den stora tar en kyckling på 1,5 kg,
         alltså en större sammanhängande botten än två lika lådor ger. */
      "jamn-tillagning": 4,
      /* 2 750 W delat på två zoner blir 1 375 W per låda. */
      effekt: 3,
      /* 1 417 kr för nio liter är lägsta kronor per liter här. */
      prisvarde: 5,
      /* 40 till 200 °C. */
      temperatur: 2.5,
      /* Två lådor med varsitt galler, samtliga löstagbara delar maskindiskbara,
         Coolwall-hölje. */
      rengoring: 4,
    },
    price: 1417,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Airfryer/Philips-3000-series-NA35100-fryer/3289305",
    superlative: "Bäst för stor och liten portion",
    pros: [
      "Nio liter för 1 417 kronor, lägsta kronor per liter av allihop",
      "En stor och en liten låda i stället för två lika, så huvudrätten får plats hel",
      "Den stora lådan tar en kyckling på 1,5 kilo enligt tillverkaren",
      "2 750 watt, mest av dubbelkorgarna här",
      "Coolwall-hölje och åtta förinställningar på pekskärm",
    ],
    cons: [
      "200 grader som tak, alltså under de 204 RTINGS friterar vid",
      "2 750 watt delat på två zoner blir 1 375 watt per låda när båda går",
      "7,85 kilo och 44 centimeter bred, alltså inget du ställer undan mellan middagarna",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 417 kr", highlight: true },
      { label: "Kammare", shortLabel: "Kammare", value: "Två fasta lådor, olika stora", highlight: true },
      { label: "Total volym", shortLabel: "Volym", value: "9 l", highlight: true },
      { label: "Volym per kammare", shortLabel: "Per zon", value: "En stor, en liten", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "2 750 W", highlight: true },
      { label: "Effekt per kammare", shortLabel: "W/kammare", value: "1 375 W", highlight: true },
      { label: "Maxtemperatur", shortLabel: "Max", value: "200 °C", highlight: true },
      { label: "Beläggning", shortLabel: "Yta", value: "Non-stick", highlight: true },
      { label: "Temperaturomfång", value: "40–200 °C" },
      { label: "Angiven matmängd", value: "1,5 kg" },
      { label: "Antal program", value: "8" },
      { label: "Delar att diska", value: "Två lådor, två galler" },
      { label: "Yttermått", value: "31,5 × 44,4 × 34,8 cm" },
      { label: "Vikt", value: "7,85 kg" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "8720389033001" },
    ],
    verdict:
      "Philips Airfryer 3000 Series Dual Basket NA351/00 kostar 1 417 kronor för nio liter. Det är lägsta pris per liter av allt som rankas här, och lådorna är olika stora.\n\n**Att de är olika stora är en riktig fördel och inte en kompromiss.** En vanlig dubbelkorg delar volymen i två lika halvor, vilket betyder att ingen av dem tar en hel huvudrätt. Här går den stora lådan att fylla med en kyckling på 1,5 kilo enligt Philips egen uppgift, medan den lilla tar tillbehöret. Det är precis så en middag ser ut, och det ger dessutom en större sammanhängande botten att lägga ut maten på än två fyra-och-en-halv-liters lådor gör. Effekten på 2 750 watt är den högsta bland dubbelkorgarna här.\n\nHöljet håller sig svalt att ta i, styrningen är en pekskärm med åtta förinställningar, och alla löstagbara delar tål maskindisk.\n\nTemperaturtaket stannar på 200 grader, och det gäller Philips hela sortiment. RTINGS kör sin provning vid 204, alltså strax över, och det syns tydligast på sådant som ska bli riktigt krispigt utanpå. Delat på två zoner ger 2 750 watt dessutom 1 375 watt per låda. Vill du ha mest kammare för pengarna och lagar mest kyckling, rotfrukter och gratänger finns inget billigare här. Är krispig yta hela poängen ska du lägga 299 kronor till på Cosori TurboBlaze och nöja dig med sex liter.",
  },
  {
    id: "philips-na221",
    brand: "Philips",
    name: "Airfryer 2000 Series NA221/00",
    shortName: "Philips NA221/00",
    image: productImage(AIRFRYER.slug, "philips-na221"),
    tagline: "859 kronor och 1 500 watt på 4,2 liter, som räcker till två.",
    scores: {
      /* En enda kammare, men bara 4,2 liter. En familjeportion måste staplas. */
      "jamn-tillagning": 3,
      /* 1 500 W till en kammare, över RTINGS tröskel på 1 400. */
      effekt: 4,
      /* 859 kr är billigast här och mindre än hälften av vinnaren. */
      prisvarde: 5,
      /* 60 till 200 °C. */
      temperatur: 2.5,
      /* En korg, ett galler, Coolwall-hölje, 3,51 kg. */
      rengoring: 4.5,
    },
    price: 859,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Airfryer/Philips-2000-Series-NA221-hot-air-fryer-black-silver/3306911",
    award: "budget",
    superlative: "Bäst för det lilla köket",
    pros: [
      "859 kronor, mindre än hälften av vad vinnaren kostar",
      "1 500 watt till en enda korg, alltså över gränsen på 1 400",
      "3,51 kilo och 27 centimeter bred, så den får plats i ett skåp",
      "Två delar att diska, båda maskindiskbara",
      "Nio program och Coolwall-hölje",
    ],
    cons: [
      "4,2 liter och 0,5 kilo mat, alltså två portioner och inte fyra",
      "200 grader som tak och 60 som golv, så torkning är utesluten",
      "Bottenytan tvingar dig att stapla så fort du lagar åt fler än två",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "859 kr", highlight: true },
      { label: "Kammare", shortLabel: "Kammare", value: "En låda", highlight: true },
      { label: "Total volym", shortLabel: "Volym", value: "4,2 l", highlight: true },
      { label: "Volym per kammare", shortLabel: "Per zon", value: "4,2 l", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "1 500 W", highlight: true },
      { label: "Effekt per kammare", shortLabel: "W/kammare", value: "1 500 W", highlight: true },
      { label: "Maxtemperatur", shortLabel: "Max", value: "200 °C", highlight: true },
      { label: "Beläggning", shortLabel: "Yta", value: "Non-stick", highlight: true },
      { label: "Temperaturomfång", value: "60–200 °C" },
      { label: "Angiven matmängd", value: "0,5 kg" },
      { label: "Antal program", value: "9" },
      { label: "Delar att diska", value: "Korg och galler" },
      { label: "Yttermått", value: "27,3 × 36,8 × 29,3 cm" },
      { label: "Vikt", value: "3,51 kg" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "8720389034770" },
    ],
    verdict:
      "Philips Airfryer 2000 Series NA221/00 kostar 859 kronor och tar 4,2 liter i en korg. Det är mindre än halva priset på vinnaren, och den väger 3,51 kilo.\n\n**1 500 watt på en enda kammare är mer än varje låda får i någon dubbelkorg här.** Den billigaste maskinen i jämförelsen lägger alltså mer värme på maten än en tvålåda för dubbla priset gör, så länge du bara lagar åt en eller två. Philips anger 0,5 kilo som kapacitet, vilket för en gångs skull är den siffra som betyder något, nämligen den mängd som får plats i ett lager på botten. 27 centimeter bred och under fyra kilo betyder också att den går att ställa in i ett skåp mellan middagarna, vilket ingen av de stora gör.\n\nTvå delar att diska, båda maskindiskbara, och ett hölje som håller sig svalt.\n\nDen är liten, och det är hela invändningen. Ska tre personer äta samtidigt tvingas du stapla, och då blir några bitar brända medan andra är råa, precis det RTINGS visade när de tejpade in en mindre korg i en fungerande maskin. Bor du ensam eller är två är det här maskinen att köpa, och 859 kronor för 1 500 watt är den bästa affären på hela sidan. Blir ni fler får du börja om från Bosch Serie 6.",
  },
  {
    id: "ninja-crispi",
    brand: "Ninja",
    name: "CRISPi FN101EUGY",
    shortName: "Ninja CRISPi",
    image: productImage(AIRFRYER.slug, "ninja-crispi"),
    tagline: "Glasskålar utan beläggning som går från kylen till bordet.",
    scores: {
      /* Största glasskålen tar 3,8 liter och RTINGS mätte 343 cm² på den
         amerikanska motsvarigheten. Botten räcker till två portioner. */
      "jamn-tillagning": 3,
      /* 1 700 W till en skål, ingenting delas. */
      effekt: 5,
      /* 1 467 kr för 3,8 liter är dyrt per liter. */
      prisvarde: 3,
      /* Ingen justerbar termostat. PowerPod känner av vilken skål som sitter på
         och sätter temperaturen själv, alltså fyra fasta lägen. */
      temperatur: 1.5,
      /* Glas utan beläggning, maskindiskbart, tål kyl och mikro. */
      rengoring: 5,
    },
    price: 1467,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Airfryer/Ninja-Crispi-FN101EUGY-Cyberspace-Blue/3423219",
    superlative: "Bäst för matlådor och rester",
    pros: [
      "Glasskålar helt utan beläggning, alltså inget PFAS och inget som nöts bort",
      "1 700 watt till en skål, lika mycket som enkelkorgarna får",
      "Skålarna går från kyl till maskin till bord och sedan i diskmaskinen",
      "1,4 och 3,8 liter, så du kan värma en portion utan att värma en tom kammare",
      "Standbyförbrukning på 0,2 watt enligt tillverkaren",
    ],
    cons: [
      "Ingen justerbar termostat, så du väljer läge och inte gradtal",
      "3,8 liter som störst räcker till två portioner",
      "1 467 kronor för 3,8 liter är dyrast per liter av allihop",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 467 kr", highlight: true },
      { label: "Kammare", shortLabel: "Kammare", value: "En skål i taget", highlight: true },
      { label: "Total volym", shortLabel: "Volym", value: "3,8 l", highlight: true },
      { label: "Volym per kammare", shortLabel: "Per zon", value: "1,4 eller 3,8 l", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "1 700 W", highlight: true },
      { label: "Effekt per kammare", shortLabel: "W/kammare", value: "1 700 W", highlight: true },
      { label: "Maxtemperatur", shortLabel: "Max", value: "Ej justerbar", highlight: true },
      { label: "Beläggning", shortLabel: "Yta", value: "Glas, ingen beläggning", highlight: true },
      { label: "Temperaturomfång", value: "Fyra fasta lägen" },
      { label: "Antal program", value: "4" },
      { label: "Delar att diska", value: "Skål, galler, adapter" },
      { label: "Angiven matmängd", value: "4,5 kg totalvikt" },
      { label: "GTIN", value: "0622356307741" },
    ],
    verdict:
      "Ninja CRISPi FN101EUGY kostar 1 467 kronor och lagar maten i glasskålar på 1,4 och 3,8 liter. Motorn sitter i ett lock som du sätter på den skål du vill använda.\n\n**Glaset är hela idén, och det är en riktig skillnad.** Varje annan maskin här har en belagd korg i non-stick eller keramik, och den slits, inte tål metallredskap och till slut måste bytas. Här finns ingen beläggning alls, och samma skål som du friterar i har du marinerat i i kylen, äter ur vid bordet och ställer i diskmaskinen efteråt. 1 700 watt går till den skål som sitter på, alltså lika mycket som enkelkorgarna får och 465 watt mer än varje låda i en Ninja-dubbelkorg.\n\nDen lilla skålen betyder också att du kan värma en portion utan att först värma upp en tom tioliterskammare, och standbyförbrukningen anges till 0,2 watt.\n\nDu kan inte välja temperatur. PowerPoden känner av vilken skål som sitter på och sätter gradtalet själv, så du väljer bland fyra lägen och inget mer. Det gör den oanvändbar för bakning och torkning, där gradtalet är hela hantverket. 3,8 liter är dessutom två portioner för 1 467 kronor, alltså dyrast per liter här. För den som lagar en portion i taget, tar med matlådor och är trött på att skrubba teflon är den ändå utan konkurrens. Ska du laga middag åt en familj hör den inte hemma på listan.",
  },
  {
    id: "ninja-af400eu",
    brand: "Ninja",
    name: "Foodi MAX Dual Zone AF400EU",
    shortName: "Ninja AF400EU",
    image: productImage(AIRFRYER.slug, "ninja-af400eu"),
    tagline: "9,5 liter och 240 grader, med två lådor som blir klara samtidigt.",
    scores: {
      /* Två fasta lådor på 4,75 liter, ingen delare som går att lyfta ur. */
      "jamn-tillagning": 3.5,
      /* 2 470 W enligt manualen, delat på två zoner blir 1 235 W per låda. */
      effekt: 2.5,
      /* 2 070 kr är näst dyrast här, och 180 kr mer än AF500EU som tar mer. */
      prisvarde: 2.5,
      /* 40 till 240 °C. */
      temperatur: 5,
      /* Två lådor med varsin krispningsplatta. */
      rengoring: 3,
    },
    price: 2070,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Airfryer/Ninja-Foodi-MAX-Dual-Zone-AF400EU-black/3100073",
    superlative: "Bäst för kyckling och pommes ihop",
    pros: [
      "40 till 240 grader, alltså över de 204 grader RTINGS friterar vid",
      "SYNC gör båda rätterna klara samtidigt även med olika tider",
      "9,5 liter fördelat på två oberoende zoner om 4,75 liter",
      "Sex funktioner, inklusive torkning och Max Crisp för fryst mat",
      "Alla löstagbara delar tål maskindisk",
    ],
    cons: [
      "2 470 watt delat på två zoner blir 1 235 watt per låda när båda går",
      "2 070 kronor, alltså 180 kronor mer än AF500EU som tar en liter till",
      "Lådorna går inte att slå ihop, så en stor stek måste delas i två",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "2 070 kr", highlight: true },
      { label: "Kammare", shortLabel: "Kammare", value: "Två fasta lådor", highlight: true },
      { label: "Total volym", shortLabel: "Volym", value: "9,5 l", highlight: true },
      { label: "Volym per kammare", shortLabel: "Per zon", value: "4,75 l", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "2 470 W", highlight: true },
      { label: "Effekt per kammare", shortLabel: "W/kammare", value: "1 235 W", highlight: true },
      { label: "Maxtemperatur", shortLabel: "Max", value: "240 °C", highlight: true },
      { label: "Beläggning", shortLabel: "Yta", value: "Non-stick", highlight: true },
      { label: "Temperaturomfång", value: "40–240 °C" },
      { label: "Antal program", value: "6" },
      { label: "Delar att diska", value: "Två lådor, två krispningsplattor" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "0622356245272" },
    ],
    verdict:
      "Ninja Foodi MAX Dual Zone AF400EU kostar 2 070 kronor och har två fasta lådor om 4,75 liter var. Den når 240 grader och gör båda rätterna klara samtidigt.\n\n**SYNC är funktionen folk köper den för, och den fungerar.** Lägg kyckling i ena lådan och pommes i den andra, sätt varsin tid och temperatur, och maskinen skjuter upp starten på den som går fortare så att allt blir färdigt på samma minut. 240 grader ligger dessutom över de 204 grader RTINGS kör sin provning vid, och Max Crisp-läget är gjort för fryst mat rakt ur påsen. Sex funktioner, torkning inräknad, och alla löstagbara delar tål maskindisk.\n\nRäkna på watten innan du bestämmer dig. Ninjas egen bruksanvisning anger 2 470 watt för hela maskinen, och det är samma tal som står i manualen till den mindre sjulitersmodellen. Effekten är alltså apparatens, inte lådans. Kör du båda zonerna får varje låda omkring 1 235 watt, under de 1 400 RTINGS anger som gräns för att maskinen ska hinna tillbaka till måltemperatur när kall mat läggs i. Råd & Rön såg samma sak i sitt test av 70 luftfritöser: kördes kyckling och pommes samtidigt i var sin korg blev det svårare att få pommesen bra.\n\nOch lådorna går inte att slå ihop. En hel stek eller en stor sats pommes måste delas i två högar, vilket är precis det tillverkarens egen manual varnar för. För 180 kronor mindre ger AF500EU dig samma teknik plus en delare du kan lyfta ur, och då blir 2 470 watt något du kan lägga på en enda yta. Ta den i stället.",
  },
];

/**
 * Övervägda men inte rankade. Ugnstyper, multikokare och grillhybrider faller
 * på avgränsningen efter användarbeslut 2026-08-06: sidan rankar korgfritöser.
 */
const CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Ninja",
    name: "SL400EU Double Stack XL 9,5 l",
    approxPrice: 2020,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Airfryer/Ninja-SL400EU/3271504",
    reason:
      "Den modell svenska jämförelsesidor rankar högst, och skälet att den inte rankas här är en mätning. RTINGS har plockat isär den amerikanska motsvarigheten SL201, som har samma konstruktion med värmeelement och fläkt stående i änden av de staplade lådorna, och beskriver den som oförmögen att cirkulera luften jämnt: betyg 6,6 med \"cooks unevenly\" och \"makes sub-par fried food\" som uttryckliga minus. Staplingen sparar bänkyta och det är en riktig fördel i ett litet kök, men den kostar just det jämförelsen mäter. Vi rankar inte in en konstruktion som det enda labb med öppen metod har underkänt, och SL400EU har inte provats under eget namn.",
  },
  {
    brand: "Typhur",
    name: "Dome 2",
    approxPrice: 3999,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Airfryer/Typhur-Dome-2/3474555",
    reason:
      "Faller på avgränsningen och inte på kvaliteten. 3 999 kronor för en ugnsformad maskin med pizzaugnsinspirerad luftcirkulation, appstyrning och en angiven ljudnivå på 55 dB, vilket är det enda decibeltalet någon tillverkare i kategorin publicerar. Den är intressant just därför, eftersom Råd & Rön mätte upp till 65 dB(A) på den luftfritös som lät mest, men kammarens form gör bottenytan och literangivelsen ojämförbara med korgfritösernas. Stod som förbeställning när priset lästes.",
  },
  {
    brand: "Xiaomi",
    name: "Smart Double Stack Air Fryer 12L",
    approxPrice: 1817,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Airfryer/Xiaomi-Smart-Double-Stack-Air-Fryer-12L/3441528",
    reason:
      "Tolv liter och 2 800 watt för 1 817 kronor ser ut som sidans bästa affär, men konstruktionen är staplad på höjden på samma sätt som Ninjas Double Stack, alltså den uppbyggnad RTINGS teardown pekar ut som orsaken till ojämn tillagning. Tolv liter fördelat på två lådor som var för sig tar en normalportion är dessutom tolv liter på pappret och två portioner i praktiken. Den som mest vill ha stor kapacitet på liten bänkyta bör ändå titta på den.",
  },
  {
    brand: "Ninja",
    name: "Speedi ON400EU 5,7 l",
    approxPrice: 1648,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Airfryer/Ninja-ON400EU/3233306",
    reason:
      "En multikokare som också friterar, med tio tillagningsmetoder inklusive ångkokning och långkok. 1 760 watt på 5,7 liter är starka tal, men en maskin som ska klara ånga och tryck är byggd med andra kompromisser än en ren korgfritös, och att ranka den mot dem hade varit att jämföra två produkter. Den som vill ha en apparat i stället för tre bör läsa vidare om den.",
  },
  {
    brand: "Tefal",
    name: "Dual Easy Fry 8,3 l",
    approxPrice: 2899,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Airfryer/Tefal-Dual-Easy-Fry-83L-Black/3461408",
    reason:
      "Samma koncern som OBH Nordica och i praktiken en dubbelkorgsversion av Easy Fry. 2 899 kronor gör den till den dyraste korgfritösen i hela svepet, och för 700 kronor mindre ger Cosori Twinfry både mer volym, högre effekt och en delare som går att lyfta ur. Vi kunde inte belägga effekten per zon hos Tefal, och rankar därför inte in den.",
  },
  {
    brand: "Philips",
    name: "7000 Series HD9880 Airfryer Combi XXL",
    approxPrice: 4699,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Airfryer/Philips-7000-Series-HD9880-Airfryer-Combi-XXL/3250562",
    reason:
      "Philips dyraste, som kombinerar varmluft med ånga och därmed är en ugn snarare än en korgfritös. Ångfunktionen är den enda vägen runt torrheten som annars är luftfriteringens baksida på fisk och bröd, och tek.no lyfter just ångan hos Electrolux motsvarighet. Den hör hemma i en jämförelse av bänkugnar som vi inte byggt.",
  },
];

/**
 * FAQ. Varje svar ska gå att läsa fristående, eftersom rutan kan visas ensam
 * i ett sökresultat.
 */
export const AIRFRYER_FAQ = [
  {
    question: "Är en airfryer med två lådor bättre än en med en?",
    answer:
      "Bara om du behöver två temperaturer samtidigt, och den kostar dig effekt. En dubbelkorg har ett effekttal för hela apparaten, inte per låda: Ninjas egna bruksanvisningar anger 2 470 watt för både sjulitersmodellen AF300EU och niolitersmodellen AF400EU, alltså totalt för två zoner. Kör du båda får varje låda omkring 1 235 watt. RTINGS, som provat 52 luftfritöser med öppen metod, har mätt vad det innebär i praktiken: en dubbelkorg drog 1 540 watt med båda lådorna igång och 1 470 watt med bara en, så den andra lådan lägger till sjuttio watt. Deras rekommendation är minst 1 400 watt för att maskinen ska hinna tillbaka till måltemperatur när kall mat läggs i. Råd & Rön ser samma sak från andra hållet i sitt test av 70 luftfritöser: kördes kyckling och pommes samtidigt i var sin korg blev det svårare att få pommesen bra. Det som löser problemet är en delare som går att lyfta ur, så att hela effekten kan läggas på en enda kammare när du vill det.",
  },
  {
    question: "Hur många liter behöver jag?",
    answer:
      "Färre än du tror, eftersom litertalet är kammarens volym och inte den mängd som blir bra. Maten ska ligga i ett enda lager på korgens botten, och det säger tillverkarna själva: Ninjas svenska bruksanvisning skriver att ingredienserna ska placeras i ett jämnt lager på botten av lådan och inte ligga på varandra. Råd & Rön mätte skillnaden i sitt test av 70 luftfritöser. Den minsta modellen rymde 433 gram pommes, men klarade bara 289 gram om de skulle bli så bra som möjligt. Som tumregel räcker 4 till 5 liter till en eller två personer, 6 till 7,5 liter till tre eller fyra, och över 9 liter behövs bara om ni är fem eller fler och alla ska äta samtidigt. Det tal som säger mest är bottenytan, och den anger nästan ingen: RTINGS rekommenderar minst 325 kvadratcentimeter. Av alla tillverkare i svensk handel är AIVIQ den enda som publicerar korgens mått.",
  },
  {
    question: "Hur mycket el drar en airfryer?",
    answer:
      "Ungefär 0,3 till 0,7 kilowattimmar per omgång, alltså under en krona vid ett normalt elpris. En maskin på 1 800 watt som går i tjugo minuter drar 0,6 kilowattimmar, och en på 2 470 watt i femton minuter drar ungefär lika mycket. Poängen är att den nästan alltid drar mindre än en vanlig ugn för samma mat, eftersom kammaren är en bråkdel så stor och därför blir varm på ett par minuter i stället för på en kvart. Stiftung Warentest har räknat om förbrukningen till årskostnad för alla tjugo modeller i sitt test och jämfört mot ugn. Effekttalet i sig säger däremot ingenting om hur mycket el maskinen gör av med totalt, bara hur snabbt den kan värma: en kraftfull maskin når måltemperaturen fortare och står därför på kortare tid, vilket ofta gör den billigare i drift än en svagare.",
  },
  {
    question: "Måste jag skaka korgen under tillagningen?",
    answer:
      "Ja, och det är sannolikt den enskilt största skillnaden mellan bra och dålig mat ur en airfryer. Norska tek.no drar den slutsatsen efter sin samletest: det lönar sig att skaka korgen under tillagningen oavsett vilken maskin du har, och i blindtest kunde de knappt avgöra vilka pommes som kommit ur vilken maskin när alla skakats. RTINGS har skakningen inbyggd i sin standardmetod och gör den vid 22,5 procents viktförlust. Skälet är enkelt: även i ett tunt lager ligger bitarna omlott, och den yta som vetter nedåt får varken luft eller färg. Ninjas egen bruksanvisning säger samma sak. Räkna med en skakning halvvägs för pommes och rotfrukter, och en till om du kört mer mat än korgen egentligen borde ha.",
  },
  {
    question: "Vad betyder 240 grader jämfört med 200?",
    answer:
      "Det avgör hur snabbt ytan bildas, och fältet delar sig rakt itu. Ninja, Cosori och AIVIQ går till 240 grader, medan Philips hela sortiment, Bosch och OBH Nordica stannar på 200. Maillardreaktionen, som ger stekyta, färg och den smak vi förknippar med friterat, arbetar från omkring 140 till 170 grader och går fortare ju varmare det är. RTINGS kör hela sin provning av luftfritöser vid 204 grader, alltså strax över vad hälften av maskinerna klarar. Praktiskt betyder de fyrtio graderna mest för det som ska bli riktigt krispigt utanpå och saftigt inuti, alltså pommes, kycklingvingar och halloumi, medan gratänger, rotfrukter och bakverk gärna lagas långsammare ändå. En maskin på 200 grader är alltså inte oanvändbar, men den behöver längre tid på samma resultat, och längre tid i varmluft torkar ut maten.",
  },
  {
    question: "Är teflonet i en airfryer farligt?",
    answer:
      "Inte vid normal användning, men det finns alternativ om du vill undvika det. De flesta korgar är belagda med PTFE, alltså teflon, som är stabilt vid de temperaturer en airfryer arbetar i och släpper ifrån sig ångor först en bra bit över 250 grader. Det som oroar många är i stället att PTFE tillhör gruppen PFAS och att beläggningen nöts, särskilt om du använder metallredskap eller skurar med det gröna på disksvampen. Tre vägar runt det finns i svensk handel: Ninja CRISPi lagar i glasskålar helt utan beläggning, Cosoris svarta utföranden anger PFAS-fri keramik, och Ninjas krispningsplattor är keramiska även där lådan är belagd. Vill du behålla en vanlig non-stick-korg så länge som möjligt är regeln att aldrig använda metall i den och att låta den svalna innan den möter vatten.",
  },
  {
    question: "Kan jag baka i en airfryer?",
    answer:
      "Ja, och två av de tre stora provningarna har testat just det. Råd & Rön bakar paj, chokladkaka och färdiga bake off-frallor i varje luftfritös de provar, och resultaten skiljer sig kraftigt: chokladkakorna blir bra i de flesta, medan pajen får bottenbetyg i den sämsta maskinen. Storleken sätter gränsen, och pajerna i deras test blev mellan 12 och 20 centimeter i diameter beroende på hur stor korgen var. Två saker avgör om en maskin duger till bakning. Kammarhöjden måste räcka till en form, vilket den sällan gör i en dubbelkorg där varje låda är grund. Och du måste kunna sätta temperaturen fritt, vilket utesluter maskiner utan justerbar termostat. Ska du baka regelbundet är en enkelkorg med hög kammare ett bättre köp än en dubbelkorg med samma literantal.",
  },
  {
    question: "Vilken airfryer är bäst i test?",
    answer:
      "I vår jämförelse Ninja Foodi FlexDrawer AF500EU på 1 890 kronor, och skälet är att den är den enda dubbelkorgen som går att göra till en enkelkorg. Delaren lyfts ur och 10,4 liter blir en kammare, vilket betyder att alla 2 470 watt läggs på en enda yta i stället för att delas mellan två lådor på 1 235 watt var. Behöver du två temperaturer sätter du tillbaka delaren. Cosori Dual Blaze Twinfry 10L bygger på samma princip med ännu mer effekt, 2 800 watt, och PFAS-fri keramik, men kostar 272 kronor mer. Ska du bara laga åt en eller två är Philips 2000 Series NA221/00 på 859 kronor bättre affär än allt annat här, eftersom dess 1 500 watt går oavkortat till en korg. Betygen bygger på publicerade specifikationer och på vad Råd & Rön, Stiftung Warentest och RTINGS kommit fram till om vad som orsakar jämn tillagning. Vi har inte friterat en enda pommes själva.",
  },
];

export const AIRFRYER_PRODUCTS = resolveProducts(AIRFRYER, SEEDS);

export const AIRFRYER_CONSIDERED: ConsideredProduct[] = CONSIDERED;
