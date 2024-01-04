const AppError=require("../services/appError");
const globalErrorHandler=require("../controllers/errorHandler");
const authRoute=require("./authroutes");
const noteRoute=require("./noteRoutes");


module.exports=function(app){
    // calling the user routes
    app.use("/api/v1",authRoute);
    // calling the notes routes
    app.use("/api/v1",noteRoute);

    // global route if main route has some problem
    app.all("*",(req,res,next)=>{
        next(new AppError(`cannot find this url on ${req.originalUrl} on this server`,404));
    });
    // global error handling 
    app.use(globalErrorHandler);
    
}