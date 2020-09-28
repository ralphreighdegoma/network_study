<template>
    <div>
        <base-header type="gradient-danger" class="pb-6 pb-8 pt-5 pt-md-8">
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Withdraw"
                                type="gradient-orange"
                                :sub-title="`₱ ${withdrawTotal()}`"
                                icon="ni ni-curved-next"
                                class="mb-4 mb-xl-0 h2"
                    >
                    </stats-card>
                </div>
            </div>
  
        </base-header>

        <!--Charts-->
        <div class="container-fluid mt--7 mb-5">
            <div class="row">
                <div class="col-md-5 mb-5">
                    <div class="card shadow bg-secondary">
                        <div class="card-header border-0">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h4 class="mb-0">Request Withdraw</h4>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                             <form @submit.prevent="sendRequest">
                                <base-alert type="danger" class="d-flex justify-content-between align-items-center mb-4" v-if="errors.length > 0">
                                    <div class="d-flex flex-column">
                                        <span class="alert-inner--text mb-2" v-for="(error, i) in errors" :key="i"><strong>Oops!</strong> {{error}}</span>
                                    </div>
                                    <button type="button" class="close" @click="errors = []">
                                        <span>&times;</span>
                                    </button>
                                </base-alert>
                                <div class="form-group">
                                    <label class="form-control-label">FullName*</label>
                                    <input class="form-control form-control-alternative"
                                            placeholder="FullName"
                                            type="text"
                                            v-model="model.name"/>
                                </div>
                                <div class="form-group">
                                    <label class="form-control-label">Address*</label>
                                    <input class="form-control form-control-alternative"
                                            placeholder="Address"
                                            type="text"
                                            v-model="model.address"/>
                                </div>
                                <div class="form-group">
                                    <label class="form-control-label">Phone Number*</label>
                                    <input class="form-control form-control-alternative"
                                            placeholder="Phone +63(999)-999-9999"
                                            v-mask="'+63 (###)-###-####'"
                                            v-model="model.phone"/>
                                </div>
                                <div class="form-group">
                                    <label class="form-control-label">Amount*</label>
                                    <input class="form-control form-control-alternative"
                                            placeholder="Amount"
                                            type="number"
                                            v-model="model.amount"/>
                                </div>
                                 <div class="form-group">
                                     <label class="form-control-label">Payment Method*</label>
                                     <select class="form-control form-control-alternative" v-model="model.payment_method">
                                        <option value="">Select Payment</option>
                                        <option value="Cebuana Lhuillier">Cebuana Lhuillier</option>
                                        <option value="LBC">LBC</option>
                                        <option value="M Lhuillier">M Lhuillier</option>
                                        <option value="Palawan Pawnshop">Palawan Pawnshop</option>
                                        <option value="RD Pawnshop">RD Pawnshop</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-primary btn-block" type="submit">Withdraw <img v-if="loading" width="25" class="ml-1 mt--2" src="/img/loading.gif" /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-7 mb-5">
                      <div class="card shadow">
                        <div class="card-header border-0">
                            <div class="row align-items-center">
                                <div class="col">
                                <h3 class="mb-0">Withdraw List</h3>
                                </div>
                                <!-- <div class="col text-right">
                                <a href="#!" class="btn btn-sm btn-primary">Request Withdraw</a>
                                </div> -->
                            </div>
                        </div>

                        <div class="table-responsive">
                        <base-table thead-classes="thead-light"
                                    :data="withdraws">
                            <template slot="columns">
                                <th>Name</th>
                                <th>Payment Method</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                            </template>

                            <template slot-scope="{row}">
                                <th>
                                    <router-link :to="`/withdraw/${row.id}`">{{row.name}}</router-link>
                                </th>
                                <td>
                                    {{row.payment_method}}
                                </td>
                                <td>
                                    ₱ {{row.amount}}
                                </td>
                                <td>
                                    <badge v-if="row.status == 'complete'"  type="success">{{row.status}}</badge>
                                    <badge v-if="row.status == 'pending'"  type="warning">{{row.status}}</badge>
                                     <badge v-if="row.status == 'verify'"  type="info">{{row.status}}</badge>
                                    <badge v-if="row.status == 'reject'"  type="danger">{{row.status}}</badge>
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
    data(){
        return {
            model: {
                name: '',
                address: '',
                phone: '',
                payment_method: '',
                amount: 0
            },
            errors: [],
            loading: false
        }
    },
    computed:{
        withdraws(){
            return this.$store.getters.fetchCustomerWithdraws;
        }
    },
    methods: {
        sendRequest(){
            this.loading = true;
            this.$store.dispatch('sendWithdrawRequest', this.model).then((res) => {
                console.log(res)
                this.$notify({ 
                    title: 'Success',
                    message: `Successfully Send Request to Withdraw.`,
                    type: 'success'
                });
                
                this.model.name = "";
                this.model.address = "";
                this.model.phone = "";
                this.model.payment_method = "";
                this.model.amount = "";
                this.loading = false;
            }).catch(err => {
                this.errors = err;
                this.loading = false;
            })
        },

        withdrawTotal(){
            let total = 0;
            this.withdraws.map(withdraw => {
                if(withdraw.status == 'complete'){
                    total += withdraw.amount
                }
            })

            return total;
        },
        transactionDate(date){
          return moment(date).format('ll'); 
        }
    },
    mounted(){
        this.$store.dispatch('fetchCustomerWithdraws');
    }
}
</script>