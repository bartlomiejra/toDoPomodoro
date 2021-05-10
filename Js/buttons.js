// export function addProject(event) {
//   const project = JSON.parse(localStorage.getItem('Project')) || [];
//   //   console.log('ok');
//   event.preventDefault();
//   //   console.log(project);
//   const Project = {
//     id: project.length,
//     name: addPr.value,
//     color: projectColor.value,
//   };

//   function renderProjects() {
//     const proj = JSON.parse(localStorage.getItem('Project')) || [];

//     pomodoreList.innerHTML = proj
//       .map(
//         (proje, i) => `
//   <li>
//    <div class="projectList" value="${proje.name}" name="${proje.name}">
//     <div class="circle" style="background-color: ${proje.color};">

//     </div>
//     ${proje.name}

//     </div>
//     <button class="projectDelete" id=${proje.name} > <i class="fas fa-minus-circle"
//     aria-hidden="true" id=${proje.id} name=${proje.name}></i></button>
//     </li>
//   `,
//       )
//       .join('');
//   }

//   project.push(Project);
//   // console.log(Project);
//   erage.setItem('Project', JSON.stringify(project));
//   addPr.value = '';
//   renderProjects();
// }

// renderProjects();

// export default addProject;
