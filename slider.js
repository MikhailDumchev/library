/*
 * @param {HTMLElement} element Ссылка на DOM-элемент, который выполняет роль главного контейнера слайдера;
 * @requires basic-functions.js, sliding-animation.js
 */
function Slider(element) {
    var sliderClassName = "slider";
    var buttonClassName = "slider-button";
    var contentClassName = "slider-content";
    var passiveTargetClassName = "passive";
    var paginationClassName = "slider-pagination";
    var activeItemClassName = "active";
    var attributeTitle = "data-step";
    var additoryAttributeTitle = "data-indicator";
    var paginationAttribute = "data-number";
    //Длительность анимации;
    var duration = 500;
    //Сохранение ссылки на DOM-элемент, который выполняет роль слайдера;
    var slider = element;
    //В поле содержится ссылка на DOM-элемент, который выполняет роль главного контейнера слайдера. Эта ссылка заносится в поле;
    //в методе "createSlider";
    var container = new Object();
    var leftButton = new Object;
    var rightButton = new Object();
    var pagination = new Object();
    var targetsArray = new Array();
    //В поле содержится номер текущей страницы слайдера (по умолчанию - 0);
    var currentPageNumber = 0;
    //В поле содержится количество внутренних страниц слайдера, которое рассчитывается в методе "createSlider";
    var pagesAmount = 0;
    this.handleEvent = function(event) {
        "use strict";
        event = event || window.event;
        var element = event.target;
        var previousPageNumber = currentPageNumber;
        var step = 0;
        var additoryVariable = new Object();
        if (event.type === "click") {
            if (!slider.hasAttribute(additoryAttributeTitle)) {
                if (!testClassName(element, buttonClassName)) {
                    additoryVariable = searchContainer(element, "class", buttonClassName);
                    if (additoryVariable.status) element = additoryVariable.element;
                }
                //Пользователь нажал на стрелочку;
                if (testClassName(element, buttonClassName)) {
                    slider.setAttribute(additoryAttributeTitle, true);
                    step = parseInt(element.getAttribute(attributeTitle));
                    currentPageNumber = currentPageNumber + step;
                    if (step < 0 && currentPageNumber < 0) currentPageNumber = pagesAmount - 1;
                    if (step > 0 && currentPageNumber > pagesAmount - 1) currentPageNumber = 0;
                    changePaginationItem();
                    startAnimation(previousPageNumber, step);
                //Пользователь нажал на элемент пагинации;
                } else {
                    if (!testClassName(element, activeItemClassName)) {
                        slider.setAttribute(additoryAttributeTitle, true);
                        deactivateItem();
                        addClassName(element, activeItemClassName);
                        if (currentPageNumber > previousPageNumber) step = 1;
                        else step = -1;
                        currentPageNumber = parseInt(element.getAttribute(paginationAttribute));
                        startAnimation(previousPageNumber, step);
                    }
                }
            }
        }
    };
    var makeMovable = function(step) {
        "use strict";
        clearClassName(targetsArray[currentPageNumber], passiveTargetClassName);
        targetsArray[currentPageNumber].style.left = slider.offsetWidth * step + "px";
    };
    //Метод используется для инициализации слайдера;
    this.createSlider = function(amount, targetClassName) {
        var indicator = false;
        var counter = 0;
        var additoryVariable = new Object();
        if (!slider) {
            additoryVariable = selectElementByClassName(sliderClassName);
            if (additoryVariable.status) {
                slider = additoryVariable.element;
                indicator = true;
            } else notify(sliderClassName, 2);
        } else {
            if (testClassName(slider, sliderClassName)) indicator = true;
            else notify(sliderClassName, 1);
        }
        if (indicator) {
            //Поиск DOM-элементов, которые выполняют роль кнопок управления слайдером;
            additoryVariable = slider.getElementsByClassName(buttonClassName);
            if (additoryVariable.length) {
                for (counter; counter < additoryVariable.length; counter++) {
                    if (additoryVariable[counter].hasAttribute(attributeTitle)) {
                        switch (parseInt(additoryVariable[counter].getAttribute(attributeTitle))) {
                            case -1:
                                leftButton = additoryVariable[counter];
                                break;
                            case 1:
                                rightButton = additoryVariable[counter];
                                break;
                            default: break;
                        }
                    }
                }
            }
            //Поиск DOM-элемента, в котором содержатся элементы слайдера;
            additoryVariable = selectElementByClassName(contentClassName, slider);
            if (additoryVariable.status) {
                container = additoryVariable.element;
                targetsArray = container.getElementsByClassName(targetClassName);
                pagesAmount = Math.floor(targetsArray.length / amount);
                if (pagesAmount >= 2) {
                    if (leftButton.toString() !== "[object Object]") leftButton.addEventListener("click", this, true);
                    if (rightButton.toString() !== "[object Object]") rightButton.addEventListener("click", this, true);
                }
                additoryVariable = selectElementByClassName(paginationClassName, slider); 
                if (additoryVariable.status) {
                    pagination = additoryVariable.element;
                    for (counter = 0; counter < pagesAmount; counter++) createElement(counter);
                    addClassName(pagination.children[currentPageNumber], activeItemClassName);
                }
            } else notify(contentClassName, 2);
        }
    };
    var createElement = function(number) {
        "use strict";
        var element = document.createElement("div");
        element.setAttribute(paginationAttribute, number);
        pagination.appendChild(element);
        element.addEventListener("click", this, true);
    }.bind(this);
    var startAnimation = function(previousPageNumber, step) {
        "use strict";
        slidingAnimationCall(targetsArray[previousPageNumber], duration, slider.offsetWidth * -step);
        window.setTimeout(function() {
            makeMovable(step);
            slidingAnimationCall(targetsArray[currentPageNumber], duration, 0);
            window.setTimeout(function() {
                addClassName(targetsArray[previousPageNumber], passiveTargetClassName);
                clearStyleAttribute(targetsArray[previousPageNumber], ["left"]);
                clearStyleAttribute(targetsArray[currentPageNumber], ["left"]);
                slider.removeAttribute(additoryAttributeTitle, true);
            }.bind(this), duration + 10);
        }.bind(this), duration / 2 + 10);
    }.bind(this);
    var deactivateItem = function() {
        "use strict";
        var counter = 0;
        var additoryVariable = pagination.getElementsByClassName(activeItemClassName);
        if (additoryVariable.length) {
            for (counter; counter < additoryVariable.length; counter++) {
                clearClassName(additoryVariable[counter], activeItemClassName);
                counter--;
            }
        }
    };
    var changePaginationItem = function() {
        "use strict";
        deactivateItem();
        addClassName(pagination.children[currentPageNumber], activeItemClassName);
    };
}