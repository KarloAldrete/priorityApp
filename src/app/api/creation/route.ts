import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SERVICE_ROLE_KEY;

export async function POST(request: NextRequest) {
    console.log('🚀 - Iniciando POST request');
    const body = await request.json();
    console.log('📦 - Body recibido:', body);

    if (!supabaseUrl || !serviceRoleKey) {
        console.error('❌ - Supabase configuration is missing');
        return NextResponse.json({ status: 500, error: 'Supabase configuration is missing' });
    };

    if (!body.title) {
        console.error('❌ - Falta el campo requerido: title');
        return NextResponse.json({ status: 400, error: 'Falta el campo requerido: title' });
    }
    if (!body.data) {
        console.error('❌ - Falta el campo requerido: data');
        return NextResponse.json({ status: 400, error: 'Falta el campo requerido: data' });
    }
    if (!body.user) {
        console.error('❌ - Falta el campo requerido: user');
        return NextResponse.json({ status: 400, error: 'Falta el campo requerido: user' });
    }

    console.log('🔑 - Creando cliente de Supabase');
    const supabase = await createClient(supabaseUrl, serviceRoleKey);

    console.log('📝 - Insertando datos en la tabla projects');
    const { data, error } = await supabase
        .from('projects')
        .insert({ owner: body.user, title: body.title, data: body.data, icon: body.emoji })
        .maybeSingle();

    console.log('📊 - Datos insertados:', data);

    if (error) {
        console.error('❌ - Error al insertar datos:', error);
        return NextResponse.json({ status: 500, error: error });
    };

    console.log('✅ - Operación exitosa');
    return NextResponse.json({ status: 200 });
};