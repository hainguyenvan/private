export const ClientRoutes = [
    // home page
    {
        path: '',
        loadChildren: './pages/client/home/home.module#HomeModule'
    },

    {
        path: 'home-page',
        loadChildren: './pages/client/home/home.module#HomeModule'
    },
    {
        path: 'home1-page',
        loadChildren: './pages/client/home1/home1.module#Home1Module'
    },
]