// 'use server';
// import { cookies } from 'next/headers';

// export interface ProjectContextType {
//     selectedProject: string | null;
//     title: string;
// };

// export const getSelectedProject = (): ProjectContextType => {
//     const cookieStore = cookies();
//     const pathname = cookieStore.get('current-path')?.value || '/';
//     const selectedProject = pathname.split('/')[2] || '/';
//     const title = selectedProject === '/' ? 'Home' : 'Project';

//     console.log(selectedProject);
//     return { selectedProject, title };
// };

// export default getSelectedProject;