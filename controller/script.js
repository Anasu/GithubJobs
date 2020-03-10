$(document).ready(function()
{
    let page = 0;
    let lastRqst;
    let typeRqst;

    const imprimirResultado = function (result) {
        $('#respuesta__contenido').html('');
        result.forEach(function(data) {
            let structure = `
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
                $('#respuesta__contenido').html() + structure
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
    const searchType = function() {
        // Reset
        $('#descriptionInput').removeClass('hidden');
        $('#locationInput').removeClass('hidden');
        $('#descriptionInput').addClass('hidden');
        $('#locationInput').addClass('hidden');
        // Evaluación
        switch ($('#formType').val()) {
            case 'description':
                $('#inputs input').removeClass('hidden')
                    .attr('placeholder', 'Descripción')
                    .attr('id','descriptionInput');
                $('#descriptionInput').val('');
                typeRqst = 'description';
                break;
            case 'location':
                $('#inputs input').removeClass('hidden')
                    .attr('placeholder', 'Ciudad o país')
                    .attr('id','locationInput');
                $('#locationInput').val('');
                typeRqst = 'location';
                break;
            default:
                console.log('Selecciona algo po D:<');
        }
    }

    $('#formType').on('click',searchType);
    $('#jobsForm').submit(function() 
    {
        event.preventDefault();
        let request = $(`#${typeRqst}Input`).val();
        let fullTime = $('#fullTime').is(":checked");
        page = 0;
        lastRqst = `https://corsanywhere.herokuapp.com/` +
            `https://jobs.github.com/positions.json?${typeRqst}=${request}&full_time=${fullTime}`;
        $('#respuesta__contenido').html(`<img src="img/loading.gif" alt="loading">`);
        const apiRqst = async function() {
            let res = await fetch(lastRqst);
            let toJson = await res.json();

            console.log(toJson);
            imprimirResultado(toJson);
        };
        apiRqst();
        pagActual();
    });     
    $('#previous').click(pagAnte);
    $('#next').click(pagSgte);
});