'use strict';

// global variables
let fileList = getFiles();
let [rootKey, dirMap, dirStruct] = getDirs(fileList);
let stateJSON = { current: -1, histories: [] };
const funcs = ['filterDirs', 'chooseDir', 'goBackDir', 'goForwardDir']; // defined folder operation functions

// get JSON data from API
function getFiles() {
    // fileListJSON
    // // key        string
    // // parentKey  string
    // // name       string
    // // updateTime string
    // // isFolder   bool
    // // isShared   bool
    // // children   []FileList
    const utilFormatDateString_ = function (date) {
        let fmtStr = 'YYYY-MM-DD hh:mm:ss';

        fmtStr = fmtStr.replace(/YYYY/g, date.getFullYear());
        fmtStr = fmtStr.replace(/MM/g, date.getMonth() + 1);
        fmtStr = fmtStr.replace(/DD/g, date.getDate());
        fmtStr = fmtStr.replace(/hh/g, date.getHours());
        fmtStr = fmtStr.replace(/mm/g, date.getMinutes());
        fmtStr = fmtStr.replace(/ss/g, date.getSeconds());

        return fmtStr;
    };
    const json = [
        {
            key: '1',
            parentKey: '0',
            name: 'Root',
            updateTime: utilFormatDateString_(new Date()),
            isFolder: true,
            isShared: false,
            children: [
                {
                    key: '2',
                    parentKey: '1',
                    name: 'folder-1',
                    updateTime: utilFormatDateString_(new Date()),
                    isFolder: true,
                    isShared: false,
                    children: [
                        {
                            key: '13',
                            parentKey: '2',
                            name: 'folder-1-1',
                            updateTime: utilFormatDateString_(new Date()),
                            isFolder: true,
                            isShared: false,
                            children: [
                                {
                                    key: '14',
                                    parentKey: '13',
                                    name: 'folder-1-1-1',
                                    updateTime: utilFormatDateString_(new Date()),
                                    isFolder: true,
                                    isShared: false,
                                    children: [
                                        {
                                            key: '16',
                                            parentKey: '14',
                                            name: 'folder-1-1-1-1',
                                            updateTime: utilFormatDateString_(new Date()),
                                            isFolder: true,
                                            isShared: false,
                                            children: []
                                        },
                                        {
                                            key: '17',
                                            parentKey: '14',
                                            name: 'folder-1-1-1-2',
                                            updateTime: utilFormatDateString_(new Date()),
                                            isFolder: true,
                                            isShared: false,
                                            children: []
                                        },
                                        {
                                            key: '18',
                                            parentKey: '14',
                                            name: 'file-1-1-1-1',
                                            updateTime: utilFormatDateString_(new Date()),
                                            isFolder: false,
                                            isShared: true,
                                            children: []
                                        }
                                    ]
                                },
                                {
                                    key: '15',
                                    parentKey: '13',
                                    name: 'file-1-1-1',
                                    updateTime: utilFormatDateString_(new Date()),
                                    isFolder: false,
                                    isShared: false,
                                    children: []
                                }
                            ]
                        }
                    ]
                },
                {
                    key: '3',
                    parentKey: '1',
                    name: 'folder-2',
                    updateTime: utilFormatDateString_(new Date()),
                    isFolder: true,
                    isShared: false,
                    children: [
                        {
                            key: '4',
                            parentKey: '3',
                            name: 'file-2-1',
                            updateTime: utilFormatDateString_(new Date()),
                            isFolder: false,
                            isShared: false,
                            children: []
                        },
                        {
                            key: '5',
                            parentKey: '3',
                            name: 'folder-2-1',
                            updateTime: utilFormatDateString_(new Date()),
                            isFolder: true,
                            isShared: false,
                            children: [
                                {
                                    key: '6',
                                    parentKey: '5',
                                    name: 'file-2-1-1',
                                    updateTime: utilFormatDateString_(new Date()),
                                    isFolder: false,
                                    isShared: true,
                                    children: []
                                }
                            ]
                        },
                        {
                            key: '7',
                            parentKey: '3',
                            name: 'file-2-2',
                            updateTime: utilFormatDateString_(new Date()),
                            isFolder: false,
                            isShared: true,
                            children: []
                        }
                    ]
                },
                {
                    key: '8',
                    parentKey: '1',
                    name: 'file-1',
                    updateTime: utilFormatDateString_(new Date()),
                    isFolder: false,
                    isShared: false,
                    children: []
                },
                {
                    key: '9',
                    parentKey: '1',
                    name: 'folder-3',
                    updateTime: utilFormatDateString_(new Date()),
                    isFolder: true,
                    isShared: false,
                    children: []
                },
                {
                    key: '10',
                    parentKey: '1',
                    name: 'file-2',
                    updateTime: utilFormatDateString_(new Date()),
                    isFolder: false,
                    isShared: true,
                    children: []
                },
                {
                    key: '11',
                    parentKey: '1',
                    name: 'folder-4',
                    updateTime: utilFormatDateString_(new Date()),
                    isFolder: true,
                    isShared: false,
                    children: [
                        {
                            key: '19',
                            parentKey: '11',
                            name: 'folder-4-1',
                            updateTime: utilFormatDateString_(new Date()),
                            isFolder: true,
                            isShared: false,
                            children: []
                        },
                        {
                            key: '20',
                            parentKey: '11',
                            name: 'file-4-1',
                            updateTime: utilFormatDateString_(new Date()),
                            isFolder: false,
                            isShared: false,
                            children: []
                        }
                    ]
                },
                {
                    key: '12',
                    parentKey: '1',
                    name: 'folder-5',
                    updateTime: utilFormatDateString_(new Date()),
                    isFolder: true,
                    isShared: false,
                    children: []
                }
            ]
        }
    ];

    return json;
}

// structure directory from JSON
function getDirs(json) {
    const rootKey = json[0]['key'], dirMap = new Map(), dirStruct = new Map();
    const buildDirMap_ = (json) => {
        for (let i in json) {
            const key = json[i]['key'];
            const name = json[i]['name'];
            const isFolder = json[i]['isFolder'];
            const children = json[i]['children'];
            if (isFolder) {
                const dir = new Map();
                const slice = [];
                for (let j in children) {
                    const childJSON = {
                        key: children[j].key,
                        parentKey: children[j].parentKey,
                        name: children[j].name,
                        updateTime: children[j].updateTime,
                        isFolder: children[j].isFolder,
                        isShared: children[j].isShared,
                        children: children[j].children
                    };
                    slice.push(childJSON);
                }
                dir.set('name', name);
                dir.set('items', slice);
                dirMap.set(key, dir);

                buildDirMap_(children);
            }
        }
    };
    const buildDirStruct_ = function (json) {
        if (json.length > 0) {
            for (let i in json) {
                const key = json[i]['key'];
                const name = json[i]['name'];
                const isFolder = json[i]['isFolder'];
                const children = json[i]['children'];
                if (isFolder) {
                    if (children.length > 0) {
                        let selfParArray = [];
                        if (key !== rootKey) selfParArray = dirStruct.get(key);
                        for (let i in children) {
                            const childKey = children[i]['key'];
                            const isFolderChild = children[i]['isFolder'];
                            if (isFolderChild) {
                                if (selfParArray.length > 0) {
                                    const cloneParArray = selfParArray.slice(); // Copy values of array
                                    cloneParArray.push(new Map([['parentKey', key], ['parentName', name]]));
                                    dirStruct.set(childKey, cloneParArray);
                                } else {
                                    dirStruct.set(childKey, [new Map([['parentKey', key], ['parentName', name]])]);
                                }
                            }
                        }
                        buildDirStruct_(children);
                    }
                }
            }
        }
    };

    buildDirMap_(json);
    buildDirStruct_(json);

    return [rootKey, dirMap, dirStruct];
}

// folder operation
function filterDirs(filterText, byHistory) {
    const filteredDirs = [], filteredParentArray = [];
    const dirKeys = Array.from(dirMap.keys());

    // Search dirMap for input string
    for (let k of dirKeys) {
        const cloneDir = new Map(Array.from(dirMap.get(k)));
        let newItems = cloneDir.get('items').slice();
        newItems = newItems.filter((item) => {
            if (item.name.indexOf(filterText) >= 0) return true;
        });

        if (newItems.length > 0) {
            cloneDir.set('items', newItems);
            filteredDirs.push(cloneDir);
            filteredParentArray.push(dirStruct.get(k));
        }
    }

    // Write filtered folders
    renderHTML(filteredDirs.length === 0 ? [] : filteredDirs, filteredParentArray.length === 0 ? [] : filteredParentArray);

    // Record history
    if (!byHistory) innerKeepOperationHist(new Map([['func', funcs[0]], ['filterText', filterText]]));
    funcControlBackForward();
}
function chooseDir(dirKey, byHistory) {
    const chosenKey = dirKey === '' ? rootKey : dirKey;
    const chosenDir = dirMap.get(chosenKey);
    const parentArray = dirStruct.get(chosenKey);

    // Write chosen folder
    renderHTML([chosenDir], [parentArray]);
    funcClearFilterText();

    // Record history
    if (!byHistory) innerKeepOperationHist(new Map([['func', funcs[1]], ['dirKey', chosenKey]]));
    funcControlBackForward();
}

// back and forward operation
function goBackDir() {
    const hist = stateJSON.histories[stateJSON.current - 1];
    hist.func === funcs[0] ? filterDirs(hist.arg, true) : chooseDir(hist.arg, true);

    // Record history
    innerKeepOperationHist(new Map([['func', funcs[2]]]));
    funcControlBackForward();
}
function goForwardDir() {
    const hist = stateJSON.histories[stateJSON.current + 1];
    hist.func === funcs[0] ? filterDirs(hist.arg, true) : chooseDir(hist.arg, true);

    // Record history
    innerKeepOperationHist(new Map([['func', funcs[3]]]));
    funcControlBackForward();
}

// render HTML from selected dir/files
function renderHTML(dirs, parentArray) {
    const prepareHTML_ = (dir, parents) => {
        const selfName = dir.get('name'), selfItems = dir.get('items');

        // Prepare Breadcrumb HTML
        let breadcrumb = ``
            + `<nav class="small mt-3 explorerBreadcrumb" aria-label="filelist-breadcrumb">\n`
            + `    <ol class="breadcrumb border rounded mb-1 py-1">\n`;

        if (parents !== []) {
            for (let i in parents) {
                const parKey = parents[i].get('parentKey'), parName = parents[i].get('parentName');
                breadcrumb += `<li class="breadcrumb-item"><a class="font-italic" href="javascript:chooseDir('${parKey}', false);">${parName}</a></li>\n`;
            }
        }
        breadcrumb += ``
            + `        <li class="breadcrumb-item" area-current="page">${selfName}</li>\n`
            + `    </ol>\n`
            + `</nav>\n`;

        // Format File List HTML
        let fileList = `<div class="list-group explorerFileList">\n`;

        if (selfItems.length === 0) {
            fileList += ``
                + `<button type="button" class="list-group-item list-group-item-action px-3 py-2" disabled>\n`
                + `    <div class="d-flex align-items-center">\n`
                + `        <div class="px-1 text-secondary font-italic">This folder is empty.</div>\n`
                + `    </div>\n`
                + `</button>\n`;
        } else if (dir == []) {
            fileList += ``
                + `<button type="button" class="list-group-item list-group-item-action px-3 py-2" disabled>\n`
                + `    <div class="d-flex align-items-center">\n`
                + `        <div class="px-1 text-secondary font-italic">There is no matching file or folder name</div>\n`
                + `    </div>\n`
                + `</button>\n`;
        } else {
            for (let v of selfItems) {
                const isFolder = v.isFolder;
                if (isFolder) {
                    fileList += ``
                        + `    <button type="button" id="folder-${v.key}" class="list-group-item list-group-item-action px-3 py-2 folderButtons" style="cursor: pointer">\n`
                        + `        <div class="d-flex align-items-center">\n`
                        + `            <div class="px-1 flex-shrink-1"><img src="../../static/img/round-folder-24px.svg" width="24px" height="24px"></div>\n`
                        + `            <div class="px-2 flex-grow-1"><span class="font-weight-bold">${v.name}</span></div>\n`
                        + `            <div class="px-1 flex-grow-1 text-center text-muted small font-italic">Updated: ${v.updateTime}</div>\n`
                        + `            <div class="px-1 flex-shrink-1 text-right"><span class="badge badge-primary">Children: ${v.children.length}</span></div>\n`;
                } else {
                    fileList += ``
                        + `    <button type="button" id="folder-${v.key}" class="list-group-item list-group-item-action px-3 py-2 fileButtons" style="cursor: pointer">\n`
                        + `        <div class="d-flex align-items-center">\n`
                        + `            <div class="px-1 flex-shrink-1"><img src="../../static/img/outline-insert_drive_file-24px.svg" width="24px" height="24px"></div>\n`
                        + `            <div class="px-2 flex-grow-1"><span class="font-weight-bold">${v.name}</span></div>\n`
                        + `            <div class="px-1 flex-grow-1 text-center text-muted small font-italic">Updated: ${v.updateTime}</div>\n`;

                    if (v.isShared) {
                        fileList += `            <div class="px-1 flex-shrink-1 text-right"><span class="badge badge-success">Shared</span></div>\n`;
                    } else {
                        fileList += `            <div class="px-1 flex-shrink-1 text-right"><span class="badge badge-secondary">Shared</span></div>\n`;
                    }
                }
                fileList += ``
                    + `        </div>\n`
                    + `    </button>\n`;
            }
        }
        fileList += `</div>\n`;

        return { breadcrumb: breadcrumb, fileList: fileList };
    };
    const writeHTML_ = (htmlStringsArray) => {
        $(() => {
            const displayedBC = document.querySelectorAll('.explorerBreadcrumb');
            const displayedFL = document.querySelectorAll('.explorerFileList');
            const removal = (breadcrumb, fileList) => {
                let tl = anime.timeline();
                for (let i = 0; i < breadcrumb.length; i++) {
                    tl.add({
                        targets: breadcrumb[i],
                        left: '-10%',
                        opacity: '0',
                        duration: 150,
                        easing: 'easeInQuart'
                    }, 0).add({
                        targets: fileList[i],
                        left: '-10%',
                        opacity: '0',
                        duration: 150,
                        easing: 'easeInQuart'
                    }, 0);
                }
            };

            // Start Promise
            new Promise((resolve, reject) => {// Hide animation
                removal(displayedBC, displayedFL);
                if (displayedBC.length === 0) {
                    resolve();
                } else {
                    setInterval(() => {
                        resolve();
                    }, 150);
                }
            }
            ).then((v) => {// Remove elements
                $('.explorerBreadcrumb').remove();
                $('.explorerFileList').remove();
            }
            ).then((v) => {// Write new elements
                for (let i in htmlStringsArray) {
                    const breadcrumb = htmlStringsArray[i].breadcrumb;
                    const fileList = htmlStringsArray[i].fileList;
                    $(breadcrumb).appendTo('#explorer').hide();
                    $(fileList).appendTo('#explorer').hide();
                    $('.explorerBreadcrumb').css({
                        position: 'relative',
                        left: '15%',
                        opacity: '0'
                    }).show();
                    $('.explorerFileList').css({
                        position: 'relative',
                        left: '15%',
                        opacity: '0'
                    }).show();
                }
            }
            ).then((v) => {// Set event listeners
                const folderButtons = document.querySelectorAll(".folderButtons");
                let touchMoved = false;
                for (let fb of folderButtons) {
                    const b = $(`#${fb.id}`);

                    // For desktop Event
                    b.on('dblclick', () => {
                        chooseDir(fb.id.split("-")[1], false);
                    });

                    // For cellphone Event
                    b.on('touchmove', () => {
                        touchMoved = true;
                    });
                    b.on('touchend', () => {
                        if (!touchMoved) chooseDir(fb.id.split("-")[1], false);
                        touchMoved = false;
                    });
                }
            }
            ).then((v) => {// Displaying animation
                const hiddenBC = document.querySelectorAll('.explorerBreadcrumb');
                const hiddenFL = document.querySelectorAll('.explorerFileList');
                let timeline = anime.timeline();
                for (let i = 0; i < hiddenBC.length; i++) {
                    timeline.add({
                        targets: hiddenBC[i],
                        translateX: '-15%',
                        opacity: '1',
                        duration: 600,
                        easing: 'easeOutBack'
                    }, 70 * i).add({
                        targets: hiddenFL[i],
                        translateX: '-15%',
                        opacity: '1',
                        duration: 600,
                        easing: 'easeOutBack'
                    }, 70 * (i + 1));
                }
            }
            ).catch((error) => {
                console.error("Promise failed for some reason: ", error);
            });
        });
    };

    // Execute writing
    const htmlStringsArray = [];
    for (let i in dirs) {
        if (parentArray[i] !== []) {
            const htmlStrings = prepareHTML_(dirs[i], parentArray[i]);
            htmlStringsArray.push(htmlStrings);
        } else {
            const htmlStrings = prepareHTML_(dirs[i], []);
            htmlStringsArray.push(htmlStrings);
        }
    }
    writeHTML_(htmlStringsArray);
}

// keep history
function innerKeepOperationHist(operation) {
    // Keep operation history
    const func = operation.get('func');
    if (func === funcs[0] || func === funcs[1]) {
        // Delete histories which has a larger index than the current index
        const popNum = stateJSON.histories.length - stateJSON.current - 1;
        if (popNum > 0) for (let i = 0; i < popNum; i++) stateJSON.histories.pop();

        // Create history item and Push
        const hist = func === funcs[0] ? { func: 'filterDirs', arg: operation.get('filterText') } : {
            func: 'chooseDir',
            arg: operation.get('dirKey')
        };
        stateJSON.histories.push(hist);
        stateJSON.current += 1;
    } else if (func === funcs[2] || func === funcs[3]) {
        func === funcs[2] ? (stateJSON.current -= 1) : (stateJSON.current += 1);
    } else {
        console.error('Some error occurred');
    }
}

// utils
function funcControlBackForward() {
    // Toggle 'disabled' of '#dirBack' and '#dirForward'
    const b = $('#dirBack');
    const f = $('#dirForward');
    stateJSON.current === 0 ? b.addClass('disabled') : b.removeClass('disabled');
    stateJSON.current === stateJSON.histories.length - 1 ? f.addClass('disabled') : f.removeClass('disabled');
}
function funcControlFilterButton() {
    // Toggle 'disabled' property of '#filterBtn'
    const ft = document.getElementById('filterText').value;
    if (ft === '') {
        $('#filterBtn').prop('disabled', true);
    } else {
        $('#filterBtn').prop('disabled', false);
    }
}
function funcClearFilterText() {
    // Clear value of '#filterText'
    document.getElementById('filterText').value = '';
    $('#filterBtn').prop('disabled', true);
}

// initially executed
chooseDir('', false);
funcControlFilterButton();
