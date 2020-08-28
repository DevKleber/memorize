import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import { SharedModule } from '../shared/shared.module';
import {NotFoundComponent} from './not-found.component'

const ROUTES: Routes = [
    {path: '', component:NotFoundComponent}
]
@NgModule({
    declarations: [
        NotFoundComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(ROUTES)
    ]
})
export class NotFoundModule {}