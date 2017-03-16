
var cron = require('node-cron')
var kue = require('kue')
var queue = kue.createQueue()
var fs = require('fs')

let data = JSON.parse(fs.readFileSync('email.json', 'utf-8'))

let mailgun = require('mailgun-js')({apiKey: data.api, domain: data.domain});

queue.process('email', function(job, done) {
  let emailMeta = {
    from: job.data.from,
    to: job.data.to,
    subject: job.data.subject,
    text: job.data.text
  }
  console.log("test");
  // mailgun.messages().send(emailMeta, function(error, body) {
  //   console.log(body);
  // })
  done()
})
