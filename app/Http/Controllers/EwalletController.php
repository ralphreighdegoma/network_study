<?php

namespace App\Http\Controllers;

use App\Ewallet;
use App\EwalletTransaction;
use App\Order;
use App\Referral;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class EwalletController extends Controller
{
    public function ewalletTransactionList(){

        $ewallet = Ewallet::where('user_id', Auth::id())->where('is_active', 1)->first();

        $ewallet_transactions  = EwalletTransaction::where('ewallet_id', $ewallet->id)->orderBy('created_at', 'DESC')->get();

        foreach ($ewallet_transactions as $transaction) {
            if($transaction->ewallet_type == 'order' || $transaction->ewallet_type == 'referral-order' ){
                $order = Order::where('id', $transaction->order_id)->first();
                $transaction->status = $order->status;
            }else {
                $oldOrder = Order::where('user_id', $transaction->user_id)->where('status', 'complete')->first();

                if($oldOrder){
                    $transaction->status = 'complete';
                }else {
                    $transaction->status = 'pending';
                }
            }
        }
            
        return response()->json(['ewallet' => $ewallet, 'ewallet_transactions' => $ewallet_transactions], 200);
    }
}
