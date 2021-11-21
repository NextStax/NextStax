import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { config as initializeEnvironmentVariables } from 'dotenv'

import NextStax from '../..'
import { Project, ProjectConfig } from '../../types'

initializeEnvironmentVariables()

const apiKey = process.env.NEXTSTAX_API_KEY || ''
const dropletId = process.env.NEXTSTAX_DROPLET_ID || ''

describe('Delete Project', () => {
  let nextstax: NextStax
  let mockApi: MockAdapter
  let spy: jest.SpyInstance

  beforeAll(() => {
    nextstax = new NextStax(apiKey, dropletId)
    mockApi = new MockAdapter(axios)
    spy = jest.spyOn(axios, 'delete')
  })

  afterEach(() => {
    mockApi.reset()
    spy.mockClear()
  })

  describe('When the request is successful', () => {
    it('should return true', async () => {
      const projectId = 1
      const mockResponse = {
        status: 'success',
        message: 'Successfully destroyed projects.',
        resources: null,
      }
      mockApi.onDelete('/projects').reply(200, mockResponse)
      const wasSuccessful = await nextstax.deleteProject(projectId)
      expect(spy).toHaveBeenCalledWith('/projects', { data: { ids: projectId } })
      expect(wasSuccessful).toBeTruthy()
    })
  })

  describe('When the request fails', () => {
    it.todo('should return false')
  })
})
