# Quality bar

Phase 6. The standard is `/smart-belysning`, and the standard is **richness,
not length**.

## Do not chase counts

That page runs about 4 600 words with 14 FAQ entries and five tools. Those are
outcomes of the topic, not targets. Smart belysning genuinely has protocols,
colour temperature, flicker, sockets and a wiring-regulation angle to explain.

A category with less to say should be shorter. Padding a thin topic to hit a
word count is precisely what the AI-generated affiliate spam in this market
does, and out-writing them on volume is not the game. Being the page that
actually answers the question is.

So: never add a section to reach a number. Add it because a buyer needs it.

## The critique pass

Go through the rubric below with the finished page open. For each row, answer
**yes**, **no, and here is what I will add**, or **not applicable because X**.

"Not applicable" is a legitimate answer and must carry a reason. "We ran out of
time" is not a reason.

### Substance

| | Question |
|---|---|
| 1 | Does every product carry a real, dated price from a verified retailer URL? |
| 2 | Does the page name the independent tests it draws on, with working links? |
| 3 | Is the weighting published, and does the ranking follow the scores? |
| 4 | Does it say anywhere that the reader should **not** buy, or that a cheaper option is enough? |
| 5 | Does it name products we rejected, with real reasons? |
| 6 | Does it explain the criterion we weight heaviest, in the terms a buyer would use? |
| 7 | Is there a fact on this page that no competitor has? The pilot had IKEA's discontinued colour E27 and the E14 that survived it. |
| 8 | Does anything claim a measurement we did not take? |

### Usefulness

| | Question |
|---|---|
| 9 | Does the guide answer the questions people actually search, or the ones we found convenient to write? |
| 10 | Is there a tool where a tool genuinely helps, and none where it would be decoration? |
| 11 | Does the FAQ stand alone, so one answer surfaced in search still makes sense? |
| 12 | Is the failure mode buyers do not anticipate covered? Flicker below 20% was that for lighting. |
| 13 | Is there a Swedish angle a translated guide would miss? Regulations, elpris, housing stock, what shops actually stock. |
| 14 | Would someone who reads only the first screen get a correct answer? |

### Craft

| | Question |
|---|---|
| 15 | Zero em dashes in reader-facing text. |
| 16 | Every outbound link through `resolveMerchantLink`. |
| 17 | Section tones alternate, no two adjacent greys without a divider. |
| 18 | Comparison table is a real table at 390px, frozen column, nothing truncated that should not be. |
| 19 | Schema: ItemList, Product, Review, BreadcrumbList, FAQPage. |
| 20 | Zero to two new components, each with a styleguide bench. |
| 21 | Byline labelled, with a separate reviewer. |
| 22 | Every claim in the file headers about what is real and what is not is accurate. |

## Then compare against the competitors

Re-run the Phase 1 measurements with our page included. The comparison is for
**capabilities**, not word counts:

- Schema types they have that we lack
- Content kinds they have that we lack, such as user quotes or video
- Anything we have that none of them do, which is the thing to protect

Report as a table with effort and priority. Fix what is cheap and material now;
stash the rest in `.agent/ideas-testsidor.md` with the reasoning intact.

## Iterate

Run the rubric, fix, run it again. Stop when every row is a **yes** or a
justified **not applicable** and the competitor comparison shows no cheap gap
left open.

Two passes is normal. If the second pass finds nothing, stop; a third pass by
the same author who wrote the page is theatre, not review.
