
const jsdom = require("jsdom");
const fs = require("fs");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { JSDOM } = jsdom;
var dataIndex = 1;
try {
    if (!fs.existsSync("dist")) {
        fs.mkdirSync("dist");
    }
  } catch (err) {
    console.error(err)
  }
  
  

async function getLatestBuild() {
  const discord_website = await fetch("https://discord.com/app").then((res) =>
    res.text()
  );
  
  const jsdom = new JSDOM(discord_website);
  var scripts = jsdom.window.document.getElementsByTagName("script");
  for (var i = 0; i < scripts.length; i++) {
    console.log(`Saved ${scripts[i].src}`);
    var dwnld = await fetch(`https://discord.com${scripts[i].src}`).then(
      (res) => res.text()
    );
    if (dwnld.includes("<!DOCTYPE html>")) {
    console.log("How the fuck did this happen?");
    } else {
    var filename = dataIndex++;
    fs.writeFileSync(`dist/${filename}.js`, dwnld, function (err) {
      if (err) return console.log(err);
      
    });
}
  }
}
getLatestBuild();
