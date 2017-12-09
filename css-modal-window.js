function ModalWindow() {
    var modalWindowClassName = "modal-window";
    var callerClassName = "caller";
    var activeWindowClassName = "active";
    var hidingClassName = "hiding";
    var indicator = false;
    var setter = new Object();
    this.initilizeSetter = function() {
        "use strict";
        indicator = true;
        setter = new ModalWindowSetter();
        setter.ModalWindow(modalWindow);
        setter.initilize();
    };
    var modalWindow = new Object();
    this.initilize = function(element) {
        "use strict";
        var counter = 0;
        var additoryVariable = new Object();
        if (!element || !testClassName(element, modalWindowClassName)) {
            additoryVariable = selectElementByClassName(modalWindowClassName);
            if (additoryVariable.status) {
                modalWindow = additoryVariable.element;
            }
        } else {
            
        }
        if (additoryVariable.status) {
            modalWindow = additoryVariable.element;
            additoryVariable = document.getElementsByClassName(callerClassName);
            if (additoryVariable.length) {
                for (counter; counter < additoryVariable.length; counter++)
                    additoryVariable[counter].addEventListener("click", this, true);
            }
        }
    };
    this.handleEvent = function(event) {
        "use strict";
        event = event || window.event;
        var element = event.target;
        var additoryVariable = searchContainer(element, "class", callerClassName);
        if (additoryVariable.status) element = additoryVariable.element;
        if (testClassName(element, callerClassName)) {
            if (testClassName(modalWindow, activeWindowClassName)) {
                clearClassName(document.body, hidingClassName);
                clearClassName(modalWindow, activeWindowClassName);
            } else {
                if (indicator) setter.setValues(element);
                addClassName(document.body, hidingClassName);
                addClassName(modalWindow, activeWindowClassName);
            }
        }
    };
}
function ModalWindowSetter() {
    var headerClassName = "modal-window-title";
    this.HeaderClassName = function(value) {
        "use strict";
        if (!arguments.length) return headerClassName;
        else headerClassName = value;
    };
    var fieldID = "product_id";
    this.FieldID = function(value) {
        "use strict";
        if (!arguments.length) return fieldID;
        else fieldID = value;
    };
    var titleAttribute = "data-title";
    var idAttribute = "data-id";
    var modalWindow = new Object();
    var header = new Object();
    var field = new Object();
    this.ModalWindow = function(element) {
        "use strict";
        if (!arguments.length) return modalWindow;
        else modalWindow = element;
    };
    this.initilize = function() {
        "use strict";
        var additoryVariable = selectElementByClassName(headerClassName, modalWindow);
        if (additoryVariable.status) {
            header = additoryVariable.element;
            if (document.getElementById(fieldID)) {
                field = document.getElementById(fieldID);
            } else notify(fieldID, 3);
        } else notify(headerClassName, 1);
    };
    this.setValues = function(element) {
        "use strict";
        if (element.hasAttribute(titleAttribute) && header.toString() !== "[object Object]") {
            header.textContent = "ЗАПИСАТЬСЯ НА ПРОГРАММУ «" + element.getAttribute(titleAttribute) + "»";
        } else notify("У DOM-элемента отсутствует атрибут " + titleAttribute + ";");
        if (element.hasAttribute(idAttribute) && field) {
            field.value = element.getAttribute(idAttribute);
        } else notify("У DOM-элемента отсутствует атрибут " + idAttribute + ";");
    };
}