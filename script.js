var cron = require('node-cron')
var kue = require('kue')
var queue = kue.createQueue()
var fs = require('fs')

let data = JSON.parse(fs.readFileSync('email.json', 'utf-8'))

let mailgun = require('mailgun-js')({apiKey: data.api, domain: data.domain});

cron.schedule('0 31 * * * *', function(job){
  data.list.forEach(function(email) {
    let metaEmail = {
      from: data.from,
      to: email,
      subject: data.subject,
      text: data.text
    }

    let job = queue.create('email', metaEmail).save( function(err) {
      if(!err) {
        console.log(email, "Already added to queue");
      }
    })
  })
});
