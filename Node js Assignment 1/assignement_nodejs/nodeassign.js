const fs=require('fs');//it is use for file handling
const http=require('http'); //it is work on http 
const { threadId } = require('worker_threads');
const PORT=9999;//it is a port where site working
//
const server=http.createServer((req,res)=>{
    if (req.url=="/") { //it check '/' is equal to req.url 
        res.writeHead(200,{'Content-Type':'text/html'})//respond to every request with an html file
        let data=fs.readFileSync('./html/index.html');//readfile of index.html for render on browser
        res.write(`${data}`) // it is used for show data or site on browser
        res.end();//end if
    } else if(req.url=="/createfile")// it check '/createfile ' is equal to req.url
    {
       if(fs.existsSync("neosoft.txt")){// check the file exit or not
        res.writeHead(200,{'Content-Type':'text/html'})//respond to every request with an html file
        let data1=fs.readFileSync('./html/create.html');//it is used for render  bootstrap on browser
        res.write(`${data1}`)// it is used for show data or site on browser
        res.end();
     
        res.end();
        
       }
       else{
        res.writeHead(200,{'Content-Type':'text/html'})//respond to every request with an html file
        let data2=fs.readFileSync('./html/create1.html');//it is used for render  bootstrap on browser
        fs.writeFile('neosoft.txt','Welcome to neosoft website',(err)=>{
            if(err) throw err
            else { res.write(`${data2}`)// it is used for show data or site on browser
                res.end();}
        })
       
       }
    }
    else if(req.url=="/readdata") // it check '/readdata ' is equal to req.url
    {
       if(fs.existsSync("neosoft.txt"))// check the file exit or not
       {
      let data =fs.readFileSync("neosoft.txt");//it si used for read data inside of the file
      res.end(data.toString());
       }
       else{
        res.writeHead(200,{'Content-Type':'text/html'})//respond to every request with an html file
        let data3=fs.readFileSync('./html/readfile.html');
        res.write(`${data3}`)
        res.end();
       }
    }
    else if(req.url=="/removefiledata") {
        if(fs.existsSync("neosoft.txt")){
          fs.unlinkSync("neosoft.txt");
          res.writeHead(200,{'Content-Type':'text/html'})//respond to every request with an html file
          let data4=fs.readFileSync('./html/remove.html');
          res.write(`${data4}`)
            res.end();
        }
        else{
            res.writeHead(200,{'Content-Type':'text/html'})//respond to every request with an html file
            let data5=fs.readFileSync('./html/removeexit.html');
            res.write(`${data5}`)
         res.end();
        }
     }
     else if(req.url=="/index.html") {
        res.writeHead(200,{'Content-Type':'text/html'})//respond to every request with an html file
        let data1=fs.readFileSync('./html/index.html');
        res.write(`${data1}`)
        res.end();
     }
     else if(req.url=="/appenddata") {
        if(fs.existsSync("neosoft.txt")){
            fs.appendFileSync("neosoft.txt", "\nDATA IS APPEND HELLO INDIA","utf8")
            res.writeHead(200,{'Content-Type':'text/html'})//respond to every request with an html file
            let data5=fs.readFileSync('./html/append.html');
            res.write(`${data5}`)
            res.end();
      
     }
     else{
        res.writeHead(200,{'Content-Type':'text/html'})//respond to every request with an html file
        let data5=fs.readFileSync('./html/appendexit.html');
        res.write(`${data5}`)
          res.end();
     }
    }
    else{
        res.writeHead(200,{'Content-Type':'text/html'})//respond to every request with an html file
        let data1=fs.readFileSync('./html/404.html');
        res.write(`${data1}`)
        res.end();
    }
})
server.listen(PORT,(err)=>{
    if(err) throw err
    else console.log(`server is created ${PORT}`)
})