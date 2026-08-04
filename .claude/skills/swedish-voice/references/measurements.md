# Vad mätningarna visat

Det här är bevis, inte förbud. Läs det som *så här ser vår text ut jämfört med
riktig svensk konsumentjournalistik*, och dra slutsatsen själv i den mening du
just skriver.

Referensen är 151 000 ord svensk konsument- och testjournalistik i
`.agent/referens/`, till största delen Råd & Rön. Verktyget är
`pnpm sprak "<fras>"`, där `*` matchar valfritt ord.

En nolla i referensen är en indikation, inte en dom. Metoden står i
`method.md`.

---

## Bekräftade övertramp

Fraser vi använder mycket och referensen knappt eller inte alls.

| Fras | Vi | Referens |
|---|---|---|
| `skriver` (som anföringsverb) | 1,51 /1000 | 0,18 /1000 |
| `skriver rakt ut` | 11 | 0 |
| `, alltså` (appositionellt) | 19 | 0 |
| `på sidan` / `sidans` / `kategorins` | 237 | 0 |
| `i jämförelsen` (utan substantiv) | 236 | 0 |
| `av de tolv` | 49 | **0** |
| `två saker` | 61 | 0 |
| `säger rakt ut` | 10 | 0 |
| `slår fast` | 3 | 0 |
| `skriver rakt ut` | 0 (var 11) | 0 |
| `den / det enda` | 2,11 /1000 | 0,07 /1000 |
| `ingen annan / ingen av de` | 0,64 /1000 | 0,04 /1000 |

### Kontrastiv definition, mätt 2026-08-04

Vanan att säga vad något *inte* är, eller vad det används *i stället för*, i
stället för att säga vad det är. Störst av allt vi mätt, både i kvot och i
absoluta tal.

| Fras | Vi | Referens | Kvot |
|---|---|---|---|
| `i stället för` | 272 | 7 | 18,4x |
| `går inte att` | 61 | 1 | 29,0x |
| `är inte ett` | 29 | 2 | 6,9x |
| `och inte en` | 26 | 1 | 12,3x |
| `aldrig som` | 22 | 0 | — |
| `inte samma sak som` | 14 | 0 | — |
| `är inte en detalj` | 5 | 0 | — |
| `svårare att försvara` | 2 | 0 | — |
| `är inte teoretisk` | 1 | 0 | — |

**Kontrollmätningen är den som gör regeln användbar.** `är inte` ensamt ligger
på 200 mot 37, alltså 2,6x och inom normalen. Negation i sig är oproblematisk.
Det är den kontrastiva *definitionen* som är vanan, och den ska ersättas med ett
påstående om vad saken är. Se `writing-guide.md`.

`i stället för` på 272 förekomster är dessutom för stort för en enskild
genomgång och bör städas i en egen omgång, med ersättningen mätt.

Och åt andra hållet, uttryck referensen använder som vi inte gör:

| Fras | Vi | Referens |
|---|---|---|
| `i testet` | 8 | **258** |
| `av de testade` | 0 | **68** |

Det andra mönstret är värt eftertanke. Vi undviker testvokabulär eftersom vi
inte testar själva, vilket är rätt instinkt. Men referensen visar hur ofta en
riktig testtext behöver peka tillbaka på urvalet, och vi löste samma behov med
`sidans` och `i jämförelsen`, som ingen använder.

## `av de tolv` är den viktigaste raden i tabellen

Den frasen var **min egen ersättning** för `sidans`, införd på 145 ställen, och
den visade sig lika främmande som originalet.

Slutsatsen generaliserar: en formel som byts mot en annan formel är ingen
lösning. Mät ersättningen innan du kör den brett. Se `rulings.md`, 2026-08-04.

## Register över bekräftade kalkeringar

Anglicismerna sitter i ordkombinationerna, inte i lånorden. Alla fyra orden kan
vara svenska medan mönstret är engelskt, vilket är skälet till att ingen ordlista
hittar dem.

| Kalkering | Engelskan bakom | Vi | Referens | Skriv i stället |
|---|---|---|---|---|
| lämna X utanför | leave X out | 2 | 0 | "saknar X helt", "X omfattas inte" |

Hittar du en till: mät, bekräfta att referensen ligger på noll eller nära noll,
rätta förekomsterna, och skriv in raden.

## Vad som inte är problem

Prövat mot Peters öra och underkänt som regler. Skriv dem fritt och lägg ingen
tid på att undvika dem:

- **Klyvning.** "Det är sensorn som avgör när varnaren ska kastas."
- **`, vilket`** som satslim.
- **Regel av tre**, när det är en verklig uppräkning.
- **Meningar som börjar med "Det"**, även om det är 10,8 % av alla.
- **`skillnaden mellan`.** 84 mot 16, kvot 2,5x. Låg misstanke vid genomgången
  av `/fonsterputsrobot`, mätt samma dag, friad. Referensen använder den
  också och den bär ofta hela poängen i en jämförande mening.
- **`är inte`** som konstruktion. 2,6x. Det är den kontrastiva definitionen som
  fälls, inte negationen; se den mätningen ovan.

De två sista är värda att minnas som metodexempel: båda flaggades på örat under
en genomgång, båda friades av mätningen samma dag. Utan mätningen hade två
fungerande konstruktioner förbjudits på sajten.

## Var det inte lönar sig att leta

Rytmen är redan mänsklig: median 13 ord per mening, spridning 8,8, och 1 382
olika inledningsord.

Vi är dessutom **renare än Råd & Rön** på marknadsanglicismer: `robust`,
`optimal`, `säkerställa`, `erbjuder`, `över tid`, `baserat på`, `när det kommer
till`. Byråkratisvenskan är borta, `utgör` 0 och `i syfte att` 0.

**Leta inte där. Där finns ingenting.** Den som ändå letar hittar något att
ändra, och ändringen gör texten sämre.

## Flaggat men inte avgjort

`håller undan`, `lugnt kan bortse`, `ge upp helt`, `räkna med att`.

De saknas i referensen, men två har försvar. "Fick ge upp helt" är Ljud & Bilds
egen formulering, och "räkna med att" är vanlig svenska som troligen ligger
utanför Råd & Röns register.

Inga regler förrän Peter sagt sitt.
