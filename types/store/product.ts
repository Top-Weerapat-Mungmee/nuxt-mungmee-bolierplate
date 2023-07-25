export interface IProductAttribute {
  name: string
  sku: string
  price: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  uuid?: string | null
}

export interface IProduct {
  id: number
  attributes: IProductAttribute
}

export interface IProductByIdPayload {
  _key?: any
  data: IProduct
  error?: string | null
}

export interface IProductKeys {
  isLoading: boolean
  isFetch: boolean
  error?: string | null
  data?: IProduct
}

export interface IProductKeyValue {
  [key: string]: IProductKeys
}

export interface IDataCRUD {
  id: number
  isLoading: boolean
  error?: string | null
}
export interface IProductCRUD {
  create: IDataCRUD
  update: IDataCRUD
  delete: IDataCRUD
}

export interface IProductState {
  isLoading: boolean
  isFetch: boolean
  error: string | null
  lists: IProduct[]
  keys: IProductKeyValue
  crud: IProductCRUD
}

export interface IProductForm {
  name: string
  sku: string
  price: number
}

export interface IProductUpdateForm {
  id: string
  form: IProductForm
}
