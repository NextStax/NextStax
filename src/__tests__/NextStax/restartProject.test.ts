import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { config as initializeEnvironmentVariables } from 'dotenv'

import NextStax from '../..'
import { Project } from '../../types'

initializeEnvironmentVariables()

const apiKey = process.env.NEXTSTAX_API_KEY || ''
const dropletId = process.env.NEXTSTAX_DROPLET_ID || ''

describe('Restart Project', () => {
  let nextstax: NextStax
  let mockApi: MockAdapter
  let spy: jest.SpyInstance

  beforeAll(() => {
    nextstax = new NextStax(apiKey, dropletId)
    mockApi = new MockAdapter(axios)
    spy = jest.spyOn(axios, 'get')
  })

  afterEach(() => {
    mockApi.reset()
    spy.mockClear()
  })
  describe('When the request is successful', () => {
    it('should return projects list', async () => {
      const projectId = 1
      const mockResponse = {
        status: 'success',
        message: 'Restarted Successfully.',
        resources: null,
      }
      mockApi.onGet(`/projects/${projectId}/restart`).reply(200, mockResponse)
      const wasSuccessful = await nextstax.restartProject(projectId)
      expect(spy).toHaveBeenCalledWith(`/projects/${projectId}/restart`)
      expect(wasSuccessful).toBeTruthy()
    })
  })

  describe('When the request fails', () => {
    it.todo('should handle it gracefully')
  })
})
