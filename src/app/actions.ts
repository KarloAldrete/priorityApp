'use server';
import { google } from '@ai-sdk/google';
import { generateObject, generateText } from 'ai';
import { z } from 'zod';

export async function getAnswer(description: string, user: string) {
    console.log(description);

    let response;
    let cotizacion;

    const projectData = JSON.parse(description);

    try {
        response = await generateObject({
            model: google('models/gemini-1.5-flash-latest'),
            mode: 'json',
            schema: z.object({
                tareas: z.array(z.object({
                    nombre: z.string(),
                    descripcion: z.string(),
                    // tecnologias: z.string(),
                    subtareas: z.array(z.object({
                        descripcion: z.string(),
                    })),
                    'Tiempo de desarrollo': z.string(),
                }))
            }),
            prompt: `${description}, el tiempo estimado debe ser tomado en base al seniority del programador, el cual es promedio o semi-senior, con una jornada laboral de ${projectData.workingPeriod} horas, en cada una de las fases, divídelas en pasos más pequeños y específicos. Las subtareas deben ser especificas a cada tarea en esa misma tarea.`,
        });
    } catch (error) {
        console.error('Error al generar el objeto:', error);
        throw new Error('Error al generar el objeto');
    }

    console.log(response.object);

    // try {
    //     cotizacion = await generateText({
    //         model: google('models/gemini-1.5-pro-latest'),
    //         system: `En base a la informacion recabada debes comportarte como Product Designer para cotizar proyectos de desarrollo de software, ten en cuenta que el programador cobra por ${projectData.payRoll} la cantidad de ${projectData.moneyAmount}. Cuando menciones los pasos de desarrollo no digas cuanto cuesta esa fase, mejor al final da un costo total estimado`,
    //         prompt: JSON.stringify(response.object)
    //     });
    // } catch (error) {
    //     console.error('Error al generar la cotización:', error);
    //     throw new Error('Error al generar la cotización');
    // }

    // console.log(cotizacion.text);

    await fetch('http://localhost:3000/api/creation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: projectData.projectName, data: response.object, user: user })
    });

    const { object } = response;
    return object;
};