const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();z
// const HTFile = fs.stat(path.resolve(__dirname, "/index.html"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
const file = path.resolve(
  __dirname,
  "/Users/ELCOT/Documents/JS_Projects/VideoStreaming/Videos/VHideo2.mp4"
);
app.get("/video.mp4", (req, res) => {
  // res.sendFile(file)
  const range = req.headers.range;
  const SIZE = fs.statSync(file).size;
  if(!range){
    res.send(range)
  }
  console.log(range);
  if (range) {
    const CHUNK = 10 ** 5;
    let start = Number(range.replace(/\D/g, ""));
    let end =  Math.min(start+CHUNK,SIZE-1)
    const contentLength = end - start + 1;
    const contentHeader = {
      "Content-Range": `bytes ${start}-${end}/${SIZE}`,
      "Content-Length": contentLength,
      "Accept-range": "bytes",
      "Content-Type": "video/mp4",
    };
    console.log(contentHeader);
    res.writeHead(206, contentHeader);
    const Vstream = fs.createReadStream(file, { start,end});
    Vstream.pipe(res)
    // console.log(StreamingFile.pipe(res));
  } else {
   res.sendFile(file)
  }
});

app.listen(5000, (err) => {
  if (err) console.log(err);
  else console.log("Server Connected to the Port 5000");
});
