import http from 'k6/http';   // Import the k6 HTTP module
import { check, sleep } from 'k6';  // Import the check and sleep methods

// Define performance options
export const options = {
    stages: [
        { duration: '30s', target: 100 }, // Ramp-up to 10 VUs in 30 seconds
        { duration: '1m', target: 10 },  // Stay at 10 VUs for 1 minute
        { duration: '10s', target: 0 },  // Ramp-down to 0 VUs
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    },
};

// The default function that runs the test
export default function () {
    const res = http.get('https://facebook.in/');  // Replace with your API endpoint

    // Check if the status code is 200
    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    sleep(1);  // Pause for 1 second between requests
}
