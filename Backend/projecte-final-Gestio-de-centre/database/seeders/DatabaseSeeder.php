<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            PopulationSeeder::class,
            ScopeSeeder::class,
            CourseSeeder::class,
            TutorSeeder::class,
            UserSeeder::class,      
            ModuleSeeder::class,    
            RegistrationSeeder::class,
            MarkSeeder::class,
            IncidenceSeeder::class,
        ]);
    }
}