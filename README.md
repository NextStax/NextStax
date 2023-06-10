# NextStax API Package Documentation
The NextStax API Package is a convenient tool for developers to interact with the NextStax API programmatically. It provides a set of methods that allow you to perform various operations on NextStax projects, templates, repositories, and more.

##Key Features:

Project Management: Retrieve projects and templates, create new projects, delete projects, and restart projects.
Status Monitoring: Check the status of a specific project.
Domain Management: Update the domain associated with a project.
Repository Management: Get a list of Git repositories associated with the user.

Installation
To use the NextStax API package in your Javascript project, follow these steps:

####1: Install the package using npm:
`npm install nextstax-api`

2: Import the package in your code:
```import NextStax from 'nextstax'```

Instantiate the nextstax class. Starting this will empower the 
Note You need to make a ```.env``` with these
```const apiKey = ''```
```const dropletId = ''```
```const nextstax = new NextStax(apiKey, dropletId)```

#env variable examples
```APIKEY=```
```DROPLETID=``` 

Imagin that your are now able to ask the npm Grab all projects running node services... 

#EXAMPLE USE*
```const projects = await nextstax.getProjects()```

Get your API https://nexstax.com/ 
/v2/settings#billing

3: Set NextStax class with your API key:
`const apiKey = 'YOUR_API_KEY';`
`const nextStax = new NextStax(apiKey);`
