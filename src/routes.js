import { Services } from './services.js'
import { buildRoutePath } from './utils/build-route-path.js'

const services = new Services()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: services.getService,
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: services.postService,
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: services.putService,
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: services.deleteService,
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: services.patchService,
  },
]
