import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { AcademyCoursesService } from 'app/main/apps/academy/courses.service'; 
import { AuthService } from 'app/services/auth.service';
import { TokenService } from 'app/services/token.service';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector   : 'academy-courses',
    templateUrl: './courses.component.html',
    styleUrls  : ['./courses.component.scss'],
    animations : fuseAnimations
})
export class AcademyCoursesComponent implements OnInit, OnDestroy
{
    categories: any[];
    courses: any[];
    coursesFilteredByCategory: any[];
    filteredCourses: any[];
    currentCategory: string;
    searchTerm: string;

    user: string;

    logout = true;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {AcademyCoursesService} _academyCoursesService
     */
    constructor(
        private _academyCoursesService: AcademyCoursesService,
        private _fuseConfigService: FuseConfigService,
        private _auth: AuthService,
        private _token: TokenService
    )
    {
        // Set the defaults
        this.currentCategory = 'all';
        this.searchTerm = '';

        // Set the private defaults
        this._unsubscribeAll = new Subject();

        if (this._token.isValid()) {
            this.logout = false;
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.user = this._auth.getNameUser(); 

        if (!this._token.isValid()) {

            this._fuseConfigService.config = {
                layout: {
                    navbar: {
                        hidden: true
                    },
                    toolbar: {
                        hidden: true
                    },
                    footer: {
                        hidden: true
                    },
                    sidepanel: {
                        hidden: true
                    }
                }
            };
        }
 
        // Subscribe to categories
        this._academyCoursesService.onCategoriesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(categories => {
                this.categories = categories;
            });

        // Subscribe to courses
        this._academyCoursesService.onCoursesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(courses => {
                this.filteredCourses = this.coursesFilteredByCategory = this.courses = courses;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter courses by category
     */
    filterCoursesByCategory(): void
    {
        // Filter
        if ( this.currentCategory === 'all' )
        {
            this.coursesFilteredByCategory = this.courses;
            this.filteredCourses = this.courses;
        }
        else
        {
            this.coursesFilteredByCategory = this.courses.filter((course) => {
                return course.category === this.currentCategory;
            });

            this.filteredCourses = [...this.coursesFilteredByCategory];

        }

        // Re-filter by search term
        this.filterCoursesByTerm();
    }

    /**
     * Filter courses by term
     */
    filterCoursesByTerm(): void
    {
        const searchTerm = this.searchTerm.toLowerCase();

        // Search
        if ( searchTerm === '' )
        {
            this.filteredCourses = this.coursesFilteredByCategory;
        }
        else
        {
            this.filteredCourses = this.coursesFilteredByCategory.filter((course) => {
                return course.title.toLowerCase().includes(searchTerm);
            });
        }
    }
}
