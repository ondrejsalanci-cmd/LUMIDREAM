import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
const base = process.env.GITHUB_PAGES === 'true' ? '/LUMIDREAM/' : '/'
export default defineConfig({base, plugins:[react(),VitePWA({
 registerType:'autoUpdate',includeAssets:['icon.svg'],
 manifest:{name:'LUMIDREAM — Lucidné snívanie',short_name:'LUMIDREAM',description:'Osobný tréner lucidného snívania',theme_color:'#0b0c1d',background_color:'#0b0c1d',display:'standalone',start_url:base,scope:base,lang:'sk',icons:[{src:base+'icon.svg',sizes:'any',type:'image/svg+xml',purpose:'any'}]},
 workbox:{navigateFallback:base+'index.html',globPatterns:['**/*.{js,css,html,svg,png,ico,webp}']}
 })]})
