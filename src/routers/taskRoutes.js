import express from "express"
import prisma from "../connectDB.js"

const taskRoutes = express.Router();

// ✅ Task APIs
// POST /tasks → Create task (title, status, projectId, assigneeId?)
taskRoutes.post("/tasks" , async (req,res) => {
    try {
        const newTask = await prisma.task.create({
            data:req.body
        })
        res.status(200).json({Message:"new task added successfully" , data:newTask})
    } catch (error) {
        res.status(400).json({Message:error.message})
    }
})


// GET /tasks → Get all tasks (filter by status, projectId, assigneeId)
taskRoutes.get("/tasks" , async (req,res) => {
    try {
        const taskList = await prisma.task.findMany({
             select : {
                status : true,
                projectId : true,
                assigneeId : true
             }
        })
        res.status(200).json({data : taskList})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})


// GET /tasks/:id → Get single task (with project + assignee)
taskRoutes.get("/tasks/:id" , async (req,res) => {
    try {
        const task = await prisma.task.findUnique({
             include : {
                project : true,
                assignee : true
             }
        })
        res.status(200).json({data : task})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})



// PUT /tasks/:id → Update task (title, status, assignee, etc.)
taskRoutes.put("/tasks/:id" , async (req , res ) => {
   try {
     const updteTask  = await prisma.task.update({
         where : {
             id : Number(req.params.id)
         },
         data : req.body
     })
     res.status(200).json({data : updteTask})
   } catch (error) {
     res.status(400).json({message:error.message})
   }
})


// PATCH /tasks/:id/status → Update only status
taskRoutes.patch("/tasks/:id/status" , async (req , res ) => {
   try {
     const updteTask  = await prisma.task.update({
         where : {
             id : Number(req.params.id)
         },
         data :{
            status : req.body
         }
     })
     res.status(200).json({data : updteTask})
   } catch (error) {
     res.status(400).json({message:error.message})
   }
})


// DELETE /tasks/:id → Delete task
taskRoutes.delete("/tasks/:id" , async(req,res) => {
    const deletedUser = await prisma.task.delete({
        where:{
            id : Number(req.params.id)
        }
    })
    res.status(200).json({message:"task Deleted Successfully", data:deletedTask})
})

// GET /projects/:id/tasks → Get all tasks under a project
taskRoutes.get( "/projects/:id/tasks" , async (req , res) => {
    try {
        const projectsTasks = await prisma.project.findMany({
            where:{
                id : Number(req.params.id)
            },select :{
                tasks : true
            }
        })
        res.status(200).json({data:projectsTasks})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})



// GET /users/:id/tasks → Get all tasks assigned to a user
taskRoutes.get( "/users/:id/tasks" , async (req , res) => {
    try {
        const usersTask = await prisma.task.findMany({
            where:{
                assigneeId : Number(req.params.id)
            },
        })
        res.status(200).json({data:usersTask})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})


export default taskRoutes