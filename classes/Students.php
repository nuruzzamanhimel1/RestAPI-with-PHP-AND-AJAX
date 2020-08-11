<?php


class Students{

	public $student_name;
	public $age;
	public $city;


	public $id;

	private $db;
	private $table_name;

	public function __construct()
	{
		$this->db = new Database();
		$this->table_name = 'students';
	}

	public function create_data()
	{
		$query ="INSERT INTO ".$this->table_name."(student_name,age,city) VALUES('".$this->student_name."','".$this->age."','".$this->city."' ) ";
		$result = $this->db->insert($query);
		if($result)
		{
			return TRUE;
		}
		else{
			return FALSE;
		}
	}


	public function get_all_data()
	{
		$query="SELECT * FROM ".$this->table_name." ";
		$result = $this->db->select($query);

		if($result != FALSE)
		{
			return $result;
		}
		else
		{
			return FALSE;
		}
	}

	public function get_single_student()
	{
		$query="SELECT * FROM ".$this->table_name." WHERE id = ".$this->id." ";
		$result = $this->db->select($query);

		if($result != FALSE)
		{
			return $result->fetch_assoc();
		}
		else{
			return false;
		}
	}

	public function update_student()
	{
		$query = "UPDATE ".$this->table_name." SET student_name = '".$this->student_name."',age = '".$this->age."', city='".$this->city."' WHERE id = '".$this->id."'  ";
		$result = $this->db->update($query);

		if($result != FALSE)
		{
			return true;
		}
		else{
			return false;
		}
	}

	public function delete_student()
	{
		$query = "DELETE FROM ".$this->table_name." WHERE id = ".$this->id." ";
		$result = $this->db->delete($query);

		if($result != FALSE)
		{
			return true;
		}
		else{
			return false;
		}
	}
	public function search_single_row()
	{
		$query="SELECT * FROM ".$this->table_name." WHERE student_name LIKE '%".$this->student_name."%' ";
		$result = $this->db->select($query);

		if($result != FALSE)
		{
			return $result->fetch_all();
		}
		else{
			return false;
		}
	}

	


	
}
?>