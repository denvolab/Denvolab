// Content and assets from the updated Final design About frames.
import type { AboutHeroContent, AboutStoryContent, AboutDifferenceContent, AboutValuesContent, AboutBenefitsContent, AboutTeamContent } from "@/types/about";
const ABOUTHERO: AboutHeroContent = {
  "headline": "A small team.\nA shared care for craft.",
  "description": "We’re Denvolab. We bring together UI/UX, code, and brand craft to turn ideas into things people can use. We ask questions, share early, and stay close to the details.",
  "cta": {
    "label": "MEET OUR CRAFT",
    "href": "#our-craft"
  },
  "photos": [
    {
      "alt": "A Denvo Lab designer at a desk",
      "imageSrc": "/images/about/final/hero-1.png"
    },
    {
      "alt": "The Denvo Lab team at work",
      "imageSrc": "/images/about/final/hero-2.png"
    },
    {
      "alt": "Designers sketching together",
      "imageSrc": "/images/about/final/hero-3.png"
    },
    {
      "alt": "A design review at the Denvo Lab studio",
      "imageSrc": "/images/about/final/hero-4.png"
    },
    {
      "alt": "The Denvo Lab team in a workshop",
      "imageSrc": "/images/about/final/hero-5.png"
    }
  ]
};
export async function getAboutHero(): Promise<AboutHeroContent> { return ABOUTHERO; }
const ABOUTSTORY: AboutStoryContent = {
  "heading": "Before we craft the answer, we understand the question.",
  "paragraphs": [
    "What are you trying to change? Who is it for? Where do people get stuck? These are the conversations we start with.",
    "From there, we shape the journey, craft the interface, and build the product. You stay part of the conversation as each piece comes together."
  ],
  "image": {
    "alt": "The Denvo Lab team around a meeting table",
    "imageSrc": "/images/about/final/story.png"
  },
  "stats": [
    {
      "value": "40+",
      "label": "Businesses Thrived",
      "description": "Different businesses, different needs. Each partnership starts with understanding what matters to them."
    },
    {
      "value": "24%",
      "label": "Total Growth",
      "description": "Over the time, working from Large to small business we have accumulated over 24% total business growth."
    }
  ]
};
export async function getAboutStory(): Promise<AboutStoryContent> { return ABOUTSTORY; }
const ABOUTDIFFERENCE: AboutDifferenceContent = {
  "heading": "You’ll know the people behind your product.",
  "items": [
    {
      "title": "People First",
      "description": "We start with what someone needs to do. That gives every screen and interaction a reason to exist.",
      "iconSrc": "/images/about/final/difference-1.svg"
    },
    {
      "title": "Craft & Build",
      "description": "We consider how an experience will be built while we shape it, so important details carry through.",
      "iconSrc": "/images/about/final/difference-2.svg"
    },
    {
      "title": "Clear Updates",
      "description": "We show you what changed and explain why. Your feedback has a place throughout the process.",
      "iconSrc": "/images/about/final/difference-3.svg"
    },
    {
      "title": "Ready for Change",
      "description": "New information can change a project. We discuss what it means for the scope, timeline, and next step.",
      "iconSrc": "/images/about/final/difference-4.svg"
    },
    {
      "title": "The Right Tools",
      "description": "We choose technology around your product, your team, and what they need to maintain.",
      "iconSrc": "/images/about/final/difference-5.svg"
    },
    {
      "title": "Careful Checks",
      "description": "We review the journeys, interactions, and responsive screens—not just the first impression.",
      "iconSrc": "/images/about/final/difference-6.svg"
    }
  ]
};
export async function getAboutDifference(): Promise<AboutDifferenceContent> { return ABOUTDIFFERENCE; }
const ABOUTVALUES: AboutValuesContent = {
  "heading": "What we bring to every craft.",
  "items": [
    {
      "label": "CURIOSITY",
      "description": "We ask before we assume. Understanding the reason behind a request often leads to a better answer.",
      "imageSrc": "/images/about/final/value-1.png"
    },
    {
      "label": "CRAFTSMANSHIP",
      "description": "We care about how something feels and how it behaves. The small details deserve attention too.",
      "imageSrc": "/images/about/final/value-2.png"
    },
    {
      "label": "PERSISTENCE",
      "description": "When something isn’t right, we keep looking. We test, adjust, and give the problem another try.",
      "imageSrc": "/images/about/final/value-3.png"
    },
    {
      "label": "HONESTY",
      "description": "We say what we think, explain our choices, and speak up when something needs to change.",
      "imageSrc": "/images/about/final/value-4.png"
    },
    {
      "label": "TOGETHERNESS",
      "description": "Everyone brings a different eye. We share ideas early and help each other make them stronger.",
      "imageSrc": "/images/about/final/value-5.png"
    },
    {
      "label": "CARE",
      "description": "We think about the people who will use what we build—and the team who will look after it.",
      "imageSrc": "/images/about/final/value-6.png"
    }
  ]
};
export async function getAboutValues(): Promise<AboutValuesContent> { return ABOUTVALUES; }
const ABOUTBENEFITS: AboutBenefitsContent = {
  "heading": "A team you can talk things through with.",
  "description": "Clear conversations, shared decisions, and support from the first brief to handover.",
  "items": [
    {
      "title": "A rhythm that fits",
      "description": "We agree on meeting times and keep updates clear, so you can follow progress across time zones.",
      "iconSrc": "/images/about/final/benefit-1.svg",
      "spin": "cw"
    },
    {
      "title": "Honest about the hard parts",
      "description": "We raise questions early. If something needs another approach, you’ll hear the reason and the options.",
      "iconSrc": "/images/about/final/benefit-2.svg",
      "spin": "ccw"
    },
    {
      "title": "Clear scope, fewer surprises",
      "description": "We agree on what’s included before we begin. When a request changes the scope, we discuss it with you first.",
      "iconSrc": "/images/about/final/benefit-3.svg",
      "spin": "cw"
    },
    {
      "title": "Connected from start to finish",
      "description": "Brand, UI/UX, and development come together in one conversation, with fewer details lost between stages.",
      "iconSrc": "/images/about/final/benefit-4.svg",
      "spin": "ccw"
    }
  ]
};
export async function getAboutBenefits(): Promise<AboutBenefitsContent> { return ABOUTBENEFITS; }
const ABOUTTEAM: AboutTeamContent = {
  "heading": "Different skills. One shared craft.",
  "members": [
    {
      "name": "Abdur Razzak",
      "role": "Founder (CEO)",
      "imageSrc": "/images/about/team/abdur-razzak.png"
    },
    {
      "name": "Tanshen Mahmud",
      "role": "Co-founder (COO)",
      "imageSrc": "/images/about/team/tanshen-mahmud.png"
    },
    {
      "name": "Abdur Rakib",
      "role": "Full Stack Developer",
      "imageSrc": "/images/about/team/abdur-rakib.png"
    },
    {
      "name": "H.R Sohen",
      "role": "Full Stack Developer",
      "imageSrc": "/images/about/team/h-r-sohen.png"
    },
    {
      "name": "Tashdik Ahmed",
      "role": "Frontend Developer",
      "imageSrc": "/images/about/team/tashdik-ahmed.png"
    },
    {
      "name": "Rex Shadhin",
      "role": "Graphic Designer",
      "imageSrc": "/images/about/team/rex-shadhin.png"
    },
    {
      "name": "Ripa",
      "role": "Motion Designer",
      "imageSrc": "/images/about/team/ripa.png"
    },
    {
      "name": "Mehedi Joy",
      "role": "Designer",
      "imageSrc": "/images/about/team/mehedi-joy.png"
    }
  ]
};
export async function getAboutTeam(): Promise<AboutTeamContent> { return ABOUTTEAM; }