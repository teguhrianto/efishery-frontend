<template>
  <section>
    <div class="container">
      <div class="logo">
        <img src="./../assets/img/logo.png" alt="eFishery">
      </div>
      <div class="row align-items-center mb-4">
        <div class="col-md-auto">
          <h5 class="mb-2">
            Data Harga Perikanan Indonesia
          </h5>
        </div>
        <div class="col-md-auto ml-auto">
          <nuxt-link class="btn btn-primary mb-2" :to="{name: 'add'}">
            Add New
          </nuxt-link>
        </div>
      </div>

      <div class="card card--table">
        <div class="card-header">
          Filter
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <b-table
              striped
              hover
              :items="lists.slice(1)"
              :fields="fields"
              show-empty
            >
              <template v-slot:cell(no)="row">
                {{ row.index+1 }}
              </template>
              <template v-slot:cell(price)="row">
                {{ row.item.price | currency }}
              </template>
            </b-table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  // Get list data from store index
  async asyncData ({ store }) {
    await Promise.all([
      store.dispatch('getListsData')
    ])
  },
  data () {
    return {
      // Field for table header
      fields: ['no', 'komoditas', 'area_provinsi', 'area_kota', 'size', 'price', 'tgl_parsed'],
      items: []
    }
  },
  computed: {
    // Everytime request to API, the data will be saved in each store of vuex
    // List data will be saved in State Lists
    ...mapState({
      lists: state => state.lists
    })
  },
  methods: {
    ...mapActions(['getListsData'])
  }
}
</script>
