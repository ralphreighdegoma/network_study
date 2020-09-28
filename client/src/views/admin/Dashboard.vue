<template>
    <div>
        <base-header type="gradient-danger" class="pb-6 pb-8 pt-5 pt-md-8">
           <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Products"
                                type="gradient-red"
                                :sub-title="`${productCount}`"
                                icon="ni ni-bag-17"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-nowrap"><router-link to="/admin/products">See all</router-link></span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Orders"
                                type="gradient-orange"
                                :sub-title="`${orderCount}`"
                                icon="ni ni-cart"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                           
                            <span class="text-nowrap"><router-link to="/admin/orders">See all</router-link></span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Customer"
                                type="gradient-green"
                                :sub-title="`${customerCount}`"
                                icon="ni ni-single-02"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                         
                            <span class="text-nowrap"><router-link to="#">See all</router-link></span>
                        </template>
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Sales"
                                type="gradient-info"
                                sub-title="49,65%"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
            </div>
  
        </base-header>

              <!--Charts-->
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-md-12 mb-5 ">
                    <card type="default" header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                                <h5 class="h3 text-white mb-0">Total Sales value</h5>
                            </div>
                            <div class="col-2">
                                <div class="form-group">
                                    

                                    <select class="form-control form-control-alternative" @input="changeSaleYear($event)">
                                        <option value="">Select Year</option>
                                        <option v-for="(year, i) in years" :value="year" :key="i" :selected="isCurrentYear(year) ? true : false">{{year}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <line-chart
                                :height="350"
                                ref="bigChart"
                                :chart-data="bigLineChart.chartData"
                        >
                        </line-chart>

                    </card>
                </div>

                <div class="col-md-12 mb-4">
                    <card header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-uppercase text-muted ls-1 mb-1">Overview</h6>
                                <h5 class="h3 mb-0">Total orders</h5>
                            </div>
                             <div class="col-2">
                                <div class="form-group">
                                    

                                    <select class="form-control form-control-alternative" @input="changeOrderYear($event)">
                                        <option value="">Select Year</option>
                                        <option v-for="(year, i) in years" :value="year" :key="i" :selected="isCurrentYear(year) ? true : false">{{year}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <bar-chart
                                :height="350"
                                ref="barChart"
                                :chart-data="redBarChart.chartData"
                        >
                        </bar-chart>
                    </card>
                </div>
            </div>
            <!-- End charts-->
            
        </div>

    </div>
</template>
<script>
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';


  export default {
       components: {
            LineChart,
            BarChart,
        },
      data(){
        return {
            productCount: 0,
            orderCount: 0,
            customerCount: 0,
            years: [],
            bigLineChart: {
                chartData: {
                    datasets: [ {
                        label: 'Total Sales',
                        data: []
                    }],
                    labels:  [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                },
            },
            extraOptions: chartConfigs.blueChartOptions,
            redBarChart: {
                chartData: {
                    labels:  [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                    datasets: [{
                        label: 'Total Order',
                        data: []
                    }]
                }
            }
        }
    },
    computed: {
        user(){
          return this.$store.getters.authUser;
        },
        data_sales(){
            return this.$store.getters.dataSalesAnalytics
        },
        data_orders(){
            return this.$store.getters.dataOrdersAnalytics
        },
    },
    methods: {
       changeSaleYear(e) {
           console.log('changeSaleYear', e.target.value);
            this.$store.dispatch('fetchAllSalesAnalytics', {year: e.target.value}).then((res) => {
            let chartData = {
                datasets: [
                    {
                        label: 'Total Sales',
                        data: res.total_sales
                    }
                ],
                 labels:  [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            };

            this.bigLineChart.chartData = chartData;
        });
       },
       changeOrderYear(e){
            this.$store.dispatch('fetchAllOrdersAnalytics', {year: e.target.value}).then((res) => {
                this.redBarChart.chartData = {
                    datasets: [
                        {
                            label: 'Total Order',
                            data: res
                        }
                    ],
                    labels:  [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                };
                
            });
       },
       isCurrentYear(year){
            let now = new Date()
            let yearCurrent = now.getFullYear()
            if(yearCurrent  == year){
                return true
            }else {
                return false
            }


       }
    },
    mounted() {
        this.$store.dispatch('fetchAuthUser');
        this.$store.dispatch('analyticsCount').then((res) => {
            this.productCount = res.products_count;
            this.orderCount = res.orders_count;
            this.customerCount = res.users_count;
            console.log(res);
        }).catch((err) => console.log(err));

        this.$store.dispatch('fetchAllSalesAnalytics', {year: null}).then((res) => {
            let chartData = {
                datasets: [
                    {
                        label: 'Total Sales',
                        data: res.total_sales
                    }
                ],
                 labels:  [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            };

            this.bigLineChart.chartData = chartData;

            let yearlist = [];
            for (const key in res.years) {
                yearlist.push(key);      
            }
            this.years = yearlist
        });
        this.$store.dispatch('fetchAllOrdersAnalytics', {year: null}).then((res) => {
            this.redBarChart.chartData = {
                datasets: [
                    {
                        label: 'Total Order',
                        data: res
                    }
                ],
                labels:  [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            };
               
        });
    }
  };
</script>
