'use client';
import { IconLoader, IconSparkles, IconX } from '@tabler/icons-react';
import EmojiPicker, { Theme, EmojiStyle, Emoji, EmojiClickData } from 'emoji-picker-react';
import { useState } from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { TagInput } from 'emblor';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@clerk/nextjs';
import { useTasksStore } from '@/stores/modal/modal.store';




const FormSchema = z.object({
    technologies: z.array(z.string()),
});

export function TasksModal() {
    const { user } = useUser();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const { setValue } = form;

    const projectName = useTasksStore((state) => state.projectName);
    const setProjectName = useTasksStore((state) => state.setProjectName);
    const description = useTasksStore((state) => state.description);
    const setDescription = useTasksStore((state) => state.setDescription);
    const tags = useTasksStore((state) => state.tags);
    const setTags = useTasksStore((state) => state.setTags);
    const activeTagIndex = useTasksStore((state) => state.activeTagIndex);
    const setActiveTagIndex = useTasksStore((state) => state.setActiveTagIndex);
    const moneyAmount = useTasksStore((state) => state.moneyAmount);
    const setMoneyAmount = useTasksStore((state) => state.setMoneyAmount);
    const restrictions = useTasksStore((state) => state.restrictions);
    const setRestrictions = useTasksStore((state) => state.setRestrictions);
    const loading = useTasksStore((state) => state.loading);
    const emoji = useTasksStore((state) => state.emoji);
    const setEmoji = useTasksStore((state) => state.setEmoji);
    const handleGenerateTasks = useTasksStore((state) => state.handleGenerateTasks);
    const isVisible = useTasksStore((state) => state.isVisible);
    const setIsVisible = useTasksStore((state) => state.setIsVisible);

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        setEmoji(emojiData.unified);
        setShowEmojiPicker(false);
    };

    console.log(emoji);

    return (
        <>
            {isVisible &&
                <div className='w-screen h-screen bg-slate-500 absolute top-0 left-0 bg-opacity-50 flex items-center justify-center z-[100]'>

                    <div className='w-full max-w-[600px] h-auto bg-white border border-[#E4E4E7] rounded-md pt-4 flex flex-col items-start justify-start font-geist'>

                        <div className='w-full h-auto flex flex-row items-start justify-between gap-4 border-b border-[#E4E4E7] pb-4 px-5'>

                            <div className='w-auto h-auto flex flex-row items-center justify-start gap-1.5 text-black'>

                                <IconSparkles size={20} stroke={1.75} />

                                <span className='font-geist font-bold text-xl leading-6'>Cotizar Proyecto</span>

                            </div>

                            <IconX size={20} color='#64748B' className='cursor-pointer' onClick={() => setIsVisible(false)} />

                        </div>

                        <div className='w-full h-auto flex flex-col items-start justify-start gap-4 p-5'>

                            <div className='w-full h-auto flex flex-col items-start justify-start gap-3'>

                                <div className='w-full h-full flex flex-row items-start justify-start gap-3'>

                                    <div className='w-full h-auto flex flex-col items-start justify-start gap-1.5'>

                                        <span className='font-geist font-semibold text-base leading-5 text-black'>Nombre del proyecto</span>

                                        <input
                                            className='w-full h-9 border border-[#E4E4E7] p-3 placeholder:text-[#64748B] text-black text-sm font-normal leading-5 rounded-md'
                                            placeholder='Ingresa un nombre para el proyecto'
                                            value={projectName}
                                            onChange={(e) => setProjectName(e.target.value)}
                                        />

                                    </div>

                                    <div className="w-1/2 h-full flex flex-col items-center justify-start gap-1.5 relative" onClick={() => setShowEmojiPicker(true)}>

                                        <span className='font-geist font-semibold text-base leading-5 text-black'>Icono del proyecto</span>

                                        <div className='w-full gap-3 h-[34px] flex flex-row items-center justify-center cursor-pointer'>

                                            <Emoji unified={emoji} emojiStyle={EmojiStyle.APPLE} size={24} />

                                        </div>

                                        {showEmojiPicker && (
                                            <div className='w-full h-auto absolute top-full left-0 bg-white z-[100] mt-2'>
                                                <EmojiPicker
                                                    onEmojiClick={handleEmojiClick}
                                                    theme={Theme.LIGHT}
                                                    emojiStyle={EmojiStyle.APPLE}
                                                />
                                            </div>
                                        )}

                                    </div>

                                </div>

                                <div className='w-full h-auto flex flex-col items-start justify-start gap-1.5'>

                                    <span className='font-geist font-semibold text-base leading-5 text-black'>Descripción general</span>

                                    <textarea
                                        className='w-full h-9 min-h-[88px] border border-[#E4E4E7] p-3 placeholder:text-[#64748B] text-black font-normal text-sm leading-5 rounded-md resize-y'
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
                                                <FormLabel className="text-left font-geist font-semibold text-base leading-5 text-black">Tecnologías a utilizar</FormLabel>
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
                                                            input: 'w-full h-auto flex flex-wrap items-start justify-start px-1 placeholder:text-[#64748B] text-black font-normal',
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </Form>

                                <div className='w-full h-auto flex flex-row items-center justify-start gap-4'>

                                    <div className='w-auto h-auto flex flex-col items-start justify-start gap-1.5'>

                                        <div className='w-auto h-auto flex flex-row items-center justify-start gap-3'>

                                            <span className='font-geist font-semibold text-base leading-5 text-black'>Costo por hora</span>

                                        </div>

                                        <input
                                            type="number"
                                            value={moneyAmount}
                                            onChange={(e) => setMoneyAmount(Number(e.target.value))}
                                            className="w-auto min-w-[188px] h-9 px-3 py-2 border border-[#E4E4E7] text-black text-sm font-normal leading-5 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                            placeholder="$ 0"
                                            min="0"
                                            step="1"
                                        />

                                    </div>

                                </div>

                                <div className='w-full h-auto flex flex-col items-start justify-start gap-1.5'>

                                    <span className='font-geist font-semibold text-base leading-5 text-black'>Restricciones o limitaciones</span>

                                    <textarea
                                        className='w-full h-9 min-h-[88px] border border-[#E4E4E7] p-3 placeholder:text-[#64748B] text-black font-normal text-sm leading-5 rounded-md resize-y'
                                        placeholder='Escribe aquí si existe alguna restricción o limitación...'
                                        value={restrictions}
                                        onChange={(e) => setRestrictions(e.target.value)}
                                    />

                                </div>

                            </div>

                            <button
                                className='w-full h-auto bg-black rounded-md text-white font-semibold text-sm leading-5 flex flex-row items-center justify-center px-3 py-1.5'
                                onClick={() => handleGenerateTasks(user?.id)}
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