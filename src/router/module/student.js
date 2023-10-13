import Layout from '@/layout'

//学生课程相关路由
const studentRouter = [
  {
    path: '/example',
    component: Layout,
    name: 'Example',
    meta: { roles: ['4'], title: '课程作业', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '提交作业', icon: 'table' }
      }
    ]
  },
  {
    path: '/evaluation',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Eva',
        component: () => import('@/views/form/index'),
        meta: { roles: ['4'], title: '互评作业', icon: 'form' }
      }
    ]
  },
  {
    path: '/graph',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'graph',
        component: () => import('@/views/form/index'),
        meta: { roles: ['4'], title: '成绩统计图', icon: 'form' }
      }
    ]
  },
]
export default studentRouter