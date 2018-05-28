<template>
<div id="app">
  <v-app id="inspire">
    <div>
      <v-toolbar color="pink">
        <v-toolbar-title class="white--text">My Music</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
        <v-container
          fluid
          style="min-height: 0;"
          grid-list-lg
        >
          <v-layout row wrap>
            <v-flex xs12>
              <v-card color="blue-grey darken-2" class="white--text">
                <v-card-title primary-title>
                  <div class="headline">Unlimited music now</div>
                  <div>Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat dark>Listen now</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
    </div>
  </v-app>
</div>
</template>
<script>
export default {

}
</script>
<style>

</style>
