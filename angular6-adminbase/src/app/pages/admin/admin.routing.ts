export const AdminRoutes = [
    {
        path: '',
        loadChildren: './pages/admin/login/admin-login.module#AdminLoginModule'
    },
    {
        path: 'admin/login',
        loadChildren: './pages/admin/login/admin-login.module#AdminLoginModule'
    },
    {
        path: 'admin/user-list',
        loadChildren: './pages/admin/user-list/user-list.module#UserListModule'
    }
]