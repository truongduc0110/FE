/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        "color-white":"#fff",
        "color-1":"#151515",
        "color-2":"#c14679",
        "color-3":"#A3A3A3",
        "color-4":"#777777",
        "color-5":"#F7F7F7",
        "color-6":"#8c2f55",
        "color-7":"rgba(21, 21, 21, 0.5)",
        "color-8":"#f9faf9",
        "color-9":"#9b9b9b",
        "color-10":"#f5f5f5",
        "color-11":"#ebebeb",
        "color-12":"rgba(21, 21, 21, 0.5)",
        "color-13":"rgb(75 213 156)",
        "color-primary" : 'var(--color-primary)',
        "color-info-dark" : 'var(--color-info-dark)',
        "color-danger" : 'var(--color-danger)',
        "color-success" : 'var(--color-success)',
        "color-warning" : 'var(--color-warning)',
        "color-info-light" : 'var(--color-info-light)',
        "color-dark" : 'var(--color-dark)',
        "color-light" : 'var(--color-light)',
        "color-primary-variant" : 'var(--color-primary-variant)',
        "color-background" : 'var(--color-background)',
        "color-white-2" : "var(--color-white)"
      },
      backgroundImage:{
        "background-image-1": "url('https://res.cloudinary.com/dsxkwbfyq/image/upload/v1722092181/bg-img-1_lfsz8d.jpg')",
        "background-image-2": "url('https://res.cloudinary.com/dsxkwbfyq/image/upload/v1722096041/promo-1-1149x474_deyckp.jpg')",
        "background-image-3": "url('https://res.cloudinary.com/dsxkwbfyq/image/upload/v1722137207/bg-pattern-1_hao7gt.jpg')",
        "background-image-4": "url('https://res.cloudinary.com/dsxkwbfyq/image/upload/v1722155343/breadcrumbs-bg_d5x83i.jpg')",
        "background-image-5": "url('https://res.cloudinary.com/dsxkwbfyq/image/upload/v1722607094/parallax-bg-1_oxzivd.jpg')",
        "background-image-6": "url('https://www.brighteyedbaker.com/wp-content/uploads/2023/08/Chocolate-Fudge-Cake-Recipe.jpg')",
        "background-image-7": "url('https://th.bing.com/th/id/R.b149292f9aedf68e85c5c100d800defa?rik=LMgdzGqQ2Rv6ig&pid=ImgRaw&r=0')",
        "linear-gradient-1" : 'linear-gradient(90deg, #9054F7 0%, #2E8EF5 228.18%)',
      },
      letterSpacing : {
        "spacing-1": "0.2em",
        "spacing-2": "0.075em"
      },
      borderRadius:{
        "radius-1": "50%",
        "border-radius-1" : 'var(--border-radius-1)',
        "card-border-radius" : 'var(--card-border-radius)'
      },
      borderColor:{
        "border-color-1": "#f3f7f8",
        "border-color-2": "#e1e1e1",
        "border-color-3": "#f5543f",
      },
      boxShadow:{
        "shadow-1":"0 5px 16px 0 rgba(0, 0, 0, 0.15)",
        "shadow-2":"0px 3px 8px rgba(0, 0, 0, 0.24)",
        "shadow-3" : "1rem 3rem 4rem var(--color-light)",
        "shadow-4" : "0 1rem 1rem var(--color-light)",
        "shadow-5" : 'var(--box-shadow)'
      },
      fontSize:{
        "font-15": ['15px','25px']
      },
      flex :{
        "flex-1":"0 0 auto"
      },
      gridTemplateColumns:{
        "grid-template-col" : "14rem auto",
        "grid-template-col-lg" : "7rem auto 23rem"
      },
      spacing:{
        "card-padding" : "var(--card-padding)"
      }
    },
  },
  plugins: [],
}

