<?php

namespace GameOfLife;

use medoo;

class Pattern
{
    var $config;
    var $db;

    public function __construct()
    {
        $this->config = include 'config.php';
        $this->db = new medoo($this->config['db']);
    }

    public function loadAll()
    {
        return $this->db->select('patterns',['pa_name','pa_data']);

    }

    public function save($name, $data)
    {
        try {
            $last_user_id = $this->db->insert('patterns', [
                'pa_name' => $name,
                'pa_data' => json_encode($data),
                'pa_created_at' => date('Y-m-d H:i:s'),
            ]);

            return ['error'=>false];
        }catch (\Exception $e){
            return ['error'=>true, 'message'=>$e->getMessage()];
        }

    }
}