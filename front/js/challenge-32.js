(function(wind, doc) {
    'use strict';

    var app = (function() {
        return {
            initialize: function() {
                this.companyInfo();
                this.initCar();
                this.initEvent();
            },
            initCar: function initCar() {
                app.get(this.allCar);
                app.createButtonRmCar();
            },
            allCar: function allCar() {
                if (app.isRequestOk(this)) {
                    const data = JSON.parse(this.responseText);
                    data.forEach(function(car) {
                        app.getCar(car);
                    });
                }
            },
            initEvent: function() {
                var $button = new DOM('[data-js="button"]');
                $button.on('click', this.addCar);
            },
            addCar: function(event) {
                event.preventDefault();
                var $inputs = new DOM('[data-js="input"]');
                app.post(app.setCar($inputs));
                app.get(app.lastCar);
                app.createButtonRmCar();
                app.clearInputs($inputs);
            },
            post: function post(car) {
                const ajax = new XMLHttpRequest();
                ajax.open('POST', 'http://localhost:3000/car');
                ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                ajax.send('image=' + car.img + '&brandModel=' + car.marca + '&year=' + car.ano + '&plate=' + car.placa + '&color=' + car.cor);
                ajax.onreadystatechange = function() {
                    if (app.isRequestOk(ajax))
                        console.log(ajax.responseText)
                }
            },
            get: function get(func) {
                const ajax = new XMLHttpRequest();
                ajax.open('GET', 'http://localhost:3000/car');
                ajax.send();
                ajax.addEventListener('readystatechange', func);
            },
            lastCar: function lastCar() {
                if (app.isRequestOk(this)) {
                    const data = JSON.parse(this.responseText);
                    app.getCar(data[data.length - 1]);
                }
            },
            setCar: function setCar($inputs) {
                var car = app.car();
                $inputs.forEach(function(item) {
                    car[item.getAttribute('name')] = item.value;
                })
                return car;
            },
            car: function car() {
                return { 'img': '', 'marca': '', 'ano': '', 'placa': '', 'cor': '' };
            },
            getCar: function getCar(car) {
                app.createLine(car)
            },
            createLine: function createLine(car) {
                var $fragment = doc.createDocumentFragment();
                var $tabela = new DOM('[data-js="tabela"]');
                var $tr = doc.createElement('tr');
                var $trClone = app.getPropertyCar($tr, car);
                $fragment.appendChild($trClone);
                $tabela.get()[0].appendChild($fragment);
            },
            getPropertyCar: function getPropertyCar(element, car) {
                for (var property in car) {
                    element.appendChild(app.createCell(car[property], property));
                }
                element.appendChild(app.createCellButton());
                return element;
            },
            createCell: function createCell(value, property) {
                var $td = doc.createElement('td');
                var $img = doc.createElement('img');
                if (property === 'image') {
                    $img.src = value;
                    $td.appendChild($img);
                } else
                    $td.innerHTML = value;
                return $td;
            },
            clearInputs: function clearInputs($inputs) {
                $inputs.forEach(function(input) {
                    input.value = '';
                });
            },
            createCellButton: function createCellButton() {
                var $td = doc.createElement('td');
                var $button = doc.createElement('button');
                var $text = document.createTextNode("X");
                $button.setAttribute('data-js', 'remove');
                $button.appendChild($text);
                $td.appendChild($button);
                return $td;
            },
            createButtonRmCar: function createButtonRmCar() {
                setTimeout(function() {
                    var $buttons = new DOM('[data-js="remove"]');
                    $buttons.on('click', app.removeLine, false);
                }, 500);
            },
            removeLine: function removeLine() {
                var $tabel = this.parentNode.parentNode.parentNode;
                var $line = this.parentNode.parentNode;
                $tabel.removeChild($line);
            },
            companyInfo: function() {
                var ajax = new XMLHttpRequest();
                var company = "company.json";
                ajax.open('GET', company, true)
                ajax.send();
                ajax.addEventListener('readystatechange', this.handleReadyStateChange, false);
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