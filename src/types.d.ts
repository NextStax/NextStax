export type ProjectType = '' | 'nextjs' | 'nodejs' | 'react-16.8' | 'angular-4' | 'html'

export type DefaultCommands = {
  install: string
  build: string
  start: string
}

export type DefaultDirectories = {
  root: string
  output: string
}

export interface ProjectConfig {
  name: string
  description?: string
  project_type: ProjectType
  is_template?: boolean
  template_id?: number // include to clone a template
  clone_url?: string // include to clone a github repo
  env_variables?: string
  commands?: DefaultCommands
  directories?: DefaultDirectories
}

export interface Project extends ProjectConfig {
  id: number
  dns_entry?: string
  droplet_id?: number
  created_at?: string
  updated_at?: string
  user_id?: number
  status?: string
  active?: boolean
  template_name?: string
  avatar?: { url: string | null }
}

export interface Repo {
  id: number
  name?: string
  full_name?: string
  private?: boolean
  html_url?: string
  description?: string
  url?: string
  collaborators_url?: string
  teams_url?: string
  created_at?: string
  updated_at?: string
  pushed_at?: string
  git_url?: string
  ssh_url?: string
  clone_url?: string
  svn_url?: string
}
