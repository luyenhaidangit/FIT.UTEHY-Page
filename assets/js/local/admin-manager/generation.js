$(document).ready(function() {
    renderGenera();

    let modal = $(".manager__modal");
    let modalContent = $(".manager__modal-content");
    let alert = $(".manager__alert");
    let alertContent = $(".manager__alert-content");
    let addBtn = $(".add__btn");
    let closeBtn = $(".manager__modal-close");
    let submitBtn = $(".btn--submit");
    tooltip();

    selectInput();

    addBtn.click(function() {
        resetModal();
        $(".manager__modal-title > h5").html("Nhập thông tin hệ đào tạo");
        modal.addClass("active");
        modalContent.addClass("scale-up-center");
        $(".btn--submit").css("display", "inline-block");
        $(".btn--update").css("display", "none");
        $(".form__input-id").attr("placeholder", generateID());
    })

    closeBtn.click(function() {
        modalContent.removeClass("scale-up-center").addClass("scale-down-center");
        setTimeout(function() {
            modal.removeClass("active");
            modalContent.removeClass("scale-down-center");
        }, 400);

        alertContent.removeClass("scale-up-center").addClass("scale-down-center");
        setTimeout(function() {
            alert.removeClass("active");
            alertContent.removeClass("scale-down-center");
        }, 400);
    })

    let skipBtn = $(".btn__skip");
    skipBtn.click(function() {
        alertContent.removeClass("scale-up-center").addClass("scale-down-center");
        setTimeout(function() {
            alert.removeClass("active");
            alertContent.removeClass("scale-down-center");
        }, 400);
    })

    submitBtn.click(function() {
        if (validateForm().length === 0) {
            addTraining();
        } else {
            for (let i = 0; i < validateForm().length; i++) {
                if (validateForm()[0] === 0) {
                    $(".manager__modal-alert__item.alert--danger__case00").addClass("active open");
                    $(".form__input-name").addClass("form__input--error");
                    $(".form__input-name").focusout(function() {
                        if (validateForm()[0] !== 0) {
                            $(".form__input-name").removeClass("form__input--error");
                            $(".manager__modal-alert__item.alert--danger__case00").addClass("close");
                            setTimeout(function() {
                                $(".manager__modal-alert__item.alert--danger__case00").removeClass("active open close");
                            }, 1000);
                        }
                    });
                }
            }
        }
    })
});

//ADD
function resetModal() {
    $(".manager__modal-alert__item").removeClass("active open");
    $(".form__input-name").removeClass("form__input--error");
    let inputOptionFirts = $(".input__option:first-child");
    $(".input__select-value").html($(inputOptionFirts).children().html());
    $(".form__input-name").val("");
    $(".form__input-desc").val("");
}

function generateID() {
    let listGenera = localStorage.getItem("listGenera") ?
        JSON.parse(localStorage.getItem("listGenera")) : [];
    let listid = [];
    for (let i = 0; i < listGenera.length; i++) {
        listid.push(listGenera[i].id);
    }
    let autoID = listid.length > 0 ? Math.max(...listid) + 1 : 1160;
    return autoID;
}

function addTraining() {
    let listGenera = localStorage.getItem("listGenera") ?
        JSON.parse(localStorage.getItem("listGenera")) : [];
    let id = generateID();
    let name = $(".form__input-name").val();
    let status = $(".form__input-select").text();
    let desc = $(".form__input-desc").val();
    listGenera.push({
        id: id,
        name: name,
        status: status,
        desc: desc,
    });
    let modal = $(".manager__modal");
    let modalContent = $(".manager__modal-content");
    modalContent.removeClass("scale-up-center").addClass("scale-down-center");
    setTimeout(function() {
        modal.removeClass("active");
        modalContent.removeClass("scale-down-center");
    }, 400);
    localStorage.setItem("listGenera", JSON.stringify(listGenera));
    renderGenera();
}

//EDIT
function loadModal(index) {
    let listGenera = localStorage.getItem("listGenera") ?
        JSON.parse(localStorage.getItem("listGenera")) : [];
    $(".form__input-id").attr("placeholder", listGenera[index].id);
    $(".form__input-name").val(listGenera[index].name);
    $(".input__select-value").html(listGenera[index].status);
    $(".form__input-desc").val(listGenera[index].desc);
}

function editObj(index) {
    $(".get-index").val(index);
    $(".manager__modal").addClass("active");
    $(".manager__modal-content").addClass("scale-up-center");
    $(".manager__modal-title > h5").html("Cập nhật thông tin hệ đào tạo");
    $(".btn--submit").css("display", "none");
    $(".btn--update").css("display", "inline-block");
    loadModal(index);
}

function editGenera() {
    if (validateForm().length === 0) {
        let listGenera = localStorage.getItem("listGenera") ?
            JSON.parse(localStorage.getItem("listGenera")) : [];
        let index = $(".get-index").val();
        let id = $(".form__input-id").attr("placeholder");
        let name = $(".form__input-name").val();
        let status = $(".form__input-select").text();
        let desc = $(".form__input-desc").val();
        listGenera[index] = {
            id: id,
            name: name,
            status: status,
            desc: desc,
        }
        localStorage.setItem("listGenera", JSON.stringify(listGenera));
        renderGenera();
        let modal = $(".manager__modal");
        let modalContent = $(".manager__modal-content");
        modalContent.removeClass("scale-up-center").addClass("scale-down-center");
        setTimeout(function() {
            modal.removeClass("active");
            modalContent.removeClass("scale-down-center");
        }, 400);
    } else {
        for (let i = 0; i < validateForm().length; i++) {
            if (validateForm()[0] === 0) {
                $(".manager__modal-alert__item.alert--danger__case00").addClass("active open");
                $(".form__input-name").addClass("form__input--error");
                $(".form__input-name").focusout(function() {
                    if (validateForm()[0] !== 0) {
                        $(".form__input-name").removeClass("form__input--error");
                        $(".manager__modal-alert__item.alert--danger__case00").addClass("close");
                        setTimeout(function() {
                            $(".manager__modal-alert__item.alert--danger__case00").removeClass("active open close");
                        }, 1000);
                    }
                });
            }
        }
    }
}

//DELETE
function deleteObj(index) {
    $(".get-index").val(index);
    console.log(typeof $(".get-index").val());
    let modal = $(".manager__alert");
    let modalContent = $(".manager__alert-content");
    let deleteBtn = $(".table__icon-delete");
    let closeBtn = $(".manager__modal-close");
    deleteBtn.click(function() {
        $(".manager__modal-title > h5").html("Xóa thông tin hệ đào tạo");
        modal.addClass("active");
        modalContent.addClass("scale-up-center");
    })
    let listGenera = localStorage.getItem("listGenera") ?
        JSON.parse(localStorage.getItem("listGenera")) : [];
    let idObj = listGenera[index].id;
    $(".get-id-del").html(idObj);
}

function deleteGenera() {
    let listGenera = localStorage.getItem("listGenera") ?
        JSON.parse(localStorage.getItem("listGenera")) : [];
    let index = $(".get-index").val();
    listGenera.splice(index, 1);
    localStorage.setItem("listGenera", JSON.stringify(listGenera));
    renderGenera();
    let alert = $(".manager__alert");
    let alertContent = $(".manager__alert-content");
    alertContent.removeClass("scale-up-center").addClass("scale-down-center");
    setTimeout(function() {
        alert.removeClass("active");
        alertContent.removeClass("scale-down-center");
    }, 400);
}

//DISPLAY
function displayObj(index) {
    $(".get-index").val(index);
    $(".manager__modal").addClass("active");
    $(".manager__modal-content").addClass("scale-up-center");
    $(".manager__modal-title > h5").html("Hiển thị thông tin hệ đào tạo");
    $(".btn--submit").css("display", "none");
    $(".btn--update").css("display", "none");
    loadModal(index);
}

//ORTHER
function tooltip() {
    $(".table__icon").click(function() {
        $(this).siblings().toggle();

    })
}

function selectInput() {
    let inputSelect = $(".input__select");
    let inputListOption = $(".input__list-option");
    let inputOption = $(".input__option");


    $(inputSelect).click(function(e) {
        e.preventDefault();
        $(inputListOption).toggle();
    });

    $(inputOption).click(function(e) {
        e.preventDefault();
        $(".input__select-value").html($(this).children().html());
    });
}

//RENDER
function renderGenera() {
    let listGenera = localStorage.getItem("listGenera") ?
        JSON.parse(localStorage.getItem("listGenera")) : [];

    let genera = `
    <thead>
        <tr class="table__data-tr">
            <th class="table__data-th obj__id" rowspan="1" colspan="1">Mã hệ đào tạo</th>
            <th class="table__data-th obj__name" rowspan="1" colspan="1">Tên hệ đào tạo</th>
            <th class="table__data-th obj__status" rowspan="1" colspan="1">Tình trạng</th>
            <th class="table__data-th obj__desc" rowspan="1" colspan="1">Mô tả</th>
            <th class="table__data-th obj__act" rowspan="1" colspan="1">Thao tác</th>
        </tr>
    </thead>`

    for (let i = 0; i < listGenera.length; i++) {
        let statusColor = "";
        if (listGenera[i].status === "Hoạt động") {
            statusColor = "active";
        } else {
            statusColor = "disable";
        }
        genera += `<tbody>
        <tr class="table__data-tr">
            <td class="table__data-td ">${listGenera[i].id}</td>
            <td class="table__data-td">${listGenera[i].name}</td>
            <td class="table__data-td obj__status ${statusColor}">${listGenera[i].status}</td>
            <td class="table__data-td obj__desc">
            <i class="table__icon far fa-eye"></i>
            <div class="tooltip__desc">${listGenera[i].desc}</div>
            </td>
            <td class="table__data-td">
                <a class="edit__btn" href="#" onclick="editObj(${i})"><i class="table__icon table__icon-edit fas fa-pen"></i></a>
                <a class="delete__btn" href="#" onclick="deleteObj(${i})"><i class="table__icon table__icon-delete fas fa-trash"></i></a>
                <a class="display__btn" href="#" onclick="displayObj(${i})"><i class="table__icon table__icon-display fas fa-user"></i></a>
            </td>
        </tr>
    </tbody>`
    }
    $(".table").html(genera);

}