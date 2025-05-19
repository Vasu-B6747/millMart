import Equipment from "../models/EquipmentModel.js"
import paginateQuery from '../Utils/paginate.js'
import cloudinary from '../Utils/cloudinary.js'
import {validationResult} from 'express-validator'
import sendEmail from '../Utils/resetEmail.js'
//
const equipmentCtrl={}
//1.create
// equipmentCtrl.create=async(req,res)=>{
//     const errors=validationResult(req)
//     if(!errors.isEmpty()){
//         return res.status(400).json({error:errors.array()})
//     }
//     const {seller,title,description,equipmentType,brand,model,yearManufactured,condition,price,location,photos}=req.body
//     try{
//         const equipment= new Equipment({seller,title,description,equipmentType,brand,model,yearManufactured,condition,price,location,photos})
//         equipment.seller=req.userId
//         await equipment.save()
//         res.status(201).json(equipment)
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error:'Something went wrong'})
//     }
// }


equipmentCtrl.create = async (req, res) => {
    
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const {
    title, description, equipmentType, brand, model,
    yearManufactured, condition, price, location, photos
  } = req.body;
  let locationObj;
  if (typeof location === 'string') {
    try {
      locationObj = JSON.parse(location);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON in location field' });
    }
  } else {
    locationObj = location;
  }
  
  // Validate coordinates
  if (
    !locationObj?.coordinates ||
    !Array.isArray(locationObj.coordinates) ||
    locationObj.coordinates.length !== 2 ||
    isNaN(parseFloat(locationObj.coordinates[0])) ||
    isNaN(parseFloat(locationObj.coordinates[1]))
  ) {
    return res.status(400).json({ error: 'Invalid coordinates in location' });
  }
  try {
    // Upload photos
    // const uploadResults = await Promise.all(
    //   req.files.map(file =>
    //     cloudinary.uploader.upload_stream({ folder: 'equipment' }, (error, result) => {
    //       if (error) throw error;
    //       return result.secure_url;
    //     })(file.buffer)
    //   )
    // );
    const uploadResults = await Promise.all(
        req.files.map(file => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: 'equipment' },
              (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
              }
            );
            stream.end(file.buffer); // Pipe the file buffer into the stream
          });
        })
      );
      
  
    const equipment = new Equipment({
      seller: req.userId,
      title,
      description,
      equipmentType,
      brand,
      model,
      yearManufactured,
      condition,
      price,
      location:{
        type: 'Point',
        coordinates: [
          parseFloat(locationObj.coordinates[0]),
          parseFloat(locationObj.coordinates[1])
        ],
        address: locationObj.address || ''
      },
      photos: uploadResults
    });

    await equipment.save();
    res.status(201).json(equipment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// //2.list


equipmentCtrl.list = async (req, res) => {
    try {
        const queryBuilder = Equipment.find().populate('seller', 'name email');

        const result = await paginateQuery(queryBuilder, {
            page: req.query.page,
            limit: req.query.limit,
            sort: { createdAt: -1 }
        });

        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


// equipmentCtrl.list=async(req,res)=>{
//     try{
//         const equipments=await Equipment.find()
//         res.json(equipments)
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error:'Something went wrong'})
//     }
    
// }

//3.remove
equipmentCtrl.remove=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({error:errors.array()})
    }
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
            return res.status(403).json({ error: 'Unauthorized: You do not have permission to perform this action' });

        }

    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong'})
    }
}

//4.update
equipmentCtrl.update=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({error:errors.array()})
    }
    const id=req.params.id
    const {seller,title,description,equipmentType,brand,model,yearManufactured,condition,price,location,photos}=req.body
    try{
        const Existequipment=await Equipment.findById(id)
        if(!Existequipment){
            return res.status(404).json({error:'Equipment not found'})
        }
        if(Existequipment.seller==req.userId || req.role=='admin'){
            const equipment=await Equipment.findByIdAndUpdate(id, {seller:req.userId,title,description,equipmentType,brand,model,yearManufactured,condition,price,location,photos},{new:true})
            if(!equipment){
                return res.status(404).json({error:'Equipment not found'}) 
            }
            res.json(equipment)
        }else{
            return res.status(403).json({ error: 'Unauthorized: You do not have permission to perform this action' });

        }

    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong'})
    }
}

//5.ShowEquipment
equipmentCtrl.show=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({error:errors.array()})
    }
    const id=req.params.id
    try{
        const equipment=await Equipment.findById(id).populate('seller', 'name email')
        if(!equipment){
            return res.status(404).json({error:'Equipment not found'})
        }
        equipment.views = (equipment.views || 0) + 1;
        await equipment.save();
        res.json(equipment)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong'})
    }
}

//6.Equipments of related sellers
equipmentCtrl.getBySeller=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({error:errors.array()})
    }
    const userId=req.userId
    try{
        const equipments=await Equipment.find({seller:userId}).populate('seller','name')
        res.json(equipments)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong'})
    }
}
//7.search or filter 
equipmentCtrl.search = async (req, res) => {
    const { type, condition, minPrice, maxPrice } = req.query;

    let query = {};
    if (type) query.equipmentType = type;
    if (condition) query.condition = condition;
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    try {
        const result = await paginateQuery(Equipment, query, {
            page: req.query.page,
            limit: req.query.limit,
            sort: { createdAt: -1 }
        });

        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// equipmentCtrl.search = async (req, res) => {
//     const { type, condition, minPrice, maxPrice } = req.query;
//     let query = {};
//     if (type) query.equipmentType = type;
//     if (condition) query.condition = condition;
//     if (minPrice || maxPrice) {
//         query.price = {};
//         if (minPrice) query.price.$gte = Number(minPrice);
//         if (maxPrice) query.price.$lte = Number(maxPrice);
//     }

//     try {
//         const equipments = await Equipment.find(query);
//         res.json(equipments);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Something went wrong' });
//     }
// };

equipmentCtrl.search = async (req, res) => {
    const { type, condition, minPrice, maxPrice } = req.query;

    let filter = {};
    if (type) filter.equipmentType = type;
    if (condition) filter.condition = condition;
    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    try {
        // Just use find() without populate
        const queryBuilder = Equipment.find(filter);

        const result = await paginateQuery(queryBuilder, {
            page: req.query.page,
            limit: req.query.limit,
            sort: { createdAt: -1 }
        });

        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


//8.approval
equipmentCtrl.approve = async (req, res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({error:errors.array()})
    }
    const id=req.params.id
    const {isApproved}=req.body
    try {
        if (req.role !== 'admin'){
             return res.status(403).json({ error: 'Admin only' });
        }

        const equipment = await Equipment.findByIdAndUpdate(id, { isApproved}, { new: true });
        if (!equipment) return res.status(404).json({ error: 'Equipment not found' });

        res.json(equipment);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

//9.verifyEquipment
equipmentCtrl.verify = async (req, res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({error:errors.array()})
    }
    const id=req.params.id
    const {isVerified}=req.body
    try {
        if (req.role !== 'admin') return res.status(403).json({ error: 'Admin only' });

        const equipment = await Equipment.findByIdAndUpdate(id, {isVerified}, { new: true }).populate('seller', 'email')
        if (!equipment) return res.status(404).json({ error: 'Equipment not found' });
        if (req.body.isVerified) {
            const subject = 'Your Equipment is Verified!';
            const textMessage = `Your equipment listing has been verified.\n\nTitle: ${equipment.title}\n\nThank you for using AgriMarket!`;
          
            const emailHTML = `
              <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #2e7d32;">✅ Your Equipment Listing Has Been Verified</h2>
                <p><strong>Title:</strong> ${equipment.title}</p>
                <p>Thank you for using <strong>AgriMarket</strong>!</p>
              </div>
            `;
          
            await sendEmail({
              email: equipment.seller.email,
              subject,
              message: textMessage,
              html: emailHTML
            });
          }
          
        res.json({ message: 'Equipment Verified', equipment });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

//10.nearby
equipmentCtrl.getNearby = async (req, res) => {
    const { lng, lat, distance } = req.query;
    try {
        const equipments = await Equipment.find({
            'location.coordinates': {
                $near: {
                    $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
                    $maxDistance: parseFloat(distance)
                }
            }
        });
        res.json(equipments);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

//11.isSold
equipmentCtrl.markAsSold = async (req, res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({error:errors.array()})
    }
    const id=req.params.id
    try {
        const equipment = await Equipment.findById(id);
        if (!equipment) return res.status(404).json({ error: 'Equipment not found' });

        if (equipment.seller == req.userId || req.role === 'admin') {
            equipment.isSold = true;
            await equipment.save();
            // res.json({ message: 'Marked as sold' });
            res.json(equipment);
        } else {
           return res.status(403).json({ error: 'Unauthorized' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};



export default equipmentCtrl