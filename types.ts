
export type Language = 'en' | 'bn' | 'hi';

export interface SubTopic {
  id: string;
  question: string;
  isExamRelated?: boolean; // Triggers Thinking model
  isLocationRelated?: boolean; // Triggers Maps
}

export interface DefenceCategory {
  id: string;
  name: string;
  icon: string;
  imageUrl: string; // New field for the visual card background
  specificLogoUrl?: string; // Specific logo for the force (e.g., Army Crest)
  description: string;
  topics: SubTopic[];
  color: string; // Fallback or accent color
}

export enum AppMode {
  HOME = 'HOME',
  CATEGORY_DETAIL = 'CATEGORY_DETAIL',
  CHAT = 'CHAT',
  LIVE_INTERVIEW = 'LIVE_INTERVIEW',
  MEDIA_LAB = 'MEDIA_LAB'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}
