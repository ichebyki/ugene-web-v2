export const LeftMenu = {
    title: 'Main menu',
    icon: null,
    menu: [
        {
            title: 'File',
            icon: null,
            menu: [
                {
                    title: 'New project...',
                    name: 'NewProject',
                    icon: null
                },
                {
                    title: 'New document from text...',
                    icon: null
                },
                {
                    title: 'New workflow...',
                    name: 'NewWorkflow',
                    action: "createWorkflow",
                    icon: null
                },
                {
                    divider: true
                },
                {
                    title: 'Open...',
                    name: 'OpenFile',
                    icon: null
                }
            ]
        },
        {
            title: 'Actions',
            icon: null,
            menu: [
                {
                    title: 'Close active view',
                    icon: null
                }
            ]
        },
        {
            title: 'Settings',
            icon: null,
            menu: [
                {
                    title: 'Preferences...',
                    icon: null
                },
                {
                    title: 'Plugins...',
                    icon: null
                }
            ]
        },
        {
            title: 'Tools',
            icon: null,
            menu: [
                {
                    title: 'Sanger data analysis',
                    icon: null,
                    menu: [
                        {
                            title: 'Map reads tp reference...',
                            icon: null
                        },
                        {
                            title: 'Reads de novo assembly (with CAP3)...',
                            icon: null
                        }
                    ]
                },
                {
                    title: 'NGS data analysis',
                    icon: null,
                    menu: [
                        {
                            title: 'Reads quality control',
                            icon: null
                        }
                    ]
                }
            ]
        },
        {
            title: 'Window',
            icon: null
        }
    ]
};