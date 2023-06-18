module.exports = {
  content: [],
  theme: { 
    fontFamily: {
      'sans': ['neue-haas-grotesk-text', 'serif'],
      'serif': ['kepler-std-display', 'sans-serif'], 
      'script': ['Calaya', 'script']
    }, 
    extend: {
      colors: {
        'primary': '#234C5C', 
        'primary-light': '#395E6D', 
        'primary-lighter': "#5A7985", 
        'primary-dark': "#1A3945", 
        'secondary': '#3DBDFF',
        'gray-lighter': "#EEEEEE",  
        'gray-light': '#C8D2D6', 
        'gray': "#707070", 
        'gray-dark': "#333333", 
        "success": "#6DE093", 
        "accent": "#FA5F55"
      }, 
      borderRadius: {
        'sm': '3px'
      }, 
      padding: {
        'row': '5vw', 
        'row2x': '10vw'
      }, 
      margin: {
        'row': '5vw',
        'row2x': '10vw'
      }, 
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
      }, 
      gridColumn: {
        'span-18': 'span 18 / span 18',
        'span-10': 'span 10 / span 10',
        'span-2': 'span 2 / span 2',
      },
      gridColumnStart: {
        '2': '2',
        // add more if needed
      },
      gridColumnEnd: {
        // add as needed
      },
      gridColumnSpan: {
        // add as needed
      },
    },
  },
  plugins: [],
}

