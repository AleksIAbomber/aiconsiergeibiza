export type Lang = "es" | "en" | "it" | "fr" | "de" | "nl";

type HomeCopy = {
  brandName: string;
  brandTagline: string;

  heroTitle: string;
  heroDesc: string;

  startChat: string;
  goDirect: string;
  faqLink: string;

  adLabel: string;
  adBox: string;

  cardsTitle: string;

  restaurants: string;
  restaurantsDesc: string;

  beaches: string;
  beachesDesc: string;

  party: string;
  partyDesc: string;

  boat: string;
  boatDesc: string;
};

type FAQItem = { q: string; a: string };

type FAQCopy = {
  title: string;
  intro: string;
  items: FAQItem[];
  cta: string;
};

type Copy = HomeCopy & {
  chatBrandTitle: string;
  chatBrandSubtitle: string;
  chatWelcome: string;
  faq: FAQCopy;
};

const COPY: Record<Lang, Copy> = {
  es: {
    brandName: "InfoPoint Ibiza",
    brandTagline: "Tu guía inteligente para vivir Ibiza a tu manera.",
chatBrandTitle: "InfoPoint Ibiza",
    chatBrandSubtitle: "Tu guía local, aquí para ayudarte",
    chatWelcome:
      "Hola, soy tu guía local de Ibiza. Dime cuántos sois, presupuesto por persona y qué plan buscas (playa, restaurante, fiesta, barco o actividades).",
    heroTitle: "Cuéntame el plan… yo me encargo del resto.",
    heroDesc:
      "Dime qué te apetece hoy, con quién vienes y qué rollo buscas. Te propongo sitios y planes que encajen contigo, sin vueltas ni búsquedas eternas.",

    startChat: "Hablar con el concierge",
    goDirect: "Ver ideas rápido",
    faqLink: "Preguntas frecuentes (FAQ)",

    adLabel: "Publicidad (demo)",
    adBox: "Aquí irá un banner no invasivo",

    cardsTitle: "Explora rápido",

    restaurants: "Restaurantes",
    restaurantsDesc: "Desde tapas hasta sitios top: dime tu vibe y presupuesto.",

    beaches: "Playas",
    beachesDesc: "Tranquila, bonita, con chiringuito o más fiestera: tú eliges.",

    party: "Discotecas",
    partyDesc: "Techno, comercial, open-air, cabaret… te ubico según tu estilo.",

    boat: "Barcos",
    boatDesc: "Atardecer, day party o relax: te recomiendo lo que encaja contigo.",

    faq: {
      title: "Preguntas frecuentes",
      intro:
        "Respuestas rápidas para entender cómo funciona InfoPoint Ibiza y sacarle el máximo partido.",
      items: [
        {
          q: "¿InfoPoint Ibiza es gratuito?",
          a: "Sí. El uso básico es gratuito para el usuario.",
        },
        {
          q: "¿Qué tipo de recomendaciones ofrece?",
          a: "Restaurantes, playas, discotecas, barcos y actividades en Ibiza, adaptadas a tu estilo.",
        },
        {
          q: "¿Las recomendaciones son reales?",
          a: "Sí. Trabajamos con una base de datos curada de lugares reales. Si algo no encaja, te hago una pregunta para afinar.",
        },
        {
          q: "¿La IA inventa lugares?",
          a: "La idea es que no: priorizamos datos curados y reglas para evitar inventar. Si falta info, te pedirá un detalle.",
        },
        {
          q: "¿Necesito registrarme?",
          a: "No. Puedes usarlo sin registro.",
        },
        {
          q: "¿Qué significa LGBT-friendly?",
          a: "Que el lugar suele ser especialmente acogedor con el público LGBT+ o popular dentro de esa comunidad.",
        },
        {
          q: "¿Cómo puedo sugerir cambios o corregir info?",
          a: "Escríbenos por WhatsApp desde el botón de contacto y lo revisamos.",
        },
      ],
      cta:
        "¿No encuentras tu duda? Entra al chat y cuéntame qué buscas, o escríbenos por WhatsApp.",
    },
  },

  en: {
    brandName: "InfoPoint Ibiza",
    brandTagline: "Your smart guide to Ibiza, your way.",
chatBrandTitle: "InfoPoint Ibiza",
    chatBrandSubtitle: "Your local guide, here to help",
    chatWelcome:
      "Hi, I’m your local Ibiza guide. Tell me your group size, budget per person, and what you’re looking for (beach, restaurant, party, boat, or activities).",
    heroTitle: "Tell me the vibe… I’ll handle the rest.",
    heroDesc:
      "Tell me what you feel like today, who you’re with, and the mood you want. I’ll suggest places and plans that fit you—no endless searching.",

    startChat: "Chat with the concierge",
    goDirect: "Quick ideas",
    faqLink: "FAQ",

    adLabel: "Ads (demo)",
    adBox: "A non-intrusive banner will go here",

    cardsTitle: "Explore fast",

    restaurants: "Restaurants",
    restaurantsDesc: "From tapas to top spots—tell me your vibe and budget.",

    beaches: "Beaches",
    beachesDesc: "Chill, beautiful, beach club or party—your call.",

    party: "Clubs",
    partyDesc: "Techno, mainstream, open-air, cabaret… matched to your style.",

    boat: "Boats",
    boatDesc: "Sunset, day party or relaxed cruising—pick your mood.",

    faq: {
      title: "Frequently asked questions",
      intro: "Quick answers about how InfoPoint Ibiza works.",
      items: [
        { q: "Is InfoPoint Ibiza free?", a: "Yes. Basic use is free for users." },
        {
          q: "What do you recommend?",
          a: "Restaurants, beaches, clubs, boats and activities in Ibiza—tailored to your style.",
        },
        {
          q: "Are recommendations real?",
          a: "Yes. We use a curated database of real places. If details are missing, we’ll ask to refine.",
        },
        {
          q: "Does the AI invent places?",
          a: "We aim not to: curated data + rules to avoid hallucinations. If unsure, it will ask a question.",
        },
        { q: "Do I need to sign up?", a: "No registration needed." },
        {
          q: "What does LGBT-friendly mean?",
          a: "Places known to be welcoming and popular within the LGBT+ community.",
        },
        {
          q: "How can I suggest updates?",
          a: "Message us on WhatsApp via the contact button and we’ll review it.",
        },
      ],
      cta: "Still have questions? Jump into the chat or message us on WhatsApp.",
    },
  },

  it: {
    brandName: "InfoPoint Ibiza",
    brandTagline: "La tua guida smart per vivere Ibiza a modo tuo.",
chatBrandTitle: "InfoPoint Ibiza",
    chatBrandSubtitle: "La tua guida locale, qui per aiutarti",
    chatWelcome:
      "Ciao, sono la tua guida locale a Ibiza. Dimmi in quanti siete, budget a persona e che tipo di piano cerchi (spiaggia, ristorante, party, barca o attività).",
    heroTitle: "Dimmi che vibe vuoi… al resto penso io.",
    heroDesc:
      "Dimmi cosa ti va oggi, con chi sei e che atmosfera cerchi. Ti propongo posti e piani adatti a te, senza perdere tempo.",

    startChat: "Parla con il concierge",
    goDirect: "Idee rapide",
    faqLink: "FAQ",

    adLabel: "Pubblicità (demo)",
    adBox: "Qui andrà un banner non invasivo",

    cardsTitle: "Esplora subito",

    restaurants: "Ristoranti",
    restaurantsDesc: "Dalle tapas ai posti top: vibe e budget e ci penso io.",

    beaches: "Spiagge",
    beachesDesc: "Relax, belle, chiringuito o più party: come preferisci.",

    party: "Club",
    partyDesc: "Techno, commerciale, open-air, cabaret… in base al tuo stile.",

    boat: "Barche",
    boatDesc: "Tramonto, day party o relax: ti consiglio quello giusto.",

    faq: {
      title: "Domande frequenti",
      intro: "Risposte rapide su come funziona InfoPoint Ibiza.",
      items: [
        { q: "È gratuito?", a: "Sì. L’uso base è gratuito." },
        {
          q: "Cosa consigli?",
          a: "Ristoranti, spiagge, club, barche e attività a Ibiza, su misura per te.",
        },
        {
          q: "I consigli sono reali?",
          a: "Sì. Usiamo un database curato di posti reali. Se manca un dettaglio, te lo chiediamo.",
        },
        {
          q: "L’IA inventa posti?",
          a: "Cerchiamo di evitarlo: dati curati + regole. Se non è chiaro, faremo una domanda.",
        },
        { q: "Serve registrarsi?", a: "No, non serve." },
        {
          q: "Cosa significa LGBT-friendly?",
          a: "Luoghi noti per essere accoglienti e popolari nella comunità LGBT+.",
        },
        {
          q: "Come segnalo aggiornamenti?",
          a: "Scrivici su WhatsApp dal pulsante di contatto.",
        },
      ],
      cta: "Non trovi la risposta? Entra in chat o scrivici su WhatsApp.",
    },
  },

  fr: {
    brandName: "InfoPoint Ibiza",
    brandTagline: "Ton guide intelligent pour vivre Ibiza à ta façon.",

    heroTitle: "Dis-moi ton plan… je m’occupe du reste.",
    heroDesc:
      "Dis-moi ce que tu veux faire aujourd’hui, avec qui tu es et l’ambiance que tu cherches. Je te propose des lieux qui te correspondent, sans perte de temps.",
chatBrandTitle: "InfoPoint Ibiza",
    chatBrandSubtitle: "Ton guide local, là pour t’aider",
    chatWelcome:
      "Salut, je suis ton guide local à Ibiza. Dis-moi combien vous êtes, le budget par personne et ce que tu cherches (plage, resto, soirée, bateau ou activités).",
    startChat: "Parler au concierge",
    goDirect: "Idées rapides",
    faqLink: "FAQ",

    adLabel: "Publicité (démo)",
    adBox: "Ici, un banner discret",

    cardsTitle: "Explorer vite",

    restaurants: "Restaurants",
    restaurantsDesc: "Tapas ou spots top : dis-moi ton style et ton budget.",

    beaches: "Plages",
    beachesDesc: "Calme, belle, beach club ou plus festive : à toi de voir.",

    party: "Clubs",
    partyDesc: "Techno, commercial, open-air, cabaret… selon ton style.",

    boat: "Bateaux",
    boatDesc: "Sunset, day party ou chill : je te guide.",

    faq: {
      title: "Questions fréquentes",
      intro: "Réponses rapides sur InfoPoint Ibiza.",
      items: [
        { q: "C’est gratuit ?", a: "Oui. L’usage de base est gratuit." },
        {
          q: "Que recommandez-vous ?",
          a: "Restaurants, plages, clubs, bateaux et activités à Ibiza, selon ton style.",
        },
        {
          q: "Les recommandations sont-elles réelles ?",
          a: "Oui. Base de données de lieux réels + questions si besoin pour affiner.",
        },
        {
          q: "L’IA invente-t-elle des lieux ?",
          a: "On évite : données curées + règles. Si c’est flou, on te posera une question.",
        },
        { q: "Faut-il s’inscrire ?", a: "Non, pas besoin." },
        {
          q: "LGBT-friendly, ça veut dire quoi ?",
          a: "Des lieux connus pour être accueillants et populaires auprès de la communauté LGBT+.",
        },
        {
          q: "Comment proposer une correction ?",
          a: "Écris-nous sur WhatsApp via le bouton de contact.",
        },
      ],
      cta: "Tu ne trouves pas ? Va au chat ou écris-nous sur WhatsApp.",
    },
  },

  de: {
    brandName: "InfoPoint Ibiza",
    brandTagline: "Dein smarter Guide für Ibiza – so wie du es willst.",

    heroTitle: "Sag mir den Vibe… ich kümmere mich um den Rest.",
    heroDesc:
      "Sag mir, worauf du heute Lust hast, mit wem du unterwegs bist und welche Stimmung du willst. Ich schlage dir passende Spots vor – ohne endloses Suchen.",

    startChat: "Mit dem Concierge chatten",
    goDirect: "Schnelle Ideen",
    faqLink: "FAQ",
chatBrandTitle: "InfoPoint Ibiza",
    chatBrandSubtitle: "Dein lokaler Guide – ich helfe dir",
    chatWelcome:
      "Hi, ich bin dein lokaler Ibiza-Guide. Sag mir Gruppengröße, Budget pro Person und was du suchst (Strand, Restaurant, Party, Boot oder Aktivitäten).",
    adLabel: "Werbung (Demo)",
    adBox: "Hier kommt ein dezenter Banner hin",

    cardsTitle: "Schnell entdecken",

    restaurants: "Restaurants",
    restaurantsDesc: "Von Tapas bis Top-Spots: Vibe + Budget, und ich helfe.",

    beaches: "Strände",
    beachesDesc: "Chillig, schön, Beach Club oder Party – wie du magst.",

    party: "Clubs",
    partyDesc: "Techno, Mainstream, Open-Air, Cabaret… passend zu deinem Stil.",

    boat: "Boote",
    boatDesc: "Sunset, Day Party oder entspannt – ich empfehle dir das Richtige.",

    faq: {
      title: "Häufige Fragen",
      intro: "Kurze Antworten zu InfoPoint Ibiza.",
      items: [
        { q: "Ist es kostenlos?", a: "Ja. Die Basisnutzung ist kostenlos." },
        {
          q: "Was empfiehlst du?",
          a: "Restaurants, Strände, Clubs, Boote und Aktivitäten auf Ibiza – personalisiert.",
        },
        {
          q: "Sind die Empfehlungen real?",
          a: "Ja. Kuratierte Datenbank realer Orte + Rückfragen, wenn etwas fehlt.",
        },
        {
          q: "Erfindet die KI Orte?",
          a: "Wir versuchen das zu vermeiden: kuratierte Daten + Regeln. Wenn unklar, fragen wir nach.",
        },
        { q: "Muss ich mich registrieren?", a: "Nein." },
        {
          q: "Was bedeutet LGBT-friendly?",
          a: "Orte, die als besonders offen und beliebt in der LGBT+ Community gelten.",
        },
        {
          q: "Wie kann ich Updates vorschlagen?",
          a: "Schreib uns per WhatsApp über den Kontakt-Button.",
        },
      ],
      cta: "Noch Fragen? Starte den Chat oder schreib uns auf WhatsApp.",
    },
  },

  nl: {
    brandName: "InfoPoint Ibiza",
    brandTagline: "Jouw slimme gids voor Ibiza, precies zoals jij het wilt.",

    heroTitle: "Vertel me je vibe… ik regel de rest.",
    heroDesc:
      "Zeg wat je vandaag wilt doen, met wie je bent en welke sfeer je zoekt. Ik geef je passende spots en plannen—zonder eindeloos zoeken.",

    startChat: "Chat met de concierge",
    goDirect: "Snelle ideeën",
    faqLink: "FAQ",
chatBrandTitle: "InfoPoint Ibiza",
    chatBrandSubtitle: "Je lokale gids, ik help je graag",
    chatWelcome:
      "Hoi, ik ben je lokale gids op Ibiza. Vertel me met hoeveel jullie zijn, budget per persoon en wat je zoekt (strand, restaurant, uitgaan, boot of activiteiten).",
    adLabel: "Advertentie (demo)",
    adBox: "Hier komt een niet-opdringerige banner",

    cardsTitle: "Snel ontdekken",

    restaurants: "Restaurants",
    restaurantsDesc: "Van tapas tot top spots: vertel je vibe en budget.",

    beaches: "Stranden",
    beachesDesc: "Rustig, mooi, beach club of party—jij kiest.",

    party: "Clubs",
    partyDesc: "Techno, mainstream, open-air, cabaret… afgestemd op jouw stijl.",

    boat: "Boten",
    boatDesc: "Sunset, day party of relaxed—ik help je kiezen.",

    faq: {
      title: "Veelgestelde vragen",
      intro: "Snelle antwoorden over hoe InfoPoint Ibiza werkt.",
      items: [
        { q: "Is het gratis?", a: "Ja. Basisgebruik is gratis voor gebruikers." },
        {
          q: "Wat kun je aanbevelen?",
          a: "Restaurants, stranden, clubs, boten en activiteiten op Ibiza—op jouw stijl afgestemd.",
        },
        {
          q: "Zijn aanbevelingen echt?",
          a: "Ja. We gebruiken een samengestelde database met echte plekken. Als iets ontbreekt, vragen we door.",
        },
        {
          q: "Verzint de AI plekken?",
          a: "We proberen dat te voorkomen: curated data + regels. Als het niet duidelijk is, stellen we een vraag.",
        },
        { q: "Moet ik me registreren?", a: "Nee, dat hoeft niet." },
        {
          q: "Wat betekent LGBT-friendly?",
          a: "Plekken die bekendstaan als extra welkom en populair binnen de LGBT+ community.",
        },
        {
          q: "Hoe geef ik updates door?",
          a: "Stuur ons een WhatsApp via de contactknop en we checken het.",
        },
      ],
      cta: "Nog vragen? Start de chat of stuur ons een WhatsApp.",
    },
  },
};

export function t(lang: Lang): Copy {
  return COPY[lang] ?? COPY.es;
}