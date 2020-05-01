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
                        <button class="btn btn-primary mb-2" @click="submit">
                          Save
                        </button>
                      </div>
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
