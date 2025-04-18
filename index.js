const NameHeader = document.queryselector ('.profile__details-name');
const AboutHeader = document.queryselector ('.profile__detailes-profession');
const InputName = document.queryselector ('#InputName');
const InputAbout = document.queryselector ('#InputAbout');
const Form = document.queryselector ('.popup__form');
const OpenProfilePopupBttn = document.queryselector('#EditButton');
const ProfileFormPopup = document.queryselector('.popup');
const CloseProfilePopupBttn = document.queryselector ('.popup__close-button');
const SaveProfilePopupBttn = document.queryselector('#submit')

OpenProfilePopupBttn.addEventListener("click", () => {
  InputName.value = NameHeader.textContent;
  InputAbout.value = AboutHeader.textContent;
  ProfileFormPopup.classList.add("popup__show") ;
  SaveProfilePopupBttn.classList.add ("pupop_form-btn-submit-disable");
  });

Form.addEventListener('submit', function(event){
  evt.preventDefault();
  nameHeader.textContent = inputName.value; // aqui se cambia el nombre del perfil del titulo al
  aboutHeader.textContent = inputAbout.value;
  ProfileFormPopup.classList.remove("popup_show"); //aqui se retira la clase que se muestra el formulario
};
  
// Utiliza el método querySelector()

// Lo siguiente es el manipulador (handler) de entrega de formularios, aunque
// no se enviará en ningún sitio todavía

// Observa que el nombre de la función comienza con un verbo
// y describe exactamente lo que hace la función
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    nameHeader.textContent = inputName.value; // aqui se cambia el nombre del perfil del titulo al
    aboutHeader.textContent = inputAbout.value;
    ProfileFormPopup.classList.remove("popup_show"); //aqui se retira la clase que se muestra el formulario
}



// Conecta el manipulador (handler) al formulario:
// se observará el evento de entrega
