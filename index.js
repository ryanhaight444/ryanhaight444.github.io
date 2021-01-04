// Components

Vue.component('art-item', {
  props: ['folder', 'item'],
  computed: {
    ratio() {
      return this.$refs.image.clientWidth / this.$refs.image.clientHeight;
    },
  },
  methods: {
  },
  template: `<div class="imageContainer" @click="$emit('art-item-clicked', [item, folder, ratio])">
    <img ref="image" :src="folder + '/' + item.filename">
    <div class="imageCaption">
      <p> {{ item.artist }} </p>
      <p v-if="item.year!==undefined">({{ item.year }})</p>
    </div>
  </div>`
})

Vue.component('modal-overlay', {
  props: ['folder', 'item', 'ratio'],
  computed: {
    
  },
  methods: {
    onOverlayClick() {
      this.$emit('overlay-clicked');
    },
    onOverlayMove() {
      console.log(this.$refs.modalImage.clientWidth);
    },
    width() {
      if (this.$refs.modalImage !== undefined) {
        return this.$refs.modalImage.clientWidth;
      } else {
        return -1;
      }
    },
    height() {
      if (this.$refs.modalImage !== undefined) {
        return this.$refs.modalImage.clientHeight;
      } else {
        return -1;
      }
    },
    offset() {
      let boxRatio = this.width() / this.height();
      let resizedWidth;
      let resizedHeight;
      if (this.ratio > boxRatio) {
        // image is wider than box
        resizedWidth = this.width();
        resizedHeight = resizedWidth / this.ratio;
      } else {
        // image is taller than box
        resizedHeight = this.height();
        resizedWidth = this.ratio * resizedHeight;
      }
      let offset = resizedWidth / 2;
      return offset;
    },
  },
  template: `<div  id="modal-overlay">
      <img ref="modalImage" :src="folder !== '' ? folder + '/' + item.filename : ''">
      <div class="metadata" :style="{'margin-left': offset() + 'px'}">
        <p>{{ item.artist }}</p>
        <p>{{ item.year }}</p>
        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
      </div>
      <div class="xout" @click="onOverlayClick" >
        <img SRC="logos/x.gif">
      </div>
    </div>
  </div>`
})


// Vue instance

var app = new Vue({
  el: '#app',
  data() {
    return {
      counter: 0,
      message: "Hello",
      showOverlay: false,
      overlayItem: {},
      overlayFolder: "",
      overlayRatio: 1,
      pixelArt: [
        {
          filename: "moon.gif",
          artist: "Ryan Haight",
          month: 3,
          year: 2020,
        },
        {
          filename: "CapHill.gif",
          artist: "Ryan Haight",
          month: 1,
          year: 2020
        },
        {
          filename: "snowyRedSquare.gif",
          artist: "Ryan Haight",
          month: 1,
          year: 2020
        },
        {
          filename: "raincaphill.gif",
          artist: "Ryan Haight",
          month: 10,
          year: 2020
        },
        {
          filename: "FairHaven.gif",
          artist: "Ryan Haight",
          month: 9,
          year: 2020
        },
        {
          filename: "garden_st.gif",
          artist: "Ryan Haight",
          month: 8,
          year: 2020
        },
        {
          filename: "Esci_rainy.gif",
          artist: "Ryan Haight",
          month: 9,
          year: 2019
        },
        {
          filename: "CFCrp.gif",
          artist: "Ryan Haight",
          month: 9,
          year: 2020
        },
        {
          filename: "cincinatti_small.gif",
          artist: "Ryan Haight",
          month: 2,
          year: 2020
        },
        {
          filename: "Oldmain.gif",
          artist: "Ryan Haight",
          month: 7,
          year: 2020
        },
        {
          filename: "Vu_final.gif",
          artist: "Ryan Haight",
          month: 8,
          year: 2020
        },
        {
          filename: "PikesPlace.gif",
          artist: "Ryan Haight",
          month: 11,
          year: 2019
        },
        {
          filename: "bakerthe.gif",
          artist: "Ryan Haight",
          month: 10,
          year: 2020
        },
        {
          filename: "vu_front.gif",
          artist: "Ryan Haight",
          month: 7,
          year: 2020
        },
        {
          filename: "red_sqr.gif",
          artist: "Ryan Haight",
          month: 4,
          year: 2020
        },
        {
          filename: "Vancouvie_test.gif",
          artist: "Ryan Haight",
          month: 12,
          year: 2019
        },
        {
          filename: "Stairs.gif",
          artist: "Ryan Haight",
          month: 3,
          year: 2020
        },
      ],
      paintings: [
        {
          filename: "barn.jpg",
          artist: "Sean Haight"
        },
        {
          filename: "Rhododendron.jpg",
          artist: "Sean Haight"
        },
        {
          filename: "Colander.jpg",
          artist: "Sean Haight"
        },
        {
          filename: "BakerBeachSun.jpg"
          artist: "Sean Haight"
        },
      ]
    }
  },
  methods: {
    toggleOverlay() {
      this.showOverlay = !this.showOverlay;
    },
    openOverlay(event) {
      this.overlayItem = event[0];
      this.overlayFolder = event[1];
      this.overlayRatio = event[2];
      this.showOverlay = true;
    }
  }
})