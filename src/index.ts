import "./database/db"
import {app} from "./app"


async function startApp(){
  const PORT = process.env.PORT;
  try{
    app.listen(PORT,function(){
      console.log(`Server up and running on the ${PORT}!`);
    })
  }catch(error){
    console.log(error)
  }
}

startApp()
