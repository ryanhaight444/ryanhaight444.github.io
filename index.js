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
  template: `<div  id="modal-overlay" @mousemove="onOverlayMove" @click="onOverlayClick">
      <img ref="modalImage" :src="folder !== '' ? folder + '/' + item.filename : ''">
      <div class="metadata" :style="{'margin-left': offset() + 'px'}">
        <p>{{ item.artist }}</p>
        <p>{{ item.year }}</p>
        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
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
          artist: "Ryan Haight"
        },
        {
          filename: "snowyRedSquare.gif",
          artist: "Ryan Haight"
        },
        {
          filename: "raincaphill.gif",
          artist: "Ryan Haight"
        },
        {
          filename: "FairHaven.gif",
          artist: "Ryan Haight"
        },
        {
          filename: "garden_st.gif",
          artist: "Ryan Haight"
        },
        {
          filename: "Esci_rainy.gif",
          artist: "Ryan Haight"
        },
      ],
      paintings: [
        {
          filename: "barn.jpg",
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