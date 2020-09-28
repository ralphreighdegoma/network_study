<template>
    <div>
        <base-header type="gradient-danger" class="pb-6 pb-8 pt-5 pt-md-8">
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Balance"
                          type="gradient-green"
                          :sub-title="`₱ ${deposit}`"
                          icon="ni ni-credit-card"
                          class="mb-4 mb-xl-0 h2"
                    >
                    </stats-card>
                </div>
              
            </div>
  
        </base-header>

        <!--Charts-->
        <div class="container-fluid mt--7 mb-5">
            <div class="row">
                <div class="col-md-12">
                      <div class="card">
                        <div class="card-header border-0">
                        <div class="row align-items-center">
                            <div class="col">
                            <h3 class="mb-0">Ewallet Transaction List</h3>
                            </div>
                            <div class="col text-right">
                            <router-link to="/withdraw" class="btn btn-sm btn-primary">Request Withdraw</router-link>
                            </div>
                        </div>
                        </div>

                        <div class="table-responsive">
                        <base-table thead-classes="thead-light"
                                    :colorrow="true"
                                    :data="ewallet_transactions">
                            <template slot="columns">
                            <th></th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Transaction Type</th>
                            <th>Status</th>
                            <th>Date</th>
                            </template>

                            <template slot-scope="{row}">
                            <th scope="row">
                                <template v-if="row.status">
                                  <template v-if="row.status == 'complete'">
                                    <span :class="`table__${row.status}--text`">
                                      <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                      </svg>
                                    </span>
                                  </template>
                                  <template v-else>
                                    <span :class="`table__${row.status}--text`">
                                     <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-dot" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                                      </svg>
                                    </span>
                                  </template>
                                </template>
                                <template  v-else>
                                    <span :class="`table__withdraw--text`">
                                     <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-dash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                      </svg>
                                    </span>
                                </template>
                            </th>
                            <th>
                                {{row.title}}
                            </th>
                            <td>
                                {{row.description}}
                            </td>
                            <td>
                                ₱ {{row.amount}}
                            </td>
                            <td>
                                <i class="fas fa-arrow-up text-success mr-3"
                                :class="row.bounceRateDirection === 'up' ? 'text-success': 'text-danger'">
                                </i>
                                {{row.transaction_type}}
                            </td>
                             <td>
                                <span :class="`table__${row.status}--text`" v-if="row.status">{{row.status}}</span>
                            </td>
                             <td>
                                {{transactionDate(row.created_at)}}
                            </td>
                            </template>

                        </base-table>
                        </div>

                    </div>
                </div>
               
            </div>
            <!-- End charts-->

            
        </div>

    </div>
</template>
<script>
  import moment from 'moment';

  export default {
    computed: {
        user(){
          return this.$store.getters.authUser;
        },
    },
    components: {
      
    },
    data() {
      return {
        deposit: 0,
        withdraw: 0,
        ewallet_transactions: [],
      }
    },
    methods: {
      transactionDate(date){
          return moment(date).format('ll'); 
      }
    },
    mounted() {
      this.$store.dispatch('fetchAuthUser');
      this.$store.dispatch('fetchEwallet').then((res) => {
          console.log(res)
          this.deposit = res.ewallet.total_deposit;
          this.withdraw = res.ewallet.total_withdraw;
          this.ewallet_transactions = res.ewallet_transactions;
      }).catch(err => console.log(err));
    }
  };
</script>
<style></style>