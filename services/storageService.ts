
import { UserData, MoodEntry, AchievementEntry } from '../types';

const USER_KEY = 'ia_resource_user';
const MOOD_KEY = 'ia_resource_moods';
const ACHIEVEMENTS_KEY = 'ia_resource_achievements';

export const saveUser = (user: UserData) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): UserData | null => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveMoodEntry = (entry: MoodEntry) => {
  const existing = getMoodHistory();
  const updated = [entry, ...existing];
  localStorage.setItem(MOOD_KEY, JSON.stringify(updated));
};

export const getMoodHistory = (): MoodEntry[] => {
  const data = localStorage.getItem(MOOD_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveAchievement = (entry: AchievementEntry) => {
  const existing = getAchievements();
  const updated = [entry, ...existing];
  localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(updated));
}

export const getAchievements = (): AchievementEntry[] => {
  const data = localStorage.getItem(ACHIEVEMENTS_KEY);
  return data ? JSON.parse(data) : [];
}

export const completePractice = (user: UserData): UserData => {
    const newUser = {
        ...user,
        flowers: user.flowers + 1,
        lastVisit: new Date().toISOString()
    };
    saveUser(newUser);
    return newUser;
};
