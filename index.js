// 'use strict';

// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express().use(bodyParser.json()); // creates http server
// const token = 'VERIFICATION_TOKEN'; // type here your verification token

// app.listen(3000, () => console.log('Webhook is listening'));

// app.get('/', (req, res) => {
//     // check if verification token is correct
//     if (req.query.token !== token) {
//         return res.sendStatus(401);
//     }

//     // return challenge
//     return res.end(req.query.challenge);
// });

// app.post('/', (req, res) => {
//     // check if verification token is correct
//     if (req.query.token !== token) {
//         return res.sendStatus(401);
//     }

//     // print request body
//     console.log(req.body);

//     // return a text response
//     const data = {
//         responses: [
//             {
//                 type: 'text',
//                 elements: ['Hi', 'Hello']
//             }
//         ]
//     };

//     res.json(data);
// });

"use strict";

const { ServiceBroker } = require("moleculer");
const DbService = require("moleculer-db");

const broker = new ServiceBroker();

// Create a DB service for `user` entities
broker.createService({
    name: "webhook",

    // Mixin DB service into (current) 'users' service
    mixins: [DbService],

    settings: {
        fields: ["_id", "url"],
        entityValidator: {  
			url: "string"
		}
    },

    actions:{
        register(ctx){
            return;
        },
        list(){
            return;
        },
        update(ctx){
            return;
        },
        delete(ctx){
            return;
        },
    },

    afterConnected() {
        // Seed the DB with ˙this.create`
    }
});

broker.start()

// Create a new user
.then(() => broker.call("users.create", {
    username: "john",
    name: "John Doe",
    status: 1
}))

// Get all users
.then(() => broker.call("webhook.register",{targetUrl:target}).then(console.log))

// List users with pagination
.then(() => broker.call("webhook.list").then(console.log))

// Update a user
.then(() => broker.call("webhook.update", { id: 2, newTargetUrl: "Jane Doe" }).then(console.log))
.catch(err => console.error(`Error occured! ${err.message}`))

// Delete a user
.then(() => broker.call("webhook.trigger", { ipAddress: 2 }).then(console.log));