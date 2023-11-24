/*
 * @Author: Joe.Chen
 * @Date: 2023-11-24 04:14:05
 * @LastEditors: Joe.Chen joechen@tracle-tw.com
 * @LastEditTime: 2023-11-24 08:47:27
 * @Description: 
 */

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      script: [
        {
          src: 'https://js.tappaysdk.com/sdk/tpdirect/v5.17.0'
        }
      ],
    }
  },
  runtimeConfig: {
    public: {
      TPD_APP_ID: process.env.TPD_APP_ID,
      TPD_APP_KEY: process.env.TPD_APP_KEY
    }
  }
})
