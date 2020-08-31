import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { StickyComponent } from './sticky.component';

const ROUTES: Routes = [{ path: '', component: StickyComponent }];
@NgModule({
	declarations: [StickyComponent],
	imports: [SharedModule, RouterModule.forChild(ROUTES)],
})
export class StickyModule {}
