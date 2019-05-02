import { userInfo } from "os";

router.post('/login', (req, res, next) => {
    user
    .find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({
                message: 'user not found'
            })
        }
    })
        
    
})