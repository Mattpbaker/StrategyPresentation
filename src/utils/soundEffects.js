// Sound effects utility
class SoundManager {
  constructor() {
    this.sounds = {}
    this.enabled = true
  }

  loadSound(name, url) {
    const audio = new Audio(url)
    audio.volume = 0.5
    this.sounds[name] = audio
  }

  play(name, volume = 0.5) {
    if (!this.enabled || !this.sounds[name]) return
    
    const sound = this.sounds[name].cloneNode()
    sound.volume = volume
    sound.play().catch(err => console.warn('Sound play failed:', err))
  }

  setEnabled(enabled) {
    this.enabled = enabled
  }

  setVolume(volume) {
    Object.values(this.sounds).forEach(sound => {
      sound.volume = volume
    })
  }
}

export const soundManager = new SoundManager()

// Predefined sound effects (you can add actual audio files)
export const sounds = {
  click: 'click',
  hover: 'hover',
  slide: 'slide',
  success: 'success',
  error: 'error'
}

export default soundManager
