<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Population;
use App\Models\Course;
use App\Models\Module;
use App\Models\Scope;
use App\Models\Tutor;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Population::factory()->count(5)->create();

        Course::factory()->count(3)->create();

        Scope::factory()->count(5)->create();

        Tutor::factory()->count(5)->create();

        User::factory()->count(20)->create();

        Module::factory()->count(10)->create();
    }
}