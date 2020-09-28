<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;
use App\OrderProduct;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function fetchAllSales(Request $request)
    {

        $total_sale_list = [];
        for ($i=1; $i <= 12; $i++) {
            $orders = Order::where('status', 'complete')->whereMonth('created_at', $i)->whereYear('created_at', $request->year ? $request->year : date("Y"))->get();
            $total_sale = 0;
            foreach ($orders as $order) {
                $total_sale += $order->total;
            }

            array_push($total_sale_list, $total_sale);
        }

        $group_year = Order::orderBy('created_at')->get()->groupBy(function($data) {
            return $data->created_at->format('Y');
        });

        return response()->json(['total_sales' => $total_sale_list, 'years' => $group_year], 200);

    }   

    public function fetchAllOrders(Request $request)
    {
        $total_order_list = [];

        for ($i=1; $i <= 12; $i++) {
            $orders = Order::where('status', 'complete')->whereMonth('created_at', $i)->whereYear('created_at', $request->year ? $request->year : date("Y"))->get();
        
            array_push($total_order_list, count($orders));
        }

        return response()->json($total_order_list, 200);
    }
}
