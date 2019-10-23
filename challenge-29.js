(function(wind, doc) {
    'use strict';

    var app = (function() {
        return {
            initialize: function() {
                this.companyInfo();
                this.initEvent();
            },
            initEvent: function() {
                var $button = new DOM('[data-js="button"]');
                $button.on('click', this.addCar);
            },
            addCar: function(event) {
                event.preventDefault();
                var $inputs = new DOM('[data-js="input"]');
                app.getCarro(app.setCarro($inputs));
                app.clearInputs($inputs);
            },
            setCarro: function setCarro($inputs) {
                var car = app.carro();
                $inputs.forEach(function(item) {
                    car[item.getAttribute('name')] = item.value;
                })
                return car;
            },
            getCarro: function getCarro(carro) {
                app.createLine(carro)
            },
            carro: function carro() {
                return {
                    'img': '',
                    'marca': '',
                    'ano': '',
                    'placa': '',
                    'cor': ''
                };
            },
            createLine: function createLine(carro) {
                var $fragment = doc.createDocumentFragment();
                var $tabela = new DOM('[data-js="tabela"]');
                var $tr = doc.createElement('tr');
                var $trClone = app.getPropertyCarro($tr, carro);
                $fragment.appendChild($trClone);
                $tabela.get()[0].appendChild($fragment);
            },
            getPropertyCarro: function getPropertyCarro(element, carro) {
                for (var property in carro) {
                    element.appendChild(app.createCell(carro[property], property));
                }
                return element;
            },
            createCell: function createCell(value, property) {
                var $td = doc.createElement('td');
                var $img = doc.createElement('img');
                if (property === 'img') {
                    $img.src = value;
                    $td.appendChild($img)
                } else
                    $td.innerHTML = value;
                return $td;
            },
            clearInputs: function clearInputs($inputs) {
                $inputs.forEach(function(input) {
                    input.value = '';
                })
            },
            companyInfo: function() {
                var ajax = new XMLHttpRequest();
                var company = "company.json";
                ajax.open('GET', company, true)
                ajax.send()
                ajax.addEventListener('readystatechange', this.handleReadyStateChange, false)

            },
            handleReadyStateChange: function() {
                if (app.isRequestOk(this))
                    app.getDate(this.responseText)
            },
            isRequestOk: function isRequestOk(ajax) {
                return ajax.readyState === 4 && ajax.status === 200;
            },
            getDate: function getDate(text) {
                var $name = new DOM('[data-js="name"]');
                var $phone = new DOM('[data-js="phone"]');
                if (text) {
                    var date = JSON.parse(text);
                    $name.get()[0].innerHTML = date.name;
                    $phone.get()[0].innerHTML = date.phone;
                }
            }
        };
    })()

    app.initialize();

})(window, document);