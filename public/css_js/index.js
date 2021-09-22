const image_drop = document.querySelector(".images .upload");
const imageFile_Choose = document.querySelector("#image");

imageFile_Choose.addEventListener("change", imageFile_Choose_change)
image_drop.addEventListener("dragenter", profile_drag_enter)
image_drop.addEventListener("dragover", profile_dragover)
image_drop.addEventListener("dragleave", profile_dragleave)
image_drop.addEventListener("drop", profile_drop)

let _id = 0;

function imageFile_Choose_change(e){
    const files = e.target.files;
    add_chosen_image(files);
}

function profile_dragover(e) {
    e.stopPropagation();
    e.preventDefault();
    image_drop.classList.add("dragEnter");
    console.log("drop over")
}

function profile_dragleave() {
    image_drop.classList.remove("dragEnter")
}

function profile_drag_enter(e) {
    e.stopPropagation();
    e.preventDefault()
    image_drop.classList.add("dragEnter");
    console.log("ENTER........", image_drop)
    console.log("Drag enter")
}

function del_img(){
    const _id = this.parentElement.parentElement.id;
    this.parentElement.parentElement.style.display = "none"
}

function profile_drop(e) {
    e.stopPropagation();
    e.preventDefault()
    image_drop.classList.remove("dragEnter")
    const data_transfer = e.dataTransfer;
    const files = data_transfer.files;
    add_chosen_image(files);
}

async function add_chosen_image(files){
    if (files.length > 0) {
        for await(let file of files){
            if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
                let src = URL.createObjectURL(file)
                const images = document.querySelector(".images");

                _id = _id + 1
                const first = `        
                    <div id=${_id } class="image item">
                        <div class="top">
                            <i class="fas fa-times"></i>
                            <img src=${src} alt="">
                            <div class="progress">
                                <div class="progress-done" data-done="70">
                                    70%
                                </div>
                            </div>
                        </div>
                        <div class="bottom">
                            <input type="text" placeholder="Enter description" >
                        </div>
                    </div>
                    `
                const previous_images = images.innerHTML;
                images.innerHTML = first + previous_images

                const close_icons = document.querySelectorAll(".images .image .top i")
                const image_drop = document.querySelector(".images .upload");
                const imageFile_Choose = document.querySelector("#image");

                // imageFile_Choose.addEventListener("change", imageFile_Choose_change)
                image_drop.addEventListener("dragenter", profile_drag_enter)
                image_drop.addEventListener("dragover", profile_dragover)
                image_drop.addEventListener("drop", profile_drop);
                close_icons.forEach(icon => icon.addEventListener("click", del_img));
                imageFile_Choose.addEventListener("change", imageFile_Choose_change)

                const progress = document.querySelector('.progress-done');
                progress.style.opacity = 1;


                await uploadFile(file, _id);
            }
        }
    }

}

function uploadFile(file, __id) {
  var formdata = new FormData();
  formdata.append("image", file);
  var ajax = new XMLHttpRequest();
  ajax.upload.addEventListener("progress", (event) => {progressHandler(event, __id)}, false);
  ajax.addEventListener("load", (event) => {completeHandler(event, __id)}, false);
  ajax.addEventListener("error", (event) => {errorHandler(event, __id)}, false);
  ajax.addEventListener("abort", (event) => {abortHandler(event, __id)}, false);
  ajax.open("POST", "/upload"); 
  ajax.send(formdata);
}

function progressHandler(event, __id) {
    let element = document.getElementById(`${__id}`)
    // _("loaded_n_total").innerHTML = "Uploaded " + event.loaded + " bytes of " + event.total;
    var percent = (event.loaded / event.total) * 100;
    console.log(percent)
    element.querySelector(".progress-done").innerText = `${Math.round(percent)}%`;
    element.querySelector(".progress-done").style.width = `${Math.round(percent)}%`;
    if (percent === 100){
        // element.querySelector(".progress").style.display = "none";
    }
}

// this function is called when an image finishes uploading
function completeHandler(event, __id) {
    console.log("FINI----------")
    let element = document.getElementById(`${__id}`)
    // element.querySelector(".progress-done").style.display = '100%';
}

function errorHandler(event, __id) {
    let element = document.getElementById(`${__id}`)
    element.querySelector(".progress-done").innerText = 'Upload Failed';
}

function abortHandler(event, __id) {
    let element = document.getElementById(`${__id}`)
    element.querySelector(".progress-done").innerText = 'Upload Failed';
}
