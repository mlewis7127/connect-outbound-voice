// Import putItemHandler function from put-item.mjs 
import { DestinationNotAllowedException } from '@aws-sdk/client-connect';
import { outboundCallHandler } from '../../../src/handlers/outbound-call.mjs';

// This includes all tests for outboundCallHandler() 
describe('Test outboundCallHandler', function () { 
 
    // This test invokes putItemHandler() and compare the result  
    it('should throw error with invalid number', async () => { 

        // Set the variables
        process.env.CONTACT_FLOW_ID = "a24c9bb7-062e-45c0-a138-962c4efde045";
        process.env.INSTANCE_ID = "83dfabfe-aced-428a-9595-faab3db13c20";
        process.env.QUEUE_ID = "1ef88926-b217-4e12-a877-0f0750d4ebcc";

        const event = { 
            httpMethod: 'POST', 
            body: '{ "destinationNumber": "+4429212826", "OTP": "75757" }'
        }; 
        // Invoke outboundCallHandler()
        try {
            await outboundCallHandler(event); 
        } catch (error) {
            expect(error.message).toEqual("The provided DestinationPhoneNumber is not valid");
        }
    }); 
}); 
 