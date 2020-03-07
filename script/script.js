$(document).ready(function()
{
    $('#jobsForm').submit(function() 
    {
        event.preventDefault();
        let consulta = $('#jobsInput').val();
        let request = $.ajax({
            url: `https://corsanywhere.herokuapp.com/https://jobs.github.com/positions.json?${consulta}`,
            method: "GET"
        });
        // hacer que las funciones de abajo sean asíncronas y esperen al Ajax
        // de pronto puedo hacer que el ajax sea promesa
        request.done(function(result){
            console.log(result);
        });
        request.fail(function(request, statusText)
        {
            errorMsg();
        });
    }); 	
});