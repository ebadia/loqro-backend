const productTmp = {
  id: 1,
  dos: 'dos',
  tres: 3
}

const product = {
  dos: 'newdos'
}

const anItem = { ...productTmp, ...product }

console.log('anItem :', anItem)
