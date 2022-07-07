<?php
	require_once './db/dbjmyx_prototype_dbManager.php';
	
/*
 * SCHEMA DB Courses
 * 
	{
		class_time: {
			type: 'Date'
		},
		create_time: {
			type: 'Date', 
			required : true
		},
		level: {
			type: 'String', 
			required : true
		},
		name: {
			type: 'String', 
			required : true
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
		teacher_class: {
			type: Schema.ObjectId,
			ref : "Teachers"
		},
		
	}
 * 
 */


//CRUD METHODS


//CRUD - CREATE


$app->post('/courses',	function () use ($app){

	$body = json_decode($app->request()->getBody());
	
	$params = array (
		'class_time'	=> isset($body->class_time)?$body->class_time:'',
		'create_time'	=> $body->create_time,
		'level'	=> $body->level,
		'name'	=> $body->name,
		'update_time'	=> $body->update_time,
		

	);

	$obj = makeQuery("INSERT INTO courses (_id, class_time, create_time, level, name, update_time )  VALUES ( null, :class_time, :create_time, :level, :name, :update_time   )", $params, false);
        
	
	echo json_encode($body);
	
});
	
//CRUD - REMOVE

$app->delete('/courses/:id',	function ($id) use ($app){
	
	$params = array (
		'id'	=> $id,
	);

	makeQuery("DELETE FROM courses WHERE _id = :id LIMIT 1", $params);

});
	
//CRUD - GET ONE
	
$app->get('/courses/:id',	function ($id) use ($app){
	$params = array (
		'id'	=> $id,
	);
	
	$obj = makeQuery("SELECT * FROM courses WHERE _id = :id LIMIT 1", $params, false);
	
	
	
	echo json_encode($obj);
	
});
	
	
//CRUD - GET LIST

$app->get('/courses',	function () use ($app){
	makeQuery("SELECT * FROM courses");
});


//CRUD - EDIT

$app->post('/courses/:id',	function ($id) use ($app){

	$body = json_decode($app->request()->getBody());
	
	$params = array (
		'id'	=> $id,
		'class_time'	    => isset($body->class_time)?$body->class_time:'',
		'create_time'	    => $body->create_time,
		'level'	    => $body->level,
		'name'	    => $body->name,
		'update_time'	    => $body->update_time

	);

	$obj = makeQuery("UPDATE courses SET  class_time = :class_time,  create_time = :create_time,  level = :level,  name = :name,  update_time = :update_time   WHERE _id = :id LIMIT 1", $params, false);
        
	
	echo json_encode($body);
    	
});


/*
 * CUSTOM SERVICES
 *
 *	These services will be overwritten and implemented in  Custom.js
 */

			
?>