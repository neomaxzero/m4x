import { type BackgroundPhase } from '../lib/visitorWorld'

export interface HomeChapterContent {
  id: 'poster' | 'craft' | 'proof' | 'handoff' | 'ambiguity' | 'reveal'
  eyebrow: string
  title: string
  body: string
  aside: string
  motionIntent: string
  phase: BackgroundPhase
}

export const homeContent = {
  nav: {
    brand: 'm4x',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/neomaxzero/' },
      { label: 'GitHub', href: 'https://github.com/neomaxzero/' },
      { label: 'Blog', href: 'https://blog.m4x.io' },
    ],
  },
  chapters: [
    {
      id: 'poster',
      eyebrow: 'My world / your world',
      title: 'Interfaces should feel like openings, not instructions.',
      body: 'I am Maxi. Frontend engineer, product builder, and someone who cares about what a surface makes people feel before they know why.',
      aside: 'The first act belongs to my craft. The background is only atmosphere for now.',
      motionIntent: 'Poster-sized typography drifts slowly while the background stays quiet and distant.',
      phase: 'atmosphere',
    },
    {
      id: 'craft',
      eyebrow: 'Act I / Craft thesis',
      title: 'I use motion, hierarchy, and restraint to change what a page means.',
      body: 'Not decoration. Not noise. Motion should teach pace. Typography should carry certainty. Product logic should protect the feeling instead of flattening it.',
      aside: 'The background starts to gather depth here, but it should still feel like support, not narrative.',
      motionIntent: 'Copy settles in measured beats while the environment gains depth and parallax.',
      phase: 'depth',
    },
    {
      id: 'proof',
      eyebrow: 'Act I / Proof',
      title: 'Stepcraft turns ordinary movement into progression, mood, and return.',
      body: 'It is the clearest expression of how I like to build: take a routine behavior, give it emotional consequence, and wrap product systems around it without losing delight.',
      aside: 'This chapter proves the work is real. The background gets bolder, but the story is still mine.',
      motionIntent: 'A cinematic proof beat with sticky copy and one strong product moment instead of a project grid.',
      phase: 'depth',
    },
    {
      id: 'handoff',
      eyebrow: 'Act II / Handoff',
      title: 'A page can notice a moment, hold it gently, and return it changed.',
      body: 'That is the shift I care about most. A surface begins with my intent, then gradually becomes attentive to yours: your timing, your weather, your language, your rhythm.',
      aside: 'This is where the background stops being scenery and starts behaving like a quiet observer.',
      motionIntent: 'Foreground copy thins out while the depth plane becomes more legible and alive.',
      phase: 'presence',
    },
    {
      id: 'ambiguity',
      eyebrow: 'Act III / Ambiguity',
      title: 'There is already a character in the depth. I just have not told you who it belongs to yet.',
      body: 'Answer three small questions and the background begins to move with you. The page should feel like it is becoming specific before it explains itself.',
      aside: 'The avatar is visible now, but ownership stays unresolved until the final chapter.',
      motionIntent: 'The ritual appears late, and the avatar sharpens while staying ambiguous.',
      phase: 'presence',
    },
    {
      id: 'reveal',
      eyebrow: 'Act III / Reveal',
      title: 'The avatar in the background is yours.',
      body: 'It is shaped by your answers and the context around you. Mine was the frame. Yours is the world that stayed behind it.',
      aside: 'This last beat should resolve the ambiguity cleanly and turn the ending into something worth sharing.',
      motionIntent: 'The background reaches full protagonism, the reveal copy becomes explicit, and sharing becomes the payoff.',
      phase: 'personal',
    },
  ] satisfies HomeChapterContent[],
  craftPrinciples: [
    'Typography should be the loudest object in the first screen.',
    'Motion should create trust before it creates spectacle.',
    'Product systems should deepen emotion, not sterilize it.',
  ],
  flagship: {
    name: 'Stepcraft',
    href: 'https://www.stepcraft.app',
    proof: [
      'Turns daily steps into a game loop with consequence',
      'Balances delight, retention, and long-term progression',
      'Uses pixel-world language without losing clarity or UX intent',
    ],
  },
  handoffSignals: [
    'local hour',
    'weather nearby',
    'browser language',
    'click rhythm',
  ],
  ritual: {
    note: 'No account, no saved profile, just a moment translated into a pocket world.',
  },
  reveal: {
    shareLabel: 'Share your world',
    secondaryLabel: 'Read the blog',
    blogHref: 'https://blog.m4x.io',
  },
} as const
