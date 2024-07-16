<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Nguyễn Khả Qúy',
            'email' => 'khaquy1611@gmail.com',
            'password' => Hash::make('123456789'),
            'address' => 'Cầu Giấy, Mai Dịch , Hà Nội',
            'phone' => '0969608090'
        ]);
    }
}
