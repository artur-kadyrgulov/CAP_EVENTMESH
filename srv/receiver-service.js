const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
  // "messagingQueue" is described in the package.json
  const messaging = await cds.connect.to('messaging');

  // Queue Subscriptions
  /***********************/
  // Subscribe to a topic. The messages will be stored in the queue specified in package.json
  // listens for events in "$namespace/removeAllItems" topic stored in the queue specified in the package.json
  await messaging.on(`ce/sap/s4/beh/product/v1/Product/Changed/v1`, (msg) => {
    console.log('> event on topic "$namespace/ce/sap/s4/beh/product/v1/Product/Changed/v1" stored in queue "receiver1": ', msg)
    console.log(msg.data)
  });

  // listens for events in "$namespace/processOnReceiver1" topic stored in the queue specified in the package.json
//   await messaging.on(`processOnReceiver1`, (msg) =>
//     console.log('> event on topic "$namespace/processOnReceiver1" stored in queue "receiver1": ', msg)
//   );
});