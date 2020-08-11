<?php include 'inc/header.php'; ?>

<?php 
// include header............
	header('Access-Control-Allow-Origin: *'); // it allow all localhost,domian and sub-domain 
	header("Content-type: applicatin/json; charset=UTF-8"); // data which we are getting inside request // it receive data as a json formate
	header("Access-Control-Allow-Methods: POST");
	// type method // it accept post method
?>


<?php 
	
	if($_SERVER['REQUEST_METHOD'] == 'POST')
	{
			$data = json_decode(file_get_contents("php://input"),true);
			// print_r($data);
			// die();

			if(!empty($data['name']) AND !empty($data['email']) AND !empty($data['mobile']))
			{
				$stu->name = $data['name'];
				$stu->email = $data['email'];
				$stu->mobile = $data['mobile'];

				if($stu->create_data())
				{
					http_response_code(200); // 200 means OK
					echo json_encode(array(
							'status' => 1,
							'message' => "Student Has been created"
					));
					// echo "Student Has been created";
				}
				else{
					http_response_code(500); //500 means internal server error
					echo json_encode(array(
						'stauts' => 0,
						'message' => "Fail to insert data"
					));
					// echo "Fail to insert data";
				}
			}
			else{
				http_response_code(404); //404 means page not found
					echo json_encode(array(
						'stauts' => 0,
						'message' => "All value needed"
					));
			}

				
	}
	else{
		http_response_code(503) // 503 mens this serivce not unavailable
		; //503 service unabailable
					echo json_encode(array(
						'stauts' => 0,
						'message' => "Access Deny"
					));
	}
	
	

?>






<?php include 'inc/footer.php'; ?>