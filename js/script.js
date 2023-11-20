document.addEventListener("DOMContentLoaded", function () {

    const elApp = document.getElementById("app");

    var myHeaders = new Headers();
    myHeaders.append("X-Master-Key", "$2a$10$U0w6I035a2iX/W1KsfeA0O0wIia8fIFCwxpGZE6by7mA0K5EVGXhi");
    myHeaders.append("X-BIN-META", "false");

    fetch("https://api.jsonbin.io/v3/b/655b222654105e766fd28a93", {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(data => {

            for (const category of Object.keys(data)) {
                const mainText = category.replace('_', ' ').toUpperCase();

                const elWrap = document.createElement('div');
                elWrap.classList.add("my-2", "p-4", "flex", "flex-col", "items-center", "bg-neutral-200", "rounded");
                elWrap.innerHTML = `<h2 class="font-bold text-2xl">${mainText}</h2>`;

                for (const subCategory of Object.keys(data[category])) {
                    const elWrapList = document.createElement('div');
                    elWrapList.classList.add("my-2", "p-4", "w-full", "shadow-lg", "rounded");
                    elWrapList.innerHTML = `<h2 class="font-bold text-xl">${subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}</h2>`;

                    for (const subItem of Object.keys(data[category][subCategory])) {
                        const elWrapListSup = document.createElement('div');
                        elWrapListSup.classList.add("my-2", "p-4", "w-full", "bg-neutral-200");
                        elWrapListSup.innerHTML = `<h2 class="text-lg">${subItem.charAt(0).toUpperCase() + subItem.slice(1)}</h2>`;

                        const elItems = document.createElement('div');
                        elItems.classList.add("list-disc", "ms-8");

                        data[category][subCategory][subItem].forEach(item => {
                            elItems.innerHTML += `<li class="text-blue-500"><a href="${item.link}" target="_blank">${item.title}</a></li>`;
                        });

                        elWrapListSup.appendChild(elItems);
                        elWrapList.appendChild(elWrapListSup);
                    }

                    elWrap.appendChild(elWrapList);
                }

                elApp.appendChild(elWrap);
            }

        })
        .catch(error => console.log('error', error));


});
