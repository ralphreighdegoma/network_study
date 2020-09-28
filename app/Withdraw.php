<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Withdraw extends Model
{
    protected $fillable = [
        'user_id', 'payment_method', 'name', 'phone', 'address', 'amount', 'status'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
