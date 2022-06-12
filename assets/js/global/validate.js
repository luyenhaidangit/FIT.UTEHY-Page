$(document).ready(function() {
    validateForm();
});

function validateForm() {
    let listError = [];
    //Tên trống
    if ($(".form__input-name").val() === "") {
        listError[0] = 0;
    }
    //Ngày tháng trống
    if ($(".form__input-date").val() === "") {
        listError[1] = 1;
    }
    //Địa chỉ trống
    if ($(".form__input-andress").val() === "") {
        listError[2] = 2;
    }
    //Số điện thoại trống
    if ($(".form__input-phone").val() === "") {
        listError[3] = 3;
    }
    //Số trống
    if ($(".form__input-num").val() === "") {
        listError[4] = 4;
    }
    //Kiểm tra số tín chỉ hợp lệ
    if ($(".form__input-num").val() > 12 || $(".form__input-num").val() < 1) {
        listError[5] = 5;
    }

    let listSchedule = localStorage.getItem("listSchedule") ?
        JSON.parse(localStorage.getItem("listSchedule")) : [];
    let arrIDClass = $(".input__select-value__class").text().split('-');
    let idClass = arrIDClass[0].trim();
    let arrIDSubject = $(".input__select-value__subject").text().split('-');
    let idSubject = arrIDSubject[0].trim();
    for (let i = 0; i < listSchedule.length; i++) {
        if (idClass === listSchedule[i].idClass && idSubject === listSchedule[i].idSubject) {
            listError[6] = 6;
            break;
        }
    }


    if ($(".form__input-semester").val() > 8 || $(".form__input-num").val() < 1) {
        listError[7] = 7;
    }

    //Số trống
    if ($(".form__input-semester").val() === "") {
        listError[8] = 8;
    }

    return listError;
}