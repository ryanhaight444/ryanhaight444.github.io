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
  template: `
  <div 
    class="imageContainer" 
    @click="$emit('art-item-clicked', [item, folder, ratio])"
    :style="{ 'grid-column': 'span ' + ((item.span) ? item.span : 1) }"
  >
    <img ref="image" :src="folder + '/' + item.filename">
    <div class="imageCaption">
      <p> {{ item.artist }} </p>
      <p v-if="item.year!==undefined">({{ item.year }})</p>
    </div>
  </div>`
})

Vue.component('modal-overlay', {
  props: ['folder', 'item', 'ratio'],
  data() {
    return {
      storedHeight: 1,
      storedWidth: 1,
    }
  },
  created() {
    window.addEventListener("resize", this.updateDimensions);
  },
  destroyed() {
    window.removeEventListener("resize", this.updateDimensions);
  },
  computed: {
    offset() {
      let boxRatio = this.storedWidth / this.storedHeight;
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
  methods: {
    onOverlayClick() {
      this.$emit('overlay-clicked');
    },
    onOverlayMove() {
      console.log(this.$refs.modalImage.clientWidth);
    },
    updateDimensions() {
      this.storedHeight = this.height();
      this.storedWidth = this.width();
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
    
  },
  template: `<div  id="modal-overlay">
      <img ref="modalImage" :src="folder !== '' ? folder + '/' + item.filename : ''">
      <div class="metadata" :style="{'margin-left': offset + 'px'}">
        <p>{{ item.artist }}</p>
        <p>{{ item.year }}</p>
        <p>Links go here?</p>
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
          year: 2020,
          span: 2,
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
          year: 2020,
          span: 3,
        },
        {
          filename: "Vu_final.gif",
          artist: "Ryan Haight",
          month: 8,
          year: 2020,
          span: 3,
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
          year: 2020,
          span: 3,
        },
        {
          filename: "red_sqr.gif",
          artist: "Ryan Haight",
          month: 4,
          year: 2020,
          span: 2,
        },
        {
          filename: "Vancouvie_test.gif",
          artist: "Ryan Haight",
          month: 12,
          year: 2019,
          span: 2,
        },
        {
          filename: "Stairs.gif",
          artist: "Ryan Haight",
          month: 3,
          year: 2020
        },
      ],
      acrylic: [
        {
          filename: "Colander.jpg",
          artist: "Sean Haight"
        },
        {
          filename: "BakerBeachSun.jpg",
          artist: "Sean Haight"
        },
        {
          filename: "Rhododendron.jpg",
          artist: "Sean Haight"
        },
        {
          filename: "barn.jpg",
          artist: "Sean Haight"
        },
        {
          filename: "BakerBeachSunset.jpg",
          artist: "Sean Haight"
        },
        {
          filename: "DunesInTheDistance.jpg",
          artist: "Sean Haight"
        },
        {
          filename: "Mount_Pisgah.jpg",
          artist: "Sean Haight"
        },
        {
          filename: "ATVHell.jpg",
          artist: "Sean Haight"
        },
        {
          filename: "CraterLake.jpg",
          artist: "Sean Haight"
        },
        {
          filename: "BayFromFragranceLake.jpg",
          artist: "Sean Haight"
        },
        {
          filename: "GrahamMountainMeadow.jpg",
          artist: "Sean Haight"
        },
        {
          filename: "ViewFromRyansApartment.jpg",
          artist: "Sean Haight"
        },
        {
          filename: "MinnehahaMountain.jpg",
          artist: "Sean Haight"
        },
        {
          filename: "CapePerpetua.jpg",
          artist: "Sean Haight"
        },
      ],
       watercolor: [
         {
           filename: "SwampWaterColor.jpg",
          artist: "Sean Haight"
         },
         {
          filename: "SeanSelfPortrait.jpg",
         artist: "Sean Haight"
        },
        {
          filename: "BakerBeach.jpg",
         artist: "Sean Haight"
        },
        {
          filename: "Douglas_Fir.jpg",
         artist: "Sean Haight"
        },
        {
          filename: "Bigleaf_Maple.jpg",
         artist: "Sean Haight"
        },
        {
          filename: "Oregon_Oak.jpg",
         artist: "Sean Haight"
        },
        {
          filename: "Pacific_Madrone.jpg",
         artist: "Sean Haight"
        }
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