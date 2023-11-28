import axios, { AxiosRequestHeaders } from 'axios'
import { Project, ProjectConfig } from './types'
export * from "./types"

export const BASE_URL = 'https://oneclickwebapps.com/v2/api'

export default class NextStax {
  private readonly apiKey: string
  public dropletId: string
  public headers: AxiosRequestHeaders

  constructor(apiKey: string, dropletId: string = '') {
    this.apiKey = apiKey
    this.dropletId = dropletId
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Auth-Token': this.apiKey,
    }
    axios.defaults.baseURL = BASE_URL
    axios.defaults.headers.common = this.headers
  }

  async getProjects() {
    let projects: Project[] = []
    try {
      const response = await axios.get('/projects')
      const { status, data } = response.data
      if (status === true) projects = data.projects
    } catch (error) {
      console.error(error)
    }
    return projects
  }

  async getTemplates() {
    let templates: Project[] = []
    try {
      const projects = await this.getProjects()
      if (projects.length > 0) {
        templates = projects.filter((project: Project) => project.is_template)
      }
    } catch (error) {
      console.error(error)
    }
    return templates
  }

  async getProjectStatus(projectId: Project['id']) {
    let _status: Project['status'] = '-1'
    try {
      const response = await axios.get(`/projects/${projectId}/status`)
      const { status, data } = response.data
      if (status === true) _status = data.status
    } catch (error: any) {
      if (error.response.status !== 404) console.error(error)
    }
    return _status
  }

  async createProject(newProject: ProjectConfig): Promise<Project['id']> {
    let projectId: Project['id'] = -1
    try {
      const response = await axios.post('/projects', newProject)
      const { status, resources } = response.data
      if (status === 'success') projectId = resources.id
    } catch (error) {
      console.error(error)
    }
    return projectId
  }

  async deleteProject(projectId: Project['id']) {
    try {
      const response = await axios.delete('/projects', { data: { ids: projectId } })
      const { status } = response.data
      if (status === 'success') return true
    } catch (error) {
      console.error(error)
    }
    return false
  }

  async getRepos() {
    let repos: Project[] = []
    try {
      const response = await axios.get('/git/repos')
      const { status, data } = response.data
      if (status === true) repos = data.repos
    } catch (error) {
      console.error(error)
    }
    return repos
  }

  async restartProject(projectId: Project['id']) {
    try {
      const response = await axios.get(`/projects/${projectId}/restart`)
      const { status } = response.data
      if (status === 'success') return true
    } catch (error) {
      console.error(error)
    }
    return false
  }

  async updateProjectDomain(projectId: Project['id'], domain: string) {
    try {
      const response = await axios.post(`/projects/${projectId}/update_project_domain`, { dns_entry: domain })
      const { status } = response.data
      if (status === 'success') return true
    } catch (error) {
      console.error(error)
    }
    return false
  }
}
