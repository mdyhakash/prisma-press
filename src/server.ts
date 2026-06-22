import app from "./app"
import config from "./config"

const main = async()=>{
    try {
        app.listen(config.port, ()=>{
            console.log(`Server running at at port ${config.port}`)
        })
    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1);
        
    }
}

main()