import express from 'express'
import prisma from '../connectDB.js';
const projectRouter = express.Router();

// 📂 Project APIs
// POST /projects → Create project (name, ownerId)
projectRouter.post("/projects" , async (req ,res) => {
    try{
        const newProject = await prisma.project.create({
            data: req.body
        })
        res.status(200).json({message:"New Project Created Successfully" , data : newProject});
    }catch(error){
        res.status(400).json({message : error.message})
    }
})


// GET /projects → Get all projects (with owner + tasks optionally)
projectRouter.get( "/projects" , async (req,res) => {
    try {
        const allProjects = await prisma.project.findMany({
            include:{
                owner : true,
                tasks : true 
            }
        })
        res.status(200).json({data : allProjects})
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})


// GET /projects/:id → Get single project with tasks + owner
projectRouter.get( "/projects/:id" , async (req,res) => {
    try {
        const project = await prisma.project.findUnique({
            where : {
                id : Number(req.params.id)
            },include:{
                owner : true,
                tasks : true
            }
        })
        res.status(200).json({data : project})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

// PUT /projects/:id → Update project
projectRouter.put( "/projects/:id" , async (req, res) =>{
    try {
        const updtPeoject = await prisma.project.update({
            where : {
                id : Number(req.params.id)
            }, data : req.body
        })
        res.status(200).json({updatedProject : updtPeoject})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})



// DELETE /projects/:id → Delete project
projectRouter.delete("/projects/:id" , async (req , res) =>{
    try {
        const deletedProject  = await prisma.project.delete({
            where: {
                id : Number(req.params.id)
            }
        })
        res.status(200).json({Message : "Project deleted successfully" , data : deletedProject})
    } catch (error) {
        
    }
})



// GET /users/:id/projects → Get projects owned by a user
projectRouter.get( "/users/:id/projects" , async (req , res) => {
    try {
        const userProjects = await prisma.user.findMany({
            where:{
                id : Number(req.params.id)
            },select :{
                projects : true
            }
        })
        res.status(200).json({data:userProjects})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})





export default projectRouter