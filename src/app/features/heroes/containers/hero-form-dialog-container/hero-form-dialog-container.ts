import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { filter, first } from 'rxjs/operators';
import { HeroForm } from '../../components/hero-form/hero-form';

@Component({
  selector: 'app-hero-form-dialog-container',
  imports: [],
  templateUrl: './hero-form-dialog-container.html',
  styleUrl: './hero-form-dialog-container.scss',
})
export class HeroFormDialogContainer implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const dialogRef = this.dialog.open(HeroForm, {
      width: '800px',
    });

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      filter(event => !event.urlAfterRedirects.includes('heroes/add')),
      first()
    ).subscribe((event) => {
      if (!event.urlAfterRedirects.includes('heroes/add')) {
        dialogRef.close();
      }
    });

    dialogRef.afterClosed().pipe(
      first(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      if (this.router.url.includes('heroes/add') || this.router.url.includes('heroes/edit')) {
        this.router.navigate(['/home']);
      }
    });
  }
}
