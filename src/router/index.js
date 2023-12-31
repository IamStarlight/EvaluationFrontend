import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import studentRouter from './module/student'
import teacherRouter from './module/teacher'
import adminRouter from './module/admin'


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// 这是一个固定的路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/sign',
    component: () => import('@/views/sign/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '个人主页', icon: 'dashboard' }
    }]
  },

]
//这个是动态的路由，使用role配置权限，其他一样
export const asyncRoutes = [
  {
    path: '/course',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Course',
        component: () => import('@/views/course/index'),
        meta: { roles: ['1', '3'], title: '课程', icon: 'form' }
      }
    ]
  },
  {
    path: '/cdash',
    component: Layout,
    children: [
      {
        path: 'show',
        name: 'Course',
        component: () => import('@/views/cdash/index'),
        meta: { roles: ['4', '5'], title: '课程简介', icon: 'form' }
      }
    ]
  },
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
  {
    path: '/admin',
    component: Layout,
    name: 'admin',
    meta: { roles: ['2'], title: '人员管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'pmanage',
        name: 'Pmanage',
        component: () => import('@/views/table/index'),
        meta: { title: '人员管理', icon: 'table' }
      },
      {
        path: 'cmanage',
        name: 'Cmanage',
        component: () => import('@/views/table/index'),
        meta: { title: '课程管理', icon: 'table' }
      }
    ]
  },
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
