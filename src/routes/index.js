import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { ROLES } from '../constants/me';

// lazy load all the views

// auth
const Login = React.lazy(() => import('../pages/account/log-in/Login'));
const Logout = React.lazy(() => import('../pages/account/Logout'));
const ForgetPassword = React.lazy(() => import('../pages/account/fotgot-password/ForgetPassword'));
const Confirm = React.lazy(() => import('../pages/account/confirm/Confirm'));
const ChangePass = React.lazy(() => import('../pages/account/change-password/ChangePass'));
const Information = React.lazy(() => import('../pages/account/information/Information'));
const Individual = React.lazy(() => import('../pages/individual/Individual'));
const UpdateUser = React.lazy(() => import('../pages/update-user/UpdateUser'));
const UpdatePassword = React.lazy(() => import('../pages/update-password/UpdatePassword'));
const PostUser = React.lazy(() => import('../pages/posts-user/PostUser'));
//Dashboard
const Dashboard = React.lazy(() => import('../pages/dashboard/Dashboard'));

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/login" />,
};

// dashboards
const dashboardRoutes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        // route: PrivateRoute,
        route: Route,
        route: PrivateRoute,
        roles: [ROLES.DLEAD],
    },
    // {
    //     path: '/account',
    //     name: 'Acount',
    //     component: Information,
    //     // route: PrivateRoute,
    //     roles: Route,
    // },
];
const dashboardUser = [
    {
        path: '/homeuser',
        name: 'Trang chủ',
        icon: 'fa-solid fa-house',
        component: Individual,
        route: Route,
    },
    {
        path: '/update-user',
        name: 'Update thông tin cá nhân',
        icon: '',
        component: UpdateUser,
        route: Route,
    },
    {
        path: '/change-password',
        name: 'Đổi mật khẩu',
        icon: 'fa-solid fa-key',
        component: UpdatePassword,
        route: Route,
        // route: PrivateRoute,
        // roles: [ROLES.MEMBER, ROLES.DLEAD],
    },
];

const otherPublicRoutes = [
    // {
    //     path: '/error-404',
    //     name: 'Error - 404',
    //     component: ErrorPageNotFound,
    //     route: Route,
    // },
    // {
    //     path: '/error-500',
    //     name: 'Error - 500',
    //     component: ServerError,
    //     route: Route,
    // },
    // {
    //     path: '/account/confirm',
    //     name: 'Confirm',
    //     component: Confirm,
    //     route: Route,
    // },
];

// flatten the list of all nested routes
const flattenRoutes = (routes) => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach((item) => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};
// auth
const authRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        route: Route,
    },
    {
        path: '/account/logout',
        name: 'Logout',
        component: Logout,
        route: Route,
    },
    {
        path: '/account/forget-password',
        name: 'Forget Password',
        component: ForgetPassword,
        route: Route,
    },
    {
        path: '/account/confirm',
        name: 'confirm',
        component: Confirm,
        route: Route,
    },
    {
        path: '/account/changepass',
        name: 'changepass',
        component: ChangePass,
        route: Route,
    },
    {
        path: '/account/information',
        name: 'information',
        component: Information,
        route: Route,
    },
];

// All routes
const authProtectedRoutes = [...dashboardUser];
const publicRoutes = [...dashboardRoutes];
const loginRoutes = [...authRoutes];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
const publicLoginPage = flattenRoutes([...loginRoutes]);

export { publicRoutes, authProtectedRoutes, authProtectedFlattenRoutes, publicProtectedFlattenRoutes, publicLoginPage };
