'use client';
import { create } from 'zustand';
import { Actividad, ProjectData, Subtarea, Tarea } from '@/interfaces/task.interface';

interface FakeStore {
    isCollapsed: boolean;
    projects: ProjectData[];
    selectedProject: ProjectData | null;
    setIsCollapsed: (isCollapsed: boolean) => void;
    setProjects: (projects: ProjectData[]) => void;
    setSelectedProject: (project: ProjectData | null) => void;
    handleProjectClick: (projectTitle: string) => void;
    handleCollapse: () => void;
    activeMenuTab: string;
    setActiveMenuTab: (tab: string) => void;
    menuTabs: string[];
    setMenuTabs: (tabs: string[]) => void;
    tasks: Tarea[];
    setTasks: (tasks: Tarea[]) => void;
    selectedTask: Tarea | null;
    setSelectedTask: (task: Tarea | null) => void;
    getAllTasksWithStage: () => Tarea[];
    addActivityToTask: (projectId: number, taskName: string, activity: Actividad) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    handleExpand: () => void;
    modalOpen: boolean;
    setModalOpen: (modalOpen: boolean) => void;
    getAllTasks: () => Tarea[];
}

const defaultProjects: ProjectData[] = [
    {
        id: 1,
        owner: "Owner 1",
        title: "Proyecto de E-commerce",
        icon: "🛒",
        data: {
            fases: [
                {
                    etapa: "Planificación",
                    nombre: "Planificación",
                    estado: "Pendiente",
                    tareas: [
                        {
                            estado: "Pendiente",
                            nombre: "Investigación de mercado",
                            descripcion: "Analizar el mercado de productos naturales y la competencia online.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Definición de requisitos",
                            descripcion: "Definir las funcionalidades y características del sitio web.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Diseño de la arquitectura",
                            descripcion: "Definir la estructura y flujo del sitio web.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Planificación de desarrollo",
                            descripcion: "Crear un plan detallado de desarrollo con hitos y plazos.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        }
                    ],
                    descripcion: "Definir la visión, alcance y estrategia del proyecto.",
                    "Tiempo de desarrollo": "8 horas",
                    actividades: [],
                    comentarios: []
                },
                {
                    etapa: "Diseño",
                    nombre: "Diseño",
                    estado: "Pendiente",
                    tareas: [
                        {
                            estado: "Pendiente",
                            nombre: "Diseño de la interfaz de usuario",
                            descripcion: "Crear diseños para la página de inicio, productos, carrito, pago y perfil de usuario.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Diseño de la experiencia del usuario",
                            descripcion: "Optimizar el flujo del usuario y la usabilidad del sitio web.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Creación de prototipos",
                            descripcion: "Crear prototipos interactivos para validar el diseño y la funcionalidad.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        }
                    ],
                    descripcion: "Crear la interfaz de usuario y la experiencia del usuario.",
                    "Tiempo de desarrollo": "16 horas",
                    actividades: [],
                    comentarios: []
                },
                {
                    etapa: "Desarrollo",
                    nombre: "Desarrollo",
                    estado: "Pendiente",
                    tareas: [
                        {
                            estado: "Pendiente",
                            nombre: "Configuración del entorno de desarrollo",
                            descripcion: "Configurar NextJS, Supabase, Clerk, TailwindCSS y Stripe.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Desarrollo de la página de inicio",
                            descripcion: "Implementar la página de inicio con NextJS y TailwindCSS.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Desarrollo de la página de productos",
                            descripcion: "Implementar la página de productos con NextJS y TailwindCSS.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Integración de la base de datos",
                            descripcion: "Integrar Supabase para gestionar los productos, usuarios y pedidos.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Desarrollo del carrito de compras",
                            descripcion: "Implementar el carrito de compras con NextJS y TailwindCSS.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Integración de la pasarela de pagos",
                            descripcion: "Integrar Stripe para procesar los pagos.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Desarrollo de la página de pago",
                            descripcion: "Implementar la página de pago con NextJS y TailwindCSS.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Configuración de la autenticación",
                            descripcion: "Configurar la autenticación de usuarios con Clerk.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Desarrollo de la sección de seguimiento de pedidos",
                            descripcion: "Implementar la sección para que los usuarios puedan ver el estado de sus pedidos.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        }
                    ],
                    descripcion: "Construir el sitio web utilizando las tecnologías elegidas.",
                    "Tiempo de desarrollo": "80 horas",
                    actividades: [],
                    comentarios: []
                },
                {
                    etapa: "Pruebas",
                    nombre: "Pruebas",
                    estado: "Pendiente",
                    tareas: [
                        {
                            estado: "Pendiente",
                            nombre: "Pruebas unitarias",
                            descripcion: "Realizar pruebas unitarias de los componentes con Jest.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Pruebas de integración",
                            descripcion: "Probar la integración de la pasarela de pagos con Stripe.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Pruebas de usabilidad",
                            descripcion: "Realizar pruebas de usabilidad con usuarios reales.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Pruebas de rendimiento",
                            descripcion: "Evaluar el rendimiento del sitio web bajo diferentes cargas.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Pruebas de seguridad",
                            descripcion: "Verificar la seguridad del sitio web contra vulnerabilidades.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        }
                    ],
                    descripcion: "Verificar la funcionalidad y calidad del sitio web.",
                    "Tiempo de desarrollo": "24 horas",
                    actividades: [],
                    comentarios: []
                },
                {
                    etapa: "Despliegue",
                    nombre: "Despliegue",
                    estado: "Pendiente",
                    tareas: [
                        {
                            estado: "Pendiente",
                            nombre: "Configuración de despliegue continuo",
                            descripcion: "Configurar el despliegue continuo con Vercel.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Despliegue del sitio web",
                            descripcion: "Desplegar el sitio web en Vercel.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Monitoreo y mantenimiento",
                            descripcion: "Monitorear el rendimiento y la seguridad del sitio web.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        }
                    ],
                    descripcion: "Publicar el sitio web en producción.",
                    "Tiempo de desarrollo": "8 horas",
                    actividades: [],
                    comentarios: []
                }
            ]
        }
    },
    {
        id: 2,
        owner: "Owner 2",
        title: "Proyecto de Aplicación Móvil de Fitness",
        icon: "💪",
        data: {
            fases: [
                {
                    etapa: "Planificación",
                    nombre: "Planificación",
                    estado: "Pendiente",
                    tareas: [
                        {
                            estado: "Pendiente",
                            nombre: "Investigación de mercado",
                            descripcion: "Analizar el mercado de aplicaciones de fitness y la competencia.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Definición de requisitos",
                            descripcion: "Definir las funcionalidades y características de la aplicación.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Diseño de la arquitectura",
                            descripcion: "Definir la estructura y flujo de la aplicación.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Planificación de desarrollo",
                            descripcion: "Crear un plan detallado de desarrollo con hitos y plazos.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        }
                    ],
                    descripcion: "Definir la visión, alcance y estrategia del proyecto.",
                    "Tiempo de desarrollo": "10 horas",
                    actividades: [],
                    comentarios: []
                },
                {
                    etapa: "Diseño",
                    nombre: "Diseño",
                    estado: "Pendiente",
                    tareas: [
                        {
                            estado: "Pendiente",
                            nombre: "Diseño de la interfaz de usuario",
                            descripcion: "Crear diseños para la pantalla de inicio, seguimiento de ejercicios, nutrición y perfil de usuario.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Diseño de la experiencia del usuario",
                            descripcion: "Optimizar el flujo del usuario y la usabilidad de la aplicación.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Creación de prototipos",
                            descripcion: "Crear prototipos interactivos para validar el diseño y la funcionalidad.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        }
                    ],
                    descripcion: "Crear la interfaz de usuario y la experiencia del usuario.",
                    "Tiempo de desarrollo": "20 horas",
                    actividades: [],
                    comentarios: []
                },
                {
                    etapa: "Desarrollo",
                    nombre: "Desarrollo",
                    estado: "Pendiente",
                    tareas: [
                        {
                            estado: "Pendiente",
                            nombre: "Configuración del entorno de desarrollo",
                            descripcion: "Configurar React Native, Firebase, y TailwindCSS.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Desarrollo de la pantalla de inicio",
                            descripcion: "Implementar la pantalla de inicio con React Native y TailwindCSS.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Desarrollo de la pantalla de seguimiento de ejercicios",
                            descripcion: "Implementar la pantalla de seguimiento de ejercicios con React Native y TailwindCSS.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Integración de la base de datos",
                            descripcion: "Integrar Firebase para gestionar los datos de usuarios y ejercicios.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Desarrollo de la pantalla de nutrición",
                            descripcion: "Implementar la pantalla de nutrición con React Native y TailwindCSS.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Integración de la pasarela de pagos",
                            descripcion: "Integrar Stripe para procesar los pagos de suscripciones.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Desarrollo de la pantalla de perfil de usuario",
                            descripcion: "Implementar la pantalla de perfil de usuario con React Native y TailwindCSS.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Configuración de la autenticación",
                            descripcion: "Configurar la autenticación de usuarios con Firebase Authentication.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Desarrollo de la sección de seguimiento de progreso",
                            descripcion: "Implementar la sección para que los usuarios puedan ver su progreso en ejercicios y nutrición.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        }
                    ],
                    descripcion: "Construir la aplicación móvil utilizando las tecnologías elegidas.",
                    "Tiempo de desarrollo": "100 horas",
                    actividades: [],
                    comentarios: []
                },
                {
                    etapa: "Pruebas",
                    nombre: "Pruebas",
                    estado: "Pendiente",
                    tareas: [
                        {
                            estado: "Pendiente",
                            nombre: "Pruebas unitarias",
                            descripcion: "Realizar pruebas unitarias de los componentes con Jest.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Pruebas de integración",
                            descripcion: "Probar la integración de la pasarela de pagos con Stripe.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Pruebas de usabilidad",
                            descripcion: "Realizar pruebas de usabilidad con usuarios reales.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Pruebas de rendimiento",
                            descripcion: "Evaluar el rendimiento de la aplicación bajo diferentes cargas.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Pruebas de seguridad",
                            descripcion: "Verificar la seguridad de la aplicación contra vulnerabilidades.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        }
                    ],
                    descripcion: "Verificar la funcionalidad y calidad de la aplicación.",
                    "Tiempo de desarrollo": "30 horas",
                    actividades: [],
                    comentarios: []
                },
                {
                    etapa: "Despliegue",
                    nombre: "Despliegue",
                    estado: "Pendiente",
                    tareas: [
                        {
                            estado: "Pendiente",
                            nombre: "Configuración de despliegue continuo",
                            descripcion: "Configurar el despliegue continuo con App Center.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Despliegue de la aplicación",
                            descripcion: "Desplegar la aplicación en App Store y Google Play.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        },
                        {
                            estado: "Pendiente",
                            nombre: "Monitoreo y mantenimiento",
                            descripcion: "Monitorear el rendimiento y la seguridad de la aplicación.",
                            completed: false,
                            "Tiempo de desarrollo": "",
                            actividades: [],
                            comentarios: [],
                            tareas: []
                        }
                    ],
                    descripcion: "Publicar la aplicación en producción.",
                    "Tiempo de desarrollo": "10 horas",
                    actividades: [],
                    comentarios: []
                }
            ]
        }
    }
];

export const useFakeStore = create<FakeStore>((set, get) => ({
    isCollapsed: false,
    projects: defaultProjects,
    selectedProject: defaultProjects[0],
    setIsCollapsed: (isCollapsed: boolean) => set({ isCollapsed }),
    setProjects: (projects: ProjectData[]) => set({ projects }),
    setSelectedProject: (project: ProjectData | null) => set({ selectedProject: project }),
    handleProjectClick: (projectTitle: string) => {
        const project = get().projects.find(project => project.title === projectTitle) || null;
        set({ selectedProject: project });
    },
    handleCollapse: () => set(state => ({ isCollapsed: !state.isCollapsed })),
    activeMenuTab: 'General',
    setActiveMenuTab: (tab: string) => set({ activeMenuTab: tab }),
    menuTabs: ['General', 'Fases', 'Diagrama', 'Kanban'],
    setMenuTabs: (tabs: string[]) => set({ menuTabs: tabs }),
    tasks: [],
    setTasks: (tasks: Tarea[]) => set({ tasks }),
    selectedTask: null,
    setSelectedTask: (task: Tarea | null) => set({ selectedTask: task }),
    getAllTasksWithStage: () => get().tasks.map(task => ({ ...task, estado: task.estado })),
    addActivityToTask: (projectId: number, taskName: string, activity: Actividad) => {
        const project = get().projects.find(project => project.id === projectId) || null;
        if (project) {
            project.data.fases.find(tarea => tarea.nombre === taskName)?.actividades.push(activity);
        }
    },
    activeTab: 'tareas',
    setActiveTab: (tab: string) => set({ activeTab: tab }),
    handleExpand: () => set(() => ({ isCollapsed: false })),
    modalOpen: false,
    setModalOpen: (modalOpen) => set({ modalOpen }),
    getAllTasks: () => {
        const selectedProject = get().selectedProject;
        if (!selectedProject) return [];

        return selectedProject.data.fases.flatMap(fase =>
            fase.tareas.map(tarea => ({
                ...tarea,
                etapa: fase.etapa // Asegurarse de que cada tarea tenga la propiedad 'etapa'
            }))
        );
    },
}));