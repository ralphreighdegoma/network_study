<?php

use App\Setting;
use Illuminate\Database\Seeder;

class SettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $settings = [
            "order-initial" => [
                "amount" => 3, 
                "type" => "order",
                "amount_type" => 'percent',
            ],
            "order" => [
                "amount" => 5, 
                "type" => "order",
                "amount_type" => 'percent',
            ],
            "order-discount" => [
                "amount" => 20, 
                "type" => "order",
                "amount_type" => 'percent',
            ],
            "referral-level-1" => [
                "amount" => 100, 
                "type" => "referral",
                "amount_type" => 'fixed',
            ],
            "referral-level-2" => [
                "amount" => 50, 
                "type" => "referral",
                "amount_type" => 'fixed',
            ],
            "referral-level-3" => [
                "amount" => 25, 
                "type" => "referral",
                "amount_type" => 'fixed',
            ],
            "referral-level-4" => [
                "amount" => 15, 
                "type" => "referral",
                "amount_type" => 'fixed',
            ],
            "referral-level-5" => [
                "amount" => 10, 
                "type" => "referral",
                "amount_type" => 'fixed',
            ],
            "referral-order-level-1" => [
                "amount" => 2.5, 
                "type" => "referral-order",
                "amount_type" => 'percent',
            ],
            "referral-order-level-2" => [
                "amount" => 1.3, 
                "type" => "referral-order",
                "amount_type" => 'percent',
            ],
            "referral-order-level-3" => [
                "amount" => 0.8, 
                "type" => "referral-order",
                "amount_type" => 'percent',
            ],
            "referral-order-level-4" => [
                "amount" => 0.4, 
                "type" => "referral-order",
                "amount_type" => 'percent',
            ],
            "referral-order-level-5" => [
                "amount" => 0.2, 
                "type" => "referral-order",
                "amount_type" => 'percent',
            ],

        ];
        // 1000 / (100 / 3)
        foreach ($settings as $key => $value) {
            Setting::create([
                "title" => $key,
                "amount" => $value['amount'],
                "amount_type" => $value['amount_type'],
                "type" => $value['type'],
            ]);
        }
    }
}
