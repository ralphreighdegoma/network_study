<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'title',
        'type',
        'order',
        'amount',
        'amount_type'
    ];
}
