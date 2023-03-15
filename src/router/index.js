import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../pages/HelloWorld.vue')
    },
    {
      path: '/productos',
      name: 'Productos',
      children: [
        {
          path: '',
          name: 'ProductosList',
          component: () => import('../pages/productos/bandeja-productos.vue')
        },
        {
          path: 'nuevo',
          name: 'ProductoNuevo',
          component: () => import('../pages/productos/nuevo-producto.vue')
        },
        {
          path: 'editar/:id',
          name: 'ProductoEditar',
          component: () => import('../pages/productos/actualizar-producto.vue')
        },
      ],
      component: () => import('../pages/empty-page.vue')
    },
    {
      path: '/categorias',
      name: 'Categorias',
      children: [
        {
          path: '',
          name: 'CategoriasList',
          component: () => import('../pages/categorias/bandeja-categorias.vue')
        },
        {
          path: 'nuevo',
          name: 'CategoriaNuevo',
          component: () => import('../pages/categorias/nuevo-categoria.vue')
        },
        {
          path: 'editar/:id',
          name: 'CategoriaEditar',
          component: () => import('../pages/categorias/actualizar-categoria.vue')
        },
      ],
      component: () => import('../pages/empty-page.vue')
    },
  ]
})

export default router
