import Layout from '@/layout'

//老师课程相关路由
const teacherRouter = [
  {
    path: '/Thomework',
    component: Layout,
    name: 'Thomework',
    meta: { roles: ['5'], title: '作业管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'distribute',
        name: 'Distribute',
        component: () => import('@/views/table/index'),
        meta: { title: '发布作业', icon: 'table' }
      },
      {
        path: 'distributed',
        name: 'Distributed',
        component: () => import('@/views/table/index'),
        meta: { title: '已发布作业', icon: 'table' }
      },
      {
        path: 'box',
        name: 'box',
        component: () => import('@/views/table/index'),
        meta: { title: '草稿箱', icon: 'table' }
      }
    ]
  },
  {
    path: '/email',
    component: Layout,
    children: [
      {
        path: 'email',
        name: 'Email',
        component: () => import('@/views/form/index'),
        meta: { roles: ['5'], title: '信箱', icon: 'form' }
      }
    ]
  },
  {
    path: '/Tgraph',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Tgraph',
        component: () => import('@/views/form/index'),
        meta: { roles: ['5'], title: '成绩统计图', icon: 'form' }
      }
    ]
  },
]
export default teacherRouter