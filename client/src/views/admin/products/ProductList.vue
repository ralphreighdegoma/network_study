<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">All Products</h3>
        </div>
        <div class="col text-right">
            <router-link to="/admin/product/add" class="btn btn-primary">Add Product</router-link>
        </div>
      </div>
    </div>

    <template v-if="products">
      <div class="table-responsive">
        <base-table thead-classes="thead-light"
                    :data="products.data">
          <template slot="columns">
            <th>Image</th>
            <th>Title</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Price</th>
            <th>Action</th>
          </template>

          <template slot-scope="{row}">
            <th scope="row">
              <img class="product-admin-image" :src="row.featureImage" />
            </th>
            <td>
              <router-link :to="`/product/${row.id}/${row.slug}`" class="text-dark">{{row.title}}</router-link>
            </td>
            <td>
              {{row.quantity}}
            </td>
            <td>
              <badge v-if="row.status == 'publish'" pill type="success">{{row.status}}</badge>
              <badge v-else pill type="warning">{{row.status}}</badge>
            </td>
            <td>
              {{row.price}}
            </td>
            <td>
              <router-link :to="`/admin/product/edit/${row.id}`" class="m-2"><i class="el-icon-edit admin-icon text-info"></i></router-link>
              <router-link :to="`/admin/product/delete/${row.id}`" class="m-2"><i class="el-icon-delete admin-icon"></i></router-link>
            </td>
          </template>

        </base-table>
      </div>
    </template>
    <template v-else>
      <div class="text-center mt-5 mb-5">
        <h4>Loading...</h4>
      </div>
    </template>

  </div>
</template>
<script>
  export default {
    name: 'page-visits-table',
    data() {
      return {
        
      }
    },
    computed: {
      products() {

        return this.$store.getters.products;
      }
    },
    mounted(){
      this.$store.dispatch('fetchAllProducts');
    }
  }
</script>
<style>
</style>
