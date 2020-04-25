<?php
include('database.php');


if(isset($_POST['id'])){
$id=$_POST['id'];
$name=$_POST['name'];
$description=$_POST['description'];
$query="UPDATE tareas SET name='$name', description='$description' WHERE id = $id";
$result=mysqli_query($connection,$query);
if (!$result) {
    die('Query Error'.mysqli_error($connection));

}
echo "Task Updated Successfully";


}





