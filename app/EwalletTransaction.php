<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EwalletTransaction extends Model
{
    protected $fillable = [
        'ewallet_id',
        'order_id',
        'referral_member_id',
        'title',
        'description',
        'amount',
        'ewallet_type',
        'transaction_type',
        'user_id'
    ];


    public function ewalletTransactionCreate($data)
    {
        $ewallet_transaction = EwalletTransaction::create([
            'ewallet_id' => $data['ewallet_id'],
            'order_id' => $data['order_id'],
            'referral_member_id' => $data['referral_member_id'],
            'user_id' => $data['user_id'],
            'title' => $data['title'],
            'description' => $data['description'],
            'amount' => $data['amount'],
            'ewallet_type' => $data['ewallet_type'],
            'transaction_type' => $data['transaction_type'],
        ]);

        return $ewallet_transaction;
    }

    public function order()
    {
        return $this->belongsTo('App\Order');
    }
}
