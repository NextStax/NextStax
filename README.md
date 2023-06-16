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
To use the NextStax API package in your Javascript project, follow these steps:

### 1: Install the package using npm:

`npm install nextstax`

### 2: Import the package in your code:

```import NextStax from 'nextstax'```

### Instantiate the nextstax class.

```
const apiKey = 'key'

const dropletId = 'id'

const nextstax = new NextStax(apiKey, dropletId)
```

### .env  examples  
**Note You need to make a ```.env``` with these**

```
## Account-Generated
APIKEY=JLSKJAFH:AJKDLHAOIW
## deploy-to-machine-ip
dropletId=192.168.0.000
```

Get your API keys via nextstax.com.

3: Set NextStax class with your API key:

`const apiKey = 'YOUR_API_KEY';`
`const nextStax = new NextStax(apiKey);`

### EXAMPLE 

```const projects = await nextstax.getProjects()```

## Usage
The NextStax API package provides methods to interact with the NextStax API. Here are the available methods:

```getProjects()
``` 
Retrieves a list of projects associated with the authenticated user.
Example:
```const projects = await nextStax.getProjects();
console.log(projects);
````

```getTemplates```()
Retrieves a list of template projects associated with the authenticated user.

Example:
```
const templates = await nextStax.getTemplates();
console.log(templates);
```

```getProjectStatus```(projectId)
Retrieves the status of a specific project.

Parameters:
```projectId``` (string): The ID of the project.

Example:

```
const projectId = 'PROJECT_ID';
const status = await nextStax.getProjectStatus(projectId);
console.log(status);
```

```createProject(newProject)
```

#Creates a new project.
Parameters:
```newProject``` (object): The project configuration object.

Example:
```
const newProject = {
  name: 'New Project',
  // Add other required project configuration properties
};
```
const projectId = await nextStax.createProject(newProject);
console.log(projectId);

```deleteProject(projectId)```

#Deletes a project from your nexstax

Parameters:

```projectId``` (string): The ID of the project to delete.
Example:

```const projectId = 'PROJECT_ID';
const success = await nextStax.deleteProject(projectId);
console.log(success);```


```getRepos()
```
Retrieves a list of Git repositories associated with the authenticated user.

Example:

```
const repos = await nextStax.getRepos();
console.log(repos);
restartProject(projectId)
Restarts a project.
```

Parameters:
```projectId``` (string): The ID of the project to restart.

```
Example:
const projectId = ```'PROJECT_ID';```
const success = await nextStax.restartProject(projectId);
console.log(success);
```

updateProjectDomain(`projectId`, `domain`)
## Updates the domain of a project.

Parameters:

```projectId``` (string): The ID of the project to update.
```domain``` (string): The new domain for the project.

Example:
```
const projectId = 'PROJECT_ID';
const domain = 'example.com';
const success = await nextStax.updateProjectDomain(projectId, domain);
console.log(success);
```
## Notes
All methods are asynchronous and return Promises.
Errors are logged to the console. Make sure to handle errors appropriately in your code.
