<?php include 'inc/header.php'; ?>

<?php 
// include header............
	header('Access-Control-Allow-Origin: *'); // it allow all localhost,domian and sub-domain 
	header("Content-type: applicatin/json; charset=UTF-8"); // data which we are getting inside request
	header("Access-Control-Allow-Methods: POST");
	// type method // it accept post method
	header("Access-Control-Allow-Headers: Access-Control-Allow-Headers,Access-Control-Allow-Origin,Content-type,Authorization,X-Requested-With");
?>

<?php 
	
	if($_SERVER['REQUEST_METHOD'] == 'POST')
	{
		$data = json_decode(file_get_contents("php://input"),true);

		$stu->student_name = $data['student_name'];
		$stu->age = $data['age'];
		$stu->city = $data['city'];

		if(!empty($data['student_name']) AND !empty($data['age']) AND !empty($data['city']))
		{
			if($stu->create_data() != FALSE)
			{
				
				http_response_code(200); // status OK

				echo json_encode(array(
					'status' => 'success',
					'message' => "Data Insert SUccessfully"
				));
			}
			else{
				// http_response_code(500); // internal server error
				echo json_encode(array(
					'status' => 'error',
					'massage' => ' internal server error'
				));
			}
		}
		else{
			// http_response_code(404); // data not found
			echo json_encode(array(
				'status' => "error",
				'message' => "All Data is required"
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
