<?php include 'inc/header.php'; ?>

<?php 
// include header............
	header('Access-Control-Allow-Origin: *'); // it allow all localhost,domian and sub-domain 
	header("Content-type: applicatin/json; charset=UTF-8"); // data which we are getting inside request
	header("Access-Control-Allow-Methods: DELETE");
	// type method // it accept post method
	header("Access-Control-Allow-Headers: Access-Control-Allow-Headers,Access-Control-Allow-Origin,Content-type,Authorization,X-Requested-With");
?>

<?php 
	
	if($_SERVER['REQUEST_METHOD'] == 'DELETE')
	{
		$data = json_decode(file_get_contents("php://input"),true);
		$stu->id = $data['id'];

		if(!empty($data['id']))
		{
			$result = $stu->delete_student();

			if($result != FALSE)
			{
			
				http_response_code(200); // status OK

				echo json_encode(array(
					'status' => 'success',
					'message' => "data Delete successfully"
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
				'message' => "Data not found"
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
