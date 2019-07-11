import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [

    {
        id: 'modules',
        title: 'Modulos',
        type: 'group',
        children: [
            {
                id: 'inicio',
                title: 'Inicio',
                type: 'item',
                icon: 'home',
                url: '/home'
            },
            {
                id: 'gestion-residente',
                title: 'Gestión de residentes',
                type: 'collapsable',
                icon: 'supervised_user_circle',
                children: [
                    {
                        id: 'residente',
                        title: 'Residentes',
                        type: 'item',
                        url: '/residente'
                    },
                    {
                        id: 'acudiente',
                        title: 'Acudientes',
                        type: 'item',
                        url: '/acudiente'
                    }
                ]
            },
            {
                id: 'seguimiento',
                title: 'Seguimientos médicos',
                type: 'collapsable',
                icon: 'assignment',
                children: [
                    {
                        id: 'seguimiento-inicial',
                        title: 'Valoración inicial',
                        type: 'item',
                        url: '/seguimiento/valoracion-inicial'
                    },
                    {
                        id: 'seguimiento-diario',
                        title: 'Seguimiento diario',
                        type: 'item',
                        url: '/seguimiento/seguimiento-diario'
                    }
                ]
            },
            {
                id: 'formula',
                title: 'Fórmula médica',
                type: 'item',
                url: '/formula',
                icon: 'local_hospital'
            },
            {
                id: 'pagos',
                title: 'Pagos',
                type: 'item',
                icon: 'attach_money',
                url: '/pagos'
            },
            // {
            //     id: 'eventos',
            //     title: 'Eventos',
            //     type: 'item',
            //     icon: 'today',
            //     url: '/eventos'
            // }
        ]
    },
    {
        id: 'sistema',
        title: 'Sistema',
        type: 'group',
        children: [
            {
                id: 'gestion-usuario',
                title: 'Gestión de usuarios',
                type: 'item',
                icon: 'how_to_reg',
                url: '/usuario-control'
            },
            // {
            //     id: 'novedad',
            //     title: 'Novedades',
            //     type: 'item',
            //     icon: 'grade',
            //     url: '/novedades'
            // },
            {
                id: 'medicas',
                title: 'Configuración',
                type: 'collapsable',
                icon: 'settings',
                children: [
                    {
                        id: 'medicamento',
                        title: 'Medicamentos',
                        type: 'item',
                        url: '/config/medicamento'
                    },
                    // {
                    //     id: 'habitaciones_camas',
                    //     title: 'Camas y habitaciones',
                    //     type: 'item',
                    //     url: '/config/habitacion-cama'
                    // }
                ]
            }
        ]
    }
];

export const navigation_enfermera: FuseNavigation[] = [

    {
        id: 'modules',
        title: 'Modulos',
        type: 'group',
        children: [
            {
                id: 'inicio',
                title: 'Inicio',
                type: 'item',
                icon: 'home',
                url: '/home'
            },
            {
                id: 'residente',
                title: 'Residentes',
                type: 'item',
                icon: 'supervised_user_circle',
                url: '/residente'
            },
            {
                id: 'seguimiento',
                title: 'seguimiento-diario',
                type: 'item',
                icon: 'ballot',
                url: '/seguimiento/seguimiento-diario'
            },
            {
                id: 'formula-medica',
                title: 'Fórmula médica',
                type: 'item',
                icon: 'local_hospital',
                url: '/formula'
            }
        ]
    }
];

