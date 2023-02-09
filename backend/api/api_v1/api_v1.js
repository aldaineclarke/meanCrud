const router = require("express").Router();
const postRouter = require("./routers/posts.routes");

router.use("/posts", postRouter);
router.use("/users", require("./routers/user.routes"));
router.all("/",(req, res, next)=>{
    JSONResponse.success(res, "API Endpoint working Successfully", {
        routes:{
            users: "/api/v1/users",
            posts: "/api/v1/posts"
        }
    });
    next();
});



module.exports = router;