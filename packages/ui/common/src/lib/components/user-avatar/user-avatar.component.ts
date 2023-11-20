import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { ProjectService } from '../../service/project.service';
import { ApFlagId, Project } from '@activepieces/shared';
import { Observable } from 'rxjs';
import { FlagService } from '../../service/flag.service';
import { Store } from '@ngrx/store';
import { ProjectSelectors } from '../../store/project/project.selector';
import { environment } from '../../environments/environment';
import { LocaleKey, LocalesService } from '../../service/locales.service';

@Component({
  selector: 'ap-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatarComponent implements OnInit {
  showAvatarOuterCircle = false;
  currentUserEmail = 'Dev@ap.com';
  projects$: Observable<Project[]>;
  selectedProject$: Observable<Project | undefined>;
  switchProject$: Observable<void>;
  overflownProjectsNames: Record<string, string> = {};
  billingEnabled$: Observable<boolean>;
  projectEnabled$: Observable<boolean>;
  showPlatform = false;
  showCommunity$: Observable<boolean>;
  locales = environment.localesMap;
  selectedLanguage = {
    languageName: 'English',
    locale: 'en',
  };

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private flagService: FlagService,
    private store: Store,
    private projectService: ProjectService,
    private localesService: LocalesService
  ) {
    this.showCommunity$ = this.flagService.isFlagEnabled(
      ApFlagId.SHOW_COMMUNITY
    );
    // BEGIN EE
    this.billingEnabled$ = this.flagService.isFlagEnabled(
      ApFlagId.SHOW_BILLING
    );
    this.projectEnabled$ = this.flagService.isFlagEnabled(
      ApFlagId.PROJECT_MEMBERS_ENABLED
    );
    this.projects$ = this.store.select(ProjectSelectors.selectAllProjects);
    this.selectedProject$ = this.store.select(
      ProjectSelectors.selectCurrentProject
    );
    // END EE
    this.selectedLanguage =
      this.localesService.getCurrentLanguageFromLocalStorageOrDefault();
  }
  ngOnInit(): void {
    this.currentUserEmail = this.authenticationService.currentUser.email;
    this.showPlatform = this.authenticationService.isPlatformOwner();
  }

  getDropDownLeftOffset(
    toggleElement: HTMLElement,
    dropDownElement: HTMLElement
  ) {
    const leftOffset =
      toggleElement.clientWidth - dropDownElement.clientWidth - 5;
    return `${leftOffset}px`;
  }

  goToDeveloperPage() {
    this.router.navigate(['settings/my-pieces']);
  }

  logout() {
    this.router.navigate(['sign-in']);
    this.authenticationService.logout();
  }

  // BEGIN EE
  viewPlans() {
    this.router.navigate(['plans']);
  }
  switchProject(projectId: string) {
    this.switchProject$ = this.projectService.switchProject(projectId);
  }
  viewPlatformSettings() {
    this.router.navigate(['/platform']);
  }
  // END EE

  get userFirstLetter() {
    if (
      this.authenticationService.currentUser == undefined ||
      this.authenticationService.currentUser.firstName == undefined
    ) {
      return '';
    }
    return this.authenticationService.currentUser.firstName[0];
  }
  goToCommunity() {
    window.open('https://community.activepieces.com/', '_blank', 'noopener');
  }

  showWhatIsNew() {
    window.open(
      'https://community.activepieces.com/c/announcements',
      '_blank',
      'noopener'
    );
  }
  redirectToLocale(locale: LocaleKey) {
    this.localesService.setCurrentLocale(locale);
    this.localesService.redirectToLocale(locale);
  }
}
