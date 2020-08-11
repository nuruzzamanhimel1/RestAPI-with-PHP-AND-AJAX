$(document).ready(function(){
	// fetch all data
	loadTable();

	// tutorial - 19
	function loadTable()
	{
		$('#table_body').html("");

		$.ajax({
			url:"http://localhost/1.yahoo_baba_PHP_restAPI_with_ajax/16api-fetch-all.php",
			method:'GET',
			dataType:'json',
			success:function(reflection)
			{
				if($.trim(reflection) != "")
				{
					if(reflection.status === 'success')
					{
						var i = 0;
						$.each(reflection.data,function(key,value){
							i++;
							$('#table_body').append("<tr><td>"+i+"</td> <td>  "+reflection.data[key].student_name+"</td><td>  "+reflection.data[key].age+"</td> <td>  "+reflection.data[key].city+"</td><td><a href='' class='btn btn-success edt_btn' data-eid="+value.id+">Edit</a></td> <td><a href='' class='btn btn-danger dlt_btn' data-did="+value.id+">Delete</a></td>  </tr>");
						
						});
						// console.log(reflection.data[0].student_name);
					}
				}
				// console.log(reflection);
			}

		});
	}

	//2. fetch single record : show in modal box
	// tutorial -20
	$(document).on('click','.edt_btn',function(e){

		e.preventDefault();
	
		 $('#myModal').css({'display':"block"});

		 var studentId = $(this).data('eid');
		 // json encode way
		 // 1. first make object then it converted as a stringify()

		 var obj = { id : studentId };
		 var myJSON = JSON.stringify(obj); // JSON.stringify() means json_encode()

		 $.ajax({
		 	url:"http://localhost/1.yahoo_baba_PHP_restAPI_with_ajax/16api_fetch_single.php",
		 	method:"POST",
		 	data: myJSON,
		 	dataType:"JSON",
		 	success:function(reflection)
		 	{
		 		if($.trim(reflection) != "")
		 		{
		 			if(reflection.status == 'success')
		 			{
		 				$('#student_name').val(reflection.data[0].student_name);
		 				$('#age').val(reflection.data[0].age);
		 				$('#city').val(reflection.data[0].city);
		 				$('#student_id').val(reflection.data[0].id);

		 				// console.log(reflection.data[0].student_name);
		 			}
		 		}
		 		// console.log(reflection);
		 	}
		 });
		// console.log(myJSON);
	});



// tutorial - 20
	$(document).on('click','.close',function(e){

		e.preventDefault();
		 $('#myModal').css({'display':"none"});

	})
// tutorial - 20
	$(window).click(function(event){

		if(event.target.className == 'modal_make')
		{
			 $('#myModal').css({'display':"none"});
		}
		// console.log(event.target.className);
	});


	// 3. insert New Record..................
// tutorial - 20
	$(document).on('submit','#insert_form',function(e){

		e.preventDefault();

		var json_form_data = jsonData($(this));

		$.ajax({
			url:"http://localhost/1.yahoo_baba_PHP_restAPI_with_ajax/17api-insert.php",
			method:"POST",
			async:false,
			data: json_form_data,
			dataType:'JSON',
			success:function(reflection)
			{
				if($.trim(reflection) != "")
				{
					if(reflection.status == 'success')
					{
						message_function("success-massage","error-massage",reflection.message,reflection.status);

						$('#insert_form')[0].reset();
						loadTable();
					}
					else if(reflection.status == 'error')
					{
						message_function("success-massage","error-massage", reflection.message,reflection.status);
					}
				}


				console.log(reflection);
			}
		});
		// console.log(json_form_data);
	});

	// 4. Update Record................
// tutorial - 20
	$(document).on('submit','form#edit_form',function(e){

		e.preventDefault();

		var json_form_data = jsonData($(this));

		$.ajax({
			url:"http://localhost/1.yahoo_baba_PHP_restAPI_with_ajax/17api-update.php",
			method:"PUT",
			async:false,
			data: json_form_data,
			dataType:'JSON',
			success:function(reflection)
			{
				if($.trim(reflection) != "")
				{
					if(reflection.status == 'success')
					{
						message_function("modal-success-massage","modal-error-massage",reflection.message,reflection.status);

						$('#insert_form')[0].reset();
						loadTable();
					}
					else if(reflection.status == 'error')
					{
						message_function("modal-success-massage","modal-error-massage", reflection.message,reflection.status);
					}
				}

				console.log(reflection);
			}
		});


		// console.log(json_form_data);

	});

	// tutorial-21
	// Delete Recored

	$(document).on('click','.dlt_btn',function(e){

		e.preventDefault();

		var clicked_btn = $(this);

		var studentId = $(this).data('did');
		var obj = { id : studentId };
		// object to json_encode converted............
		var myJSON = JSON.stringify(obj);

		if(confirm('Are you sure to want to delete the record ??'))
		{
			$.ajax({
			url:"http://localhost/1.yahoo_baba_PHP_restAPI_with_ajax/18.api-delete.php",
			method: 'DELETE',
			async:false,
			data: myJSON,
			dataType:'json',
			success:function(reflection)
			{
				if($.trim(reflection) != "")
				{
					if(reflection.status == 'success')
					{
						message_function("success-massage","error-massage",reflection.message,reflection.status);

						// $('#insert_form')[0].reset();

						clicked_btn.closest('tr').fadeOut('slow');
						
					}
					else if(reflection.status == 'error')
					{
						message_function("success-massage","error-massage", reflection.message,reflection.status);
					}
				}
				console.log(reflection);
			}
		});
		}

		// console.log(studentId);
	});

	// tutorial-21
	$(document).on('keyup','#search',function(e){

		var search_item = $(this).val();

		if(search_item == "")
		{
			loadTable();
			// console.log('there havenont data');
		}
		else{

				$('#table_body').html('');

				$.ajax({
					url:"http://localhost/1.yahoo_baba_PHP_restAPI_with_ajax/18.api-search.php?search="+search_item,
					method:"GET",
					async:false,
					dataType:'JSON',
					success:function(reflection)
					{
						if($.trim(reflection) != "")
						{
							if(reflection.status == 'error')
							{
								$('#table_body').html("<tr> <td colspan='6'> <h2> Data Not Found</h2></td></tr>");
							}
							else if(reflection.status == 'success')
							{
								// console.log(reflection.message);
								var i = 0;
								$.each(reflection.message,function(key,value){
									i++;

									$('#table_body').append("<tr><td>"+i+"</td> <td>  "+reflection.message[key][1]+"</td><td>  "+reflection.message[key][2]+"</td> <td>  "+reflection.message[key][3]+"</td><td><a href='' class='btn btn-success edt_btn' data-eid="+reflection.message[key][0]+">Edit</a></td> <td><a href='' class='btn btn-danger dlt_btn' data-did="+reflection.message[key][0]+">Delete</a></td>  </tr>");

									// console.log(reflection.message[key][1]);
								});
							}
						}
						console.log(reflection);
					}
				});
	
		}


		
		console.log(search_item);

	});


	function message_function(noti_succClass,noti_erroClass,message,status)
	{
		if(status == 'success')
		{
			$('#'+noti_succClass).html(message).slideDown('slow');
			$('#'+noti_erroClass).html("").slideUp();

			setTimeout(function(){
				$('#'+noti_succClass).html(message).slideUp('slow');
			},4000);

			// for reset ......... 

		}
		else if(status == 'error')
		{
			$('#'+noti_erroClass).html(message).slideDown('slow');
			$('#'+noti_succClass).html("").slideUp();

			setTimeout(function(){
				$('#'+noti_erroClass).html(message).slideUp('slow')
			},4000);
		}
	}

	function jsonData(targetForm)
	{
		// get form value into serializeArrya()
		var form_data = targetForm.serializeArray();

		//Object Create and Dynamacally Object converted
		var obj = {};

		$.each(form_data,function(key,value){
			obj[value.name] = value.value
		});

		// CRATE JSON ENCODED
		var json_string = JSON.stringify(obj);

		return json_string;
	}






});

 