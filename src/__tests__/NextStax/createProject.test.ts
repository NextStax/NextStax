import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { config as initializeEnvironmentVariables } from 'dotenv'

import NextStax from '../..'
import { Project, ProjectConfig } from '../../types'

initializeEnvironmentVariables()

const apiKey = process.env.NEXTSTAX_API_KEY || ''
const dropletId = process.env.NEXTSTAX_DROPLET_ID || ''

describe('Create Project', () => {
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
    it('should return project id', async () => {
      const mockId = 123
      const project: ProjectConfig = {
        name: 'test',
        description: 'test',
        project_type: 'html',
      }
      const mockResponse = {
        status: 'success',
        message: 'Successfully created project.',
        resources: {
          id: mockId,
        },
      }
      mockApi.onPost('/projects').reply(200, mockResponse)
      const newProjectId = await nextstax.createProject(project)
      expect(spy).toHaveBeenCalledWith('/projects', project)
      expect(newProjectId).toEqual(mockId)
    })
  })

  describe('When the request fails', () => {
    it('should return -1', async () => {
      const project: ProjectConfig = {
        name: 'test',
        description: 'test',
        project_type: 'html',
      }
      const mockResponse = {
        status: 'error',
        message: 'Error creating project.',
        resources: null,
      }
      mockApi.onPost('/projects').reply(200, mockResponse)
      const newProjectId = await nextstax.createProject(project)
      expect(spy).toHaveBeenCalledWith('/projects', project)
      expect(newProjectId).toEqual(-1)
    })
  })
})
