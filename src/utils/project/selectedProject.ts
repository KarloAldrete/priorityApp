'use server';
import { cookies } from 'next/headers';

export async function getSelectedProject() {
    const cookieStore = cookies();
    const pathname = cookieStore.get('current-path')?.value || '/';
    const selectedProject = pathname.split('/')[2] || '/';
    console.log(selectedProject);
    return selectedProject;
};