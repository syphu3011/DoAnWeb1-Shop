async function test() {
    let data =  await get('./Server/product/products.php')    
    console.log(data)
    console.log('ngon')
}
test()