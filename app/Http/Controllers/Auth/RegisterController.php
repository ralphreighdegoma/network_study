<?php

namespace App\Http\Controllers\Auth;

use App\Ewallet;
use App\EwalletTransaction;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Referral;
use App\ReferralMember;
use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'phone' => ['required'],
            'address' => ['required'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        $referral = Referral::where('code', $data['referral_code'])->first();
        
        $user =  User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'address' => $data['address'],
            'password' => Hash::make($data['password']),
        ]);
        // create an ewallet account
        $ewallet = new Ewallet();
        $ewallet->createEwallet($user->id);

        if($referral){
            for ($i=1; $i <= 5; $i++) { 
                $referral_id = $referral->id;
                $user_id = $referral->user_id;
                $order = ReferralMember::where('referral_id', $referral_id)->orderBy('order', 'DESC')->first();
                
                if($order == null || $order->order <= 5){
                    ReferralMember::create([
                        'referral_id' =>  $referral_id,
                        'user_id' => $user->id,
                        'order' => $i
                    ]);
                    // if user register with a referral it will automatically
                    //  deposit an amount depending on the level of the user
                    // add an ewallet transaction 
                    $ewallet = Ewallet::where('user_id', $user_id)->first();
                    if($ewallet){
                        $amount = 0;
                        if($i == 1){
                            $amount = 100;
                        }else if ($i == 2){
                            $amount = 50;
                        }else if ($i == 3){
                            $amount = 25;
                        }else if ($i == 4){
                            $amount = 15;
                        }else if ($i == 5){
                            $amount = 10;
                        }

                        $data = [
                            'ewallet_id' => $ewallet->id,
                            'order_id' => null,
                            'referral_member_id' => $referral_id,
                            'user_id' => $user->id,
                            'title' => 'Cash Back',
                            'description' => "Registered Customer Referral level $i",
                            'amount' => $amount,
                            'ewallet_type' => 'referral',
                            'transaction_type' => 'deposit'
                        ];

                        // $updateEwallet = Ewallet::find($ewallet->id);
                        // $updateEwallet->total_deposit = $updateEwallet->total_deposit + $amount;
                        // $updateEwallet->save();
        
                        $ewallet_transaction = new EwalletTransaction();
                        $add_ewallet_transaction = $ewallet_transaction->ewalletTransactionCreate($data);
                    }

                    
                    $referralMember = ReferralMember::where('user_id', $user_id)->first();

                    if($referralMember){
                        $referral = Referral::find($referralMember->referral_id);
                        $referral_id = $referral->id;
                        $user_id = $referral->user_id;
                        $order = ReferralMember::where('referral_id', $referral_id)->orderBy('order', 'DESC')->first();
                    }else {
                        break;
                    }

                }else {
                    break;
                }
                
               
            }
        }

        return $user;
    }
}
