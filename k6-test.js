import http from "k6/http";
import {check} from "k6";

const duration = '5m';
const targetRequestPerSecond = 100;

http.setResponseCallback(http.expectedStatuses({min: 200, max: 400}));

export const options = {
    tags: {
        name: '## Load test name ##',
        testid: targetRequestPerSecond + " / " + duration + " / " + new Date().toLocaleString(),
    },
    scenarios: {
        constant_load: {
            executor: 'ramping-arrival-rate',
            startRate: 1,
            // rate: targetRequestPerSecond,
            timeUnit: '1s',
            // duration: duration,
            preAllocatedVUs: targetRequestPerSecond * 1.5,
            maxVUs: targetRequestPerSecond * 3,
            stages: [
                {duration: '30s', target: targetRequestPerSecond},
                {duration: duration, target: targetRequestPerSecond},
            ],
        },
    },
    // stages: [
    //     {duration: "30s", target: targetRequestPerSecond},
    //     {duration: duration, target: targetRequestPerSecond},
    // ],
    insecureSkipTLSVerify: true,
    // rps: targetRequestPerSecond,
    // gracefulStop: '0s',
    // gracefulRampDown: '0s',
    // thresholds: {
    //     http_req_duration: ["p(99)<1500"],
    //     "API Request Latency": ["p(99)<1500"],
    //     "API Request Success Rate": ["rate>0.9"],
    //     cpu_usage: ["avg<50"],
    // },
};

// export function setup() {
//     const url = 'https://setup-url/a/b/c';
//     const params = {
//         headers: {
//             'Content-Type': 'application/json',
//             'x-api-key': 'xxx.xxx.xxx'
//         },
//     };
//     const response = http.get(url, params);
//     return {data: response.json()}
// }

export default function () {
    const url = 'https://load-test-url/a/b/c';
    const payload = `{
    "id":"0123456789",
    "name":"Chan Tai Man"
}`;
    // const cookies = {
    //     'cookies-A': 'xxx.xxx.xxx',
    // };

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'token': 'xxx-token',
            'Authorization': 'Bearer xxx.xxx.xxx'
        },
        // cookies: cookies,
        timeout: '120s'
    };


    const response = http.post(url, payload, params);
    // console.log(response.body);

    check(response, {
        "status = 200": (r) => r.status === 200,
        // "duration > 1000ms": (r) => r.timings.duration > 1000,
        "200 Completed": (r) => r.status === 200 && r.body != null && r.body.includes('Completed'),
        // "200 Transaction already exists": (r) => r.status === 200 && r.body != null && r.body.includes('Transaction already exists')
    });
    // sleep(1);
}