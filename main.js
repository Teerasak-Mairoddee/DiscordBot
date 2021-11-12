const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = '!';

var http = require('http');
///const {tokens} = require('./config');

express = require('express');
app = express();
app.locals.moment = require('moment');


client.once('ready',() => {
    console.log('DeveloperBot is online!');

    commandCode = [];
    commandCodeFull = [];

    //get spreadsheet data
    const request = require('request');

    googleReq = "https://sheets.googleapis.com/v4/spreadsheets/1tTkxnJ43MZcK1arVEr3napdkKP3dhEQhHqeYGd4t_88?includeGridData=true&key="+process.env.GOOGLE_TOKEN;
    request(googleReq, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        //message.channel.send(commandCodeFull[i]+' Sent To Terminal');
        
        console.log(body.sheets[0].data[0].rowData);//gets all the rows
        var rowsAggregated = body.sheets[0].data[0].rowData;
        console.log("items: "+rowsAggregated.length);

        for (let i = 0; i < rowsAggregated.length; i++) {
            commandCode.push(rowsAggregated[i].values[0].formattedValue);
            commandCodeFull.push(rowsAggregated[i].values[1].formattedValue);
        }
        console.log(commandCode);
        console.log(commandCodeFull);
        
    });
    
});

client.on('messageCreate', (message) =>{
    if(message.author.bot) return false;
    
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    
    

    var unkownResponse = ["What are you on about my guy? 🤔","Huh?","What? Try again","???","I dont know that one bro"];

    var isInCryptoList = false;

    if((command != "gas"))
    {
        for (let i = 0; i < commandCode.length; i++) {
            if(command == commandCode[i]){
                isInCryptoList = true;
                const request = require('request');

                console.log(commandCode[i]);
                
                var coinGeckoReq = 'https://api.coingecko.com/api/v3/simple/price?ids='+commandCodeFull[i]+'&vs_currencies=usd&include_market_cap=true&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=false';

                request(coinGeckoReq, { json: true }, (err, res, body) => {
                    if (err) { return console.log(err); }
                    var firstKey = Object.values(body)[0];
                  
                    calculation = Math.round(firstKey.usd_24h_change * 100) / 100;

                    if(calculation > 0)
                    {
                        message.channel.send("📈 "+commandCode[i].toUpperCase()+": $"+ firstKey.usd.toString() +" | "+calculation.toString()+"%");
                    }
                    else
                    {
                        message.channel.send("📉 "+commandCode[i].toUpperCase()+": $"+ firstKey.usd.toString() +" | "+calculation.toString()+"%");
                    }


                });
    
            }
            if((i==commandCode.length-1)&&(isInCryptoList==false))
            {
                if(command == "yo")
                {
                    message.channel.send('Yo wys g.');
                }
                if(command == "global")
                {
                    const request = require('request');
                    var globalReq = 'https://api.coingecko.com/api/v3/global';
                    request(globalReq, { json: true }, (err, res, body) => {
                        
                        console.log(body.data.market_cap_change_percentage_24h_usd);
                        calculation = Math.round(body.data.market_cap_change_percentage_24h_usd * 100) / 100;
                        if(calculation > 0)
                        {
                            message.channel.send("📈 Global Market Cap Is Up "+calculation.toString()+"%");
                        }
                        else
                        {
                            message.channel.send("📉 Global Market Cap Is Down "+calculation.toString()+"%");
                        }

                    });
                }
                else{
                    var rndInt = Math.floor(Math.random() * unkownResponse.length-1) + 1
                    console.log(rndInt)
                    message.channel.send(unkownResponse[rndInt]);
                }
    
            }
    
        };
    }
    else{
        if(command == "gas")
        {
            const request = require('request');


            var gasReq = 'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey='+process.env.ETHERSCAN_TOKEN;
        
            request(gasReq, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
                message.channel.send("🔒 Safe Gas Price: "+body.result.SafeGasPrice+" gwei"+"\n✅ Proposed Gas Price: "+body.result.ProposeGasPrice+" gwei"+"\n⚡️ Fast Gas Price: "+body.result.FastGasPrice+" gwei"+"\n📈 Suggested Base Fee: "+body.result.suggestBaseFee+" gwei");
            });
        }
    }


    

})

client.login(process.env.DJS_TOKEN);




