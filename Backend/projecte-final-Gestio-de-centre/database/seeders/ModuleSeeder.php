<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Module;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $modules = [
            [
                'name' => 'Mòdul 1',
                'code' => 'MOD001',
                'hours' => 20,
                'teacher_id' => 1,
                'scope_id' => 1,
                'course_id' => 1,
            ],
            [
                'name' => 'Mòdul 2',
                'code' => 'MOD002',
                'hours' => 25,
                'teacher_id' => 1,
                'scope_id' => 1,
                'course_id' => 1,
            ],
            [
                'name' => 'Mòdul 3',
                'code' => 'MOD003',
                'hours' => 15,
                'teacher_id' => 2,
                'scope_id' => 1,
                'course_id' => 1,
            ],
        ];

        foreach ($modules as $module) {
            Module::create($module);
        }
    }
}
