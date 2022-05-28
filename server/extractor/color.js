var im = require('imagemagick')

module.exports = async function(path, opts, next){
    if (typeof opts === 'function'){
        next = opts
        opts = undefined
    }
    if (!next) next = function(){}
    if (!opts) opts = {}
    if (!opts.format) opts.format = 'hex'

    var imArgs = [path, '-format', '%[pixel:u]', 'info:-']

    im.convert(imArgs, function(err, stdout){
        if (err) next(err)
        var rgb = stdout.substring(stdout.indexOf('(') + 1, stdout.indexOf(')'))

        var results = {
            hex: function(){ return require('rgb-hex').apply(this, rgb.split(',')) },
            rgb: function(){ return rgb.split(',') }
        }

        next(null, results[opts.format]())
    })
}
