class project {
    constructor(id, title, lastUpdate, typeProject, status, desc, tecnologias = [], fotos = [], video, linkGithub) {
        this.id = id;
        this.title = title;
        this.lastUpdate = lastUpdate;
        this.typeProject = typeProject;
        this.status = status;
        this.desc = desc;
        this.tecnologias = tecnologias;
        this.fotos = fotos;
        this.video = video;
        this.linkGithub = linkGithub;
    }
}
const consArt = new project("consultArt", "Consultor de Artículos", "26/08/2024", "Demostrativo", "Finalizado", "El proyecto 'Consultor de Artículos' es un sistema gestor de artículos diseñado para almacenar y gestionar información detallada de productos de manera demostrativa. Cada artículo puede incluir una foto, título, ubicación y stock actual, y está asociado a depósitos personalizables que se pueden añadir y modificar en las secciones correspondientes del programa.", ["Java", "Mysql", "GitHub", "Maven"], ["0.webp", "1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp", "10.webp", "11.webp", "12.webp", "13.webp", "14.webp", "15.webp", "16.webp", "17.webp", "18.webp", "19.webp", "20.webp"], "https://mega.nz/embed/mGJUUCSD#MS_mHvE609B03MeEnqdGbbAz0DmybyLeSew3ulaBPxM!1m", "https://github.com/RubenRDC/Project-Java-ConsultArt");
const ImportExport = new project("ImportExport", "Import/Export Excel a DB", "25/08/2024", "Tools", "Finalizado", "El proyecto 'Import/Export Excel a DB' es un sistema desarrollado en Java que facilita la importación y exportación de datos entre archivos Excel y bases de datos MySQL, utilizando la biblioteca Apache POI. Actualmente, soporta tipos de datos SQL como VARCHAR, DOUBLE, INTEGER, BOOLEAN y DATE, emplea diversas bibliotecas y herramientas, incluyendo java.util, java.time, java.sql, javax.swing, org.apache.poi.ss.usermodel, entre otras.", ["Java", "Mysql", "GitHub", "Maven", "Excel"], [], "", "https://github.com/RubenRDC/Project-Java-Excel");


let projects = Array(consArt, ImportExport);

window.addEventListener("popstate", function (e) {
    //console.log(e.target.document.activeElement);
    //Que este deshabilitado el scroll en el html y que el que emite el evento no sea ninguno de los botones de abrir el modal.
    if (html.classList.contains("offScroll") && !e.target.document.activeElement.classList.contains("openViewProject")) {
        closePreview({ isBack: true });
    }
});
const html = document.querySelector("html");
const content = html.querySelector(".content");
const btnsView = content.querySelectorAll(".openViewProject");

btnsView.forEach(e => {
    e.addEventListener("click", openPreview);
});

function closePreview({ isBack } = {}) {
    document.getElementById("previewProject").remove();
    html.classList.remove("offScroll");
    window.history.replaceState(null, "", "/");
    if (!isBack) { window.history.back() };
}
function openPreview(e) {
    // target => currentTarget
    loadProject(projects.find(x => x.id == e.currentTarget.id));
}
function loadProject(p) {
    let X = loadComponentPreviewProject(p);
    html.classList.add("offScroll");
    content.insertAdjacentElement("beforeend", X);
}

function createComponent({ id, typeElemento = "div", clssList = [], txtContent = "", attr = { loading: undefined, width: undefined, height: undefined, src: undefined, allowfullscreen: undefined, alt: undefined } }) {
    let x = document.createElement(typeElemento);
    if (clssList.length > 0) x.classList.add(...clssList);
    if (id) x.id = id;
    if (txtContent.length > 0) x.textContent = txtContent;
    if (attr.loading) x.setAttribute("loading", attr.loading);
    if (attr.width) x.setAttribute("width", attr.width);
    if (attr.height) x.setAttribute("height", attr.height);
    if (attr.src) x.setAttribute("src", attr.src);
    if (attr.allowfullscreen) x.setAttribute("allowfullscreen", attr.allowfullscreen);
    if (attr.alt) x.setAttribute("alt", attr.alt);
    return x;
}

function loadComponentPreviewProject(project) {
    let seccion = createComponent({ id: "previewProject", typeElemento: "section" })
    let divBtnClose = createComponent({ typeElemento: "div", clssList: ["close_previewProject"] });
    let divSeccion = createComponent({ typeElemento: "div", clssList: ["previewContent", "bg-colorPrincipal"] })
    let article = createComponent({ typeElemento: "article", clssList: ["content_article"] })
    let aBtnClose = createComponent({ id: "close_previewProject", typeElemento: "a", clssList: ["btn"], txtContent: "X" });
    let divPreviewDynamicProject = createComponent({ typeElemento: "div", clssList: ["previewProject"] });

    divBtnClose.appendChild(aBtnClose);
    article.appendChild(divBtnClose);
    divPreviewDynamicProject.append(...loadComponentDynamicProject(project));
    article.appendChild(divPreviewDynamicProject);
    divSeccion.appendChild(article);
    seccion.appendChild(divSeccion);

    seccion.addEventListener("click", (e) => { if (e.target.matches("#previewProject,#close_previewProject")) { closePreview(); } });
    //console.dir(seccion);
    return seccion;
}
function loadComponentDynamicProject({ id, title, desc, lastUpdate, typeProject, status, tecnologias = [], fotos = [], video, linkGithub } = {}) {
    if (!id) {
        return [createComponent({ typeElemento: "div", clssList: ["error"], txtContent: "El proyecto que intentas previsualizar no se encuentra disponible por el momento, verifique más tarde." })];
    }
    const portada = createComponent({ typeElemento: "div", clssList: ["portada_previewProject"] });
    const titulo = createComponent({ typeElemento: "h2", txtContent: title });
    const componentDynamicTags = loadComponentDynamicProjectTags(tecnologias);
    const componentDynamicStatus = loadStatusComponents({ lastUpdate, typeProject, status });
    const dynamicDesc = createComponent({ typeElemento: "p", txtContent: desc });
    const subtituloUno = createComponent({ typeElemento: "h3", txtContent: "Imágenes Demostrativas" });
    const componentVisorPictures = loadComponentVisorPictures({ id, fotos });
    const subtituloDos = createComponent({ typeElemento: "h3", txtContent: "Video Básico Demostrativo" });
    const iframe = loadComponentIframe(video);
    const btnlink = loadComponentBtn(linkGithub);

    return [portada, titulo, componentDynamicTags, componentDynamicStatus, dynamicDesc, subtituloUno, componentVisorPictures, subtituloDos, iframe, btnlink];
}
function loadComponentDynamicProjectTags(tecs = []) {
    const ulComponentTags = createComponent({ typeElemento: "ul", clssList: ["tags"] });
    tecs.forEach(e => {
        let li = createComponent({ typeElemento: "il", clssList: ["itemsTags"] });
        li.append(createComponent({ typeElemento: "h4", txtContent: e }));
        ulComponentTags.append(li);
    });
    return ulComponentTags;
}
function loadComponentVisorPictures({ id, fotos = [] }) {
    if (fotos.length < 1) {
        return createComponent({ typeElemento: "div", clssList: ["error"], txtContent: "No se encontró imágenes demostrativas para exponer." });
    }
    const divVisor = createComponent({ typeElemento: "div", clssList: ["visor"] });
    const divSelector = createComponent({ typeElemento: "div", clssList: ["selector"] });
    const divPrincipalPicture = createComponent({ typeElemento: "div", clssList: ["content_PrincipalPicture"] });
    const principalPicture = createComponent({ typeElemento: "img", clssList: ["principalPicture"], attr: { src: `/img/projects/${id}/${fotos[0]}`, loading: "lazy", alt: "Imagen principal del proyecto." } });

    divPrincipalPicture.append(principalPicture);
    fotos.forEach(e => {
        const x = createComponent({ typeElemento: "img", clssList: ["selectable_picture"], attr: { src: `/img/projects/${id}/${e}`, loading: "lazy", alt: "Imagen del proyecto" } });
        divSelector.append(x);
    });
    divVisor.append(divPrincipalPicture, divSelector);
    let previousTarjet;
    divVisor.addEventListener("click", (e) => {
        if (e.target.matches(".selectable_picture")) {
            if (previousTarjet && previousTarjet != e.target) {
                previousTarjet.classList.remove("selected");
            }
            changePicturesVisor({ principalElement: principalPicture, targetSRC: e.target });
            previousTarjet = e.target;
        }
    });

    return divVisor;
}
function changePicturesVisor({ principalElement, targetSRC }) {
    if (!targetSRC.classList.contains("selected")) {
        targetSRC.classList.add("selected");
        principalElement.setAttribute("src", targetSRC.attributes.src.value);
    }
}
function loadComponentIframe(video = "") {
    if (video.length > 0) {
        return createComponent({ typeElemento: "iframe", attr: { loading: "lazy", width: "730", height: "410", src: video, allowfullscreen: true } });
    } else {
        return createComponent({ typeElemento: "div", clssList: ["error"], txtContent: "Lamentablemente el proyecto no cuenta con un video demostrativo disponible." });
    }
}
function loadComponentBtn(link) {
    let x = `<div class="btns">
                <a target="_blank" href="${link}" class="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#e3e3e3" viewBox="0 0 256 256"><path d="M216,104v8a56.06,56.06,0,0,1-48.44,55.47A39.8,39.8,0,0,1,176,192v40a8,8,0,0,1-8,8H104a8,8,0,0,1-8-8V216H72a40,40,0,0,1-40-40A24,24,0,0,0,8,152a8,8,0,0,1,0-16,40,40,0,0,1,40,40,24,24,0,0,0,24,24H96v-8a39.8,39.8,0,0,1,8.44-24.53A56.06,56.06,0,0,1,56,112v-8a58.14,58.14,0,0,1,7.69-28.32A59.78,59.78,0,0,1,69.07,28,8,8,0,0,1,76,24a59.75,59.75,0,0,1,48,24h24a59.75,59.75,0,0,1,48-24,8,8,0,0,1,6.93,4,59.74,59.74,0,0,1,5.37,47.68A58,58,0,0,1,216,104Z"></path></svg>
                    GitHub
                </a>
            </div>`;
    return document.createRange().createContextualFragment(x);
}
function loadStatusComponents({ lastUpdate, typeProject, status }) {
    const divStatus = createComponent({ typeElemento: "div", clssList: ["status"] })
    const ul = createComponent({ typeElemento: "ul" });
    const itemLastUpdate = createComponent({ typeElemento: "li", txtContent: "Ultima Actualización: " });
    const itemTypeProject = createComponent({ typeElemento: "li", txtContent: "Tipo de proyecto: " });
    const itemStatus = createComponent({ typeElemento: "li", txtContent: "Estado del proyecto: " });

    itemLastUpdate.appendChild(createComponent({ typeElemento: "strong", txtContent: lastUpdate }));
    itemTypeProject.appendChild(createComponent({ typeElemento: "strong", txtContent: typeProject }));
    itemStatus.appendChild(createComponent({ typeElemento: "strong", txtContent: status }));

    ul.append(itemLastUpdate, itemTypeProject, itemStatus);
    divStatus.append(ul);
    return divStatus;
}