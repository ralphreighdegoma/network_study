<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center">
            <!-- Mask -->
            <span class="mask bg-gradient-danger"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center justify-content-center">
                <div class="row">
                    <div class="col-lg-12 col-md-10">
                        <h1 class="display-4 text-white">Hello, {{user ? user.name : ''}}</h1>
                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7 mb-5">
            <div class="row justify-content-center">

                <div class="col-xl-8 order-xl-1" v-if="!changepassword">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">My account</h3>
                                </div>
                                <div class="col-4 text-right">
                                    <a href="#" class="btn btn-sm btn-default" @click="changepassword = true">Change password</a>
                                </div>
                            </div>
                        </div>
                        <template>
                             <base-alert type="danger" class="d-flex justify-content-between align-items-center" v-if="errors.length > 0 && !success">
                                <div class="d-flex flex-column">
                                    <span class="alert-inner--text mb-2" v-for="(error, i) in errors" :key="i"><strong>Opps!</strong> {{error}}</span>
                                </div>
                                <button type="button" class="close" @click="errors = []">
                                    <span>&times;</span>
                                </button>
                            </base-alert>
                             <base-alert  v-if="success" type="success" class="d-flex justify-content-between align-items-center">
                                <div class="d-flex flex-column">
                                    <span class="alert-inner--text mb-2"><strong>Success</strong> succesfully updated</span>
                                </div>
                                <button type="button" class="close" @click="success = false">
                                    <span>&times;</span>
                                </button>
                            </base-alert>
                            <form @submit.prevent>
                                <div class="mt-4 mb-4"> 
                                     <el-upload
                                        class="avatar-user-uploader"
                                        action="#"
                                        :show-file-list="false"
                                        :auto-upload="false"
                                        :on-change="handleAvatarUpload">
                                            <img v-if="imageUrl" :src="imageUrl" class="avatar-user-img">
                                            <i v-else class="el-icon-plus avatar-user-uploader-icon"></i>
                                        </el-upload>
                                </div>
                                <h6 class="heading-small text-muted mb-4">User information</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group has-label">
                                                <label class="form-control-label">Name*</label>
                                                <input  ref="name" :value="user ? user.name: ''" placeholder="Enter your name" class="form-control form-control-alternative">
                                            </div>
                                           
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group has-label">
                                                <label class="form-control-label">Email address*</label>
                                                <input  ref="email" :value="user ? user.email: ''" placeholder="Enter your email" class="form-control form-control-alternative">
                                            </div>
                                          
                                        </div>
                                    </div>
                                   
                                </div>
                                <hr class="my-4" />
                                <!-- Address -->
                                <h6 class="heading-small text-muted mb-4">Contact information</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group has-label">
                                                <label class="form-control-label">Phone*</label>
                                                <input  ref="phone" :value="user ? user.phone: ''" placeholder="Contact Number" class="form-control form-control-alternative">
                                            </div>
                                           
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                           <div class="form-group has-label">
                                                <label class="form-control-label">Addres*</label>
                                                <input  ref="address" :value="user ? user.address: ''" placeholder="Enter your address" class="form-control form-control-alternative">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="pl-lg-4">
                                     <base-button type="danger" class="mt-4 ml-3 mr-3" @click="saveChange">Save Change</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>

                <div class="col-xl-8 order-xl-1" v-if="changepassword">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Change Password</h3>
                                </div>
                                <div class="col-4 text-right">
                                    <a href="#" class="btn btn-sm btn-default" @click="changepassword = false">Back</a>
                                </div>
                            </div>
                        </div>
                        <template>
                             <base-alert type="danger" class="d-flex justify-content-between align-items-center" v-if="changePasswordError.length > 0 && !changePasswordSuccess">
                                <div class="d-flex flex-column">
                                    <span class="alert-inner--text mb-2" v-for="(error, i) in changePasswordError" :key="i"><strong>Opps!</strong> {{error}}</span>
                                </div>
                                <button type="button" class="close" @click="changePasswordError = []">
                                    <span>&times;</span>
                                </button>
                            </base-alert>
                             <base-alert  v-if="changePasswordSuccess" type="success" class="d-flex justify-content-between align-items-center">
                                <div class="d-flex flex-column">
                                    <span class="alert-inner--text mb-2"><strong>Success</strong> succesfully Change password</span>
                                </div>
                                <button type="button" class="close" @click="changePasswordSuccess = false">
                                    <span>&times;</span>
                                </button>
                            </base-alert>
                            <form @submit.prevent>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group has-label">
                                                <label class="form-control-label">Old Password*</label>
                                                <input type="password"  v-model="model.old_password" placeholder="Enter old password" class="form-control form-control-alternative">
                                            </div>
                                           
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                           <div class="form-group has-label">
                                                <label class="form-control-label">New Password*</label>
                                                <input type="password"  v-model="model.new_password" placeholder="Enter new password" class="form-control form-control-alternative">
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                           <div class="form-group has-label">
                                                <label class="form-control-label">New Password Confirm*</label>
                                                <input type="password" v-model="model.new_password_confirm" placeholder="Enter new password confirm" class="form-control form-control-alternative">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="pl-lg-4">
                                     <base-button type="danger" class="mt-4 ml-3 mr-3" @click="changePassword">Change Password</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .avatar-user-uploader {
        display:flex;
        justify-content: center;
    }
    .avatar-user-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-user-uploader .el-upload:hover {
        border-color: #ca1515;
    }
    .avatar-user-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .avatar-user {
        width: 100px;
        height: 100px;
        display: block;
    }
    .avatar-user-img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        display: block;
    }

</style>

<script>
  export default {
    data() {
      return {
        model: {
          old_password: '',
          new_password: '',
          new_password_confirm: '',
        },
        errors: [],
        success: false,
        changepassword: false,
        changePasswordError: [],
        changePasswordSuccess: false,
        avatar: '',
        imageUrl: ''
      }
    },
    computed: {
        user(){
          return this.$store.getters.authUser;
        },
    },
    methods: {
        handleAvatarUpload(file, filelist) {
            console.log(file, filelist);
            this.imageUrl = URL.createObjectURL(file.raw);
            this.avatar = file.raw;
        },
        changePassword(){
            if(this.model.new_password !== this.model.new_password_confirm){
                this.changePasswordError = ['New password and New password confirm not match please try again.'];
            }else {
                  this.$store.dispatch('changePassword', this.model).then((res) => {
                    console.log('status', res);
                    this.changePasswordError = [];
                    this.changePasswordSuccess = true;

                    this.model.old_password = "";
                    this.model.new_password = "";
                    this.model.new_password_confirm = "";

                    
                }).catch(err => {
                    this.changePasswordSuccess = false;
                    this.changePasswordError = err.errors

                });
            }
        },
        saveChange(){
            let bodyFormData = new FormData();
            bodyFormData.append('name', this.$refs.name.value)
            bodyFormData.append('email', this.$refs.email.value)
            bodyFormData.append('address', this.$refs.address.value)
            bodyFormData.append('phone', this.$refs.phone.value)
            bodyFormData.append('avatar', this.avatar)
            bodyFormData.append('user_id', this.user.id)

            this.$store.dispatch('editAccount', bodyFormData).then((res) => {
                console.log('status', res);
                this.errors = [];
                this.success = true;
                
            }).catch(err => {
                this.success = false;
                this.errors = err.errors

            });
        }
    },
    mounted() {
        this.$store.dispatch('fetchAuthUser').then((res) => {
            this.imageUrl = res.avatar;
        }).catch(err => console.log(err));
    },
  };
</script>
<style></style>
