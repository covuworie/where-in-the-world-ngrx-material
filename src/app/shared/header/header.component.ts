import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as UserSettingsActions from '../../store/actions/user-settings.actions';
import * as WishListActions from '../../store/actions/wish-list.actions';
import { HeaderFacadeService } from 'src/app/store/facades/header-facade.service';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormControl } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // public properties
  themeControl = new FormControl(false);
  @ViewChild('themeToggle') themeToggle?: MatSlideToggle;

  // private fields
  destroy$ = new Subject();

  // public methods
  constructor(public headerFacade: HeaderFacadeService) {}

  ngOnDestroy() {
    // Signal all streams to complete
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.headerFacade.dispatch(WishListActions.load());

    // slide toggle to on if dark-theme was selected previously
    this.headerFacade.vm$
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((vm) => {
        this.themeControl = new FormControl(vm.theme === 'theme-dark');
        if (vm.theme === 'theme-dark') {
          this.themeToggle?.toggle();
        }
      });

    this.themeControl.valueChanges.subscribe((darkMode) =>
      this.changeTheme(darkMode)
    );
  }

  // private methods
  private changeTheme(darkMode: boolean) {
    const theme = darkMode ? 'theme-dark' : 'theme-light';
    this.headerFacade.dispatch(UserSettingsActions.changeTheme({ theme }));
  }
}
