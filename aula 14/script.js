const apiUrl = 'https:\\api.exemplo.com/dados';
fetch(apiUrl)
.then(response => {
    if (!response.ok){
        throw new Error('A solicitação não foi bem-sucedida.');
    }
    return response.json();
})
.then(data => {
    console.log(data)
})
.catch(error => {
    alert('Erro: ' + error.messege)

});