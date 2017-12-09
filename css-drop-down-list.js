var cssDropDownList = (function() {
    var containerClassName = "module-with-answers";
    var targetClassName = "module-with-border";
    var activeTargetClassName = "active";
    var hiddenElementClassName = "hidden-element";
    var container = new Object();
    var targetsArray = new Array();
    var calculateHeight = function(element) {
        "use strict";
        var height = 0;
        var padding = parseFloat(window.getComputedStyle(element, "").paddingTop);
        //Создание дополнительного скрытого элемента "p" для вычисления его высоты;
        var hiddenElement = document.createElement("p");
        hiddenElement.className = hiddenElementClassName;
        hiddenElement.textContent = element.getElementsByTagName("p")[0].textContent;
        element.appendChild(hiddenElement);
        height = parseFloat(window.getComputedStyle(hiddenElement, "").height);
        //Удаление созданного элемента;
        element.removeChild(hiddenElement);
        element.setAttribute("data-height", height + padding);
    };
    var setHeight = function(element) {
        "use strict";
        element.getElementsByTagName("p")[0].style.height = parseFloat(element.getAttribute("data-height")) + "px";
    };
    var unsetHeight = function(element) {
        "use strict";
        clearStyleAttribute(element.getElementsByTagName("p")[0], ["height"]);
    };
    return {
        ContainerClassName: function(value) {
            "use strict";
            if (!arguments.length) return containerClassName;
            else containerClassName = value;
        },
        initilize: function(element) {
            "use strict";
            var additoryVariable = new Object();
            var counter = 0;
            if (testClassName(element, containerClassName)) {
                container = element;
                additoryVariable = container.getElementsByClassName(targetClassName);
                if (additoryVariable.length) {
                    targetsArray = additoryVariable;
                    for (counter; counter < targetsArray.length; counter++) {
                        targetsArray[counter].addEventListener("click", this, false);
                        calculateHeight(targetsArray[counter]);
                        if (testClassName(targetsArray[counter], activeTargetClassName)) setHeight(targetsArray[counter]);
                    }
                } else notify(targetClassName, 2);
            } else notify(containerClassName, 1);
        },
        handleEvent: function(event) {
            "use strict";
            event = event || window.event;
            var counter = 0;
            var indicator = false;
            var additoryVariable = new Object();
            var element = event.target;
            if (event.type === "click") {
                if (!testClassName(element, targetClassName)) {
                    additoryVariable = searchContainer(event.target, "class", targetClassName);
                    if (additoryVariable.status) element = additoryVariable.element;
                }
                if (testClassName(element, activeTargetClassName)) {
                    clearClassName(element, activeTargetClassName);
                    unsetHeight(element);
                } else {
                    while (!indicator && counter < targetsArray.length) {
                        if (testClassName(targetsArray[counter], activeTargetClassName)) {
                            indicator = true;
                            clearClassName(targetsArray[counter], activeTargetClassName);
                            unsetHeight(targetsArray[counter]);
                        } else counter++;
                    }
                    addClassName(element, activeTargetClassName);
                    setHeight(element);
                }
            }
        }
    };
})();