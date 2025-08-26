import express from "express"
import prisma from "../connectDB.js";
const userRouter = express.Router();

userRouter.post('/users' , async( req , res ) => {
    try {
        const user =  await prisma.user.create({
            data : req.body
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error)
    }
})
userRouter.get("/users" , async (req,res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
    
})

// GET /users/:id → Get user with their projects and tasks
userRouter.get("/users/:id" , async(req,res) => {
    console.log(req.params.id)
    try {
        const userDetails  = await prisma.user.findMany({
            where:{
                id : Number(req.params.id)
            },
            include:{
                projects: true,
                tasks : true
            }
        })
        res.status(200).json({data : userDetails})
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})
// PUT /users/:id → Update user
userRouter.put("/users/:id" , async (req , res) => {
    
    try {
        const isUserPresent = await prisma.user.findUnique({
            where : {
                id : Number(req.params.id)
            },
        })
        if(!isUserPresent) throw new Error ("user not present with this id");
        const updtUser = await prisma.user.update({
            where : {
                id : Number(req.params.id)
            },
            data: req.body
        })
        res.status(200).json({data:updtUser})
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})
// DELETE /users/:id → Delete user

userRouter.delete("/users/:id" , async(req,res) => {
    console.log(req.params.id)
    const deletedUser = await prisma.user.delete({
        where:{
            id : Number(req.params.id)
        }
    })
    res.status(200).json({message:"user Deleted Successfully", data:deletedUser})
})
export default userRouter