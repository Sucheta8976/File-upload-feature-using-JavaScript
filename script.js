const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");

let file;


button.onclick = () =>{
    input.click();
}

input.addEventListener("change", function(){
  file = this.files[0];
  showFile();
  dropArea.classList.add("active");
});

//If user drag file over DropArea
dropArea.addEventListener("dragover",(event) => {
    event.preventDefault(); 
    dropArea.classList.add("active");
    dragText.textContent = "Release to upload file";
});

//If user leave dragged file from DropArea
dropArea.addEventListener("dragleave",() => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & drop to upload file";
});

//If user drop file on DropArea
dropArea.addEventListener("drop",(event) => {
    event.preventDefault(); 
    file = event.dataTransfer.files[0];
    showFile();
});

function showFile(){
    let fileType = file.type;
    let validExtension = ["image/jpeg","image/jpg","image/png"];
    if(validExtension.includes(fileType)){
        console.log("This is an image file");
        let fileReader = new FileReader();
        fileReader.onload = () =>{
            let fileURL = fileReader.result;
            let imgTag = `<img src="${fileURL}" alt="">`;
            dropArea.innerHTML = imgTag;
        }

        fileReader.readAsDataURL(file);
    }
    else{
        alert("This is not an image file");
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & drop to upload file";
    }
}


