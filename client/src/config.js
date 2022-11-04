
const config = {
    model: "dev", // "deploy"
    dev:{
        domain: "http://localhost:5000",
        frontEnd: "http://localhost:3000"
        

    },
    deploy: {
        domain:"https://lazy-devs.onrender.com",
        frontEnd: "https://lazy-devs.onrender.com/"
    }
}

module.exports=config