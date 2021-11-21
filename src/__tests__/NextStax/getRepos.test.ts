import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { config as initializeEnvironmentVariables } from 'dotenv'

import NextStax from '../..'
import { Project, Repo } from '../../types'

initializeEnvironmentVariables()

const apiKey = process.env.NEXTSTAX_API_KEY || ''
const dropletId = process.env.NEXTSTAX_DROPLET_ID || ''

describe('Get Repos', () => {
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
    it('should return repos list', async () => {
      const mockRepos: Repo[] = [
        {
          id: 1,
          name: 'Project 1',
        },
        {
          id: 2,
          name: 'Project 2',
        },
      ]
      const mockResponse = {
        status: true,
        data: {
          repos: mockRepos,
        },
      }
      mockApi.onGet('/git/repos').reply(200, mockResponse)
      const repos = await nextstax.getRepos()
      expect(spy).toHaveBeenCalledWith('/git/repos')
      expect(repos).toEqual(mockRepos)
    })
  })

  describe('When the request fails', () => {
    it.todo('handles it gracefully')
  })
})
