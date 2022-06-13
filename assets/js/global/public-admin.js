$(document).ready(function() {
    selectInput();

    toolTip();
});

//Mô phỏng thẻ Select - Option
function selectInput() {
    let inputSelect = $(".input__select");
    let inputOption = $(".input__option");

    $(inputSelect).click(function(e) {
        e.preventDefault();
        $(this).children(".input__list-option").toggle();
    });

    $(inputOption).click(function(e) {
        e.preventDefault();
        $(this).parents(".input__list-option").siblings(".input__select-value").html($(this).children().html());
    });
}

//Bật tắt tooltip
function toolTip() {
    $(".table__icon").click(function() {
        console.log("ok");
        $(this).siblings().toggle();
    })
}



//Đóng modal
function closeModal() {
    $(".manager__modal-content").removeClass("scale-up-center").addClass("scale-down-center");
    setTimeout(function() {
        $(".manager__modal").removeClass("active");
        $(".manager__modal-content").removeClass("scale-down-center");
    }, 400);

    $(".manager__alert-content").removeClass("scale-up-center").addClass("scale-down-center");
    setTimeout(function() {
        $(".manager__alert").removeClass("active");
        $(".manager__alert-content").removeClass("scale-down-center");
    }, 400);
}