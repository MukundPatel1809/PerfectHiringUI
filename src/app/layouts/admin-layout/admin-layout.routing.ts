import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { AttritionComponent } from 'app/attrition/attrition.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'candidate-profile',   component: UserProfileComponent },
    { path: 'candidate-list',     component: TableListComponent },
	{ path: 'attrition',     component: AttritionComponent }
];
