Tools can be used to do load test on local:
1. k6
2. prometheus
3. grafana
4. pgadmin (optional)
5. zipkin (optional)

## Step 1
```
git clone this repo
```

## Step 2
### Docker startup (Grafana + Prometheus)
```shell
docker-compose -f ./grafana_prometheus/grafana-prom.yaml -p grafana_prometheus up -d
```

## Step 3
### Install k6
```
Mac
- brew install k6

Windows, either
- choco install k6
- winget install k6
```
https://k6.io/docs/get-started/installation/

## Step 4
### Run k6 script (k6-test.js, modify it for your own test)
```shell
K6_PROMETHEUS_RW_TREND_AS_NATIVE_HISTOGRAM=true k6 run k6-test.js -o experimental-prometheus-rw
```

## Step 5
### Monitor load test (live)
> browse http://localhost:3000/
> 1. login, ac/pw = `admin/admin`
> 2. enter Dashboard (name = `Official k6 Test Result`) on Home page, realtime load test results should be plotted out gradually
> 3. explore any features, if you want

## Step 6 (optional)
### Docker shutdown
```shell
docker-compose -f ./grafana_prometheus/grafana-prom.yaml -p grafana_prometheus down --remove-orphans
```
