import type { VariantDetail } from "./types";

/**
 * Variant details (English). Same order as the `variants` lists in `en.ts`
 * and as `variant-details.tr.ts`.
 */

function group(labels: string[]) {
  return (
    values: string[],
    bestFor: string[],
    pros: string[],
    watch: string,
  ): VariantDetail => ({
    specs: labels.map((label, index) => ({ label, value: values[index] })),
    bestFor,
    pros,
    watch,
  });
}

const sign = group(["Case", "Face", "Lighting", "Typical lifespan"]);
const letter = group(["Body", "Face", "Lighting", "Recommended letter height"]);
const totem = group(["Body", "Height", "Lighting", "Foundation"]);
const box = group(["Frame", "Face", "Lighting", "Changing the graphic"]);
const facade = group(["Material", "Substructure", "Durability", "Typical lifespan"]);
const wrap = group(["Film", "Coverage", "Application time", "Typical lifespan"]);
const print = group(["Material", "Printing", "Use", "Typical lifespan"]);
const brand = group(["Deliverables", "File formats", "Revisions", "Timeline"]);
const label = group(["Material", "Adhesive", "Cutting", "Durability"]);
const work = group(["Scope", "Equipment", "Outcome", "Timeline"]);
const road = group(["Panel", "Support", "Reflectivity", "Foundation"]);
const led = group(["Pixel pitch", "Brightness", "Protection", "Content control"]);

export const variantDetailsEn: Record<string, VariantDetail[]> = {
  "isikli-tabela": [
    sign(
      ["4 mm aluminium composite (ACP)", "3 mm opal acrylic, cut vinyl or UV print", "Internal SMD LED modules, 12 V, IP65", "Case 10+ years, LEDs 30,000–50,000 hours"],
      ["High-street shops", "Pharmacies, salons, cafés", "Shops that need to be read at night"],
      ["The best balance of cost and durability", "When the face ages, the case stays and only the acrylic is replaced", "Reads equally well by day and night"],
      "Above about 3 metres the acrylic needs a joint; for a seamless face consider a vinyl face instead.",
    ),
    sign(
      ["Aluminium composite or galvanised steel", "Printed translucent tensioned vinyl", "Internal LED modules", "Vinyl 3–5 years, case 10+ years"],
      ["Wide façades", "Supermarkets, dealers, fuel stations", "Brands that refresh their artwork often"],
      ["Very large sizes with no joints", "Lower cost per square metre than acrylic", "Artwork is replaced without removing the case"],
      "Vinyl can slacken over the years; check the tension every few years.",
    ),
    sign(
      ["Aluminium", "Heat-formed embossed acrylic", "Internal LED modules", "10+ years"],
      ["Chain brands and dealers", "Bank and fuel station branches", "Brands with a strong logo"],
      ["The logo stands proud of the face in 3D", "One mould gives an identical sign at every branch", "Strong impact by day and night"],
      "Tooling is expensive for a single sign; it pays off when several are made.",
    ),
    sign(
      ["Aluminium composite", "Cut vinyl or digital print", "None", "8–10 years"],
      ["Shops inside arcades", "Façades that are already well lit", "Tight budgets"],
      ["The most affordable box sign", "No electrical work needed", "Practically maintenance-free"],
      "Not visible at night; if you trade in the evening add a spotlight above it.",
    ),
    sign(
      ["Aluminium, double-sided", "Acrylic or vinyl, both faces", "Internal LED modules", "10+ years"],
      ["Shops on narrow streets", "Pharmacies, cafés, salons", "Extra visibility on top of a fascia sign"],
      ["Seen by pedestrians metres before they reach the shop", "Reads from both directions", "Big effect from a small size"],
      "Signs projecting over the pavement must respect the council's projection limits.",
    ),
    sign(
      ["Stainless steel, mirror or satin", "Acrylic or cut metal", "Internal LED or halo", "15+ years"],
      ["Hotels, office towers, corporate buildings", "Jewellers", "Seafront façades"],
      ["Does not rust in sea air", "The weight of metal gives a premium look", "Never peels or fades"],
      "Mirror finish shows fingerprints and dirt and needs regular cleaning; satin shows less.",
    ),
    sign(
      ["Acrylic backboard or direct to wall", "Silicone LED neon flex", "12/24 V LED neon", "30,000+ hours"],
      ["Cafés, bars, restaurants", "Photo spots", "Brands aimed at a young audience"],
      ["The look of classic neon, unbreakable and low-energy", "Bent by hand into any word or drawing", "Low voltage and safe"],
      "Very tight curves are not possible; handwritten designs need simplifying.",
    ),
    sign(
      ["Wood-grain composite or real timber cladding", "Acrylic or cut letters", "Letter-lit or halo LED", "10+ years"],
      ["Cafés, bakeries, boutiques", "Natural-concept shops", "Hotels and restaurants"],
      ["Warm, natural look", "Illuminated letters keep it legible at night", "The composite option never rots or attracts insects"],
      "Real timber outdoors needs regular varnishing; choose composite if you want no maintenance.",
    ),
    sign(
      ["Slim aluminium", "Backlit film + acrylic", "Edge-lit LED", "8+ years"],
      ["Shops with display windows", "Estate and travel agents", "Pharmacies and opticians"],
      ["Protected from rain and sun, so it lasts", "Graphics are easy to change", "A professional look in the window"],
      "Reflections on the glass can reduce legibility; choose the brightness accordingly.",
    ),
  ],

  "kutu-harf-tabela": [
    letter(
      ["Aluminium returns, oven-painted", "3 mm opal acrylic", "Front-lit, LEDs inside the letter", "25 cm and up"],
      ["Corporate façades", "Shop and branch signs", "Businesses that must read at night"],
      ["The most common and easiest to maintain", "The widest choice of colours", "Individually mounted, so the façade stays visible"],
      "LEDs will not fit in letters under about 20 cm; for small text PVC foam or chrome letters are better.",
    ),
    letter(
      ["Stainless chrome sheet, mirror or satin", "Chrome, opaque", "None, or halo from behind", "10 cm and up"],
      ["Jewellers, hotels, office entrances", "Reception walls", "Brands wanting a prestige feel"],
      ["Premium look from polished metal", "Stainless and long-lasting outdoors", "Can be made in small sizes too"],
      "It does not light from the front; add halo lighting to be read at night.",
    ),
    letter(
      ["Chrome trim returns", "Opal acrylic", "Front-lit, LEDs inside", "20 cm and up"],
      ["Illuminated letters with a metal frame", "Shopping mall stores", "Corporate office façades"],
      ["Combines a lit face with a chrome frame", "Metal shine by day, glowing face by night", "Edges are tougher against knocks"],
      "The chrome trim is hand-made, so it costs more than a standard letter and adds 1–2 days.",
    ),
    letter(
      ["Chrome sheet", "Chrome, closed", "LEDs washing down onto the wall", "15 cm and up"],
      ["Restaurants and boutique hotels", "Façades where evening mood matters", "Decorative interior lettering"],
      ["No direct glare, just a soft glow", "Chrome by day, dramatic by night", "Brings out the texture of the wall"],
      "Legibility depends on the wall colour; on dark walls the reflected light is weak.",
    ),
    letter(
      ["5–20 mm PVC foam board, CNC cut", "Painted or vinyl-covered", "None", "3 cm and up"],
      ["Interior wall lettering", "Office and clinic receptions", "Low-budget façade lettering"],
      ["The most affordable letter type", "Fine detail even at very small sizes", "Light; can be fixed with tape"],
      "Colours can fade in strong sun; outdoors use UV-resistant paint or vinyl.",
    ),
    letter(
      ["Aluminium or chrome, open back", "Closed metal", "LEDs shining back onto the wall", "25 cm and up"],
      ["Premium brands and showrooms", "Office entrances", "Minimal façade designs"],
      ["An elegant ring of light behind each letter", "Metal by day, silhouette by night", "Stands 3–5 cm off the wall for depth"],
      "The wall must be light and smooth; on rough or dark surfaces the halo disappears.",
    ),
    letter(
      ["Aluminium returns", "Opal acrylic", "LEDs to the front and the back", "30 cm and up"],
      ["Main streets and junctions", "Brands that must be seen from afar", "Businesses busy at night"],
      ["Front legibility plus a halo in one", "The strongest channel letter at night", "Adds depth to the façade"],
      "Two LED circuits mean higher consumption and cost than a standard letter.",
    ),
    letter(
      ["Aluminium, no trim cap", "Acrylic set flush into the returns", "Front-lit, even LED", "20 cm and up"],
      ["Modern, minimal brand identities", "Mall and tech stores", "Façades viewed up close"],
      ["No visible frame, so each letter reads as one piece", "More faithful to thin typefaces", "The cleanest result up close"],
      "Needs precise bonding and polishing; costs more than a standard letter.",
    ),
    letter(
      ["Aluminium, stainless or acrylic", "Painted or metal", "None; can be lit by external spotlights", "10 cm and up"],
      ["Daytime businesses", "Bright façades and arcades", "Building names and numbers"],
      ["No electrical work", "More affordable than illuminated letters", "Practically maintenance-free"],
      "Not readable at night; add façade spotlights if it must be seen in the evening.",
    ),
  ],

  "totem-tabela": [
    totem(
      ["Steel frame + ACP cladding", "2–6 m", "Internal LED, single or double-sided", "Reinforced concrete with anchor bolts"],
      ["Roadside businesses", "Car park entrances", "Shops not visible from the street"],
      ["Double-sided reads for traffic from both directions", "Visible 24/7", "Brings the brand down to road level"],
      "Totems over 3 metres need a wind-load calculation and a council permit.",
    ),
    totem(
      ["Steel frame, interchangeable cassettes", "2–5 m", "LEDs in each cassette", "Reinforced concrete"],
      ["Office and business centres with several companies", "Mall entrances", "Buildings with changing tenants"],
      ["When a tenant changes only their cassette is replaced", "Many brands look tidy on one totem", "Lowest refresh cost over time"],
      "Cassette sizes should be standardised from the start; adding different sizes later is hard.",
    ),
    totem(
      ["Single block, ACP or composite cladding", "1.5–4 m", "LED or halo on the logo", "Reinforced concrete"],
      ["Corporate headquarters", "Hotel and hospital entrances", "Projects that want architectural unity"],
      ["A seamless, sculptural look", "Can match the building's architecture", "Strong prestige"],
      "Because it reads as one piece, repairing surface damage can affect the whole panel.",
    ),
    totem(
      ["Steel frame + ACP", "5–12 m", "Internal LED + LED price modules", "Deep reinforced concrete, engineered"],
      ["Fuel stations", "LPG and charging stations", "Roadside service areas"],
      ["Prices change by remote or software", "Digits sized to be read from a distance", "Built to the fuel brand's identity standard"],
      "The fuel brand's approval and a structural design are required; they usually set the timeline.",
    ),
    totem(
      ["Stone, composite or corten-look cladding", "1–3 m", "Halo letters or ground spotlights", "Reinforced concrete"],
      ["Residential developments", "Villa projects", "Gated communities"],
      ["Presents the project name in step with the architecture", "Adds to the perceived value", "Low maintenance"],
      "Sales-period and permanent needs differ; choose materials for permanent use.",
    ),
    totem(
      ["Aluminium profile + ACP", "1.2–2.5 m", "Optional internal LED", "Anchored to the ground"],
      ["Hospital and university campuses", "Industrial zones", "Large estate and mall car parks"],
      ["Guides visitors without them having to ask", "Map, arrows and building list on one face", "Suits series production with one design"],
      "The wayfinding plan (what goes where) must be settled before production.",
    ),
    totem(
      ["Aluminium, 8–15 cm deep", "1.5–3 m", "Edge LED or unlit", "Embedded anchor plate"],
      ["Narrow pavements and building fronts", "Showroom and office entrances", "Modern architecture"],
      ["Takes little space and keeps walkways clear", "Elegant, modern look", "Light, so a small foundation is enough"],
      "The slim body needs stronger anchoring in windy open areas.",
    ),
  ],

  "lightbox-tabela": [
    box(
      ["Aluminium profile, 3–12 cm", "Silicone-edged fabric print", "Edge or back-lit LED", "Minutes — pull the fabric out and push the new one in"],
      ["Large in-store graphics", "Brands with frequent campaigns", "Showrooms and exhibitions"],
      ["Very large sizes with no joints", "Graphics are cheap and quick to replace", "Even light distribution"],
      "Fabric is for indoors; outside it is affected by damp and dust.",
    ),
    box(
      ["Aluminium, 3–5 cm", "Opal acrylic + backlit film", "Edge-lit LED", "Open the front cover and swap the film"],
      ["Shop windows", "Pharmacies and opticians", "Walls behind the counter"],
      ["Very slim, sits flat on the wall", "Wipe-clean acrylic face", "Low energy use"],
      "Being edge-lit, the centre can look dimmer on sizes over about 1.5 m.",
    ),
    box(
      ["Aluminium, open on both sides", "Acrylic or fabric, two faces", "Internal LED", "Each face changes separately"],
      ["Mall corridors", "In-store department signs", "Ceiling-hung wayfinding"],
      ["Seen by people coming from both directions", "Hangs from the ceiling, so it takes no floor space", "Catches the eye from afar"],
      "Check the ceiling support and power point in advance.",
    ),
    box(
      ["Aluminium, modular", "Sectioned backlit film", "Internal LED", "Section by section — only the changed film is reprinted"],
      ["Cafés and restaurants", "Fast food and kiosks", "Bakeries and patisseries"],
      ["Food photos look appetising under light", "A price change doesn't mean a new board", "Makes good use of the wall behind the till"],
      "If the menu changes very often, a digital screen may be cheaper in the long run.",
    ),
    box(
      ["Ready-made aluminium profile", "Acrylic + film", "Edge-lit LED", "From the front with a snap frame, in seconds"],
      ["Estate agents", "Businesses showing listings in the window", "Anyone needing a quick setup"],
      ["Fast delivery in A4–A0 stock sizes", "The most affordable light box", "Graphics change in seconds"],
      "Stock sizes only; for a custom size choose a slim acrylic light box.",
    ),
    box(
      ["Aluminium, free-standing body", "Film or fabric, one or two faces", "Internal LED", "Front cover or fabric"],
      ["Shop entrances", "Exhibitions and events", "Hotel lobbies"],
      ["Needs no wall; move it wherever you like", "Sits at eye level and draws attention", "Setup is as easy as plugging it in"],
      "In busy areas choose a weighted base so it cannot tip over.",
    ),
    box(
      ["Aluminium, gasket-sealed", "UV-resistant acrylic", "IP65 LED, outdoor driver", "By opening the sealed cover"],
      ["Street-side menu and price boards", "Open car parks and stations", "Outdoor notice boards"],
      ["Sealed against rain and dust", "Face does not fade in the sun", "An outdoor notice that reads at night"],
      "Where it takes direct rain, check the seals once a year.",
    ),
  ],

  "cephe-giydirme": [
    facade(
      ["4 mm aluminium composite panel", "Aluminium substructure", "PVDF coating; fire-retardant (FR) core option", "15–20 years"],
      ["Shop and showroom façades", "Dealer and fuel station buildings", "Buildings refreshing an old façade"],
      ["Wide choice of colours, wood and metal finishes", "Light, perfectly flat surface", "A whole façade in the same language as the sign"],
      "On multi-storey buildings fire regulations require FR-core panels.",
    ),
    facade(
      ["Perforated PVC mesh, UV printed", "Steel cable or profile tensioning", "Lets wind through", "1–3 years"],
      ["Buildings under construction or renovation", "Seasonal campaign façades", "Very large façade adverts"],
      ["Wind passes through, safe on tall façades", "The lowest cost per square metre", "You can still see out from inside"],
      "Not permanent; colours fade in 2–3 years of sun.",
    ),
    facade(
      ["Translucent composite/acrylic or linear LED", "Aluminium substructure", "IP65 LED, outdoor drivers", "LEDs 50,000 hours"],
      ["Businesses open at night", "Corner buildings on main roads", "Brands that want the building to stand out"],
      ["The building becomes a landmark at night", "Colours and scenes can be programmed (RGB)", "Promotes the brand without a separate sign"],
      "Needs an electrical design and council approval; plan energy use from the start.",
    ),
    facade(
      ["Perforated aluminium or corten sheet", "Steel/aluminium substructure", "Powder-coated", "20+ years"],
      ["Car parks and industrial buildings", "Façades that need sun shading", "Architectural showrooms"],
      ["Filters sun and views without blocking airflow", "The perforation pattern can form a logo or motif", "Long-lasting and maintenance-free"],
      "Custom perforation needs design and tooling time; delivery can stretch to 3–4 weeks.",
    ),
    facade(
      ["Wood-grain composite panel", "Aluminium substructure", "Won't rot or attract insects", "15+ years"],
      ["Cafés, restaurants, boutiques", "Natural-look concepts", "Hotel and villa entrances"],
      ["The warmth of timber without painting or upkeep", "Doesn't warp in damp or sun", "Installs as easily as ACP"],
      "Up close the pattern repeat can show; choose from a sample at eye level.",
    ),
    facade(
      ["6–10 mm compact laminate (HPL)", "Aluminium substructure, hidden or riveted", "Resists impact and scratches", "20+ years"],
      ["Schools, hospitals, public buildings", "Low façades that take knocks", "Heavily used entrances"],
      ["Far tougher against impact than ACP", "Graffiti and dirt clean off easily", "Colour holds for many years"],
      "Heavier and more expensive than ACP; the substructure must be sized for it.",
    ),
    facade(
      ["Printed, one-way vision or frosted film", "Applied directly to glass", "Outdoor-grade film", "3–5 years"],
      ["Shop windows", "Office glass partitions", "Shops running a campaign"],
      ["Applied in a day, removed without a trace", "Can keep the view out from inside", "The fastest way to refresh a façade"],
      "On sunny glass dark film can build up heat; prefer light colours or perforated film.",
    ),
  ],

  "arac-giydirme": [
    wrap(
      ["Cast vehicle film + laminate", "Whole body including the roof", "1–2 days", "5–7 years"],
      ["Brand vehicles and food trucks", "Promotional vehicles that must stand out", "The lead vehicles of a fleet"],
      ["The whole vehicle becomes advertising space", "Protects the original paint from chips and sun", "Removes without marking the paint"],
      "On damaged or resprayed paint, removal can lift the paint; we check before applying.",
    ),
    wrap(
      ["Cast or polymeric film", "Sides and rear, partial", "1 day", "4–6 years"],
      ["Service and delivery vehicles", "Trade vans", "Balancing budget and visibility"],
      ["Most of a full wrap's impact at lower cost", "The vehicle's own colour becomes part of the design", "Quick to apply"],
      "The design must work with the original paint colour, or it looks unfinished.",
    ),
    wrap(
      ["Single-colour cut vinyl", "Logo, phone number, address", "A few hours", "5–8 years"],
      ["Tradespeople", "New or leased commercial vehicles", "A simple corporate look"],
      ["The most affordable vehicle lettering", "Same-day delivery", "Long-lasting colours that don't fade"],
      "No photos or gradients; if you want imagery you need printed film.",
    ),
    wrap(
      ["Perforated one-way vision film", "Rear and rear side windows", "1–3 hours", "1–2 years"],
      ["Minibuses and shuttle vehicles", "Turning the rear window into ad space", "Commercial vehicles"],
      ["Print outside, clear view inside", "Adds the glass to your advertising", "Easy to replace"],
      "Never applied to the windscreen or front side windows; only where regulations allow.",
    ),
    wrap(
      ["Matt, satin, metallic or chrome colour film", "Whole body", "2–3 days", "5–7 years"],
      ["Private cars", "Fleet vehicles matched to brand colour", "Anyone avoiding a respray"],
      ["Reversible, unlike paint", "Protects the original paint and resale value", "Matt and metallic effects paint can't offer"],
      "A colour change may need to be registered on the vehicle papers; check before applying.",
    ),
    wrap(
      ["Cast/polymeric film, template design", "Standard layout", "1 day per vehicle, teams in parallel", "5–7 years"],
      ["Courier, service and delivery fleets", "Council and institutional vehicles", "Multi-branch businesses"],
      ["Identical look on every vehicle", "New vehicles are wrapped quickly from the template", "Unit cost falls in volume"],
      "Different makes and models each need the template adapting.",
    ),
    wrap(
      ["Cut or reflective striping film", "Body lines and bands", "A few hours", "5–8 years"],
      ["Ambulances, recovery and service vehicles", "A sporty look", "Corporate colour bands"],
      ["Strong visual effect from little material", "Reflective stripes add night visibility and safety", "Quick and affordable"],
      "On official vehicles (ambulances etc.) the striping layout is regulated; don't deviate from it.",
    ),
    wrap(
      ["Magnetic sheet + print", "Doors", "Fitted instantly", "2–3 years"],
      ["People who also use a private car for work", "Temporary promotions", "Hire vehicles"],
      ["On and off in seconds", "No permanent change to the vehicle", "The cheapest vehicle advertising"],
      "Only holds on flat steel panels; not suitable for aluminium or plastic doors or high speeds.",
    ),
  ],

  "dijital-baski": [
    print(
      ["440–510 gsm PVC banner", "Solvent / eco-solvent, 720 dpi", "Outdoor, eyelets or tensioned", "1–3 years"],
      ["Campaign and opening announcements", "Façade and balcony adverts", "Event spaces"],
      ["The most affordable large-format print", "Water- and wind-resistant", "Ready within hours"],
      "On tall, windy façades choose mesh instead.",
    ),
    print(
      ["Perforated PVC mesh", "Solvent, outdoor", "Tall façades, scaffolding, fences", "1–2 years"],
      ["Scaffold wraps", "Stadium and fence adverts", "Windy high façades"],
      ["Greatly reduces wind load", "Windows behind stay usable", "Safe at very large sizes"],
      "Because it is perforated, thin text reads poorly from a distance; design bold lettering.",
    ),
    print(
      ["Perforated (50%) vinyl", "Eco-solvent + laminate", "Shop and vehicle windows", "1–2 years"],
      ["Shop windows", "Bank and office glazing", "Public transport vehicles"],
      ["Graphic outside, see-through inside", "Cuts some sunlight", "Turns glass into advertising"],
      "At night, with the inside lit, the interior becomes visible from outside.",
    ),
    print(
      ["Translucent PET film", "High-density ink", "Light boxes and illuminated sign faces", "2–4 years"],
      ["Light box graphics", "Menu boards", "Mall advertising panels"],
      ["Vivid colours when lit", "The same impact by day and night", "Easy to swap"],
      "Colours look different when lit; don't print without knowing the box size and light level.",
    ),
    print(
      ["Textile-backed wallpaper or vinyl", "Latex / UV, odourless", "Interior walls", "5–10 years"],
      ["Cafés, offices, shop interiors", "Clinics and children's areas", "Feature walls"],
      ["One wall changes the feel of a room", "Wipeable finishes available", "Odourless print, ready to use"],
      "Walls must be flat and dry; damp walls need preparing first.",
    ),
    print(
      ["Floor graphic film", "Eco-solvent + anti-slip (R9/R10) laminate", "Shop, mall and exhibition floors", "3–12 months depending on traffic"],
      ["Wayfinding and queue markings", "Campaigns and product promotion", "Exhibition stands"],
      ["Uses space that's free when eye level is busy", "Safe anti-slip surface", "Removes easily"],
      "Won't stick to carpet or rough floors; needs a flat, clean, hard surface.",
    ),
    print(
      ["3–10 mm PVC foam or composite board", "Direct UV print", "Indoor and outdoor panels", "3–5 years"],
      ["Information and door signs", "Exhibition and in-store panels", "Estate and site boards"],
      ["No vinyl — the print is on the board itself", "No bubbling or lifting", "Fast production"],
      "PVC foam suffers in the sun outdoors; for long outdoor use choose composite board.",
    ),
    print(
      ["Cotton/polyester canvas", "Pigment ink", "Stretched on a wooden frame", "20+ years indoors"],
      ["Office and hotel décor", "Café and restaurant walls", "Gifts and personal prints"],
      ["Gallery look with a painterly texture", "Fade-resistant pigment ink", "No frame needed"],
      "Low-resolution photos blur at large sizes; files need at least 150 dpi.",
    ),
    print(
      ["PVC/polyester for stands, coated paper for posters", "Eco-solvent / digital", "Portable stands, indoor", "Stand for years, print 1–2 years"],
      ["Exhibitions and events", "Shop entrances", "Meetings and launches"],
      ["Carried in its bag, set up in a minute", "Same-day delivery", "When the artwork changes only the print is replaced"],
      "Outdoors it blows over in the wind; open areas need a heavy water-filled base.",
    ),
  ],

  "kurumsal-kimlik": [
    brand(
      ["Primary logo, alternate and icon versions", "AI, PDF, SVG, PNG", "3 rounds on the chosen direction", "1–3 weeks"],
      ["New businesses", "Brands with a dated logo", "Settling the identity before making signs"],
      ["Works equally well on signs, vehicles and screens", "Tested for legibility at small sizes", "Vector, scales without limit"],
      "When refreshing, keep existing recognition; a total change isn't always right.",
    ),
    brand(
      ["Logo usage, colour, typography, misuse", "PDF guide + source files", "2 rounds", "2–3 weeks"],
      ["Multi-branch businesses", "Brands working with agencies and printers", "Growing SMEs"],
      ["Every supplier works to the same rules", "Pantone, CMYK and RAL references prevent colour drift", "Teaches new staff the brand language"],
      "A guide only works if it is used; share it with every supplier.",
    ),
    brand(
      ["Business cards, letterhead, envelopes, folders, invoices", "Print-ready PDF", "2 rounds", "1 week"],
      ["Newly opened businesses", "Companies refreshing their identity", "Sectors that live on quotes and contracts"],
      ["All stationery consistent, from one place", "Printing handled by us too", "Print-ready technical files"],
      "Legal details such as tax and company numbers must be complete at the design stage.",
    ),
    brand(
      ["Size, material, lighting and installation drawings", "PDF + DWG", "2 rounds", "2–3 weeks"],
      ["Chains and franchise brands", "Companies with dealer networks", "Businesses with branches in several cities"],
      ["The same sign whichever city it is made in", "Makes supplier quotes comparable", "Variations for different façade types"],
      "Don't finalise the standard before testing it on a real façade.",
    ),
    brand(
      ["Layout drawings per vehicle model", "Print-ready vector files", "2 rounds", "1–2 weeks"],
      ["Fleet owners", "Service and distribution companies", "Dealer vehicles"],
      ["The same brand look on every model", "The same result from different workshops", "Adding new vehicles is faster"],
      "The exact make, model and year are needed; door and body lines differ by model.",
    ),
    brand(
      ["Uniform placement, ID badges, name tags", "Vector files for embroidery and print", "2 rounds", "1 week"],
      ["Restaurant, hotel and retail staff", "Healthcare providers", "Field teams"],
      ["Customers recognise staff instantly", "Logo simplified for embroidery and print", "Ready files for the uniform maker"],
      "Fine detail is lost in embroidery; the logo needs simplifying for it.",
    ),
    brand(
      ["Post, story and cover templates", "Editable Canva or Figma/PSD", "2 rounds", "1 week"],
      ["Businesses posting their own content", "Brands with frequent campaigns", "Anyone wanting visibility on Instagram"],
      ["Every post looks on-brand", "Edit it yourself without an agency", "Keeps digital consistent with your signage"],
      "Templates aren't content; posting regularly is still up to you.",
    ),
    brand(
      ["Layout, product presentation, print files", "Print-ready PDF + digital PDF", "2–3 rounds", "1–2 weeks"],
      ["Cafés and restaurants", "Manufacturers with a product catalogue", "Service firms using brochures"],
      ["Printing handled too", "A digital version for QR menus", "Easy to update when prices change"],
      "Weak product photos make a weak design; professional photography is recommended.",
    ),
    brand(
      ["Façade, interior, signage and communication standards", "Comprehensive PDF manual + technical drawings", "3 rounds", "3–6 weeks"],
      ["Brands preparing to franchise", "Fast-growing chains", "Dealer-based companies"],
      ["Every new branch delivers the same experience", "A clear opening process for franchisees", "Protects brand value"],
      "Pilot it in one branch and correct it before rolling out to the network.",
    ),
  ],

  "etiket-sticker": [
    label(
      ["Coated paper, kraft, clear or metallised PP", "Permanent; food-safe option", "Rolls or sheets, custom shapes", "Laminate option against water and oil"],
      ["Food and cosmetics producers", "Makers of handmade products", "E-commerce packaging"],
      ["Supplied on rolls for labelling machines", "Affordable digital printing even in small runs", "Custom-shape cutting"],
      "Standard adhesive won't hold in cold chain or on oily surfaces; tell us the conditions upfront.",
    ),
    label(
      ["Clear PVC/PET", "Permanent or removable", "Contour cut", "2–3 years outdoors"],
      ["Shop windows and glass doors", "Opening hours and logos", "Campaign announcements"],
      ["No visible background on the glass, just the design", "Crisp colours with a white underprint", "Easy to apply"],
      "Without a white underprint light colours look washed out on glass.",
    ),
    label(
      ["Single-colour vinyl", "Permanent", "Plotter cut, weeded + transfer tape", "5–8 years outdoors"],
      ["Window lettering", "Logos on vehicles and doors", "Wall lettering"],
      ["No background — only the letters show", "Long-lasting, won't fade", "Affordable"],
      "Letters under 1 cm and very thin lines can't be weeded; the design must suit cutting.",
    ),
    label(
      ["Etched-glass effect film", "Permanent", "Plain, patterned or with logo", "7+ years indoors"],
      ["Office glass partitions", "Clinic and bathroom glass", "Meeting rooms"],
      ["Lets light through, blocks the view", "A corporate look with a logo pattern", "Cheaper than real etching, and reversible"],
      "Silhouettes show at night when the room is lit; full privacy needs opaque film.",
    ),
    label(
      ["Floor film + anti-slip laminate", "Strong; removable option", "Contour cut", "3–12 months depending on traffic"],
      ["Queue and distance markers", "Direction arrows", "In-store campaigns"],
      ["Safe anti-slip surface", "Eye-catching floor messaging", "Removes without residue"],
      "Wears quickly under forklifts and heavy traffic; those need industrial floor tape.",
    ),
    label(
      ["Vinyl + domed polyurethane resin", "Strong, outdoor-grade", "Custom shape", "5+ years outdoors, UV-resistant"],
      ["Machine and device logos", "Promotional products", "Interior and door badges"],
      ["A 3D, premium feel", "Resists scratches and water", "Colours protected under the resin"],
      "Resin can run on large sizes; mostly suited to labels under about 10 cm.",
    ),
    label(
      ["Security vinyl with VOID pattern", "Leaves a \"VOID\" mark when removed", "Standard or custom shape", "Indoor"],
      ["Warranty and service seals", "Parcel and box seals", "Device casings"],
      ["Shows any attempt to open", "Numbered for tracking", "Makes counterfeiting harder"],
      "Single-use: once disturbed it can't be stuck back.",
    ),
    label(
      ["Polyester, aluminium-look or PVC", "Strong, permanent", "Rolls, numbered", "Resists wiping and scratching"],
      ["Schools, hospitals, public bodies", "Companies tracking inventory", "Warehouses and production sites"],
      ["Printed with serial number, barcode or QR", "Scannable, so counts are faster", "Long-lasting"],
      "The number list must be ready upfront; pick a barcode type your scanner reads.",
    ),
    label(
      ["Vinyl or paper", "Permanent or removable", "Contour cut, sheets", "Short to medium term"],
      ["Openings and events", "Product packs and gifts", "Brand stickers for laptops and phones"],
      ["Low-cost brand visibility that spreads", "Custom-shape cutting", "Fast production"],
      "Very small runs have a high unit cost; a few hundred pieces is where it becomes economical.",
    ),
  ],

  "imalat-tasarim-montaj": [
    work(
      ["Façade measurements, structure and power check", "Laser measure, photos; drone if needed", "A measured draft and a firm price", "Within 1–2 days in Samsun"],
      ["Anyone getting a new sign", "Replacing an old sign", "Anyone unsure of the dimensions"],
      ["Free and non-binding", "No surprise costs later", "Accurate measurements mean a smooth install"],
      "Visits outside the city are scheduled on a route; agree the date in advance.",
    ),
    work(
      ["The sign placed on a real photo of the façade", "3D modelling, day and night views", "Images for approval", "1–3 days"],
      ["People who want to see it before deciding", "Comparing several options", "Jobs needing partner or management sign-off"],
      ["See the result before it is made", "Size and colour mistakes avoided early", "Used in council and mall applications"],
      "We need a clear, straight-on photo of the façade for the simulation.",
    ),
    work(
      ["Council advertising permit or mall technical approval", "Drawings, structural and electrical documents", "An approved application file", "1–4 weeks depending on the authority"],
      ["Street-front signs", "Mall stores", "Totems and large façade jobs"],
      ["Removes the risk of fines and forced removal", "The file matches the specification", "We follow it up for you"],
      "Timing depends on the authority; plan your opening date around it.",
    ),
    work(
      ["Design, manufacture, installation, electrical connection", "Our own workshop and installation team", "A working sign", "5–15 working days depending on the job"],
      ["Anyone wanting a single point of contact", "Businesses with a fixed opening date", "Projects with several sign items"],
      ["One responsible party, one invoice", "Workshop and installers under one roof", "Warranty from one place"],
      "Bringing power to the sign position is the building's job; have it ready in advance.",
    ),
    work(
      ["High façades, rooftops and pole-top installations", "Boom lift, scaffolding, safety equipment", "Safe, insured installation", "1–2 days, weather permitting"],
      ["Multi-storey façades", "Rooftop signs", "Tall totems"],
      ["Team trained for working at height", "Insured work", "Traffic and public safety measures"],
      "A boom lift may need a road or pavement permit; we don't install in high winds.",
    ),
    work(
      ["Made in Samsun, transported and installed in other cities", "Our own team or a local partner", "The same quality at every branch", "Planned by route"],
      ["Brands with branches in several cities", "Dealer networks", "Chains wanting one supplier"],
      ["The same product and standard at each branch", "Packed for transport", "A combined schedule lowers the cost"],
      "Collect façade measurements and photos of each branch in advance.",
    ),
    work(
      ["Old sign removal, façade repair, new installation", "Boom lift, façade repair materials", "A clean façade and a new sign", "Usually the same day"],
      ["Shops taken over from a previous tenant", "Businesses changing brand", "Anyone with a worn-out sign"],
      ["We take away the old sign", "Holes and marks on the façade are made good", "The shop is never left without a sign"],
      "If the old fixings have rusted, add replacement of the support to the job.",
    ),
    work(
      ["LED, driver, case and connection checks", "Mobile service vehicle", "Fault diagnosis and repair", "24–48 hours for faults"],
      ["Every business with an illuminated sign", "Multi-branch brands", "Signs made by other companies"],
      ["Dead letters and flickering are fixed fast", "Regular checks extend the sign's life", "We service other companies' signs too"],
      "On very old signs, replacing the LED modules can be cheaper than repairing them.",
    ),
    work(
      ["The same sign and interior rollout to dozens of branches", "Series production, several installation teams", "A project schedule and per-branch reporting", "Planned by number of branches"],
      ["Supermarket and retail chains", "Bank and telecom branches", "Franchise systems"],
      ["Series production lowers unit cost", "All branches can be refreshed in the same period", "One project manager"],
      "Don't move to series production without a pilot branch first.",
    ),
  ],

  "yol-panolari": [
    road(
      ["Aluminium panel with edge profile", "Twin galvanised posts", "Class I or II reflective film", "Reinforced concrete, engineered"],
      ["Factory and industrial zone entrances", "Hotel and facility directions", "Long-distance wayfinding"],
      ["Large face, readable from afar", "Stands firm in the wind", "Reads in headlights at night"],
      "Installing beside a public road needs a permit from the relevant authority.",
    ),
    road(
      ["Aluminium", "Galvanised tube post", "Reflective film", "Set in concrete"],
      ["Roads inside estates and campuses", "Business direction signs", "Junction wayfinding"],
      ["Affordable and quick to install", "Takes little space", "Series production in standard sizes"],
      "As the panel grows one post isn't enough; over 1.5 m twin posts are recommended.",
    ),
    road(
      ["Aluminium cut to an arrow shape", "Post or wall bracket", "Reflective film", "Depends on the post"],
      ["Restaurant, hotel and facility directions", "Several directions at a junction", "Event sites"],
      ["Direction is understood at a glance", "Several arrows can share one post", "Easy to update"],
      "Too many arrows on one post hurts legibility; 4–5 at most is recommended.",
    ),
    road(
      ["Aluminium", "Post or wall", "Engineer grade, high intensity or diamond grade", "Depends on the installation"],
      ["Roads with night traffic", "Construction and hazard warnings", "Car parks and service roads"],
      ["Reads in headlights almost like daylight", "Needs no electricity", "Compatible with standard signs"],
      "Choose the reflective grade to suit road speed; faster roads need a higher grade.",
    ),
    road(
      ["Aluminium or composite", "Decorative post or profile", "Optional", "Set in concrete"],
      ["Residential estates", "Campuses", "Industrial zones"],
      ["Visitors and couriers reach the right block", "Designed to suit the estate's architecture", "All signs in one visual language"],
      "Don't start production until block and door numbers are confirmed with management.",
    ),
    road(
      ["Composite or aluminium; glow-in-the-dark option", "Ceiling hanger or wall", "Reflective or illuminated", "Ceiling or wall fixing"],
      ["Mall and office car parks", "Hospital car parks", "Covered estate car parks"],
      ["Colour-coded levels and zones help people find their car", "Organises entry, exit and ramp traffic", "Readable in the dark"],
      "Check headroom limits and sprinklers before installation.",
    ),
    road(
      ["Acrylic, aluminium or PVC foam", "Wall, ceiling or above doors", "None", "Screwed or taped"],
      ["Hospitals and clinics", "Offices and business towers", "Schools and public buildings"],
      ["A complete set based on the floor plan", "Changeable door name plates", "Materials that suit the architecture"],
      "If room and department names change often, choose an insert-based system.",
    ),
    road(
      ["Glow-in-the-dark (photoluminescent) panel", "Wall or ceiling", "Glows in the dark", "Screwed"],
      ["Every workplace", "Hotels, schools, hospitals", "Factories and warehouses"],
      ["Visible even during a power cut", "Standard pictograms", "Meets fire inspection requirements"],
      "Placement must follow the evacuation plan, using regulation symbols and sizes.",
    ),
    road(
      ["Composite or banner", "Steel frame, twin posts", "Optional", "Concrete or ballast"],
      ["Construction sites", "Public investment projects", "Residential sales areas"],
      ["Shows the mandatory project information", "Doubles as sales advertising", "Can be removed and reused when the project ends"],
      "Mandatory details such as permit number and building inspection firm must be complete.",
    ),
  ],

  "led-ekranlar": [
    led(
      ["P4–P10 (by viewing distance)", "5,500–7,000 nits", "IP65 front", "Remotely, over the internet"],
      ["Street and junction façades", "Mall exteriors", "Selling advertising space"],
      ["Sharp even in daylight", "Content changes instantly and plays video", "Several campaigns rotate in turn"],
      "Needs a council permit and power supply; brightness should dim automatically at night.",
    ),
    led(
      ["P1.5–P3", "800–1,200 nits", "IP30 (indoor)", "Computer, USB or cloud"],
      ["Shops and showrooms", "Meeting and conference rooms", "Reception walls"],
      ["Frameless, one image at any size", "Far brighter than a projector", "Long-lasting"],
      "If viewed up close a fine pixel pitch is essential, which raises the cost noticeably.",
    ),
    led(
      ["P10, single colour", "Outdoor level", "IP54–IP65", "Computer or phone app"],
      ["Pharmacies and small shops", "Exchange rates and price notices", "Campaign messages above a shopfront"],
      ["The most affordable LED option", "Messages change instantly", "Low energy use"],
      "Shows text only; images and video need a full-colour screen.",
    ),
    led(
      ["7-segment digit modules", "Outdoor level", "IP65", "Remote or software"],
      ["Fuel stations", "Exchange offices", "Jewellers"],
      ["Large digits readable from afar", "Prices updated in seconds", "Built together with the totem"],
      "Choose digit height for the reading distance and plan it with the totem design.",
    ),
    led(
      ["P1.8–P2.5", "1,500–2,500 nits (window)", "Indoor", "USB, Wi-Fi or cloud"],
      ["Shop windows", "In-store promotion", "Café and restaurant entrances"],
      ["Plug and play, no installation", "Readable even behind window glass", "Several posters can run in sync"],
      "For sunny windows choose a high-brightness model.",
    ),
    led(
      ["P3–P6", "5,000+ nits", "IP65, ventilated body", "Remote content management"],
      ["Roadside businesses", "Mall and car park entrances", "Campuses and exhibition grounds"],
      ["Different content for each direction of traffic", "A fixed brand area on the totem body", "Draws attention at eye level"],
      "Two screens and ventilation need significant power; plan foundation and supply together.",
    ),
    led(
      ["P2.5–P6", "By indoor or outdoor use", "By location", "One synchronised image"],
      ["Building corners", "Mall atriums", "Event stages"],
      ["Striking effect with 3D (anamorphic) content", "A corner screen is seen from two streets", "An architectural statement"],
      "Anamorphic 3D content is custom-made; budget for content separately.",
    ),
    led(
      ["P2.9–P3.9 (stage)", "Indoor and outdoor options", "Rental flight-case system", "With our technical crew"],
      ["Concerts and weddings", "Launches and conferences", "Exhibitions and sports events"],
      ["A big screen without buying one", "Setup, operation and removal included", "Size set to suit the event"],
      "Book dates early; equipment sells out in peak season.",
    ),
    led(
      ["Digit modules or full colour", "Sports hall or open pitch level", "Impact-resistant front", "Table-side controller"],
      ["Sports halls", "School and university pitches", "Council facilities"],
      ["Score, time and fouls on one board", "Instant updates from the table", "Advertising space can be added"],
      "For official competitions check the federation's scoreboard requirements.",
    ),
  ],
};
