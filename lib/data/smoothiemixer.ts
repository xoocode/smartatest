import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { SMOOTHIEMIXER } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Real products for /smoothiemixer.
 *
 * Tredje sidan i gruppen Kök, byggd 2026-08-06. Sidan rankar personliga mixrar
 * mellan 279 och 1 799 kronor, alltså de som blandar smoothien direkt i muggen
 * du dricker ur. Sju går på batteri, fyra på sladd. Bänkblenders med kanna på
 * 1,4 till 2 liter rankas inte, efter användarbeslut.
 *
 * Priser, artikelnummer, GTIN och lagerstatus är lästa i produktsidans egen
 * JSON-LD hos butiken på PRICE_CHECKED. Specifikationerna är lästa hos
 * **tillverkaren** och i bruksanvisningarna: Ninjas egen owner's guide, OBH
 * Nordicas och Smegs svenska bruksanvisningar, Wilfas och nutribullets egna
 * produktsidor och KitchenAids brittiska supportsida.
 *
 * AFFILIATE-SWAP — `merchantUrl` är butikens egen produktsida. Inget
 * `affiliateUrl` någonstans; vi har inget program i kategorin. Se lib/links.ts
 * för vad LINK_MODE står på i dag.
 *
 * ## Fyndet: en mixning är 30 sekunder
 *
 * Handeln anger batteriet i antal mixningar. Ingen produktsida säger vad en
 * mixning är. Bruksanvisningarna gör det, och då går talen att räkna om:
 *
 * - **KitchenAid Go**: 20 minuters mixtid, knapp som kör 1 minut och stänger av
 * - **Ninja Blast Max**: 25 mixningar à 30 sekunder = 12 min 30 s
 * - **Wilfa Swift**: 14 mixningar à 35 sekunder = 8 min 10 s
 * - **Ninja Blast**: 10 mixningar à 30 sekunder = 5 min
 *
 * Hyllsiffran spänner faktor 2,5. Mixtiden spänner faktor 4, och ordningen är
 * en annan: Ninja Blast Max anger flest mixningar av alla utom KitchenAid, men
 * KitchenAid ger 60 procent mer mixtid.
 *
 * ## Andra fyndet: nätdriven betyder inte obegränsad
 *
 * OBH Nordicas egen bruksanvisning: "Maximal användningstid: 1 minut, vänta
 * minst 5 minuter innan apparaten används igen." Smegs: 60 sekunder åt gången
 * med 60 sekunders paus. Två nätdrivna mixrar i samma prisklass, och den ena
 * låter dig göra nästa smoothie fem gånger snabbare. Ingen av uppgifterna står
 * på en produktsida i handeln.
 *
 * ⚠️ Vilotiderna bär **ingen vikt**. De står i manualerna hos en del av fältet
 * och inte hos resten, och ett avdrag hade betygsatt vilken tillverkare som
 * skrivit ned villkoret. Talen ligger i tabellen och i ett eget avsnitt.
 *
 * ## Tredje fyndet: fältet Effekt innehåller fyra olika storheter
 *
 * nutribullet skriver `Effekt: 2000mAh Battery` i sin egen specifikationstabell
 * för Portable. Ninja anger batterispänning, KitchenAid volt i produktnamnet,
 * Wilfa och CHiATO anger watt. Sex av elva anger watt över huvud taget.
 *
 * Det är skälet till att `mixkraft` betygsätter drivlinan och inte talet. Se
 * blockkommentaren vid SMOOTHIEMIXER i lib/test-pages.ts.
 *
 * ## Två volymer, och kartongens är den större
 *
 * Ninja Blast Max: 570 ml deklarerad, 490 ml max fyllning. Ninja BlendBoss: 710
 * ml, 650 ml max fyllnad. Raden `Kapacitet` bär max fyllnadsvolym för hela
 * fältet.
 *
 * ## Vad som saknas, och varför det inte sänker något betyg
 *
 * - **CHiATO blendPLAY Travel** saknar betyg på `rengoring`. Varken CHiATO
 *   eller Coffee Friend anger vilka delar som tål maskindisk.
 * - **nutribullet Flex** saknar betyg på `uthallighet`. nutribullet publicerar
 *   ingen uppgift om antal mixningar per laddning för den modellen.
 * - **Zwilling personal blender 0,55 L** ligger bland de övervägda av samma
 *   skäl: motoreffekten går inte att belägga hos tillverkaren.
 *
 * `weightedRating` fördelar om vikten i de två första fallen. Att sätta noll
 * hade dragit ner ett betyg för något produkten inte rår över.
 */

export const PRICE_CHECKED = "2026-08-06";

const SEEDS: ProductSeed[] = [
  {
    id: "ninja-qb3001",
    brand: "Ninja",
    name: "QB3001",
    shortName: "Ninja QB3001",
    image: productImage(SMOOTHIEMIXER.slug, "ninja-qb3001"),
    tagline: "700 watt, och två muggar så nästa frukost slipper diskningen.",
    scores: {
      /* 700 W ur vägguttaget enligt Ninjas egen bruksanvisning, alltså näst
         mest i fältet efter BlendBoss 1 100 W. Nätdriven. */
      mixkraft: 4,
      /* 925 kr för 700 W och två muggar. Smeg kostar 1 121 för 300 W. */
      prisvarde: 4.5,
      /* Två muggar à 470 ml, alltså 940 ml totalt. */
      kapacitet: 4.5,
      /* Nätdriven. */
      uthallighet: 5,
      /* Muggarna blir to-go med lock, men basen på 33 cm står kvar hemma. */
      barbarhet: 3,
      /* Muggar, lock och knivenhet tål maskindisk enligt bruksanvisningen. */
      rengoring: 5,
    },
    price: 925,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/ninja/ninja-blender-qb3001/?variantId=606978-01",
    award: "winner",
    superlative: "Bäst för två frukostar i rad",
    pros: [
      "700 watt, näst mest kraft i jämförelsen och tillräckligt för frysta bär",
      "Två muggar på 470 ml, så två personer får smoothie utan diskning emellan",
      "Muggar, lock och knivenhet går alla i diskmaskinen",
      "925 kronor, alltså under hälften av vad den kraftfullaste kostar",
      "Nätdriven, så den tar aldrig slut mitt i en smoothie",
    ],
    cons: [
      "Basen är 33 centimeter hög och behöver ett vägguttag, så det är muggen och inte mixern som följer med till jobbet",
      "En hastighet och ingen pulsknapp, så konsistensen styr du med hur länge du trycker",
      "Ingen inbyggd bärögla på locken, till skillnad från Ninja Blast Max piplock",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "925 kr", highlight: true },
      { label: "Drivsätt", shortLabel: "Drift", value: "Nätdriven", highlight: true },
      { label: "Motoreffekt", shortLabel: "Effekt", value: "700 W", highlight: true },
      { label: "Kapacitet", shortLabel: "Volym", value: "2 × 470 ml", highlight: true },
      { label: "Mixningar per laddning", shortLabel: "Mixningar", value: "Nätdriven", highlight: true },
      { label: "Antal muggar", shortLabel: "Muggar", value: "2", highlight: true },
      { label: "Maskindiskbara delar", shortLabel: "Maskindisk", value: "Muggar, lock och knivenhet", highlight: true },
      { label: "Yttermått", value: "Höjd 33 cm" },
      { label: "Sladdlängd", value: "0,8 m" },
      { label: "Material mugg", value: "BPA-fri plast" },
      { label: "Artikelnummer", value: "606978-01" },
      { label: "GTIN", value: "0622356239769" },
    ],
    verdict:
      "Ninja QB3001 kostar 925 kronor och ger 700 watt ur vägguttaget plus två muggar på 470 milliliter. Det är den enda mixern här som är kraftfull, rymlig och billig på samma gång.\n\n**700 watt är skillnaden mellan en slät smoothie och klumpar i botten.** Frysta jordgubbar är kategorins svåraste ingrediens, och de flesta sladdlösa mixrar lämnar bitar kvar efter tre körningar. Med den här räcker en. Bara Ninja BlendBoss har mer kraft, och den kostar 674 kronor mer.\n\n**Två muggar betyder att morgonen fungerar.** Du blandar din smoothie, skruvar på locket, och kan göra nästa åt någon annan direkt i den andra muggen utan att diska emellan. Åtta av de elva mixrarna här har bara en mugg, och den som gör två frukostar med en mugg diskar mitt i frukosten.\n\n**Och allt utom motordelen får gå i diskmaskinen**, knivenheten inkluderad. Det är den bredaste maskindisken i jämförelsen och avgör mer än det låter: OBH Nordica anger att samtliga lösa delar diskas för hand, även flaskorna, och en mixer man måste handdiska varje morgon används på söndagar.\n\nBegränsningen är att den står där du ställer den. Basen är 33 centimeter hög och behöver ett uttag, så det är muggen som följer med till gymmet och inte maskinen. Vill du kunna mixa på tåget eller i sommarstugan tar du Ninja Blast Max för 1 189 kronor. Alla andra köper den här.",
  },
  {
    id: "ninja-blendboss",
    brand: "Ninja",
    name: "BlendBoss",
    shortName: "Ninja BlendBoss",
    image: productImage(SMOOTHIEMIXER.slug, "ninja-blendboss"),
    tagline: "1 100 watt tar hela isbitar, inte bara krossad is.",
    scores: {
      /* 1 100 W, mest i fältet. CrushBlades och tre Auto-iQ-program. */
      mixkraft: 5,
      /* 1 599 kr, dyrast av de nätdrivna. Kraften motiverar en del av det. */
      prisvarde: 2.5,
      /* 710 ml deklarerad, 650 ml max fyllnad. En bägare. */
      kapacitet: 4,
      /* Nätdriven. */
      uthallighet: 5,
      /* 2,55 kg och 33 cm bas. Bägaren har handtag och läckagesäkert lock. */
      barbarhet: 2,
      /* Lock, sugrör och kniv i maskin, motordelen torkas av. */
      rengoring: 4.5,
    },
    price: 1599,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/hem-fritid/kok-matsal/mixers-blenders/ninja-blendboss-personlig-mixer-med-resebagare-cyberspace-p47512",
    award: "premium",
    superlative: "Bäst för frysta bär varje morgon",
    pros: [
      "1 100 watt, mest kraft i jämförelsen och nog för hela isbitar",
      "650 milliliter i en enda bägare, alltså den största portionen här",
      "Tre program som växlar hastighet åt dig: Smoothie, Blend och Crush",
      "Bärhandtag och läckagesäkert lock på bägaren",
      "Lock, sugrör och kniv går i diskmaskinen",
    ],
    cons: [
      "2,55 kilo och 33 centimeter hög, alltså den tyngsta här och en maskin som får en fast plats på bänken",
      "1 599 kronor, 674 mer än Ninja QB3001 som har 700 watt och två muggar",
      "Bara en bägare, så nästa smoothie kräver diskning",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 599 kr", highlight: true },
      { label: "Drivsätt", shortLabel: "Drift", value: "Nätdriven", highlight: true },
      { label: "Motoreffekt", shortLabel: "Effekt", value: "1 100 W", highlight: true },
      { label: "Kapacitet", shortLabel: "Volym", value: "650 ml", highlight: true },
      { label: "Mixningar per laddning", shortLabel: "Mixningar", value: "Nätdriven", highlight: true },
      { label: "Antal muggar", shortLabel: "Muggar", value: "1", highlight: true },
      { label: "Maskindiskbara delar", shortLabel: "Maskindisk", value: "Lock, sugrör och kniv", highlight: true },
      { label: "Deklarerad volym", value: "710 ml" },
      { label: "Antal program", value: "3 plus puls" },
      { label: "Vikt", value: "2,55 kg" },
      { label: "Yttermått", value: "17 × 18 × 33 cm" },
      { label: "Sladdlängd", value: "0,9 m" },
      { label: "Garanti", value: "2 år" },
      { label: "Artikelnummer", value: "47512" },
    ],
    verdict:
      "Ninja BlendBoss kostar 1 599 kronor och har 1 100 watt, alltså mer kraft än någon annan mixer i den här jämförelsen. Bägaren rymmer 650 milliliter och är den största portionen här.\n\n**Hela isbitar är gränsen som skiljer 1 100 watt från 300.** En mixer på 300 watt gör en slät smoothie av mjuk frukt och lämnar isbitar som bitar. Med CrushBlades och det här varvtalet blir de snö, vilket också är vad som krävs för att frysta jordgubbar ska försvinna helt i stället för att sitta kvar i botten som röda korn.\n\n**650 milliliter i en bägare är en riktig frukost.** Wilfa Swift rymmer 300, och skillnaden är att den ena räcker till ett glas medan den andra räcker till en måltid. Till det kommer tre program som växlar hastighet åt dig, så du slipper stå och pulsa för att få ner bären mot knivarna.\n\nPriset är också vad du betalar för att den ska stå framme. 2,55 kilo och 33 centimeter gör den till en maskin med fast plats på bänken, och 1 599 kronor är 674 mer än Ninja QB3001 som ger 700 watt och två muggar.\n\nKöp den om du gör en smoothie med frysta bär varje morgon och vill att den ska bli slät första gången. Blandar du mest banan och yoghurt räcker Ninja QB3001, och du får två muggar på köpet.",
  },
  {
    id: "nutribullet-portable",
    brand: "nutribullet",
    name: "Portable NBP003",
    shortName: "nutribullet Portable",
    image: productImage(SMOOTHIEMIXER.slug, "nutribullet-portable"),
    tagline: "730 gram, alltså knappt mer än en full vattenflaska.",
    scores: {
      /* Batteri 2 000 mAh, en hastighet, korsblad i rostfritt stål.
         Tillverkaren anger att den klarar is i liten mängd. */
      mixkraft: 2.5,
      /* 389 kr, billigast av märkesmixrarna och 210 under Ninja Blast. */
      prisvarde: 5,
      /* 475 ml, en mugg. */
      kapacitet: 3,
      /* Över 15 mixningar per laddning, alltså fler än Wilfas 14 och färre
         än KitchenAids 20 enminutersvarv. */
      uthallighet: 3.5,
      /* 0,73 kg och 267 mm, lättast i hela jämförelsen. */
      barbarhet: 5,
      /* Kopp, lock och knivdel tål maskindisk. */
      rengoring: 5,
    },
    price: 389,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Blender-Mixer/NutriBullet-Portable/3414860",
    award: "budget",
    superlative: "Bäst för dig som reser",
    pros: [
      "730 gram, alltså den lättaste här och knappt tyngre än en vattenflaska",
      "389 kronor, billigast av alla sladdlösa från ett känt märke",
      "Kopp, lock och knivdel går alla i diskmaskinen",
      "Över 15 mixningar på en laddning, näst flest av de sladdlösa",
      "Koppen är i tritan och 475 milliliter, alltså en normal portion",
    ],
    cons: [
      "En enda hastighet och ingen pulsfunktion, så hårda ingredienser kräver att du skakar flaskan och kör igen",
      "Tillverkaren anger is i liten mängd, alltså inte hela isbitar",
      "Laddkabeln är 50 centimeter, vilket är kort om uttaget sitter bakom bänken",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "389 kr", highlight: true },
      { label: "Drivsätt", shortLabel: "Drift", value: "Batteri, 2 000 mAh", highlight: true },
      { label: "Motoreffekt", shortLabel: "Effekt", value: "–", highlight: true },
      { label: "Kapacitet", shortLabel: "Volym", value: "475 ml", highlight: true },
      { label: "Mixningar per laddning", shortLabel: "Mixningar", value: "Över 15", highlight: true },
      { label: "Antal muggar", shortLabel: "Muggar", value: "1", highlight: true },
      { label: "Maskindiskbara delar", shortLabel: "Maskindisk", value: "Kopp, lock och knivdel", highlight: true },
      { label: "Material mugg", value: "Tritan" },
      { label: "Vikt", value: "0,73 kg" },
      { label: "Yttermått", value: "26,7 × 9,5 × 9,5 cm" },
      { label: "Sladdlängd", value: "0,5 m USB-C" },
      { label: "Artikelnummer", value: "3414860" },
      { label: "GTIN", value: "8006447002098" },
    ],
    verdict:
      "nutribullet Portable kostar 389 kronor, väger 730 gram och blandar 475 milliliter i en tritanflaska du dricker direkt ur. Den är den lättaste mixern i jämförelsen och den billigaste från ett märke som är byggt för just det här.\n\n**730 gram är skillnaden mellan att ta med den och att låta bli.** En mixer som väger över ett kilo stannar hemma efter tredje resan. Den här väger knappt mer än en full vattenflaska och är 27 centimeter hög, alltså samma format som det du redan packar. Laddningen går över USB-C, så samma kabel som telefonen.\n\n**Över 15 mixningar på en laddning räcker en normal vecka**, vilket är fler än vad Wilfa Swift ger och betydligt fler än Ninja Blasts tio. Till det kommer att kopp, lock och knivdel alla får gå i diskmaskinen, så morgonens flaska hamnar i maskinen på vägen ut i stället för i vasken.\n\nDen har en enda hastighet och ingen pulsknapp, och det märks på hårda ingredienser. Hela isbitar är utanför vad tillverkaren anger att den klarar, och frysta jordgubbar kräver ofta att du vänder flaskan och kör en gång till.\n\nHar du en frukost som ska följa med på tåget eller till hotellrummet är det här den självklara. Gör du smoothien hemma på en bänk med ett uttag är Ninja QB3001 dubbelt så stark för 536 kronor mer.",
  },
  {
    id: "ninja-blast-max",
    brand: "Ninja",
    name: "Blast Max BC251",
    shortName: "Ninja Blast Max",
    image: productImage(SMOOTHIEMIXER.slug, "ninja-blast-max"),
    tagline: "12 minuter och 30 sekunders mixtid på en laddning.",
    scores: {
      /* 11,1 V, högsta batterispänningen i fältet. PowerBlast och tre
         program. Tillverkaren anger is och frysta ingredienser. */
      mixkraft: 3.5,
      /* 1 189 kr, alltså i den dyrare halvan av de sladdlösa. */
      prisvarde: 3.5,
      /* 570 ml deklarerad, 490 ml max fyllning. En bägare. */
      kapacitet: 3.5,
      /* 25 mixningar à 30 sekunder = 12 min 30 s. Laddning cirka 4 h. */
      uthallighet: 4,
      /* 1,2 kg, Twist & Go-bägare med piplock. */
      barbarhet: 4.5,
      /* Bägare och piplock i maskin. Knivarna sitter i motorenheten. */
      rengoring: 4,
    },
    price: 1189,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/ninja/ninja-portabel-blender-blast-max/?variantId=654702-01",
    award: "editor",
    superlative: "Bäst sladdlös för hela veckan",
    pros: [
      "12 minuter och 30 sekunders mixtid per laddning, näst mest av de sladdlösa",
      "Tre program: Crush för is, Smoothie för frukt och ett manuellt läge du styr själv",
      "11,1 volt, alltså den högsta batterispänningen bland de bärbara",
      "Twist & Go-bägare med läckagesäkert piplock som du dricker direkt ur",
      "Bägare och piplock går i diskmaskinen",
    ],
    cons: [
      "Fyra timmars laddning, så en tom mixer på morgonen blir en smoothie på kvällen",
      "Max fyllnadsvolym är 490 milliliter, alltså 80 mindre än de 570 som står i marknadsföringen",
      "1,2 kilo, vilket är 470 gram mer än nutribullet Portable",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 189 kr", highlight: true },
      { label: "Drivsätt", shortLabel: "Drift", value: "Batteri, 11,1 V", highlight: true },
      { label: "Motoreffekt", shortLabel: "Effekt", value: "–", highlight: true },
      { label: "Kapacitet", shortLabel: "Volym", value: "490 ml", highlight: true },
      { label: "Mixningar per laddning", shortLabel: "Mixningar", value: "25", highlight: true },
      { label: "Antal muggar", shortLabel: "Muggar", value: "1", highlight: true },
      { label: "Maskindiskbara delar", shortLabel: "Maskindisk", value: "Bägare och piplock", highlight: true },
      { label: "Mixtid per laddning", value: "12 min 30 s" },
      { label: "Programcykel", value: "30 sek" },
      { label: "Deklarerad volym", value: "570 ml" },
      { label: "Batterispänning", value: "11,1 V litiumjon" },
      { label: "Laddningstid", value: "Cirka 4 h" },
      { label: "Antal program", value: "3" },
      { label: "Vikt", value: "1,2 kg" },
      { label: "Yttermått", value: "30 × 9 × 11,5 cm" },
      { label: "Artikelnummer", value: "654702-01" },
      { label: "GTIN", value: "622356318235" },
    ],
    verdict:
      "Ninja Blast Max kostar 1 189 kronor och är den sladdlösa mixern med mest kraft bakom kniven: 11,1 volt mot 7,4 hos både Ninja Blast och nutribullet Flex. Bägaren rymmer 490 milliliter fyllda.\n\n**25 mixningar låter som mycket och är 12 minuter och 30 sekunder.** En mixning är en programcykel, och Ninjas cykel är 30 sekunder lång. Det är ändå näst mest mixtid av alla batteridrivna här, och räcker till en smoothie om dagen i drygt två veckor om du klarar dig på ett varv.\n\n**Tre program är den funktion som gör skillnad på frysta bär.** Crush kör hårt och stötvis för is, Smoothie bygger upp hastigheten så att bären dras ner mot knivarna i stället för att lyfta, och det manuella läget låter dig köra upp till 30 sekunder själv. De sladdlösa mixrarna med ett enda läge kräver i stället att du vänder flaskan och kör igen.\n\n**Twist & Go betyder att bägaren är muggen.** Du vrider loss den från motorenheten, sätter på piplocket och går, och locket tål att ligga ner i en väska. Både bägaren och locket får gå i diskmaskinen.\n\nLaddningen är det som stör. Fyra timmar från tom till full är längst av alla här, och maskinen går inte att köra medan den laddar. Vill du ha ett batteri som räcker längre finns KitchenAid Go med 20 minuters mixtid, men den kostar 610 kronor mer och klarar inte is.",
  },
  {
    id: "chiato-blendplay-travel",
    brand: "CHiATO",
    name: "blendPLAY Travel",
    shortName: "CHiATO blendPLAY",
    image: productImage(SMOOTHIEMIXER.slug, "chiato-blendplay-travel"),
    tagline: "600 milliliter sladdlöst, störst flaska av de batteridrivna.",
    scores: {
      /* 150 W och 18 000 varv. Butiken anger att den inte är lämplig för is
         eller nötter, vilket är en egenskap och inte en lucka. */
      mixkraft: 2,
      /* 279 kr, billigast i hela jämförelsen. */
      prisvarde: 5,
      /* 600 ml, störst av de sladdlösa. */
      kapacitet: 4,
      /* Över 20 cykler per laddning. Laddning 3 till 5 timmar. */
      uthallighet: 3.5,
      /* 0,78 kg, 31 cm, bottenlock som gör den till en tumbler. */
      barbarhet: 5,
      /* Ingen uppgift om maskindisk. Se blockkommentaren ovan. */
    },
    price: 279,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Coffee Friend",
    merchantUrl:
      "https://www.coffeefriend.se/p/blender-portable-chiato-blendplay-travel-600-ml-150-w-blanc/",
    superlative: "Billigast att prova sladdlöst",
    pros: [
      "279 kronor, alltså under en tredjedel av vad de flesta sladdlösa kostar",
      "600 milliliter, störst flaska av alla batteridrivna här",
      "Över 20 cykler per laddning, flest av de sladdlösa",
      "780 gram och ett bottenlock som gör flaskan till en tumbler att dricka ur",
      "18 000 varv i minuten, samma varvtal som Wilfa Swift",
    ],
    cons: [
      "150 watt räcker inte till isbitar eller nötter, vilket säljaren skriver ut",
      "Tre till fem timmars laddning, längst i jämförelsen",
      "Ett enda mixläge plus puls, så konsistensen styr du genom att köra om",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "279 kr", highlight: true },
      { label: "Drivsätt", shortLabel: "Drift", value: "Batteri", highlight: true },
      { label: "Motoreffekt", shortLabel: "Effekt", value: "150 W", highlight: true },
      { label: "Kapacitet", shortLabel: "Volym", value: "600 ml", highlight: true },
      { label: "Mixningar per laddning", shortLabel: "Mixningar", value: "Över 20", highlight: true },
      { label: "Antal muggar", shortLabel: "Muggar", value: "1", highlight: true },
      { label: "Maskindiskbara delar", shortLabel: "Maskindisk", value: "–", highlight: true },
      { label: "Varvtal", value: "18 000 rpm" },
      { label: "Laddningstid", value: "3 till 5 h" },
      { label: "Material mugg", value: "Rostfritt stål och plast" },
      { label: "Vikt", value: "0,78 kg" },
      { label: "Yttermått", value: "9,5 × 9,5 × 31 cm" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "4771121001035" },
    ],
    verdict:
      "CHiATO blendPLAY Travel kostar 279 kronor och är den billigaste mixern i hela jämförelsen. Flaskan rymmer 600 milliliter, vilket är mer än någon annan batteridriven här.\n\n**600 milliliter sladdlöst för under 300 kronor finns inte någon annanstans.** nutribullet Portable kostar 110 kronor mer och rymmer 125 milliliter mindre; Wilfa Swift kostar 320 mer och rymmer hälften. Ett bottenlock skruvas av så att flaskan blir en tumbler du dricker ur, och med 780 gram följer den med lika lätt som en termos.\n\n**Över 20 cykler på en laddning är flest av de sladdlösa**, och det är en verklig fördel för den som gör en smoothie om dagen och laddar en gång i veckan. 18 000 varv i minuten är samma varvtal som Wilfa Swift anger, alltså inte en billig motor som snurrar långsamt.\n\nBegränsningen är tydlig och säljaren skriver ut den själv: 150 watt räcker inte till isbitar eller nötter. Vill du ha krossad is i drinken eller mala mandlar till nötsmör är det här fel maskin, och laddningen tar dessutom tre till fem timmar.\n\nMixar du banan, yoghurt, spenat och mjuk frukt gör den precis det du vill ha för en tredjedel av priset. Ska frysta bär bli släta lägger du 110 kronor till på nutribullet Portable.",
  },
  {
    id: "smeg-personal-blender",
    brand: "Smeg",
    name: "50's Style personal blender",
    shortName: "Smeg 50's Style",
    image: productImage(SMOOTHIEMIXER.slug, "smeg-personal-blender"),
    tagline: "Två muggar på 600 milliliter med skruvlock och handtag.",
    scores: {
      /* 300 W nätdriven, två hastigheter via vred. */
      mixkraft: 3,
      /* 1 121 kr för 300 W. Ninja QB3001 ger 700 W för 925. */
      prisvarde: 3,
      /* Två muggar à 600 ml, alltså 1,2 liter totalt och mest i fältet. */
      kapacitet: 4.5,
      /* Nätdriven. */
      uthallighet: 5,
      /* Muggarna har skruvlock med packning och ögla. Basen står kvar. */
      barbarhet: 3,
      /* Muggarna i maskin, knivenheten för hand enligt bruksanvisningen. */
      rengoring: 3.5,
    },
    price: 1121,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/smeg/personal-blender-2pack/?variantId=610511-01",
    superlative: "Bäst för köket den ska stå i",
    pros: [
      "Två muggar på 600 milliliter, alltså den största totala volymen i jämförelsen",
      "Skruvlock med silikonpackning som håller tätt liggande i en väska",
      "Två hastigheter via vred, vilket bara tre av de elva har",
      "Nätdriven, så den tar aldrig slut mitt i",
      "4,6 av 5 i kundbetyg hos butiken, högst i jämförelsen",
    ],
    cons: [
      "300 watt lämnar bitar kvar av frysta jordgubbar, vilket bara pulsning kompenserar för",
      "Bruksanvisningen anger 60 sekunder åt gången och 60 sekunders paus",
      "1 121 kronor för 300 watt, mot 925 kronor för Ninja QB3001 med 700",
      "Knivenheten ska diskas för hand",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 121 kr", highlight: true },
      { label: "Drivsätt", shortLabel: "Drift", value: "Nätdriven", highlight: true },
      { label: "Motoreffekt", shortLabel: "Effekt", value: "300 W", highlight: true },
      { label: "Kapacitet", shortLabel: "Volym", value: "2 × 600 ml", highlight: true },
      { label: "Mixningar per laddning", shortLabel: "Mixningar", value: "Nätdriven", highlight: true },
      { label: "Antal muggar", shortLabel: "Muggar", value: "2", highlight: true },
      { label: "Maskindiskbara delar", shortLabel: "Maskindisk", value: "Muggarna", highlight: true },
      { label: "Max körtid per gång", value: "60 sek, sedan 60 sek paus" },
      { label: "Hastigheter", value: "2" },
      { label: "Yttermått", value: "14,2 × 13,6 × 33,5 cm" },
      { label: "Material mugg", value: "Tritan" },
      { label: "Artikelnummer", value: "610511-01" },
      { label: "GTIN", value: "8017709313005" },
    ],
    verdict:
      "Smeg 50's Style personal blender kostar 1 121 kronor och kommer med två muggar på 600 milliliter, alltså 1,2 liter sammanlagt och mest volym av allt här. Motorn ger 300 watt och styrs med ett vred i två steg.\n\n**Locken är det bästa på maskinen.** Skruvlock med silikonpackning håller tätt även liggande i en ryggsäck, till skillnad från snäpplock som spiller så fort flaskan lutar. Muggarna har dessutom en ögla att hålla i och en dricköppning som är avpassad för munnen i stället för att vara ett stort hål.\n\n**Två hastigheter är ovanligt i den här klassen** och betyder att du kan starta lugnt och sedan ge full gas, vilket är precis den ordning som får frysta bär att dras ner mot knivarna. Vredet sitter framtill och maskinen är byggd för att stå framme, i samma retroformspråk som resten av Smegs 50's Style.\n\n300 watt är gränsen. Frysta jordgubbar lämnar bitar kvar om du kör ett långt varv, och bruksanvisningen anger att maskinen ska köras högst 60 sekunder i taget med 60 sekunders paus emellan. Det är gott om tid för en smoothie, men inte för tre i rad.\n\nVill du ha en mixer som får synas på bänken och två stora muggar är det här valet. Är det kraften du är ute efter ger Ninja QB3001 mer än dubbelt så många watt för 196 kronor mindre.",
  },
  {
    id: "nutribullet-flex",
    brand: "nutribullet",
    name: "Flex NBP013",
    shortName: "nutribullet Flex",
    image: productImage(SMOOTHIEMIXER.slug, "nutribullet-flex"),
    tagline: "590 milliliter i en flaska som väger 861 gram.",
    scores: {
      /* Batteri 7,4 V, en hastighet, blad i rostfritt stål. */
      mixkraft: 2.5,
      /* 740 kr, alltså mitt i fältet. */
      prisvarde: 3.5,
      /* 590 ml, näst störst av de sladdlösa. */
      kapacitet: 4,
      /* Ingen publicerad uppgift om mixningar per laddning. Se
         blockkommentaren ovan. */
      barbarhet: 5,
      /* Kopp, lock och knivdel tål maskindisk. */
      rengoring: 4.5,
    },
    price: 740,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Coffee Friend",
    merchantUrl:
      "https://www.coffeefriend.se/p/nutribullet-flex-nbp013gm-portable-blender-svart/",
    superlative: "Störst mugg av de sladdlösa",
    pros: [
      "590 milliliter, näst störst flaska bland de batteridrivna",
      "861 gram, och motorbasen skruvas loss så att bara flaskan följer med",
      "Spillsäkert piplock med bärögla",
      "Kopp, lock och knivdel går i diskmaskinen",
      "Flaskan är i tritan, alltså tåligare än vanlig plast",
    ],
    cons: [
      "En enda hastighet, så frysta jordgubbar kräver flera varv",
      "Går inte att använda medan den laddar",
      "740 kronor är 351 mer än nutribullet Portable, som väger 130 gram mindre",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "740 kr", highlight: true },
      { label: "Drivsätt", shortLabel: "Drift", value: "Batteri, 7,4 V", highlight: true },
      { label: "Motoreffekt", shortLabel: "Effekt", value: "–", highlight: true },
      { label: "Kapacitet", shortLabel: "Volym", value: "590 ml", highlight: true },
      { label: "Mixningar per laddning", shortLabel: "Mixningar", value: "–", highlight: true },
      { label: "Antal muggar", shortLabel: "Muggar", value: "1", highlight: true },
      { label: "Maskindiskbara delar", shortLabel: "Maskindisk", value: "Kopp, lock och knivdel", highlight: true },
      { label: "Batterispänning", value: "7,4 V" },
      { label: "Hastigheter", value: "1" },
      { label: "Material mugg", value: "Tritan" },
      { label: "Vikt", value: "0,861 kg" },
      { label: "Yttermått", value: "29,2 × 8,3 cm" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "8006447004528" },
    ],
    verdict:
      "nutribullet Flex kostar 740 kronor och blandar 590 milliliter i en tritanflaska, alltså mer än någon annan sladdlös mixer här utom CHiATO. Motorbasen skruvas loss när smoothien är klar.\n\n**Att basen lossnar är hela konstruktionens idé.** Du mixar, skruvar av motorn, sätter på piplocket med bäröglan och går, och då bär du bara flaskan och inte maskinen. Det gör att 861 gram i handen blir betydligt mindre i väskan, och locket är spillsäkert nog att ligga ner.\n\n**590 milliliter räcker till en frukost och inte bara ett glas.** Wilfa Swift rymmer 300 och Ninja Blast Max 490 fyllda, så skillnaden märks direkt när banan, frysta bär och två deciliter mjölk ska ner i samma flaska. Kopp, lock och knivdel får alla gå i diskmaskinen.\n\nDen har en enda hastighet, och det är den verkliga begränsningen. Frysta jordgubbar kräver att du vänder flaskan, skakar ner bären mot knivarna och kör om, och maskinen går inte att använda medan den laddar.\n\nVill du ha den största sladdlösa flaskan från ett känt märke är den här rätt. Ska du främst spara pengar tar du nutribullet Portable för 389 kronor, som väger mindre och bara rymmer 115 milliliter mindre.",
  },
  {
    id: "obh-twister-go",
    brand: "OBH Nordica",
    name: "Twister Go 7740",
    shortName: "OBH Twister Go",
    image: productImage(SMOOTHIEMIXER.slug, "obh-twister-go"),
    tagline: "Två flaskor på 600 milliliter och 300 watt ur uttaget.",
    scores: {
      /* 300 W nätdriven, fyra blad, pulsfunktion. */
      mixkraft: 2.5,
      /* 350 kr, billigast av de nätdrivna. */
      prisvarde: 4.5,
      /* Två flaskor à 600 ml enligt bruksanvisningen. */
      kapacitet: 4.5,
      /* Nätdriven. */
      uthallighet: 5,
      /* Flaskor med dricknippar, basen står kvar. */
      barbarhet: 3,
      /* Bruksanvisningen: samtliga lösa delar diskas för hand, även
         flaskorna. Sämst i fältet, och belagt hos tillverkaren. */
      rengoring: 1,
    },
    price: 350,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/obh-nordica/twister-go-7740-togo-blender-smoothie/?variantId=608108-01",
    superlative: "Billigast av alla med två flaskor",
    pros: [
      "350 kronor, alltså den billigaste nätdrivna i jämförelsen",
      "Två flaskor på 600 milliliter, samma totala volym som Smeg för en tredjedel av priset",
      "300 watt ur vägguttaget, mer kraft än någon batteridriven här utom BlendBoss",
      "Fyra blad och pulsfunktion",
      "En meter sladd, längst i jämförelsen",
    ],
    cons: [
      "Samtliga lösa delar ska diskas för hand, även flaskorna, enligt bruksanvisningen",
      "Bruksanvisningen anger 1 minuts körtid och sedan minst 5 minuters vila, alltså fem gånger längre paus än Smeg kräver",
      "2,3 av 5 i kundbetyg hos butiken, lägst i jämförelsen",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "350 kr", highlight: true },
      { label: "Drivsätt", shortLabel: "Drift", value: "Nätdriven", highlight: true },
      { label: "Motoreffekt", shortLabel: "Effekt", value: "300 W", highlight: true },
      { label: "Kapacitet", shortLabel: "Volym", value: "2 × 600 ml", highlight: true },
      { label: "Mixningar per laddning", shortLabel: "Mixningar", value: "Nätdriven", highlight: true },
      { label: "Antal muggar", shortLabel: "Muggar", value: "2", highlight: true },
      { label: "Maskindiskbara delar", shortLabel: "Maskindisk", value: "Inga", highlight: true },
      { label: "Max körtid per gång", value: "1 min, sedan 5 min vila" },
      { label: "Antal blad", value: "4" },
      { label: "Yttermått", value: "17 × 25,2 cm" },
      { label: "Sladdlängd", value: "1 m" },
      { label: "Artikelnummer", value: "608108-01" },
      { label: "GTIN", value: "5708642077408" },
    ],
    verdict:
      "OBH Nordica Twister Go 7740 kostar 350 kronor och ger 300 watt och två flaskor på 600 milliliter. Det är samma totala volym som Smeg för en tredjedel av priset.\n\n**300 watt ur ett uttag slår varje batteri i den här prisklassen.** CHiATO blendPLAY kostar 71 kronor mindre och har 150 watt; Wilfa Swift kostar 249 mer och har 45. Fyra blad och en pulsfunktion gör att du kan stöta ner bären mot knivarna i stället för att låta dem snurra runt ovanpå.\n\n**Två flaskor för 350 kronor betyder att två personer får varsin frukost.** Flaskorna har dricknippar och knivenheten byts mot ett lock när du är klar, alltså samma to-go-princip som i mixrar för tre gånger så mycket.\n\nDet som stjälper den är diskningen. Samtliga lösa delar ska diskas för hand, även flaskorna, och maskinen får köras högst en minut i taget och sedan vila i minst fem. Smeg kräver 60 sekunders paus på samma sorts uppgift, alltså en femtedel så lång.\n\nKöp den om priset är det som avgör och du ändå diskar för hand. Vill du ha maskindisk och dubbla kraften är Ninja QB3001 för 925 kronor den mixer den här försöker vara.",
  },
  {
    id: "ninja-blast",
    brand: "Ninja",
    name: "Blast BC151",
    shortName: "Ninja Blast",
    image: productImage(SMOOTHIEMIXER.slug, "ninja-blast"),
    tagline: "Laddad på två timmar, snabbast av de batteridrivna.",
    scores: {
      /* Batteri 7,4 V, en knapp, BlastBlade i motorenheten. */
      mixkraft: 2.5,
      /* 699 kr. Billigare än Blast Max med 490 kr. */
      prisvarde: 4,
      /* 530 ml. */
      kapacitet: 3.5,
      /* 10 mixningar à 30 sekunder = 5 min. Kortast i fältet. */
      uthallighet: 1.5,
      /* 790 g och 27 cm, näst lättast här. */
      barbarhet: 5,
      /* Mugg och lock i maskin. */
      rengoring: 4,
    },
    price: 699,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Komplett",
    merchantUrl:
      "https://www.komplett.se/product/1324188/hem-fritid/koksapparater/blenders/ninja-blast-portable-blender-svart",
    superlative: "Bäst för en smoothie om dagen",
    pros: [
      "790 gram, näst lättast i jämförelsen efter nutribullet Portable",
      "530 milliliter i muggen, mer än nutribullet Portable rymmer",
      "Två timmars laddning, snabbast av alla batteridrivna här",
      "Ett knivskydd följer med, så knivarna kan packas ner",
      "Mugg och lock går i diskmaskinen",
    ],
    cons: [
      "5 minuters mixtid per laddning, alltså kortast i hela jämförelsen",
      "En enda knapp och ett fast program på 30 sekunder, utan hastighetsval",
      "699 kronor är 310 mer än nutribullet Portable, som håller tre gånger längre per laddning",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "699 kr", highlight: true },
      { label: "Drivsätt", shortLabel: "Drift", value: "Batteri, 7,4 V", highlight: true },
      { label: "Motoreffekt", shortLabel: "Effekt", value: "–", highlight: true },
      { label: "Kapacitet", shortLabel: "Volym", value: "530 ml", highlight: true },
      { label: "Mixningar per laddning", shortLabel: "Mixningar", value: "10", highlight: true },
      { label: "Antal muggar", shortLabel: "Muggar", value: "1", highlight: true },
      { label: "Maskindiskbara delar", shortLabel: "Maskindisk", value: "Mugg och lock", highlight: true },
      { label: "Mixtid per laddning", value: "5 min" },
      { label: "Programcykel", value: "30 sek" },
      { label: "Batterispänning", value: "7,4 V" },
      { label: "Laddningstid", value: "Cirka 2 h" },
      { label: "Vikt", value: "0,79 kg" },
      { label: "Yttermått", value: "27 × 9 × 8,5 cm" },
      { label: "Artikelnummer", value: "1324188" },
      { label: "GTIN", value: "622356274937" },
    ],
    verdict:
      "Ninja Blast kostar 699 kronor, väger 790 gram och blandar 530 milliliter. Den laddas på två timmar, vilket är snabbast av alla batteridrivna mixrar här.\n\n**Tio mixningar är fem minuters mixtid, och det är kortast i jämförelsen.** Ninjas programcykel är 30 sekunder lång, så tio varv blir 300 sekunder totalt. Räcker en cykel per smoothie får du tio frukostar mellan laddningarna; kräver frysta bär två varv blir det fem.\n\n**Två timmars laddning gör den kortare batteritiden lättare att leva med.** Ninja Blast Max tar fyra timmar och KitchenAid Go tre, så den här är tillbaka snabbast om du glömt sätta den på laddning kvällen innan.\n\n**790 gram och 27 centimeter är fickformat i praktiken**, och ett knivskydd följer med så att knivenheten kan packas ner utan att skära i väskan. Mugg och lock går i diskmaskinen.\n\nDen har en enda knapp och inget hastighetsval, så du styr resultatet genom att köra en cykel till. Gör du en smoothie om dagen och laddar den ofta fungerar den utmärkt. Vill du inte tänka på laddning varje vecka tar du nutribullet Portable för 389 kronor, som håller över 15 mixningar.",
  },
  {
    id: "kitchenaid-go",
    brand: "KitchenAid",
    name: "Go sladdlös blender",
    shortName: "KitchenAid Go",
    image: productImage(SMOOTHIEMIXER.slug, "kitchenaid-go"),
    tagline: "20 minuters mixtid, dubbelt mot närmaste sladdlösa.",
    scores: {
      /* Batteri 12 V, 15 000 varv, två hastigheter, fyra blad.
         Produktdatabladet anger att den inte är gjord för iskrossning. */
      mixkraft: 2.5,
      /* 1 799 kr, dyrast i jämförelsen. */
      prisvarde: 2,
      /* 473 ml, en bägare. */
      kapacitet: 3,
      /* 20 minuters mixtid, längst av alla batteridrivna. Laddning 3 h. */
      uthallighet: 4.5,
      /* 1,5 kg och 30 cm. Batteriet lossar från baksidan. */
      barbarhet: 3.5,
      /* Diskvattensäkra delar och avtagbart lock. */
      rengoring: 4,
    },
    price: 1799,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/kitchenaid/go-cordless-barbar-blender-inklusive-batteri/?variantId=630735-01",
    superlative: "Bäst för dig som redan har Go",
    pros: [
      "20 minuters mixtid per laddning, alltså 60 procent mer än närmaste sladdlösa",
      "Batteriet passar hela KitchenAids Go-serie, så en handdammsugare delar samma paket",
      "Knappen kör exakt en minut och stänger sedan av, så du kan gå ifrån den",
      "Två hastigheter och fyra blad",
      "Tre timmars laddning och batterinivå som visas med lysdioder",
    ],
    cons: [
      "1 799 kronor, dyrast i jämförelsen och 610 mer än Ninja Blast Max",
      "Inte byggd för att krossa is, enligt tillverkaren",
      "Säljs också i en variant utan batteri för 1 479 kronor, så priset på hyllan är inte alltid priset på en fungerande mixer",
      "1,5 kilo, alltså dubbelt mot nutribullet Portable",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 799 kr", highlight: true },
      { label: "Drivsätt", shortLabel: "Drift", value: "Batteri, 12 V", highlight: true },
      { label: "Motoreffekt", shortLabel: "Effekt", value: "–", highlight: true },
      { label: "Kapacitet", shortLabel: "Volym", value: "473 ml", highlight: true },
      { label: "Mixningar per laddning", shortLabel: "Mixningar", value: "20", highlight: true },
      { label: "Antal muggar", shortLabel: "Muggar", value: "1", highlight: true },
      { label: "Maskindiskbara delar", shortLabel: "Maskindisk", value: "Bägare och lock", highlight: true },
      { label: "Mixtid per laddning", value: "20 min" },
      { label: "Programcykel", value: "60 sek" },
      { label: "Batterispänning", value: "12 V litiumjon" },
      { label: "Laddningstid", value: "Cirka 3 h" },
      { label: "Varvtal", value: "15 000 rpm" },
      { label: "Hastigheter", value: "2" },
      { label: "Vikt", value: "1,5 kg" },
      { label: "Yttermått", value: "12,2 × 13 × 30 cm" },
      { label: "Artikelnummer", value: "630735-01" },
      { label: "GTIN", value: "5413184002930" },
    ],
    verdict:
      "KitchenAid Go kostar 1 799 kronor och ger 20 minuters mixtid på en laddning. Det är 60 procent mer än den sladdlösa som kommer närmast, och det enda den här maskinen vinner på.\n\n**20 minuter är den längsta batteritiden i jämförelsen med god marginal.** Ninja Blast Max ger 12 minuter och 30 sekunder och Ninja Blast 5. Knappen kör i exakt en minut och stänger av automatiskt, så du kan lägga i ingredienserna, trycka en gång och gå och hämta en mugg.\n\n**Batteriet delas med hela Go-serien**, alltså handdammsugaren, hackaren och elvispen. Har du redan en av dem hemma köper du den här utan batteri för 1 479 kronor och sparar 320.\n\nProblemet är vad den gör med kraften. Tillverkaren anger att den inte klarar isbitar, och 473 milliliter är den minsta bägaren bland de dyrare mixrarna. För 1 799 kronor får du alltså längst batteritid och minst kraft i samma maskin.\n\nHar du redan Go-batteriet är den ett rimligt tillskott. Köper du en fristående sladdlös mixer ger Ninja Blast Max mer kraft och tre program för 610 kronor mindre.",
  },
  {
    id: "wilfa-swift",
    brand: "Wilfa",
    name: "Swift RCBL-45",
    shortName: "Wilfa Swift",
    image: productImage(SMOOTHIEMIXER.slug, "wilfa-swift"),
    tagline: "20,7 centimeter hög, får plats i en cykelväska.",
    scores: {
      /* 45 W, lägst i fältet. 18 000 varv, ett program plus puls. */
      mixkraft: 1.5,
      /* 599 kr för 300 ml. CHiATO ger 600 ml för 279. */
      prisvarde: 3,
      /* 300 ml, minst i jämförelsen. */
      kapacitet: 1.5,
      /* 14 mixningar à 35 sekunder = 8 min 10 s. */
      uthallighet: 3,
      /* 20,7 cm hög, minst av alla. */
      barbarhet: 5,
      /* Avtagbara delar tål maskindisk, inklusive silikonringen. */
      rengoring: 4.5,
    },
    price: 599,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/wilfa/swift-rcbl45w-portabel-blender/?variantId=642078-01",
    superlative: "Minst av alla, för ett glas",
    pros: [
      "20,7 centimeter hög och 8,2 brett, alltså den minsta mixern i jämförelsen",
      "18 000 varv i minuten trots låg effekt",
      "Blenderprogram på 35 sekunder plus separat pulsfunktion",
      "Avtagbara delar tål maskindisk, silikonringen inkluderad",
      "Flaskan är i tritan och laddningen går över USB-C",
    ],
    cons: [
      "45 watt, alltså en tjugofjärdedel av Ninja BlendBoss och lägst i jämförelsen",
      "300 milliliter räcker till ett glas och inte till en frukost",
      "599 kronor för 300 milliliter, mot 279 kronor för CHiATO med 600",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "599 kr", highlight: true },
      { label: "Drivsätt", shortLabel: "Drift", value: "Batteri", highlight: true },
      { label: "Motoreffekt", shortLabel: "Effekt", value: "45 W", highlight: true },
      { label: "Kapacitet", shortLabel: "Volym", value: "300 ml", highlight: true },
      { label: "Mixningar per laddning", shortLabel: "Mixningar", value: "14", highlight: true },
      { label: "Antal muggar", shortLabel: "Muggar", value: "1", highlight: true },
      { label: "Maskindiskbara delar", shortLabel: "Maskindisk", value: "Alla avtagbara delar", highlight: true },
      { label: "Mixtid per laddning", value: "8 min 10 s" },
      { label: "Programcykel", value: "35 sek" },
      { label: "Varvtal", value: "18 000 rpm" },
      { label: "Antal program", value: "2" },
      { label: "Material mugg", value: "Tritan" },
      { label: "Yttermått", value: "8,2 × 20,7 cm" },
      { label: "Artikelnummer", value: "604163" },
      { label: "GTIN", value: "7044876041630" },
    ],
    verdict:
      "Wilfa Swift kostar 599 kronor och är 20,7 centimeter hög, alltså den minsta mixern i jämförelsen. Flaskan rymmer 300 milliliter och motorn ger 45 watt.\n\n**Storleken är det enda skälet att välja den.** Den får plats i en cykelväska där en mixer på 30 centimeter inte gör det, och den väger så lite att man tar med den utan att tänka på det. 18 000 varv i minuten är dessutom samma varvtal som CHiATO anger, alltså inte en långsam motor.\n\n**300 milliliter är hälften av vad en normal smoothie tar.** Banan, en näve frysta bär och ett par deciliter mjölk får inte plats, och när motorenheten skruvas fast pressas dessutom innehållet uppåt i flaskan. I praktiken blir det ett glas och inte en frukost.\n\n45 watt är fältets lägsta med god marginal. Frysta bär kräver att du skakar flaskan och kör om, och programmet på 35 sekunder får ofta köras två eller tre gånger. Batteriet ger 8 minuter och 10 sekunders mixtid totalt, så tre varv per smoothie blir fyra smoothies per laddning.\n\nBehöver du den absolut minsta mixern som finns och nöjer dig med ett glas mjuk frukt är den rätt. Ska den göra en frukost ger CHiATO blendPLAY dubbla volymen och tre gånger effekten för 320 kronor mindre.",
  },
];

const CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Zwilling",
    name: "Personal blender 0,55 L",
    approxPrice: 1103,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/zwilling/zwilling-personal-blender-055-l/?variantId=634304-01",
    reason:
      "En nätdriven personlig mixer på 550 milliliter i rostfritt stål och BPA-fri plast, i rätt klass och rätt prisläge. Zwilling anger ingen motoreffekt, varken på sin svenska produktsida eller i den bruksanvisning som är publicerad, och deras eget artikelnummer leder till en sida som är borttagen. Utan effekten går den inte att placera mot ett fält där spannet är 45 till 1 100 watt, så den rankas inte hellre än att den får ett gissat betyg.",
  },
  {
    brand: "nutribullet",
    name: "Personal 600",
    approxPrice: 687,
    merchant: "Coffee Friend",
    merchantUrl: "https://www.coffeefriend.se/p/blender-nutribullet-personal-600/",
    reason:
      "Klassikern i kategorin och den maskin nutribullet byggde sitt namn på. Den föll bort på en motsägelse i effektuppgiften: modellnamnet och nutribullets egen märkesbeskrivning anger 600 watt, medan butikens specifikationsblad anger 200. Två uppgifter om samma motor som skiljer en faktor tre kan inte båda stämma, och effekten är det som avgör om frysta bär blir släta. Kontrollera talet hos nutribullet direkt innan du köper.",
  },
  {
    brand: "nutribullet",
    name: "Ultra 1200",
    approxPrice: 1190,
    merchant: "Coffee Friend",
    merchantUrl: "https://www.coffeefriend.se/p/blender-nutribullet-ultra-1200-nb1206dgcc/",
    reason:
      "1 200 watt och extraktionsblad, alltså mer kraft än något annat på den här sidan. Den är en bänkmaskin med kontrollpanel snarare än en mixer du bär med dig: hela poängen med kategorin är att muggen följer med, och Ultra är byggd för att stå kvar. Vill du ha maximal kraft i en enportionsmixer är den däremot det starkaste alternativet som säljs i Sverige.",
  },
  {
    brand: "WMF",
    name: "Kult X Mix & Go",
    approxPrice: 552,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Blender-Mixer/WMF-Mixer-Kult-X-Mix-Go-300-W/2572602",
    reason:
      "300 watt och to-go-flaska för 552 kronor, alltså direkt jämförbar med OBH Nordica Twister Go och Smeg. Den föll på att den ligger mitt emellan: 202 kronor dyrare än OBH med samma effekt, och utan Smegs andra hastighet eller andra mugg. Är den i lager billigare än OBH är den ett fullgott alternativ.",
  },
  {
    brand: "Severin",
    name: "SM 3737 Mix & Go",
    approxPrice: 773,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/severin/mix-go-multimixer-2i1/?variantId=610358-01",
    reason:
      "En blender med glaskanna som också har en Mix&Go-bägare, alltså två maskiner i en. Den rankas inte därför att glaskannan är huvudsaken och bägaren ett tillbehör, och en jämförelse där hälften av produkterna har en kanna på bänken mäter två olika köp. Är du ute efter både bänkblender och to-go-mugg är den värd att titta på.",
  },
  {
    brand: "Wilfa",
    name: "BL-5002GO Blend 2Go",
    approxPrice: 499,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/wilfa/bl5002go-blend-2go-blender/?variantId=628704-01",
    reason:
      "Nätdriven to-go-mixer i stål för 499 kronor, alltså 149 dyrare än OBH Nordica Twister Go. Varken Wilfa eller butiken publicerar motoreffekt, volym eller antal muggar för modellen, och tre tomma celler av sju markerade gör den omöjlig att jämföra rättvist. Priset är däremot bra om du hittar specifikationerna i butik.",
  },
  {
    brand: "OBH Nordica",
    name: "Mix & Move LH15FDS0",
    approxPrice: 434,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/obh-nordica/mix-move-blender-2-x-06-l-300w/?variantId=608118-01",
    reason:
      "Samma tillverkare, samma effekt och samma två bägare på 600 milliliter som Twister Go, men 84 kronor dyrare. Två nästan identiska maskiner från samma märke rangordnar ingenting, så den billigare rankas och den här står här. Är Twister Go slut är det här samma köp.",
  },
];

/**
 * FAQ. Varje svar ska gå att läsa fristående, eftersom rutan kan visas ensam
 * i ett sökresultat.
 */
export const SMOOTHIEMIXER_FAQ = [
  {
    question: "Hur många smoothies gör en sladdlös mixer på en laddning?",
    answer:
      "Färre än talet på kartongen antyder, och skillnaden mellan modellerna är större än den ser ut. Tillverkarna anger batteriet i antal mixningar, men en mixning är en programcykel och cyklerna är olika långa. Ninjas cykel är 30 sekunder, Wilfas 35 och KitchenAids en hel minut. Räknar man om talen blir Ninja Blast Max 25 mixningar till 12 minuter och 30 sekunders mixtid, Wilfa Swift 14 mixningar till 8 minuter och 10 sekunder, och Ninja Blast 10 mixningar till 5 minuter. KitchenAid Go anger direkt 20 minuters mixtid, alltså mest av alla, trots att den inte anger flest mixningar. Till det kommer att en smoothie sällan blir klar på en cykel: frysta jordgubbar kräver ofta två eller tre varv i de svagare maskinerna, så 14 mixningar kan i praktiken bli fem smoothies. Laddningen tar sedan mellan två och fem timmar, och ingen av mixrarna går att köra medan den laddar.",
  },
  {
    question: "Behöver jag en sladdlös smoothiemixer?",
    answer:
      "Bara om du faktiskt ska mixa någon annanstans än vid en bänk med ett uttag. En sladdlös mixer kostar dig kraft, och det är en stor skillnad: den starkaste batteridrivna här har 12 volt medan de nätdrivna ligger på 300 till 1 100 watt. Det märks direkt på frysta bär och isbitar, som är precis det de flesta smoothies innehåller. En nätdriven mixer tar dessutom aldrig slut, medan en batteridriven ger mellan 5 och 20 minuters mixtid och sedan behöver några timmar. Poängen med en sladdlös är att den fungerar på tåget, i husbilen, på hotellrummet eller i sommarstugan utan el, och den poängen är verklig om du gör det. Blandar du din smoothie hemma i köket varje morgon får du mer maskin för pengarna med sladd: Ninja QB3001 kostar 925 kronor och ger 700 watt och två muggar, alltså mindre än KitchenAid Go som är batteridriven och kostar 1 799.",
  },
  {
    question: "Hur många watt behöver en smoothiemixer?",
    answer:
      "Runt 300 watt räcker till mjuk frukt, och för frysta bär och is vill du ha 700 eller mer. Spannet i handeln är enormt: Wilfa Swift har 45 watt och Ninja BlendBoss 1 100, alltså en faktor 24 mellan två maskiner som säljs under samma ord. Under ungefär 200 watt får du räkna med att köra programmet två eller tre gånger och skaka flaskan emellan för att få ner ingredienserna mot knivarna, och hela isbitar är utanför räckvidden. Vid 300 watt går banan, spenat, yoghurt och mjuka frysta bär bra, medan frysta jordgubbar ofta lämnar bitar. Vid 700 watt och uppåt blir smoothien slät på första varvet och isbitar blir snö. Ett förbehåll: watt mäter vad motorn drar ur uttaget, inte hur väl kniven gör sitt jobb, och varvtalet och knivkonstruktionen spelar in. Och de sladdlösa mixrarna anger sällan watt alls, utan volt eller milliamperetimmar i samma fält.",
  },
  {
    question: "Vad är skillnaden mellan en smoothiemixer och en vanlig blender?",
    answer:
      "Storleken, och vilket kärl du dricker ur. En smoothiemixer blandar direkt i den mugg eller flaska du sedan tar med dig, oftast mellan 300 och 700 milliliter, och motorenheten skruvas eller vrids loss när du är klar. En vanlig blender har en fast kanna på 1,4 till 2 liter som står kvar på bänken, och därifrån häller du upp i ett glas. Det betyder också olika mycket motor: bänkblenders ligger typiskt mellan 1 200 och 1 800 watt medan en smoothiemixer ligger mellan 45 och 1 100. En bänkblender gör varm soppa, krossar is till drinkar för ett helt sällskap och mixar nötsmör, alltså saker en enportionsmixer inte klarar. En smoothiemixer tar mindre plats, är snabbare att plocka fram och sparar dig diskningen av en stor kanna för en enda smoothie. Ska du göra en portion om dagen är mixern rätt maskin; lagar du mat för familjen behöver du en blender.",
  },
  {
    question: "Kan man krossa is i en smoothiemixer?",
    answer:
      "Vissa klarar det, och det är värt att kontrollera innan du köper eftersom skillnaden är stor. Ninja BlendBoss har 1 100 watt och CrushBlades och gör snö av hela isbitar, och Ninja Blast Max har ett eget Crush-program för just det. nutribullet anger för sin Portable att den klarar is i mindre mängd, alltså inte en full flaska isbitar. CHiATO blendPLAY Travel är inte lämplig för att krossa is eller hacka nötter, och KitchenAid Go är inte byggd för is heller. Regeln är att kraften avgör: under ungefär 300 watt blir isen inte krossad utan slår mot knivarna, vilket både låter illa och sliter på maskinen. Vill du ha iskalla smoothies utan en riktig iskross är alternativet att använda frysta bär och fryst banan i stället för isbitar, vilket ger samma kyla och tjockare konsistens och fungerar i varenda mixer på den här sidan.",
  },
  {
    question: "Hur länge får en smoothiemixer köras utan paus?",
    answer:
      "Kortare än de flesta tror, och det står bara i bruksanvisningen. OBH Nordica anger för Twister Go att maximal användningstid är en minut och att apparaten sedan ska vila i minst fem minuter innan den används igen. Smeg anger 60 sekunder åt gången med 60 sekunders paus för sin personal blender. Ninja anger för sina batteridrivna att motorn ska stängas av och svalna i omkring 15 minuter om den överhettas. Skillnaden mellan en och fem minuters vila låter liten men avgör om du kan göra två smoothies i rad på en morgon eller inte. Bakgrunden är att motorerna i den här klassen är små och kyls dåligt, och att en överhettad motor både luktar bränt och slits i förtid. Det praktiska rådet är att skära ingredienserna i mindre bitar och ha rikligt med vätska, eftersom mixern då blir klar på 30 sekunder i stället för att kämpa i två minuter.",
  },
  {
    question: "Går delarna i diskmaskinen?",
    answer:
      "Det varierar mer än man skulle tro, och knivenheten är den avgörande detaljen. Ninja QB3001 anger att muggar, lock och knivenhet alla tål maskindisk medan motordelen torkas av, vilket är det bredaste i den här jämförelsen. nutribullet anger samma sak för Portable och Flex. OBH Nordica står i andra änden: bruksanvisningen för Twister Go säger att samtliga lösa delar ska diskas för hand, även flaskorna. Smeg tar muggarna i maskin men vill att knivenheten diskas för hand. Skillnaden märks varje morgon, eftersom knivenheten är den obehagligaste delen att diska för hand och den som avgör om mixern används på en vardag. Ett praktiskt knep som fungerar i alla: fyll flaskan halvvägs med varmt vatten och en droppe diskmedel och kör ett program på 30 sekunder direkt efter användning, så behöver du bara skölja ur.",
  },
  {
    question: "Varför står det en volym på kartongen och en annan i tabellen?",
    answer:
      "Därför att flaskan rymmer mer än du får fylla den. Ninja Blast Max säljs som en mixer med 570 milliliter och anger samtidigt en max fyllnadsvolym på 490. Ninja BlendBoss säljs som 710 milliliter och får fyllas till 650. Skillnaden är utrymmet som krävs för att innehållet ska kunna röra sig och för att knivenheten ska få plats när du skruvar fast den, och överfyller du blir resultatet både sämre mixat och kladdigt. Den här sidan använder max fyllnadsvolym i jämförelsetabellen, alltså det du faktiskt får blanda, eftersom en tabell där hälften är bräddmått och hälften arbetsmått inte jämför något. Samma sak gäller åt andra hållet: Wilfa Swift rymmer 300 milliliter, och eftersom motorenheten skjuts in i flaskan när du skruvar fast den pressas innehållet uppåt om du fyllt till kanten.",
  },
];

export const SMOOTHIEMIXER_PRODUCTS = resolveProducts(SMOOTHIEMIXER, SEEDS);

export const SMOOTHIEMIXER_CONSIDERED: ConsideredProduct[] = CONSIDERED;
