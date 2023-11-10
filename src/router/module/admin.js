import Layout from '@/layout'

//老师课程相关路由
const adminRouter = [
  {
    path: '/admin',
    component: Layout,
    name: 'admin',
    meta: { roles: ['1'], title: '人员管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'pmanage',
        name: 'Pmanage',
        component: () => import('@/views/table/grading.vue'),
        meta: { title: '人员管理', icon: 'table' }
      },
      {
        path: 'cmanage',
        name: 'Cmanage',
        component: () => import('@/views/table/grading.vue'),
        meta: { title: '课程管理', icon: 'table' }
      }
    ]
  },
]
export default adminRouter
