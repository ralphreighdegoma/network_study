<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class Order extends Model
{
    protected $fillable = [
        'email',
        'user_id',
        'fname',
        'lname',
        'address',
        'country',
        'region',
        'city',
        'postcode',
        'phone',
        'subtotal',
        'discount',
        'total',
        'file',
        'payment_method',
        'payment_type',
        'reference_no',
        'status',
        'note',
        'quantity'
    ];

    public function ewallet()
    {
        return $this->hasOne('App\Ewallet');
    }

    public function orderProduct()
    {
        return $this->belongsToMany('App\OrderProduct');
    }

    public function createOrder($request)
    {
        $file = '';

        if($request->hasfile('file'))
        {
            $file = Storage::disk('uploads')->put('referenceno', $request->file);
        }
       
        $product = Product::find($request->product_id);
        
        $total = 0;
        if ($product->saleprice !== 'null') {
            if($request->discount){
                $discount1 = ($product->saleprice * $request->discount) / 100;
                $subtotal1 = $product->saleprice - $discount1;
                $total = $subtotal1 * $request->quantity; 
            }else {
                $total = $product->saleprice * $request->quantity; 
            }
        } else {
            if($request->discount){
                $discount2 = ($product->price * $request->discount) / 100;
                $subtotal2 = $product->price - $discount2;
                $total = $subtotal2 * $request->quantity; 
            }else {
                $total = $product->price * $request->quantity; 
            }
        }
        
        if($product){
            $order = Order::create([
                'user_id' => Auth::id(),
                'email' => $request->email,
                'fname' => $request->fname,
                'lname' => $request->lname,
                'address' => $request->address,
                'region' => $request->province,
                'city' => $request->city,
                'country' => $request->country,
                'phone' => $request->phoneNumber,
                'postcode' => $request->zipcode,
                'note' => $request->note,
                'payment_method' => $request->payment_method, 
                'payment_type' => $request->payment_type,
                'file' => url('/').'/uploads/'.$file,
                'reference_no' => $request->reference_no,
                'note' => $request->note,
                'discount' => $request->discount,
                'subtotal' => $product->saleprice !== 'null' ? ($product->saleprice * $request->quantity) : ($product->price * $request->quantity),
                'total' => $total,
                'quantity' => $request->quantity,
                'status' => 'pending'
            ]);
                
            OrderProduct::create([
                'product_id' => $product->id,
                'order_id' => $order->id,
            ]);
    
            return $order;
        }

        
    }
}
