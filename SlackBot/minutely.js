var admin = require('firebase-admin');
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let serviceAccount = require('../../../serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

let docRef = db.collection('control').doc('status');
let flagRef = db.collection('flag').doc('status');

/**
* An HTTP endpoint that acts as a webhook for Scheduler minutely event
* @returns {object} workflow The result of your workflow steps
*/
module.exports = async () => {
  
  // Prepare workflow object to store API responses
  
  let workflow = {};
  
  // [Workflow Step 1]
  
  console.log(`Running slack.messages[@0.3.5].create()...`);
  
  let query = await docRef.get();
  let status = query.data().value;
  
  let flag = await flagRef.get();
  let isNotified = flag.data().value;

  if (status === 'Offline' && !isNotified) {
    workflow.response = await lib.slack.messages['@0.3.5'].create({
      id: `UKVE213F0`,
      text: `Your systems are currently offline!`,
      attachments: null
    });
    
    let notifiedData = {
      value: true
    }
    flagRef.set(notifiedData);
  }
  if (status === 'Online' && !isNotified) {
    workflow.response = await lib.slack.messages['@0.3.5'].create({
      id: `UKVHWUYHL`,
      text: `Your systems are currently online!`,
      attachments: null
    });
    
    let notifiedData = {
      value: true
    }
    flagRef.set(notifiedData);
  }

  return workflow;
};