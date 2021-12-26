document.getElementById('getUsers').addEventListener('click', fetchUsers);

function fetchUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => {
            if (!res.ok) {
                throw new Error('Something went wrong');
            }
            return res.json();
        })
        .then((data) => {
            let response = '';
            for (let i = 0; i < data.length; i++) {
                response += `<div class="info">
                                    <i><b>ID: ${data[i].id}</b></i>
                                        <ul>
                                            <li> <i><b>ФИО</b></i>: ${data[i].name}</li>
                                            <li> <i><b>Email</b></i>: ${data[i].email} </li>
                                            <li> <i><b>Адрес</b></i>: ${data[i].address.city}, ${data[i].address.street}, ${data[i].address.suite}, ${data[i].address.zipcode} </li>
                                            <li> <i><b>Координаты</b></i>: 
                                                <ul>
                                                    <li> <i><b>&emsp;&emsp;Широта</b></i>: ${data[i].address.geo.lat}</li>
                                                    <li> <i><b>&emsp;&emsp;Долгота</b></i>: ${data[i].address.geo.lng}</li>
                                                </ul>
                                            </li>
                                            <li> <i><b>Номер телефона</b></i>: ${data[i].phone}</li>
                                            <li> <i><b>Сайт</i></b>: ${data[i].website}</li>
                                            <li> <i><b>Место работы</b></i>:
                                                <ul>
                                                    <li> <i><b>&emsp;&emsp;Название</b></i>: ${data[i].company.name}</li>
                                                    <li> <i><b>&emsp;&emsp;Слоган компании</b></i>: ${data[i].company.catchPhrase}</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>`;
            }
            document.getElementById("usersList").innerHTML = response;
        }).catch((error) => {
            document.getElementById("usersList").innerHTML = error.message;
            console.log(error);
        })
}