<?php

namespace App\Http\Controllers;

use App\Order;
use App\Product;
use App\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
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

        $products = Product::orderBy('created_at', 'DESC')->paginate(10);
        $products->discount = $oldOrder ? $settings->amount : 0;

        return response()->json($products, 200);
    }

    public function customerProducts()
    {
        $oldOrder = Order::where('user_id', Auth::id())->first();
        $settings = Setting::where('title', 'order-discount')->first();

        $products = Product::where('status', 'publish')->orderBy('created_at', 'DESC')->paginate(10);
        foreach ($products as $product) {
            $product->discount = $oldOrder ? $settings->amount : 0;
        }

        return response()->json($products, 200);
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
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required'],
            'featureImage' => ['required'],
            'price' => ['required'],
            'quantity' => ['required'],
            'status' => ['required'],
        ]);

        if ($validator->fails()){
            return response()->json(['status' => 'error', 'errors' => $validator->errors()->all()], 422);
        }
        
        $product = new Product();
        $newProduct = $product->createProduct($request);

        return response()->json($newProduct, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $oldOrder = Order::where('user_id', Auth::id())->first();
        $settings = Setting::where('title', 'order-discount')->first();
        
        $product = Product::find($id);
        $product->discount = $oldOrder ? $settings->amount : 0;

        if($product){
            return response()->json($product, 200);
        }else {
            return response()->json(['error' => 'not found'], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {  
        if($product){
            return response()->json($product, 200);
        }else {
            return response()->json(['error' => 'not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required'],
            'featureImage' => ['required'],
            'price' => ['required'],
            'quantity' => ['required'],
            'status' => ['required'],
        ]);

        if ($validator->fails()){
            return response()->json(['status' => 'error', 'errors' => $validator->errors()->all()], 422);
        }
        
        $updateProduct = new Product();
        $updated_product = $updateProduct->editProduct($product, $request);

        return response()->json($updated_product, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json($product, 200);
    }
}
