// supabaseClient.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // Asegúrate de requerir dotenv para usar las variables de entorno

// Aquí estamos usando las variables de entorno
const SUPABASE_URL = process.env.SUPABASE_URL; // SUPABASE_URL es obtenido del archivo .env
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY; // SUPABASE_ANON_KEY es obtenido del archivo .env

// Comprobamos que las variables de entorno estén correctamente establecidas
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Supabase environment variables are not set.");
  process.exit(1); // Si no están definidas, terminamos la ejecución con un error
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY); // Inicializamos el cliente de Supabase con las variables de entorno

console.log("Supabase client has been initialized."); // Mensaje de confirmación

module.exports = supabase; // Exportamos el cliente para usarlo en otras partes de la aplicación
