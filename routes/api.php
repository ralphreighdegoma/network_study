<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::middleware('auth:sanctum')->group(function () {
    // fetch authenticated user
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('analytics-count', 'AccountController@analyticsCount');
    
    // user account
    Route::post('edit-account', 'AccountController@editAccount');
    Route::post('change-password', 'AccountController@changePassword');

    // admin
    Route::group(['prefix'=>'admin'], function(){
        Route::resource('products','ProductController', ['except' => [
            'show', 'cutomerProducts'
        ]]);

        Route::resource('orders','OrderController', ['except' => [
            'cutomerOrders', 'createCustomerOrder', 'customerOrderDetail'
        ]]);
    });

    Route::post('request-withdraw', 'WithdrawController@createWithdraw');
    Route::get('customer/fetch-withdraws', 'WithdrawController@fetchCustomerWithdraws');
    Route::get('customer/fetch-all-withdraw', 'WithdrawController@fetchAllRequestWithdraw');
    Route::get('customer/fetch-withdraw-detail/{id}', 'WithdrawController@fetchWithDrawDetail');
    Route::post('customer/update-withdraw/{id}', 'WithdrawController@updateWithdraw');
  
    Route::get('/product/{id}', 'ProductController@show');
    Route::get('customer/products', 'ProductController@customerProducts');
    // order
    Route::get('customer/orders', 'OrderController@customerOrders');
    Route::get('customer/order/{id}', 'OrderController@customerOrderDetail');
    Route::post('customer/create-order', 'OrderController@createCustomerOrder');
    // referral 
    Route::post('generate-code', 'AccountController@generateReferalCode');
    Route::get('get-generated-referral-code', 'AccountController@getGeneratedReferralCode');
    // network
    Route::get('customer/network', 'AccountController@network');
    //  ewallet
    Route::get('customer/ewallet', 'EwalletController@ewalletTransactionList');

    Route::get('fetch-all-sales-analytics', 'HomeController@fetchAllSales');
    Route::get('fetch-all-orders-analytics', 'HomeController@fetchAllOrders');
    
});






