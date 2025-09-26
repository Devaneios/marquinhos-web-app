export interface UserLevel {
  userId: string;
  guildId: string;
  level: number;
  xp: number;
  totalXp: number;
  lastXpGain: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: string;
  condition: any;
  reward?: {
    xp?: number;
    role?: string;
    badge?: string;
  };
}

export interface UserAchievement {
  userId: string;
  achievementId: Achievement;
  unlockedAt: Date;
  guildId: string;
}

export interface LeaderboardEntry {
  userId: string;
  level: number;
  xp: number;
  totalXp: number;
  username?: string;
  avatar?: string;
}
