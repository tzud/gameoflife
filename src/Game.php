<?php

namespace GameOfLife;


class Game
{
    public function __construct()
    {
    }

    public function calcNextStep($data)
    {
        $results = [];

        foreach ($data as $i => $row) {
            foreach ($row as $j => $item) {
                $neighbours = [];
                if(isset($data[$i-1][$j-1])) $neighbours[] = $data[$i-1][$j-1];
                if(isset($data[$i-1][$j])) $neighbours[] = $data[$i-1][$j];
                if(isset($data[$i-1][$j+1])) $neighbours[] = $data[$i-1][$j+1];
                if(isset($data[$i][$j-1])) $neighbours[] = $data[$i][$j-1];
                if(isset($data[$i][$j+1])) $neighbours[] = $data[$i][$j+1];
                if(isset($data[$i+1][$j-1])) $neighbours[] = $data[$i+1][$j-1];
                if(isset($data[$i+1][$j])) $neighbours[] = $data[$i+1][$j];
                if(isset($data[$i+1][$j+1])) $neighbours[] = $data[$i+1][$j+1];

                $results[$i][$j] = $this->calcLive($data[$i][$j], $neighbours);
            }

        }

        return $results;
    }

    private function calcLive($itemLife, $neighbours)
    {
        $liveN = array_sum($neighbours);

        if($itemLife){ //live
            if($liveN == 2 || $liveN == 3) {
                return 1;
            }else{
                return 0;
            }
        }else{ //dead
            if($liveN == 3) {
                return 1;
            }else{
                return 0;
            }
        }
    }


}