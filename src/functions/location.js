
let autoComplete;

export function getAddress(){
    if(!autoComplete){
        autoComplete = new window.google.maps.places.Autocomplete(
            document.getElementById("location")
        )
    console.log(autoComplete)
  }
}
  