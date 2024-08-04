'use server';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
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
                    subtareas: z.array(z.object({
                        descripcion: z.string(),
                    })),
                    etapa: z.string(),
                    estado: z.string(),
                    'Tiempo de desarrollo': z.string(),
                }))
            }),
            prompt:
                `Description: ${description}\n` +
                `We need a list of tasks with specific and creative names that do not simply repeat the stage name. ` +
                `For example, we do not want "Planning - Planning". ` +
                `The development time should be based on the daily working period (${projectData.workingPeriod} hours), and the payment information (${projectData.payRoll}) will determine if it is expressed in hours or days. ` +
                `If in hours, the development time should be in working hours; if in days, it should be in days. ` +
                `Divide each phase into smaller, detailed steps, ensuring that subtasks are specific to each task within that task. ` +
                `The stages should be specific to each development area, such as: Planning, Design, Development, Testing, Deployment. ` +
                `Create as many tasks as possible, specifically and in chronological order, based on the experience of senior programmers on the internet to determine the appropriate organization for the project. ` +
                `Use clear and precise language to describe each task and subtask. ` +
                `All tasks should start with the status "Pending". ` +
                `Additionally, consider the technologies specified in projectData.tags to influence the tasks and create more specific subtasks.\n` +
                `Respond in Spanish.`,
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