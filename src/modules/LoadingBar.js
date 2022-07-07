// Copyright (c) 2022 Joshua Schmitt
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const cliProgress = require('cli-progress');
const colors = require('ansi-colors');


/**
 * @classdesc A loading bar for the CLI.
 */
class LoadingBar {

    /**
     * @param  {number} total
     * @param  {Object} options
     * @param  {} [style=cliProgress.Presets.shades_classic] - Set the style of the progress bar.
     */
    constructor(total, options, style) {
        if(!style) style = cliProgress.Presets.shades_classic;
        this.total = total;
        this.options = options;
        this.progress = new cliProgress.SingleBar(options, style);
        this.progress.start(total, 0);
    }

    /**
     * @param  {number} current - Set the current progress to this value.
     */
    update(current) {
        this.progress.update(current);
    }

    /**
     * @description - Stops the progress bar.
     */
    stop() {
        this.progress.stop();
    }

    /**
     * @param  {number} [amount=1] - Increase the progress by this amount.
     */
    incrase(amount) {
        if(!amount) amount = 1;
        this.progress.increment(amount);
    }
}

module.exports = { LoadingBar };