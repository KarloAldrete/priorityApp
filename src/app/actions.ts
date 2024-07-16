'use server';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function getAnswer(question: string) {

    const { text, finishReason, usage } = await generateText({
        model: google('models/gemini-1.0-pro-001'),
        system:
            'Estoy desarrollando un proyecto de desarrollo de software/IT y necesito tu ayuda para generar una lista detallada de tareas necesarias para completarlo con éxito, así como un diagrama de flujo que represente el proceso. ' +
            'Aquí están los detalles del proyecto: ' +
            'Descripción del Proyecto: ' +
            'Pagina web donde los clientes puedan encargar pedidos de comida de un local de comida con un alcance municipal para pedir comida para llevar o a domicilio. Pagando con tarjeta de crédito o debito,  o en efectivo en el mismo local. ' +
            'Tecnologías a Utilizar: ' +
            'NextJs ' +
            'Tailwind ' +
            'Supabase ' +
            'Plazos: ' +
            'Fecha de inicio del proyecto: 19/07/2024 ' +
            'Fecha de entrega del proyecto: 19/09/2024 ' +
            'Recursos Disponibles: ' +
            'Equipo de personas:  1 programador jr con 3 meses experiencia. ' +
            'Restricciones: ' +
            'No se debe exceder la fecha de entrega. ' +
            'Con esta información, por favor, genera una lista detallada de tareas necesarias para completar el proyecto y un diagrama de flujo que represente el proceso. ' +
            'La estructura de la respuesta debe incluir los siguientes campos: ' +
            '**Título:** [título del proyecto] ' +
            '**Descripción:** [descripción general] ' +
            '**Estimación:** [horas] ' +
            '**Tareas:** las tareas en orden de lista ' +
            '**Diagrama de Flujo:** [diagrama de flujo] ',
        prompt: question,
    });

    console.log(text);

    return { text, finishReason, usage }
};