import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import EmployeeList from '@/components/EmployeeList.vue'
import EmployeeCheckins from '@/components/EmployeeCheckins.vue'
const routes = [{
        path: '/',
        redirect: '/employees'
    },
    {
        path: '/employees',
        name: 'EmployeeList',
        component: EmployeeList
    },
    {
        path: '/employee-checkins/:employeeId',
        name: 'EmployeeCheckins',
        component: EmployeeCheckins
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
      }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router