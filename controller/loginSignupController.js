module.exports = (router,userDB,jwt)=>{
    router.post('/login-user-data',async(req,res)=>{
        try {
            userDB.findOne({email:req.body.email})
            .then((data)=>{
                if(data==null){
                    res.status(200).json({
                        status:0,
                        message: alertMessages.notExistence
                    })
                }
                else{
                    if(data.password === req.body.password){
                        let token = jwt.sign({_id:data._id},process.env.secretKey,{expiresIn:"1h"})
                        res.json(token)
                }
                    else{
                        res.status(200).json({
                            status:0,
                            message:alertMessages.notExistence
                        })
                    }
                }
            })
        } catch (error) {
            res.status(500).json({
                status:0,
                message:alertMessages.internalServerError
            })
        }
    })
}