<template>
    <div>
         <base-header class="header pb-7 pt-5 pt-lg-7 d-flex align-items-center">
            <!-- Mask -->
            <span class="mask bg-gradient-danger"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center justify-content-center">
                <div class="row">
                    <div class="col-lg-12 col-md-10">
                    </div>
                </div>
            </div>
        </base-header>
        <div class="container-fluid mt--6">
             <div class="row align-items-center">
                <div class="col-md-12">
                    <card shadow type="secondary">
                       <div class="row justify-content-between">
                           <div class="col-md-8 mb-5">
                                <template>
                                    <el-tree icon-class="el-icon-plus" :highlight-current="true" :indent="35" :data="data" :props="defaultProps" @node-click="handleNodeClick">
                                         <span class="el-tree-node__label d-flex justify-content-between align-items-center" slot-scope="{ node, data }">
                                            <template v-if="data.name">
                                                <div class="d-flex align-items-center">
                                                    <el-avatar v-if="data.avatar" :src="data.avatar" :size="30"></el-avatar>
                                                    <el-avatar v-else icon="el-icon-user-solid" size="small"></el-avatar>
                                                    <h5 class="ml-2 mb-0">{{data.name}}</h5>
                                                </div>
                                                <div class="d-flex align-items-center">
                                                    <div><h5 class="ml-3 mr-3 mb-0">{{data.date}}</h5></div>
                                                    <div>
                                                        <template v-if="data.level == 1">
                                                            <el-tag type="danger" size="small">Level 1</el-tag>
                                                        </template> 
                                                        <template v-if="data.level == 2">
                                                            <el-tag type="success" size="small">Level 2</el-tag>
                                                        </template> 
                                                        <template v-if="data.level == 3">
                                                            <el-tag size="small">Level 3</el-tag>
                                                        </template>
                                                        <template v-if="data.level == 4">
                                                            <el-tag size="warning">Level 4</el-tag>
                                                        </template>
                                                        <template v-if="data.level == 5">
                                                            <el-tag size="info">Level 5</el-tag>
                                                        </template>
                                                    </div>
                                                </div>   
                                            </template>
                                             <template v-else>
                                                 <div class="d-flex align-items-center">
                                                    <el-avatar v-if="data.avatar" :src="data.avatar" size="small"></el-avatar>
                                                    <el-avatar v-else icon="el-icon-user-solid" size="small"></el-avatar>
                                                    <h5 class="ml-2 mb-0">{{node.label}}</h5>
                                                </div>
                                            </template>
                                           
                                        </span>
                                    </el-tree>
                                </template>
                           </div>
                           <div class="col-md-4">
                               <ul data-toggle="checklist" class="list-group list-group-flush">
                                   <li class="checklist-entry list-group-item flex-column align-items-start py-4 px-4">
                                       <div class="checklist-item checklist-item-checked d-flex justify-content-between align-items-center">
                                            <div class="checklist-info">
                                                <h4 class="checklist-title mb-0 text-primary">Level 1</h4>
                                                <small>PHP 100 commission</small>
                                            </div>
                                            <div>
                                                <div class="custom-control custom-checkbox custom-checkbox-success">
                                                   <h2 class="checklist-title mb-0"><strong>{{level_1}}</strong></h2>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="checklist-entry list-group-item flex-column align-items-start py-4 px-4">
                                       <div class="checklist-item checklist-item-checked d-flex justify-content-between align-items-center">
                                            <div class="checklist-info">
                                                <h4 class="checklist-title mb-0 text-success">Level 2</h4>
                                                <small>PHP 50 commission</small>
                                            </div>
                                            <div>
                                                <div class="custom-control custom-checkbox custom-checkbox-success">
                                                   <h2 class="checklist-title mb-0"><strong>{{level_2}}</strong></h2>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="checklist-entry list-group-item flex-column align-items-start py-4 px-4">
                                       <div class="checklist-item checklist-item-checked d-flex justify-content-between align-items-center">
                                            <div class="checklist-info">
                                                <h4 class="checklist-title mb-0 text-info">Level 3</h4>
                                                <small>PHP 25 commission</small>
                                            </div>
                                            <div>
                                                <div class="custom-control custom-checkbox custom-checkbox-success">
                                                   <h2 class="checklist-title mb-0"><strong>{{level_3}}</strong></h2>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="checklist-entry list-group-item flex-column align-items-start py-4 px-4">
                                       <div class="checklist-item checklist-item-checked d-flex justify-content-between align-items-center">
                                            <div class="checklist-info">
                                                <h4 class="checklist-title mb-0 text-warning">Level 4</h4>
                                                <small>PHP 15 commission</small>
                                            </div>
                                            <div>
                                                <div class="custom-control custom-checkbox custom-checkbox-success">
                                                   <h2 class="checklist-title mb-0"><strong>{{level_4}}</strong></h2>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="checklist-entry list-group-item flex-column align-items-start py-4 px-4">
                                       <div class="checklist-item checklist-item-checked d-flex justify-content-between align-items-center">
                                            <div class="checklist-info">
                                                <h4 class="checklist-title mb-0 text-dark">Level 5</h4>
                                                <small>PHP 10 commission</small>
                                            </div>
                                            <div>
                                                <div class="custom-control custom-checkbox custom-checkbox-success">
                                                   <h2 class="checklist-title mb-0"><strong>{{level_5}}</strong></h2>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                     <li class="checklist-entry list-group-item flex-column align-items-start py-4 px-4">
                                       <div class="checklist-item checklist-item-checked d-flex justify-content-between align-items-center">
                                            <div class="checklist-info">
                                                <h2 class="checklist-title mb-0 text-dark">All</h2>
                                            </div>
                                            <div>
                                                <div class="custom-control custom-checkbox custom-checkbox-success">
                                                   <h2 class="checklist-title mb-0"><strong>{{all_level}}</strong></h2>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                               </ul>
                                  
                           </div>
                       </div>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
     data() {
      return {
        data: [{
          label: 'My Network',
          avatar: '',
          children: [],
        }, ],
        defaultProps: {
          children: 'children',
          label: 'label',
        },
        level_1: 0,
        level_2: 0,
        level_3: 0,
        level_4: 0,
        level_5: 0,
        all_level: 0,
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
    },
    mounted(){
        this.$store.dispatch('fetchNetwork').then((res) => {
            if(res){
                this.level_1 = res.referral_level_1;
                this.level_2 = res.referral_level_2;
                this.level_3 = res.referral_level_3;
                this.level_4 = res.referral_level_4;
                this.level_5 = res.referral_level_5;
                this.all_level = res.referrals;
                this.data[0].children = res.referral_tree;
            }
            console.log(res);
        }).catch(err => console.log(err))

        this.$store.dispatch('fetchAuthUser').then((res) => {
            this.data[0].avatar = res.avatar;
        }).catch(err => console.log(err));

    }
}
</script>