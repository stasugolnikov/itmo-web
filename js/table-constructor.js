function create(height, width) {
    const templateSection = document.querySelector('.table_section');
    templateSection.appendChild(document.querySelector('template').content.cloneNode(true));
    const table = document.querySelector('table');
    table.innerHTML = '';
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    thead.appendChild(tr);
    const tbody = document.createElement('tbody');
    for (let i = 0; i < height; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < width; j++) {
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            input.id = `${i}:${j}`;
            input.value = '0';
            input.className = 'table_input';
            td.appendChild(input);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(thead);
    table.appendChild(tbody);
}

function createClick() {
    const ps = document.querySelectorAll('.error');
    ps.forEach(p => {
        p.innerHTML = '';
    });
    const height = document.constructor_input.height.value;
    const width = document.constructor_input.width.value;
    if (!height || !width || height < 0 || width < 0) {
        const p = document.createElement('p');
        const tableConstructor = document.querySelector('.table-constructor');
        p.innerText = 'Введите размеры полностью';
        p.className = 'error';
        tableConstructor.appendChild(p);
    } else {
        create(height, width);
    }
}

function saveClick() {
    const height = document.constructor_input.height.value;
    const width = document.constructor_input.width.value;
    const thead = document.querySelector('thead');
    const theadTr = thead.children[0];
    const tableData = {
        height,
        width,
        data: [[]],
    }
    for (const child of theadTr.children) {
        tableData.data[0].push(child.children[0].value);
    }
    const tbody = document.querySelector('tbody');
    const children = tbody.children;
    for (let i = 0; i < children.length; i++) {
        tableData.data.push([]);
        for (let j = 0; j < children[i].children.length; j++) {
            tableData.data[i + 1].push(children[i].children[j].children[0].value);
        }
    }
    window.localStorage.setItem('tableData', JSON.stringify(tableData));
}

function restoreClick() {
    const tableData = window.localStorage.getItem('tableData');
    const dataParsed = JSON.parse(tableData);
    create(dataParsed.height, dataParsed.width);
    const data = dataParsed.data;
    for (let i = 1; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            const elem = document.getElementById(`${i - 1}:${j}`);
            elem.value = data[i][j];
        }
    }
}

(function load() {
    window.addEventListener('load', () => {
        restoreClick();
    })
})();