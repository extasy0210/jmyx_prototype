<?php
//dependency import
require 'properties.php';
require 'lib/Slim/Slim.php';
require 'security/Security.php';

//init Slim Framework
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app->add(new \Security($app));
require 'security/Login.php';
require 'security/ManageUser.php';

//resources
	//db jmyx_prototype_db
		require('./resource/jmyx_prototype_db/custom/CoursesCustom.php');
		require('./resource/jmyx_prototype_db/Courses.php');
		require('./resource/jmyx_prototype_db/custom/StudentsCustom.php');
		require('./resource/jmyx_prototype_db/Students.php');
		require('./resource/jmyx_prototype_db/custom/TeachersCustom.php');
		require('./resource/jmyx_prototype_db/Teachers.php');
		require('./resource/jmyx_prototype_db/custom/UserCustom.php');
		require('./resource/jmyx_prototype_db/User.php');
	

$app->run();


?>
