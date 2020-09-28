<template>
   <div>
        <base-header type="gradient-danger" class="pb-6 pb-8 pt-5 pt-md-8">
        
        </base-header>

        <div class="container-fluid mt--7 mb-5">
            <div class="row">
                <div class="col-md-8 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <base-alert type="danger" class="d-flex justify-content-between align-items-center mb-4" v-if="errors.length > 0">
                                <div class="d-flex flex-column">
                                    <span class="alert-inner--text mb-2" v-for="(error, i) in errors" :key="i"><strong>Oops!</strong> {{error}}</span>
                                </div>
                                <button type="button" class="close" @click="errors = []">
                                    <span>&times;</span>
                                </button>
                            </base-alert>
                            <form>
                                <div class="form-group">
                                    <label class="form-control-label">Title</label>
                                    <base-input alternative
                                            placeholder="Enter title"
                                            v-model="model.title">
                                    </base-input>
                                </div>
                                <div class="form-group">
                                    <label class="form-control-label">Description</label>
                                    <wysiwyg v-model="model.description" />
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                       <div class="form-group">
                                            <label class="form-control-label">Price</label>
                                            <base-input alternative class="mb-3"
                                                    placeholder="Enter a price"
                                                    type="number"
                                                    v-model="model.price">
                                            </base-input>
                                       </div>
                                    </div>
                                    <div class="col-md-4">
                                       <div class="form-group">
                                            <label class="form-control-label">Sale Price</label>
                                            <base-input alternative class="mb-3"
                                                    placeholder="Enter a sale price"
                                                    type="number"
                                                    v-model="model.saleprice">
                                            </base-input>
                                       </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-control-label">Quantity</label>
                                            <base-input alternative class="mb-3"
                                                    placeholder="Quantity"
                                                    type="number"
                                                    v-model="model.quantity">
                                            </base-input>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                 <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="form-group">
                                <label class="form-control-label">Featured Image</label>
                                <el-upload
                                class="product-uploader"
                                action="#"
                                :show-file-list="false"
                                :auto-upload="false"
                                :on-change="handleProductUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="product-img">
                                    <i v-else class="el-icon-picture product-uploader-icon"></i>
                                </el-upload>
                            </div>
                             <div class="form-group">
                               <el-upload
                                    action="#"
                                    list-type="picture-card"
                                    :on-change="fileUpload"
                                    :file-list="fileList"
                                    :auto-upload="false">
                                        <i slot="default" class="el-icon-picture"></i>
                                        <div slot="file" slot-scope="{file}">
                                        <img
                                            class="el-upload-list__item-thumbnail"
                                            :src="file.url" alt=""
                                        >
                                        <span class="el-upload-list__item-actions">
                                            <span
                                                v-if="!disabled"
                                                class="el-upload-list__item-delete"
                                                @click="handleRemove(file)"
                                            >
                                            <i class="el-icon-delete"></i>
                                            </span>
                                        </span>
                                        </div>
                                    </el-upload> 
                                </div>

                                <div class="form-group">
                                    
                                    <label class="form-control-label">Status</label>
                                    <div class="custom-control custom-radio mt-3 mb-2">
                                        <input type="radio" class="custom-control-input" id="draft" name="radio-stacked" @click="model.status = 'draft'">
                                        <label class="custom-control-label" for="draft">Draft</label>
                                    </div>
                                    <div class="custom-control custom-radio mb-3">
                                        <input checked type="radio" class="custom-control-input" id="publish" name="radio-stacked" @click="model.status = 'publish'">
                                        <label class="custom-control-label" for="publish">Publish</label>
                                    </div>
                                   
                                </div>
                                 <div class="form-group">
                                   <button class="btn btn-primary btn-block" type="submit" @click="addProduct">Add Product  <img v-if="loading" width="25" class="ml-1 mt--2" src="/img/loading.gif" /></button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

    </div>
</template>
<style lang="scss">
  .product-uploader-icon {
    font-size: 78px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .product-img {
    width: 100%;
    height: 178px;
    object-fit: cover;
    display: block;
  }
  .el-upload--picture-card {
    width: 80px;
    height: 80px;
    line-height: 76px;
  }
  .el-upload-list--picture-card .el-upload-list__item {
      width: 80px;
    height: 80px;
  }
</style>

<script>
export default {
    data(){
        return {
            model: {
                title: '',
                description: '',
                price: '',
                saleprice: '',
                quantity: '',
                featureImage: '',
                images: [],
                status: 'publish'
            },
            imageUrl: '',
            fileList: [],
            disabled: false,
            errors: [],
            loading: false
        }
    },
    methods: {
        addProduct(){
            this.loading = true;
             let bodyFormData = new FormData();

            for (const property in this.model) {
                if(property !== 'images'){
                    bodyFormData.append(property, this.model[property])
                }else {
                    this.model.images.map((image) => {
                        bodyFormData.append('images[]', image)
                        console.log('image', image);
                    })
                }
            }

           
            this.$store.dispatch('addProduct', bodyFormData).then((res) => {
                this.$notify({
                    title: 'Success',
                    message: `Product ${res.title} has been successfully added`,
                    type: 'success'
                });
                this.model = {
                    title: '',
                    description: '',
                    price: '',
                    saleprice: '',
                    quantity: '',
                    featureImage: '',
                    images: [],
                    status: 'publish'
                }
                this.loading = false;
            }).catch(error => {
                console.log(error);
                this.errors = error;
                this.loading = false;
            });
            console.log(this.model);
        },
        handleProductUpload(file, filelist) {
            console.log(file, filelist);
            this.imageUrl = URL.createObjectURL(file.raw);
            this.model.featureImage = file.raw;
        },
        handleRemove(file) {
            this.fileList = window._.filter(this.fileList, (o) => o.uid !== file.uid);
            this.model.images = window._.filter(this.model.images, (o) => o.uid !== file.raw.uid);
        },
        fileUpload(file, fileList){
            this.fileList = fileList;
            this.model.images.push(file.raw)
            console.log(file)
        },


    }
}
</script>