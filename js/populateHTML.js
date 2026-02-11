import { default as data } from "../db/db.js";

//EDUCACIÓN Y EXPERIENCIA LABORAL

function populateExp_Edu(items, id) {
  let mainContainer = document.getElementById(id);
  if (!mainContainer || !items) return;

  for (let i = 0; i < items.length; i++) {
    let spanTimelineSublabel = document.createElement("span");
    spanTimelineSublabel.className = "timeline-sublabel";
    spanTimelineSublabel.textContent = items[i].subtitle;

    let spanh2 = document.createElement("span");
    spanh2.textContent = items[i].duration;

    let h2TimelineLabel = document.createElement("h3");
    h2TimelineLabel.textContent = items[i].title;
    h2TimelineLabel.append(document.createTextNode(" "));
    h2TimelineLabel.append(spanh2);

    let divTimelineLabel = document.createElement("div");
    divTimelineLabel.className = "timeline-label";
    divTimelineLabel.append(h2TimelineLabel);
    divTimelineLabel.append(spanTimelineSublabel);

    // Agregar detalles
    for (let j = 0; j < items[i].details.length; j++) {
      let pTimelineText = document.createElement("p");
      pTimelineText.className = "timeline-text";
      pTimelineText.innerHTML = "<span aria-hidden='true'>&#9632;</span> " + items[i].details[j];
      divTimelineLabel.append(pTimelineText);
    }

    // Agregar asignaturas relevantes si existen
    if (items[i].relevantSubjects && items[i].relevantSubjects.length > 0) {
      let pSubjectsTitle = document.createElement("p");
      pSubjectsTitle.className = "timeline-text";
      pSubjectsTitle.innerHTML = "<strong>Asignaturas relevantes:</strong>";
      pSubjectsTitle.style.marginTop = "10px";
      pSubjectsTitle.style.marginBottom = "5px";
      divTimelineLabel.append(pSubjectsTitle);

      for (let j = 0; j < items[i].relevantSubjects.length; j++) {
        let pSubject = document.createElement("p");
        pSubject.className = "timeline-text";
        pSubject.innerHTML = "&nbsp;&nbsp;&bull; " + items[i].relevantSubjects[j];
        pSubject.style.fontSize = "12px";
        pSubject.style.marginBottom = "2px";
        pSubject.style.opacity = "0.8";
        divTimelineLabel.append(pSubject);
      }
    }

    // Agregar responsabilidades si existen
    if (items[i].responsibilities && items[i].responsibilities.length > 0) {
      let pSubjectsTitle = document.createElement("p");
      pSubjectsTitle.className = "timeline-text";
      pSubjectsTitle.innerHTML = "<strong>Responsabilidades:</strong>";
      pSubjectsTitle.style.marginTop = "10px";
      pSubjectsTitle.style.marginBottom = "5px";
      divTimelineLabel.append(pSubjectsTitle);

      for (let j = 0; j < items[i].responsibilities.length; j++) {
        let pSubject = document.createElement("p");
        pSubject.className = "timeline-text";
        pSubject.innerHTML = "&nbsp;&nbsp;&bull; " + items[i].responsibilities[j];
        pSubject.style.fontSize = "12px";
        pSubject.style.marginBottom = "2px";
        pSubject.style.opacity = "0.8";
        divTimelineLabel.append(pSubject);
      }
    }

    // Agregar tags
    let divTags = document.createElement("div");
    divTags.setAttribute("role", "list");
    divTags.setAttribute("aria-label", "Tecnolog\u00edas: " + items[i].title);
    for (let j = 0; j < items[i].tags.length; j++) {
      let spanTags = document.createElement("span");
      spanTags.className = "badge badge-secondary";
      spanTags.setAttribute("role", "listitem");
      spanTags.textContent = items[i].tags[j];
      divTags.append(spanTags);
    }
    divTimelineLabel.append(divTags);

    let iFa = document.createElement("i");
    iFa.className = "fa fa-" + (items[i].icon || "circle");
    iFa.setAttribute("aria-hidden", "true");

    let divTimelineIcon = document.createElement("div");
    divTimelineIcon.className = "timeline-icon color-2";
    divTimelineIcon.append(iFa);

    let divTimelineEntryInner = document.createElement("div");
    divTimelineEntryInner.className = "timeline-entry-inner";
    divTimelineEntryInner.append(divTimelineIcon);
    divTimelineEntryInner.append(divTimelineLabel);

    let article = document.createElement("article");
    article.className = "timeline-entry animate-box";
    article.append(divTimelineEntryInner);

    mainContainer.append(article);
  }
}

//PROYECTOS

function populateProjects(items, id) {
  let projectdesign = document.getElementById(id);
  if (!projectdesign || !items) return;

  for (let i = 0; i < items.length; i++) {
    let h4 = document.createElement("h4");
    h4.className = "project-heading";
    h4.textContent = items[i].projectName;

    let a = document.createElement("a");
    a.href = items[i].preview;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", items[i].projectName + " (se abre en nueva pesta\u00f1a)");
    a.append(h4);

    let img = document.createElement("img");
    img.src = items[i].image;
    img.className = "img-fluid";
    img.alt = items[i].alt ? items[i].alt : items[i].projectName;

    let divResumeContentLeft = document.createElement("div");
    divResumeContentLeft.className = "resume-content";
    divResumeContentLeft.id = "left-div";
    divResumeContentLeft.append(img);

    let divResumeContentRight = document.createElement("div");
    divResumeContentRight.className = "resume-content";
    divResumeContentRight.id = "right-div";

    let p = document.createElement("p");
    p.className = "project-description";
    p.textContent = items[i].summary;

    let divSpan = document.createElement("div");
    divSpan.setAttribute("role", "list");
    divSpan.setAttribute("aria-label", "Tecnolog\u00edas del proyecto");
    for (let k = 0; k < items[i].techStack.length; k++) {
      let span = document.createElement("span");
      span.className = "badge badge-secondary";
      span.setAttribute("role", "listitem");
      span.textContent = items[i].techStack[k];
      divSpan.append(span);
    }

    let divSubHeading = document.createElement("div");
    divSubHeading.className = "sub-heading";
    divSubHeading.append(p);
    divSubHeading.append(divSpan);
    divResumeContentRight.append(divSubHeading);

    let divResumeItem = document.createElement("div");
    divResumeItem.className = "resume-item";
    divResumeItem.append(divResumeContentLeft);
    divResumeItem.append(divResumeContentRight);
    a.append(divResumeItem);

    let divProjectCard = document.createElement("div");
    divProjectCard.className = "project-card";
    divProjectCard.append(a);

    let li = document.createElement("li");
    li.append(divProjectCard);
    projectdesign.append(li);
  }
}

// IDIOMAS

function populateLanguages(items, id) {
  let languagesTag = document.getElementById(id);
  if (!languagesTag || !items) return;

  for (let i = 0; i < items.length; i++) {
    let h3 = document.createElement("h3");
    h3.textContent = items[i].skillName;

    let divProgress = document.createElement("div");
    divProgress.className = "progress";
    divProgress.setAttribute("role", "progressbar");
    divProgress.setAttribute("aria-valuenow", items[i].percentage);
    divProgress.setAttribute("aria-valuemin", "0");
    divProgress.setAttribute("aria-valuemax", "100");
    divProgress.setAttribute("aria-label", items[i].skillName + ": " + items[i].percentage + "%");

    let divProgressBar = document.createElement("div");
    divProgressBar.className = "progress-bar color-" + items[i].color;
    divProgressBar.style = "width:" + items[i].percentage + "%";
    divProgress.append(divProgressBar);

    let divProgressWrap = document.createElement("div");
    divProgressWrap.className = "progress-wrap";
    divProgressWrap.append(h3);
    divProgressWrap.append(divProgress);

    let divAnimateBox = document.createElement("div");
    divAnimateBox.className = "col-md-6 animate-box";
    divAnimateBox.append(divProgressWrap);

    languagesTag.append(divAnimateBox);
  }
}

//ENLACES DEL PIE DE PÁGINA

function populateLinks(items, id) {
  let footer = document.getElementById(id);
  if (!footer || !items) return;

  for (let i = 0; i < items.length; i++) {
    if (items[i].label != "copyright-text") {
      let span = document.createElement("span");
      span.className = "col";

      let p = document.createElement("p");
      p.className = "col-title";
      p.innerHTML = items[i].label;
      span.append(p);

      let nav = document.createElement("nav");
      nav.className = "col-list";

      let ul = document.createElement("ul");
      for (let j = 0; j < items[i].data.length; j++) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        if (items[i].data[j].link) {
          a.href = items[i].data[j].link;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        }
        if (items[i].data[j].func) {
          a.setAttribute("onclick", items[i].data[j].func);
          a.setAttribute("role", "button");
          a.setAttribute("tabindex", "0");
        }
        a.textContent = items[i].data[j].text;

        li.append(a);
        ul.append(li);
      }
      nav.append(ul);
      span.append(nav);
      footer.append(span);
    }

    if (items[i].label == "copyright-text") {
      let div = document.createElement("div");
      div.className = "copyright-text no-print";
      for (let k = 0; k < items[i].data.length; k++) {
        let p = document.createElement("p");
        p.innerHTML = items[i].data[k];
        div.append(p);
      }
      footer.append(div);
    }
  }
}

//LLAMADAS A LAS FUNCIONES

try {
  populateExp_Edu(data.experience, "experience");
  populateExp_Edu(data.education, "education");

  populateProjects(data.projects.destacados, "destacados-projects");
  populateProjects(data.projects.freelance, "freelance-projects");

  populateLanguages(data.languages, "languages");

  if (data.footer) {
    populateLinks(data.footer, "footer");
  }
} catch (error) {
  console.error("Error populating HTML:", error);
}
