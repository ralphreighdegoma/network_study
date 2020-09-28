@component('mail::message')
<h1 style="font-size: 30px; text-align: center;">Thank you for your purchase!</h1>
<h2 style="font-size: 15px; text-align: center;">Order# {{ $order->id }}</h2>

@component('mail::panel')
    <strong>Order Status</strong>: <span style="text-transform: capitalize">{{ $order->status }}</span>
@endcomponent

@if ($note)
<p>{{ $note }}</p>
@else
<p>Hello {{ $order->fname }}, thank you for ordering our product at Kaoban we will process your order as soon as possible.</p>
@endif

@component('mail::table')
| Product         | Quantity  | Price  | Total |
|---------------| ---------|-------|------|
| {{ $order->product_order->product->title }}| {{ $order->quantity }}| ₱ {{ $order->product_order->product->saleprice !== 'null' ? $order->product_order->product->saleprice : $order->product_order->product->price   }}   |   ₱ {{ $order->total }}    |

@endcomponent

@component('mail::button', ['url' => url('/')."/order/".$order->id, 'color' => 'red'])
See more details
@endcomponent


@endcomponent


