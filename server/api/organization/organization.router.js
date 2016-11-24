const router = require('express').Router(); // eslint-disable-line new-cap
const Organization = require('./organization.model')
const Account = require('../account/account.model')
const Billing = require('../billing/billing.model')
const axios = require('axios')
const adminMethods = require('../admin/admin.methods')
const Admin = require('../admin/admin.model')

//Create a new Organization returns Head Admin
router.post('/',(req,res,next) =>{
  let globalOrganization; 
  Organization.create({
    name:req.body.organizationName,
    type:req.body.organizationType,
    address:req.body.address,
    phone:req.body.phone,
    numberOfStudents:0
  })
  .then(organization =>{
    globalOrganization = organization
    return Account.findOne({
      where:{
        type:req.body.accountType
      }
    })
  })
  .then(account =>{  
    return globalOrganization.setAccount(account)
  })
  .then(() =>{
    let dataToSendToAdmin = {
      name:req.body.adminName,
      email:req.body.email,
      password:req.body.password,
    }
    return adminMethods.createAdmin(dataToSendToAdmin)
  })
  .then(admin =>{
    globalOrganization.update({head_id:admin.id})
  })
  .then(() =>{
    if(Object.keys(req.body.billing).length){
      return Billing.create({
        cardType:req.body.billing.cardType,
        cardNumber:req.body.billing.cardNumber,
        expiryDate:req.body.billing.expiryDate,
        securityNumber:req.body.billing.securityNumber
      })
    }
    return 
  })
  .then(billing =>{ 
    if(billing) return globalOrganization.update({billing_id:billing.id})
    return globalOrganization
  })
  .then(globalOrg =>{
    globalOrganization = globalOrg
    return Admin.findById(globalOrganization.head_id)
  })
  .then(headAdmin =>{
    res.status(209).send(headAdmin)
  })
  .catch(err => console.log(err))
})

module.exports = router