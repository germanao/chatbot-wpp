import fastify from 'fastify'  
import { type WebhookObject } from './types/webhooks';
const server = fastify()

server.get('/webhook', async function (req, res) {  
  if (req.url.length > 0) {
    const requestPath = new URL(req.url, `https://${req.headers.host}`);

    const mode = requestPath.searchParams.get('hub.mode') 
    const challenge = requestPath.searchParams.get('hub.challenge')
    const verifyToken = requestPath.searchParams.get('hub.verify_token')

    if (mode === 'subscribe' && verifyToken === process.env.verify_token) 
      await res.status(200).send(challenge)
    
  }
  await res.status(403).send('Error, wrong validation token');
})  

server.post('/webhook', async function (req, res) {

  const body = req.body as WebhookObject;

  if(body.object.length > 0) {
    if (body.entry[0]?.changes[0]?.value.messages[0].id.length > 0) {

      const phoneNumberId = body.entry[0].changes[0].value.metadata[0].phone_number_id;
      const from = body.entry[0].changes[0].value.messages[0].from; 
      const msgBody = body.entry[0].changes[0].value.messages[0].text?.body; 
            
      await server.inject({
        method: "POST",
        url:
                    "https://graph.facebook.com/v12.0/" +
                    phoneNumberId +
                    "/messages?access_token=" +
                    process.env.verify_token,
        payload: {
          messaging_product: "whatsapp",
          to: from,
          text: { body: "Ack: " + msgBody },
        },
        headers: { "Content-Type": "application/json" },
      });
    }
    await res.status(200).send('EVENT_RECEIVED')
  }

  await res.status(404)
}
)
  
// Run the server!  
server.listen({ port: 3000 }, function (err, address) {  
  if (err != null) {  
    server.log.error(err)  
    process.exit(1)  
  }
	
  console.log(`Server is now listening on ${address}`)  
})