import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable, of } from 'rxjs';
import { GamificationService } from '../../core/services/gamification.service';
import { Achievement, LeaderboardEntry, UserAchievement, UserLevel } from '../../core/types/gamification.interface';

@Component({
  selector: 'app-gamification',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatProgressBarModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './gamification.component.html',
  styleUrls: ['./gamification.component.scss']
})
export class GamificationComponent implements OnInit {
  private _gamificationService = inject(GamificationService);

  userLevel$: Observable<UserLevel | null> = of(null);
  userAchievements$: Observable<UserAchievement[]> = of([]);
  leaderboard$: Observable<LeaderboardEntry[]> = of([]);
  allAchievements$: Observable<Achievement[]> = of([]);

  // Mock data for now - would normally come from user service
  currentUserId = '123456789';
  currentGuildId = '987654321';

  ngOnInit(): void {
    this.loadGamificationData();
  }

  private loadGamificationData(): void {
    // Load user level
    this.userLevel$ = new Observable(observer => {
      this._gamificationService.getUserLevel(this.currentUserId, this.currentGuildId).subscribe({
        next: response => observer.next(response.data),
        error: () => observer.next(null)
      });
    });

    // Load user achievements
    this.userAchievements$ = new Observable(observer => {
      this._gamificationService.getUserAchievements(this.currentUserId, this.currentGuildId).subscribe({
        next: response => observer.next(response.data || []),
        error: () => observer.next([])
      });
    });

    // Load leaderboard
    this.leaderboard$ = new Observable(observer => {
      this._gamificationService.getLeaderboard(this.currentGuildId, 10).subscribe({
        next: response => observer.next(response.data || []),
        error: () => observer.next([])
      });
    });

    // Load all achievements
    this.allAchievements$ = new Observable(observer => {
      this._gamificationService.getAllAchievements().subscribe({
        next: response => observer.next(response.data || []),
        error: () => observer.next([])
      });
    });
  }

  getProgressPercentage(userLevel: UserLevel): number {
    const requiredXP = Math.floor(Math.pow(userLevel.level + 1, 2) * 100);
    return Math.floor((userLevel.xp / requiredXP) * 100);
  }

  getRequiredXP(level: number): number {
    return Math.floor(Math.pow(level + 1, 2) * 100);
  }

  getRarityColor(rarity: string): string {
    switch (rarity) {
      case 'legendary': return '#FFD700';
      case 'epic': return '#9C27B0';
      case 'rare': return '#2196F3';
      case 'common': default: return '#757575';
    }
  }

  getRarityLabel(rarity: string): string {
    switch (rarity) {
      case 'legendary': return 'Lendária';
      case 'epic': return 'Épica';
      case 'rare': return 'Rara';
      case 'common': default: return 'Comum';
    }
  }

  getAchievementsByRarity(achievements: UserAchievement[]): {[key: string]: UserAchievement[]} {
    return achievements.reduce((acc, achievement) => {
      const rarity = achievement.achievementId.rarity;
      if (!acc[rarity]) acc[rarity] = [];
      acc[rarity].push(achievement);
      return acc;
    }, {} as {[key: string]: UserAchievement[]});
  }
}
