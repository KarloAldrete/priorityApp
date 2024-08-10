import create from 'zustand';
import { Tag } from 'emblor';
import { getAnswer } from '@/app/actions';
import { SetStateAction } from 'react';

interface TaskState {
    projectName: string;
    description: string;
    tags: Tag[];
    teamSize: number;
    payRoll: string;
    moneyAmount: number;
    workingPeriod: number;
    isFreeWeekends: boolean;
    restrictions: string;
    generation: any;
    loading: boolean;
    recommendations: boolean;
    activeTagIndex: number | null;
    emoji: string;
    isVisible: boolean;
    setProjectName: (name: string) => void;
    setDescription: (desc: string) => void;
    setTags: (tags: Tag[] | ((prevTags: Tag[]) => Tag[])) => void;
    setTeamSize: (size: number) => void;
    setPayRoll: (pay: string) => void;
    setMoneyAmount: (amount: number) => void;
    setWorkingPeriod: (period: number) => void;
    setFreeWeekends: (free: boolean) => void;
    setRestrictions: (restrictions: string) => void;
    setGeneration: (generation: string) => void;
    setLoading: (loading: boolean) => void;
    setRecommendations: (recommendations: boolean) => void;
    setActiveTagIndex: (index: SetStateAction<number | null>) => void;
    setEmoji: (emoji: string) => void;
    handleGenerateTasks: (user: any) => Promise<void>;
    setIsVisible: (isVisible: boolean) => void;
}

export const useTasksStore = create<TaskState>((set, get) => ({
    projectName: '',
    description: '',
    tags: [],
    teamSize: 0,
    payRoll: 'hora',
    moneyAmount: 0,
    workingPeriod: 0,
    isFreeWeekends: false,
    restrictions: '',
    generation: '',
    loading: false,
    recommendations: false,
    activeTagIndex: null,
    emoji: '1f642',
    isVisible: false,
    setProjectName: (name) => set({ projectName: name }),
    setDescription: (desc) => set({ description: desc }),
    setTags: (tags: Tag[] | ((prevTags: Tag[]) => Tag[])) => set(state => {
        const newTags = typeof tags === 'function' ? tags(state.tags) : tags;
        return { tags: newTags };
    }),
    setTeamSize: (size) => set({ teamSize: size }),
    setPayRoll: (pay) => set({ payRoll: pay }),
    setMoneyAmount: (amount) => set({ moneyAmount: amount }),
    setWorkingPeriod: (period) => set({ workingPeriod: period }),
    setFreeWeekends: (free) => set({ isFreeWeekends: free }),
    setRestrictions: (restrictions) => set({ restrictions }),
    setGeneration: (generation) => set({ generation }),
    setLoading: (loading) => set({ loading }),
    setRecommendations: (recommendations) => set({ recommendations }),
    setActiveTagIndex: (index: SetStateAction<number | null>) => {
        set((state) => ({
            activeTagIndex: typeof index === 'function' ? index(state.activeTagIndex) : index
        }));
    },
    setEmoji: (emoji) => set({ emoji }),
    handleGenerateTasks: async (user: any) => {
        const { projectName, description, tags, teamSize, payRoll, moneyAmount, workingPeriod, isFreeWeekends, restrictions, emoji } = get();
        set({ loading: true });
        const data = {
            user: user,
            projectName,
            emoji,
            description,
            tags: tags.map(tag => tag.text),
            teamSize,
            payRoll,
            moneyAmount,
            workingPeriod,
            isFreeWeekends,
            restrictions
        };
        const object = await getAnswer(JSON.stringify(data), user, emoji);
        set({ loading: false, generation: object });

        if (object) {
            setTimeout(() => {
                set({ isVisible: false });
                window.location.reload();
            }, 2000);
        }
    },
    setIsVisible: (isVisible) => set({ isVisible })
}));