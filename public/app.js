document.querySelectorAll('.price').forEach(node => {
    node.textContent = new Intl.NumberFormat('en-EN', {
        currency: 'usd',
        style: 'currency'
    }).format(node.textContent)
})