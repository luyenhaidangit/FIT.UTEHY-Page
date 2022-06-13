$(document).ready(function() {
    selectInput();
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