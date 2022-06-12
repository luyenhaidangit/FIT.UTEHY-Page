$(document).ready(function() {

    renderScores();

    renderSelectStudent();

    renderSelectSubject();



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
        $(".manager__modal-title > h5").html("Nhập thông tin môn học");
        modal.addClass("active");
        modalContent.addClass("scale-up-center");
        $(".btn--submit").css("display", "inline-block");
        $(".btn--update").css("display", "none");
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
        console.log(validateForm());
        if (validateForm().length === 0) {
            addScores();;
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

                // if (validateForm()[4] === 4) {
                //     $(".manager__modal-alert__item.alert--danger__case04").addClass("active open");
                //     $(".form__input-num").addClass("form__input--error");
                //     $(".form__input-num").focusout(function() {
                //         if (validateForm()[4] !== 4) {
                //             $(".form__input-num").removeClass("form__input--error");
                //             $(".manager__modal-alert__item.alert--danger__case04").addClass("close");
                //             setTimeout(function() {
                //                 $(".manager__modal-alert__item.alert--danger__case04").removeClass("active open close");
                //             }, 1000);
                //             if (validateForm()[5] === 5) {
                //                 $(".manager__modal-alert__item.alert--danger__case05").addClass("active open");
                //                 $(".form__input-num").addClass("form__input--error");
                //                 $(".form__input-num").focusout(function() {
                //                     if (validateForm()[5] !== 5) {
                //                         $(".form__input-num").removeClass("form__input--error");
                //                         $(".manager__modal-alert__item.alert--danger__case05").addClass("close");
                //                         setTimeout(function() {
                //                             $(".manager__modal-alert__item.alert--danger__case05").removeClass("active open close");
                //                         }, 1000);
                //                     }
                //                 });
                //             }
                //         }
                //     });
                // } else if (validateForm()[5] === 5) {
                //     $(".manager__modal-alert__item.alert--danger__case05").addClass("active open");
                //     $(".form__input-num").addClass("form__input--error");
                //     $(".form__input-num").focusout(function() {
                //         if (validateForm()[5] !== 5) {
                //             $(".form__input-num").removeClass("form__input--error");
                //             $(".manager__modal-alert__item.alert--danger__case05").addClass("close");
                //             setTimeout(function() {
                //                 $(".manager__modal-alert__item.alert--danger__case05").removeClass("active open close");
                //             }, 1000);
                //         }
                //     });
                // }

                if (validateForm()[8] === 8) {
                    $(".manager__modal-alert__item.alert--danger__case08").addClass("active open");
                    $(".form__input-semester").addClass("form__input--error");
                    $(".form__input-semester").focusout(function() {
                        if (validateForm()[8] !== 8) {
                            $(".form__input-semester").removeClass("form__input--error");
                            $(".manager__modal-alert__item.alert--danger__case08").addClass("close");
                            setTimeout(function() {
                                $(".manager__modal-alert__item.alert--danger__case08").removeClass("active open close");
                            }, 1000);
                        }
                    });
                } else if (validateForm()[7] === 7) {
                    $(".manager__modal-alert__item.alert--danger__case08").addClass("close");
                    setTimeout(function() {
                        $(".manager__modal-alert__item.alert--danger__case08").removeClass("active open close");
                    }, 1000)
                    $(".manager__modal-alert__item.alert--danger__case07").addClass("active open");
                    $(".form__input-semester").addClass("form__input--error");
                    $(".form__input-semester").focusout(function() {
                        if (validateForm()[7] !== 7) {
                            $(".form__input-semester").removeClass("form__input--error");
                            $(".manager__modal-alert__item.alert--danger__case07").addClass("close");
                            setTimeout(function() {
                                $(".manager__modal-alert__item.alert--danger__case07").removeClass("active open close");
                            }, 1000);
                        }
                    });
                }

                if (validateForm()[6] === 6) {
                    $(".manager__modal-alert__item.alert--danger__case06").addClass("active open");
                    $(".form__input-class").addClass("form__input--error");
                    $(".form__input-subject").addClass("form__input--error");
                    $(".input__option").click(function() {
                        if (validateForm()[6] !== 6) {
                            $(".form__input-class").removeClass("form__input--error");
                            $(".form__input-subject").removeClass("form__input--error");
                            $(".manager__modal-alert__item.alert--danger__case06").addClass("close");
                            setTimeout(function() {
                                $(".manager__modal-alert__item.alert--danger__case06").removeClass("active open close");
                            }, 1000);
                        }
                    });
                }
            }
        }
    })
});

//ADD

function renderSelectStudent() {
    let listStudent = localStorage.getItem("listStudent") ?
        JSON.parse(localStorage.getItem("listStudent")) : [];
    let student = ``
    for (let i = 0; i < listStudent.length; i++) {
        let content = listStudent[i].id + " - " + listStudent[i].name;
        student += `<div class="input__option"><span>${content}</span></div>`
    }
    $(".input__list-option.student__select").html(student);
}

function renderSelectSubject() {
    let listSubject = localStorage.getItem("listSubject") ?
        JSON.parse(localStorage.getItem("listSubject")) : [];
    let subject = ``
    for (let i = 0; i < listSubject.length; i++) {
        let content = listSubject[i].id + " - " + listSubject[i].name;
        subject += `<div class="input__option"><span>${content}</span></div>`
    }
    $(".input__list-option.subject__select").html(subject);
}


function resetModal() {
    $(".input__select-class").removeClass("disabled");
    $(".input__select-subject").removeClass("disabled");
    $(".form__input-class").removeClass("form__input-disable");
    $(".input__select-value__class").removeClass("form__input-disable");
    $(".form__input-subject").removeClass("form__input-disable");
    $(".input__select-value__subject").removeClass("form__input-disable");
    $(".manager__modal-alert__item").removeClass("active open");
    $(".form__input-name").removeClass("form__input--error");
    $(".form__input-class").removeClass("form__input--error");
    $(".form__input-teacher").removeClass("form__input--error");
    $(".form__input-date").removeClass("form__input--error");
    $(".form__input-date").removeClass("form__input--error");
    $(".form__input-andress").removeClass("form__input--error");
    $(".form__input-phone").removeClass("form__input--error");
    $(".form__input-semester").removeClass("form__input--error");
    $(".form__input-semester").val("");
    $(".form__input-name").val("");
    $(".form__input-mark1").val("");
    $(".form__input-mark2").val("");
    $(".form__input-date").val("");
    $(".form__input-select.select__normal").html($(".list-option__normal").children().html());
    $(".form__input-andress").val("");
    $(".form__input-phone").val("");
    $(".input__select-value__class").html($(".class__select").children().html());
    $(".input__select-value__teacher").html($(".teacher__select").children().html());
    $(".input__select-value__subject").html($(".subject__select").children().html());
    $(".input__select-value__status").html($(".list-option__status").children().html());
    $(".input__select-value__student").html($(".student__select").children().html());
}

function addScores() {
    let listScores = localStorage.getItem("listScores") ?
        JSON.parse(localStorage.getItem("listScores")) : [];
    let arrIDStudent = $(".input__select-value__student").text().split('-');
    let idStudent = arrIDStudent[0].trim();
    let arrIDSubject = $(".input__select-value__subject").text().split('-');
    let idSubject = arrIDSubject[0].trim();
    let mark1 = $(".form__input-mark1").val();
    let mark2 = $(".form__input-mark2").val();
    listScores.push({
        idStudent: idStudent,
        idSubject: idSubject,
        mark1: mark1,
        mark2: mark2,
    });
    let modal = $(".manager__modal");
    let modalContent = $(".manager__modal-content");
    modalContent.removeClass("scale-up-center").addClass("scale-down-center");
    setTimeout(function() {
        modal.removeClass("active");
        modalContent.removeClass("scale-down-center");
    }, 400);
    localStorage.setItem("listScores", JSON.stringify(listScores));
    renderScores();
}



//EDIT

function infoClass(id) {
    let listClass = localStorage.getItem("listClass") ?
        JSON.parse(localStorage.getItem("listClass")) : [];
    for (let i = 0; i < listClass.length; i++) {
        if (listClass[i].id == id) {
            return listClass[i].id + " - " + listClass[i].name;
        }
    }
}

function infoSubject(id) {
    let listSubject = localStorage.getItem("listSubject") ?
        JSON.parse(localStorage.getItem("listSubject")) : [];
    for (let i = 0; i < listSubject.length; i++) {
        if (listSubject[i].id == id) {
            return listSubject[i].id + " - " + listSubject[i].name;
        }
    }
}

function infoTeacher(id) {
    let listTeacher = localStorage.getItem("listTeacher") ?
        JSON.parse(localStorage.getItem("listTeacher")) : [];
    for (let i = 0; i < listTeacher.length; i++) {
        if (listTeacher[i].id == id) {
            return listTeacher[i].id + " - " + listTeacher[i].name;
        }
    }
}

function loadModal(index) {
    let listSchedule = localStorage.getItem("listSchedule") ?
        JSON.parse(localStorage.getItem("listSchedule")) : [];
    let listSubject = localStorage.getItem("listSubject") ?
        JSON.parse(localStorage.getItem("listSubject")) : [];
    $(".input__select-value__class").text(infoClass(listSchedule[index].idClass));
    $(".input__select-value__teacher").text(infoTeacher(listSchedule[index].idTeacher));
    $(".input__select-value__subject").text(infoSubject(listSchedule[index].idSubject));
    $(".form__input-semester").val(listSchedule[index].semester);
}


function editObj(index) {
    $(".get-index").val(index);
    $(".manager__modal").addClass("active");
    $(".manager__modal-content").addClass("scale-up-center");
    $(".manager__modal-title > h5").html("Cập nhật thông tin lịch học");
    $(".btn--submit").css("display", "none");
    $(".btn--update").css("display", "inline-block");
    loadModal(index);
    $(".form__input-class").addClass("form__input-disable");
    $(".input__select-value__class").addClass("form__input-disable");
    $(".form__input-subject").addClass("form__input-disable");
    $(".input__select-value__subject").addClass("form__input-disable");
    $(".input__select-value__subject").addClass("form__input-disable");
    $(".input__select-class").addClass("disabled");
    $(".input__select-subject").addClass("disabled");
}

function editSchedule() {
    if (validateForm().length === 0) {
        let listSchedule = localStorage.getItem("listSchedule") ?
            JSON.parse(localStorage.getItem("listSchedule")) : [];
        let arrIDClass = $(".input__select-value__class").text().split('-');
        let idClass = arrIDClass[0].trim();
        let arrIDSubject = $(".input__select-value__subject").text().split('-');
        let idSubject = arrIDSubject[0].trim();
        let semester = $(".form__input-semester").val();
        let arrIDTeacher = $(".input__select-value__teacher").text().split('-');
        let idTeacher = arrIDTeacher[0].trim();
        listSchedule[index] = {
            idClass: idClass,
            idSubject: idSubject,
            semester: semester,
            idTeacher: idTeacher,
        }
        localStorage.setItem("listSchedule", JSON.stringify(listSchedule));
        renderSchedule();
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

            // if (validateForm()[4] === 4) {
            //     $(".manager__modal-alert__item.alert--danger__case04").addClass("active open");
            //     $(".form__input-num").addClass("form__input--error");
            //     $(".form__input-num").focusout(function() {
            //         if (validateForm()[4] !== 4) {
            //             $(".form__input-num").removeClass("form__input--error");
            //             $(".manager__modal-alert__item.alert--danger__case04").addClass("close");
            //             setTimeout(function() {
            //                 $(".manager__modal-alert__item.alert--danger__case04").removeClass("active open close");
            //             }, 1000);
            //             if (validateForm()[5] === 5) {
            //                 $(".manager__modal-alert__item.alert--danger__case05").addClass("active open");
            //                 $(".form__input-num").addClass("form__input--error");
            //                 $(".form__input-num").focusout(function() {
            //                     if (validateForm()[5] !== 5) {
            //                         $(".form__input-num").removeClass("form__input--error");
            //                         $(".manager__modal-alert__item.alert--danger__case05").addClass("close");
            //                         setTimeout(function() {
            //                             $(".manager__modal-alert__item.alert--danger__case05").removeClass("active open close");
            //                         }, 1000);
            //                     }
            //                 });
            //             }
            //         }
            //     });
            // } else if (validateForm()[5] === 5) {
            //     $(".manager__modal-alert__item.alert--danger__case05").addClass("active open");
            //     $(".form__input-num").addClass("form__input--error");
            //     $(".form__input-num").focusout(function() {
            //         if (validateForm()[5] !== 5) {
            //             $(".form__input-num").removeClass("form__input--error");
            //             $(".manager__modal-alert__item.alert--danger__case05").addClass("close");
            //             setTimeout(function() {
            //                 $(".manager__modal-alert__item.alert--danger__case05").removeClass("active open close");
            //             }, 1000);
            //         }
            //     });
            // }

            if (validateForm()[8] === 8) {
                $(".manager__modal-alert__item.alert--danger__case08").addClass("active open");
                $(".form__input-semester").addClass("form__input--error");
                $(".form__input-semester").focusout(function() {
                    if (validateForm()[8] !== 8) {
                        $(".form__input-semester").removeClass("form__input--error");
                        $(".manager__modal-alert__item.alert--danger__case08").addClass("close");
                        setTimeout(function() {
                            $(".manager__modal-alert__item.alert--danger__case08").removeClass("active open close");
                        }, 1000);
                    }
                });
            } else if (validateForm()[7] === 7) {
                $(".manager__modal-alert__item.alert--danger__case08").addClass("close");
                setTimeout(function() {
                    $(".manager__modal-alert__item.alert--danger__case08").removeClass("active open close");
                }, 1000)
                $(".manager__modal-alert__item.alert--danger__case07").addClass("active open");
                $(".form__input-semester").addClass("form__input--error");
                $(".form__input-semester").focusout(function() {
                    if (validateForm()[7] !== 7) {
                        $(".form__input-semester").removeClass("form__input--error");
                        $(".manager__modal-alert__item.alert--danger__case07").addClass("close");
                        setTimeout(function() {
                            $(".manager__modal-alert__item.alert--danger__case07").removeClass("active open close");
                        }, 1000);
                    }
                });
            }

            if (validateForm()[6] === 6) {
                $(".manager__modal-alert__item.alert--danger__case06").addClass("active open");
                $(".form__input-class").addClass("form__input--error");
                $(".form__input-subject").addClass("form__input--error");
                $(".input__option").click(function() {
                    if (validateForm()[6] !== 6) {
                        $(".form__input-class").removeClass("form__input--error");
                        $(".form__input-subject").removeClass("form__input--error");
                        $(".manager__modal-alert__item.alert--danger__case06").addClass("close");
                        setTimeout(function() {
                            $(".manager__modal-alert__item.alert--danger__case06").removeClass("active open close");
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
    let modal = $(".manager__alert");
    let modalContent = $(".manager__alert-content");
    let deleteBtn = $(".table__icon-delete");
    let closeBtn = $(".manager__modal-close");
    deleteBtn.click(function() {
        $(".manager__modal-title > h5").html("Xóa thông tin lịch học");
        modal.addClass("active");
        modalContent.addClass("scale-up-center");
    })
    let listSchedule = localStorage.getItem("listSchedule") ?
        JSON.parse(localStorage.getItem("listSchedule")) : [];
    let idObj = listSchedule[index].idClass;
    let idObj1 = listSchedule[index].idSubject;
    $(".get-id-del").html(idObj);
    $(".get-id-del1").html(idObj1);
}

function deleteSubject() {
    let listSchedule = localStorage.getItem("listSchedule") ?
        JSON.parse(localStorage.getItem("listSchedule")) : [];
    let index = $(".get-index").val();
    listSchedule.splice(index, 1);
    localStorage.setItem("listSchedule", JSON.stringify(listSchedule));
    renderSchedule();
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
    $(".manager__modal-title > h5").html("Hiển thị thông tin môn học");
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
        $(this).children(".input__list-option").toggle();
    });

    $(inputOption).click(function(e) {
        e.preventDefault();
        $(this).parents(".input__list-option").siblings(".input__select-value").html($(this).children().html());
    });
}

function nameTraning(id) {
    let listTraining = localStorage.getItem("listTraining") ?
        JSON.parse(localStorage.getItem("listTraining")) : [];
    for (let i = 0; i < listTraining.length; i++) {
        if (listTraining[i].id == id) {
            return listTraining[i].name;
        }
    }
}

function nameGenera(id) {
    let listGenera = localStorage.getItem("listGenera") ?
        JSON.parse(localStorage.getItem("listGenera")) : [];
    for (let i = 0; i < listGenera.length; i++) {
        if (listGenera[i].id == id) {
            return listGenera[i].name;
        }
    }
}

function formatBirth(birth) {
    let arrBirth = birth.split('-');
    return arrBirth[2] + "-" + arrBirth[1] + "-" + arrBirth[0];
}


//RENDER

function nameStudent(id) {
    let listStudent = localStorage.getItem("listStudent") ?
        JSON.parse(localStorage.getItem("listStudent")) : [];
    for (let i = 0; i < listStudent.length; i++) {
        if (listStudent[i].id == id) {
            return listStudent[i].name;
        }
    }
}

function nameSubject(id) {
    let listSubject = localStorage.getItem("listSubject") ?
        JSON.parse(localStorage.getItem("listSubject")) : [];
    for (let i = 0; i < listSubject.length; i++) {
        if (listSubject[i].id == id) {
            return listSubject[i].name;
        }
    }
}


function renderScores() {
    let listScores = localStorage.getItem("listScores") ?
        JSON.parse(localStorage.getItem("listScores")) : [];

    let scores = `<thead>
    <tr class="table__data-tr">
        <th class="table__data-th obj__id" rowspan="1" colspan="1">Sinh viên</th>
        <th class="table__data-th obj__name" rowspan="1" colspan="1">Môn học</th>
        <th class="table__data-th obj__des" rowspan="1" colspan="1">Điểm QT</th>
        <th class="table__data-th obj__des" rowspan="1" colspan="1">Điểm KTHP</th>
        <th class="table__data-th obj__des" rowspan="1" colspan="1">Thao tác</th>
    </tr>
</thead>`

    for (let i = 0; i < listScores.length; i++) {
        scores += `<tbody>
        <tr class="table__data-tr">
            <td class="table__data-td ">${nameStudent(listScores[i].idStudent)}</td>
            <td class="table__data-td">${nameSubject(listScores[i].idSubject)}</td>
            <td class="table__data-td">${listScores[i].mark1}</td>
            <td class="table__data-td">${listScores[i].mark2}</td>
            <td class="table__data-td">
                <a class="edit__btn" href="#" onclick="editObj(${i})"><i class="table__icon table__icon-edit fas fa-pen"></i></a>
                <a class="delete__btn" href="#" onclick="deleteObj(${i})"><i class="table__icon table__icon-delete fas fa-trash"></i></a>
                <a class="display__btn" href="#" onclick="displayObj(${i})"><i class="table__icon table__icon-display fas fa-user"></i></a>
            </td>
        </tr>
    </tbody>`
    }
    $(".table").html(scores);
}