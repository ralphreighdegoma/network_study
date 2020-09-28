<?php

namespace App\Http\Controllers;

use App\Ewallet;
use App\EwalletTransaction;
use App\Notifications\CustomerOrderStatus;
use App\Order;
use App\OrderProduct;
use App\Referral;
use App\ReferralMember;
use App\Setting;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $oldOrder = Order::where('user_id', Auth::id())->first();
        $settings = Setting::where('title', 'order-discount')->first();

        $orders = Order::orderBy('id', 'DESC')->paginate(10);
        foreach ($orders as $order) {
            $order->product_order = OrderProduct::where('order_id', $order->id)->with(['product'])->first();
            $order->discount = $oldOrder ? $settings->amount : 0;
        }

        return response()->json($orders, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    public function createCustomerOrder(Request $request)
    {
        $settings_order = Setting::where('title', 'order')->first();
        $settings_order_initial = Setting::where('title', 'order-initial')->first();

        $oldOrder = Order::where('user_id', Auth::id())->first();

        if($request->payment_method == 'remittance'){
           $order = new Order();
           $newOrder = $order->createOrder($request);
        }

        $newOrder->product_order = OrderProduct::where('order_id', $newOrder->id)->with(['product'])->first();

        Auth::user()->notify(new CustomerOrderStatus($newOrder, null));
        
        // add an ewallet transaction 
        $ewallet = Ewallet::where('user_id', Auth::id())->first();
        if($ewallet){

            $amount = $oldOrder ? ($newOrder->total / (100 / $settings_order->amount)) : ($newOrder->total / (100 / $settings_order_initial->amount));

            $data = [
                'ewallet_id' => $ewallet->id,
                'order_id' => $newOrder->id,
                'referral_member_id' => null,
                'title' => 'Cash Back',
                'user_id' => Auth::id(),
                'description' => 'Cash Back Order',
                'amount' => $oldOrder ? ($newOrder->total / (100 / $settings_order->amount)) : ($newOrder->total / (100 / $settings_order_initial->amount)),
                'ewallet_type' => 'order',
                'transaction_type' => 'deposit'
            ];

            $ewallet_transaction = new EwalletTransaction();
            $add_ewallet_transaction = $ewallet_transaction->ewalletTransactionCreate($data);

            $referral_members = ReferralMember::where('user_id', Auth::id())->get();

            if(count($referral_members) > 0){
                foreach ($referral_members as $member) {
                    $settings = Setting::where('title', "referral-order-level-$member->order")->first();
                    $amount = $newOrder->total / (100 / $settings->amount);
                    $referral = Referral::find($member->referral_id);
                    $ewallet = Ewallet::where('user_id', $referral->user_id)->first();
                    $data = [
                        'ewallet_id' => $ewallet->id,
                        'order_id' => $newOrder->id,
                        'referral_member_id' => $referral->id,
                        'title' => 'Cash Back',
                        'user_id' => Auth::id(),
                        'description' => "Product purchase Referral level $member->order",
                        'amount' => $amount,
                        'ewallet_type' => 'referral-order',
                        'transaction_type' => 'deposit'
                    ];
                    if($newOrder->status !== 'pending'){
                        $updateEwallet = Ewallet::find($ewallet->id);
                        $updateEwallet->total_deposit = $updateEwallet->total_deposit + $amount;
                        $updateEwallet->save();

                        $allOrders = Order::where('user_id', $order->user_id)->where('status', 'complete')->get();
                        $ewallet_transaction = EwalletTransaction::where('user_id', $order->user_id)->where('ewallet_id', $ewallet->id)->where('ewallet_type', 'referral')->first();
                        if(count($allOrders) == 1 && $ewallet_transaction){
                            $updateEwalletReferral = Ewallet::find($ewallet->id);
                            $updateEwalletReferral->total_deposit = $updateEwalletReferral->total_deposit + $ewallet_transaction->amount;
                            $updateEwalletReferral->save();
                        }
                    } 

                    $ewallet_transaction = new EwalletTransaction();
                    $add_ewallet_transaction = $ewallet_transaction->ewalletTransactionCreate($data);
                }
            }

            if($newOrder->status !== 'pending'){
                $updateEwallet = Ewallet::find($ewallet->id);
                $updateEwallet->total_deposit = $updateEwallet->total_deposit + $amount;
                $updateEwallet->save();
            }
        }

        return response()->json($newOrder, 200);
    }

    public function customerOrders()
    {
        $orders = Order::where('user_id', Auth::id())->orderBy('id', 'DESC')->paginate(10);
        foreach ($orders as $order) {
            $order->product_order = OrderProduct::where('order_id', $order->id)->with(['product'])->first();
        }

        return response()->json($orders, 200);

    }

    public function customerOrderDetail($id){
        $order = Order::find($id);

        if($order){
            $order->product_order = OrderProduct::where('order_id', $order->id)->with(['product'])->first();
            return response()->json($order, 200);
        }

        return null;
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        if($order){
            $order->product_order = OrderProduct::where('order_id', $order->id)->with(['product'])->first();
            return response()->json($order, 200);
        }

        return null;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        $settings_order = Setting::where('title', 'order')->first();
        $settings_order_initial = Setting::where('title', 'order-initial')->first();
        $oldOrder = Order::where('user_id', $order->user_id)->where('status', 'complete')->first();

        if($request->status == 'complete' && $order->status !== 'complete'){
            $amount = $oldOrder ? ($order->total / (100 / $settings_order->amount)) : ($order->total / (100 / $settings_order_initial->amount));
            $updateEwallet = Ewallet::where('user_id', $order->user_id)->first();
            $updateEwallet->total_deposit = $updateEwallet->total_deposit + $amount;
            $updateEwallet->save();

            $referral_members = ReferralMember::where('user_id', $order->user_id)->get();

            if(count($referral_members) > 0){
                foreach ($referral_members as $member) {
                    $settings = Setting::where('title', "referral-order-level-$member->order")->first();
                    $amount = $order->total / (100 / $settings->amount);

                    $referral = Referral::find($member->referral_id);
                    $ewallet = Ewallet::where('user_id', $referral->user_id)->first();

                    $updateEwallet = Ewallet::find($ewallet->id);
                    $updateEwallet->total_deposit = $updateEwallet->total_deposit + $amount;
                    $updateEwallet->save();

                    $allOrders = Order::where('user_id', $order->user_id)->get();
                    $ewallet_transaction = EwalletTransaction::where('user_id', $order->user_id)->where('ewallet_id', $ewallet->id)->where('ewallet_type', 'referral')->first();
                    if(count($allOrders) == 1 && $ewallet_transaction){
                        $updateEwalletReferral = Ewallet::find($ewallet->id);
                        $updateEwalletReferral->total_deposit = $updateEwalletReferral->total_deposit + $ewallet_transaction->amount;
                        $updateEwalletReferral->save();
                    }

                }
            }
        }
        
        $order->status = $request->status;
        $order->save();


        $order->product_order = OrderProduct::where('order_id', $order->id)->with(['product'])->first();
        
        $user = User::find($order->user_id);

        $user->notify(new CustomerOrderStatus($order, $request->note));

        return response()->json($order, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}
