class project{constructor(id,title,desc,tecnologias=[],fotoP,fotos=[],video,linkGithub){this.id=id;this.title=title;this.desc=desc;this.tecnologias=tecnologias;this.fotoP=fotoP;this.fotos=fotos;this.video=video;this.linkGithub=linkGithub}}
const consArt=new project("consultArt","Consultor de Artículos","Este proyecto corresponde a un sistema gestor de artículos demostrativo, en el cual se pueden almacenar artículos con foto, titulo, ubicaciones y stock actual, asociadas a depósitos personalizables, los cuales se pueden cargar y editar en las correspondientes secciones del programa.",["Java","Mysql","GitHub","Maven"],null,[],"https://mega.nz/embed/bWYyxTCZ#-KRZcZz_39kjXDQtVNaUJuYe_JOsW1XtwcBkrr883hM!1m","https://github.com/RubenRDC/Project-Java-ConsultArt");let projects=Array(consArt);window.addEventListener("popstate",function(e){if(html.classList.contains("offScroll")&&!e.target.document.activeElement.classList.contains("openViewProject")){closePreview({isBack:!0})}});const btnsView=document.querySelectorAll(".openViewProject");const content=document.querySelector(".content");const html=document.querySelector("html");btnsView.forEach(e=>{e.addEventListener("click",openPreview)});function closePreview({isBack}={}){document.getElementById("previewProject").remove();html.classList.remove("offScroll");window.history.replaceState(null,"","/");if(!isBack){window.history.back()}}
function openPreview(e){loadPreview({id:e.target.id,event:e})}
function loadPreview({id,event}){let p=projects.find(x=>x.id==id);if(p){loadProject(p)}else{event.preventDefault()}}
function loadProject(Project){let string=`<section id="previewProject">
            <div class="previewContent bg-colorPrincipal">
                <article class="content_article">
                    <div class="close_previewProject">
                        <a id="close_previewProject" class="btn">X</a>
                    </div>
                    <div class="previewProject">
                        <div class="portada_previewProject"></div>
                        <h2>${Project.title}</h2>
                        ${loadTagsComponents(Project.tecnologias)}
                        <p>${Project.desc}</p>
                        <h3>Imágenes Demostrativas</h3>
                        <div class="visor">
                            <div class="principalImg">
                                <img alt="imagen de prueba" src="/img/projects/backgImg.webp">
                            </div>
                            <div class="selector">
                                <img alt="imagen de prueba" src="/img/projects/backgImg.webp">
                                <img alt="imagen de prueba" src="/img/projects/backgImg.webp">
                                <img alt="imagen de prueba" src="/img/projects/backgImg.webp">
                                <img alt="imagen de prueba" src="/img/projects/backgImg.webp">
                                <img alt="imagen de prueba" src="/img/projects/backgImg.webp">
                            </div>
                        </div>
                        <h3>Video Básico Demostrativo</h3>
                        <iframe loading="lazy" width="730" height="410" frameborder="0" src="${Project.video}" allowfullscreen ></iframe>
                        <div class="btns">
                            <a target="_blank" href="${Project.linkGithub}" class="btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#e3e3e3" viewBox="0 0 256 256"><path d="M216,104v8a56.06,56.06,0,0,1-48.44,55.47A39.8,39.8,0,0,1,176,192v40a8,8,0,0,1-8,8H104a8,8,0,0,1-8-8V216H72a40,40,0,0,1-40-40A24,24,0,0,0,8,152a8,8,0,0,1,0-16,40,40,0,0,1,40,40,24,24,0,0,0,24,24H96v-8a39.8,39.8,0,0,1,8.44-24.53A56.06,56.06,0,0,1,56,112v-8a58.14,58.14,0,0,1,7.69-28.32A59.78,59.78,0,0,1,69.07,28,8,8,0,0,1,76,24a59.75,59.75,0,0,1,48,24h24a59.75,59.75,0,0,1,48-24,8,8,0,0,1,6.93,4,59.74,59.74,0,0,1,5.37,47.68A58,58,0,0,1,216,104Z"></path></svg>
                                GitHub
                            </a>
                        </div>
                    </div>
                </article>
            </div>
        </section>`;html.classList.add("offScroll");content.insertAdjacentHTML("beforeend",string);document.getElementById("previewProject").addEventListener("click",(e)=>{if(e.target.id=="previewProject"||e.target.id=="close_previewProject"){closePreview()}})}
function loadTagsComponents(arrayItems=[]){let x="";arrayItems.forEach(element=>{x+=`<li class="itemsTags"><h4>${element}</h4></li>`});return'<ul class="tags">'+x+'</ul>'}