👤 User APIs
POST /users → Create user (name, email)  -> Done
GET /users → Get all users  -> Done
GET /users/:id → Get user with their projects and tasks
PUT /users/:id → Update user
DELETE /users/:id → Delete user


📂 Project APIs
POST /projects → Create project (name, ownerId)
GET /projects → Get all projects (with owner + tasks optionally)
GET /projects/:id → Get single project with tasks + owner
PUT /projects/:id → Update project
DELETE /projects/:id → Delete project
GET /users/:id/projects → Get projects owned by a user


✅ Task APIs
POST /tasks → Create task (title, status, projectId, assigneeId?)
GET /tasks → Get all tasks (filter by status, projectId, assigneeId)
GET /tasks/:id → Get single task (with project + assignee)
PUT /tasks/:id → Update task (title, status, assignee, etc.)
PATCH /tasks/:id/status → Update only status
DELETE /tasks/:id → Delete task
GET /projects/:id/tasks → Get all tasks under a project
GET /users/:id/tasks → Get all tasks assigned to a user