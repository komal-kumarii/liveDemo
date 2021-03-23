
const jwt = require('jsonwebtoken')
const alertMessages = require('../config/alertMessages')
const session = require('express-session')

function verifyToken(req,res,next){
    let token = req.headers.authorization
    if(token){
        let token1 = token.split(' ')[1]
        // console.log('komal')
        jwt.verify(token1,process.env.secretKey,(err,decoded)=>{
            if(err){
                res.json({err:err})
            }
            next()
           
        })

    }
    else{
        res.send(401)
    }
}   


module.exports = (router,userDB,jwt)=>{
    router.post('/post-user-data',(req,res)=>{
        try {
            userDB.find()
            .then((data)=>{
                let newUser = new userDB({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password
                })
                if(req.body.name==undefined || req.body.email==undefined || req.body.password ==undefined ){
                    res.status(200).json({
                        status:0,
                        message:"Please ! fill all the information"
                    })
                }
                else{
                    newUser.save()
                    .then((data)=>{
                        res.status(200).json({
                            status:0,
                            message:alertMessages.newUsercreated
                        })
                    })
                    .catch((err)=>{
                        res.send(err)
                    })
                }
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:0,
                message : error
            })
        }

    }),

    router.get('/get-user-data',verifyToken,async(req,res)=>{
        try {
                await userDB.find()
                .then((data=>{
                 
                    res.status(200).json({
                        status:1,
                        message:alertMessages.userInfo,
                        userData :data
                    })
                }))
            } catch (error) {
                console.log(error)
                res.status(500).json({
                    status:0,
                    message : error
                })
            }
    })

}