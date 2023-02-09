const Post = require("../../../schemas/post.schema");
const {ObjectId} = require("mongoose").Types;
const { JSONResponse } = require("../../../utilities/response.utility");


class PostController{

    // making member static allows me to access the property without instanciating the class
    /**
     * @description Gets all posts present in the database.
     * @param {Request} req 
     * @param {Response} res 
     */
    static getAllPosts = async(req, res) =>{
        try{
            let {user_id} = req.query;
            if(user_id){
                return this.getUserPosts(req, res, user_id);
            }
            let posts = await Post.find();
            
            JSONResponse.success(res, "Successfully retrieve posts", posts, 200);
        }catch(error){
            JSONResponse.error(res,"Unable to retrieve posts", error, 404);
        }
    }

    /**
     * @description Gets post by the id that is provided by the parameter
     * @param {Request} req 
     * @param {Response} res 
     */
    static getPostById = async(req, res) =>{
        try{
            let id = req.params.id;
            if(!ObjectId.isValid(id)) throw new Error("Invalid ID was passed as a parameter");
            let post = await Post.findById(id);
            if (!post) throw new Error("Post not found with this id");
            
            JSONResponse.success(res, "Successfully retrieved post", post, 200);
        }catch(error){
            JSONResponse.error(res,"Unable to retrieve post", error, 404);
        }
    }
    /**
     * @description Creates a post with the data that the user passes in the request.
     * @param {Request} req 
     * @param {Response} res 
     */
    static createPost = async(req, res)=>{
        try{
            let data = req.body;
            if(Object.keys(data).length == 0) throw new Error("No data passed to create user profile");
            let post = new Post(data); // testing removing await since linter shows that await is not necessary for this expression
            JSONResponse.success(res, "Successfully created a post",post, 200);
        }catch(error){
            JSONResponse.error(res, "Unable to create post", error, 400);
        }
    }
    
    /**
     * @description Updates the posts
     * @param {Request} req 
     * @param {Response} res 
     */
    static updatePost = async(req, res)=>{
        try{
            let data = req.body;
            let id = req.params.id;
            if(!ObjectId.isValid(id)) throw new Error("Invalid ID was passed as a parameter");
            if(Object.keys(data).length == 0) throw new Error("No data passed to create user profile");
            let post = await Post.findByIdAndUpdate(id);
            if (!post) throw new Error("Post not found with this id");
            JSONResponse.success(res, "Successfully updated post", post, 200);

        }catch(error){
            JSONResponse.error(res, "Unable to update post", error, 400);
        }
    }

    static getUserPosts = async(req, res, user_id)=>{
        if(user_id){
            try{
                let post = await Post.find({user_id:user_id});
                return JSONResponse.success(res, "Successfully retrieved post", post, 200);
            }catch(error){
                return JSONResponse.error(res, "Unable to get user's post",error, 404);
            }
        }else{
            return JSONResponse.error(res, "Incorrect User id", error, 404)
        }
    }

    

}

module.exports = PostController;