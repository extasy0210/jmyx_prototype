// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Import Services
import { CoursesService } from '../../services/courses.service';
import { TeachersService } from '../../services/teachers.service';
import { StudentsService } from '../../services/students.service';
// Import Models
import { Courses } from '../../domain/jmyx_prototype_db/courses';
import { Students } from '../../domain/jmyx_prototype_db/students';
import { Teachers } from '../../domain/jmyx_prototype_db/teachers';

// START - USED SERVICES
/**
* CoursesService.create
*	@description CRUD ACTION create
*
* CoursesService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
* CoursesService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id resource
*
* TeachersService.findByteacher_class
*	@description CRUD ACTION findByteacher_class
*	@param Objectid key Id of model to search for
*
* StudentsService.findBystudent_course
*	@description CRUD ACTION findBystudent_course
*	@param Objectid key Id of model to search for
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a Courses
 */
@Component({
    selector: 'app-courses-edit',
    templateUrl: 'courses-edit.component.html',
    styleUrls: ['courses-edit.component.css']
})
export class CoursesEditComponent implements OnInit {
    item: Courses;
    externalStudents_student_course: Students[];
    externalTeachers_teacher_class: Teachers[];
    model: Courses;
    formValid: Boolean;

    constructor(
    private coursesService: CoursesService,
    private teachersService: TeachersService,
    private studentsService: StudentsService,
    private route: ActivatedRoute,
    private location: Location) {
        // Init item
        this.item = new Courses();
        this.externalStudents_student_course = [];
        this.externalTeachers_teacher_class = [];
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.coursesService.get(id).subscribe(item => this.item = item);
                this.studentsService.findByStudent_course(id).subscribe(list => this.externalStudents_student_course = list);
                this.teachersService.findByTeacher_class(id).subscribe(list => this.externalTeachers_teacher_class = list);
            }
            // Get relations
        });
    }


    /**
     * Save Courses
     *
     * @param {boolean} formValid Form validity check
     * @param Courses item Courses to save
     */
    save(formValid: boolean, item: Courses): void {
        this.formValid = formValid;
        if (formValid) {
            if (item._id) {
                this.coursesService.update(item).subscribe(data => this.goBack());
            } else {
                this.coursesService.create(item).subscribe(data => this.goBack());
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



