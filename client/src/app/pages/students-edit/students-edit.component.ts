// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Import Services
import { StudentsService } from '../../services/students.service';
import { CoursesService } from '../../services/courses.service';
// Import Models
import { Students } from '../../domain/jmyx_prototype_db/students';
import { Courses } from '../../domain/jmyx_prototype_db/courses';

// START - USED SERVICES
/**
* StudentsService.create
*	@description CRUD ACTION create
*
* StudentsService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
* StudentsService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id resource
*
* CoursesService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a Students
 */
@Component({
    selector: 'app-students-edit',
    templateUrl: 'students-edit.component.html',
    styleUrls: ['students-edit.component.css']
})
export class StudentsEditComponent implements OnInit {
    item: Students;
    listStudent_course: Courses[];
    model: Students;
    formValid: Boolean;

    constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private location: Location) {
        // Init item
        this.item = new Students();
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.studentsService.get(id).subscribe(item => this.item = item);
            }
            // Get relations
            this.coursesService.list().subscribe(list => this.listStudent_course = list);
        });
    }

    /**
     * Check if an Courses is in  student_course
     *
     * @param {string} id Id of Courses to search
     * @returns {boolean} True if it is found
     */
    containCourses(id: string): boolean {
        if (!this.item.student_course) return false;
        return this.item.student_course.indexOf(id) !== -1;
    }

    /**
     * Add Courses from Students
     *
     * @param {string} id Id of Courses to add in this.item.student_course array
     */
    addCourses(id: string) {
        if (!this.item.student_course)
            this.item.student_course = [];
        this.item.student_course.push(id);
    }

    /**
     * Remove an Courses from a Students
     *
     * @param {number} index Index of Courses in this.item.student_course array
     */
    removeCourses(index: number) {
        this.item.student_course.splice(index, 1);
    }

    /**
     * Save Students
     *
     * @param {boolean} formValid Form validity check
     * @param Students item Students to save
     */
    save(formValid: boolean, item: Students): void {
        this.formValid = formValid;
        if (formValid) {
            if (item._id) {
                this.studentsService.update(item).subscribe(data => this.goBack());
            } else {
                this.studentsService.create(item).subscribe(data => this.goBack());
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



