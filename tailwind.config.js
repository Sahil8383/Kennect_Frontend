const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      'smt': {'max': '425px'},

      'mdt': {'min': '425px', 'max': '768px'},

      'lgt': {'min': '768px', 'max': '1024px'},

      'xlt': {'min': '1024px', 'max': '1440px'},
    },
  },
  plugins: [],
});