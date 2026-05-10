const API = "http://localhost:3000/notes";

let editId = null;

async function ambilCatatan() {
    const res = await fetch(API);
    const data = await res.json();

    let html = "";
    data.forEach(note => {
        html += `
            <div class="note">
                <h3>${note.judul}</h3>
                <p>${note.isi}</p>
                <div class="actions">
                    <button class="edit" onclick="isiForm(${note.id}, '${note.judul}', '${note.isi}')">Edit</button>
                    <button class="delete" onclick="hapusCatatan(${note.id})">Hapus</button>
                </div>
            </div>
        `;
    });

    document.getElementById("list").innerHTML = html;
}

function isiForm(id, judul, isi) {
    document.getElementById("judul").value = judul;
    document.getElementById("isi").value = isi;
    editId = id;
}

async function tambahCatatan() {
    const judul = document.getElementById("judul").value;
    const isi = document.getElementById("isi").value;

    if (editId) {
        await fetch(API + "/" + editId, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ judul, isi })
        });
        editId = null;
    } else {
        await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ judul, isi })
        });
    }

    document.getElementById("judul").value = "";
    document.getElementById("isi").value = "";

    ambilCatatan();
}

async function hapusCatatan(id) {
    await fetch(API + "/" + id, {
        method: "DELETE"
    });

    ambilCatatan();
}

// load awal
ambilCatatan();