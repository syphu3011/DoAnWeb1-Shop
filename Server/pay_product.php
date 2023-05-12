<?php
require_once('../init.php');
require_once('CRUD.php');
$crud = new CRUD();
$id_customer = 'KH001';
// $product
$max_id_hd = $crud->read_max_receipt($conn);
echo json_encode($max_id_hd);
?>