// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Import Services
import { TeachersService } from '../../services/teachers.service';
import { CoursesService } from '../../services/courses.service';
// Import Models
import { Teachers } from '../../domain/jmyx_prototype_db/teachers';
import { Courses } from '../../domain/jmyx_prototype_db/courses';

// START - USED SERVICES
/**
* TeachersService.create
*	@description CRUD ACTION create
*
* TeachersService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
* TeachersService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id resource
*
* CoursesService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a Teachers
 */
@Component({
    selector: 'app-teachers-edit',
    templateUrl: 'teachers-edit.component.html',
    styleUrls: ['teachers-edit.component.css']
})
export class TeachersEditComponent implements OnInit {
    item: Teachers;
    listTeacher_class: Courses[];
    model: Teachers;
    formValid: Boolean;

    constructor(
    private teachersService: TeachersService,
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private location: Location) {
        // Init item
        this.item = new Teachers();
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.teachersService.get(id).subscribe(item => this.item = item);
            }
            // Get relations
            this.coursesService.list().subscribe(list => this.listTeacher_class = list);
        });
    }


    /**
     * Save Teachers
     *
     * @param {boolean} formValid Form validity check
     * @param Teachers item Teachers to save
     */
    save(formValid: boolean, item: Teachers): void {
        this.formValid = formValid;
        if (formValid) {
            if (item._id) {
                this.teachersService.update(item).subscribe(data => this.goBack());
            } else {
                this.teachersService.create(item).subscribe(data => this.goBack());
            } 
        }
    }

    /**
     * Go Back
     */
    goBack(): void {
        this.location.back();
    }


}



