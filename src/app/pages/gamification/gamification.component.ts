import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable, of, switchMap } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GamificationService } from '../../core/services/gamification.service';
import { UserService } from '../../core/services/user.service';
import { Achievement, LeaderboardEntry, UserAchievement, UserLevel } from '../../core/types/gamification.interface';
import { environment } from 'src/environments/environment';

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
  private _userService = inject(UserService);
  private readonly _guildId = environment.guildId;

  userLevel$: Observable<UserLevel | null> = of(null);
  userAchievements$: Observable<UserAchievement[]> = of([]);
  leaderboard$: Observable<LeaderboardEntry[]> = of([]);
  allAchievements$: Observable<Achievement[]> = of([]);

  ngOnInit(): void {
    this._userService.userObservable.pipe(
      filter(user => !!user)
    ).subscribe(user => {
      this.loadGamificationData(user!.id);
    });
  }

  private loadGamificationData(userId: string): void {
    this.userLevel$ = new Observable(observer => {
      this._gamificationService.getUserLevel(userId, this._guildId).subscribe({
        next: response => observer.next(response.data),
        error: () => observer.next(null)
      });
    });

    this.userAchievements$ = new Observable(observer => {
      this._gamificationService.getUserAchievements(userId, this._guildId).subscribe({
        next: response => observer.next(response.data || []),
        error: () => observer.next([])
      });
    });

    this.leaderboard$ = new Observable(observer => {
      this._gamificationService.getLeaderboard(this._guildId, 10).subscribe({
        next: response => observer.next(response.data || []),
        error: () => observer.next([])
      });
    });

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
      const rarity = achievement.rarity;
      if (!acc[rarity]) acc[rarity] = [];
      acc[rarity].push(achievement);
      return acc;
    }, {} as {[key: string]: UserAchievement[]});
  }

  getAchievementsForRarity(achievements: Achievement[], rarity: string): Achievement[] {
    return achievements.filter(a => a.rarity === rarity);
  }
}
