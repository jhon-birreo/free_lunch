$('#datatables').DataTable ({
  "pagingType": "full_numbers",
   "lengthMenu": [
   [10, 25, 50, -1],
  [10, 25, 50, "All"],
  ],
responsive: true,
 language: {
  search: "_INPUT_",
  searchPlaceholder: "Buscar registros",
   "paginate": {
       "first": "<",
       "last": ">",
       "next": ">>",
       "previous": "<<"
   },
   "emptyTable": "No hay información",
   "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
   "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
   "infoFiltered": "(Filtrado de _MAX_ total entradas)",
   "infoPostFix": "",
   "thousands": ",",
   "lengthMenu": "Mostrar _MENU_ Entradas",
   "loadingRecords": "Cargando...",
   "processing": "Procesando...",
   "search": "Buscar:",
   "zeroRecords": "Sin resultados encontrados",
  },
 
});




var table = $('#datatables').DataTable();

