<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = [
            [
                'name' => 'Informática Básica',
                'year' => 2026,
            ],
            [
                'name' => 'Matemáticas Avanzadas',
                'year' => 2026,
            ],
            [
                'name' => 'Física Aplicada',
                'year' => 2026,
            ],
        ];

        foreach ($courses as $course) {
            Course::create($course);
        }
    }
}
