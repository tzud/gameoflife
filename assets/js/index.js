var App = {
    init: function () {
        this.cacheElements();
        this.bindEvents();
        this.addWidgets();
    },
    cacheElements: function () {
        this.$newBtn = $('#newBtn');
        this.$nextBtn = $('#nextBtn');
        this.$sizeX = $('#sizeX');
        this.$sizeY = $('#sizeY');
        this.$grid = $('#grid');
    },
    bindEvents: function () {
        this.$newBtn.click(this.newGrid);
        this.$nextBtn.click(this.calcNextStep);
        App.$grid.on('click','td', App.toggleState);
    },
    addWidgets: function () {

    },

    calcNextStep: function () {
        $.ajax({
            url: 'app.php?task=calcNextStep',
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
                if (item) {
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
    }

};

$(document).ready(function () {
    App.init();
});