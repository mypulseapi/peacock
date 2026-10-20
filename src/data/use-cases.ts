import {
  Megaphone,
  BookOpen,
  Target,
  Newspaper,
  GraduationCap,
  Plane,
  Bot,
  LayoutDashboard,
  Search,
  Gift,
  Tag,
  Ticket,
  ScrollText,
  Radio,
  Globe,
  Users,
  Rss,
  Lock,
  BarChart3,
  UserSearch,
  Crosshair,
  Film,
  Headphones,
  Podcast,
  Clock,
  CreditCard,
  Compass,
  Map,
  BrainCircuit,
  Lightbulb,
  BookMarked,
  type LucideIcon,
} from "lucide-react";

export interface Signal {
  label: string;
  value: string;
}

export interface UseCase {
  icon: LucideIcon;
  industry: string; // slug matching industries.ts
  category: string;
  title: string;
  offlineStory: string;
  signals: Signal[];
  persona: string;
  confidence: number;
  result: string;
  accentColor: "blue" | "green" | "purple";
}

export const useCases: UseCase[] = [
  // ─── E-COMMERCE ─────────────────────────────────────────
  {
    icon: LayoutDashboard,
    industry: "ecommerce",
    category: "Personalized Landing Pages",
    title: "The Bargain Hunter Returns",
    offlineStory:
      "A regular walks into a department store. The sales associate recognizes the type, always heads to the clearance rack first, checks price tags before looking at the item. They greet her with: 'Great timing, we just marked down the spring collection.'",
    signals: [
      { label: "Referrer", value: '"flash sale" email campaign' },
      { label: "History", value: "3 prior visits, all during sales" },
      { label: "Device", value: "Android, 2 years old" },
      { label: "Behavior", value: "Sorted by price: low to high" },
    ],
    persona: "Returning Bargain Hunter",
    confidence: 91,
    result:
      'Landing page shows deals-first layout with countdown timers and "ending soon" badges.',
    accentColor: "blue",
  },
  {
    icon: Search,
    industry: "ecommerce",
    category: "Intelligent Search",
    title: "The Marathon Runner's Query",
    offlineStory:
      "A customer walks into a running store wearing race bibs on their jacket. They ask for 'running shoes.' The associate doesn't show casual sneakers, they head straight to the performance wall with cushioned trainers and racing flats.",
    signals: [
      { label: "Referrer", value: "Marathon training blog article" },
      { label: "Search", value: '"running shoes"' },
      { label: "Device", value: "Garmin watch paired (fitness user)" },
      { label: "Time", value: "5:45 AM (early riser / runner)" },
    ],
    persona: "Performance Runner",
    confidence: 89,
    result:
      "Search results prioritize cushioned trainers and marathon shoes over casual sneakers.",
    accentColor: "green",
  },
  {
    icon: Gift,
    industry: "ecommerce",
    category: "Cross-Sell & Upsell",
    title: "The Smart Basket Builder",
    offlineStory:
      "A customer picks up a high-end espresso machine. A knowledgeable sales associate appears: 'That pairs perfectly with our premium grinder and this locally roasted bean subscription.' They don't suggest a cheap drip coffee maker.",
    signals: [
      { label: "Cart", value: "Premium espresso machine ($599)" },
      { label: "Browsing", value: "Spent 3 min on coffee accessories" },
      { label: "Persona", value: "Premium buyer (inferred from signals)" },
      { label: "Time", value: "Weekend morning browsing" },
    ],
    persona: "Premium Home Barista",
    confidence: 87,
    result:
      "Cart suggests premium grinder + specialty beans, not budget accessories.",
    accentColor: "purple",
  },
  {
    icon: Tag,
    industry: "ecommerce",
    category: "Smart Promotions",
    title: "The Price-Sensitive Nudge",
    offlineStory:
      "A regular at a clothing store always browses the full-price section but only buys during promotions. The manager knows this and whispers to the associate: 'Offer the 15% loyalty discount, she'll convert.'",
    signals: [
      { label: "Visits", value: "5th visit, zero purchases" },
      { label: "Behavior", value: "Adds to cart, abandons at checkout" },
      { label: "Pattern", value: "Always returns during sales events" },
      { label: "Cart value", value: "$127 (just above free shipping)" },
    ],
    persona: "Price-Sensitive Repeat Visitor",
    confidence: 93,
    result:
      "Triggered 10% off popup with threshold they're likely to hit; free shipping nudge.",
    accentColor: "blue",
  },
  {
    icon: Ticket,
    industry: "ecommerce",
    category: "Voucher Targeting",
    title: "The Right Offer, Right Moment",
    offlineStory:
      "A first-time visitor to a boutique is clearly interested but hesitating at the door. The owner doesn't slash prices, she offers a complimentary gift-wrapping service, understanding it's the experience, not the price, holding them back.",
    signals: [
      { label: "Visit type", value: "First-time visitor" },
      { label: "Intent", value: "Exit intent detected (mouse to tab)" },
      { label: "Browsing", value: "Viewed 8 items, no price filter used" },
      { label: "Persona", value: "Not price-sensitive (inferred)" },
    ],
    persona: "Experience-Driven First Visitor",
    confidence: 85,
    result:
      "Offers free shipping (not discount), matches their non-price-sensitive persona.",
    accentColor: "green",
  },

  // ─── SOCIAL NETWORKING ──────────────────────────────────
  {
    icon: ScrollText,
    industry: "social-networking",
    category: "Feed Curation",
    title: "The Late-Night Tech Scroller",
    offlineStory:
      "A friend at a party notices you're in tech, talking about AI and startups. They don't recommend reality TV; they say 'Have you seen this deep-dive on transformer architectures?' They read the room.",
    signals: [
      { label: "Time", value: "11:30 PM (late-night session)" },
      { label: "Device", value: "MacBook Pro (developer)" },
      { label: "Engagement", value: "Reads full articles, not just headlines" },
      { label: "Pattern", value: "Skips viral/entertainment content" },
    ],
    persona: "Deep-Dive Tech Reader",
    confidence: 92,
    result:
      "Feed prioritizes long-form tech content and analysis over viral clips and memes.",
    accentColor: "purple",
  },
  {
    icon: Radio,
    industry: "social-networking",
    category: "Privacy-Safe Ad Matching",
    title: "The Fitness Enthusiast",
    offlineStory:
      "At a coffee shop, you overhear someone discussing their training routine. A friend suggests a new protein brand. No data was 'collected', just natural context reading. That's what Pulse does for ads.",
    signals: [
      { label: "Behavior", value: "Engages with fitness content" },
      { label: "Time", value: "Early morning sessions (6 AM)" },
      { label: "Pattern", value: "Follows wellness topics organically" },
      { label: "Privacy", value: "No PII used, no cookies, no tracking" },
    ],
    persona: "Fitness Enthusiast (Inferred)",
    confidence: 88,
    result:
      "Shows relevant fitness brand ads without any personal data or cross-site tracking.",
    accentColor: "green",
  },
  {
    icon: Globe,
    industry: "social-networking",
    category: "Cold-Start Content Discovery",
    title: "The Brand-New User",
    offlineStory:
      "Someone new walks into a bookshop. The owner doesn't know them, but notices their graphic tee, age, the magazine they picked up. 'If you like that, the sci-fi section in the back has some hidden gems.'",
    signals: [
      { label: "Status", value: "New user, zero history" },
      { label: "Referrer", value: "Gaming podcast link" },
      { label: "Device", value: "Gaming laptop (inferred from UA)" },
      { label: "Time", value: "Evening session" },
    ],
    persona: "Gaming & Sci-Fi Enthusiast",
    confidence: 84,
    result:
      "First-time feed seeded with gaming, sci-fi, and tech content instead of generic trending.",
    accentColor: "blue",
  },
  {
    icon: Users,
    industry: "social-networking",
    category: "Community Suggestions",
    title: "The Cooking Enthusiast",
    offlineStory:
      "At a dinner party, a host notices a guest is fascinated by the meal preparation. 'You should join our weekend cooking club,' they suggest. They read the interest, not the profile.",
    signals: [
      { label: "Engagement", value: "Comments on cooking posts" },
      { label: "Pattern", value: "Saves recipe videos consistently" },
      { label: "Browsing", value: "Views food photography accounts" },
      { label: "Time", value: "Active around mealtimes" },
    ],
    persona: "Engaged Home Cook",
    confidence: 90,
    result:
      "Suggests recipe communities, local food groups, and cooking challenges.",
    accentColor: "purple",
  },

  // ─── MARKETING & ADTECH ─────────────────────────────────
  {
    icon: UserSearch,
    industry: "marketing",
    category: "Cookieless Audience Building",
    title: "The Post-Cookie Segmentation",
    offlineStory:
      "A street-smart market researcher stands outside a mall, observing without asking questions. From clothing, body language, shopping bags, and pace, they can tell you who's browsing vs. buying. No surveys needed.",
    signals: [
      { label: "Visitors", value: "Anonymous traffic (no login)" },
      { label: "Context", value: "Device, referrer, time, geo signals" },
      { label: "Behavior", value: "On-site browsing patterns" },
      { label: "Result", value: "Persona segments built in real-time" },
    ],
    persona: "Multiple Segments Built",
    confidence: 90,
    result:
      "Builds high-accuracy persona segments without third-party cookies or PII.",
    accentColor: "green",
  },
  {
    icon: Megaphone,
    industry: "marketing",
    category: "Real-Time Campaign Targeting",
    title: "The Intent-Driven Campaign",
    offlineStory:
      "A luxury car dealer notices a customer lingering at the showroom window every morning. One day, the salesperson steps outside with a brochure: 'Would you like to take it for a test drive?' Perfect timing, zero pushiness.",
    signals: [
      { label: "Behavior", value: "Repeated visits to product pages" },
      { label: "Intent score", value: "High (comparison behavior)" },
      { label: "Persona", value: "Ready-to-purchase researcher" },
      { label: "Trigger", value: "Intent threshold crossed" },
    ],
    persona: "High-Intent Prospect",
    confidence: 91,
    result:
      "Triggers targeted campaign in <50ms when intent signals cross threshold.",
    accentColor: "blue",
  },
  {
    icon: BarChart3,
    industry: "marketing",
    category: "Lookalike Audiences",
    title: "The Pattern Matcher",
    offlineStory:
      "A skilled recruiter meets one great candidate and immediately thinks of three more people in their network with similar traits. They don't need a database, just pattern recognition.",
    signals: [
      { label: "Source", value: "High-value customer persona profile" },
      { label: "Method", value: "Vector similarity matching" },
      { label: "Scope", value: "Across publisher network" },
      { label: "Privacy", value: "No PII shared between sites" },
    ],
    persona: "Lookalike Cluster",
    confidence: 87,
    result:
      "Finds matching personas across publisher network with similar behavioral DNA.",
    accentColor: "purple",
  },

  // ─── BLOGS & CONTENT ────────────────────────────────────
  {
    icon: BookOpen,
    industry: "blogs",
    category: "Article Recommendations",
    title: "The Developer Reading React",
    offlineStory:
      "A librarian sees someone in the advanced programming section who just finished a React fundamentals book. She doesn't point to more beginner books, she hands them 'Design Patterns in TypeScript.'",
    signals: [
      { label: "Current", value: "Reading React hooks tutorial" },
      { label: "Depth", value: "Scrolled 95%, read code snippets" },
      { label: "Referrer", value: "GitHub repository README" },
      { label: "Device", value: "MacBook (developer profile)" },
    ],
    persona: "Advanced Developer Reader",
    confidence: 91,
    result:
      "Suggests advanced React patterns and TypeScript guides, not beginner content.",
    accentColor: "blue",
  },
  {
    icon: Rss,
    industry: "blogs",
    category: "Newsletter Personalization",
    title: "The Morning Business Reader",
    offlineStory:
      "Your newspaper vendor knows you grab the Financial Times every morning but never touch the sports section. He starts setting aside the business supplements before you even arrive.",
    signals: [
      { label: "Time", value: "Always reads at 7 AM" },
      { label: "Preference", value: "Business, strategy, leadership" },
      { label: "Behavior", value: "Reads full articles (not headlines)" },
      { label: "Engagement", value: "Shares articles on LinkedIn" },
    ],
    persona: "Morning Business Executive",
    confidence: 89,
    result:
      "Morning digest curated with business strategy and leadership articles first.",
    accentColor: "green",
  },
  {
    icon: Lock,
    industry: "blogs",
    category: "Smart Content Gating",
    title: "The Researcher vs. The Casual Browser",
    offlineStory:
      "A bookstore owner knows that a customer reading the back cover might leave, but someone who sits down with three books is ready to buy. The browsing pattern reveals intent.",
    signals: [
      { label: "Depth", value: "3rd article in single session" },
      { label: "Behavior", value: "Highlighting text, taking notes" },
      { label: "Pattern", value: "Systematic reading (not random)" },
      { label: "Engagement", value: "High dwell time per article" },
    ],
    persona: "High-Intent Researcher",
    confidence: 93,
    result:
      "Shows subscription paywall to researchers (high conversion probability), free content to casual browsers.",
    accentColor: "purple",
  },

  // ─── SPECIALIZED AD TARGETING ───────────────────────────
  {
    icon: Target,
    industry: "advertising",
    category: "Contextual Ad Placement",
    title: "The Luxury Travel Reader",
    offlineStory:
      "A magazine ad sales rep knows that placing a Rolex ad next to a luxury travel article works better than placing it next to a budget backpacking story. Context matters more than cookies.",
    signals: [
      { label: "Content", value: "Reading luxury travel article" },
      { label: "Persona", value: "Affluent traveler (inferred)" },
      { label: "Device", value: "iPad Pro (premium device)" },
      { label: "Geo", value: "High-income area" },
    ],
    persona: "Affluent Experience Seeker",
    confidence: 90,
    result:
      "Serves premium hotel and airline ads, not budget hostels or bus tickets.",
    accentColor: "purple",
  },
  {
    icon: Crosshair,
    industry: "advertising",
    category: "Intent-Based Bidding",
    title: "The Ready-to-Buy Signal",
    offlineStory:
      "An auction house veteran can spot a serious bidder from across the room, posture, focus, paddle position. They don't waste time on the spectators.",
    signals: [
      { label: "Behavior", value: "Comparing 3 products side-by-side" },
      { label: "Intent", value: "High (deep comparison behavior)" },
      { label: "Funnel stage", value: "Bottom (decision phase)" },
      { label: "Latency", value: "Bid decision in <50ms" },
    ],
    persona: "High-Intent Purchaser",
    confidence: 94,
    result:
      "Increases real-time bid for this high-conversion-probability visitor.",
    accentColor: "green",
  },
  {
    icon: Globe,
    industry: "advertising",
    category: "Cross-Platform Persona",
    title: "The Consistent Identity",
    offlineStory:
      "A frequent flyer is recognized at every airport lounge, not by name, but by behavior. Priority lane, business laptop, espresso order. The pattern is the identity.",
    signals: [
      { label: "Signal match", value: "Same persona signals on 3 sites" },
      { label: "Method", value: "Behavioral fingerprint (not cookie)" },
      { label: "Privacy", value: "No PII exchanged between sites" },
      { label: "Result", value: "Consistent targeting across network" },
    ],
    persona: "Cross-Platform Business Persona",
    confidence: 86,
    result:
      "Consistent ad targeting across publisher network without cross-site cookies.",
    accentColor: "blue",
  },

  // ─── STREAMING & ENTERTAINMENT ──────────────────────────
  {
    icon: Film,
    industry: "streaming",
    category: "Homepage Curation",
    title: "The Weekend Binge-Watcher",
    offlineStory:
      "A video store clerk (remember those?) sees a customer walk in on a rainy Saturday. They're wearing a sci-fi t-shirt. The clerk doesn't point to rom-coms: 'We just got the new Blade Runner, and the Dune collection is on the back wall.'",
    signals: [
      { label: "Time", value: "Saturday afternoon (binge window)" },
      { label: "Device", value: "Smart TV (living room setup)" },
      { label: "Pattern", value: "Watches 3+ episodes per session" },
      { label: "Preference", value: "Sci-fi engagement signals" },
    ],
    persona: "Weekend Sci-Fi Binge-Watcher",
    confidence: 91,
    result:
      "Homepage surfaces sci-fi series and space documentaries above trending reality shows.",
    accentColor: "green",
  },
  {
    icon: Headphones,
    industry: "streaming",
    category: "Cold-Start New User",
    title: "The Podcast-Referred Listener",
    offlineStory:
      "Someone walks into a record store after hearing a band on a podcast. The owner says: 'If you liked that episode, check out this crate, all similar artists.' No listening history needed.",
    signals: [
      { label: "Status", value: "Brand new user, zero history" },
      { label: "Referrer", value: "Gaming podcast episode link" },
      { label: "Device", value: "Gaming headset (inferred)" },
      { label: "Sign-up", value: "Just created account" },
    ],
    persona: "Gaming-Adjacent New User",
    confidence: 85,
    result:
      "Seeds recommendations with gaming soundtracks, sci-fi, and action content from the start.",
    accentColor: "blue",
  },
  {
    icon: Podcast,
    industry: "streaming",
    category: "Podcast Discovery",
    title: "The Morning Commuter",
    offlineStory:
      "A commuter on a train always reads the business section of the newspaper. The conductor doesn't offer them the comics, they'd recommend the new economics podcast playing in the quiet car.",
    signals: [
      { label: "Time", value: "7:30 AM weekday (commute)" },
      { label: "Device", value: "iPhone with AirPods" },
      { label: "Duration", value: "Listens for ~30 min (commute length)" },
      { label: "Pattern", value: "Business/productivity content" },
    ],
    persona: "Business Commuter",
    confidence: 88,
    result:
      "Recommends business and productivity podcasts over comedy and true crime.",
    accentColor: "purple",
  },

  // ─── NEWS & MEDIA ───────────────────────────────────────
  {
    icon: Newspaper,
    industry: "news-media",
    category: "Feed Personalization",
    title: "The Finance-First Morning Reader",
    offlineStory:
      "A cafe regular always picks up the Financial Times before anything else. The barista has it ready: 'The markets are wild today.' They know the reader's priorities.",
    signals: [
      { label: "Time", value: "6:30 AM (pre-market reading)" },
      { label: "Pattern", value: "Finance → Tech → World, in that order" },
      { label: "Depth", value: "Full articles, not headlines only" },
      { label: "Engagement", value: "Shares market articles" },
    ],
    persona: "Finance-First Morning Reader",
    confidence: 92,
    result:
      "News feed leads with market news and financial analysis, not entertainment.",
    accentColor: "blue",
  },
  {
    icon: CreditCard,
    industry: "news-media",
    category: "Paywall Optimization",
    title: "The Deep Researcher",
    offlineStory:
      "A library sees someone who's been reading journals for hours, photocopying articles, taking notes. They approach: 'You might want our annual membership, unlimited access.' The casual browser gets a free pamphlet.",
    signals: [
      { label: "Session", value: "3rd article in 20 minutes" },
      { label: "Depth", value: "Reading to the end of each article" },
      { label: "Pattern", value: "Systematic research behavior" },
      { label: "Intent", value: "High willingness to pay (inferred)" },
    ],
    persona: "Deep Research Reader",
    confidence: 93,
    result:
      "Shows subscription offer with annual savings (high intent), casual browsers see free content.",
    accentColor: "green",
  },
  {
    icon: Clock,
    industry: "news-media",
    category: "Breaking News Priority",
    title: "The Community-Engaged Local",
    offlineStory:
      "A town crier knows that the baker cares about local council decisions, not international trade deals. Different news for different people, relevance over volume.",
    signals: [
      { label: "Geo", value: "Local reader (same city)" },
      { label: "Pattern", value: "Engages with local stories heavily" },
      { label: "Engagement", value: "Comments on community articles" },
      { label: "Alert setting", value: "Opted into notifications" },
    ],
    persona: "Community-Engaged Local Reader",
    confidence: 88,
    result:
      "Prioritizes local breaking news and community stories over national headlines.",
    accentColor: "purple",
  },

  // ─── EDTECH & ONLINE LEARNING ──────────────────────────
  {
    icon: GraduationCap,
    industry: "edtech",
    category: "Course Recommendation",
    title: "The Career Switcher",
    offlineStory:
      "A career counselor meets someone who's been in marketing for 5 years but wants to move into data science. They don't suggest 'Marketing 101', they say: 'Start with Python for Data Analysis, then SQL.'",
    signals: [
      { label: "Browsing", value: "Python courses (multiple)" },
      { label: "Profile", value: "No tech background (inferred)" },
      { label: "Referrer", value: '"career change into tech" article' },
      { label: "Behavior", value: "Comparing syllabus content" },
    ],
    persona: "Career-Switching Learner",
    confidence: 89,
    result:
      "Recommends 'Python for Data Science' not 'Python 101', matches career intent.",
    accentColor: "purple",
  },
  {
    icon: Compass,
    industry: "edtech",
    category: "Learning Path Optimization",
    title: "The Fast Learner",
    offlineStory:
      "A music teacher hears a student play and realizes they've outgrown beginner exercises. Instead of staying on the curriculum, they skip ahead: 'Let's try jazz improvisation.'",
    signals: [
      { label: "Progress", value: "Completed React basics in 2 days" },
      { label: "Speed", value: "2x above average pace" },
      { label: "Assessment", value: "Scored 95% on module quiz" },
      { label: "Behavior", value: "Skipping intro videos" },
    ],
    persona: "Advanced Fast Learner",
    confidence: 93,
    result:
      "Auto-suggests Next.js and TypeScript courses, skips CSS fundamentals and basic HTML.",
    accentColor: "green",
  },
  {
    icon: BookMarked,
    industry: "edtech",
    category: "Difficulty Adaptation",
    title: "The Struggling Learner",
    offlineStory:
      "A tutor notices a student re-reading the same paragraph and frowning. They don't push ahead, they slow down, explain the concept differently, and offer a simpler example.",
    signals: [
      { label: "Behavior", value: "Re-reading sections multiple times" },
      { label: "Dwell time", value: "3x above average per page" },
      { label: "Assessment", value: "Failed quiz on first attempt" },
      { label: "Pattern", value: "Pausing and rewinding video" },
    ],
    persona: "Struggling Learner",
    confidence: 87,
    result:
      "Offers supplementary material, simplified explanations, and slowed-pace content.",
    accentColor: "blue",
  },

  // ─── TRAVEL & HOSPITALITY ──────────────────────────────
  {
    icon: Plane,
    industry: "travel",
    category: "Destination Matching",
    title: "The Luxury Couple's Getaway",
    offlineStory:
      "A travel agent sees a couple walk in, well-dressed, no kids, browsing the 'boutique experiences' brochure. They don't show hostels or family resorts. They open the Maldives portfolio.",
    signals: [
      { label: "Referrer", value: "Luxury travel blog article" },
      { label: "Device", value: "iPad Pro (premium device)" },
      { label: "Browsing", value: "Viewing boutique hotels only" },
      { label: "Filter", value: "Ignored budget options entirely" },
    ],
    persona: "Luxury Couple Traveler",
    confidence: 91,
    result:
      "Shows boutique hotels and curated experiences; hides hostels and budget options.",
    accentColor: "green",
  },
  {
    icon: Map,
    industry: "travel",
    category: "Trip-Type Inference",
    title: "The Spontaneous Weekender",
    offlineStory:
      "A concierge notices a guest checking in on a Friday night with just a carry-on. They don't offer week-long tour packages, they suggest the best Saturday brunch spots and a sunset cruise.",
    signals: [
      { label: "Device", value: "Mobile (on-the-go booking)" },
      { label: "Time", value: "Friday night search" },
      { label: "Search", value: '"weekend getaway near me"' },
      { label: "Pattern", value: "Short stay filters applied" },
    ],
    persona: "Spontaneous Weekend Traveler",
    confidence: 88,
    result:
      "Prioritizes 2-night getaways, spa packages, and last-minute deals nearby.",
    accentColor: "purple",
  },
  {
    icon: CreditCard,
    industry: "travel",
    category: "Price Sensitivity Detection",
    title: "The Flexible Budget Traveler",
    offlineStory:
      "A sharp travel agent notices a customer comparing the same route across different dates, always choosing the cheapest option. They pull up the flexible date calendar and show the price heat map.",
    signals: [
      { label: "Behavior", value: "Comparing same route across 5 dates" },
      { label: "Sort", value: "Always sorting by price first" },
      { label: "Pattern", value: "Abandons when price exceeds threshold" },
      { label: "Flexibility", value: "Wide date range selected" },
    ],
    persona: "Price-Conscious Flexible Traveler",
    confidence: 86,
    result:
      'Shows flexible date options, price alerts, and "cheapest day" recommendations.',
    accentColor: "blue",
  },

  // ─── AI TOOLS ───────────────────────────────────────────
  {
    icon: BrainCircuit,
    industry: "ai-tools",
    category: "Feature Discovery",
    title: "The Developer vs. The Marketer",
    offlineStory:
      "A software demo expert adjusts their pitch for every audience. For a developer, they show the API docs and code playground. For a marketer, they show the content generation templates. Same product, different surface.",
    signals: [
      { label: "Referrer", value: "Stack Overflow question" },
      { label: "Device", value: "MacBook Pro with VS Code UA" },
      { label: "Behavior", value: "Searches for 'API' and 'SDK'" },
      { label: "Pattern", value: "Tries code-related prompts first" },
    ],
    persona: "Developer Power User",
    confidence: 92,
    result:
      "Shows API documentation, code playground, and developer tutorials upfront, not marketing templates.",
    accentColor: "blue",
  },
  {
    icon: Lightbulb,
    industry: "ai-tools",
    category: "Prompt Suggestions",
    title: "The Research Student",
    offlineStory:
      "A university librarian sees a student struggling with a research query. Instead of a generic search tip, they say: 'Try narrowing by year and methodology.' Contextual help, not generic help.",
    signals: [
      { label: "Referrer", value: "University portal (.edu domain)" },
      { label: "Time", value: "Late evening (study session)" },
      { label: "Pattern", value: "Long, research-style prompts" },
      { label: "Behavior", value: 'Uses words like "analyze" and "compare"' },
    ],
    persona: "Academic Researcher",
    confidence: 89,
    result:
      "Shows academic prompt templates, citation helpers, and research methodology suggestions.",
    accentColor: "purple",
  },
  {
    icon: Bot,
    industry: "ai-tools",
    category: "Onboarding Personalization",
    title: "The First-Time AI User",
    offlineStory:
      "A patient teacher meets a student who's never used a computer before. They don't start with keyboard shortcuts,they start with 'This is what happens when you click here.' Meet them where they are.",
    signals: [
      { label: "Status", value: "First-ever session" },
      { label: "Referrer", value: '"what is AI" Google search' },
      { label: "Behavior", value: "Short, simple prompts" },
      { label: "Pattern", value: "Exploring basic features slowly" },
    ],
    persona: "AI-Curious Beginner",
    confidence: 86,
    result:
      "Shows guided onboarding, simple prompt examples, and beginner tutorials, not advanced features.",
    accentColor: "green",
  },
];

/** Get use cases filtered by industry slug */
export function getUseCasesByIndustry(industrySlug: string): UseCase[] {
  return useCases.filter((uc) => uc.industry === industrySlug);
}

/** Get a sample of use cases (one per industry, for homepage preview) */
export function getHomepageUseCases(): UseCase[] {
  const seen = new Set<string>();
  return useCases.filter((uc) => {
    if (seen.has(uc.industry)) return false;
    seen.add(uc.industry);
    return true;
  });
}
