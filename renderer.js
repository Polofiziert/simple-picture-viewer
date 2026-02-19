/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
var workingDir = "~/"
var folderTreeObj = {files: [], folders: []}
const isFilename = new RegExp(/.+\..+/)

async function makeFileTree(folderContent) {
  console.log("makeFileTree")

  var fileTreeFile = document.getElementById('fileTreeFile')
  fileTreeFile = fileTreeFile.cloneNode(true)
  var fileTree = document.getElementById('fileTree')
  fileTree.innerHTML = ""

  for(let file=0; file < folderContent.length; file++){
    if(isFilename.test(folderContent[file])){
      var clonedFileTreeFile = fileTreeFile.cloneNode(true)
      clonedFileTreeFile.innerText = folderContent[file]
      fileTree.appendChild(clonedFileTreeFile)

      folderTreeObj.files.push({
        name: folderContent[file]
      })
    }else{
      var clonedFileTreeFile = fileTreeFile.cloneNode(true)
      clonedFileTreeFile.innerText = "📁" + folderContent[file]
      // fileTree.appendChild(clonedFileTreeFile)
      fileTree.insertBefore(clonedFileTreeFile, fileTree.children[0])
      folderTreeObj.folders.push({
        name: folderContent[file]
      })
    }
  }
  console.log("folderTreeObj Final: ", folderTreeObj)
  console.log("fileTree: ", fileTree)
}

function pictureViewerLoad(fileNum) {
  var firstPic = folderTreeObj.files[fileNum].name
  var pictureViewer = document.getElementById("pictureViewer")
  var pictureViewerTitle = document.getElementById("pictureViewerTitle")

  pictureViewer.src = "media://" + workingDir + "/" + firstPic
  pictureViewerTitle.innerHTML = folderTreeObj.files[fileNum].name

  return 0
}

const selectWdButton = document.getElementById('selectWdButton')
const mainPicturePath = document.getElementById('mainPicturePath')
const sidebarLeftTitle = document.getElementById('sidebarLeftTitle')

selectWdButton.addEventListener('click', async () => {
  var folderPath = await window.electronAPI.openFolder()
  console.log("folderPath", folderPath)
  
  workingDir = folderPath
  var folderPathFolders = folderPath.split("/");
  console.log("folderPathFolders", folderPathFolders)

  sidebarLeftTitle.innerText = folderPathFolders[folderPathFolders.length - 1]
  selectWdButton.innerText = "Change Working Diretory"

  var folderContent = await window.electronAPI.loadFolder(workingDir)
  console.log("folderContent", folderContent)

  makeFileTree(folderContent)
  pictureViewerLoad(1)
})