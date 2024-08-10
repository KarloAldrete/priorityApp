export interface Actividad {
    tipo: 'subtarea-completada' | 'comentario';
    descripcion: string;
    fecha: Date;
}

export interface Comentario {
    usuario: string;
    mensaje: string;
    fecha: Date;
}

export interface Subtarea {
    id: string; // Añadir esta línea
    nombre: string;
    descripcion: string;
    completed: boolean;
    estado: string;
    'Tiempo de desarrollo': string;
    actividades: Actividad[];
    comentarios: Comentario[];
    tareas: Subtarea[];
}

export interface Tarea {
    id: string; // Añadir esta línea si también falta en Tarea
    nombre: string;
    descripcion: string;
    'Tiempo de desarrollo': string;
    estado: string;
    tareas: Subtarea[];
    etapa: string;
    actividades: Actividad[];
    comentarios: Comentario[];
}

export interface ProjectData {
    id: number;
    owner: string;
    title: string;
    icon?: string;
    data: {
        fases: Tarea[];
    };
}