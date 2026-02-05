import React from 'react';
import { Trait, TraitLevel, ChartDataPoint, UserProfile } from './types';
import { 
  Music, 
  Brain, 
  Database, 
  Palette, 
  Timer, 
  Zap, 
  Activity,
  Leaf,
  Dna,
  GraduationCap,
  Lightbulb,
  Award,
  TrendingUp,
  Flag,
  CheckCircle,
  Puzzle,
  BookOpen,
  LayoutGrid,
  Briefcase,
  Target,
  Microscope,
  Star,
  Dumbbell
} from 'lucide-react';

export const USER_PROFILE: UserProfile = {
  name: 'Sarah',
  avatarUrl: 'https://picsum.photos/id/64/200/200'
};

export const RADAR_DATA: ChartDataPoint[] = [
  { subject: 'Music Ability', A: 98, fullMark: 100 },
  { subject: 'Intelligence', A: 92, fullMark: 100 },
  { subject: 'Memory', A: 85, fullMark: 100 },
  { subject: 'Creativity', A: 95, fullMark: 100 },
  { subject: 'Endurance Sport', A: 78, fullMark: 100 },
  { subject: 'Power Sport', A: 60, fullMark: 100 },
  { subject: 'Sporting Ability', A: 88, fullMark: 100 },
];

export const TRAITS: Trait[] = [
  {
    id: '1',
    category: 'Talent',
    name: 'Music Ability',
    description: 'Exceptional cognitive processing for melody and rhythmic structures.',
    level: TraitLevel.GIFTED,
    score: 98,
    iconName: 'music'
  },
  {
    id: '2',
    category: 'Talent',
    name: 'Intelligence',
    description: 'High capacity for logic, understanding, self-awareness, learning, emotional knowledge.',
    level: TraitLevel.EXCELLENT,
    score: 92,
    iconName: 'brain'
  },
  {
    id: '3',
    category: 'Talent',
    name: 'Memory',
    description: 'Ability to encode, store, retain and recall information.',
    level: TraitLevel.STRONG,
    score: 85,
    iconName: 'database'
  },
  {
    id: '4',
    category: 'Talent',
    name: 'Creativity',
    description: 'Phenomenal ability to generate new ideas and connections.',
    level: TraitLevel.GIFTED,
    score: 95,
    iconName: 'palette'
  },
  {
    id: '5',
    category: 'Talent',
    name: 'Endurance Sport',
    description: 'Genetic predisposition for slow-twitch muscle fiber efficiency.',
    level: TraitLevel.STRONG,
    score: 78,
    iconName: 'timer'
  },
  {
    id: '6',
    category: 'Talent',
    name: 'Power Sport',
    description: 'Explosive strength potential based on ACTN3 gene.',
    level: TraitLevel.POTENTIAL,
    score: 60,
    iconName: 'zap'
  },
  {
    id: '7',
    category: 'Talent',
    name: 'Sporting Ability',
    description: 'General athletic potential including coordination and physical adaptability.',
    level: TraitLevel.EXCELLENT,
    score: 88,
    iconName: 'activity'
  }
];

// Data for the Group Detail View (e.g. Intelligence, Sporting Ability)
export const TRAIT_DETAILS: any = {
  'Intelligence': {
    summary: 'ศักยภาพด้านสติปัญญาของลูกโดดเด่นมาก โดยเฉพาะด้านการประมวลผลข้อมูลและการแก้ปัญหาที่รวดเร็ว',
    subTraits: [
      { 
        name: 'Cognitive Ability', 
        label: 'INFORMATION PROCESSING & PROBLEM SOLVING', 
        level: 'GIFTED', 
        icon: 'graduation' 
      },
      { 
        name: 'Insight Ability', 
        label: 'STRATEGIC THINKING', 
        level: 'GIFTED', 
        icon: 'lightbulb' 
      },
      { 
        name: 'Education Level', 
        label: 'LEARNING CAPACITY', 
        level: 'GIFTED', 
        icon: 'award' 
      }
    ],
    celebrity: {
      name: 'Bill Gates',
      role: 'THE VISIONARY PHILANTHROPIST',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Visit_of_Bill_Gates%2C_Chairman_of_Breakthrough_Energy_Ventures%2C_to_the_European_Commission_5_%28cropped%29.jpg',
      description: 'เช่นเดียวกับบิล เกตส์ ที่มีกระบวนการคิดที่เป็นระบบ คุณมีแนวโน้มที่จะมองเห็นภาพรวมและแก้ไขปัญหาที่ซับซ้อนได้อย่างมีประสิทธิภาพ',
      matchLevel: 'GIFTED'
    },
    careers: [
      { name: 'Data Scientist', tag: 'HIGH COGNITIVE ABILITY', icon: 'trending-up' },
      { name: 'Strategic Consultant', tag: 'STRATEGIC THINKING', icon: 'target' },
      { name: 'AI Researcher', tag: 'INNOVATION', icon: 'microscope' }
    ]
  },
  'Sporting Ability': {
    summary: 'โครงสร้างทางพันธุกรรมของคุณบ่งบอกถึงความได้เปรียบตามธรรมชาติในด้านกีฬา โดยเฉพาะอย่างยิ่งในกิจกรรมที่ต้องใช้พละกำลัง การระเบิดพลัง และความว่องไว',
    subTraits: [
      { 
        name: 'Explosive Power', 
        label: 'FAST-TWITCH MUSCLES', 
        level: 'GIFTED', 
        icon: 'zap' 
      },
      { 
        name: 'Agility & Speed', 
        label: 'MOTOR COORDINATION', 
        level: 'EXCELLENT', 
        icon: 'activity' 
      },
      { 
        name: 'Strength', 
        label: 'MUSCLE COMPOSITION', 
        level: 'STRONG', 
        icon: 'dumbbell' 
      }
    ],
    celebrity: {
      name: 'Cristiano Ronaldo',
      role: 'THE ATHLETIC PHENOM',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Cristiano_Ronaldo_2018.jpg/400px-Cristiano_Ronaldo_2018.jpg',
      description: 'เช่นเดียวกับโรนัลโด คุณมียีน ACTN3 ที่ส่งเสริมประสิทธิภาพของกล้ามเนื้อกระตุกเร็ว ทำให้มีความโดดเด่นทั้งความเร็วและความแข็งแกร่ง',
      matchLevel: 'GIFTED'
    },
    careers: [
      { name: 'Pro Athlete', tag: 'ELITE PERFORMANCE', icon: 'award' },
      { name: 'Sports Physiologist', tag: 'BODY MECHANICS', icon: 'microscope' },
      { name: 'Athletic Trainer', tag: 'COACHING', icon: 'briefcase' }
    ]
  }
};

// Data for the specific Sub-Trait Item View (e.g. Cognitive Ability)
export const SUB_TRAIT_DETAILS: any = {
  'Cognitive Ability': {
    title: 'Cognitive Ability',
    subtitle: 'THE STRATEGIC THINKER',
    level: 'Gifted',
    percentile: 'TOP 5% PERCENTILE',
    description: 'This trait influences how quickly the brain processes new information and adapts to complex problem-solving scenarios. As a Strategic Thinker, your child likely shows a natural aptitude for connecting disparate ideas and excels in environments requiring abstract reasoning.',
    scientificInsight: 'The biological mechanism behind this trait is heavily influenced by the BDNF gene. This gene produces a protein that supports the survival of existing neurons and encourages the growth of new ones through a process called neuroplasticity. Enhanced levels of this protein improve synaptic signaling, allowing for faster neural transmission and more efficient pattern recognition in the prefrontal cortex.',
    genetics: [
      { gene: 'BDNF', snp: 'rs6265', genotype: 'GG', status: 'optimal' },
      { gene: 'COMT', snp: 'rs4680', genotype: 'AG', status: 'mixed' },
      { gene: 'KIBRA', snp: 'rs17070145', genotype: 'CT', status: 'optimal' }
    ],
    actionPlan: [
      {
        title: 'Encourage Complex Puzzles',
        desc: 'Introduce logic games that require multi-step planning and spatial awareness.',
        checked: true
      },
      {
        title: 'Support Critical Thinking',
        desc: 'Ask open-ended questions about daily events to stimulate analytical reasoning.',
        checked: false
      },
      {
        title: 'Diverse Learning Topics',
        desc: 'Exposure to music, coding, or languages to leverage high neuroplasticity.',
        checked: false
      }
    ],
    references: [
      { title: 'Nature Genetics: Cognitive Genomics', author: 'Davies et al. (2023)' },
      { title: 'Molecular Psychiatry: BDNF & Memory', author: 'Chen et al. (2022)' }
    ]
  },
  // Fallback for others
  'Insight Ability': {
    title: 'Insight Ability',
    subtitle: 'THE INTUITIVE MIND',
    level: 'Gifted',
    percentile: 'TOP 10% PERCENTILE',
    description: 'Insight ability refers to the "Aha!" moment phenomenon. It involves the brains ability to reorganize information to reach a sudden solution.',
    scientificInsight: 'This trait is linked to right-hemisphere activity and alpha-wave production in the brain, facilitating distinct associations.',
    genetics: [
      { gene: 'BDNF', snp: 'rs6265', genotype: 'GG', status: 'optimal' }
    ],
    actionPlan: [],
    references: []
  },
  'Education Level': {
    title: 'Education Level',
    subtitle: 'ACADEMIC POTENTIAL',
    level: 'Gifted',
    percentile: 'TOP 3% PERCENTILE',
    description: 'Genetic predisposition towards educational attainment, often correlated with perseverance and cognitive processing speed.',
    scientificInsight: 'Polygenic scores involving thousands of variants contribute to this complex trait.',
    genetics: [],
    actionPlan: [],
    references: []
  },
  'Explosive Power': {
    title: 'Explosive Power',
    subtitle: 'FAST-TWITCH DOMINANCE',
    level: 'Gifted',
    percentile: 'TOP 2% PERCENTILE',
    description: 'This trait indicates a high proportion of fast-twitch muscle fibers (Type II), which are designed for short, high-intensity bursts of energy.',
    scientificInsight: 'The ACTN3 gene encodes alpha-actinin-3, a protein found only in fast-twitch muscle fibers. The "R" allele is associated with elite sprint and power performance.',
    genetics: [
        { gene: 'ACTN3', snp: 'rs1815739', genotype: 'RR', status: 'optimal' },
        { gene: 'ACE', snp: 'rs4646994', genotype: 'DD', status: 'mixed' }
    ],
    actionPlan: [],
    references: []
  }
};

// Article Data for Insights
export const ARTICLES: any = {
  '1': {
    id: '1',
    title: "Nurturing your child's musical ear",
    subtitle: "Scientific research has shown that genetic predispositions can significantly influence how children process pitch and rhythm.",
    tag: "MUSIC",
    readTime: "5 mins read",
    author: {
        name: "Dr. Sarah Jenkins",
        role: "Genetics Specialist",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop"
    },
    heroImage: "https://img.freepik.com/free-vector/little-boy-playing-xylophone_1308-161671.jpg?t=st=1734538000~exp=1734541600~hmac=000000", 
    // If the above external image doesn't load, use a placeholder or the provided one in component
    content: [
        {
            type: 'paragraph',
            text: "Scientific research has shown that genetic predispositions can significantly influence how children process pitch and rhythm. While environment is key, understanding your child's innate musical blueprint allows for a more tailored development approach."
        },
        {
            type: 'heading',
            text: "The Science of Rhythm"
        },
        {
            type: 'paragraph',
            text: "The AVPR1A gene, often linked to social bonding, also plays a crucial role in musical memory and rhythmic perception. Children with specific variants may naturally gravitate towards percussive patterns or find melodic recognition more intuitive."
        },
        {
            type: 'list',
            items: [
                "Early exposure to diverse scales enhances neuroplasticity.",
                "Rhythm games strengthen executive function."
            ]
        }
    ],
    mascotInsight: "Try humming a simple tune and let your little one finish the melody. This boosts 'tonal prediction'—a key indicator of early musical potential!",
    activities: [
        { id: 1, text: "Listen to classical music (15m)", checked: true },
        { id: 2, text: "Clap to a basic 4/4 beat", checked: false },
        { id: 3, text: "Identify 3 animal instrument sounds", checked: false }
    ],
    related: [
       { id: 101, title: "Visual Arts DNA", tag: "GENETICS", image: "https://images.unsplash.com/photo-1579783902614-a3fb392796a5?q=80&w=300&auto=format&fit=crop" },
       { id: 102, title: "The EQ Connection", tag: "SOCIAL", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=300&auto=format&fit=crop" }
    ]
  }
};

export const getIcon = (name: string, size: number = 24, className: string = '') => {
  const props = { size, className };
  switch(name) {
    case 'music': return React.createElement(Music, props);
    case 'brain': return React.createElement(Brain, props);
    case 'database': return React.createElement(Database, props);
    case 'palette': return React.createElement(Palette, props);
    case 'timer': return React.createElement(Timer, props);
    case 'zap': return React.createElement(Zap, props);
    case 'activity': return React.createElement(Activity, props);
    case 'leaf': return React.createElement(Leaf, props);
    case 'graduation': return React.createElement(GraduationCap, props);
    case 'lightbulb': return React.createElement(Lightbulb, props);
    case 'award': return React.createElement(Award, props);
    case 'trending-up': return React.createElement(TrendingUp, props);
    case 'flag': return React.createElement(Flag, props);
    case 'check-circle': return React.createElement(CheckCircle, props);
    case 'puzzle': return React.createElement(Puzzle, props);
    case 'book': return React.createElement(BookOpen, props);
    case 'grid': return React.createElement(LayoutGrid, props);
    case 'briefcase': return React.createElement(Briefcase, props);
    case 'target': return React.createElement(Target, props);
    case 'microscope': return React.createElement(Microscope, props);
    case 'star': return React.createElement(Star, props);
    case 'dumbbell': return React.createElement(Dumbbell, props);
    default: return React.createElement(Dna, props);
  }
};