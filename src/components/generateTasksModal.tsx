'use client';
import { IconCalendarPlus, IconLoader, IconSparkles, IconUser, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { getAnswer } from '@/app/actions';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormField, FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { TagInput, Tag } from 'emblor';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@clerk/nextjs';



const FormSchema = z.object({
    technologies: z.array(z.string()),
});



export function TasksModal({ isVisible, setIsVisible }: { isVisible: boolean, setIsVisible: (visible: boolean) => void }) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const { setValue } = form;
    const { user } = useUser();

    const [recommendations, setRecommendations] = useState(false);
    const [loading, setLoading] = useState(false);
    const [generation, setGeneration] = useState<string>('');
    const [visible, setVisible] = useState(isVisible);
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState<Tag[]>([]);
    const [teamSize, setTeamSize] = useState(0);
    const [payRoll, setPayRoll] = useState('hora');
    const [moneyAmount, setMoneyAmount] = useState(0);
    const [workingPeriod, setWorkingPeriod] = useState(0);
    const [isFreeWeekends, setFreeWeekends] = useState(false);
    const [restrictions, setRestrictions] = useState('');

    useEffect(() => {
        setVisible(isVisible);
    }, [isVisible]);

    useEffect(() => {
        if (generation) {
            const lines = generation.split('\n');
            const tareasIndex = lines.findIndex(line => line.startsWith('**Tareas:**'));
            if (tareasIndex !== -1) {
                const tareasArray = [];
                for (let i = tareasIndex + 1; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (line.startsWith('**')) break;
                    if (line) tareasArray.push({ tarea: line.replace(/^\d+\.\s*/, ''), completada: false });
                }
                console.log(tareasArray);
            } else {
                console.error('Error: No se encontraron tareas.');
            }
        };
    }, [generation]);

    const handleGenerateTasks = async () => {
        setLoading(true);
        const data = {
            projectName,
            description,
            tags: tags.map(tag => tag.text),
            teamSize,
            payRoll,
            moneyAmount,
            workingPeriod,
            isFreeWeekends,
            restrictions
        };
        const object = await getAnswer(JSON.stringify(data), user?.id ?? '');
        console.log(object);
        // setGeneration(text);
        setLoading(false);
    };

    function handleClose() {
        setIsVisible(false);
    };

    function handleSendData() {
        console.log(`Nombre del proyecto: ${projectName} 🚀`);
        console.log(`Descripción: ${description} 📝`);
        console.log(`Etiquetas: ${tags.map(tag => tag.text).join(', ')} 🏷️`);
        console.log(`Tamaño del equipo: ${teamSize} 👥`);
        console.log(`Pago: ${payRoll} 💸`);
        console.log(`Monto: ${moneyAmount} 💸`);
        console.log(`Periodo de trabajo: ${workingPeriod} hrs ⏰`);
        console.log(`Fines de semana libres: ${isFreeWeekends ? 'Sí' : 'No'} 🌞`);
        console.log(`Restricciones: ${restrictions} 🚫`);
    };

    useEffect(() => {
        if (visible) {
            setProjectName("BLife");
            setDescription("necesito crear una plataforma para un cliente que vende jabones, shampoos, pastas de dientes, cremas y demas hechos a base de productos naturales, quiere poder vender en linea, que los clientes puedan ver los productos, agregarlos al carrito, pagarlos y despues verificar la paqueteria para saber donde viene el paquete.");
            setTags([
                { id: '1', text: "NextJS" },
                { id: '2', text: "Supabase" },
                { id: '3', text: "Clerk" },
                { id: '4', text: "TailwindCSS" },
                { id: '5', text: "Stripe" },
                { id: '6', text: "Vercel" },
                { id: '7', text: "Figma" }
            ]);
            setTeamSize(1);
            setPayRoll("hora");
            setMoneyAmount(25);
            setWorkingPeriod(8);
            setFreeWeekends(false);
            setRestrictions("");
        }
    }, [visible]);

    return (
        <>
            {visible &&
                <div className='w-screen h-screen bg-slate-500 absolute top-0 left-0 bg-opacity-50 flex items-center justify-center'>

                    <div className='w-full max-w-[600px] h-auto bg-white border border-[#E8E6EF] rounded-md pt-4 flex flex-col items-start justify-start font-geist'>

                        <div className='w-full h-auto flex flex-row items-start justify-between gap-4 border-b border-[#E8E6EF] pb-4 px-5'>

                            <div className='w-auto h-auto flex flex-row items-center justify-start gap-1.5'>

                                <IconSparkles size={20} stroke={1.75} />

                                <span className='font-geist font-semibold text-base leading-5'>Cotizar Proyecto</span>

                            </div>

                            <IconX size={20} color='#9595A7' className='cursor-pointer' onClick={handleClose} />

                        </div>

                        <div className='w-full h-auto flex flex-col items-start justify-start gap-4 p-5'>

                            <div className='w-full h-auto flex flex-col items-start justify-start gap-3'>

                                <div className='w-full h-auto flex flex-col items-start justify-start gap-1.5'>

                                    <span className='font-geist font-semibold text-base leading-6'>Nombre del proyecto</span>

                                    <input
                                        className='w-full h-9 border border-[#E8E6EF] p-3 placeholder:text-[#9595A7] text-sm font-medium leading-5 rounded-md'
                                        placeholder='Ingresa un nombre para el proyecto'
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                    />

                                </div>

                                <div className='w-full h-auto flex flex-col items-start justify-start gap-1.5'>

                                    <span className='font-geist font-semibold text-base leading-6'>Descripción general</span>

                                    <textarea
                                        className='w-full h-9 min-h-[88px] border border-[#E8E6EF] p-3 placeholder:text-[#9595A7] font-medium text-sm leading-5 rounded-md resize-y'
                                        placeholder='Escribe una descripción detallada para un mejor resultado...'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />

                                </div>

                                <Form {...form}>
                                    <FormField
                                        control={form.control}
                                        name="technologies"
                                        render={({ field }) => (
                                            <FormItem className="w-full h-auto flex flex-col items-start">
                                                <FormLabel className="text-left font-geist font-semibold text-base leading-6">Tecnologías</FormLabel>
                                                <FormControl>
                                                    <TagInput
                                                        {...field}
                                                        placeholder="Agrega tecnologías al proyecto"
                                                        tags={tags}
                                                        setTags={(newTags) => {
                                                            setTags(newTags);
                                                            setValue('technologies', Array.isArray(newTags) ? newTags.map(tag => tag.text) : []);
                                                        }}
                                                        activeTagIndex={activeTagIndex}
                                                        setActiveTagIndex={setActiveTagIndex}
                                                        styleClasses={{
                                                            input: 'w-full h-auto flex flex-wrap items-start justify-start px-1 placeholder:text-[#9595A7] font-medium',
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </Form>

                                <div className='w-full h-auto flex flex-row items-end justify-start gap-4'>

                                    <div className='w-auto h-auto flex flex-col items-start justify-start gap-1.5'>

                                        <span className='font-geist font-semibold text-base leading-5'>Personas en el equipo</span>

                                        <Select onValueChange={setTeamSize} value={teamSize}>
                                            <SelectTrigger className="w-[180px] h-9">
                                                <SelectValue placeholder="0" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={0}>0</SelectItem>
                                                <SelectItem value={1}>1</SelectItem>
                                                <SelectItem value={2}>2</SelectItem>
                                                <SelectItem value={3}>3</SelectItem>
                                                <SelectItem value={4}>4</SelectItem>
                                                <SelectItem value={5}>5</SelectItem>
                                                <SelectItem value={6}>6</SelectItem>
                                                <SelectItem value={7}>7</SelectItem>
                                                <SelectItem value={8}>8</SelectItem>
                                            </SelectContent>
                                        </Select>

                                    </div>

                                    <div className='w-auto flex flex-col items-center justify-center gap-2'>
                                        <button className='bg-black text-white px-3 py-2.5 rounded-md h-9 flex items-center justify-center text-sm leading-5 font-medium gap-2'>
                                            <IconUser size={18} stroke={2} />
                                            <span className='text-white text-sm leading-5 font-medium'>Definir roles</span>
                                        </button>
                                    </div>

                                    <div className='w-auto flex flex-col items-center justify-center gap-2'>
                                        <button className='bg-white border border-dashed border-[#E8E6EF] px-3 py-2.5 rounded-md h-9 flex items-center justify-center text-sm leading-5 font-medium gap-2'>
                                            <IconCalendarPlus size={18} stroke={2} />
                                            <span className='text-black text-sm leading-5 font-medium'>Fecha de entrega</span>
                                        </button>
                                    </div>

                                </div>

                                <div className='w-full h-auto flex flex-row items-center justify-start gap-4'>

                                    <div className='w-auto h-auto flex flex-col items-start justify-start gap-1.5'>

                                        <div className='w-auto h-auto flex flex-row items-center justify-start gap-3'>

                                            <span className='font-geist font-semibold text-base leading-6'>Monto</span>

                                            <div className='flex items-center gap-2'>

                                                <div className='w-auto h-auto flex flex-row items-center justify-start gap-2'>

                                                    <input
                                                        type='radio'
                                                        name='monto'
                                                        value='hora'
                                                        checked={payRoll === 'hora'}
                                                        onChange={() => setPayRoll('hora')}
                                                    />
                                                    <span>Hora</span>

                                                </div>

                                                <div className='w-auto h-auto flex flex-row items-center justify-start gap-2'>

                                                    <input
                                                        type='radio'
                                                        name='monto'
                                                        value='dia'
                                                        checked={payRoll === 'dia'}
                                                        onChange={() => setPayRoll('dia')}
                                                    />
                                                    <span>Día</span>

                                                </div>

                                            </div>

                                        </div>

                                        <Select onValueChange={setMoneyAmount} value={moneyAmount}>
                                            <SelectTrigger className="w-auto min-w-[188px] h-9">
                                                <SelectValue placeholder="$ 0" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={0}>$ 0</SelectItem>
                                                <SelectItem value={10}>$ 10</SelectItem>
                                                <SelectItem value={20}>$ 20</SelectItem>
                                                <SelectItem value={25}>$ 25</SelectItem>
                                                <SelectItem value={30}>$ 30</SelectItem>
                                                <SelectItem value={40}>$ 40</SelectItem>
                                            </SelectContent>
                                        </Select>

                                    </div>

                                    <div className='w-auto h-auto flex flex-col items-start justify-start gap-1.5'>

                                        <span className='font-geist font-semibold text-base leading-6'>Jornada laboral (hrs)</span>

                                        <Select onValueChange={setWorkingPeriod} value={workingPeriod}>
                                            <SelectTrigger className="w-full h-9">
                                                <SelectValue placeholder="0" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={0}>0</SelectItem>
                                                <SelectItem value={4}>4</SelectItem>
                                                <SelectItem value={6}>6</SelectItem>
                                                <SelectItem value={8}>8</SelectItem>
                                                <SelectItem value={10}>10</SelectItem>
                                            </SelectContent>
                                        </Select>

                                    </div>

                                </div>

                                <div className='w-full h-auto flex flex-row items-center justify-between'>

                                    <div className='w-full h-auto flex flex-col items-start justify-start'>

                                        <span className='font-geist font-semibold text-base leading-6'>Fines de semana libres</span>

                                        <span className='font-geist font-normal text-sm leading-5 text-gray-500'>Permite que la IA nos dé una guía.</span>

                                    </div>

                                    <label className='relative inline-flex items-center cursor-pointer'>

                                        <input
                                            type='checkbox'
                                            className='sr-only peer'
                                            checked={isFreeWeekends}
                                            onChange={() => setFreeWeekends(!isFreeWeekends)}
                                        />

                                        <div className="w-7 h-4 bg-gray-300 rounded-[10px] p-[2px] peer peer-checked:bg-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all"></div>

                                    </label>

                                </div>

                                <div className='w-full h-auto flex flex-col items-start justify-start'>

                                    <span className='font-geist font-semibold text-base leading-6'>Restricciones o limitaciones</span>

                                    <textarea
                                        className='w-full h-9 min-h-[88px] border border-[#E8E6EF] p-3 placeholder:text-[#9595A7] text-sm leading-5 rounded-md resize-y'
                                        placeholder='Escribe aquí si existe alguna restricción o limitación...'
                                        value={restrictions}
                                        onChange={(e) => setRestrictions(e.target.value)}
                                    />

                                </div>

                            </div>

                            <button
                                className='w-full h-auto bg-black rounded-md text-white font-semibold text-sm leading-5 flex flex-row items-center justify-center px-3 py-1.5'
                                onClick={handleGenerateTasks}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <IconLoader className='animate-spin mr-2' size={20} stroke={1.75} />
                                    </>
                                ) : (
                                    'Iniciar'
                                )}
                            </button>

                        </div>

                    </div>

                </div>
            }
        </>
    );
};