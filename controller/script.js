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
        showPagin();
    };
    const pagSgte = function() {
        let lastPage = page;
        lastPage++;
        const pagRqst = async function() {
            let res = await fetch(`${lastRqst}&page=${lastPage}`);
            let toJson = await res.json();

            if(toJson.length == 0) return;
            imprimirResultado(toJson);
            page = lastPage;
            pagActual();
        };
        pagRqst();
    };
    const pagAnte = function() {
        let lastPage = page;
        if(page == 0) return;
        lastPage--;
        const pagRqst = async function() {
            let res = await fetch(`${lastRqst}&page=${lastPage}`);
            let toJson = await res.json();

            if(toJson.length == 0) return;
            imprimirResultado(toJson);
            page = lastPage;
            pagActual();
        };
        pagRqst();
    };
    const pagActual = function() {
        let aPage = page + 1;
        //console.log(aPage);
        $('#actual-page').html(`Estás en la página ${aPage}`);
    };
    const showPagin = function() {
        $('#pagination').removeClass('hidden');
    };

    $('#jobsForm').submit(function() 
    {
        event.preventDefault();
        let consulta = $('#jobsInput').val();
        page = 0;
        lastRqst = `https://corsanywhere.herokuapp.com/https://jobs.github.com/positions.json?${consulta}`;
        const request = async function() {
            let res = await fetch(lastRqst);
            let toJson = await res.json();

            console.log(toJson);
            imprimirResultado(toJson);
        };
        request();
        pagActual();
    });     
    $('#previous').click(pagAnte); //se lo paso como variable para que no se ejecute al abrir la pag
    $('#next').click(pagSgte);
});