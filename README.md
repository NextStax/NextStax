# NextStax API NPM Package Documentation

The NextStax API Package is a convenient tool for developers to interact with the NextStax API programmatically. It provides a set of methods that allow you to perform various operations on NextStax projects, templates, repositories, and more.

## Introduction

The NextStax API allows you to manage your NextStax projects, templates, and Git repositories programmatically. With the NextStax API Package, you can integrate NextStax functionality seamlessly into your JavaScript projects, automate workflows, and leverage the power of NextStax programmatically.

## Key Features:

- Project Management: Retrieve projects and templates, create new projects, delete projects, and restart projects.
- Status Monitoring: Check the status of a specific project.
- Domain Management: Update the domain associated with a project.
- Repository Management: Get a list of Git repositories associated with the user.

## Installation:
To use the NextStax API package in your Javascript/Typescript project, follow these steps:

### 1: Get your API key via nextstax.com

### 1: Add to or create a .env file with your NextStax API key and droplet id 
```sh
# .env
API_KEY="12345"
DROPLET_ID="00-abcd.vce.oneclickwebapps.com"
```

### 2: Install the package using npm:

`npm install nextstax`

### 3: Create your index.js file

```ts
// index.js / index.ts

// Import the package in your code
import NextStax from 'nextstax'

// Get your env variables
const apiKey = process.env['API_KEY']
const dropletId = process.env['DROPLET_ID']

// Instantiate the nextstax class
const nextstax = new NextStax(apiKey, dropletId)
```
---

## Usage
The NextStax API package provides methods to interact with the NextStax API. Here are the available methods:

### getProjects()
Retrieves a list of projects associated with the authenticated user.

```ts
const projects = await nextStax.getProjects();
console.log(projects);
```
---

### getTemplates()
Retrieves a list of template projects associated with the authenticated user.

```ts
const templates = await nextStax.getTemplates();
console.log(templates);
```
---

### getProjectStatus(projectId: string)
Retrieves the status of a specific project.

```ts
const projectId = 'PROJECT_ID';
const status = await nextStax.getProjectStatus(projectId);
console.log(status);
```
---

### createProject(newProject: object) 
Creates a new project.

```ts
const newProject = {
  name: 'New Project',
  // Add other required project configuration properties
};
const projectId = await nextStax.createProject(newProject);
console.log(projectId);
```
---

### deleteProject(projectId: string) 
Deletes a project from your nexstax

```ts
const projectId = 'PROJECT_ID';
const success = await nextStax.deleteProject(projectId);
console.log(success);
```
---

### getRepos() 
Retrieves a list of Git repositories associated with the authenticated user.

```ts
const repos = await nextStax.getRepos();
console.log(repos);
```
---

### restartProject(projectId: string)
Restarts a project.

```ts
const projectId = 'PROJECT_ID';
const success = await nextStax.restartProject(projectId);
console.log(success);
```
---

### updateProjectDomain(projectId: string, newDomain: string)
Updates the domain of a project.

```ts
const projectId = 'PROJECT_ID';
const newDomain = 'example.com';
const success = await nextStax.updateProjectDomain(projectId, newDomain);
console.log(success);
```
---

## Notes
All methods are asynchronous and return Promises.
Errors are logged to the console. Make sure to handle errors appropriately in your code.
