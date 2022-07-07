import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
// Import Services
import { CoursesService } from '../../services/courses.service';
// Import Models
import { Courses } from '../../domain/jmyx_prototype_db/courses';

// START - USED SERVICES
/**
* CoursesService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
* CoursesService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component shows a list of Courses
 * @class CoursesListComponent
 */
@Component({
    selector: 'app-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
    list: Courses[];
    search: any = {};
    idSelected: string;
    constructor(
        private coursesService: CoursesService,
    ) { }

    /**
     * Init
     */
    ngOnInit(): void {
        this.coursesService.list().subscribe(list => this.list = list);
    }

    /**
     * Select Courses to remove
     *
     * @param {string} id Id of the Courses to remove
     */
    selectId(id: string) {
        this.idSelected = id;
    }

    /**
     * Remove selected Courses
     */
    deleteItem() {
        this.coursesService.remove(this.idSelected).subscribe(data => this.list = this.list.filter(el => el._id !== this.idSelected));
    }

}
