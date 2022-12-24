// ================slider===========================================================================================================================================

const swiper = new Swiper(".portfolio__slider", {
  // Optional parameters
  slidesPerView: 3,
  // loop: true,
  speed: 600,
  spaceBetween: 56,
  // Navigation arrows
  navigation: {
    nextEl: ".portfolio__arrow_left",
    prevEl: ".portfolio__arrow_right",
  },
  breakpoints: {
    320: {
      slidesPerView: 1.1,
      spaceBetween: 20,
      autoHeight: true,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 56,
    },
  },
});
// ===================блок табов========================================================================================================================================

const tabsBtn = document.querySelectorAll(".navigation-career__title"); // собрал кнопки
const tabsItems = document.querySelectorAll(".content-career__body"); // собрал айтемы

function tabs(item) {
  item.addEventListener("click", function () {
    let activeBtn = item;
    let tabId = activeBtn.getAttribute("data-tab");
    let currentTab = document.querySelector(tabId);

    if (!currentTab.classList.contains("active")) {
      tabsBtn.forEach(function (item) {
        item.classList.remove("active");
      });

      tabsItems.forEach(function (item) {
        item.classList.remove("active");
      });

      activeBtn.classList.add("active");
      currentTab.classList.add("active");
    }
  });
}
tabsBtn.forEach(tabs);
document.querySelector(".navigation-career__title").click();

// ===================бургер========================================================================================================================================

const burgerIcon = document.querySelector(".icon-menu");
const menuBody = document.querySelector(".menu__body");

if (burgerIcon) {
  burgerIcon.addEventListener("click", function (e) {
    document.body.classList.toggle("lock");
    burgerIcon.classList.toggle("menu-open");
    menuBody.classList.toggle("menu-open");
  });
}

//плавная прокрустка по клику

const menuLinks = document.querySelectorAll(".menu__link[data-goto]"); //собрал в массив все ссылки с дата-атрибутов data-goto
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });
}
function onMenuLinkClick(e) {
  const menuLink = e.target;
  if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
    const gotoBlock = document.querySelector(menuLink.dataset.goto);
    const gotoBlockValue =
      gotoBlock.getBoundingClientRect().top +
      scrollY -
      document.querySelector("header").offsetHeight;
    if (burgerIcon.classList.contains("menu-open")) {
      document.body.classList.remove("lock");
      burgerIcon.classList.remove("menu-open");
      menuBody.classList.remove("menu-open");
    }

    window.scrollTo({
      top: gotoBlockValue,
      behavior: "smooth",
    });
    e.preventDefault();
  }
}

// =============================================forms===================================================================================

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form"); //получачем форму по айди
  form.addEventListener("submit", formSend); // при сабмите вызываем функцию formSend

  async function formSend(e) {
    //запрещаем отправку формы
    e.preventDefault();
    // переменная в которую передается валидация формы
    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add("_sending");
      let response = await fetch("sendmail.php", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.massage);
        form.reset();
        form.classList.remove("_sending");
      } else {
        alert("Ошибка!");
        form.classList.remove("_sending");
      }
    } else {
      alert("Заполните поле name и email!");
    }
  }
  // функция валидации
  function formValidate(form) {
    let error = 0;
    // переменная для обьектов с классом required, которые будем проверять на валидацию
    let formRequired = document.querySelectorAll("._required");
    console.log(formRequired);
    for (let index = 0; index < formRequired.length; index++) {
      const input = formRequired[index];
      // перед проверкой убираем класс error
      formRemoveError(input);

      if (input.classList.contains("user-email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.classList.contains("user-name")) {
          if (input.value === "") {
            formAddError(input);
            error++;
          }
        }
      }
    }
    return error;
  }
  // добавляем класс error
  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }
  // убираем клоасс error
  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }
  // функция проверкa email на валидность
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});

const contactsForm = document.forms.contacts;
// console.log(contactsForm.elements);

const userName = contactsForm.user_name;
const userEmail = contactsForm.user_email;
const userMessage = contactsForm.user_message;

const userNamePlaceholder = userName.placeholder;
const userEmailPlaceholder = userEmail.placeholder;
const userMessagePlaceholder = userMessage.placeholder;
// name
userName.addEventListener("focus", function (e) {
  userName.placeholder = "";
});
userName.addEventListener("blur", function (e) {
  userName.placeholder = userNamePlaceholder;
});
// email
userEmail.addEventListener("focus", function (e) {
  userEmail.placeholder = "";
});
userEmail.addEventListener("blur", function (e) {
  userEmail.placeholder = userEmailPlaceholder;
});
// message
userMessage.addEventListener("focus", function (e) {
  userMessage.placeholder = "";
});
userMessage.addEventListener("blur", function (e) {
  userMessage.placeholder = userMessagePlaceholder;
});
