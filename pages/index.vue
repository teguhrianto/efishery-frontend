<template>
  <section>
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-auto">
          <h5>Data Perikanan Indonesia</h5>
        </div>
        <div class="col-md-auto ml-auto">
          <!-- <nuxt-link class="btn btn-primary" :to="{name: 'add-list'}">
            Add New
          </nuxt-link> -->
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <b-table striped hover :items="lists" :fields="fields" show-empty />
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
      fields: ['komoditas', 'area_provinsi', 'area_kota', 'size', 'price', 'tgl_parsed'],
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
