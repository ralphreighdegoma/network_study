
$(document).on('change','#file',function () {
    $('.fileimagename').text($('#file')[0].files[0].name);
});


