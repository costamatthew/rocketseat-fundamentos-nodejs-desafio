import { randomUUID } from 'node:crypto'
import { Database } from './database.js'

const database = new Database()

export class Services {
  async getService(req, res) {
    const { search } = req.query

    const tasks = database.select(
      'tasks',
      search
        ? {
            title: search,
            description: search,
          }
        : null
    )

    return res.end(JSON.stringify(tasks))
  }

  async postService(req, res) {
    const { title, description } = req.body

    const task = {
      id: randomUUID(),
      title,
      description,
      created_at: Date.now(),
      updated_at: Date.now(),
      completed_at: null,
    }

    database.insert('tasks', task)

    return res.writeHead(201).end()
  }

  async putService(req, res) {
    const { id } = req.params
    const { title, description } = req.body

    switch (req.body) {
      case title && !description:
        database.update('tasks', id, {
          title,
        })
        break

      case description && !title:
        database.update('tasks', id, {
          description,
        })
        break

      default:
        database.update('tasks', id, {
          title,
          description,
        })
        break
    }

    return res.writeHead(204).end()
  }

  async deleteService(req, res) {
    const { id } = req.params

    database.delete('tasks', id)

    return res.writeHead(204).end()
  }

  async patchService(req, res) {
    const { id } = req.params

    database.update('tasks', id, {
      completed_at: Date.now(),
    })

    return res.writeHead(204).end()
  }
}
