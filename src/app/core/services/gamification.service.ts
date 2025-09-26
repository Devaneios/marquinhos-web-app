import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Achievement, LeaderboardEntry, UserAchievement, UserLevel } from '../types/gamification.interface';

@Injectable({
  providedIn: 'root'
})
export class GamificationService {
  private readonly _http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getUserLevel(userId: string, guildId: string): Observable<{data: UserLevel}> {
    return this._http.get<{data: UserLevel}>(`${this.apiUrl}/api/gamification/level/${userId}/${guildId}`);
  }

  getLeaderboard(guildId: string, limit: number = 10): Observable<{data: LeaderboardEntry[]}> {
    return this._http.get<{data: LeaderboardEntry[]}>(`${this.apiUrl}/api/gamification/leaderboard/${guildId}?limit=${limit}`);
  }

  getUserAchievements(userId: string, guildId: string): Observable<{data: UserAchievement[]}> {
    return this._http.get<{data: UserAchievement[]}>(`${this.apiUrl}/api/gamification/achievements/${userId}/${guildId}`);
  }

  getAllAchievements(): Observable<{data: Achievement[]}> {
    return this._http.get<{data: Achievement[]}>(`${this.apiUrl}/api/gamification/achievements`);
  }

  addXP(userId: string, guildId: string, amount: number): Observable<{data: UserLevel}> {
    return this._http.post<{data: UserLevel}>(`${this.apiUrl}/api/gamification/xp`, {
      userId, guildId, amount
    });
  }

  unlockAchievement(userId: string, guildId: string, achievementId: string): Observable<{data: UserAchievement}> {
    return this._http.post<{data: UserAchievement}>(`${this.apiUrl}/api/gamification/achievement/unlock`, {
      userId, guildId, achievementId
    });
  }
}
