<?php include 'inc/header.php'; ?>

<?php 
// include header............
	header('Access-Control-Allow-Origin: *'); // it allow all localhost,domian and sub-domain 

	header("Access-Control-Allow-Methods: GET");
	// type method // it accept post method
?>

<?php 
	
	if($_SERVER['REQUEST_METHOD'] == 'GET')
	{
		$result_obj = $stu->get_all_data();

		if($result_obj->num_rows > 0)
		{
			$project_array = array();

			while ($row = $result_obj->fetch_assoc()) 
			{
				$project_array[] = array(
					'id' => $row['id'],
					'student_name' => $row['student_name'],
					'age' => $row['age'],
					'city' => $row['city']
				);
			}
			http_response_code(200); // status OK

			echo json_encode(array(
				'status' => 'success',
				'data' => $project_array
			));
		}
		else{
			// http_response_code(500); // internal server error
			echo json_encode(array(
				'status' => 'error',
				'massage' => ' internal server error'
			));
		}

		// print_r($result_obj);
	}
	else{

		// http_response_code(503); // service not unvailabole
		echo json_encode(array(
			'status' => 'error',
			'message' => 'Service not unavailable'
		));
	}

?>
