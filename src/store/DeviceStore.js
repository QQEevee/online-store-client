import { makeAutoObservable } from 'mobx'

export default class DeviceStore {
  constructor() {
    this._device = { info: [] }
    this._types = []
    this._brands = []
    this._devices = []
    this._selectedType = {}
    this._selectedBrand = {}
    this._selectedTypes = []
    this._selectedBrands = []
    this._page = 1
    this._totalCount = 0
    this._limit = 12
    makeAutoObservable(this)
  }

  setDevice(device) {
    this._device = device
  }
  setTypes(types) {
    this._types = types
  }
  setBrands(brands) {
    this._brands = brands
  }
  setDevices(devices) {
    this._devices = devices
  }
  setSelectedType(type) {
    this._selectedType = type
  }
  setSelectedBrand(brand) {
    this._selectedBrand = brand
  }
  setSelectedTypes(types) {
    this._selectedTypes = types
  }
  setSelectedBrands(brands) {
    this._selectedBrands = brands
  }
  setPage(page) {
    this._page = page
  }
  setTotalCount(totalCount) {
    this._totalCount = totalCount
  }
  setLimit(limit) {
    this._limit = limit
  }

  get device() {
    return this._device
  }
  get types() {
    return this._types
  }
  get brands() {
    return this._brands
  }
  get devices() {
    return this._devices
  }
  get selectedType() {
    return this._selectedType
  }
  get selectedBrand() {
    return this._selectedBrand
  }
  get selectedTypes() {
    return this._selectedTypes
  }
  get selectedBrands() {
    return this._selectedBrands
  }

  get page() {
    return this._page
  }
  get totalCount() {
    return this._totalCount
  }
  get limit() {
    return this._limit
  }
}
