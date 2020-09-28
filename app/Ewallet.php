<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ewallet extends Model
{
    protected $fillable = [
        'user_id',
        'total_deposit',
        'total_withdraw',
        'is_active'
    ];

    public function createEwallet($user_id){
        $ewallet = Ewallet::create([
            'user_id' => $user_id,
            'total_deposit' => 0,
            'total_withdraw' => 0,
            'is_active' => 1
        ]);

        return $ewallet;
    }
}
