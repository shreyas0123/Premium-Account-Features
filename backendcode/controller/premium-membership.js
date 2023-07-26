const User = require('../models/signup');
const Expense = require('../models/define');
const sequelize = require('../util/database');

exports.premiumFeature=async(req,res,next)=>{
    try{
        // This is the main query that fetches data from the User model (users table) 
        //and includes associated data from the Expense model (expenses table).From this table how means we created association rules between User table and Expense table and we sets up an foreign key relation
       const leaderBoardofUser= await User.findAll({
        //Retreiving id,name from User table and defining aggregate function called "sum",for this we need to specify table and its column name here "expenses" table name, column name "expsne"
        //total_amount is the name given for sum value
        //include: we have used because for the aggregate function we need to specify on which table colum i need to perform aggregate
        attributes:["id","name",[sequelize.fn("sum",sequelize.col("expenses.expens")),"total_amount"]],
            include:[
                {
                    model:Expense,
                    attributes:[]
                }
            ],
            //by default groupBy will use left outer join. 
            //The LEFT OUTER JOIN clause is used to join the users table with the expenses table based on the userId and id columns, respectively.
            //left column will be User table and right column will be expense table
            //left join what happens means all the column included from the Users table and only matched column that is ('id') from the expense table included
            //because there is connection between id column from users table and userid column from expense table (here we have foreign key elationship)
            //we are grouping the same userid all together at this time aggregate function will perform "SUM" method i.e whererver id is same sum those id's expense and stored in an total_amount column
            // total_amount where amount needs to be in descending order.
            group:["users.id"],
            order:[["total_amount","DESC"]]
        })
        res.json(leaderBoardofUser)
    }catch(err){
        console.log('error in premiumFeature-->',err)
        res.json({Error:err})
    }
}