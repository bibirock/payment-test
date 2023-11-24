<!--
 * @Author: Joe.Chen
 * @Date: 2023-11-24 04:05:20
 * @LastEditors: Joe.Chen joechen@tracle-tw.com
 * @LastEditTime: 2023-11-24 08:52:31
 * @Description: 
-->

<script setup>

const config = useRuntimeConfig();

const appId = config.public.TPD_APP_ID
const appKey = config.public.TPD_APP_KEY

function setupSDK() {
  // 登入後台相關資訊
  TPDirect.setupSDK(appId, appKey, 'sandbox')

  // 設定欄位資料
  const fields = {
    number: {
      // css selector
      element: '#card-number',
      placeholder: '**** **** **** ****'
    },
    expirationDate: {
      // DOM object
      element: document.getElementById('card-expiration-date'),
      placeholder: 'MM / YY'
    },
    ccv: {
      element: '#card-ccv',
      placeholder: 'ccv'
    }
  }

  // 欄位初始化
  TPDirect.card.setup({
    fields: fields,
    styles: {
      // Style all elements
      'input': {
        'color': 'gray'
      },
      // Styling ccv field
      'input.ccv': {
        'font-size': '16px'
      },
      // Styling expiration-date field
      'input.expiration-date': {
        'font-size': '16px'
      },
      // Styling card-number field
      'input.card-number': {
        'font-size': '16px'
      },
      // style focus state
      ':focus': {
        'color': 'black'
      },
      // style valid state
      '.valid': {
        'color': 'green'
      },
      // style invalid state
      '.invalid': {
        'color': 'red'
      },
      // Media queries
      // Note that these apply to the iframe, not the root window.
      '@media screen and (max-width: 400px)': {
        'input': {
          'color': 'orange'
        }
      }
    },
    // 此設定會顯示卡號輸入正確後，會顯示前六後四碼信用卡卡號
    isMaskCreditCardNumber: true,
    maskCreditCardNumberRange: {
      beginIndex: 6,
      endIndex: 11
    }
  })

}

onMounted(() => {
  setupSDK()
})

</script>

<template>
  <div>
    金流串接測試
  </div>
  <div class="tpfield" id="card-number"></div>
  <div class="tpfield" id="card-expiration-date"></div>
  <div class="tpfield" id="card-ccv"></div>
</template>

<style>
.tpfield {
  height: 40px;
  width: 300px;
  border: 1px solid gray;
  margin: 5px 0;
  padding: 5px;
}
</style>