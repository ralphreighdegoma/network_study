<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReferralMember extends Model
{
    protected $fillable = [
        'referral_id',
        'user_id',
        'order'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
