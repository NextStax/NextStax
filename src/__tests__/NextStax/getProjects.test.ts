import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { config as initializeEnvironmentVariables } from 'dotenv'

import NextStax from '../..'
import { Project } from '../../types'

initializeEnvironmentVariables()

const apiKey = process.env.NEXTSTAX_API_KEY || ''
const dropletId = process.env.NEXTSTAX_DROPLET_ID || ''

describe('Get Projects', () => {
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
      const mockProjects: Project[] = [
        {
          id: 1,
          name: 'Project 1',
          project_type: 'nextjs',
        },
        {
          id: 2,
          name: 'Project 2',
          project_type: 'html',
        },
      ]
      const mockResponse = {
        status: true,
        data: {
          projects: mockProjects,
        },
      }
      mockApi.onGet('/projects').reply(200, mockResponse)
      const projects = await nextstax.getProjects()
      expect(spy).toHaveBeenCalledWith('/projects')
      expect(projects).toEqual(mockProjects)
    })
  })

  describe('When the request fails', () => {
    it('should return empty projects list', async () => {
      mockApi.onGet('/projects').reply(200, { status: 'error', message: 'Error' })
      const projects = await nextstax.getProjects()
      expect(spy).toHaveBeenCalledWith('/projects')
      expect(projects).toEqual([])
    })
  })
})
