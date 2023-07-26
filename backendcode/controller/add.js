const alldetails = require('../models/define');

//adding new record into a database table using add method
//first step:
//how we can add means we need to first get the values of form fields like name,email,phone (req.body holds all these variables)
//we we make an http request(means when we click on submit button) forms fileds like expens,descript,categ values stored in an request.body

exports.addexpense = async(req,res,next) =>{
    try{
        const expens = req.body.expens;
        const descript = req.body.descript;
        const categ = req.body.categ;
        console.log('from req.body>>>>>',expens,descript,categ);

//second step:
//Use the addexpense.create() method to create a new addexpense record in the database with the extracted values.
//Await the completion of the create() method and assign the result to the data variable

        const data = await alldetails.create({
            expens:expens,
            descript:descript,
            categ:categ,
            userId:req.user.id  
            //when we make an post request url along with in headers we are passing token
            //backend will recieves token and in the middleware we are dcrypting the token so we will get userId
            //from the userId you will comes to know that who is logged in
            //when we are adding the expenses what we have to do means in expense.create method just add the userId:req.user.id that's it 

        })
        res.json({expensedata:data});
        console.log('res from addexpense method',data);
    } catch(error){
        res.json({Error:error});
        console.log('error from addexpense method',error);
    }
}

//1st step
// the code calls user.findAll() to retrieve data. 
//It assumes that there is a user model or database table defined and connected.

//2nd step:
//The retrieved data is then transformed using the map method. 
//For each user object, a new object is created with additional properties, 
//including an _id property that corresponds to the id property of the original user object.
//The transformed data is stored in the modifiedData variable.

//3rd step:
//Finally, the res.json() method is used to send a JSON response back to the client. 
//It sends an object with a property named alluser, which contains the modifiedData array.

exports.getexpense = async (req,res,next) =>{
    try{
        const data=await alldetails.findAll({where:{userId:req.user.id}}); //{where:{userId:req.user.id}}
        //when we make an get request url along with in headers we are passing token
        //backend will recieves token and in the middleware we are dcrypting the token so we will get userId
        //from the userId backend will comes to know that who's loggedin and backend get the respective user's expense from expense table
        //it send this expense as a respond back to the client
        res.json({getexpense:data});
        console.log('res from getexpense method',data);
    }catch(error){
        res.json({Error:error})
        console.log('error from getexpense method',error);
    }
}


exports.deleteexpense = async (req,res) =>{
    try{
        console.log('params id',req.params.id);
        if(!req.params.id){
            throw new error('id is mandatory to delete');
        }
        const detailsId = req.params.id;
        const data  = await alldetails.destroy({where:{id:detailsId, userId:req.user.id}});
            //when we make an delete request url along with in headers we are passing token
            //backend will recieved token and in the middleware we are dcrypting the token so we will get userId
            //in expense.destroy where we also pass userId:req.user.id
            //i cannot delete others added expenses in the app,they also not able to delete my added expenses
            //if u want to check this means expense.finAll() keep it like this only so we can get all added expenses
        res.json({deleted:data});
    }catch(error){
        res.json({Error:error});
        console.log('error from delete expense method',error);
    }
}

/*
exports.editexpense = async (req,res) =>{
    try{
        console.log('params id',req.params.id);
        if(!req.params.id){
            throw new error('id is mandatory to delete');
        }
        const detailsId = req.params.id;
        const data  = await alldetails.destroy({where:{id:detailsId}});
        res.json({deleted:data});
    }catch(error){
        res.json({Error:error});
        console.log('error from delete expense method',error);
    }
}  */