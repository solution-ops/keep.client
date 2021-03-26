import { lazy } from 'react';

// Local Dependencies
import { Route } from './types';

// Lazy Load Routes
// Auth
const LoginPage = lazy(() => import('../features/Auth/Login'));
const RegisterPage = lazy(() => import('../features/Auth/Register'));

const DashboardPage = lazy(() => import('../features/Dashboard'));
const TaskPage = lazy(() => import('../features/Tasks/Task'));

export const routes: Route[] = [
  {
    component: <DashboardPage />,
    path: '/',
    label: 'Home',
    accessLevel: ['Employee'],
    private: true,
    navBar: true,
    title: 'Home',
    tooltipTitle: 'Home',
    ariaLabel: 'view my dashboard',
  },
  {
    component: <TaskPage />,
    path: '/tasks/:id',
    label: 'Task',
    accessLevel: ['Employee'],
    private: true,
    navBar: false,
    title: 'Task',
    tooltipTitle: 'Task',
    ariaLabel: 'view my task',
  },
  // Auth
  {
    component: <LoginPage />,
    path: '/login',
    label: 'Login',
    accessLevel: ['Employee'],
    private: false,
    navBar: false,
  },
  {
    component: <RegisterPage />,
    path: '/register',
    label: 'Register',
    accessLevel: ['Employee'],
    private: false,
    navBar: false,
  },
];
