$(document).ready(function() {
    renderTraning();

    let modal = $(".manager__modal");
    let modalContent = $(".manager__modal-content");
    let alert = $(".manager__alert");
    let alertContent = $(".manager__alert-content");
    let addBtn = $(".add__btn");
    var editBtn = $(".edit__btn");
    let closeBtn = $(".manager__modal-close");
    let submitBtn = $(".btn--submit");
    var indexEdit = 0;
    tooltip();

    // selectInput();

    addBtn.click(function() {
        resetModal();
        $(".manager__modal-title > h5").html("Nhập thông tin chuyên ngành");
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

function displayObj(index) {
    $(".get-index").val(index);
    $(".manager__modal").addClass("active");
    $(".manager__modal-content").addClass("scale-up-center");
    $(".manager__modal-title > h5").html("Hiển thị thông tin chuyên ngành");
    $(".btn--submit").css("display", "none");
    $(".btn--update").css("display", "none");
    loadModal(index);
}

function editObj(index) {
    $(".get-index").val(index);
    $(".manager__modal").addClass("active");
    $(".manager__modal-content").addClass("scale-up-center");
    $(".manager__modal-title > h5").html("Cập nhật thông tin chuyên ngành");
    $(".btn--submit").css("display", "none");
    $(".btn--update").css("display", "inline-block");
    loadModal(index);
}

function deleteObj(index) {
    $(".get-index").val(index);
    console.log(typeof $(".get-index").val());
    let modal = $(".manager__alert");
    let modalContent = $(".manager__alert-content");
    let deleteBtn = $(".table__icon-delete");
    let closeBtn = $(".manager__modal-close");
    deleteBtn.click(function() {
        $(".manager__modal-title > h5").html("Xóa thông tin chuyên ngành");
        modal.addClass("active");
        modalContent.addClass("scale-up-center");
    })
    let listTraining = localStorage.getItem("listTraining") ?
        JSON.parse(localStorage.getItem("listTraining")) : [];
    let idObj = listTraining[index].id;
    $(".get-id-del").html(idObj);
}

function deleteTraining() {
    let listTraining = localStorage.getItem("listTraining") ?
        JSON.parse(localStorage.getItem("listTraining")) : [];
    let index = $(".get-index").val();
    listTraining.splice(index, 1);
    localStorage.setItem("listTraining", JSON.stringify(listTraining));
    renderTraning();
    let alert = $(".manager__alert");
    let alertContent = $(".manager__alert-content");
    alertContent.removeClass("scale-up-center").addClass("scale-down-center");
    setTimeout(function() {
        alert.removeClass("active");
        alertContent.removeClass("scale-down-center");
    }, 400);
}

function editTraining() {
    if (validateForm().length === 0) {
        let listTraining = localStorage.getItem("listTraining") ?
            JSON.parse(localStorage.getItem("listTraining")) : [];
        let index = $(".get-index").val();
        let id = $(".form__input-id").attr("placeholder");
        let name = $(".form__input-name").val();
        let status = $(".form__input-select").text();
        let desc = $(".form__input-desc").val();
        listTraining[index] = {
            id: id,
            name: name,
            status: status,
            desc: desc,
        }
        localStorage.setItem("listTraining", JSON.stringify(listTraining));
        renderTraning();
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

function loadModal(index) {
    let listTraining = localStorage.getItem("listTraining") ?
        JSON.parse(localStorage.getItem("listTraining")) : [];
    $(".form__input-id").attr("placeholder", listTraining[index].id);
    $(".form__input-name").val(listTraining[index].name);
    $(".input__select-value").html(listTraining[index].status);
    $(".form__input-desc").val(listTraining[index].desc);
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

function resetModal() {
    $(".manager__modal-alert__item").removeClass("active open");
    $(".form__input-name").removeClass("form__input--error");
    let inputOptionFirts = $(".input__option:first-child");
    $(".input__select-value").html($(inputOptionFirts).children().html());
    $(".form__input-name").val("");
    $(".form__input-desc").val("");
}

function renderTraning() {
    let listTraining = localStorage.getItem("listTraining") ?
        JSON.parse(localStorage.getItem("listTraining")) : [];

    let traning = `
    <thead>
        <tr class="table__data-tr">
            <th class="table__data-th obj__id" rowspan="1" colspan="1">Mã chuyên ngành</th>
            <th class="table__data-th obj__name" rowspan="1" colspan="1">Tên chuyên ngành</th>
            <th class="table__data-th obj__status" rowspan="1" colspan="1">Tình trạng</th>
            <th class="table__data-th obj__desc" rowspan="1" colspan="1">Mô tả</th>
            <th class="table__data-th obj__act" rowspan="1" colspan="1">Thao tác</th>
        </tr>
    </thead>`

    for (let i = 0; i < listTraining.length; i++) {
        let statusColor = "";
        if (listTraining[i].status === "Hoạt động") {
            statusColor = "active";
        } else {
            statusColor = "disable";
        }
        traning += `<tbody>
        <tr class="table__data-tr">
            <td class="table__data-td ">${listTraining[i].id}</td>
            <td class="table__data-td">${listTraining[i].name}</td>
            <td class="table__data-td obj__status ${statusColor}">${listTraining[i].status}</td>
            <td class="table__data-td obj__desc">
            <i class="table__icon far fa-eye"></i>
            <div class="tooltip__desc">${listTraining[i].desc}</div>
            </td>
            <td class="table__data-td">
                <a class="edit__btn" href="#" onclick="editObj(${i})"><i class="table__icon table__icon-edit fas fa-pen"></i></a>
                <a class="delete__btn" href="#" onclick="deleteObj(${i})"><i class="table__icon table__icon-delete fas fa-trash"></i></a>
                <a class="display__btn" href="#" onclick="displayObj(${i})"><i class="table__icon table__icon-display fas fa-user"></i></a>
            </td>
        </tr>
    </tbody>`
    }
    $(".table").html(traning);
}



function generateID() {
    let listTraining = localStorage.getItem("listTraining") ?
        JSON.parse(localStorage.getItem("listTraining")) : [];
    let listid = [];
    for (let i = 0; i < listTraining.length; i++) {
        listid.push(listTraining[i].id);
    }
    let autoID = listid.length > 0 ? Math.max(...listid) + 1 : 1160;
    return autoID;
}

function addTraining() {
    let listTraining = localStorage.getItem("listTraining") ?
        JSON.parse(localStorage.getItem("listTraining")) : [];
    let id = generateID();
    let name = $(".form__input-name").val();
    let status = $(".form__input-select").text();
    let desc = $(".form__input-desc").val();
    listTraining.push({
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
    localStorage.setItem("listTraining", JSON.stringify(listTraining));
    renderTraning();
}

function tooltip() {
    $(".table__icon").click(function() {
        $(this).siblings().toggle();

    })
}