'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.search = search;

var _rxjsBundlesRxMinJs = require('rxjs/bundles/Rx.min.js');

var _process;

function _load_process() {
  return _process = require('nuclide-commons/process');
}

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * 
 * @format
 */

function search(directory, query, tool) {
  return (0, (_process || _load_process()).observeProcess)(tool, [query, directory, '--nocolor', '--column', '--nogroup', '--literal', '--ignore-case']).flatMap(event => {
    if (event.kind === 'stdout') {
      const matches = event.data.match(/([^:]+):([^:]+):([^:]+):(.*)/);
      if (matches != null && matches.length === 5) {
        const [file, row, column, line] = matches.slice(1);
        return _rxjsBundlesRxMinJs.Observable.of({
          file,
          row: parseInt(row, 10) - 1,
          column: parseInt(column, 10) - 1,
          line
        });
      }
    }
    return _rxjsBundlesRxMinJs.Observable.empty();
  }).filter(x => x != null);
}