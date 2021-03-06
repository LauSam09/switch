const url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
// Development server will proxy all requests whereas production needs a specific base url.
export const BASE_URL = process.env.NODE_ENV === 'production'
  ? url + '/database'
  : url

export const CATEGORIES = [
  { name: 'other', color: '#B7B7B7', fontColour: '#FFFFFF' },
  { name: 'fresh', color: '#95D5B7', fontColour: '#FFFFFF' },
  { name: 'dairy', color: '#E8DE86', fontColour: '#FFFFFF' },
  { name: 'cupboard', color: '#D0BAD0', fontColour: '#FFFFFF' },
  { name: 'drinks', color: '#A4C7DB', fontColour: '#FFFFFF' },
  { name: 'frozen', color: '#1B6DE3', fontColour: '#FFFFFF' },
  { name: 'meat', color: '#FFB0B0', fontColour: '#FFFFFF' },
  { name: 'fruit and vegetables', color: '#74AC72', fontColour: '#FFFFFF' },
  { name: 'home', color: '#9B8080', fontColour: '#FFFFFF' }
]

export const DAYS = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']
