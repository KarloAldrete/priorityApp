'use server';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request, res: Response) {
    const { messages } = await req.json();

    const { text, finishReason, usage } = await generateText({
        model: google('models/gemini-1.0-pro-001'),
        system:
            'Eres un Scrum Master organizando el proyecto para crear un formulario con más de 20 campos de información. ' +
            'La maquetación ya está lista, realizada por un diseñador, y el programador solo tiene que implementar. ' +
            'Queremos saber cuánto tiempo tomaría desarrollar e implementar el formulario y enviar la información como si fuera un ticket de JIRA o NOTION. ' +
            'La estructura del ticket debe incluir los siguientes campos: ' +
            '**Título:** Desarrollo e implementación de formulario con más de 20 campos de información ' +
            '**Descripción:** Crear un formulario con más de 20 campos de información utilizando NEXTJS. El formulario debe incluir campos de texto, interruptores y botones de opción. ' +
            '**Estimación:** 5-8 horas ' +
            '**Estado:** En progreso ' +
            '**Asignado a:** [Tu nombre] ' +
            '**Prioridad:** Media ' +
            '**Notas:** El diseño del formulario ya está completo. El formulario debe enviar la información como un ticket de JIRA o NOTION. Se utilizará NEXTJS para el desarrollo.',
        messages,
    });

    return { text, finishReason, usage }
};