
export enum ViewState {
  ONBOARDING = 'ONBOARDING',
  HOME = 'HOME',
  PRACTICES = 'PRACTICES',
  GARDEN = 'GARDEN',
  JOURNAL = 'JOURNAL',
  LIBRARY = 'LIBRARY',
  PROFILE = 'PROFILE'
}

export enum MoodType {
  JOY = 'JOY',
  GRATITUDE = 'GRATITUDE',
  CALM = 'CALM',
  ENERGY = 'ENERGY',
  ANXIETY = 'ANXIETY',
  SADNESS = 'SADNESS',
  IRRITATION = 'IRRITATION',
  TIRED = 'TIRED',
  // Legacy mappings for backward compatibility
  NEED_SUPPORT = 'NEED_SUPPORT', 
  READY_TO_GROW = 'READY_TO_GROW'
}

export interface NotificationSettings {
  wakeUpTime: string; // "07:00"
  morningEnabled: boolean;
  eveningEnabled: boolean;
  weeklyEnabled: boolean;
}

export type SubscriptionLevel = 'free' | 'basic' | 'extended' | 'premium';

export interface UserData {
  name: string;
  isOnboarded: boolean;
  subscriptionLevel: SubscriptionLevel;
  flowers: number; // Count of completed practices
  streak: number;
  lastVisit: string | null; // ISO Date string
  notifications: NotificationSettings;
}

export interface MoodEntry {
  id: string;
  date: string; // ISO Date string
  mood: MoodType;
  note: string;
}

export interface AchievementEntry {
  id: string;
  date: string;
  text: string;
}

export interface Practice {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g., "3 мин"
  category: 'morning' | 'evening' | 'stress' | 'grounding' | 'calm' | 'yoga' | 'meditation' | 'breathing' | 'sos';
  isLocked: boolean;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  requiredTier: SubscriptionLevel; // Changed from boolean isLocked to specific tier requirement
}

export type NavigationTab = 'home' | 'practices' | 'garden' | 'journal' | 'library';
