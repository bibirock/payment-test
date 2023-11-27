<!--
 * @Author: Joe.Chen
 * @Date: 2023-11-27 17:22:47
 * @LastEditors: Joe.Chen joechen@tracle-tw.com
 * @LastEditTime: 2023-11-27 17:25:34
 * @Description: 
-->

<script setup>

const config = useRuntimeConfig();

const appId = config.public.TPD_APP_ID
const appKey = config.public.TPD_APP_KEY

const PageData = {
  isCanGetPrime: ref(false)
}

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

function onUpdated() {
  TPDirect.card.onUpdate(function (update) {
    // update.canGetPrime === true
    // --> you can call TPDirect.card.getPrime()
    if (update.canGetPrime) {
      PageData.isCanGetPrime.value = true
    } else {
      PageData.isCanGetPrime.value = false
    }

    // cardTypes = ['mastercard', 'visa', 'jcb', 'amex', 'unionpay','unknown']
    if (update.cardType === 'visa') {
      // Handle card type visa.
    }

    // number 欄位是錯誤的
    if (update.status.number === 2) {
      // setNumberFormGroupToError()
    } else if (update.status.number === 0) {
      // setNumberFormGroupToSuccess()
    } else {
      // setNumberFormGroupToNormal()
    }

    if (update.status.expiry === 2) {
      // setNumberFormGroupToError()
    } else if (update.status.expiry === 0) {
      // setNumberFormGroupToSuccess()
    } else {
      // setNumberFormGroupToNormal()
    }

    if (update.status.ccv === 2) {
      // setNumberFormGroupToError()
    } else if (update.status.ccv === 0) {
      // setNumberFormGroupToSuccess()
    } else {
      // setNumberFormGroupToNormal()
    }
  })
}

function submit() {
  // 取得 TapPay Fields 的 status
  const tappayStatus = TPDirect.card.getTappayFieldsStatus()

  // 確認是否可以 getPrime
  if (tappayStatus.canGetPrime === false) {
    alert('can not get prime')
    return
  }

  // Get prime
  TPDirect.card.getPrime((result) => {
    if (result.status !== 0) {
      alert('get prime error ' + result.msg)
      return
    }

    alert('get prime 成功，prime: ' + result.card.prime)

    useFetch('https://0.0.0.0:3588', {
      method: 'post'
    })

    // send prime to your server, to pay with Pay by Prime API .
    // Pay By Prime Docs: https://docs.tappaysdk.com/tutorial/zh/back.html#pay-by-prime-api
  })
}

onMounted(() => {
  setupSDK()
  onUpdated()
})

</script>

<template>
  <div>
    金流串接測試
  </div>
  <div class="tpfield" id="card-number"></div>
  <div class="tpfield" id="card-expiration-date"></div>
  <div class="tpfield" id="card-ccv"></div>
  <button :disabled="!PageData.isCanGetPrime.value" @click="submit()">
    <h1>submit!!!!!!</h1>
  </button>
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