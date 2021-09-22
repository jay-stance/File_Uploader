const image_drop = document.querySelector(".images .upload");
const imageFile_Choose = document.querySelector("#image");

imageFile_Choose.addEventListener("change", imageFile_Choose_change)
image_drop.addEventListener("dragenter", profile_drag_enter)
image_drop.addEventListener("dragover", profile_dragover)
image_drop.addEventListener("dragleave", profile_dragleave)
image_drop.addEventListener("drop", profile_drop)

let file_list = []

function imageFile_Choose_change(e){
    const files = e.target.files;
    for (file of files){
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
            let src = URL.createObjectURL(file)
            const images = document.querySelector(".images");

            const first = `        
                <div class="image item">
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
            close_icons.forEach(icon => icon.addEventListener("click", del_img))
            imageFile_Choose.addEventListener("change", imageFile_Choose_change)

            const progress = document.querySelector('.progress-done');
            progress.style.width = progress.getAttribute('data-done') + '%';
            progress.style.opacity = 1;
        }
    }
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
    this.parentElement.parentElement.style.display = "none"
}

function profile_drop(e) {
    e.stopPropagation();
    e.preventDefault()
    image_drop.classList.remove("dragEnter")
    const data_transfer = e.dataTransfer;
    const files = data_transfer.files;

    if (files.length > 0) {
        for (file of files){
            if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
                let src = URL.createObjectURL(file)
                const images = document.querySelector(".images");

                const first = `        
                    <div class="image item">
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
                progress.style.width = progress.getAttribute('data-done') + '%';
                progress.style.opacity = 1;
            }
        }
    }

}



