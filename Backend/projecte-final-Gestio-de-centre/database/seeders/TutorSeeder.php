<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tutor;

class TutorSeeder extends Seeder
{
    public function run(): void
    {
        Tutor::factory()->count(3)->create();
    }
}
