import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { config as initializeEnvironmentVariables } from 'dotenv'

import NextStax from '../..'
import { Project } from '../../types'

initializeEnvironmentVariables()

const apiKey = process.env.NEXTSTAX_API_KEY || ''
const dropletId = process.env.NEXTSTAX_DROPLET_ID || ''

describe('Get Templates', () => {
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
    it('should return templates list', async () => {
      const mockTemplates: Project[] = [
        {
          id: 1,
          name: 'Template 1',
          project_type: 'nextjs',
          is_template: true,
        },
        {
          id: 2,
          name: 'Template 2',
          project_type: 'html',
          is_template: true,
        },
      ]
      const mockResponse = {
        status: true,
        data: {
          projects: mockTemplates,
        },
      }
      mockApi.onGet('/projects').reply(200, mockResponse)
      const templates = await nextstax.getTemplates()
      expect(spy).toHaveBeenCalledWith('/projects')
      expect(templates).toEqual(mockTemplates)
    })
  })

  describe('When the request fails', () => {
    it('should return empty templates list', async () => {
      mockApi.onGet('/projects').reply(200, { status: 'error', message: 'Error' })
      const templates = await nextstax.getTemplates()
      expect(spy).toHaveBeenCalledWith('/projects')
      expect(templates).toEqual([])
    })
  })
})
