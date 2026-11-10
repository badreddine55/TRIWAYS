# TRIWAYS SEO progress — Phase 0

Date: 10 November 2026. Status: **Awaiting owner approval. No website code changed.**

## Project understanding

TRIWAYS presents national/international transport (road, sea, air), customs management through specialist partners, and consulting/training. The code suggests a Moroccan B2B audience and an enquiry/quotation goal; these are working interpretations, not owner-confirmed targeting decisions. The current stack is React 19, Vite 7, React Router 7, Tailwind and react-helmet-async. French is the default; English is selected through localStorage on the same URLs. Site age, authority, qualified-lead definition and priority service are unconfirmed.

Read all six Markdown research files in this directory and all 287 CSV records. The filenames differ from the request template but cover the seven requested inputs. The research identifies triwaysslogistics.com; the code identifies www.triways.ma. Neither is approved as the canonical host yet.

## Evidence and scoring limits

- Every CSV volume, CPC, difficulty, GSC clicks, impressions and position field is blank: **No data**. A GSC source label identifies a seed/filter, not an observed account query.
- Autocomplete, PAA and related-search candidates are explicitly suggested/unverified. Do not present them as live Google observations.
- Source counts: 266 rows have one source label; 15 have two; six have three. Labels often repeat the same analyst idea; they are not independent demand measurements.
- Reddit file 05 documents three opened core discussions, plus snippet-only records. It explicitly provides no reliable frequency measurement. R1 concerns business pallets/fees; R2 first imports/documents; R3 apparel imports/supplier preparation. Use these as qualitative evidence, not demand scores.
- Formula requested: `2 × business fit + intent match + volume score + (6 − difficulty score)`, inputs 1–5. Full priority score is **No data** for every cluster. Do not substitute source_count for volume or assign unknown difficulty a favorable value.
- Tables below show only the provisional editorial subtotal `2B + I` out of 15. This is not the full priority score. B reflects advertised services, not verified delivery capability; I reflects the proposed page's intent. Ordering also considers dependencies and the owner's one-cluster-at-a-time rule.
- All main targets below lack measured metrics. They require approval before use. Own-brand terms are navigational and stay with company/contact pages. Competitor names, isolated filter terms and research operators are not proposed primary targets.

## Current page inventory

Source audit, default French state. Titles/descriptions below are the client-rendered configuration, not verified live-server HTML. On all four routes the initial HTML shell has title `TRIWAYS Logistics` and no page-specific description or visible page content.

| Route / file | Purpose | Current title | Current meta description | Current H1 | Issues |
|---|---|---|---|---|---|
| `/` — `src/pages/Home.tsx`, `src/sections/Hero.tsx` | Company introduction and service enquiries | TRIWAYS LOGISTICS — Transit & Logistique | Leader en transit, dédouanement et logistique au Maroc. Services complets d'importation, d'exportation et de gestion douanière intégrée. | Rotates: Transport National et International / Gestion Douanière Intégrée / Consulting Stratégique | H1 changes with slideshow; broad positioning overlaps service hub; “Leader” needs evidence. |
| `/services` — `src/pages/Services.tsx` | Three-service overview and enquiry links | Services de Transit & Logistique \| TRIWAYS LOGISTICS | Découvrez nos services complets: gestion douanière, consulting stratégique, transport et logistique intégrée. Solutions personnalisées pour vos besoins logistiques. | Nos Services | Generic heading; distinct services share one URL; non-open accordion content is conditionally rendered. Navigation state opens a service for users but is not a separate crawlable service URL. |
| `/qui-sommes-nous` — `src/pages/QuiSommesNous.tsx` | Company identity and trust | À Propos de TRIWAYS LOGISTICS | Qui sommes-nous? TRIWAYS LOGISTICS, leader reconnu en logistique et transit au Maroc. Découvrez notre expertise depuis 2014 et nos engagements envers nos clients. | TRIWAYS LOGISTICS | “Leader reconnu” and “depuis 2014” require verification; establish original company evidence rather than repeat service targets. |
| `/contact` — `src/pages/Contact.tsx` | Contact and quote request | Contactez TRIWAYS LOGISTICS | Nous sommes à écoute de vos questions. Contactez-nous pour discuter de vos besoins logistiques. Basé à Casablanca, Maroc. | **Absent**; visible heading “Parlons de votre projet” is H2 | Casablanca contradicts visible Dakhla. Submit opens mailto, then displays a success state without verifying delivery. Quotation completion cannot currently be equated with a delivered lead. |

## Shared technical/entity findings

1. `src/components/SEO.tsx` hardcodes www.triways.ma canonicals, organization URL and French metadata. Research refers to triwaysslogistics.com. Confirm host before changing tags or proposing redirects.
2. JSON-LD address is Casablanca and phone is +212 611-087900. Visible contact/footer say Dakhla, +212 6 60 27 63 34 and +212 6 00 54 98 67. Schema social profiles also differ from visible Instagram/LinkedIn links. Verify business name, address, phones, emails, owned profiles and founding date together.
3. `index.html` has `lang="en"`, but default content is French. The FR/EN toggle changes content at the same URL; metadata remains French; no hreflang is configured. Choose URL-addressable language variants before implementing hreflang. Do not invent Arabic translations or launch English keyword pages without approval.
4. Standard build is `tsc -b && vite build`. react-snap is installed/configured but no build/postbuild script runs it. Current dist contains only the root HTML shell, with an empty root. Page content and metadata require JavaScript. This is **not proof of Google deindexing**; production rendering/indexing needs live and Search Console verification. Prerendering should be evaluated before migration.
5. No sitemap.xml or robots.txt was found in project source/output. Absence of robots.txt alone does not mean crawling is blocked. Server-level rules, redirects, HTTP status codes and indexing are unverified. The SEO component emits index/follow; no catch-all route is configured, so production unknown-path handling needs checking.
6. Conditional accordion panels need crawlable visible content or dedicated URLs when approved. Preserve the existing specific-service navigation and normal top-of-page behavior.
7. Performance work already exists: WebP photos, responsive hero, lazy routes, compressed video. Keep it. Do not modify `src/assets/gallery/`. No new Lighthouse/Core Web Vitals measurement was made in Phase 0.
8. Existing claims such as global coverage, 20+ partner countries, 24/7 availability, timing and market leadership are not validated by this audit. Require real approved evidence before retaining them in new SEO copy or structured data.

## Cluster map and keyword ownership

All paths for new pages are **proposed**, not implemented. Preserve the four current routes. No redirects are approved or presently required by this plan. Broad service terms belong to `/services`; the homepage retains company/brand intent. Supporting guides own distinct question/comparison intent rather than duplicating service landing pages.

| ID | Main keyword from CSV | Supporting keywords from CSV (examples) | Intent / page type | Matching page | B / I → editorial subtotal | Full priority | Evidence |
|---|---|---|---|---|---|---|---|
| C01 | transport national et international maroc | entreprise transport logistique maroc; prestataire logistique maroc; transport b2b maroc | Commercial / service hub | Existing `/services` | 5 / 5 → 15 | No data | Main source_count 3; broad hub needed before specific pages |
| C02 | transport routier maroc | transport national marchandises maroc; transport palettes maroc; groupage routier maroc; devis transport routier maroc | Commercial + transactional / road service | New `/transport-routier` | 5 / 5 → 15 | No data | Main count 3; FTL/LTL and national/international road advertised |
| C03 | fret maritime maroc | groupage maritime maroc; conteneur complet fcl maroc; groupage lcl maroc; devis fret maritime maroc | Commercial + transactional / sea service | New `/transport-maritime` | 5 / 5 → 15 | No data | Main count 3; R1 pallet and fee concerns |
| C04 | fret aérien maroc | devis fret aérien maroc; transport aérien marchandises maroc; poids volumétrique; fret aérien import maroc | Commercial + transactional / air service | New `/transport-aerien` | 5 / 5 → 15 | No data | Main count 3; R1 mode-selection concern |
| C05 | gestion douanière maroc | dédouanement marchandises maroc; accompagnement douane import maroc; devis dédouanement maroc; transitaire import export maroc | Commercial + transactional / customs service | New `/gestion-douaniere` | 5 / 5 → 15 | No data | Main count 2; R2/R3; current copy says specialist partners, not proof of direct broker authorization |
| C06 | devis transport marchandises maroc | devis transport international maroc; devis transport international; enlèvement livraison fret | Transactional / enquiry page | Improve existing `/contact`; do not duplicate with `/demande-de-devis` | 5 / 5 → 15 | No data | Main count 2; R1/R3 shipment details |
| C07 | informations pour devis transport international | informations fournisseur devis transport; poids dimensions marchandise; calcul volume palette transport; incoterm devis transport | Informational / practical checklist | New `/guides/preparer-devis-transport` → `/contact` and `/services` | 4 / 5 → 13 | No data | Main count 1; R1/R3 qualitative support |
| C08 | lcl ou fcl maroc | quelle différence entre lcl et fcl; coût lcl ou fcl; comment choisir entre groupage et conteneur complet | Commercial investigation / comparison | New `/guides/lcl-ou-fcl` → `/transport-maritime` | 4 / 5 → 13 | No data | Main count 2; PAA suggested, not observed |
| C09 | coût total importation maroc | frais transport et douane maroc; frais cachés transport maritime maroc; quelle différence entre droits de douane et frais de transit | Informational + commercial / cost components guide | New `/guides/couts-importation` → `/transport-maritime`, later `/gestion-douaniere` | 4 / 5 → 13 | No data | Main count 2; R1/R2; consumer fee discussions secondary only; specialist review required |
| C10 | documents importation marchandises maroc | documents dédouanement maroc; première importation maroc; erreurs première importation maroc | Informational / first-import checklist | New `/guides/documents-importation-maroc` → `/gestion-douaniere` | 4 / 5 → 13 | No data | Main count 1; R2; current official sources and expert review required |
| C11 | groupage ou camion complet maroc | quelle différence entre ftl et ltl; quand choisir un camion complet plutôt que le groupage | Commercial investigation / comparison | New `/guides/groupage-ou-camion-complet` → `/transport-routier` | 4 / 5 → 13 | No data | Main count 1; proposed questions |
| C12 | fret aérien ou maritime maroc | palette maroc aérien ou maritime; quand choisir le fret aérien plutôt que le fret maritime | Commercial investigation / comparison | New `/guides/fret-aerien-ou-maritime` → both mode pages | 4 / 5 → 13 | No data | Main count 1; R1 |
| C13 | choisir transitaire maroc | comment choisir un transitaire pour importer au maroc; quelle différence entre transporteur transitaire et commissionnaire de transport | Commercial investigation / provider guide | New `/guides/choisir-transitaire-maroc` → `/gestion-douaniere` | 4 / 5 → 13 | No data | Main count 1; R2; clarify company role |

Conditional research groups below are not approved page commitments. A group containing multiple lanes must be split into one useful page per confirmed lane, not published as one generic landing page.

| Group | Candidate main/supporting keywords | Intent / page type | Matching page decision | Priority |
|---|---|---|---|---|
| L01 Dakhla | transport marchandises dakhla; logistique dakhla; transport dakhla casablanca | Commercial / genuine local service | Deferred `/transport-dakhla` only if coverage and unique evidence confirmed; contact remains contact intent | No data; business fit unconfirmed; main source_count 3 |
| L02 Europe lanes | groupage france maroc; transport routier espagne maroc; transport palettes europe maroc | Transactional / lane service | Defer separate France/Spain pages until actual routes and unique operating details are confirmed | No data; main counts 1 |
| L03 China | groupage chine maroc; première importation chine maroc; transitaire chine maroc pme | Transactional + supporting informational / lane and later guide | Deferred `/transport-chine-maroc`; do not promise apparel handling or a China lane from Reddit evidence | No data; main count 1 |
| L04 USA | transport une palette usa maroc; fret usa maroc palettes | Transactional / lane | Deferred `/transport-usa-maroc` pending capability and evidence | No data; main count 1; R1 qualitative signal |
| L05 Turkey | import marchandises turquie maroc | Transactional / lane | Deferred `/transport-turquie-maroc` | No data; count 1 |
| B01 Brand | triways maroc; triways logistics; triways contact | Navigational / company and contact | Existing `/` owns company identity; `/contact` owns branded contact intent; `/qui-sommes-nous` owns company history/trust | No data; brand only, not a non-brand acquisition cluster |
| EN | morocco freight forwarder; customs clearance morocco; sea freight to morocco; air freight morocco quote | Intent follows French equivalent / localized pages | Defer until language strategy approved; map each keyword to its corresponding English page, not one catch-all page | No data; delivery capability and language priority unconfirmed |
| AR | شركة نقل البضائع بالمغرب; التخليص الجمركي المغرب; الشحن البحري إلى المغرب | Intent follows equivalent service / localized pages | Deferred research; no Arabic implementation exists | No data; native-language review required |
| Consulting/training gap | **No validated primary keyword in CSV** | Commercial / consulting service | Keep existing section 03; a new `/conseil-formation-logistique` needs research and offer confirmation first | No data; no invented keyword target |

## Missing pages: evidence-based opportunities, not proven demand

Dedicated road, maritime, air and customs pages are absent; these services currently appear inside the services accordion. The seven supporting guides C07–C13 are also absent. The existing contact route can serve quotation intent, so a second quote page is not necessary initially. Local/route/language pages are conditional, not automatic additions. Consulting/training is a genuine advertised offer with a keyword-research gap.

Start with a combined road page. Split national and international road pages only if validation establishes distinct intent and enough real content; do not launch near-duplicate pages for every variation. Similarly keep LCL/FCL service variants on the maritime service page, with the comparison guide answering a different question.

## Proposed build order and unchecked page checklist

This order is provisional. It resolves the user's “money pages first” and “finish one cluster” instructions by building each cluster's money page before its own supporting content, with a shared hub/conversion foundation first. Each numbered page requires its own approval; no batch implementation is authorized.

- [ ] Confirm canonical host, business facts, service scope, languages and first-page approval. Decide prerendering/locale architecture before code work. Shared technical changes must be explained as necessary to the approved page.
- [ ] 1. `/services` — C01 service hub. **Recommended first:** existing route, directly describes the offers, provides a stable parent for dedicated pages, and avoids choosing an unconfirmed lane or adding homepage keyword overlap.
- [ ] 2. `/contact` — C06 conversion foundation. Resolve H1, address consistency and the mailto/success-state limitation before treating submissions as qualified leads.
- [ ] 3. `/guides/preparer-devis-transport` — C07. Finish quote-support content with real shipment-input examples. Link back to contact/hub.
- [ ] 4. `/transport-maritime` — C03 money page, after confirming the offering and priority.
- [ ] 5. `/guides/lcl-ou-fcl` — C08 commercial comparison; link to maritime money page.
- [ ] 6. `/guides/couts-importation` — C09 educational support with an approved cost example and reviewed customs context. Initially link to maritime/contact and existing customs section; add dedicated customs link when it exists. Finish maritime cluster.
- [ ] 7. `/gestion-douaniere` — C05 money page; state direct-versus-partner responsibilities truthfully.
- [ ] 8. `/guides/choisir-transitaire-maroc` — C13 commercial support.
- [ ] 9. `/guides/documents-importation-maroc` — C10 educational support; finish customs cluster after expert review.
- [ ] 10. `/transport-routier` — C02 money page; cover national/international within verified scope.
- [ ] 11. `/guides/groupage-ou-camion-complet` — C11 comparison. Include approved pallet-preparation guidance on the service page; finish road cluster.
- [ ] 12. `/transport-aerien` — C04 money page.
- [ ] 13. `/guides/fret-aerien-ou-maritime` — C12 comparison. Link to both existing mode pages; finish air cluster.
- [ ] 14. `/` — brand/company introduction, linking to money pages without adopting their primary targets.
- [ ] 15. `/qui-sommes-nous` — verified company history, team/process evidence and credentials.
- [ ] Deferred: consulting/training service page after keyword validation.
- [ ] Deferred: Dakhla page and separately validated lane pages, one cluster at a time.
- [ ] Deferred: URL-addressable English equivalents; Arabic only after explicit approval and native review.

Maritime precedes road provisionally because R1–R3 provide useful small-business import questions and maritime/quote topics recur across the supplied research. This is not a volume or revenue finding; the owner's service priority can change the order.

## Internal links and content evidence

`Homepage → services hub → dedicated service → relevant guide → same service → contact`. Guides may link across modes only when useful; avoid links to unbuilt pages. Keep distinct primary ownership: hub = broad offer, service = mode/clearance, guide = question/comparison, contact = enquiry, about = company trust.

For Phase 1, request real approved shipment examples, inclusions/exclusions, actual geographic coverage, responsibilities, customer questions and reviewable credentials. Use `[ADD REAL: ...]` only in the review draft where evidence is missing, never invent results or testimonials. Competitor omissions are **not yet established**: files 02/06 contain selected reference pages, not full competitor gap audits. Validate the relevant page and search intent before writing each brief.

## Blocking questions / approval

1. Which live canonical domain is correct, and what are the approved business name, address, phone numbers, emails, social profiles and founding year? The site and research disagree.
2. Is the goal qualified B2B quote enquiries, and which service should lead? Confirm actual modes/lanes and whether customs work is delivered by partners as the current copy says.
3. Should French be primary with English on separate URLs, and should Arabic remain out of scope for now?
4. Is this a new or established site, and are actual GSC exports/keyword measurements available? If not, may we proceed with all metrics explicitly marked No data?
5. Approve this provisional plan and `/services` as the first page, subject to resolving the above?

Stopped after Phase 0 as requested. All page work remains unchecked. Original research and keyword CSV remain unchanged.

## Exhaustive CSV disposition

The appendix below assigns every original CSV row exactly once to a topic group or explicit hold/exclusion. It preserves exact keywords and their original source labels/counts; numbering is one-based data-row numbering, excluding the header. Group ownership follows the map above. English/Arabic groups and conditional lanes remain research backlogs, not approved primary targets. Broad supporting terms are not additional pages. X05 belongs as a section in C07.

### C01 Service overview

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 5 | transport national et international maroc | Autocomplete; PeopleAlsoSearch; AI | 3 |
| 58 | commissionnaire de transport maroc | Autocomplete | 1 |
| 98 | entreprise transport logistique maroc | Autocomplete | 1 |
| 141 | import export maroc | GSC | 1 |
| 176 | prestataire logistique maroc | Autocomplete | 1 |
| 177 | prestataire transport international | PeopleAlsoSearch | 1 |
| 221 | société logistique maroc | PeopleAlsoSearch | 1 |
| 222 | société transport marchandises maroc | Autocomplete | 1 |
| 236 | transport b2b maroc | PeopleAlsoSearch | 1 |
| 244 | transport international | GSC | 1 |
| 245 | transport international marchandises maroc | Autocomplete | 1 |
| 248 | transport marchandises maroc | GSC | 1 |
| 266 | transporteur marchandises maroc | PeopleAlsoSearch | 1 |

### C02 Road freight

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 6 | transport routier maroc | Autocomplete; PeopleAlsoSearch; AI | 3 |
| 13 | groupage routier maroc | Autocomplete; AI | 2 |
| 18 | transport national marchandises maroc | Autocomplete; AI | 2 |
| 19 | transport palettes | GSC; PeopleAlsoSearch | 2 |
| 20 | transport palettes maroc | Autocomplete; AI | 2 |
| 24 | affrètement camion maroc | Autocomplete | 1 |
| 25 | affrètement maroc | Autocomplete | 1 |
| 26 | affrètement national | PeopleAlsoSearch | 1 |
| 34 | camion complet | PeopleAlsoSearch | 1 |
| 39 | combien coûte le transport d’une palette au maroc | PAA | 1 |
| 53 | comment préparer des palettes pour un transport routier | PAA | 1 |
| 82 | devis transport national | PeopleAlsoSearch | 1 |
| 83 | devis transport routier maroc | Autocomplete | 1 |
| 134 | groupage routier | PeopleAlsoSearch | 1 |
| 154 | livraison marchandises entreprise | PeopleAlsoSearch | 1 |
| 180 | prix transport palette maroc | Autocomplete | 1 |
| 197 | quels documents accompagnent un transport de marchandises | PAA | 1 |
| 237 | transport camion complet maroc | Autocomplete | 1 |
| 243 | transport ftl maroc | Autocomplete | 1 |
| 246 | transport ltl maroc | Autocomplete | 1 |
| 255 | transport national | GSC | 1 |
| 256 | transport national complet | Autocomplete | 1 |
| 262 | transport routier import maroc | PeopleAlsoSearch | 1 |
| 263 | transport routier international maroc | AI | 1 |
| 264 | transport routier marchandises maroc | Autocomplete | 1 |

### C03 Sea freight

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 2 | fret maritime maroc | Autocomplete; PeopleAlsoSearch; AI | 3 |
| 3 | groupage maritime maroc | Autocomplete; PeopleAlsoSearch; AI | 3 |
| 7 | conteneur complet fcl maroc | Autocomplete; AI | 2 |
| 11 | fret maritime | GSC; PeopleAlsoSearch | 2 |
| 59 | consolidation marchandises | PeopleAlsoSearch | 1 |
| 61 | conteneur fcl | PeopleAlsoSearch | 1 |
| 64 | cotation maritime | PeopleAlsoSearch | 1 |
| 68 | coût transport conteneur maroc | Autocomplete | 1 |
| 76 | devis fret maritime maroc | Autocomplete | 1 |
| 77 | devis groupage | Autocomplete | 1 |
| 94 | dégroupage conteneur | PeopleAlsoSearch | 1 |
| 129 | groupage lcl | PeopleAlsoSearch | 1 |
| 130 | groupage lcl maroc | Autocomplete | 1 |
| 131 | groupage maritime | GSC | 1 |
| 132 | groupage maritime maroc devis | Autocomplete | 1 |
| 169 | petits volumes import | PeopleAlsoSearch | 1 |
| 179 | prix groupage maritime maroc | Autocomplete | 1 |
| 186 | quel délai prévoir pour un transport maritime vers le maroc | PAA | 1 |
| 238 | transport conteneur import | PeopleAlsoSearch | 1 |
| 250 | transport maritime | PeopleAlsoSearch | 1 |
| 251 | transport maritime conteneur maroc | Autocomplete | 1 |
| 252 | transport maritime export maroc | Autocomplete | 1 |
| 253 | transport maritime import maroc | Autocomplete | 1 |

### C04 Air freight

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 1 | fret aérien maroc | Autocomplete; PeopleAlsoSearch; AI | 3 |
| 50 | comment le poids volumétrique influence-t-il un devis aérien | PAA | 1 |
| 63 | cotation fret aérien | PeopleAlsoSearch | 1 |
| 75 | devis fret aérien maroc | Autocomplete | 1 |
| 101 | expédition palettes avion | PeopleAlsoSearch | 1 |
| 102 | expédition urgente marchandises maroc | Autocomplete | 1 |
| 113 | fret aerien | GSC | 1 |
| 114 | fret aérien | GSC | 1 |
| 115 | fret aérien export maroc | Autocomplete | 1 |
| 116 | fret aérien import maroc | Autocomplete | 1 |
| 117 | fret aérien maroc devis | Autocomplete | 1 |
| 120 | fret ou express | Autocomplete | 1 |
| 121 | fret urgent entreprise | PeopleAlsoSearch | 1 |
| 155 | lta transport | PeopleAlsoSearch | 1 |
| 170 | peut-on expédier une palette par avion vers le maroc | PAA | 1 |
| 172 | poids volumétrique | PeopleAlsoSearch | 1 |
| 189 | quelle différence entre fret aérien et colis express | PAA | 1 |
| 203 | quels éléments influencent le prix du fret aérien | PAA | 1 |
| 234 | transport aérien marchandises | GSC | 1 |
| 235 | transport aérien marchandises maroc | Autocomplete | 1 |

### C05 Customs management

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 12 | gestion douanière maroc | Autocomplete; AI | 2 |
| 16 | transitaire maroc | Autocomplete; PeopleAlsoSearch | 2 |
| 22 | accompagnement douane import maroc | Autocomplete | 1 |
| 23 | accompagnement import export | PeopleAlsoSearch | 1 |
| 74 | devis dédouanement maroc | Autocomplete | 1 |
| 92 | dédouanement commercial | PeopleAlsoSearch | 1 |
| 93 | dédouanement marchandises maroc | Autocomplete | 1 |
| 123 | gestion douanière | PeopleAlsoSearch | 1 |
| 184 | que faire lorsqu’une marchandise est bloquée en douane | PAA | 1 |
| 228 | transit douane | GSC | 1 |
| 233 | transitaire import export maroc | Autocomplete | 1 |

### C06 Quote/contact

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 9 | devis transport international | Autocomplete; PeopleAlsoSearch | 2 |
| 10 | devis transport marchandises maroc | Autocomplete; AI | 2 |
| 79 | devis porte à porte maroc | PeopleAlsoSearch | 1 |
| 81 | devis transport international maroc | AI | 1 |
| 96 | enlèvement livraison fret | PeopleAlsoSearch | 1 |
| 260 | transport porte à porte maroc | Reddit | 1 |

### C07 Quote preparation guide

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 31 | assurance marchandises | PeopleAlsoSearch | 1 |
| 33 | calcul volume palette transport | Reddit | 1 |
| 42 | comment calculer le volume d’un envoi en mètres cubes | PAA | 1 |
| 54 | comment préparer une demande de devis pour exporter du maroc | PAA | 1 |
| 56 | comment suivre une expédition internationale | PAA | 1 |
| 145 | incoterm devis transport | PeopleAlsoSearch | 1 |
| 146 | informations fournisseur devis transport | Reddit | 1 |
| 147 | informations pour devis transport | AI | 1 |
| 148 | informations pour devis transport international | Autocomplete | 1 |
| 171 | poids dimensions marchandise | PeopleAlsoSearch | 1 |
| 183 | que couvre l’assurance transport et quelles exclusions vérifier | PAA | 1 |
| 195 | quelles informations fournir pour obtenir un devis de transport | PAA | 1 |
| 200 | quels délais distinguer entre départ transit et livraison finale | PAA | 1 |

### C08 LCL versus FCL guide

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 14 | lcl ou fcl maroc | Autocomplete; AI | 2 |
| 43 | comment choisir entre groupage et conteneur complet | PAA | 1 |
| 67 | coût lcl ou fcl | PeopleAlsoSearch | 1 |
| 191 | quelle différence entre lcl et fcl | PAA | 1 |

### C09 Total cost/comparing quotes guide

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 8 | coût total importation maroc | Reddit; AI | 2 |
| 41 | comment anticiper les frais de stockage à l’arrivée | PAA | 1 |
| 46 | comment comparer deux devis de transport international | PAA | 1 |
| 57 | comment vérifier les prestations incluses dans un devis logistique | PAA | 1 |
| 105 | frais cachés transport maritime maroc | Reddit | 1 |
| 106 | frais de transit | PeopleAlsoSearch | 1 |
| 107 | frais inclus transport | PeopleAlsoSearch | 1 |
| 108 | frais portuaires transport | PeopleAlsoSearch | 1 |
| 109 | frais transit maroc | Autocomplete | 1 |
| 110 | frais transit ou droits douane maroc | Reddit | 1 |
| 111 | frais transport et douane maroc | Autocomplete | 1 |
| 188 | quelle différence entre droits de douane et frais de transit | PAA | 1 |
| 201 | quels frais peuvent s’ajouter au fret maritime | PAA | 1 |

### C10 First import/documents guide

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 49 | comment identifier les contrôles applicables à mon produit | PAA | 1 |
| 55 | comment préparer une première importation au maroc | PAA | 1 |
| 86 | documents dédouanement maroc | Autocomplete | 1 |
| 87 | documents fournisseur import | PeopleAlsoSearch | 1 |
| 88 | documents importation | PeopleAlsoSearch | 1 |
| 89 | documents importation marchandises maroc | Reddit | 1 |
| 99 | erreurs première importation maroc | Reddit | 1 |
| 174 | première importation maroc | PeopleAlsoSearch | 1 |
| 187 | quel rôle joue portnet dans une opération d’importation | PAA | 1 |
| 198 | quels documents demander au fournisseur avant l’expédition | PAA | 1 |
| 204 | qui organise le dédouanement selon les conditions de vente | PAA | 1 |

### C11 Road groupage versus full truck guide

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 133 | groupage ou camion complet maroc | Autocomplete | 1 |
| 182 | quand choisir un camion complet plutôt que le groupage | PAA | 1 |
| 190 | quelle différence entre ftl et ltl | PAA | 1 |

### C12 Air versus sea guide

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 47 | comment comparer le coût total de plusieurs modes de transport | PAA | 1 |
| 118 | fret aérien ou maritime maroc | Autocomplete | 1 |
| 156 | maritime ou aérien | Autocomplete | 1 |
| 167 | palette maroc aérien ou maritime | Reddit | 1 |
| 181 | quand choisir le fret aérien plutôt que le fret maritime | PAA | 1 |

### C13 Choosing a logistics provider guide

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 37 | choisir transitaire maroc | Reddit | 1 |
| 44 | comment choisir un transitaire pour importer au maroc | PAA | 1 |
| 45 | comment choisir une entreprise de transport international au maroc | PAA | 1 |
| 192 | quelle différence entre transporteur transitaire et commissionnaire de transport | PAA | 1 |

### L01 Dakhla (conditional)

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 4 | transport marchandises dakhla | Autocomplete; PeopleAlsoSearch; AI | 3 |
| 15 | logistique dakhla | Autocomplete; PeopleAlsoSearch | 2 |
| 17 | transport dakhla casablanca | Autocomplete; PeopleAlsoSearch | 2 |
| 52 | comment organiser un transport de marchandises vers dakhla | PAA | 1 |
| 80 | devis transport dakhla | PeopleAlsoSearch | 1 |
| 97 | entreprise logistique dakhla | PeopleAlsoSearch | 1 |
| 231 | transitaire dakhla | Autocomplete | 1 |
| 232 | transitaire dakhla maroc | Autocomplete | 1 |
| 249 | transport marchandises tanger dakhla | Autocomplete | 1 |
| 257 | transport palettes casablanca dakhla | Autocomplete | 1 |
| 258 | transport palettes dakhla | PeopleAlsoSearch | 1 |

### L02 Europe/France/Spain lanes (conditional)

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 51 | comment organiser du groupage entre la france et le maroc | PAA | 1 |
| 126 | groupage espagne maroc | PeopleAlsoSearch | 1 |
| 128 | groupage france maroc | Autocomplete | 1 |
| 196 | quelles informations fournir pour un transport espagne maroc | PAA | 1 |
| 239 | transport europe maroc | PeopleAlsoSearch | 1 |
| 240 | transport export europe | PeopleAlsoSearch | 1 |
| 242 | transport france maroc palettes | PeopleAlsoSearch | 1 |
| 247 | transport marchandises france maroc | Autocomplete | 1 |
| 254 | transport maroc europe | GSC | 1 |
| 259 | transport palettes europe maroc | Autocomplete | 1 |
| 261 | transport routier espagne maroc | Autocomplete | 1 |

### L03 China lane/imports (conditional)

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 78 | devis maritime chine maroc | PeopleAlsoSearch | 1 |
| 119 | fret maritime chine maroc | Autocomplete | 1 |
| 124 | groupage chine maroc | Autocomplete | 1 |
| 127 | groupage fournisseurs chine | PeopleAlsoSearch | 1 |
| 140 | import chine maroc | PeopleAlsoSearch | 1 |
| 143 | importer vêtements chine maroc | Reddit | 1 |
| 173 | première importation chine maroc | Reddit | 1 |
| 199 | quels documents faut-il vérifier avant d’importer de chine | PAA | 1 |
| 202 | quels frais vérifier pour importer des vêtements de chine au maroc | PAA | 1 |
| 230 | transitaire chine maroc pme | Reddit | 1 |
| 241 | transport fournisseur chine | PeopleAlsoSearch | 1 |

### L04 USA lane (conditional)

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 48 | comment expédier une ou deux palettes des états-unis vers le maroc | PAA | 1 |
| 122 | fret usa maroc palettes | Autocomplete | 1 |
| 265 | transport une palette usa maroc | Reddit | 1 |

### L05 Turkey lane (conditional)

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 142 | import marchandises turquie maroc | Autocomplete | 1 |

### B01 Own-brand navigation (not a non-brand target)

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 21 | triways maroc | GSC; Autocomplete | 2 |
| 267 | tri ways | GSC | 1 |
| 268 | triway | GSC | 1 |
| 269 | triways | GSC | 1 |
| 270 | triways contact | Autocomplete | 1 |
| 271 | triways logistics | GSC | 1 |
| 272 | triways logistique | GSC | 1 |
| 273 | triways logistique solutions | Autocomplete | 1 |
| 274 | triways transport maroc | Autocomplete | 1 |
| 275 | triwaysslogistics | GSC | 1 |
| 276 | triwaysslogistics.com | Autocomplete | 1 |

### EN English equivalents (language rollout deferred)

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 27 | air freight morocco quote | Autocomplete | 1 |
| 28 | air vs sea freight morocco pallets | Reddit | 1 |
| 38 | choose customs broker morocco | Reddit | 1 |
| 69 | customs clearance morocco | Autocomplete | 1 |
| 90 | door to door freight morocco | Reddit | 1 |
| 104 | first import china to morocco | Reddit | 1 |
| 112 | freight forwarder morocco small business | Reddit | 1 |
| 139 | import activewear china morocco | Reddit | 1 |
| 160 | morocco freight forwarder | Autocomplete | 1 |
| 161 | morocco import documents | Reddit | 1 |
| 162 | morocco importing mistakes | Reddit | 1 |
| 163 | morocco landed cost components | Reddit | 1 |
| 164 | morocco road freight quote | Autocomplete | 1 |
| 165 | morocco shipping additional fees | Reddit | 1 |
| 168 | pallet dimensions freight quote | Reddit | 1 |
| 205 | sea freight to morocco | Autocomplete | 1 |
| 206 | ship one pallet to morocco | Reddit | 1 |
| 209 | shipping pallets to morocco | Autocomplete | 1 |
| 224 | supplier details freight quote | Reddit | 1 |

### AR Arabic/Darija research (language rollout deferred)

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 36 | ch7al taman transport palette lmaghrib | Reddit | 1 |
| 151 | kifach nimporti men chine lmaghrib | Reddit | 1 |
| 280 | التخليص الجمركي المغرب | Autocomplete | 1 |
| 281 | الشحن البحري إلى المغرب | Autocomplete | 1 |
| 282 | الشحن الجوي المغرب | Autocomplete | 1 |
| 283 | النقل الدولي للبضائع المغرب | Autocomplete | 1 |
| 284 | شركة نقل البضائع بالمغرب | Autocomplete | 1 |
| 285 | شنو الفرق بين مصاريف الترانزيت والديوانة | Reddit | 1 |
| 286 | شنو الوثائق باش نستورد السلعة للمغرب | Reddit | 1 |
| 287 | نقل البضائع الداخلة | Autocomplete | 1 |

### X01 Broad standalone filters (not primary targets)

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 35 | casablanca | GSC | 1 |
| 40 | comment | GSC | 1 |
| 60 | conteneur | GSC | 1 |
| 62 | cotation | GSC | 1 |
| 65 | cout | GSC | 1 |
| 66 | coût | GSC | 1 |
| 70 | dakhla | GSC | 1 |
| 71 | dedouanement | GSC | 1 |
| 72 | delai | GSC | 1 |
| 73 | devis | GSC | 1 |
| 84 | différence | GSC | 1 |
| 85 | documents | GSC | 1 |
| 91 | dédouanement | GSC | 1 |
| 95 | délai | GSC | 1 |
| 103 | fcl | GSC | 1 |
| 153 | lcl | GSC | 1 |
| 157 | maroc | GSC | 1 |
| 178 | prix | GSC | 1 |
| 225 | tanger | GSC | 1 |
| 226 | tarif | GSC | 1 |
| 229 | transitaire | GSC | 1 |

### X02 Competitor names/research operators (exclude targeting)

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 29 | anfa cargo | Autocomplete | 1 |
| 137 | ics | Autocomplete | 1 |
| 152 | la voie express | Autocomplete | 1 |
| 158 | maroc transport international timar sjl la voie express logistique | Autocomplete | 1 |
| 210 | site:reddit.com maroc transitaire | Reddit | 1 |
| 211 | site:reddit.com morocco lcl | Reddit | 1 |
| 212 | site:reddit.com/r/casablanca importing | Reddit | 1 |
| 213 | site:reddit.com/r/morocco customs business | Reddit | 1 |
| 214 | site:reddit.com/r/morocco freight | Reddit | 1 |
| 215 | site:reddit.com/r/morocco pallets | Reddit | 1 |
| 216 | site:reddit.com/r/moroccopreneur shipping | Reddit | 1 |
| 217 | site:triwaysslogistics.com | Autocomplete | 1 |
| 218 | sjl | Autocomplete | 1 |
| 219 | sline | Autocomplete | 1 |
| 220 | sntl | Autocomplete | 1 |
| 227 | timar | Autocomplete | 1 |

### X03 Consumer parcels (scope unconfirmed; hold)

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 100 | expédier produits maroc international | Reddit | 1 |
| 149 | is it normal to pay 750 mad in transit fees for a 130 mad product held in customs | Reddit | 1 |
| 159 | morocco brokerage vs customs charges | Reddit | 1 |
| 166 | package stuck at customs | Reddit | 1 |
| 207 | ship products internationally from morocco | Reddit | 1 |

### X04 Research prompts/excerpts/topic titles (brief evidence only)

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 30 | any common mistakes i should avoid or things you wish you knew before starting | Reddit | 1 |
| 125 | groupage chine maroc france maroc | AI | 1 |
| 135 | how do you guys ship internationally | Reddit | 1 |
| 136 | i'm especially interested in things like customs shipping taxes required documents finding a customs broker and any common mistakes to avoid | Reddit | 1 |
| 138 | if you also have tips about hidden fees customs brokerage port fees storage etc i’d really appreciate it | Reddit | 1 |
| 144 | importing from china to morocco what should i be careful about | Reddit | 1 |
| 150 | je cherche un prestataire de groupage maritime au maroc comment comparer les offres | AI | 1 |
| 175 | preparing your first china morocco shipment | Reddit | 1 |
| 185 | que fait triways au maroc et quel est son site officiel | AI | 1 |
| 193 | quelle entreprise contacter pour transporter des palettes au maroc | AI | 1 |
| 194 | quelles entreprises proposent du transport national et international de marchandises au maroc | AI | 1 |
| 208 | shipping from usa morocco | Reddit | 1 |
| 223 | starting an import business in morocco from china need advice | Reddit | 1 |
| 277 | understanding the full shipment cost | Reddit | 1 |
| 278 | what to include in a freight quotation request | Reddit | 1 |
| 279 | which morocco freight forwarders handle small business shipments | AI | 1 |

### X05 Volume calculation (support section, not another page)

| CSV row | Keyword | Sources | Source count |
|---|---|---|---|
| 32 | calcul cbm | PeopleAlsoSearch | 1 |

## External technical reference

Google recommends separate URLs for language versions and annotations for their relationships: [Managing multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites), checked 10 November 2026. Live search rankings, competitors and the deployed Triways site have not been re-audited in this phase.
