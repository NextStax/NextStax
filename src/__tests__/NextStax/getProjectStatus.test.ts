import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { config as initializeEnvironmentVariables } from 'dotenv'

import NextStax from '../..'
import { Project } from '../../types'

initializeEnvironmentVariables()

const apiKey = process.env.NEXTSTAX_API_KEY || ''
const dropletId = process.env.NEXTSTAX_DROPLET_ID || ''

describe('Get Project Status', () => {
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
    it('should return project status', async () => {
      const mockResponse = {
        status: true,
        data: {
          status: 'enabled',
        },
      }
      const projectId = 1
      mockApi.onGet(`/projects/${projectId}/status`).reply(200, mockResponse)
      const status = await nextstax.getProjectStatus(projectId)
      expect(spy).toHaveBeenCalledWith(`/projects/${projectId}/status`)
      expect(status).toEqual('enabled')
    })
  })

  describe('When the request fails', () => {
    it("should return '-1'", async () => {
      const mockResponse = {
        status: 404,
        data: undefined,
      }
      const projectId = 1
      mockApi.onGet(`/projects/${projectId}/status`).reply(404, mockResponse)
      const status = await nextstax.getProjectStatus(projectId)
      expect(spy).toHaveBeenCalledWith(`/projects/${projectId}/status`)
      expect(status).toEqual('-1')
    })
  })
})
