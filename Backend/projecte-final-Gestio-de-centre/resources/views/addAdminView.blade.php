<div class="max-w-6xl mx-auto p-4">

    <h1 class="text-3xl font-bold text-gray-800 mb-6">Asignar Rol de Administrador</h1>

    @if(session('success'))
        <div class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {{ session('success') }}
        </div>
    @endif

    @if(session('error'))
        <div class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {{ session('error') }}
        </div>
    @endif

    <form method="POST" action="{{ route('assign.admin') }}" class="mb-8 p-6 bg-white rounded-lg shadow">
        @csrf

        <label for="user_id" class="block text-gray-700 font-medium mb-2">Seleccionar Usuario:</label>
        <select name="user_id" id="user_id" required class="w-full p-2 border border-gray-300 rounded mb-4">
            <option value="">-- Seleccione un usuario --</option>
            @foreach($users as $user)
                @if($user->rol !== 'admin')
                    <option value="{{ $user->id }}">
                        {{ $user->name }} ({{ $user->email }})
                    </option>
                @endif
            @endforeach
        </select>

        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Hacer Administrador
        </button>
    </form>

    <hr class="my-8">

    <h2 class="text-2xl font-bold text-gray-800 mb-4">Lista de Usuarios</h2>

    <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300">
            <thead class="bg-gray-100">
                <tr>
                    <th class="py-3 px-4 border-b text-left">Nombre</th>
                    <th class="py-3 px-4 border-b text-left">Email</th>
                    <th class="py-3 px-4 border-b text-left">Rol</th>
                </tr>
            </thead>
            <tbody>
                @foreach($users as $user)
                    <tr class="hover:bg-gray-50">
                        <td class="py-3 px-4 border-b">{{ $user->name }}</td>
                        <td class="py-3 px-4 border-b">{{ $user->email }}</td>
                        <td class="py-3 px-4 border-b">
                            @if($user->rol === 'admin')
                                <span class="px-2 py-1 bg-red-100 text-red-800 text-sm font-medium rounded">
                                    ADMIN
                                </span>
                            @else
                                <span class="px-2 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded">
                                    Usuario
                                </span>
                            @endif
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>