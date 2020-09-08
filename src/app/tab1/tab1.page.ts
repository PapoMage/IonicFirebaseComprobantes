import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  
  itemRef: any;
  comprobantes = [];

  constructor(private db: AngularFireDatabase) {}

ngOnInit(){
  this.itemRef = this.db.object('comprobante');
  this.itemRef.snapshotChanges().subscribe(action => {
  //console.log(action.type);
  //console.log(action.key)
  //console.log(action.payload.val())

  let data = action.payload.val()
  //console.log(data);
  this.comprobantes = [];
  for (let i in data){
    let comprobanteItem = data[i];
    //console.log(comprobanteItem,i);
    comprobanteItem.key = i;
    let rutaFirma = comprobanteItem.firma;
    console.log(rutaFirma);
    this.comprobantes.push(comprobanteItem);
    //Revierto el orden del array
    this.comprobantes.reverse();
  }
});

}

buscar(event){
  let texto = event.target.value;
  
  if(event.target.value.length == 0){
    this.ngOnInit();
  } else{
    this.comprobantes= this.comprobantes.filter( (comprobante) => {return comprobante.domicilio.toLowerCase().indexOf(texto.toLowerCase())> -1} );
  }
  
}

}
