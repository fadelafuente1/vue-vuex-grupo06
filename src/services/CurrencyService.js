import Api from './Api';

export default {
  getCurrency (params) {
    return Api().get(`/latest?base=${params.baseCurrency}`)
  }
}
