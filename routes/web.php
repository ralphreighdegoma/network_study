<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function (Request $request) {
    return view('app');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

// Route::get('mail', function () {
//     $order = App\Order::find(2);


//     $order->product_order = App\OrderProduct::where('order_id', $order->id)->with(['product'])->first();
//     $order->user = App\User::find($order->user_id);
    

//     return ( new App\Notifications\CustomerOrderStatus($order, 'hello'))->toMail($order);
// });

// Route::get('customer/network', 'AccountController@network');
