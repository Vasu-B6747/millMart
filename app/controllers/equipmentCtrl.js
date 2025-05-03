import Equipment from "../models/EquipmentModel.js"
//
const equipmentCtrl={}
//create
equipmentCtrl.create=async(req,res)=>{
    const {seller,title,description,equimentType,brand,model,yearManufactured,condition,price,location,photos}=req.body
    try{
        const equipment= new Equipment({seller,title,description,equimentType,brand,model,yearManufactured,condition,price,location,photos})
        equipment.seller=req.userId
        await equipment.save()
        res.status(201).json(equipment)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong'})
    }
}
//list 
equipmentCtrl.list=async(req,res)=>{
    try{
        const equipments=await Equipment.find()
        res.json(equipments)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong'})
    }
    
}

//remove
equipmentCtrl.remove=async(req,res)=>{
    const id=req.params.id
    try{
        const Existequipment=await Equipment.findById(id)
        if(!Existequipment){
            return res.status(404).json({error:'Equipment not found'})
        }
        if(Existequipment.seller==req.userId || req.role=='admin'){
            const equipment=await Equipment.findByIdAndDelete(id)
            if(!equipment){
                return res.status(404).json({error:'Equipment not found'}) 
            }
            res.json(equipment)
        }else{
            res.json({message:'You cannot delete this Product/Unauthorized access'})
        }

    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong'})
    }
}

//update
equipmentCtrl.update=async(req,res)=>{
    const id=req.params.id
    const body=req.body
    try{
        const Existequipment=await Equipment.findById(id)
        if(!Existequipment){
            return res.status(404).json({error:'Equipment not found'})
        }
        if(Existequipment.seller==req.userId || req.role=='admin'){
            const equipment=await Equipment.findByIdAndDelete(id)
            if(!equipment){
                return res.status(404).json({error:'Equipment not found'}) 
            }
            res.json(equipment)
        }else{
            res.json({message:'You cannot delete this Product/Unauthorized access'})
        }

    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong'})
    }
}
export default equipmentCtrl