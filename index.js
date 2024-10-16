// Require express and body-parser
const express = require("express")
const bodyParser = require("body-parser")
const { EmbedBuilder, WebhookClient } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

// Initialize express and define a port
const app = express();
const PORT = 3123;
const auth = process.env.UUID;
const webhook = process.env.URL;

let link = "";


// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json())
// Start express on the defined port
const webhookClient = new WebhookClient({ url: webhook });
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.post("/insta", (req, res) => {
    if(req.headers.authorization != auth) return;
    if(link == req.body.URL) return;

    link = req.body.URL;
    sendMessage(`<@&1225863384881299546> \nCedric Wandrey hat einen neuen Post bei Insta gemacht! Schaut ihn euch an und genießt die wundervolle Welt der Autos. \n${link}`);
    res.send("Success!").status(200).end();
});
app.post("/youtube", (req, res) => {
    if(req.headers.authorization != auth) return;
    if(link == req.body.URL) return;

    link = req.body.URL;
    sendMessage(`<@&1225863384881299546> \nCedric Wandrey hat ein neues Video bei YouTube hochgeladen! Schaut es euch an und genießt die wundervolle Welt der Autos. \n${link}`);
    res.send("Success!").status(200).end();
});
app.get("/test", (req, res) => {
    res.send("Success!").status(200).end();
});



function sendMessage(content) {
    const embed = new EmbedBuilder()
        .setTitle('Some Title')
        .setColor(0x00FFFF);

    webhookClient.send({
        content: content,
    });
}