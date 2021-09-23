// Components

Vue.component('art-item', {
  props: ['folder', 'item'],
  computed: {
    ratio() {
      return this.$refs.image.clientWidth / this.$refs.image.clientHeight +.001;
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
      <p v-if="item.year!==undefined">{{ item.year }}</p>
    </div>
  </div>`
})

Vue.component('modal-overlay', {
  props: ['folder', 'item', 'ratio'],
  data() {
    return {
      metadataVisible: false,
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
      console.log(resizedHeight + "ran offset");
      let offset = resizedWidth / 2;
      return offset;
    },
  },
  methods: {

    showMetadata(){
        this.metadataVisible = true;
    },

    toggleMetadata() {
        this.metadataVisible = !this.metadataVisible;
    },

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
        console.log('No Obj');
        return -1;
      }
    },
    
  },
  template: `<div  id="modal-overlay">
      <img ref="modalImage" :src="folder !== '' ? folder + '/' + item.filename : ''">
      <div v-show = "metadataVisible" class="metadata">
        <p style = "font-weight:bold">{{item.title}}</p>
        <hr> </hr>
        <p style = "width: 40%; float:left;">{{ item.artist }} </p> 
        <p style = "width:40%; float:right; text-align:right"> {{ item.year }}</p>
        <p style = "float:left;">{{item.medium}} </p>
        <p style = "width:40%; float:right; text-align:right"> {{item.size}}</p>
        <hr style = "width:90%;  position: absolute;  bottom: 3rem; "> </hr>
        <p style = "position:absolute; bottom:0; left:2rem; font-size:1rem">{{item.footnote}} </p>
      </div>
      <div class="xout" @click="onOverlayClick(); metadataVisible = false"  >
        <img SRC="logos/x.gif">
      </div>
      <div class="metadataButton" @click="toggleMetadata" >
        <img SRC="logos/questionmark.gif" style = "width:50px">
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
          title: "Colander",
          artist: "Sean Haight",
          month: 8, 
          year: 2017,
          medium:"acrylic on canvas",
          size: "14 x 11 in",
          footnote: "not for sale"
        },
        {
          filename: "BakerBeachSun.jpg",
          title: "Sunset at Baker Beach No. 1",
          artist: "Sean Haight",
          month: 12,
          year: 2020,
          medium:"acrylic on canvas",
          size: "6 x 6 in",
          footnote: "not for sale"
        },
        {
          filename: "Rhododendron.jpg",
          title: "Rhododendron Flower",
          artist: "Sean Haight", 
          month: 12, 
          year: 2020,
          medium:"acrylic on canvas",
          size: "6 x 6 in",
          footnote: "gave it to mom"
        },
        {
          filename: "barn.jpg",
          title: "The Barn",
          artist: "Sean Haight",
          month: 1, 
          year: 2021,
          medium:"acrylic on canvas",
          size: "6 x 6 in",
          footnote: "gave it to grandma"
        },
        {
          filename: "BakerBeachSunset.jpg",
          title: "Sunset at Baker Beach No. 2",
          artist: "Sean Haight",
          month: 1,
          year: 2021,
          medium:"acrylic on canvas",
          size:"14 x 11 in",
          footnote: "sold"
        },
        {
          filename: "DunesInTheDistance.jpg",
          title: "Dunes at Baker Beach",
          artist: "Sean Haight",
          month: 2, 
          year: 2021,
          medium:"acrylic on canvas",
          size:"6 x 6 in",
          footnote: "sold"
        },
        {
          filename: "Mount_Pisgah.jpg",
          title: "Looking West from Mt. Pisgah",
          artist: "Sean Haight",
          month: 3,
          year: 2021,
          medium:"acrylic on canvas",
          size:"8 x 10 in",
          footnote: "sold"
        },
        {
          filename: "ATVHell.jpg",
          title: "Sand Lake Recreation Area",
          artist: "Sean Haight",
          month:5,
          year:2021,
          medium:"acrylic on canvas",
          size:"8 x 10 in",
          footnote: "sold"

        },
        {
          filename: "CraterLake.jpg",
          title: "Wizard Island",
          artist: "Sean Haight",
          month: 6,
          year: 2021,
          medium:"acrylic on canvas",
          size:"8 x 10 in",
          footnote: "sold"
        },
        {
          filename: "BayFromFragranceLake.jpg",
          title: "Hiking to Fragrance Lake",
          artist: "Sean Haight",
          month: 7, 
          year: 2021,
          medium:"acrylic on canvas",
          size:"20 x 24 in",
          footnote: "sold"
        },
        {
          filename: "GrahamMountainMeadow.jpg",
          title: "Graham Mountain Meadow",
          artist: "Sean Haight",
          month: 8, 
          year: 2021,
          medium:"acrylic on canvas",
          size:"8 x 10 in",
          footnote: "sold"
        },
        {
          filename: "ViewFromRyansApartment.jpg",
          title: "Seattle in Summer",
          artist: "Sean Haight",
          month: 8,
          year: 2021,
          medium:"acrylic on canvas",
          size:"6 x 6 in",
          footnote: "sold"
        },
        {
          filename: "MinnehahaMountain.jpg",
          title: "Looking West from Beacon Hill",
          artist: "Sean Haight",
          month: 8,
          year: 2021,
          medium:"acrylic on canvas",
          size:"8 x 10 in",
          footnote: "sold"
        },
        {
          filename: "CapePerpetua.jpg",
          title: "Cape Perpetua",
          artist: "Sean Haight",
          month: 9,
          year: 2021,
          medium:"acrylic on canvas",
          size:"6 x 6 in",
          footnote: "contact Sean Haight at seanhaight1@gmail.com to purchase"
        },
        {
          filename: "SmokeInSpokane.jpg",
          title: "Smokey Afternoon in Spokane Valley",
          artist: "Sean Haight",
          month: 9, 
          year: 2021,
          medium:"acrylic on canvas",
          size:"8 x 10 in",
          footnote: "sold"
        },        
        {
          filename: "LunchAtCalebMarsh.jpg",
          title: "LunchAtCalebMarsh",
          artist: "Sean Haight",
          month: 9, 
          year: 2021,
          medium:"acrylic on canvas",
          size:"8 x 10 in",
          footnote: "$200 + S&H - contact Sean Haight at seanhaight1@gmail.com to purchase"
        },
      ],
       watercolor: [
         {
          filename: "SwampWaterColor.jpg",
          title:"Swamp Stock Photo",
          artist: "Sean Haight",
          month: 12,
          year: 2020,
          medium: "watercolor on paper",
          size:"6 x 8 in",
          footnote: "not for sale"
         },
         {
          filename: "SeanSelfPortrait.jpg",
          title: "Self Portrait",
          artist: "Sean Haight",
          month: 9, 
          year: 2021, 
          medium: "watercolor on paper", 
          size:"6 x 8 in",
          footnote: "not for sale",
        },
        {
          filename: "BakerBeach.jpg",
          title:"Baker Beach Inlet",
          artist: "Sean Haight",
          month: 1, 
          year: 2021,
          medium: "watercolor on paper", 
          size:"6 x 8 in",
          footnote: "not for sale",
        },
        {
          filename: "Douglas_Fir.jpg",
          title: "Douglas Fir",
          artist: "Sean Haight",
          month: 7,
          year: 2021, 
          medium: "watercolor on paper", 
          size:"6 x 8 in",
          footnote: "contact Sean Haight at seanhaight1@gmail.com to purchase",        
        },
        {
          filename: "Bigleaf_Maple.jpg",
          title: "Bigleaf Maple",
          artist: "Sean Haight",
          month: 8,
          year: 2021, 
          medium: "watercolor on paper", 
          size:"6 x 8 in",
          footnote: "contact Sean Haight at seanhaight1@gmail.com to purchase",    
        },
        {
          filename: "Oregon_Oak.jpg",
          title: "Oregon Oak",
         artist: "Sean Haight",
         month: 8,
         year: 2021, 
         medium: "watercolor on paper", 
         size:"6 x 8 in",
         footnote: "contact Sean Haight at seanhaight1@gmail.com to purchase",   
        },
        {
          filename: "Pacific_Madrone.jpg",
          title: "Pacific Madrone",
          artist: "Sean Haight",
          month: 7,
          year: 2021, 
          medium: "watercolor on paper", 
          size:"6 x 8 in",
          footnote: "contact Sean Haight at seanhaight1@gmail.com to purchase",   
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

      console.log("displaying art");
    }
  }
})