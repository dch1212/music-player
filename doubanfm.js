class DoubanFM {
  constructor() {
    this.$playlist = document.querySelector('.doubanfm-playlist')
    this.$title = document.querySelector('.doubanfm-title')
    this.$artist = document.querySelector('.doubanfm-artist')
    this.$cover = document.querySelector('.doubanfm-cover img')
    this.$coverLink = document.querySelector('.doubanfm-cover')
    this.$volume = document.querySelector('.doubanfm-volume-slider')
    this.$volumeValue = document.querySelector('.doubanfm-volume-value')
    this.$progress = document.querySelector('.doubanfm-progress')
    this.$progressValue = document.querySelector('.doubanfm-progress-value')
    this.$time = document.querySelector('.doubanfm-time')
    this.$play = document.querySelector('.icon-play')
    this.$pause = document.querySelector('.icon-pause')
    this.$prev = document.querySelector('.icon-prev')
    this.$next = document.querySelector('.icon-next')
    this.$listWrapper = document.querySelector('.doubanfm-playlist')
    // this.$after = document.querySelector(this.$listWrapper)
    this.$loop = document.querySelector('.loop')
    this.$list = document.querySelector('.icon-list')
  
    this.audio = new Audio()
    this.visualizer = new Visualizer('.visualizer', this.audio)
    this.playlist = playlist
    this.playlistIndex = 0
    this.init()
  }

  init() {
    this.$progress.addEventListener('click', this.setProgress.bind(this))
    this.$volume.addEventListener('click', this.setVolume.bind(this))
    this.$play.addEventListener('click', this.play.bind(this))
    this.$pause.addEventListener('click', this.pause.bind(this))
    this.$prev.addEventListener('click', this.prev.bind(this))
    this.$next.addEventListener('click', this.next.bind(this))
    this.$loop.addEventListener('click',this.loop.bind(this))
    this.audio.addEventListener('ended', this.next.bind(this))
    this.audio.addEventListener('timeupdate', this.updateProgress.bind(this))
    this.$list.addEventListener('click', this.list.bind(this))
    this.$listWrapper.addEventListener('click', this.close.bind(this))
    this.createPlaylist()
     this.loadAndPlay(0)
  }

  createPlaylist() {
    console.log(this)
    this.$playlist.innerHTML = playlist.map((item, index) => {
      return `<div class="doubanfm-playlist-item" data-index="${index}">
        ${index + 1}. ${item.title} - ${item.artist}
      </div>`
    }).join('')
    this.$playlist.addEventListener('click', event => {
      if (event.target.dataset.index) {
        
        this.loadAndPlay(parseInt(event.target.dataset.index))
      }
    })
    this.$playlistItems = document.querySelectorAll('.doubanfm-playlist-item')
  }

  setProgress(event) {console.log( this.$progress.clientWidth)
    this.audio.currentTime = event.offsetX / this.$progress.clientWidth * this.audio.duration
  }

  setVolume(event) {
    const rect = this.$volume.getBoundingClientRect()
    const volume = (event.x - rect.left) / rect.width
    this.$volumeValue.style.width = volume * 100 + '%'
    this.audio.volume = volume
  }

  updateProgress() {
    const time = parseInt(this.song.length - this.audio.currentTime)
    const minute = parseInt(time / 60)
    let second = time % 60
    if (second < 10) {
      second = '0' + second
    }
    this.$time.textContent = `-${minute}:${second}`
    this.$progressValue.style.width = (this.audio.currentTime / this.song.length * 100) + '%'
  }

  load() {console.log(this.song)
    this.$title.textContent = this.song.title
    this.$artist.textContent = this.song.artist
    this.$cover.src = this.song.picture
    this.$coverLink.href = 'https://music.douban.com' + this.song.album
    this.audio.src = this.song.url
    document.title = this.song.title
  }

  play() {
    this.audio.play()
    this.$pause.style.display = 'inline-block'
    this.$play.style.display = 'none'
  }

  pause() {
    this.audio.pause()
    this.$play.style.display = 'inline-block'
    this.$pause.style.display = 'none'
  }

  prev() {
    if (this.playlistIndex == 0) {
      this.loadAndPlay(this.playlist.length - 1)
    } else {
      this.loadAndPlay(this.playlistIndex - 1)
    }
  }

  next() {
    if (this.playlistIndex == this.playlist.length - 1) {
      this.loadAndPlay(0)
    } else {
      this.loadAndPlay(this.playlistIndex + 1)
    }
  }
  loop(){
    if( !this.audio.loop ){
      this.audio.loop = "loop";
      
      this.$loop.innerHTML = "<svg t=\"1518343222585\" class=\"icon\" style=\"\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"2973\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"22\" height=\"22\"><defs><style type=\"text/css\"></style></defs><path d=\"M928 476.8c-19.2 0-32 12.8-32 32v86.4c0 108.8-86.4 198.4-198.4 198.4H201.6l41.6-38.4c6.4-6.4 12.8-16 12.8-25.6 0-19.2-16-35.2-35.2-35.2-9.6 0-22.4 3.2-28.8 9.6l-108.8 99.2c-16 12.8-12.8 35.2 0 48l108.8 96c6.4 6.4 19.2 12.8 28.8 12.8 19.2 0 35.2-12.8 38.4-32 0-12.8-6.4-22.4-16-28.8l-48-44.8h499.2c147.2 0 265.6-118.4 265.6-259.2v-86.4c0-19.2-12.8-32-32-32zM96 556.8c19.2 0 32-12.8 32-32v-89.6c0-112 89.6-201.6 198.4-204.8h496l-41.6 38.4c-6.4 6.4-12.8 16-12.8 25.6 0 19.2 16 35.2 35.2 35.2 9.6 0 22.4-3.2 28.8-9.6l105.6-99.2c16-12.8 12.8-35.2 0-48l-108.8-96c-6.4-6.4-19.2-12.8-28.8-12.8-19.2 0-35.2 12.8-38.4 32 0 12.8 6.4 22.4 16 28.8l48 44.8H329.6C182.4 169.6 64 288 64 438.4v86.4c0 19.2 12.8 32 32 32z\" p-id=\"2974\"></path><path d=\"M544 672V352h-48L416 409.6l16 41.6 60.8-41.6V672z\" p-id=\"2975\"></path></svg>"
    }else{
      this.audio.loop = ''
      this.$loop.innerHTML = "<svg t=\"1518342618936\" class=\"icon icon-loop\" style=\"\" viewBox=\"0 0 1024 1024\" version=\"1.1\"\n" +
          "                             xmlns=\"http://www.w3.org/2000/svg\" p-id=\"3155\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n" +
          "                             width=\"22\" height=\"22\">\n" +
          "                            <defs>\n" +
          "                                <style type=\"text/css\"></style>\n" +
          "                            </defs>\n" +
          "                            <path d=\"M694.4 854.4H195.2l48 44.8c9.6 6.4 16 16 16 28.8-3.2 19.2-19.2 32-38.4 32-9.6 0-22.4-6.4-28.8-12.8l-108.8-96c-12.8-12.8-16-35.2 0-48L192 704c6.4-6.4 19.2-9.6 28.8-9.6 19.2 0 35.2 16 35.2 35.2 0 9.6-6.4 19.2-12.8 25.6l-41.6 38.4h496c112 0 198.4-89.6 198.4-198.4v-86.4c0-19.2 12.8-32 32-32s32 12.8 32 32v86.4c0 140.8-118.4 259.2-265.6 259.2zM329.6 169.6h496l-48-44.8c-9.6-6.4-16-16-16-28.8 3.2-19.2 19.2-32 38.4-32 9.6 0 22.4 6.4 28.8 12.8l108.8 96c12.8 12.8 16 35.2 0 48L832 320c-6.4 6.4-19.2 9.6-28.8 9.6-19.2 0-35.2-16-35.2-35.2 0-9.6 6.4-19.2 12.8-25.6l41.6-38.4H326.4C217.6 233.6 128 323.2 128 435.2v89.6c0 19.2-12.8 32-32 32s-32-12.8-32-32v-86.4C64 288 182.4 169.6 329.6 169.6z\"\n" +
          "                                  p-id=\"3156\"></path>\n" +
          "                        </svg>"
    }
  }
  list(){
    this.$listWrapper.style.display = 'block'
  }
  close() {
    this.$listWrapper.style.display = 'none'
  }
  loadAndPlay(index) {
    this.$playlistItems[this.playlistIndex].classList.remove('active')
    this.playlistIndex = index
    this.$playlistItems[this.playlistIndex].classList.add('active')
    this.song = this.playlist[this.playlistIndex]
    this.load()
    this.play()
  }
  
}

const app = new DoubanFM()
