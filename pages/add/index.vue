<template>
  <section>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <form action="">
            <div class="card">
              <div class="card-header pb-1">
                <div class="row align-items-center">
                  <div class="col-md-auto">
                    <h5 class="mb-2">
                      Add Data
                    </h5>
                  </div>
                  <div class="col-md-auto ml-auto">
                    <div class="form-row">
                      <div class="col-auto">
                        <nuxt-link class="btn btn-outline-dark mb-2" to="/">
                          Cancel
                        </nuxt-link>
                      </div>
                      <div class="col-auto">
                        <button class="btn btn-primary mb-2" type="button" @click="submit">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="form-group">
                  <label for="komoditas">Komoditas</label>
                  <input
                    id="komoditas"
                    v-model="lists.komoditas"
                    type="text"
                    class="form-control"
                    :class="{'is-invalid': errors.komoditas}"
                    required
                  >

                  <!-- Showing error validation -->
                  <p v-if="errors.komoditas" class="text-danger">
                    {{ errors.komoditas[0] }}
                  </p>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="provinsi">Area Provinsi</label>
                      <select
                        id="provinsi"
                        v-model="lists.area_provinsi"
                        class="form-control custom-select"
                        required
                      >
                        <option :value="null" selected disabled>
                          Pilih
                        </option>
                        <option v-for="(p, index) in areas" :key="index" :value="p">
                          {{ p.province }}
                        </option>
                      </select>
                      <input v-model="lists.area_provinsi.province" type="text">
                      <p v-if="errors.area_provinsi" class="text-danger">
                        {{ errors.area_provinsi[0] }}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="kota">Area Kota</label>
                      <select
                        id="kota"
                        v-model="lists.area_kota"
                        class="form-control custom-select"
                        :class="{'is-invalid': errors.area_kota}"
                        required
                        :disabled="!lists.area_provinsi"
                      >
                        <option :value="null" selected disabled>
                          Pilih
                        </option>
                        <option v-for="c in lists.area_provinsi.city" :key="c" :value="c">
                          {{ c }}
                        </option>
                      </select>
                      <p v-if="errors.area_kota" class="text-danger">
                        {{ errors.area_kota[0] }}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="size">Size</label>
                      <select id="size" v-model="lists.size" class="form-control custom-select" :class="{'is-invalid': errors.size}" required>
                        <option :value="null" selected disabled>
                          Pilih
                        </option>
                        <option v-for="(item, index) in sizes" :key="index" :value="item.size">
                          {{ item.size }}
                        </option>
                      </select>
                      <p v-if="errors.size" class="text-danger">
                        {{ errors.size[0] }}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <label for="price">Price</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            Rp
                          </span>
                        </div>
                        <input
                          id="price"
                          v-model="lists.price"
                          type="text"
                          min="0"
                          class="form-control"
                          pattern="[0-9]*"
                          :class="{'is-invalid': errors.price}"
                          required
                        >
                      </div>
                      <p v-if="errors.price" class="text-danger">
                        {{ errors.price[0] }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { uuid } from 'vue-uuid'

export default {
  async asyncData ({ store }) {
    await Promise.all([
      store.dispatch('getSizesData'),
      store.dispatch('getAreasData')
    ])
  },
  data () {
    return {
      // optionProvinces: [],
      // optionCities: [],
      // optionSizes: [],
      // Variables to collect input form
      provinces: '',
      lists: {
        uuid: uuid.v1(),
        komoditas: '',
        area_provinsi: '',
        area_kota: '',
        size: '',
        price: '',
        tgl_parsed: new Date(),
        timestamp: new Date().getTime()
      }
    }
  },
  computed: {
    // Call state
    ...mapState({
      areas: state => state.areas,
      sizes: state => state.sizes,
      errors: state => state.errors
    })
  },
  methods: {
    ...mapActions(['storeListsData', 'getSizesData', 'getAreasData']),
    // When click submit button, this function will be running
    submit () {
      // eslint-disable-next-line no-console
      console.log(JSON.parse(JSON.stringify(this.lists)))
      // Call function to saving data
      // If success, redirect to page lists
      // this.storeListsData([JSON.parse(JSON.stringify(this.lists))])
      //   .then((result) => {
      //     // eslint-disable-next-line no-console
      //     console.log(result)
      //     this.$router.push('/')
      //   })
    }
  }
}
</script>
