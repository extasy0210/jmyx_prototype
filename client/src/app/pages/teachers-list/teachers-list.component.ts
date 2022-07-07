import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
// Import Services
import { TeachersService } from '../../services/teachers.service';
// Import Models
import { Teachers } from '../../domain/jmyx_prototype_db/teachers';

// START - USED SERVICES
/**
* TeachersService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
* TeachersService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component shows a list of Teachers
 * @class TeachersListComponent
 */
@Component({
    selector: 'app-teachers-list',
    templateUrl: './teachers-list.component.html',
    styleUrls: ['./teachers-list.component.css']
})
export class TeachersListComponent implements OnInit {
    list: Teachers[];
    search: any = {};
    idSelected: string;
    constructor(
        private teachersService: TeachersService,
    ) { }

    /**
     * Init
     */
    ngOnInit(): void {
        this.teachersService.list().subscribe(list => this.list = list);
    }

    /**
     * Select Teachers to remove
     *
     * @param {string} id Id of the Teachers to remove
     */
    selectId(id: string) {
        this.idSelected = id;
    }

    /**
     * Remove selected Teachers
     */
    deleteItem() {
        this.teachersService.remove(this.idSelected).subscribe(data => this.list = this.list.filter(el => el._id !== this.idSelected));
    }

}
