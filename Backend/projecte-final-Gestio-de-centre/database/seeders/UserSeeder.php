<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Alice',
                'surname' => 'Smith',
                'email' => 'alice@example.com',
                'password' => 'password123', 
                'rol' => 'admin',
                'population_id' => 1,
            ],
            [
                'name' => 'Bob',
                'surname' => 'Johnson',
                'email' => 'bob@example.com',
                'password' => 'password123',
                'rol' => 'teacher',
                'population_id' => 1,
            ],
            [
                'name' => 'Charlie',
                'surname' => 'Brown',
                'email' => 'charlie@example.com',
                'password' => 'password123',
                'rol' => 'student',
                'population_id' => 1,
            ],
            [
                'name' => 'Diana',
                'surname' => 'Evans',
                'email' => 'diana@example.com',
                'password' => 'password123',
                'rol' => 'student',
                'population_id' => 2,
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
