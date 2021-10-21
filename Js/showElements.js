export{
	showToDoCard,
	showProjectList,
	activeProject,
	centerDiv

}
const centerDiv = document.querySelector('.center');

function showToDoCard() {
  centerDiv.classList.remove('none');
  centerDiv.classList.add('active');
  if (mobileWidth.matches) {
    leftDiv.classList.add('none');
    leftDiv.classList.remove('active');
  }
  // ifmobile();
}
function showProjectList() {
  centerDiv.classList.add('none');
  centerDiv.classList.remove('center');
  leftDiv.classList.remove('leftnone');
  description.classList.add('none');
  centerDiv.classList.add('none');
}
function activeProject(clicked_id) {
  const sell = clicked_id.getAttribute('name');
  const sorts = document.querySelectorAll('.sortTask');
  for (const ele of sorts) {
    ele.classList.remove('select');
    if (ele.classList.contains(sell)) {
      ele.classList.add('select');
    }
  }

  // nameofProject =
}
window.activeProject=activeProject;
