<?php
	require_once './db/dbjmyx_prototype_dbManager.php';
	
/*
 * SCHEMA DB Teachers
 * 
	{
		create_time: {
			type: 'Date', 
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
		
		teacher_class: {
			type: Schema.ObjectId,
			ref : "Teachers"
		},
		
	}
 * 
 */


//CRUD METHODS


//CRUD - CREATE


$app->post('/teachers',	function () use ($app){

	$body = json_decode($app->request()->getBody());
	
	$params = array (
		'create_time'	=> $body->create_time,
		'name'	=> $body->name,
		'update_time'	=> $body->update_time,
		
		'teacher_class' => isset($body->teacher_class)?$body->teacher_class:'',
	);

	$obj = makeQuery("INSERT INTO teachers (_id, create_time, name, update_time , teacher_class )  VALUES ( null, :create_time, :name, :update_time , :teacher_class   )", $params, false);
    
	
	echo json_encode($body);
	
});
	
//CRUD - REMOVE

$app->delete('/teachers/:id',	function ($id) use ($app){
	
	$params = array (
		'id'	=> $id,
	);

	makeQuery("DELETE FROM teachers WHERE _id = :id LIMIT 1", $params);

});

//CRUD - FIND BY teacher_class

$app->get('/teachers/findByteacher_class/:key',	function ($key) use ($app){	

	$params = array (
		'key'	=> $key,
	);
	makeQuery("SELECT * FROM teachers WHERE teacher_class = :key", $params);
	
});
	
//CRUD - GET ONE
	
$app->get('/teachers/:id',	function ($id) use ($app){
	$params = array (
		'id'	=> $id,
	);
	
	$obj = makeQuery("SELECT * FROM teachers WHERE _id = :id LIMIT 1", $params, false);
	
	
	
	echo json_encode($obj);
	
});
	
	
//CRUD - GET LIST

$app->get('/teachers',	function () use ($app){
	makeQuery("SELECT * FROM teachers");
});


//CRUD - EDIT

$app->post('/teachers/:id',	function ($id) use ($app){

	$body = json_decode($app->request()->getBody());
	
	$params = array (
		'id'	=> $id,
		'create_time'	    => $body->create_time,
		'name'	    => $body->name,
		'update_time'	    => $body->update_time,
		'teacher_class'      => isset($body->teacher_class)?$body->teacher_class:'' 
	);

	$obj = makeQuery("UPDATE teachers SET  create_time = :create_time,  name = :name,  update_time = :update_time  , teacher_class=:teacher_class  WHERE _id = :id LIMIT 1", $params, false);
    
	
	echo json_encode($body);
    	
});


/*
 * CUSTOM SERVICES
 *
 *	These services will be overwritten and implemented in  Custom.js
 */

			
?>