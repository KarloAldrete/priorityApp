'use server';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

async function generateProjectTasks(description: string, projectData: any) {
    const prompt = `
        Descripción: ${description}
        Necesitamos una lista de tareas con nombres específicos y creativos que no simplemente repitan el nombre de la etapa.
        Por ejemplo, no queremos "Planificación - Planificación".
        El tiempo de desarrollo debe basarse en el período de trabajo diario (${projectData.workingPeriod} horas), y la información de pago (${projectData.payRoll}) determinará si se expresa en horas o días.
        Si es en horas, el tiempo de desarrollo debe ser en horas de trabajo; si es en días, debe ser en días.
        Desglosa cada fase en pasos más pequeños y detallados, asegurando que las subtareas sean específicas para cada tarea dentro de esa tarea.
        Las etapas deben ser específicas para cada área de desarrollo, como: Planificación, Diseño, Desarrollo, Pruebas, Despliegue.
        Crea tantas tareas como sea posible, específicamente y en orden cronológico, basándote en la experiencia de programadores senior en internet para determinar la organización adecuada del proyecto.
        Usa un lenguaje claro y preciso para describir cada tarea y subtarea.
        Todas las tareas deben comenzar con el estado "Pendiente".
        Además, considera las tecnologías especificadas en projectData.tags para influir en las tareas y crear subtareas más específicas.
        Responde en español.

        Ejemplo de tareas específicas para un e-commerce de leggings:

        Planificación:
        - Investigación de mercado para e-commerce de leggings.
        - Definición de requisitos y funcionalidades del sitio.
        - Creación de un plan de proyecto detallado.

        Diseño:
        - Diseño de wireframes para la página de inicio en Figma.
        - Diseño de wireframes para la página de productos en Figma.
        - Diseño de wireframes para el carrito de compras en Figma.
        - Diseño de wireframes para la página de pago en Figma.
        - Creación de prototipos interactivos en Figma.

        Desarrollo:
        - Configuración del entorno de desarrollo con NextJS y Vercel.
        - Implementación de la página de inicio con NextJS y TailwindCSS.
        - Implementación de la página de productos con NextJS y TailwindCSS.
        - Integración de la base de datos de productos con Supabase.
        - Implementación del carrito de compras con NextJS y TailwindCSS.
        - Integración de la pasarela de pagos con Stripe.
        - Implementación de la página de pago con NextJS y TailwindCSS.
        - Configuración de autenticación de usuarios con Clerk.

        Pruebas:
        - Pruebas unitarias de componentes con Jest.
        - Pruebas de integración de la pasarela de pagos con Stripe.
        - Pruebas de usabilidad del sitio con usuarios reales.

        Despliegue:
        - Configuración de despliegue continuo con Vercel.
        - Despliegue de la aplicación en Vercel.
        - Monitoreo y mantenimiento post-despliegue.

        Asegúrate de que cada tarea sea lo más específica posible y que se adapte a las tecnologías y requisitos del proyecto.
    `;

    try {
        const response = await generateObject({
            model: google('models/gemini-1.5-flash-latest'),
            mode: 'json',
            schema: z.object({
                fases: z.array(z.object({
                    nombre: z.string(),
                    descripcion: z.string(),
                    tareas: z.array(z.object({
                        nombre: z.string(),
                        descripcion: z.string(),
                        estado: z.string(),
                    })),
                    etapa: z.string(),
                    'Tiempo de desarrollo': z.string(),
                }))
            }),
            prompt: prompt.trim(),
        });

        return response.object;
    } catch (error) {
        console.error('Error al generar el objeto:', error);
        throw new Error('Error al generar el objeto');
    }
}

export async function getAnswer(description: string, user: string, emoji: string) {
    console.log(description);

    const projectData = JSON.parse(description);
    let responseObject;

    try {
        responseObject = await generateProjectTasks(description, projectData);
    } catch (error) {
        console.error('Error al generar las tareas del proyecto:', error);
        throw new Error('Error al generar las tareas del proyecto');
    }

    console.log(responseObject);

    try {
        await fetch('http://localhost:3000/api/creation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: projectData.projectName, data: responseObject, user: user, emoji: emoji })
        });
    } catch (error) {
        console.error('Error al enviar los datos a la API:', error);
        throw new Error('Error al enviar los datos a la API');
    }

    return responseObject;
}