import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class TrackService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ) { }
    async getRoot(): Promise<string> {
        return `
      <html>
        <head>
          <title>Javascript Tracker</title>
        </head>
        <body>
          <h1 id="nameField" value=""></h1>
          <form id="nameForm" action="/track">
            What's Your name?: <input name="name"></input>
            <input type="hidden" id="hiddenField" name="id" value=""></input>
            <button>Submit</button>
          </form>

          <script>
            // Initialize the agent at application startup.
            const fpPromise = import('https://fpcdn.io/v3/gYFGK5wGuMUTffqoRBVS')
              .then(FingerprintJS => FingerprintJS.load({
                region: 'eu'
              }))

            // Get the visitor identifier when you need it.
            fpPromise
              .then(fp => fp.get())
              .then(result => {
                // This is the visitor identifier:
                const visitorId = result.visitorId
                console.log(visitorId)
                document.getElementById('hiddenField').value = visitorId;
                httpGetAsync()
              })
            
              function httpGetAsync()
             {
                var xmlHttp = new XMLHttpRequest();
                 xmlHttp.onreadystatechange = function() { 
                  if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                    var helloText = "Hello " + xmlHttp.responseText;
                    if (helloText != "Hello User not Found"){
                    document.getElementById('nameField').innerHTML = helloText;
                    }
                  }
                  }
                  url = "/name?id=" + document.getElementById('hiddenField').value;
                  console.log(url);
                  xmlHttp.open("GET", url, true); // true for asynchronous 
                  xmlHttp.send(null);
              }
              
              
            
            
          </script>
        </body>

      </html>
    `;
    }

    async getTrack(trackerid: string, name: string): Promise<string> {
        var user = await this.userModel.findOne({ 'tracking': trackerid })
        if (user != null) {
            user.name = name
            user.tracking = trackerid
            const result = await user.save();
            console.log(result);
        }
        else {
            const newUser = new this.userModel();
            newUser.name = name;
            newUser.tracking = trackerid;
            newUser.save();
        }
        return `hi ${name}`;
    }

    async getName(trackerid: string): Promise<string> {
        try {
            var user = await this.userModel.findOne({ 'tracker': trackerid })
            console.log(user);
            var output = user.name
        }
        catch {
            var output = "User not Found"
        }
        return output;
    }

}
