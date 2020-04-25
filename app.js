$(document).ready(function(){ 
    let edit=false;
  $('#task-result').hide();
fetchTasks();  
    $('#search').keyup(function(e){
         let search=$('#search').val();
         $.ajax({
             url:'task-search.php',
             type:'POST',
             data:{search},
             success:function(response){

                 let tasks= JSON.parse(response);

                 let template='';
                 tasks.forEach(task=>{
                     template+=`<li>
                          ${task.name}
                          </li>`
                 });
                 $('#container').html(template);
                 $('#task-result').show();

             }
         })
         
     })

     $('#task-form').submit(function(e){
      const postData={
        name:$('#name').val(),
        description:$('#description').val(),
        id:$('#taskId').val(),
      };
      let url= edit===false ? 'task-add.php':'task-edit.php';
//Funcion de JQuery envia info al back
        $.post(url,postData,function(response){
            fetchTasks();
            $('#task-form').trigger('reset');
        });
             //Evita el envio de un formulario es decir que se refresque

        e.preventDefault();
        

    });
   
   function fetchTasks() {
        //Esto se ejecuta apenas inicie la aplicación no depende de ningún evento
    $.ajax({
        url:'task-list.php',
        type:'GET',
        success: function(response){
            let tasks=JSON.parse(response);
            let template='';
                 tasks.forEach(task=>{
                     template+=`<tr taskId="${task.id}">
                     <td>${task.id}</td>
                    <td> <a href="#" class="task-item">${task.name}</a></td>
                     <td>${task.description}</td>
                     <td>
                     <button class="task-delete btn btn-danger btn-block">DELETE</button>

                     </td>        
                     </tr>`
                 });
                 $('#tasks').html(template);
        }
    })

 
   }

   $(document).on('click','.task-delete', function(){
     if (confirm('Are you sure you want to delete it?')) {
           //A partir del boton ir subiendo eleentos hasta llegar al id parent   
    let element=$(this)[0].parentElement.parentElement;//[0] esta el boton q doy click
    let id=$(element).attr('taskId');//Esto lo declaro en el momento de llenar la tabla
    $.post('task-delete.php',{id},function(response){
        fetchTasks();

            });
     }
    
   })

   $(document).on('click','.task-item',function(){
    let element=$(this)[0].parentElement.parentElement;//[0] esta el boton q doy click
    let id=$(element).attr('taskId');//Esto lo declaro en el momento de llenar la tabla   
    $.post('task-single.php',{id},function(response){
        const task=JSON.parse(response);
        
        $('#name').val(task.name);
        $('#description').val(task.description);
        $('#taskId').val(task.id);
        edit=true;
       
            });
       
   })

});

