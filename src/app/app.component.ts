import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserState, UserState } from '@eui/core';
import { Observable, Subscription } from 'rxjs';
import { I18nService } from '@eui/core';
import { LANG_PARAM_KEY } from '@eui/core';
import { HttpClient } from '@angular/common/http';
import { EuiPermissionService } from '@eui/core';




@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
    userInfos: UserState;
    // Observe state changes
    userState: Observable<UserState>;
    // an array to keep all subscriptions and easily unsubscribe
    subs: Subscription[] = [];

    sidebarItems = [
        { label: 'Home', url: 'screen/home', iconClass: 'eui-icon-home' },
    ];
    notificationItems = [
        { label: 'Title label 1', subLabel: 'Subtitle label' },
        { label: 'Title label 2', subLabel: 'Subtitle label' },
        { label: 'Title label 3', subLabel: 'Subtitle label' },
        { label: 'Title label 4', subLabel: 'Subtitle label' },
    ];

    constructor(private store: Store<any>,protected i18nService: I18nService,protected http: HttpClient,
        private permService: EuiPermissionService,
    ) {
        this.userState = <any>this.store.select(getUserState);
        this.subs.push(this.userState.subscribe((user: UserState) => {
            this.userInfos = { ...user };
        }));
        this.i18nService.init();
    }
    ngOnInit() {
            this.initPermissionService().subscribe(() => console.log('PermissionService has been initiated!'))
           
    }
    

    ngOnDestroy() {
        this.subs.forEach((s: Subscription) => s.unsubscribe());
    }
   
    initPermissionService(): Observable<any> {
                    return this.permService.init(this.userInfos.rights);
    }
}
