<template>
    <center>
        <h1>Opa, você ta um pouco perdido...</h1>
        <p>
            <a href="/">Voltar para o ínicio</a>
        </p>
    </center>
</template>
  
<script>

export default {
    metaInfo: {
        title: 'Opa...',
        titleTemplate: null,
        meta: [
            { name: 'description', content: 'Parece que você entrou em uma URL que não existe...' },
        ]
    },
    name: 'NotFound'
}

</script>
  
<style scoped>
center {
    margin: 15vw;
}

h1 {
    color: var(--border);
    font-size: 2em;
}
</style>