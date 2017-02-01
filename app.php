<?php

require 'vendor/autoload.php';

use GameOfLife\Game;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $gol = new Game();
    switch ($_POST['task']){
        case 'calcNextStep':
            $data = $gol->calcNextStep($_POST['data']);
            echo json_encode($data);
            break;
        default: die('Wrong task');
    }


}elseif($_SERVER['REQUEST_METHOD'] === 'GET'){
    $gol = new Game();

    switch ($_GET['task']){
        case 'calcNextStep': $gol->calcNextStep($_GET['data']);
            break;
        default: die('Wrong task');
    }
}


