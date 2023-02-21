const express = require("express");
const fs = require("fs");
const request = require("request");
const download = require("image-downloader");

const app = express();

//default api
app.get("/", async () => {
  res.send("Backend Api Running");
});

//type one using request npm
app.get("/imgdownload", async (req, res) => {
  const download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
      // console.log("content-type:", res.headers["content-type"]);
      // console.log("content-length:", res.headers["content-length"]);
      request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
    });
    if (!download) return res.send("download failed...!");
    else {
      res.send("download Success...!");
    }
  };

  download(
    "https://www.google.com/images/srpr/logo3w.png",
    "google.png",
    function () {
      console.log("done");
    }
  );
});

//type two using image downloader npm
app.post("/typetwo", async () => {
  const options = {
    // url: "https://www.google.com/images/srpr/logo3w.png",
    url: "https://fastly.picsum.photos/id/890/200/300.jpg?hmac=INUR_Xore_GSEXH-cqmLjy_lJcK8tslVvXwwac-9o8M",
    dest: __dirname + "/Download Images", // will be saved to D:\image download node js\Download Images\300.jpg
  };

  download
    .image(options)
    .then(({ filename }) => {
      console.log("Saved to", filename); // saved to D:\image download node js\Download Images\300.jpg
    })
    .catch((err) => console.error(err));
});

app.listen(2000, () => {
  console.log("Server Running....!");
});
