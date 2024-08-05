import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SERVICE_ROLE_KEY;

export async function POST(request: NextRequest) {
    const body = await request.json();

    if (!supabaseUrl || !serviceRoleKey) {
        return NextResponse.json({ status: 500, error: 'Falta la configuración de Supabase' });
    };

    const supabase = await createClient(supabaseUrl, serviceRoleKey);

    const { data: receivedData, error: receiveError } = await supabase
        .from('projects')
        .select('title, icon')
        .eq('owner', body.userId);

    if (receiveError) {
        console.error(receiveError);
        return NextResponse.json({ status: 500, error: receiveError });
    };

    // Enviar datos
    const { data: sentData, error: sendError } = await supabase
        .from('projects')
        .insert([{ owner: body.userId, title: body.pathname, ...body.additionalData }]);

    if (sendError) {
        console.error(sendError);
        return NextResponse.json({ status: 500, error: sendError });
    };

    return NextResponse.json({ status: 200, receivedData, sentData });
};