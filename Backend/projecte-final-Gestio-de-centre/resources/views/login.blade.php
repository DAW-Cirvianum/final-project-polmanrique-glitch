<div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form method="POST" action="{{ route('login.web') }}" 
          class="bg-white p-8 rounded shadow-md w-96">
        @csrf

        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

        @if(session('error'))
            <div class="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {{ session('error') }}
            </div>
        @endif

        <input type="email" name="email" placeholder="Email"
               class="w-full border p-2 mb-4 rounded" required>

    
        <input type="password" name="password" placeholder="Contraseña"
               class="w-full border p-2 mb-4 rounded" required>

     
        <button class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Iniciar sesión
        </button>
    </form>
</div>

<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>