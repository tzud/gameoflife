var App = {
    timer: null,

    init: function () {
        this.cacheElements();
        this.bindEvents();
        this.addWidgets();

        this.loadPatterns();
    },
    cacheElements: function () {
        this.$newBtn = $('#newBtn');
        this.$nextBtn = $('#nextBtn');
        this.$saveBtn = $('#saveBtn');
        this.$patternName = $('#patternName');
        this.$autoStep = $('#autoStep');
        this.$sizeX = $('#sizeX');
        this.$sizeY = $('#sizeY');
        this.$grid = $('#grid');
        this.$savedPatterns = $('#savedPatterns');
    },
    bindEvents: function () {
        this.$newBtn.click(this.newGrid);
        this.$nextBtn.click(this.calcNextStep);
        this.$saveBtn.click(this.savePattern);
        this.$autoStep.click(this.toggleAutoStep);
        App.$grid.on('click','td', App.toggleState);
        App.$savedPatterns.on('click','.loadBtn', App.loadPattern);
    },
    addWidgets: function () {

    },

    calcNextStep: function () {
        $.ajax({
            url: 'app.php',
            type: 'post',
            dataType: 'json',
            data: {
                task: 'calcNextStep',
                data: App.getCurrentData()
            },
            success: function (data) {
                App.generateGrid(data);
            }
        });
    },

    newGrid: function () {
        App.$grid.empty();

        var x = App.$sizeX.val();
        var y = App.$sizeY.val();

        if (isNaN(x) || x < 1 || x > 100 || isNaN(y) || y < 1 || y > 100){
            alert('Kérem, hogy 1 és 100 közötti méreteket adjon meg!');
            return false;
        }

        App.$nextBtn.prop('disabled', false);
        App.$autoStep.prop('disabled', false);
        App.$saveBtn.prop('disabled', false);

        for(var i=0;i<x;i++) {
            var row = '';
            for(var j=0;j<y;j++) {
                row += '<td></td>';
            }

            App.$grid.append('<tr>' + row + '</tr>');
        }
    },

    generateGrid: function (data) {
        App.$grid.empty();

        $.each(data, function (i, row) {
            var tr = '';
            $.each(row, function (j, item) {
                if (item==1) {
                    row += '<td class="live"></td>';
                }else{
                    row += '<td></td>';
                }
            });
            App.$grid.append('<tr>' + row + '</tr>');
        });
    },

    toggleState: function () {
        $(this).toggleClass('live');
    },

    getCurrentData: function () {
        var data = [];
        App.$grid.find('tr').each(function () {
            var row = [];

            $(this).children('td').each(function () {
                var live = ($(this).hasClass('live')) ? 1 : 0;
                row.push(live);
            });

            data.push(row);
        });

        return data;
    },

    toggleAutoStep: function () {
        if ($(this).prop('checked')){
            App.timer = setInterval(function(){ App.calcNextStep(); }, 1000);
        }else {
            clearInterval(App.timer);
        }
    },
    
    savePattern: function () {
        var name = App.$patternName.val();

        if (name.length == 0){
            alert('Kérem adja meg a nevet!');
            return false;
        }

        $.ajax({
            url: 'app.php',
            type: 'post',
            dataType: 'json',
            data: {
                task: 'patterns',
                name: name,
                data: App.getCurrentData()
            },
            success: function (data) {
                if (data.error){
                    alert('Hiba történt a mentés során!');
                    console.log(data.message);
                }else {
                    App.$patternName.val('');
                    alert('A minta elmentve.');
                }

                App.loadPatterns();
            }
        });

        return false;
    },

    loadPatterns: function () {
        $.ajax({
            url: 'app.php?task=patterns',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                $.each(data,  function (index, item) {
                    var $div = $('<div>');
                    $div.text(item.pa_name + ' ');
                    $div.data('pattern',item.pa_data);
                    $div.append('<button type="button" class="loadBtn">BETÖLTÉS</button>');

                    App.$savedPatterns.append($div);
                });
            }
        });
    },

    loadPattern: function () {
        var data = JSON.parse($(this).parent('div').data('pattern'));
        console.log(data);
        App.generateGrid(data);
    }

};

$(document).ready(function () {
    App.init();
});