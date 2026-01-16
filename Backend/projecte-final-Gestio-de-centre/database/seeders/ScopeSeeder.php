<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Scope;

class ScopeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Scope::create([
            'name' => 'Àmbit 1',
            'description' => 'Descripció de l\'àmbit 1',
            'module_id' => 1,
        ]);

        Scope::create([
            'name' => 'Àmbit 2',
            'description' => 'Descripció de l\'àmbit 2',
            'module_id' => 1,
        ]);

        Scope::create([
            'name' => 'Àmbit 3',
            'description' => 'Descripció de l\'àmbit 3',
            'module_id' => 1,
        ]);
    }
}
