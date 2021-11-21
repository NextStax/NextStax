import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { config as initializeEnvironmentVariables } from 'dotenv'

import NextStax from '../..'
import { Project, ProjectConfig } from '../../types'

initializeEnvironmentVariables()

const apiKey = process.env.NEXTSTAX_API_KEY || ''
const dropletId = process.env.NEXTSTAX_DROPLET_ID || ''

describe('Update Project Domain', () => {
  let nextstax: NextStax
  let mockApi: MockAdapter
  let spy: jest.SpyInstance

  beforeAll(() => {
    nextstax = new NextStax(apiKey, dropletId)
    mockApi = new MockAdapter(axios)
    spy = jest.spyOn(axios, 'post')
  })

  afterEach(() => {
    mockApi.reset()
    spy.mockClear()
  })

  describe('When the request is successful', () => {
    it('should return true', async () => {
      const projectId = 1
      const domain = 'example.com'
      const mockResponse = {
        status: 'success',
        message: 'DNS entry getting updated.',
        resources: null,
      }
      mockApi.onPost(`/projects/${projectId}/update_project_domain`).reply(200, mockResponse)
      const wasSuccessful = await nextstax.updateProjectDomain(projectId, domain)
      expect(spy).toHaveBeenCalledWith(`/projects/${projectId}/update_project_domain`, { dns_entry: domain })
      expect(wasSuccessful).toBeTruthy()
    })
  })

  describe('When the request fails', () => {
    it.todo('should return false')
  })
})
