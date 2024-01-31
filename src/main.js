require('dotenv').config();

const { ZBClient } = require('zeebe-node')
const createPdfContractWorker = require('./workers/CreatePdfContract')

// Instantiate a Zeebe Client with 0-conf
const zbc = new ZBClient()

// Instantiate Workers
const createPdfContrat = createPdfContractWorker(zbc);

/*async function main() {
    // Deploy processes
    const res = await zbc.deployProcess('./models/test.bpmn');
    //await zbc.deployProcess(['./wf1.bpmn', './wf2.bpmn'])
    
    // Log the deployment result
    console.log('Deployed process:', JSON.stringify(res, null, 2));

    // Create a process instance of the 'new-customer-process' process, with a customerId variable set
    // 'createProcessInstanceWithResult' awaits the outcome
   /*const outcome = await zbc.createProcessInstanceWithResult({
        bpmnProcessId: 'Process_11r5bqs',
        variables: { customerId: 457 }
    });
    // Log the process outcome
    console.log('Process outcome', JSON.stringify(outcome, null, 2));*/
//}

// Call the main function to execute the script
//main();