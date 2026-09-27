import type { ServiceCopy } from "./types";

/** English service copy. Mirrors the Turkish structure field for field. */
export const servicesEn: Record<string, ServiceCopy> = {
  "isikli-tabela": {
    name: "Signage",
    shortName: "Signage",
    tagline: "Your frontage speaks first",
    summary:
      "Illuminated and non-illuminated shopfront signs: composite cabinets, acrylic, vinyl, blind-box and projecting signs.",
    answer:
      "A shopfront sign carries a business's name and trade from its façade, and is built either illuminated or unlit. Royal Reklam manufactures illuminated signs in Samsun, Türkiye using aluminium composite cabinets with acrylic or vinyl faces, and blind-box signs for already-lit positions. Survey, design, production and installation typically take 5–10 business days.",
    metaTitle: "Sign Manufacturing in Samsun | Shopfront Signs — Royal Reklam",
    metaDescription:
      "Sign manufacturing in Samsun: illuminated signs, blind-box signs, projecting lantern signs and vinyl faces. Survey, design, production and installation in-house.",
    keywords: [
      "sign manufacturer samsun",
      "shopfront signs samsun",
      "illuminated signage samsun",
      "blind box sign turkey",
      "led signs turkey",
      "acrylic light box sign",
    ],
    intro: [
      "A shopfront is a business's hardest-working advertisement. A sign that reads beautifully at noon disappears at night without proper lighting — illuminated signage closes that gap and keeps your brand working long after closing time.",
      "We manufacture illuminated signs in our own workshop in Samsun. Cabinet fabrication, acrylic cutting, LED layout and electrical work all happen under one roof, which shortens lead times and keeps accountability in one place.",
      "Our LED modules are IP65-rated and selected for the humidity and rainfall of the Black Sea coast. Module spacing is calculated per sign so the face lights evenly — no hot spots, no shadow banding, the two most common flaws in cheap production.",
    ],
    highlights: [
      {
        title: "Even illumination",
        description:
          "LED spacing is calculated against cabinet depth so the face carries no hot spots or shadows.",
      },
      {
        title: "IP65 outdoor rating",
        description: "Sealed modules built for humidity, rain and dust.",
      },
      {
        title: "Low energy draw",
        description:
          "Up to 60% savings versus fluorescent or neon equivalents.",
      },
      {
        title: "Serviceable by design",
        description:
          "Modules and drivers are positioned so they can be reached without dismounting the cabinet.",
      },
    ],
    specs: [
      {
        label: "Cabinet",
        value: "Aluminium composite or galvanised steel profile",
      },
      { label: "Face", value: "Acrylic 3–5 mm (opal, tinted or frosted)" },
      { label: "Lighting", value: "SMD LED modules, 12V / 24V, IP65" },
      {
        label: "Power",
        value: "Constant-voltage LED driver with fused protection",
      },
      { label: "Graphics", value: "UV-stable cut vinyl or digital print" },
      { label: "LED life", value: "30,000 – 50,000 hours" },
      {
        label: "Fixing",
        value: "Anchor bolts or chemical anchors per façade type",
      },
    ],
    priceFactors: [
      "Overall sign area in square metres",
      "Cabinet depth and supporting structure",
      "Face material: acrylic thickness, single or double sided",
      "LED module count and brightness target",
      "Installation height — whether a cherry picker or scaffold is required",
      "Municipal permit constraints on size and placement",
    ],
    useCases: [
      "High-street shops and boutiques",
      "Shopping-mall unit frontages",
      "Pharmacies, markets and bank branches",
      "Restaurants, cafés and late-trading venues",
      "Office and plaza entrance signage",
    ],
    variants: [
      {
        name: "Composite Case with Acrylic Face",
        description:
          "Aluminium composite case, acrylic face and internal LED lighting — the most common and best-balanced type of shopfront sign. It is what we suggest first for most high-street shops, sitting at the balance point between cost, durability and night-time legibility.",
        image:
          "/images/services/variants/isikli-tabela/kompozit-kasa-pleksi-yuzey.jpg",
      },
      {
        name: "Illuminated Vinyl Sign",
        description:
          "A light-diffusing vinyl face instead of acrylic. More economical at large sizes, and the graphic can be replaced later. On long frontages it needs no joins, so the face reads unbroken — and the graphic can be replaced without taking the case down.",
        image:
          "/images/services/variants/isikli-tabela/isikli-vinil-tabela.jpg",
      },
      {
        name: "Vacuum-Formed Acrylic Sign",
        description:
          "Acrylic is heated and formed in a mould to create a raised face, so the logo and lettering stand proud of the surface. The mould makes the first unit expensive, but chain brands reuse the same mould at every branch.",
        image:
          "/images/services/variants/isikli-tabela/vakum-pleksi-tabela.jpg",
      },
      {
        name: "Blind-Box Sign (Non-Illuminated)",
        description:
          "A closed case with no lighting, finished with cut vinyl or digital print. For frontages that are already well lit. With no LEDs inside it costs less and needs no electrical supply, which is enough inside arcades and on already-lit frontages.",
        image: "/images/services/variants/isikli-tabela/kor-kasa-tabela.jpg",
      },
      {
        name: "Projecting Lantern Sign",
        description:
          "A double-sided illuminated box mounted perpendicular to the façade, so people on the pavement see it without facing the building. On a narrow street a flat sign only reads from directly opposite, while a projecting one is visible metres before a customer reaches the door.",
        image: "/images/services/variants/isikli-tabela/fener-tabela.jpg",
      },
      {
        name: "Chrome / Stainless Case Sign",
        description:
          "A stainless steel case, chosen for the weight metal gives to hotel, office-tower and corporate frontages. Stainless steel stands up to sea air, a clear advantage over a painted case on frontages near the Samsun shoreline.",
        image: "/images/services/variants/isikli-tabela/krom-kasali-tabela.jpg",
      },
      {
        name: "Neon-Effect (LED Neon Flex) Sign",
        description:
          "The look of glass neon produced with LED strip. Unbreakable and low-energy; common on café and bar frontages. Unlike glass neon it cannot shatter and can be taken down and moved; it is also popular as interior wall lettering.",
        image: "/images/services/variants/isikli-tabela/neon-flex-tabela.jpg",
      },
      {
        name: "Wood-Look Illuminated Sign",
        description:
          "A warm texture from timber or wood-patterned composite. Suited to boutiques, coffee shops and concept venues. Wood-patterned composite replaces real timber, so there is no cracking, swelling or annual maintenance outdoors.",
        image:
          "/images/services/variants/isikli-tabela/ahsap-gorunumlu-isikli-tabela.jpg",
      },
      {
        name: "In-Window Light Panel",
        description:
          "A slim illuminated panel placed inside the window rather than on the façade — a practical answer where permits restrict signage. Because the façade is untouched it usually needs no permit, and a tenant can take the panel with them when they move.",
        image:
          "/images/services/variants/isikli-tabela/vitrin-ici-isikli-pano.jpg",
      },
    ],
    faqs: [
      {
        q: "How long does an illuminated sign take?",
        a: "For standard shopfront sizes, installation follows 5–10 business days after survey and design approval. Custom structures or large runs can extend this to 2–3 weeks.",
      },
      {
        q: "What determines the price?",
        a: "Pricing starts per square metre; cabinet depth, acrylic thickness, LED count and installation height are the main variables. Quotes given without an on-site survey are usually misleading.",
      },
      {
        q: "Do I need a permit?",
        a: "Yes. Signs mounted on façades in Samsun require an advertising permit from the relevant district municipality. We prepare the technical drawings needed for the application.",
      },
      {
        q: "If an LED fails, is the whole sign replaced?",
        a: "No. Only the faulty module or driver is swapped out — the sign stays in place, and most call-outs are finished in a single visit.",
      },
    ],
  },

  "kutu-harf-tabela": {
    name: "Channel Letter Signs",
    shortName: "Channel Letters",
    tagline: "Dimensional and permanent",
    summary:
      "Individually fabricated three-dimensional letters with front-lit, halo or dual illumination.",
    answer:
      "Channel letter signage consists of individually fabricated, three-dimensional letters mounted separately onto a façade. Royal Reklam produces channel letters in Samsun with acrylic faces, aluminium returns and LED illumination — front-lit, halo (reverse-lit) or dual. Typical delivery is 7–12 business days.",
    metaTitle:
      "Channel Letter Sign Manufacturing in Samsun — Royal Reklam Samsun",
    metaDescription:
      "Channel letter signs in Samsun: acrylic faced, LED illuminated, halo-lit 3D letters for malls and high-street stores. CNC precision, free site survey.",
    keywords: [
      "channel letters samsun",
      "3d letter sign turkey",
      "halo lit signage",
      "built-up letters manufacturer",
    ],
    intro: [
      "Channel letters carry the highest perceived quality in the signage trade. Rather than printing a wordmark onto one flat panel, each letter becomes an independent volume with its own depth, lighting and fixings — producing shadow, relief and a distinctly premium result.",
      "We offer all three lighting types: conventional front illumination, halo (reverse) illumination that throws light onto the wall behind each letter, and dual illumination combining both. Halo lighting is exceptional against stone, timber and dark façades.",
      "Letters are CNC-cut directly from vector artwork, so your corporate typeface is reproduced exactly — fine serifs, ligatures and Turkish characters (ş, ğ, ı, ö, ü, ç) included, with nothing simplified.",
    ],
    highlights: [
      {
        title: "CNC precision",
        description:
          "Cut straight from vector files so your typography stays intact.",
      },
      {
        title: "Three lighting options",
        description: "Front-lit, halo-lit or dual, chosen to suit the façade.",
      },
      {
        title: "Stainless fixings",
        description:
          "Standoffs and fixings are stainless, so no rust staining develops.",
      },
      {
        title: "Mall-compliant",
        description:
          "Engineered to shopping-centre façade guidelines for depth, projection and brightness.",
      },
    ],
    specs: [
      { label: "Letter face", value: "Acrylic 3–5 mm or aluminium" },
      { label: "Returns", value: "Aluminium profile, 5–15 cm depth" },
      { label: "Lighting", value: "SMD LED — front, halo or dual" },
      { label: "Finish", value: "Electrostatic powder coat, RAL matched" },
      { label: "Cutting", value: "CNC router from vector artwork" },
      { label: "Mounting", value: "Standoff fixings, stainless hardware" },
      {
        label: "Turkish characters",
        value: "Full support for ş, ğ, ı, ö, ü, ç",
      },
    ],
    priceFactors: [
      "Letter height and total character count",
      "Return depth (5 cm to 15 cm)",
      "Lighting type — halo costs more than front-lit",
      "Face material and paint finish (custom RAL, matt or gloss)",
      "Logo complexity — multi-part emblems need additional tooling",
      "Façade type and installation height",
    ],
    useCases: [
      "Shopping-mall unit frontages",
      "Corporate offices and plaza entrances",
      "Hotels, restaurants and cafés",
      "Showrooms and galleries",
      "Factory and facility main entrances",
    ],
    variants: [
      {
        name: "Standard Channel Letter",
        description:
          "Acrylic face, aluminium returns and front-lit LEDs — the best known and most widely fitted type of channel letter. The letters are fixed individually so the façade shows between them, making the sign read as part of the architecture rather than a panel on it.",
        image:
          "/images/services/variants/kutu-harf-tabela/standart-kutu-harf.jpg",
      },
      {
        name: "Chrome Letter",
        description:
          "Face and returns made from stainless steel. No light passes through the face; the appeal is the sheen of the metal itself. Night-time visibility therefore depends on the façade lighting, so spots or a halo should be planned alongside it.",
        image: "/images/services/variants/kutu-harf-tabela/krom-harf.jpg",
      },
      {
        name: "Chrome Letter with Trim Band",
        description:
          "A 1.5–3 cm chrome border is left around the front face with a light-diffusing acrylic centre, so the letter glows inside a metal frame. The chrome border sharpens each letter's edge, so the word reads more clearly from a distance than a plain acrylic face.",
        image:
          "/images/services/variants/kutu-harf-tabela/fileli-krom-harf.jpg",
      },
      {
        name: "Under-Lit Chrome Letter",
        description:
          "Light is thrown from beneath the letter, leaving the chrome face unlit and washing the wall softly. Elegant on reception and corporate entrances. The light never hits the eye directly, so it stays comfortable in receptions and lobbies where people stand close.",
        image:
          "/images/services/variants/kutu-harf-tabela/alttan-aydinlatmali-krom-harf.jpg",
      },
      {
        name: "PVC Foam (Dekota) Letter",
        description:
          "A non-illuminated letter CNC-cut from PVC foam board. Light and economical, for interiors and short-term applications. It is not built for years outdoors, so it suits exhibitions, shop interiors and short-term applications.",
        image: "/images/services/variants/kutu-harf-tabela/dekota-harf.jpg",
      },
      {
        name: "Halo (Back-Lit) Channel Letter",
        description:
          "Light strikes the wall from behind, so the letter reads dark against its own halo — the most prestigious-looking channel letter. The effect depends on the wall: the halo reads crisply on a dark flat surface and weakens on pale or textured ones.",
        image: "/images/services/variants/kutu-harf-tabela/halo-kutu-harf.jpg",
      },
      {
        name: "Dual-Lit Channel Letter",
        description:
          "Lit from both front and back: the letter itself reads clearly while a halo forms on the wall behind it. Lighting both front and back removes the need for a second sign, though the power draw rises accordingly.",
        image:
          "/images/services/variants/kutu-harf-tabela/cift-yonlu-isikli-kutu-harf.jpg",
      },
      {
        name: "Trimless Channel Letter",
        description:
          "Built so the return profile is hidden, giving the letter a crisp, single-piece edge. With no visible trim to hide behind, the tolerances are tight — cutting and installation demand more precision than a standard letter.",
        image:
          "/images/services/variants/kutu-harf-tabela/trimless-kutu-harf.jpg",
      },
      {
        name: "Non-Illuminated Decorative Letter",
        description:
          "Dimensional lettering without lighting, for reception walls, meeting rooms and other interior surfaces. It needs no electrical supply, so it can go up in a rented office or shop without any alteration work.",
        image:
          "/images/services/variants/kutu-harf-tabela/isiksiz-dekoratif-kutu-harf.jpg",
      },
    ],
    faqs: [
      {
        q: "How do channel letters differ from a flat panel sign?",
        a: "A flat sign prints the whole wordmark onto one panel. Channel letters are separate three-dimensional volumes mounted individually, creating depth and shadow. They look considerably more premium but take longer and cost more to produce.",
      },
      {
        q: "What is a halo-lit letter?",
        a: "The letter face stays opaque and the LEDs throw light backwards onto the wall, producing a soft glow around each letter. It works beautifully against dark, stone or timber-clad façades.",
      },
      {
        q: "Do shopping malls impose rules?",
        a: "Most do. Façade guidelines typically limit letter height, return depth, projection and brightness. We engineer to those guidelines and help you obtain mall management approval.",
      },
      {
        q: "How long do they last?",
        a: "An aluminium body with powder-coat finish holds its form well beyond ten years outdoors. LEDs are replaced at end of life while the letter body stays in service.",
      },
    ],
  },

  "totem-tabela": {
    name: "Totem & Pylon Signs",
    shortName: "Totem Signs",
    tagline: "Seen from a distance",
    summary:
      "Free-standing double-sided illuminated pylon signs for roadsides, forecourts and entrances.",
    answer:
      "A totem or pylon sign is a free-standing vertical sign built on a steel structure anchored into a concrete foundation, usually double-sided. Royal Reklam manufactures and installs 2 to 8 metre illuminated totems in Samsun, including structural calculation, foundation works and electrical supply.",
    metaTitle:
      "Totem & Pylon Sign Manufacturing in Samsun — Royal Reklam Samsun",
    metaDescription:
      "Totem signs in Samsun: 2–8 m double-sided illuminated pylons with structural calculation, foundation and installation included. For malls, hotels and forecourts.",
    keywords: [
      "totem sign samsun",
      "pylon sign turkey",
      "freestanding illuminated sign",
      "roadside signage samsun",
    ],
    intro: [
      "A façade sign is only visible from directly in front of the building. A totem is what makes a driver, a passer-by on the opposite pavement, or someone pulling into a car park notice you from hundreds of metres away.",
      "A totem is closer to a structure than a sign: it needs a steel frame sized for wind load, a reinforced concrete foundation at the right depth and proper earthing. We deliver totems complete — structural calculation, foundation and electrical infrastructure included.",
      "Double-sided construction is our standard so both directions of traffic can read it. For multi-tenant buildings we design a modular cassette system: when a brand changes, only that cassette is swapped rather than the whole totem.",
    ],
    highlights: [
      {
        title: "Engineered structure",
        description:
          "Steel frame and concrete foundation sized against wind load.",
      },
      {
        title: "Double-sided",
        description: "Legible from both directions of traffic.",
      },
      {
        title: "Modular cassettes",
        description:
          "Multi-tenant totems allow individual panels to be replaced.",
      },
      {
        title: "Turnkey delivery",
        description:
          "Excavation, concrete, power supply and installation in one contract.",
      },
    ],
    specs: [
      { label: "Height", value: "2 – 8 m (taller on request)" },
      { label: "Structure", value: "Galvanised or painted steel profile" },
      { label: "Cladding", value: "Aluminium composite with acrylic faces" },
      { label: "Lighting", value: "Internally lit SMD LED, IP65" },
      {
        label: "Foundation",
        value: "Reinforced concrete, depth per ground survey",
      },
      { label: "Configuration", value: "Single or double sided" },
      {
        label: "Electrical",
        value: "Earthed supply with fused distribution board",
      },
    ],
    priceFactors: [
      "Totem height and width",
      "Steel tonnage and structural requirement",
      "Ground conditions, which set foundation depth and concrete volume",
      "Single- versus double-sided configuration",
      "Number of tenant cassettes",
      "Distance of the electrical supply run",
    ],
    useCases: [
      "Fuel stations and forecourts",
      "Shopping centre and business park entrances",
      "Hotels and hospitality venues",
      "Residential development entrances",
      "Industrial estate wayfinding",
    ],
    variants: [
      {
        name: "Single / Double-Sided Illuminated Totem",
        description:
          "An internally lit vertical totem; the double-sided version reads from both directions of traffic. Double-sided is close to essential at a roadside; single-sided only works where the back sits against a wall or building.",
        image:
          "/images/services/variants/totem-tabela/tek-cift-yuz-isikli-totem.jpg",
      },
      {
        name: "Modular Cassette Totem",
        description:
          "A separate cassette per tenant. In malls, business centres and industrial estates a single cassette is swapped when a tenant changes. When a tenant changes only that one cassette is remade — the totem is neither dismantled nor repainted.",
        image: "/images/services/variants/totem-tabela/moduler-kaset-totem.jpg",
      },
      {
        name: "Monolith Totem",
        description:
          "A solid block rising from the ground with no visible posts — suited to contemporary architecture. Because the body reads as one piece, the foundation and structural calculation matter more — wind load passes straight into the ground.",
        image: "/images/services/variants/totem-tabela/monolit-totem.jpg",
      },
      {
        name: "Fuel Price Totem",
        description:
          "A forecourt totem with LED price digits, updated remotely so no one has to change panels by hand. Prices change daily, so LED digits are both faster and safer than sending someone up to swap panels.",
        image:
          "/images/services/variants/totem-tabela/akaryakit-fiyat-totemi.jpg",
      },
      {
        name: "Residential Development Totem",
        description:
          "An entrance totem carrying the project name, block diagram and site plan together. Visitors and couriers see the block number at the gate, so nobody has to drive around the site looking for it.",
        image:
          "/images/services/variants/totem-tabela/site-konut-girisi-totemi.jpg",
      },
      {
        name: "Wayfinding Totem",
        description:
          "A series of totems guiding visitors step by step across large sites such as hospitals, campuses and factories. It is planned as a series rather than a single sign, and only works while the typography and arrow language stay identical at every point.",
        image: "/images/services/variants/totem-tabela/wayfinding-totemi.jpg",
      },
      {
        name: "Slim-Profile Totem",
        description:
          "Tall and narrow in section, for locations with a tight frontage or limited pavement. Where pavement width or council limits rule out a wide totem, it buys visibility through height instead.",
        image: "/images/services/variants/totem-tabela/ince-profil-totem.jpg",
      },
    ],
    faqs: [
      {
        q: "Is a ground survey needed?",
        a: "For totems above 4 metres, yes — ground conditions must be known. Loose or made ground requires a deeper foundation. We assess the ground during the site survey.",
      },
      {
        q: "Are permits required?",
        a: "Yes. Totems are subject to advertising tax and require municipal approval; roadside locations may also need highways authority sign-off. We prepare the technical drawings for the application.",
      },
      {
        q: "What height should I choose?",
        a: "It depends on approach speed and sight lines. Three to four metres suits most urban streets; six metres and above is advisable on ring roads and fast approaches.",
      },
    ],
  },

  "lightbox-tabela": {
    name: "Lightbox & Fabric Frames",
    shortName: "Lightboxes",
    tagline: "Slim frame, even glow",
    summary:
      "Slim-profile backlit panels with tensioned fabric or acrylic faces and edge-lit LED panels.",
    answer:
      "A lightbox is a slim aluminium frame containing an edge-lit LED panel that backlights the face evenly. Royal Reklam produces tensioned fabric (SEG) and acrylic-faced lightboxes in Samsun. With fabric systems the graphic can be swapped in minutes without tools.",
    metaTitle: "Lightbox & Fabric Frame Signs in Samsun — Royal Reklam Samsun",
    metaDescription:
      "Lightbox signage in Samsun: slim frames, tensioned fabric or acrylic faces, evenly diffused LED backlighting for retail and interior use.",
    keywords: [
      "lightbox sign samsun",
      "seg fabric frame",
      "backlit display turkey",
      "retail lightbox",
    ],
    intro: [
      "The lightbox is the contemporary answer to the bulky backlit box. Edge-lit LED panels bring frame depth down to 4–8 centimetres while keeping light distribution flawless across the face — far more elegant indoors and in window displays.",
      "Two face options are available. In a tensioned fabric (SEG) system the graphic is printed onto fabric with a silicone edge strip and tensioned into a channel, so changing a campaign takes minutes. Acrylic faces are permanent and offer greater impact resistance.",
      "Applications range from restaurant menu boards and retail windows to hospital wayfinding and exhibition stands. Every unit is made to your dimensions — we are not tied to stock sizes.",
    ],
    highlights: [
      {
        title: "4–8 cm profile",
        description: "Edge-lit panels keep the frame nearly flush.",
      },
      {
        title: "Minutes to change graphics",
        description: "Fabric systems let staff swap campaigns without tools.",
      },
      {
        title: "No hot spots",
        description:
          "A diffuser layer gives even brightness across the whole face.",
      },
      {
        title: "Single or double sided",
        description: "Suspended double-sided units ship with hanging hardware.",
      },
    ],
    specs: [
      { label: "Frame", value: "Aluminium profile, 4–8 cm depth" },
      { label: "Face", value: "Tensioned fabric (silicone edge) or acrylic" },
      { label: "Lighting", value: "Edge-lit LED panel with diffuser" },
      { label: "Printing", value: "Dye-sublimation textile or UV print" },
      { label: "Mounting", value: "Wall fixed, suspended or free-standing" },
      { label: "Use", value: "Interior; IP54 version available for exterior" },
      { label: "Graphic change", value: "3–5 minutes, tool-free (fabric)" },
    ],
    priceFactors: [
      "Panel size in square metres",
      "Face type — fabric or acrylic",
      "Single- or double-sided configuration",
      "LED panel brightness class",
      "Interior or exterior rating",
      "Suspension, feet or custom mounting hardware",
    ],
    useCases: [
      "Retail windows and in-store campaign panels",
      "Restaurant and café menu boards",
      "Mall advertising and wayfinding units",
      "Exhibition stands and showrooms",
      "Hospital, hotel and office reception panels",
    ],
    variants: [
      {
        name: "Fabric (Textile) Light Box",
        description:
          "A silicone-edged fabric face tensioned into the frame; the graphic changes in three to five minutes with no tools. For shops that change campaigns often, the recurring cost is only the fabric — the frame stays put.",
        image:
          "/images/services/variants/lightbox-tabela/gergi-kumas-lightbox.jpg",
      },
      {
        name: "Slim Acrylic-Face Light Box",
        description:
          "The classic slim frame with an acrylic face — long-lasting, for graphics that will stay put. Changing the graphic takes more effort than fabric, but the surface is harder and resists scratching.",
        image:
          "/images/services/variants/lightbox-tabela/pleksi-yuzeyli-ince-kasa-lightbox.jpg",
      },
      {
        name: "Double-Sided Suspended Light Box",
        description:
          "Hung from the ceiling and lit on both faces, for mall corridors and large interiors. It addresses pedestrians arriving from both directions at once; the ceiling's load capacity needs checking first.",
        image:
          "/images/services/variants/lightbox-tabela/cift-yuz-askili-lightbox.jpg",
      },
      {
        name: "Menu Board Light Box",
        description:
          "A modular menu board for restaurants and cafés, where only the affected panel is reprinted when prices change. The panels are modular, so a price change means reprinting one section rather than the whole menu.",
        image:
          "/images/services/variants/lightbox-tabela/menu-panosu-lightbox.jpg",
      },
      {
        name: "Standard-Size Window Light Box",
        description:
          "Frames in ready poster sizes such as A0, A1 and B1, so agency artwork drops straight in. Working to a standard size means agency artwork drops in without any reworking.",
        image:
          "/images/services/variants/lightbox-tabela/standart-olcu-vitrin-lightboxi.jpg",
      },
      {
        name: "Free-Standing Floor Light Box",
        description:
          "A panel that stands on its own without wall fixing — portable, for exhibitions, receptions and showrooms. Nothing is drilled into the wall, so setting up and taking down takes minutes in rented space or on an exhibition stand.",
        image:
          "/images/services/variants/lightbox-tabela/ayakli-zemin-lightboxi.jpg",
      },
      {
        name: "Outdoor IP54 Light Box",
        description:
          "A weather-protected outdoor version for entrance frontages and arcade doorways. An indoor frame takes on moisture outdoors within a couple of seasons; the outdoor version is built with seals to match.",
        image:
          "/images/services/variants/lightbox-tabela/dis-mekan-ip54-lightbox.jpg",
      },
    ],
    faqs: [
      {
        q: "Fabric or acrylic?",
        a: "Choose fabric if you change graphics often — you can swap them yourself. Choose acrylic where the graphic is permanent or the panel sits somewhere it may be knocked.",
      },
      {
        q: "Can a lightbox go outdoors?",
        a: "Yes, but not with a standard interior frame. Exterior use requires a gasket-sealed frame rated at least IP54 with outdoor-grade LED panels.",
      },
      {
        q: "Will the light be even?",
        a: "Yes. Edge-lit panels with a diffuser layer give uniform brightness with no visible LED dots or banding — the most common flaw in budget systems.",
      },
    ],
  },

  "cephe-giydirme": {
    name: "Façade Cladding",
    shortName: "Façade Cladding",
    tagline: "Brand the whole building",
    summary:
      "Aluminium composite panel and mesh vinyl cladding that turns a building into brand surface.",
    answer:
      "Façade cladding covers a building's exterior with aluminium composite panel, mesh vinyl or acrylic surfaces to turn it into brand identity. Royal Reklam delivers turnkey façade cladding in Samsun including survey, structural assessment, sub-frame and installation. Typical programmes run 1–4 weeks depending on area.",
    metaTitle:
      "Façade Cladding in Samsun | Composite Panel — Royal Reklam Samsun",
    metaDescription:
      "Façade cladding in Samsun: aluminium composite panel, mesh vinyl and acrylic. Structural calculation, sub-frame and installation included.",
    keywords: [
      "facade cladding samsun",
      "aluminium composite panel turkey",
      "building wrap samsun",
      "mesh banner facade",
    ],
    intro: [
      "Façade cladding is the largest-scale work in signage. A tired exterior can become your strongest advertising surface within weeks, given the right material and the right sub-structure.",
      "Aluminium composite panel (ACP) is the most common solution — light, formable and durable. On buildings that fall under fire regulations we specify A2 mineral-filled panel; this is a responsibility we do not treat lightly.",
      "For buildings under construction and temporary campaigns, mesh (perforated) vinyl is preferred. It lets wind through, reducing load on the structure while still reading as a solid image from a distance.",
    ],
    highlights: [
      {
        title: "Engineered sub-frame",
        description:
          "Panels mount to an aluminium carcass with thermal expansion gaps, never bonded straight to the wall.",
      },
      {
        title: "A2 fire class available",
        description:
          "Mineral-filled, limited-combustibility panel for regulated buildings.",
      },
      {
        title: "Mesh vinyl option",
        description:
          "Reduces wind load on temporary and construction-phase installations.",
      },
      {
        title: "Working at height",
        description: "Cherry pickers and façade scaffold, with insured crews.",
      },
    ],
    specs: [
      {
        label: "Primary material",
        value: "Aluminium composite panel (ACP) 4 mm",
      },
      { label: "Fire class", value: "B-s1 standard / A2-s1 mineral filled" },
      { label: "Alternatives", value: "Mesh vinyl, acrylic, HPL" },
      {
        label: "Sub-frame",
        value: "Aluminium carcass with expansion allowance",
      },
      { label: "Finish", value: "PVDF coated: matt, gloss or timber effect" },
      { label: "Colour", value: "RAL range or corporate colour matching" },
      { label: "Access", value: "Cherry picker or façade scaffold" },
      { label: "Service life", value: "15+ years colour stability on PVDF" },
    ],
    priceFactors: [
      "Façade area and geometric complexity",
      "Panel class — A2 fire-rated panel costs more than standard",
      "Sub-frame quantity and condition of the existing wall",
      "Height and access method",
      "Detailing around windows, corners and sills",
      "Whether existing cladding must be stripped first",
    ],
    useCases: [
      "Retail and showroom frontages",
      "Business centres and office towers",
      "Hotel refurbishments",
      "Factory and warehouse branding",
      "Construction-phase mesh campaigns",
    ],
    variants: [
      {
        name: "Aluminium Composite (ACP) Cladding",
        description:
          "4 mm composite panels that bring a whole building into the corporate colour — the primary façade method. It goes over a tired existing façade without stripping it, so the building looks wholly new in a short time.",
        image:
          "/images/services/variants/cephe-giydirme/aluminyum-kompozit-cephe-kaplama.jpg",
      },
      {
        name: "Mesh Vinyl Façade Banner",
        description:
          "Perforated banner that lets wind through, used on buildings under construction and for time-limited campaigns. Far cheaper than permanent cladding, it goes up for the build or the campaign and comes down afterwards.",
        image:
          "/images/services/variants/cephe-giydirme/mesh-vinil-cephe-brandasi.jpg",
      },
      {
        name: "Illuminated Façade",
        description:
          "LED strip or profile recessed into the cladding, so the building carries its identity after dark. After dark the whole elevation takes on the brand colour, so the building identifies itself without a sign.",
        image: "/images/services/variants/cephe-giydirme/isikli-cephe.jpg",
      },
      {
        name: "Perforated Metal Façade",
        description:
          "Patterned perforated panels that provide shading while giving the elevation texture. It doubles as solar shading, cutting heat gain on south-facing elevations.",
        image:
          "/images/services/variants/cephe-giydirme/perfore-metal-cephe.jpg",
      },
      {
        name: "Wood-Look Composite Façade",
        description:
          "Wood-patterned PVDF cladding: a natural appearance without timber's maintenance burden. Unlike real timber it needs no yearly oiling or varnishing and holds its colour for years.",
        image:
          "/images/services/variants/cephe-giydirme/ahsap-gorunumlu-kompozit-cephe.jpg",
      },
      {
        name: "HPL / Compact Laminate Façade",
        description:
          "Impact- and scratch-resistant compact laminate panels for heavily used entrances. Its impact resistance outlasts composite at school, hospital and other heavily used entrances.",
        image:
          "/images/services/variants/cephe-giydirme/hpl-kompakt-lamine-cephe.jpg",
      },
      {
        name: "Window and Glass Film Wrapping",
        description:
          "Glazed areas of the façade covered in film; one-way vision keeps the view out clear from inside. It refreshes a shopfront's identity without replacing glass, and the film peels off cleanly when the campaign ends.",
        image:
          "/images/services/variants/cephe-giydirme/vitrin-cam-folyo-giydirme.jpg",
      },
    ],
    faqs: [
      {
        q: "How long does cladding take?",
        a: "A small shopfront takes 3–5 days. A multi-storey façade including sub-frame and scaffold can run 2–4 weeks. The exact programme is confirmed after survey.",
      },
      {
        q: "Is composite panel fire resistant?",
        a: "Standard panel is class B-s1. Regulated buildings such as high-rises and public premises require A2-s1 mineral-filled panel. We assess and confirm the required class in writing per project.",
      },
      {
        q: "Must the existing façade be removed?",
        a: "Not always. If the substrate is sound, the new carcass can be fixed over it. Blown render, damp or structurally doubtful surfaces must be stripped.",
      },
    ],
  },

  "arac-giydirme": {
    name: "Vehicle Wrapping",
    shortName: "Vehicle Wraps",
    tagline: "Advertising that moves",
    summary:
      "Partial and full wraps in cast vinyl with UV laminate — no damage to the original paint.",
    answer:
      "Vehicle wrapping applies cut or digitally printed vinyl to a vehicle's surface, turning it into advertising space. Royal Reklam applies partial and full wraps in Samsun using laminated cast vinyl. Application takes 1–3 days depending on vehicle type and does not damage factory paint.",
    metaTitle:
      "Vehicle Wrapping in Samsun | Fleet Graphics — Royal Reklam Samsun",
    metaDescription:
      "Vehicle wrapping in Samsun: cut vinyl, full wraps and fleet graphics. Cast vinyl with UV laminate, paint-safe removal, 5–7 year durability.",
    keywords: [
      "vehicle wrapping samsun",
      "fleet graphics turkey",
      "car wrap samsun",
      "commercial vehicle branding",
    ],
    intro: [
      "A commercial vehicle is seen by thousands of people a day. A wrap creates an outdoor advertising surface with no monthly rent — working for years on exactly the routes your customers use.",
      "Material choice is everything. Cheap calendered vinyl shrinks back on curves, fades quickly and lifts paint on removal. We use cast vinyl with a UV-protective laminate, giving 5–7 years of outdoor colour stability and clean, paint-safe removal.",
      "We work at every scale from partial graphics to full wraps. For fleets we build a per-model template so every vehicle carries the logo in exactly the same position — ten vans, one standard.",
    ],
    highlights: [
      {
        title: "Cast vinyl with laminate",
        description:
          "Conforms to curves without shrink-back; 5–7 year UV durability.",
      },
      {
        title: "Paint-safe",
        description:
          "Heat-assisted removal leaves the factory finish intact — and protected.",
      },
      {
        title: "Fleet consistency",
        description: "Model-specific templates keep every vehicle identical.",
      },
      {
        title: "Dust-free application",
        description:
          "Applied indoors so no bubbles or dust are trapped under the film.",
      },
    ],
    specs: [
      { label: "Film", value: "Cast vinyl, 3M / Oracal grade" },
      { label: "Protection", value: "UV-stable overlaminate" },
      { label: "Printing", value: "Eco-solvent or latex digital print" },
      { label: "Coverage", value: "Partial, half or full wrap" },
      { label: "Glazing", value: "One-way vision perforated film" },
      { label: "Outdoor life", value: "5 – 7 years" },
      { label: "Application time", value: "1 – 3 days by vehicle type" },
      { label: "Removal", value: "Heat-assisted, paint safe" },
    ],
    priceFactors: [
      "Vehicle type and surface area to be covered",
      "Partial versus full coverage",
      "Film grade — cast costs more than calendered but lasts far longer",
      "Number of colours and whether printing is required",
      "Curves, recesses and deep channels, which add labour",
      "Fleet volume — unit cost falls with quantity",
    ],
    useCases: [
      "Service and delivery vehicles",
      "Corporate fleets",
      "Vans, panel vans and light trucks",
      "Taxis and passenger transport",
      "Site and technical service vehicles",
    ],
    variants: [
      {
        name: "Full Wrap",
        description:
          "The entire body is covered in film. Maximum advertising impact, with the original paint protected underneath. The film also shields the original paint from stones and scratches, leaving it as it was when the wrap comes off.",
        image: "/images/services/variants/arac-giydirme/tam-kaplama.jpg",
      },
      {
        name: "Half Wrap",
        description:
          "The lower half or rear section is covered — close to the visibility of a full wrap at a markedly lower cost. It covers the lower half people actually look at, so visibility barely drops while the saving is substantial.",
        image: "/images/services/variants/arac-giydirme/yarim-kaplama.jpg",
      },
      {
        name: "Cut Vinyl Lettering",
        description:
          "Only the logo, phone number and web address are cut and applied. The quickest and most economical option. An entry point for single-vehicle businesses and tight fleet budgets, and you can move up to a full wrap later.",
        image:
          "/images/services/variants/arac-giydirme/kesim-folyo-uygulama.jpg",
      },
      {
        name: "One-Way Vision Windows",
        description:
          "Perforated film on the glazing: the graphic reads from outside while the view out stays clear. It turns the glazing into advertising space and can be used on rear and side windows without blocking the driver's view.",
        image:
          "/images/services/variants/arac-giydirme/one-way-vision-cam-uygulamasi.jpg",
      },
      {
        name: "Colour Change Wrap",
        description:
          "Matte, satin or chromatic film that changes the vehicle's colour — about appearance rather than advertising. It protects resale value better than a respray, and comes off at the end of a lease or rental term.",
        image:
          "/images/services/variants/arac-giydirme/renk-degisimi-kaplama.jpg",
      },
      {
        name: "Fleet Standard Wrap",
        description:
          "Identical application across many vehicles: the template is set once and repeated over the whole fleet. The template is cut once, so a vehicle joining the fleet later is wrapped to the same standard the same day.",
        image:
          "/images/services/variants/arac-giydirme/filo-standart-giydirme.jpg",
      },
      {
        name: "Stripe and Band Application",
        description:
          "A corporate-colour stripe along the side of commercial vehicles — understated, but it makes a fleet look coherent. It gives a corporate look without carrying advertising, which is why service and management vehicles often use it.",
        image:
          "/images/services/variants/arac-giydirme/serit-bant-uygulamasi.jpg",
      },
      {
        name: "Magnetic Vehicle Panel",
        description:
          "A removable magnetic panel, for owners who want the vehicle plain when it is in private use. Taken off after hours the vehicle stays plain for private use, and one panel can move between vehicles.",
        image:
          "/images/services/variants/arac-giydirme/manyetik-arac-panosu.jpg",
      },
    ],
    faqs: [
      {
        q: "Will wrapping damage the paint?",
        a: "No. With the right film and removal technique the original paint is unharmed — in fact the film shields it from UV and stone chips. Damage risk comes from cheap calendered film and forced removal.",
      },
      {
        q: "Can a wrapped vehicle be washed?",
        a: "Yes, from 48 hours after application. Hand washing or a pressure washer is preferred over brush car washes; keep the jet away from film edges.",
      },
      {
        q: "How long does a wrap last?",
        a: "Cast vinyl with laminate gives 5–7 years of outdoor colour stability. Whether the vehicle sits in full sun or covered parking directly affects that figure.",
      },
    ],
  },

  "dijital-baski": {
    name: "Large Format Printing",
    shortName: "Digital Printing",
    tagline: "Wide format, true colour",
    summary:
      "High-resolution printing onto vinyl, banner, mesh, film and one-way vision materials.",
    answer:
      "Large format digital printing applies artwork directly to wide substrates such as vinyl, PVC banner, mesh and self-adhesive film. Royal Reklam produces banners, window graphics and façade images in Samsun using eco-solvent and UV technology, with Pantone-referenced colour matching and 1–3 day turnaround on standard work.",
    metaTitle:
      "Large Format Printing in Samsun | Banners & Vinyl — Royal Reklam Samsun",
    metaDescription:
      "Large format printing in Samsun: PVC banner, vinyl, mesh, one-way vision and self-adhesive film. Pantone colour matching, 1–3 day turnaround.",
    keywords: [
      "large format printing samsun",
      "banner printing turkey",
      "vinyl printing samsun",
      "one way vision film",
    ],
    intro: [
      "Digital printing is the invisible layer running through every signage job — the colour on a channel letter face, the graphic on a van, the campaign poster in a window all pass through the same print discipline.",
      "Colour consistency is what separates good from adequate. The red in your identity has to be the same red on a sign, a banner and a vehicle. We print through ICC-calibrated profiles with Pantone-referenced matching and supply colour proofs ahead of large runs.",
      "Material is chosen for the application. A short-run event poster and a banner that must survive three years on a façade cannot be the same substrate — the wrong choice means a faded or torn print by the first winter.",
    ],
    highlights: [
      {
        title: "Pantone matching",
        description:
          "Your corporate colour reads the same across every material and job.",
      },
      {
        title: "High resolution",
        description:
          "Up to 1440 dpi for close-viewed work; optimised output for distance.",
      },
      {
        title: "Correct substrate",
        description:
          "Material recommended against lifespan and location, not habit.",
      },
      {
        title: "Finishing in-house",
        description:
          "Welded hems, eyelets and cutting completed alongside printing.",
      },
    ],
    specs: [
      { label: "Technology", value: "Eco-solvent, latex and UV" },
      {
        label: "Materials",
        value: "Vinyl, PVC banner, mesh, film, canvas, one-way vision",
      },
      { label: "Resolution", value: "720 – 1440 dpi by viewing distance" },
      { label: "Colour management", value: "ICC profiled, Pantone referenced" },
      { label: "Lamination", value: "Matt or gloss, UV protective (optional)" },
      { label: "Finishing", value: "Welded hems, eyelets, pole pockets" },
      { label: "Cutting", value: "Contour (dieline) cutting supported" },
      { label: "Turnaround", value: "1 – 3 business days on standard work" },
    ],
    priceFactors: [
      "Printed area in square metres",
      "Substrate type and weight",
      "Whether lamination is applied",
      "Finishing operations (welding, eyelets, pockets)",
      "Contour cutting for custom shapes",
      "Quantity — unit cost drops sharply at volume",
    ],
    useCases: [
      "Façade banners and campaign posters",
      "Window graphics and one-way vision glazing",
      "Exhibition stands and roll-up graphics",
      "Construction site mesh screens",
      "Interior wall coverings and decorative prints",
    ],
    variants: [
      {
        name: "Façade Banner",
        description:
          "Wide-format printing on vinyl or PVC banner — the quickest answer for campaigns and opening announcements. Ready within days for an opening, a sale or a seasonal push, and it can be taken down and stored afterwards.",
        image: "/images/services/variants/dijital-baski/cephe-brandasi.jpg",
      },
      {
        name: "Mesh Banner",
        description:
          "Perforated so wind passes through, making it safe at height and in open areas. Essential for scaffold and façade shrouds. Letting wind through cuts the load on the structure, making it far safer than solid banner at height.",
        image:
          "/images/services/variants/dijital-baski/mesh-delikli-branda.jpg",
      },
      {
        name: "One-Way Vision Window Film",
        description:
          "Perforated film: the graphic reads from outside while the view out stays clear. Used on shop windows and vehicle glass. It turns the whole window into advertising while the view out survives, so the shop never feels boxed in.",
        image:
          "/images/services/variants/dijital-baski/one-way-vision-cam-folyosu.jpg",
      },
      {
        name: "Backlit Film Printing",
        description:
          "Light-diffusing film for back-lit cases, so colours come alive when light boxes and menu boards are switched on. An ordinary print looks washed out when lit from behind; backlit film is printed with density set for that.",
        image: "/images/services/variants/dijital-baski/backlit-film-baski.jpg",
      },
      {
        name: "Wall Covering and Wallpaper Printing",
        description:
          "Full-area printing for interior walls, turning offices, shops and restaurants into branded space. It puts photographs and patterns on a wall that paint cannot achieve, with no drying time to wait out.",
        image:
          "/images/services/variants/dijital-baski/duvar-kaplama-ve-duvar-kagidi-baskisi.jpg",
      },
      {
        name: "Floor Graphics",
        description:
          "Floor printing with anti-slip lamination — a safe surface for wayfinding and campaign messages. Anti-slip lamination is a safety requirement — an unlaminated print becomes a slip hazard once wet.",
        image: "/images/services/variants/dijital-baski/zemin-folyosu.jpg",
      },
      {
        name: "UV Printing on Rigid Board",
        description:
          "Direct UV printing onto rigid sheet, producing a flat, sturdy panel that hangs without a frame. The board is its own support, so no frame is needed — it hangs directly or sits on a stand.",
        image:
          "/images/services/variants/dijital-baski/forex-dekota-uzeri-uv-baski.jpg",
      },
      {
        name: "Canvas and Art Printing",
        description:
          "Printing on canvas and stretching over a frame, for office, hotel and restaurant walls. With no glass or frame it stays light, an economical answer when many walls need covering in hotels and offices.",
        image:
          "/images/services/variants/dijital-baski/kanvas-ve-tablo-baski.jpg",
      },
      {
        name: "Roll-Up, X-Banner and Poster Printing",
        description:
          "Portable display units for exhibitions and events: assembled in minutes, carried in their own case. It travels in its own case, sets up in minutes and gets reused event after event.",
        image:
          "/images/services/variants/dijital-baski/roll-up-x-banner-afis-baski.jpg",
      },
    ],
    faqs: [
      {
        q: "What file format should I send?",
        a: "Vector PDF, AI or EPS is preferred. For photographic work, 100–150 dpi at final size is sufficient. If you have no artwork, we can design it.",
      },
      {
        q: "What is one-way vision?",
        a: "A perforated film: the graphic reads fully from outside while people inside can see out. It lets you advertise on windows and vehicle glazing without blocking the view.",
      },
      {
        q: "How long does a banner last outdoors?",
        a: "A quality banner with UV lamination holds colour for 2–4 years outdoors. Without lamination and at low weights, that can drop to a single season.",
      },
    ],
  },

  "kurumsal-kimlik": {
    name: "Brand Identity",
    shortName: "Brand Identity",
    tagline: "One consistent language",
    summary:
      "Logo, colour, typography and usage rules — a system that carries from stationery to façade.",
    answer:
      "Brand identity work defines a company's logo, colour palette, typography and usage rules as a single system. Royal Reklam delivers logo design, identity guidelines and applied materials in Samsun under art director İsak Bahar, with signage, vehicle and façade applications drawing from the same system.",
    metaTitle: "Brand Identity & Logo Design in Samsun — Royal Reklam Samsun",
    metaDescription:
      "Brand identity in Samsun: logo design, colour and typography systems, identity guidelines, stationery and applied materials.",
    keywords: [
      "brand identity samsun",
      "logo design turkey",
      "corporate identity samsun",
      "brand guidelines",
    ],
    intro: [
      "A brand identity is not a logo file. The logo is only its most visible part. The real value lies in codifying how that mark is used — which colours, what clear space, which typeface, and how it behaves on every surface.",
      "We hold an unusual advantage here: the team that designs the identity is the team that applies it to façades, vehicles and signage. So we do not produce designs that look good on screen and fail in fabrication. A mark is drawn with channel-letter cutting, single-colour legibility and small-scale behaviour already in mind.",
      "The guidelines we deliver cover usage rules, clear space, colour references (Pantone / CMYK / RGB / RAL), typographic hierarchy and misuse examples — so your brand stays consistent even if you later work with another supplier.",
    ],
    highlights: [
      {
        title: "Designed to be built",
        description:
          "Marks are tested for cutting and single-colour use, not just on screen.",
      },
      {
        title: "Complete colour definition",
        description:
          "Pantone, CMYK, RGB and RAL references so paint matches print.",
      },
      {
        title: "Identity guidelines",
        description: "Usage and misuse examples make brand discipline durable.",
      },
      {
        title: "Art direction",
        description:
          "The whole process runs under İsak Bahar for a single aesthetic voice.",
      },
    ],
    specs: [
      { label: "Logo delivery", value: "AI, EPS, SVG, PDF, transparent PNG" },
      {
        label: "Colour system",
        value: "Pantone, CMYK, RGB and RAL references",
      },
      {
        label: "Typography",
        value: "Primary and secondary families with hierarchy",
      },
      {
        label: "Guidelines",
        value: "PDF identity manual with misuse examples",
      },
      {
        label: "Print set",
        value: "Business cards, letterhead, envelope, folder",
      },
      { label: "Digital set", value: "Social templates and email signature" },
      {
        label: "Applications",
        value: "Signage, vehicle, façade and uniform visuals",
      },
      { label: "Revisions", value: "Two rounds per concept" },
    ],
    priceFactors: [
      "Scope: logo only or full identity system",
      "Number of concepts presented",
      "Depth of the identity guidelines",
      "Count of print and digital deliverables",
      "Refresh of an existing mark versus ground-up design",
      "Whether application mockups are required",
    ],
    useCases: [
      "New retail businesses",
      "Rebranding programmes",
      "Franchise and multi-site operations",
      "Family businesses formalising their identity",
      "Owners updating identity alongside new signage",
    ],
    variants: [
      {
        name: "Logo Design and Refresh",
        description:
          "A logo from scratch, or an existing mark made workable — so it holds up on a sign and on a screen alike. Because it has to work on a sign, a vehicle and a business card, the design is tested at its smallest and largest sizes together.",
        image:
          "/images/services/variants/kurumsal-kimlik/logo-tasarimi-ve-yenileme.jpg",
      },
      {
        name: "Brand Guidelines",
        description:
          "A PDF defining colour, typography, spacing and misuse rules, so every supplier applies the same standard. For brands using several suppliers this is the one document holding things together — printer and sign maker read the same file.",
        image:
          "/images/services/variants/kurumsal-kimlik/kurumsal-kimlik-kilavuzu.jpg",
      },
      {
        name: "Printed Stationery Set",
        description:
          "Business card, letterhead, envelope and folder design — the first physical touchpoint of a corporate impression. A business card is usually the first physical contact with the brand, and stock and print quality shape that impression directly.",
        image:
          "/images/services/variants/kurumsal-kimlik/basili-evrak-seti.jpg",
      },
      {
        name: "Signage Application Standard",
        description:
          "Rules setting out the size, colour and material in which the logo appears on a frontage. At a branch opening the sign's size and colour stop being a discussion — the decision was already made.",
        image:
          "/images/services/variants/kurumsal-kimlik/tabela-uygulama-standardi.jpg",
      },
      {
        name: "Vehicle Livery Template",
        description:
          "Wrap templates prepared per vehicle type, so every vehicle in the fleet looks the same. The layout logic survives a change of vehicle type, so the fleet never looks assembled by accident.",
        image:
          "/images/services/variants/kurumsal-kimlik/arac-giydirme-kimlik-sablonu.jpg",
      },
      {
        name: "Uniform and ID Badge Design",
        description:
          "The logo and colours adapted to workwear, aprons and identity cards. The people on site are the brand walking around, so workwear and badges are built from the same identity language.",
        image:
          "/images/services/variants/kurumsal-kimlik/personel-kiyafeti-yaka-karti-tasarimi.jpg",
      },
      {
        name: "Social Media Template Set",
        description:
          "Editable templates for posts, stories and cover images. Nobody designs from scratch for each post — the content changes inside the template and the layout holds.",
        image:
          "/images/services/variants/kurumsal-kimlik/sosyal-medya-sablon-seti.jpg",
      },
      {
        name: "Menu, Catalogue and Brochure Design",
        description:
          "Printed material presenting products and services, designed to the brand identity. Order and typography influence a purchase as much as price, and the layout is built with that in mind.",
        image:
          "/images/services/variants/kurumsal-kimlik/menu-katalog-brosur-tasarimi.jpg",
      },
      {
        name: "Franchise Application Standards",
        description:
          "A complete identity pack for multi-branch brands to apply at every new opening. A franchisee opening a branch sees what to order and how from one file, without asking head office each time.",
        image:
          "/images/services/variants/kurumsal-kimlik/franchise-uygulama-standartlari.jpg",
      },
    ],
    faqs: [
      {
        q: "Can I order logo design alone?",
        a: "Yes. We do standalone logo work, though we recommend at least a basic guideline covering colour and typography so the mark stays consistent across signage, vehicles and print.",
      },
      {
        q: "Can you build an identity around our existing logo?",
        a: "Certainly. We can develop colour, typography and application systems from your current mark, and redraw it cleanly in vector form for printing and cutting if needed.",
      },
      {
        q: "Who owns the design files?",
        a: "Usage rights transfer to you on delivery and payment, and source files (AI/EPS) are handed over — so nothing is missing if you later work with another agency.",
      },
    ],
  },

  "etiket-sticker": {
    name: "Labels & Stickers",
    shortName: "Labels & Stickers",
    tagline: "Small surface, fine detail",
    summary:
      "Contour-cut product labels, window stickers, floor graphics and promotional decals.",
    answer:
      "Label and sticker production prints onto film or paper stock and contour-cuts it to shape. Royal Reklam produces product labels, window and door stickers, floor graphics and promotional decals in Samsun, with short runs supported and standard orders delivered in 1–3 business days.",
    metaTitle:
      "Label & Sticker Printing in Samsun | Contour Cut — Royal Reklam Samsun",
    metaDescription:
      "Label and sticker printing in Samsun: product labels, window stickers, floor graphics, contour cutting. Short runs welcome, 1–3 day turnaround.",
    keywords: [
      "sticker printing samsun",
      "label printing turkey",
      "contour cut stickers",
      "window stickers samsun",
    ],
    intro: [
      "Labels and stickers are the smallest-budget, highest-contact advertising product you can buy. A label on packaging, an opening-hours sticker on a door or a floor decal is a surface that touches the customer directly.",
      "We contour-cut to any shape — you are not confined to a rectangle. Logo-shaped cuts, wavy edges and internal cut-outs are all possible.",
      "Material follows application: moisture-resistant film for chilled products, static-cling or clear-backed film for glazing, and non-slip laminated stock for floors that will be walked on.",
    ],
    highlights: [
      {
        title: "Contour cutting",
        description:
          "Any shape, including logo outlines — no rectangle requirement.",
      },
      {
        title: "Short runs",
        description: "Digital production makes runs of 50 economical.",
      },
      {
        title: "Application-matched stock",
        description:
          "Moisture-resistant, clear, static-cling or non-slip options.",
      },
      {
        title: "Residue-free removal",
        description:
          "Removable adhesives specified for glazing and window work.",
      },
    ],
    specs: [
      {
        label: "Materials",
        value: "PVC film, clear film, coated label stock, floor film",
      },
      { label: "Cutting", value: "Contour (dieline) cut, sheeted or rolled" },
      { label: "Printing", value: "Eco-solvent / UV, CMYK plus white ink" },
      { label: "Lamination", value: "Matt, gloss or anti-slip for floors" },
      { label: "Adhesive", value: "Permanent or removable" },
      { label: "Minimum run", value: "From 50 pieces" },
      { label: "Outdoor life", value: "2 – 5 years by material" },
      { label: "Turnaround", value: "1 – 3 business days" },
    ],
    priceFactors: [
      "Label size and total quantity",
      "Material type — clear and speciality films cost more",
      "Complexity of the contour cut",
      "Lamination and surface treatments",
      "Whether white ink underprinting is needed on clear stock",
      "Roll winding versus individual cutting",
    ],
    useCases: [
      "Product and packaging labels",
      "Window, door and safety stickers",
      "Floor wayfinding and campaign decals",
      "Promotional and event stickers",
      "Asset and inventory labels",
    ],
    variants: [
      {
        name: "Product and Packaging Labels",
        description:
          "Product labels supplied on rolls or sheets, used on food, cosmetic and manufacturing packaging. Rolls suit automatic labelling machines; sheets suit applying by hand.",
        image:
          "/images/services/variants/etiket-sticker/urun-ve-ambalaj-etiketi.jpg",
      },
      {
        name: "Clear Window Stickers",
        description:
          "Transparent film with no visible background, so lettering appears to sit directly on shop and door glass. With no background colour the lettering appears to float on the glass, and it never darkens the window.",
        image:
          "/images/services/variants/etiket-sticker/seffaf-cam-stickeri.jpg",
      },
      {
        name: "Cut Vinyl Lettering and Logos",
        description:
          "Letters cut and applied without a backing panel — the cleanest look on glass and flat surfaces. It gives the cleanest result on glass, doors and flat walls, but fine detail and small type do not survive cutting.",
        image:
          "/images/services/variants/etiket-sticker/kesim-folyo-yazi-ve-logo.jpg",
      },
      {
        name: "Frosted (Etched-Glass Effect) Film",
        description:
          "Film that mimics sandblasted glass: it lets light through office partitions while blocking the view. Unlike real etching it can be removed, so a change of partition layout does not mean new glass.",
        image: "/images/services/variants/etiket-sticker/buzlu-cam-folyo.jpg",
      },
      {
        name: "Floor Labels",
        description:
          "Anti-slip laminated labels rated to be walked on, for wayfinding and campaign messages. It is a surface people walk on, so the lamination and adhesive are specified differently from an ordinary label.",
        image: "/images/services/variants/etiket-sticker/zemin-etiketi.jpg",
      },
      {
        name: "Doming (Resin-Coated) Labels",
        description:
          "Raised labels finished with clear resin, giving a high-perceived-value finish on devices and products. The resin shields the print from scratches and moisture, giving long life on equipment and machinery labels.",
        image:
          "/images/services/variants/etiket-sticker/doming-kabartma-recineli-etiket.jpg",
      },
      {
        name: "Security / Void Labels",
        description:
          "Labels that leave a mark when removed and cannot be reapplied, used for warranty and tamper sealing. Used as a warranty seal, it shows at a glance whether something has been opened.",
        image:
          "/images/services/variants/etiket-sticker/guvenlik-void-etiket.jpg",
      },
      {
        name: "Asset and Barcode Labels",
        description:
          "Durable numbered or barcoded labels for inventory tracking. It simplifies stocktaking and asset assignment, and the numbers are produced in sequence.",
        image:
          "/images/services/variants/etiket-sticker/demirbas-ve-barkod-etiketi.jpg",
      },
      {
        name: "Promotional and Event Stickers",
        description:
          "Contour-cut stickers for campaigns, openings and events. Short runs are viable, so a design made for one event still makes economic sense.",
        image:
          "/images/services/variants/etiket-sticker/promosyon-ve-etkinlik-stickeri.jpg",
      },
    ],
    faqs: [
      {
        q: "What is the minimum order?",
        a: "Because we print digitally, runs from 50 pieces are viable. Unit cost falls noticeably as quantity rises.",
      },
      {
        q: "Will stickers leave residue on glass?",
        a: "Not with removable adhesive film. Tell us the intended use and we will specify the right adhesive class.",
      },
      {
        q: "Can you print on clear film?",
        a: "Yes. A white ink underprint keeps colours solid; without it, colours blend with whatever is behind the film.",
      },
    ],
  },

  "imalat-tasarim-montaj": {
    name: "Manufacturing, Design & Installation",
    shortName: "Manufacture & Installation",
    tagline: "Turnkey, nationwide",
    summary:
      "Survey, design, in-house fabrication and on-site installation under one contract, with one point of contact.",
    answer:
      "Royal Reklam handles survey, design, fabrication and installation entirely with its own team. Signage and façade work produced at our Samsun workshop is installed across Türkiye by our own crews, giving clients a single contract and a single point of contact, with responsibility never split across subcontractors.",
    metaTitle:
      "Sign Manufacturing, Design & Installation — Royal Reklam Samsun",
    metaDescription:
      "Samsun-based sign manufacturing, design and installation. In-house workshop, nationwide installation crews, single-source responsibility.",
    keywords: [
      "sign manufacturing samsun",
      "sign installation turkey",
      "turnkey signage",
      "nationwide sign installer",
    ],
    intro: [
      "The most common failure in signage is divided responsibility: design from one supplier, fabrication from another, installation from a third — and nobody owns the problem when something goes wrong. Royal Reklam brings that chain under one roof.",
      "We start with a survey — measuring the façade on site, noting the electrical supply, access for installation and any municipal or mall restrictions. After design approval, fabrication happens in our own workshop, which is why we can commit to a delivery date without depending on a subcontractor.",
      "Our installation crews travel beyond Samsun. For brands opening branches across Türkiye, holding an identical standard at every site is the capability clients value most.",
    ],
    highlights: [
      {
        title: "Single point of contact",
        description: "Design, fabrication and installation in one contract.",
      },
      {
        title: "Our own workshop",
        description:
          "Nothing outsourced, so delivery dates can be committed and quality controlled.",
      },
      {
        title: "Nationwide installation",
        description:
          "Consistent standards for multi-site brands across Türkiye.",
      },
      {
        title: "Survey and permit support",
        description:
          "On-site measurement, technical drawings and application documentation.",
      },
    ],
    specs: [
      { label: "Survey", value: "Free on-site survey within Samsun" },
      {
        label: "Design",
        value: "3D visualisation and façade mounting simulation",
      },
      {
        label: "Fabrication",
        value: "In-house CNC cutting, welding and finishing",
      },
      {
        label: "Installation",
        value: "Cherry picker and scaffold, working at height",
      },
      {
        label: "Coverage",
        value: "Samsun and its districts, plus all of Türkiye",
      },
      {
        label: "Documentation",
        value: "Technical drawings and permit application files",
      },
      {
        label: "Maintenance",
        value: "Periodic maintenance agreements on request",
      },
    ],
    priceFactors: [
      "Scope of works and total area",
      "Location and distance (travel and accommodation outside Samsun)",
      "Access method: cherry picker, scaffold or crane",
      "Infrastructure gaps identified at survey (power runs, strengthening)",
      "Number of sites — unit cost falls on multi-site programmes",
      "Extent of permit and documentation support",
    ],
    useCases: [
      "New store and branch openings",
      "Chain-wide standard rollouts",
      "Shopping-mall unit handovers",
      "Bulk signage replacement programmes",
      "Out-of-city branch launches",
    ],
    variants: [
      {
        name: "On-Site Survey and Measurement",
        description:
          "We come to the frontage and record dimensions, electrical supply and installation access. Free within Samsun. Alongside dimensions we record the power point, the façade material and whether an access vehicle can reach it.",
        image:
          "/images/services/variants/imalat-tasarim-montaj/yerinde-kesif-ve-olcu.jpg",
      },
      {
        name: "3D Design and Façade Simulation",
        description:
          'The sign visualised on your own elevation before production, so nothing is a surprise after approval. Seeing it before approval removes the "this isn\'t what I pictured" moment after production.',
        image:
          "/images/services/variants/imalat-tasarim-montaj/3d-tasarim-ve-cephe-simulasyonu.jpg",
      },
      {
        name: "Council / Mall Permit File",
        description:
          "Preparation of the technical drawings and application file required for advertising consent. Size and colour limits differ between districts, and if an application is refused we make the revisions.",
        image:
          "/images/services/variants/imalat-tasarim-montaj/belediye-avm-izin-dosyasi.jpg",
      },
      {
        name: "Turnkey Manufacture and Installation",
        description:
          "The whole process from design to installation under one roof: one contact, one responsibility. Split design, production and installation across firms and responsibility scatters; under one roof there is one person to call.",
        image:
          "/images/services/variants/imalat-tasarim-montaj/anahtar-teslim-imalat-montaj.jpg",
      },
      {
        name: "Working at Height",
        description:
          "Installation on high elevations using cherry pickers and scaffolding, with the required safety equipment in-house. The access plan is settled during the survey, and any street closure permit is applied for in advance.",
        image:
          "/images/services/variants/imalat-tasarim-montaj/yuksekte-montaj.jpg",
      },
      {
        name: "Out-of-Town and Nationwide Installation",
        description:
          "Our installation team travels to branches beyond Samsun, reaching all 81 provinces. Brands with branches in several provinces do not have to find a new sign maker in each city.",
        image:
          "/images/services/variants/imalat-tasarim-montaj/sehir-disi-turkiye-geneli-montaj.jpg",
      },
      {
        name: "Sign Removal and Replacement",
        description:
          "Taking down the old sign, making good the façade and installing the replacement. Fit a new sign without making good the old fixings and ghost marks, and the façade still looks neglected.",
        image:
          "/images/services/variants/imalat-tasarim-montaj/tabela-sokum-ve-yenileme.jpg",
      },
      {
        name: "Scheduled Maintenance and Repair",
        description:
          "Regular checks of LEDs, drivers and fixings, with faults usually resolved in a single visit. A dead or half-lit sign reads as a closed business; regular checks prevent that.",
        image:
          "/images/services/variants/imalat-tasarim-montaj/periyodik-bakim-ve-ariza-servisi.jpg",
      },
      {
        name: "Chain Brand Rollout",
        description:
          "Every branch of a multi-site brand delivered to one standard on a single programme. Producing every branch on one programme lowers cost and removes the differences between locations.",
        image:
          "/images/services/variants/imalat-tasarim-montaj/zincir-marka-toplu-uygulama.jpg",
      },
    ],
    faqs: [
      {
        q: "Do you work outside Samsun?",
        a: "Yes. Fabrication happens at our Samsun workshop and our installation crews travel throughout Türkiye, holding the same standard at every branch.",
      },
      {
        q: "Is the survey chargeable?",
        a: "On-site surveys within Samsun and its districts are free. For out-of-city surveys, travel costs are deducted from the total once the work is contracted.",
      },
      {
        q: "Do you handle the permit process?",
        a: "We prepare the technical drawings, measurements and visuals required for the application. Since the formal submission must be made in the business's name, we hand over the document set and support you throughout.",
      },
      {
        q: "Do you offer maintenance afterwards?",
        a: "Yes. When a fault is reported on work we produced, our own crew attends on site, and periodic maintenance agreements are available.",
      },
    ],
  },
  "yol-panolari": {
    name: "Road and Directional Signs",
    shortName: "Road Signs",
    tagline: "To be found, first be seen",
    summary:
      "Wayfinding systems that bring customers from the roadside to your door and on to the right department.",
    answer:
      "Road and directional signs are outdoor boards that bring drivers and pedestrians to a business or to the right department within it. Royal Reklam manufactures galvanised-post roadside signs faced with retroreflective film, plus indoor wayfinding sets, in Samsun. Average lead time including survey, fabrication and installation is 10–15 working days.",
    metaTitle: "Road and Wayfinding Signs in Samsun | Royal Reklam Samsun",
    metaDescription:
      "Road and directional sign manufacturing in Samsun: reflective boards, site wayfinding, car park and interior floor signage. Free survey. +90 544 230 71 77",
    keywords: [
      "road signs samsun",
      "wayfinding signage samsun",
      "directional sign manufacturing",
      "reflective sign board turkey",
      "interior wayfinding samsun",
    ],
    intro: [
      "Some of the customers a business loses are lost not to price or product but simply because the place could not be found. A driver who misses the turning does not come back; a visitor who cannot tell which block you are in gives up rather than picking up the phone. Directional signage is the cheapest way to close that quiet loss.",
      "We treat wayfinding as a system rather than a single board. From the first roadside sign to the car park entrance and on to floor and door numbers, the same typography, colour and arrow language is used, so visitors always know where they are in the sequence.",
      "Outdoor boards work under wind load and moisture. We fabricate posts from galvanised steel with an electrostatic powder-coat finish, and face boards in retroreflective film so they still read on unlit roads. The aim is that you fit the sign once and forget it for years.",
    ],
    highlights: [
      {
        title: "Readable after dark",
        description:
          "Retroreflective film returns headlight beams to their source, so the board reads at night even on unlit roads.",
      },
      {
        title: "Posts sized to wind load",
        description:
          "Post section and foundation depth are set from the board's surface area and the wind load at that location.",
      },
      {
        title: "Galvanised body, powder-coated finish",
        description:
          "Galvanised steel and electrostatic powder coating hold off corrosion for years in Black Sea humidity.",
      },
      {
        title: "One consistent wayfinding language",
        description:
          "Every board from road to door shares the same typography, colour and arrow layout, so visitors never hesitate.",
      },
    ],
    specs: [
      {
        label: "Board material",
        value: "Galvanised steel, aluminium or aluminium composite",
      },
      {
        label: "Face",
        value: "Retroreflective film (class 1 or 2) or plain coloured vinyl",
      },
      { label: "Post", value: "Galvanised steel tube or box section" },
      {
        label: "Finish",
        value: "Electrostatic powder coating, RAL colour reference",
      },
      { label: "Printing", value: "UV-stable digital print or cut vinyl" },
      {
        label: "Foundation",
        value: "Reinforced concrete, sized to ground conditions and wind load",
      },
      {
        label: "Sizes",
        value: "Standard board sizes or bespoke to the project",
      },
      { label: "Outdoor life", value: "7 – 10 years with reflective film" },
    ],
    priceFactors: [
      "Board size and total number of signs",
      "Reflective film class — better night readability costs more in material",
      "Post height and the section of the supporting structure",
      "Whether a concrete foundation is needed, and ground conditions",
      "Installation location and plant access",
      "Highways authority or council permit process",
    ],
    useCases: [
      "Roadside business and facility direction signs",
      "Wayfinding within housing developments, campuses and factories",
      "Car park entry, exit and level signage",
      "Interior wayfinding sets for hospitals, schools and public buildings",
      "Construction site information and safety boards",
    ],
    variants: [
      {
        name: "Twin-Post Highway Sign",
        description:
          "A large-scale board on two steel posts, readable from a distance on intercity roadsides. Wind load grows with surface area, so post section and foundation depth are calculated to match.",
        image:
          "/images/services/variants/yol-panolari/cift-direkli-buyuk-yol-panosu.jpg",
      },
      {
        name: "Single-Post Directional Sign",
        description:
          "A mid-size single-post sign for business entrances and turn-off points. It usually sits a few hundred metres before the turning so drivers do not overshoot the entrance.",
        image:
          "/images/services/variants/yol-panolari/tek-ayakli-yonlendirme-levhasi.jpg",
      },
      {
        name: "Arrow Directional Sign",
        description:
          "Gives direction, distance and business name together; several businesses can share one post. Several businesses share one post, which keeps industrial estates and business parks from filling with separate signs.",
        image:
          "/images/services/variants/yol-panolari/ok-yonlu-yonlendirme-panosu.jpg",
      },
      {
        name: "Reflective Sign Board",
        description:
          "Faced with retroreflective film that returns headlight beams, so it reads at night on unlit roads. On a lit street it is money wasted; on a dark intercity road it is essential.",
        image: "/images/services/variants/yol-panolari/reflektif-levha.jpg",
      },
      {
        name: "Residential Block and Wayfinding Signs",
        description:
          "Block, car park and amenity signage across a housing development under a single design language. If block, car park and amenity signs are not built in one language, visitors have to work it out again at every junction.",
        image:
          "/images/services/variants/yol-panolari/site-ici-blok-ve-yonlendirme-panolari.jpg",
      },
      {
        name: "Car Park Direction and Level Signs",
        description:
          "A set of signs covering entry, exit, level and bay numbering. Level and bay numbers are set large so drivers find the car again on the way back.",
        image:
          "/images/services/variants/yol-panolari/otopark-yonlendirme-ve-kat-panolari.jpg",
      },
      {
        name: "Interior Floor and Door Signage",
        description:
          "An indoor wayfinding set of floor plans, room numbers and department signs. A floor plan at the entrance and a number at each door let visitors get there without asking at reception.",
        image:
          "/images/services/variants/yol-panolari/bina-ici-kat-ve-kapi-yonlendirme.jpg",
      },
      {
        name: "Emergency Exit and Safety Signs",
        description:
          "Photoluminescent emergency exit, fire and warning signs to regulation. Compliance is checked during inspection, and the photoluminescent face stays visible even in a power cut.",
        image:
          "/images/services/variants/yol-panolari/acil-cikis-ve-guvenlik-levhalari.jpg",
      },
      {
        name: "Site Information Board",
        description:
          "A site-entrance board carrying building permit details and health-and-safety notices. Building permit details must be displayed at the site entrance, and this board discharges that obligation.",
        image:
          "/images/services/variants/yol-panolari/santiye-bilgilendirme-panosu.jpg",
      },
    ],
    faqs: [
      {
        q: "Do road signs need a permit?",
        a: "It depends on where the sign stands. Signs within the business's own plot normally need only council advertising consent, while boards inside the highway boundary require permission from the highways authority. We establish which body applies during the survey and prepare the application file.",
      },
      {
        q: "What is the difference between reflective and plain board?",
        a: "A plain vinyl-faced board cannot be read when no light falls on it. Retroreflective film returns headlight beams towards their source, so the sign reads at night on unlit roads. On a well-lit street plain vinyl may be enough; on an intercity roadside, reflective is the right choice.",
      },
      {
        q: "Do you produce interior wayfinding as well?",
        a: "Yes. Floor plans, room numbers, department and emergency exit signs are produced under the same design language as the exterior signs, so a visitor follows one consistent set of markers from the car park to the door.",
      },
    ],
  },
  "led-ekranlar": {
    name: "LED Screen Systems",
    shortName: "LED Screens",
    tagline: "A changing message on a fixed façade",
    summary:
      "Full-colour LED displays for indoor and outdoor use, scrolling text systems and remotely managed price displays.",
    answer:
      "An LED display is an electronic advertising surface built from modular LED panels, able to show video, images and text in motion. Royal Reklam installs outdoor and indoor LED displays, scrolling text units and fuel price displays in Samsun. Average lead time including survey, installation and software setup is 15–30 working days.",
    metaTitle: "LED Display Systems in Samsun | Royal Reklam Samsun",
    metaDescription:
      "LED display installation in Samsun: outdoor full-colour screens, indoor displays, scrolling text and price boards. Survey, installation and software. +90 544 230 71 77",
    keywords: [
      "led display samsun",
      "led screen price samsun",
      "scrolling text sign samsun",
      "outdoor led display turkey",
      "led screen installation",
    ],
    intro: [
      "A printed sign carries one message: whatever it said the day it went up, it keeps saying for years. An LED display turns the same frontage into a campaign during the day, a menu in the evening and an announcement at the weekend — with no trip to the printer and no installation crew.",
      "We do not treat an LED display as something you unbox and hang. Pixel pitch is chosen for the distance it will be viewed from and brightness for how much daylight the position takes; after installation we hand over the content software and show you how to run it.",
      "With outdoor displays the real issues are brightness and sealing. A low-brightness screen on a sun-facing elevation cannot be read during the day, and an underprotected cabinet will not survive many Black Sea winters. Those two criteria drive what we specify.",
    ],
    highlights: [
      {
        title: "Pixel pitch set by viewing distance",
        description:
          "Pitch is chosen for how far away the audience stands: fine for close viewing, coarser for a roadside screen.",
      },
      {
        title: "Bright enough for daylight",
        description:
          "Outdoor modules are specified to stay readable in direct sun, and dim automatically after dark.",
      },
      {
        title: "You control the content",
        description:
          "The software is handed over after installation, so you can change images and text from a computer or phone.",
      },
      {
        title: "Serviced module by module",
        description:
          "When a fault occurs only the affected cabinet or module is replaced, not the whole display.",
      },
    ],
    specs: [
      { label: "Pixel pitch", value: "Outdoor P4 – P10, indoor P1.8 – P3" },
      {
        label: "Brightness",
        value: "Outdoor 5,000 – 7,000 nits, indoor 800 – 1,500 nits",
      },
      { label: "Cabinet", value: "Die-cast aluminium or sheet steel, modular" },
      { label: "Ingress protection", value: "Outdoor IP65 front, IP54 rear" },
      { label: "Refresh rate", value: "≥ 1,920 Hz — no banding on camera" },
      {
        label: "Content management",
        value: "Software over the network; offline upload by USB",
      },
      {
        label: "Video source",
        value: "HDMI, network connection or built-in player",
      },
      { label: "LED life", value: "50,000 – 100,000 hours" },
    ],
    priceFactors: [
      "Display size (total surface in m²)",
      "Pixel pitch — cost per square metre rises steeply as pitch gets finer",
      "Indoor or outdoor, and for outdoor the brightness and protection class",
      "Cabinet quality and module brand",
      "Supporting structure and installation height",
      "Electrical supply, distribution board and earthing requirements",
    ],
    useCases: [
      "High-street shops and chain branch frontages",
      "Fuel station price displays",
      "Pharmacy, grocery and shop-window scrolling text",
      "Indoor displays for malls, hotel lobbies and showrooms",
      "Event, conference and stage applications",
    ],
    variants: [
      {
        name: "Outdoor Full-Colour LED Display",
        description:
          "P4–P10 pixel pitch at high brightness, readable in direct daylight. Brightness is specified for daylight and dimmed automatically after dark — otherwise it dazzles at night and draws complaints.",
        image:
          "/images/services/variants/led-ekranlar/dis-mekan-tam-renkli-led-ekran.jpg",
      },
      {
        name: "Indoor LED Display",
        description:
          "A fine pitch such as P1.8–P3, giving a sharp image at the close viewing distances of shops and lobbies. Close viewing calls for a finer pitch, which makes the same square metre markedly more expensive than an outdoor screen.",
        image: "/images/services/variants/led-ekranlar/ic-mekan-led-ekran.jpg",
      },
      {
        name: "Scrolling Text (Single-Colour LED Strip)",
        description:
          "Text running across a single-colour strip — the most economical moving display for pharmacy, grocery and branch windows. For short messages that change often — a duty pharmacy, the day's menu, an offer — it is the most economical option.",
        image: "/images/services/variants/led-ekranlar/kayan-yazi-led-bant.jpg",
      },
      {
        name: "LED Price Display",
        description:
          "Digit modules for fuel forecourts, updated remotely so nobody has to climb the totem. Prices update centrally, removing both the trip up the totem and the safety risk that comes with it.",
        image:
          "/images/services/variants/led-ekranlar/led-fiyat-gostergesi.jpg",
      },
      {
        name: "In-Window LED Poster Display",
        description:
          "A slim vertical display set into the window, showing campaign artwork even outside opening hours. It keeps working behind a closed shutter, so the shop stays visible outside opening hours.",
        image:
          "/images/services/variants/led-ekranlar/vitrin-ici-led-poster-ekran.jpg",
      },
      {
        name: "Double-Sided LED Totem Display",
        description:
          "A double-sided screen integrated into a totem body, seen from both directions of traffic. Where footfall arrives from both directions, one unit serves both.",
        image:
          "/images/services/variants/led-ekranlar/cift-yuz-led-totem-ekran.jpg",
      },
      {
        name: "Curved / Corner LED Display",
        description:
          "Modular panels wrapping a building corner or curved surface, using the façade without a break. On a corner building it uses both elevations without a break, which flat panels cannot achieve.",
        image:
          "/images/services/variants/led-ekranlar/kavisli-kose-led-ekran.jpg",
      },
      {
        name: "LED Screen Hire",
        description:
          "Hire for fixed-term events such as concerts, conferences and openings, including rigging and de-rigging. For businesses needing a screen a few times a year it costs far less than buying, with rigging included.",
        image: "/images/services/variants/led-ekranlar/kiralik-led-ekran.jpg",
      },
      {
        name: "Scoreboard and Sports Hall Display",
        description:
          "A hall display showing score, time and fouls, operated by remote control. Score, time and fouls are driven from a handset, so one person at the table controls everything.",
        image:
          "/images/services/variants/led-ekranlar/skor-ve-spor-salonu-panosu.jpg",
      },
    ],
    faqs: [
      {
        q: "What determines the price of an LED display?",
        a: "Square metres and pixel pitch. A finer pitch packs far more LEDs into the same area, so cost rises steeply. Establishing the real viewing distance therefore prevents wasted money — fitting an indoor pitch to a roadside screen spends budget on detail nobody can see.",
      },
      {
        q: "Can I change the content myself?",
        a: "Yes. The content management software is handed over after installation and we show you how to use it. Images, video and text can be changed over the network from a computer, or uploaded by USB where there is no internet connection.",
      },
      {
        q: "Does rain affect an outdoor display?",
        a: "Not when the right protection class is specified. Outdoor displays are standardly IP65 at the front and IP54 at the rear, which seals them against rain and dust. Problems usually come from an indoor display being used outside.",
      },
    ],
  },
};
