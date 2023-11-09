export type FeatureData = {
    title: string,
    description: string,
    link: string,
    image: string
}
export interface SectionData  {
    project: {
        title: string,
        features: Array<FeatureData>
    },
    task: {
        title: string,
        features: Array<FeatureData>
    }
}
export const data: SectionData = {
    project: {
        title: 'Project management',
        features: [
            {
                title: 'Create',
                description: `Start creating a project that you will be controlling and tracking. 
                Be either personal or shared with your collaborators.`,
                link: '/projects',
                image: 'https://res.cloudinary.com/dut4cwhtd/image/upload/v1699502156/softlink/SL-P-Create_jwwkru.png'
            },
            {
                title: 'Choose view',
                description: `Once the project is created you can choose from different views for display your data.`,
                link: '/projects',
                image: 'https://res.cloudinary.com/dut4cwhtd/image/upload/v1699502155/softlink/SL-P-View_eines7.png'
            },
            {
                title: 'Manage',
                description: `You will be allowed to configurate a project by: changing the title, description, managing members or
                even eliminating it if is needed.`,
                link: '/projects',
                image: 'https://res.cloudinary.com/dut4cwhtd/image/upload/v1699502155/softlink/SL-P-Manage_thrdaz.png'
            }
        ]
    },
    task: {
        title: 'Task management',
        features: [
            {
                title: 'Create',
                description: `Within the project you can start creating new tasks. This task will be the main information
                that makes up the project.`,
                link: '/projects',
                image: 'https://res.cloudinary.com/dut4cwhtd/image/upload/v1699502155/softlink/SL-T-Create_jpwccd.png'
            },
            {
                title: 'Manage',
                description: `The task can be modified by its properties, which are: title, description, timeline,
                members, among others...`,
                link: '/projects',
                image: 'https://res.cloudinary.com/dut4cwhtd/image/upload/v1699502155/softlink/SL-T-Manage_bkueyv.png'
            },
            {
                title: 'Assign',
                description: `Start collaborating by adding members who contribute to the assigned task and all
                can track and manage depending on their own functions.`,
                link: '/projects',
                image: 'https://res.cloudinary.com/dut4cwhtd/image/upload/v1699502155/softlink/SL-T-Assign_gskzyz.png'
            }
        ]
    }
}