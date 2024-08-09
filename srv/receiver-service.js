const cds = require('@sap/cds');

const PRODUCT_CHANGED_TOPIC = 'ce/sap/s4/beh/product/v1/Product/Changed/v1'
const PB_CHANGED_TOPIC = 'ce/sap/s4/beh/businesspartner/v1/BusinessPartner/Changed/v1'


module.exports = cds.service.impl(async function() {

  const bupa = await cds.connect.to('API_BUSINESS_PARTNER');

  this.on('READ', 'Suppliers', async req => {
      return bupa.run(req.query);
  });

  // "messagingQueue" is described in the package.json
  const messaging = await cds.connect.to('messaging');

  // Queue Subscriptions
  /***********************/
  // Subscribe to a topic. The messages will be stored in the queue specified in package.json
  // listens for events in "$namespace/removeAllItems" topic stored in the queue specified in the package.json
  await messaging.on(PRODUCT_CHANGED_TOPIC, (msg) => {
    console.log('> event on topic "PRODUCT_CHANGED_TOPIC" stored in queue "ZKAD_Product": ', msg)
    console.log(msg.data)
  });

  await messaging.on(PB_CHANGED_TOPIC, (msg) => {
    console.log('> event on topic "PB_CHANGED_TOPIC" stored in queue "ZKAD_Product": ', msg)
    console.log(msg.data)
  });

});