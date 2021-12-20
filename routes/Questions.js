const express= require("express");
const router= express.Router();
const subjective = require("../models/Subjective")
const objective = require("../models/Objective");
const Subjective = require("../models/Subjective");
const Objective = require("../models/Objective");




router.get("/questions/subjective" , async(req,res)=>{
try{

    const question = await Subjective.find()
    return res.status(200).json(question)
}
catch(error){
    console.log(error)
    return res.status(500).json({"error":error})
}
})

router.get("/questions/objective" , async(req,res)=>{
    try{
    
        const question = await Objective.find()
        return res.status(200).json(question)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({"error":error})
    }
    })


router.get("/questions/subjective/:id" , async(req,res)=>{
    try{
    const _id = req.params.id
    const question= await Subjective.findOne({_id})
    if(!question){
        return res.status(404).json({})
    } 
    else{
        return res.status(200).json(question)
    }
    }
    catch(error){
        return res.status(500).json({"error":error})   
    }
})

router.get("/questions/objective/:id" , async(req,res)=>{
    try{
    const _id = req.params.id
    const question= await Objective.findOne({_id})
    if(!question){
        return res.status(404).json({})
    } 
    else{
        return res.status(200).json(question)
    }
    }
    catch(error){
        return res.status(500).json({"error":error})   
    }
})





router.post("/questions/subjective" , async(req,res)=>{
    console.log(req.body)
    try{
        const { description } = req.body;
        const { answer } = req.body;
        console.log(description , answer)
        const subjective = await Subjective.create({
            description,
            answer
        })
        return res.status(201).json(subjective)

    }catch(error){
        console.log(error)
        return res.status(500).json({"error":error})
    }

})


router.post("/questions/objective" , async (req,res)=>{
    console.log(req.body)
    try{
    const {description} = req.body
    const { alternatives } = req.body

    const objective= await Objective.create({
        description,
        alternatives
    })
    console.log(description , alternatives)
    return res.status(201).json(objective)

    }catch(error){
        console.log(error)
        return res.status(500).json({"error":error})
    }

})

// router.post("/questions/subjective/:id" , (req,res)=>{
    
// })

// router.post("/questions/objective/:id" , (req,res)=>{
    
// })



router.put('/questions/subjective/:id' , async(req,res)=>{
    try{
        const _id = req.params.id;
        const { description }= req.body
        console.log(_id,description)
        // const { answer } =req.body
        let question = await Subjective.findOne({_id})
        if(!question)
        {
            question = await Subjective.create({
                description
            })
            return res.status(201).json(question)
        }else{
            console.log(question)
            question.description = description
            await question.save()
            return res.status(200).json(question)
        }

    }catch(error){
        return res.status(500).json({"error":error})
    }
})



router.put('/questions/objective/:id' , async(req,res)=>{
    try{
        const _id = req.params.id;
        const { description }= req.body
         const { alternatives } =req.body
        let question = await Objective.findOne({_id})
        if(!question)
        {
            question = await Objective.create({
                description,
                alternatives
            })
            return res.status(201).json(question)
        }else{
            question.description = description
            question.alternatives = alternatives
            await question.save()
            return res.status(200).json(question)
        }

    }catch(error){
        return res.status(500).json({"error":error})
    }
})





router.delete("/questions/subjective/:id" , async(req,res)=>{
    try {
        const _id = req.params.id 

        const question = await Subjective.deleteOne({_id})

        if(question.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})


router.delete("/questions/objective/:id" , async(req,res)=>{
    try {
        const _id = req.params.id 

        const question = await Objective.deleteOne({_id})

        if(question.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

router.get("/" , (req,res)=>{
    res.send("Hello World")
})










module.exports=router