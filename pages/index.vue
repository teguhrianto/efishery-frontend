<template>
  <section>
    <div class="container">
      <div class="row align-items-center mb-4">
        <div class="col-md-auto text-md-left text-center">
          <h5 class="mb-2">
            Data Harga Perikanan Indonesia
          </h5>
        </div>
        <div class="col-md-auto ml-auto text-md-left text-center">
          <nuxt-link class="btn btn-primary mb-2 btn-add" :to="{name: 'add'}">
            + <span>Tambah Data Baru</span>
          </nuxt-link>
        </div>
      </div>

      <div class="card card--table">
        <div class="card-header pb-0">
          <div class="row">
            <div class="col-md-auto">
              <div class="form-group">
                <label>Tampilkan per halaman:</label>
                <b-form-select
                  id="perPageSelect"
                  v-model="perPage"
                  :options="pageOptions"
                />
              </div>
            </div>
            <div class="col-md-6 ml-auto">
              <div class="form-group">
                <label>Cari:</label>
                <input v-model="filter" type="text" class="form-control" placeholder="Masukan kata kunci: Komoditas, Provinsi, Kota, Size, Price">
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <b-table
              striped
              hover
              stacked="sm"
              :items="lists.slice(1)"
              :fields="fields"
              :filter="filter"
              :current-page="currentPage"
              :per-page="perPage"
              show-empty
              @filtered="onFiltered"
            >
              <template v-slot:cell(price)="row">
                {{ row.item.price | currency }}
              </template>
              <template v-slot:cell(tgl_parsed)="row">
                {{ row.item.tgl_parsed | formatDate }}
              </template>
            </b-table>
          </div>
        </div>
        <div class="card-footer">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="center"
            class="mb-0"
          />
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
      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 15, 20, 'Semua'],
      fields: [
        { key: 'komoditas', sortable: true },
        { key: 'area_provinsi', sortable: true },
        { key: 'area_kota', sortable: true },
        { key: 'size', sortable: true },
        { key: 'price', sortable: true },
        { key: 'tgl_parsed', sortable: true }
      ],
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
  mounted () {
    // Set the initial number of items
    this.totalRows = this.lists.length
  },
  methods: {
    ...mapActions(['getListsData']),
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
