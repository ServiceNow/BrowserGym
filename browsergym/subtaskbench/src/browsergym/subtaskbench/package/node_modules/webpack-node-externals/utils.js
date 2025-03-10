const fs = require('fs');
const path = require('path');

exports.contains = function contains(arr, val) {
    return arr && arr.indexOf(val) !== -1;
};

const atPrefix = new RegExp('^@', 'g');
exports.readDir = function readDir(dirName) {
    if (!fs.existsSync(dirName)) {
        return [];
    }

    try {
        return fs
            .readdirSync(dirName)
            .map(function (module) {
                if (atPrefix.test(module)) {
                    // reset regexp
                    atPrefix.lastIndex = 0;
                    try {
                        return fs
                            .readdirSync(path.join(dirName, module))
                            .map(function (scopedMod) {
                                return module + '/' + scopedMod;
                            });
                    } catch (e) {
                        return [module];
                    }
                }
                return module;
            })
            .reduce(function (prev, next) {
                return prev.concat(next);
            }, []);
    } catch (e) {
        return [];
    }
};

exports.readFromPackageJson = function readFromPackageJson(options) {
    if (typeof options !== 'object') {
        options = {};
    }
    const includeInBundle = options.exclude || options.includeInBundle;
    const excludeFromBundle = options.include || options.excludeFromBundle;

    // read the file
    let packageJson;
    try {
        const fileName = options.fileName || 'package.json';
        const packageJsonString = fs.readFileSync(
            path.resolve(process.cwd(), fileName),
            'utf8'
        );
        packageJson = JSON.parse(packageJsonString);
    } catch (e) {
        return [];
    }
    // sections to search in package.json
    let sections = [
        'dependencies',
        'devDependencies',
        'peerDependencies',
        'optionalDependencies',
    ];
    if (excludeFromBundle) {
        sections = [].concat(excludeFromBundle);
    }
    if (includeInBundle) {
        sections = sections.filter(function (section) {
            return [].concat(includeInBundle).indexOf(section) === -1;
        });
    }
    // collect dependencies
    const deps = {};
    sections.forEach(function (section) {
        Object.keys(packageJson[section] || {}).forEach(function (dep) {
            deps[dep] = true;
        });
    });
    return Object.keys(deps);
};

exports.containsPattern = function containsPattern(arr, val) {
    return (
        arr &&
        arr.some(function (pattern) {
            if (pattern instanceof RegExp) {
                return pattern.test(val);
            } else if (typeof pattern === 'function') {
                return pattern(val);
            } else {
                return pattern == val;
            }
        })
    );
};

exports.validateOptions = function (options) {
    options = options || {};
    const results = [];
    const mistakes = {
        allowlist: ['allowslist', 'whitelist', 'allow'],
        importType: ['import', 'importype', 'importtype'],
        modulesDir: ['moduledir', 'moduledirs'],
        modulesFromFile: ['modulesfile'],
        includeAbsolutePaths: ['includeAbsolutesPaths'],
        additionalModuleDirs: ['additionalModulesDirs', 'additionalModulesDir'],
    };
    const optionsKeys = Object.keys(options);
    const optionsKeysLower = optionsKeys.map(function (optionName) {
        return optionName && optionName.toLowerCase();
    });
    Object.keys(mistakes).forEach(function (correctTerm) {
        if (!options.hasOwnProperty(correctTerm)) {
            mistakes[correctTerm]
                .concat(correctTerm.toLowerCase())
                .forEach(function (mistake) {
                    const ind = optionsKeysLower.indexOf(mistake.toLowerCase());
                    if (ind > -1) {
                        results.push({
                            message: `Option '${optionsKeys[ind]}' is not supported. Did you mean '${correctTerm}'?`,
                            wrongTerm: optionsKeys[ind],
                            correctTerm: correctTerm,
                        });
                    }
                });
        }
    });
    return results;
};

exports.log = function (message) {
    console.log(`[webpack-node-externals] : ${message}`);
};

exports.error = function (errors) {
    throw new Error(
        errors
            .map(function (error) {
                return `[webpack-node-externals] : ${error}`;
            })
            .join('\r\n')
    );
};
