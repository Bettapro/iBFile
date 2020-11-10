/*
 jBUtil v0.0.1
 Copyright 2020 Alberto Bettin
 Released under the MIT license
 */


(function () {
    var _bF = function ( $el) {
        var self = this;
        this.$env = $el;
        
        this.conf = $.extend({}, _bF.prototype.conf);
        this.templates = $.extend({}, _bF.prototype.templates);

        this.$bButton = $(this.getComponent('button', [this.conf.buttonClass, this.conf.buttonText]));
        this.$bBox = $(this.getComponent('boxContainer', [this.conf.boxFileClass]));
        this.$bFile = $(this.getComponent('fileContainter', [this.conf.inputFileClass]));

        this.$env.append(this.$bButton);
        this.$env.append(this.$bBox);
        this.$env.append(this.$bFile);



        this.$bButton.click(function (event){
            event.preventDefault();
            self.addFileHandler();
        });

        return this;
    }

    var bFile = function () {
        
        if (this.length > 1) {
            $(this).each(function (index, element) {
                $(element).iBFile();
            });
            return;
        }

        return new _bF(this);
    };


    _bF.prototype.conf = {
        inputClass: '',
        boxClass: 'alert-box success',
        buttonClass: 'small-12',
        buttonText: '<i class="fi-plus"></i>Aggiungi',
        inputNamePrefix: 'file',
        inputFileClass: 'input-file-list hide',
        boxFileClass: 'box-file-list'
    };

    _bF.prototype.templates = {
        inputFile: '<input class="$1" name="$2" type="file" />',
        boxFile: '<div class="$1" id="$2">$3</div>',
        button: '<button  class="$1">$2</button>',
        boxContainer: '<div class="$1"></div>',
        fileContainter: '<div class="$1"></div>'
    };

    _bF.prototype.addFileHandler = function () {
        var self = this;

        this.$env.find('input').off('click');
        this.addFileInput();

        this.$env.find('input:last-child').change(function () {
            var existing = $(this).attr('box-id') !== undefined;
            var id = existing ? $(this).attr('box-id') : 'file-uploaded' + Date.now();
            if (!existing) {

                var $boxEl = $(self.getComponent('boxFile', [self.conf.boxClass, id, $(this)[0].files[0].name]));
                self.$bBox.prepend($boxEl);
                $(this).attr('box-id', id);
                $boxEl.click(function () {
                    self.$env.find('[box-id="' + $(this).attr('id') + '"]').click();
                });
            } else {
                self.$env.find('#' + id).text($(this)[0].files[0].name);
            }

        });

        this.$env.find('input:last-child').click();
    };

    _bF.prototype.addFileInput = function () {
        this.$bFile.append(this.getComponent('inputFile', [this.conf.inputClass, this.conf.inputNamePrefix + Date.now()]));
    }

    _bF.prototype.getComponent = function (component, currents) {
        if (this.templates[component] === undefined) {
            return null;
        }
        var html = this.templates[component];
        for (var i = 0; i < currents.length; i++) {
            html = html.replace('$' + (i + 1), currents[i]);
        }
        return html;
    };

    _bF.prototype.removeFileInput = function (index) {
        // to do
    };

    window.iBFileGlobal = {
        conf: _bF.prototype.conf,
        templates: _bF.prototype.templates
    };
    $.fn.iBFile = bFile;
    return $.fn.iBFile;

})(jQuery);

$(function () {
    $('.iBFile').iBFile();
});
