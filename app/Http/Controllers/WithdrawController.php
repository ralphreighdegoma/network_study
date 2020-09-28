<?php

namespace App\Http\Controllers;

use App\Ewallet;
use App\Withdraw;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class WithdrawController extends Controller
{
    public function createWithdraw(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'address' => ['required'],
            'amount' => ['required'],
            'payment_method' => ['required'],
            'phone' => ['required'],
        ]);

        if ($validator->fails()){
            return response()->json(['status' => 'error', 'errors' => $validator->errors()->all()], 422);
        }

        $ewallet = Ewallet::where('user_id', Auth::id())->first();
        if($request->amount <= $ewallet->total_deposit){
            $withDraw = Withdraw::create([
                'name' => $request->name,
                'user_id' => Auth::id(),
                'address' => $request->address,
                'phone' => $request->phone,
                'amount' => $request->amount,
                'payment_method' => $request->payment_method,
                'status' => 'pending'
            ]);

            return response()->json($withDraw, 200);
        }else {
            return response()->json(['status' => 'error', 'errors' => ["You don't have enough balance to withdraw."]], 422);
        }

    }

    public function fetchCustomerWithdraws(){
        $withdraws = Withdraw::where('user_id', Auth::id())->get();
 
        return response()->json($withdraws, 200);
    }

    public function fetchAllRequestWithdraw(){
        $withdraws = Withdraw::orderBy('created_at', 'DESC')->get();
 
        return response()->json($withdraws, 200);
    }

    public function fetchWithDrawDetail($id){
        $withdraw = Withdraw::with('user')->where('id', $id)->first();

        if(!$withdraw){
            response()->json(null, 404);
        }

        $withdraw->ewallet = Ewallet::where('user_id', $withdraw->user_id)->first();
 
        return response()->json($withdraw, 200);
    }

    public function updateWithdraw(Request $request, $id){
        $withdraw_update = Withdraw::find($id);

        if(!$withdraw_update){
            response()->json(null, 404);
        }

        $withdraw_update->status = $request->status;
        $withdraw_update->save();

        if($request->status == 'complete'){
            $ewallet = Ewallet::where('user_id', $withdraw_update->user_id)->first();
            if($withdraw_update->amount <= $ewallet->total_deposit){
                $ewallet->total_deposit = $ewallet->total_deposit - $withdraw_update->amount;
                $ewallet->save();
            }else {
                return response()->json(['status' => 'error', 'errors' => ["Not enough balance to withdraw."]], 422);
            }

          
        }

        $withdraw = Withdraw::with('user')->where('id', $id)->first();
        $withdraw->ewallet = Ewallet::where('user_id', $withdraw->user_id)->first();
 
        return response()->json($withdraw, 200);
    }
}
