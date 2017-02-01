<?php

require 'vendor/autoload.php';

use GameOfLife\Game;
use GameOfLife\LifParser;
use GameOfLife\Pattern;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    switch ($_POST['task']){
        case 'calcNextStep':
            $gol = new Game();
            $data = $gol->calcNextStep($_POST['data']);
            echo json_encode($data);
            break;

        case 'patterns':
            $pattern = new Pattern();
            $data = $pattern->save($_POST['name'], $_POST['data']);
            echo json_encode($data);
            break;
        default: die('Wrong task');
    }


}elseif($_SERVER['REQUEST_METHOD'] === 'GET'){

    switch ($_GET['task']){
        case 'patterns':
            $pattern = new Pattern();
            $data = $pattern->loadAll();
            echo json_encode($data);
            break;

/*        case 'patterns':
            $parser = new LifParser();
            $data = $parser->parse('glider.lif');
            echo json_encode($data);
            break;*/
        default: die('Wrong task');
    }
}


