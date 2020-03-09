$(document).ready(function()
{
    let page = 0;
    let lastRqst;
    
    const imprimirResultado = function (result) {
        $('#respuesta__contenido').html('');
        result.forEach(function(data) {
            let estructura = `
                    <a class="respuesta__descripcion" href="${data.url}" target="_blank">
                        <div class="respuesta__descripcion_img">
                            <img src=${data.company_logo} alt="Company Logo">
                        </div>
                        <div class="respuesta__descripcion_texto">
                            <h2 class="respuesta__titulo">${data.title}</h2>
                            <div class="respuesta__detalles">
                                <h3 class="respuesta__tipo">${data.type}</h3>
                                <h4 class="respuesta__locacion">${data.location}</h4>
                            </div>
                        </div>
                    </a>`;
            $('#respuesta__contenido').html(
                $('#respuesta__contenido').html() + estructura
            );
        });
    };
    const pagSgte = function() {
        let lastPage = page;
        lastPage++;
        $.ajax({
            url: `${lastRqst}&page=${lastPage}`,
            method: "GET"
        })
        .done(function(res){
            console.log(res);
            console.log(lastPage);
            if(res.length == 0) return;
            imprimirResultado(res);
            page = lastPage;
        });
    };
    const pagAnte = function() {
        let lastPage = page;
        if(page == 0) return;
        lastPage--;
        $.ajax({
            url: `${lastRqst}&page=${lastPage}`,
            method: "GET"
        })
        .done(function(res){
            console.log(res);
            console.log(lastPage);
            imprimirResultado(res);
            page = lastPage;
        });
    };
    const pagActual = function() {
        let aPage = page + 1;
        console.log(aPage);
        $('#actual-page').html(`Estás en la página ${aPage}`);
    };

    $('#jobsForm').submit(function() 
    {
        event.preventDefault();
        let consulta = $('#jobsInput').val();
        page = 0;
        lastRqst = `https://corsanywhere.herokuapp.com/https://jobs.github.com/positions.json?${consulta}`;
        let request = $.ajax({
            url: `${lastRqst}&page=${page}`,
            method: "GET"
        });
        // hacer que las funciones de abajo sean asíncronas y esperen al Ajax
        // de pronto puedo hacer que el ajax sea promesa
        request.done(function(res){
            console.log(res);
            console.log(page);
            imprimirResultado(res);
        });
        request.fail(function(request, statusText)
        {
            console.log(statusText);
        });
    });     
    $('#previous').click(pagAnte); //se lo paso como variable para que no se ejecute al abrir la pag
    pagActual();
    $('#next').click(pagSgte);
});