import { ConnectClient, StartOutboundVoiceContactCommand } from "@aws-sdk/client-connect";
const client = new ConnectClient({ region: "eu-west-2" });

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
export const outboundCallHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Get id and name from the body of the request
    const body = JSON.parse(event.body);
    const destinationNumber = body.destinationNumber;
    const OTP = body.OTP;
    let data = '';

    const params = { // StartOutboundVoiceContactRequest
        DestinationPhoneNumber: destinationNumber, // required
        ContactFlowId: process.env.CONTACT_FLOW_ID, // required
        InstanceId: process.env.INSTANCE_ID, // required
        QueueId: process.env.QUEUE_ID,
        Attributes: { // Attributes
          "OTP": OTP,
        },
        TrafficType: "GENERAL",
    };

    try {
        const command = new StartOutboundVoiceContactCommand(params);
        data = await client.send(command);
        console.log("Success - item added or updated", data);
    } catch (err) {
        console.log("Error", err.stack);
        throw err;
    } 

    const response = {
        statusCode: 200,
        body: JSON.stringify(data)
    };    
    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;    

};
