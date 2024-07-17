import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SERVICE_ROLE_KEY;

export async function POST(request: NextRequest) {
    const body = await request.json();

    if (!supabaseUrl || !serviceRoleKey) {
        return NextResponse.json({ status: 500, error: 'Supabase configuration is missing' });
    };

    const supabase = await createClient(supabaseUrl, serviceRoleKey);

    const { data, error } = await supabase
        .from('projects')
        .insert({ owner: body.user, title: body.title, data: body.data })
        .maybeSingle();

    console.log(data);

    if (error) {
        console.error(error);
        return NextResponse.json({ status: 500, error: error });
    };

    return NextResponse.json({ status: 200 });
};