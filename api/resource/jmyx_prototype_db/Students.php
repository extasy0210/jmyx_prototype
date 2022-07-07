<?php
	require_once './db/dbjmyx_prototype_dbManager.php';
	
/*
 * SCHEMA DB Students
 * 
	{
		age: {
			type: 'Integer', 
			required : true
		},
		class_count: {
			type: 'Integer', 
			required : true
		},
		course_id: {
			type: 'Integer', 
			required : true
		},
		create_time: {
			type: 'Date', 
			required : true
		},
		isTrial: {
			type: 'Boolean', 
			required : true
		},
		name: {
			type: 'String', 
			required : true
		},
		nick_name: {
			type: 'String'
		},
		update_time: {
			type: 'Date', 
			required : true
		},
		//RELAZIONI
		
		
		//RELAZIONI ESTERNE
		
		student_course: [{
			type: Schema.ObjectId,
			ref : "Students"
		}],
		
	}
 * 
 */


//CRUD METHODS


//CRUD - CREATE


$app->post('/students',	function () use ($app){

	$body = json_decode($app->request()->getBody());
	
	$params = array (
		'age'	=> $body->age,
		'class_count'	=> $body->class_count,
		'course_id'	=> $body->course_id,
		'create_time'	=> $body->create_time,
		'isTrial'	=> $body->isTrial,
		'name'	=> $body->name,
		'nick_name'	=> isset($body->nick_name)?$body->nick_name:'',
		'update_time'	=> $body->update_time,
		
	);

	$obj = makeQuery("INSERT INTO students (_id, age, class_count, course_id, create_time, isTrial, name, nick_name, update_time )  VALUES ( null, :age, :class_count, :course_id, :create_time, :isTrial, :name, :nick_name, :update_time   )", $params, false);
    
    
	// Delete not in array
	$in = " and id_Courses NOT IN (:student_course)";
	$sql = "DELETE FROM Students_student_course WHERE id_Students=:id_Students ";
		
	$params = array (
		'id_Students'	=> $obj['id']
	);
	
	if (isset($body->student_course) && $body->student_course != null && sizeOf($body->student_course) > 0) {
		$sql = $sql.$in;
		$params['student_course'] = join("', '", $body->student_course);
	}
	
	makeQuery($sql, $params, false);
	
	
	// Get actual
	$sql="SELECT id_Courses FROM Students_student_course WHERE id_Students=:id";
	$params = array (
		'id'	=> $obj['id'],
	);
    $actual = makeQuery($sql, $params, false);
	$actualArray=[];
	foreach ($actual as $val) {
		array_push($actualArray, $val->id_Courses);
	}

	// Insert new
	if (isset($body->student_course)) {
    	foreach ($body->student_course as $id_Courses) {
    		if (!in_array($id_Courses, $actualArray)){
    			$sql = "INSERT INTO Students_student_course (_id, id_Students, id_Courses ) VALUES (null, :id_Students, :id_Courses)";
    
    			$params = array (
    				'id_Students'	=> $obj['id'],
    				'id_Courses'	=> $id_Courses
    			);
        		makeQuery($sql, $params, false);
    		}
    	}
	}
	
	
	
	echo json_encode($body);
	
});
	
//CRUD - REMOVE

$app->delete('/students/:id',	function ($id) use ($app){
	
	$params = array (
		'id'	=> $id,
	);

	makeQuery("DELETE FROM students WHERE _id = :id LIMIT 1", $params);

});

//CRUD - FIND BY student_course

$app->get('/students/findBystudent_course/:key',	function ($key) use ($app){	

	$params = array (
		'key'	=> $key,
	);
	makeQuery("SELECT * FROM students WHERE student_course = :key", $params);
	
});
	
//CRUD - GET ONE
	
$app->get('/students/:id',	function ($id) use ($app){
	$params = array (
		'id'	=> $id,
	);
	
	$obj = makeQuery("SELECT * FROM students WHERE _id = :id LIMIT 1", $params, false);
	
	
	$list_student_course = makeQuery("SELECT id_Courses FROM Students_student_course WHERE id_Students = :id", $params, false);
	$list_student_course_Array=[];
	foreach ($list_student_course as $val) {
		array_push($list_student_course_Array, $val->id_Courses);
	}
	$obj->student_course = $list_student_course_Array;
	
	
	
	echo json_encode($obj);
	
});
	
	
//CRUD - GET LIST

$app->get('/students',	function () use ($app){
	makeQuery("SELECT * FROM students");
});


//CRUD - EDIT

$app->post('/students/:id',	function ($id) use ($app){

	$body = json_decode($app->request()->getBody());
	
	$params = array (
		'id'	=> $id,
		'age'	    => $body->age,
		'class_count'	    => $body->class_count,
		'course_id'	    => $body->course_id,
		'create_time'	    => $body->create_time,
		'isTrial'	    => $body->isTrial,
		'name'	    => $body->name,
		'nick_name'	    => isset($body->nick_name)?$body->nick_name:'',
		'update_time'	    => $body->update_time
	);

	$obj = makeQuery("UPDATE students SET  age = :age,  class_count = :class_count,  course_id = :course_id,  create_time = :create_time,  isTrial = :isTrial,  name = :name,  nick_name = :nick_name,  update_time = :update_time   WHERE _id = :id LIMIT 1", $params, false);
    
	// Delete not in array
	$in = " and id_Courses NOT IN (:student_course)";
	$sql = "DELETE FROM Students_student_course WHERE id_Students=:id_Students ";
	
	$params = array (
		'id_Students'	=> $body->_id
	);
	
	if (isset($body->student_course) && $body->student_course != null && sizeOf($body->student_course) > 0) {
		$sql = $sql.$in;
		$params['student_course'] = join("', '", $body->student_course);
	}
	
	makeQuery($sql, $params, false);
	
	
	// Get actual
	$sql="SELECT id_Courses FROM Students_student_course WHERE id_Students=:id";
	$params = array (
		'id'	=> $body->_id,
	);
    $actual = makeQuery($sql, $params, false);
	$actualArray=[];
	foreach ($actual as $val) {
		array_push($actualArray, $val->id_Courses);
	}

	// Insert new
	if (isset($body->student_course)) {
    	foreach ($body->student_course as $id_Courses) {
    		if (!in_array($id_Courses, $actualArray)){
    			$sql = "INSERT INTO Students_student_course (_id, id_Students, id_Courses ) VALUES (null, :id_Students, :id_Courses)";
    
    			$params = array (
    				'id_Students'	=> $body->_id,
    				'id_Courses'	=> $id_Courses
    			);
        		makeQuery($sql, $params, false);
    		}
    	}
	}
	
	
	
	echo json_encode($body);
    	
});


/*
 * CUSTOM SERVICES
 *
 *	These services will be overwritten and implemented in  Custom.js
 */

			
?>