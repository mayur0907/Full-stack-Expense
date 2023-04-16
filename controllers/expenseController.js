const Expense = require('../modal/expenseModal')
const path = require('path')
const rootDir = require('../util/path')

exports.saveToStorage = async(req,res,next) =>{
    // console.log("inside  saveToStorage function")
    // console.log(req.body)

    const amount = req.body.amountAdd
    const description = req.body.descriptionAdd
    const category = req.body.categoryAdd

    if (!amount || !description || !category) {
        return res.status(400).json({ error: 'Amount, description, and category fields are required' });
        
      }
      try {
        const data = await Expense.create({ expenseAmount:amount, description:description, category:category });
        res.status(201).json({ newExpense: data })
      
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
      }
}

exports.getAllUsers = async(req,res,next) =>{

    try{
        Expense.findAll()
        .then((users) =>{
            res.status(201).json(users)
        })
        
    }catch(error){
        console.log(error)
        res.status(500).json({ error: error });

    }
}

exports.deleteExpense = async(req,res,next) =>{
    console.log(req.params.id)
    if(!req.params.id){
        res.status(400).json({err:"Missing ExpenseID"})
    }
    try{
        const expenseId = req.params.id
        Expense.destroy({where:{id:expenseId}})
        console.log("expense Successfully destroyed")

    }catch{
        console.log(err)
        req.status(500).json({error:error})

    }
}

exports.updateExpense = async(req,res,next) =>{
    try {
        const id = req.params.id
        const updatedAmount = req.body.amountAdd
        const updatedDesc = req.body.descriptionAdd
        const updatedCategory = req.body.categoryAdd

        const expense = await Expense.findByPk(id);
        console.log(expense)
    
        if (!expense) {
          return res.status(404).json({ error: "Expense not found !!!" });
        }
    
        const data = await expense.update({
          expenseAmount: updatedAmount,
          description: updatedDesc,
          category: updatedCategory,
        });
        res.status(201).json({updatedExpense:data})
    }catch (error){
        console.log(error)
        res.status(500).json({err:"Expense Edit Unsuccessfull !!!"})
    }
}