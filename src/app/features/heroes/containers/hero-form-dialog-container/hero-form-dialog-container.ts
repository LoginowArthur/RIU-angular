import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroForm } from '../../components/hero-form/hero-form'

@Component({
  selector: 'app-hero-form-dialog-container',
  imports: [],
  templateUrl: './hero-form-dialog-container.html',
  styleUrl: './hero-form-dialog-container.scss',
})
export class HeroFormDialogContainer implements OnInit {
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    const dialogRef = this.dialog.open(HeroForm, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/home']);
    });
  }
}
