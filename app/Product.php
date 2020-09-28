<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Product extends Model
{
    protected $fillable = [
        'title',
        'description',
        'featureImage',
        'images',
        'status',
        'price',
        'saleprice',
        'quantity',
        'slug'
    ];

    public function orderProduct()
    {
        return $this->belongsToMany('App\OrderProduct');
    }

    // creating product
    public function createProduct($data)
    {
        $images = [];
        $featureImagePath  = '';

        if($data->hasfile('images'))
         {
            foreach($data->file('images') as $file)
            {
                $imagePath = Storage::disk('uploads')->put('product', $file);
                array_push($images, url('/').'/uploads/'.$imagePath);  
            }
         }

        if($data->hasfile('featureImage'))
        {
            $featureImagePath = Storage::disk('uploads')->put('product', $data->featureImage);
        }

        return Product::create([
            'title' => $data->title,
            'description' => $data->description,
            'featureImage' => url('/').'/uploads/'.$featureImagePath,
            'images' => json_encode($images),
            'price' => $data->price,
            'slug' => Str::slug($data->title, '-'),
            'saleprice' => $data->saleprice,
            'quantity' => $data->quantity,
            'status' => $data->status,
        ]);
        
    }


    // creating product
    public function editProduct($product, $data)
    {
        $featureImagePath  = $product->featureImage ? $product->featureImage :'';
        
        $images = [];
        $arr_img = [];
        
        foreach ($data->images as $image) {
            if (!is_string($image)) {
                $imagePath = Storage::disk('uploads')->put('product', $image);
                array_push($images, url('/')."/uploads/".$imagePath);
            }else {
                array_push($arr_img, $image);
                array_push($images, $image);
            }  
        }
         
        if($data->hasfile('featureImage'))
        {
            $featureImgPath = Storage::disk('uploads')->put('product', $data->featureImage);
            $featureImagePath = url('/').'/uploads/'.$featureImgPath;
        }

        $product->title = $data->title;
        $product->description = $data->description;
        $product->featureImage = $featureImagePath;
        $product->images = json_encode($images);
        $product->price = $data->price;
        $product->slug = Str::slug($data->title, '-');
        $product->saleprice = $data->saleprice;
        $product->quantity = $data->quantity;
        $product->status = $data->status;
        $product->save();

        return $product;
    }
}
